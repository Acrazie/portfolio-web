const MAX_BYTES = 24_000;
const windows = [
	{ duration: 60_000, limit: 5 },
	{ duration: 86_400_000, limit: 90 },
	{ duration: 31 * 86_400_000, limit: 2800 },
];

// Single-process, global budget: never trust client-supplied forwarding headers.
// Resend's Free quota remains the hard ceiling across restarts/replicas.
export function createContactHandler(fetchEmail: typeof fetch = fetch) {
	const budgets = windows.map((window) => ({ ...window, start: 0, count: 0 }));
	return async (request: Request): Promise<Response> => {
		const reply = (status: number) =>
			Response.json(
				{ ok: status === 200 },
				{
					status,
					headers: { "Cache-Control": "no-store" },
				},
			);
		if (request.headers.get("origin") !== new URL(request.url).origin)
			return reply(403);
		if (!request.headers.get("content-type")?.startsWith("application/json"))
			return reply(415);
		const now = Date.now();
		for (const budget of budgets) {
			if (now - budget.start >= budget.duration) {
				budget.start = now;
				budget.count = 0;
			}
		}
		if (budgets.some((budget) => budget.count >= budget.limit))
			return reply(429);
		// Reserve before asynchronous work so concurrent requests cannot bypass the budget.
		for (const budget of budgets) budget.count++;
		let data: unknown;
		try {
			const reader = request.body?.getReader();
			if (!reader) return reply(400);
			let size = 0;
			const chunks: Uint8Array[] = [];
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				size += value.byteLength;
				if (size > MAX_BYTES) {
					await reader.cancel();
					return reply(413);
				}
				chunks.push(value);
			}
			const bytes = new Uint8Array(size);
			let offset = 0;
			for (const chunk of chunks) {
				bytes.set(chunk, offset);
				offset += chunk.length;
			}
			data = JSON.parse(new TextDecoder().decode(bytes));
		} catch {
			return reply(400);
		}
		if (!data || typeof data !== "object") return reply(400);
		const { name, email, message, website } = data as Record<string, unknown>;
		if (typeof website !== "string") return reply(400);
		if (website) return reply(200);
		if (
			typeof name !== "string" ||
			!name.trim() ||
			name.length > 100 ||
			/[\r\n]/.test(name) ||
			typeof email !== "string" ||
			email.length > 254 ||
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
			typeof message !== "string" ||
			!message.trim() ||
			message.length > 5000
		)
			return reply(400);
		const { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } = process.env;
		if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO) return reply(503);
		try {
			const response = await fetchEmail("https://api.resend.com/emails", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${RESEND_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					from: CONTACT_FROM,
					to: [CONTACT_TO],
					reply_to: email,
					subject: "Portfolio — Contact",
					text: `${name.trim()} <${email}>\n\n${message.trim()}`,
				}),
				signal: AbortSignal.timeout(10_000),
			});
			if (!response.ok) return reply(503);
			const result = (await response.json()) as { id?: unknown };
			return reply(typeof result.id === "string" && result.id ? 200 : 503);
		} catch {
			return reply(503);
		}
	};
}

export const handleContact = createContactHandler();

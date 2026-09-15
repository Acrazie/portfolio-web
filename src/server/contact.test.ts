// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { createContactHandler } from "./contact";

const fields = {
	name: "Visitor",
	email: "visitor@example.com",
	message: "Hello Mayeul",
	website: "",
};
function request(body: unknown = fields, headers: Record<string, string> = {}) {
	return new Request("https://portfolio.example/api/contact", {
		method: "POST",
		headers: {
			origin: "https://portfolio.example",
			"content-type": "application/json",
			...headers,
		},
		body: JSON.stringify(body),
	});
}
afterEach(() => {
	vi.unstubAllEnvs();
	vi.useRealTimers();
});
function setup() {
	vi.stubEnv("RESEND_API_KEY", "test-key");
	vi.stubEnv("CONTACT_FROM", "Portfolio <portfolio@example.com>");
	vi.stubEnv("CONTACT_TO", "owner@example.com");
	const send = vi
		.fn<typeof fetch>()
		.mockImplementation(async () => Response.json({ id: "email-id" }));
	return { send, handle: createContactHandler(send) };
}
describe("contact handler", () => {
	it("uses only configured recipients and passes visitor as reply_to, as plain text", async () => {
		const { handle, send } = setup();
		expect(
			(
				await handle(
					request({
						...fields,
						to: "attacker@example.com",
						message: "<script>alert(1)</script>",
					}),
				)
			).status,
		).toBe(200);
		const call = send.mock.calls[0][1];
		const body = JSON.parse(call?.body as string);
		expect(body.to).toEqual(["owner@example.com"]);
		expect(body.reply_to).toBe(fields.email);
		expect(body.html).toBeUndefined();
		expect(body.text).toContain("<script>alert(1)</script>");
	});
	it("rejects cross-origin and non-JSON submissions", async () => {
		const { handle, send } = setup();
		expect(
			(await handle(request(fields, { origin: "https://evil.example" })))
				.status,
		).toBe(403);
		expect(
			(await handle(request(fields, { "content-type": "text/plain" }))).status,
		).toBe(415);
		expect(send).not.toHaveBeenCalled();
	});
	it.each([
		null,
		{},
		{ ...fields, name: " " },
		{ ...fields, email: "bad\r\n@example.com" },
		{ ...fields, message: " " },
		{ ...fields, message: "a".repeat(5001) },
	])("rejects invalid input %#", async (body) => {
		const { handle, send } = setup();
		expect((await handle(request(body))).status).toBe(400);
		expect(send).not.toHaveBeenCalled();
	});
	it("bounds streamed body and rejects malformed JSON", async () => {
		const { handle, send } = setup();
		expect(
			(await handle(request({ ...fields, message: "x".repeat(24001) }))).status,
		).toBe(413);
		const invalid = new Request("https://portfolio.example/api/contact", {
			method: "POST",
			headers: {
				origin: "https://portfolio.example",
				"content-type": "application/json",
			},
			body: "{",
		});
		expect((await handle(invalid)).status).toBe(400);
		expect(send).not.toHaveBeenCalled();
	});
	it("silently discards honeypot submissions", async () => {
		const { handle, send } = setup();
		expect((await handle(request({ ...fields, website: "spam" }))).status).toBe(
			200,
		);
		expect(send).not.toHaveBeenCalled();
	});
	it("fails closed without configuration, on provider rejection, or uncertain delivery", async () => {
		const { handle, send } = setup();
		vi.stubEnv("RESEND_API_KEY", "");
		expect((await handle(request())).status).toBe(503);
		expect(send).not.toHaveBeenCalled();
		vi.stubEnv("RESEND_API_KEY", "test-key");
		send.mockResolvedValueOnce(new Response("", { status: 429 }));
		expect((await handle(request())).status).toBe(503);
		send.mockRejectedValueOnce(new Error("network"));
		expect((await handle(request())).status).toBe(503);
		send.mockResolvedValueOnce(Response.json({}));
		expect((await handle(request())).status).toBe(503);
	});
	it("reserves a global budget synchronously and ignores spoofed IP headers", async () => {
		const { handle, send } = setup();
		const responses = await Promise.all(
			Array.from({ length: 8 }, (_, i) =>
				handle(request(fields, { "x-forwarded-for": `192.0.2.${i}` })),
			),
		);
		expect(
			responses.filter((response) => response.status === 200),
		).toHaveLength(5);
		expect(
			responses.filter((response) => response.status === 429),
		).toHaveLength(3);
		expect(send).toHaveBeenCalledTimes(5);
	});
	it("resets short windows but preserves the daily ceiling", async () => {
		vi.useFakeTimers();
		const { handle } = setup();
		for (let minute = 0; minute < 18; minute++) {
			for (let i = 0; i < 5; i++)
				expect((await handle(request())).status).toBe(200);
			vi.advanceTimersByTime(60_000);
		}
		expect((await handle(request())).status).toBe(429);
		vi.advanceTimersByTime(86_400_000);
		expect((await handle(request())).status).toBe(200);
	});
});

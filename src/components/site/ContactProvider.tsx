import { Dialog } from "@base-ui/react/dialog";
import { IconX } from "@tabler/icons-react";
import {
	createContext,
	type FormEvent,
	type ReactNode,
	useContext,
	useId,
	useRef,
	useState,
} from "react";
import { portfolio } from "@/content/portfolio";
import { useLocale } from "./LocaleProvider";

const ContactContext = createContext<{
	openContact: (trigger: HTMLElement | null) => void;
} | null>(null);

export function useContact() {
	const value = useContext(ContactContext);
	if (!value) throw new Error("useContact must be used within ContactProvider");
	return value;
}

export function ContactProvider({ children }: { children: ReactNode }) {
	const { m, locale } = useLocale();
	const options = { locale };
	const id = useId();
	const [open, setOpen] = useState(false);
	const [fields, setFields] = useState({
		name: "",
		email: "",
		message: "",
		website: "",
	});
	const [status, setStatus] = useState<
		"idle" | "sending" | "success" | "error" | "limited"
	>("idle");
	const [copied, setCopied] = useState<"idle" | "success" | "error">("idle");
	const busy = useRef(false);
	const trigger = useRef<HTMLElement | null>(null);
	const title = useRef<HTMLHeadingElement | null>(null);
	const openContact = (element: HTMLElement | null) => {
		trigger.current = element;
		setCopied("idle");
		if (status === "success") setStatus("idle");
		setOpen(true);
	};
	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (busy.current) return;
		busy.current = true;
		setStatus("sending");
		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(fields),
				signal: AbortSignal.timeout(15_000),
			});
			const result = await response.json();
			if (response.ok && result.ok === true) {
				setStatus("success");
				setFields({ name: "", email: "", message: "", website: "" });
			} else setStatus(response.status === 429 ? "limited" : "error");
		} catch {
			setStatus("error");
		} finally {
			busy.current = false;
		}
	}
	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(portfolio.email);
			setCopied("success");
		} catch {
			setCopied("error");
		}
	}
	const inputClass =
		"focus-ring mt-2 min-h-11 w-full rounded-lg border border-black/50 bg-white px-3 py-2 text-base text-black disabled:opacity-60";
	return (
		<ContactContext.Provider value={{ openContact }}>
			{children}
			<Dialog.Root open={open} onOpenChange={setOpen} disablePointerDismissal>
				<Dialog.Portal>
					<Dialog.Backdrop className="fixed inset-0 z-[60] bg-black/60" />
					<Dialog.Popup
						initialFocus={title}
						finalFocus={trigger}
						className="fixed left-1/2 top-1/2 z-[61] max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-xl bg-white p-6 text-black sm:p-10"
					>
						<div className="flex items-start justify-between gap-4">
							<Dialog.Title
								ref={title}
								tabIndex={-1}
								className="text-4xl font-medium leading-tight tracking-[-.03em]"
							>
								{m.contact_dialog_title({}, options)}
							</Dialog.Title>
							<Dialog.Close
								className="focus-ring flex size-11 shrink-0 items-center justify-center rounded-xl border border-black/50"
								aria-label={m.contact_close({}, options)}
							>
								<IconX size={20} aria-hidden="true" />
							</Dialog.Close>
						</div>
						<Dialog.Description className="mt-4 text-base leading-6 text-black/70">
							{m.contact_dialog_intro({}, options)}
						</Dialog.Description>
						{status !== "success" && (
							<form onSubmit={submit} className="mt-6 space-y-5">
								<fieldset disabled={status === "sending"} className="space-y-5">
									<div className="grid gap-5 sm:grid-cols-2">
										<label className="block text-sm font-medium">
											{m.contact_name({}, options)}
											<input
												name="name"
												autoComplete="name"
												required
												maxLength={100}
												value={fields.name}
												onChange={(event) =>
													setFields({ ...fields, name: event.target.value })
												}
												className={inputClass}
											/>
										</label>
										<label className="block text-sm font-medium">
											{m.contact_email({}, options)}
											<input
												name="email"
												type="email"
												autoComplete="email"
												required
												maxLength={254}
												value={fields.email}
												onChange={(event) =>
													setFields({ ...fields, email: event.target.value })
												}
												className={inputClass}
											/>
										</label>
									</div>
									<div>
										<label
											htmlFor={`${id}-message`}
											className="block text-sm font-medium"
										>
											{m.contact_message({}, options)}
										</label>
										<textarea
											id={`${id}-message`}
											name="message"
											required
											maxLength={5000}
											rows={4}
											value={fields.message}
											onChange={(event) =>
												setFields({ ...fields, message: event.target.value })
											}
											className={`${inputClass} resize-y`}
										/>
									</div>
									<div hidden aria-hidden="true">
										<label>
											{m.contact_website({}, options)}
											<input
												name="website"
												tabIndex={-1}
												autoComplete="off"
												value={fields.website}
												onChange={(event) =>
													setFields({ ...fields, website: event.target.value })
												}
											/>
										</label>
									</div>
									<p className="text-sm leading-5 text-black/70">
										{m.contact_privacy({}, options)}
									</p>
									<button
										type="submit"
										className="focus-ring min-h-11 w-full rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/80 disabled:cursor-wait disabled:opacity-60"
									>
										{status === "sending"
											? m.contact_sending({}, options)
											: m.contact_send({}, options)}
									</button>
								</fieldset>
							</form>
						)}
						<div aria-live="polite" aria-atomic="true">
							{status === "success" && (
								<p className="mt-6 border-y border-black/25 py-6 text-lg">
									{m.contact_success({}, options)}
								</p>
							)}
							{(status === "error" || status === "limited") && (
								<p role="alert" className="mt-4 text-sm font-medium">
									{status === "limited"
										? m.contact_limited({}, options)
										: m.contact_error({}, options)}
								</p>
							)}
						</div>
						<div className="mt-6 border-t border-black/20 pt-5">
							<p className="text-sm text-black/70">
								{m.contact_alternative({}, options)}
							</p>
							<div className="flex flex-wrap items-center gap-x-6">
								<button
									type="button"
									onClick={copyEmail}
									className="focus-ring min-h-11 text-sm font-medium underline"
								>
									{m.contact_copy({}, options)}
								</button>
								<a
									href={
										portfolio.links.find((link) => link.id === "linkedin")?.href
									}
									className="focus-ring inline-flex min-h-11 items-center text-sm font-medium underline"
								>
									LinkedIn
								</a>
							</div>
							<a
								href={`mailto:${portfolio.email}`}
								className="focus-ring inline-flex min-h-11 items-center break-all text-sm"
							>
								{portfolio.email}
							</a>
							<p role="status" className="text-sm">
								{copied === "success"
									? m.contact_copied({}, options)
									: copied === "error"
										? m.contact_copy_error({}, options)
										: ""}
							</p>
						</div>
					</Dialog.Popup>
				</Dialog.Portal>
			</Dialog.Root>
		</ContactContext.Provider>
	);
}

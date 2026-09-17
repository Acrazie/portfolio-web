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
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
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
	const nameId = `${id}-name`;
	const emailId = `${id}-email`;
	const messageId = `${id}-message`;
	const websiteId = `${id}-website`;
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
	const linkedIn = portfolio.links.find((link) => link.id === "linkedin")?.href;

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

	return (
		<ContactContext.Provider value={{ openContact }}>
			{children}
			<Dialog open={open} onOpenChange={setOpen} disablePointerDismissal>
				<DialogContent
					initialFocus={title}
					finalFocus={trigger}
					showCloseButton={false}
					className="max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain p-6 sm:max-w-xl sm:p-10"
				>
					<DialogHeader className="pr-12">
						<DialogTitle
							ref={title}
							tabIndex={-1}
							className="text-4xl leading-tight tracking-[-.03em]"
						>
							{m.contact_dialog_title({}, options)}
						</DialogTitle>
						<DialogDescription className="text-base leading-6">
							{m.contact_dialog_intro({}, options)}
						</DialogDescription>
					</DialogHeader>

					<DialogClose
						render={
							<Button
								variant="ghost"
								size="icon"
								className="absolute top-4 right-4"
								aria-label={m.contact_close({}, options)}
							/>
						}
					>
						<IconX aria-hidden="true" />
					</DialogClose>

					{status !== "success" && (
						<form onSubmit={submit} className="mt-2">
							<FieldSet disabled={status === "sending"}>
								<FieldGroup>
									<div className="grid gap-5 sm:grid-cols-2">
										<Field>
											<FieldLabel htmlFor={nameId}>
												{m.contact_name({}, options)}
											</FieldLabel>
											<Input
												id={nameId}
												name="name"
												autoComplete="name"
												required
												maxLength={100}
												value={fields.name}
												onChange={(event) =>
													setFields({ ...fields, name: event.target.value })
												}
											/>
										</Field>
										<Field>
											<FieldLabel htmlFor={emailId}>
												{m.contact_email({}, options)}
											</FieldLabel>
											<Input
												id={emailId}
												name="email"
												type="email"
												autoComplete="email"
												required
												maxLength={254}
												value={fields.email}
												onChange={(event) =>
													setFields({ ...fields, email: event.target.value })
												}
											/>
										</Field>
									</div>

									<Field>
										<FieldLabel htmlFor={messageId}>
											{m.contact_message({}, options)}
										</FieldLabel>
										<Textarea
											id={messageId}
											name="message"
											required
											maxLength={5000}
											rows={4}
											value={fields.message}
											onChange={(event) =>
												setFields({ ...fields, message: event.target.value })
											}
											className="min-h-28 resize-y"
										/>
									</Field>

									<Field className="hidden" aria-hidden="true">
										<FieldLabel htmlFor={websiteId}>
											{m.contact_website({}, options)}
										</FieldLabel>
										<Input
											id={websiteId}
											name="website"
											tabIndex={-1}
											autoComplete="off"
											value={fields.website}
											onChange={(event) =>
												setFields({ ...fields, website: event.target.value })
											}
										/>
									</Field>

									<FieldDescription>
										{m.contact_privacy({}, options)}
									</FieldDescription>
									<Button
										type="submit"
										className="w-full"
										aria-busy={status === "sending"}
									>
										{status === "sending"
											? m.contact_sending({}, options)
											: m.contact_send({}, options)}
									</Button>
								</FieldGroup>
							</FieldSet>
						</form>
					)}

					<div aria-live="polite" aria-atomic="true">
						{status === "success" && (
							<p role="status" className="rounded-lg bg-muted p-4 text-sm">
								{m.contact_success({}, options)}
							</p>
						)}
						{(status === "error" || status === "limited") && (
							<FieldError className="mt-2">
								{status === "limited"
									? m.contact_limited({}, options)
									: m.contact_error({}, options)}
							</FieldError>
						)}
					</div>

					<Separator className="my-2" />
					<div>
						<p className="text-sm text-muted-foreground">
							{m.contact_alternative({}, options)}
						</p>
						<div className="mt-1 flex flex-wrap items-center gap-x-4">
							<Button variant="link" className="px-0" onClick={copyEmail}>
								{m.contact_copy({}, options)}
							</Button>
							<Button
								render={<a href={linkedIn} />}
								nativeButton={false}
								role="link"
								variant="link"
								className="px-0"
							>
								LinkedIn
							</Button>
						</div>
						<Button
							render={<a href={`mailto:${portfolio.email}`} />}
							nativeButton={false}
							role="link"
							variant="link"
							className="h-auto justify-start break-all px-0 whitespace-normal"
						>
							{portfolio.email}
						</Button>
						<p role="status" className="text-sm">
							{copied === "success"
								? m.contact_copied({}, options)
								: copied === "error"
									? m.contact_copy_error({}, options)
									: ""}
						</p>
					</div>
				</DialogContent>
			</Dialog>
		</ContactContext.Provider>
	);
}

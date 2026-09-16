import { Button } from "@/components/ui/button";
import { portfolio } from "@/content/portfolio";
import { useContact } from "./ContactProvider";
import { useLocale } from "./LocaleProvider";

export function SiteFooter() {
	const { openContact } = useContact();
	const { copy } = useLocale();

	return (
		<footer className="bg-black text-white">
			<div className="site-container py-20 sm:py-28">
				<div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
					<div>
						<h2 className="max-w-[15ch] text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[.98] tracking-[-.04em]">
							{copy.contact.title}
						</h2>
						<p className="mt-5 max-w-[58ch] text-base leading-7 text-white/68">
							{copy.contact.body}
						</p>
					</div>
					<div className="lg:text-right">
						<Button
							type="button"
							variant="link"
							className="px-0 text-base text-white hover:text-white"
							onClick={(event) => openContact(event.currentTarget)}
						>
							{copy.contact.action}
						</Button>
						<p className="mt-3 break-all text-sm text-white/58">
							{portfolio.email}
						</p>
					</div>
				</div>
				<div className="mt-20 flex flex-wrap items-end justify-between gap-8 border-t border-white/18 pt-7">
					<ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
						{portfolio.links.map((link) => (
							<li key={link.id}>
								<a
									className="focus-ring hover:text-white hover:underline"
									href={link.href}
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
					<p className="text-xs text-white/48">{copy.footer}</p>
				</div>
			</div>
		</footer>
	);
}

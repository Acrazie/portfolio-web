import { IconMenu2, IconX } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/ui/LogoMark";
import { portfolio } from "@/content/portfolio";
import { useContact } from "./ContactProvider";
import { useLocale } from "./LocaleProvider";

type NavKey = "home" | "projects" | "about" | "education";

const navItems = [
	{ key: "home", to: "/" },
	{ key: "projects", to: "/projects" },
	{ key: "about", to: "/about" },
	{ key: "education", to: "/education" },
] as const;

export function SiteHeader({
	active,
	home = false,
}: {
	active: NavKey;
	home?: boolean;
}) {
	const { openContact } = useContact();
	const { copy, toggleLocale } = useLocale();
	const menuTrigger = useRef<HTMLButtonElement>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;
		const close = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", close);
		return () => document.removeEventListener("keydown", close);
	}, [open]);

	return (
		<header
			className={`z-40 text-white ${home ? "absolute inset-x-0 top-0" : "relative bg-black"}`}
		>
			<div className="site-container flex min-h-20 items-center justify-between gap-6">
				{home ? (
					<Link
						to="/"
						className="focus-ring inline-flex items-center text-white/80 hover:text-white transition-opacity"
						aria-label={copy.nav.home}
					>
						<LogoMark className="size-6 text-white" aria-hidden="true" />
					</Link>
				) : (
					<Link
						to="/"
						className="focus-ring inline-flex items-center gap-2.5 text-sm font-semibold tracking-[-.02em] text-white"
					>
						<LogoMark
							className="size-5 shrink-0 text-white"
							aria-hidden="true"
						/>
						<span>{portfolio.displayName.toUpperCase()}</span>
					</Link>
				)}

				<div className="flex items-center gap-2">
					<nav
						aria-label={copy.navigationLabel}
						className="hidden items-center gap-6 md:flex"
					>
						{navItems.map((item) => (
							<Link
								key={item.key}
								to={item.to}
								className={`focus-ring inline-flex min-h-11 items-center border-b text-sm transition-colors ${active === item.key ? "border-white text-white" : "border-transparent text-white/78 hover:text-white"}`}
							>
								{copy.nav[item.key]}
							</Link>
						))}
						<button
							type="button"
							className="focus-ring inline-flex min-h-11 items-center text-sm text-white/78 hover:text-white"
							onClick={(event) => openContact(event.currentTarget)}
						>
							{copy.nav.contact}
						</button>
					</nav>
					<button
						type="button"
						onClick={toggleLocale}
						className="focus-ring inline-flex min-h-11 items-center rounded-xl bg-black px-3 text-xs font-medium text-white"
						aria-label={copy.language.label}
					>
						{copy.language.short}
						<span aria-hidden="true" className="px-1 text-white/35">
							/
						</span>
						<span aria-hidden="true" className="text-white/55">
							{copy.language.other}
						</span>
					</button>
					<button
						type="button"
						ref={menuTrigger}
						onClick={() => setOpen(true)}
						className="focus-ring inline-flex size-11 items-center justify-center rounded-xl bg-black text-white md:hidden"
						aria-label={copy.menu.open}
						aria-expanded={open}
					>
						<IconMenu2 aria-hidden="true" size={20} stroke={1.7} />
					</button>
				</div>
			</div>

			{open && (
				<div className="fixed inset-0 z-50 bg-black text-white md:hidden">
					<div className="site-container flex min-h-20 items-center justify-end">
						<button
							type="button"
							onClick={() => setOpen(false)}
							className="focus-ring inline-flex size-11 items-center justify-center rounded-xl bg-white text-black"
							aria-label={copy.menu.close}
						>
							<IconX aria-hidden="true" size={20} stroke={1.7} />
						</button>
					</div>
					<nav
						aria-label={copy.navigationLabel}
						className="site-container flex flex-col py-10"
					>
						{navItems.map((item) => (
							<Link
								key={item.key}
								to={item.to}
								onClick={() => setOpen(false)}
								className="focus-ring border-t border-white/18 py-5 text-3xl font-medium tracking-[-.03em] last:border-b"
							>
								{copy.nav[item.key]}
							</Link>
						))}
						<button
							type="button"
							className="focus-ring border-b border-white/18 py-5 text-left text-3xl font-medium tracking-[-.03em]"
							onClick={() => {
								setOpen(false);
								openContact(menuTrigger.current);
							}}
						>
							{copy.nav.contact}
						</button>
					</nav>
				</div>
			)}
		</header>
	);
}

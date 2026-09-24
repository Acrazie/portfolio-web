import { IconMenu2, IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/LogoMark";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useContact } from "./ContactProvider";
import { useLocale } from "./LocaleProvider";

const navItems = [
	{ key: "projects", to: "/#project" },
	{ key: "about", to: "/#about" },
	{ key: "education", to: "/#education" },
] as const;

export function SiteHeader() {
	const { openContact } = useContact();
	const { copy, toggleLocale } = useLocale();
	const menuTrigger = useRef<HTMLButtonElement>(null);
	const contactAfterSheet = useRef(false);
	const [open, setOpen] = useState(false);

	return (
		<header className="fixed inset-x-0 top-0 z-40 text-white">
			<div className="site-container mt-3 flex min-h-16 items-center justify-between gap-6 rounded-[14px] border border-white/14 bg-black px-4 sm:px-6">
				<a
					href="/"
					className="focus-ring inline-flex items-center text-white/80 transition-opacity hover:text-white"
					aria-label={copy.nav.home}
				>
					<LogoMark className="size-6 text-white" aria-hidden="true" />
				</a>

				<div className="flex items-center gap-2">
					<nav
						aria-label={copy.navigationLabel}
						className="hidden items-center gap-4 md:flex"
					>
						{navItems.map((item) => (
							<a
								key={item.key}
								href={item.to}
								className="focus-ring inline-flex h-8 items-center border-b border-transparent px-1 text-sm text-white/78 transition-colors hover:border-white hover:text-white"
							>
								{copy.nav[item.key]}
							</a>
						))}
						<Button
							variant="ghost"
							className="text-white/78 hover:bg-white/10 hover:text-white"
							onClick={(event) => openContact(event.currentTarget)}
						>
							{copy.nav.contact}
						</Button>
					</nav>

					<Button
						type="button"
						variant="secondary"
						size="sm"
						onClick={toggleLocale}
						aria-label={copy.language.label}
					>
						{copy.language.short}
						<span aria-hidden="true" className="text-black/30">
							/
						</span>
						<span aria-hidden="true" className="text-black/55">
							{copy.language.other}
						</span>
					</Button>

					<Sheet
						open={open}
						onOpenChange={setOpen}
						onOpenChangeComplete={(nextOpen) => {
							if (!nextOpen && contactAfterSheet.current) {
								contactAfterSheet.current = false;
								openContact(menuTrigger.current);
							}
						}}
					>
						<SheetTrigger
							render={
								<Button
									ref={menuTrigger}
									variant="secondary"
									size="icon"
									className="md:hidden"
									aria-label={copy.menu.open}
								/>
							}
						>
							<IconMenu2 aria-hidden="true" />
						</SheetTrigger>
						<SheetContent side="right" showCloseButton={false}>
							<SheetHeader className="border-b p-6 pr-16">
								<SheetTitle>{copy.navigationLabel}</SheetTitle>
							</SheetHeader>
							<SheetClose
								render={
									<Button
										variant="ghost"
										size="icon"
										className="absolute top-4 right-4"
										aria-label={copy.menu.close}
									/>
								}
							>
								<IconX aria-hidden="true" />
							</SheetClose>
							<nav
								aria-label={copy.navigationLabel}
								className="flex flex-col gap-2 p-4"
							>
								{navItems.map((item) => (
									<Button
										key={item.key}
										render={<a href={item.to} onClick={() => setOpen(false)} />}
										nativeButton={false}
										role="link"
										variant="ghost"
										className="h-auto justify-start px-3 py-3 text-base"
									>
										{copy.nav[item.key]}
									</Button>
								))}
								<Button
									variant="ghost"
									className="h-auto justify-start px-3 py-3 text-base"
									onClick={() => {
										contactAfterSheet.current = true;
										setOpen(false);
									}}
								>
									{copy.nav.contact}
								</Button>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}

import { Link } from "@tanstack/react-router";
import { GradientCanvas } from "@/components/hero/GradientCanvas";
import { useLocale } from "@/components/site/LocaleProvider";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/content/portfolio";

export function HomePage() {
	const { copy, locale } = useLocale();
	const project = portfolio.projects[0];
	const projectCopy = project.copy[locale];

	return (
		<div className="min-h-screen bg-white text-black">
			<a href="#main" className="skip-link">
				{copy.skip}
			</a>
			<SiteHeader active="home" home />
			<main id="main" tabIndex={-1}>
				<section
					aria-labelledby="hero-title"
					className="gradient-hero relative overflow-hidden text-white"
				>
					<GradientCanvas className="absolute inset-0" />
					<div className="site-container hero-inner pointer-events-none relative z-20 flex items-center pb-[24vh] pt-28 sm:pb-[20vh]">
						<div className="pointer-events-auto max-w-[58rem]">
							<h1
								id="hero-title"
								aria-label={copy.home.title}
								className="hero-title text-balance text-[clamp(4rem,10vw,6rem)] font-medium leading-[.9] tracking-[-.04em]"
							>
								<span className="block">
									{portfolio.displayName.toUpperCase()}
								</span>
								<span className="mt-5 block max-w-[24ch] text-[clamp(1.65rem,4vw,3rem)] leading-[1.02] tracking-[-.035em]">
									{portfolio.role}
								</span>
							</h1>
							<p className="mt-6 max-w-[34ch] text-balance text-[clamp(1.15rem,2.4vw,1.65rem)] leading-[1.28] text-white/76">
								{copy.home.statement}
							</p>
							<Button
								render={<Link to="/projects" />}
								nativeButton={false}
								role="link"
								variant="secondary"
								size="lg"
								className="mt-9"
							>
								{copy.home.projectsAction}
							</Button>
						</div>
					</div>
				</section>

				<section
					aria-labelledby="orientation-title"
					className="bg-white py-24 sm:py-32"
				>
					<div className="site-container">
						<div className="grid gap-12 lg:grid-cols-[minmax(14rem,.6fr)_minmax(0,1.4fr)] lg:gap-24">
							<h2
								id="orientation-title"
								className="section-title max-w-[9ch] text-balance text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[.96] tracking-[-.04em]"
							>
								{copy.home.orientationTitle}
							</h2>
							<div>
								<p className="max-w-[34ch] text-balance text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.18]">
									{copy.home.orientationIntro}
								</p>
								<dl className="mt-14 border-t border-black/20">
									{copy.home.orientationItems.map((item) => (
										<div
											key={item.title}
											className="grid gap-3 border-b border-black/20 py-7 sm:grid-cols-[minmax(10rem,.45fr)_minmax(0,1fr)] sm:gap-10 sm:py-8"
										>
											<dt className="text-lg font-semibold tracking-[-.02em]">
												{item.title}
											</dt>
											<dd className="max-w-[54ch] text-base leading-7 text-black/64">
												{item.body}
											</dd>
										</div>
									))}
								</dl>
								<Button
									render={<Link to="/about" />}
									nativeButton={false}
									role="link"
									variant="link"
									className="mt-8 px-0"
								>
									{copy.home.orientationAction}
								</Button>
							</div>
						</div>
					</div>
				</section>

				<section
					aria-labelledby="featured-title"
					className="bg-white py-24 sm:py-32"
				>
					<div className="site-container">
						<div className="grid gap-10 lg:grid-cols-[minmax(14rem,.6fr)_minmax(0,1.4fr)] lg:gap-24">
							<div>
								<h2
									id="featured-title"
									className="section-title text-balance text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[.96] tracking-[-.04em]"
								>
									{copy.home.featuredTitle}
								</h2>
								<p className="mt-5 max-w-[40ch] text-base leading-7 text-black/62">
									{copy.home.featuredIntro}
								</p>
							</div>
							<article className="border-y border-black/18 py-8 sm:py-10">
								<h3 className="text-balance text-[clamp(2rem,4vw,4.25rem)] font-medium leading-[.98] tracking-[-.035em]">
									{projectCopy.title}
								</h3>
								<p className="mt-5 max-w-[62ch] text-base leading-7 text-black/64">
									{projectCopy.summary}
								</p>
								<ul
									aria-label={copy.projects.stack}
									className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-sm text-black/55"
								>
									{project.stack.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
								<Button
									render={
										<Link
											to="/projects/$slug"
											params={{ slug: project.slug }}
										/>
									}
									nativeButton={false}
									role="link"
									variant="link"
									className="mt-9 px-0"
								>
									{copy.projects.open}
								</Button>
							</article>
						</div>
					</div>
				</section>
			</main>
			<SiteFooter />
		</div>
	);
}

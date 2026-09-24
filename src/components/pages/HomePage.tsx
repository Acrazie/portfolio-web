import { GradientCanvas } from "@/components/hero/GradientCanvas";
import { SkillsAtlas } from "@/components/pages/SkillsAtlas";
import { useLocale } from "@/components/site/LocaleProvider";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/content/portfolio";

export function HomePage() {
	const { copy, locale } = useLocale();
	const skills = portfolio.projects[0];
	const skillsCopy = skills.copy[locale];
	const flow = portfolio.projects[1];
	const flowCopy = flow.copy[locale];

	return (
		<div id="top" className="min-h-screen bg-white text-black">
			<a href="#main" className="skip-link">
				{copy.skip}
			</a>
			<SiteHeader />
			<main id="main" tabIndex={-1}>
				<section
					aria-labelledby="hero-title"
					className="gradient-hero relative overflow-hidden text-white"
				>
					<GradientCanvas className="absolute inset-0" />
					<div className="site-container hero-inner pointer-events-none relative z-20 flex items-center pb-[24vh] pt-32 sm:pb-[20vh]">
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
							<p className="mt-6 max-w-[34ch] text-balance text-[clamp(1.15rem,2.4vw,1.65rem)] leading-[1.28] text-white/80">
								{copy.home.statement}
							</p>
							<Button
								render={<a href="#project" />}
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
					id="project"
					aria-labelledby="project-title"
					className="scroll-mt-24 py-24 sm:py-32"
				>
					<div className="site-container">
						<div className="grid gap-8 border-t border-black/18 pt-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-20">
							<h2
								id="project-title"
								className="section-title max-w-[12ch] text-balance text-[clamp(3rem,7vw,6rem)] font-medium leading-[.95] tracking-[-.04em]"
							>
								{copy.projects.title}
							</h2>
							<p className="max-w-[35ch] text-balance text-[clamp(1.5rem,3vw,2.5rem)] leading-tight tracking-[-.025em] lg:pt-2">
								{copy.projects.intro}
							</p>
						</div>

						<article aria-labelledby="skills-title" className="mt-20">
							<div className="grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,.85fr)] lg:gap-14">
								<h3
									id="skills-title"
									className="max-w-[14ch] text-balance text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[.96] tracking-[-.04em]"
								>
									{skillsCopy.title}
								</h3>
								<div>
									<p className="max-w-[38ch] text-xl leading-snug text-black/68 sm:text-2xl">
										{skillsCopy.summary}
									</p>
									<a
										href={skills.href}
										target="_blank"
										rel="noopener noreferrer"
										className="focus-ring mt-5 inline-block border-b border-black/50 pb-1 text-sm font-medium hover:border-black"
									>
										{copy.projects.repository}
									</a>
								</div>
							</div>
							<SkillsAtlas />
						</article>

						<article
							aria-labelledby="flow-title"
							className="mt-28 border-t border-black/18 pt-8"
						>
							<div className="grid gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-20">
								<h3
									id="flow-title"
									className="max-w-[13ch] text-balance text-[clamp(2.5rem,5vw,5rem)] leading-[.96] tracking-[-.04em]"
								>
									{flowCopy.title}
								</h3>
								<div>
									<p className="max-w-[42ch] text-xl leading-snug text-black/68 sm:text-2xl">
										{flowCopy.summary}
									</p>
									<a
										href={flow.href}
										target="_blank"
										rel="noopener noreferrer"
										className="focus-ring mt-6 inline-block border-b border-black/50 pb-1 text-sm font-medium hover:border-black"
									>
										{copy.projects.repository}
									</a>
								</div>
							</div>
							<ol className="mt-14 grid border-t border-black/18 sm:grid-cols-2 lg:grid-cols-5">
								{copy.projects.flowStages.map((stage, index) => (
									<li
										key={stage.label}
										className="border-b border-black/18 py-6 sm:pr-6 lg:border-r lg:px-5 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
									>
										<span className="text-sm tabular-nums text-black/62">
											{String(index + 1).padStart(2, "0")}
										</span>
										<h4 className="mt-7 text-lg font-medium">{stage.label}</h4>
										<p className="mt-2 max-w-[20ch] text-sm leading-5 text-black/68">
											{stage.description}
										</p>
									</li>
								))}
							</ol>
						</article>
					</div>
				</section>

				<section
					id="about"
					aria-labelledby="about-title"
					className="scroll-mt-24 bg-black py-24 text-white sm:py-32"
				>
					<div className="site-container">
						<div className="grid gap-12 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-20">
							<h2
								id="about-title"
								className="section-title max-w-[12ch] text-balance text-[clamp(3rem,7vw,6rem)] font-medium leading-[.95] tracking-[-.04em]"
							>
								{copy.about.title}
							</h2>
							<div>
								<p className="max-w-[30ch] text-balance text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.08] tracking-[-.03em]">
									{copy.about.lead}
								</p>
								<p className="mt-8 max-w-[60ch] text-base leading-7 text-white/70">
									{copy.about.body}
								</p>
							</div>
						</div>
						<dl className="mt-20 grid border-t border-white/20 md:grid-cols-3">
							{copy.about.capabilities.map((item) => (
								<div
									key={item.title}
									className="border-b border-white/20 py-7 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
								>
									<dt className="text-xl font-medium tracking-[-.025em]">
										{item.title}
									</dt>
									<dd className="mt-5 max-w-[32ch] text-base leading-6 text-white/70">
										{item.body}
									</dd>
								</div>
							))}
						</dl>
						<div className="mt-14 flex flex-wrap items-baseline justify-between gap-5 border-t border-white/20 pt-6">
							<h3 className="text-sm font-semibold">{copy.about.toolsTitle}</h3>
							<ul className="flex flex-wrap gap-x-8 gap-y-3 text-lg font-medium tracking-[-.02em]">
								{portfolio.tools.map((tool) => (
									<li key={tool}>{tool}</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				<section
					id="education"
					aria-labelledby="education-title"
					className="scroll-mt-24 py-24 sm:py-32"
				>
					<div className="site-container grid gap-12 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-20">
						<h2
							id="education-title"
							className="section-title max-w-[12ch] text-balance text-[clamp(3rem,7vw,6rem)] font-medium leading-[.95] tracking-[-.04em]"
						>
							{copy.education.title}
						</h2>
						<ol className="border-t border-black/18">
							{portfolio.education.map((item) => (
								<li
									key={item.id}
									className="grid gap-2 border-b border-black/18 py-7 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-6"
								>
									<h3 className="text-xl font-medium tracking-[-.025em]">
										{item.institution}
									</h3>
									<p className="text-base text-black/64 sm:text-right">
										{item.copy[locale].program}
									</p>
								</li>
							))}
						</ol>
					</div>
				</section>
			</main>
			<SiteFooter />
		</div>
	);
}

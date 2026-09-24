import { Link } from "@tanstack/react-router";
import { InteriorLayout } from "@/components/site/InteriorLayout";
import { useLocale } from "@/components/site/LocaleProvider";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/content/portfolio";

export function ProjectsPage() {
	const { copy, locale } = useLocale();

	return (
		<InteriorLayout active="projects">
			<section className="page-hero bg-black text-white">
				<div className="site-container py-20 sm:py-28">
					<h1 className="page-title max-w-[12ch] text-balance text-[clamp(3.75rem,9vw,6rem)] font-medium leading-[.92] tracking-[-.04em]">
						{copy.projects.title}
					</h1>
					<p className="mt-7 max-w-[56ch] text-lg leading-8 text-white/66">
						{copy.projects.intro}
					</p>
				</div>
			</section>
			<section
				aria-label={copy.projects.title}
				className="bg-white py-20 sm:py-28"
			>
				<div className="site-container">
					<div className="border-t border-black/20">
						{portfolio.projects.map((project) => {
							const projectCopy = project.copy[locale];
							return (
								<article
									key={project.slug}
									className="grid gap-8 border-b border-black/20 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,.65fr)] lg:gap-20 lg:py-14"
								>
									<div>
										<h2 className="text-balance text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[.98] tracking-[-.035em]">
											{projectCopy.title}
										</h2>
										<p className="mt-5 max-w-[62ch] text-base leading-7 text-black/62">
											{projectCopy.summary}
										</p>
									</div>
									<div className="self-end">
										<ul
											aria-label={copy.projects.stack}
											className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-black/55"
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
											className="mt-8 px-0"
										>
											{copy.projects.open}
										</Button>
									</div>
								</article>
							);
						})}
					</div>
				</div>
			</section>
		</InteriorLayout>
	);
}

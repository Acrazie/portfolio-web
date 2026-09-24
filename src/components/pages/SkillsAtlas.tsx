import { useState } from "react";
import { useLocale } from "@/components/site/LocaleProvider";
import { Button } from "@/components/ui/button";
import { skillsCatalog } from "@/content/skills";

const groups = ["agents", "repository", "visual", "delivery"] as const;

export function SkillsAtlas() {
	const { copy, locale } = useLocale();
	const skills = skillsCatalog[locale];
	const featured = skills.filter((skill) => skill.featured);
	const [selectedId, setSelectedId] = useState<string>(featured[0].id);
	const selected =
		skills.find((skill) => skill.id === selectedId) ?? featured[0];

	return (
		<div className="mt-16">
			<div className="skill-atlas-layout grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,.85fr)] lg:gap-14">
				<fieldset className="skill-atlas-menu order-1 min-w-0 max-w-full lg:order-2">
					<legend className="sr-only">{copy.projects.skillsSelection}</legend>
					<div className="flex min-w-0 max-w-full gap-2 overflow-x-auto pb-3 lg:block lg:overflow-visible lg:pb-0">
						{featured.map((skill, index) => (
							<Button
								key={skill.id}
								variant="ghost"
								aria-pressed={selected.id === skill.id}
								aria-controls="selected-skill"
								onClick={() => setSelectedId(skill.id)}
								className={`skill-atlas-option h-auto min-h-20 min-w-48 flex-col items-start justify-between gap-5 rounded-none border-t border-black/18 px-4 py-4 text-left whitespace-normal transition-colors lg:flex lg:w-full lg:min-w-0 lg:flex-row lg:items-center lg:px-6 ${selected.id === skill.id ? "bg-black text-white hover:bg-black hover:text-white" : "bg-white text-black hover:bg-black/5"}`}
							>
								<span className="text-xs tabular-nums opacity-60">
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="max-w-[22ch] text-base font-medium leading-tight lg:text-lg">
									{skill.name}
								</span>
							</Button>
						))}
					</div>
				</fieldset>

				<div
					id="selected-skill"
					className="skill-file order-2 min-w-0 lg:order-1 lg:sticky lg:top-28 lg:self-start"
					aria-live="polite"
				>
					<div
						key={selected.id}
						className="skill-file-paper relative z-10 flex min-h-[31rem] flex-col bg-white px-7 py-8 sm:min-h-[36rem] sm:px-11 sm:py-10"
					>
						<div className="flex items-start justify-between gap-6 border-b border-black/25 pb-5 font-mono text-xs text-black/60">
							<span>SKILL.md</span>
							<span className="max-w-[20ch] break-words text-right">
								{selected.slug}
							</span>
						</div>
						<div
							key={selected.id}
							className="flex flex-1 flex-col justify-center py-14"
						>
							<h4 className="max-w-[13ch] text-balance text-[clamp(2.65rem,5.7vw,5.6rem)] font-medium leading-[.96] tracking-[-.04em]">
								{selected.name}
							</h4>
							<p className="mt-9 max-w-[35ch] text-xl leading-snug text-black/70 sm:text-2xl">
								{selected.description}
							</p>
						</div>
						<div className="flex flex-wrap items-end justify-between gap-6 border-t border-black/25 pt-5">
							{selected.result ? (
								<div>
									<p className="text-xs text-black/60">
										{copy.projects.skillsResult}
									</p>
									<p className="mt-1 text-base font-medium">
										{selected.result}
									</p>
								</div>
							) : (
								<span />
							)}
							<a
								href={`https://github.com/Acrazie/skills/tree/main/skills/${selected.slug}`}
								target="_blank"
								rel="noopener noreferrer"
								className="focus-ring border-b border-black/50 pb-1 text-sm font-medium hover:border-black"
							>
								{copy.projects.skillsSource}
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className="skills-complete-index mt-32 border-t border-black/18 pt-8">
				<div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,.85fr)] lg:gap-14">
					<h3 className="text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[.96] tracking-[-.04em]">
						{copy.projects.skillsIndexTitle}
					</h3>
					<p className="max-w-[30ch] text-xl leading-snug text-black/68 lg:pt-2">
						{copy.projects.skillsIndexIntro}
					</p>
				</div>
				<div className="mt-12 grid gap-x-12 gap-y-14 lg:grid-cols-2">
					{groups.map((group) => (
						<section key={group} aria-labelledby={`skill-group-${group}`}>
							<h4
								id={`skill-group-${group}`}
								className="border-b border-black/25 pb-4 text-lg font-semibold"
							>
								{copy.projects.skillGroups[group]}
							</h4>
							<ul>
								{skills
									.filter((skill) => skill.group === group)
									.map((skill) => (
										<li
											key={skill.id}
											className="grid gap-2 border-b border-black/18 py-5 sm:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] sm:gap-5"
										>
											<span className="font-medium leading-tight">
												{skill.name}
											</span>
											<span className="text-sm leading-5 text-black/68">
												{skill.description}
											</span>
										</li>
									))}
							</ul>
						</section>
					))}
				</div>
			</div>
		</div>
	);
}

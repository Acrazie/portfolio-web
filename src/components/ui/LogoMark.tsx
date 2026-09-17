import type { SVGProps } from "react";

export interface LogoMarkProps extends SVGProps<SVGSVGElement> {
	className?: string;
	title?: string;
}

/**
 * LogoMark — Monogramme A-Prism (Direction 2)
 *
 * Géométrie vectorielle architecturale en monochrome éditorial :
 * - Pilier gauche et arête d'apex
 * - Facette biseautée isométrique (flanc droit) à 75% d'opacité
 * - Traverse centrale satellite suspendue avec entrefer d'air
 * - Couche d'écho rétro-tech en décalage Sud-Est à 35% d'opacité
 */
export function LogoMark({
	className = "size-6",
	title = "Logo A-Prism",
	...props
}: LogoMarkProps) {
	return (
		<svg
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			shapeRendering="geometricPrecision"
			className={className}
			aria-label={title}
			{...props}
		>
			<title>{title}</title>
			{/* Couche d'écho rétro-tech (décalage Sud-Est) */}
			<g className="opacity-35" fill="currentColor">
				<path d="M18.5 7.5L26.5 15.5V29.5H23V16.5L16 9.5H18.5Z" />
				<path d="M26.5 15.5L30.5 19.5V29.5H26.5V15.5Z" />
				<path d="M7.5 29.5H11.5V27H7.5V29.5Z" />
			</g>

			{/* Structure principale A-Prism */}
			<g fill="currentColor">
				<path d="M5 27V15L13.5 5H16.5L9 14V27H5Z" />
				<path d="M13.5 5H19L16.5 8H11L13.5 5Z" />
				<path d="M16.5 8L23 15.5V27H19V16.5L14 10.5L16.5 8Z" />
				{/* Facette 3D biseautée */}
				<path
					className="opacity-75"
					d="M19 5L27 14.5V27H23V15.5L16.5 8L19 5Z"
				/>
				{/* Traverse satellite flottante */}
				<rect x="8.5" y="17.5" width="13" height="3" rx="0.5" />
			</g>
		</svg>
	);
}

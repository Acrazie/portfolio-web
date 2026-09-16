import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/site/LocaleProvider";
import { Button } from "@/components/ui/button";

type GradientCanvasProps = {
	className?: string;
};

const FRAME_INTERVAL = 1000 / 30;
const MAX_DPR = 1.5;
const MAX_PARTICLES = 120;
const MAX_WORD_PARTICLES = 240;
const PARTICLE_SPACING = 4;
const MAX_EMISSIONS_PER_MOVE = 12;
const WELCOME_X = 0.64;
const WELCOME_Y = 0.68;
const ASCII_SYMBOLS = [">", ">", ">", "_", "_", "o", "/", "+"] as const;
const ASCII_WORD_FONT: Record<string, readonly string[]> = {
	B: [
		"1111110",
		"1000001",
		"1000001",
		"1000001",
		"1111110",
		"1000001",
		"1000001",
		"1000001",
		"1111110",
	],
	C: [
		"0111110",
		"1000001",
		"1000000",
		"1000000",
		"1000000",
		"1000000",
		"1000000",
		"1000001",
		"0111110",
	],
	E: [
		"1111111",
		"1000000",
		"1000000",
		"1000000",
		"1111110",
		"1000000",
		"1000000",
		"1000000",
		"1111111",
	],
	I: [
		"1111111",
		"0001000",
		"0001000",
		"0001000",
		"0001000",
		"0001000",
		"0001000",
		"0001000",
		"1111111",
	],
	L: [
		"1000000",
		"1000000",
		"1000000",
		"1000000",
		"1000000",
		"1000000",
		"1000000",
		"1000000",
		"1111111",
	],
	M: [
		"1000001",
		"1100011",
		"1100011",
		"1010101",
		"1010101",
		"1001001",
		"1000001",
		"1000001",
		"1000001",
	],
	N: [
		"1000001",
		"1100001",
		"1100001",
		"1010001",
		"1001001",
		"1000101",
		"1000011",
		"1000011",
		"1000001",
	],
	O: [
		"0111110",
		"1000001",
		"1000001",
		"1000001",
		"1000001",
		"1000001",
		"1000001",
		"1000001",
		"0111110",
	],
	U: [
		"1000001",
		"1000001",
		"1000001",
		"1000001",
		"1000001",
		"1000001",
		"1000001",
		"1000001",
		"0111110",
	],
	V: [
		"1000001",
		"1000001",
		"1000001",
		"1000001",
		"1000001",
		"0100010",
		"0100010",
		"0010100",
		"0001000",
	],
	W: [
		"1000001",
		"1000001",
		"1000001",
		"1000001",
		"1000001",
		"1001001",
		"1010101",
		"1100011",
		"1000001",
	],
};

type WelcomeTarget = {
	x: number;
	y: number;
};

type WelcomeField = {
	cellSize: number;
	columnCount: number;
	rowCount: number;
	targets: WelcomeTarget[];
	left: number;
	right: number;
	top: number;
	bottom: number;
};

type AsciiParticle = {
	x: number;
	y: number;
	velocityX: number;
	velocityY: number;
	age: number;
	lifetime: number;
	size: number;
	symbol: (typeof ASCII_SYMBOLS)[number];
	targetIndex: number | null;
	capture: number;
	rotation: number;
	spin: number;
	flowPhase: number;
	flowRate: number;
	flowStrength: number;
	mass: number;
};

function randomBetween(min: number, max: number) {
	return min + Math.random() * (max - min);
}

function emitAsciiParticle(
	particles: AsciiParticle[],
	x: number,
	y: number,
	cursorVelocityX: number,
	cursorVelocityY: number,
) {
	const cursorSpeed = Math.hypot(cursorVelocityX, cursorVelocityY);
	const directionX = cursorSpeed > 0 ? cursorVelocityX / cursorSpeed : 0;
	const directionY = cursorSpeed > 0 ? cursorVelocityY / cursorSpeed : 0;
	const inheritedSpeed = Math.min(
		1.05,
		Math.max(0.025, cursorSpeed * randomBetween(0.3, 0.42)),
	);
	const lateral = randomBetween(-0.045, 0.045);

	const cloudAngle = Math.random() * Math.PI * 2;
	const cloudRadius = Math.sqrt(Math.random()) * 26;

	if (
		particles.filter((particle) => particle.targetIndex === null).length >=
		MAX_PARTICLES
	) {
		const freeParticle = particles.findIndex(
			(particle) => particle.targetIndex === null,
		);
		if (freeParticle >= 0) particles.splice(freeParticle, 1);
	}

	particles.push({
		x: x + Math.cos(cloudAngle) * cloudRadius,
		y: y + Math.sin(cloudAngle) * cloudRadius,
		velocityX: directionX * inheritedSpeed - directionY * lateral,
		velocityY: directionY * inheritedSpeed + directionX * lateral,
		age: 0,
		lifetime: randomBetween(850, 1400) + Math.min(350, cursorSpeed * 120),
		size: randomBetween(8, 11),
		symbol:
			ASCII_SYMBOLS[Math.floor(Math.random() * ASCII_SYMBOLS.length)] ?? ">",
		targetIndex: null,
		capture: 0,
		rotation: randomBetween(-0.18, 0.18),
		spin: randomBetween(-0.0003, 0.0003),
		flowPhase: randomBetween(0, Math.PI * 2),
		flowRate: randomBetween(0.0016, 0.0034),
		flowStrength: randomBetween(0.000018, 0.000052),
		mass: randomBetween(0.82, 1.2),
	});
}

function createWelcomeField(
	word: string,
	width: number,
	height: number,
): WelcomeField {
	const characters = Array.from(word.toUpperCase());
	const columnCount = Math.max(1, characters.length * 8 - 1);
	const rowCount = 9;
	const compactProgress = Math.min(1, Math.max(0, (960 - width) / 192));
	const widthShare = 0.66 + compactProgress * 0.18;
	const cellSize = Math.min(
		18,
		(width * widthShare) / columnCount,
		(height * 0.19) / (rowCount - 1),
	);
	const wordWidth = (columnCount - 1) * cellSize;
	const wordHeight = (rowCount - 1) * cellSize;
	const centerX = Math.min(
		width - wordWidth / 2 - 32,
		Math.max(wordWidth / 2 + 32, width * WELCOME_X),
	);
	const centerY = height * (WELCOME_Y + compactProgress * 0.08);
	const startX = centerX - wordWidth / 2;
	const startY = centerY - wordHeight / 2;
	const targets: WelcomeTarget[] = [];

	characters.forEach((character, characterIndex) => {
		const pattern = ASCII_WORD_FONT[character];
		if (!pattern) return;
		pattern.forEach((row, rowIndex) => {
			Array.from(row).forEach((cell, columnIndex) => {
				if (cell === "1" && targets.length < MAX_WORD_PARTICLES) {
					targets.push({
						x: startX + (characterIndex * 8 + columnIndex) * cellSize,
						y: startY + rowIndex * cellSize,
					});
				}
			});
		});
	});

	let shuffle = word.length * 2654435761;
	for (let index = targets.length - 1; index > 0; index -= 1) {
		shuffle = (shuffle * 1664525 + 1013904223) >>> 0;
		const swapIndex = shuffle % (index + 1);
		const current = targets[index];
		const swap = targets[swapIndex];
		if (current && swap) {
			targets[index] = swap;
			targets[swapIndex] = current;
		}
	}

	const margin = 24;
	return {
		cellSize,
		columnCount,
		rowCount,
		targets,
		left: centerX - wordWidth / 2 - margin,
		right: centerX + wordWidth / 2 + margin,
		top: centerY - wordHeight / 2 - margin,
		bottom: centerY + wordHeight / 2 + margin,
	};
}

function claimNearestWelcomeTarget(
	particle: AsciiParticle,
	claimed: Set<number>,
	targets: WelcomeTarget[],
) {
	let nearest: number | null = null;
	let nearestDistance = Number.POSITIVE_INFINITY;
	for (let index = 0; index < targets.length; index += 1) {
		if (claimed.has(index)) continue;
		const target = targets[index];
		if (!target) continue;
		const distance = Math.hypot(target.x - particle.x, target.y - particle.y);
		if (distance < nearestDistance) {
			nearest = index;
			nearestDistance = distance;
		}
	}
	return nearest;
}

function paintAsciiFormation(
	context: CanvasRenderingContext2D,
	delta: number,
	particles: AsciiParticle[],
	field: WelcomeField,
) {
	let capturedParticles = 0;
	let settledParticles = 0;
	const claimedTargets = new Set(
		particles.flatMap((particle) =>
			particle.targetIndex === null ? [] : [particle.targetIndex],
		),
	);

	for (const particle of particles) {
		particle.age += delta;
		if (
			particle.targetIndex === null &&
			particle.x >= field.left &&
			particle.x <= field.right &&
			particle.y >= field.top &&
			particle.y <= field.bottom
		) {
			const targetIndex = claimNearestWelcomeTarget(
				particle,
				claimedTargets,
				field.targets,
			);
			particle.targetIndex = targetIndex;
			if (targetIndex !== null) claimedTargets.add(targetIndex);
		}

		const target =
			particle.targetIndex === null
				? undefined
				: field.targets[particle.targetIndex];
		if (target) {
			capturedParticles += 1;
			const captureRise = 1 - Math.exp(-delta / 280);
			particle.capture += (1 - particle.capture) * captureRise;
			const spring = (0.000026 * particle.capture) / particle.mass;
			const damping = 0.0102 * particle.capture;
			particle.velocityX += (target.x - particle.x) * spring * delta;
			particle.velocityY += (target.y - particle.y) * spring * delta;
			const capturedDrag = Math.exp(-damping * delta);
			particle.velocityX *= capturedDrag;
			particle.velocityY *= capturedDrag;
			particle.x += particle.velocityX * delta;
			particle.y += particle.velocityY * delta;
			particle.rotation *= Math.exp(-delta / 260);
			if (
				Math.hypot(target.x - particle.x, target.y - particle.y) <
				particle.size * 0.75
			) {
				settledParticles += 1;
			}
		} else {
			const flow = particle.flowPhase + particle.age * particle.flowRate;
			const speed = Math.hypot(particle.velocityX, particle.velocityY);
			const turbulence =
				particle.flowStrength * (0.35 + Math.min(1, speed / 0.5));
			particle.velocityX += Math.cos(flow) * turbulence * delta;
			particle.velocityY +=
				(Math.sin(flow * 0.83) * turbulence - 0.000006) * delta;
			const inertialDrag = Math.exp(-delta / (760 + particle.mass * 220));
			particle.velocityX *= inertialDrag;
			particle.velocityY *= inertialDrag;
			particle.x += particle.velocityX * delta;
			particle.y += particle.velocityY * delta;
			particle.rotation += particle.spin * delta;
		}

		const fadeIn = Math.min(1, particle.age / 110);
		const fadeOut = target
			? 1
			: Math.min(1, (particle.lifetime - particle.age) / 500);
		const opacity = Math.max(0, fadeIn * fadeOut) * (target ? 0.92 : 0.64);
		const drawSize = target ? field.cellSize * 0.95 : particle.size;
		const drawY =
			particle.symbol === "_" ? particle.y - drawSize * 0.28 : particle.y;
		context.save();
		context.translate(particle.x, drawY);
		context.rotate(particle.rotation);
		context.font = `500 ${drawSize}px ui-monospace, "SFMono-Regular", Consolas, monospace`;
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillStyle = `rgba(232, 236, 255, ${opacity})`;
		context.fillText(particle.symbol, 0, 0);
		context.restore();
	}

	for (let index = particles.length - 1; index >= 0; index -= 1) {
		const particle = particles[index];
		if (
			particle &&
			particle.targetIndex === null &&
			particle.age >= particle.lifetime
		)
			particles.splice(index, 1);
	}

	if (capturedParticles === 0) return "idle";
	const enoughParticles = capturedParticles >= field.targets.length * 0.82;
	return enoughParticles && settledParticles >= capturedParticles * 0.7
		? "formed"
		: "forming";
}

function radial(
	context: CanvasRenderingContext2D,
	x: number,
	y: number,
	radius: number,
	inner: string,
	outer = "rgba(0,0,0,0)",
) {
	const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
	gradient.addColorStop(0, inner);
	gradient.addColorStop(1, outer);
	context.fillStyle = gradient;
	context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}

function paint(
	context: CanvasRenderingContext2D,
	width: number,
	height: number,
	elapsed: number,
) {
	const motion = elapsed / 9000;
	const breathe = Math.sin(motion * Math.PI * 2);
	const drift = Math.cos(motion * Math.PI * 1.4);
	const field = Math.sqrt(width * height);

	context.clearRect(0, 0, width, height);

	const base = context.createLinearGradient(0, 0, 0, height);
	base.addColorStop(0, "#050d2e");
	base.addColorStop(0.58, "#123081");
	base.addColorStop(1, "#5a52c9");
	context.fillStyle = base;
	context.fillRect(0, 0, width, height);

	context.globalCompositeOperation = "screen";
	radial(
		context,
		width * (0.19 + drift * 0.025),
		height * (0.18 + breathe * 0.02),
		field * 0.32,
		"rgba(48, 108, 255, .92)",
	);
	radial(
		context,
		width * (0.72 - breathe * 0.02),
		height * (0.24 + drift * 0.025),
		field * 0.28,
		"rgba(164, 183, 255, .92)",
	);
	radial(
		context,
		width * (0.27 - breathe * 0.018),
		height * (0.46 + drift * 0.02),
		field * 0.25,
		"rgba(112, 58, 255, .88)",
	);
	radial(
		context,
		width * (0.48 + drift * 0.015),
		height * (0.34 - breathe * 0.02),
		field * 0.21,
		"rgba(197, 178, 255, .84)",
	);
	radial(
		context,
		width * (0.79 + breathe * 0.02),
		height * (0.5 - drift * 0.015),
		field * 0.29,
		"rgba(42, 102, 255, .88)",
	);
	radial(
		context,
		width * (0.36 + drift * 0.025),
		height * (0.69 + breathe * 0.018),
		field * 0.3,
		"rgba(132, 104, 255, .8)",
	);
	radial(
		context,
		width * (0.69 - breathe * 0.018),
		height * (0.68 + drift * 0.014),
		field * 0.23,
		"rgba(64, 122, 255, .8)",
	);

	context.globalCompositeOperation = "source-over";
	radial(
		context,
		width * (0.56 + drift * 0.01),
		height * (0.08 + breathe * 0.01),
		field * 0.2,
		"rgba(2, 6, 23, .28)",
	);
	radial(
		context,
		width * (0.46 - breathe * 0.01),
		height * (0.58 + drift * 0.012),
		field * 0.13,
		"rgba(2, 6, 23, .26)",
	);

	const topShade = context.createLinearGradient(0, 0, 0, height * 0.58);
	topShade.addColorStop(0, "rgba(0, 4, 26, .38)");
	topShade.addColorStop(1, "rgba(0, 4, 26, 0)");
	context.fillStyle = topShade;
	context.fillRect(0, 0, width, height * 0.62);

	context.globalAlpha = 1;
}

export function GradientCanvas({ className = "" }: GradientCanvasProps) {
	const { copy } = useLocale();
	const welcome = copy.home.welcome;
	const formationRef = useRef<{ word: string; particles: AsciiParticle[] }>({
		word: welcome,
		particles: [],
	});
	const hostRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [paused, setPaused] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(false);

	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReducedMotion(query.matches);
		update();
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, []);

	useEffect(() => {
		const host = hostRef.current;
		const canvas = canvasRef.current;
		if (!host || !canvas) return;

		const context = canvas.getContext("2d");
		host.dataset.renderer = context ? "canvas2d" : "fallback";
		host.dataset.particleEffect = "idle";
		host.dataset.cloudInertia = "idle";
		host.dataset.welcomeFormation = "idle";
		if (!context) return;

		let disposed = false;
		let frame = 0;
		let lastPaint = -FRAME_INTERVAL;
		let lastRender = performance.now();
		let visible = true;
		let pageVisible = document.visibilityState !== "hidden";
		let welcomeField: WelcomeField = {
			cellSize: 0,
			columnCount: 0,
			rowCount: 0,
			targets: [],
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
		};
		let fieldWidth = 0;
		let fieldHeight = 0;
		if (formationRef.current.word !== welcome)
			formationRef.current = { word: welcome, particles: [] };
		const particles = formationRef.current.particles;
		if (paused || reducedMotion) {
			formationRef.current.particles = particles.filter(
				(particle) => particle.targetIndex !== null,
			);
		}
		const pointer = {
			x: 0,
			y: 0,
			time: 0,
			velocityX: 0,
			velocityY: 0,
			carry: 0,
			initialized: false,
		};

		const render = (time: number) => {
			const bounds = host.getBoundingClientRect();
			const delta = Math.min(
				FRAME_INTERVAL * 2,
				Math.max(0, time - lastRender),
			);
			lastRender = time;
			paint(context, bounds.width, bounds.height, time);
			if (!paused && !reducedMotion) {
				const formation = paintAsciiFormation(
					context,
					delta,
					particles,
					welcomeField,
				);
				const particleState = particles.length === 0 ? "idle" : "active";
				const cloudInertia = particles.some(
					(particle) =>
						particle.targetIndex === null &&
						particle.age >= 100 &&
						Math.hypot(particle.velocityX, particle.velocityY) > 0.02,
				)
					? "active"
					: "idle";
				if (host.dataset.particleEffect !== particleState)
					host.dataset.particleEffect = particleState;
				if (host.dataset.cloudInertia !== cloudInertia)
					host.dataset.cloudInertia = cloudInertia;
				if (host.dataset.welcomeFormation !== formation)
					host.dataset.welcomeFormation = formation;
			}
		};

		const resize = () => {
			const bounds = host.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
			canvas.width = Math.max(1, Math.round(bounds.width * dpr));
			canvas.height = Math.max(1, Math.round(bounds.height * dpr));
			canvas.style.width = `${bounds.width}px`;
			canvas.style.height = `${bounds.height}px`;
			context.setTransform(dpr, 0, 0, dpr, 0, 0);
			if (fieldWidth > 0 && fieldHeight > 0) {
				const scaleX = bounds.width / fieldWidth;
				const scaleY = bounds.height / fieldHeight;
				for (const particle of particles) {
					particle.x *= scaleX;
					particle.y *= scaleY;
				}
			}
			welcomeField = createWelcomeField(welcome, bounds.width, bounds.height);
			fieldWidth = bounds.width;
			fieldHeight = bounds.height;
			if (
				!paused &&
				!reducedMotion &&
				particles.some((particle) => particle.targetIndex !== null)
			)
				host.dataset.welcomeFormation = "forming";
			host.dataset.letterGrid = `7x${welcomeField.rowCount}`;
			host.dataset.wordColumns = String(welcomeField.columnCount);
			host.dataset.wordTargets = String(welcomeField.targets.length);
			host.dataset.glyphSize = (welcomeField.cellSize * 0.95).toFixed(2);
			render(performance.now());
		};

		const loop = (time: number) => {
			if (time - lastPaint >= FRAME_INTERVAL) {
				render(time);
				lastPaint = time;
			}
			frame = window.requestAnimationFrame(loop);
		};

		const reconcile = () => {
			const shouldRun = visible && pageVisible && !paused && !reducedMotion;
			window.cancelAnimationFrame(frame);
			frame = 0;
			if (shouldRun) frame = window.requestAnimationFrame(loop);
		};

		const onVisibility = () => {
			pageVisible = document.visibilityState !== "hidden";
			reconcile();
		};

		const resetPointer = () => {
			pointer.initialized = false;
			pointer.velocityX = 0;
			pointer.velocityY = 0;
			pointer.carry = 0;
		};

		const onPointerMove = (event: PointerEvent) => {
			if (paused || reducedMotion || event.pointerType === "touch") return;
			const bounds = host.getBoundingClientRect();
			const inside =
				event.clientX >= bounds.left &&
				event.clientX <= bounds.right &&
				event.clientY >= bounds.top &&
				event.clientY <= bounds.bottom;

			if (!inside) {
				resetPointer();
				return;
			}

			const x = event.clientX - bounds.left;
			const y = event.clientY - bounds.top;
			if (!pointer.initialized) {
				pointer.x = x;
				pointer.y = y;
				pointer.time = event.timeStamp;
				pointer.initialized = true;
				return;
			}

			const startX = pointer.x;
			const startY = pointer.y;
			const movementX = x - startX;
			const movementY = y - startY;
			const movement = Math.hypot(movementX, movementY);
			const elapsed = Math.min(64, Math.max(8, event.timeStamp - pointer.time));
			pointer.x = x;
			pointer.y = y;
			pointer.time = event.timeStamp;
			if (movement < 1) return;

			const velocityBlend = 1 - Math.exp(-elapsed / 36);
			pointer.velocityX +=
				(movementX / elapsed - pointer.velocityX) * velocityBlend;
			pointer.velocityY +=
				(movementY / elapsed - pointer.velocityY) * velocityBlend;
			let distanceToEmission = PARTICLE_SPACING - pointer.carry;
			let emitted = 0;

			while (
				distanceToEmission <= movement &&
				emitted < MAX_EMISSIONS_PER_MOVE
			) {
				const progress = distanceToEmission / movement;
				emitAsciiParticle(
					particles,
					startX + movementX * progress,
					startY + movementY * progress,
					pointer.velocityX,
					pointer.velocityY,
				);
				distanceToEmission += PARTICLE_SPACING;
				emitted += 1;
			}

			pointer.carry = (pointer.carry + movement) % PARTICLE_SPACING;
			if (emitted > 0) host.dataset.particleEffect = "active";
		};

		const onPointerOut = (event: PointerEvent) => {
			if (!event.relatedTarget) resetPointer();
		};

		const resizeObserver =
			typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
		const intersectionObserver =
			typeof IntersectionObserver === "undefined"
				? null
				: new IntersectionObserver(
						([entry]) => {
							visible = entry?.isIntersecting ?? true;
							reconcile();
						},
						{ rootMargin: "80px" },
					);

		resize();
		resizeObserver?.observe(host);
		intersectionObserver?.observe(host);
		document.addEventListener("visibilitychange", onVisibility);
		window.addEventListener("pointermove", onPointerMove, { passive: true });
		window.addEventListener("pointerout", onPointerOut, { passive: true });
		window.addEventListener("blur", resetPointer);
		window.addEventListener("scroll", resetPointer, { passive: true });
		void document.fonts?.ready.then(() => {
			if (!disposed) resize();
		});
		reconcile();

		return () => {
			disposed = true;
			window.cancelAnimationFrame(frame);
			resizeObserver?.disconnect();
			intersectionObserver?.disconnect();
			document.removeEventListener("visibilitychange", onVisibility);
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerout", onPointerOut);
			window.removeEventListener("blur", resetPointer);
			window.removeEventListener("scroll", resetPointer);
		};
	}, [paused, reducedMotion, welcome]);

	return (
		<div
			ref={hostRef}
			className={`gradient-canvas ${className}`}
			data-animation={reducedMotion ? "reduced" : paused ? "paused" : "playing"}
		>
			<div
				aria-hidden="true"
				className="gradient-canvas-fallback absolute inset-0"
			/>
			<canvas
				ref={canvasRef}
				aria-hidden="true"
				className="absolute inset-0 size-full"
			/>
			<div
				aria-hidden="true"
				className="gradient-canvas-fade absolute inset-0"
			/>
			{!reducedMotion && (
				<Button
					type="button"
					variant="default"
					size="sm"
					className="absolute bottom-6 right-5 z-10 sm:bottom-8 sm:right-10 lg:right-16"
					aria-label={paused ? copy.motion.resume : copy.motion.pause}
					aria-pressed={paused}
					onClick={() => setPaused((value) => !value)}
				>
					{paused ? copy.motion.playShort : copy.motion.pauseShort}
				</Button>
			)}
		</div>
	);
}

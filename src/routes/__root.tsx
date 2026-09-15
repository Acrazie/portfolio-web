/// <reference types="vite/client" />

import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { NotFoundPage } from "@/components/pages/NotFoundPage";
import { ContactProvider } from "@/components/site/ContactProvider";
import { LocaleProvider } from "@/components/site/LocaleProvider";
import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ name: "robots", content: "noindex, nofollow" },
			{ title: "Mayeul — Software Engineer · AI Engineer" },
			{
				name: "description",
				content:
					"Portfolio de Mayeul, Software Engineer et AI Engineer. Logiciels fiables, IA appliquée et systèmes agentiques.",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
		],
	}),
	component: RootComponent,
	notFoundComponent: NotFoundPage,
});

function RootComponent() {
	return (
		<RootDocument>
			<LocaleProvider>
				<ContactProvider>
					<Outlet />
				</ContactProvider>
			</LocaleProvider>
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="fr">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}

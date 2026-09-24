import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/$slug")({
	beforeLoad: ({ params }) => {
		if (params.slug !== "portfolio-web") throw notFound();
		throw redirect({ to: "/", hash: "project" });
	},
});

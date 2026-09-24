import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/education")({
	beforeLoad: () => {
		throw redirect({ to: "/", hash: "education" });
	},
});

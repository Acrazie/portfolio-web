import { createFileRoute } from "@tanstack/react-router";
import { handleContact } from "@/server/contact";

export const Route = createFileRoute("/api/contact")({
	server: { handlers: { POST: ({ request }) => handleContact(request) } },
});

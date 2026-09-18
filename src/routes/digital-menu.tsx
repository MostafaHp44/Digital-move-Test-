import { createFileRoute, Navigate } from "@tanstack/react-router";

const title = "Digital Menu — Digital Mov";

export const Route = createFileRoute("/digital-menu")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: "Digital menu service - redirected to services page." },
    ],
  }),
  component: DigitalMenuRedirect,
});

function DigitalMenuRedirect() {
  return <Navigate to="/services/digital-menu" />;
}

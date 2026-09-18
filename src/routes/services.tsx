import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Services } from "@/components/site/Services";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";

const title = "Services — Digital Mov";
const description =
  "Digital menus, website design, web development, motion graphics, branding and interactive solutions from Digital Mov.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        label="Services"
        title={
          <>
            What we make <em className="not-italic text-primary">move</em>.
          </>
        }
        intro="Seven disciplines, one studio. Hover a service to see how it behaves before we ever talk about scope."
      />
      <Services />
      <FinalCTA />
    </SiteLayout>
  );
}

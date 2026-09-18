import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA } from "@/components/site/FinalCTA";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { Work } from "@/components/site/Work";

const title = "Selected Work — Digital Mov";
const description =
  "Digital menus, motion identities, brand sites and interactive kiosks designed and built by Digital Mov.";

export const Route = createFileRoute("/work")({
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
  component: WorkPage,
});

function WorkPage() {
  return (
    <SiteLayout>
      <PageHeader
        label="Selected Work"
        title={
          <>
            Projects that moved <em className="not-italic text-primary">something</em>.
          </>
        }
        intro="A short, deliberate selection. Each project is shown as one large visual moment rather than a thumbnail in a grid."
      />
      <Work heading={false} />
      <FinalCTA />
    </SiteLayout>
  );
}

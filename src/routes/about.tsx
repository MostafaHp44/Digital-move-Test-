import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { FinalCTA } from "@/components/site/FinalCTA";
import { MotionCanvas } from "@/components/site/MotionCanvas";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";

const title = "About — Digital Mov";
const description =
  "Digital Mov is a senior creative studio designing digital experiences where motion carries the meaning.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        label="About"
        title={
          <>
            A studio built around <em className="not-italic text-primary">movement</em>.
          </>
        }
        intro="Small team, senior work. We design and build the whole experience — identity, interface and the motion between them."
      />
      <About />
      <MotionCanvas />
      <FinalCTA />
    </SiteLayout>
  );
}

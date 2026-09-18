import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { DigitalMenuShowcase } from "@/components/site/DigitalMenuShowcase";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Hero } from "@/components/site/Hero";
import { MotionCanvas } from "@/components/site/MotionCanvas";
import { Services } from "@/components/site/Services";
import { SignatureSequence } from "@/components/site/SignatureSequence";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Work } from "@/components/site/Work";
import { EditorialBridge } from "@/components/site/EditorialBridge";

const title = "Digital Mov — Turning Digital Ideas Into Motion";
const description =
  "Digital Mov is a creative digital studio building websites, digital menus and interactive experiences driven by motion.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <EditorialBridge />
      <SignatureSequence />
      <Services compact />
      <Work />
      <DigitalMenuShowcase />
      <About />
      <MotionCanvas />
      <FinalCTA />
    </SiteLayout>
  );
}

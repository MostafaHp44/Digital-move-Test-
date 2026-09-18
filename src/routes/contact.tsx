import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { RevealBlock } from "@/components/site/Reveal";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { useMessages } from "@/lib/messages";

const title = "Contact — Digital Mov";
const description =
  "Start a project with Digital Mov: websites, digital menus, motion and interactive experiences.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  const { addMessage } = useMessages();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSending(true);
    try {
      await addMessage({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
      setSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      // error handled silently
    } finally {
      setSending(false);
    }
  };

  return (
    <SiteLayout>
      <PageHeader
        label="Contact"
        title={
          <>
            Tell us what should <em className="not-italic text-primary">move</em>.
          </>
        }
        intro="Send a brief, a sketch or a single sentence. We reply to every serious enquiry within two working days."
      />

      <section className="mx-auto max-w-7xl px-5 pb-32 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.75fr]">
          <RevealBlock>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl text-primary">&#10003;</span>
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold text-foreground">
                  Message sent!
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Thank you for reaching out. We'll get back to you within two working days.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 text-sm text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="group">
                  <label
                    htmlFor="name"
                    className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="mt-3 w-full border-b border-border bg-transparent pb-3 text-lg outline-none transition-colors duration-500 placeholder:text-muted-foreground/50 focus:border-primary"
                  />
                </div>
                <div className="group">
                  <label
                    htmlFor="email"
                    className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="mt-3 w-full border-b border-border bg-transparent pb-3 text-lg outline-none transition-colors duration-500 placeholder:text-muted-foreground/50 focus:border-primary"
                  />
                </div>
                <div className="group">
                  <label
                    htmlFor="subject"
                    className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What's the project?"
                    className="mt-3 w-full border-b border-border bg-transparent pb-3 text-lg outline-none transition-colors duration-500 placeholder:text-muted-foreground/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="A few lines about the idea..."
                    required
                    className="mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-lg outline-none transition-colors duration-500 placeholder:text-muted-foreground/50 focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  data-cursor="expand"
                  className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-shadow duration-500 hover:shadow-[var(--glow-md)] disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send enquiry"}
                  <span className="h-px w-5 bg-current transition-all duration-500 group-hover:w-9" />
                </button>
              </form>
            )}
          </RevealBlock>

          <RevealBlock delay={120}>
            <div className="rounded-2xl border border-border bg-surface p-8">
              <LogoMark className="h-10 w-10" />
              <p className="mt-6 font-display text-xl font-semibold tracking-tight">Digital Mov</p>
              <dl className="mt-8 space-y-6 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                    Email
                  </dt>
                  <dd className="mt-1.5">hello@digitalmov.com</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                    Studio
                  </dt>
                  <dd className="mt-1.5">Remote-first · Working worldwide</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                    New projects
                  </dt>
                  <dd className="mt-1.5">Currently booking next quarter</dd>
                </div>
              </dl>
            </div>
          </RevealBlock>
        </div>
      </section>
    </SiteLayout>
  );
}

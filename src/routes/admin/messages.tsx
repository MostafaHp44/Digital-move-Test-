import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/lib/auth";
import { useMessages, type Message } from "@/lib/messages";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, Mail, MailOpen, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const title = "Messages — Digital Mov Admin";

export const Route = createFileRoute("/admin/messages")({
  head: () => ({
    meta: [{ title }, { name: "description", content: "View client messages and enquiries." }],
  }),
  component: AdminMessagesPage,
});

function AdminMessagesPage() {
  const { user, isAuthenticated } = useAuth();
  const { messages, loading, markRead, markAllRead, deleteMessage, unreadCount } = useMessages();
  const [selected, setSelected] = useState<Message | null>(null);
  const navigate = Route.useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  const handleSelect = async (msg: Message) => {
    setSelected(msg);
    if (!msg.is_read) await markRead(msg.id);
  };

  const handleDelete = async (id: number | string) => {
    await deleteMessage(id);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Messages
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Client enquiries and contact form submissions.
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex h-5 items-center rounded-full bg-primary/10 px-2 text-[11px] font-medium text-primary">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={() => markAllRead()}>
              <CheckCheck className="h-4 w-4" />
              Mark all read
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            Loading...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface py-20 text-center">
            <Mail className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-4 font-display text-lg font-semibold text-foreground">
              No messages yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Messages from the contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-2">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleSelect(msg)}
                  className={cn(
                    "w-full rounded-xl border p-4 text-left transition-all",
                    selected?.id === msg.id
                      ? "border-primary/40 bg-primary/5"
                      : "border-border bg-surface hover:border-primary/20",
                    !msg.is_read && "border-l-2 border-l-primary",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {!msg.is_read ? (
                          <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                        ) : (
                          <MailOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                        )}
                        <p
                          className={cn(
                            "truncate text-sm",
                            !msg.is_read
                              ? "font-semibold text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {msg.name}
                        </p>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {msg.subject || "No subject"}
                      </p>
                      <p className="mt-1 line-clamp-1 text-xs text-muted-foreground/60">
                        {msg.message}
                      </p>
                    </div>
                    <span className="shrink-0 text-[10px] text-muted-foreground/50">
                      {formatTime(msg.created_at)}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="sticky top-6">
              {selected ? (
                <div className="rounded-xl border border-border bg-surface p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {selected.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-primary">{selected.email}</p>
                      {selected.subject && (
                        <p className="mt-1 text-sm text-muted-foreground">Re: {selected.subject}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 border-t border-border pt-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                      {selected.message}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Your enquiry"}`}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-medium text-primary-foreground transition-shadow hover:shadow-[var(--glow-sm)]"
                    >
                      Reply via Email
                    </a>
                    <span className="text-[10px] text-muted-foreground/50">
                      {new Date(selected.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface py-20 text-center">
                  <Eye className="h-8 w-8 text-muted-foreground/30" />
                  <p className="mt-3 text-sm text-muted-foreground">Select a message to read</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function formatTime(dateStr: string): string {
  const ts = new Date(dateStr).getTime();
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return new Date(dateStr).toLocaleDateString();
}

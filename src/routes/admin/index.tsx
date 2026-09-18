import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/lib/auth";
import { useAdminStore } from "@/lib/admin-store";
import { useMessages } from "@/lib/messages";
import { Layers, Briefcase, Mail, ArrowRight } from "lucide-react";

const title = "Dashboard — Digital Mov Admin";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title }, { name: "description", content: "Admin dashboard for Digital Mov." }],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { services, projects } = useAdminStore();
  const { messages, unreadCount } = useMessages();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome back, {user.name}. Manage your services and projects.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            to="/admin/services"
            className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/40 hover:shadow-[var(--glow-sm)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-display text-lg font-semibold text-foreground">
                {services.length}
              </p>
              <p className="text-sm text-muted-foreground">Services</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>

          <Link
            to="/admin/work"
            className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/40 hover:shadow-[var(--glow-sm)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-display text-lg font-semibold text-foreground">
                {projects.length}
              </p>
              <p className="text-sm text-muted-foreground">Projects</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>

          <Link
            to="/admin/messages"
            className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/40 hover:shadow-[var(--glow-sm)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-display text-lg font-semibold text-foreground">
                  {messages.length}
                </p>
                {unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/20 px-1.5 text-[10px] font-bold text-primary">
                    {unreadCount}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Messages</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        </div>

        {/* Recent services */}
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">Recent Services</h2>
          <div className="mt-4 space-y-2">
            {services.slice(0, 3).map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-lg border border-border bg-surface p-4"
              >
                <div>
                  <p className="font-medium text-foreground">{s.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{s.subtitle}</p>
                </div>
                <a
                  href={`/service/${s.id}`}
                  className="text-xs text-primary hover:underline"
                  target="_blank"
                >
                  View page
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { useMessages } from "@/lib/messages";
import { LayoutDashboard, Layers, Briefcase, Mail, LogOut, ChevronLeft } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/services", label: "Services", icon: Layers },
  { to: "/admin/work", label: "Selected Work", icon: Briefcase },
  { to: "/admin/messages", label: "Messages", icon: Mail },
] as const;

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const { unreadCount } = useMessages();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "sticky top-0 flex h-screen flex-col border-r border-border bg-ink transition-all duration-300",
          collapsed ? "w-16" : "w-60",
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center border-b border-border px-4">
          {!collapsed && (
            <span className="font-display text-sm font-bold tracking-tight text-foreground">
              Digital Mov
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "ml-auto flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-surface hover:text-foreground",
              collapsed && "ml-0",
            )}
          >
            <ChevronLeft
              className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")}
            />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-2">
          {NAV.map((item) => {
            const isActive =
              item.to === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.to);
            const showBadge = item.to === "/admin/messages" && unreadCount > 0;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground",
                  collapsed && "justify-center px-2",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {showBadge && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                        {unreadCount}
                      </span>
                    )}
                  </>
                )}
                {collapsed && showBadge && (
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-border p-3">
          {!collapsed && <p className="truncate text-xs text-muted-foreground">{user.email}</p>}
          <button
            onClick={logout}
            className={cn(
              "mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground",
              collapsed && "justify-center px-2",
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl p-6 sm:p-10">{children}</div>
      </main>
    </div>
  );
}

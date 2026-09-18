import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/lib/auth";
import { useAdminStore, type Service } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, X, Save, Eye } from "lucide-react";
import { MediaUpload } from "@/components/admin/MediaUpload";

export const Route = createFileRoute("/admin/services")({
  component: AdminServicesPage,
});

function AdminServicesPage() {
  const { user, isAuthenticated } = useAuth();
  const { services, loading, addService, updateService, deleteService } = useAdminStore();
  const [editing, setEditing] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = Route.useNavigate();

  if (!isAuthenticated || !user) {
    navigate({ to: "/admin/login" });
    return null;
  }

  const handleSave = async (data: {
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    features: string[];
    media_url: string;
    media_type: "image" | "video";
  }) => {
    setSaving(true);
    try {
      if (editing) {
        await updateService(editing.id, data);
        toast.success("Service updated successfully.");
      } else {
        await addService({
          ...data,
          sort_order: services.length,
          is_active: true,
        });
        toast.success("Service created successfully.");
      }
      setShowForm(false);
      setEditing(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (confirm("Delete this service? This cannot be undone.")) {
      try {
        await deleteService(id);
        toast.success("Service deleted.");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to delete service.";
        toast.error(msg);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Services
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your service offerings. Each service gets its own public page.
            </p>
          </div>
          <Button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </div>

        {showForm && (
          <ServiceForm
            service={editing}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
            saving={saving}
          />
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            Loading...
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((s, i) => (
              <div
                key={s.id}
                className="group flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/30"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {s.title}
                    </h3>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                      {s.icon}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{s.subtitle}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(s.features ?? []).slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-ink px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                    {(s.features ?? []).length > 4 && (
                      <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] text-muted-foreground">
                        +{(s.features ?? []).length - 4}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={`/service/${s.id}`}
                    target="_blank"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                  >
                    <Eye className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => {
                      setEditing(s);
                      setShowForm(true);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function ServiceForm({
  service,
  onSave,
  onCancel,
  saving,
}: {
  service: Service | null;
  onSave: (data: {
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    features: string[];
    media_url: string;
    media_type: "image" | "video";
  }) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [title, setTitle] = useState(service?.title ?? "");
  const [subtitle, setSubtitle] = useState(service?.subtitle ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [icon, setIcon] = useState(service?.icon ?? "");
  const [featuresText, setFeaturesText] = useState((service?.features ?? []).join(", "));
  const [mediaUrl, setMediaUrl] = useState(service?.media_url ?? "");
  const [mediaType, setMediaType] = useState<"image" | "video">(service?.media_type ?? "image");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      subtitle,
      description,
      icon: icon || title.slice(0, 2).toUpperCase(),
      features: featuresText
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      media_url: mediaUrl,
      media_type: mediaType,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-primary/30 bg-surface p-6 space-y-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {service ? "Edit Service" : "New Service"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-2"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="svc-title">Title</Label>
          <Input
            id="svc-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digital Menu"
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="svc-icon">Icon (2 letters)</Label>
          <Input
            id="svc-icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="QR"
            maxLength={4}
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="svc-subtitle">Subtitle</Label>
        <textarea
          id="svc-subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Short tagline for the services list..."
          rows={2}
          required
          className="mt-1.5 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <div>
        <Label htmlFor="svc-desc">Full Description</Label>
        <textarea
          id="svc-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description for the service page..."
          rows={4}
          className="mt-1.5 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <div>
        <Label htmlFor="svc-features">Features (comma separated)</Label>
        <Input
          id="svc-features"
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          placeholder="QR Code Access, Online Ordering, Payment Integration"
          className="mt-1.5"
        />
      </div>

      <div>
        <Label>Media (Image or Video)</Label>
        <MediaUpload
          value={mediaUrl}
          type={mediaType}
          onChange={(url, detectedType) => {
            setMediaUrl(url);
            setMediaType(detectedType);
          }}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : service ? "Update" : "Create"} Service
        </Button>
      </div>
    </form>
  );
}

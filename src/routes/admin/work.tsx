import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/lib/auth";
import { useAdminStore, type WorkProject } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, X, Save, Play } from "lucide-react";
import { MediaUpload } from "@/components/admin/MediaUpload";

export const Route = createFileRoute("/admin/work")({
  component: AdminWorkPage,
});

function AdminWorkPage() {
  const { user, isAuthenticated } = useAuth();
  const { projects, loading, addProject, updateProject, deleteProject } = useAdminStore();
  const [editing, setEditing] = useState<WorkProject | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = Route.useNavigate();

  if (!isAuthenticated || !user) {
    navigate({ to: "/admin/login" });
    return null;
  }

  const handleSave = async (data: {
    title: string;
    category: string;
    year: string;
    blurb: string;
    media_url: string;
    media_type: "image" | "video";
  }) => {
    setSaving(true);
    try {
      if (editing) {
        await updateProject(editing.id, data);
        toast.success("Project updated successfully.");
      } else {
        await addProject({
          ...data,
          sort_order: projects.length,
          is_active: true,
        });
        toast.success("Project created successfully.");
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
    if (confirm("Delete this project? This cannot be undone.")) {
      try {
        await deleteProject(id);
        toast.success("Project deleted.");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to delete project.";
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
              Selected Work
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your portfolio projects. Add images or videos.
            </p>
          </div>
          <Button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        {showForm && (
          <ProjectForm
            project={editing}
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
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-primary/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                  {p.media_url ? (
                    p.media_type === "video" ? (
                      <video
                        src={p.media_url}
                        className="h-full w-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img src={p.media_url} alt={p.title} className="h-full w-full object-cover" />
                    )
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground text-xs">
                      No media
                    </div>
                  )}
                  {p.media_type === "video" && (
                    <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink/80">
                      <Play className="h-3 w-3 text-primary" />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-primary">
                        {p.category} · {p.year}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.blurb}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditing(p);
                          setShowForm(true);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function ProjectForm({
  project,
  onSave,
  onCancel,
  saving,
}: {
  project: WorkProject | null;
  onSave: (data: {
    title: string;
    category: string;
    year: string;
    blurb: string;
    media_url: string;
    media_type: "image" | "video";
  }) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [category, setCategory] = useState(project?.category ?? "");
  const [year, setYear] = useState(project?.year ?? new Date().getFullYear().toString());
  const [blurb, setBlurb] = useState(project?.blurb ?? "");
  const [mediaUrl, setMediaUrl] = useState(project?.media_url ?? "");
  const [mediaType, setMediaType] = useState<"image" | "video">(project?.media_type ?? "image");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      category,
      year,
      blurb,
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
          {project ? "Edit Project" : "New Project"}
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
          <Label htmlFor="proj-title">Title</Label>
          <Input
            id="proj-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Name"
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="proj-category">Category</Label>
          <Input
            id="proj-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Digital Menu"
            required
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="proj-year">Year</Label>
          <Input
            id="proj-year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2026"
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="proj-blurb">Description</Label>
          <textarea
            id="proj-blurb"
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
            placeholder="A short description of the project..."
            rows={2}
            required
            className="mt-1.5 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
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
          {saving ? "Saving..." : project ? "Update" : "Create"} Project
        </Button>
      </div>
    </form>
  );
}

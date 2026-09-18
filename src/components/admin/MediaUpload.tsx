import { useRef, useState } from "react";
import { Upload, X, Film, Image } from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE =
  import.meta.env["VITE_API_URL"] || "http://localhost:8000/api";

interface MediaUploadProps {
  value: string;
  type: "image" | "video";
  onChange: (url: string, type: "image" | "video") => void;
}

export function MediaUpload({ value, type, onChange }: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      alert("Please select an image or video file.");
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        onChange(response.url, response.type);
      } else {
        alert("Upload failed. Please try again.");
      }
      setUploading(false);
      setProgress(0);
    });

    xhr.addEventListener("error", () => {
      alert("Upload failed. Please try again.");
      setUploading(false);
      setProgress(0);
    });

    xhr.open("POST", `${API_BASE}/media/upload`);
    xhr.withCredentials = true;
    xhr.send(formData);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const clear = () => {
    onChange("", "image");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {/* Preview */}
      {value && (
        <div className="relative overflow-hidden rounded-lg border border-border">
          <div className="relative aspect-[16/10] bg-ink">
            {type === "video" ? (
              <video
                src={value}
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img src={value} alt="Preview" className="h-full w-full object-cover" />
            )}
          </div>
          <button
            type="button"
            onClick={clear}
            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink/80 text-foreground backdrop-blur-sm transition-colors hover:bg-destructive/80 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] text-muted-foreground backdrop-blur-sm">
            {type === "video" ? (
              <Film className="h-3 w-3 text-primary" />
            ) : (
              <Image className="h-3 w-3 text-primary" />
            )}
            {type === "video" ? "Video" : "Image"}
          </div>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors",
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/40 hover:bg-surface",
          value && "p-3",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-5 w-5 text-primary animate-pulse" />
            <div className="w-full max-w-[200px]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-muted-foreground">Uploading...</span>
                <span className="text-[10px] text-primary font-medium">{progress}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <Upload
              className={cn("h-5 w-5", dragging ? "text-primary" : "text-muted-foreground")}
            />
            {!value && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Drop a file here or <span className="text-primary">browse</span>
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground/60">
                  Images and videos supported
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* URL input as fallback */}
      <div>
        <input
          type="text"
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => {
            const url = e.target.value;
            const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(url);
            onChange(url, isVideo ? "video" : "image");
          }}
          placeholder="Or paste an image/video URL..."
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>
    </div>
  );
}

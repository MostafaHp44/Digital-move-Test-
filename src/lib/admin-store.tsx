import { useState, createContext, useContext, type ReactNode } from "react";
import work1 from "@/assets/digital video.mp4";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

export interface Service {
  id: number | string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  media_url: string;
  media_type: "image" | "video";
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface WorkProject {
  id: number | string;
  title: string;
  category: string;
  year: string;
  blurb: string;
  media_url: string;
  media_type: "image" | "video";
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

const STATIC_PROJECTS: WorkProject[] = [
  {
    id: 1,
    title: "Noir Table",
    category: "Digital Menu",
    year: "2026",
    blurb: "A fine-dining menu experience where every category transition is choreographed.",
    media_url: work1,
    media_type: "video",
    sort_order: 1,
    is_active: true,
    created_at: "2026-01-01",
  },
  {
    id: 2,
    title: "Velocity",
    category: "Motion Identity",
    year: "2025",
    blurb: "A brand system built entirely around light trails and momentum.",
    media_url: work2,
    media_type: "image",
    sort_order: 2,
    is_active: true,
    created_at: "2025-01-01",
  },
  {
    id: 3,
    title: "Aurora",
    category: "Brand & Web",
    year: "2025",
    blurb: "Members-only club identity, from print edges to interactive invitations.",
    media_url: work3,
    media_type: "image",
    sort_order: 3,
    is_active: true,
    created_at: "2025-01-01",
  },
  {
    id: 4,
    title: "Vellora",
    category: "Interactive Kiosk",
    year: "2026",
    blurb: "Lobby check-in experience running across hotel screens in four languages.",
    media_url: work4,
    media_type: "image",
    sort_order: 4,
    is_active: true,
    created_at: "2026-01-01",
  },
];

const STATIC_SERVICES: Service[] = [
  {
    id: "digital-menu",
    title: "Digital Menu",
    subtitle: "QR-first menus that feel like an app.",
    description:
      "Complete digital menu solution with QR codes, online ordering, payment integration and delivery service connectivity.",
    icon: "utensils",
    features: ["QR Code Access", "PDF Menu", "Online Menu", "Direct Ordering", "Online Payment", "Delivery Integration"],
    media_url: work1,
    media_type: "image",
    sort_order: 1,
    is_active: true,
    created_at: "2026-01-01",
  },
  {
    id: "branding",
    title: "Branding & Graphic Design",
    subtitle: "Visual identities that leave a mark.",
    description:
      "Complete visual designs for restaurants, cafés and businesses — from menus to social media, packaging to promotional items.",
    icon: "palette",
    features: ["Menu & Leaflets", "Stickers & Packaging", "Caps & Promo Items", "Social Media Graphics", "Banners", "Printed Materials"],
    media_url: work2,
    media_type: "image",
    sort_order: 2,
    is_active: true,
    created_at: "2025-01-01",
  },
  {
    id: "website",
    title: "Website Development",
    subtitle: "Complete web solutions, designed to perform.",
    description:
      "Full-stack website development with admin dashboard, so you can manage your content, products and orders — no developer needed.",
    icon: "code",
    features: ["UI/UX Design", "Front-End & Back-End", "Database & APIs", "Payment Integration", "Responsive Design", "Admin Dashboard"],
    media_url: work3,
    media_type: "image",
    sort_order: 3,
    is_active: true,
    created_at: "2025-01-01",
  },
  {
    id: "business-card",
    title: "Digital Business Card",
    subtitle: "Your identity, one tap away.",
    description:
      "Modern digital business cards accessible via NFC tap or QR code scan — instant access to contact information.",
    icon: "credit-card",
    features: ["NFC Card / Tag", "QR Code Access", "Instant Contact Sharing", "Custom Design", "Mobile Optimized", "Easy Updates"],
    media_url: work4,
    media_type: "image",
    sort_order: 4,
    is_active: true,
    created_at: "2026-01-01",
  },
];

interface AdminStore {
  services: Service[];
  projects: WorkProject[];
  loading: boolean;
  fetchServices: () => Promise<void>;
  fetchProjects: () => Promise<void>;
  addService: (data: Omit<Service, "id" | "created_at">) => Promise<Service>;
  updateService: (id: number | string, data: Partial<Service>) => Promise<void>;
  deleteService: (id: number | string) => Promise<void>;
  addProject: (data: Omit<WorkProject, "id" | "created_at">) => Promise<WorkProject>;
  updateProject: (id: number | string, data: Partial<WorkProject>) => Promise<void>;
  deleteProject: (id: number | string) => Promise<void>;
}

const AdminStoreContext = createContext<AdminStore | null>(null);

export function AdminStoreProvider({ children }: { children: ReactNode }) {
  const [services] = useState<Service[]>(STATIC_SERVICES);
  const [projects] = useState<WorkProject[]>(STATIC_PROJECTS);

  const noopAsync = async () => {};

  return (
    <AdminStoreContext.Provider
      value={{
        services,
        projects,
        loading: false,
        fetchServices: noopAsync,
        fetchProjects: noopAsync,
        addService: async (d) => ({ ...d, id: 0, created_at: "" }),
        updateService: noopAsync,
        deleteService: noopAsync,
        addProject: async (d) => ({ ...d, id: 0, created_at: "" }),
        updateProject: noopAsync,
        deleteProject: noopAsync,
      }}
    >
      {children}
    </AdminStoreContext.Provider>
  );
}

export function useAdminStore() {
  const ctx = useContext(AdminStoreContext);
  if (!ctx) throw new Error("useAdminStore must be used within AdminStoreProvider");
  return ctx;
}

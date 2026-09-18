const API_BASE =
  import.meta.env["VITE_API_URL"] || "http://localhost:8000/api";

interface ApiOptions {
  method?: string;
  body?: unknown;
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function api<T = unknown>(path: string, opts: ApiOptions = {}): Promise<T> {
  const { method = "GET", body } = opts;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const init: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (body) init.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, init);

  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg =
      typeof data === "object" && data !== null && "message" in data
        ? (data as { message: string }).message
        : `API error ${res.status}`;
    throw new ApiError(res.status, msg, data);
  }

  return data as T;
}

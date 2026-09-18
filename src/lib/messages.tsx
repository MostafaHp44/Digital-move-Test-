import { useState, useCallback, createContext, useContext, type ReactNode } from "react";

export interface Message {
  id: number | string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface MessagesStore {
  messages: Message[];
  loading: boolean;
  fetchMessages: () => Promise<void>;
  addMessage: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => Promise<Message>;
  markRead: (id: number | string) => Promise<void>;
  markAllRead: () => Promise<void>;
  deleteMessage: (id: number | string) => Promise<void>;
  unreadCount: number;
}

const MessagesContext = createContext<MessagesStore | null>(null);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages] = useState<Message[]>([]);

  const addMessage = useCallback(
    async (data: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }): Promise<Message> => {
      await new Promise((r) => setTimeout(r, 800));
      const msg: Message = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        is_read: false,
        created_at: new Date().toISOString(),
      };
      return msg;
    },
    [],
  );

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <MessagesContext.Provider
      value={{
        messages,
        loading: false,
        fetchMessages: async () => {},
        addMessage,
        markRead: async () => {},
        markAllRead: async () => {},
        deleteMessage: async () => {},
        unreadCount,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error("useMessages must be used within MessagesProvider");
  return ctx;
}

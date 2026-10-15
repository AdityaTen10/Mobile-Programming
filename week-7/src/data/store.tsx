import { createContext, useContext, useState, ReactNode } from "react";

// This file is our "fake database".
// It lives only in the phone memory (no internet needed).
// All pages share it, so booking a token updates Home + Queue + Records.

export type QueuePerson = {
  token: string; // like "A-023"
  initial: string; // "S" only, for privacy (no full name)
  service: string; // which service they came for
  isMe: boolean; // true only for YOU
};

export type RecordItem = {
  id: string;
  service: string;
  token: string;
  date: string;
  docs: string[]; // what document you gave (names)
  photos: string[]; // photo file paths (uri) you uploaded - so you can see them later
  status: string; // Pending / Ready / Submitted
};

type AppData = {
  myToken: string;
  queue: QueuePerson[];
  records: RecordItem[];
  nowServing: string;
  peopleAhead: number;
  bookToken: (service: string, docs: string[], photos: string[]) => string;
};

// First demo data: you are A-023, 2 people ahead of you.
const FIRST_QUEUE: QueuePerson[] = [
  { token: "A-020", initial: "R", service: "Citizenship", isMe: false }, // <-- being served now
  { token: "A-021", initial: "K", service: "Passport", isMe: false },
  { token: "A-022", initial: "M", service: "Birth Certificate", isMe: false },
  { token: "A-023", initial: "S", service: "Birth Certificate", isMe: true }, // <-- YOU
  { token: "A-024", initial: "B", service: "Marriage", isMe: false },
  { token: "A-025", initial: "G", service: "Land Transfer", isMe: false },
];

const FIRST_RECORDS: RecordItem[] = [
  {
    id: "1",
    service: "Citizenship",
    token: "A-011",
    date: "2026-09-20",
    docs: ["Citizenship form", "Parent citizenship photo"],
    photos: [], // old record has no photos saved
    status: "Ready ✅",
  },
];

let tokenCounter = 26; // next new token will be A-026

const AppContext = createContext<AppData | null>(null);

// Wrap the whole app in this (see _layout.tsx)
export function TokenProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<QueuePerson[]>(FIRST_QUEUE);
  const [records, setRecords] = useState<RecordItem[]>(FIRST_RECORDS);
  const [myToken, setMyToken] = useState("A-023");

  // First person in list = now serving
  const nowServing = queue[0]?.token ?? "-";

  // Count how many are before me
  const myIndex = queue.findIndex((q) => q.token === myToken);
  const peopleAhead = myIndex > 0 ? myIndex - 1 : 0; // -1 to skip "now serving"

  // Called from Birth page when you press "Book token"
  function bookToken(service: string, docs: string[], photos: string[]) {
    const newToken = `A-0${tokenCounter}`; // A-026, A-027...
    tokenCounter += 1;
    const oldToken = myToken;

    // 1. Mark old token as not-me, add new token at end (behind everyone)
    setQueue((old) => [
      ...old.map((q) => (q.token === oldToken ? { ...q, isMe: false } : q)),
      { token: newToken, initial: "S", service, isMe: true },
    ]);
    setMyToken(newToken);

    // 3. Add to My Records (what document + what photos I gave)
    const today = new Date().toISOString().slice(0, 10);
    setRecords((old) => [
      { id: Date.now().toString(), service, token: newToken, date: today, docs, photos, status: "Pending ⏳" },
      ...old,
    ]);

    return newToken;
  }

  return (
    <AppContext.Provider value={{ myToken, queue, records, nowServing, peopleAhead, bookToken }}>
      {children}
    </AppContext.Provider>
  );
}

// Easy shortcut: const { myToken, queue } = useApp()
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside TokenProvider");
  return ctx;
}

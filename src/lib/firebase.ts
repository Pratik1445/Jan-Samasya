import { initializeApp, getApps } from "firebase/app";
import { initializeFirestore, serverTimestamp, collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlictGcM3RZ7DtWBLQY061GjuysTgDwng",
  authDomain: "jansamasya-28cb1.firebaseapp.com",
  projectId: "jansamasya-28cb1",
  storageBucket: "jansamasya-28cb1.firebasestorage.app",
  messagingSenderId: "371398389918",
  appId: "1:371398389918:web:5a3ed61ad5cb2207800b8f",
  measurementId: "G-QJKKXJ7E5P",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
export const auth = getAuth(app);

// Ensure we have an authenticated context (anonymous) for Firestore rules requiring auth
signInAnonymously(auth).catch(() => {
  // noop – we still allow unauthenticated usage if rules permit
});

export interface CivicReport {
  category: string;
  description: string;
  locationText: string;
  latitude?: number;
  longitude?: number;
  priority: "low" | "medium" | "high" | "urgent";
  status?: "pending" | "in-progress" | "resolved";
  photos?: string[];
  voiceNoteUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  uid?: string;
  createdAt?: any;
}

export async function saveReport(report: CivicReport) {
  // Build payload without undefined fields (Firestore rejects undefined)
  const payload: Record<string, any> = {
    category: report.category,
    description: report.description,
    locationText: report.locationText,
    priority: report.priority,
    status: report.status ?? "pending",
    createdAt: serverTimestamp(),
  };
  if (typeof report.uid === "string") payload.uid = report.uid;

  if (typeof report.latitude === "number") payload.latitude = report.latitude;
  if (typeof report.longitude === "number") payload.longitude = report.longitude;
  if (Array.isArray(report.photos)) payload.photos = report.photos;
  if (typeof report.voiceNoteUrl === "string") payload.voiceNoteUrl = report.voiceNoteUrl;
  if (typeof report.audioUrl === "string") payload.audioUrl = report.audioUrl;
  if (typeof report.videoUrl === "string") payload.videoUrl = report.videoUrl;

  // Generate a human-friendly ticket id for user-facing tracking
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  payload.ticketId = `CIV-${year}-${rand}`;

  const docRef = await addDoc(collection(db, "reports"), payload);
  return { id: docRef.id, ticketId: payload.ticketId };
}

export type ReportDoc = CivicReport & { id: string; createdAt?: Date; ticketId?: string };

export function subscribeToReports(onChange: (reports: ReportDoc[]) => void) {
  const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const items: ReportDoc[] = snap.docs.map((d) => {
      const data: any = d.data();
      return {
        id: d.id,
        category: data.category,
        description: data.description ?? "",
        locationText: data.locationText ?? "",
        latitude: typeof data.latitude === "number" ? data.latitude : undefined,
        longitude: typeof data.longitude === "number" ? data.longitude : undefined,
        priority: data.priority,
        status: (data.status as any) ?? "pending",
        photos: Array.isArray(data.photos) ? data.photos : undefined,
        voiceNoteUrl: typeof data.voiceNoteUrl === "string" ? data.voiceNoteUrl : undefined,
        audioUrl: typeof data.audioUrl === "string" ? data.audioUrl : undefined,
        videoUrl: typeof data.videoUrl === "string" ? data.videoUrl : undefined,
        uid: typeof data.uid === "string" ? data.uid : undefined,
        ticketId: typeof data.ticketId === "string" ? data.ticketId : undefined,
        createdAt: data.createdAt?.toDate?.() ?? undefined,
      } as ReportDoc;
    });
    onChange(items);
  });
}

export async function updateReportStatus(reportId: string, status: "pending" | "in-progress" | "resolved") {
  const ref = doc(db, "reports", reportId);
  await updateDoc(ref, { status, updatedAt: serverTimestamp() });
}



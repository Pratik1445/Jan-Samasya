import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://plapkoibvpjjtscmvtzh.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYXBrb2lidnBqanRzY212dHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMDUwNTksImV4cCI6MjA3Mzc4MTA1OX0.wRVo_pXPen88kM4Nd1-3-OxJkfJXw9qchZdLs18pGHA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BUCKET = "report-media";

export async function uploadFileAndGetSignedUrl(
  file: File,
  destPath: string,
  expiresInSeconds = 60 * 60 * 24 * 7 // 7 days
) {
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(destPath, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type || undefined,
  });
  if (upErr) throw upErr;

  const { data: signed, error: signErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(destPath, expiresInSeconds);
  if (signErr) throw signErr;
  return signed.signedUrl as string;
}

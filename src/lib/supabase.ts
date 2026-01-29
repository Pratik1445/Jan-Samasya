import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://yfgevkgeohojmtgqqhig.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmZ2V2a2dlb2hvam10Z3FxaGlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MTE5NzMsImV4cCI6MjA4NDk4Nzk3M30.MQGI85PYzHwCq2oc0IfLIeEc0ky14jfvIO_Dw6Ld6gI";

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

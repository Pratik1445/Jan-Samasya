const DEFAULT_MODEL = "gemini-1.5-pro-latest";

function getApiKey(): string {
  return (
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    "AIzaSyC08Uq7xrZjW1HtwKPPwxLYsY4dsLmpx-s"
  );
}

export async function generateBotReply(
  userMessage: string,
  history: Array<{ role: "user" | "model"; text: string }>,
  systemInstruction: string,
  model: string = DEFAULT_MODEL
): Promise<string> {
  const key = getApiKey();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const contents = [
    ...history.map((h) => ({ role: h.role, parts: [{ text: h.text }] })),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const body = {
    systemInstruction: { role: "user", parts: [{ text: systemInstruction }] },
    contents,
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 512,
    },
  } as any;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": key,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let msg = await res.text();
    try {
      const j = JSON.parse(msg);
      msg = j?.error?.message || msg;
    } catch {}
    throw new Error(`Gemini error ${res.status}: ${msg}`);
  }
  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("\n") ||
    "Sorry, I couldn’t generate a response.";
  return text;
}



import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CONTACT_EMAIL = "by.marc.eml@gmail.com";
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const attempts = new Map<string, { count: number; resetAt: number }>();

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(120).refine((value) => !/[\r\n]/.test(value)),
  message: z.string().trim().min(20).max(5000),
  website: z.string().max(200).optional().default(""),
});

function getClientIdentifier(request: NextRequest) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function hasExceededRateLimit(identifier: string) {
  const now = Date.now();
  const current = attempts.get(identifier);

  if (!current || current.resetAt <= now) {
    attempts.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host.split(",")[0]?.trim();
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ message: "Requête non autorisée." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 15_000) {
    return NextResponse.json({ message: "Le message est trop volumineux." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Le formulaire est invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Vérifiez les champs du formulaire avant de réessayer." },
      { status: 400 },
    );
  }

  // Honeypot : une réponse positive évite d'aider les robots à contourner le filtre.
  if (parsed.data.website) {
    return NextResponse.json({ message: "Message envoyé." });
  }

  const clientIdentifier = getClientIdentifier(request);
  if (hasExceededRateLimit(clientIdentifier)) {
    return NextResponse.json(
      { message: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Marc-Emmanuel <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is missing.");
    return NextResponse.json(
      { message: "Le service d’envoi n’est pas encore configuré. Utilisez l’adresse e-mail affichée." },
      { status: 503 },
    );
  }

  const { name, email, subject, message } = parsed.data;
  let resendResponse: Response;

  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "marc-emmanuel-portfolio/1.0",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: [
          "Nouveau message envoyé depuis le portfolio",
          `Nom : ${name}`,
          `E-mail : ${email}`,
          `Objet : ${subject}`,
          "",
          message,
        ].join("\n"),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("Contact form: unable to reach Resend.", error);
    return NextResponse.json(
      { message: "Le service d’envoi est temporairement indisponible. Réessayez plus tard." },
      { status: 502 },
    );
  }

  if (!resendResponse.ok) {
    const providerError = await resendResponse.text();
    console.error(`Contact form: Resend returned ${resendResponse.status}: ${providerError}`);
    return NextResponse.json(
      { message: "Le service d’envoi est temporairement indisponible. Réessayez plus tard." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Message envoyé." });
}

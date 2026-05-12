import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function sanitize(s: unknown): string {
  return String(s ?? "").replace(/[<>]/g, "").trim().slice(0, 500);
}

const rateMap = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Trop de demandes. Réessayez dans une minute." }, { status: 429 });
  }

  try {
    const body = await req.json();

    const service    = sanitize(body.service);
    const name       = sanitize(body.name);
    const email      = sanitize(body.email);
    const phone      = sanitize(body.phone);
    const date       = sanitize(body.date);
    const passengers = sanitize(body.passengers);
    const departure  = sanitize(body.departure);
    const destination = sanitize(body.destination);
    const message    = sanitize(body.message);

    // Validate required fields
    if (!name || !email || !service) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8f6f1;padding:30px;">
        <div style="background:#0B1F3A;padding:20px 30px;margin-bottom:24px;">
          <h1 style="color:#C9A96E;margin:0;font-size:22px;letter-spacing:4px;">RIVIORA</h1>
          <p style="color:#fff;margin:4px 0 0;font-size:13px;">Nouvelle demande de réservation</p>
        </div>
        <table style="width:100%;border-collapse:collapse;background:#fff;">
          ${[
            ["Service", service],
            ["Nom", name],
            ["Email", email],
            ["Téléphone", phone || "Non renseigné"],
            ["Date", date || "Non renseignée"],
            ["Passagers", passengers || "Non renseigné"],
            ["Départ", departure || "Non renseigné"],
            ["Destination", destination || "Non renseignée"],
            ["Message", message || "—"],
          ].map(([k, v]) => `
            <tr>
              <td style="padding:12px 16px;border-bottom:1px solid #f0ede8;font-weight:700;color:#0B1F3A;width:140px;font-size:13px;">${k}</td>
              <td style="padding:12px 16px;border-bottom:1px solid #f0ede8;color:#444;font-size:13px;">${v}</td>
            </tr>`).join("")}
        </table>
        <div style="background:#0B1F3A;padding:16px 24px;margin-top:24px;">
          <p style="color:#C9A96E;margin:0;font-size:12px;">Répondre à : <a href="mailto:${email}" style="color:#C9A96E;">${email}</a> · Tél : ${phone || "—"}</p>
        </div>
      </div>`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "ssl0.ovh.net",
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER ?? "contact@riviora.fr",
        pass: process.env.SMTP_PASS ?? "",
      },
    });

    await transporter.sendMail({
      from: `"Riviora Réservations" <contact@riviora.fr>`,
      to: "contact@riviora.fr",
      replyTo: email,
      subject: `[RIVIORA] Nouvelle demande — ${service} · ${name}`,
      html: htmlBody,
    });

    // WhatsApp message URL (returned to client to open)
    const waText = encodeURIComponent(
      `🌊 *Nouvelle réservation RIVIORA*\n\n` +
      `*Service :* ${service}\n` +
      `*Nom :* ${name}\n` +
      `*Tél :* ${phone || "—"}\n` +
      `*Date :* ${date || "—"}\n` +
      `*Passagers :* ${passengers || "—"}\n` +
      `*Départ :* ${departure || "—"}\n` +
      `*Destination :* ${destination || "—"}\n` +
      `*Message :* ${message || "—"}`
    );

    return NextResponse.json({
      success: true,
      waUrl: `https://wa.me/33787248691?text=${waText}`,
    });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Erreur serveur. Veuillez nous appeler." }, { status: 500 });
  }
}

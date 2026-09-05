import { NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { notifyClinic, notifyPatient } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = appointmentSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Please check the highlighted fields." }, { status: 400 });

    const a = parsed.data;
    const sql = db();
    const rows = await sql`
      INSERT INTO appointments (full_name, phone, email, preferred_date, preferred_time, service, message, status)
      VALUES (${a.full_name}, ${a.phone}, ${a.email || null}, ${a.preferred_date}, ${a.preferred_time}, ${a.service}, ${a.message || null}, 'PENDING')
      RETURNING *
    `;
    const data = rows[0];

    try {
      await notifyClinic(data);
      await notifyPatient(data);
    } catch (e) {
      console.error("Appointment email notification failed", e instanceof Error ? e.message : "unknown");
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Appointment submission failed", e instanceof Error ? e.message : "unknown");
    return NextResponse.json({ error: "We couldn't submit your request right now. Please try again or contact the clinic directly." }, { status: 500 });
  }
}

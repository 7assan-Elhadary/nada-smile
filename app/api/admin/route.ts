import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const appointments = await db()`SELECT * FROM appointments ORDER BY created_at DESC`;
    return NextResponse.json({ appointments });
  } catch (e) {
    console.error("Admin load failed", e instanceof Error ? e.message : "unknown");
    return NextResponse.json({ error: "Unable to load appointments." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    if (typeof body.id !== "string") return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    if (!["PENDING", "CONFIRMED", "CANCELLED"].includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    const note = typeof body.admin_note === "string" && body.admin_note.length <= 1000 ? body.admin_note : null;
    const status = body.status;

    await db()`
      UPDATE appointments
      SET status = ${status}::appointment_status,
          admin_note = ${note},
          confirmed_at = CASE WHEN ${status} = 'CONFIRMED' THEN now() ELSE NULL END,
          cancelled_at = CASE WHEN ${status} = 'CANCELLED' THEN now() ELSE NULL END
      WHERE id = ${body.id}::uuid
    `;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Admin update failed", e instanceof Error ? e.message : "unknown");
    return NextResponse.json({ error: "Unable to update appointment." }, { status: 500 });
  }
}

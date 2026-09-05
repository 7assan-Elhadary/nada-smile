"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      if (!r.ok) throw new Error();
      location.href = "/admin";
    } catch { setError("Unable to sign in. Check your credentials."); }
    finally { setLoading(false); }
  }

  return <section className="section"><div className="container max-w-md"><div className="eyebrow">NADA SMILE · ADMIN</div><h1 className="h2 mt-4">Secure dashboard</h1><p className="body mt-4">Sign in with the clinic administrator account.</p><form onSubmit={login} className="card mt-8 grid gap-5 p-7"><div><label className="mb-2 block text-sm font-semibold">Email</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-xl border border-[#d9e6e4] px-4 py-3"/></div><div><label className="mb-2 block text-sm font-semibold">Password</label><input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-xl border border-[#d9e6e4] px-4 py-3"/></div>{error&&<p role="alert" className="text-sm text-red-700">{error}</p>}<button disabled={loading} className="btn btn-primary">{loading?"Signing in…":"Sign in"}</button></form></div></section>
}

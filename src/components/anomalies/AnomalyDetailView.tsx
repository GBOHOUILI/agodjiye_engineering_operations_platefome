"use client";
import Link from "next/link";
import { useState } from "react";
import { Back, Badge, fmt, NotFoundCard } from "@/components/shared/ui";
import { useDemoStore } from "@/hooks/demo-store";
import { justificationSchema } from "@/lib/validations/anomaly";
import { nextStatut } from "@/services/anomalies.service";
import { getComponent } from "@/services/components.service";
import { STATUTS } from "@/types";
export default function AnomalyDetailView({ id }: { id: string }) {
  const { anos, notes, setStatut, addNote } = useDemoStore(); const [just, setJust] = useState(""), [t, setT] = useState(""), [err, setErr] = useState("");
  const a = anos.find(x => x.id === id);
  if (!a) return <NotFoundCard href="/anomalies" l="Retour aux anomalies" />;
  const i = STATUTS.indexOf(a.s), next = nextStatut(a), tl = [...a.tl, ...(notes[a.id] || [])];
  const adv = () => { if (!next) return; if (next === "Résolue") { const r = justificationSchema.safeParse(just); if (!r.success) return setErr(r.error.issues[0].message); if (!window.confirm("Confirmer la résolution de cette anomalie ?")) return; } setErr(""); setStatut(a.id, next, next === "Résolue" ? just.trim() : ""); setJust(""); };
  return (<><Back href="/anomalies" l="Anomalies" />
    <div className={`card mb-4 ${a.g === "Critique" && a.s !== "Résolue" ? "border-l-4 border-l-red-600" : ""}`}><div className="flex flex-wrap items-start justify-between gap-2"><div><div className="text-xs text-slate-500">{a.id} · {a.cat} · déclarée le {fmt(a.date)}</div><h1 className="text-xl font-semibold">{a.titre}</h1><p className="text-sm text-slate-500">{a.proto} · composant {getComponent(a.comp)?.nom} · {a.resp}{a.essai && <> · essai <Link className="text-teal-700" href={`/tests/${a.essai}`}>{a.essai}</Link></>}</p></div><Badge v={a.g} /></div><p className="mt-3 text-sm">{a.desc}</p>
      <div className="mt-4 grid grid-cols-5 gap-1">{STATUTS.map((s, k) => <div key={s} className={`border-t-4 pt-1 text-center text-[10px] leading-tight sm:text-xs ${k <= i ? "border-teal-700 text-slate-900" : "border-slate-200 text-slate-400"}`}>{s}</div>)}</div></div>
    <div className="grid gap-4 lg:grid-cols-2"><div className="card"><h2 className="mb-2 text-sm font-semibold">Actions correctives</h2>{a.act.length ? a.act.map((x, k) => <div key={k} className="flex justify-between gap-2 border-b py-2.5 text-sm last:border-0"><span>{x.t}<span className="block text-xs text-slate-500">{x.resp}</span></span><Badge v={x.done ? "Réalisée" : "En cours"} /></div>) : <p className="text-sm text-slate-500">Aucune action définie à ce stade.</p>}
      <div className="mt-4 border-t pt-4">{next ? <>{next === "Résolue" && <><label className="text-xs text-slate-500">Résultat de la vérification (obligatoire)</label><textarea rows={2} value={just} onChange={e => setJust(e.target.value)} className="mb-2" /></>}{err && <p className="mb-2 text-xs text-red-700">{err}</p>}<button className="btn w-full sm:w-auto" onClick={adv}>Passer à : {next}</button></> : <p className="text-sm text-emerald-700">Anomalie résolue et vérifiée.</p>}</div></div>
      <div className="card"><h2 className="mb-3 text-sm font-semibold">Chronologie</h2><ol className="ml-2 border-l-2 border-slate-200 pl-4">{tl.map((x, k) => <li key={k} className="relative mb-3 text-sm before:absolute before:-left-[21px] before:top-1.5 before:h-2.5 before:w-2.5 before:rounded-full before:bg-teal-700">{x.t}<div className="text-xs text-slate-500">{fmt(x.d)} · {x.by}</div></li>)}</ol>
        <form className="flex flex-col gap-2 sm:flex-row" onSubmit={e => { e.preventDefault(); if (t.trim().length < 3) return; addNote(a.id, "Observation : " + t.trim()); setT(""); }}><input placeholder="Ajouter une observation" value={t} onChange={e => setT(e.target.value)} /><button className="btn">Ajouter</button></form></div></div></>);
}

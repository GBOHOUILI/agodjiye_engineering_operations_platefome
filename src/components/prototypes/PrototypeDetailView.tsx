"use client";
import { useState } from "react";
import { Back, Badge, fmt, NotFoundCard } from "@/components/shared/ui";
import { DataList } from "@/components/shared/DataList";
import { useDemoStore } from "@/hooks/demo-store";
import { componentsOf } from "@/services/components.service";
import { getPrototype } from "@/services/prototypes.service";
import { testsOf } from "@/services/tests.service";
export default function PrototypeDetailView({ id }: { id: string }) {
  const { anos } = useDemoStore(); const [tab, setTab] = useState("conf"); const p = getPrototype(id);
  if (!p) return <NotFoundCard href="/prototypes" l="Retour aux prototypes" />;
  const es = testsOf(p.id), an = anos.filter(a => a.proto === p.id);
  const T = [["conf", "Configuration"], ["es", `Essais (${es.length})`], ["an", `Anomalies (${an.length})`]];
  return (<><Back href="/prototypes" l="Prototypes" />
    <div className="card mb-4"><div className="flex flex-wrap items-start justify-between gap-2"><div><div className="text-xs text-slate-500">{p.ref} · {p.id} · {p.version}</div><h1 className="text-xl font-semibold">{p.nom}</h1><p className="text-sm text-slate-500">{p.cat} · Responsable : {p.resp} · Créé le {fmt(p.date)}</p></div><Badge v={p.statut} /></div>
      <div className="mt-3 h-2 rounded bg-slate-200"><div className="h-full rounded bg-teal-600" style={{ width: p.prog + "%" }} /></div><div className="mt-1 text-xs text-slate-500">Avancement {p.prog} %</div></div>
    <div className="mb-4 flex gap-1 overflow-x-auto border-b">{T.map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm ${tab === k ? "border-teal-700 text-teal-700" : "border-transparent text-slate-500"}`}>{l}</button>)}</div>
    {tab === "conf" && <DataList rows={componentsOf(p.id)} href={c => `/components/${c.ref}`} cols={[{ h: "Réf.", r: c => <b>{c.ref}</b> }, { h: "Composant", r: c => c.nom }, { h: "Catégorie", r: c => c.cat }, { h: "Version", r: c => c.version }, { h: "Statut", r: c => <Badge v={c.statut} /> }]} />}
    {tab === "es" && <DataList rows={es} href={e => `/tests/${e.id}`} cols={[{ h: "Réf.", r: e => <b>{e.id}</b> }, { h: "Essai", r: e => e.titre }, { h: "Version", r: e => e.ver }, { h: "Date", r: e => fmt(e.date) }, { h: "Résultat", r: e => <Badge v={e.res} /> }]} />}
    {tab === "an" && <DataList rows={an} href={a => `/anomalies/${a.id}`} cols={[{ h: "Réf.", r: a => <b>{a.id}</b> }, { h: "Titre", r: a => a.titre }, { h: "Gravité", r: a => <Badge v={a.g} /> }, { h: "Statut", r: a => a.s }]} />}</>);
}

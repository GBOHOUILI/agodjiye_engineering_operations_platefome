"use client";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { ANOS0 } from "@/data/seed";
import { applyStatut, buildAnomaly } from "@/services/anomalies.service";
import { TODAY } from "@/data/seed";
import type { AnomalyInput } from "@/lib/validations/anomaly";
import type { Ano, Ev, Statut } from "@/types";
interface S { anos: Ano[]; notes: Record<string, Ev[]> }
const KEY = "agj-demo-next-v1";
const fresh = (): S => ({ anos: ANOS0, notes: {} });
interface Ctx extends S { setStatut: (id: string, s: Statut, note: string) => void; addNote: (id: string, t: string) => void; declare: (i: AnomalyInput) => string; reset: () => void }
const C = createContext<Ctx | null>(null);
export function useDemoStore() { const c = useContext(C); if (!c) throw new Error("DemoStoreProvider manquant"); return c; }
export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [st, setSt] = useState<S>(fresh), [ready, setReady] = useState(false), [msg, setMsg] = useState("");
  // Lecture du localStorage après le montage uniquement (évite toute erreur d'hydratation).
  useEffect(() => { try { const s = localStorage.getItem(KEY); if (s) setSt(JSON.parse(s)); } catch { /* ignore */ } setReady(true); }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY, JSON.stringify(st)); } catch { /* ignore */ } }, [st, ready]);
  const toast = useCallback((m: string) => { setMsg(m); setTimeout(() => setMsg(""), 2800); }, []);
  const setStatut = (id: string, s: Statut, note: string) => { setSt(p => ({ ...p, anos: p.anos.map(a => a.id === id ? applyStatut(a, s, note) : a) })); toast(`${id} → ${s}`); };
  const addNote = (id: string, t: string) => { setSt(p => ({ ...p, notes: { ...p.notes, [id]: [...(p.notes[id] || []), { d: TODAY, t, by: "Utilisateur démo" }] } })); toast("Observation ajoutée"); };
  const declare = (i: AnomalyInput) => { const a = buildAnomaly(st.anos, i); setSt(p => ({ ...p, anos: [a, ...p.anos] })); toast(`${a.id} déclarée`); return a.id; };
  const reset = () => { setSt(fresh()); toast("Données de démonstration réinitialisées"); };
  return <C.Provider value={{ ...st, setStatut, addNote, declare, reset }}>{children}{msg && <div role="status" className="fixed bottom-4 left-1/2 z-50 max-w-[90vw] -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm text-white shadow-lg">{msg}</div>}</C.Provider>;
}

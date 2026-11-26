import { COMPS, TODAY } from "@/data/seed";
import type { AnomalyInput } from "@/lib/validations/anomaly";
import { Ano, STATUTS, Statut } from "@/types";
export const GRAVITES = ["Critique", "Élevée", "Moyenne", "Faible"];
export const nextStatut = (a: Ano): Statut | undefined => STATUTS[STATUTS.indexOf(a.s) + 1];
export const isOpen = (a: Ano) => a.s !== "Résolue";
export const filterAnomalies = (anos: Ano[], f: { q: string; proto: string; g: string; open: boolean }) => anos.filter(a => (!f.proto || a.proto === f.proto) && (!f.g || a.g === f.g) && (!f.open || isOpen(a)) && (a.titre + a.id).toLowerCase().includes(f.q.toLowerCase()));
export function buildAnomaly(anos: Ano[], i: AnomalyInput): Ano {
  const c = COMPS.find(x => x.ref === i.comp)!;
  return { id: "ANO-" + String(anos.length + 1).padStart(3, "0"), proto: i.proto, comp: c.ref, cat: c.cat, titre: i.titre, g: i.g, s: "Déclarée", date: TODAY, resp: i.resp, desc: i.desc || "Anomalie déclarée via la démonstration.", tl: [{ d: TODAY, t: "Anomalie déclarée", by: "Utilisateur démo" }], act: [] };
}
export const applyStatut = (a: Ano, s: Statut, note: string): Ano => ({ ...a, s, tl: [...a.tl, { d: TODAY, t: `Statut : ${s}${note ? " — " + note : ""}`, by: "Utilisateur démo" }], act: s === "Résolue" ? a.act.map(x => ({ ...x, done: true })) : a.act });

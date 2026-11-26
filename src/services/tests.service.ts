import { ESSAIS } from "@/data/seed";
import type { Mesure } from "@/types";
export const RESULTS = ["Réussi", "À surveiller", "Échoué", "En attente"];
export const getTests = () => ESSAIS;
export const getTest = (id: string) => ESSAIS.find(e => e.id === id);
export const testsOf = (proto: string) => ESSAIS.filter(e => e.proto === proto);
export const testCategories = () => [...new Set(ESSAIS.map(e => e.cat))];
export const isMeasureOk = (m: Mesure) => (m.sens === "min" ? m.val >= m.cible : m.val <= m.cible);
export const filterTests = (f: { q: string; proto: string; res: string }) => ESSAIS.filter(e => (!f.proto || e.proto === f.proto) && (!f.res || e.res === f.res) && (e.titre + e.id + e.cat).toLowerCase().includes(f.q.toLowerCase())).sort((a, b) => b.date.localeCompare(a.date));

import { PROTOS } from "@/data/seed";
export const getPrototypes = () => PROTOS;
export const getPrototype = (id: string) => PROTOS.find(p => p.id === id);
export const prototypeStatuses = () => [...new Set(PROTOS.map(p => p.statut))];
export const searchPrototypes = (q: string, st: string) => PROTOS.filter(p => (!st || p.statut === st) && (p.nom + p.ref + p.id).toLowerCase().includes(q.toLowerCase()));

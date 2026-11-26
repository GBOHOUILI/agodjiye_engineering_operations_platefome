"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AlertTriangle, BarChart3, Boxes, Car, FileText, FlaskConical, LayoutDashboard, Menu, RotateCcw, X } from "lucide-react";
import { useDemoStore } from "@/hooks/demo-store";
const NAV = [["/dashboard", "Tableau de bord", LayoutDashboard], ["/prototypes", "Prototypes", Car], ["/components", "Composants", Boxes], ["/tests", "Essais techniques", FlaskConical], ["/anomalies", "Anomalies", AlertTriangle], ["/analytics", "Analyse", BarChart3], ["/reports", "Rapports", FileText]] as const;
function Side({ onNav }: { onNav: () => void }) {
  const { reset } = useDemoStore(), path = usePathname();
  return (<div className="flex h-full flex-col bg-slate-900 text-white">
    <div className="px-5 py-5"><div className="text-lg font-semibold">AGOOJIYÉ</div><div className="text-xs text-slate-400">Engineering Tracking System</div></div>
    <nav className="flex-1 space-y-1 px-3">{NAV.map(([to, l, I]) => <Link key={to} href={to} onClick={onNav} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm ${path.startsWith(to) ? "bg-white/15" : "text-slate-300 hover:bg-white/10"}`}><I size={18} />{l}</Link>)}</nav>
    <button onClick={() => { if (window.confirm("Réinitialiser les données de démonstration ?")) reset(); }} className="m-3 flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-white/10"><RotateCcw size={16} />Réinitialiser la démo</button></div>);
}
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (<div className="min-h-screen lg:pl-64">
    <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block"><Side onNav={() => {}} /></aside>
    {open && <div className="fixed inset-0 z-40 lg:hidden"><div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} /><aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw]"><Side onNav={() => setOpen(false)} /></aside></div>}
    <header className="sticky top-0 z-30 border-b bg-white"><div className="bg-amber-100 px-2 py-1 text-center text-[11px] font-semibold tracking-wide text-amber-900">ENVIRONNEMENT DE DÉMONSTRATION — DONNÉES FICTIVES</div>
      <div className="flex h-12 items-center gap-3 px-4 lg:hidden"><button aria-label="Menu" onClick={() => setOpen(!open)} className="p-2">{open ? <X /> : <Menu />}</button><b>AGOOJIYÉ</b></div></header>
    <main className="mx-auto max-w-7xl p-4 sm:p-6">{children}</main></div>);
}

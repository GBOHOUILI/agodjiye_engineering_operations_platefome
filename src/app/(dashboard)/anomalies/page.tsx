import AnomaliesView from "@/components/anomalies/AnomaliesView";
export default function Page({ searchParams }: { searchParams: { g?: string; open?: string } }) { return <AnomaliesView initialG={searchParams.g ?? ""} initialOpen={searchParams.open === "1"} />; }

import ComponentDetailView from "@/components/components/ComponentDetailView";
export default function Page({ params }: { params: { id: string } }) { return <ComponentDetailView id={params.id} />; }

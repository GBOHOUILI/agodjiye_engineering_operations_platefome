import PrototypeDetailView from "@/components/prototypes/PrototypeDetailView";
export default function Page({ params }: { params: { id: string } }) { return <PrototypeDetailView id={params.id} />; }

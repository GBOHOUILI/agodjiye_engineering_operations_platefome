import TestDetailView from "@/components/tests/TestDetailView";
export default function Page({ params }: { params: { id: string } }) { return <TestDetailView id={params.id} />; }

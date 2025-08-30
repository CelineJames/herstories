// app/biography/[id]/page.tsx
import BiographyDetail from "@/views/biography/[id]";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BiographyPage({ params }: Props) {
  const resolvedParams = await params;
  return <BiographyDetail id={resolvedParams.id} />;
}

// app/biography/[id]/page.tsx
import BiographyDetail from "@/views/biography/[id]";

type Props = {
  params: {
    id: string;
  };
};

export default async function BiographyPage({ params }: Props) {
  return <BiographyDetail id={params.id} />;
}

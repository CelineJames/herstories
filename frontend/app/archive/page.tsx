import Archive from "@/views/archive";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Archive",
  description:
    "A digital archive of documents, photographs, oral histories and artworks celebrating African women's history.",
};

export default function Page(): React.ReactElement {
  return <Archive />;
}

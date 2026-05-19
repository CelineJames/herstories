import BlogList from "@/views/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories & Research",
  description:
    "Essays, deep dives and reflections on African women's history from the HerStories team.",
};

export default function Page(): React.ReactElement {
  return <BlogList />;
}

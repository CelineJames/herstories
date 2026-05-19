import BiographyList from "@/views/biography";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Biographies",
  description:
    "Browse biographies of African women who shaped history — activists, leaders, artists, scientists and more.",
};

export default function Page(): React.ReactElement {
  return <BiographyList />;
}

import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  if (typeof window === "undefined") {
    redirect("/chat/geralt");
  }
  return <div>Home</div>;
}

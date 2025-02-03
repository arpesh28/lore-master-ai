import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  if (typeof window === "undefined") {
    redirect("/characters");
  }
  return <div>Home</div>;
}

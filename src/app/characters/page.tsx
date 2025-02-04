import CharactersGrid from "@/components/Characters/CharactersGrid";
import { characters } from "@/lib/characters";
import { redirect } from "next/navigation";

export default async function Characters() {
  if (typeof window === "undefined") {
    redirect("/chat/geralt");
  }
  return (
    <main>
      <>
        <h2 className=" font-medium text-2xl my-6 mt-16">
          Featured Characters
        </h2>
        <CharactersGrid characters={characters} />
      </>
    </main>
  );
}

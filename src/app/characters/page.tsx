import CharactersGrid from "@/components/Characters/CharactersGrid";
import { characters } from "@/lib/characters";

export default async function Characters() {
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

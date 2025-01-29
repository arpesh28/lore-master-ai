import CharactersGrid from "@/components/Characters/CharactersGrid";
import { CharacterCardProps } from "@/types/Game";
// import FeaturedSection from "./FeaturedSection";
type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Home({ params, searchParams }: Props) {
  // const page = Number(searchParams?.page) || 1;
  // const { data } = await useGames(page);
  const characters: CharacterCardProps[] = [
    {
      id: 0,
      slug: "kratos",
      name: "Kratos",
      background_image:
        "https://epic-games-store-nextjs13-drizzle-orm.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdehs50yqa%2Fimage%2Fupload%2Fv1695719239%2FEpic%2520games%2520store%2FThe%2520Witcher%25203%2520%3A%2520Wild%2520hunt%2F3287019-3786480319-Z7hV9_uh3h8t.jpg&w=640&q=75",
      description:
        "Kratos, the Greek god of war, is the main character of the God of War series. He is a powerful warrior who battles various monsters and gods. The series is known for its intense combat, mythology-based stories, and emotional depth.",
    },
    {
      id: 1,
      slug: "geralt",
      name: "Geralt",
      background_image:
        "https://epic-games-store-nextjs13-drizzle-orm.vercel.app/_next/image?url=https%3A%2F%2Fcdn.mobygames.com%2Fcovers%2F1905279-the-witcher-3-wild-hunt-xbox-one-front-cover.jpg&w=640&q=75",
      description:
        "Geralt of Rivia, also known as the White Wolf, is a legendary witcher and the main protagonist of the series. A master swordsman and monster hunter with superhuman abilities, he travels the Continent taking contracts to slay dangerous creatures. Despite his mutations and reputation, he maintains a strong moral code and often finds himself drawn into events that shape the fate of kingdoms.",
    },
  ];
  return (
    <main>
      <>
        {/* <FeaturedSection /> */}
        <h2 className=" font-medium text-2xl my-6 mt-16">
          Featured characters
        </h2>
        <CharactersGrid characters={characters} />
      </>
    </main>
  );
}

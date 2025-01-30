import GamesGrid from "@/components/Games/GamesGrid";
import { GameCardProps } from "@/types/Game";
// import FeaturedSection from "./FeaturedSection";
type HomeProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Home({ params, searchParams }: HomeProps) {
  // const page = Number(searchParams?.page) || 1;
  // const { data } = await useGames(page);
  const games: GameCardProps[] = [
    {
      id: 0,
      slug: "god-of-war",
      name: "God Of War",
      background_image:
        "https://epic-games-store-nextjs13-drizzle-orm.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdehs50yqa%2Fimage%2Fupload%2Fv1695719239%2FEpic%2520games%2520store%2FThe%2520Witcher%25203%2520%3A%2520Wild%2520hunt%2F3287019-3786480319-Z7hV9_uh3h8t.jpg&w=640&q=75",
      released_at: "2025-01-29",
    },
    {
      id: 1,
      slug: "witcher-3",
      name: "Witcher 3",
      background_image:
        "https://epic-games-store-nextjs13-drizzle-orm.vercel.app/_next/image?url=https%3A%2F%2Fcdn.mobygames.com%2Fcovers%2F1905279-the-witcher-3-wild-hunt-xbox-one-front-cover.jpg&w=640&q=75",
      released_at: "2025-01-29",
    },
  ];
  return (
    <main>
      {/* <FeaturedSection /> */}
      <h2 className=" font-medium text-2xl my-6 mt-16">Featured games</h2>
      <GamesGrid games={games} />
    </main>
  );
}

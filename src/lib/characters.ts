const characters = [
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

type CharacterCardProps = (typeof characters)[number];

export { characters };
export type { CharacterCardProps };

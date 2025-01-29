import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/AspectRation";
import { GameCardProps } from "@/types/Game";

type Props = {
  game: GameCardProps;
};

function GameCard({ game }: Props) {
  return (
    <Link
      className="flex flex-col mb-8 hover:opacity-50 transition-opacity ease-in"
      href={`/games/${game.slug}`}
    >
      {game.background_image && (
        <AspectRatio ratio={9 / 14} className="relative mb-4 ">
          <Image
            className="h-full object-cover"
            src={game.background_image}
            width={400}
            height={300}
            alt=""
          />
        </AspectRatio>
      )}
      <p className="text-xl font-medium">{game.name}</p>
      <p className=" text-neutral-500 font-semibold">{game.released_at}</p>
    </Link>
  );
}

export default GameCard;

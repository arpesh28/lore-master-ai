import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui-radix/AspectRation";
import { GameCardProps } from "@/types/Game";

type Props = {
  game: GameCardProps;
};

function GameCard({ game }: Props) {
  return (
    <Link
      className="flex flex-col mb-8 hover:opacity-50 transition-opacity ease-in border border-[#ffffff33] rounded-xl relative overflow-hidden"
      href={`/games/${game.slug}`}
    >
      {game.background_image && (
        <AspectRatio
          ratio={9 / 12}
          className="relative w-full h-full top-0 left-0 "
        >
          <Image
            className="h-full object-cover"
            src={game.background_image}
            width={400}
            height={300}
            alt=""
          />
        </AspectRatio>
      )}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent via-black/60 to-black/70 px-2 pt-10 pb-2">
        <p className="text-base font-bold">{game.name}</p>
        <p className="font-light text-xs">{game.released_at}</p>
      </div>
    </Link>
  );
}

export default GameCard;

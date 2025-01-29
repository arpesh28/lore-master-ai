import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/AspectRation";
import { CharacterCardProps } from "@/types/Game";

type Props = {
  character: CharacterCardProps;
};

function CharacterCard({ character }: Props) {
  return (
    <Link
      className="flex flex-col mb-8 hover:opacity-50 transition-opacity ease-in"
      href={`/characters/${character.id}`}
    >
      {character.background_image && (
        <AspectRatio ratio={9 / 14} className="relative mb-4 ">
          <Image
            className="h-full object-cover"
            src={character.background_image}
            width={400}
            height={300}
            alt=""
          />
        </AspectRatio>
      )}
      <p className="text-xl font-medium">{character.name}</p>
      <p className=" text-neutral-500 font-semibold">{character.description}</p>
    </Link>
  );
}

export default CharacterCard;

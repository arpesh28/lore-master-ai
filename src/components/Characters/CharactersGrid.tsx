import React from "react";
import CharacterCard from "./CharacterCard";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CharacterCardProps } from "@/types/Game";

const gridVariants = cva("grid gap-4", {
  variants: {
    variant: {
      default: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ",
      reduced: "grid-cols-2 md:grid-cols-3 lg:grid-cols-3",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type GridProps = VariantProps<typeof gridVariants>;

interface Props extends GridProps {
  characters: CharacterCardProps[];
  className?: string;
}

function CharactersGrid({ characters, variant, className }: Props) {
  return (
    <>
      <div className={cn(gridVariants({ variant, className }))}>
        {characters.map((character) => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </div>
    </>
  );
}

export default CharactersGrid;

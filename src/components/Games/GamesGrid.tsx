import React from "react";
import GameCard from "./GameCard";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { GameCardProps } from "@/types/Game";

const gridVariants = cva("grid gap-4", {
  variants: {
    variant: {
      default: "grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ",
      reduced: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type GridProps = VariantProps<typeof gridVariants>;

interface Props extends GridProps {
  games: GameCardProps[];
  className?: string;
}

function GamesGrid({ games, variant, className }: Props) {
  return (
    <>
      <div className={cn(gridVariants({ variant, className }))}>
        {games.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
        {games.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
        {games.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
        {games.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </div>
    </>
  );
}

export default GamesGrid;

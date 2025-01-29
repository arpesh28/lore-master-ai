export type GameCardProps = {
  slug: string;
  name: string;
  id: number;
  background_image: string | null;
  released_at: string;
};

export type CharacterCardProps = {
  slug: string;
  name: string;
  id: number;
  background_image: string | null;
  description: string;
};

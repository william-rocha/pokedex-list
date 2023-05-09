export interface Pokemon {
  id: number;
  name: string;
  url: string;
}
export interface PokemonList {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: Pokemon[]
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: Date;
}

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  type: Array<{ type: { name: string } }>;
  height: number;
  weight: number;
  pic: string;
}

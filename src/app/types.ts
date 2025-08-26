// src/types.ts
export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string | null;   // ⬅️ hiányzott
  vote_average: number;
  release_date: string;
  overview: string; // mindenhol kötelező
};

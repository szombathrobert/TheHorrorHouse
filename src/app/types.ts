// src/types.ts
export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string; // mindenhol kötelező
};

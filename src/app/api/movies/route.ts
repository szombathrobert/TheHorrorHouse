import { NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY; // .env.local-ban legyen

// TMDB API válasz típusok
type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  genre_ids: number[];
};

type TMDBResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const query = searchParams.get("query") || "";

  const url =
    query.trim() !== ""
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}&language=en-US&page=1&include_adult=false`
      : `https://api.themoviedb.org/3/discover/movie?with_genres=27&language=en-US&page=${page}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "API error" }, { status: res.status });
  }

  const data: TMDBResponse = await res.json();

  // Ha keresés van, szűrés horror genre-re
  if (query.trim() !== "") {
    const horrorMovies = data.results.filter((movie) =>
      movie.genre_ids.includes(27)
    );
    return NextResponse.json({ results: horrorMovies });
  }

  return NextResponse.json(data);
}

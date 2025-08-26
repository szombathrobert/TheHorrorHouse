import { NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY; // .env.local-ban legyen

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const query = searchParams.get("query") || "";

  let url = "";
  
  if (query.trim() !== "") {
    // Keresés: TMDb search végpont, majd filter horrorra
    url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&language=en-US&page=1&include_adult=false`;
  } else {
    // Felfedezés: horror kategória
    url = `https://api.themoviedb.org/3/discover/movie?with_genres=27&language=en-US&page=${page}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "API error" }, { status: res.status });
  }

  const data = await res.json();

  // Ha keresés, akkor szűrjük csak a horror műfajra
  if (query.trim() !== "") {
    const horrorMovies = data.results.filter((movie: any) =>
      movie.genre_ids.includes(27)
    );
    return NextResponse.json({ results: horrorMovies });
  }

  // Egyébként a discover listát adjuk vissza
  return NextResponse.json(data);
}

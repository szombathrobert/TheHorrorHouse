import { NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY; // fontos! .env.local-ban legyen

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=27&language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "API error" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

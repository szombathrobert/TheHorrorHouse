"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import MovieModal from "../MovieModal/page";
import { Movie } from "../types";

// Skeleton card
export function SkeletonCard() {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-2 animate-pulse">
      <div className="bg-gray-700 h-56 w-full rounded"></div>
      <div className="h-4 bg-gray-700 rounded mt-2 w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded mt-1 w-1/2"></div>
    </div>
  );
}

export default function Movies() {
  const [isOpen, setIsOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("Apply Filter");
  const [heroIndex, setHeroIndex] = useState(0);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [scrollError, setScrollError] = useState(false);


  // Fetch az API-tól: oldalak vagy keresés
  // fetchMovies
useEffect(() => {
  const fetchMovies = async () => {
    setLoading(true);
    let url = searchQuery.trim() !== "" 
      ? `/api/movies?query=${encodeURIComponent(searchQuery)}`
      : `/api/movies?page=${page}`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error("API error");

      if (data.results.length === 0) setHasMore(false); // nincs több adat

      if (searchQuery.trim() !== "") {
        setMovies(data.results);
        setHeroIndex(0);
      } else {
        setMovies(prev => [
          ...prev,
          ...data.results.filter((newMovie: Movie) => !prev.some(m => m.id === newMovie.id)),
        ]);
      }
      setScrollError(false);
    } catch (err) {
      console.error(err);
      setScrollError(true);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  fetchMovies();
}, [page, searchQuery]);

  // Hero index reset kereséskor
  useEffect(() => {
    setHeroIndex(0);
  }, [searchQuery]);

  // Infinite scroll observer
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !loading && searchQuery === "" && hasMore) {
        setPage(prev => prev + 1);
      }
    },
    { root: null, rootMargin: "200px", threshold: 0.1 }
  );

  const currentRef = loaderRef.current;
  if (currentRef) observer.observe(currentRef);

  return () => {
    if (currentRef) observer.unobserve(currentRef);
  };
}, [loading, searchQuery, hasMore]);

  // Filter + Search
  const filteredMovies = movies
    .filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (filter) {
        case "Score Decreasing":
          return b.vote_average - a.vote_average;
        case "Score Increasing":
          return a.vote_average - b.vote_average;
        case "ABC Decreasing":
          return b.title.localeCompare(a.title);
        case "ABC Increasing":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  // Hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (filteredMovies.length > 0) {
        setHeroIndex(prev => (prev + 1) % filteredMovies.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [filteredMovies]);

  const heroMovie =
    filteredMovies.length > 0
      ? filteredMovies[heroIndex % filteredMovies.length]
      : movies.length > 0
      ? movies[0]
      : null;

  const linkclassName = (path: string) =>
    `block py-2 px-2 rounded-full transition font-medium ${
      pathname === path
        ? "text-white bg-red-700 md:bg-transparent md:text-red-300"
        : "text-white hover:bg-red-700 md:hover:bg-transparent md:hover:text-red-400"
    }`;

  return (
    <div className="relative bg-black min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-20 bg-gradient-to-r from-red-600 to-red-900 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="/navbar_logo.svg" width={32} height={32} className="h-8" alt="TheHorrorHouseLogo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              TheHorrorHouse
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {typeof window !== "undefined" && (
            <AnimatePresence>
              {(isOpen || window.innerWidth >= 768) && (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full md:w-auto overflow-hidden md:overflow-visible"
                  id="navbar-default"
                >
                  <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-red-200 rounded-lg bg-red-800 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
                    <li><Link href="/" className={linkclassName("/")}>Home</Link></li>
                    <li><Link href="/movies" className={linkclassName("/movies")}>Movies</Link></li>
                    <li><Link href="/contact" className={linkclassName("/contact")}>Contact</Link></li>
                    <li><Link href="/about" className={linkclassName("/about")}>About</Link></li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </nav>

      {/* Hero */}
      {heroMovie && (
        <div className="relative w-full h-[400px] md:h-[650px] overflow-hidden mt-16 rounded-lg shadow-lg pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroMovie.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${heroMovie.poster_path}`}
                alt={heroMovie.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">Movies List</h1>
                <p className="mt-4 text-white/80 text-lg md:text-2xl drop-shadow-md">Find your tonight&apos;s movie</p>
              </div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white max-w-xl">
                <h1 className="text-2xl md:text-4xl font-bold mb-2">{heroMovie.title}</h1>
                <p className="text-sm md:text-lg mb-2">⭐ {heroMovie.vote_average.toFixed(1)}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Szűrő + kereső */}
      <div className="flex justify-between px-6 mt-4 items-center">
        <select
          className="bg-gray-800 text-white p-2 rounded-lg border border-gray-700 focus:outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option disabled>Apply Filter</option>
          <option>Score Decreasing</option>
          <option>Score Increasing</option>
          <option>ABC Decreasing</option>
          <option>ABC Increasing</option>
        </select>

        <input
          type="text"
          placeholder="Keresés cím alapján..."
          className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none ml-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Film grid */}
      <div className="pt-6 px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMovies.length === 0 && loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : filteredMovies.map((movie) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gray-800 rounded-lg shadow p-2 relative cursor-pointer"
                onClick={() => setSelectedMovie(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded w-full h-56 object-cover"
                />
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-lg shadow-md">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <p className="text-white mt-2 truncate">{movie.title}</p>
                <p className="text-gray-400 text-xs">{movie.release_date || "N/A"}</p>
              </motion.div>
            ))}
      </div>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

      {/* Loader trigger */}
      <div ref={loaderRef} className="h-10 flex justify-center items-center">
        {loading && searchQuery === "" && <span className="text-white">Loading...</span>}
        {!loading && scrollError && (
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
}

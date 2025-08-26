"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Movie } from "../types";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  if (!movie) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex justify-center items-center bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={imageLoaded ? onClose : undefined} // csak ha kép betöltve
      >
        <motion.div
          className="bg-gray-900 rounded-lg shadow-lg max-w-lg w-full overflow-hidden relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // ne zárja a modal-t a belső kattintás
        >
          {/* Close gomb */}
          {imageLoaded && (
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-800 rounded-full w-8 h-8 flex justify-center items-center z-10"
            >
              ✕
            </button>
          )}

          {/* Film kép */}
          <div className="relative w-full h-96 bg-gray-800">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </div>

          {/* Film adatok */}
          <div className="p-4 text-white">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-sm mb-1">Release: {movie.release_date || "N/A"}</p>
            <p className="text-sm mb-2">Rating: ⭐ {movie.vote_average.toFixed(1)}</p>
            <p className="text-gray-300"><span className="font-bold text-white">Movie's Description:</span> {movie.overview}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

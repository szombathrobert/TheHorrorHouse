
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-black text-white px-4 overflow-hidden">
        <div>
            <Image 
                src="/404.png" 
                width={240} 
                height={240} 
                alt="404 Not Found" 
                loading="lazy"
                />
        </div>
      {/* Vércsepp animáció */}
      <motion.div
        className="text-9xl font-bold mb-6 text-red-700 z-10"
        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        404
      </motion.div>

      <motion.p
        className="text-2xl md:text-3xl mb-6 text-white/80 text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        The page you are searching for <br /> is left the Horror House forever...
      </motion.p>

      <Link
        href="/"
        className="z-10 bg-red-600 hover:bg-red-800 transition px-6 py-3 rounded-lg font-semibold shadow-lg"
      >
        Return to the Home Page
      </Link>
    </div>
  );
}

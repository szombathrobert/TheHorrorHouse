"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation';
import { Menu, X } from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block py-2 px-2 rounded-full transition font-medium ${
      pathname === path
        ? "text-white bg-red-700 md:bg-transparent md:text-red-300"
        : "text-white hover:bg-red-700 md:hover:bg-transparent md:hover:text-red-400"
    }`;


  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-20 bg-gradient-to-r from-red-600 to-red-900 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="https://videos.openai.com/vg-assets/assets%2Ftask_01k310cbbhf1evwqttbk1hrfvq%2F1755601894_img_0.webp?st=2025-08-19T09%3A27%3A58Z&se=2025-08-25T10%3A27%3A58Z&sks=b&skt=2025-08-19T09%3A27%3A58Z&ske=2025-08-25T10%3A27%3A58Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=Qyyvd6I5vzzypZHnK%2BOVaYrlt1XbHL9WDTHttqJpq%2Bs%3D&az=oaivgprodscus" className="h-8" alt="Flowbite Logo" />
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

          <div
            className={`md:block w-full md:w-auto overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 md:max-h-full md:opacity-100"}`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-red-200 rounded-lg bg-red-800 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <Link
                  href="/"
                  className={linkClass("/")}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  className={linkClass("/movies")}
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={linkClass("/contact")}>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={linkClass("/about")}>
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://videos.openai.com/vg-assets/assets%2Ftask_01k311cs40f7jvx0ywkemmr8s0%2F1755603035_img_1.webp?st=2025-08-19T10%3A18%3A40Z&se=2025-08-25T11%3A18%3A40Z&sks=b&skt=2025-08-19T10%3A18%3A40Z&ske=2025-08-25T11%3A18%3A40Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=xKvicizoXEiwBJK01F%2FFwZyrRiT%2FsQ3%2FLr9W3fz5Pew%3D&az=oaivgprodscus')" }}
      >
        {/* Optional: sötét overlay a jobb olvashatóságért */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 p-6 flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome To The Horror House
          </h1>
          <Link
            className="inline-flex items-center justify-center bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
            href="/movies"
          >
            Go to movies list
          </Link>
        </div>
      </div>
    </div>
  );
}

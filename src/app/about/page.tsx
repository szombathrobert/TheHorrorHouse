"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
          
  const linkclassName = (path: string) =>
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
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse" > <Image src="/navbar_logo.svg" className="h-8" alt="TheHorrorHouseLogo" /> <span className="self-center text-2xl font-semibold whitespace-nowrap text-white"> TheHorrorHouse </span> </Link>

          {/* Hamburger gomb mobilon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Menü */}
          <div
            className={`md:block w-full md:w-auto overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 md:max-h-full md:opacity-100"}`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-red-200 rounded-lg bg-red-800 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <Link
                  href="/"
                  className={linkclassName("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  className={linkclassName("/movies")}>
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={linkclassName("/contact")}>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={linkclassName("/about")}>
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center bg-black pt-24 md:pt-32">
          <div className="flex flex-col md:flex-row items-center justify-center w-full px-4 md:px-16 gap-8">
    
        {/* Left side - Text */}
        <div className="md:w-1/2 text-white space-y-4">
          <h2 className="text-3xl font-semibold">Our Story</h2>
          <p className="text-lg text-gray-300">
            TheHorrorHouse was born from a passion for horror movies. Here you will find all the existing movies and their imdb rating.
          </p>
          <p className="text-lg text-gray-300">
            Join us and find your tonight&apos;s horror expreience.
          </p>
          <Link href="/movies" className="mt-4 bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded-full transition">
            Check the movies list here
          </Link>
        </div>

        {/* Right side - Image */}
        <div className="md:w-1/2 flex justify-center px-4 md:px-16 overflow-hidden">
          <img 
            src="https://hypixel.net/attachments/its-friday-t-shirt-teeturtle-friday-the-13th_800x-jpg.879794/" 
            alt="Our Story Image" 
            className="rounded-xl shadow-xl max-w-xs w-xs md:max-w-md lg:max-w-md md:w-auto transform hover:scale-105 transition-transform duration-500"
          />
        </div>
    
  </div>
      </div>
    </div>
  );
}

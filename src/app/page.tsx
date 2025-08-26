"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation';
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Home() {
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
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse" > <Image src="/navbar_logo.svg" width={32} height={32} className="h-8" alt="TheHorrorHouseLogo" loading='lazy' /> <span className="self-center text-2xl font-semibold whitespace-nowrap text-white"> TheHorrorHouse </span> </Link>

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
                  className={linkclassName("/")}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  className={linkclassName("/movies")}
                >
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
        <div
          className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/home_page.svg')" }}
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

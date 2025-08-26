"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation';
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Contact() {
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
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse" > <Image src="/navbar_logo.svg" width={32} height={32} className="h-8" alt="TheHorrorHouseLogo" /> <span className="self-center text-2xl font-semibold whitespace-nowrap text-white"> TheHorrorHouse </span> </Link>

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
      <div className="relative min-h-screen flex flex-col md:flex-row bg-black pt-24">
          {/* Right side - Image / Illustration */}
  <div className="md:w-1/2 flex items-center justify-center p-6">
    <img
      src="https://i.etsystatic.com/35559813/r/il/99e51a/4212977608/il_570xN.4212977608_hylt.jpg"
      className="rounded-xl shadow-xl max-w-xs w-xs md:max-w-md lg:max-w-md md:w-auto transform hover:scale-105 transition-transform duration-500"
    />
  </div>
  {/* Left side - Form */}
  <div className="md:w-1/2 flex items-center justify-center p-6">
    <div className="w-full max-w-md bg-red-900/90 backdrop-blur-md border border-red-700 rounded-2xl shadow-xl p-8 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

      {/* Form */}
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-white">Your Name</label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            className="w-full p-2.5 rounded-lg border border-gray-300 text-white focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            placeholder="john.doe@email.com"
            className="w-full p-2.5 rounded-lg border border-gray-300 text-white focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 text-sm font-medium">Message</label>
          <textarea
            id="message"
            placeholder="Your message..."
            className="w-full p-3 rounded-lg border border-gray-300 text-white focus:ring-red-500 focus:border-red-500 h-32"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-red-700 hover:bg-red-800 rounded-full text-white font-semibold transition"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>


</div>
    </div>
  )
}


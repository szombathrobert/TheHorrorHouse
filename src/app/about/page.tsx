import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-20 bg-white border-red-200 dark:bg-linear-to-r from-red-500 to-red-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://videos.openai.com/vg-assets/assets%2Ftask_01k310cbbhf1evwqttbk1hrfvq%2F1755601894_img_0.webp?st=2025-08-19T09%3A27%3A58Z&se=2025-08-25T10%3A27%3A58Z&sks=b&skt=2025-08-19T09%3A27%3A58Z&ske=2025-08-25T10%3A27%3A58Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=Qyyvd6I5vzzypZHnK%2BOVaYrlt1XbHL9WDTHttqJpq%2Bs%3D&az=oaivgprodscus"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">TheHorrorHouse</span>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-red-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li><a href="/" className="block py-2 px-3 text-white bg-red-700 rounded-sm md:bg-transparent md:text-red-400 md:p-0" aria-current="page">Home</a></li>
              <li><a href="/movies" className="block py-2 px-3 text-white rounded-sm hover:bg-red-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0">Movies</a></li>
              <li><a href="/contact" className="block py-2 px-3 text-white rounded-sm hover:bg-red-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0">Contact</a></li>
              <li><a href="/about" className="block py-2 px-3 text-white rounded-sm hover:bg-red-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0">About</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-black"
      >
        {/* Optional: sötét overlay a jobb olvashatóságért */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 p-6 flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            About page
          </h1>
        </div>
      </div>
    </div>
  )
}

export default About

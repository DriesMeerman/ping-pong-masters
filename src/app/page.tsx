// app/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Removed import { getChallenges } from '../lib/challenges';
import { FeaturedChallenges } from '@/components/FeaturedChallenges'; // Import the new component

// Component is no longer async as FeaturedChallenges fetches its own data
const HomePage = () => {
  // Removed const challenges = await getChallenges();

  return (
    <div className="min-h-screen bg-cream bg-grain text-olive flex flex-col">
      {/* Header */}
      <header className="py-8">
        <h1 className="text-5xl font-bold text-skin text-center">
          Ping Pong Masters
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4">


        <section className="flex flex-col md:flex-row items-center md:justify-between my-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-amber">
              Smash Your Stress, Serve Your Style!
            </h2>
            <p className="mt-4 text-lg">
              It’s 2 PM—your inbox is piled high, but the paddle’s calling. As post‑lunch haze and smoke rings mingle over the net, the Master stalks the court like an office legend—rumored to scare the cubicle dwellers, but in truth he’ll sculpt you into his next prodigy.
            </p>
            <div className="mt-6 flex flex-wrap">
              <Link
                href="/gallery"
                className="bg-skin text-cream font-semibold py-3 px-6 rounded shadow hover:scale-105 transition-transform mr-4"
              >
                View Gallery
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <Image
              src="/mascotte/hero.png"
              alt="Mascotte Hero"
              width={400}
              height={400}
              className="ring-4 ring-amber rounded-full"
            />
          </div>
        </section>

        {/* Challenges Section - Replaced with FeaturedChallenges */}
        <section className="my-16">
          <FeaturedChallenges showViewAllButton={true} />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-olive border-t border-olive/30">
        &copy; {new Date().getFullYear()} Ping Pong Master League. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;


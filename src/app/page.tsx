
// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';

const HomePage: FC = () => (
  <div className="min-h-screen bg-cream bg-grain text-olive flex flex-col">
    {/* Header */}
    <header className="py-8">
      <h1 className="text-5xl font-bold text-skin text-center">
        Ping Pong Masters
      </h1>
      <p className="mt-4 text-center text-lg">
        Welcome to our ping-pong league!
      </p>
    </header>

    {/* Main Content */}
    <main className="flex-1 container mx-auto px-4">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center md:justify-between my-16">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-amber">Meet Our Mascotte</h2>
          <p className="mt-4 text-lg">
            The grainy legend of our league, embodying all the motion and energy of ping-pong!
          </p>
          <div className="mt-6 flex flex-wrap">
            <Link
              href="/gallery"
              className="bg-skin text-cream font-semibold py-3 px-6 rounded shadow hover:scale-105 transition-transform mr-4"
            >
              View Gallery
            </Link>
            <Link
              href="/rankings"
              className="border-2 border-olive text-olive font-semibold py-3 px-6 rounded hover:bg-olive hover:text-cream transition-colors mt-4 md:mt-0"
            >
              See Rankings
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

      {/* Meme of the Week */}
      <section className="my-16">
        <h3 className="text-3xl font-bold text-skin mb-4">Meme of the Week</h3>
        <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/images/meme-of-week.png"
            alt="Meme of the Week"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="py-8 text-center text-sm text-olive border-t border-olive/30">
      &copy; {new Date().getFullYear()} Ping Pong Master League. All rights reserved.
    </footer>
  </div>
);

export default HomePage;


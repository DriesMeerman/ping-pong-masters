import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-olive text-cream shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-skin hover:text-amber transition-colors">
          Ping Pong Masters
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-amber transition-colors">Home</Link>
          <Link href="/rules" className="hover:text-amber transition-colors">Rules</Link>
          <Link href="/gallery" className="hover:text-amber transition-colors">Gallery</Link>
          <Link href="/challenges" className="hover:text-amber transition-colors">Challenges</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
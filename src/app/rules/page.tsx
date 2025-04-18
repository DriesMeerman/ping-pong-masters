import { FC } from 'react';

const RulesPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-150px)]"> {/* Adjust min-height based on Navbar/Footer */}
      <h1 className="text-4xl font-bold text-skin mb-8 text-center">League Rules</h1>

      <div className="bg-white/60 p-8 rounded-lg shadow-lg border border-olive/20 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-amber mb-4">Core Gameplay</h2>
          <ul className="list-disc list-inside space-y-2 text-olive/90">
            <li>Games are played to 11 points, win by 2.</li>
            <li>Service changes every 2 points.</li>
            <li>Let serves (hitting the net and landing in) are replayed.</li>
            <li>Players switch sides after each game in a match (best of 3 or 5).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-amber mb-4">Informal House Rules (Now Formal!)</h2>
          <ul className="list-disc list-inside space-y-2 text-olive/90">
            <li>
              <strong>The Crawl of Shame:</strong> If a player scores 0 points in a game (gets "skunked"), they must perform the Crawl of Shame by crawling under the ping pong table after the game concludes.
            </li>
            <li>Respect the paddle, respect the opponent.</li>
            <li>Calls must be made clearly and immediately. Disagreements settled by a re-point or rock-paper-scissors.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-amber mb-4">Conduct</h2>
           <p className="text-olive/90">Play fair, have fun, and don't throw your paddle (too hard).</p>
        </section>
      </div>
    </div>
  );
};

export default RulesPage;
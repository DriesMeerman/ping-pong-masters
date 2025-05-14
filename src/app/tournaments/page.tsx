import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface Tournament {
  id: string;
  name: string;
  date: string;
  status: string;
  // Add other relevant fields you want to display on the overview
}

async function getTournaments(): Promise<Tournament[]> {
  const dataDir = path.join(process.cwd(), 'data', 'tournaments');
  let filenames;
  try {
    filenames = fs.readdirSync(dataDir);
  } catch (error) {
    console.error("Could not read data directory:", dataDir, error);
    return []; // Return empty if directory doesn't exist or isn't readable
  }

  const tournamentPromises = filenames
    .filter(filename => filename.endsWith('.json'))
    .map(async filename => {
      const filePath = path.join(dataDir, filename);
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const tournamentData = JSON.parse(fileContents);
        // Assuming the JSON structure has id, name, date, status directly
        return {
          id: tournamentData.id,
          name: tournamentData.name,
          date: tournamentData.date,
          status: tournamentData.status,
        } as Tournament;
      } catch (error) {
        console.error(`Error reading or parsing tournament file ${filename}:`, error);
        return null; // Skip this file if there's an error
      }
    });

  const tournaments = (await Promise.all(tournamentPromises)).filter(t => t !== null) as Tournament[];
  return tournaments;
}

export default async function TournamentsPage() {
  const tournaments = await getTournaments();

  return (
    <div className="min-h-screen text-olive flex flex-col">
      {/* Mimic header structure if a global layout provides one, or add a specific one */}
      <header className="py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-skin text-center">
          Tournaments
        </h1>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {(!tournaments || tournaments.length === 0) ? (
          <p className="text-center text-lg">No tournaments found. Add some tournament data in the 'data/tournaments' folder.</p>
        ) : (
          <ul className="space-y-6">
            {tournaments.map(tournament => {
              // Determine status classes outside JSX
              let statusBadgeClasses = 'ml-2 px-3 py-1 rounded-full text-xs font-semibold ';
              if (tournament.status === 'planned') {
                statusBadgeClasses += 'bg-amber/20 text-amber-dark';
              } else if (tournament.status === 'completed') {
                statusBadgeClasses += 'bg-skin/20 text-skin-dark';
              } else {
                statusBadgeClasses += 'bg-olive/20 text-olive-dark';
              }

              return (
                <li key={tournament.id} className="bg-cream/50 border border-olive/30 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Link href={`/tournaments/${tournament.id}`} className="block group">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <h2 className="text-2xl font-semibold text-amber group-hover:text-skin transition-colors duration-300">{tournament.name}</h2>
                    <p className="text-olive/80 mt-1">Date: {new Date(tournament.date).toLocaleDateString()}</p>
                    <p className="text-sm text-olive/70 mt-2">Status:
                      <span className={statusBadgeClasses}>
                        {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                      </span>
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
      {/* Mimic footer structure if a global layout provides one */}
    </div>
  );
}
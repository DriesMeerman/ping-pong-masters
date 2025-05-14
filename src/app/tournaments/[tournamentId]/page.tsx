'use client'; // Add this at the top for state and effects

import Link from 'next/link';
import { notFound } from 'next/navigation';
import TournamentBracket from '@/components/TournamentBracket';
import D3Bracket from '@/components/D3Bracket';
import React, { useState, useEffect, use } from 'react'; // Import 'use'

interface Player {
  id: string;
  name: string;
  seed?: number; // Optional seed
}

interface MatchSlot {
  type: 'player' | 'progression';
  playerId?: string;      // For type 'player'
  seed?: number;          // For type 'player', if applicable
  sourceMatchId?: string; // For type 'progression'
}

interface Match {
  id: string;
  slots: MatchSlot[];
  winnerId: string | null;
  score: string | null;
  nextMatchId: string | null;
}

interface Round {
  roundNumber: number;
  name: string;
  matches: Match[];
}

interface TournamentData {
  id: number | string; // Can be number after our change, or string if users have old data
  name: string;
  date: string;
  status: string;
  description: string;
  players: Player[];
  structure: string; // e.g., 'single_elimination', 'round_robin'
  rounds: Round[];
  tournamentWinnerId: string | null;
}

export default function TournamentPage({ params: paramsPromise }: { params: Promise<{ tournamentId: string }> }) {
  const params = use(paramsPromise);
  const [activeTab, setActiveTab] = useState('simple');
  const [tournament, setTournament] = useState<TournamentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/tournaments/${params.tournamentId}`);
        if (!response.ok) {
          notFound();
          return;
        }
        const data = await response.json();
        setTournament(data);
      } catch (error) {
        console.error("Failed to fetch tournament data:", error);
        notFound();
      }
      setLoading(false);
    };

    if (params.tournamentId) { // Check if tournamentId is available
      fetchData();
    } else {
      console.warn("Tournament ID from params is missing, skipping fetch.");
      setLoading(false);
      // Optionally call notFound() here if an ID is strictly required and missing
      // notFound();
    }
  }, [params.tournamentId]);

  if (loading) {
    return <div className="min-h-screen text-olive flex items-center justify-center"><p>Loading Tournament...</p></div>;
  }

  if (!tournament) {
    // `notFound()` should ideally be called based on the fetch result within useEffect,
    // but direct call here if state remains null after loading.
    // For robust solution, ensure `notFound` is thrown correctly from data fetching logic.
    notFound();
    return null; // Should be unreachable if notFound works
  }

  const getPlayerName = (playerId: string | undefined): string => {
    if (!playerId || !tournament) return 'TBD';
    const player = tournament.players.find(p => p.id === playerId);
    return player ? player.name : 'Unknown Player';
  };

  const renderSlot = (slot: MatchSlot): string => {
    if (!tournament) return 'Loading...';
    if (slot.type === 'player') {
      return getPlayerName(slot.playerId);
    }
    if (slot.type === 'progression') {
      return `Winner of ${slot.sourceMatchId}`;
    }
    return 'Empty Slot';
  };

  return (
    <div className="min-h-screen text-olive flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link href="/tournaments" className="text-amber hover:text-skin transition-colors duration-300 underline mb-8 block">&larr; Back to Tournaments</Link>

        <header className="mb-10 pb-6 border-b border-olive/20">
          <h1 className="text-4xl md:text-5xl font-bold text-skin mb-3">{tournament.name}</h1>
          <p className="text-xl text-olive/80 mb-4">{tournament.description}</p>
          <div className="text-sm text-olive/70 flex flex-wrap gap-x-4 gap-y-1">
            <span>Date: {new Date(tournament.date).toLocaleDateString()}</span>
            <span className="hidden md:inline">|</span>
            <span>Status:
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold
                ${tournament.status === 'planned' ? 'bg-amber/20 text-amber-dark' :
                  tournament.status === 'completed' ? 'bg-skin/20 text-skin-dark' :
                  'bg-olive/20 text-olive-dark'}`}>
                {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
              </span>
            </span>
            {tournament.structure && <><span className="hidden md:inline">|</span><span>Structure: {tournament.structure}</span></>}
          </div>
        </header>

        {tournament.players && tournament.players.length > 0 && (
          <section className="mb-10">
            <h2 className="text-3xl font-semibold text-skin mb-6">Players</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tournament.players.map(player => (
                <li key={player.id} className="p-4 bg-cream/50 border border-olive/30 rounded-lg shadow hover:shadow-md transition-shadow">
                  <span className="font-medium text-olive">{player.name}</span>
                  {player.seed && <span className="text-xs text-olive/70 ml-1">(Seed {player.seed})</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tab Navigation */}
        <div className="mb-6 flex space-x-2 border-b-2 border-olive/20 pb-2">
          <button
            onClick={() => setActiveTab('simple')}
            className={`px-4 py-2 rounded-t-md font-semibold transition-colors
                        ${activeTab === 'simple' ? 'bg-amber/20 text-amber-dark border-b-2 border-amber' : 'text-olive/70 hover:bg-olive/10'}`}
          >
            Standard Bracket
          </button>
          <button
            onClick={() => setActiveTab('visual')}
            className={`px-4 py-2 rounded-t-md font-semibold transition-colors
                        ${activeTab === 'visual' ? 'bg-amber/20 text-amber-dark border-b-2 border-amber' : 'text-olive/70 hover:bg-olive/10'}`}
          >
            Visual Bracket (D3)
          </button>
        </div>

        {/* Conditional Content Based on Tab */}
        {activeTab === 'simple' && tournament.rounds && tournament.rounds.length > 0 ? (
          <section className="mb-10">
            <TournamentBracket
              rounds={tournament.rounds}
              getPlayerName={getPlayerName}
              renderSlot={renderSlot}
            />
          </section>
        ) : activeTab === 'simple' ? (
          <section className="mb-10">
             <h2 className="text-3xl font-semibold text-skin mb-6">Bracket</h2>
             <p className="text-olive/80">Bracket information will be available once the tournament starts or players are seeded.</p>
          </section>
        ) : null}

        {activeTab === 'visual' && (
          <section className="mb-10">
            <h2 className="text-3xl font-semibold text-skin mb-6">Visual D3 Bracket</h2>
            <D3Bracket
              tournamentData={tournament}
              getPlayerName={getPlayerName}
            />
          </section>
        )}

        {tournament.tournamentWinnerId && (
          <section className="mt-12 py-8 bg-skin/10 rounded-xl text-center border border-skin/30 shadow-lg">
            <h2 className="text-3xl font-bold text-skin mb-2">🏆 Tournament Winner! 🏆</h2>
            <p className="text-2xl mt-1 font-semibold text-skin-dark">{getPlayerName(tournament.tournamentWinnerId)}</p>
          </section>
        )}

        {(tournament.status === 'planned' && (!tournament.rounds || tournament.rounds.length === 0) && (!tournament.players || tournament.players.length === 0)) && (
           <section className="mt-10 p-6 bg-amber/10 rounded-lg border border-amber/30 text-center">
              <h2 className="text-2xl font-semibold text-amber-dark mb-2">Tournament Information</h2>
              <p className="text-olive/80">This tournament is currently in the planning phase. Players and bracket details will be available soon.</p>
          </section>
        )}
      </main>
      {/* Optional: Add a themed footer similar to HomePage if not part of a global layout */}
    </div>
  );
}
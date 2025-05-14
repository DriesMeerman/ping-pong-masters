import React from 'react';

// Removed Player interface as it is unused
// interface Player {
//   id: string;
//   name: string;
//   seed?: number;
// }

interface MatchSlot {
  type: 'player' | 'progression';
  playerId?: string;
  seed?: number;
  sourceMatchId?: string;
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

interface TournamentBracketProps {
  rounds: Round[];
  // players: Player[]; // Removed unused players prop
  getPlayerName: (playerId: string | undefined) => string;
  renderSlot: (slot: MatchSlot) => string;
}

const TournamentBracket: React.FC<TournamentBracketProps> = ({ rounds, /* players, */ getPlayerName, renderSlot }) => {
  if (!rounds || rounds.length === 0) {
    return <p className="text-olive/80 p-4 text-center">No bracket information available yet.</p>;
  }

  return (
    <div className="flex space-x-4 md:space-x-8 overflow-x-auto py-4 px-2 bg-olive/5 rounded-lg"> {/* Added padding and bg */}
      {rounds.map((round) => (
        <div
          key={round.roundNumber}
          className="flex-shrink-0 w-72 md:w-80 p-3 bg-cream/20 rounded-md shadow" // Round column styling
        >
          <h4 className="text-xl font-bold text-skin mb-5 text-center tracking-wide">{round.name}</h4>
          <div className="space-y-5"> {/* Increased space between matches */}
            {round.matches.map((match) => {
              const isPlayer1Winner = renderSlot(match.slots[0]) === getPlayerName(match.winnerId ?? undefined) && match.winnerId;
              const isPlayer2Winner = renderSlot(match.slots[1]) === getPlayerName(match.winnerId ?? undefined) && match.winnerId;

              return (
                <div
                  key={match.id}
                  className={`rounded-lg shadow-lg overflow-hidden border
                              ${match.winnerId ? 'border-skin/70' : 'border-olive/40'}`}
                >
                  <div className={`p-3 ${match.winnerId ? 'bg-skin/10' : 'bg-cream/70'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-olive/80 font-medium">Match {match.id}</span>
                      {match.score && (
                        <span className="text-sm font-mono px-2.5 py-1 bg-olive/10 text-olive font-semibold rounded-md">
                          {match.score}
                        </span>
                      )}
                    </div>

                    {/* Player 1 Slot */}
                    <div className={`flex justify-between items-center p-2.5 rounded-md mb-1.5
                                    ${isPlayer1Winner ? 'bg-skin/20 ring-1 ring-skin' : 'bg-cream'}`}>
                      <span className={`font-semibold ${isPlayer1Winner ? 'text-skin-dark' : 'text-olive'}`}>
                        {renderSlot(match.slots[0])}
                      </span>
                      {/* Potential for player-specific score part here if needed */}
                    </div>

                    {/* "VS" Separator */}
                    <div className="flex items-center justify-center my-2">
                      <span className="text-xs font-bold text-olive/60 tracking-wider px-2 py-0.5 bg-olive/5 rounded-full">VS</span>
                    </div>

                    {/* Player 2 Slot */}
                    <div className={`flex justify-between items-center p-2.5 rounded-md mt-1.5
                                    ${isPlayer2Winner ? 'bg-skin/20 ring-1 ring-skin' : 'bg-cream'}`}>
                      <span className={`font-semibold ${isPlayer2Winner ? 'text-skin-dark' : 'text-olive'}`}>
                        {renderSlot(match.slots[1])}
                      </span>
                    </div>
                  </div>

                  {match.winnerId && (
                    <div className="bg-skin/20 p-2 text-right border-t border-skin/30">
                      <span className="text-sm font-bold text-skin-dark animate-pulse">
                        Winner: {getPlayerName(match.winnerId ?? undefined)}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TournamentBracket;
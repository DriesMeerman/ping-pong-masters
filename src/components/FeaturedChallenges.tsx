import Link from "next/link";
import { getFeaturedChallenges, Challenge } from "@/lib/challenges";

// Helper to get difficulty color classes
const getDifficultyClasses = (difficulty: Challenge["difficulty"]) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800 border-green-300";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-300"; // Changed to yellow
    case "Hard":
      return "bg-red-100 text-red-800 border-red-300";       // Changed to red
    default:
      return "bg-gray-100 text-gray-600 border-gray-300";
  }
};

interface FeaturedChallengesProps {
  showViewAllButton?: boolean; // Add optional prop
}

export async function FeaturedChallenges({ showViewAllButton = true }: FeaturedChallengesProps) { // Default to true
  const challenges = await getFeaturedChallenges(2);

  if (challenges.length === 0) {
    return (
      <div className="bg-gradient-to-br from-olive/10 to-skin/10 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-olive mb-4">Featured Challenges</h2>
        <p className="text-gray-600">No featured challenges available right now.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-olive/10 to-skin/10 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-olive mb-4">Featured Challenges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge) => (
          <Link key={challenge.id} href={`/challenges#${challenge.id}`} className="block group">
            <div className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 border border-olive/20 hover:border-amber h-full flex flex-col">
              <div className="flex justify-between items-start mb-2 gap-2">
                <h3 className="text-lg font-medium text-olive group-hover:text-amber transition-colors flex-1">{challenge.title}</h3>
                {/* Difficulty display */}
                <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full border ${getDifficultyClasses(challenge.difficulty)} capitalize whitespace-nowrap`}>
                  {challenge.difficulty}
                </span>
              </div>
              <p className="text-gray-600 text-sm flex-grow">{challenge.description}</p>
            </div>
          </Link>
        ))}
      </div>
       {/* Conditionally render the button */}
       {showViewAllButton && challenges.length > 0 && (
        <div className="mt-6 text-center">
          <Link href="/challenges" className="inline-block bg-amber text-white px-6 py-2 rounded-md hover:bg-amber/90 transition-colors font-medium">
            View All Challenges
          </Link>
        </div>
      )}
    </div>
  );
}
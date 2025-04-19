import fs from 'fs';
import path from 'path';

// Define the structure based on challenges.json
export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

// Determine the correct path to the data file
const challengesFilePath = path.join(process.cwd(), 'data', 'challenges.json');

// Function to get all challenges from the JSON file
export async function getAllChallenges(): Promise<Challenge[]> {
  try {
    const jsonData = await fs.promises.readFile(challengesFilePath, 'utf-8');
    const challenges = JSON.parse(jsonData) as Challenge[];
    return challenges;
  } catch (error) {
    console.error('Error reading challenges data:', error);
    return [];
  }
}

// Function to get a limited number of featured challenges (e.g., first N from file)
export async function getFeaturedChallenges(limit: number = 2): Promise<Challenge[]> {
  try {
    const allChallenges = await getAllChallenges();
    return allChallenges.slice(0, limit);
  } catch (error) {
    console.error('Error getting featured challenges:', error);
    return [];
  }
}

// get all but the featured challenges
export async function getAllChallengesButFeatured(): Promise<Challenge[]> {
  const allChallenges = await getAllChallenges();
  return allChallenges.slice(2);
}

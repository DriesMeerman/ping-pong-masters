import fs from 'fs';
import path from 'path';

// Define the structure based on challenges.json
export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard'; // Changed from status
}

// Determine the correct path to the data file
const challengesFilePath = path.join(process.cwd(), 'data', 'challenges.json');

// Function to get all challenges from the JSON file
export async function getAllChallenges(): Promise<Challenge[]> {
  try {
    // console.log(`Reading challenges from: ${challengesFilePath}`); // Debug log
    const jsonData = await fs.promises.readFile(challengesFilePath, 'utf-8');
    const challenges = JSON.parse(jsonData) as Challenge[];
    // Add validation here if needed (e.g., using Zod)
    return challenges;
  } catch (error) {
    console.error('Error reading challenges data:', error);
    return []; // Return empty array on error
  }
}

// Function to get a limited number of featured challenges (e.g., first N from file)
export async function getFeaturedChallenges(limit: number = 2): Promise<Challenge[]> {
  try {
    const allChallenges = await getAllChallenges(); // Reuse the function to get all
    // Simple logic: return the first 'limit' challenges
    // More complex logic could be added here later (e.g., based on difficulty)
    return allChallenges.slice(0, limit);
  } catch (error) {
    console.error('Error getting featured challenges:', error);
    return [];
  }
}

// Removed the mock data array and the old getChallenges function
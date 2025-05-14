import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { tournamentId: string } }
) {
  const { tournamentId } = params;

  if (!tournamentId) {
    return NextResponse.json({ error: 'Tournament ID is required' }, { status: 400 });
  }

  try {
    const dataDir = path.join(process.cwd(), 'data', 'tournaments');
    const filePath = path.join(dataDir, `${tournamentId}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const tournamentData = JSON.parse(fileContents);

    return NextResponse.json(tournamentData);

  } catch (error) {
    console.error(`Error fetching tournament ${tournamentId}:`, error);
    // Check if it's a parsing error or other file system error
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Error parsing tournament data' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
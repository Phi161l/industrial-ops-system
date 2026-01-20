import { NextResponse } from 'next/server';
import data from '../../../data/machines.json' assert { type: 'json' };

export async function GET() {
  return NextResponse.json(data);
}

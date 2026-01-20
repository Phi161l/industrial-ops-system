import { NextResponse } from 'next/server';
import alerts from '../../../data/alerts.json' assert { type: 'json' };

export async function GET() {
  return NextResponse.json(alerts);
}

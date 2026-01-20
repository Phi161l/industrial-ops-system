import { NextResponse } from 'next/server';
import scheduledTasks from '../../../data/scheduledTasks.json';

export async function GET() {
  return NextResponse.json(scheduledTasks);
}

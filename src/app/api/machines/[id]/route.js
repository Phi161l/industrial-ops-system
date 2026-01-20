import { NextResponse } from 'next/server';
import data from '../../../../data/machines.json' assert { type: 'json' };

export async function GET(req, { params }) {
  const {id} = await params
  const machine = data.find(m => m.id === id);
  if (!machine) return NextResponse.json({ message: 'Machine not found' }, { status: 404 });
  return NextResponse.json(machine);
}

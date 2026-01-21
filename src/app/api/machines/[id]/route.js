import { NextResponse } from 'next/server';
import { getMachineById } from '../data';

export async function GET(req, { params }) {
  const { id } = await params;
  const machine = getMachineById(id);
  if (!machine) return NextResponse.json({ message: 'Machine not found' }, { status: 404 });
  return NextResponse.json(machine);
}

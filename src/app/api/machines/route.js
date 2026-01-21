// import { NextResponse } from 'next/server';
// import data from '../../../data/machines.json' assert { type: 'json' };

// export async function GET() {
//   return NextResponse.json(data);
// }





import { NextResponse } from 'next/server';
import { addMachine, getMachines } from './data';

export async function GET() {
  return NextResponse.json(getMachines());
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, id, status = 'idle', efficiency = 0, productionCount = 0 } = body;

    if (!name || !id) {
      return NextResponse.json({ error: 'Name and ID are required' }, { status: 400 });
    }

    const machines = getMachines();
    if (machines.some((m) => m.id === id)) {
      return NextResponse.json({ error: 'Machine with this ID already exists' }, { status: 400 });
    }

    const sanitized = {
      id,
      name,
      status,
      efficiency: Math.max(0, Math.min(100, efficiency)),
      productionCount: Math.max(0, productionCount),
    };

    const newMachine = addMachine(sanitized);

    return NextResponse.json(newMachine, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create machine', details: error.message },
      { status: 500 }
    );
  }
}
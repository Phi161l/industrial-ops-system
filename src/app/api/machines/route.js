// import { NextResponse } from 'next/server';
// import data from '../../../data/machines.json' assert { type: 'json' };

// export async function GET() {
//   return NextResponse.json(data);
// }





import { NextResponse } from 'next/server';
import data from '../../../data/machines.json' assert { type: 'json' };

// Copy JSON into memory so we can modify it dynamically
let machines = [...data];

// Function to simulate machine data changes
function updateMachineData() {
  machines = machines.map(machine => {
    // Randomly change status
    const statuses = ['running', 'idle', 'maintenance'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    // Randomly adjust efficiency (0-100) if running or idle
    let efficiency = machine.efficiency;
    if (randomStatus !== 'maintenance') {
      const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
      efficiency = Math.max(0, Math.min(100, efficiency + change));
    } else {
      efficiency = 0;
    }

    // Randomly increment production count if running
    let productionCount = machine.productionCount;
    if (randomStatus === 'running') {
      productionCount += Math.floor(Math.random() * 5); // 0-4 units
    }

    return {
      ...machine,
      status: randomStatus,
      efficiency,
      productionCount,
      lastUpdated: new Date().toISOString()
    };
  });
}

// Update machine data every 5 seconds (simulate real-time changes)
setInterval(updateMachineData, 5000);

export async function GET() {
  return NextResponse.json(machines);
}

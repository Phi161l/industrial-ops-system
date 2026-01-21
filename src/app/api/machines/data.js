import baseData from '../../../data/machines.json' assert { type: 'json' };

let machines = baseData.map(machine => ({
  ...machine,
  history: machine.history || [],
  lastUpdated: machine.lastUpdated || new Date().toISOString(),
}));

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const pickWeightedStatus = (currentStatus) => {
  const weights =
    currentStatus === 'maintenance'
      ? [
          { status: 'maintenance', weight: 0.35 },
          { status: 'idle', weight: 0.25 },
          { status: 'running', weight: 0.4 },
        ]
      : [
          { status: 'running', weight: 0.65 },
          { status: 'idle', weight: 0.2 },
          { status: 'maintenance', weight: 0.15 },
        ];

  const roll = Math.random();
  let cumulative = 0;
  for (const option of weights) {
    cumulative += option.weight;
    if (roll <= cumulative) return option.status;
  }
  return 'running';
};

const nextEfficiency = (status, previous) => {
  if (status === 'running') {
    const target = 72 + Math.random() * 24; // 72–96%
    const noise = (Math.random() - 0.5) * 12; // -6–6
    const blended = 0.55 * previous + 0.45 * target + noise;
    return clamp(blended, 55, 100);
  }

  if (status === 'idle') {
    const target = 45 + Math.random() * 15; // 45–60%
    const noise = (Math.random() - 0.5) * 10; // -5–5
    const blended = 0.6 * previous + 0.4 * target + noise;
    return clamp(blended, 20, 75);
  }

  // maintenance: keep low but non-zero to avoid flatlines
  const decay = previous * 0.55;
  const floor = previous < 10 ? previous : decay;
  return clamp(floor + Math.random() * 6, 3, 30);
};

const nextProduction = (status, previous) => {
  if (status === 'running') {
    return previous + 5 + Math.floor(Math.random() * 18); // 5–22 units
  }
  if (status === 'idle') {
    return previous + Math.floor(Math.random() * 4); // 0–3 units
  }
  return previous;
};

const evolveMachine = (machine) => {
  const status = pickWeightedStatus(machine.status);
  const efficiency = Number(nextEfficiency(status, machine.efficiency).toFixed(1));
  const productionCount = nextProduction(status, machine.productionCount);
  const timestamp = new Date().toISOString();

  const history = [...(machine.history || []), { timestamp, efficiency, productionCount }].slice(-30);

  return {
    ...machine,
    status,
    efficiency,
    productionCount,
    lastUpdated: timestamp,
    history,
  };
};

export const getMachines = () => machines;

export const getMachineById = (id) => machines.find((m) => m.id === id);

export const addMachine = (payload) => {
  machines = [
    ...machines,
    {
      ...payload,
      history: payload.history || [
        {
          timestamp: new Date().toISOString(),
          efficiency: payload.efficiency,
          productionCount: payload.productionCount,
        },
      ],
      lastUpdated: new Date().toISOString(),
    },
  ];
  return machines[machines.length - 1];
};

export const updateMachines = () => {
  machines = machines.map(evolveMachine);
};

// Periodically evolve machine data so dashboards look alive
setInterval(updateMachines, 1500);

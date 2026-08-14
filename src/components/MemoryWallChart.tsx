import React, { useMemo } from 'react';
import { Chart } from '@tanstack/charts/react';
import { defineChart, lineY, dot } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';

interface WallPoint {
  readonly year: number;
  readonly value: number;
}

export const MemoryWallChart: React.FC = () => {
  // Historical data points (1980 - 2025) normalized to 1.0x in 1980
  const cpuFlopsData = useMemo<readonly WallPoint[]>(() => [
    { year: 1980, value: 1 },
    { year: 1985, value: 3.5 },
    { year: 1990, value: 15 },
    { year: 1995, value: 80 },
    { year: 2000, value: 450 },
    { year: 2005, value: 1800 },
    { year: 2010, value: 6500 },
    { year: 2015, value: 22000 },
    { year: 2020, value: 80000 },
    { year: 2025, value: 250000 },
  ], []);

  const dramBandwidthData = useMemo<readonly WallPoint[]>(() => [
    { year: 1980, value: 1 },
    { year: 1985, value: 1.8 },
    { year: 1990, value: 3.5 },
    { year: 1995, value: 7 },
    { year: 2000, value: 18 },
    { year: 2005, value: 45 },
    { year: 2010, value: 110 },
    { year: 2015, value: 280 },
    { year: 2020, value: 650 },
    { year: 2025, value: 1600 },
  ], []);

  const dramLatencyData = useMemo<readonly WallPoint[]>(() => [
    { year: 1980, value: 1 },
    { year: 1985, value: 1.3 },
    { year: 1990, value: 2.0 },
    { year: 1995, value: 3.2 },
    { year: 2000, value: 5.5 },
    { year: 2005, value: 9.0 },
    { year: 2010, value: 14.0 },
    { year: 2015, value: 20.0 },
    { year: 2020, value: 26.0 },
    { year: 2025, value: 32.0 },
  ], []);

  const chartDefinition = useMemo(() => {
    return defineChart({
      marks: [
        // CPU / GPU Peak Compute Capacity (Sky-400)
        lineY(cpuFlopsData, {
          x: 'year',
          y: 'value',
          stroke: '#38bdf8',
          strokeWidth: 3,
        }),
        dot(cpuFlopsData, {
          x: 'year',
          y: 'value',
          fill: '#ffffff',
          stroke: '#38bdf8',
          strokeWidth: 2,
          r: 4,
        }),
        // DRAM Bandwidth Scaling (Slate-300)
        lineY(dramBandwidthData, {
          x: 'year',
          y: 'value',
          stroke: '#cbd5e1',
          strokeWidth: 2.5,
        }),
        dot(dramBandwidthData, {
          x: 'year',
          y: 'value',
          fill: '#ffffff',
          stroke: '#cbd5e1',
          strokeWidth: 2,
          r: 3.5,
        }),
        // DRAM Latency Improvement (Slate-500)
        lineY(dramLatencyData, {
          x: 'year',
          y: 'value',
          stroke: '#64748b',
          strokeWidth: 2,
          strokeDasharray: '4 3',
        }),
        dot(dramLatencyData, {
          x: 'year',
          y: 'value',
          fill: '#ffffff',
          stroke: '#64748b',
          strokeWidth: 1.5,
          r: 3,
        }),
      ],
      x: {
        scale: scaleLinear().domain([1980, 2025]),
        grid: true,
        axis: {
          label: 'Año (1980 - 2025)',
        },
      },
      y: {
        scale: scaleLinear().domain([1, 260000]),
        grid: true,
        axis: {
          label: 'Crecimiento Relativo Normalizado',
        },
      },
    });
  }, [cpuFlopsData, dramBandwidthData, dramLatencyData]);

  return (
    <div className="hpc-card p-6 w-full max-w-6xl mx-auto bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
      {/* Header & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <span className="hpc-badge font-mono">Memory Wall</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight">
            La Brecha de Rendimiento (1980 - 2025)
          </h4>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-sky-400">
            <span className="w-3 h-0.5 bg-sky-400 inline-block rounded" />
            <span>Cómputo CPU/GPU (~250,000x)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-200">
            <span className="w-3 h-0.5 bg-slate-300 inline-block rounded" />
            <span>Ancho de Banda (~1,600x)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-3 h-0.5 bg-slate-400 inline-block rounded" />
            <span>DRAM Latencia (~30x)</span>
          </div>
        </div>
      </div>

      {/* TanStack Chart Area */}
      <div className="my-3 h-[270px] w-full flex items-center justify-center">
        <Chart
          definition={chartDefinition}
          height={270}
          ariaLabel="Gráfico histórico de la brecha del Memory Wall con TanStack Charts"
          className="tanstack-chart-container text-slate-300"
        />
      </div>

      {/* Summary Footer */}
      <div className="mt-2 grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
        <div className="flex flex-col">
          <span className="font-bold text-white">1. Crecimiento Exponencial de FLOPs</span>
          <span className="text-slate-300 mt-1 leading-relaxed">La capacidad de cálculo se multiplicó gracias a núcleos superescalares, SIMD y GPUs.</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white">2. Estancamiento de Latencia DRAM</span>
          <span className="text-slate-300 mt-1 leading-relaxed">El acceso a DRAM sigue costando ~50-100 ns (~200-300 ciclos de CPU perdidos).</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white">3. Soluciones en Silicio</span>
          <span className="text-slate-300 mt-1 leading-relaxed">Cachés L3 masivas (3D V-Cache), memoria apilada HBM3e y jerarquías NUMA/CXL.</span>
        </div>
      </div>
    </div>
  );
};

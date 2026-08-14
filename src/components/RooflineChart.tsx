import React, { useState, useMemo } from 'react';
import { Chart } from '@tanstack/charts/react';
import { defineChart, lineY, areaY, dot, ruleX, ruleY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';

interface RooflinePoint {
  readonly intensity: number;
  readonly performance: number;
  readonly type: 'memory' | 'compute';
}

export const RooflineChart: React.FC = () => {
  const [intensity, setIntensity] = useState<number>(0.5); // FLOPs/Byte

  const peakFlops = 100; // GFLOPS
  const bandwidth = 100; // GB/s (Slope = 100)
  const kneePoint = peakFlops / bandwidth; // 1.0 FLOP/Byte

  // Current performance calculation: min(Peak FLOPS, I * BW)
  const currentPerf = Math.min(peakFlops, intensity * bandwidth);
  const isMemoryBound = intensity < kneePoint;

  // Generate continuous curve for the roofline boundary
  const rooflineData = useMemo<readonly RooflinePoint[]>(() => {
    const points: RooflinePoint[] = [];
    const step = 0.05;
    const maxI = 2.5;
    for (let i = 0; i <= maxI + 0.001; i += step) {
      const roundedI = Math.round(i * 100) / 100;
      const perf = Math.min(peakFlops, roundedI * bandwidth);
      points.push({
        intensity: roundedI,
        performance: perf,
        type: roundedI <= kneePoint ? 'memory' : 'compute',
      });
    }
    return points;
  }, [peakFlops, bandwidth, kneePoint]);

  // Current operating point
  const currentPoint = useMemo(() => [{
    intensity,
    performance: currentPerf,
  }], [intensity, currentPerf]);

  // Knee point
  const kneeData = useMemo(() => [{
    intensity: kneePoint,
    performance: peakFlops,
  }], [kneePoint, peakFlops]);

  // Configure TanStack Chart
  const chartDefinition = useMemo(() => {
    return defineChart({
      marks: [
        // Shaded feasible performance region
        areaY(rooflineData, {
          x: 'intensity',
          y: 'performance',
          fill: '#38bdf8',
          opacity: 0.1,
        }),
        // Ridge line (Memory bandwidth slope + Peak compute ceiling)
        lineY(rooflineData, {
          x: 'intensity',
          y: 'performance',
          stroke: '#38bdf8',
          strokeWidth: 3,
        }),
        // Knee point vertical guideline
        ruleX(kneeData, {
          x: 'intensity',
          stroke: '#64748b',
          strokeWidth: 1.5,
          strokeDasharray: '4 4',
        }),
        // Peak performance horizontal guideline
        ruleY(kneeData, {
          y: 'performance',
          stroke: '#64748b',
          strokeWidth: 1.5,
          strokeDasharray: '4 4',
        }),
        // Knee point marker
        dot(kneeData, {
          x: 'intensity',
          y: 'performance',
          fill: '#ffffff',
          stroke: '#38bdf8',
          strokeWidth: 2,
          r: 5,
        }),
        // Current user-controlled operational point
        dot(currentPoint, {
          x: 'intensity',
          y: 'performance',
          fill: '#ffffff',
          stroke: isMemoryBound ? '#cbd5e1' : '#38bdf8',
          strokeWidth: 3,
          r: 7,
        }),
      ],
      x: {
        scale: scaleLinear().domain([0, 2.5]),
        grid: true,
        axis: {
          label: 'Intensidad Aritmética (FLOPs / Byte)',
        },
      },
      y: {
        scale: scaleLinear().domain([0, 110]),
        grid: true,
        axis: {
          label: 'Rendimiento Alcanzado (GFLOPS)',
        },
      },
    });
  }, [rooflineData, currentPoint, kneeData, isMemoryBound]);

  return (
    <div className="hpc-card p-6 w-full max-w-6xl mx-auto bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <span className="hpc-badge font-mono">Roofline Model</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight">
            Visualizador Interactivo de Cuellos de Botella
          </h4>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-md text-xs font-semibold border transition-colors ${
            isMemoryBound
              ? 'bg-slate-800 text-slate-300 border-slate-700'
              : 'bg-slate-800 text-white border-slate-600'
          }`}>
            {isMemoryBound ? 'Limitado por Memoria (Memory-Bound)' : 'Limitado por Cómputo (Compute-Bound)'}
          </span>
          <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-slate-800 text-slate-100 border border-slate-700">
            {currentPerf.toFixed(1)} / {peakFlops} GFLOPS ({(currentPerf / peakFlops * 100).toFixed(0)}%)
          </span>
        </div>
      </div>

      {/* TanStack Chart Area */}
      <div className="my-3 h-[270px] w-full flex items-center justify-center">
        <Chart
          definition={chartDefinition}
          height={270}
          ariaLabel="Gráfico interactivo del Modelo Roofline con TanStack Charts"
          className="tanstack-chart-container text-slate-300"
        />
      </div>

      {/* Interactive Controls & Preset Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-3 border-t border-slate-800/80">
        <div className="md:col-span-6 flex items-center gap-3">
          <label htmlFor="intensity-slider" className="text-xs font-semibold text-slate-300 whitespace-nowrap">
            Intensidad (I): <strong className="text-white font-mono">{intensity.toFixed(2)}</strong> FLOPs/B
          </label>
          <input
            id="intensity-slider"
            type="range"
            min="0.05"
            max="2.5"
            step="0.05"
            value={intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
            className="w-full accent-slate-300 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>

        <div className="md:col-span-6 flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => setIntensity(0.25)}
            className="px-2.5 py-1 text-xs rounded bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white transition-all"
          >
            SpMV (0.25)
          </button>
          <button
            type="button"
            onClick={() => setIntensity(0.5)}
            className="px-2.5 py-1 text-xs rounded bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white transition-all"
          >
            Stencil (0.50)
          </button>
          <button
            type="button"
            onClick={() => setIntensity(1.0)}
            className="px-2.5 py-1 text-xs rounded bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white transition-all"
          >
            Knee Point (1.0)
          </button>
          <button
            type="button"
            onClick={() => setIntensity(2.0)}
            className="px-2.5 py-1 text-xs rounded bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white transition-all"
          >
            GEMM (2.0+)
          </button>
        </div>
      </div>
    </div>
  );
};

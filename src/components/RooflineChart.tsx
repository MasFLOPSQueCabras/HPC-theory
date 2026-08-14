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
          opacity: 0.12,
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
          stroke: '#475569',
          strokeWidth: 1.5,
          strokeDasharray: '4 4',
        }),
        // Peak performance horizontal guideline
        ruleY(kneeData, {
          y: 'performance',
          stroke: '#475569',
          strokeWidth: 1.5,
          strokeDasharray: '4 4',
        }),
        // Knee point marker
        dot(kneeData, {
          x: 'intensity',
          y: 'performance',
          fill: '#e6ff00',
          stroke: '#07080c',
          strokeWidth: 2,
          r: 5,
        }),
        // Current user-controlled operational point
        dot(currentPoint, {
          x: 'intensity',
          y: 'performance',
          fill: '#ffffff',
          stroke: isMemoryBound ? '#fb7185' : '#34d399',
          strokeWidth: 3,
          r: 7,
        }),
      ],
      x: {
        scale: scaleLinear().domain([0, 2.5]),
        grid: true,
        axis: {
          label: 'Intensidad Aritmética I (FLOPs / Byte)',
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
    <div className="hpc-card p-6 w-full max-w-6xl mx-auto bg-[#0f131d] border border-[#232a3d] shadow-2xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#232a3d]">
        <div className="flex items-center gap-2.5">
          <span className="hpc-badge-cyan font-mono text-xs mb-0">Roofline Model</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight">
            Visualizador Interactivo de Cuellos de Botella
          </h4>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-md text-xs font-semibold border transition-colors ${
            isMemoryBound
              ? 'bg-[#1e131d] text-[#fb7185] border-[#fb7185]/40'
              : 'bg-[#10241e] text-[#34d399] border-[#34d399]/40'
          }`}>
            {isMemoryBound ? 'Limitado por Memoria (Memory-Bound)' : 'Limitado por Cómputo (Compute-Bound)'}
          </span>
          <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#07080c] text-[#e6ff00] border border-[#e6ff00]/40">
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-3 border-t border-[#232a3d]">
        <div className="md:col-span-6 flex items-center gap-3">
          <label htmlFor="intensity-slider" className="text-xs font-semibold text-slate-300 whitespace-nowrap">
            Intensidad (<span className="text-[#e6ff00] font-mono">I</span>): <strong className="text-white font-mono">{intensity.toFixed(2)}</strong> FLOPs/B
          </label>
          <input
            id="intensity-slider"
            type="range"
            min="0.05"
            max="2.5"
            step="0.05"
            value={intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
            className="w-full accent-[#e6ff00] cursor-pointer h-2 bg-[#07080c] rounded-lg border border-[#232a3d]"
          />
        </div>

        <div className="md:col-span-6 flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => setIntensity(0.25)}
            className={`px-2.5 py-1 text-xs rounded font-mono transition-all border ${
              intensity === 0.25
                ? 'bg-[#151a27] text-[#e6ff00] border-[#e6ff00]'
                : 'bg-[#07080c] text-slate-300 border-[#232a3d] hover:text-white hover:border-slate-500'
            }`}
          >
            SpMV (0.25)
          </button>
          <button
            type="button"
            onClick={() => setIntensity(0.5)}
            className={`px-2.5 py-1 text-xs rounded font-mono transition-all border ${
              intensity === 0.5
                ? 'bg-[#151a27] text-[#e6ff00] border-[#e6ff00]'
                : 'bg-[#07080c] text-slate-300 border-[#232a3d] hover:text-white hover:border-slate-500'
            }`}
          >
            Stencil (0.50)
          </button>
          <button
            type="button"
            onClick={() => setIntensity(1.0)}
            className={`px-2.5 py-1 text-xs rounded font-mono transition-all border ${
              intensity === 1.0
                ? 'bg-[#151a27] text-[#e6ff00] border-[#e6ff00]'
                : 'bg-[#07080c] text-slate-300 border-[#232a3d] hover:text-white hover:border-slate-500'
            }`}
          >
            Knee Point (1.0)
          </button>
          <button
            type="button"
            onClick={() => setIntensity(2.0)}
            className={`px-2.5 py-1 text-xs rounded font-mono transition-all border ${
              intensity === 2.0
                ? 'bg-[#151a27] text-[#e6ff00] border-[#e6ff00]'
                : 'bg-[#07080c] text-slate-300 border-[#232a3d] hover:text-white hover:border-slate-500'
            }`}
          >
            GEMM (2.0+)
          </button>
        </div>
      </div>
    </div>
  );
};

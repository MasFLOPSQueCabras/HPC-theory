import React, { useState, useMemo } from 'react';
import { Chart } from '@tanstack/charts/react';
import { defineChart, lineY, dot, ruleY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';

interface ScalingPoint {
  readonly p: number;
  readonly speedup: number;
}

const MAX_P = 128;

export const ScalingChart: React.FC = () => {
  const [serialFraction, setSerialFraction] = useState<number>(0.05); // s = 5% serial (p = 95% parallel)

  // Ideal Linear Speedup Data: S(P) = P
  const idealData = useMemo<readonly ScalingPoint[]>(() => {
    const points: ScalingPoint[] = [];
    for (let p = 1; p <= MAX_P; p += 1) {
      points.push({ p, speedup: p });
    }
    return points;
  }, []);

  // Amdahl's Law (Strong Scaling): S(P) = 1 / (s + (1-s)/P)
  const amdahlData = useMemo<readonly ScalingPoint[]>(() => {
    const points: ScalingPoint[] = [];
    for (let p = 1; p <= MAX_P; p += 1) {
      const s = serialFraction;
      const speedup = 1 / (s + (1 - s) / p);
      points.push({ p, speedup });
    }
    return points;
  }, [serialFraction]);

  // Gustafson's Law (Weak Scaling): S(P) = P - s*(P-1) = s + (1-s)*P
  const gustafsonData = useMemo<readonly ScalingPoint[]>(() => {
    const points: ScalingPoint[] = [];
    for (let p = 1; p <= MAX_P; p += 1) {
      const s = serialFraction;
      const speedup = p - s * (p - 1);
      points.push({ p, speedup });
    }
    return points;
  }, [serialFraction]);

  // Selected sample points for dots on curves (P = 1, 16, 32, 64, 128)
  const sampleCores = useMemo(() => [1, 16, 32, 64, 128], []);

  const amdahlDots = useMemo<readonly ScalingPoint[]>(() => {
    return sampleCores.map((p) => ({
      p,
      speedup: 1 / (serialFraction + (1 - serialFraction) / p),
    }));
  }, [serialFraction, sampleCores]);

  const gustafsonDots = useMemo<readonly ScalingPoint[]>(() => {
    return sampleCores.map((p) => ({
      p,
      speedup: p - serialFraction * (p - 1),
    }));
  }, [serialFraction, sampleCores]);

  // Asymptotic limit for Amdahl: 1 / s
  const asymptoticLimit = useMemo(() => [{
    speedup: 1 / serialFraction,
  }], [serialFraction]);

  // TanStack Chart Configuration
  const chartDefinition = useMemo(() => {
    return defineChart({
      marks: [
        // Ideal scaling guideline
        lineY(idealData, {
          x: 'p',
          y: 'speedup',
          stroke: '#475569',
          strokeWidth: 1.5,
          strokeDasharray: '4 4',
        }),
        // Gustafson Weak Scaling Line
        lineY(gustafsonData, {
          x: 'p',
          y: 'speedup',
          stroke: '#34d399',
          strokeWidth: 3,
        }),
        // Gustafson key dots
        dot(gustafsonDots, {
          x: 'p',
          y: 'speedup',
          fill: '#07080c',
          stroke: '#34d399',
          strokeWidth: 2.5,
          r: 4.5,
        }),
        // Amdahl Strong Scaling Line
        lineY(amdahlData, {
          x: 'p',
          y: 'speedup',
          stroke: '#fb7185',
          strokeWidth: 3,
        }),
        // Amdahl key dots
        dot(amdahlDots, {
          x: 'p',
          y: 'speedup',
          fill: '#07080c',
          stroke: '#fb7185',
          strokeWidth: 2.5,
          r: 4.5,
        }),
        // Asymptotic upper ceiling rule for Amdahl
        ruleY(asymptoticLimit, {
          y: 'speedup',
          stroke: '#e6ff00',
          strokeWidth: 1.5,
          strokeDasharray: '3 3',
        }),
      ],
      x: {
        scale: scaleLinear().domain([1, MAX_P]),
        grid: true,
        axis: {
          label: 'Número de Procesadores / Núcleos (P)',
        },
      },
      y: {
        scale: scaleLinear().domain([0, MAX_P + 10]),
        grid: true,
        axis: {
          label: 'Aceleración (Speedup)',
        },
      },
    });
  }, [idealData, gustafsonData, gustafsonDots, amdahlData, amdahlDots, asymptoticLimit]);

  const currentAmdahlAt128 = 1 / (serialFraction + (1 - serialFraction) / MAX_P);
  const currentGustafsonAt128 = MAX_P - serialFraction * (MAX_P - 1);

  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-[#0f131d] border border-[#232a3d] shadow-2xl">
      {/* Header with Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#232a3d]">
        <div className="flex items-center gap-2.5">
          <span className="hpc-badge-purple font-mono text-xs mb-0">Scaling Laws</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight">
            Amdahl (Fuerte) vs Gustafson (Débil)
          </h4>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-[#fb7185]">
            <span className="w-3 h-0.5 bg-[#fb7185] inline-block rounded" />
            <span>Amdahl: {currentAmdahlAt128.toFixed(1)}x en 128P</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#34d399]">
            <span className="w-3 h-0.5 bg-[#34d399] inline-block rounded" />
            <span>Gustafson: {currentGustafsonAt128.toFixed(1)}x en 128P</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-3 h-0.5 bg-slate-500 border-dashed inline-block" />
            <span>Ideal (P)</span>
          </div>
        </div>
      </div>

      {/* TanStack Chart */}
      <div className="my-3 h-[270px] w-full flex items-center justify-center">
        <Chart
          definition={chartDefinition}
          height={270}
          ariaLabel="Gráfico interactivo de Leyes de Escalamiento con TanStack Charts"
          className="tanstack-chart-container text-slate-300"
        />
      </div>

      {/* Interactive Controls & Presets */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-3 border-t border-[#232a3d]">
        <div className="md:col-span-6 flex items-center gap-3">
          <label htmlFor="serial-slider" className="text-xs font-semibold text-slate-300 whitespace-nowrap">
            Fracción Secuencial (<strong className="text-white font-mono">s</strong>): <strong className="text-[#e6ff00] font-mono">{(serialFraction * 100).toFixed(0)}%</strong>
          </label>
          <input
            id="serial-slider"
            type="range"
            min="0.01"
            max="0.30"
            step="0.01"
            value={serialFraction}
            onChange={(e) => setSerialFraction(parseFloat(e.target.value))}
            className="w-full accent-[#e6ff00] cursor-pointer h-1.5 bg-[#07080c] rounded-lg"
          />
        </div>

        <div className="md:col-span-6 flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => setSerialFraction(0.01)}
            className={`px-2.5 py-1 text-xs rounded font-mono transition-all border ${
              serialFraction === 0.01
                ? 'bg-[#151a27] text-[#e6ff00] border-[#e6ff00]/40'
                : 'bg-[#07080c] text-slate-400 border-[#232a3d] hover:text-white'
            }`}
          >
            1% Serial (Ultra-Paralelo)
          </button>
          <button
            type="button"
            onClick={() => setSerialFraction(0.05)}
            className={`px-2.5 py-1 text-xs rounded font-mono transition-all border ${
              serialFraction === 0.05
                ? 'bg-[#151a27] text-[#e6ff00] border-[#e6ff00]/40'
                : 'bg-[#07080c] text-slate-400 border-[#232a3d] hover:text-white'
            }`}
          >
            5% Serial (Típico HPC)
          </button>
          <button
            type="button"
            onClick={() => setSerialFraction(0.15)}
            className={`px-2.5 py-1 text-xs rounded font-mono transition-all border ${
              serialFraction === 0.15
                ? 'bg-[#151a27] text-[#e6ff00] border-[#e6ff00]/40'
                : 'bg-[#07080c] text-slate-400 border-[#232a3d] hover:text-white'
            }`}
          >
            15% Serial (Cuello Botella)
          </button>
        </div>
      </div>
    </div>
  );
};

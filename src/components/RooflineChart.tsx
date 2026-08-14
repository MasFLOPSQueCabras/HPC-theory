import React, { useState } from 'react';

export const RooflineChart: React.FC = () => {
  const [intensity, setIntensity] = useState<number>(0.5); // FLOPs/Byte

  const peakFlops = 100; // GFLOPS (Ceiling)
  const bandwidth = 100; // GB/s (Slope)

  // Performance formula: min(Peak FLOPS, Operational Intensity * Bandwidth)
  const calculatePerf = (i: number) => Math.min(peakFlops, i * bandwidth);
  const currentPerf = calculatePerf(intensity);
  const isMemoryBound = intensity * bandwidth < peakFlops;

  return (
    <div style={{ background: 'var(--hpc-card-bg)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--hpc-card-border)', backdropFilter: 'blur(12px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h4 style={{ margin: 0, color: 'var(--hpc-primary)', fontSize: '1.1rem' }}>Gráfico Interactivo del Modelo Roofline</h4>
        <span className={`hpc-badge ${isMemoryBound ? 'badge-rose' : 'badge-emerald'}`}>
          {isMemoryBound ? 'Limitado por Memoria (Memory-Bound)' : 'Limitado por Cómputo (Compute-Bound)'}
        </span>
      </div>

      <svg viewBox="0 0 500 250" style={{ width: '100%', height: '220px', overflow: 'visible' }}>
        {/* Grid lines */}
        <line x1="50" y1="200" x2="450" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1="50" y1="30" x2="50" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* Axes labels */}
        <text x="250" y="235" fill="var(--hpc-muted)" fontSize="11" textAnchor="middle">Intensidad Operacional (FLOPs / Byte)</text>
        <text x="15" y="115" fill="var(--hpc-muted)" fontSize="11" textAnchor="middle" transform="rotate(-90 15 115)">Rendimiento (GFLOPS)</text>

        {/* Slanted Roofline slope (Memory Ceiling) */}
        <line x1="50" y1="200" x2="250" y2="60" stroke="#f4b860" strokeWidth="3" strokeDasharray="4 2" />
        {/* Horizontal Flat Roofline (Compute Ceiling) */}
        <line x1="250" y1="60" x2="450" y2="60" stroke="#34d399" strokeWidth="3" />

        {/* Knee point text */}
        <text x="250" y="50" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Knee Point (I = 1.0)</text>

        {/* Current intensity point */}
        {(() => {
          // Map intensity (0.1 to 3.0) to SVG X (50 to 450)
          // Knee point I=1.0 is X=250
          const svgX = 50 + Math.min(intensity, 2.0) * 200;
          const perf = calculatePerf(intensity);
          // Map perf (0 to 100) to SVG Y (200 to 60)
          const svgY = 200 - (perf / peakFlops) * 140;

          return (
            <g>
              <line x1={svgX} y1="200" x2={svgX} y2={svgY} stroke="#38bdf8" strokeDasharray="2 2" opacity="0.6" />
              <line x1="50" y1={svgY} x2={svgX} y2={svgY} stroke="#38bdf8" strokeDasharray="2 2" opacity="0.6" />
              <circle cx={svgX} cy={svgY} r="7" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
              <text x={svgX} y={svgY - 12} fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                {currentPerf.toFixed(0)} GFLOPS
              </text>
            </g>
          );
        })()}
      </svg>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem', background: '#080d1a', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <label style={{ fontSize: '0.85rem', color: '#e5e7eb', flexShrink: 0 }}>
          Intensidad Operacional (I): <strong style={{ color: 'var(--hpc-primary)' }}>{intensity.toFixed(2)} FLOPs/Byte</strong>
        </label>
        <input
          type="range"
          min="0.1"
          max="2.0"
          step="0.05"
          value={intensity}
          onChange={(e) => setIntensity(parseFloat(e.target.value))}
          style={{ flexGrow: 1, accentColor: '#f4b860', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={() => setIntensity(0.25)}
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '4px', background: '#111827', color: '#fff', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer' }}
          >
            Suma Vector
          </button>
          <button
            onClick={() => setIntensity(1.5)}
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '4px', background: '#111827', color: '#fff', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer' }}
          >
            GEMM (MatMul)
          </button>
        </div>
      </div>
    </div>
  );
};

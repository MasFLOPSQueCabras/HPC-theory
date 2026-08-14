import React, { useState } from 'react';

export const PpaDiagram: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'P' | 'PW' | 'A'>('P');

  const info = {
    P: {
      name: 'Performance (Rendimiento)',
      target: 'Maximizar IPC, Frecuencia y Throughput de Cómputo',
      metrics: [
        { label: 'IPC (Instrucciones por Ciclo)', detail: 'Decodificación ancha (Wide Issue) y ejecución fuera de orden (OoO).' },
        { label: 'Frecuencia de Reloj (GHz)', detail: 'Pipelines más profundos para acortar el retardo por ciclo.' },
        { label: 'Paralelismo Vectorial (SIMD)', detail: 'Instrucciones anchas (AVX-512, SVE) para multiplicar los FLOPs/ciclo.' },
        { label: 'Latencia de Instrucciones', detail: 'Cachés L1/L2 de baja latencia y predictores de saltos agresivos.' }
      ],
      tradeoff: 'Mayor rendimiento requiere estructuras complejas (ROB grande, más puertos) que disparan el consumo y el área.'
    },
    PW: {
      name: 'Power (Potencia y Eficiencia Térmica)',
      target: 'Minimizar Consumo Energético y Respetar el Límite Térmico (TDP)',
      metrics: [
        { label: 'Potencia Dinámica (P_dyn)', detail: 'P_dyn = α · C · V² · f. El voltaje (V) impacta cuadráticamente.' },
        { label: 'Potencia Estática / Fuga (P_leak)', detail: 'P_leak = I_leak · V. Crítica en nodos litográficos ultra-densos (<3nm).' },
        { label: 'Thermal Design Power (TDP)', detail: 'Límite de disipación de calor del encapsulado (~300W-500W en servidores).' },
        { label: 'Eficiencia Energética', detail: 'Métrica reina en centros de datos: GFLOPS / Watt.' }
      ],
      tradeoff: 'Reducir potencia bajando frecuencia o voltaje disminuye el rendimiento si no se compensa con paralelismo.'
    },
    A: {
      name: 'Area (Superficie de Silicio y Coste)',
      target: 'Optimizar Coste por Oblea y Balancear Caché vs Lógica',
      metrics: [
        { label: 'Tamaño del Die (mm²)', detail: 'Dies más grandes sufren menor rendimiento de fabricación (Defect Yield).' },
        { label: 'Densidad de Transistores', detail: 'Millones de transistores por mm² según el nodo de fabricación (N3, N2).' },
        { label: 'Reparto Silicio Caché vs Lógica', detail: 'Las cachés SRAM L3 consumen >50% del área del chip para reducir accesos a RAM.' },
        { label: 'Coste de Producción (Wafer Cost)', detail: 'El coste por chip bueno escala cuadráticamente con el área del die.' }
      ],
      tradeoff: 'Reducir el área recortando cachés o unidades de ejecución satura el ancho de banda y reduce el IPC.'
    }
  };

  const current = info[activePillar];

  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <span className="hpc-badge font-mono">Diseño de Silicio</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight mt-1">
            El Trilema del Silicio: PPA (Performance, Power, Area)
          </h4>
        </div>
        
        {/* Toggle buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800">
          <button
            type="button"
            onClick={() => setActivePillar('P')}
            className={`px-3 py-1 text-xs rounded-md font-semibold transition-all border ${
              activePillar === 'P'
                ? 'bg-slate-700 text-white border-slate-600 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Performance
          </button>
          <button
            type="button"
            onClick={() => setActivePillar('PW')}
            className={`px-3 py-1 text-xs rounded-md font-semibold transition-all border ${
              activePillar === 'PW'
                ? 'bg-slate-700 text-white border-slate-600 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Power
          </button>
          <button
            type="button"
            onClick={() => setActivePillar('A')}
            className={`px-3 py-1 text-xs rounded-md font-semibold transition-all border ${
              activePillar === 'A'
                ? 'bg-slate-700 text-white border-slate-600 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Area
          </button>
        </div>
      </div>

      {/* Main content: Triangle on left, details on right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-3 items-center">
        {/* Left: SVG Triangle (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <svg viewBox="0 0 260 210" className="w-full max-w-[240px] h-[190px] overflow-visible">
            {/* Triangle Background */}
            <polygon
              points="130,25 35,175 225,175"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />
            {/* Inner lines to center */}
            <line x1="130" y1="25" x2="130" y2="125" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
            <line x1="35" y1="175" x2="130" y2="125" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
            <line x1="225" y1="175" x2="130" y2="125" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

            {/* Performance Vertex (Top) */}
            <g onClick={() => setActivePillar('P')} className="cursor-pointer">
              <circle
                cx="130" cy="25" r={activePillar === 'P' ? 22 : 18}
                fill={activePillar === 'P' ? '#38bdf8' : '#1e293b'}
                stroke="#64748b" strokeWidth={activePillar === 'P' ? 2.5 : 1.5}
                className="transition-all duration-200"
              />
              <text x="130" y="30" fill={activePillar === 'P' ? '#0f172a' : '#ffffff'} fontSize="11" fontWeight="bold" textAnchor="middle">
                P
              </text>
              <text x="130" y="-3" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Performance</text>
            </g>

            {/* Power Vertex (Bottom-Left) */}
            <g onClick={() => setActivePillar('PW')} className="cursor-pointer">
              <circle
                cx="35" cy="175" r={activePillar === 'PW' ? 22 : 18}
                fill={activePillar === 'PW' ? '#38bdf8' : '#1e293b'}
                stroke="#64748b" strokeWidth={activePillar === 'PW' ? 2.5 : 1.5}
                className="transition-all duration-200"
              />
              <text x="35" y="180" fill={activePillar === 'PW' ? '#0f172a' : '#ffffff'} fontSize="10" fontWeight="bold" textAnchor="middle">
                PW
              </text>
              <text x="35" y="206" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Power</text>
            </g>

            {/* Area Vertex (Bottom-Right) */}
            <g onClick={() => setActivePillar('A')} className="cursor-pointer">
              <circle
                cx="225" cy="175" r={activePillar === 'A' ? 22 : 18}
                fill={activePillar === 'A' ? '#38bdf8' : '#1e293b'}
                stroke="#64748b" strokeWidth={activePillar === 'A' ? 2.5 : 1.5}
                className="transition-all duration-200"
              />
              <text x="225" y="180" fill={activePillar === 'A' ? '#0f172a' : '#ffffff'} fontSize="11" fontWeight="bold" textAnchor="middle">
                A
              </text>
              <text x="225" y="206" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Area</text>
            </g>
          </svg>
        </div>

        {/* Right: Dynamic Pillar Info (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">{current.name}</span>
            <span className="text-xs text-slate-400 font-medium">({current.target})</span>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {current.metrics.map((m, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="text-xs font-bold text-white">{m.label}</div>
                <div className="text-[11px] text-slate-400 mt-1 leading-tight">{m.detail}</div>
              </div>
            ))}
          </div>

          {/* Tradeoff warning */}
          <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 text-xs text-slate-300">
            <strong className="text-white">Compromiso (Trade-off): </strong>
            {current.tradeoff}
          </div>
        </div>
      </div>
    </div>
  );
};

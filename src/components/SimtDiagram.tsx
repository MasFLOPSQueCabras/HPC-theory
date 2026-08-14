import React, { useState } from 'react';

export const SimtDiagram: React.FC = () => {
  const [viewStep, setViewStep] = useState<'converged' | 'diverged'>('diverged');

  return (
    <div className="hpc-card p-6 w-full max-w-6xl mx-auto bg-[#0f131d] border border-[#232a3d] shadow-2xl">
      {/* Top Header & Interactive Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#232a3d]">
        <div className="flex items-center gap-2">
          <span className="hpc-badge-purple font-mono text-xs mb-0">Arquitectura GPU</span>
          <span className="text-sm text-slate-300">
            32 Hilos por Warp comparten un único <strong className="text-white">Program Counter (PC)</strong>
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#07080c] border border-[#232a3d]">
          <button
            type="button"
            onClick={() => setViewStep('converged')}
            className={`px-3.5 py-1.5 text-xs rounded-md font-semibold transition-all border ${
              viewStep === 'converged'
                ? 'bg-[#10241e] text-[#34d399] border-[#34d399]/40 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            1. Ejecución Convergente (100% Eficiencia)
          </button>
          <button
            type="button"
            onClick={() => setViewStep('diverged')}
            className={`px-3.5 py-1.5 text-xs rounded-md font-semibold transition-all border ${
              viewStep === 'diverged'
                ? 'bg-[#1e131d] text-[#fb7185] border-[#fb7185]/40 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            2. Divergencia de Warp (Serialización)
          </button>
        </div>
      </div>

      {/* Main Full-Width SVG Canvas */}
      <div className="my-3 p-4 rounded-xl bg-[#07080c] border border-[#232a3d]">
        {viewStep === 'converged' ? (
          <svg viewBox="0 0 740 220" className="w-full h-[220px]">
            {/* Warp Scheduler Unit */}
            <rect x="10" y="8" width="720" height="40" rx="6" fill="#151a27" stroke="#34d399" strokeWidth="1.5" />
            <text x="370" y="27" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
              Warp Scheduler &amp; Dispatch Unit (1 Instrucción por Ciclo para 32 Hilos en Lockstep)
            </text>
            <text x="370" y="41" fill="#34d399" fontSize="10.5" textAnchor="middle">
              Instrucción compartida: c[i] = a[i] * b[i] + d[i] (FMA)
            </text>

            {/* 8 Parallel Threads / Lanes */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((tid) => (
              <g key={tid}>
                {/* Arrow down from scheduler */}
                <line x1={55 + tid * 88} y1="48" x2={55 + tid * 88} y2="72" stroke="#34d399" strokeWidth="1.8" />
                <polygon points={`${52 + tid * 88},70 ${58 + tid * 88},70 ${55 + tid * 88},76`} fill="#34d399" />

                {/* Thread Card */}
                <rect x={18 + tid * 88} y="76" width="74" height="68" rx="6" fill="#151a27" stroke="#232a3d" strokeWidth="1.5" />
                
                <text x={55 + tid * 88} y="96" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  {tid === 7 ? 'T31' : `Hilo T${tid}`}
                </text>
                
                <rect x={24 + tid * 88} y="103" width="62" height="18" rx="3" fill="#10241e" stroke="#34d399" />
                <text x={55 + tid * 88} y="115" fill="#34d399" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  ALU ACTIVA
                </text>

                <text x={55 + tid * 88} y="136" fill="#94a3b8" fontSize="8.5" textAnchor="middle">
                  Dato [{tid === 7 ? '31' : tid}]
                </text>
              </g>
            ))}

            {/* Bottom Utilization Banner */}
            <rect x="10" y="160" width="720" height="48" rx="6" fill="#10241e" stroke="#34d399" strokeWidth="1.2" />
            <text x="370" y="180" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
              [CONVERGENCIA] Utilización Máxima del Silicio: 100%
            </text>
            <text x="370" y="196" fill="#cbd5e1" fontSize="10.5" textAnchor="middle">
              Todos los 32 carriles vectoriales procesan datos simultáneamente en 1 único ciclo de reloj.
            </text>
          </svg>
        ) : (
          <svg viewBox="0 0 740 235" className="w-full h-[235px]">
            {/* Branch Header */}
            <rect x="10" y="6" width="720" height="32" rx="5" fill="#151a27" stroke="#fb7185" strokeWidth="1.5" />
            <text x="370" y="26" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              Condicional Divergente: if (threadIdx.x % 2 == 0) {'{ Rama A }'} else {'{ Rama B }'}
            </text>

            {/* Step 1: Ciclo 1 (Rama A) */}
            <text x="14" y="58" fill="#e2e8f0" fontSize="11" fontWeight="bold">
              Ciclo 1 &rarr; Ejecutando Rama A (Hilos Pares Activos):
            </text>

            {[
              { tid: 0, active: true, label: 'T0: Activo', sub: 'Rama A', color: '#151a27', stroke: '#34d399', text: '#ffffff' },
              { tid: 1, active: false, label: 'T1: NOP', sub: 'Enmascarado', color: '#07080c', stroke: '#232a3d', text: '#64748b' },
              { tid: 2, active: true, label: 'T2: Activo', sub: 'Rama A', color: '#151a27', stroke: '#34d399', text: '#ffffff' },
              { tid: 3, active: false, label: 'T3: NOP', sub: 'Enmascarado', color: '#07080c', stroke: '#232a3d', text: '#64748b' },
              { tid: 4, active: true, label: 'T4: Activo', sub: 'Rama A', color: '#151a27', stroke: '#34d399', text: '#ffffff' },
              { tid: 5, active: false, label: 'T5: NOP', sub: 'Enmascarado', color: '#07080c', stroke: '#232a3d', text: '#64748b' },
              { tid: 6, active: true, label: 'T6: Activo', sub: 'Rama A', color: '#151a27', stroke: '#34d399', text: '#ffffff' },
              { tid: 7, active: false, label: 'T31: NOP', sub: 'Enmascarado', color: '#07080c', stroke: '#232a3d', text: '#64748b' }
            ].map((t, i) => (
              <g key={`step1-${i}`}>
                <rect x={16 + i * 90} y="66" width="78" height="34" rx="4" fill={t.color} stroke={t.stroke} strokeWidth="1.2" />
                <text x={55 + i * 90} y="80" fill={t.text} fontSize="9.5" fontWeight="bold" textAnchor="middle">{t.label}</text>
                <text x={55 + i * 90} y="93" fill={t.active ? '#cbd5e1' : '#475569'} fontSize="8" textAnchor="middle">{t.sub}</text>
              </g>
            ))}

            {/* Step 2: Ciclo 2 (Rama B) */}
            <text x="14" y="120" fill="#e2e8f0" fontSize="11" fontWeight="bold">
              Ciclo 2 &rarr; Ejecutando Rama B (Hilos Impares Activos):
            </text>

            {[
              { tid: 0, active: false, label: 'T0: NOP', sub: 'Enmascarado', color: '#07080c', stroke: '#232a3d', text: '#64748b' },
              { tid: 1, active: true, label: 'T1: Activo', sub: 'Rama B', color: '#151a27', stroke: '#fb7185', text: '#ffffff' },
              { tid: 2, active: false, label: 'T2: NOP', sub: 'Enmascarado', color: '#07080c', stroke: '#232a3d', text: '#64748b' },
              { tid: 3, active: true, label: 'T3: Activo', sub: 'Rama B', color: '#151a27', stroke: '#fb7185', text: '#ffffff' },
              { tid: 4, active: false, label: 'T4: NOP', sub: 'Enmascarado', color: '#07080c', stroke: '#232a3d', text: '#64748b' },
              { tid: 5, active: true, label: 'T5: Activo', sub: 'Rama B', color: '#151a27', stroke: '#fb7185', text: '#ffffff' },
              { tid: 6, active: false, label: 'T6: NOP', sub: 'Enmascarado', color: '#07080c', stroke: '#232a3d', text: '#64748b' },
              { tid: 7, active: true, label: 'T31: Activo', sub: 'Rama B', color: '#151a27', stroke: '#fb7185', text: '#ffffff' }
            ].map((t, i) => (
              <g key={`step2-${i}`}>
                <rect x={16 + i * 90} y="128" width="78" height="34" rx="4" fill={t.color} stroke={t.stroke} strokeWidth="1.2" />
                <text x={55 + i * 90} y="142" fill={t.text} fontSize="9.5" fontWeight="bold" textAnchor="middle">{t.label}</text>
                <text x={55 + i * 90} y="155" fill={t.active ? '#cbd5e1' : '#475569'} fontSize="8" textAnchor="middle">{t.sub}</text>
              </g>
            ))}

            {/* Bottom Penalty Warning */}
            <rect x="10" y="174" width="720" height="52" rx="6" fill="#1e131d" stroke="#fb7185" strokeWidth="1.2" />
            <text x="370" y="194" fill="#fb7185" fontSize="11.5" fontWeight="bold" textAnchor="middle">
              [PENALIZACIÓN] Serialización Forzada: Tiempo Total = Tiempo(Rama A) + Tiempo(Rama B)
            </text>
            <text x="370" y="212" fill="#cbd5e1" fontSize="10" textAnchor="middle">
              El hardware apaga los carriles inactivos mediante máscaras de predicado (Predicate Bits), reduciendo el throughput al 50%.
            </text>
          </svg>
        )}
      </div>

      {/* Summary Footer */}
      <div className="p-3.5 rounded-lg bg-[#07080c] border border-[#232a3d] text-center text-xs text-slate-300 flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded bg-[#161d2d] text-[#e6ff00] font-mono text-[10px] font-bold border border-[#e6ff00]/40">REGLA GPU</span>
        <span>Organizar los datos para que todos los hilos del mismo warp ejecuten exactamente la misma rama condicional simultáneamente.</span>
      </div>
    </div>
  );
};

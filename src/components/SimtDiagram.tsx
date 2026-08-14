import React, { useState } from 'react';

export const SimtDiagram: React.FC = () => {
  const [viewStep, setViewStep] = useState<'converged' | 'diverged'>('diverged');

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      {/* Top Header & Interactive Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.6rem' }}>
        <div>
          <span className="hpc-badge" style={{ margin: 0, fontSize: '0.72rem' }}>Arquitectura GPU</span>
          <span style={{ marginLeft: '0.6rem', fontSize: '0.86rem', color: '#cbd5e1' }}>
            32 Hilos por Warp comparten un único <strong>Program Counter (PC)</strong>
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', background: '#070a12', padding: '0.25rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setViewStep('converged')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '5px',
              border: 'none',
              background: viewStep === 'converged' ? 'rgba(52, 211, 153, 0.2)' : 'transparent',
              color: viewStep === 'converged' ? '#34d399' : '#94a3b8',
              fontWeight: viewStep === 'converged' ? 700 : 500,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            ⚡ 1. Ejecución Convergente (100% Eficiencia)
          </button>
          <button
            onClick={() => setViewStep('diverged')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '5px',
              border: 'none',
              background: viewStep === 'diverged' ? 'rgba(248, 113, 113, 0.2)' : 'transparent',
              color: viewStep === 'diverged' ? '#f87171' : '#94a3b8',
              fontWeight: viewStep === 'diverged' ? 700 : 500,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            ⚠️ 2. Divergencia de Warp (Serialización)
          </button>
        </div>
      </div>

      {/* Main Full-Width SVG Canvas */}
      <div style={{ background: '#070a12', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        {viewStep === 'converged' ? (
          <svg viewBox="0 0 740 220" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Warp Scheduler Unit */}
            <rect x="10" y="8" width="720" height="38" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.8" />
            <text x="370" y="26" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              Warp Scheduler &amp; Dispatch Unit (1 Instrucción por Ciclo para los 32 Hilos en Lockstep)
            </text>
            <text x="370" y="39" fill="#38bdf8" fontSize="9.5" textAnchor="middle">
              Instrucción compartida: c[i] = a[i] * b[i] + d[i] (FMA)
            </text>

            {/* 8 Parallel Threads / Lanes */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((tid) => (
              <g key={tid}>
                {/* Arrow down from scheduler */}
                <line x1={55 + tid * 88} y1="46" x2={55 + tid * 88} y2="72" stroke="#38bdf8" strokeWidth="1.8" />
                <polygon points={`${52 + tid * 88},70 ${58 + tid * 88},70 ${55 + tid * 88},76`} fill="#38bdf8" />

                {/* Thread Card */}
                <rect x={18 + tid * 88} y="76" width="74" height="68" rx="6" fill="rgba(52, 211, 153, 0.12)" stroke="#34d399" strokeWidth="1.5" />
                
                <text x={55 + tid * 88} y="96" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  {tid === 7 ? 'T31' : `Hilo T${tid}`}
                </text>
                
                <rect x={24 + tid * 88} y="103" width="62" height="18" rx="3" fill="#070a12" stroke="rgba(52,211,153,0.3)" />
                <text x={55 + tid * 88} y="115" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  ALU ACTIVA
                </text>

                <text x={55 + tid * 88} y="136" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Dato [{tid === 7 ? '31' : tid}]
                </text>
              </g>
            ))}

            {/* Bottom Utilization Banner */}
            <rect x="10" y="160" width="720" height="48" rx="6" fill="rgba(52, 211, 153, 0.08)" stroke="rgba(52, 211, 153, 0.35)" strokeWidth="1.2" />
            <text x="370" y="180" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
              ⚡ Utilización Máxima del Silicio: 100%
            </text>
            <text x="370" y="196" fill="#cbd5e1" fontSize="10" textAnchor="middle">
              Todos los 32 carriles vectoriales procesan datos simultáneamente en <strong>1 único ciclo de reloj</strong>.
            </text>
          </svg>
        ) : (
          <svg viewBox="0 0 740 235" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Branch Header */}
            <rect x="10" y="6" width="720" height="30" rx="5" fill="#1e293b" stroke="#f87171" strokeWidth="1.5" />
            <text x="370" y="25" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
              Condicional Divergente: if (threadIdx.x % 2 == 0) {'{ Rama A }'} else {'{ Rama B }'}
            </text>

            {/* Step 1: Ciclo 1 (Rama A) */}
            <text x="14" y="58" fill="#38bdf8" fontSize="10" fontWeight="bold">
              Ciclo 1 &rarr; Ejecutando Rama A (Hilos Pares Activos):
            </text>

            {[
              { tid: 0, active: true, label: 'T0: Activo', sub: 'Rama A', color: 'rgba(52,211,153,0.15)', stroke: '#34d399', text: '#34d399' },
              { tid: 1, active: false, label: 'T1: NOP', sub: 'Enmascarado', color: 'rgba(255,255,255,0.02)', stroke: 'rgba(255,255,255,0.08)', text: '#64748b' },
              { tid: 2, active: true, label: 'T2: Activo', sub: 'Rama A', color: 'rgba(52,211,153,0.15)', stroke: '#34d399', text: '#34d399' },
              { tid: 3, active: false, label: 'T3: NOP', sub: 'Enmascarado', color: 'rgba(255,255,255,0.02)', stroke: 'rgba(255,255,255,0.08)', text: '#64748b' },
              { tid: 4, active: true, label: 'T4: Activo', sub: 'Rama A', color: 'rgba(52,211,153,0.15)', stroke: '#34d399', text: '#34d399' },
              { tid: 5, active: false, label: 'T5: NOP', sub: 'Enmascarado', color: 'rgba(255,255,255,0.02)', stroke: 'rgba(255,255,255,0.08)', text: '#64748b' },
              { tid: 6, active: true, label: 'T6: Activo', sub: 'Rama A', color: 'rgba(52,211,153,0.15)', stroke: '#34d399', text: '#34d399' },
              { tid: 7, active: false, label: 'T31: NOP', sub: 'Enmascarado', color: 'rgba(255,255,255,0.02)', stroke: 'rgba(255,255,255,0.08)', text: '#64748b' }
            ].map((t, i) => (
              <g key={`step1-${i}`}>
                <rect x={16 + i * 90} y="66" width="78" height="34" rx="4" fill={t.color} stroke={t.stroke} strokeWidth="1.2" />
                <text x={55 + i * 90} y="80" fill={t.text} fontSize="9.5" fontWeight="bold" textAnchor="middle">{t.label}</text>
                <text x={55 + i * 90} y="93" fill={t.active ? '#ffffff' : '#475569'} fontSize="7.5" textAnchor="middle">{t.sub}</text>
              </g>
            ))}

            {/* Step 2: Ciclo 2 (Rama B) */}
            <text x="14" y="120" fill="#f4b860" fontSize="10" fontWeight="bold">
              Ciclo 2 &rarr; Ejecutando Rama B (Hilos Impares Activos):
            </text>

            {[
              { tid: 0, active: false, label: 'T0: NOP', sub: 'Enmascarado', color: 'rgba(255,255,255,0.02)', stroke: 'rgba(255,255,255,0.08)', text: '#64748b' },
              { tid: 1, active: true, label: 'T1: Activo', sub: 'Rama B', color: 'rgba(244,184,96,0.15)', stroke: '#f4b860', text: '#f4b860' },
              { tid: 2, active: false, label: 'T2: NOP', sub: 'Enmascarado', color: 'rgba(255,255,255,0.02)', stroke: 'rgba(255,255,255,0.08)', text: '#64748b' },
              { tid: 3, active: true, label: 'T3: Activo', sub: 'Rama B', color: 'rgba(244,184,96,0.15)', stroke: '#f4b860', text: '#f4b860' },
              { tid: 4, active: false, label: 'T4: NOP', sub: 'Enmascarado', color: 'rgba(255,255,255,0.02)', stroke: 'rgba(255,255,255,0.08)', text: '#64748b' },
              { tid: 5, active: true, label: 'T5: Activo', sub: 'Rama B', color: 'rgba(244,184,96,0.15)', stroke: '#f4b860', text: '#f4b860' },
              { tid: 6, active: false, label: 'T6: NOP', sub: 'Enmascarado', color: 'rgba(255,255,255,0.02)', stroke: 'rgba(255,255,255,0.08)', text: '#64748b' },
              { tid: 7, active: true, label: 'T31: Activo', sub: 'Rama B', color: 'rgba(244,184,96,0.15)', stroke: '#f4b860', text: '#f4b860' }
            ].map((t, i) => (
              <g key={`step2-${i}`}>
                <rect x={16 + i * 90} y="128" width="78" height="34" rx="4" fill={t.color} stroke={t.stroke} strokeWidth="1.2" />
                <text x={55 + i * 90} y="142" fill={t.text} fontSize="9.5" fontWeight="bold" textAnchor="middle">{t.label}</text>
                <text x={55 + i * 90} y="155" fill={t.active ? '#ffffff' : '#475569'} fontSize="7.5" textAnchor="middle">{t.sub}</text>
              </g>
            ))}

            {/* Bottom Penalty Warning */}
            <rect x="10" y="174" width="720" height="52" rx="6" fill="rgba(248, 113, 113, 0.06)" stroke="rgba(248, 113, 113, 0.3)" strokeWidth="1.2" />
            <text x="370" y="194" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
              ⚠️ Serialización Forzada: Tiempo Total = Tiempo(Rama A) + Tiempo(Rama B)
            </text>
            <text x="370" y="212" fill="#cbd5e1" fontSize="9.5" textAnchor="middle">
              El hardware apaga los carriles inactivos mediante <strong>máscaras de predicado (Predicate Bits)</strong>, reduciendo el throughput al <strong>50%</strong>.
            </text>
          </svg>
        )}
      </div>

      {/* Summary Footer */}
      <div style={{ marginTop: '0.8rem', background: '#070a12', padding: '0.5rem 1rem', borderRadius: '6px', textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
        💡 <strong>Regla de Oro en Programación de GPUs (CUDA / HIP / SYCL):</strong> Agrupar datos para que todos los hilos del mismo warp tomen la misma decisión lógica simultáneamente.
      </div>
    </div>
  );
};

import React, { useState } from 'react';

export const SimtDiagram: React.FC = () => {
  const [viewStep, setViewStep] = useState<'converged' | 'diverged'>('diverged');

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1.05rem' }}>SIMT: Estructura de Warp y Divergencia en GPU</h4>
        
        <div style={{ display: 'flex', gap: '0.3rem', background: '#070a12', padding: '0.2rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setViewStep('converged')}
            style={{
              padding: '0.3rem 0.7rem',
              borderRadius: '5px',
              border: 'none',
              background: viewStep === 'converged' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: viewStep === 'converged' ? '#ffffff' : '#94a3b8',
              fontWeight: viewStep === 'converged' ? 700 : 500,
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Ejecución Convergente (100%)
          </button>
          <button
            onClick={() => setViewStep('diverged')}
            style={{
              padding: '0.3rem 0.7rem',
              borderRadius: '5px',
              border: 'none',
              background: viewStep === 'diverged' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: viewStep === 'diverged' ? '#ffffff' : '#94a3b8',
              fontWeight: viewStep === 'diverged' ? 700 : 500,
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Divergencia de Warp (Serialización)
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '1.2rem', alignItems: 'center' }}>
        
        {/* SVG Canvas for SIMT */}
        <div style={{ background: '#070a12', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          
          {viewStep === 'converged' ? (
            <svg viewBox="0 0 350 160" style={{ width: '100%', height: '160px' }}>
              {/* Warp Controller */}
              <rect x="10" y="10" width="330" height="28" rx="5" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
              <text x="175" y="27" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                Warp Issue Unit: 1 Instrucción Compartida para 32 Hilos (Lockstep)
              </text>

              {/* 4 Representative Threads */}
              {[0, 1, 2, 3].map((tid) => (
                <g key={tid}>
                  {/* Vertical Execution Arrow */}
                  <line x1={45 + tid * 85} y1="45" x2={45 + tid * 85} y2="70" stroke="#cbd5e1" strokeWidth="1.5" />

                  {/* Active Thread Box */}
                  <rect x={15 + tid * 85} y="70" width="65" height="40" rx="4" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" />
                  <text x={47 + tid * 85} y="86" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Hilo T{tid}</text>
                  <text x={47 + tid * 85} y="100" fill="#cbd5e1" fontSize="7.5" textAnchor="middle">Ejecutando</text>
                </g>
              ))}

              {/* Bottom Utilization */}
              <rect x="10" y="125" width="330" height="24" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" />
              <text x="175" y="141" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                ⚡ Utilización del Silicio: 100% (Todos los carriles del Warp activos)
              </text>
            </svg>
          ) : (
            <svg viewBox="0 0 350 160" style={{ width: '100%', height: '160px' }}>
              {/* Divergent Instruction */}
              <rect x="10" y="8" width="330" height="24" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
              <text x="175" y="24" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                if (tid % 2 == 0) {'{ Ruta A }'} else {'{ Ruta B }'}
              </text>

              {/* Step 1: Cycle 0-N (Ruta A) */}
              <text x="10" y="48" fill="#94a3b8" fontSize="8.5" fontWeight="bold">Paso 1 (Ruta A):</text>
              {[
                { tid: 0, state: 'Activo (Ruta A)', color: 'rgba(255,255,255,0.15)', text: '#ffffff' },
                { tid: 1, state: 'Enmascarado', color: '#070a12', text: '#64748b' },
                { tid: 2, state: 'Activo (Ruta A)', color: 'rgba(255,255,255,0.15)', text: '#ffffff' },
                { tid: 3, state: 'Enmascarado', color: '#070a12', text: '#64748b' }
              ].map((t, i) => (
                <g key={i}>
                  <rect x={70 + i * 68} y="38" width="62" height="20" rx="3" fill={t.color} stroke="rgba(255,255,255,0.15)" />
                  <text x={101 + i * 68} y="51" fill={t.text} fontSize="7.5" textAnchor="middle">T{t.tid}: {t.state}</text>
                </g>
              ))}

              {/* Step 2: Cycle N-2N (Ruta B) */}
              <text x="10" y="85" fill="#94a3b8" fontSize="8.5" fontWeight="bold">Paso 2 (Ruta B):</text>
              {[
                { tid: 0, state: 'Enmascarado', color: '#070a12', text: '#64748b' },
                { tid: 1, state: 'Activo (Ruta B)', color: 'rgba(255,255,255,0.15)', text: '#ffffff' },
                { tid: 2, state: 'Enmascarado', color: '#070a12', text: '#64748b' },
                { tid: 3, state: 'Activo (Ruta B)', color: 'rgba(255,255,255,0.15)', text: '#ffffff' }
              ].map((t, i) => (
                <g key={i}>
                  <rect x={70 + i * 68} y="75" width="62" height="20" rx="3" fill={t.color} stroke="rgba(255,255,255,0.15)" />
                  <text x={101 + i * 68} y="88" fill={t.text} fontSize="7.5" textAnchor="middle">T{t.tid}: {t.state}</text>
                </g>
              ))}

              {/* Impact Card */}
              <rect x="10" y="112" width="330" height="40" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
              <text x="175" y="127" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                ⚠️ Serialización: Tiempo Total = Tiempo(Ruta A) + Tiempo(Ruta B)
              </text>
              <text x="175" y="142" fill="#cbd5e1" fontSize="7.5" textAnchor="middle">
                La GPU ejecuta ambas ramas en serie enmascarando los hilos inactivos.
              </text>
            </svg>
          )}

        </div>

        {/* Right Info Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div className="hpc-card" style={{ padding: '0.9rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Modelo GPU</span>
            <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Warps y Wavefronts</h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              En CUDA (NVIDIA), <strong>32 hilos forman un Warp</strong>. En ROCm (AMD), <strong>64 hilos forman un Wavefront</strong>. Todos comparten el mismo contador de programa (PC).
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '0.9rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Regla de Oro en HPC</span>
            <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Evitar Divergencias</h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              Agrupar datos para que todos los hilos del mismo warp tomen la misma decisión lógica simultáneamente, conservando el 100% de la capacidad de cómputo.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

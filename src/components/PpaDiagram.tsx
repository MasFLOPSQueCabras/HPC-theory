import React, { useState } from 'react';

export const PpaDiagram: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'P' | 'PW' | 'A'>('P');

  const info = {
    P: {
      name: 'Performance (Rendimiento)',
      badge: 'badge-cyan',
      color: '#00f2fe',
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
      badge: 'badge-amber',
      color: '#f59e0b',
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
      badge: 'badge-emerald',
      color: '#10b981',
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
    <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h4 style={{ margin: 0, color: '#00f2fe', fontSize: '1.1rem' }}>El Trilema del Silicio: PPA (Performance, Power, Area)</h4>
          <span style={{ fontSize: '0.78rem', color: '#94a3af' }}>Los tres pilares interdependientes del diseño de microarquitecturas</span>
        </div>
        
        {/* Toggle buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', background: '#0b0f19', padding: '0.25rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setActivePillar('P')}
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: '6px',
              border: 'none',
              background: activePillar === 'P' ? '#00f2fe' : 'transparent',
              color: activePillar === 'P' ? '#0b0f19' : '#9ca3af',
              fontWeight: 'bold',
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Performance
          </button>
          <button
            onClick={() => setActivePillar('PW')}
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: '6px',
              border: 'none',
              background: activePillar === 'PW' ? '#f59e0b' : 'transparent',
              color: activePillar === 'PW' ? '#0b0f19' : '#9ca3af',
              fontWeight: 'bold',
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Power
          </button>
          <button
            onClick={() => setActivePillar('A')}
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: '6px',
              border: 'none',
              background: activePillar === 'A' ? '#10b981' : 'transparent',
              color: activePillar === 'A' ? '#0b0f19' : '#9ca3af',
              fontWeight: 'bold',
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Area
          </button>
        </div>
      </div>

      {/* Main Grid: SVG on Left, Rich Card on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', alignItems: 'center' }}>
        
        {/* SVG Diagram */}
        <div style={{ background: '#0b0f19', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 260 230" style={{ width: '100%', height: '210px', overflow: 'visible' }}>
            {/* Triangle Background */}
            <polygon
              points="130,35 35,185 225,185"
              fill="rgba(30, 41, 59, 0.5)"
              stroke="#334155"
              strokeWidth="2"
            />

            {/* Inner Balance Lines to Center */}
            <line x1="130" y1="35" x2="130" y2="135" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="35" y1="185" x2="130" y2="135" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="225" y1="185" x2="130" y2="135" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Center Balance Circle */}
            <circle cx="130" cy="135" r="14" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <text x="130" y="139" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">PPA</text>

            {/* Node P (Top) */}
            <g onClick={() => setActivePillar('P')} style={{ cursor: 'pointer' }}>
              <circle
                cx="130"
                cy="35"
                r="22"
                fill={activePillar === 'P' ? '#00f2fe' : '#1e293b'}
                stroke="#00f2fe"
                strokeWidth={activePillar === 'P' ? '3' : '2'}
              />
              <text x="130" y="40" fill={activePillar === 'P' ? '#0b0f19' : '#fff'} fontSize="11" fontWeight="bold" textAnchor="middle">
                PERF
              </text>
              <text x="130" y="8" fill="#00f2fe" fontSize="10" fontWeight="bold" textAnchor="middle">
                Performance
              </text>
            </g>

            {/* Node Power (Bottom Left) */}
            <g onClick={() => setActivePillar('PW')} style={{ cursor: 'pointer' }}>
              <circle
                cx="35"
                cy="185"
                r="22"
                fill={activePillar === 'PW' ? '#f59e0b' : '#1e293b'}
                stroke="#f59e0b"
                strokeWidth={activePillar === 'PW' ? '3' : '2'}
              />
              <text x="35" y="190" fill={activePillar === 'PW' ? '#0b0f19' : '#fff'} fontSize="10" fontWeight="bold" textAnchor="middle">
                POWER
              </text>
              <text x="35" y="222" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
                Potencia
              </text>
            </g>

            {/* Node Area (Bottom Right) */}
            <g onClick={() => setActivePillar('A')} style={{ cursor: 'pointer' }}>
              <circle
                cx="225"
                cy="185"
                r="22"
                fill={activePillar === 'A' ? '#10b981' : '#1e293b'}
                stroke="#10b981"
                strokeWidth={activePillar === 'A' ? '3' : '2'}
              />
              <text x="225" y="190" fill={activePillar === 'A' ? '#0b0f19' : '#fff'} fontSize="10" fontWeight="bold" textAnchor="middle">
                AREA
              </text>
              <text x="225" y="222" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">
                Área / Coste
              </text>
            </g>
          </svg>
        </div>

        {/* Right Column: Detailed Info Card */}
        <div style={{ background: '#0b0f19', padding: '1rem 1.2rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>Pilar Seleccionado</span>
              <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.05rem' }}>{current.name}</h3>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: '500', marginTop: '0.2rem' }}>
              🎯 Objetivo: {current.target}
            </div>
          </div>

          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', background: 'rgba(255,255,255,0.02)', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            {current.metrics.map((m, idx) => (
              <div key={idx} style={{ fontSize: '0.74rem' }}>
                <strong style={{ color: '#ffffff', display: 'block' }}>• {m.label}</strong>
                <span style={{ color: '#9ca3af', fontSize: '0.7rem', lineHeight: 1.25 }}>{m.detail}</span>
              </div>
            ))}
          </div>

          {/* Trade-off box */}
          <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '0.45rem 0.8rem', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.2)', fontSize: '0.73rem', color: '#cbd5e1' }}>
            ⚖️ <strong>Compromiso (Trade-off):</strong> {current.tradeoff}
          </div>
        </div>
      </div>
    </div>
  );
};

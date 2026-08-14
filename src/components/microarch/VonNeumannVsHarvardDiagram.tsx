import React, { useState } from 'react';

export const VonNeumannVsHarvardDiagram: React.FC = () => {
  const [activeArch, setActiveArch] = useState<'both' | 'vonneumann' | 'harvard'>('both');

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* Selector de Vistas */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1rem' }}>Comparativa Estructural: Von Neumann vs Harvard</h4>

        <div style={{ display: 'flex', gap: '0.3rem', background: '#070a12', padding: '0.2rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setActiveArch('both')}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              border: 'none',
              background: activeArch === 'both' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: activeArch === 'both' ? '#ffffff' : '#94a3b8',
              fontWeight: activeArch === 'both' ? 700 : 500,
              fontSize: '0.72rem',
              cursor: 'pointer'
            }}
          >
            Vista Paralela
          </button>
          <button
            onClick={() => setActiveArch('vonneumann')}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              border: 'none',
              background: activeArch === 'vonneumann' ? 'rgba(248, 113, 113, 0.2)' : 'transparent',
              color: activeArch === 'vonneumann' ? '#f87171' : '#94a3b8',
              fontWeight: activeArch === 'vonneumann' ? 700 : 500,
              fontSize: '0.72rem',
              cursor: 'pointer'
            }}
          >
            Von Neumann
          </button>
          <button
            onClick={() => setActiveArch('harvard')}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              border: 'none',
              background: activeArch === 'harvard' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: activeArch === 'harvard' ? '#38bdf8' : '#94a3b8',
              fontWeight: activeArch === 'harvard' ? 700 : 500,
              fontSize: '0.72rem',
              cursor: 'pointer'
            }}
          >
            Harvard
          </button>
        </div>
      </div>

      {/* Grid de 2 Columnas para las Arquitecturas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: activeArch === 'both' ? '1fr 1fr' : '1fr',
        gap: '1rem',
        alignItems: 'stretch'
      }}>
        
        {/* ================= 1. VON NEUMANN ================= */}
        {(activeArch === 'both' || activeArch === 'vonneumann') && (
          <div style={{
            background: 'rgba(248, 113, 113, 0.03)',
            border: '1px solid rgba(248, 113, 113, 0.25)',
            borderRadius: '10px',
            padding: '1rem',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="hpc-badge" style={{ margin: 0, background: 'rgba(248, 113, 113, 0.15)', color: '#f87171', border: '1px solid rgba(248, 113, 113, 0.3)' }}>
                1945 &bull; John von Neumann
              </span>
              <strong style={{ fontSize: '0.85rem', color: '#f87171' }}>Bus Único Compartido</strong>
            </div>

            <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', color: '#ffffff' }}>Arquitectura Von Neumann</h3>

            {/* Diagrama Visual Von Neumann */}
            <div style={{ background: '#070a12', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.6rem' }}>
              <svg viewBox="0 0 340 70" style={{ width: '100%', height: '65px' }}>
                {/* CPU Box */}
                <rect x="10" y="10" width="90" height="50" rx="5" fill="#1e293b" stroke="#f87171" strokeWidth="1.5" />
                <text x="55" y="32" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">CPU Core</text>
                <text x="55" y="47" fill="#94a3b8" fontSize="8" textAnchor="middle">ALU + Control</text>

                {/* Shared Bus */}
                <line x1="100" y1="35" x2="210" y2="35" stroke="#f87171" strokeWidth="2.5" />
                <polygon points="208,31 216,35 208,39" fill="#f87171" />
                <polygon points="102,31 94,35 102,39" fill="#f87171" />
                <text x="155" y="27" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">Bus Compartido</text>
                <text x="155" y="49" fill="#94a3b8" fontSize="7.5" textAnchor="middle">(Datos e Inst.)</text>

                {/* Unified Memory Box */}
                <rect x="215" y="10" width="115" height="50" rx="5" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="272" y="30" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Memoria Única</text>
                <text x="272" y="44" fill="#38bdf8" fontSize="7.5" textAnchor="middle">Instrucciones</text>
                <text x="272" y="54" fill="#f4b860" fontSize="7.5" textAnchor="middle">+ Datos (Variables)</text>
              </svg>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4, margin: '0 0 0.4rem 0' }}>
              <strong>Principio:</strong> Código y datos residen en el <strong>mismo espacio de memoria</strong> y viajan por el <strong>mismo bus físico</strong>.
            </p>

            <div style={{ background: '#0b0f19', padding: '0.5rem 0.7rem', borderRadius: '5px', fontSize: '0.74rem', color: '#e2e8f0', borderLeft: '3px solid #f87171' }}>
              ⚠️ <strong>Cuello de Botella (Von Neumann Bottleneck):</strong> En un ciclo $t$, la CPU solo puede leer una instrucción O acceder a un dato, forzando esperas en arquitecturas segmentadas.
            </div>
          </div>
        )}

        {/* ================= 2. HARVARD ================= */}
        {(activeArch === 'both' || activeArch === 'harvard') && (
          <div style={{
            background: 'rgba(56, 189, 248, 0.03)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '10px',
            padding: '1rem',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="hpc-badge" style={{ margin: 0, background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                1944 &bull; Harvard Mark I
              </span>
              <strong style={{ fontSize: '0.85rem', color: '#38bdf8' }}>Buses y Memorias Separadas</strong>
            </div>

            <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', color: '#ffffff' }}>Arquitectura Harvard</h3>

            {/* Diagrama Visual Harvard */}
            <div style={{ background: '#070a12', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.6rem' }}>
              <svg viewBox="0 0 340 70" style={{ width: '100%', height: '65px' }}>
                {/* CPU Box */}
                <rect x="10" y="10" width="90" height="50" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="55" y="32" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">CPU Core</text>
                <text x="55" y="47" fill="#94a3b8" fontSize="8" textAnchor="middle">Fetch + Exec</text>

                {/* Instruction Bus & Memory (Top) */}
                <line x1="100" y1="23" x2="215" y2="23" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="213,20 220,23 213,26" fill="#38bdf8" />
                <polygon points="102,20 95,23 102,26" fill="#38bdf8" />
                <text x="157" y="18" fill="#38bdf8" fontSize="7.5" fontWeight="bold" textAnchor="middle">Bus Instrucción</text>

                <rect x="220" y="8" width="110" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
                <text x="275" y="24" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">Memoria Instrucciones</text>

                {/* Data Bus & Memory (Bottom) */}
                <line x1="100" y1="48" x2="215" y2="48" stroke="#f4b860" strokeWidth="2" />
                <polygon points="213,45 220,48 213,51" fill="#f4b860" />
                <polygon points="102,45 95,48 102,51" fill="#f4b860" />
                <text x="157" y="60" fill="#f4b860" fontSize="7.5" fontWeight="bold" textAnchor="middle">Bus Datos</text>

                <rect x="220" y="38" width="110" height="24" rx="4" fill="#1e293b" stroke="#f4b860" strokeWidth="1.2" />
                <text x="275" y="54" fill="#f4b860" fontSize="8" fontWeight="bold" textAnchor="middle">Memoria Datos</text>
              </svg>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4, margin: '0 0 0.4rem 0' }}>
              <strong>Principio:</strong> Existen <strong>dos memorias y dos buses independientes</strong> para instrucciones y datos con anchos de palabra propios.
            </p>

            <div style={{ background: '#0b0f19', padding: '0.5rem 0.7rem', borderRadius: '5px', fontSize: '0.74rem', color: '#e2e8f0', borderLeft: '3px solid #38bdf8' }}>
              🚀 <strong>Acceso Simultáneo:</strong> La CPU puede leer una nueva instrucción (Fetch) y leer/escribir un operando (Memory) en el <strong>mismo ciclo de reloj</strong> sin contención.
            </div>
          </div>
        )}

      </div>

      {/* Síntesis Moderna en la Base */}
      <div style={{ marginTop: '0.7rem', background: '#070a12', padding: '0.55rem 0.9rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', fontSize: '0.78rem', color: '#cbd5e1' }}>
        💡 <strong>El Compromiso de la Industria (Harvard Modificada):</strong> Las CPUs modernas aplican <strong>Harvard en el nivel L1</strong> (L1 I-Cache y L1 D-Cache separadas) y <strong>Von Neumann en niveles superiores</strong> (L2, L3 y RAM unificadas).
      </div>
    </div>
  );
};

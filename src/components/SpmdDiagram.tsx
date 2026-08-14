import React from 'react';

export const SpmdDiagram: React.FC = () => {
  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.2rem', alignItems: 'center' }}>
        
        {/* SVG Canvas for SPMD */}
        <div style={{ background: '#070a12', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
            Mismo Código Binario &rarr; Hilos con Contadores de Programa (PC) Independientes
          </div>

          <svg viewBox="0 0 350 160" style={{ width: '100%', height: '160px' }}>
            {/* Shared Code Box */}
            <rect x="10" y="10" width="90" height="140" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
            <text x="55" y="30" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Código Fuente</text>
            <text x="55" y="48" fill="#cbd5e1" fontSize="8" textAnchor="middle">(Mismo Binario)</text>
            
            <line x1="20" y1="58" x2="90" y2="58" stroke="rgba(255,255,255,0.1)" />
            
            <text x="20" y="75" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">int id = get_id();</text>
            <text x="20" y="92" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">int start = id*N;</text>
            <text x="20" y="110" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">for(...) compute()</text>
            <text x="20" y="128" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">MPI_Send(...);</text>

            {/* Autonomous Threads */}
            {[
              { id: 0, range: '[0 ... N/4-1]', pc: 'PC = 0x4012' },
              { id: 1, range: '[N/4 ... N/2-1]', pc: 'PC = 0x4080' },
              { id: 2, range: '[N/2 ... 3N/4-1]', pc: 'PC = 0x4024' },
              { id: 3, range: '[3N/4 ... N-1]', pc: 'PC = 0x4098' }
            ].map((t, i) => (
              <g key={t.id}>
                {/* Arrow from Code to Thread */}
                <path d={`M 100 80 Q 120 ${30 + i * 36}, 140 ${30 + i * 36}`} stroke="#94a3b8" strokeWidth="1.2" fill="none" />

                {/* Thread Box */}
                <rect x="140" y={16 + i * 36} width="85" height="28" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
                <text x="148" y={30 + i * 36} fill="#ffffff" fontSize="9" fontWeight="bold">Hilo / Rank {t.id}</text>
                <text x="148" y={40 + i * 36} fill="#94a3b8" fontSize="7">{t.pc}</text>

                {/* Data Partition Box */}
                <rect x="240" y={16 + i * 36} width="95" height="28" rx="4" fill="#0b0f19" stroke="rgba(255,255,255,0.15)" />
                <text x="287" y={28 + i * 36} fill="#cbd5e1" fontSize="7.5" textAnchor="middle">Partición de Datos</text>
                <text x="287" y={39 + i * 36} fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">{t.range}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Right Explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div className="hpc-card" style={{ padding: '0.9rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Ejecución Asíncrona</span>
            <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Independencia de Hilos</h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              Cada proceso/hilo avanza a su propio ritmo con su propio <strong>Contador de Programa (PC)</strong>. Las ramas <code>if / else</code> divergentes no bloquean al resto de procesadores.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '0.9rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Modelos Dominantes</span>
            <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              • <strong>MPI (Message Passing Interface):</strong> Memoria distribuida entre nodos de cluster.<br />
              • <strong>OpenMP:</strong> Hilos concurrentes en memoria compartida multi-socket.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';

export const HarvardSlide: React.FC = () => {
  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.4rem', alignItems: 'center' }}>
        
        {/* Left: Diagram */}
        <div style={{ background: '#070a12', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span className="hpc-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              1944 &bull; Harvard Mark I
            </span>
            <span style={{ fontSize: '0.72rem', color: '#38bdf8' }}>Buses y Memorias Separadas</span>
          </div>

          <svg viewBox="0 0 340 120" style={{ width: '100%', height: '110px' }}>
            {/* CPU Box */}
            <rect x="10" y="15" width="100" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="60" y="45" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">CPU Core</text>
            <text x="60" y="65" fill="#38bdf8" fontSize="8.5" textAnchor="middle">Etapa Fetch</text>
            <text x="60" y="80" fill="#f4b860" fontSize="8.5" textAnchor="middle">Etapa Memory (MEM)</text>

            {/* Instruction Bus & Memory (Top) */}
            <line x1="110" y1="40" x2="205" y2="40" stroke="#38bdf8" strokeWidth="2.5" />
            <polygon points="203,36 212,40 203,44" fill="#38bdf8" />
            <polygon points="112,36 103,40 112,44" fill="#38bdf8" />
            <text x="157" y="32" fill="#38bdf8" fontSize="7.5" fontWeight="bold" textAnchor="middle">Bus Instrucción</text>

            <rect x="212" y="18" width="118" height="38" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="271" y="36" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Memoria Instrucciones</text>
            <text x="271" y="48" fill="#94a3b8" fontSize="7.5" textAnchor="middle">(Solo Código)</text>

            {/* Data Bus & Memory (Bottom) */}
            <line x1="110" y1="80" x2="205" y2="80" stroke="#f4b860" strokeWidth="2.5" />
            <polygon points="203,76 212,80 203,84" fill="#f4b860" />
            <polygon points="112,76 103,80 112,84" fill="#f4b860" />
            <text x="157" y="94" fill="#f4b860" fontSize="7.5" fontWeight="bold" textAnchor="middle">Bus de Datos</text>

            <rect x="212" y="64" width="118" height="38" rx="5" fill="#1e293b" stroke="#f4b860" strokeWidth="1.5" />
            <text x="271" y="82" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Memoria de Datos</text>
            <text x="271" y="94" fill="#94a3b8" fontSize="7.5" textAnchor="middle">(Variables / Stack / Heap)</text>
          </svg>
        </div>

        {/* Right: Technical Characteristics */}
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div className="hpc-card" style={{ padding: '0.9rem' }}>
            <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Principio de Diseño</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              Existen <strong>dos espacios de memoria físicos independientes</strong> y dos conjuntos de buses separados con anchos de palabra propios.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '0.9rem', borderLeft: '3px solid #38bdf8' }}>
            <h4 style={{ margin: '0 0 0.3rem 0', color: '#38bdf8', fontSize: '0.95rem' }}>🚀 La Gran Ventaja de Harvard</h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              La CPU puede realizar el <strong>Fetch de la siguiente instrucción</strong> al mismo tiempo exacto que lee o escribe un dato de memoria (<strong>Load/Store</strong>) en el <strong>mismo ciclo de reloj</strong> sin contención de bus.
            </p>
          </div>
        </div>

      </div>

      <div style={{ marginTop: '0.8rem', background: '#070a12', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.78rem', color: '#cbd5e1', textAlign: 'center' }}>
        💡 <strong>Uso actual:</strong> Base fundamental de los <strong>procesadores de señal digital (DSP)</strong> y del nivel de <strong>caché L1 (L1 I-Cache / L1 D-Cache)</strong> en todos los procesadores modernos.
      </div>
    </div>
  );
};

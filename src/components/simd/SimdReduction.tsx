import React from 'react';

export const SimdReduction: React.FC = () => {
  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
        
        {/* SVG Diagram */}
        <div style={{ background: '#070a12', padding: '1rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.6rem' }}>
            Árbol de Reducción Horizontal: O(log N) para Colapsar a un Escalar
          </div>

          <svg viewBox="0 0 380 180" style={{ width: '100%', height: '180px' }}>
            {/* Input Vector */}
            <text x="10" y="27" fill="#94a3b8" fontSize="10" fontWeight="bold">Vector ZMM:</text>
            {[10, 20, 30, 40].map((val, i) => (
              <g key={i}>
                <rect x={80 + i * 70} y="12" width="60" height="24" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
                <text x={110 + i * 70} y="28" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">{val}</text>
              </g>
            ))}

            {/* Level 1 Tree Lines */}
            <line x1="110" y1="36" x2="145" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="180" y1="36" x2="145" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="250" y1="36" x2="285" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="320" y1="36" x2="285" y2="70" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Level 1 Intermediates (Properly sized and centered) */}
            <rect x="105" y="70" width="80" height="24" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" />
            <text x="145" y="86" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">10 + 20 = 30</text>

            <rect x="245" y="70" width="80" height="24" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" />
            <text x="285" y="86" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">30 + 40 = 70</text>

            {/* Level 2 Tree Lines to Final Sum */}
            <line x1="145" y1="94" x2="215" y2="128" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="285" y1="94" x2="215" y2="128" stroke="#ffffff" strokeWidth="1.5" />

            {/* Final Sum Box */}
            <rect x="170" y="128" width="90" height="28" rx="4" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.4)" />
            <text x="215" y="146" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">Suma = 100</text>
          </svg>
        </div>

        {/* Right Info Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div className="hpc-card" style={{ padding: '1rem 1.2rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Reducción Vectorial</span>
            <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '1rem' }}>Sumas Horizontales</h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Colapsa todos los carriles de un vector ancho en un único resultado escalar mediante sumas o multiplicaciones por pares en árbol logarítmico en tiempo $O(\log N)$.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '1rem 1.2rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Aplicaciones Clave</span>
            <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              • Producto Punto (Dot Product) de vectores.<br />
              • Cálculo de normas euclidianas (L2 Norm).<br />
              • Búsqueda de mínimos y máximos globales en mallas.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

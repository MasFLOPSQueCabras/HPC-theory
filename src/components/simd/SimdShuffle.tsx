import React from 'react';

export const SimdShuffle: React.FC = () => {
  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
        
        {/* SVG Diagram */}
        <div style={{ background: '#070a12', padding: '1rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.6rem' }}>
            Permute / Shuffles: Cruce de Carriles en Silicio en 1 Ciclo
          </div>

          <svg viewBox="0 0 380 175" style={{ width: '100%', height: '175px' }}>
            {/* Input Vector */}
            <text x="10" y="27" fill="#94a3b8" fontSize="10" fontWeight="bold">Original:</text>
            {['A', 'B', 'C', 'D'].map((val, i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="14" width="60" height="24" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
                <text x={105 + i * 70} y="30" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Carril {i}: {val}</text>
              </g>
            ))}

            {/* Cross Lines */}
            <path d="M 105 38 Q 165 78, 315 120" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
            <path d="M 175 38 Q 140 78, 105 120" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
            <path d="M 245 38 Q 210 78, 175 120" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
            <path d="M 315 38 Q 280 78, 245 120" stroke="#94a3b8" strokeWidth="1.5" fill="none" />

            {/* Reordered Output Vector */}
            <text x="10" y="136" fill="#ffffff" fontSize="10" fontWeight="bold">Permutado:</text>
            {['B', 'C', 'D', 'A'].map((val, i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="120" width="60" height="26" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" />
                <text x={105 + i * 70} y="137" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Carril {i}: {val}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Right Info Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div className="hpc-card" style={{ padding: '1rem 1.2rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>En Silicio</span>
            <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '1rem' }}>Transposición Directa</h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Reordena, rota o transpone posiciones de elementos entre carriles vectoriales sin tocar la memoria RAM ni la jerarquía de caché L1/L2.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '1rem 1.2rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Instrucción Clave</span>
            <code style={{ display: 'block', margin: '0.3rem 0', fontSize: '0.8rem', color: '#f8fafc' }}>
              vpermd %zmm0, %zmm_ctrl, %zmm_out
            </code>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              Vital en algoritmos FFT (Fast Fourier Transform), transposición rápida de matrices y criptografía.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

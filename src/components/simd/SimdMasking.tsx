import React from 'react';

export const SimdMasking: React.FC = () => {
  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
        
        {/* SVG Diagram */}
        <div style={{ background: '#070a12', padding: '1rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.6rem' }}>
            Predicación sin Saltos: La Máscara k1 Enciende o Apaga Carriles
          </div>

          <svg viewBox="0 0 380 175" style={{ width: '100%', height: '175px' }}>
            {/* Input Vector */}
            <text x="10" y="28" fill="#94a3b8" fontSize="10" fontWeight="bold">Vector In:</text>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="14" width="62" height="24" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
                <text x={106 + i * 70} y="30" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">X[{i}]</text>
              </g>
            ))}

            {/* Mask Vector k1 */}
            <text x="10" y="75" fill="#ffffff" fontSize="10" fontWeight="bold">Máscara k1:</text>
            {[
              { val: '1 (Activo)', color: 'rgba(255,255,255,0.2)', border: 'rgba(255,255,255,0.4)', text: '#ffffff' },
              { val: '0 (Mute)', color: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.1)', text: '#64748b' },
              { val: '1 (Activo)', color: 'rgba(255,255,255,0.2)', border: 'rgba(255,255,255,0.4)', text: '#ffffff' },
              { val: '0 (Mute)', color: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.1)', text: '#64748b' }
            ].map((m, i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="60" width="62" height="24" rx="4" fill={m.color} stroke={m.border} />
                <text x={106 + i * 70} y="76" fill={m.text} fontSize="9" fontWeight="bold" textAnchor="middle">{m.val}</text>
              </g>
            ))}

            {/* Arrows */}
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1={106 + i * 70} y1="88" x2={106 + i * 70} y2="116" stroke={i % 2 === 0 ? '#ffffff' : '#475569'} strokeWidth="1.5" strokeDasharray={i % 2 === 0 ? 'none' : '2 2'} />
            ))}

            {/* Output Vector */}
            <text x="10" y="138" fill="#ffffff" fontSize="10" fontWeight="bold">Resultado:</text>
            {[
              { val: 'X[0] + 10' },
              { val: '0 / Previo' },
              { val: 'X[2] + 10' },
              { val: '0 / Previo' }
            ].map((res, i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="122" width="62" height="26" rx="4" fill={i % 2 === 0 ? 'rgba(255,255,255,0.1)' : '#070a12'} stroke="rgba(255,255,255,0.2)" />
                <text x={106 + i * 70} y="139" fill={i % 2 === 0 ? '#ffffff' : '#64748b'} fontSize="9" fontWeight="bold" textAnchor="middle">{res.val}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Right Info Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div className="hpc-card" style={{ padding: '1rem 1.2rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Control de Flujo</span>
            <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '1rem' }}>Predicación sin Saltos</h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Los registros de máscara (<code>k1-k7</code> en AVX-512) activan o desactivan carriles específicos. Permite vectorizar bucles con <code>if / else</code> sin incurrir en fallos de predicción de saltos.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '1rem 1.2rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Instrucción Clave</span>
            <code style={{ display: 'block', margin: '0.3rem 0', fontSize: '0.8rem', color: '#f8fafc' }}>
              vaddps %zmm0, %zmm1, %zmm2 {"{k1}"}
            </code>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              Solo los carriles donde <code>k1[i] == 1</code> aplican la suma; el resto retiene su estado anterior o se pone a cero.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

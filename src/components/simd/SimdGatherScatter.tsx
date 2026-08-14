import React from 'react';

export const SimdGatherScatter: React.FC = () => {
  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
        
        {/* SVG Diagram */}
        <div style={{ background: '#070a12', padding: '1rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.6rem' }}>
            Gather: Recolecta Direcciones Dispersas en RAM &rarr; Registro Contiguo
          </div>

          <svg viewBox="0 0 380 175" style={{ width: '100%', height: '175px' }}>
            {/* Scattered RAM */}
            <text x="10" y="25" fill="#94a3b8" fontSize="10" fontWeight="bold">RAM No Contigua:</text>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <g key={i}>
                <rect x={15 + i * 44} y="35" width="38" height="22" rx="3" fill={[1, 3, 6, 7].includes(i) ? 'rgba(255,255,255,0.18)' : '#1e293b'} stroke="rgba(255,255,255,0.15)" />
                <text x={34 + i * 44} y="50" fill={[1, 3, 6, 7].includes(i) ? '#ffffff' : '#64748b'} fontSize="9.5" fontWeight="bold" textAnchor="middle">M[{i}]</text>
              </g>
            ))}

            {/* Gather Lines */}
            <path d="M 78 58 Q 85 85, 105 116" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
            <path d="M 166 58 Q 170 85, 175 116" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
            <path d="M 298 58 Q 270 85, 245 116" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
            <path d="M 342 58 Q 330 85, 315 116" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />

            {/* Vector Register Gathered */}
            <text x="10" y="132" fill="#ffffff" fontSize="10" fontWeight="bold">Vector ZMM:</text>
            {[
              { idx: 'M[1]' }, { idx: 'M[3]' }, { idx: 'M[6]' }, { idx: 'M[7]' }
            ].map((reg, i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="118" width="60" height="28" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" />
                <text x={105 + i * 70} y="136" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">{reg.idx}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Right Info Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div className="hpc-card" style={{ padding: '1rem 1.2rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Memoria Dispersa</span>
            <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '1rem' }}>Gather (Lectura) / Scatter (Escritura)</h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Carga (Gather) o almacena (Scatter) elementos indexados por un vector de punteros directos (<code>A[B[i]]</code>), esencial para matrices dispersas (SpMV) y grafos.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '1rem 1.2rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Instrucción Clave</span>
            <code style={{ display: 'block', margin: '0.3rem 0', fontSize: '0.8rem', color: '#f8fafc' }}>
              vgatherdps (%rdi, %zmm_idx, 4), %zmm_out
            </code>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              Genera múltiples peticiones independientes a caché L1/L2 agrupándolas en un registro vectorial contiguo.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

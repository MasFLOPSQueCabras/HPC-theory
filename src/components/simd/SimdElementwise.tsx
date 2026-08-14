import React from 'react';

export const SimdElementwise: React.FC = () => {
  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
        
        {/* SVG Diagram */}
        <div style={{ background: '#070a12', padding: '1rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.6rem' }}>
            Operación Simultánea en Todos los Carriles (16 Floats en AVX-512)
          </div>

          <svg viewBox="0 0 380 175" style={{ width: '100%', height: '175px' }}>
            {/* Register A */}
            <text x="10" y="30" fill="#94a3b8" fontSize="10" fontWeight="bold">Vector A:</text>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="14" width="60" height="26" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
                <text x={105 + i * 70} y="31" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">A[{i}]</text>
              </g>
            ))}

            {/* Operator */}
            <text x="38" y="68" fill="#cbd5e1" fontSize="11" fontWeight="bold">&times; / +</text>

            {/* Register B */}
            <text x="10" y="85" fill="#94a3b8" fontSize="10" fontWeight="bold">Vector B:</text>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="70" width="60" height="26" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
                <text x={105 + i * 70} y="87" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">B[{i}]</text>
              </g>
            ))}

            {/* Arrows */}
            <defs>
              <marker id="arrowSimdElem" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
                <polygon points="0 0, 5 2.5, 0 5" fill="#94a3b8" />
              </marker>
            </defs>
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1={105 + i * 70} y1="98" x2={105 + i * 70} y2="120" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowSimdElem)" />
            ))}

            {/* Result Vector C */}
            <text x="10" y="142" fill="#ffffff" fontSize="10" fontWeight="bold">Vector C:</text>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="125" width="60" height="28" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" />
                <text x={105 + i * 70} y="143" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">A[{i}] &times; B[{i}]</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Right Info Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div className="hpc-card" style={{ padding: '1rem 1.2rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>AVX-512 / ARM SVE</span>
            <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '1rem' }}>Aritmética Elemento a Elemento</h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Aplica sumas, restas, multiplicaciones o divisiones simultáneamente carril por carril en 1 solo ciclo de reloj.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '1rem 1.2rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Pilar del HPC</span>
            <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '1rem' }}>Fused Multiply-Add (FMA)</h4>
            <code style={{ display: 'block', margin: '0.3rem 0', fontSize: '0.8rem', color: '#f8fafc' }}>
              vfmadd231ps %zmm0, %zmm1, %zmm2
            </code>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              Calcula <code>A &middot; B + C</code> sin redondeo intermedio, duplicando instantáneamente los FLOPs por ciclo.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

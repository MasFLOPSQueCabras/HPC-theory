import React from 'react';

export const SimdElementwise: React.FC = () => {
  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-[#0f131d] border border-[#232a3d]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* SVG Diagram */}
        <div className="md:col-span-7 bg-[#07080c] p-4 rounded-xl border border-[#232a3d]">
          <div className="text-xs text-slate-400 mb-2 font-mono">
            Operación Simultánea en Todos los Carriles (16 Floats en AVX-512)
          </div>

          <svg viewBox="0 0 380 175" className="w-full h-[175px]">
            {/* Register A */}
            <text x="10" y="30" fill="#94a3b8" fontSize="10" fontWeight="bold">Vector A:</text>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="14" width="60" height="26" rx="4" fill="#151a27" stroke="#232a3d" />
                <text x={105 + i * 70} y="31" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">A[{i}]</text>
              </g>
            ))}

            {/* Operator */}
            <text x="38" y="68" fill="#e6ff00" fontSize="11" fontWeight="bold">&times; / +</text>

            {/* Register B */}
            <text x="10" y="85" fill="#94a3b8" fontSize="10" fontWeight="bold">Vector B:</text>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="70" width="60" height="26" rx="4" fill="#151a27" stroke="#232a3d" />
                <text x={105 + i * 70} y="87" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">B[{i}]</text>
              </g>
            ))}

            {/* Arrows */}
            <defs>
              <marker id="arrowSimdElem" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
                <polygon points="0 0, 5 2.5, 0 5" fill="#e6ff00" />
              </marker>
            </defs>
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1={105 + i * 70} y1="98" x2={105 + i * 70} y2="120" stroke="#e6ff00" strokeWidth="1.5" markerEnd="url(#arrowSimdElem)" />
            ))}

            {/* Result Vector C */}
            <text x="10" y="142" fill="#ffffff" fontSize="10" fontWeight="bold">Vector C:</text>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="125" width="60" height="28" rx="4" fill="#161d2d" stroke="#38bdf8" strokeWidth="1" />
                <text x={105 + i * 70} y="143" fill="#38bdf8" fontSize="9.5" fontWeight="bold" textAnchor="middle">A[{i}] &times; B[{i}]</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Right Info Box */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="hpc-card p-4 border-t-2 border-t-[#c084fc]">
            <span className="hpc-badge-purple text-xs font-mono mb-1.5">AVX-512 / ARM SVE</span>
            <h4 className="m-0 text-base font-bold text-white mb-1.5">Aritmética Elemento a Elemento</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Aplica sumas, restas, multiplicaciones o divisiones simultáneamente carril por carril en 1 solo ciclo de reloj.
            </p>
          </div>

          <div className="hpc-card p-4 border-t-2 border-t-[#e6ff00]">
            <span className="hpc-badge-yellow text-xs font-mono mb-1.5">Pilar del HPC</span>
            <h4 className="m-0 text-base font-bold text-white mb-1.5">Fused Multiply-Add (FMA)</h4>
            <code className="block my-1.5 text-xs text-slate-200 bg-[#07080c] p-1.5 rounded border border-[#232a3d] font-mono">
              vfmadd231ps %zmm0, %zmm1, %zmm2
            </code>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Calcula <code className="text-white">A &middot; B + C</code> sin redondeo intermedio, duplicando instantáneamente los FLOPs por ciclo.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';

export const SimdGatherScatter: React.FC = () => {
  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-[#0f131d] border border-[#232a3d]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* SVG Diagram */}
        <div className="md:col-span-7 bg-[#07080c] p-4 rounded-xl border border-[#232a3d]">
          <div className="text-xs text-slate-400 mb-2 font-mono">
            Gather: Recolecta Direcciones Dispersas en RAM &rarr; Registro Contiguo
          </div>

          <svg viewBox="0 0 380 175" className="w-full h-[175px]">
            {/* Scattered RAM */}
            <text x="10" y="25" fill="#94a3b8" fontSize="10" fontWeight="bold">RAM No Contigua:</text>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <g key={i}>
                <rect x={15 + i * 44} y="35" width="38" height="22" rx="3" fill={[1, 3, 6, 7].includes(i) ? '#161d2d' : '#151a27'} stroke={[1, 3, 6, 7].includes(i) ? '#38bdf8' : '#232a3d'} strokeWidth="1" />
                <text x={34 + i * 44} y="50" fill={[1, 3, 6, 7].includes(i) ? '#38bdf8' : '#64748b'} fontSize="9.5" fontWeight="bold" textAnchor="middle">M[{i}]</text>
              </g>
            ))}

            {/* Gather Lines */}
            <path d="M 78 58 Q 85 85, 105 116" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
            <path d="M 166 58 Q 170 85, 175 116" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
            <path d="M 298 58 Q 270 85, 245 116" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
            <path d="M 342 58 Q 330 85, 315 116" stroke="#38bdf8" strokeWidth="1.5" fill="none" />

            {/* Vector Register Gathered */}
            <text x="10" y="132" fill="#ffffff" fontSize="10" fontWeight="bold">Vector ZMM:</text>
            {[
              { idx: 'M[1]' }, { idx: 'M[3]' }, { idx: 'M[6]' }, { idx: 'M[7]' }
            ].map((reg, i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="118" width="60" height="28" rx="4" fill="#161d2d" stroke="#38bdf8" strokeWidth="1" />
                <text x={105 + i * 70} y="136" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">{reg.idx}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Right Info Box */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="hpc-card p-4 border-t-2 border-t-[#38bdf8]">
            <span className="hpc-badge-cyan text-xs font-mono mb-1.5">Memoria Dispersa</span>
            <h4 className="m-0 text-base font-bold text-white mb-1.5">Gather (Lectura) / Scatter (Escritura)</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Carga (Gather) o almacena (Scatter) elementos indexados por un vector de punteros directos (<code className="text-white">A[B[i]]</code>), esencial para matrices dispersas (SpMV) y grafos.
            </p>
          </div>

          <div className="hpc-card p-4 border-t-2 border-t-[#e6ff00]">
            <span className="hpc-badge-yellow text-xs font-mono mb-1.5">Instrucción Clave</span>
            <code className="block my-1.5 text-xs text-slate-200 bg-[#07080c] p-1.5 rounded border border-[#232a3d] font-mono">
              vgatherdps (%rdi, %zmm_idx, 4), %zmm_out
            </code>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Genera múltiples peticiones independientes a caché L1/L2 agrupándolas en un registro vectorial contiguo.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

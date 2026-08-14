import React from 'react';

export const SimdShuffle: React.FC = () => {
  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-[#0f131d] border border-[#232a3d]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* SVG Diagram */}
        <div className="md:col-span-7 bg-[#07080c] p-4 rounded-xl border border-[#232a3d]">
          <div className="text-xs text-slate-400 mb-2 font-mono">
            Permute / Shuffles: Cruce de Carriles en Silicio en 1 Ciclo
          </div>

          <svg viewBox="0 0 380 175" className="w-full h-[175px]">
            {/* Input Vector */}
            <text x="10" y="27" fill="#94a3b8" fontSize="10" fontWeight="bold">Original:</text>
            {['A', 'B', 'C', 'D'].map((val, i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="14" width="60" height="24" rx="4" fill="#151a27" stroke="#232a3d" />
                <text x={105 + i * 70} y="30" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Carril {i}: {val}</text>
              </g>
            ))}

            {/* Cross Lines */}
            <path d="M 105 38 Q 165 78, 315 120" stroke="#e6ff00" strokeWidth="1.5" fill="none" />
            <path d="M 175 38 Q 140 78, 105 120" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
            <path d="M 245 38 Q 210 78, 175 120" stroke="#34d399" strokeWidth="1.5" fill="none" />
            <path d="M 315 38 Q 280 78, 245 120" stroke="#c084fc" strokeWidth="1.5" fill="none" />

            {/* Reordered Output Vector */}
            <text x="10" y="136" fill="#ffffff" fontSize="10" fontWeight="bold">Permutado:</text>
            {['B', 'C', 'D', 'A'].map((val, i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="120" width="60" height="26" rx="4" fill="#161d2d" stroke="#38bdf8" strokeWidth="1" />
                <text x={105 + i * 70} y="137" fill="#38bdf8" fontSize="9.5" fontWeight="bold" textAnchor="middle">Carril {i}: {val}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Right Info Box */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="hpc-card p-4 border-t-2 border-t-[#c084fc]">
            <span className="hpc-badge-purple text-xs font-mono mb-1.5">En Silicio</span>
            <h4 className="m-0 text-base font-bold text-white mb-1.5">Transposición Directa</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Reordena, rota o transpone posiciones de elementos entre carriles vectoriales sin tocar la memoria RAM ni la jerarquía de caché L1/L2.
            </p>
          </div>

          <div className="hpc-card p-4 border-t-2 border-t-[#e6ff00]">
            <span className="hpc-badge-yellow text-xs font-mono mb-1.5">Instrucción Clave</span>
            <code className="block my-1.5 text-xs text-slate-200 bg-[#07080c] p-1.5 rounded border border-[#232a3d] font-mono">
              vpermd %zmm0, %zmm_ctrl, %zmm_out
            </code>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Vital en algoritmos FFT (Fast Fourier Transform), transposición rápida de matrices y criptografía.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

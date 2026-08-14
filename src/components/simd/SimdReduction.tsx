import React from 'react';
import { Math } from '../Math';

export const SimdReduction: React.FC = () => {
  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-[#0f131d] border border-[#232a3d]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* SVG Diagram */}
        <div className="md:col-span-7 bg-[#07080c] p-4 rounded-xl border border-[#232a3d]">
          <div className="text-xs text-slate-400 mb-2 font-mono">
            Árbol de Reducción Horizontal: O(log N) para Colapsar a un Escalar
          </div>

          <svg viewBox="0 0 380 180" className="w-full h-[180px]">
            {/* Input Vector */}
            <text x="10" y="27" fill="#94a3b8" fontSize="10" fontWeight="bold">Vector ZMM:</text>
            {[10, 20, 30, 40].map((val, i) => (
              <g key={i}>
                <rect x={80 + i * 70} y="12" width="60" height="24" rx="4" fill="#151a27" stroke="#232a3d" />
                <text x={110 + i * 70} y="28" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">{val}</text>
              </g>
            ))}

            {/* Level 1 Tree Lines */}
            <line x1="110" y1="36" x2="145" y2="70" stroke="#475569" strokeWidth="1.5" />
            <line x1="180" y1="36" x2="145" y2="70" stroke="#475569" strokeWidth="1.5" />
            <line x1="250" y1="36" x2="285" y2="70" stroke="#475569" strokeWidth="1.5" />
            <line x1="320" y1="36" x2="285" y2="70" stroke="#475569" strokeWidth="1.5" />

            {/* Level 1 Intermediates */}
            <rect x="105" y="70" width="80" height="24" rx="4" fill="#161d2d" stroke="#38bdf8" strokeWidth="1" />
            <text x="145" y="86" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">10 + 20 = 30</text>

            <rect x="245" y="70" width="80" height="24" rx="4" fill="#161d2d" stroke="#38bdf8" strokeWidth="1" />
            <text x="285" y="86" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">30 + 40 = 70</text>

            {/* Level 2 Tree Lines to Final Sum */}
            <line x1="145" y1="94" x2="215" y2="128" stroke="#e6ff00" strokeWidth="1.5" />
            <line x1="285" y1="94" x2="215" y2="128" stroke="#e6ff00" strokeWidth="1.5" />

            {/* Final Sum Box */}
            <rect x="170" y="128" width="90" height="28" rx="4" fill="#161d2d" stroke="#e6ff00" strokeWidth="1.5" />
            <text x="215" y="146" fill="#e6ff00" fontSize="10.5" fontWeight="bold" textAnchor="middle">Suma = 100</text>
          </svg>
        </div>

        {/* Right Info Box */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="hpc-card p-4 border-t-2 border-t-[#c084fc]">
            <span className="hpc-badge-purple text-xs font-mono mb-1.5">Reducción Vectorial</span>
            <h4 className="m-0 text-base font-bold text-white mb-1.5">Sumas Horizontales</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Colapsa todos los carriles de un vector ancho en un único resultado escalar mediante sumas o multiplicaciones por pares en árbol logarítmico en tiempo <Math math="O(\log N)" />.
            </p>
          </div>

          <div className="hpc-card p-4 border-t-2 border-t-[#38bdf8]">
            <span className="hpc-badge-cyan text-xs font-mono mb-1.5">Aplicaciones Clave</span>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
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

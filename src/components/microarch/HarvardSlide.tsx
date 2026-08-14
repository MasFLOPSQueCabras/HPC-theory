import React from 'react';

export const HarvardSlide: React.FC = () => {
  return (
    <div className="hpc-card p-6 w-full max-w-5xl mx-auto bg-[#0f131d] border border-[#232a3d] shadow-2xl">
      <div className="p-6 rounded-xl bg-[#07080c] border border-[#38bdf8]/30 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mb-3 pb-2 border-b border-[#232a3d]">
          <span className="hpc-badge-cyan font-mono text-xs mb-0">
            1944 • Harvard Mark I
          </span>
          <span className="text-xs text-sky-400 font-mono">Buses y Memorias Físicamente Separadas</span>
        </div>

        <svg viewBox="0 0 640 200" className="w-full h-[210px]">
          {/* CPU Box */}
          <rect x="20" y="20" width="180" height="160" rx="8" fill="#151a27" stroke="#38bdf8" strokeWidth="2" />
          <text x="110" y="50" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">CPU Core</text>
          
          <rect x="35" y="65" width="150" height="42" rx="4" fill="#102030" stroke="#38bdf8" strokeWidth="1" />
          <text x="110" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Etapa Fetch (IF)</text>
          <text x="110" y="98" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Lectura de Código</text>

          <rect x="35" y="120" width="150" height="42" rx="4" fill="#161d2d" stroke="#e6ff00" strokeWidth="1" />
          <text x="110" y="140" fill="#e6ff00" fontSize="11" fontWeight="bold" textAnchor="middle">Etapa Memory (MEM)</text>
          <text x="110" y="153" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Load / Store de Datos</text>

          {/* Instruction Bus & Memory (Top) */}
          <line x1="200" y1="85" x2="420" y2="85" stroke="#38bdf8" strokeWidth="3.5" />
          <polygon points="415,78 430,85 415,92" fill="#38bdf8" />
          <polygon points="205,78 190,85 205,92" fill="#38bdf8" />
          <text x="310" y="75" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">Bus de Instrucciones</text>

          <rect x="430" y="45" width="190" height="60" rx="6" fill="#102030" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="525" y="72" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Memoria de Instrucciones</text>
          <text x="525" y="90" fill="#38bdf8" fontSize="9.5" textAnchor="middle">(Solo Código Ejecutable)</text>

          {/* Data Bus & Memory (Bottom) */}
          <line x1="200" y1="140" x2="420" y2="140" stroke="#e6ff00" strokeWidth="3.5" />
          <polygon points="415,133 430,140 415,147" fill="#e6ff00" />
          <polygon points="205,133 190,140 205,147" fill="#e6ff00" />
          <text x="310" y="130" fill="#e6ff00" fontSize="10.5" fontWeight="bold" textAnchor="middle">Bus de Datos</text>

          <rect x="430" y="118" width="190" height="60" rx="6" fill="#161d2d" stroke="#e6ff00" strokeWidth="1.5" />
          <text x="525" y="145" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Memoria de Datos</text>
          <text x="525" y="163" fill="#e6ff00" fontSize="9.5" textAnchor="middle">(Variables / Stack / Heap)</text>
        </svg>
      </div>
    </div>
  );
};

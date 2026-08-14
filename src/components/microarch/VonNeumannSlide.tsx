import React from 'react';

export const VonNeumannSlide: React.FC = () => {
  return (
    <div className="hpc-card p-6 w-full max-w-5xl mx-auto bg-[#0f131d] border border-[#232a3d] shadow-2xl">
      <div className="p-6 rounded-xl bg-[#07080c] border border-[#fb7185]/30 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mb-3 pb-2 border-b border-[#232a3d]">
          <span className="hpc-badge-rose font-mono text-xs mb-0">
            1945 • John von Neumann
          </span>
          <span className="text-xs text-slate-400 font-mono">Bus Único Compartido de Datos e Instrucciones</span>
        </div>

        <svg viewBox="0 0 640 180" className="w-full h-[200px]">
          {/* CPU Box */}
          <rect x="20" y="25" width="180" height="130" rx="8" fill="#151a27" stroke="#fb7185" strokeWidth="2" />
          <text x="110" y="55" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">CPU Core</text>
          <rect x="35" y="70" width="150" height="34" rx="4" fill="#07080c" stroke="#232a3d" />
          <text x="110" y="91" fill="#cbd5e1" fontSize="11" textAnchor="middle">Unidad de Control (CU)</text>
          <rect x="35" y="110" width="150" height="34" rx="4" fill="#07080c" stroke="#232a3d" />
          <text x="110" y="131" fill="#cbd5e1" fontSize="11" textAnchor="middle">ALU + Banco Registros</text>

          {/* Shared Bus */}
          <line x1="200" y1="90" x2="420" y2="90" stroke="#fb7185" strokeWidth="4" />
          <polygon points="415,82 430,90 415,98" fill="#fb7185" />
          <polygon points="205,82 190,90 205,98" fill="#fb7185" />
          
          <rect x="235" y="65" width="150" height="50" rx="6" fill="#1e131d" stroke="#fb7185" strokeWidth="1.2" />
          <text x="310" y="85" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">Bus Único</text>
          <text x="310" y="103" fill="#cbd5e1" fontSize="10" textAnchor="middle">Compartido (Multiplexado)</text>

          {/* Unified Memory Box */}
          <rect x="430" y="25" width="190" height="130" rx="8" fill="#151a27" stroke="#334155" strokeWidth="2" />
          <text x="525" y="52" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">Memoria Unificada</text>
          
          <rect x="445" y="68" width="160" height="36" rx="4" fill="#102030" stroke="#38bdf8" strokeWidth="1" />
          <text x="525" y="90" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Instrucciones (Código)</text>
          
          <rect x="445" y="110" width="160" height="36" rx="4" fill="#161d2d" stroke="#e6ff00" strokeWidth="1" />
          <text x="525" y="132" fill="#e6ff00" fontSize="11" fontWeight="bold" textAnchor="middle">Datos (Variables / Heap)</text>
        </svg>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

export const NumaDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'UMA' | 'NUMA'>('NUMA');

  return (
    <div className="hpc-card p-6 w-full max-w-6xl mx-auto bg-[#0f131d] border border-[#232a3d] shadow-2xl">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3.5 border-b border-[#232a3d]">
        <div className="flex items-center gap-2.5">
          <span className="hpc-badge-purple font-mono text-xs mb-0">Topología de Memoria</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight">
            Acceso Uniforme vs No Uniforme
          </h4>
        </div>
        
        <div className="flex items-center gap-2 p-1 rounded-lg bg-[#07080c] border border-[#232a3d]">
          <button
            type="button"
            onClick={() => setActiveTab('UMA')}
            className={`px-3.5 py-1.5 text-xs rounded-md font-semibold transition-all border ${
              activeTab === 'UMA'
                ? 'bg-[#102030] text-[#38bdf8] border-[#38bdf8]/40 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            UMA (Uniforme)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('NUMA')}
            className={`px-3.5 py-1.5 text-xs rounded-md font-semibold transition-all border ${
              activeTab === 'NUMA'
                ? 'bg-[#151a27] text-[#e6ff00] border-[#e6ff00]/40 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            NUMA (No Uniforme)
          </button>
        </div>
      </div>

      {activeTab === 'UMA' ? (
        <div className="my-3 flex flex-col gap-3">
          <div className="p-5 rounded-xl bg-[#07080c] border border-[#232a3d] flex items-center justify-center">
            <svg viewBox="0 0 720 190" className="w-full h-[200px]">
              {/* 4 CPU Cores */}
              {[0, 1, 2, 3].map((core) => (
                <g key={core}>
                  <rect x={45 + core * 165} y="15" width="130" height="38" rx="6" fill="#151a27" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x={110 + core * 165} y="39" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Núcleo {core}</text>
                  
                  {/* Vertical line to bus */}
                  <line x1={110 + core * 165} y1="53" x2={110 + core * 165} y2="85" stroke="#38bdf8" strokeWidth="2" />
                </g>
              ))}

              {/* Shared Bus */}
              <rect x="30" y="85" width="660" height="26" rx="5" fill="#102030" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="360" y="102" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                Bus Central Compartido (Idéntica Latencia para Todos los Núcleos)
              </text>

              {/* Line from Bus to RAM */}
              <line x1="360" y1="111" x2="360" y2="135" stroke="#e6ff00" strokeWidth="2.5" />

              {/* Shared RAM */}
              <rect x="235" y="135" width="250" height="40" rx="6" fill="#151a27" stroke="#e6ff00" strokeWidth="1.5" />
              <text x="360" y="153" fill="#e6ff00" fontSize="12" fontWeight="bold" textAnchor="middle">Memoria RAM Global</text>
              <text x="360" y="167" fill="#94a3b8" fontSize="9.5" textAnchor="middle">Latencia Constante: ~50-60 ns</text>
            </svg>
          </div>

          <div className="p-3.5 rounded-lg bg-[#07080c] border border-[#232a3d] text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">UMA (Uniform Memory Access):</strong> Todos los procesadores comparten un único bus físico y controlador de memoria común. Todos los accesos tienen exactamente la misma latencia, pero el bus central satura rápidamente al escalar el número de núcleos.
          </div>
        </div>
      ) : (
        <div className="my-3 flex flex-col gap-3">
          <div className="p-5 rounded-xl bg-[#07080c] border border-[#232a3d] flex items-center justify-center">
            <svg viewBox="0 0 760 210" className="w-full h-[220px]">
              {/* Socket 0 */}
              <g>
                <rect x="15" y="10" width="300" height="185" rx="8" fill="#151a27" stroke="#34d399" strokeWidth="1.5" />
                <text x="165" y="32" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">NUMA Nodo 0 (Socket 0)</text>

                {/* Cores 0-7 */}
                <rect x="35" y="48" width="115" height="38" rx="5" fill="#07080c" stroke="#232a3d" />
                <text x="92" y="72" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Cores 0 - 7</text>

                {/* Local RAM 0 */}
                <rect x="175" y="48" width="120" height="38" rx="5" fill="#10241e" stroke="#34d399" strokeWidth="1.2" />
                <text x="235" y="72" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">RAM Local 0</text>

                {/* Local Bus Line */}
                <line x1="92" y1="86" x2="92" y2="120" stroke="#34d399" strokeWidth="2" />
                <line x1="235" y1="86" x2="235" y2="120" stroke="#34d399" strokeWidth="2" />
                <line x1="92" y1="120" x2="235" y2="120" stroke="#34d399" strokeWidth="2" />
                
                <rect x="75" y="132" width="180" height="24" rx="4" fill="#10241e" stroke="#34d399" strokeWidth="1" />
                <text x="165" y="148" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Acceso Local: ~50-60 ns</text>
              </g>

              {/* Interconnect Bus (UPI / IF / CXL) */}
              <g>
                <line x1="315" y1="95" x2="445" y2="95" stroke="#fb7185" strokeWidth="3" strokeDasharray="5 3" />
                <rect x="330" y="77" width="100" height="36" rx="5" fill="#1e131d" stroke="#fb7185" strokeWidth="1.2" />
                <text x="380" y="93" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Enlace Inter-Socket</text>
                <text x="380" y="105" fill="#fb7185" fontSize="8" fontWeight="bold" textAnchor="middle">(UPI / IF / CXL)</text>
              </g>

              {/* Socket 1 */}
              <g>
                <rect x="445" y="10" width="300" height="185" rx="8" fill="#151a27" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="595" y="32" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">NUMA Nodo 1 (Socket 1)</text>

                {/* Cores 8-15 */}
                <rect x="465" y="48" width="115" height="38" rx="5" fill="#07080c" stroke="#232a3d" />
                <text x="522" y="72" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Cores 8 - 15</text>

                {/* Local RAM 1 */}
                <rect x="605" y="48" width="120" height="38" rx="5" fill="#102030" stroke="#38bdf8" strokeWidth="1.2" />
                <text x="665" y="72" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">RAM Local 1</text>

                {/* Local Bus Line */}
                <line x1="522" y1="86" x2="522" y2="120" stroke="#38bdf8" strokeWidth="2" />
                <line x1="665" y1="86" x2="665" y2="120" stroke="#38bdf8" strokeWidth="2" />
                <line x1="522" y1="120" x2="665" y2="120" stroke="#38bdf8" strokeWidth="2" />
                
                <rect x="505" y="132" width="180" height="24" rx="4" fill="#102030" stroke="#38bdf8" strokeWidth="1" />
                <text x="595" y="148" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Acceso Local: ~50-60 ns</text>

                {/* Remote Access Path Indicator */}
                <text x="595" y="176" fill="#fb7185" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  Acceso Remoto a Nodo 0: &gt;130 ns (2.5x)
                </text>
              </g>
            </svg>
          </div>

          <div className="p-3.5 rounded-lg bg-[#07080c] border border-[#232a3d] text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">NUMA (Non-Uniform Memory Access):</strong> Cada socket posee sus propios controladores y memoria física dedicada. Acceder a memoria en un socket remoto requiere atravesar el enlace coherente de interconexión, duplicando con creces la latencia y consumiendo ancho de banda del bus.
          </div>
        </div>
      )}
    </div>
  );
};

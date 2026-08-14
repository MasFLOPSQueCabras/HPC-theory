import React, { useState } from 'react';

export const NumaDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'UMA' | 'NUMA'>('NUMA');

  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="hpc-badge font-mono">Topología de Memoria</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight">
            Acceso Uniforme vs No Uniforme
          </h4>
        </div>
        
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('UMA')}
            className={`px-3 py-1 text-xs rounded-md font-semibold transition-all border ${
              activeTab === 'UMA'
                ? 'bg-slate-700 text-white border-slate-600 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            UMA (Uniforme)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('NUMA')}
            className={`px-3 py-1 text-xs rounded-md font-semibold transition-all border ${
              activeTab === 'NUMA'
                ? 'bg-slate-700 text-white border-slate-600 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            NUMA (No Uniforme)
          </button>
        </div>
      </div>

      {activeTab === 'UMA' ? (
        <div className="my-2">
          <div className="p-4 rounded-lg bg-slate-950/90 border border-slate-800">
            <svg viewBox="0 0 600 160" className="w-full h-[160px]">
              {/* 4 CPU Cores */}
              {[0, 1, 2, 3].map((core) => (
                <g key={core}>
                  <rect x={40 + core * 140} y="15" width="105" height="32" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
                  <text x={92 + core * 140} y="35" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">Núcleo {core}</text>
                  
                  {/* Vertical line to bus */}
                  <line x1={92 + core * 140} y1="47" x2={92 + core * 140} y2="72" stroke="#94a3b8" strokeWidth="2" />
                </g>
              ))}

              {/* Shared Bus */}
              <rect x="30" y="72" width="540" height="22" rx="4" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="300" y="87" fill="#f8fafc" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                Bus Central Compartido (Idéntica Latencia para Todos)
              </text>

              {/* Line from Bus to RAM */}
              <line x1="300" y1="94" x2="300" y2="114" stroke="#64748b" strokeWidth="2" />

              {/* Shared RAM */}
              <rect x="200" y="114" width="200" height="34" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.3)" />
              <text x="300" y="130" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Memoria RAM Global</text>
              <text x="300" y="142" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Latencia Constante: ~50-60 ns</text>
            </svg>
          </div>

          <div className="mt-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
            <strong className="text-white">UMA (Uniform Memory Access):</strong> Todos los núcleos comparten el mismo bus físico y controlador de memoria. La latencia y el ancho de banda son idénticos, pero el bus satura rápidamente al escalar la cantidad de núcleos.
          </div>
        </div>
      ) : (
        <div className="my-2">
          <div className="p-4 rounded-lg bg-slate-950/90 border border-slate-800">
            <svg viewBox="0 0 620 175" className="w-full h-[175px]">
              {/* Socket 0 */}
              <g>
                <rect x="15" y="10" width="240" height="155" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" />
                <text x="135" y="28" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">NUMA Nodo 0 (Socket 0)</text>

                {/* Cores 0-7 */}
                <rect x="30" y="42" width="95" height="32" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.15)" />
                <text x="77" y="62" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Cores 0-7</text>

                {/* Local RAM 0 */}
                <rect x="140" y="42" width="100" height="32" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.3)" />
                <text x="190" y="62" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">RAM Local 0</text>

                {/* Local Bus Line */}
                <line x1="77" y1="74" x2="77" y2="105" stroke="#94a3b8" strokeWidth="2" />
                <line x1="190" y1="74" x2="190" y2="105" stroke="#94a3b8" strokeWidth="2" />
                <line x1="77" y1="105" x2="190" y2="105" stroke="#94a3b8" strokeWidth="2" />
                <text x="135" y="125" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">Acceso Local: ~50-60 ns</text>
              </g>

              {/* Interconnect Bus (UPI / IF) */}
              <g>
                <line x1="255" y1="88" x2="365" y2="88" stroke="#64748b" strokeWidth="2.5" strokeDasharray="4 3" />
                <rect x="268" y="74" width="84" height="26" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
                <text x="310" y="87" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Enlace Inter-Socket</text>
                <text x="310" y="96" fill="#94a3b8" fontSize="7" textAnchor="middle">(UPI / IF / CXL)</text>
              </g>

              {/* Socket 1 */}
              <g>
                <rect x="365" y="10" width="240" height="155" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" />
                <text x="485" y="28" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">NUMA Nodo 1 (Socket 1)</text>

                {/* Cores 8-15 */}
                <rect x="380" y="42" width="95" height="32" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.15)" />
                <text x="427" y="62" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Cores 8-15</text>

                {/* Local RAM 1 */}
                <rect x="490" y="42" width="100" height="32" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.3)" />
                <text x="540" y="62" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">RAM Local 1</text>

                {/* Local Bus Line */}
                <line x1="427" y1="74" x2="427" y2="105" stroke="#94a3b8" strokeWidth="2" />
                <line x1="540" y1="74" x2="540" y2="105" stroke="#94a3b8" strokeWidth="2" />
                <line x1="427" y1="105" x2="540" y2="105" stroke="#94a3b8" strokeWidth="2" />
                <text x="485" y="125" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">Acceso Local: ~50-60 ns</text>

                {/* Remote Access Path indicator */}
                <text x="485" y="145" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">Acceso Remoto Nodo 0: &gt;130 ns (2.5x)</text>
              </g>
            </svg>
          </div>

          <div className="mt-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
            <strong className="text-white">NUMA (Non-Uniform Memory Access):</strong> Cada socket posee sus propios controladores y memoria local. Acceder a memoria en otro socket requiere cruzar el enlace coherente (AMD Infinity Fabric o Intel UPI), aumentando la latencia más del doble y saturando la interconexión.
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';

export const RdmaDiagram: React.FC = () => {
  const [protocol, setProtocol] = useState<'tcp' | 'rdma'>('rdma');

  return (
    <div className="hpc-card p-6 w-full max-w-5xl mx-auto bg-[#0f131d] border border-[#232a3d] shadow-2xl">
      {/* Header & Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3.5 border-b border-[#232a3d]">
        <div className="flex items-center gap-2.5">
          <span className="hpc-badge-cyan font-mono text-xs mb-0">Redes &amp; Kernel Bypass</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight">
            Flujo de Transferencia en Silicio
          </h4>
        </div>
        
        <div className="flex items-center gap-2 p-1 rounded-lg bg-[#07080c] border border-[#232a3d]">
          <button
            type="button"
            onClick={() => setProtocol('tcp')}
            className={`px-3.5 py-1.5 text-xs rounded-md font-semibold transition-all border ${
              protocol === 'tcp'
                ? 'bg-[#1e131d] text-[#fb7185] border-[#fb7185]/40 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            TCP/IP Tradicional (Copias Kernel)
          </button>
          <button
            type="button"
            onClick={() => setProtocol('rdma')}
            className={`px-3.5 py-1.5 text-xs rounded-md font-semibold transition-all border ${
              protocol === 'rdma'
                ? 'bg-[#10241e] text-[#34d399] border-[#34d399]/40 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            RDMA / RoCEv2 (Zero-Copy DMA)
          </button>
        </div>
      </div>

      {/* Full-width Diagram Canvas with generous center spacing */}
      <div className="my-3 p-5 rounded-xl bg-[#07080c] border border-[#232a3d] flex flex-col items-center justify-center">
        {protocol === 'tcp' ? (
          <svg viewBox="0 0 800 205" className="w-full h-[225px]">
            {/* Node A (Sender) */}
            <rect x="20" y="15" width="280" height="175" rx="8" fill="#151a27" stroke="#232a3d" strokeWidth="1.5" />
            <text x="160" y="38" fill="#ffffff" fontSize="12.5" fontWeight="bold" textAnchor="middle">Nodo Local (Emisor)</text>

            <rect x="38" y="50" width="244" height="34" rx="5" fill="#07080c" stroke="#232a3d" />
            <text x="160" y="72" fill="#ffffff" fontSize="11" textAnchor="middle">User Space (Memoria de Aplicación)</text>

            <rect x="38" y="94" width="244" height="38" rx="5" fill="#1e131d" stroke="#fb7185" strokeWidth="1.2" />
            <text x="160" y="118" fill="#fb7185" fontSize="11" fontWeight="bold" textAnchor="middle">Kernel OS (Copia en Socket Buffer)</text>

            <rect x="38" y="142" width="244" height="34" rx="5" fill="#07080c" stroke="#232a3d" />
            <text x="160" y="164" fill="#94a3b8" fontSize="11" textAnchor="middle">NIC (Driver Ring Buffer)</text>

            {/* Central Network Bridge (Generous 200px gap between 300 and 500) */}
            <line x1="282" y1="159" x2="518" y2="159" stroke="#fb7185" strokeWidth="3" strokeDasharray="5 3" />
            <polygon points="510,153 520,159 510,165" fill="#fb7185" />
            
            <rect x="345" y="142" width="110" height="34" rx="6" fill="#1e131d" stroke="#fb7185" strokeWidth="1.2" />
            <text x="400" y="163" fill="#fb7185" fontSize="11" fontWeight="bold" textAnchor="middle">Red IP / Switch</text>

            {/* Center Latency Callout */}
            <rect x="330" y="75" width="140" height="32" rx="6" fill="#1e131d" stroke="#fb7185" strokeWidth="1" />
            <text x="400" y="95" fill="#fb7185" fontSize="10.5" fontWeight="bold" textAnchor="middle">Latencia: 10 - 50 &mu;s</text>

            {/* Node B (Receiver) */}
            <rect x="500" y="15" width="280" height="175" rx="8" fill="#151a27" stroke="#232a3d" strokeWidth="1.5" />
            <text x="640" y="38" fill="#ffffff" fontSize="12.5" fontWeight="bold" textAnchor="middle">Nodo Remoto (Receptor)</text>

            <rect x="518" y="50" width="244" height="34" rx="5" fill="#07080c" stroke="#232a3d" />
            <text x="640" y="72" fill="#ffffff" fontSize="11" textAnchor="middle">User Space (Memoria de Aplicación)</text>

            <rect x="518" y="94" width="244" height="38" rx="5" fill="#1e131d" stroke="#fb7185" strokeWidth="1.2" />
            <text x="640" y="118" fill="#fb7185" fontSize="11" fontWeight="bold" textAnchor="middle">Kernel OS (Copia en TCP Stack)</text>

            <rect x="518" y="142" width="244" height="34" rx="5" fill="#07080c" stroke="#232a3d" />
            <text x="640" y="164" fill="#94a3b8" fontSize="11" textAnchor="middle">NIC (Driver Ring Buffer)</text>

            {/* Vertical Flow Paths */}
            <line x1="160" y1="84" x2="160" y2="94" stroke="#fb7185" strokeWidth="2" />
            <line x1="160" y1="132" x2="160" y2="142" stroke="#fb7185" strokeWidth="2" />
            <line x1="640" y1="142" x2="640" y2="132" stroke="#fb7185" strokeWidth="2" />
            <line x1="640" y1="94" x2="640" y2="84" stroke="#fb7185" strokeWidth="2" />
          </svg>
        ) : (
          <svg viewBox="0 0 800 205" className="w-full h-[225px]">
            {/* Node A (Sender) */}
            <rect x="20" y="15" width="280" height="175" rx="8" fill="#151a27" stroke="#34d399" strokeWidth="1.5" />
            <text x="160" y="38" fill="#34d399" fontSize="12.5" fontWeight="bold" textAnchor="middle">Nodo Local (Emisor)</text>

            {/* User Space Box */}
            <rect x="38" y="48" width="244" height="36" rx="5" fill="#10241e" stroke="#34d399" strokeWidth="1.2" />
            <text x="160" y="71" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">User Space Memory (Buffer)</text>

            {/* Bypassed Kernel Area Outline */}
            <rect x="38" y="92" width="244" height="36" rx="5" fill="#07080c" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />

            {/* RNIC Box */}
            <rect x="38" y="138" width="244" height="38" rx="5" fill="#102030" stroke="#38bdf8" strokeWidth="1.2" />
            <text x="160" y="162" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">RNIC (Hardware Offload DMA)</text>

            {/* Direct Kernel Bypass DMA Path (Node A) */}
            <line x1="160" y1="84" x2="160" y2="138" stroke="#34d399" strokeWidth="3" />
            <polygon points="154,130 160,138 166,130" fill="#34d399" />
            <rect x="65" y="97" width="190" height="26" rx="5" fill="#10241e" stroke="#34d399" strokeWidth="1.2" />
            <text x="160" y="114" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
              Kernel Bypass (0 Copias en RAM)
            </text>

            {/* Central Network Bridge (Generous 200px gap between 300 and 500) */}
            <line x1="282" y1="157" x2="518" y2="157" stroke="#34d399" strokeWidth="3.5" />
            <polygon points="510,151 520,157 510,163" fill="#34d399" />
            
            <rect x="340" y="140" width="120" height="34" rx="6" fill="#10241e" stroke="#34d399" strokeWidth="1.2" />
            <text x="400" y="161" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Cluster Fabric</text>

            {/* Center Latency Callout */}
            <rect x="325" y="75" width="150" height="32" rx="6" fill="#10241e" stroke="#34d399" strokeWidth="1" />
            <text x="400" y="95" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">Latencia: &lt; 0.8 &mu;s</text>

            {/* Node B (Receiver) */}
            <rect x="500" y="15" width="280" height="175" rx="8" fill="#151a27" stroke="#34d399" strokeWidth="1.5" />
            <text x="640" y="38" fill="#34d399" fontSize="12.5" fontWeight="bold" textAnchor="middle">Nodo Remoto (Receptor)</text>

            {/* User Space Box */}
            <rect x="518" y="48" width="244" height="36" rx="5" fill="#10241e" stroke="#34d399" strokeWidth="1.2" />
            <text x="640" y="71" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">User Space Memory (Direct DMA)</text>

            {/* Bypassed Kernel Area Outline (Node B) */}
            <rect x="518" y="92" width="244" height="36" rx="5" fill="#07080c" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />

            {/* RNIC Box */}
            <rect x="518" y="138" width="244" height="38" rx="5" fill="#102030" stroke="#38bdf8" strokeWidth="1.2" />
            <text x="640" y="162" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">RNIC (RoCEv2 / InfiniBand NDR)</text>

            {/* Direct Kernel Bypass DMA Path (Node B) */}
            <line x1="640" y1="138" x2="640" y2="84" stroke="#34d399" strokeWidth="3" />
            <polygon points="634,92 640,84 646,92" fill="#34d399" />
            <rect x="545" y="97" width="190" height="26" rx="5" fill="#10241e" stroke="#34d399" strokeWidth="1.2" />
            <text x="640" y="114" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
              Kernel Bypass (0 Copias en RAM)
            </text>
          </svg>
        )}
      </div>
    </div>
  );
};

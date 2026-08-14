import React, { useState } from 'react';

export const RdmaDiagram: React.FC = () => {
  const [protocol, setProtocol] = useState<'tcp' | 'rdma'>('rdma');

  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
      {/* Header & Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="hpc-badge font-mono">Redes &amp; Kernel Bypass</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight">
            Mecanismos de Red: TCP/IP Tradicional vs RDMA
          </h4>
        </div>
        
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800">
          <button
            type="button"
            onClick={() => setProtocol('tcp')}
            className={`px-3 py-1 text-xs rounded-md font-semibold transition-all border ${
              protocol === 'tcp'
                ? 'bg-slate-700 text-white border-slate-600 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            TCP/IP Tradicional
          </button>
          <button
            type="button"
            onClick={() => setProtocol('rdma')}
            className={`px-3 py-1 text-xs rounded-md font-semibold transition-all border ${
              protocol === 'rdma'
                ? 'bg-slate-700 text-white border-slate-600 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            RDMA / RoCEv2 (HPC)
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-3 items-center">
        {/* SVG Diagram Canvas (7 cols) */}
        <div className="md:col-span-7 p-3.5 rounded-lg bg-slate-950/90 border border-slate-800">
          {protocol === 'tcp' ? (
            <svg viewBox="0 0 380 180" className="w-full h-[180px]">
              {/* Node A (Sender) */}
              <rect x="15" y="10" width="155" height="160" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" />
              <text x="92" y="26" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Nodo Local (Emisor)</text>

              <rect x="25" y="38" width="135" height="26" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
              <text x="92" y="55" fill="#ffffff" fontSize="9" textAnchor="middle">User Space (App Memory)</text>

              <rect x="25" y="74" width="135" height="28" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.3)" />
              <text x="92" y="91" fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="middle">Kernel OS (TCP Buffer Copy)</text>

              <rect x="25" y="112" width="135" height="26" rx="4" fill="#0f172a" stroke="rgba(255,255,255,0.2)" />
              <text x="92" y="129" fill="#94a3b8" fontSize="9" textAnchor="middle">NIC (Driver Ring)</text>

              {/* Node B (Receiver) */}
              <rect x="210" y="10" width="155" height="160" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" />
              <text x="287" y="26" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Nodo Remoto (Receptor)</text>

              <rect x="220" y="38" width="135" height="26" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
              <text x="287" y="55" fill="#ffffff" fontSize="9" textAnchor="middle">User Space (App Memory)</text>

              <rect x="220" y="74" width="135" height="28" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.3)" />
              <text x="287" y="91" fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="middle">Kernel OS (TCP Stack Copy)</text>

              <rect x="220" y="112" width="135" height="26" rx="4" fill="#0f172a" stroke="rgba(255,255,255,0.2)" />
              <text x="287" y="129" fill="#94a3b8" fontSize="9" textAnchor="middle">NIC (Ethernet Switch)</text>

              {/* Line Traversal */}
              <path d="M 92,64 L 92,74 M 92,102 L 92,112 M 160,125 L 220,125 M 287,112 L 287,102 M 287,74 L 287,64" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" fill="none" />
              <text x="190" y="165" fill="#e2e8f0" fontSize="8.5" fontWeight="bold" textAnchor="middle">⚠️ Copias en RAM + Interrupciones CPU (&gt;15 &mu;s)</text>
            </svg>
          ) : (
            <svg viewBox="0 0 380 180" className="w-full h-[180px]">
              {/* Node A (Sender) */}
              <rect x="15" y="10" width="155" height="160" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.2)" />
              <text x="92" y="26" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Nodo Local (Emisor)</text>

              <rect x="25" y="38" width="135" height="28" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.25)" />
              <text x="92" y="55" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">User Space Memory (DMA)</text>

              <rect x="25" y="74" width="135" height="24" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
              <text x="92" y="90" fill="#64748b" fontSize="8.5" textAnchor="middle">⚡ Kernel Bypass (0 Copias)</text>

              <rect x="25" y="108" width="135" height="28" rx="4" fill="#0f172a" stroke="#64748b" />
              <text x="92" y="125" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">RNIC (Hardware Offload)</text>

              {/* Node B (Receiver) */}
              <rect x="210" y="10" width="155" height="160" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.2)" />
              <text x="287" y="26" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Nodo Remoto (Receptor)</text>

              <rect x="220" y="38" width="135" height="28" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.25)" />
              <text x="287" y="55" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">User Space Memory (Direct)</text>

              <rect x="220" y="74" width="135" height="24" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
              <text x="287" y="90" fill="#64748b" fontSize="8.5" textAnchor="middle">⚡ Kernel Bypass (0 Copias)</text>

              <rect x="220" y="108" width="135" height="28" rx="4" fill="#0f172a" stroke="#64748b" />
              <text x="287" y="125" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">RNIC (RoCEv2 / IB NDR)</text>

              {/* Direct DMA Arrow */}
              <path d="M 92,66 L 92,108 M 160,122 L 220,122 M 287,108 L 287,66" stroke="#f8fafc" strokeWidth="2" fill="none" />
              <text x="190" y="165" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">⚡ Zero-Copy DMA Directo (&lt;1.0 &mu;s)</text>
            </svg>
          )}
        </div>

        {/* Text Description (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-3">
          {protocol === 'tcp' ? (
            <>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <h5 className="m-0 text-xs font-bold text-white mb-1">Sobrecarga de la CPU y SO</h5>
                <p className="m-0 text-[11px] text-slate-300 leading-normal">
                  Cada paquete TCP pasa por el stack del kernel, requiriendo copias de memoria (User-to-Kernel) y continuos cambios de contexto.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                ⚠️ Latencia típica: <strong className="text-white">10 - 50 &mu;s</strong>. Destruye el escalamiento de MPI en Exascale.
              </div>
            </>
          ) : (
            <>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <h5 className="m-0 text-xs font-bold text-white mb-1">Direct Memory Access (Kernel Bypass)</h5>
                <p className="m-0 text-[11px] text-slate-300 leading-normal">
                  La tarjeta RNIC lee y escribe directamente en la memoria del espacio de usuario mediante DMA por hardware sin involucrar a la CPU del receptor.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                ⚡ Latencia ultra baja: <strong className="text-white">&lt; 0.8 &mu;s</strong> y 0% de uso de CPU para la transferencia.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

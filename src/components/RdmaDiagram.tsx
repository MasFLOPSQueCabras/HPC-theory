import React, { useState } from 'react';

export const RdmaDiagram: React.FC = () => {
  const [protocol, setProtocol] = useState<'tcp' | 'rdma'>('rdma');

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* Header & Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1.05rem' }}>Mecanismos de Transferencia de Red: TCP/IP vs RDMA</h4>
        
        <div style={{ display: 'flex', gap: '0.3rem', background: '#070a12', padding: '0.2rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setProtocol('tcp')}
            style={{
              padding: '0.3rem 0.8rem',
              borderRadius: '5px',
              border: 'none',
              background: protocol === 'tcp' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: protocol === 'tcp' ? '#ffffff' : '#94a3b8',
              fontWeight: protocol === 'tcp' ? 700 : 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            TCP/IP Tradicional
          </button>
          <button
            onClick={() => setProtocol('rdma')}
            style={{
              padding: '0.3rem 0.8rem',
              borderRadius: '5px',
              border: 'none',
              background: protocol === 'rdma' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: protocol === 'rdma' ? '#ffffff' : '#94a3b8',
              fontWeight: protocol === 'rdma' ? 700 : 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            RDMA / RoCEv2 (HPC)
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.4rem', alignItems: 'center' }}>
        
        {/* SVG Diagram Canvas */}
        <div style={{ background: '#070a12', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          
          {protocol === 'tcp' ? (
            <svg viewBox="0 0 380 185" style={{ width: '100%', height: '185px' }}>
              {/* Node A (Sender) */}
              <rect x="15" y="10" width="155" height="165" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" />
              <text x="92" y="26" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Nodo Local (Emisor)</text>

              {/* Layers Node A */}
              <rect x="25" y="36" width="135" height="26" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.15)" />
              <text x="92" y="52" fill="#ffffff" fontSize="9" textAnchor="middle">Espacio de Usuario (App)</text>

              <rect x="25" y="72" width="135" height="34" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
              <text x="92" y="86" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">Kernel OS / TCP Stack</text>
              <text x="92" y="98" fill="#94a3b8" fontSize="7.5" textAnchor="middle">(Múltiples Copias y Context Switches)</text>

              <rect x="25" y="118" width="135" height="26" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.15)" />
              <text x="92" y="134" fill="#ffffff" fontSize="9" textAnchor="middle">Driver NIC / PCIe</text>

              {/* Data flow arrows inside Node A */}
              <line x1="92" y1="62" x2="92" y2="72" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="92" y1="106" x2="92" y2="118" stroke="#94a3b8" strokeWidth="1.5" />

              {/* Center Network Cable */}
              <line x1="170" y1="131" x2="210" y2="131" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 2" />
              <text x="190" y="122" fill="#94a3b8" fontSize="8" textAnchor="middle">Red</text>

              {/* Node B (Receiver) */}
              <rect x="210" y="10" width="155" height="165" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" />
              <text x="287" y="26" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Nodo Remoto (Receptor)</text>

              {/* Layers Node B */}
              <rect x="220" y="36" width="135" height="26" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.15)" />
              <text x="287" y="52" fill="#ffffff" fontSize="9" textAnchor="middle">Espacio de Usuario (App)</text>

              <rect x="220" y="72" width="135" height="34" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
              <text x="287" y="86" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">Kernel OS / TCP Stack</text>
              <text x="287" y="98" fill="#94a3b8" fontSize="7.5" textAnchor="middle">(Interrupciones CPU y Buffer Copy)</text>

              <rect x="220" y="118" width="135" height="26" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.15)" />
              <text x="287" y="134" fill="#ffffff" fontSize="9" textAnchor="middle">Driver NIC / PCIe</text>

              <line x1="287" y1="118" x2="287" y2="106" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="287" y1="72" x2="287" y2="62" stroke="#94a3b8" strokeWidth="1.5" />

              <text x="190" y="162" fill="#cbd5e1" fontSize="8" textAnchor="middle">Latencia: ~10 - 50 &mu;s</text>
            </svg>
          ) : (
            <svg viewBox="0 0 380 185" style={{ width: '100%', height: '185px' }}>
              {/* Node A (Sender) */}
              <rect x="15" y="10" width="155" height="165" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" />
              <text x="92" y="26" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Nodo Local (Emisor)</text>

              {/* User RAM Buffer */}
              <rect x="25" y="38" width="135" height="30" rx="4" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" />
              <text x="92" y="56" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Memoria RAM Usuario</text>

              {/* Bypassed Kernel */}
              <rect x="25" y="78" width="135" height="24" rx="4" fill="#070a12" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 2" />
              <text x="92" y="93" fill="#64748b" fontSize="8" textAnchor="middle">⚡ Kernel Bypass (Cero CPU)</text>

              {/* RNIC */}
              <rect x="25" y="112" width="135" height="30" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
              <text x="92" y="130" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Tarjeta RDMA (RNIC)</text>

              {/* Direct DMA Line A */}
              <path d="M 40 68 L 40 112" stroke="#ffffff" strokeWidth="2" fill="none" />
              <text x="48" y="92" fill="#cbd5e1" fontSize="7.5">Direct DMA</text>

              {/* High Speed Fabric Wire */}
              <line x1="160" y1="127" x2="220" y2="127" stroke="#ffffff" strokeWidth="2.5" />
              <text x="190" y="118" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">RoCEv2 / IB</text>

              {/* Node B (Receiver) */}
              <rect x="210" y="10" width="155" height="165" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" />
              <text x="287" y="26" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Nodo Remoto (Receptor)</text>

              {/* Remote RAM Buffer */}
              <rect x="220" y="38" width="135" height="30" rx="4" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" />
              <text x="287" y="56" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Memoria RAM Remota</text>

              {/* Bypassed Kernel Remote */}
              <rect x="220" y="78" width="135" height="24" rx="4" fill="#070a12" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 2" />
              <text x="287" y="93" fill="#64748b" fontSize="8" textAnchor="middle">⚡ Kernel Bypass (Cero CPU)</text>

              {/* Remote RNIC */}
              <rect x="220" y="112" width="135" height="30" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
              <text x="287" y="130" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Tarjeta RDMA (RNIC)</text>

              {/* Direct DMA Line B */}
              <path d="M 340 112 L 340 68" stroke="#ffffff" strokeWidth="2" fill="none" />
              <text x="328" y="92" fill="#cbd5e1" fontSize="7.5" textAnchor="end">Direct DMA</text>

              <text x="190" y="162" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">⚡ Latencia: &lt; 1 &mu;s (Ultra Baja)</text>
            </svg>
          )}

        </div>

        {/* Right Info Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {protocol === 'tcp' ? (
            <>
              <div className="hpc-card" style={{ padding: '0.9rem 1.1rem' }}>
                <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Sobrecarga de CPU</span>
                <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Pila TCP/IP Convencional</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  Cada mensaje debe ser copiado por la CPU desde el espacio de usuario hacia los buffers del kernel, gestionando interrupciones que saturan los núcleos.
                </p>
              </div>
              <div className="hpc-card" style={{ padding: '0.9rem 1.1rem' }}>
                <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Límite en Clusters</span>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  La latencia de ~10 a 50 microsegundos impide el escalamiento de algoritmos paralelos que requieren sincronización frecuente (MPI Allreduce).
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="hpc-card" style={{ padding: '0.9rem 1.1rem' }}>
                <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Pilares de RDMA</span>
                <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Kernel Bypass & Zero-Copy</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  La tarjeta RNIC transfiere datos directamente desde la RAM del usuario emisor a la RAM del receptor vía PCIe sin despertar al sistema operativo.
                </p>
              </div>
              <div className="hpc-card" style={{ padding: '0.9rem 1.1rem' }}>
                <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Rendimiento en Supercomputadores</span>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  • Latencia inferior a <strong>1 microsegundo (&lt;1 &mu;s)</strong>.<br />
                  • <strong>0% de uso de CPU</strong> en transferencias de red.<br />
                  • Base de InfiniBand, RoCEv2 y NVIDIA GPUDirect RDMA.
                </p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

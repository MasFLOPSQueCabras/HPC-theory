import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { RdmaDiagram } from '../components/RdmaDiagram';

export const Interconnects: React.FC = () => {
  return (
    <Stack>
      {/* 1. Jerarquía de Interconexiones */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Redes & Interconexiones • Jerarquía</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>Jerarquía de Interconexiones en HPC</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem', marginBottom: '0.8rem' }}>
            <div className="hpc-card" style={{ padding: '1.1rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>On-Package / Socket</span>
              <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.98rem' }}>Inter-Chiplet & Socket</h4>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                • <strong>AMD Infinity Fabric (IF):</strong> Enlace coherente CPU-Die y Socket.<br />
                • <strong>Intel UPI:</strong> Ultra Path Interconnect multi-socket.<br />
                • <strong>Apple UltraFusion:</strong> Bus 2.5 TB/s en SiP.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.1rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Intra-Nodo (Host &harr; GPU)</span>
              <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.98rem' }}>Buses de Aceleradores</h4>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                • <strong>NVIDIA NVLink / NVSwitch:</strong> 900 GB/s a 1.8 TB/s por GPU.<br />
                • <strong>PCIe 5.0 / 6.0:</strong> 64 a 128 GB/s bi-direccional.<br />
                • <strong>CXL (Compute Express Link):</strong> Memoria coherente.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.1rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Inter-Nodo (Cluster Fabric)</span>
              <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.98rem' }}>Redes de Supercómputo</h4>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                • <strong>InfiniBand (HDR/NDR):</strong> 400 - 800 Gbps nativo.<br />
                • <strong>RoCEv2:</strong> RDMA sobre Ethernet convergente.<br />
                • <strong>HPE Slingshot:</strong> Red especializada Exascale.
              </p>
            </div>
          </div>

          <div className="hpc-card" style={{ padding: '0.7rem 1.2rem', fontSize: '0.82rem', color: '#e5e7eb' }}>
            💡 <strong>El Cuello de Botella en Escala:</strong> A medida que se añaden miles de nodos, la latencia de la red de interconexión domina el tiempo de sincronización en algoritmos MPI (Allreduce, Bcast).
          </div>
        </div>
      </Slide>

      {/* 2. RDMA y Kernel Bypass */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Redes de Alto Rendimiento • RDMA</span>
          <h2>RDMA (Remote Direct Memory Access)</h2>

          <RdmaDiagram />
        </div>
      </Slide>

      {/* 3. RoCEv2: RDMA over Converged Ethernet */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Redes & Interconexiones • RoCEv2</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>RoCEv2 (RDMA over Converged Ethernet)</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.4rem', marginBottom: '0.8rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '1rem' }}>¿Qué es RoCEv2?</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Protocolo que encapsula tramas RDMA dentro de paquetes <strong>UDP/IP (puerto 4791)</strong>, permitiendo comunicación con latencia sub-microsegundo sobre infraestructura y switches Ethernet estándar sin adquirir hardware propietario de InfiniBand.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '1rem' }}>Requisitos de Red sin Pérdidas (Lossless)</h4>
              <ul style={{ fontSize: '0.8rem', paddingLeft: '1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.35rem', lineHeight: 1.35 }}>
                <li><strong>PFC (Priority-based Flow Control):</strong> Pausa el tráfico a nivel de clase de prioridad antes de que se desborden los buffers del switch.</li>
                <li><strong>ECN (Explicit Congestion Notification):</strong> Marca paquetes en ruta para que los extremos reduzcan la tasa de emisión antes de que ocurran pérdidas.</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card" style={{ padding: '0.8rem 1.2rem', fontSize: '0.82rem', color: '#e5e7eb' }}>
            🚀 <strong>GPUDirect RDMA:</strong> Permite que tarjetas de red RNIC lean y escriban directamente en la memoria VRAM (HBM) de GPUs NVIDIA o AMD en otros servidores a través de PCIe y RoCEv2/InfiniBand, eliminando la intervención de la CPU y la RAM del sistema.
          </div>
        </div>
      </Slide>

      {/* 4. AMD Infinity Fabric */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Interconexiones On-Package • AMD Infinity Fabric</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>AMD Infinity Fabric (IF)</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.4rem', marginBottom: '0.8rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>SDF</span>
              <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '1rem' }}>Scalable Data Fabric</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Red de conmutación transversal de altísimo ancho de banda encargada de transferir datos entre los Core Complex Dies (CCD), el I/O Die (IOD), los controladores de memoria DDR5 y los enlaces PCIe / CXL.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>SCF</span>
              <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '1rem' }}>Scalable Control Fabric</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Motor de control que supervisa la <strong>coherencia de caché distribuida en hardware</strong> entre todos los núcleos, la gestión de energía térmica por die y las señales de sincronización e interrupción.
              </p>
            </div>
          </div>

          <div className="hpc-card" style={{ padding: '0.8rem 1.2rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
            💡 <strong>Memoria Unificada Heterogénea en APUs Exascale:</strong> En aceleradores como <strong>AMD Instinct MI300A</strong>, Infinity Fabric conecta 24 núcleos de CPU Zen 4 y 228 Compute Units de GPU CDNA 3 al mismo pool coherente de 128 GB de memoria HBM3 compartida a 5.3 TB/s.
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

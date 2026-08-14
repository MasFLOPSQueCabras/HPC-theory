import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { RdmaDiagram } from '../components/RdmaDiagram';

export const Interconnects: React.FC = () => {
  return (
    <Stack>
      {/* 1. Jerarquía de Interconexiones */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Redes &amp; Interconexiones • Jerarquía</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Jerarquía de Interconexiones en HPC
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5 my-2">
            <div className="hpc-card p-5">
              <span className="hpc-badge font-mono mb-2 text-xs">On-Package / Socket</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">Inter-Chiplet &amp; Socket</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed space-y-1">
                • <strong className="text-white">AMD Infinity Fabric:</strong> Enlace CPU-Die coherente.<br />
                • <strong className="text-white">Intel UPI:</strong> Coherencia multi-socket.<br />
                • <strong className="text-white">Apple UltraFusion:</strong> Bus 2.5 TB/s en SiP.
              </p>
            </div>

            <div className="hpc-card p-5">
              <span className="hpc-badge font-mono mb-2 text-xs">Intra-Nodo (Host &harr; GPU)</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">Buses de Aceleradores</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed space-y-1">
                • <strong className="text-white">NVIDIA NVLink:</strong> 900 GB/s a 1.8 TB/s por GPU.<br />
                • <strong className="text-white">PCIe 5.0 / 6.0:</strong> 64 a 128 GB/s bi-direccional.<br />
                • <strong className="text-white">CXL Fabric:</strong> Memoria coherente abierta.
              </p>
            </div>

            <div className="hpc-card p-5">
              <span className="hpc-badge font-mono mb-2 text-xs">Inter-Nodo (Cluster Fabric)</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">Redes de Supercómputo</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed space-y-1">
                • <strong className="text-white">InfiniBand (NDR/XDR):</strong> 400 - 800 Gbps.<br />
                • <strong className="text-white">RoCEv2:</strong> RDMA sobre Ethernet convergente.<br />
                • <strong className="text-white">HPE Slingshot:</strong> Red Exascale especializada.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            💡 <strong className="text-white">El Cuello de Botella en Escala:</strong> A medida que se añaden miles de nodos, la latencia de la red domina el tiempo de sincronización en colectivas MPI (<code className="text-slate-100 font-mono">MPI_Allreduce</code>, <code className="text-slate-100 font-mono">MPI_Bcast</code>).
          </div>
        </div>
      </Slide>

      {/* 2. RDMA y Kernel Bypass (DIAGRAMA DEDICADO) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Redes de Alto Rendimiento • RDMA (1/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Mecanismos de Red: TCP/IP Tradicional vs RDMA
            </h2>
          </div>

          <RdmaDiagram />
        </div>
      </Slide>

      {/* 3. Principios de RDMA: Kernel Bypass y GPUDirect */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Redes de Alto Rendimiento • RDMA (2/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Principios de RDMA: Kernel Bypass y GPUDirect
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Mecanismo Hardware</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Kernel Bypass y Zero-Copy DMA</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                La tarjeta de red inteligente (<strong className="text-white">RNIC</strong>) transfiere buffers directamente entre el espacio de memoria del usuario de dos servidores:
              </p>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li><strong className="text-white">Cero Copias en RAM:</strong> Elimina el copiado redundante de User Space a Kernel Buffers.</li>
                <li><strong className="text-white">Cero Interrupciones de CPU:</strong> La CPU del nodo receptor no participa en el transporte.</li>
                <li><strong className="text-white">Latencia Sub-Microsegundo:</strong> Reduce la latencia de red de &gt;15 &mu;s a <strong className="text-white">&lt;0.8 &mu;s</strong>.</li>
              </ul>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Aceleración Extrema</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">GPUDirect RDMA</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Extensión que conecta directamente la red a la memoria VRAM (HBM) de GPUs:
              </p>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li>La RNIC lee/escribe en la memoria de la GPU a través del bus PCIe sin pasar por la RAM del host ni por la CPU.</li>
                <li>Crítico para entrenamiento de modelos LLM multi-nodo distribuidos (<strong className="text-white">All-Reduce en Megatron-LM / DeepSpeed</strong>).</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            🚀 En computación Exascale, el 100% del tráfico inter-nodo de MPI y NCCL se transporta mediante RDMA nativo.
          </div>
        </div>
      </Slide>

      {/* 4. RoCEv2: RDMA over Converged Ethernet */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Redes &amp; Interconexiones • RoCEv2</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              RoCEv2 (RDMA over Converged Ethernet v2)
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h4 className="m-0 text-lg font-bold text-white mb-2">¿Qué es RoCEv2?</h4>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Protocolo que encapsula tramas RDMA dentro de paquetes <strong className="text-white">UDP/IP (puerto 4791)</strong>, permitiendo comunicación con latencia sub-microsegundo sobre infraestructura y switches Ethernet estándar sin adquirir hardware propietario de InfiniBand.
              </p>
            </div>

            <div className="hpc-card p-6">
              <h4 className="m-0 text-lg font-bold text-white mb-2">Requisitos de Red sin Pérdidas (Lossless)</h4>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-2 list-disc leading-relaxed">
                <li><strong className="text-white">PFC (Priority Flow Control):</strong> Pausa el tráfico a nivel de clase antes del desborde de buffers.</li>
                <li><strong className="text-white">ECN (Explicit Congestion Notification):</strong> Marca paquetes en tránsito para reducir la tasa antes de pérdidas.</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            💡 RoCEv2 democratiza el rendimiento de InfiniBand sobre redes Ethernet masivas en centros de datos modernos de IA.
          </div>
        </div>
      </Slide>

      {/* 5. AMD Infinity Fabric */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Interconexiones On-Package • AMD Infinity Fabric</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              AMD Infinity Fabric (IF)
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">SDF</span>
              <h4 className="m-0 text-lg font-bold text-white mb-2">SDF (Scalable Data Fabric)</h4>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Red de conmutación transversal de altísimo ancho de banda encargada de transferir datos entre los <strong className="text-white">CCDs (Core Complex Dies)</strong>, el <strong className="text-white">IOD (Input-Output Die)</strong>, los controladores de memoria DDR5 y los enlaces PCIe / CXL.
              </p>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">SCF</span>
              <h4 className="m-0 text-lg font-bold text-white mb-2">SCF (Scalable Control Fabric)</h4>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Motor de control que supervisa la <strong className="text-white">coherencia de caché distribuida en hardware</strong> entre todos los núcleos, la gestión de energía térmica por die y las señales de sincronización e interrupción.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            💡 <strong className="text-white">Memoria Unificada Heterogénea en APUs Exascale:</strong> En aceleradores como <strong className="text-white">AMD Instinct MI300A</strong>, Infinity Fabric conecta 24 núcleos de CPU Zen 4 y 228 Compute Units de GPU CDNA 3 al mismo pool coherente de 128 GB de memoria HBM3 compartida a 5.3 TB/s.
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

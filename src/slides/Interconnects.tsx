import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { RdmaDiagram } from '../components/RdmaDiagram';

export const Interconnects: React.FC = () => {
  return (
    <Stack>
      {/* 1. Jerarquía de Interconexiones */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Redes &amp; Interconexiones • Jerarquía</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Jerarquía de Interconexiones en HPC
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5 my-2">
            <div className="hpc-card p-5 border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">On-Package / Socket</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">Inter-Chiplet &amp; Socket</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed space-y-1">
                • <strong className="text-white">AMD Infinity Fabric:</strong> Enlace CPU-Die coherente.<br />
                • <strong className="text-white">Intel UPI:</strong> Coherencia multi-socket.<br />
                • <strong className="text-white">Apple UltraFusion:</strong> Bus 2.5 TB/s en SiP.
              </p>
            </div>

            <div className="hpc-card p-5 border-t-2 border-t-[#e6ff00]">
              <span className="hpc-badge-yellow font-mono mb-2 text-xs">Intra-Nodo (Host &harr; GPU)</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">Buses de Aceleradores</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed space-y-1">
                • <strong className="text-white">NVIDIA NVLink:</strong> 900 GB/s a 1.8 TB/s por GPU.<br />
                • <strong className="text-white">PCIe 5.0 / 6.0:</strong> 64 a 128 GB/s bi-direccional.<br />
                • <strong className="text-white">CXL Fabric:</strong> Memoria coherente abierta.
              </p>
            </div>

            <div className="hpc-card p-5 border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">Inter-Nodo (Cluster Fabric)</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">Redes de Supercómputo</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed space-y-1">
                • <strong className="text-white">InfiniBand (NDR/XDR):</strong> 400 - 800 Gbps.<br />
                • <strong className="text-white">RoCEv2:</strong> RDMA sobre Ethernet convergente.<br />
                • <strong className="text-white">HPE Slingshot:</strong> Red Exascale especializada.
              </p>
            </div>
          </div>

          <div className="hpc-card p-3 text-xs text-slate-300 flex items-center gap-3 border-l-2 border-l-[#e6ff00]">
            <span className="px-2 py-0.5 rounded bg-[#161d2d] text-[#e6ff00] font-mono font-bold shrink-0">
              [ESCALA]
            </span>
            <span>
              <strong className="text-white">El Cuello de Botella en Escala:</strong> A medida que se añaden miles de nodos, la latencia de la red domina el tiempo de sincronización en colectivas MPI (<code className="text-slate-100 font-mono">MPI_Allreduce</code>, <code className="text-slate-100 font-mono">MPI_Bcast</code>).
            </span>
          </div>
        </div>
      </Slide>

      {/* 2a. RDMA y Kernel Bypass - Diagrama */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Redes de Alto Rendimiento • TCP/IP vs RDMA (1/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Mecanismos de Red: Diagrama de Flujo en Silicio
            </h2>
          </div>

          <RdmaDiagram />
        </div>
      </Slide>

      {/* 2b. RDMA y Kernel Bypass - Explicación Comparativa */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Redes de Alto Rendimiento • TCP/IP vs RDMA (2/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              TCP/IP Tradicional vs RDMA: Principios de Silicio
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-auto">
            <div className="hpc-card p-6 border-t-2 border-t-[#fb7185]">
              <span className="hpc-badge-rose font-mono mb-2 text-xs">Pila Tradicional</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">TCP/IP (Sobrecarga de SO)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Cada paquete de red atraviesa obligatoriamente la pila del kernel del sistema operativo:
              </p>
              <ul className="m-0 p-0 pl-4 text-xs text-slate-300 space-y-2 list-disc leading-relaxed">
                <li><strong className="text-white">Múltiples Copias en RAM:</strong> User Space &rarr; Kernel Socket Buffer &rarr; NIC Driver Ring.</li>
                <li><strong className="text-white">Interrupciones de CPU:</strong> Cada paquete entrante interrumpe al procesador y fuerza cambios de contexto.</li>
                <li><strong className="text-[#fb7185] font-bold">Latencia Alta:</strong> 10 a 50 &mu;s por paquete, inadmisible para sincronizaciones masivas.</li>
              </ul>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">Supercómputo &amp; IA</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">RDMA / RoCEv2 (Kernel Bypass)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                La tarjeta inteligente (<strong className="text-white">RNIC</strong>) transfiere buffers de memoria directamente por hardware:
              </p>
              <ul className="m-0 p-0 pl-4 text-xs text-slate-300 space-y-2 list-disc leading-relaxed">
                <li><strong className="text-white">Zero-Copy DMA:</strong> Lectura y escritura directa entre espacios de memoria de usuario remotos.</li>
                <li><strong className="text-white">0% CPU Overhead:</strong> La CPU del nodo receptor permanece 100% dedicada al cómputo científico.</li>
                <li><strong className="text-[#34d399] font-bold">Latencia Sub-Microsegundo:</strong> Menos de 0.8 &mu;s de latencia con saturación de línea a 400-800 Gbps.</li>
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#07080c] border border-[#232a3d] text-xs text-slate-300">
            <strong className="text-white">Impacto en Exascale:</strong> El 100% del tráfico de comunicación distribuida de <code className="text-slate-100 font-mono">MPI</code> y <code className="text-slate-100 font-mono">NCCL</code> (All-Reduce en LLMs) se transporta sobre RDMA nativo.
          </div>
        </div>
      </Slide>

      {/* 3. Principios de RDMA: Kernel Bypass y GPUDirect */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Redes de Alto Rendimiento • Aceleradores</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              GPUDirect RDMA en Supercómputo e IA
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-auto">
            <div className="hpc-card p-6 border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">Mecanismo Hardware</span>
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

            <div className="hpc-card p-6 border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">Aceleración Extrema</span>
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
        </div>
      </Slide>

      {/* 4. RoCEv2: RDMA over Converged Ethernet */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Redes &amp; Interconexiones • RoCEv2</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              RoCEv2 (RDMA over Converged Ethernet v2)
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-auto">
            <div className="hpc-card p-6 border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">Definición</span>
              <h4 className="m-0 text-lg font-bold text-white mb-2">¿Qué es RoCEv2?</h4>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Protocolo que encapsula tramas RDMA dentro de paquetes <strong className="text-white">UDP/IP (puerto 4791)</strong>, permitiendo comunicación con latencia sub-microsegundo sobre infraestructura y switches Ethernet estándar sin adquirir hardware propietario de InfiniBand.
              </p>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#e6ff00]">
              <span className="hpc-badge-yellow font-mono mb-2 text-xs">Requisitos</span>
              <h4 className="m-0 text-lg font-bold text-white mb-2">Red sin Pérdidas (Lossless)</h4>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-2 list-disc leading-relaxed">
                <li><strong className="text-white">PFC (Priority Flow Control):</strong> Pausa el tráfico a nivel de clase antes del desborde de buffers.</li>
                <li><strong className="text-white">ECN (Explicit Congestion Notification):</strong> Marca paquetes en tránsito para reducir la tasa antes de pérdidas.</li>
              </ul>
            </div>
          </div>
        </div>
      </Slide>

      {/* 5. AMD Infinity Fabric */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Interconexiones On-Package • AMD Infinity Fabric</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              AMD Infinity Fabric (IF)
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6 border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">SDF</span>
              <h4 className="m-0 text-lg font-bold text-white mb-2">SDF (Scalable Data Fabric)</h4>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Red de conmutación transversal de altísimo ancho de banda encargada de transferir datos entre los <strong className="text-white">CCDs (Core Complex Dies)</strong>, el <strong className="text-white">IOD (Input-Output Die)</strong>, los controladores de memoria DDR5 y los enlaces PCIe / CXL.
              </p>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">SCF</span>
              <h4 className="m-0 text-lg font-bold text-white mb-2">SCF (Scalable Control Fabric)</h4>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Motor de control que supervisa la <strong className="text-white">coherencia de caché distribuida en hardware</strong> entre todos los núcleos, la gestión de energía térmica por die y las señales de sincronización e interrupción.
              </p>
            </div>
          </div>

          <div className="hpc-card p-3 text-xs text-slate-300 flex items-center gap-3 border-l-2 border-l-[#e6ff00]">
            <span className="px-2 py-0.5 rounded bg-[#161d2d] text-[#e6ff00] font-mono font-bold shrink-0">
              [UNIFICADA]
            </span>
            <span>
              <strong className="text-white">Memoria Unificada Heterogénea en APUs:</strong> En aceleradores como <strong className="text-white">AMD Instinct MI300A</strong>, Infinity Fabric conecta 24 núcleos Zen 4 y 228 CUs CDNA 3 al mismo pool de 128 GB HBM3 a 5.3 TB/s.
            </span>
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

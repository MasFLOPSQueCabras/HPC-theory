import React from 'react';
import { Slide, Stack } from '@revealjs/react';

export const Agenda: React.FC = () => {
  return (
    <Stack>
      {/* Agenda - Bloque 1 */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Agenda • Bloque 1</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Arquitectura, Paralelismo e Interconexiones
            </h2>
          </div>

          <div className="flex flex-col gap-3.5 my-auto">
            <div className="hpc-card p-5 flex items-start gap-4">
              <span className="px-3.5 py-2 rounded-lg bg-[#07080c] border border-[#e6ff00]/60 text-[#e6ff00] font-mono font-bold text-base shrink-0 shadow-sm">
                01
              </span>
              <div>
                <h3 className="m-0 text-lg font-bold text-white">
                  Microarquitectura de CPU (Frontend &amp; Backend)
                </h3>
                <p className="m-0 mt-1.5 text-sm text-slate-300 leading-relaxed">
                  In-Order vs OoO, trilema PPA, pipelining RISC, clasificación de hazards (RAW/WAR/WAW), predicción de saltos (BPU / TAGE) y Reorder Buffer (ROB).
                </p>
              </div>
            </div>

            <div className="hpc-card p-5 flex items-start gap-4">
              <span className="px-3.5 py-2 rounded-lg bg-[#07080c] border border-[#e6ff00]/60 text-[#e6ff00] font-mono font-bold text-base shrink-0 shadow-sm">
                02
              </span>
              <div>
                <h3 className="m-0 text-lg font-bold text-white">
                  Flynn, SIMD/VLA y Arquitecturas de GPUs (NVIDIA vs AMD)
                </h3>
                <p className="m-0 mt-1.5 text-sm text-slate-300 leading-relaxed">
                  Taxonomía de Flynn, vectorización VLA (ARM SVE2 / RVV), modelos SPMD vs SIMT, anatomía de GPUs (NVIDIA SM/Tensor Cores vs AMD CU/Matrix Cores).
                </p>
              </div>
            </div>

            <div className="hpc-card p-5 flex items-start gap-4">
              <span className="px-3.5 py-2 rounded-lg bg-[#07080c] border border-[#e6ff00]/60 text-[#e6ff00] font-mono font-bold text-base shrink-0 shadow-sm">
                03
              </span>
              <div>
                <h3 className="m-0 text-lg font-bold text-white">
                  Memoria (Memory Wall / NUMA) e Interconexiones
                </h3>
                <p className="m-0 mt-1.5 text-sm text-slate-300 leading-relaxed">
                  La brecha del Memory Wall, topologías UMA vs NUMA, política First-Touch, RDMA / Kernel-Bypass, RoCEv2, InfiniBand y AMD Infinity Fabric.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* Agenda - Bloque 2 */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Agenda • Bloque 2</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Rendimiento, Escalamiento y Compiladores
            </h2>
          </div>

          <div className="flex flex-col gap-3.5 my-auto">
            <div className="hpc-card p-5 flex items-start gap-4">
              <span className="px-3.5 py-2 rounded-lg bg-[#07080c] border border-[#e6ff00]/60 text-[#e6ff00] font-mono font-bold text-base shrink-0 shadow-sm">
                04
              </span>
              <div>
                <h3 className="m-0 text-lg font-bold text-white">
                  Métricas, Formatos MX y Modelo Roofline
                </h3>
                <p className="m-0 mt-1.5 text-sm text-slate-300 leading-relaxed">
                  Peak FLOPS, precisiones IEEE 754 vs Block Floating Point (OCP Microscaling MXFP8/MXFP4), tríada de cuellos de botella y visualizador interactivo Roofline.
                </p>
              </div>
            </div>

            <div className="hpc-card p-5 flex items-start gap-4">
              <span className="px-3.5 py-2 rounded-lg bg-[#07080c] border border-[#e6ff00]/60 text-[#e6ff00] font-mono font-bold text-base shrink-0 shadow-sm">
                05
              </span>
              <div>
                <h3 className="m-0 text-lg font-bold text-white">
                  Leyes de Escalamiento Paralelo (Amdahl vs Gustafson)
                </h3>
                <p className="m-0 mt-1.5 text-sm text-slate-300 leading-relaxed">
                  Escalamiento Fuerte frente a Escalamiento Débil, el cuello de botella serial asintótico y simulación interactiva para Exascale.
                </p>
              </div>
            </div>

            <div className="hpc-card p-5 flex items-start gap-4">
              <span className="px-3.5 py-2 rounded-lg bg-[#07080c] border border-[#e6ff00]/60 text-[#e6ff00] font-mono font-bold text-base shrink-0 shadow-sm">
                06
              </span>
              <div>
                <h3 className="m-0 text-lg font-bold text-white">
                  Compiladores y Optimizaciones
                </h3>
                <p className="m-0 mt-1.5 text-sm text-slate-300 leading-relaxed">
                  El rol del compilador en HPC, Dead Code Optimization (DCO/DCE) y Auto-Vectorización con enlaces interactivos a Compiler Explorer (Godbolt).
                </p>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* Agenda - Bloque 3: Código de Colores */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Agenda • Convenciones</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Código de Colores
            </h2>
          </div>

          <div className="flex flex-col gap-3 my-auto w-full">
            {/* Amarillo */}
            <div className="hpc-card p-4 flex items-center gap-4 border-l-4 border-l-[#e6ff00]">
              <span className="hpc-badge-yellow text-xs font-mono font-bold px-2.5 py-0.5 text-center mb-0 shrink-0">
                Amarillo
              </span>
              <span className="text-sm font-medium text-white">
                Foco Principal, Controles y Métricas Clave
              </span>
            </div>

            {/* Azul */}
            <div className="hpc-card p-4 flex items-center gap-4 border-l-4 border-l-[#38bdf8]">
              <span className="hpc-badge-cyan text-xs font-mono font-bold px-2.5 py-0.5 text-center mb-0 shrink-0">
                Azul
              </span>
              <span className="text-sm font-medium text-white">
                Memoria, Ancho de Banda, Redes e Interconexiones
              </span>
            </div>

            {/* Verde */}
            <div className="hpc-card p-4 flex items-center gap-4 border-l-4 border-l-[#34d399]">
              <span className="hpc-badge-emerald text-xs font-mono font-bold px-2.5 py-0.5 text-center mb-0 shrink-0">
                Verde
              </span>
              <span className="text-sm font-medium text-white">
                Eficiencia, Aceleración y Convergencia
              </span>
            </div>

            {/* Rojo */}
            <div className="hpc-card p-4 flex items-center gap-4 border-l-4 border-l-[#fb7185]">
              <span className="hpc-badge-rose text-xs font-mono font-bold px-2.5 py-0.5 text-center mb-0 shrink-0">
                Rojo
              </span>
              <span className="text-sm font-medium text-white">
                Cuellos de Botella, Hazards, Stalls y Límites
              </span>
            </div>

            {/* Púrpura */}
            <div className="hpc-card p-4 flex items-center gap-4 border-l-4 border-l-[#c084fc]">
              <span className="hpc-badge-purple text-xs font-mono font-bold px-2.5 py-0.5 text-center mb-0 shrink-0">
                Púrpura
              </span>
              <span className="text-sm font-medium text-white">
                Unidades Especializadas (SIMD, Tensor Cores, Matrix Cores)
              </span>
            </div>
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

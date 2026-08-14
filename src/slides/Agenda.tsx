import React from 'react';
import { Slide, Stack } from '@revealjs/react';

export const Agenda: React.FC = () => {
  return (
    <Stack>
      {/* Agenda - Bloque 1 */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="hpc-badge font-mono">Agenda • Bloque 1</span>
              <span className="text-xs text-slate-500 font-semibold">1 / 2</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4 border-b border-slate-800 pb-2">
              Arquitectura, Paralelismo e Interconexiones
            </h2>
          </div>

          <div className="flex flex-col gap-4 my-auto">
            <div className="hpc-card p-6 flex items-start gap-4">
              <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 font-mono font-bold text-base shrink-0">
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

            <div className="hpc-card p-6 flex items-start gap-4">
              <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 font-mono font-bold text-base shrink-0">
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

            <div className="hpc-card p-6 flex items-start gap-4">
              <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 font-mono font-bold text-base shrink-0">
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
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="hpc-badge font-mono">Agenda • Bloque 2</span>
              <span className="text-xs text-slate-500 font-semibold">2 / 2</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4 border-b border-slate-800 pb-2">
              Rendimiento, Escalamiento y Compiladores
            </h2>
          </div>

          <div className="flex flex-col gap-4 my-auto">
            <div className="hpc-card p-6 flex items-start gap-4">
              <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 font-mono font-bold text-base shrink-0">
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

            <div className="hpc-card p-6 flex items-start gap-4">
              <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 font-mono font-bold text-base shrink-0">
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

            <div className="hpc-card p-6 flex items-start gap-4">
              <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 font-mono font-bold text-base shrink-0">
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
    </Stack>
  );
};

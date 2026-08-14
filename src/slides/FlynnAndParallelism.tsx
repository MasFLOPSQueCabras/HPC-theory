import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { FlynnMatrix } from '../components/FlynnMatrix';
import { SimdElementwise } from '../components/simd/SimdElementwise';
import { SimdMasking } from '../components/simd/SimdMasking';
import { SimdGatherScatter } from '../components/simd/SimdGatherScatter';
import { SimdReduction } from '../components/simd/SimdReduction';
import { SimdShuffle } from '../components/simd/SimdShuffle';
import { SpmdDiagram } from '../components/SpmdDiagram';
import { SimtDiagram } from '../components/SimtDiagram';
import { CudaSmOverview } from '../components/gpu/CudaSmOverview';
import { CudaCoresDetail } from '../components/gpu/CudaCoresDetail';
import { CudaMemoryHierarchy } from '../components/gpu/CudaMemoryHierarchy';
import { AmdCuOverview } from '../components/gpu/AmdCuOverview';
import { AmdMatrixDetail } from '../components/gpu/AmdMatrixDetail';
import { AmdMemoryHierarchy } from '../components/gpu/AmdMemoryHierarchy';
import { GpuComparisonTable } from '../components/gpu/GpuComparisonTable';

export const FlynnAndParallelism: React.FC = () => {
  return (
    <Stack>
      {/* 1. Taxonomía de Flynn */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Paralelismo • Taxonomía Clásica</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Taxonomía de Flynn (1966)
            </h2>
          </div>

          <FlynnMatrix />
        </div>
      </Slide>

      {/* 2. Vectorización Tradicional vs Longitud de Vector Agnóstica (VLA) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Paralelismo • Vectorización</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Vectorización: Longitud Fija vs VLA (Vector Length Agnostic)
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6 border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">Longitud Fija</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">x86 SSE / AVX-512</h3>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-2 list-disc leading-relaxed">
                <li>Registros de tamaño fijo en el binario: <strong className="text-white">128 bits (XMM)</strong>, <strong className="text-white">256 bits (YMM)</strong>, <strong className="text-white">512 bits (ZMM)</strong>.</li>
                <li>Si una CPU amplía el ancho vectorial, el software <strong className="text-slate-200">debe ser recompilado</strong>.</li>
                <li>Manejo manual de bucles residuales (tail loops) para elementos sobrantes.</li>
              </ul>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">VLA (Agnóstico)</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">ARM SVE2 / RISC-V RVV</h3>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-2 list-disc leading-relaxed">
                <li>El código binario <strong className="text-white">desconoce la longitud física del vector</strong> en compilación (128 a 2048 bits).</li>
                <li>El mismo binario escala automáticamente desde móviles hasta el supercomputador <strong className="text-white">Fugaku (A64FX con 512 bits SVE)</strong>.</li>
                <li>Control dinámico mediante registros de predicado por hardware.</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#10241e] border border-[#34d399]/40 text-[#34d399] font-mono font-bold shrink-0">
              [EVOLUCIÓN]
            </span>
            <span>
              <strong className="text-white">Evolución del Silicio:</strong> El modelo VLA permite duplicar el ancho vectorial del chip en nuevas generaciones sin romper la compatibilidad binaria del software científico existente.
            </span>
          </div>
        </div>
      </Slide>

      {/* 3. SIMD 1: Elementwise / FMA */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">SIMD • Operaciones (1/5)</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Operaciones Vectoriales Element-wise (FMA)
            </h2>
          </div>

          <SimdElementwise />
        </div>
      </Slide>

      {/* 4. SIMD 2: Predicate Masking */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">SIMD • Operaciones (2/5)</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Enmascaramiento por Predicados (Predicate Masking)
            </h2>
          </div>

          <SimdMasking />
        </div>
      </Slide>

      {/* 5. SIMD 3: Gather & Scatter */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">SIMD • Operaciones (3/5)</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Gather &amp; Scatter: Memoria Dispersa y No Contigua
            </h2>
          </div>

          <SimdGatherScatter />
        </div>
      </Slide>

      {/* 6. SIMD 4: Horizontal Reductions */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">SIMD • Operaciones (4/5)</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Reducciones Vectoriales Horizontales
            </h2>
          </div>

          <SimdReduction />
        </div>
      </Slide>

      {/* 7. SIMD 5: Vector Shuffle / Permute */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">SIMD • Operaciones (5/5)</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Permutaciones y Barajado Vectorial (Shuffle / Permute)
            </h2>
          </div>

          <SimdShuffle />
        </div>
      </Slide>

      {/* 8. SPMD */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Modelos de Ejecución • SPMD (1/2)</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              SPMD (Single Program, Multiple Data): Hilos Autónomos
            </h2>
          </div>

          <SpmdDiagram />
        </div>
      </Slide>

      {/* 9. SPMD en Profundidad: MPI y OpenMP */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Modelos de Ejecución • SPMD (2/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Modelos de Programación SPMD: MPI vs OpenMP
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6 border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">Memoria Distribuida</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">MPI (Message Passing Interface)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Cada proceso posee un espacio de memoria física privado. La comunicación inter-proceso se realiza mediante paso explícito de mensajes por red (InfiniBand/RoCEv2).
              </p>
              <div className="p-3 rounded-lg bg-[#07080c] border border-[#232a3d] text-xs text-slate-400">
                <strong className="text-white">Escala:</strong> Desde 2 nodos hasta clústeres de cientos de miles de servidores en el Top500.
              </div>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">Memoria Compartida</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">OpenMP (Multi-Threading)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Múltiples hilos concurrentes comparten el mismo espacio de direcciones virtuales dentro del mismo nodo, sincronizándose mediante directivas de compilador.
              </p>
              <div className="p-3 rounded-lg bg-[#07080c] border border-[#232a3d] text-xs text-slate-400">
                <strong className="text-white">Escala:</strong> Intra-nodo en servidores con decenas o cientos de núcleos CPU.
              </div>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#151a27] border border-[#e6ff00]/40 text-[#e6ff00] font-mono font-bold shrink-0">
              [MODELO HÍBRIDO]
            </span>
            <span>
              <strong className="text-white">Modelo Híbrido Estándar:</strong> MPI entre nodos del clúster + OpenMP/CUDA dentro de cada nodo.
            </span>
          </div>
        </div>
      </Slide>

      {/* 10. SIMT */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Modelos de Ejecución • SIMT (1/2)</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              SIMT (Single Instruction, Multiple Threads) en GPUs
            </h2>
          </div>

          <SimtDiagram />
        </div>
      </Slide>

      {/* 11. SIMT en Profundidad: Divergencia y Lockstep */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Modelos de Ejecución • SIMT (2/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Divergencia de Warp y Reglas de Optimización en GPU
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6 border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">Mecanismo Hardware</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Ejecución en Lockstep (32 Hilos)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Un único program counter (PC) despacha la misma instrucción a los 32 hilos del warp simultáneamente.
              </p>
              <div className="p-3 rounded-lg bg-[#07080c] border border-[#232a3d] text-xs text-slate-400">
                Si todos los hilos siguen el mismo camino de ejecución, la eficiencia del silicio alcanza el <strong className="text-white">100%</strong>.
              </div>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#fb7185]">
              <span className="hpc-badge-rose font-mono mb-2 text-xs">Penalización</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Serialización por Divergencia</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Ante bifurcaciones condicionales (<code className="text-slate-200 font-mono">if / else</code>) donde los hilos toman caminos opuestos:
              </p>
              <div className="p-3 rounded-lg bg-[#07080c] border border-[#232a3d] text-xs text-slate-400">
                El hardware ejecuta secuencialmente ambas ramas, apagando los carriles inactivos con <strong className="text-white">máscaras de predicado</strong>, duplicando el tiempo total.
              </div>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#161d2d] border border-[#e6ff00]/40 text-[#e6ff00] font-mono font-bold shrink-0">
              [REGLA DE ORO]
            </span>
            <span>
              <strong className="text-white">Regla de Oro en GPU:</strong> Organizar los datos para que todos los hilos del mismo warp ejecuten exactamente la misma rama condicional.
            </span>
          </div>
        </div>
      </Slide>

      {/* 12. NVIDIA SM 1: Overview */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Arquitectura GPU • NVIDIA CUDA SM (1/3)</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Anatomía del Streaming Multiprocessor (SM) de NVIDIA
            </h2>
          </div>

          <CudaSmOverview />
        </div>
      </Slide>

      {/* 13. NVIDIA SM 2: Tensor Cores & Cores */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Arquitectura GPU • NVIDIA CUDA SM (2/3)</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Unidades de Cómputo NVIDIA: CUDA Cores vs Tensor Cores
            </h2>
          </div>

          <CudaCoresDetail />
        </div>
      </Slide>

      {/* 14. NVIDIA SM 3: Jerarquía de Memoria CUDA */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Arquitectura GPU • NVIDIA CUDA SM (3/3)</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Jerarquía de Memoria del SM: Shared Memory &amp; L1
            </h2>
          </div>

          <CudaMemoryHierarchy />
        </div>
      </Slide>

      {/* 15. AMD CU 1: Overview */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Arquitectura GPU • AMD CDNA CU (1/3)</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Anatomía del Compute Unit (CU) de AMD (CDNA / RDNA)
            </h2>
          </div>

          <AmdCuOverview />
        </div>
      </Slide>

      {/* 16. AMD CU 2: Matrix Cores */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Arquitectura GPU • AMD CDNA CU (2/3)</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Unidades de Cómputo AMD: Stream Processors vs Matrix Cores
            </h2>
          </div>

          <AmdMatrixDetail />
        </div>
      </Slide>

      {/* 17. AMD CU 3: LDS */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Arquitectura GPU • AMD CDNA CU (3/3)</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Jerarquía de Memoria AMD: LDS (Local Data Share)
            </h2>
          </div>

          <AmdMemoryHierarchy />
        </div>
      </Slide>

      {/* 18. Tabla Comparativa Final */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Síntesis Arquitectural • NVIDIA vs AMD</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Mapeo Arquitectural: NVIDIA SM vs AMD Compute Unit (CU)
            </h2>
          </div>

          <GpuComparisonTable />
        </div>
      </Slide>
    </Stack>
  );
};

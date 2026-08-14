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
          <span className="hpc-badge font-mono">Paralelismo • Taxonomía Clásica</span>
          <h2 className="text-3xl font-bold text-white mb-4 border-b border-slate-800 pb-2">
            Taxonomía de Flynn (1966)
          </h2>

          <FlynnMatrix />
        </div>
      </Slide>

      {/* 2. Vectorización Tradicional vs Longitud de Vector Agnóstica (VLA) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Paralelismo • Vectorización</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Vectorización: Longitud Fija vs VLA (Vector Length Agnostic)
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Longitud Fija</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">x86 SSE / AVX-512</h3>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-2 list-disc leading-relaxed">
                <li>Registros de tamaño fijo en el binario: <strong className="text-white">128 bits (XMM)</strong>, <strong className="text-white">256 bits (YMM)</strong>, <strong className="text-white">512 bits (ZMM)</strong>.</li>
                <li>Si una CPU amplía el ancho vectorial, el software <strong className="text-slate-200">debe ser recompilado</strong>.</li>
                <li>Manejo manual de bucles residuales (tail loops) para elementos sobrantes.</li>
              </ul>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">VLA (Agnóstico)</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">ARM SVE2 / RISC-V RVV</h3>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-2 list-disc leading-relaxed">
                <li>El código binario <strong className="text-white">desconoce la longitud física del vector</strong> en compilación (128 a 2048 bits).</li>
                <li>El mismo binario escala automáticamente desde móviles hasta el supercomputador <strong className="text-white">Fugaku (A64FX con 512 bits SVE)</strong>.</li>
                <li>Control dinámico mediante registros de predicado por hardware.</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            💡 <strong className="text-white">Evolución del Silicio:</strong> El modelo VLA permite duplicar el ancho vectorial del chip en nuevas generaciones sin romper la compatibilidad binaria del software científico existente.
          </div>
        </div>
      </Slide>

      {/* 3. SIMD 1: Elementwise / FMA (DIAGRAMA) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">SIMD • Operaciones (1/5)</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Operaciones Vectoriales Element-wise (FMA)
          </h2>

          <SimdElementwise />
        </div>
      </Slide>

      {/* 4. SIMD 2: Predicate Masking (DIAGRAMA) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">SIMD • Operaciones (2/5)</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Enmascaramiento por Predicados (Predicate Masking)
          </h2>

          <SimdMasking />
        </div>
      </Slide>

      {/* 5. SIMD 3: Gather & Scatter (DIAGRAMA) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">SIMD • Operaciones (3/5)</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Gather &amp; Scatter: Memoria Dispersa y No Contigua
          </h2>

          <SimdGatherScatter />
        </div>
      </Slide>

      {/* 6. SIMD 4: Horizontal Reductions (DIAGRAMA) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">SIMD • Operaciones (4/5)</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Reducciones Vectoriales Horizontales
          </h2>

          <SimdReduction />
        </div>
      </Slide>

      {/* 7. SIMD 5: Vector Shuffle / Permute (DIAGRAMA) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">SIMD • Operaciones (5/5)</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Permutaciones y Barajado Vectorial (Shuffle / Permute)
          </h2>

          <SimdShuffle />
        </div>
      </Slide>

      {/* 8. SPMD (DIAGRAMA DEDICADO - PERFECT VERTICAL FIT) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Modelos de Ejecución • SPMD (1/2)</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            SPMD (Single Program, Multiple Data): Hilos Autónomos
          </h2>

          <SpmdDiagram />
        </div>
      </Slide>

      {/* 9. SPMD en Profundidad: MPI y OpenMP */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Modelos de Ejecución • SPMD (2/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Modelos de Programación SPMD: MPI vs OpenMP
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Memoria Distribuida</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">MPI (Message Passing Interface)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Cada proceso posee un espacio de memoria física privado. La comunicación inter-proceso se realiza mediante paso explícito de mensajes por red (InfiniBand/RoCEv2).
              </p>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                <strong className="text-white">Escala:</strong> Desde 2 nodos hasta clústeres de cientos de miles de servidores en el Top500.
              </div>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Memoria Compartida</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">OpenMP (Multi-Threading)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Múltiples hilos concurrentes comparten el mismo espacio de direcciones virtuales dentro del mismo nodo, sincronizándose mediante directivas de compilador.
              </p>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                <strong className="text-white">Escala:</strong> Intra-nodo en servidores con decenas o cientos de núcleos CPU.
              </div>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            🚀 <strong className="text-white">Modelo Híbrido Estándar:</strong> MPI entre nodos del clúster + OpenMP/CUDA dentro de cada nodo.
          </div>
        </div>
      </Slide>

      {/* 10. SIMT (DIAGRAMA DEDICADO) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Modelos de Ejecución • SIMT (1/2)</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            SIMT (Single Instruction, Multiple Threads) en GPUs
          </h2>

          <SimtDiagram />
        </div>
      </Slide>

      {/* 11. SIMT en Profundidad: Divergencia y Lockstep */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Modelos de Ejecución • SIMT (2/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Divergencia de Warp y Reglas de Optimización en GPU
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Mecanismo Hardware</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Ejecución en Lockstep (32 Hilos)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Un único program counter (PC) despacha la misma instrucción a los 32 hilos del warp simultáneamente.
              </p>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                Si todos los hilos siguen el mismo camino de ejecución, la eficiencia del silicio alcanza el <strong className="text-white">100%</strong>.
              </div>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Penalización</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Serialización por Divergencia</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Ante bifurcaciones condicionales (<code className="text-slate-200 font-mono">if / else</code>) donde los hilos toman caminos opuestos:
              </p>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                El hardware ejecuta secuencialmente ambas ramas, apagando los carriles inactivos con <strong className="text-white">máscaras de predicado</strong>, duplicando el tiempo total.
              </div>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            💡 <strong className="text-white">Regla de Oro en GPU:</strong> Organizar los datos para que todos los hilos del mismo warp ejecuten exactamente la misma rama condicional.
          </div>
        </div>
      </Slide>

      {/* 12. NVIDIA SM 1: Overview (DIAGRAMA DEDICADO) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Arquitectura GPU • NVIDIA CUDA SM (1/3)</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Anatomía del Streaming Multiprocessor (SM) de NVIDIA
          </h2>

          <CudaSmOverview />
        </div>
      </Slide>

      {/* 13. NVIDIA SM 2: Tensor Cores & Cores (DIAGRAMA DEDICADO) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Arquitectura GPU • NVIDIA CUDA SM (2/3)</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Unidades de Cómputo NVIDIA: CUDA Cores vs Tensor Cores
          </h2>

          <CudaCoresDetail />
        </div>
      </Slide>

      {/* 14. NVIDIA SM 3: Jerarquía de Memoria CUDA (DIAGRAMA DEDICADO) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Arquitectura GPU • NVIDIA CUDA SM (3/3)</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Jerarquía de Memoria del SM: Shared Memory &amp; L1
          </h2>

          <CudaMemoryHierarchy />
        </div>
      </Slide>

      {/* 15. AMD CU 1: Overview (DIAGRAMA DEDICADO) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Arquitectura GPU • AMD CDNA CU (1/3)</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Anatomía del Compute Unit (CU) de AMD (CDNA / RDNA)
          </h2>

          <AmdCuOverview />
        </div>
      </Slide>

      {/* 16. AMD CU 2: Matrix Cores (DIAGRAMA DEDICADO) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Arquitectura GPU • AMD CDNA CU (2/3)</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Unidades de Cómputo AMD: Stream Processors vs Matrix Cores
          </h2>

          <AmdMatrixDetail />
        </div>
      </Slide>

      {/* 17. AMD CU 3: LDS (DIAGRAMA DEDICADO) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Arquitectura GPU • AMD CDNA CU (3/3)</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Jerarquía de Memoria AMD: LDS (Local Data Share)
          </h2>

          <AmdMemoryHierarchy />
        </div>
      </Slide>

      {/* 18. Tabla Comparativa Final (TABLA DEDICADA) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Síntesis Arquitectural • NVIDIA vs AMD</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Mapeo Arquitectural: NVIDIA SM vs AMD Compute Unit (CU)
          </h2>

          <GpuComparisonTable />
        </div>
      </Slide>
    </Stack>
  );
};

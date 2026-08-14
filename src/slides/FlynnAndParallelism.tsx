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
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Paralelismo • Taxonomía Clásica</span>
          <h2>Taxonomía de Flynn (1966)</h2>

          <FlynnMatrix />
        </div>
      </Slide>

      {/* 2. Vectorización Tradicional vs Longitud de Vector Agnóstica (VLA) */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Paralelismo • Vectorización</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>Vectorización: Longitud Fija vs VLA (Vector Length Agnostic)</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
            <div className="hpc-card" style={{ padding: '1.3rem' }}>
              <span className="hpc-badge">Longitud Fija</span>
              <h3 style={{ fontSize: '1.15rem', margin: '0.4rem 0', color: '#ffffff' }}>x86 SSE / AVX-512</h3>
              <ul style={{ fontSize: '0.82rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem', lineHeight: 1.4 }}>
                <li>Registros de tamaño fijo codificados en el binario: <strong>128 bits (XMM)</strong>, <strong>256 bits (YMM)</strong>, <strong>512 bits (ZMM)</strong>.</li>
                <li>Si una nueva CPU amplía el ancho vectorial, el software <strong>debe ser recompilado</strong> con nuevos flags del compilador.</li>
                <li>Manejo manual de bucles residuales (tail loops) para elementos sobrantes.</li>
              </ul>
            </div>

            <div className="hpc-card" style={{ padding: '1.3rem' }}>
              <span className="hpc-badge">VLA (Agnóstico)</span>
              <h3 style={{ fontSize: '1.15rem', margin: '0.4rem 0', color: '#ffffff' }}>ARM SVE2 / RISC-V RVV</h3>
              <ul style={{ fontSize: '0.82rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem', lineHeight: 1.4 }}>
                <li>El código binario <strong>desconoce la longitud física del vector</strong> en tiempo de compilación (128 a 2048 bits).</li>
                <li>El mismo binario escala automáticamente desde un procesador móvil hasta el supercomputador <strong>Fugaku (A64FX con 512 bits SVE)</strong>.</li>
                <li>Control dinámico mediante predicados por hardware (Predicate Registers).</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card" style={{ padding: '0.9rem 1.2rem', fontSize: '0.84rem', color: '#e5e7eb' }}>
            💡 <strong>Evolución del Silicio:</strong> El modelo VLA permite a los fabricantes duplicar el ancho vectorial de sus chips en nuevas generaciones sin romper la compatibilidad binaria del software existente.
          </div>
        </div>
      </Slide>

      {/* 3. SIMD 1: Elementwise / FMA */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">SIMD • Operaciones (1/5)</span>
          <h2>Operaciones Vectoriales Element-wise (FMA)</h2>

          <SimdElementwise />
        </div>
      </Slide>

      {/* 4. SIMD 2: Predicate Masking */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">SIMD • Operaciones (2/5)</span>
          <h2>Enmascaramiento por Predicados (Predicate Masking)</h2>

          <SimdMasking />
        </div>
      </Slide>

      {/* 5. SIMD 3: Gather & Scatter */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">SIMD • Operaciones (3/5)</span>
          <h2>Gather &amp; Scatter: Memoria Dispersa y No Contigua</h2>

          <SimdGatherScatter />
        </div>
      </Slide>

      {/* 6. SIMD 4: Horizontal Reductions */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">SIMD • Operaciones (4/5)</span>
          <h2>Reducciones Vectoriales Horizontales</h2>

          <SimdReduction />
        </div>
      </Slide>

      {/* 7. SIMD 5: Permute y Shuffles */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">SIMD • Operaciones (5/5)</span>
          <h2>Permutación y Shuffles de Carriles Vectoriales</h2>

          <SimdShuffle />
        </div>
      </Slide>

      {/* 8. Paradigma SPMD */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Modelos de Ejecución • SPMD</span>
          <h2>SPMD (Single Program, Multiple Data)</h2>

          <SpmdDiagram />
        </div>
      </Slide>

      {/* 9. Paradigma SIMT: Diagrama Interactivo Full Width */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Modelos de Ejecución • SIMT (1/2)</span>
          <h2>SIMT: Ejecución en Warps y Divergencia de Control</h2>

          <SimtDiagram />
        </div>
      </Slide>

      {/* 10. Paradigma SIMT: Fundamentos de Arquitectura GPU */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Modelos de Ejecución • SIMT (2/2)</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>Arquitectura GPU: Warps, Wavefronts y Coalescencia</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem', marginBottom: '1.2rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>Warp / Wavefront</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>Unidad de Despacho</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                En NVIDIA CUDA, <strong>32 hilos forman un Warp</strong>. En AMD ROCm, <strong>32 o 64 hilos forman un Wavefront</strong>. Todos comparten el mismo contador de programa (PC).
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>Predicate Masking</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>Máscaras de Predicado</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Cuando ocurre una divergencia <code>if/else</code>, el hardware no genera hilos nuevos: serializa ambas ramas y apaga mediante <strong>bits de predicado</strong> los carriles inactivos.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>Memory Coalescing</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>Coalescencia de Memoria</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Si los 32 hilos del warp acceden a 32 palabras contiguas en memoria, la GPU fusiona todas las lecturas en <strong>1 sola transacción de 128 Bytes hacia VRAM</strong>.
              </p>
            </div>
          </div>

          <div className="hpc-card" style={{ padding: '0.9rem 1.2rem', fontSize: '0.84rem', color: '#e5e7eb' }}>
            🚀 <strong>Regla de Rendimiento en GPUs para HPC:</strong> Diseñar estructuras de datos en formato SoA (*Structure of Arrays*) para garantizar accesos contiguos coalescentes y eliminar ramas condicionales divergentes dentro del mismo warp.
          </div>
        </div>
      </Slide>

      {/* 11. Arquitectura NVIDIA CUDA: Anatomía del SM */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Arquitectura GPU • NVIDIA (1/3)</span>
          <h2>NVIDIA CUDA: Anatomía del Streaming Multiprocessor (SM)</h2>

          <CudaSmOverview />
        </div>
      </Slide>

      {/* 12. Arquitectura NVIDIA CUDA: CUDA Cores vs Tensor Cores */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Arquitectura GPU • NVIDIA (2/3)</span>
          <h2>NVIDIA CUDA: CUDA Cores (FP32/FP64) vs Tensor Cores (IA)</h2>

          <CudaCoresDetail />
        </div>
      </Slide>

      {/* 13. Arquitectura NVIDIA CUDA: Jerarquía de Memoria */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Arquitectura GPU • NVIDIA (3/3)</span>
          <h2>NVIDIA CUDA: Jerarquía de Memoria (Shared Memory a HBM3e)</h2>

          <CudaMemoryHierarchy />
        </div>
      </Slide>

      {/* 14. Arquitectura AMD CDNA: Anatomía del Compute Unit */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Arquitectura GPU • AMD (1/3)</span>
          <h2>AMD CDNA: Anatomía del Compute Unit (CU) &amp; WGP</h2>

          <AmdCuOverview />
        </div>
      </Slide>

      {/* 15. Arquitectura AMD CDNA: Matrix Cores y Dual RF */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Arquitectura GPU • AMD (2/3)</span>
          <h2>AMD CDNA: Matrix Cores (MFMA) y Dual RF (VGPR vs SGPR)</h2>

          <AmdMatrixDetail />
        </div>
      </Slide>

      {/* 16. Arquitectura AMD CDNA: Jerarquía de Memoria */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Arquitectura GPU • AMD (3/3)</span>
          <h2>AMD CDNA: Jerarquía de Memoria (LDS, Infinity Cache y HBM3)</h2>

          <AmdMemoryHierarchy />
        </div>
      </Slide>

      {/* 17. Comparativa y Mapeo: NVIDIA CUDA vs AMD ROCm/CDNA */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Supercomputación • Mapeo de Hardware</span>
          <h2>Mapeo Arquitectural: NVIDIA CUDA vs AMD ROCm / CDNA</h2>

          <GpuComparisonTable />
        </div>
      </Slide>
    </Stack>
  );
};

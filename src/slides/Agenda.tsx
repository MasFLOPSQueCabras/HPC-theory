import React from 'react';
import { Slide, Stack } from '@revealjs/react';

export const Agenda: React.FC = () => {
  return (
    <Stack>
      {/* Agenda - Bloque 1 */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '1rem 2rem' }}>
          <span className="hpc-badge">Agenda • Parte 1</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1.2rem' }}>Arquitectura, Paralelismo e Interconexiones</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '950px' }}>
            <div className="hpc-card" style={{ padding: '1.2rem 1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span className="hpc-badge">01</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Microarquitectura de CPU</h3>
              </div>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.86rem', color: '#9ca3af' }}>
                Trilema PPA, leyes físicas, pipelining, hazards (RAW/WAR/WAW), predicción de saltos, Reorder Buffer (ROB) e instrucciones in-flight.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem 1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span className="hpc-badge">02</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Taxonomía de Flynn, SIMD y VLA</h3>
              </div>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.86rem', color: '#9ca3af' }}>
                Clasificación de Flynn, operaciones vectoriales (FMA, Masking, Gather/Scatter), VLA en ARM SVE2 / RISC-V y modelos SPMD vs SIMT.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem 1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span className="hpc-badge">03</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Memoria e Interconexiones (RDMA / RoCEv2 / IF)</h3>
              </div>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.86rem', color: '#9ca3af' }}>
                Topologías UMA vs NUMA, política First-Touch, RDMA y Kernel-Bypass, redes RoCEv2 / InfiniBand y AMD Infinity Fabric.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* Agenda - Bloque 2 */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '1rem 2rem' }}>
          <span className="hpc-badge">Agenda • Parte 2</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1.2rem' }}>Rendimiento, Escalamiento y Compiladores</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '950px' }}>
            <div className="hpc-card" style={{ padding: '1.2rem 1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span className="hpc-badge">04</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Métricas y Modelo Roofline</h3>
              </div>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.86rem', color: '#9ca3af' }}>
                Peak FLOPS, precisiones numéricas, la tríada de cuellos de botella (Compute, Memory e I/O Bound) y gráfica interactiva de Intensidad Operacional.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem 1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span className="hpc-badge">05</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Leyes de Escalamiento Paralelo</h3>
              </div>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.86rem', color: '#9ca3af' }}>
                Escalamiento Fuerte (Ley de Amdahl) frente a Escalamiento Débil (Ley de Gustafson) y límites asintóticos en computación Exascale.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem 1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span className="hpc-badge">06</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Compiladores y Optimizaciones</h3>
              </div>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.86rem', color: '#9ca3af' }}>
                El rol del compilador en HPC, Dead Code Optimization (DCO) y Auto-Vectorización con enlaces interactivos a Compiler Explorer (Godbolt).
              </p>
            </div>
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

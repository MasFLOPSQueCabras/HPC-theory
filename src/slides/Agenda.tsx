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
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Microarquitectura de CPU (Frontend &amp; Backend)</h3>
              </div>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.86rem', color: '#9ca3af' }}>
                División Frontend (In-Order) y Backend (OoO), trilema PPA, pipelining, hazards (RAW/WAR/WAW), predicción de saltos (BPU / TAGE / BTB) y Reorder Buffer (ROB).
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem 1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span className="hpc-badge">02</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Flynn, SIMD/VLA y Arquitecturas de GPUs (NVIDIA vs AMD)</h3>
              </div>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.86rem', color: '#9ca3af' }}>
                Clasificación de Flynn, vectorización VLA (ARM SVE2 / RISC-V RVV), modelos SPMD vs SIMT, anatomía de GPUs (NVIDIA SM/Tensor Cores vs AMD CU/Matrix Cores) y mapeo arquitectural.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem 1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span className="hpc-badge">03</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Memoria (Memory Wall / NUMA) e Interconexiones</h3>
              </div>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.86rem', color: '#9ca3af' }}>
                La brecha del Memory Wall, topologías UMA vs NUMA, política First-Touch, RDMA y Kernel-Bypass, redes RoCEv2 / InfiniBand y AMD Infinity Fabric.
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
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Métricas, Formatos MX y Modelo Roofline</h3>
              </div>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.86rem', color: '#9ca3af' }}>
                Peak FLOPS, precisiones escalares vs Block Floating Point (MXFP8/MXFP4 de OCP), tríada de cuellos de botella y visualizador interactivo Roofline.
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
                El rol del compilador en HPC, Dead Code Optimization (DCO/DCE) y Auto-Vectorización con enlaces interactivos a Compiler Explorer (Godbolt).
              </p>
            </div>
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

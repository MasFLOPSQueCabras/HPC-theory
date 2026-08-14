import React from 'react';

export const GpuComparisonTable: React.FC = () => {
  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)', width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1rem' }}>Diccionario y Correspondencia Arquitectural: NVIDIA vs AMD</h4>
        <span className="hpc-badge" style={{ margin: 0, fontSize: '0.7rem' }}>CUDA vs ROCm / CDNA</span>
      </div>

      <table className="hpc-table" style={{ width: '100%', fontSize: '0.75rem', marginTop: '0.3rem' }}>
        <thead>
          <tr>
            <th style={{ width: '24%', padding: '0.4rem 0.6rem' }}>Concepto / Nivel</th>
            <th style={{ width: '38%', color: '#38bdf8', padding: '0.4rem 0.6rem' }}>🟢 NVIDIA (CUDA / Hopper &amp; Blackwell)</th>
            <th style={{ width: '38%', color: '#f87171', padding: '0.4rem 0.6rem' }}>🔴 AMD (ROCm / CDNA 3 &amp; 4)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Unidad Básica de Cómputo</strong></td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>SM</strong> (Streaming Multiprocessor)</td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>CU</strong> (Compute Unit) / <strong>WGP</strong> (Workgroup Processor)</td>
          </tr>
          <tr>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Grupo de Hilos en Lockstep</strong></td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Warp</strong> (estrictamente 32 hilos)</td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Wavefront</strong> (32 en RDNA / 64 en CDNA)</td>
          </tr>
          <tr>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Cores Matriciales (IA/DL)</strong></td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Tensor Cores</strong> (FP16, BF16, FP8, NVFP4)</td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Matrix Cores / MFMA</strong> (FP16, BF16, FP8, MXFP4)</td>
          </tr>
          <tr>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Memoria Local en Chip (SRAM)</strong></td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Shared Memory</strong> (<code>__shared__</code>)</td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>LDS</strong> (Local Data Share)</td>
          </tr>
          <tr>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Jerarquía de Registros</strong></td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Register File Unificado</strong> (RF por hilo)</td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Dual RF:</strong> VGPR (Vector) + SGPR (Scalar uniforme)</td>
          </tr>
          <tr>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Caché Global en Chip</strong></td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>L2 Cache Masiva</strong> (50 MB en H100)</td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Infinity Cache / L2 MALL</strong> (hasta 256 MB)</td>
          </tr>
          <tr>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Interconexión Multi-GPU</strong></td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>NVLink 4 / 5</strong> (900 a 1800 GB/s)</td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Infinity Fabric 3 / 4</strong> (hasta 896 GB/s)</td>
          </tr>
          <tr>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>Capa de Portabilidad</strong></td>
            <td style={{ padding: '0.35rem 0.6rem' }}>Nativo <strong>CUDA C/C++</strong> / PTX</td>
            <td style={{ padding: '0.35rem 0.6rem' }}><strong>HIP (Heterogeneous-Compute Interface)</strong></td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '0.6rem', background: '#070a12', padding: '0.45rem 0.8rem', borderRadius: '6px', fontSize: '0.74rem', color: '#cbd5e1', textAlign: 'center' }}>
        💡 <strong>Portabilidad en Supercomputación:</strong> Con la capa <strong>HIP</strong> y marcos agnósticos (Kokkos, RAJA, SYCL), el mismo kernel se compila directamente en clústeres NVIDIA (<em>Perlmutter</em>) o AMD (<em>Frontier / El Capitan</em>).
      </div>
    </div>
  );
};

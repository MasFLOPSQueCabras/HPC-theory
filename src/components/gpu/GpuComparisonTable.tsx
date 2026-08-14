import React from 'react';

export const GpuComparisonTable: React.FC = () => {
  return (
    <div className="bg-[#0f131d] p-4 rounded-xl border border-[#232a3d] w-full max-w-5xl mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="m-0 text-white text-base font-bold">Diccionario y Correspondencia Arquitectural: NVIDIA vs AMD</h4>
        <span className="hpc-badge font-mono text-[10px] mb-0">CUDA vs ROCm / CDNA</span>
      </div>

      <table className="w-full text-xs mt-2 border-collapse">
        <thead>
          <tr className="bg-[#07080c] border-b border-[#232a3d]">
            <th className="w-1/4 p-2.5 font-bold text-left text-slate-300">Concepto / Nivel</th>
            <th className="w-[37.5%] p-2.5 font-bold text-left text-[#38bdf8]">NVIDIA (CUDA / Hopper &amp; Blackwell)</th>
            <th className="w-[37.5%] p-2.5 font-bold text-left text-[#fb7185]">AMD (ROCm / CDNA 3 &amp; 4)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#232a3d] text-slate-300">
          <tr className="hover:bg-[#151a27]">
            <td className="p-2 font-semibold text-white">Unidad Básica de Cómputo</td>
            <td className="p-2 font-mono text-[#38bdf8]">SM (Streaming Multiprocessor)</td>
            <td className="p-2 font-mono text-[#fb7185]">CU (Compute Unit) / WGP</td>
          </tr>
          <tr className="hover:bg-[#151a27]">
            <td className="p-2 font-semibold text-white">Grupo de Hilos en Lockstep</td>
            <td className="p-2 font-mono text-[#38bdf8]">Warp (32 hilos estrictos)</td>
            <td className="p-2 font-mono text-[#fb7185]">Wavefront (32 RDNA / 64 CDNA)</td>
          </tr>
          <tr className="hover:bg-[#151a27]">
            <td className="p-2 font-semibold text-white">Cores Matriciales (IA/DL)</td>
            <td className="p-2 font-mono text-[#38bdf8]">Tensor Cores (FP16, FP8, NVFP4)</td>
            <td className="p-2 font-mono text-[#fb7185]">Matrix Cores / MFMA (FP16, FP8, MXFP4)</td>
          </tr>
          <tr className="hover:bg-[#151a27]">
            <td className="p-2 font-semibold text-white">Memoria Local en Chip (SRAM)</td>
            <td className="p-2 font-mono text-[#38bdf8]">Shared Memory (__shared__)</td>
            <td className="p-2 font-mono text-[#fb7185]">LDS (Local Data Share)</td>
          </tr>
          <tr className="hover:bg-[#151a27]">
            <td className="p-2 font-semibold text-white">Jerarquía de Registros</td>
            <td className="p-2 font-mono text-[#38bdf8]">Register File Unificado (RF por hilo)</td>
            <td className="p-2 font-mono text-[#fb7185]">Dual RF: VGPR (Vec) + SGPR (Scalar)</td>
          </tr>
          <tr className="hover:bg-[#151a27]">
            <td className="p-2 font-semibold text-white">Caché Global en Chip</td>
            <td className="p-2 font-mono text-[#38bdf8]">L2 Cache Masiva (50 MB en H100)</td>
            <td className="p-2 font-mono text-[#fb7185]">Infinity Cache / L2 MALL (hasta 256 MB)</td>
          </tr>
          <tr className="hover:bg-[#151a27]">
            <td className="p-2 font-semibold text-white">Interconexión Multi-GPU</td>
            <td className="p-2 font-mono text-[#38bdf8]">NVLink 4 / 5 (900 - 1800 GB/s)</td>
            <td className="p-2 font-mono text-[#fb7185]">Infinity Fabric 3 / 4 (hasta 896 GB/s)</td>
          </tr>
          <tr className="hover:bg-[#151a27]">
            <td className="p-2 font-semibold text-white">Capa de Portabilidad</td>
            <td className="p-2 font-mono text-[#38bdf8]">Nativo CUDA C/C++ / PTX</td>
            <td className="p-2 font-mono text-[#fb7185]">HIP (Heterogeneous Interface)</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-3 bg-[#07080c] p-2 rounded-lg border border-[#232a3d] text-xs text-slate-300 text-center flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded bg-[#151a27] text-[#e6ff00] font-mono text-[10px] font-bold border border-[#e6ff00]/40">PORTABILIDAD</span>
        <span>Con la capa <strong>HIP</strong> y marcos agnósticos (Kokkos, RAJA, SYCL), el mismo kernel se compila directamente en clústeres NVIDIA (<em>Perlmutter</em>) o AMD (<em>Frontier / El Capitan</em>).</span>
      </div>
    </div>
  );
};

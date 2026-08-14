import React from 'react';
import { Math } from '../Math';

export const CudaCoresDetail: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-3">
        {/* Left: CUDA Cores */}
        <div className="hpc-card p-4 border-t-2 border-t-[#34d399]">
          <div className="flex items-center gap-2 mb-2">
            <span className="hpc-badge-emerald text-xs font-mono mb-0">
              CUDA Cores
            </span>
            <h4 className="m-0 text-sm font-bold text-white">Cálculo Escalar / Vectorial Clásico</h4>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-2">
            Unidades ALU individuales diseñadas para ejecutar 1 operación elemental por hilo y por ciclo de reloj:
          </p>

          <ul className="text-xs pl-4 m-0 text-slate-300 flex flex-col gap-1.5 list-disc">
            <li><strong className="text-white">FP32 / FP64 Cores:</strong> Aritmética estándar IEEE 754 de simple y doble precisión para simulaciones científicas de física, química cuántica y fluidos.</li>
            <li><strong className="text-white">INT32 Cores:</strong> Direccionamiento de punteros, índices de matrices y operaciones lógicas en paralelo sin detener las ALUs de punto flotante.</li>
            <li><strong className="text-white">SFU (Special Function Units):</strong> Cálculo por hardware de funciones trascendentes complejas (<Math math="\sin, \cos, \sqrt{x}, 1/\sqrt{x}, \log_2" />).</li>
          </ul>
        </div>

        {/* Right: Tensor Cores */}
        <div className="hpc-card p-4 border-t-2 border-t-[#38bdf8]">
          <div className="flex items-center gap-2 mb-2">
            <span className="hpc-badge-cyan text-xs font-mono mb-0">
              Tensor Cores
            </span>
            <h4 className="m-0 text-sm font-bold text-[#38bdf8]">Aceleración Matricial Masiva (IA/HPC)</h4>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-2">
            Unidades matriciales de hardware que resuelven la operación <Math math="D = A \times B + C" /> en 1 ciclo de reloj:
          </p>

          <ul className="text-xs pl-4 m-0 text-slate-300 flex flex-col gap-1.5 list-disc">
            <li><strong className="text-white">Multi-Precisión Mixta:</strong> Soporte nativo para FP16, BF16, TF32, FP8 (E5M2/E4M3) y precisión ultra-baja FP4 (NVIDIA Blackwell NVFP4).</li>
            <li><strong className="text-white">Transformer Engine:</strong> Escalado automático y cuantización dinámica en formatos Microscaling (MX) para acelerar inferencia y entrenamiento de LLMs.</li>
            <li><strong className="text-white">Salto en Throughput:</strong> Multiplica por <strong className="text-white">10x a 16x los FLOPs</strong> frente a los CUDA Cores tradicionales.</li>
          </ul>
        </div>
      </div>

      {/* Bottom Takeaway */}
      <div className="bg-[#07080c] p-2.5 rounded-lg border border-[#232a3d] text-xs text-slate-300 text-center flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded bg-[#161d2d] text-[#e6ff00] font-mono text-[10px] font-bold border border-[#e6ff00]/40">ACELERACIÓN GEMM</span>
        <span>Convertir operaciones elementales a multiplicaciones matriciales densas (GEMM) para canalizar el cómputo hacia los Tensor Cores en lugar de saturar las ALUs estándar.</span>
      </div>
    </div>
  );
};

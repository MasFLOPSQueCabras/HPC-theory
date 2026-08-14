import React from 'react';

export const CudaSmOverview: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Full-Width Panoramic SVG: SM Diagram */}
      <div className="bg-[#07080c] p-3 rounded-lg border border-[#38bdf8]/30 mb-3">
        <svg viewBox="0 0 740 220" className="w-full h-auto block">
          {/* Outer SM Box */}
          <rect x="5" y="5" width="730" height="210" rx="8" fill="#0f131d" stroke="#38bdf8" strokeWidth="1.5" />

          {/* Top Shared Memory / L1 Cache */}
          <rect x="18" y="14" width="704" height="28" rx="5" fill="#102030" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="370" y="32" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
            L1 Data Cache / Shared Memory Unificada (128 KB - 256 KB SRAM Ultra-Rápida en Chip)
          </text>

          {/* 4 Spacious Sub-Cores */}
          {[0, 1, 2, 3].map((sub) => (
            <g key={sub}>
              {/* Sub-core Outer Boundary */}
              <rect x={18 + sub * 178} y="48" width="168" height="155" rx="6" fill="#151a27" stroke="#232a3d" strokeWidth="1" />
              
              {/* Header Sub-core */}
              <rect x={24 + sub * 178} y="54" width="156" height="20" rx="4" fill="#07080c" stroke="#38bdf8" strokeWidth="1" />
              <text x={102 + sub * 178} y="68" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                Warp Scheduler {sub} + Dispatch
              </text>

              {/* Register File */}
              <rect x={24 + sub * 178} y="78" width="156" height="20" rx="4" fill="#161d2d" stroke="#e6ff00" strokeWidth="1" />
              <text x={102 + sub * 178} y="92" fill="#e6ff00" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                Register File (16K Reg / 64 KB)
              </text>

              {/* Middle Compute Section: CUDA Cores + Tensor Cores */}
              <rect x={24 + sub * 178} y="103" width="75" height="46" rx="4" fill="#07080c" stroke="#34d399" strokeWidth="1.2" />
              <text x={61 + sub * 178} y="120" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">32 FP32</text>
              <text x={61 + sub * 178} y="132" fill="#ffffff" fontSize="7.5" textAnchor="middle">CUDA Cores</text>
              <text x={61 + sub * 178} y="143" fill="#94a3b8" fontSize="7" textAnchor="middle">+ 16 INT32</text>

              <rect x={105 + sub * 178} y="103" width="75" height="46" rx="4" fill="#07080c" stroke="#38bdf8" strokeWidth="1.2" />
              <text x={142 + sub * 178} y="120" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">1 Tensor</text>
              <text x={142 + sub * 178} y="132" fill="#ffffff" fontSize="7.5" textAnchor="middle">Core (IA)</text>
              <text x={142 + sub * 178} y="143" fill="#94a3b8" fontSize="7" textAnchor="middle">FP16/FP8/NVFP4</text>

              {/* Bottom LD/ST and SFU Units */}
              <rect x={24 + sub * 178} y="154" width="75" height="22" rx="3" fill="#07080c" stroke="#232a3d" />
              <text x={61 + sub * 178} y="169" fill="#cbd5e1" fontSize="7.5" fontWeight="bold" textAnchor="middle">8 LD / ST Units</text>

              <rect x={105 + sub * 178} y="154" width="75" height="22" rx="3" fill="#07080c" stroke="#232a3d" />
              <text x={142 + sub * 178} y="169" fill="#cbd5e1" fontSize="7.5" fontWeight="bold" textAnchor="middle">4 SFU (Trascend.)</text>

              {/* Sub-Core Label */}
              <text x={102 + sub * 178} y="193" fill="#94a3b8" fontSize="8" textAnchor="middle">
                Sub-Core {sub}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* 2 Bottom Explanatory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
        <div className="hpc-card p-3 border-l-2 border-l-[#38bdf8]">
          <strong className="text-xs text-[#38bdf8]">4 Warp Schedulers Independientes</strong>
          <p className="m-0 mt-1 text-xs text-slate-300 leading-relaxed">
            Cada ciclo, cada scheduler selecciona y emite instrucciones para un Warp de 32 hilos en estado listo. Permite alternar entre cientos de warps activos con coste 0 de cambio de contexto.
          </p>
        </div>

        <div className="hpc-card p-3 border-l-2 border-l-[#e6ff00]">
          <strong className="text-xs text-[#e6ff00]">Banco Masivo de 64K Registros (256 KB por SM)</strong>
          <p className="m-0 mt-1 text-xs text-slate-300 leading-relaxed">
            El gigantesco tamaño del Register File permite retener el estado de hasta <strong className="text-white">2048 hilos concurrentes por SM</strong> en silicio, ocultando completamente la latencia de memoria global.
          </p>
        </div>
      </div>
    </div>
  );
};

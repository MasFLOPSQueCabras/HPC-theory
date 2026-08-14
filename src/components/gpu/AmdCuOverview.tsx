import React from 'react';

export const AmdCuOverview: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Full-Width Panoramic SVG: CU Diagram */}
      <div className="bg-[#07080c] p-3 rounded-lg border border-[#fb7185]/30 mb-3">
        <svg viewBox="0 0 740 220" className="w-full h-auto block">
          {/* Outer CU Box */}
          <rect x="5" y="5" width="730" height="210" rx="8" fill="#0f131d" stroke="#fb7185" strokeWidth="1.5" />

          {/* Top LDS */}
          <rect x="18" y="14" width="704" height="28" rx="5" fill="#1e131d" stroke="#fb7185" strokeWidth="1.2" />
          <text x="370" y="32" fill="#fb7185" fontSize="11" fontWeight="bold" textAnchor="middle">
            LDS (Local Data Share: 64 KB - 128 KB SRAM Ultra-Rápida compartida en el CU)
          </text>

          {/* 4 Spacious SIMD Units */}
          {[0, 1, 2, 3].map((simd) => (
            <g key={simd}>
              {/* SIMD Unit Outer Boundary */}
              <rect x={18 + simd * 178} y="48" width="168" height="155" rx="6" fill="#151a27" stroke="#232a3d" strokeWidth="1" />
              
              {/* Header Wavefront Scheduler */}
              <rect x={24 + simd * 178} y="54" width="156" height="20" rx="4" fill="#07080c" stroke="#fb7185" strokeWidth="1" />
              <text x={102 + simd * 178} y="68" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                Wave Scheduler (Wave32/64)
              </text>

              {/* Dual Registers: VGPR + SGPR */}
              <rect x={24 + simd * 178} y="78" width="156" height="20" rx="4" fill="#161d2d" stroke="#e6ff00" strokeWidth="1" />
              <text x={102 + simd * 178} y="92" fill="#e6ff00" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                Dual RF: VGPR (Vec) + SGPR (Scalar)
              </text>

              {/* Middle Compute Section: VALU Vector + Matrix Cores */}
              <rect x={24 + simd * 178} y="103" width="75" height="46" rx="4" fill="#07080c" stroke="#34d399" strokeWidth="1.2" />
              <text x={61 + simd * 178} y="120" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">16-32 VALU</text>
              <text x={61 + simd * 178} y="132" fill="#ffffff" fontSize="7.5" textAnchor="middle">Vector Cores</text>
              <text x={61 + simd * 178} y="143" fill="#94a3b8" fontSize="7" textAnchor="middle">FP32 / FP64</text>

              <rect x={105 + simd * 178} y="103" width="75" height="46" rx="4" fill="#07080c" stroke="#38bdf8" strokeWidth="1.2" />
              <text x={142 + simd * 178} y="120" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">1 Matrix</text>
              <text x={142 + simd * 178} y="132" fill="#ffffff" fontSize="7.5" textAnchor="middle">Core (MFMA)</text>
              <text x={142 + simd * 178} y="143" fill="#94a3b8" fontSize="7" textAnchor="middle">BF16/FP8/MXFP4</text>

              {/* Bottom SALU & L1 Cache */}
              <rect x={24 + simd * 178} y="154" width="75" height="22" rx="3" fill="#07080c" stroke="#232a3d" />
              <text x={61 + simd * 178} y="169" fill="#cbd5e1" fontSize="7.5" fontWeight="bold" textAnchor="middle">SALU (Scalar ALU)</text>

              <rect x={105 + simd * 178} y="154" width="75" height="22" rx="3" fill="#07080c" stroke="#232a3d" />
              <text x={142 + simd * 178} y="169" fill="#cbd5e1" fontSize="7.5" fontWeight="bold" textAnchor="middle">L1 Vector Cache</text>

              {/* Unit Label */}
              <text x={102 + simd * 178} y="193" fill="#94a3b8" fontSize="8" textAnchor="middle">
                SIMD Unit {simd}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* 2 Bottom Explanatory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
        <div className="hpc-card p-3 border-l-2 border-l-[#fb7185]">
          <strong className="text-xs text-[#fb7185]">4 Unidades SIMD por Compute Unit</strong>
          <p className="m-0 mt-1 text-xs text-slate-300 leading-relaxed">
            Cada CU ejecuta Wavefronts de 32 o 64 hilos, alternando flujos vectoriales y escalares para saturar las ALUs en cada ciclo.
          </p>
        </div>

        <div className="hpc-card p-3 border-l-2 border-l-[#38bdf8]">
          <strong className="text-xs text-[#38bdf8]">Agrupamiento WGP (Workgroup Processor)</strong>
          <p className="m-0 mt-1 text-xs text-slate-300 leading-relaxed">
            En arquitecturas AMD modernas, <strong className="text-white">2 Compute Units se fusionan en un WGP</strong>, compartiendo cachés L1 de instrucciones y datos para duplicar el rendimiento en cómputo denso.
          </p>
        </div>
      </div>
    </div>
  );
};

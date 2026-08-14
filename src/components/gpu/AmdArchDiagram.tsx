import React, { useState } from 'react';

export const AmdArchDiagram: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<'cu' | 'matrix' | 'memory'>('cu');

  return (
    <div className="p-4 rounded-xl bg-[#0f131d] border border-[#232a3d] w-full max-w-5xl mx-auto shadow-2xl">
      {/* Header & Subtitle */}
      <div className="flex justify-between items-center mb-3 flex-wrap gap-2 border-b border-[#232a3d] pb-2.5">
        <div>
          <span className="hpc-badge-rose text-xs font-mono mb-0">
            AMD CDNA / RDNA Architecture
          </span>
          <span className="ml-2 text-xs text-slate-300">
            Jerarquía Hardware: XCD &rarr; WGP &rarr; <strong className="text-white">Compute Unit (CU)</strong> &rarr; SIMD Units
          </span>
        </div>

        {/* View Switcher */}
        <div className="flex gap-1 bg-[#07080c] p-1 rounded-md border border-[#232a3d]">
          <button
            onClick={() => setSelectedUnit('cu')}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              selectedUnit === 'cu' ? 'bg-[#1e131d] text-[#fb7185] font-bold border border-[#fb7185]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Anatomía del CU
          </button>
          <button
            onClick={() => setSelectedUnit('matrix')}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              selectedUnit === 'matrix' ? 'bg-[#161d2d] text-[#e6ff00] font-bold border border-[#e6ff00]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Matrix Cores &amp; Registros
          </button>
          <button
            onClick={() => setSelectedUnit('memory')}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              selectedUnit === 'memory' ? 'bg-[#102030] text-[#38bdf8] font-bold border border-[#38bdf8]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. LDS &amp; Infinity Cache
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {selectedUnit === 'cu' && (
        <div className="flex flex-col gap-3">
          {/* Full-Width Panoramic SVG: CU Diagram */}
          <div className="bg-[#07080c] p-3 rounded-lg border border-[#232a3d]">
            <svg viewBox="0 0 740 230" className="w-full h-auto block">
              {/* Outer CU Box */}
              <rect x="5" y="5" width="730" height="220" rx="8" fill="#0f131d" stroke="#fb7185" strokeWidth="1.5" />

              {/* Top LDS (Local Data Share) */}
              <rect x="18" y="14" width="704" height="30" rx="5" fill="#1e131d" stroke="#fb7185" strokeWidth="1.2" />
              <text x="370" y="33" fill="#fb7185" fontSize="11" fontWeight="bold" textAnchor="middle">
                LDS (Local Data Share: 64 KB - 128 KB SRAM Ultra-Rápida compartida en el CU)
              </text>

              {/* 4 Spacious SIMD Units */}
              {[0, 1, 2, 3].map((simd) => (
                <g key={simd}>
                  {/* SIMD Unit Outer Boundary */}
                  <rect x={18 + simd * 178} y="52" width="168" height="162" rx="6" fill="#151a27" stroke="#232a3d" strokeWidth="1" />
                  
                  {/* Header Wavefront Scheduler */}
                  <rect x={24 + simd * 178} y="58" width="156" height="22" rx="4" fill="#07080c" stroke="#fb7185" strokeWidth="1" />
                  <text x={102 + simd * 178} y="73" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Wave Scheduler (Wave32/64)
                  </text>

                  {/* Dual Registers: VGPR + SGPR */}
                  <rect x={24 + simd * 178} y="85" width="156" height="22" rx="4" fill="#161d2d" stroke="#e6ff00" strokeWidth="1" />
                  <text x={102 + simd * 178} y="99" fill="#e6ff00" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Dual RF: VGPR (Vec) + SGPR (Scalar)
                  </text>

                  {/* Middle Compute Section: VALU Vector + Matrix Cores */}
                  <rect x={24 + simd * 178} y="112" width="75" height="48" rx="4" fill="#07080c" stroke="#34d399" strokeWidth="1.2" />
                  <text x={61 + simd * 178} y="129" fill="#34d399" fontSize="9.5" fontWeight="bold" textAnchor="middle">16-32 VALU</text>
                  <text x={61 + simd * 178} y="142" fill="#ffffff" fontSize="8" textAnchor="middle">Vector Cores</text>
                  <text x={61 + simd * 178} y="153" fill="#94a3b8" fontSize="7" textAnchor="middle">FP32 / FP64</text>

                  <rect x={105 + simd * 178} y="112" width="75" height="48" rx="4" fill="#07080c" stroke="#38bdf8" strokeWidth="1.2" />
                  <text x={142 + simd * 178} y="129" fill="#38bdf8" fontSize="9.5" fontWeight="bold" textAnchor="middle">1 Matrix</text>
                  <text x={142 + simd * 178} y="142" fill="#ffffff" fontSize="8" textAnchor="middle">Core (MFMA)</text>
                  <text x={142 + simd * 178} y="153" fill="#94a3b8" fontSize="7" textAnchor="middle">BF16 / FP8 / MXFP4</text>

                  {/* Bottom SALU & L1 Cache */}
                  <rect x={24 + simd * 178} y="165" width="75" height="24" rx="3" fill="#07080c" stroke="#232a3d" />
                  <text x={61 + simd * 178} y="180" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">SALU (Scalar ALU)</text>

                  <rect x={105 + simd * 178} y="165" width="75" height="24" rx="3" fill="#07080c" stroke="#232a3d" />
                  <text x={142 + simd * 178} y="180" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">L1 Vector Cache</text>

                  {/* Unit Label */}
                  <text x={102 + simd * 178} y="204" fill="#94a3b8" fontSize="8" textAnchor="middle">
                    SIMD Unit {simd}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Bottom Info Row */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="hpc-card p-3 border-l-2 border-l-[#fb7185]">
              <strong className="text-xs text-[#fb7185]">4 Unidades SIMD por Compute Unit</strong>
              <p className="m-0 mt-1 text-xs text-slate-300 leading-relaxed">
                Cada CU ejecuta Wavefronts de 32 o 64 hilos, con planificación dinámica para mantener saturadas las unidades vectoriales y matriciales.
              </p>
            </div>

            <div className="hpc-card p-3 border-l-2 border-l-[#38bdf8]">
              <strong className="text-xs text-[#38bdf8]">Agrupamiento WGP (Workgroup Processor)</strong>
              <p className="m-0 mt-1 text-xs text-slate-300 leading-relaxed">
                2 CUs comparten cachés de instrucciones L1 y datos vectoriales para optimizar el ancho de banda en kernels de cómputo intensivo.
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedUnit === 'matrix' && (
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="hpc-card p-4 border-t-2 border-t-[#38bdf8]">
            <div className="flex items-center gap-2 mb-2">
              <span className="hpc-badge-cyan text-xs font-mono mb-0">Matrix Cores</span>
              <h4 className="m-0 text-sm font-bold text-white">Aceleración Matricial en AMD CDNA</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              Unidades matriciales de hardware para instrucciones MFMA (<em>Matrix Fused Multiply-Add</em>):
            </p>
            <ul className="text-xs pl-4 m-0 text-slate-300 flex flex-col gap-1.5 list-disc">
              <li><strong className="text-white">Rendimiento FP64 Nativo:</strong> En AMD Instinct MI300X, la tasa de FP64 pura es líder en la industria para supercomputadores científicos (ej. Frontier y El Capitan).</li>
              <li><strong className="text-white">Soporte de Precisión IA:</strong> FP32, FP16, BF16, INT8, FP8 (E5M2/E4M3) y formatos Microscaling MXFP4 en la serie MI350.</li>
            </ul>
          </div>

          <div className="hpc-card p-4 border-t-2 border-t-[#e6ff00]">
            <div className="flex items-center gap-2 mb-2">
              <span className="hpc-badge-yellow text-xs font-mono mb-0">Innovación AMD</span>
              <h4 className="m-0 text-sm font-bold text-[#e6ff00]">VGPR (Vector) vs SGPR (Scalar)</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              Arquitectura de banco de registros dividida única en AMD:
            </p>
            <ul className="text-xs pl-4 m-0 text-slate-300 flex flex-col gap-1.5 list-disc">
              <li><strong className="text-white">VGPR (Vector GPR):</strong> Registros dedicados individualmente por cada hilo del wavefront para datos divergentes.</li>
              <li><strong className="text-white">SGPR (Scalar GPR):</strong> Registros <strong className="text-[#e6ff00]">compartidos por todo el Wavefront</strong> para valores uniformes (constantes, punteros base, contadores).</li>
              <li><strong className="text-white">Beneficio Crítico:</strong> Ahorra hasta un <strong className="text-white">30% de área en silicio</strong> y reduce la presión sobre el banco de registros vectoriales.</li>
            </ul>
          </div>
        </div>
      )}

      {selectedUnit === 'memory' && (
        <div className="grid grid-cols-3 gap-3 text-left">
          <div className="hpc-card p-4 border-t-2 border-t-[#fb7185]">
            <span className="hpc-badge-rose text-[10px] font-mono mb-1">Nivel 1 (En el CU)</span>
            <h4 className="m-0 mb-1 text-xs font-bold text-white">LDS (Local Data Share)</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Equivalente directo a la <em>Shared Memory</em> de CUDA. SRAM de 64 KB - 128 KB por CU para comunicación directa entre hilos del mismo Work-group. Latencia: ~2 ns.
            </p>
          </div>

          <div className="hpc-card p-4 border-t-2 border-t-[#e6ff00]">
            <span className="hpc-badge-yellow text-[10px] font-mono mb-1">Nivel 2 (En el Die / XCD)</span>
            <h4 className="m-0 mb-1 text-xs font-bold text-white">Infinity Cache / L2 Cache</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Caché global masiva (hasta 256 MB Infinity Cache en chiplets CDNA 3) interconectada mediante <strong className="text-white">Infinity Fabric</strong> bidireccional de bajísima latencia.
            </p>
          </div>

          <div className="hpc-card p-4 border-t-2 border-t-[#38bdf8]">
            <span className="hpc-badge-cyan text-[10px] font-mono mb-1">Nivel 3 (Externo HBM)</span>
            <h4 className="m-0 mb-1 text-xs font-bold text-white">VRAM Global (HBM3 / HBM3e)</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">192 GB HBM3 a 5.3 TB/s</strong> en el acelerador AMD Instinct MI300X y 288 GB en MI350X, superando la densidad de memoria tradicional por GPU.
            </p>
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <div className="mt-3 bg-[#07080c] p-2 rounded-lg border border-[#232a3d] text-xs text-slate-300 text-center flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded bg-[#151a27] text-[#38bdf8] font-mono text-[10px] font-bold border border-[#38bdf8]/40">ROCm / HIP</span>
        <span>Permite compilar código fuente CUDA en GPUs AMD con cambios mínimos mediante la herramienta de conversión automática <code>hipify</code>.</span>
      </div>
    </div>
  );
};

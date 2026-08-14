import React, { useState } from 'react';
import { Math } from '../Math';

export const CudaArchDiagram: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<'sm' | 'tensor' | 'memory'>('sm');

  return (
    <div className="p-4 rounded-xl bg-[#0f131d] border border-[#232a3d] w-full max-w-5xl mx-auto shadow-2xl">
      {/* Header & Subtitle */}
      <div className="flex justify-between items-center mb-3 flex-wrap gap-2 border-b border-[#232a3d] pb-2.5">
        <div>
          <span className="hpc-badge-cyan text-xs font-mono mb-0">
            NVIDIA GPU Architecture
          </span>
          <span className="ml-2 text-xs text-slate-300">
            Jerarquía Hardware: Chip &rarr; GPC &rarr; TPC &rarr; <strong className="text-white">Streaming Multiprocessor (SM)</strong>
          </span>
        </div>

        {/* View Switcher */}
        <div className="flex gap-1 bg-[#07080c] p-1 rounded-md border border-[#232a3d]">
          <button
            onClick={() => setSelectedUnit('sm')}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              selectedUnit === 'sm' ? 'bg-[#102030] text-[#38bdf8] font-bold border border-[#38bdf8]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Anatomía del SM
          </button>
          <button
            onClick={() => setSelectedUnit('tensor')}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              selectedUnit === 'tensor' ? 'bg-[#161d2d] text-[#e6ff00] font-bold border border-[#e6ff00]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. CUDA Cores vs Tensor Cores
          </button>
          <button
            onClick={() => setSelectedUnit('memory')}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              selectedUnit === 'memory' ? 'bg-[#10241e] text-[#34d399] font-bold border border-[#34d399]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Jerarquía de Memoria
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {selectedUnit === 'sm' && (
        <div className="flex flex-col gap-3">
          {/* Full-Width Panoramic SVG: SM Diagram */}
          <div className="bg-[#07080c] p-3 rounded-lg border border-[#232a3d]">
            <svg viewBox="0 0 740 230" className="w-full h-auto block">
              {/* Outer SM Box */}
              <rect x="5" y="5" width="730" height="220" rx="8" fill="#0f131d" stroke="#38bdf8" strokeWidth="1.5" />

              {/* Top Shared Memory / L1 Data Cache */}
              <rect x="18" y="14" width="704" height="30" rx="5" fill="#102030" stroke="#38bdf8" strokeWidth="1.2" />
              <text x="370" y="33" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                Shared Memory / L1 Data Cache (128 KB - 256 KB SRAM Configurable compartida por el SM)
              </text>

              {/* 4 SM Sub-cores / Partitions */}
              {[0, 1, 2, 3].map((sub) => (
                <g key={sub}>
                  {/* Sub-core Outer Boundary */}
                  <rect x={18 + sub * 178} y="52" width="168" height="162" rx="6" fill="#151a27" stroke="#232a3d" strokeWidth="1" />
                  
                  {/* Header Warp Scheduler */}
                  <rect x={24 + sub * 178} y="58" width="156" height="22" rx="4" fill="#07080c" stroke="#38bdf8" strokeWidth="1" />
                  <text x={102 + sub * 178} y="73" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Warp Scheduler (32 Hilos)
                  </text>

                  {/* Register File */}
                  <rect x={24 + sub * 178} y="85" width="156" height="22" rx="4" fill="#161d2d" stroke="#e6ff00" strokeWidth="1" />
                  <text x={102 + sub * 178} y="99" fill="#e6ff00" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Register File (64 KB PRF)
                  </text>

                  {/* Middle Compute Section: CUDA Cores + Tensor Core */}
                  <rect x={24 + sub * 178} y="112" width="75" height="48" rx="4" fill="#07080c" stroke="#34d399" strokeWidth="1.2" />
                  <text x={61 + sub * 178} y="129" fill="#34d399" fontSize="9.5" fontWeight="bold" textAnchor="middle">16-32 FP32</text>
                  <text x={61 + sub * 178} y="142" fill="#ffffff" fontSize="8" textAnchor="middle">CUDA Cores</text>
                  <text x={61 + sub * 178} y="153" fill="#94a3b8" fontSize="7" textAnchor="middle">Escalar / Vector</text>

                  <rect x={105 + sub * 178} y="112" width="75" height="48" rx="4" fill="#07080c" stroke="#38bdf8" strokeWidth="1.2" />
                  <text x={142 + sub * 178} y="129" fill="#38bdf8" fontSize="9.5" fontWeight="bold" textAnchor="middle">1 Tensor</text>
                  <text x={142 + sub * 178} y="142" fill="#ffffff" fontSize="8" textAnchor="middle">Core (5ª Gen)</text>
                  <text x={142 + sub * 178} y="153" fill="#94a3b8" fontSize="7" textAnchor="middle">FP8 / FP4 / TF32</text>

                  {/* Bottom LD/ST & Special Function Units (SFU) */}
                  <rect x={24 + sub * 178} y="165" width="75" height="24" rx="3" fill="#07080c" stroke="#232a3d" />
                  <text x={61 + sub * 178} y="180" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">8 LD/ST Units</text>

                  <rect x={105 + sub * 178} y="165" width="75" height="24" rx="3" fill="#07080c" stroke="#232a3d" />
                  <text x={142 + sub * 178} y="180" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">4 SFU (Sin/Cos/Sqrt)</text>

                  {/* Sub-core Label */}
                  <text x={102 + sub * 178} y="204" fill="#94a3b8" fontSize="8" textAnchor="middle">
                    Partición de SM {sub}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Bottom Info Row */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="hpc-card p-3 border-l-2 border-l-[#38bdf8]">
              <strong className="text-xs text-[#38bdf8]">4 Particiones Independientes por SM</strong>
              <p className="m-0 mt-1 text-xs text-slate-300 leading-relaxed">
                Cada sub-núcleo despacha y ejecuta 1 warp por ciclo de forma autónoma con su propio planificador y banco de registros dedicados.
              </p>
            </div>

            <div className="hpc-card p-3 border-l-2 border-l-[#34d399]">
              <strong className="text-xs text-[#34d399]">Ejecución SIMT en Lockstep</strong>
              <p className="m-0 mt-1 text-xs text-slate-300 leading-relaxed">
                Los 32 hilos de un warp ejecutan la misma instrucción sobre diferentes elementos de datos simultáneamente en las unidades ALUs/Tensor.
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedUnit === 'tensor' && (
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="hpc-card p-4 border-t-2 border-t-[#34d399]">
            <div className="flex items-center gap-2 mb-2">
              <span className="hpc-badge-emerald text-xs font-mono mb-0">CUDA Cores</span>
              <h4 className="m-0 text-sm font-bold text-white">Cálculo Escalar / Vectorial Clásico</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              Unidades ALU individuales diseñadas para ejecutar 1 operación elemental por hilo y por ciclo:
            </p>
            <ul className="text-xs pl-4 m-0 text-slate-300 flex flex-col gap-1.5 list-disc">
              <li><strong className="text-white">FP32 / FP64 Cores:</strong> Aritmética estándar IEEE 754 de simple y doble precisión para simulaciones científicas de física, química y fluidos.</li>
              <li><strong className="text-white">INT32 Cores:</strong> Direccionamiento de memoria, cálculo de índices de bucle y operaciones de bits en paralelo con FP32.</li>
              <li><strong className="text-white">SFU (Special Function Units):</strong> Cálculo de funciones matemáticas complejas (<Math math="\sin, \cos, \sqrt{x}, 1/\sqrt{x}, \log_2" />) por interpolación hardware.</li>
            </ul>
          </div>

          <div className="hpc-card p-4 border-t-2 border-t-[#38bdf8]">
            <div className="flex items-center gap-2 mb-2">
              <span className="hpc-badge-cyan text-xs font-mono mb-0">Tensor Cores</span>
              <h4 className="m-0 text-sm font-bold text-[#38bdf8]">Cálculo Matricial Masivo (IA y HPC)</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              Unidades especializadas que ejecutan la operación matricial <Math math="D = A \times B + C" /> en un único ciclo de reloj:
            </p>
            <ul className="text-xs pl-4 m-0 text-slate-300 flex flex-col gap-1.5 list-disc">
              <li><strong className="text-white">Multi-Precisión Mixta:</strong> FP16, BF16, TF32, FP8 (E5M2/E4M3), FP4 (NVIDIA Blackwell NVFP4).</li>
              <li><strong className="text-white">Transformer Engine:</strong> Escalado automático y selección dinámica de formatos Microscaling (MX).</li>
              <li><strong className="text-white">Throughput:</strong> Hasta <strong className="text-white">16x más FLOPs</strong> que los CUDA Cores tradicionales, base del entrenamiento de LLMs.</li>
            </ul>
          </div>
        </div>
      )}

      {selectedUnit === 'memory' && (
        <div className="grid grid-cols-3 gap-3 text-left">
          <div className="hpc-card p-4 border-t-2 border-t-[#38bdf8]">
            <span className="hpc-badge-cyan text-[10px] font-mono mb-1">Nivel 1 (En el SM)</span>
            <h4 className="m-0 mb-1 text-xs font-bold text-white">Shared Memory / L1 Cache</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Memoria SRAM programable (<code>__shared__</code>) compartida entre hilos del mismo bloque. Latencia: ~1.5 ns (20 ciclos). Ancho de banda agregado en el chip: <strong className="text-white">&gt;15 TB/s</strong>.
            </p>
          </div>

          <div className="hpc-card p-4 border-t-2 border-t-[#e6ff00]">
            <span className="hpc-badge-yellow text-[10px] font-mono mb-1">Nivel 2 (En el Chip)</span>
            <h4 className="m-0 mb-1 text-xs font-bold text-white">Caché L2 Masiva</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Caché global compartida por todos los SMs (ej. 50 MB en H100, 96 MB en RTX 4090). Conecta el crossbar interno con la memoria externa VRAM. Latencia: ~10-15 ns.
            </p>
          </div>

          <div className="hpc-card p-4 border-t-2 border-t-[#fb7185]">
            <span className="hpc-badge-rose text-[10px] font-mono mb-1">Nivel 3 (Externo HBM)</span>
            <h4 className="m-0 mb-1 text-xs font-bold text-white">VRAM Global (HBM3e / GDDR)</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Memoria masiva de la GPU (ej. 80-141 GB HBM3e en H100/H200, 192-288 GB en Blackwell B200). Latencia: ~100-200 ns. Ancho de banda: hasta <strong className="text-white">8 TB/s</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <div className="mt-3 bg-[#07080c] p-2 rounded-lg border border-[#232a3d] text-xs text-slate-300 text-center flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded bg-[#151a27] text-[#38bdf8] font-mono text-[10px] font-bold border border-[#38bdf8]/40">REGLA OCUPACIÓN</span>
        <span>Maximizar la ocupación del SM (Warps activos vs Warps máximos) para ocultar las latencias de lectura a memoria global.</span>
      </div>
    </div>
  );
};

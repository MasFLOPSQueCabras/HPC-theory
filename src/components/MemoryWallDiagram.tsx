import React, { useState } from 'react';

export const MemoryWallDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'divergence' | 'hierarchy' | 'solutions'>('hierarchy');

  return (
    <div className="p-4 rounded-xl bg-[#0f131d] border border-[#232a3d] w-full max-w-5xl mx-auto shadow-2xl">
      {/* Top Header & Tab Navigation */}
      <div className="flex justify-between items-center mb-3 flex-wrap gap-2 border-b border-[#232a3d] pb-2.5">
        <div>
          <span className="hpc-badge-rose text-xs font-mono mb-0">Jerarquía de Memoria</span>
          <span className="ml-2 text-xs text-slate-300">
            El Muro Doble: <strong className="text-white">Latencia (ns)</strong> y <strong className="text-white">Ancho de Banda (GB/s vs TB/s)</strong>
          </span>
        </div>

        <div className="flex gap-1 bg-[#07080c] p-1 rounded-md border border-[#232a3d]">
          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              activeTab === 'hierarchy' ? 'bg-[#151a27] text-[#e6ff00] font-bold border border-[#e6ff00]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Jerarquía: Latencia vs Ancho de Banda
          </button>

          <button
            onClick={() => setActiveTab('divergence')}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              activeTab === 'divergence' ? 'bg-[#102030] text-[#38bdf8] font-bold border border-[#38bdf8]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Brecha Histórica
          </button>

          <button
            onClick={() => setActiveTab('solutions')}
            className={`px-3 py-1 rounded text-xs font-mono transition-all ${
              activeTab === 'solutions' ? 'bg-[#10241e] text-[#34d399] font-bold border border-[#34d399]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Mitigaciones Silicio &amp; HPC
          </button>
        </div>
      </div>

      {/* Tab 1: Latency & Bandwidth Full Hierarchy */}
      {activeTab === 'hierarchy' && (
        <div className="flex flex-col gap-3">
          {/* 5-Column Grid Across Full Memory Spectrum */}
          <div className="grid grid-cols-5 gap-2.5">
            {/* 1. Registers */}
            <div className="hpc-card p-3 text-center border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan text-[10px] font-mono mb-1">Registros CPU/GPU</span>
              <div className="text-[11px] text-slate-400 mt-1">Latencia</div>
              <div className="text-base font-black text-white">&lt; 0.5 ns</div>
              <div className="text-[10px] text-slate-400">~1 Ciclo</div>
              <div className="border-t border-[#232a3d] my-1.5 pt-1.5">
                <div className="text-[10px] text-slate-400">Ancho de Banda</div>
                <div className="text-sm font-bold text-[#38bdf8]">&gt; 30 TB/s</div>
              </div>
            </div>

            {/* 2. L1/L2 Cache */}
            <div className="hpc-card p-3 text-center border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan text-[10px] font-mono mb-1">Caché L1 / L2</span>
              <div className="text-[11px] text-slate-400 mt-1">Latencia</div>
              <div className="text-base font-black text-white">1 - 4 ns</div>
              <div className="text-[10px] text-slate-400">~4 - 14 Ciclos</div>
              <div className="border-t border-[#232a3d] my-1.5 pt-1.5">
                <div className="text-[10px] text-slate-400">Ancho de Banda</div>
                <div className="text-sm font-bold text-[#38bdf8]">8 - 15 TB/s</div>
              </div>
            </div>

            {/* 3. L3 LLC */}
            <div className="hpc-card p-3 text-center border-t-2 border-t-[#e6ff00]">
              <span className="hpc-badge-yellow text-[10px] font-mono mb-1">Caché L3 (LLC)</span>
              <div className="text-[11px] text-slate-400 mt-1">Latencia</div>
              <div className="text-base font-black text-white">10 - 20 ns</div>
              <div className="text-[10px] text-slate-400">~40 - 70 Ciclos</div>
              <div className="border-t border-[#232a3d] my-1.5 pt-1.5">
                <div className="text-[10px] text-slate-400">Ancho de Banda</div>
                <div className="text-sm font-bold text-[#e6ff00]">2 - 4 TB/s</div>
              </div>
            </div>

            {/* 4. DDR5 DRAM */}
            <div className="hpc-card p-3 text-center border-t-2 border-t-[#fb7185]">
              <span className="hpc-badge-rose text-[10px] font-mono mb-1">DDR5 DRAM (CPU)</span>
              <div className="text-[11px] text-slate-400 mt-1">Latencia</div>
              <div className="text-base font-black text-white">60 - 100 ns</div>
              <div className="text-[10px] text-slate-400">~200 - 350 Ciclos</div>
              <div className="border-t border-[#232a3d] my-1.5 pt-1.5">
                <div className="text-[10px] text-slate-400">Ancho de Banda</div>
                <div className="text-sm font-bold text-[#fb7185]">300 - 600 GB/s</div>
              </div>
            </div>

            {/* 5. HBM3e */}
            <div className="hpc-card p-3 text-center border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald text-[10px] font-mono mb-1">HBM3e (GPU/APU)</span>
              <div className="text-[11px] text-slate-400 mt-1">Latencia</div>
              <div className="text-base font-black text-white">40 - 60 ns</div>
              <div className="text-[10px] text-slate-400">~120 - 180 Ciclos</div>
              <div className="border-t border-[#232a3d] my-1.5 pt-1.5">
                <div className="text-[10px] text-slate-400">Ancho de Banda</div>
                <div className="text-sm font-bold text-[#34d399]">4.8 - 8.0 TB/s</div>
              </div>
            </div>
          </div>

          {/* Bottom Clarification */}
          <div className="bg-[#07080c] p-2.5 rounded-lg border border-[#232a3d] text-xs text-slate-300 text-center flex items-center justify-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#161d2d] text-[#e6ff00] font-mono text-[10px] font-bold border border-[#e6ff00]/40">CLAVE</span>
            <span><strong className="text-white">Latencia vs Ancho de Banda:</strong> La <em>Latencia</em> es el tiempo de espera hasta recibir el primer dato (física de condensadores DRAM); el <em>Ancho de Banda</em> es el caudal sostenido de bytes transferidos por segundo (multiplicado por 16x en HBM).</span>
          </div>
        </div>
      )}

      {/* Tab 2: Full-Width Panoramic Divergence Chart */}
      {activeTab === 'divergence' && (
        <div className="bg-[#07080c] p-4 rounded-xl border border-[#232a3d]">
          {/* Legend */}
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="text-white font-semibold">Evolución del Rendimiento Relativo (1980 - Actualidad)</span>
            <div className="flex gap-4">
              <span className="text-[#38bdf8] font-semibold">── CPU FLOPS (~55%/año)</span>
              <span className="text-[#e6ff00] font-semibold">── DRAM Ancho de Banda (~7%/año)</span>
              <span className="text-[#fb7185] font-semibold">- - - Brecha Memory Wall</span>
            </div>
          </div>

          <svg viewBox="0 0 720 220" className="w-full h-auto block">
            {/* Horizontal Gridlines */}
            {[40, 80, 120, 160].map((yVal, idx) => (
              <line key={idx} x1="70" y1={yVal} x2="690" y2={yVal} stroke="#232a3d" strokeWidth="1" strokeDasharray="3 3" />
            ))}

            {/* X and Y Axes */}
            <line x1="70" y1="180" x2="690" y2="180" stroke="#475569" strokeWidth="1.5" />
            <line x1="70" y1="20" x2="70" y2="180" stroke="#475569" strokeWidth="1.5" />

            {/* Y Axis Labels (Log Scale) */}
            <text x="60" y="184" fill="#94a3b8" fontSize="9.5" textAnchor="end">1×</text>
            <text x="60" y="144" fill="#94a3b8" fontSize="9.5" textAnchor="end">10×</text>
            <text x="60" y="104" fill="#94a3b8" fontSize="9.5" textAnchor="end">100×</text>
            <text x="60" y="64" fill="#94a3b8" fontSize="9.5" textAnchor="end">1,000×</text>
            <text x="60" y="24" fill="#94a3b8" fontSize="9.5" textAnchor="end">10,000×</text>

            <text x="25" y="100" fill="#94a3b8" fontSize="9.5" textAnchor="middle" transform="rotate(-90 25 100)">
              Rendimiento (Log)
            </text>

            {/* X Axis Timeline Labels */}
            <text x="70" y="198" fill="#cbd5e1" fontSize="10" textAnchor="middle">1980</text>
            <text x="180" y="198" fill="#cbd5e1" fontSize="10" textAnchor="middle">1990</text>
            <text x="290" y="198" fill="#cbd5e1" fontSize="10" textAnchor="middle">1995 (Wulf &amp; McKee)</text>
            <text x="400" y="198" fill="#cbd5e1" fontSize="10" textAnchor="middle">2005 (Multicore)</text>
            <text x="520" y="198" fill="#cbd5e1" fontSize="10" textAnchor="middle">2015</text>
            <text x="660" y="198" fill="#cbd5e1" fontSize="10" textAnchor="middle">Presente</text>

            {/* Shaded Area between curves */}
            <path
              d="M 70 175 Q 260 145 420 70 Q 550 40 660 30 L 660 145 Q 400 160 70 175 Z"
              fill="rgba(251, 113, 133, 0.08)"
            />

            {/* DRAM slow curve (~7%/año) */}
            <path
              d="M 70 175 Q 400 160 660 145"
              fill="none"
              stroke="#e6ff00"
              strokeWidth="3.5"
            />

            {/* CPU steep curve (~55%/año) */}
            <path
              d="M 70 175 Q 260 145 420 70 Q 550 40 660 30"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
            />

            {/* DRAM Curve End Label */}
            <circle cx="660" cy="145" r="4" fill="#e6ff00" />
            <text x="668" y="149" fill="#e6ff00" fontSize="9.5" fontWeight="bold">DRAM Ancho de Banda (~7%/año)</text>

            {/* CPU Curve End Label */}
            <circle cx="660" cy="30" r="4" fill="#38bdf8" />
            <text x="668" y="34" fill="#38bdf8" fontSize="9.5" fontWeight="bold">CPU FLOPS (~55%/año)</text>

            {/* Gap Bracket & Annotation */}
            <line x1="640" y1="35" x2="640" y2="140" stroke="#fb7185" strokeWidth="2" strokeDasharray="4 3" />
            <polygon points="637,36 643,36 640,30" fill="#fb7185" />
            <polygon points="637,139 643,139 640,145" fill="#fb7185" />
            <rect x="480" y="76" width="155" height="28" rx="4" fill="#151a27" stroke="#fb7185" strokeWidth="1.2" />
            <text x="557" y="93" fill="#fb7185" fontSize="10" fontWeight="bold" textAnchor="middle">
              Brecha &gt; 1,000× (Memory Wall)
            </text>

            {/* Key Historic Pins */}
            <circle cx="290" cy="130" r="3.5" fill="#ffffff" />
            <line x1="290" y1="130" x2="290" y2="105" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
            <text x="290" y="100" fill="#ffffff" fontSize="8.5" textAnchor="middle">
              1995: Término acuñado
            </text>

            <circle cx="400" cy="80" r="3.5" fill="#ffffff" />
            <line x1="400" y1="80" x2="400" y2="58" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
            <text x="400" y="53" fill="#ffffff" fontSize="8.5" textAnchor="middle">
              2005: Fin Dennard → Multinúcleo
            </text>
          </svg>

          {/* Bottom Takeaway */}
          <div className="mt-3 bg-[#07080c] p-2.5 rounded-lg border border-[#232a3d] text-xs text-slate-300 leading-relaxed flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#1e131d] text-[#fb7185] font-mono text-[10px] font-bold border border-[#fb7185]/40 shrink-0">DOBLE MURO</span>
            <span>No solo sufrimos una alta latencia (~200 ciclos), sino una escasez de <em>Ancho de Banda</em> en canales DDR tradicionales. Para saturar las ALUs modernas se requieren miles de GB/s, lo que impulsó la creación de HBM3e y grandes memorias caché 3D.</span>
          </div>
        </div>
      )}

      {/* Tab 3: Solutions */}
      {activeTab === 'solutions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="hpc-card p-4 text-left border-t-2 border-t-[#38bdf8]">
            <div className="flex items-center gap-2 mb-2">
              <span className="hpc-badge-cyan text-xs font-mono mb-0">Silicio</span>
              <h4 className="m-0 text-sm font-bold text-white">Soluciones a Nivel Hardware</h4>
            </div>
            <ul className="text-xs pl-4 m-0 text-slate-300 flex flex-col gap-1.5 leading-relaxed list-disc">
              <li><strong className="text-white">High-Bandwidth Memory (HBM3e):</strong> Pasa de 400 GB/s (DDR5) a <strong className="text-[#34d399]">hasta 8.0 TB/s</strong> mediante interposer de silicio y bus de miles de pines.</li>
              <li><strong className="text-white">Cachés 3D Apiladas (3D V-Cache):</strong> Integración de cientos de MBs de caché L3 sobre el die para retener datasets enteros.</li>
              <li><strong className="text-white">Hardware Prefetching:</strong> Detección automática de zancadas (strides) para traer datos a caché antes de que la CPU los pida.</li>
            </ul>
          </div>

          <div className="hpc-card p-4 text-left border-t-2 border-t-[#34d399]">
            <div className="flex items-center gap-2 mb-2">
              <span className="hpc-badge-emerald text-xs font-mono mb-0">Software</span>
              <h4 className="m-0 text-sm font-bold text-white">Estrategias de Software en HPC</h4>
            </div>
            <ul className="text-xs pl-4 m-0 text-slate-300 flex flex-col gap-1.5 leading-relaxed list-disc">
              <li><strong className="text-white">Loop Tiling / Blocking:</strong> Particionar algoritmos de matrices en bloques que quepan exactamente en L1/L2 para reuso temporal.</li>
              <li><strong className="text-white">Diseño SoA (Structure of Arrays):</strong> Alinear datos en memoria contigua para maximizar localidad espacial y ancho de banda útil.</li>
              <li><strong className="text-white">Transferencias Asíncronas:</strong> Solapar cómputo en núcleos con transferencias de datos vía DMA / PCIe / NVLink.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

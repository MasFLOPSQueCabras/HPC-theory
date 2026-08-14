import React from 'react';

export const CudaMemoryHierarchy: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 3 Full-Size Memory Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-3">
        
        {/* Level 1: Shared Memory */}
        <div className="hpc-card p-4 flex flex-col justify-between border-t-2 border-t-[#38bdf8]">
          <div>
            <span className="hpc-badge-cyan text-[10px] font-mono mb-1">
              Nivel 1 (En el SM)
            </span>
            <h4 className="m-0 mb-1 text-sm font-bold text-white">Shared Memory / L1 Cache</h4>
            <p className="m-0 mb-2 text-xs text-slate-300 leading-relaxed">
              Memoria SRAM ultra-rápida programable por software (<code>__shared__</code>) compartida entre hilos del mismo Thread Block.
            </p>
          </div>
          <ul className="text-xs pl-4 m-0 text-slate-400 flex flex-col gap-1 list-disc">
            <li><strong className="text-white">Latencia:</strong> ~1.5 ns (~20 ciclos)</li>
            <li><strong className="text-white">Capacidad:</strong> 128 KB - 256 KB por SM</li>
            <li><strong className="text-white">Ancho de Banda:</strong> <strong className="text-white">&gt; 15 TB/s</strong> en chip</li>
          </ul>
        </div>

        {/* Level 2: L2 Cache */}
        <div className="hpc-card p-4 flex flex-col justify-between border-t-2 border-t-[#e6ff00]">
          <div>
            <span className="hpc-badge-yellow text-[10px] font-mono mb-1">
              Nivel 2 (En el Chip)
            </span>
            <h4 className="m-0 mb-1 text-sm font-bold text-white">Caché L2 Masiva</h4>
            <p className="m-0 mb-2 text-xs text-slate-300 leading-relaxed">
              Caché global compartida por todos los SMs del chip. Conecta la red de crossbar interno con los controladores de memoria física.
            </p>
          </div>
          <ul className="text-xs pl-4 m-0 text-slate-400 flex flex-col gap-1 list-disc">
            <li><strong className="text-white">Latencia:</strong> ~10 - 15 ns</li>
            <li><strong className="text-white">Capacidad:</strong> 50 MB (H100) a 96 MB</li>
            <li><strong className="text-white">Función:</strong> Amortigua fallos y sincroniza SMs</li>
          </ul>
        </div>

        {/* Level 3: Global Memory HBM3e */}
        <div className="hpc-card p-4 flex flex-col justify-between border-t-2 border-t-[#34d399]">
          <div>
            <span className="hpc-badge-emerald text-[10px] font-mono mb-1">
              Nivel 3 (Externo HBM)
            </span>
            <h4 className="m-0 mb-1 text-sm font-bold text-white">VRAM Global (HBM3e)</h4>
            <p className="m-0 mb-2 text-xs text-slate-300 leading-relaxed">
              Memoria principal de la GPU construida con pilas de DRAM 3D en interposers de silicio con buses de miles de pistas.
            </p>
          </div>
          <ul className="text-xs pl-4 m-0 text-slate-400 flex flex-col gap-1 list-disc">
            <li><strong className="text-white">Latencia:</strong> ~100 - 200 ns</li>
            <li><strong className="text-white">Capacidad:</strong> 80 - 141 GB (H100/H200), 288 GB</li>
            <li><strong className="text-white">Ancho de Banda:</strong> <strong className="text-white">3.35 TB/s a 8.0 TB/s</strong></li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer Callout */}
      <div className="bg-[#07080c] p-2.5 rounded-lg border border-[#232a3d] text-xs text-slate-300 text-center flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded bg-[#151a27] text-[#38bdf8] font-mono text-[10px] font-bold border border-[#38bdf8]/40">REGLA OCUPACIÓN</span>
        <span>Para ocultar la latencia de 150 ns hacia la VRAM global, se requiere maximizar la ocupación del SM (Warps activos vs Warps teóricos máximos) y explotar la <em>Shared Memory</em> para reutilizar datos entre hilos.</span>
      </div>
    </div>
  );
};

import React from 'react';

export const MemoryHierarchyDiagram: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
      {/* 5-Column Grid Across Full Memory Spectrum */}
      <div className="grid grid-cols-5 gap-3">
        {/* 1. Registers */}
        <div className="hpc-card p-4 text-center">
          <span className="hpc-badge font-mono text-[10px]">Registros</span>
          <div className="text-[11px] text-slate-400 mt-2">Latencia</div>
          <div className="text-lg font-black text-white">&lt; 0.5 ns</div>
          <div className="text-[11px] text-slate-300">~1 Ciclo</div>
          
          <div className="border-t border-slate-800 my-2 pt-2">
            <div className="text-[11px] text-slate-400">Ancho de Banda</div>
            <div className="text-base font-bold text-white">&gt; 30 TB/s</div>
          </div>
          <p className="text-[10px] text-slate-400 m-0">Cap: ~1-4KB</p>
        </div>

        {/* 2. L1 / L2 Cache */}
        <div className="hpc-card p-4 text-center">
          <span className="hpc-badge font-mono text-[10px]">Caché L1 / L2</span>
          <div className="text-[11px] text-slate-400 mt-2">Latencia</div>
          <div className="text-lg font-black text-white">1 - 4 ns</div>
          <div className="text-[11px] text-slate-300">~4 - 14 Ciclos</div>
          
          <div className="border-t border-slate-800 my-2 pt-2">
            <div className="text-[11px] text-slate-400">Ancho de Banda</div>
            <div className="text-base font-bold text-white">8 - 15 TB/s</div>
          </div>
          <p className="text-[10px] text-slate-400 m-0">Cap: 32KB - 1MB</p>
        </div>

        {/* 3. L3 LLC / 3D V-Cache */}
        <div className="hpc-card p-4 text-center">
          <span className="hpc-badge font-mono text-[10px]">Caché L3 (LLC)</span>
          <div className="text-[11px] text-slate-400 mt-2">Latencia</div>
          <div className="text-lg font-black text-white">10 - 20 ns</div>
          <div className="text-[11px] text-slate-300">~40 - 70 Ciclos</div>
          
          <div className="border-t border-slate-800 my-2 pt-2">
            <div className="text-[11px] text-slate-400">Ancho de Banda</div>
            <div className="text-base font-bold text-white">2 - 4 TB/s</div>
          </div>
          <p className="text-[10px] text-slate-400 m-0">Cap: 32MB - 1GB (3D)</p>
        </div>

        {/* 4. DDR5 DRAM */}
        <div className="hpc-card p-4 text-center">
          <span className="hpc-badge font-mono text-[10px]">DDR5 DRAM</span>
          <div className="text-[11px] text-slate-400 mt-2">Latencia</div>
          <div className="text-lg font-black text-white">60 - 100 ns</div>
          <div className="text-[11px] text-slate-300">~200 - 350 Ciclos</div>
          
          <div className="border-t border-slate-800 my-2 pt-2">
            <div className="text-[11px] text-slate-400">Ancho de Banda</div>
            <div className="text-base font-bold text-white">300 - 600 GB/s</div>
          </div>
          <p className="text-[10px] text-slate-400 m-0">Cap: 64GB - 4TB</p>
        </div>

        {/* 5. HBM3e Memory */}
        <div className="hpc-card p-4 text-center">
          <span className="hpc-badge font-mono text-[10px]">HBM3e (GPU/APU)</span>
          <div className="text-[11px] text-slate-400 mt-2">Latencia</div>
          <div className="text-lg font-black text-white">40 - 60 ns</div>
          <div className="text-[11px] text-slate-300">~120 - 180 Ciclos</div>
          
          <div className="border-t border-slate-800 my-2 pt-2">
            <div className="text-[11px] text-slate-400">Ancho de Banda</div>
            <div className="text-base font-bold text-white">4.8 - 8.0 TB/s</div>
          </div>
          <p className="text-[10px] text-slate-400 m-0">Cap: 80 - 288 GB</p>
        </div>
      </div>

      {/* Clarification Box */}
      <div className="hpc-card p-4 text-xs text-slate-300 text-center">
        💡 <strong className="text-white">Latencia vs Ancho de Banda:</strong> La <em>Latencia</em> es el tiempo de espera hasta recibir el primer byte (determinado por la física de los condensadores DRAM); el <em>Ancho de Banda</em> es el caudal sostenido transferido por segundo (multiplicado por 16x en HBM gracias a miles de pistas en interposers de silicio).
      </div>
    </div>
  );
};

import React from 'react';

export const MemorySolutionsDiagram: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-3 gap-4">
      {/* 1. HBM3e / HBM4 3D Stacking */}
      <div className="hpc-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="hpc-badge font-mono text-[10px]">Apilamiento 3D</span>
          <span className="text-xs font-bold text-white">HBM3e / HBM4</span>
        </div>
        <h3 className="m-0 text-base font-bold text-white mb-2">Through-Silicon Vias (TSVs)</h3>
        <p className="m-0 text-xs text-slate-300 leading-relaxed">
          Chips de memoria DRAM apilados verticalmente (8 a 16 capas) conectados por millones de micro-vías de silicio directamente sobre el interposer de la GPU/APU.
        </p>
        <div className="mt-3 p-2.5 rounded bg-slate-950/80 border border-slate-800 text-[11px] text-slate-200 font-mono">
          Throughput: 5.3 a 8.0 TB/s (16x DDR5)
        </div>
      </div>

      {/* 2. 3D V-Cache */}
      <div className="hpc-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="hpc-badge font-mono text-[10px]">Caché Masiva</span>
          <span className="text-xs font-bold text-white">AMD 3D V-Cache</span>
        </div>
        <h3 className="m-0 text-base font-bold text-white mb-2">Hybrid Bonding L3</h3>
        <p className="m-0 text-xs text-slate-300 leading-relaxed">
          Unión directa cobre-cobre de SRAM sobre los núcleos CCD, expandiendo la caché L3 hasta <strong className="text-white">1.1 GB por socket</strong> en procesadores como AMD EPYC Milan-X / Genoa-X.
        </p>
        <div className="mt-3 p-2.5 rounded bg-slate-950/80 border border-slate-800 text-[11px] text-slate-200 font-mono">
          Retiene conjuntos de datos 100% en caché
        </div>
      </div>

      {/* 3. CXL Fabric Pooling */}
      <div className="hpc-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="hpc-badge font-mono text-[10px]">Memoria Compartida</span>
          <span className="text-xs font-bold text-white">CXL 3.1 Fabric</span>
        </div>
        <h3 className="m-0 text-base font-bold text-white mb-2">Compute Express Link</h3>
        <p className="m-0 text-xs text-slate-300 leading-relaxed">
          Estándar abierto sobre PCIe que permite a múltiples servidores CPU/GPU compartir pools de memoria coherente sin sobrecargar el bus del sistema ni copias explícitas.
        </p>
        <div className="mt-3 p-2.5 rounded bg-slate-950/80 border border-slate-800 text-[11px] text-slate-200 font-mono">
          Pools de decenas de Terabytes compartidos
        </div>
      </div>
    </div>
  );
};

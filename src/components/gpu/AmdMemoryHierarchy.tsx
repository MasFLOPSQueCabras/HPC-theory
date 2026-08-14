import React from 'react';

export const AmdMemoryHierarchy: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 3 Full-Size Memory Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-3">
        
        {/* Level 1: LDS */}
        <div className="hpc-card p-4 flex flex-col justify-between border-t-2 border-t-[#fb7185]">
          <div>
            <span className="hpc-badge-rose text-[10px] font-mono mb-1">
              Nivel 1 (En el CU)
            </span>
            <h4 className="m-0 mb-1 text-sm font-bold text-white">LDS (Local Data Share)</h4>
            <p className="m-0 mb-2 text-xs text-slate-300 leading-relaxed">
              Memoria SRAM compartida por todos los hilos del mismo Work-group. Equivalente directo a la <em>Shared Memory</em> de CUDA.
            </p>
          </div>
          <ul className="text-xs pl-4 m-0 text-slate-400 flex flex-col gap-1 list-disc">
            <li><strong className="text-white">Latencia:</strong> ~2.0 ns (~25 ciclos)</li>
            <li><strong className="text-white">Capacidad:</strong> 64 KB a 128 KB por CU</li>
            <li><strong className="text-white">Función:</strong> Intercambio directo sin tocar VRAM</li>
          </ul>
        </div>

        {/* Level 2: Infinity Cache */}
        <div className="hpc-card p-4 flex flex-col justify-between border-t-2 border-t-[#e6ff00]">
          <div>
            <span className="hpc-badge-yellow text-[10px] font-mono mb-1">
              Nivel 2 (En el Die / XCD)
            </span>
            <h4 className="m-0 mb-1 text-sm font-bold text-white">Infinity Cache (L2 / MALL)</h4>
            <p className="m-0 mb-2 text-xs text-slate-300 leading-relaxed">
              Caché global masiva (Memory Attached Last Level) interconectada con la red <strong className="text-white">Infinity Fabric</strong> de alta velocidad.
            </p>
          </div>
          <ul className="text-xs pl-4 m-0 text-slate-400 flex flex-col gap-1 list-disc">
            <li><strong className="text-white">Latencia:</strong> ~12 - 18 ns</li>
            <li><strong className="text-white">Capacidad:</strong> Hasta 256 MB Infinity Cache</li>
            <li><strong className="text-white">Función:</strong> Maximiza el ancho de banda efectivo</li>
          </ul>
        </div>

        {/* Level 3: HBM3 Memory */}
        <div className="hpc-card p-4 flex flex-col justify-between border-t-2 border-t-[#38bdf8]">
          <div>
            <span className="hpc-badge-cyan text-[10px] font-mono mb-1">
              Nivel 3 (Externo HBM)
            </span>
            <h4 className="m-0 mb-1 text-sm font-bold text-white">VRAM Global (HBM3 / HBM3e)</h4>
            <p className="m-0 mb-2 text-xs text-slate-300 leading-relaxed">
              Memoria masiva unificada líder en capacidad por acelerador para entrenamiento e inferencia de modelos gigantes.
            </p>
          </div>
          <ul className="text-xs pl-4 m-0 text-slate-400 flex flex-col gap-1 list-disc">
            <li><strong className="text-white">Latencia:</strong> ~100 - 180 ns</li>
            <li><strong className="text-white">Capacidad:</strong> <strong className="text-white">192 GB (MI300X)</strong> a 288 GB</li>
            <li><strong className="text-white">Ancho de Banda:</strong> <strong className="text-white">5.3 TB/s a 8.0 TB/s</strong></li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer Callout */}
      <div className="bg-[#07080c] p-2.5 rounded-lg border border-[#232a3d] text-xs text-slate-300 text-center flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded bg-[#151a27] text-[#38bdf8] font-mono text-[10px] font-bold border border-[#38bdf8]/40">ROCm / HIP</span>
        <span>La capa de portabilidad <code>HIP</code> permite compilar código CUDA en GPUs AMD mapeando directamente <code>__shared__</code> a LDS y las llamadas de sincronización de bloques.</span>
      </div>
    </div>
  );
};

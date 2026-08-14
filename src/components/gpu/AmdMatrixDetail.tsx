import React from 'react';

export const AmdMatrixDetail: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-3">
        {/* Left: Matrix Cores */}
        <div className="hpc-card p-4 border-t-2 border-t-[#38bdf8]">
          <div className="flex items-center gap-2 mb-2">
            <span className="hpc-badge-cyan text-xs font-mono mb-0">
              Matrix Cores (MFMA)
            </span>
            <h4 className="m-0 text-sm font-bold text-white">Aceleración Matricial en AMD CDNA</h4>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-2">
            Unidades matriciales que resuelven instrucciones MFMA (<em>Matrix Fused Multiply-Add</em>):
          </p>

          <ul className="text-xs pl-4 m-0 text-slate-300 flex flex-col gap-1.5 list-disc">
            <li><strong className="text-white">Liderazgo en FP64 Nativo:</strong> En aceleradores <strong className="text-white">AMD Instinct MI300X</strong>, la tasa de FP64 es 1:1 frente a FP32, convirtiéndolo en el estándar de los mayores supercomputadores (<em>Frontier</em> y <em>El Capitan</em>).</li>
            <li><strong className="text-white">Formatos IA y Microscaling:</strong> Soporte para FP32, FP16, BF16, INT8, FP8 (E5M2/E4M3) y el nuevo estándar <strong className="text-white">MXFP4</strong> en la serie MI350.</li>
            <li><strong className="text-white">Throughput:</strong> Gran paralelismo denso con hasta 2.6 PFLOPS de FP8 por GPU.</li>
          </ul>
        </div>

        {/* Right: VGPR vs SGPR */}
        <div className="hpc-card p-4 border-t-2 border-t-[#e6ff00]">
          <div className="flex items-center gap-2 mb-2">
            <span className="hpc-badge-yellow text-xs font-mono mb-0">
              Innovación AMD
            </span>
            <h4 className="m-0 text-sm font-bold text-[#e6ff00]">Dual Register File: VGPR vs SGPR</h4>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-2">
            Arquitectura de registros dividida única en silicio:
          </p>

          <ul className="text-xs pl-4 m-0 text-slate-300 flex flex-col gap-1.5 list-disc">
            <li><strong className="text-white">VGPR (Vector GPR):</strong> 1 registro asignado individualmente a cada hilo del wavefront para variables divergentes.</li>
            <li><strong className="text-white">SGPR (Scalar GPR):</strong> 1 único registro <strong className="text-[#e6ff00]">compartido por todos los 64 hilos del Wavefront</strong> para valores uniformes (constantes, punteros base a memoria, límites de bucle).</li>
            <li><strong className="text-white">Ventaja Crítica:</strong> Ahorra hasta un <strong className="text-white">30% de área en silicio</strong> y previene el desbordamiento de registros a memoria (spilling).</li>
          </ul>
        </div>
      </div>

      {/* Bottom Takeaway */}
      <div className="bg-[#07080c] p-2.5 rounded-lg border border-[#232a3d] text-xs text-slate-300 text-center flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded bg-[#161d2d] text-[#e6ff00] font-mono text-[10px] font-bold border border-[#e6ff00]/40">ARQUITECTURA DUAL</span>
        <span>La presencia de unidades SALU y registros SGPR permite a las GPUs AMD ejecutar cálculos de control sin consumir recursos del banco vectorial masivo.</span>
      </div>
    </div>
  );
};

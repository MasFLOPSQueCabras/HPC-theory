import React from 'react';
import { Math } from '../Math';

export const VonNeumannSlide: React.FC = () => {
  return (
    <div className="hpc-card p-5 w-full max-w-5xl mx-auto bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        
        {/* Left: Diagram (6 cols) */}
        <div className="md:col-span-6 p-4 rounded-xl bg-slate-950/90 border border-rose-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="hpc-badge-rose font-mono text-[10px]">
              1945 • John von Neumann
            </span>
            <span className="text-xs text-slate-400 font-mono">Bus Único Compartido</span>
          </div>

          <svg viewBox="0 0 340 120" className="w-full h-[110px]">
            {/* CPU Box */}
            <rect x="10" y="20" width="100" height="80" rx="6" fill="#1e293b" stroke="#f87171" strokeWidth="2" />
            <text x="60" y="45" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">CPU Core</text>
            <text x="60" y="65" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Unidad de Control</text>
            <text x="60" y="80" fill="#94a3b8" fontSize="8.5" textAnchor="middle">ALU + Registros</text>

            {/* Shared Bus */}
            <line x1="110" y1="60" x2="205" y2="60" stroke="#f87171" strokeWidth="3" />
            <polygon points="203,55 212,60 203,65" fill="#f87171" />
            <polygon points="112,55 103,60 112,65" fill="#f87171" />
            <text x="157" y="48" fill="#f87171" fontSize="8.5" fontWeight="bold" textAnchor="middle">Bus Único</text>
            <text x="157" y="78" fill="#94a3b8" fontSize="7.5" textAnchor="middle">Compartido</text>

            {/* Unified Memory Box */}
            <rect x="212" y="20" width="118" height="80" rx="6" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="271" y="42" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">Memoria Unificada</text>
            <line x1="222" y1="52" x2="320" y2="52" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="271" y="68" fill="#38bdf8" fontSize="8.5" textAnchor="middle">Instrucciones (Código)</text>
            <text x="271" y="86" fill="#f4b860" fontSize="8.5" textAnchor="middle">Datos (Variables)</text>
          </svg>
        </div>

        {/* Right: Technical Characteristics (6 cols) */}
        <div className="md:col-span-6 flex flex-col gap-3 text-left">
          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <h4 className="m-0 text-xs font-bold text-white mb-1">Principio de Diseño</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Las instrucciones del programa y los datos residen en el <strong className="text-white">mismo espacio físico de direcciones</strong> y comparten los mismos buses de datos y control.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-rose-500/30">
            <h4 className="m-0 text-xs font-bold text-rose-400 mb-1">⚠️ El Cuello de Botella de Von Neumann</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              En un instante de tiempo <Math math="t" />, la CPU solo puede transferir <strong className="text-white">una instrucción O un dato</strong> a través del bus compartido. La velocidad de cómputo queda estrangulada por el caudal del canal único.
            </p>
          </div>
        </div>

      </div>

      <div className="mt-3 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center text-xs text-slate-400">
        🏛️ <strong className="text-slate-200">Uso actual:</strong> Estándar universal para la <strong className="text-white">Memoria RAM Principal (DDR5)</strong> por su bajo coste de cableado y flexibilidad de asignación.
      </div>
    </div>
  );
};

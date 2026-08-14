import React from 'react';

export const HarvardSlide: React.FC = () => {
  return (
    <div className="hpc-card p-5 w-full max-w-5xl mx-auto bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        
        {/* Left: Diagram (6 cols) */}
        <div className="md:col-span-6 p-4 rounded-xl bg-slate-950/90 border border-sky-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="hpc-badge font-mono text-[10px]">
              1944 • Harvard Mark I
            </span>
            <span className="text-xs text-sky-400 font-mono">Buses y Memorias Separadas</span>
          </div>

          <svg viewBox="0 0 340 120" className="w-full h-[110px]">
            {/* CPU Box */}
            <rect x="10" y="15" width="100" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="60" y="45" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">CPU Core</text>
            <text x="60" y="65" fill="#38bdf8" fontSize="8.5" textAnchor="middle">Etapa Fetch</text>
            <text x="60" y="80" fill="#f4b860" fontSize="8.5" textAnchor="middle">Etapa Memory (MEM)</text>

            {/* Instruction Bus & Memory (Top) */}
            <line x1="110" y1="40" x2="205" y2="40" stroke="#38bdf8" strokeWidth="2.5" />
            <polygon points="203,36 212,40 203,44" fill="#38bdf8" />
            <polygon points="112,36 103,40 112,44" fill="#38bdf8" />
            <text x="157" y="32" fill="#38bdf8" fontSize="7.5" fontWeight="bold" textAnchor="middle">Bus Instrucción</text>

            <rect x="212" y="18" width="118" height="38" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="271" y="36" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Memoria Instrucciones</text>
            <text x="271" y="48" fill="#94a3b8" fontSize="7.5" textAnchor="middle">(Solo Código)</text>

            {/* Data Bus & Memory (Bottom) */}
            <line x1="110" y1="80" x2="205" y2="80" stroke="#f4b860" strokeWidth="2.5" />
            <polygon points="203,76 212,80 203,84" fill="#f4b860" />
            <polygon points="112,76 103,80 112,84" fill="#f4b860" />
            <text x="157" y="94" fill="#f4b860" fontSize="7.5" fontWeight="bold" textAnchor="middle">Bus de Datos</text>

            <rect x="212" y="64" width="118" height="38" rx="5" fill="#1e293b" stroke="#f4b860" strokeWidth="1.5" />
            <text x="271" y="82" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Memoria de Datos</text>
            <text x="271" y="94" fill="#94a3b8" fontSize="7.5" textAnchor="middle">(Variables / Heap)</text>
          </svg>
        </div>

        {/* Right: Technical Characteristics (6 cols) */}
        <div className="md:col-span-6 flex flex-col gap-3 text-left">
          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <h4 className="m-0 text-xs font-bold text-white mb-1">Principio de Diseño</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Existen <strong className="text-white">dos espacios de memoria físicos independientes</strong> y dos conjuntos de buses separados con anchos de palabra propios.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-sky-500/30">
            <h4 className="m-0 text-xs font-bold text-sky-400 mb-1">🚀 La Gran Ventaja de Harvard</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              La CPU puede realizar el <strong className="text-white">Fetch de la siguiente instrucción</strong> al mismo tiempo exacto que lee o escribe un dato de memoria (<strong className="text-white">Load/Store</strong>) en el <strong className="text-white">mismo ciclo de reloj</strong> sin contención de bus.
            </p>
          </div>
        </div>

      </div>

      <div className="mt-3 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center text-xs text-slate-400">
        💡 <strong className="text-slate-200">Uso actual:</strong> Base fundamental del nivel de <strong className="text-sky-300">caché L1 (L1 I-Cache / L1 D-Cache)</strong> en todos los procesadores modernos de alto rendimiento.
      </div>
    </div>
  );
};

import React from 'react';

export const FrontendBackendOverview: React.FC = () => {
  return (
    <div className="hpc-card p-5 w-full max-w-5xl mx-auto bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
      {/* 2 Big Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
        
        {/* FRONTEND PILLAR (5 cols) */}
        <div className="md:col-span-5 p-5 rounded-xl bg-sky-950/20 border border-sky-500/30 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="hpc-badge font-mono text-[10px]">
              In-Order (Secuencial)
            </span>
            <h3 className="m-0 text-lg font-bold text-sky-400">1. FRONTEND</h3>
          </div>
          
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            <strong className="text-white">Misión:</strong> Alimentar al procesador de forma ininterrumpida anticipando el flujo de instrucciones y traduciéndolas a micro-operaciones (&mu;ops) listas para ejecutar.
          </p>

          <div className="flex flex-col gap-1.5 text-xs text-slate-400 font-mono">
            <div>&bull; <strong className="text-slate-200">Fetch:</strong> Lectura desde L1 I-Cache &amp; ITLB.</div>
            <div>&bull; <strong className="text-slate-200">Branch Prediction (BPU):</strong> TAGE / BTB.</div>
            <div>&bull; <strong className="text-slate-200">Decode:</strong> Macro-instrucciones a &mu;ops.</div>
            <div>&bull; <strong className="text-slate-200">Register Renaming:</strong> RAT elimina WAR/WAW.</div>
          </div>
        </div>

        {/* ARROW CONNECTOR (1 col) */}
        <div className="md:col-span-1 text-center flex flex-col items-center justify-center py-2">
          <div className="text-2xl text-slate-400 font-bold">&rarr;</div>
          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider mt-1">
            Dispatch
          </span>
        </div>

        {/* BACKEND PILLAR (5 cols) */}
        <div className="md:col-span-5 p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="hpc-badge-amber font-mono text-[10px]">
              Out-of-Order + In-Order Commit
            </span>
            <h3 className="m-0 text-lg font-bold text-amber-400">2. BACKEND</h3>
          </div>
          
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            <strong className="text-white">Misión:</strong> Maximizar el paralelismo ejecutando operaciones tan pronto tengan sus operandos listos y confirmar su retiro estrictamente en orden.
          </p>

          <div className="flex flex-col gap-1.5 text-xs text-slate-400 font-mono">
            <div>&bull; <strong className="text-slate-200">Issue Queues (RS):</strong> Espera dinámica.</div>
            <div>&bull; <strong className="text-slate-200">Puertos:</strong> ALUs, FP/SIMD 512b, AGUs.</div>
            <div>&bull; <strong className="text-slate-200">Common Data Bus (CDB):</strong> Fast bypass.</div>
            <div>&bull; <strong className="text-slate-200">Reorder Buffer (ROB):</strong> Commit ordenado.</div>
          </div>
        </div>

      </div>

      {/* Summary Footer */}
      <div className="mt-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center text-xs text-slate-300">
        💡 <strong className="text-white">El Desacoplamiento Fundamental:</strong> El <em>Frontend</em> trabaja hacia el futuro de forma especulativa; el <em>Backend</em> resuelve el trabajo masivo fuera de orden y reconcilia el pasado de forma determinista.
      </div>
    </div>
  );
};

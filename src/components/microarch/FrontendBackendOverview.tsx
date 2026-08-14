import React from 'react';

export const FrontendBackendOverview: React.FC = () => {
  return (
    <div className="hpc-card p-5 w-full max-w-5xl mx-auto bg-[#0f131d] border border-[#232a3d] shadow-2xl">
      {/* 2 Big Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
        
        {/* FRONTEND PILLAR (5 cols) */}
        <div className="md:col-span-5 p-5 rounded-xl bg-[#07080c] border border-[#38bdf8]/30 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="hpc-badge-cyan font-mono text-[10px] mb-0">
              In-Order (Secuencial)
            </span>
            <h3 className="m-0 text-lg font-bold text-[#38bdf8]">1. FRONTEND</h3>
          </div>
          
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            <strong className="text-white">Misión:</strong> Alimentar al procesador de forma ininterrumpida anticipando el flujo de instrucciones y traduciéndolas a micro-operaciones (&mu;ops) listas para ejecutar.
          </p>

          <div className="flex flex-col gap-1.5 text-xs text-slate-400 font-mono">
            <div>• <strong className="text-slate-200">Fetch:</strong> Lectura desde L1 I-Cache &amp; ITLB.</div>
            <div>• <strong className="text-slate-200">Branch Prediction (BPU):</strong> TAGE / BTB.</div>
            <div>• <strong className="text-slate-200">Decode:</strong> Macro-instrucciones a &mu;ops.</div>
            <div>• <strong className="text-slate-200">Register Renaming:</strong> RAT elimina WAR/WAW.</div>
          </div>
        </div>

        {/* ARROW CONNECTOR (1 col) */}
        <div className="md:col-span-1 text-center flex flex-col items-center justify-center py-2">
          <div className="text-2xl text-[#e6ff00] font-bold">&rarr;</div>
          <span className="text-[9px] text-[#e6ff00] font-mono font-bold uppercase tracking-wider mt-1">
            Dispatch
          </span>
        </div>

        {/* BACKEND PILLAR (5 cols) */}
        <div className="md:col-span-5 p-5 rounded-xl bg-[#07080c] border border-[#e6ff00]/30 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="hpc-badge-yellow font-mono text-[10px] mb-0">
              Out-of-Order + In-Order Commit
            </span>
            <h3 className="m-0 text-lg font-bold text-[#e6ff00]">2. BACKEND</h3>
          </div>
          
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            <strong className="text-white">Misión:</strong> Maximizar el paralelismo ejecutando operaciones tan pronto tengan sus operandos listos y confirmar su retiro estrictamente en orden.
          </p>

          <div className="flex flex-col gap-1.5 text-xs text-slate-400 font-mono">
            <div>• <strong className="text-slate-200">Issue Queues (RS):</strong> Espera dinámica.</div>
            <div>• <strong className="text-slate-200">Puertos:</strong> ALUs, FP/SIMD 512b, AGUs.</div>
            <div>• <strong className="text-slate-200">Common Data Bus (CDB):</strong> Fast bypass.</div>
            <div>• <strong className="text-slate-200">Reorder Buffer (ROB):</strong> Commit ordenado.</div>
          </div>
        </div>

      </div>

      {/* Summary Footer */}
      <div className="mt-3 p-3 rounded-lg bg-[#07080c] border border-[#232a3d] text-center text-xs text-slate-300 flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded bg-[#151a27] text-[#e6ff00] font-mono text-[10px] font-bold border border-[#e6ff00]/40">DESACOPLAMIENTO</span>
        <span>El <em>Frontend</em> trabaja hacia el futuro de forma especulativa; el <em>Backend</em> resuelve el trabajo masivo fuera de orden y reconcilia el pasado de forma determinista.</span>
      </div>
    </div>
  );
};

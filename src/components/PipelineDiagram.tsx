import React from 'react';

export const PipelineDiagram: React.FC = () => {
  const stages = [
    { name: 'IF (Fetch)', desc: 'Lectura de instrucción desde la caché I-Cache' },
    { name: 'ID (Decode)', desc: 'Decodificación y lectura de registros (ARF)' },
    { name: 'EX (Execute)', desc: 'Cálculo en la ALU / FPU o cálculo de dirección' },
    { name: 'MEM (Memory)', desc: 'Acceso a caché D-Cache (Load / Store)' },
    { name: 'WB (Writeback)', desc: 'Escritura del resultado en registro físico' },
  ];

  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="hpc-badge font-mono">Pipelining</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight">
            Segmentación Clásica RISC de 5 Etapas
          </h4>
        </div>
        <span className="hpc-badge font-mono">
          Throughput Teórico: 1 Inst / Ciclo
        </span>
      </div>

      <div className="grid grid-cols-5 gap-3 my-3">
        {stages.map((stage, i) => (
          <div
            key={i}
            className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 border-t-2 border-t-slate-500 text-center flex flex-col justify-between"
          >
            <div className="font-bold text-xs font-mono text-white">{stage.name}</div>
            <div className="text-[11px] text-slate-400 mt-2 leading-tight">{stage.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

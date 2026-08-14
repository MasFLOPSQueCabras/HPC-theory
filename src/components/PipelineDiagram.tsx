import React from 'react';

export const PipelineDiagram: React.FC = () => {
  const stages = [
    { name: 'IF (Fetch)', desc: 'Lectura de instrucción desde la caché I-Cache', border: 'border-t-[#38bdf8]' },
    { name: 'ID (Decode)', desc: 'Decodificación y lectura de registros (ARF)', border: 'border-t-[#38bdf8]' },
    { name: 'EX (Execute)', desc: 'Cálculo en la ALU / FPU o cálculo de dirección', border: 'border-t-[#e6ff00]' },
    { name: 'MEM (Memory)', desc: 'Acceso a caché D-Cache (Load / Store)', border: 'border-t-[#34d399]' },
    { name: 'WB (Writeback)', desc: 'Escritura del resultado en registro físico', border: 'border-t-[#c084fc]' },
  ];

  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-[#0f131d] border border-[#232a3d] shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#232a3d]">
        <div className="flex items-center gap-2">
          <span className="hpc-badge-cyan font-mono text-xs mb-0">Pipelining</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight">
            Segmentación Clásica RISC de 5 Etapas
          </h4>
        </div>
        <span className="hpc-badge-yellow font-mono text-xs mb-0">
          Throughput Teórico: 1 Inst / Ciclo
        </span>
      </div>

      <div className="grid grid-cols-5 gap-3 my-3">
        {stages.map((stage, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg bg-[#07080c] border border-[#232a3d] border-t-2 ${stage.border} text-center flex flex-col justify-between`}
          >
            <div className="font-bold text-xs font-mono text-white">{stage.name}</div>
            <div className="text-[11px] text-slate-400 mt-2 leading-tight">{stage.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

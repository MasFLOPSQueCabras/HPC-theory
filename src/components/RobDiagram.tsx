import React, { useState } from 'react';

export const RobDiagram: React.FC = () => {
  const [selectedState, setSelectedState] = useState<'flow' | 'exceptions' | 'rollback'>('flow');

  const slots = [
    { id: 0, inst: 'LOAD R1, [0x1000]', state: 'Pending (DRAM Miss ~200c)', isHead: true, badge: 'bg-[#1e131d] text-[#fb7185] border-[#fb7185]/40' },
    { id: 1, inst: 'ADD R4, R1, R2', state: 'Waiting R1 (Blocked in RS)', isHead: false, badge: 'bg-[#07080c] text-slate-400 border-[#232a3d]' },
    { id: 2, inst: 'MUL R6, R7, R8', state: 'Finished (Speculative Ready)', isHead: false, badge: 'bg-[#10241e] text-[#34d399] border-[#34d399]/40' },
    { id: 3, inst: 'FMA R9, R10, R11', state: 'Executing in FPU (In-Flight)', isHead: false, badge: 'bg-[#102030] text-[#38bdf8] border-[#38bdf8]/40' },
    { id: 4, inst: 'SUB R12, R13, R14', state: 'Allocated / Renamed', isHead: false, isTail: true, badge: 'bg-[#07080c] text-slate-400 border-[#232a3d]' },
  ];

  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-[#0f131d] border border-[#232a3d] shadow-2xl">
      {/* Header & Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#232a3d]">
        <div className="flex items-center gap-2">
          <span className="hpc-badge-purple font-mono text-xs mb-0">Microarquitectura</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight">
            Anatomía del Reorder Buffer (ROB) y Ventana In-Flight
          </h4>
        </div>
        
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#07080c] border border-[#232a3d]">
          <button
            type="button"
            onClick={() => setSelectedState('flow')}
            className={`px-3 py-1 text-xs rounded-md font-semibold transition-all border ${
              selectedState === 'flow'
                ? 'bg-[#151a27] text-[#e6ff00] border-[#e6ff00]/40 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Flujo In-Flight
          </button>
          <button
            type="button"
            onClick={() => setSelectedState('exceptions')}
            className={`px-3 py-1 text-xs rounded-md font-semibold transition-all border ${
              selectedState === 'exceptions'
                ? 'bg-[#1e131d] text-[#fb7185] border-[#fb7185]/40 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Excepciones Precisas
          </button>
          <button
            type="button"
            onClick={() => setSelectedState('rollback')}
            className={`px-3 py-1 text-xs rounded-md font-semibold transition-all border ${
              selectedState === 'rollback'
                ? 'bg-[#102030] text-[#38bdf8] border-[#38bdf8]/40 shadow-sm'
                : 'bg-transparent text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Rollback Especulativo
          </button>
        </div>
      </div>

      {/* ROB Circular Buffer Table */}
      <div className="my-3 overflow-hidden rounded-lg border border-[#232a3d] bg-[#07080c]">
        <div className="grid grid-cols-12 gap-2 p-2 bg-[#0d1017] text-slate-400 text-[11px] font-mono font-bold border-b border-[#232a3d]">
          <div className="col-span-2">ROB Entry</div>
          <div className="col-span-4">Instrucción Despachada</div>
          <div className="col-span-4">Estado de Ejecución</div>
          <div className="col-span-2 text-right">Puntero</div>
        </div>

        <div className="divide-y divide-[#232a3d]">
          {slots.map((slot) => (
            <div key={slot.id} className="grid grid-cols-12 gap-2 p-2.5 items-center text-xs font-mono">
              <div className="col-span-2 text-white font-bold">ROB #{slot.id}</div>
              <div className="col-span-4 text-slate-200 font-medium">{slot.inst}</div>
              <div className="col-span-4">
                <span className={`px-2 py-0.5 rounded text-[11px] border ${slot.badge}`}>
                  {slot.state}
                </span>
              </div>
              <div className="col-span-2 text-right">
                {slot.isHead && (
                  <span className="px-2 py-0.5 rounded bg-[#1e131d] text-[#fb7185] font-bold border border-[#fb7185]/40 text-[10px]">
                    HEAD (Commit)
                  </span>
                )}
                {slot.isTail && (
                  <span className="px-2 py-0.5 rounded bg-[#10241e] text-[#34d399] font-bold border border-[#34d399]/40 text-[10px]">
                    TAIL (Allocate)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanatory details based on active mode */}
      <div className="p-3 rounded-lg bg-[#07080c] border border-[#232a3d] text-xs text-slate-300 leading-relaxed">
        {selectedState === 'flow' && (
          <div>
            <strong className="text-white">Flujo Circular FIFO:</strong> Las instrucciones entran en orden en el <strong className="text-[#34d399]">TAIL</strong> durante la etapa de renombre (Rename), se ejecutan en cualquier orden en las unidades funcionales del Backend, y se confirman (Commit / Retire) estrictamente en orden en el <strong className="text-[#fb7185]">HEAD</strong> cuando el resultado está listo.
          </div>
        )}
        {selectedState === 'exceptions' && (
          <div>
            <strong className="text-white">Excepciones Precisas:</strong> Si la instrucción #0 produce un fallo de página (Page Fault) o división por cero, el procesador detiene el commit en el HEAD y descarta todas las instrucciones posteriores del ROB, manteniendo el estado arquitectural visible 100% limpio y consistente.
          </div>
        )}
        {selectedState === 'rollback' && (
          <div>
            <strong className="text-white">Recuperación Especulativa:</strong> Ante un fallo de predicción de saltos (Branch Misprediction), el puntero TAIL se rebobina instantáneamente hasta la entrada del salto erróneo en el ROB, liberando los registros físicos especulativos sin penalizaciones colaterales.
          </div>
        )}
      </div>
    </div>
  );
};

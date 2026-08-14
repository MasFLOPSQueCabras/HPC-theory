import React, { useState } from 'react';

export const HazardsDiagram: React.FC = () => {
  const [activeHazard, setActiveHazard] = useState<'RAW' | 'WAR' | 'WAW' | 'RAR'>('RAW');

  const hazardData = {
    RAW: {
      name: 'RAW (Read-After-Write)',
      type: 'Dependencia Verdadera (True Dependency)',
      i1: 'ADD R1, R2, R3  ; Escribe en R1',
      i2: 'SUB R4, R1, R5  ; Lee R1 (debe esperar a I1)',
      targetReg: 'R1',
      desc: 'I2 intenta leer R1 antes de que I1 escriba su resultado final. Es una dependencia de datos real e inherente al flujo lógico del algoritmo.',
      inOrderSol: 'Data Forwarding (Bypass directo desde la salida de la ALU) o inserción de Stalls (Burbujas si I1 es un Load de memoria).',
      oooSol: 'Despacho dinámico: I2 espera en la Estación de Reserva (Issue Queue) hasta que I1 transmita el resultado por el CDB (Common Data Bus).'
    },
    WAR: {
      name: 'WAR (Write-After-Read)',
      type: 'Antidependencia (Falsa Dependencia de Nombre)',
      i1: 'ADD R4, R1, R5  ; Lee R1',
      i2: 'SUB R1, R2, R3  ; Escribe en R1 (no debe sobreescribir antes de que I1 lea)',
      targetReg: 'R1',
      desc: 'I2 intenta escribir en R1 antes de que I1 haya leído el valor previo. Es una limitación artificial por escasez de registros de la ISA.',
      inOrderSol: 'No existe en In-Order porque las lecturas en ID ocurren estrictamente antes que los Writebacks.',
      oooSol: 'Register Renaming mediante RAT (Register Alias Table): Mapea R1 a registros físicos distintos en el PRF (Physical Register File, ej. P12 y P19).'
    },
    WAW: {
      name: 'WAW (Write-After-Write)',
      type: 'Dependencia de Salida (Output Dependency)',
      i1: 'ADD R1, R2, R3  ; Escribe en R1 (latencia larga)',
      i2: 'SUB R1, R4, R5  ; Escribe en R1 (latencia corta, podría terminar antes)',
      targetReg: 'R1',
      desc: 'I2 intenta escribir en R1 antes que I1. Si I2 adelanta a I1 en ejecución fuera de orden, el valor final en R1 quedaría corrupto.',
      inOrderSol: 'No ocurre en In-Order simple, ya que todas las escrituras a registros siguen el orden del programa.',
      oooSol: 'Register Renaming (RAT) + ROB (Reorder Buffer): Asigna registros físicos separados y asegura que el commit final respete el flujo del programa.'
    },
    RAR: {
      name: 'RAR (Read-After-Read)',
      type: 'Lectura Concurrente (No es un Hazard)',
      i1: 'ADD R4, R1, R2  ; Lee R1',
      i2: 'SUB R5, R1, R3  ; Lee R1 simultáneamente',
      targetReg: 'R1',
      desc: 'Ambas instrucciones leen el mismo registro fuente R1 sin modificarlo. No hay ningún conflicto de dependencias.',
      inOrderSol: 'Se ejecuta en paralelo sin ninguna penalización.',
      oooSol: 'Múltiples puertos de lectura en el banco de registros físicos (PRF) sirven el operando a ambas unidades simultáneamente.'
    }
  };

  const current = hazardData[activeHazard];

  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-[#0f131d] border border-[#232a3d] shadow-2xl">
      {/* Header with Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#232a3d]">
        <div className="flex items-center gap-2">
          <span className="hpc-badge-rose font-mono text-xs mb-0">Pipeline Hazards</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight">
            Dependencias de Datos y Mitigaciones
          </h4>
        </div>

        {/* Buttons to switch hazard */}
        <div className="flex items-center gap-1.5 bg-[#07080c] p-1 rounded-lg border border-[#232a3d]">
          {(['RAW', 'WAR', 'WAW', 'RAR'] as const).map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setActiveHazard(h)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded transition-all cursor-pointer ${
                activeHazard === h
                  ? h === 'RAW'
                    ? 'bg-[#1e131d] text-[#fb7185] border border-[#fb7185]/40 shadow-sm'
                    : h === 'RAR'
                    ? 'bg-[#102030] text-[#38bdf8] border border-[#38bdf8]/40 shadow-sm'
                    : 'bg-[#161d2d] text-[#e6ff00] border border-[#e6ff00]/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Main Details Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-3">
        {/* Left: Code Snippet & Description */}
        <div className="md:col-span-5 flex flex-col justify-between p-4 rounded-xl bg-[#07080c] border border-[#232a3d]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="hpc-badge font-mono text-[10px] mb-0">{current.name.split(' ')[0]}</span>
              <span className="text-[11px] font-mono text-slate-400">{current.type}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#030408] border border-[#232a3d] font-mono text-xs text-slate-200 my-2">
              <div className="text-[#38bdf8] font-bold">I1: {current.i1}</div>
              <div className="text-[#e6ff00] font-bold mt-1">I2: {current.i2}</div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mt-2">
              {current.desc}
            </p>
          </div>
        </div>

        {/* Right: Solutions Comparison */}
        <div className="md:col-span-7 flex flex-col gap-3">
          {/* In-Order Solution */}
          <div className="p-3.5 rounded-xl bg-[#07080c] border border-[#232a3d] text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded bg-[#151a27] text-slate-300 font-mono text-[10px] font-bold border border-[#232a3d]">
                IN-ORDER
              </span>
              <h5 className="m-0 text-xs font-bold text-white">Comportamiento en Pipeline Secuencial</h5>
            </div>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              {current.inOrderSol}
            </p>
          </div>

          {/* Out-of-Order Solution */}
          <div className="p-3.5 rounded-xl bg-[#07080c] border border-[#e6ff00]/30 text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded bg-[#161d2d] text-[#e6ff00] font-mono text-[10px] font-bold border border-[#e6ff00]/40">
                OUT-OF-ORDER (OoO)
              </span>
              <h5 className="m-0 text-xs font-bold text-[#e6ff00]">Solución Dinámica en Hardware</h5>
            </div>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              {current.oooSol}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

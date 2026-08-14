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
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
      {/* Header with Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="hpc-badge font-mono">Pipeline Hazards</span>
          <h4 className="m-0 text-base font-bold text-white tracking-tight">
            Dependencias de Datos y Mitigaciones
          </h4>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800">
          {(['RAW', 'WAR', 'WAW', 'RAR'] as const).map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setActiveHazard(h)}
              className={`px-3 py-1 text-xs rounded-md font-mono font-bold transition-all border ${
                activeHazard === h
                  ? 'bg-slate-700 text-white border-slate-600 shadow-sm'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-white'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-3">
        {/* Left: Code Snippet & Target Register (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="p-3.5 rounded-lg bg-slate-950/90 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400">Instrucciones en Ensamblador</span>
              <span className="hpc-badge font-mono text-[10px]">{current.name.split(' ')[0]}</span>
            </div>
            <pre className="m-0 font-mono text-xs text-slate-200 leading-relaxed">
              <div>I1: {current.i1}</div>
              <div className="mt-1">I2: {current.i2}</div>
            </pre>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
            <span className="font-bold text-white">Registro en Conflicto: </span>
            <span className="font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
              {current.targetReg}
            </span>
            <p className="mt-2 mb-0 text-[11px] text-slate-400 leading-normal">{current.desc}</p>
          </div>
        </div>

        {/* Right: Solutions in In-Order vs OoO (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-3">
          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <h5 className="m-0 text-xs font-bold text-white mb-1">Solución Secuencial (In-Order)</h5>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">{current.inOrderSol}</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <h5 className="m-0 text-xs font-bold text-white mb-1">Solución Dinámica (Out-of-Order)</h5>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">{current.oooSol}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

export const FrontendDetail: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<number>(0);

  const blocks = [
    {
      title: '1. Fetch & I-Cache',
      badge: 'IFU / ITLB',
      headline: 'Lectura de Instrucciones y Traducción de Direcciones',
      detail: 'El Instruction Fetch Unit (IFU) consulta el Program Counter (PC) y extrae de 32 a 64 bytes contiguos por ciclo desde la L1 Instruction Cache asistido por el ITLB (Instruction Translation Lookaside Buffer) para la resolución de direcciones virtuales a físicas.',
      specs: '• Ancho de banda: 32 - 64 B/ciclo | • Latencia típica: 3 a 4 ciclos de reloj'
    },
    {
      title: '2. Branch Predictor',
      badge: 'BPU / TAGE / BTB',
      headline: 'Predicción Especulativa de Bifurcaciones y Saltos',
      detail: 'Para evitar que el pipeline se vacíe (Pipeline Flush con penalización de 15 a 20 ciclos), la Branch Prediction Unit (BPU) utiliza el BTB (Branch Target Buffer) y algoritmos avanzados TAGE para predecir si un salto se toma o no con una precisión superior al 98%.',
      specs: '• Algoritmo TAGE / Red Neuronal Perceptrón | • Precisión típica: >98%'
    },
    {
      title: '3. Decoder & μop Cache',
      badge: 'Macro → μops',
      headline: 'Decodificación a Micro-operaciones Regulares',
      detail: 'Las instrucciones complejas del ISA (CISC x86 o ARMv9) se traducen en micro-operaciones elementales (μops) de formato RISC. Los procesadores modernos incorporan una μop Cache (L0) que almacena bucles calientes ya decodificados, ahorrando hasta un 40% de energía.',
      specs: '• Tasa de decodificación: 6 a 8 μops/ciclo | • Tamaño μop Cache: 1.5K - 4K μops'
    },
    {
      title: '4. Register Renaming',
      badge: 'RAT (ARF → PRF)',
      headline: 'Eliminación Dinámica de Falsas Dependencias (WAR / WAW)',
      detail: 'La Register Alias Table (RAT) renombra los registros arquitecturales visibles (ARF, ej. 16 registros x86) asignándolos a un banco masivo de registros físicos en silicio (PRF, 256+ registros). Esto permite que instrucciones con dependencias de nombre se ejecuten en paralelo.',
      specs: '• Registros Físicos (PRF): 220 a 350+ entradas | • Elimina: WAR y WAW'
    }
  ];

  const current = blocks[selectedBlock];

  return (
    <div className="hpc-card p-5 w-full max-w-5xl mx-auto bg-[#0f131d] border border-[#38bdf8]/30 shadow-2xl">
      {/* Selector Tabs */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {blocks.map((b, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedBlock(idx)}
            className={`p-2.5 rounded-lg text-center transition-all cursor-pointer border ${
              selectedBlock === idx
                ? 'bg-[#151a27] border-[#38bdf8] text-[#38bdf8] shadow-md font-bold'
                : 'bg-[#07080c] border-[#232a3d] text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-xs font-bold font-mono">{b.title}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{b.badge}</div>
          </button>
        ))}
      </div>

      {/* Detail Card */}
      <div className="p-4 rounded-xl bg-[#07080c] border border-[#232a3d]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="m-0 text-sm font-bold text-white">{current.headline}</h4>
          <span className="hpc-badge-cyan font-mono text-[10px] mb-0">{current.badge}</span>
        </div>
        <p className="m-0 text-xs text-slate-300 leading-relaxed mb-3">{current.detail}</p>
        <div className="p-2 rounded bg-[#0f131d] border border-[#232a3d] text-[11px] font-mono text-[#38bdf8]">
          {current.specs}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

export const BackendDetail: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<number>(0);

  const blocks = [
    {
      title: '1. Issue Queue (RS)',
      badge: 'Estaciones de Reserva',
      headline: 'Espera Dinámica y Despacho Fuera de Orden',
      detail: 'Las micro-operaciones entran a las Reservation Stations (RS / Issue Queue). El hardware monitoriza continuamente los registros fuente. En cuanto los operandos están disponibles, se despacha inmediatamente hacia un puerto libre.',
      specs: '• Capacidad Issue Queue: 120 - 180 entradas | • Despacho: Fuera de orden (OoO)'
    },
    {
      title: '2. Puertos de Ejecución',
      badge: 'ALUs / FPUs / AGUs',
      headline: 'Unidades Funcionales Paralelas de Alto Rendimiento',
      detail: 'La CPU cuenta con una matriz de 10 a 16 puertos paralelos: ALUs de enteros (sumas, lógica, saltos), unidades vectoriales FP/SIMD/FMA (operaciones AVX-512 / matrices) y AGUs dedicadas a cargas (Load) y escrituras (Store).',
      specs: '• Puertos: 12 a 16 vías paralelas | • Throughput: Múltiples FLOPs/ciclo'
    },
    {
      title: '3. Common Data Bus',
      badge: 'CDB / Fast Bypass',
      headline: 'Reenvío Instantáneo de Resultados sin Latencia de Memoria',
      detail: 'Cuando una unidad funcional completa un cálculo, difunde el valor resultante y la etiqueta del registro físico por el Common Data Bus (CDB). Las instrucciones en las RS capturan el dato en el ciclo inmediato (Data Forwarding).',
      specs: '• Latencia de bypass: 0 ciclos adicionales | • Red de difusión interna'
    },
    {
      title: '4. Reorder Buffer (ROB)',
      badge: 'In-Order Commit',
      headline: 'Retiro en Orden Estricto y Excepciones Precisas',
      detail: 'Aunque las instrucciones se ejecutan de forma desordenada, se registran en una cola circular FIFO (ROB de 320 a 512 entradas). Solo cuando una instrucción llega a la cabeza del ROB se confirman sus resultados (Commit), garantizando coherencia.',
      specs: '• Tamaño ROB: 320 - 512+ entradas in-flight | • Tasa de Retiro: 6 a 8 μops/ciclo'
    }
  ];

  const current = blocks[selectedBlock];

  return (
    <div className="hpc-card p-5 w-full max-w-5xl mx-auto bg-slate-900/80 border border-amber-500/30 shadow-2xl backdrop-blur-xl">
      {/* Selector Tabs */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {blocks.map((b, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedBlock(idx)}
            className={`p-2.5 rounded-lg text-center transition-all cursor-pointer border ${
              selectedBlock === idx
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-xs font-bold font-mono">{b.title}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{b.badge}</div>
          </button>
        ))}
      </div>

      {/* Detail Card */}
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h4 className="m-0 text-sm font-bold text-white">{current.headline}</h4>
          <span className="hpc-badge-amber font-mono text-[10px]">{current.badge}</span>
        </div>
        <p className="m-0 text-xs text-slate-300 leading-relaxed mb-3">{current.detail}</p>
        <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-amber-300">
          {current.specs}
        </div>
      </div>
    </div>
  );
};

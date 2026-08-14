import React from 'react';

export const FlynnMatrix: React.FC = () => {
  const cards = [
    {
      id: 'SISD',
      badge: 'SISD',
      title: 'CPU Mononúcleo Secuencial',
      points: [
        '1 instrucción procesa 1 solo elemento de datos por ciclo.',
        'Flujo determinista y secuencial (Von Neumann puro).',
        'Hardware: CPUs mononúcleo clásicas y microcontroladores.'
      ]
    },
    {
      id: 'SIMD',
      badge: 'SIMD',
      title: 'Vectorización Masiva (Pilar HPC)',
      points: [
        '1 instrucción opera sobre vectores de datos en 1 ciclo.',
        'Paralelismo a nivel de datos (DLP) de alto rendimiento.',
        'Hardware: x86 AVX-512, ARM SVE2, RISC-V RVV, GPUs.'
      ]
    },
    {
      id: 'MISD',
      badge: 'MISD',
      title: 'Misión Crítica y Sistólicos',
      points: [
        'Múltiples instrucciones procesan el mismo dato en paralelo.',
        'Tolerancia a fallos por votación redundante y arrays sistólicos.',
        'Hardware: Control de vuelo aeroespacial, Google TPU.'
      ]
    },
    {
      id: 'MIMD',
      badge: 'MIMD',
      title: 'Supercómputo y Clústeres',
      points: [
        'Múltiples CPUs autónomas ejecutan programas y datos distintos.',
        'Escalabilidad en memoria compartida (OpenMP) y distribuida (MPI).',
        'Hardware: Servidores multi-socket, clústeres HPC y Top500.'
      ]
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        {cards.map((c) => (
          <div key={c.id} className="hpc-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="hpc-badge font-mono text-[10px]">{c.badge}</span>
              <h4 className="m-0 text-sm font-bold text-white">{c.title}</h4>
            </div>
            <ul className="m-0 p-0 pl-4 text-xs text-slate-300 space-y-1.5 list-disc leading-relaxed">
              {c.points.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

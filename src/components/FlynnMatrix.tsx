import React from 'react';

export const FlynnMatrix: React.FC = () => {
  const cards = [
    {
      id: 'SISD',
      badge: 'SISD • Single Inst, Single Data',
      title: 'CPU Mononúcleo Secuencial',
      accentColor: '#38bdf8',
      bgGlow: 'rgba(56, 189, 248, 0.05)',
      borderColor: 'rgba(56, 189, 248, 0.3)',
      points: [
        '1 instrucción procesa 1 solo elemento de datos por ciclo.',
        'Flujo determinista y secuencial (Von Neumann puro).',
        'Hardware: CPUs mononúcleo clásicas y microcontroladores.'
      ]
    },
    {
      id: 'SIMD',
      badge: 'SIMD • Single Inst, Multiple Data',
      title: 'Vectorización Masiva (Pilar HPC)',
      accentColor: '#34d399',
      bgGlow: 'rgba(52, 211, 153, 0.05)',
      borderColor: 'rgba(52, 211, 153, 0.3)',
      points: [
        '1 instrucción opera sobre vectores continuos de datos en 1 ciclo.',
        'Paralelismo a nivel de datos (DLP) de alto rendimiento.',
        'Hardware: x86 AVX-512, ARM SVE2, RISC-V RVV, GPUs (Vector).'
      ]
    },
    {
      id: 'MISD',
      badge: 'MISD • Multiple Inst, Single Data',
      title: 'Misión Crítica y Sistólicos',
      accentColor: '#a78bfa',
      bgGlow: 'rgba(167, 139, 250, 0.05)',
      borderColor: 'rgba(167, 139, 250, 0.3)',
      points: [
        'Múltiples instrucciones procesan el mismo dato en paralelo.',
        'Tolerancia a fallos por votación redundante y filtros sistólicos.',
        'Hardware: Control de vuelo aeroespacial, Systolic Arrays (TPU).'
      ]
    },
    {
      id: 'MIMD',
      badge: 'MIMD • Multiple Inst, Multiple Data',
      title: 'Supercómputo y Clústeres',
      accentColor: '#f4b860',
      bgGlow: 'rgba(244, 184, 96, 0.05)',
      borderColor: 'rgba(244, 184, 96, 0.3)',
      points: [
        'Múltiples CPUs autónomas ejecutan programas y datos distintos.',
        'Escalabilidad en memoria compartida (OpenMP) y distribuida (MPI).',
        'Hardware: Servidores multi-socket, clústeres HPC y supercomputadores.'
      ]
    }
  ];

  return (
    <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      {/* 2x2 Grid of 4 Static Quadrants */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '0.7rem' }}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              background: card.bgGlow,
              borderRadius: '10px',
              border: `1px solid ${card.borderColor}`,
              borderLeft: `3px solid ${card.accentColor}`,
              padding: '0.85rem 1.1rem',
              textAlign: 'left'
            }}
          >
            {/* Card Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <span
                className="hpc-badge"
                style={{
                  margin: 0,
                  fontSize: '0.68rem',
                  background: `${card.accentColor}22`,
                  color: card.accentColor,
                  border: `1px solid ${card.accentColor}55`,
                  fontWeight: 700
                }}
              >
                {card.badge}
              </span>
            </div>

            {/* Card Title */}
            <h4 style={{ margin: '0 0 0.35rem 0', color: '#ffffff', fontSize: '0.96rem' }}>
              {card.title}
            </h4>

            {/* Bullet Points */}
            <ul style={{ fontSize: '0.76rem', paddingLeft: '1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.2rem', lineHeight: 1.35 }}>
              {card.points.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Summary Bar */}
      <div style={{ background: '#070a12', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.78rem', color: '#cbd5e1', textAlign: 'center' }}>
        💡 <strong>Taxonomía de Flynn (1966):</strong> Clasifica todas las arquitecturas según 2 ejes ortogonales: <strong>Flujo de Instrucciones</strong> (Single vs Multiple) y <strong>Flujo de Datos</strong> (Single vs Multiple). En HPC moderno se combinan <strong>MIMD</strong> (nodos MPI) con <strong>SIMD / SIMT</strong> (vectores y GPUs).
      </div>
    </div>
  );
};

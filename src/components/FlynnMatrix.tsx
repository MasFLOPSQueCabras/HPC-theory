import React, { useState } from 'react';

export const FlynnMatrix: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<'SISD' | 'SIMD' | 'MISD' | 'MIMD'>('SIMD');

  const details = {
    SISD: {
      title: 'SISD (Single Instruction, Single Data)',
      desc: 'Procesador secuencial clásico de un solo núcleo (Modelo Von Neumann tradicional). Ejecuta una sola instrucción sobre un único dato a la vez.',
      example: 'Ejemplo: CPUs antiguas mononúcleo (x86 tradicional sin extensiones vectoriales).'
    },
    SIMD: {
      title: 'SIMD (Single Instruction, Multiple Data)',
      desc: 'Una única instrucción controla múltiples unidades de procesamiento en paralelo aplicando la misma operación a un vector de datos.',
      example: 'Ejemplo: Instrucciones AVX-512, ARM SVE, GPUs (Vector Processing).'
    },
    MISD: {
      title: 'MISD (Multiple Instruction, Single Data)',
      desc: 'Múltiples unidades de instrucción ejecutan diferentes operaciones sobre el mismo flujo de datos. Poco común en HPC general.',
      example: 'Ejemplo: Sistemas de alta disponibilidad con redundancia de fallos (Sistemas aeroespaciales, Arrays Sistólicos).'
    },
    MIMD: {
      title: 'MIMD (Multiple Instruction, Multiple Data)',
      desc: 'Múltiples procesadores autónomos ejecutan diferentes programas sobre diferentes flujos de datos de manera independiente.',
      example: 'Ejemplo: Clusters de HPC, CPUs multinúcleo modernas ejecutando MPI u OpenMP.'
    }
  };

  return (
    <div style={{ background: 'var(--hpc-card-bg)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--hpc-card-border)', backdropFilter: 'blur(12px)' }}>
      <h4 style={{ margin: '0 0 0.8rem 0', color: 'var(--hpc-primary)', fontSize: '1.1rem' }}>Taxonomía de Flynn (Clasificación de Arquitecturas)</h4>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
        <div
          onClick={() => setSelectedCell('SISD')}
          style={{
            padding: '1rem',
            borderRadius: '8px',
            background: selectedCell === 'SISD' ? 'rgba(56, 189, 248, 0.15)' : '#111827',
            border: selectedCell === 'SISD' ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <span className="hpc-badge badge-cyan">SISD</span>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>Single Inst. / Single Data</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--hpc-muted)', marginTop: '0.3rem' }}>CPU Mononúcleo Secuencial</div>
        </div>

        <div
          onClick={() => setSelectedCell('SIMD')}
          style={{
            padding: '1rem',
            borderRadius: '8px',
            background: selectedCell === 'SIMD' ? 'rgba(244, 184, 96, 0.15)' : '#111827',
            border: selectedCell === 'SIMD' ? '2px solid #f4b860' : '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <span className="hpc-badge badge-gold">SIMD</span>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>Single Inst. / Multiple Data</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--hpc-muted)', marginTop: '0.3rem' }}>Registros Vectoriales / AVX-512</div>
        </div>

        <div
          onClick={() => setSelectedCell('MISD')}
          style={{
            padding: '1rem',
            borderRadius: '8px',
            background: selectedCell === 'MISD' ? 'rgba(129, 140, 248, 0.15)' : '#111827',
            border: selectedCell === 'MISD' ? '2px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <span className="hpc-badge badge-indigo">MISD</span>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>Multiple Inst. / Single Data</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--hpc-muted)', marginTop: '0.3rem' }}>Redundancia / Sistólico</div>
        </div>

        <div
          onClick={() => setSelectedCell('MIMD')}
          style={{
            padding: '1rem',
            borderRadius: '8px',
            background: selectedCell === 'MIMD' ? 'rgba(52, 211, 153, 0.15)' : '#111827',
            border: selectedCell === 'MIMD' ? '2px solid #34d399' : '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <span className="hpc-badge badge-emerald">MIMD</span>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>Multiple Inst. / Multiple Data</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--hpc-muted)', marginTop: '0.3rem' }}>Multinúcleo / Clusters MPI</div>
        </div>
      </div>

      <div style={{ marginTop: '0.8rem', background: '#080d1a', padding: '0.8rem', borderRadius: '8px', textAlign: 'left', borderLeft: '4px solid var(--hpc-primary)' }}>
        <strong style={{ color: 'var(--hpc-primary)', fontSize: '0.95rem' }}>{details[selectedCell].title}</strong>
        <p style={{ margin: '0.3rem 0', fontSize: '0.85rem', color: '#e5e7eb' }}>{details[selectedCell].desc}</p>
        <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontStyle: 'italic' }}>{details[selectedCell].example}</div>
      </div>
    </div>
  );
};

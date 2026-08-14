import React from 'react';

export const PipelineDiagram: React.FC = () => {
  const stages = [
    { name: 'IF (Fetch)', color: '#38bdf8', desc: 'Lectura de instrucción desde la memoria I-Cache' },
    { name: 'ID (Decode)', color: '#818cf8', desc: 'Decodificación y lectura de registros' },
    { name: 'EX (Execute)', color: '#f4b860', desc: 'Cálculo en la ALU / FPU o dirección' },
    { name: 'MEM (Memory)', color: '#34d399', desc: 'Acceso a caché de datos (Load / Store)' },
    { name: 'WB (Writeback)', color: '#f87171', desc: 'Escritura del resultado en registro físico' },
  ];

  return (
    <div style={{ background: 'var(--hpc-card-bg)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--hpc-card-border)', backdropFilter: 'blur(12px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <h4 style={{ margin: 0, color: 'var(--hpc-primary)', fontSize: '1rem' }}>Segmentación Clásica RISC (5 Etapas)</h4>
        <span className="hpc-badge badge-gold" style={{ fontSize: '0.7rem' }}>Throughput Ideal: 1 Inst/Ciclo</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem' }}>
        {stages.map((stage, i) => (
          <div key={i} style={{ background: '#111827', borderTop: `4px solid ${stage.color}`, padding: '0.8rem 0.5rem', borderRadius: '6px', textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: stage.color }}>{stage.name}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--hpc-subtle)', marginTop: '0.4rem', lineHeight: 1.3 }}>{stage.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';

export const FrontendBackendOverview: React.FC = () => {
  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* 2 Big Pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: '1rem', alignItems: 'center' }}>
        
        {/* FRONTEND PILLAR */}
        <div style={{
          background: 'rgba(56, 189, 248, 0.04)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '10px',
          padding: '1.2rem',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
            <span className="hpc-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              In-Order (Secuencial)
            </span>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#38bdf8' }}>1. FRONTEND</h3>
          </div>
          
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.45, margin: '0 0 0.8rem 0' }}>
            <strong>Misión:</strong> Alimentar al procesador de forma ininterrumpida anticipando el flujo de instrucciones y traduciéndolas a micro-operaciones listas para ejecutar.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem', color: '#94a3b8' }}>
            <div>&bull; <strong>Fetch:</strong> Lectura desde L1 I-Cache &amp; ITLB.</div>
            <div>&bull; <strong>Branch Prediction (BPU):</strong> Anticipación de saltos con TAGE/BTB.</div>
            <div>&bull; <strong>Decode:</strong> Traducción de macro-instrucciones a &mu;ops.</div>
            <div>&bull; <strong>Register Renaming:</strong> RAT elimina falsas dependencias WAR/WAW.</div>
          </div>
        </div>

        {/* ARROW CONNECTOR */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '1.4rem', color: '#94a3b8' }}>&rarr;</div>
          <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.2rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Dispatch &mu;ops
          </span>
        </div>

        {/* BACKEND PILLAR */}
        <div style={{
          background: 'rgba(244, 184, 96, 0.04)',
          border: '1px solid rgba(244, 184, 96, 0.3)',
          borderRadius: '10px',
          padding: '1.2rem',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
            <span className="hpc-badge" style={{ background: 'rgba(244, 184, 96, 0.15)', color: '#f4b860', border: '1px solid rgba(244, 184, 96, 0.3)' }}>
              Out-of-Order + In-Order Commit
            </span>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#f4b860' }}>2. BACKEND</h3>
          </div>
          
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.45, margin: '0 0 0.8rem 0' }}>
            <strong>Misión:</strong> Maximizar el paralelismo ejecutando operaciones tan pronto tengan sus datos y confirmar su retiro estrictamente en orden.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem', color: '#94a3b8' }}>
            <div>&bull; <strong>Issue Queues (RS):</strong> Espera dinámica de operandos listos.</div>
            <div>&bull; <strong>Puertos Paralelos:</strong> ALUs (enteros), FP/SIMD (vectores), AGUs (RAM).</div>
            <div>&bull; <strong>Common Data Bus (CDB):</strong> Fast bypass dinámico en 0 ciclos.</div>
            <div>&bull; <strong>Reorder Buffer (ROB):</strong> Retiro ordenado y excepciones precisas.</div>
          </div>
        </div>

      </div>

      {/* Summary Footer */}
      <div style={{ marginTop: '1rem', background: '#070a12', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', fontSize: '0.82rem', color: '#e2e8f0' }}>
        💡 <strong>El Desacoplamiento Fundamental:</strong> El <em>Frontend</em> trabaja siempre hacia el futuro de forma especulativa; el <em>Backend</em> resuelve el trabajo masivo fuera de orden y reconcilia el pasado de forma determinista.
      </div>
    </div>
  );
};

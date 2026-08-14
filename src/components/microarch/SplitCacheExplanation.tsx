import React from 'react';

export const SplitCacheExplanation: React.FC = () => {
  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* Top 2 Columns Comparison: Problem vs Solution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '0.8rem' }}>
        
        {/* Unified Cache Problem */}
        <div style={{
          background: 'rgba(248, 113, 113, 0.04)',
          border: '1px solid rgba(248, 113, 113, 0.25)',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="hpc-badge" style={{ background: 'rgba(248, 113, 113, 0.15)', color: '#f87171', border: '1px solid rgba(248, 113, 113, 0.3)' }}>
              Von Neumann Puro (Unificado)
            </span>
            <h4 style={{ margin: 0, fontSize: '0.98rem', color: '#ffffff' }}>❌ El Problema del Cuello de Botella</h4>
          </div>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            Si el procesador utiliza una sola caché unificada para código y datos:
          </p>
          <ul style={{ fontSize: '0.76rem', paddingLeft: '1rem', margin: '0.4rem 0 0 0', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <li><strong>Conflicto Estructural:</strong> En el mismo ciclo de reloj, la etapa de <em>Fetch (IF)</em> quiere leer una instrucción y la etapa de <em>Memoria (MEM)</em> quiere leer/escribir un dato.</li>
            <li><strong>Penalización:</strong> Provoca <strong>stalls obligados (burbujas)</strong> perdiendo hasta el 50% del rendimiento del pipeline.</li>
          </ul>
        </div>

        {/* Split Harvard Cache Solution */}
        <div style={{
          background: 'rgba(52, 211, 153, 0.04)',
          border: '1px solid rgba(52, 211, 153, 0.25)',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="hpc-badge" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
              Harvard Modificada (L1 Split)
            </span>
            <h4 style={{ margin: 0, fontSize: '0.98rem', color: '#ffffff' }}>✅ Solución: L1 I-Cache y L1 D-Cache</h4>
          </div>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            Las CPUs modernas dividen el nivel L1 en dos bloques físicos independientes:
          </p>
          <ul style={{ fontSize: '0.76rem', paddingLeft: '1rem', margin: '0.4rem 0 0 0', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <li><strong>L1 I-Cache (Instruction Cache ~32-64 KB):</strong> Dedicada al <em>Frontend</em>. Acceso 100% paralelo para alimentar el flujo de instrucciones.</li>
            <li><strong>L1 D-Cache (Data Cache ~32-64 KB):</strong> Dedicada al <em>Backend</em>. Conectada a las AGUs para lecturas y escrituras de variables.</li>
          </ul>
        </div>

      </div>

      {/* 3 Key Architectural Reasons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', textAlign: 'left' }}>
        <div className="hpc-card" style={{ padding: '0.85rem' }}>
          <strong style={{ fontSize: '0.82rem', color: '#38bdf8' }}>1. Duplicación de Ancho de Banda</strong>
          <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.74rem', color: '#cbd5e1', lineHeight: 1.35 }}>
            Permite 2 accesos concurrentes en el mismo ciclo sin arbitraje ni contención de bus entre Fetch y Load/Store.
          </p>
        </div>

        <div className="hpc-card" style={{ padding: '0.85rem' }}>
          <strong style={{ fontSize: '0.82rem', color: '#f4b860' }}>2. Silicio Especializado</strong>
          <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.74rem', color: '#cbd5e1', lineHeight: 1.35 }}>
            La <strong>I-Cache es de Solo Lectura</strong> (sin circuitos pesados de coherencia de escritura), siendo más rápida y densa. La <strong>D-Cache es Read/Write</strong> con protocolo MESI.
          </p>
        </div>

        <div className="hpc-card" style={{ padding: '0.85rem' }}>
          <strong style={{ fontSize: '0.82rem', color: '#34d399' }}>3. Cero Contaminación (Pollution)</strong>
          <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.74rem', color: '#cbd5e1', lineHeight: 1.35 }}>
            Procesar un arreglo masivo de datos en la D-Cache <strong>nunca expulsará el código del bucle activo</strong> de la I-Cache.
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

export const RobDiagram: React.FC = () => {
  const [selectedState, setSelectedState] = useState<'flow' | 'exceptions' | 'rollback'>('flow');

  const slots = [
    { id: 0, inst: 'LOAD R1, [0x1000]', state: 'Pending (DRAM Miss ~200c)', isHead: true, statusColor: '#94a3b8' },
    { id: 1, inst: 'ADD R4, R1, R2', state: 'Waiting R1 (Blocked)', isHead: false, statusColor: '#94a3b8' },
    { id: 2, inst: 'MUL R6, R7, R8', state: 'Finished (Ready to Commit)', isHead: false, statusColor: '#ffffff' },
    { id: 3, inst: 'FMA R9, R10, R11', state: 'Executing in FPU (In-Flight)', isHead: false, statusColor: '#ffffff' },
    { id: 4, inst: 'SUB R12, R13, R14', state: 'Allocated / Decoded', isHead: false, statusColor: '#cbd5e1', isTail: true },
  ];

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* Header & Mode Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1.05rem' }}>Anatomía del Reorder Buffer (ROB) y Ventana In-Flight</h4>
        
        <div style={{ display: 'flex', gap: '0.3rem', background: '#070a12', padding: '0.2rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setSelectedState('flow')}
            style={{
              padding: '0.3rem 0.7rem',
              borderRadius: '5px',
              border: 'none',
              background: selectedState === 'flow' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: selectedState === 'flow' ? '#ffffff' : '#94a3b8',
              fontWeight: selectedState === 'flow' ? 700 : 500,
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Flujo In-Flight
          </button>
          <button
            onClick={() => setSelectedState('exceptions')}
            style={{
              padding: '0.3rem 0.7rem',
              borderRadius: '5px',
              border: 'none',
              background: selectedState === 'exceptions' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: selectedState === 'exceptions' ? '#ffffff' : '#94a3b8',
              fontWeight: selectedState === 'exceptions' ? 700 : 500,
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Excepciones Precisas
          </button>
          <button
            onClick={() => setSelectedState('rollback')}
            style={{
              padding: '0.3rem 0.7rem',
              borderRadius: '5px',
              border: 'none',
              background: selectedState === 'rollback' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: selectedState === 'rollback' ? '#ffffff' : '#94a3b8',
              fontWeight: selectedState === 'rollback' ? 700 : 500,
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Rollback Especulativo
          </button>
        </div>
      </div>

      {/* Main Grid: FIFO Table on Left, Conceptual Breakdown on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.2rem', alignItems: 'start' }}>
        
        {/* Visual FIFO Queue */}
        <div style={{ background: '#070a12', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
            <span>Buffer Circular FIFO (512 entradas en CPUs modernas)</span>
            <span>Ventana In-Flight</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {slots.map((slot) => (
              <div
                key={slot.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.45rem 0.8rem',
                  borderRadius: '5px',
                  border: slot.isHead ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-code)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.7rem', width: '16px' }}>#{slot.id}</span>
                  <span style={{ color: '#ffffff', fontWeight: 600 }}>{slot.inst}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>{slot.state}</span>
                  {slot.isHead && <span className="hpc-badge" style={{ margin: 0, padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>HEAD</span>}
                  {slot.isTail && <span className="hpc-badge" style={{ margin: 0, padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>TAIL</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Info Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {selectedState === 'flow' && (
            <>
              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '0.95rem' }}>¿Qué es una Instrucción "In-Flight"?</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  Una instrucción está <strong>in-flight</strong> desde que entra al ROB en el Frontend hasta que se retira (Commit) en el Backend. Durante este tiempo, calcula sus resultados de forma especulativa en registros físicos temporales.
                </p>
              </div>

              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Tolerancia a Latencias de Memoria</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  Si la instrucción de la cabeza (HEAD) sufre un fallo de caché DRAM (~200 ciclos), el procesador <strong>continúa ejecutando cientos de instrucciones independientes in-flight</strong> hasta llenar el ROB.
                </p>
              </div>
            </>
          )}

          {selectedState === 'exceptions' && (
            <>
              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Excepciones Precisas</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  Si una instrucción genera una excepción (ej. división por cero o fallo de página), el fallo <strong>no se dispara de inmediato</strong>. Espera a que la instrucción llegue a la cabeza del ROB (Commit).
                </p>
              </div>

              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Garantía de Estado Secuencial</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  Si la instrucción culpable pertenecía a una rama especulativa descartada, la excepción se purga silenciosamente sin corromper el sistema operativo.
                </p>
              </div>
            </>
          )}

          {selectedState === 'rollback' && (
            <>
              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Rollback en 1 Ciclo</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  Ante una predicción de salto fallida (Branch Misprediction), el procesador ajusta el puntero de cola (TAIL) del ROB hasta el salto, <strong>descartando todas las instrucciones especulativas in-flight</strong> instantáneamente.
                </p>
              </div>

              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Evolución del Tamaño del ROB</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  • Intel Skylake (2015): 224 entradas.<br />
                  • AMD Zen 4 (2022): 320 entradas.<br />
                  • Intel Raptor Lake (2022): 512 entradas.<br />
                  • Apple M4 / Zen 5 (2024): 600+ entradas in-flight.
                </p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

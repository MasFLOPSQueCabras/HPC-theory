import React, { useState } from 'react';

export const BackendDetail: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<number>(0);

  const blocks = [
    {
      title: '1. Issue Queue (RS)',
      badge: 'Estaciones de Reserva',
      headline: 'Espera Dinámica y Despacho Fuera de Orden',
      detail: 'Las micro-operaciones entran a las Reservation Stations (RS / Issue Queue). En lugar de esperar en orden secuencial, el hardware monitoriza continuamente los registros fuente. En cuanto los operandos de una instrucción están disponibles, se despacha inmediatamente hacia un puerto libre.',
      specs: '• Capacidad Issue Queue: 120 - 180 entradas | • Despacho: Fuera de orden (OoO)'
    },
    {
      title: '2. Puertos de Ejecución',
      badge: 'ALUs / FPUs / AGUs',
      headline: 'Unidades Funcionales Paralelas de Alto Rendimiento',
      detail: 'La CPU cuenta con una matriz de 10 a 16 puertos de ejecución paralelos divididos en: ALUs de enteros (sumas, lógica, saltos), unidades vectoriales FP/SIMD/FMA (operaciones AVX-512 / matrices) y AGUs (Address Generation Units) dedicadas a cargas (Load) y escrituras (Store) de memoria.',
      specs: '• Puertos: 12 a 16 vías paralelas | • Throughput: Múltiples FLOPs/ciclo'
    },
    {
      title: '3. Common Data Bus',
      badge: 'CDB / Fast Bypass',
      headline: 'Reenvío Instantáneo de Resultados sin Latencia de Memoria',
      detail: 'Cuando una unidad funcional completa un cálculo, difunde el valor resultante y la etiqueta del registro físico por el Common Data Bus (CDB). Las instrucciones en las Estaciones de Reserva capturan el dato directamente en el ciclo inmediato (Data Forwarding), evitando pasar por la RAM.',
      specs: '• Latencia de bypass: 0 ciclos adicionales | • Red de difusión interna'
    },
    {
      title: '4. Reorder Buffer (ROB)',
      badge: 'In-Order Commit',
      headline: 'Retiro en Orden Estricto y Excepciones Precisas',
      detail: 'Aunque las instrucciones se ejecutan de forma desordenada en el núcleo, se registran en una cola circular FIFO llamada Reorder Buffer (ROB de 320 a 512 entradas). Solo cuando una instrucción llega a la cabeza del ROB se confirman sus resultados de forma permanente (Commit), garantizando un estado coherente.',
      specs: '• Tamaño ROB: 320 - 512+ entradas in-flight | • Tasa de Retiro: 6 a 8 μops/ciclo'
    }
  ];

  const current = blocks[selectedBlock];

  return (
    <div style={{ background: 'rgba(244, 184, 96, 0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(244, 184, 96, 0.25)' }}>
      {/* Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '0.8rem' }}>
        {blocks.map((b, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedBlock(idx)}
            style={{
              background: selectedBlock === idx ? 'rgba(244, 184, 96, 0.2)' : '#070a12',
              border: selectedBlock === idx ? '1px solid #f4b860' : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '7px',
              padding: '0.6rem 0.5rem',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: selectedBlock === idx ? '#f4b860' : '#cbd5e1' }}>
              {b.title}
            </div>
            <div style={{ fontSize: '0.64rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              {b.badge}
            </div>
          </button>
        ))}
      </div>

      {/* Main Content Box */}
      <div style={{ background: '#070a12', padding: '1rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.4rem' }}>
          <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#ffffff' }}>{current.headline}</h4>
          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-code)', color: '#f4b860' }}>
            {current.specs}
          </span>
        </div>

        <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5 }}>
          {current.detail}
        </p>
      </div>

      {/* Bottom Layout of Ports */}
      <div style={{ marginTop: '0.8rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
        <div style={{ background: '#0b0f19', padding: '0.45rem 0.6rem', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 'bold', color: '#ffffff' }}>ALUs de Enteros</div>
          <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>4-6 Puertos (Aritmética / Saltos)</div>
        </div>
        <div style={{ background: '#0b0f19', padding: '0.45rem 0.6rem', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 'bold', color: '#ffffff' }}>Unidades FP / SIMD / FMA</div>
          <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>2-4 Puertos Vectoriales (AVX-512)</div>
        </div>
        <div style={{ background: '#0b0f19', padding: '0.45rem 0.6rem', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 'bold', color: '#ffffff' }}>AGUs (Load / Store)</div>
          <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>3-4 Puertos (Memoria L1D / DRAM)</div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

export const FrontendDetail: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<number>(0);

  const blocks = [
    {
      title: '1. Fetch & L1 I-Cache',
      badge: 'IFU / ITLB',
      headline: 'Lectura de Instrucciones y Traducción de Direcciones',
      detail: 'El Instruction Fetch Unit (IFU) consulta el Program Counter (PC) y extrae de 32 a 64 bytes contiguos por ciclo desde la L1 Instruction Cache (Caché L1 de Instrucciones) asistido por el ITLB (Instruction Translation Lookaside Buffer) para la resolución de direcciones virtuales a físicas.',
      specs: '• Ancho de banda: 32 - 64 B/ciclo | • Latencia típica: 3 a 4 ciclos de reloj'
    },
    {
      title: '2. Branch Predictor',
      badge: 'BPU / TAGE / BTB',
      headline: 'Predicción Especulativa de Bifurcaciones y Saltos',
      detail: 'Para evitar que el pipeline se vacíe (Pipeline Flush con penalización de 15 a 20 ciclos), la Branch Prediction Unit (BPU) utiliza el BTB (Branch Target Buffer) y algoritmos avanzados TAGE para predecir si un salto se toma o no y a qué dirección saltar con una precisión superior al 98%.',
      specs: '• Algoritmo TAGE / Red Neuronal Perceptrón | • Precisión típica: >98%'
    },
    {
      title: '3. Decoder & μop Cache',
      badge: 'Macro &rarr; &mu;ops',
      headline: 'Decodificación a Micro-operaciones Regulares',
      detail: 'Las instrucciones complejas del ISA (CISC x86 o ARMv9) se traducen en micro-operaciones elementales (μops) de formato RISC. Los procesadores modernos incorporan una μop Cache (L0) que almacena bucles calientes ya decodificados, apagando los decodificadores para ahorrar hasta un 40% de energía.',
      specs: '• Tasa de decodificación: 6 a 8 μops/ciclo | • Tamaño μop Cache: 1.5K - 4K μops'
    },
    {
      title: '4. Register Renaming',
      badge: 'RAT &bull; Mapeo ARF &rarr; PRF',
      headline: 'Eliminación Dinámica de Falsas Dependencias (WAR / WAW)',
      detail: 'La Register Alias Table (RAT) renombra los registros arquitecturales visibles (ARF, ej. 16 registros x86) asignándolos a un banco masivo de registros físicos en silicio (PRF, 256+ registros). Esto permite que instrucciones con falsas dependencias de nombre se ejecuten en paralelo sin colisionar.',
      specs: '• Registros Físicos (PRF): 220 a 350+ entradas | • Elimina: WAR y WAW'
    }
  ];

  const current = blocks[selectedBlock];

  return (
    <div style={{ background: 'rgba(56, 189, 248, 0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
      {/* Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '0.8rem' }}>
        {blocks.map((b, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedBlock(idx)}
            style={{
              background: selectedBlock === idx ? 'rgba(56, 189, 248, 0.2)' : '#070a12',
              border: selectedBlock === idx ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '7px',
              padding: '0.6rem 0.5rem',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: selectedBlock === idx ? '#38bdf8' : '#cbd5e1' }}>
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
          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-code)', color: '#38bdf8' }}>
            {current.specs}
          </span>
        </div>

        <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5 }}>
          {current.detail}
        </p>
      </div>

      {/* Bottom Dispatch Indicator */}
      <div style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0b0f19', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.76rem', color: '#94a3b8' }}>
        <span><strong>Flujo del Frontend:</strong> L1 I-Cache &rarr; Fetch Buffer &rarr; BPU &rarr; Decodificadores &rarr; RAT</span>
        <span style={{ color: '#38bdf8', fontWeight: 600 }}>&rarr; Despacho de 6-8 &mu;ops/ciclo al Backend</span>
      </div>
    </div>
  );
};

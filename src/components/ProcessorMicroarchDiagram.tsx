import React, { useState } from 'react';

export const ProcessorMicroarchDiagram: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      id: 0,
      title: '1. Fetch & BPU',
      sub: 'Frontend (In-Order)',
      name: 'Instruction Fetch y Predicción de Saltos (BPU / TAGE / BTB)',
      section: 'frontend',
      desc: 'El PC (Program Counter) busca la siguiente dirección en la L1 I-Cache (Caché de Instrucciones) y el ITLB. La BPU (Branch Prediction Unit) con el predictor TAGE y el BTB (Branch Target Buffer) predice ramas condicionales con >98% de precisión para mantener el pipeline lleno sin esperar a la ejecución.',
      specs: '• Ancho de búsqueda: 32 - 64 Bytes/ciclo | • Latencia L1 I-Cache: ~3 ciclos'
    },
    {
      id: 1,
      title: '2. Decode & μops',
      sub: 'Frontend (In-Order)',
      name: 'Decodificación de Instrucciones Complejas a Micro-operaciones (μops)',
      section: 'frontend',
      desc: 'Las instrucciones complejas del ISA (ej. x86 CISC o ARMv9) se descomponen en micro-operaciones elementales (μops) de formato regular tipo RISC. Muchas CPUs modernas cuentan con una Micro-Op Cache (L0 μop cache) para omitir la etapa de decodificación en bucles calientes.',
      specs: '• Decodificador: 6 a 8 vías (μops/ciclo) | • μop Cache: ~1.5K - 4K μops'
    },
    {
      id: 2,
      title: '3. Rename (RAT)',
      sub: 'Frontend (In-Order)',
      name: 'Register Renaming mediante la RAT (Register Alias Table)',
      section: 'frontend',
      desc: 'Mapea los registros lógicos del programador (ARF - Architectural Register File, ej. RAX, R1) a un conjunto mucho mayor de registros físicos en silicio (PRF - Physical Register File, ej. P0 a P255). Esto ELIMINA por completo las falsas dependencias de datos WAR y WAW.',
      specs: '• RAT: Tabla de traducción dinámica | • PRF: 200 - 350+ registros físicos'
    },
    {
      id: 3,
      title: '4. OoO Dispatch & Exec',
      sub: 'Backend (Out-of-Order)',
      name: 'Despacho y Ejecución Dinámica Fuera de Orden (RS / Puertos / ALUs / FPUs)',
      section: 'backend_ooo',
      desc: 'Las μops esperan en las Estaciones de Reserva (RS / Issue Queue). En cuanto sus operandos fuente están disponibles (sin importar el orden original del programa), se despachan inmediatamente a los puertos de ejecución: ALUs para enteros, unidades FP/SIMD/FMA para vectores y AGUs para memoria.',
      specs: '• Issue Queue: 120 - 180 entradas | • Puertos de Ejecución: 10 - 16 puertos paralelos'
    },
    {
      id: 4,
      title: '5. CDB Fast Bypass',
      sub: 'Backend (Out-of-Order)',
      name: 'Reenvío Rápido de Resultados por el CDB (Common Data Bus)',
      section: 'backend_ooo',
      desc: 'En cuanto una ALU o FPU produce un resultado, este se difunde a través del CDB (Bus Común de Datos) directamente a las entradas de las Estaciones de Reserva que estaban esperando ese dato, despertando instrucciones dependientes en el ciclo inmediato (Data Forwarding / Bypass).',
      specs: '• Latencia de bypass: 0 ciclos adicionales | • Red de broadcast multi-puerto'
    },
    {
      id: 5,
      title: '6. In-Order Commit (ROB)',
      sub: 'Backend (In-Order)',
      name: 'Retiro en Orden y Excepciones Precisas en el ROB (Reorder Buffer)',
      section: 'backend_retire',
      desc: 'Aunque las instrucciones se ejecutan fuera de orden, se retiran (Commit) estrictamente en el orden original del programa dentro de una cola circular FIFO llamada ROB (Reorder Buffer). Esto garantiza que el estado de la memoria y los registros sea siempre determinista y que las excepciones sean precisas.',
      specs: '• Capacidad ROB: 320 - 512+ entradas in-flight | • Tasa de Retiro: 6 - 8 μops/ciclo'
    }
  ];

  const current = stages[activeStage];

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* Header & Step Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.7rem', flexWrap: 'wrap', gap: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="hpc-badge" style={{ margin: 0, fontSize: '0.7rem' }}>Microarquitectura Completa</span>
          <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1rem' }}>Anatomía de una CPU Moderna Superescalar Out-of-Order</h4>
        </div>

        {/* Stage Buttons */}
        <div style={{ display: 'flex', gap: '0.25rem', background: '#070a12', padding: '0.2rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {stages.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveStage(idx)}
              style={{
                padding: '0.25rem 0.55rem',
                borderRadius: '4px',
                border: 'none',
                background: activeStage === idx ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
                color: activeStage === idx ? '#ffffff' : '#94a3b8',
                fontWeight: activeStage === idx ? 700 : 500,
                fontSize: '0.7rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Structural Layout: FRONTEND vs BACKEND */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '0.8rem', marginBottom: '0.7rem' }}>
        
        {/* ================= 1. FRONTEND CONTAINER (IN-ORDER) ================= */}
        <div style={{
          background: 'rgba(56, 189, 248, 0.03)',
          border: activeStage <= 2 ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '8px',
          padding: '0.7rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          transition: 'all 0.2s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.04em' }}>
              FRONTEND (In-Order / En Orden)
            </span>
            <span className="hpc-badge" style={{ margin: 0, fontSize: '0.62rem', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
              Fetch &bull; Decode &bull; Rename
            </span>
          </div>

          {/* Block 1: BPU + Fetch */}
          <div style={{
            background: activeStage === 0 ? 'rgba(56, 189, 248, 0.15)' : '#0b0f19',
            border: activeStage === 0 ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.06)',
            padding: '0.5rem 0.6rem',
            borderRadius: '6px',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '0.76rem', color: '#ffffff' }}>Instruction Fetch (IFU) + BPU</strong>
              <span style={{ fontSize: '0.64rem', color: '#94a3b8' }}>Predictor TAGE / BTB</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
              Lee instrucciones desde <strong>L1 I-Cache &amp; ITLB</strong>; anticipa saltos con la BPU para guiar el flujo.
            </div>
          </div>

          {/* Block 2: Decode & uOp Cache */}
          <div style={{
            background: activeStage === 1 ? 'rgba(56, 189, 248, 0.15)' : '#0b0f19',
            border: activeStage === 1 ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.06)',
            padding: '0.5rem 0.6rem',
            borderRadius: '6px',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '0.76rem', color: '#ffffff' }}>Instruction Decoder &amp; μop Cache</strong>
              <span style={{ fontSize: '0.64rem', color: '#94a3b8' }}>6 a 8 μops / ciclo</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
              Traduce instrucciones macro del ISA (x86/ARM) en <strong>micro-operaciones (μops)</strong> elementales.
            </div>
          </div>

          {/* Block 3: Register Renaming & RAT */}
          <div style={{
            background: activeStage === 2 ? 'rgba(56, 189, 248, 0.15)' : '#0b0f19',
            border: activeStage === 2 ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.06)',
            padding: '0.5rem 0.6rem',
            borderRadius: '6px',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '0.76rem', color: '#ffffff' }}>Register Renaming (RAT)</strong>
              <span style={{ fontSize: '0.64rem', color: '#38bdf8' }}>Elimina WAR y WAW</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
              La <strong>RAT (Register Alias Table)</strong> mapea registros arquitecturales (ARF) a registros físicos (PRF).
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.68rem', color: '#94a3b8', padding: '0.2rem', background: '#070a12', borderRadius: '4px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            &darr; Despacho / Allocation hacia el Backend &darr;
          </div>
        </div>

        {/* ================= 2. BACKEND CONTAINER (OUT-OF-ORDER & RETIRE) ================= */}
        <div style={{
          background: 'rgba(244, 184, 96, 0.03)',
          border: activeStage >= 3 ? '1px solid rgba(244, 184, 96, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '8px',
          padding: '0.7rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          transition: 'all 0.2s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f4b860', letterSpacing: '0.04em' }}>
              BACKEND (Out-of-Order Core &amp; In-Order Commit)
            </span>
            <span className="hpc-badge" style={{ margin: 0, fontSize: '0.62rem', background: 'rgba(244, 184, 96, 0.1)', color: '#f4b860', border: '1px solid rgba(244, 184, 96, 0.25)' }}>
              Execution Engine &bull; ROB Commit
            </span>
          </div>

          {/* Sub-block: Reservation Stations + Execution Ports */}
          <div style={{
            background: (activeStage === 3 || activeStage === 4) ? 'rgba(244, 184, 96, 0.12)' : '#0b0f19',
            border: (activeStage === 3 || activeStage === 4) ? '1px solid #f4b860' : '1px solid rgba(255,255,255,0.06)',
            padding: '0.5rem 0.6rem',
            borderRadius: '6px',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '0.76rem', color: '#ffffff' }}>Estaciones de Reserva (RS / Issue Queue) &amp; PRF</strong>
              <span style={{ fontSize: '0.64rem', color: '#f4b860' }}>Ejecución Fuera de Orden</span>
            </div>
            
            {/* Functional Units Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem', marginTop: '0.35rem' }}>
              <div style={{ background: '#070a12', padding: '0.3rem', borderRadius: '4px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 'bold', color: '#ffffff' }}>ALUs Enteros</div>
                <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>4-6 Puertos Int</div>
              </div>
              <div style={{ background: '#070a12', padding: '0.3rem', borderRadius: '4px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 'bold', color: '#ffffff' }}>FP / SIMD / FMA</div>
                <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>2-4 Puertos Vector</div>
              </div>
              <div style={{ background: '#070a12', padding: '0.3rem', borderRadius: '4px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 'bold', color: '#ffffff' }}>AGUs (Load/Store)</div>
                <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>3-4 Puertos Mem</div>
              </div>
            </div>

            {/* CDB Fast Bypass indicator */}
            <div style={{
              marginTop: '0.35rem',
              background: activeStage === 4 ? 'rgba(52, 211, 153, 0.15)' : '#070a12',
              border: activeStage === 4 ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.05)',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.66rem',
              color: activeStage === 4 ? '#34d399' : '#cbd5e1',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span><strong>CDB (Common Data Bus):</strong> Bypass de datos inmediato a la Issue Queue</span>
              <span style={{ fontSize: '0.6rem' }}>0 ciclos de espera</span>
            </div>
          </div>

          {/* Sub-block: ROB & Commit */}
          <div style={{
            background: activeStage === 5 ? 'rgba(244, 184, 96, 0.15)' : '#0b0f19',
            border: activeStage === 5 ? '1px solid #f4b860' : '1px solid rgba(255,255,255,0.06)',
            padding: '0.5rem 0.6rem',
            borderRadius: '6px',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '0.76rem', color: '#ffffff' }}>Reorder Buffer (ROB) &amp; Commit Unit</strong>
              <span style={{ fontSize: '0.64rem', color: '#f4b860' }}>Retiro Estricto In-Order</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
              Buffer circular FIFO (320 - 512 entradas). Las instrucciones confirman su resultado final en memoria / registros arquitecturales en orden estricto, garantizando <strong>excepciones precisas</strong>.
            </div>
          </div>
        </div>

      </div>

      {/* Dynamic Detail Card for Selected Stage */}
      <div style={{
        background: '#070a12',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '0.65rem 0.9rem',
        borderRadius: '7px',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="hpc-badge" style={{ margin: 0, fontSize: '0.65rem', background: current.section === 'frontend' ? 'rgba(56,189,248,0.1)' : 'rgba(244,184,96,0.1)', color: current.section === 'frontend' ? '#38bdf8' : '#f4b860' }}>
              {current.sub}
            </span>
            <strong style={{ fontSize: '0.84rem', color: '#ffffff' }}>{current.name}</strong>
          </div>
          <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-code)', color: '#94a3b8' }}>
            {current.specs}
          </span>
        </div>

        <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
          {current.desc}
        </p>
      </div>
    </div>
  );
};

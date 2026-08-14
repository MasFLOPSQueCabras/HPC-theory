import React, { useState } from 'react';

export const HazardsDiagram: React.FC = () => {
  const [activeHazard, setActiveHazard] = useState<'RAW' | 'WAR' | 'WAW' | 'RAR'>('RAW');

  const hazardData = {
    RAW: {
      name: 'RAW (Read-After-Write)',
      type: 'Dependencia Verdadera (True Dependency)',
      isHazard: true,
      severity: 'Crítico',
      i1: 'ADD R1, R2, R3  ; Escribe en R1',
      i2: 'SUB R4, R1, R5  ; Lee R1 (debe esperar a I1)',
      targetReg: 'R1',
      desc: 'I2 intenta leer R1 antes de que I1 escriba su resultado final. Es una dependencia de datos real e inherente al algoritmo.',
      inOrderSol: 'Data Forwarding (Bypass directo desde ALU) o inserción de Stalls (Burbujas si depende de un Load de memoria).',
      oooSol: 'Despacho dinámico: I2 espera en la Estación de Reserva (Issue Queue) hasta que I1 transmita el resultado por el CDB (Common Data Bus / Bus Común de Datos).'
    },
    WAR: {
      name: 'WAR (Write-After-Read)',
      type: 'Antidependencia (Falsa Dependencia de Nombre)',
      isHazard: true,
      severity: 'Exclusivo de Out-of-Order',
      i1: 'ADD R4, R1, R5  ; Lee R1',
      i2: 'SUB R1, R2, R3  ; Escribe en R1 (no debe sobreescribir antes de que I1 lea)',
      targetReg: 'R1',
      desc: 'I2 intenta escribir en R1 antes de que I1 haya leído el valor previo. No existe en pipelines In-Order simples.',
      inOrderSol: 'No es un problema en In-Order porque las lecturas en ID ocurren estrictamente antes que los Writebacks.',
      oooSol: 'Register Renaming mediante RAT (Register Alias Table): Mapea R1 a registros físicos distintos en el PRF (Physical Register File, ej. P12 y P19).'
    },
    WAW: {
      name: 'WAW (Write-After-Write)',
      type: 'Dependencia de Salida (Output Dependency)',
      isHazard: true,
      severity: 'Exclusivo de Out-of-Order / Pipelines Múltiples',
      i1: 'ADD R1, R2, R3  ; Escribe en R1 (latencia larga)',
      i2: 'SUB R1, R4, R5  ; Escribe en R1 (latencia corta, podría terminar antes)',
      targetReg: 'R1',
      desc: 'I2 intenta escribir en R1 antes que I1. Si I2 adelanta a I1, el valor final en R1 quedaría corrupto.',
      inOrderSol: 'No ocurre en In-Order de latencia fija, ya que todas las escrituras a registros siguen el orden del programa.',
      oooSol: 'Register Renaming (RAT) + ROB (Reorder Buffer): Asigna registros físicos separados y asegura que el commit final respete el flujo del programa.'
    },
    RAR: {
      name: 'RAR (Read-After-Read)',
      type: 'Lectura Concurrente (No es un Hazard)',
      isHazard: false,
      severity: 'Sin Conflicto',
      i1: 'ADD R4, R1, R2  ; Lee R1',
      i2: 'SUB R5, R1, R3  ; Lee R1 simultáneamente',
      targetReg: 'R1',
      desc: 'Ambas instrucciones leen el mismo registro fuente R1 sin modificarlo. No hay conflicto de dependencias.',
      inOrderSol: 'Se ejecuta en paralelo sin ninguna penalización.',
      oooSol: 'Múltiples puertos de lectura en el banco de registros físicos (PRF - Physical Register File) sirven el operando a ambas unidades simultáneamente.'
    }
  };

  const current = hazardData[activeHazard];

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* Selector Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1.05rem' }}>Clasificación de Dependencias de Datos (Hazards)</h4>
        
        <div style={{ display: 'flex', gap: '0.3rem', background: '#070a12', padding: '0.2rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {(['RAW', 'WAR', 'WAW', 'RAR'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setActiveHazard(key)}
              style={{
                padding: '0.3rem 0.8rem',
                borderRadius: '5px',
                border: 'none',
                background: activeHazard === key ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: activeHazard === key ? '#ffffff' : '#94a3b8',
                fontWeight: activeHazard === key ? 700 : 500,
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.2rem', alignItems: 'start' }}>
        
        {/* Left: Code Snippet & Visual Flow */}
        <div style={{ background: '#070a12', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Flujo de Ensamblador</span>
            <span style={{ fontSize: '0.72rem', color: current.isHazard ? '#ffffff' : '#94a3b8' }}>
              {current.type}
            </span>
          </div>

          <pre style={{ margin: 0, fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: '#f8fafc', lineHeight: 1.6 }}>
            <div><span style={{ color: '#94a3b8' }}>I1:</span> {current.i1}</div>
            <div><span style={{ color: '#94a3b8' }}>I2:</span> {current.i2}</div>
          </pre>

          {/* SVG Arrow Representation */}
          <div style={{ marginTop: '0.8rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', padding: '0.6rem', borderRadius: '6px' }}>
            <svg viewBox="0 0 260 50" style={{ width: '100%', height: '45px' }}>
              <rect x="10" y="8" width="80" height="34" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.15)" />
              <text x="50" y="29" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">I1 (Inst 1)</text>

              {/* Arrow */}
              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#94a3b8" />
                </marker>
              </defs>
              <line x1="95" y1="25" x2="160" y2="25" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray={current.isHazard ? 'none' : '3 3'} />
              <text x="130" y="16" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">{activeHazard}</text>

              <rect x="170" y="8" width="80" height="34" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.15)" />
              <text x="210" y="29" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">I2 (Inst 2)</text>
            </svg>
          </div>
        </div>

        {/* Right: Technical Explanation in In-Order vs Out-of-Order */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <div style={{ background: '#0b0f19', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.2rem' }}>
              {current.name}
            </div>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              {current.desc}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            <div style={{ background: '#0b0f19', padding: '0.7rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 'bold', color: '#ffffff' }}>En Pipeline In-Order:</div>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.72rem', color: '#9ca3af', lineHeight: 1.35 }}>
                {current.inOrderSol}
              </p>
            </div>

            <div style={{ background: '#0b0f19', padding: '0.7rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 'bold', color: '#ffffff' }}>En Motor Out-of-Order (OoO):</div>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.72rem', color: '#9ca3af', lineHeight: 1.35 }}>
                {current.oooSol}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

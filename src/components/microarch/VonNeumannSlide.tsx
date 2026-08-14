import React from 'react';
import { Math } from '../Math';

export const VonNeumannSlide: React.FC = () => {
  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.4rem', alignItems: 'center' }}>
        
        {/* Left: Diagram */}
        <div style={{ background: '#070a12', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(248, 113, 113, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span className="hpc-badge" style={{ background: 'rgba(248, 113, 113, 0.15)', color: '#f87171', border: '1px solid rgba(248, 113, 113, 0.3)' }}>
              1945 &bull; John von Neumann
            </span>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Bus Único Compartido</span>
          </div>

          <svg viewBox="0 0 340 120" style={{ width: '100%', height: '110px' }}>
            {/* CPU Box */}
            <rect x="10" y="20" width="100" height="80" rx="6" fill="#1e293b" stroke="#f87171" strokeWidth="2" />
            <text x="60" y="45" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">CPU Core</text>
            <text x="60" y="65" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Unidad de Control</text>
            <text x="60" y="80" fill="#94a3b8" fontSize="8.5" textAnchor="middle">ALU + Registros</text>

            {/* Shared Bus */}
            <line x1="110" y1="60" x2="205" y2="60" stroke="#f87171" strokeWidth="3" />
            <polygon points="203,55 212,60 203,65" fill="#f87171" />
            <polygon points="112,55 103,60 112,65" fill="#f87171" />
            <text x="157" y="48" fill="#f87171" fontSize="8.5" fontWeight="bold" textAnchor="middle">Bus Único</text>
            <text x="157" y="78" fill="#94a3b8" fontSize="7.5" textAnchor="middle">Compartido</text>

            {/* Unified Memory Box */}
            <rect x="212" y="20" width="118" height="80" rx="6" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="271" y="42" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">Memoria Unificada</text>
            <line x1="222" y1="52" x2="320" y2="52" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="271" y="68" fill="#38bdf8" fontSize="8.5" textAnchor="middle">Instrucciones (Código)</text>
            <text x="271" y="86" fill="#f4b860" fontSize="8.5" textAnchor="middle">Datos (Variables)</text>
          </svg>
        </div>

        {/* Right: Technical Characteristics */}
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div className="hpc-card" style={{ padding: '0.9rem' }}>
            <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Principio de Diseño</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              Las instrucciones del programa y los datos residen en el <strong>mismo espacio físico de direcciones</strong> y comparten los mismos buses de datos y control.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '0.9rem', borderLeft: '3px solid #f87171' }}>
            <h4 style={{ margin: '0 0 0.3rem 0', color: '#f87171', fontSize: '0.95rem' }}>⚠️ El Cuello de Botella de Von Neumann</h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              En un instante de tiempo <Math math="t" />, la CPU solo puede transferir <strong>una instrucción O un dato</strong> a través del bus compartido. La velocidad de cómputo queda estrangulada por el caudal del canal de memoria único.
            </p>
          </div>
        </div>

      </div>

      <div style={{ marginTop: '0.8rem', background: '#070a12', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center' }}>
        🏛️ <strong>Uso actual:</strong> Estándar universal para la <strong>Memoria RAM Principal</strong> y almacenamiento secundario por su bajo costo de cableado y flexibilidad de asignación.
      </div>
    </div>
  );
};

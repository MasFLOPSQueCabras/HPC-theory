import React, { useState } from 'react';

export const ScalingChart: React.FC = () => {
  const [serialFraction, setSerialFraction] = useState<number>(0.05); // 5% serial fraction

  const processors = [1, 2, 4, 8, 16, 32, 64, 128];

  // Amdahl's Law: Speedup = 1 / ((1-p) + p/P) where s = serialFraction = 1-p
  const amdahlSpeedup = processors.map(p => 1 / (serialFraction + (1 - serialFraction) / p));

  // Gustafson's Law: Scaled Speedup = P - s*(P-1) = 1 + (P - 1) * p
  const gustafsonSpeedup = processors.map(p => p - serialFraction * (p - 1));

  const maxSpeedup = 128;

  return (
    <div style={{ background: 'var(--hpc-card-bg)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--hpc-card-border)', backdropFilter: 'blur(12px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h4 style={{ margin: 0, color: 'var(--hpc-primary)', fontSize: '1.1rem' }}>Comparativa: Ley de Amdahl vs Ley de Gustafson</h4>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
          <span style={{ color: '#f87171', fontWeight: 'bold' }}>─ Amdahl (Fuerte)</span>
          <span style={{ color: '#34d399', fontWeight: 'bold' }}>─ Gustafson (Débil)</span>
          <span style={{ color: 'var(--hpc-muted)' }}>┄ Ideal (P)</span>
        </div>
      </div>

      <svg viewBox="0 0 500 220" style={{ width: '100%', height: '200px' }}>
        {/* Grid lines */}
        <line x1="50" y1="180" x2="470" y2="180" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
        <line x1="50" y1="20" x2="50" y2="180" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />

        {/* Labels */}
        <text x="260" y="210" fill="var(--hpc-muted)" fontSize="11" textAnchor="middle">Número de Procesadores / Núcleos (P)</text>
        <text x="15" y="100" fill="var(--hpc-muted)" fontSize="11" textAnchor="middle" transform="rotate(-90 15 100)">Aceleración (Speedup)</text>

        {/* Ideal linear scaling */}
        <line x1="50" y1="180" x2="470" y2="20" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Amdahl's Law Polyline */}
        {(() => {
          const points = processors.map((_, i) => {
            const x = 50 + (i / (processors.length - 1)) * 420;
            const y = 180 - (amdahlSpeedup[i] / maxSpeedup) * 160;
            return `${x},${y}`;
          }).join(' ');
          return <polyline fill="none" stroke="#f87171" strokeWidth="3" points={points} />;
        })()}

        {/* Gustafson's Law Polyline */}
        {(() => {
          const points = processors.map((_, i) => {
            const x = 50 + (i / (processors.length - 1)) * 420;
            const y = 180 - (gustafsonSpeedup[i] / maxSpeedup) * 160;
            return `${x},${y}`;
          }).join(' ');
          return <polyline fill="none" stroke="#34d399" strokeWidth="3" points={points} />;
        })()}
      </svg>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem', background: '#080d1a', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <label style={{ fontSize: '0.85rem', color: '#e5e7eb', flexShrink: 0 }}>
          Fracción Secuencial (s): <strong style={{ color: '#ffffff' }}>{(serialFraction * 100).toFixed(1)}%</strong>
        </label>
        <input
          type="range"
          min="0.01"
          max="0.25"
          step="0.01"
          value={serialFraction}
          onChange={(e) => setSerialFraction(parseFloat(e.target.value))}
          style={{ flexGrow: 1, accentColor: '#f4b860', cursor: 'pointer' }}
        />
        <span style={{ fontSize: '0.75rem', color: 'var(--hpc-muted)' }}>
          Límite máximo Amdahl: <strong style={{ color: '#fff' }}>{(1 / serialFraction).toFixed(1)}x</strong>
        </span>
      </div>
    </div>
  );
};

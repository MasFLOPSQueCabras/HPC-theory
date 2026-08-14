import React, { useState } from 'react';

export const NumaDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'UMA' | 'NUMA'>('NUMA');

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* Header & Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1.05rem' }}>Topología de Arquitectura de Memoria</h4>
        
        <div style={{ display: 'flex', gap: '0.3rem', background: '#070a12', padding: '0.2rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setActiveTab('UMA')}
            style={{
              padding: '0.3rem 0.8rem',
              borderRadius: '5px',
              border: 'none',
              background: activeTab === 'UMA' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: activeTab === 'UMA' ? '#ffffff' : '#94a3b8',
              fontWeight: activeTab === 'UMA' ? 700 : 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            UMA (Acceso Uniforme)
          </button>
          <button
            onClick={() => setActiveTab('NUMA')}
            style={{
              padding: '0.3rem 0.8rem',
              borderRadius: '5px',
              border: 'none',
              background: activeTab === 'NUMA' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: activeTab === 'NUMA' ? '#ffffff' : '#94a3b8',
              fontWeight: activeTab === 'NUMA' ? 700 : 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            NUMA (Acceso No Uniforme)
          </button>
        </div>
      </div>

      {activeTab === 'UMA' ? (
        <div>
          <div style={{ background: '#070a12', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <svg viewBox="0 0 600 170" style={{ width: '100%', height: '170px' }}>
              {/* 4 CPU Cores */}
              {[0, 1, 2, 3].map((core) => (
                <g key={core}>
                  <rect x={40 + core * 140} y="15" width="105" height="34" rx="5" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
                  <text x={92 + core * 140} y="36" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">Núcleo {core}</text>
                  
                  {/* Vertical line to bus */}
                  <line x1={92 + core * 140} y1="49" x2={92 + core * 140} y2="78" stroke="#94a3b8" strokeWidth="1.5" />
                </g>
              ))}

              {/* Shared Bus */}
              <rect x="30" y="78" width="540" height="22" rx="4" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" />
              <text x="300" y="93" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                Bus de Memoria Central Compartido (Idéntica Latencia para Todos)
              </text>

              {/* Line from Bus to RAM */}
              <line x1="300" y1="100" x2="300" y2="120" stroke="#cbd5e1" strokeWidth="2" />

              {/* Shared RAM */}
              <rect x="200" y="120" width="200" height="36" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" />
              <text x="300" y="137" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Memoria RAM Global</text>
              <text x="300" y="149" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Latencia Constante: ~50-60 ns</text>
            </svg>
          </div>

          <div className="hpc-card" style={{ marginTop: '0.8rem', padding: '0.7rem 1.2rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
            <strong>UMA (Uniform Memory Access):</strong> Todos los núcleos comparten el mismo bus físico. La latencia y el ancho de banda son exactamente iguales para cualquier procesador, pero el bus satura al aumentar el número de núcleos.
          </div>
        </div>
      ) : (
        <div>
          <div style={{ background: '#070a12', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <svg viewBox="0 0 620 185" style={{ width: '100%', height: '185px' }}>
              {/* Socket 0 */}
              <g>
                <rect x="15" y="10" width="240" height="160" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" />
                <text x="135" y="28" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">NUMA Nodo 0 (Socket 0)</text>

                {/* Cores 0-7 */}
                <rect x="30" y="42" width="95" height="34" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.15)" />
                <text x="77" y="63" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Cores 0-7</text>

                {/* Local RAM 0 */}
                <rect x="140" y="42" width="100" height="34" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" />
                <text x="190" y="63" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">RAM Local 0</text>

                {/* Local Bus Line */}
                <line x1="77" y1="76" x2="77" y2="94" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="190" y1="76" x2="190" y2="94" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="77" y1="94" x2="190" y2="94" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Local Latency Badge */}
                <rect x="30" y="114" width="210" height="38" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
                <text x="135" y="130" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Acceso Local (Cores 0-7 &rarr; RAM 0)</text>
                <text x="135" y="144" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">⚡ Latencia: ~60 ns (Canales Locales)</text>
              </g>

              {/* Interconnect Bridge (Spacious 110px Gap) */}
              <g>
                <defs>
                  <marker id="arrowNumaL" markerWidth="6" markerHeight="6" refX="2" refY="3" orient="auto">
                    <polygon points="6 0, 0 3, 6 6" fill="#ffffff" />
                  </marker>
                  <marker id="arrowNumaR" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#ffffff" />
                  </marker>
                </defs>

                {/* Dashed Line with arrows */}
                <line x1="258" y1="90" x2="362" y2="90" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 3" markerStart="url(#arrowNumaL)" markerEnd="url(#arrowNumaR)" />
                
                {/* Central UPI / IF Badge */}
                <rect x="265" y="58" width="90" height="24" rx="4" fill="#070a12" stroke="rgba(255,255,255,0.25)" />
                <text x="310" y="74" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">UPI / IF / CXL</text>
                
                <text x="310" y="112" fill="#94a3b8" fontSize="7.5" textAnchor="middle">Enlace Inter-Socket</text>
                <text x="310" y="124" fill="#cbd5e1" fontSize="7.5" fontWeight="bold" textAnchor="middle">~64-128 GB/s</text>
              </g>

              {/* Socket 1 */}
              <g>
                <rect x="365" y="10" width="240" height="160" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" />
                <text x="485" y="28" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">NUMA Nodo 1 (Socket 1)</text>

                {/* Cores 8-15 */}
                <rect x="380" y="42" width="95" height="34" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.15)" />
                <text x="427" y="63" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Cores 8-15</text>

                {/* Local RAM 1 */}
                <rect x="490" y="42" width="100" height="34" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" />
                <text x="540" y="63" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">RAM Local 1</text>

                {/* Local Bus Line */}
                <line x1="427" y1="76" x2="427" y2="94" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="540" y1="76" x2="540" y2="94" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="427" y1="94" x2="540" y2="94" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Remote Latency Badge */}
                <rect x="380" y="114" width="210" height="38" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
                <text x="485" y="130" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Acceso Remoto (Cores 0-7 &rarr; RAM 1)</text>
                <text x="485" y="144" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">⚠️ Latencia: ~140 ns (&gt;2x Penalización)</text>
              </g>
            </svg>
          </div>

          <div className="hpc-card" style={{ marginTop: '0.8rem', padding: '0.7rem 1.2rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
            <strong>NUMA (Non-Uniform Memory Access):</strong> Cada socket dispone de sus propios canales de RAM locales ultra rápidos (~60ns). Acceder a la RAM del otro socket requiere cruzar los enlaces inter-socket (UPI / Infinity Fabric), duplicando la latencia (~140ns).
          </div>
        </div>
      )}
    </div>
  );
};

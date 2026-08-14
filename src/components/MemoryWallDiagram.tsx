import React, { useState } from 'react';

export const MemoryWallDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'divergence' | 'hierarchy' | 'solutions'>('hierarchy');

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.1rem 1.3rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      {/* Top Header & Tab Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem', flexWrap: 'wrap', gap: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.6rem' }}>
        <div>
          <span className="hpc-badge" style={{ margin: 0, fontSize: '0.72rem' }}>Jerarquía de Memoria</span>
          <span style={{ marginLeft: '0.6rem', fontSize: '0.86rem', color: '#cbd5e1' }}>
            El Muro Doble: <strong>Latencia (ns)</strong> y <strong>Ancho de Banda (GB/s vs TB/s)</strong>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.35rem', background: '#070a12', padding: '0.25rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setActiveTab('hierarchy')}
            style={{
              background: activeTab === 'hierarchy' ? 'rgba(244, 184, 96, 0.2)' : 'transparent',
              border: activeTab === 'hierarchy' ? '1px solid #f4b860' : '1px solid transparent',
              color: activeTab === 'hierarchy' ? '#f4b860' : '#94a3b8',
              padding: '0.35rem 0.8rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              transition: 'all 0.15s ease'
            }}
          >
            ⏱️ 1. Jerarquía: Latencia vs Ancho de Banda
          </button>

          <button
            onClick={() => setActiveTab('divergence')}
            style={{
              background: activeTab === 'divergence' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              border: activeTab === 'divergence' ? '1px solid #38bdf8' : '1px solid transparent',
              color: activeTab === 'divergence' ? '#38bdf8' : '#94a3b8',
              padding: '0.35rem 0.8rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              transition: 'all 0.15s ease'
            }}
          >
            📈 2. Gráfica Histórica de la Brecha
          </button>

          <button
            onClick={() => setActiveTab('solutions')}
            style={{
              background: activeTab === 'solutions' ? 'rgba(52, 211, 153, 0.2)' : 'transparent',
              border: activeTab === 'solutions' ? '1px solid #34d399' : '1px solid transparent',
              color: activeTab === 'solutions' ? '#34d399' : '#94a3b8',
              padding: '0.35rem 0.8rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              transition: 'all 0.15s ease'
            }}
          >
            🛠️ 3. Mitigaciones en Silicio y HPC
          </button>
        </div>
      </div>

      {/* Tab 1: Latency & Bandwidth Full Hierarchy */}
      {activeTab === 'hierarchy' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {/* 5-Column Grid Across Full Memory Spectrum */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem' }}>
            
            {/* 1. Registers */}
            <div className="hpc-card" style={{ padding: '0.8rem', textAlign: 'center' }}>
              <span className="hpc-badge" style={{ fontSize: '0.65rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>Registros CPU/GPU</span>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.3rem' }}>Latencia</div>
              <div style={{ fontSize: '1.15rem', color: '#38bdf8', fontWeight: 800 }}>&lt; 0.5 ns</div>
              <div style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>~1 Ciclo</div>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0.4rem 0 0.3rem 0', paddingTop: '0.3rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Ancho de Banda</div>
                <div style={{ fontSize: '1.05rem', color: '#34d399', fontWeight: 800 }}>&gt; 30 TB/s</div>
              </div>
              <p style={{ fontSize: '0.66rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>Cap: ~1-4KB / 256KB</p>
            </div>

            {/* 2. L1 / L2 Cache */}
            <div className="hpc-card" style={{ padding: '0.8rem', textAlign: 'center' }}>
              <span className="hpc-badge" style={{ fontSize: '0.65rem' }}>Caché L1 / L2</span>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.3rem' }}>Latencia</div>
              <div style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 800 }}>1 - 4 ns</div>
              <div style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>~4 - 14 Ciclos</div>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0.4rem 0 0.3rem 0', paddingTop: '0.3rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Ancho de Banda</div>
                <div style={{ fontSize: '1.05rem', color: '#34d399', fontWeight: 800 }}>8 - 15 TB/s</div>
              </div>
              <p style={{ fontSize: '0.66rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>Cap: 32KB - 1MB / core</p>
            </div>

            {/* 3. L3 LLC / 3D V-Cache */}
            <div className="hpc-card" style={{ padding: '0.8rem', textAlign: 'center' }}>
              <span className="hpc-badge" style={{ fontSize: '0.65rem' }}>Caché L3 (LLC)</span>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.3rem' }}>Latencia</div>
              <div style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 800 }}>10 - 20 ns</div>
              <div style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>~40 - 70 Ciclos</div>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0.4rem 0 0.3rem 0', paddingTop: '0.3rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Ancho de Banda</div>
                <div style={{ fontSize: '1.05rem', color: '#34d399', fontWeight: 800 }}>2 - 4 TB/s</div>
              </div>
              <p style={{ fontSize: '0.66rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>Cap: 32MB - 1GB</p>
            </div>

            {/* 4. DDR5 DRAM */}
            <div className="hpc-card" style={{ padding: '0.8rem', textAlign: 'center', background: 'rgba(248, 113, 113, 0.06)', border: '1px solid rgba(248, 113, 113, 0.3)' }}>
              <span className="hpc-badge" style={{ fontSize: '0.65rem', background: 'rgba(248, 113, 113, 0.15)', color: '#f87171' }}>DDR5 DRAM (CPU)</span>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.3rem' }}>Latencia</div>
              <div style={{ fontSize: '1.15rem', color: '#f87171', fontWeight: 800 }}>60 - 100 ns</div>
              <div style={{ fontSize: '0.68rem', color: '#f87171' }}>~200 - 350 Ciclos</div>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0.4rem 0 0.3rem 0', paddingTop: '0.3rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Ancho de Banda</div>
                <div style={{ fontSize: '1.05rem', color: '#f87171', fontWeight: 800 }}>300-600 GB/s</div>
              </div>
              <p style={{ fontSize: '0.66rem', color: '#f87171', margin: '0.2rem 0 0 0' }}>¡Cuello de Botella!</p>
            </div>

            {/* 5. HBM3e Memory */}
            <div className="hpc-card" style={{ padding: '0.8rem', textAlign: 'center', background: 'rgba(52, 211, 153, 0.06)', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
              <span className="hpc-badge" style={{ fontSize: '0.65rem', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}>HBM3e (GPU / APU)</span>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.3rem' }}>Latencia</div>
              <div style={{ fontSize: '1.15rem', color: '#34d399', fontWeight: 800 }}>40 - 60 ns</div>
              <div style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>~120 - 180 Ciclos</div>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0.4rem 0 0.3rem 0', paddingTop: '0.3rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Ancho de Banda</div>
                <div style={{ fontSize: '1.05rem', color: '#34d399', fontWeight: 800 }}>4.8 - 8.0 TB/s</div>
              </div>
              <p style={{ fontSize: '0.66rem', color: '#34d399', margin: '0.2rem 0 0 0' }}>Cap: 80 - 288 GB</p>
            </div>

          </div>

          {/* Bottom Clarification */}
          <div style={{ background: '#070a12', padding: '0.65rem 1rem', borderRadius: '6px', fontSize: '0.8rem', color: '#cbd5e1', textAlign: 'center' }}>
            💡 <strong>Latencia vs Ancho de Banda:</strong> La <em>Latencia</em> es el tiempo de espera hasta recibir el primer dato (determinado por la física de los condensadores DRAM); el <em>Ancho de Banda</em> es el caudal sostenido de bytes transferidos por segundo (multiplicado por 16x en HBM gracias a buses de miles de pistas en interposers).
          </div>
        </div>
      )}

      {/* Tab 2: Full-Width Panoramic Divergence Chart */}
      {activeTab === 'divergence' && (
        <div style={{ background: '#070a12', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
            <span style={{ color: '#ffffff', fontWeight: 600 }}>Evolución del Rendimiento Relativo (1980 - Actualidad)</span>
            <div style={{ display: 'flex', gap: '1.2rem' }}>
              <span style={{ color: '#38bdf8', fontWeight: 600 }}>── Rendimiento Cómputo CPU (~55%/año)</span>
              <span style={{ color: '#f4b860', fontWeight: 600 }}>── Ancho de Banda DRAM (~7%/año)</span>
              <span style={{ color: '#f87171', fontWeight: 600 }}>- - - Brecha Memory Wall</span>
            </div>
          </div>

          <svg viewBox="0 0 720 220" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Horizontal Gridlines */}
            {[40, 80, 120, 160].map((yVal, idx) => (
              <line key={idx} x1="70" y1={yVal} x2="690" y2={yVal} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
            ))}

            {/* X and Y Axes */}
            <line x1="70" y1="180" x2="690" y2="180" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <line x1="70" y1="20" x2="70" y2="180" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

            {/* Y Axis Labels (Log Scale) */}
            <text x="60" y="184" fill="#94a3b8" fontSize="9.5" textAnchor="end">1×</text>
            <text x="60" y="144" fill="#94a3b8" fontSize="9.5" textAnchor="end">10×</text>
            <text x="60" y="104" fill="#94a3b8" fontSize="9.5" textAnchor="end">100×</text>
            <text x="60" y="64" fill="#94a3b8" fontSize="9.5" textAnchor="end">1,000×</text>
            <text x="60" y="24" fill="#94a3b8" fontSize="9.5" textAnchor="end">10,000×</text>

            <text x="25" y="100" fill="#94a3b8" fontSize="9.5" textAnchor="middle" transform="rotate(-90 25 100)">
              Rendimiento (Log)
            </text>

            {/* X Axis Timeline Labels */}
            <text x="70" y="198" fill="#cbd5e1" fontSize="10" textAnchor="middle">1980</text>
            <text x="180" y="198" fill="#cbd5e1" fontSize="10" textAnchor="middle">1990</text>
            <text x="290" y="198" fill="#cbd5e1" fontSize="10" textAnchor="middle">1995 (Wulf &amp; McKee)</text>
            <text x="400" y="198" fill="#cbd5e1" fontSize="10" textAnchor="middle">2005 (Multicore)</text>
            <text x="520" y="198" fill="#cbd5e1" fontSize="10" textAnchor="middle">2015</text>
            <text x="660" y="198" fill="#cbd5e1" fontSize="10" textAnchor="middle">Presente</text>

            {/* Shaded Area between curves */}
            <path
              d="M 70 175 Q 260 145 420 70 Q 550 40 660 30 L 660 145 Q 400 160 70 175 Z"
              fill="rgba(248, 113, 113, 0.08)"
            />

            {/* DRAM slow curve (~7%/año) */}
            <path
              d="M 70 175 Q 400 160 660 145"
              fill="none"
              stroke="#f4b860"
              strokeWidth="3.5"
            />

            {/* CPU steep curve (~55%/año) */}
            <path
              d="M 70 175 Q 260 145 420 70 Q 550 40 660 30"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
            />

            {/* DRAM Curve End Label */}
            <circle cx="660" cy="145" r="4" fill="#f4b860" />
            <text x="668" y="149" fill="#f4b860" fontSize="9.5" fontWeight="bold">DRAM Ancho de Banda (~7%/año)</text>

            {/* CPU Curve End Label */}
            <circle cx="660" cy="30" r="4" fill="#38bdf8" />
            <text x="668" y="34" fill="#38bdf8" fontSize="9.5" fontWeight="bold">CPU FLOPS (~55%/año)</text>

            {/* Gap Bracket & Annotation */}
            <line x1="640" y1="35" x2="640" y2="140" stroke="#f87171" strokeWidth="2" strokeDasharray="4 3" />
            <polygon points="637,36 643,36 640,30" fill="#f87171" />
            <polygon points="637,139 643,139 640,145" fill="#f87171" />
            <rect x="480" y="76" width="155" height="28" rx="4" fill="#1e293b" stroke="#f87171" strokeWidth="1.2" />
            <text x="557" y="93" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">
              Brecha &gt; 1,000× (Memory Wall)
            </text>

            {/* Key Historic Pins */}
            <circle cx="290" cy="130" r="3.5" fill="#ffffff" />
            <line x1="290" y1="130" x2="290" y2="105" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
            <text x="290" y="100" fill="#ffffff" fontSize="8.5" textAnchor="middle">
              1995: Término acuñado
            </text>

            <circle cx="400" cy="80" r="3.5" fill="#ffffff" />
            <line x1="400" y1="80" x2="400" y2="58" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
            <text x="400" y="53" fill="#ffffff" fontSize="8.5" textAnchor="middle">
              2005: Fin Dennard $\to$ Multinúcleo
            </text>
          </svg>

          {/* Bottom Takeaway */}
          <div style={{ marginTop: '0.8rem', background: '#0b0f19', padding: '0.6rem 1rem', borderRadius: '6px', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
            💡 <strong>El Doble Muro de la Memoria:</strong> No solo sufrimos una alta latencia (~200 ciclos), sino una escasez de <em>Ancho de Banda</em> en canales DDR tradicionales. Para saturar las ALUs modernas se requieren miles de GB/s, lo que impulsó la creación de HBM3e y grandes memorias caché 3D.
          </div>
        </div>
      )}

      {/* Tab 3: Solutions */}
      {activeTab === 'solutions' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="hpc-card" style={{ padding: '1rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="hpc-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>Silicio</span>
              <h4 style={{ margin: 0, fontSize: '0.98rem', color: '#ffffff' }}>Soluciones a Nivel Hardware</h4>
            </div>
            <ul style={{ fontSize: '0.78rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem', lineHeight: 1.4 }}>
              <li><strong>High-Bandwidth Memory (HBM3e):</strong> Pasa de 400 GB/s (DDR5) a <strong>hasta 8.0 TB/s</strong> mediante interposer de silicio y bus de miles de pines.</li>
              <li><strong>Cachés 3D Apiladas (3D V-Cache):</strong> Integración de cientos de MBs de caché L3 sobre el die para retener datasets enteros.</li>
              <li><strong>Hardware Prefetching:</strong> Detección automática de zancadas (strides) para traer datos a caché antes de que la CPU los pida.</li>
            </ul>
          </div>

          <div className="hpc-card" style={{ padding: '1rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="hpc-badge" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}>Software</span>
              <h4 style={{ margin: 0, fontSize: '0.98rem', color: '#ffffff' }}>Estrategias de Software en HPC</h4>
            </div>
            <ul style={{ fontSize: '0.78rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem', lineHeight: 1.4 }}>
              <li><strong>Loop Tiling / Blocking:</strong> Particionar algoritmos de matrices en bloques que quepan exactamente en L1/L2 para reuso temporal.</li>
              <li><strong>Diseño SoA (Structure of Arrays):</strong> Alinear datos en memoria contigua para maximizar localidad espacial y ancho de banda útil.</li>
              <li><strong>Transferencias Asíncronas:</strong> Solapar cómputo en núcleos con transferencias de datos vía DMA / PCIe / NVLink.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';

export const MemoryWallDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'divergence' | 'hierarchy' | 'solutions'>('divergence');

  return (
    <div style={{ background: 'var(--hpc-card-bg)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--hpc-card-border)', backdropFilter: 'blur(10px)' }}>
      {/* Navigation tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('divergence')}
          style={{
            background: activeTab === 'divergence' ? 'rgba(244, 184, 96, 0.15)' : 'transparent',
            border: activeTab === 'divergence' ? '1px solid var(--hpc-primary)' : '1px solid transparent',
            color: activeTab === 'divergence' ? 'var(--hpc-primary)' : 'var(--hpc-muted)',
            padding: '0.35rem 0.8rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600
          }}
        >
          📈 La Brecha CPU-DRAM
        </button>

        <button
          onClick={() => setActiveTab('hierarchy')}
          style={{
            background: activeTab === 'hierarchy' ? 'rgba(244, 184, 96, 0.15)' : 'transparent',
            border: activeTab === 'hierarchy' ? '1px solid var(--hpc-primary)' : '1px solid transparent',
            color: activeTab === 'hierarchy' ? 'var(--hpc-primary)' : 'var(--hpc-muted)',
            padding: '0.35rem 0.8rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600
          }}
        >
          ⏱️ Penalización de Latencia
        </button>

        <button
          onClick={() => setActiveTab('solutions')}
          style={{
            background: activeTab === 'solutions' ? 'rgba(244, 184, 96, 0.15)' : 'transparent',
            border: activeTab === 'solutions' ? '1px solid var(--hpc-primary)' : '1px solid transparent',
            color: activeTab === 'solutions' ? 'var(--hpc-primary)' : 'var(--hpc-muted)',
            padding: '0.35rem 0.8rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600
          }}
        >
          🛠️ Mitigaciones en HPC
        </button>
      </div>

      {/* Tab 1: Divergence Chart */}
      {activeTab === 'divergence' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.78rem' }}>
            <span style={{ color: '#fff', fontWeight: 600 }}>Crecimiento Relativo (1980 - Actualidad)</span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ color: 'var(--hpc-primary)', fontWeight: 600 }}>── Rendimiento CPU (~55%/año)</span>
              <span style={{ color: 'var(--hpc-secondary)', fontWeight: 600 }}>── Velocidad DRAM (~7%/año)</span>
            </div>
          </div>

          <svg viewBox="0 0 520 180" style={{ width: '100%', height: '160px' }}>
            {/* Grid & Axes */}
            <line x1="50" y1="150" x2="490" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="50" y1="20" x2="50" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

            <text x="50" y="166" fill="var(--hpc-muted)" fontSize="10" textAnchor="middle">1980</text>
            <text x="160" y="166" fill="var(--hpc-muted)" fontSize="10" textAnchor="middle">1995 (Wulf & McKee)</text>
            <text x="270" y="166" fill="var(--hpc-muted)" fontSize="10" textAnchor="middle">2005</text>
            <text x="380" y="166" fill="var(--hpc-muted)" fontSize="10" textAnchor="middle">2015</text>
            <text x="490" y="166" fill="var(--hpc-muted)" fontSize="10" textAnchor="middle">Presente</text>

            <text x="15" y="85" fill="var(--hpc-muted)" fontSize="10" textAnchor="middle" transform="rotate(-90 15 85)">Rendimiento (Log)</text>

            {/* DRAM slow curve */}
            <path
              d="M 50 145 Q 270 135 490 115"
              fill="none"
              stroke="var(--hpc-secondary)"
              strokeWidth="2.5"
            />

            {/* CPU steep curve */}
            <path
              d="M 50 145 Q 220 110 320 60 T 490 25"
              fill="none"
              stroke="var(--hpc-primary)"
              strokeWidth="3"
            />

            {/* Gap shading indicator */}
            <line x1="480" y1="28" x2="480" y2="114" stroke="var(--hpc-danger)" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="470" y="70" fill="var(--hpc-danger)" fontSize="10" textAnchor="end" fontWeight="bold">Memory Wall Gap &gt; 1000x</text>

            {/* Event annotations */}
            <circle cx="160" cy="120" r="3" fill="#ffffff" />
            <text x="165" y="115" fill="#ffffff" fontSize="9">1995: Término acuñado</text>
          </svg>

          <div style={{ marginTop: '0.4rem', background: '#080d1a', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.76rem', color: 'var(--hpc-subtle)' }}>
            💡 <strong>El Muro de la Memoria:</strong> La CPU puede procesar datos órdenes de magnitud más rápido de lo que el bus DRAM puede alimentarla, causando que las ALUs pasen cientos de ciclos ociosas esperando lecturas de memoria.
          </div>
        </div>
      )}

      {/* Tab 2: Latency Hierarchy */}
      {activeTab === 'hierarchy' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem', marginTop: '0.2rem' }}>
          <div className="hpc-card" style={{ padding: '0.8rem', textAlign: 'center' }}>
            <span className="hpc-badge badge-neutral" style={{ fontSize: '0.65rem' }}>Registros CPU</span>
            <div style={{ fontSize: '1.2rem', color: 'var(--hpc-primary)', fontWeight: 800, margin: '0.3rem 0' }}>&lt; 0.5 ns</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--hpc-subtle)' }}>~1 Ciclo</div>
            <p style={{ fontSize: '0.7rem', color: 'var(--hpc-muted)', margin: '0.3rem 0 0 0' }}>Capacidad: ~1 - 4 KB</p>
          </div>

          <div className="hpc-card" style={{ padding: '0.8rem', textAlign: 'center' }}>
            <span className="hpc-badge badge-neutral" style={{ fontSize: '0.65rem' }}>Caché L1 / L2</span>
            <div style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 800, margin: '0.3rem 0' }}>1 - 4 ns</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--hpc-subtle)' }}>~4 - 14 Ciclos</div>
            <p style={{ fontSize: '0.7rem', color: 'var(--hpc-muted)', margin: '0.3rem 0 0 0' }}>Capacidad: 32KB - 1MB</p>
          </div>

          <div className="hpc-card" style={{ padding: '0.8rem', textAlign: 'center' }}>
            <span className="hpc-badge badge-neutral" style={{ fontSize: '0.65rem' }}>Caché L3 (LLC)</span>
            <div style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 800, margin: '0.3rem 0' }}>10 - 20 ns</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--hpc-subtle)' }}>~40 - 70 Ciclos</div>
            <p style={{ fontSize: '0.7rem', color: 'var(--hpc-muted)', margin: '0.3rem 0 0 0' }}>Capacidad: 32MB - 1GB</p>
          </div>

          <div className="hpc-card" style={{ padding: '0.8rem', textAlign: 'center', background: 'rgba(248, 113, 113, 0.08)' }}>
            <span className="hpc-badge badge-rose" style={{ fontSize: '0.65rem' }}>DRAM Principal</span>
            <div style={{ fontSize: '1.2rem', color: 'var(--hpc-danger)', fontWeight: 800, margin: '0.3rem 0' }}>60 - 100 ns</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--hpc-danger)' }}>~200 - 350 Ciclos</div>
            <p style={{ fontSize: '0.7rem', color: 'var(--hpc-muted)', margin: '0.3rem 0 0 0' }}>¡Penalización Crítica!</p>
          </div>
        </div>
      )}

      {/* Tab 3: Solutions */}
      {activeTab === 'solutions' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '0.2rem' }}>
          <div className="hpc-card" style={{ padding: '0.8rem' }}>
            <h4 style={{ fontSize: '0.85rem', margin: '0 0 0.4rem 0', color: 'var(--hpc-primary)' }}>Soluciones a Nivel Hardware</h4>
            <ul style={{ fontSize: '0.74rem', paddingLeft: '1rem', margin: 0, color: 'var(--hpc-subtle)' }}>
              <li><strong>Cachés Gigantes / 3D V-Cache:</strong> Centenares de MBs de caché L3 apilada en 3D para retener datasets completos.</li>
              <li><strong>High-Bandwidth Memory (HBM3e):</strong> Pilas de DRAM en interposer de silicio con bus de miles de bits (hasta 4+ TB/s).</li>
              <li><strong>Hardware Prefetching:</strong> Detección de patrones lineales / stride para traer datos antes de que la CPU los pida.</li>
            </ul>
          </div>

          <div className="hpc-card" style={{ padding: '0.8rem' }}>
            <h4 style={{ fontSize: '0.85rem', margin: '0 0 0.4rem 0', color: 'var(--hpc-primary)' }}>Estrategias de Software en HPC</h4>
            <ul style={{ fontSize: '0.74rem', paddingLeft: '1rem', margin: 0, color: 'var(--hpc-subtle)' }}>
              <li><strong>Loop Tiling / Blocking:</strong> Partir matrices en bloques que quepan exactamente en L1/L2 para maximizar reuso temporal.</li>
              <li><strong>Estructuras SoA (Structure of Arrays):</strong> Asegurar accesos contiguos y vectorizables (localidad espacial).</li>
              <li><strong>Pipelining / Asynchronous Transfers:</strong> Solapar cómputo con transferencias DMA/PCIe.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';

export const CudaMemoryHierarchy: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      {/* 3 Full-Size Memory Level Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'left', marginBottom: '0.8rem' }}>
        
        {/* Level 1: Shared Memory */}
        <div className="hpc-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="hpc-badge" style={{ fontSize: '0.7rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              Nivel 1 (En el SM)
            </span>
            <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1.05rem', color: '#ffffff' }}>Shared Memory / L1 Cache</h4>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Memoria SRAM ultra-rápida programable por software (<code>__shared__</code>) compartida entre hilos del mismo Thread Block.
            </p>
          </div>
          <ul style={{ fontSize: '0.76rem', paddingLeft: '1rem', margin: 0, color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <li><strong>Latencia:</strong> ~1.5 ns (~20 ciclos)</li>
            <li><strong>Capacidad:</strong> 128 KB - 256 KB por SM</li>
            <li><strong>Ancho de Banda:</strong> <strong>&gt; 15 TB/s</strong> agregado en chip</li>
          </ul>
        </div>

        {/* Level 2: L2 Cache */}
        <div className="hpc-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="hpc-badge" style={{ fontSize: '0.7rem', color: '#f4b860', background: 'rgba(244, 184, 96, 0.15)', border: '1px solid rgba(244, 184, 96, 0.3)' }}>
              Nivel 2 (En el Chip)
            </span>
            <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1.05rem', color: '#ffffff' }}>Caché L2 Masiva</h4>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Caché global compartida por todos los SMs del chip. Conecta la red de crossbar interno con los controladores de memoria física.
            </p>
          </div>
          <ul style={{ fontSize: '0.76rem', paddingLeft: '1rem', margin: 0, color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <li><strong>Latencia:</strong> ~10 - 15 ns</li>
            <li><strong>Capacidad:</strong> 50 MB (H100) a 96 MB (RTX 4090)</li>
            <li><strong>Función:</strong> Amortigua fallos y sincroniza SMs</li>
          </ul>
        </div>

        {/* Level 3: Global Memory HBM3e */}
        <div className="hpc-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="hpc-badge" style={{ fontSize: '0.7rem', color: '#34d399', background: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
              Nivel 3 (Externo HBM)
            </span>
            <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1.05rem', color: '#ffffff' }}>VRAM Global (HBM3e)</h4>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Memoria principal de la GPU construida con pilas de DRAM 3D en interposers de silicio con buses de miles de pistas.
            </p>
          </div>
          <ul style={{ fontSize: '0.76rem', paddingLeft: '1rem', margin: 0, color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <li><strong>Latencia:</strong> ~100 - 200 ns</li>
            <li><strong>Capacidad:</strong> 80 - 141 GB (H100/H200), 288 GB (B200)</li>
            <li><strong>Ancho de Banda:</strong> <strong>3.35 TB/s a 8.0 TB/s</strong></li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer Callout */}
      <div style={{ background: '#070a12', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem', color: '#cbd5e1', textAlign: 'center' }}>
        🏛️ <strong>Regla de Ocupación CUDA:</strong> Para ocultar la latencia de 150 ns hacia la VRAM global, se requiere maximizar la ocupación del SM (Warps activos vs Warps teóricos máximos) y explotar la <em>Shared Memory</em> para reutilizar datos entre hilos.
      </div>
    </div>
  );
};

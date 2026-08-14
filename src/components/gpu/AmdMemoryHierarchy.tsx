import React from 'react';

export const AmdMemoryHierarchy: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      {/* 3 Full-Size Memory Level Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'left', marginBottom: '0.8rem' }}>
        
        {/* Level 1: LDS */}
        <div className="hpc-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="hpc-badge" style={{ fontSize: '0.7rem', color: '#f87171', background: 'rgba(248, 113, 113, 0.15)', border: '1px solid rgba(248, 113, 113, 0.3)' }}>
              Nivel 1 (En el CU)
            </span>
            <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1.05rem', color: '#ffffff' }}>LDS (Local Data Share)</h4>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Memoria SRAM compartida por todos los hilos del mismo Work-group. Equivalente directo a la <em>Shared Memory</em> de CUDA.
            </p>
          </div>
          <ul style={{ fontSize: '0.76rem', paddingLeft: '1rem', margin: 0, color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <li><strong>Latencia:</strong> ~2.0 ns (~25 ciclos)</li>
            <li><strong>Capacidad:</strong> 64 KB a 128 KB por CU</li>
            <li><strong>Función:</strong> Intercambio directo de datos sin tocar la VRAM</li>
          </ul>
        </div>

        {/* Level 2: Infinity Cache */}
        <div className="hpc-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="hpc-badge" style={{ fontSize: '0.7rem', color: '#f4b860', background: 'rgba(244, 184, 96, 0.15)', border: '1px solid rgba(244, 184, 96, 0.3)' }}>
              Nivel 2 (En el Die / XCD)
            </span>
            <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1.05rem', color: '#ffffff' }}>Infinity Cache (L2 / MALL)</h4>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Caché global masiva (Memory Attached Last Level) interconectada con la red <strong>Infinity Fabric</strong> de alta velocidad.
            </p>
          </div>
          <ul style={{ fontSize: '0.76rem', paddingLeft: '1rem', margin: 0, color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <li><strong>Latencia:</strong> ~12 - 18 ns</li>
            <li><strong>Capacidad:</strong> Hasta 256 MB Infinity Cache en CDNA 3</li>
            <li><strong>Función:</strong> Maximiza el ancho de banda efectivo</li>
          </ul>
        </div>

        {/* Level 3: HBM3 Memory */}
        <div className="hpc-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="hpc-badge" style={{ fontSize: '0.7rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              Nivel 3 (Externo HBM)
            </span>
            <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1.05rem', color: '#ffffff' }}>VRAM Global (HBM3 / HBM3e)</h4>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Memoria masiva unificada líder en capacidad por acelerador para entrenamiento e inferencia de modelos gigantes.
            </p>
          </div>
          <ul style={{ fontSize: '0.76rem', paddingLeft: '1rem', margin: 0, color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <li><strong>Latencia:</strong> ~100 - 180 ns</li>
            <li><strong>Capacidad:</strong> <strong>192 GB (MI300X)</strong> a 288 GB (MI350X)</li>
            <li><strong>Ancho de Banda:</strong> <strong>5.3 TB/s a 8.0 TB/s</strong></li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer Callout */}
      <div style={{ background: '#070a12', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem', color: '#cbd5e1', textAlign: 'center' }}>
        🏛️ <strong>Ecosistema ROCm / HIP:</strong> La capa de portabilidad <code>HIP</code> permite compilar código CUDA en GPUs AMD mapeando directamente <code>__shared__</code> a LDS y las llamadas de sincronización de bloques.
      </div>
    </div>
  );
};

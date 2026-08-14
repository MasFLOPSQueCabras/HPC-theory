import React from 'react';

export const AmdMatrixDetail: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', textAlign: 'left', marginBottom: '0.8rem' }}>
        {/* Left: Matrix Cores */}
        <div className="hpc-card" style={{ padding: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="hpc-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              Matrix Cores (MFMA)
            </span>
            <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#ffffff' }}>Aceleración Matricial en AMD CDNA</h4>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 0.7rem 0' }}>
            Unidades matriciales que resuelven instrucciones MFMA (<em>Matrix Fused Multiply-Add</em>):
          </p>

          <ul style={{ fontSize: '0.78rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <li><strong>Liderazgo en FP64 Nativo:</strong> En aceleradores <strong>AMD Instinct MI300X</strong>, la tasa de FP64 es 1:1 frente a FP32, convirtiéndolo en el estándar de los mayores supercomputadores (<em>Frontier</em> y <em>El Capitan</em>).</li>
            <li><strong>Formatos IA y Microscaling:</strong> Soporte para FP32, FP16, BF16, INT8, FP8 (E5M2/E4M3) y el nuevo estándar <strong>MXFP4</strong> en la serie MI350.</li>
            <li><strong>Throughput:</strong> Gran paralelismo denso con hasta 2.6 PFLOPS de FP8 por GPU.</li>
          </ul>
        </div>

        {/* Right: VGPR vs SGPR */}
        <div className="hpc-card" style={{ padding: '1.2rem', borderLeft: '3px solid #f4b860' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="hpc-badge" style={{ background: 'rgba(244, 184, 96, 0.15)', color: '#f4b860', border: '1px solid rgba(244, 184, 96, 0.3)' }}>
              Innovación AMD
            </span>
            <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#f4b860' }}>Dual Register File: VGPR vs SGPR</h4>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 0.7rem 0' }}>
            Arquitectura de registros dividida única en silicio:
          </p>

          <ul style={{ fontSize: '0.78rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <li><strong>VGPR (Vector GPR):</strong> 1 registro asignado individualmente a cada hilo del wavefront para variables divergentes.</li>
            <li><strong>SGPR (Scalar GPR):</strong> 1 único registro <strong>compartido por todos los 64 hilos del Wavefront</strong> para valores uniformes (constantes, punteros base a memoria, límites de bucle).</li>
            <li><strong>Ventaja Crítica:</strong> Ahorra hasta un <strong>30% de área en silicio</strong> y previene el desbordamiento de registros a memoria (spilling).</li>
          </ul>
        </div>
      </div>

      {/* Bottom Takeaway */}
      <div style={{ background: '#070a12', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem', color: '#cbd5e1', textAlign: 'center' }}>
        💡 <strong>Impacto del Modelo Escalar/Vectorial:</strong> La presencia de unidades SALU y registros SGPR permite a las GPUs AMD ejecutar cálculos de control sin consumir recursos del banco vectorial masivo.
      </div>
    </div>
  );
};

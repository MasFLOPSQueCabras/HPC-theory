import React from 'react';
import { Math } from '../Math';

export const CudaCoresDetail: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', textAlign: 'left', marginBottom: '0.8rem' }}>
        {/* Left: CUDA Cores */}
        <div className="hpc-card" style={{ padding: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="hpc-badge" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
              CUDA Cores
            </span>
            <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#ffffff' }}>Cálculo Escalar / Vectorial Clásico</h4>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 0.7rem 0' }}>
            Unidades ALU individuales diseñadas para ejecutar 1 operación elemental por hilo y por ciclo de reloj:
          </p>

          <ul style={{ fontSize: '0.78rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <li><strong>FP32 / FP64 Cores:</strong> Aritmética estándar IEEE 754 de simple y doble precisión para simulaciones científicas de física, química cuántica y fluidos.</li>
            <li><strong>INT32 Cores:</strong> Direccionamiento de punteros, índices de matrices y operaciones lógicas en paralelo sin detener las ALUs de punto flotante.</li>
            <li><strong>SFU (Special Function Units):</strong> Cálculo por hardware de funciones trascendentes complejas (<Math math="\sin, \cos, \sqrt{x}, 1/\sqrt{x}, \log_2" />).</li>
          </ul>
        </div>

        {/* Right: Tensor Cores */}
        <div className="hpc-card" style={{ padding: '1.2rem', borderLeft: '3px solid #38bdf8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="hpc-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              Tensor Cores
            </span>
            <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#38bdf8' }}>Aceleración Matricial Masiva (IA/HPC)</h4>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 0.7rem 0' }}>
            Unidades matriciales de hardware que resuelven la operación <Math math="D = A \times B + C" /> en 1 ciclo de reloj:
          </p>

          <ul style={{ fontSize: '0.78rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <li><strong>Multi-Precisión Mixta:</strong> Soporte nativo para FP16, BF16, TF32, FP8 (E5M2/E4M3) y precisión ultra-baja FP4 (NVIDIA Blackwell NVFP4).</li>
            <li><strong>Transformer Engine:</strong> Escalado automático y cuantización dinámica en formatos Microscaling (MX) para acelerar inferencia y entrenamiento de LLMs.</li>
            <li><strong>Salto en Throughput:</strong> Multiplica por <strong>10x a 16x los FLOPs</strong> frente a los CUDA Cores tradicionales.</li>
          </ul>
        </div>
      </div>

      {/* Bottom Takeaway */}
      <div style={{ background: '#070a12', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem', color: '#cbd5e1', textAlign: 'center' }}>
        🚀 <strong>Regla de Aceleración en Supercómputo:</strong> Convertir operaciones elementales a multiplicaciones matriciales densas (GEMM) para canalizar el cómputo hacia los Tensor Cores en lugar de saturar las ALUs estándar.
      </div>
    </div>
  );
};

import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { Math } from '../components/Math';

export const PerformanceMetrics: React.FC = () => {
  return (
    <Stack>
      {/* 1. FLOPS y Fórmula */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Métricas • Capacidad de Cómputo</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.8rem' }}>FLOPS (Floating Point Operations / Sec)</h2>

          <div className="hpc-formula-box" style={{ fontSize: '1.15rem', padding: '0.8rem 1.2rem', margin: '0.6rem 0 1.2rem 0' }}>
            <Math math="\text{Peak FLOPS} = \text{Sockets} \times \frac{\text{Cores}}{\text{Socket}} \times f \times \frac{\text{FLOPs}}{\text{Cycle}}" block />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Definición</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Medida estándar de la potencia teórica máxima de cálculo numérico en punto flotante que el hardware puede entregar por segundo.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Multiplicadores por Ciclo</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Con <strong>AVX-512 (8 doubles/registro)</strong> y unidades <strong>FMA (2 ops/carril)</strong>, un solo núcleo de CPU puede entregar <strong>32 a 64 FLOPs por ciclo</strong>.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 2. Precisiones Numéricas */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Métricas • Formatos de Datos</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>Jerarquía de Precisiones Numéricas</h2>

          <table className="hpc-table" style={{ width: '100%', marginBottom: '1rem' }}>
            <thead>
              <tr>
                <th>Formato</th>
                <th>Bits</th>
                <th>Dominio Principal</th>
                <th>Throughput Relativo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>FP64 (Double)</strong></td>
                <td>64 bits</td>
                <td>Simulaciones científicas (Física, Clima, Astrofísica)</td>
                <td>1x (Línea Base)</td>
              </tr>
              <tr>
                <td><strong>FP32 (Single)</strong></td>
                <td>32 bits</td>
                <td>Dinámica de fluidos, Gráficos por computadora</td>
                <td>2x FP64</td>
              </tr>
              <tr>
                <td><strong>FP16 / BF16</strong></td>
                <td>16 bits</td>
                <td>Entrenamiento e Inferencia de Deep Learning</td>
                <td>4x - 8x (Tensor Cores)</td>
              </tr>
              <tr>
                <td><strong>FP8 / INT8</strong></td>
                <td>8 bits</td>
                <td>Inferencia a gran escala de LLMs e IA</td>
                <td>16x FP64</td>
              </tr>
            </tbody>
          </table>

          <div className="hpc-card" style={{ padding: '0.8rem 1.2rem', fontSize: '0.84rem', color: '#cbd5e1' }}>
            💡 <strong>Precisión Mixta (Mixed Precision):</strong> En HPC moderno, se calculan iteraciones en FP16/BF16 y se refina la solución final en FP64, reduciendo a la mitad el tráfico de memoria y duplicando la velocidad.
          </div>
        </div>
      </Slide>

      {/* 3. Ancho de Banda */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Métricas • Transferencia</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>Ancho de Banda (Bandwidth)</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>~100 - 300 GB/s</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>Memoria RAM (DDR5)</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                Memoria principal del servidor. Múltiples canales (8 a 12 canales por socket) en paralelo.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>~3.0 - 4.8 TB/s</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>Memoria HBM3e</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                Chips de memoria apilada 3D en interposers para GPUs y aceleradores de cálculo intensivo.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>64 GB/s - 400 Gbps</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>PCIe 5.0 / InfiniBand</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                Buses de conexión Host-GPU (PCIe) y redes de interconexión entre nodos de cluster (MPI).
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 4. Latencia vs Ancho de Banda */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Métricas • Tiempo de Respuesta</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>Latencia vs Ancho de Banda</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <span className="hpc-badge">Concepto de Latencia</span>
              <h3 style={{ margin: '0.4rem 0 0.4rem 0', fontSize: '1.15rem', color: '#ffffff' }}>Tiempo de Respuesta Inicial</h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                El retraso temporal en nanosegundos (ns) desde que la CPU emite una instrucción <code>load</code> hasta que el primer byte llega al registro.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>🚰 Analogía de la Tubería</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#e5e7eb', lineHeight: 1.5 }}>
                • <strong>Latencia:</strong> Tiempo que tarda la primera gota de agua en viajar por el tubo hasta el grifo.<br />
                • <strong>Ancho de Banda:</strong> El diámetro del tubo (cuántos litros/seg fluyen una vez lleno).
              </p>
            </div>
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

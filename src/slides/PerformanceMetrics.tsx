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
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.8rem' }}>FLOPS (Floating-Point Operations Per Second)</h2>

          <div className="hpc-formula-box" style={{ fontSize: '1.15rem', padding: '0.8rem 1.2rem', margin: '0.6rem 0 1.2rem 0' }}>
            <Math math="\text{Peak FLOPS} = \text{Sockets} \times \frac{\text{Cores}}{\text{Socket}} \times f \times \frac{\text{FLOPs}}{\text{Cycle}}" block />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>FLOPS vs FLOPs</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                • <strong>FLOPS (con 'S' mayúscula):</strong> Tasa de rendimiento temporal (*Floating-Point Operations Per Second*).<br />
                • <strong>FLOPs (con 's' minúscula):</strong> Conteo absoluto de operaciones matemáticas ejecutadas por el algoritmo.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Multiplicadores por Ciclo (FMA)</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Con <strong>AVX-512 (Advanced Vector Extensions 512-bit)</strong> y 2 unidades <strong>FMA (Fused Multiply-Add: 2 ops/carril)</strong>, un núcleo de CPU puede entregar <strong>32 FLOPs (FP64)</strong> o <strong>64 FLOPs (FP32) por ciclo</strong>.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 2. Precisiones Numéricas Escalares */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Métricas • Formatos Escalares Tradicionales</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.8rem' }}>Jerarquía de Precisiones Numéricas IEEE 754</h2>

          <table className="hpc-table" style={{ width: '100%', marginBottom: '0.8rem' }}>
            <thead>
              <tr>
                <th>Formato</th>
                <th>Estructura de Bits</th>
                <th>Dominio Principal en HPC / IA</th>
                <th>Throughput Relativo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>FP64 (Double)</strong></td>
                <td>1b Signo, 11b Exponente, 52b Mantisa</td>
                <td>Simulaciones científicas (Física, Clima, Astrofísica)</td>
                <td>1x (Línea Base)</td>
              </tr>
              <tr>
                <td><strong>FP32 (Single)</strong></td>
                <td>1b Signo, 8b Exponente, 23b Mantisa</td>
                <td>Dinámica de fluidos, Gráficos 3D, Procesamiento de señales</td>
                <td>2x FP64</td>
              </tr>
              <tr>
                <td><strong>FP16 / BF16</strong></td>
                <td>BF16: 1b S, 8b Exp, 7b Mant (Rango FP32)</td>
                <td>Entrenamiento de Deep Learning y Redes Neuronales</td>
                <td>4x - 8x (Tensor Cores)</td>
              </tr>
              <tr>
                <td><strong>FP8 / INT8</strong></td>
                <td>FP8: E5M2 / E4M3 | INT8: Entero 8 bits</td>
                <td>Inferencia a gran escala y cuantización lineal de LLMs</td>
                <td>16x FP64</td>
              </tr>
            </tbody>
          </table>

          <div className="hpc-card" style={{ padding: '0.7rem 1.2rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
            💡 <strong>Precisión Mixta (Mixed Precision):</strong> En HPC moderno, se calculan iteraciones intermedias en FP16/BF16 y se refina la solución final en FP64, reduciendo a la mitad el tráfico de memoria y duplicando la velocidad.
          </div>
        </div>
      </Slide>

      {/* 3. Block Floating Point y Formatos MX (NUEVO) */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.7rem 1.5rem' }}>
          <span className="hpc-badge">Formatos de Nueva Generación • OCP Microscaling</span>
          <h2 style={{ fontSize: '1.95rem', marginBottom: '0.6rem' }}>Block Floating Point (BFP) y Formatos MX (Microscaling)</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1rem', marginBottom: '0.6rem' }}>
            <div className="hpc-card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <span className="hpc-badge" style={{ fontSize: '0.68rem' }}>Concepto BFP</span>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#ffffff' }}>¿Por qué Microscaling (MX)?</h4>
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                En formatos ultra-estrechos (4 o 6 bits), dedicar bits individuales al exponente arruina la mantisa. <strong>BFP (Block Floating Point)</strong> agrupa un bloque de <strong>32 elementos</strong> que comparten un <strong>único factor de escala de 8 bits (Scale Factor E8M0)</strong>.
              </p>
              <div style={{ background: '#070a12', padding: '0.4rem 0.6rem', borderRadius: '5px', marginTop: '0.4rem', fontFamily: 'var(--font-code)', fontSize: '0.74rem', color: '#f4b860' }}>
                <Math math="\text{Valor}_i = \text{Elemento}_i \times 2^{\text{Scale Factor} - \text{Bias}}" />
              </div>
            </div>

            <div className="hpc-card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <span className="hpc-badge" style={{ fontSize: '0.68rem' }}>Estándar OCP</span>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#ffffff' }}>Catálogo de Formatos MX</h4>
              </div>
              <ul style={{ fontSize: '0.76rem', paddingLeft: '1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.25rem', lineHeight: 1.35 }}>
                <li><strong>MXFP8 (E5M2 / E4M3):</strong> Bloque de 32 elementos FP8. Casi idéntica precisión a FP16 con 50% de memoria.</li>
                <li><strong>MXFP6 (E3M2 / E2M3):</strong> 6 bits por elemento para compresión de activaciones.</li>
                <li><strong>MXFP4 (E2M1):</strong> 4 bits por elemento. Clave en <strong>NVIDIA Blackwell (NVFP4)</strong> y <strong>AMD MI350</strong> para 2x throughput en LLMs.</li>
                <li><strong>MXINT8:</strong> Formato entero de 8 bits con factor de escala compartido.</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card" style={{ padding: '0.6rem 1rem', fontSize: '0.78rem', color: '#e5e7eb' }}>
            🚀 <strong>Impacto en Hardware HPC:</strong> Estandarizado por la <strong>OCP (Open Compute Project)</strong> por AMD, Arm, Intel, Meta, Microsoft y NVIDIA. Permite que multiplicadores de 4 bits procesen operaciones tensoriales con la precisión dinámica de formatos de 16 bits.
          </div>
        </div>
      </Slide>

      {/* 4. Ancho de Banda */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Métricas • Transferencia</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>Ancho de Banda (Memory Bandwidth)</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>~100 - 300 GB/s</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>RAM Servidor (DDR5)</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                <strong>DDR5 (Double Data Rate 5)</strong>: Memoria principal del servidor conectada por múltiples canales (8 a 12 canales por socket).
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>~3.0 - 5.3 TB/s</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>Memoria HBM3e / HBM4</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                <strong>HBM (High Bandwidth Memory)</strong>: Chips de DRAM apilados en 3D sobre interposers de silicio para GPUs y aceleradores.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>64 GB/s - 400 Gbps</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>PCIe 5.0 / InfiniBand</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                <strong>PCIe (Peripheral Component Interconnect Express)</strong> y redes <strong>InfiniBand</strong> para comunicación entre nodos del cluster con MPI.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 5. Latencia vs Ancho de Banda */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Métricas • Tiempo de Respuesta</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>Latencia vs Ancho de Banda (Bandwidth)</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <span className="hpc-badge">Concepto de Latencia</span>
              <h3 style={{ margin: '0.4rem 0 0.4rem 0', fontSize: '1.15rem', color: '#ffffff' }}>Tiempo de Respuesta Inicial</h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                El retraso temporal en nanosegundos (ns) o ciclos de reloj desde que la CPU emite una instrucción <code>load</code> hasta que el primer byte llega al registro físico.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>🚰 Analogía de la Tubería</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#e5e7eb', lineHeight: 1.5 }}>
                • <strong>Latencia:</strong> Tiempo que tarda la primera gota de agua en viajar por el tubo hasta el grifo.<br />
                • <strong>Ancho de Banda:</strong> El caudal máximo del tubo (cuántos litros de datos fluyen por segundo una vez lleno).
              </p>
            </div>
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

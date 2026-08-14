import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { RooflineChart } from '../components/RooflineChart';
import { Math } from '../components/Math';

export const RooflineModel: React.FC = () => {
  return (
    <Stack>
      {/* 1. Concepto e Intensidad Operacional */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Modelos de Rendimiento • Roofline</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.8rem' }}>El Modelo Roofline</h2>

          <div className="hpc-formula-box" style={{ fontSize: '1.2rem', padding: '0.8rem 1.2rem', margin: '0.6rem 0 1.2rem 0' }}>
            <Math math="I = \frac{\text{Total FLOPs Ejecutados}}{\text{Total Bytes Transferidos de DRAM}} \quad \left[\frac{\text{FLOP}}{\text{Byte}}\right]" block />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Ecuación del Techo</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <Math math="P = \min\left(P_{\text{peak}}, \; I \times \text{BW}_{\text{peak}}\right)" block />
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Punto de Quiebre (Knee Point)</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <Math math="I_{\text{knee}} = \frac{P_{\text{peak}}}{\text{BW}_{\text{peak}}}" />: Intensidad mínima requerida para saturar las unidades de cómputo del hardware.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 2. Zona Memory-Bound */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Roofline • Zona Limitada por Memoria</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>
            Zona Memory-Bound (<Math math="I < I_{\text{knee}}" />)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Diagnóstico del Cuello de Botella</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                El algoritmo no realiza suficientes cálculos por cada byte traído de la memoria RAM. Las ALUs pasan la mayor parte del tiempo ociosas esperando datos.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>🛠️ Estrategias de Optimización</h3>
              <ul style={{ fontSize: '0.84rem', paddingLeft: '1.1rem', margin: '0.4rem 0 0 0', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li><strong>Reutilización en Caché:</strong> Loop Tiling / Blocking en L1/L2.</li>
                <li><strong>Estructuras SoA:</strong> Structure of Arrays para accesos contiguos.</li>
                <li><strong>Fusión de Bucles:</strong> Múltiples cálculos en una sola pasada.</li>
              </ul>
            </div>
          </div>
        </div>
      </Slide>

      {/* 3. Zona Compute-Bound */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Roofline • Zona Limitada por Cómputo</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>
            Zona Compute-Bound (<Math math="I > I_{\text{knee}}" />)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Diagnóstico del Cuello de Botella</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                El bus de memoria alimenta datos a suficiente velocidad; el límite máximo está acotado por la capacidad de cálculo aritmética pura de la CPU/GPU.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>🛠️ Estrategias de Optimización</h3>
              <ul style={{ fontSize: '0.84rem', paddingLeft: '1.1rem', margin: '0.4rem 0 0 0', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li><strong>Vectorización SIMD (AVX-512):</strong> Llenar todos los carriles de 512 bits.</li>
                <li><strong>Instrucciones FMA:</strong> Usar <code>vfmadd231ps</code> en punto flotante.</li>
                <li><strong>Desenrollado de Bucles:</strong> Exponer mayor paralelismo ILP.</li>
              </ul>
            </div>
          </div>
        </div>
      </Slide>

      {/* 4. Zona I/O-Bound (Almacenamiento y Red) */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Límites de Rendimiento • E/S y Red</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>
            Zona I/O-Bound (Almacenamiento y Red)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
            <div className="hpc-card" style={{ padding: '1.3rem' }}>
              <span className="hpc-badge">Diagnóstico</span>
              <h3 style={{ margin: '0.3rem 0 0.3rem 0', fontSize: '1.1rem', color: '#ffffff' }}>Cuello de Botella en Disco / Red</h3>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                La aplicación está limitada por la velocidad de lectura/escritura en almacenamiento secundario (NVMe/Lustre) o por la latencia y ancho de banda de la red (InfiniBand/Ethernet). Las CPUs permanecen bloqueadas en estado <code>iowait</code>.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.3rem' }}>
              <span className="hpc-badge">Optimización en HPC</span>
              <h3 style={{ margin: '0.3rem 0 0.3rem 0', fontSize: '1.1rem', color: '#ffffff' }}>🛠️ Mitigaciones Clave</h3>
              <ul style={{ fontSize: '0.82rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.35rem', lineHeight: 1.35 }}>
                <li><strong>I/O Asíncrono (Non-blocking):</strong> Solapar E/S y comunicación con cómputo (<code>MPI_Isend</code>, <code>io_uring</code>).</li>
                <li><strong>Formatos Científicos Binarios:</strong> Usar HDF5, NetCDF o Zarr en lugar de CSV o JSON plano.</li>
                <li><strong>Sistemas de Archivos Paralelos:</strong> Lustre / GPFS con distribución en múltiples OSTs.</li>
                <li><strong>Compresión al Vuelo:</strong> Blosc o Zstandard para reducir el volumen transferido.</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card" style={{ padding: '0.8rem 1.2rem', fontSize: '0.82rem', color: '#e5e7eb' }}>
            📊 <strong>La Tríada de Límites:</strong> Todo algoritmo en HPC está acotado por Cómputo (<Math math="\text{FLOPs}" />), Memoria (<Math math="\text{GB/s DRAM/HBM}" />) o E/S (<Math math="\text{IOPS / Red}" />). Identificar el límite exacto es el primer paso antes de optimizar.
          </div>
        </div>
      </Slide>

      {/* 5. Gráfica Interactiva */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Modelos de Rendimiento • Visualizador</span>
          <h2>Gráfica Interactiva del Modelo Roofline</h2>

          <RooflineChart />
        </div>
      </Slide>
    </Stack>
  );
};

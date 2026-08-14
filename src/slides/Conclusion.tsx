import React from 'react';
import { Slide } from '@revealjs/react';

export const Conclusion: React.FC = () => {
  return (
    <Slide>
      <div style={{ textAlign: 'left', padding: '1rem 2rem' }}>
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.6rem' }}>
          <span className="hpc-badge">MasFLOPSQueCabras</span>
          <span className="hpc-badge">Resumen Final</span>
        </div>
        <h2 style={{ fontSize: '2.1rem', marginBottom: '1.2rem' }}>Conclusiones y Principios Clave en HPC</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', maxWidth: '950px' }}>
          <div className="hpc-card" style={{ padding: '1.2rem 1.4rem' }}>
            <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>1. Conoce el Hardware y la Microarquitectura</h4>
            <p style={{ fontSize: '0.82rem', margin: 0, color: '#cbd5e1', lineHeight: 1.45 }}>
              Diseña algoritmos conscientes de la división <strong>Frontend/Backend</strong>, saturando las estaciones de reserva, evitando fallos de predicción y respetando la topología <strong>NUMA</strong> guiado por el <strong>Modelo Roofline</strong>.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '1.2rem 1.4rem' }}>
            <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>2. Explotar el Paralelismo y Formatos MX</h4>
            <p style={{ fontSize: '0.82rem', margin: 0, color: '#cbd5e1', lineHeight: 1.45 }}>
              Combina vectorización SIMD / VLA con <strong>Block Floating Point (MXFP8/MXFP4)</strong>, SPMD (MPI/OpenMP) y SIMT (GPUs) buscando un <strong>escalamiento débil sostenible (Gustafson)</strong>.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '1.2rem 1.4rem' }}>
            <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>3. Colaborar con el Compilador</h4>
            <p style={{ fontSize: '0.82rem', margin: 0, color: '#cbd5e1', lineHeight: 1.45 }}>
              Escribe código con diseño SoA (Structure of Arrays), añade <code>__restrict__</code> y aprovecha flags de optimización (<code>-O3 -march=native -ffast-math</code>) para maximizar la auto-vectorización y DCO.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '1.2rem 1.4rem' }}>
            <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>4. Perfilado y Medición</h4>
            <p style={{ fontSize: '0.82rem', margin: 0, color: '#cbd5e1', lineHeight: 1.45 }}>
              Inspecciona el ensamblador generado en <strong>Compiler Explorer (Godbolt)</strong> y monitorea métricas de IPC y tráfico de memoria antes de realizar optimizaciones manuales prematuras.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '1.8rem', textAlign: 'center', maxWidth: '950px' }}>
          <h3 style={{ fontSize: '1.35rem', color: '#ffffff', margin: 0 }}>¡Gracias por su atención!</h3>
          <p style={{ fontSize: '0.88rem', color: '#9ca3af', marginTop: '0.3rem' }}>
            MasFLOPSQueCabras • Arquitectura de Computadores, Rendimiento y Compiladores
          </p>
        </div>
      </div>
    </Slide>
  );
};

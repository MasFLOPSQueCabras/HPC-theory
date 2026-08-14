import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { NumaDiagram } from '../components/NumaDiagram';

export const MemoryArchitectures: React.FC = () => {
  return (
    <Stack>
      {/* 1. UMA vs NUMA Topología */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Jerarquía de Memoria • Topologías</span>
          <h2>Arquitecturas de Memoria: UMA vs NUMA</h2>

          <NumaDiagram />
        </div>
      </Slide>

      {/* 2. Comparativa Real: AMD/Intel (NUMA) vs Apple Serie M (UMA) */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Arquitecturas Reales • Comparativa de la Industria</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>AMD / Intel (NUMA) vs Apple Silicon Serie M (UMA)</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
            {/* AMD / Intel NUMA Card */}
            <div className="hpc-card" style={{ padding: '1.3rem' }}>
              <span className="hpc-badge">Servidores x86 • NUMA Distribuido</span>
              <h3 style={{ margin: '0.3rem 0 0.4rem 0', fontSize: '1.15rem', color: '#ffffff' }}>AMD EPYC / Intel Xeon</h3>
              
              <ul style={{ fontSize: '0.82rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.45rem', lineHeight: 1.4 }}>
                <li><strong>Topología:</strong> Multi-Socket y Multi-Chiplet conectados por buses de alta velocidad (Infinity Fabric / UPI).</li>
                <li><strong>Memoria:</strong> Canales DDR5 independientes por procesador (hasta 12 canales por socket).</li>
                <li><strong>Ventaja:</strong> Capacidad masiva de memoria RAM (de 1 TB a varios TB por nodo de servidor).</li>
                <li><strong>Desafío:</strong> Accesos a memoria remota en otros sockets añaden &gt;2x de latencia; CPU y GPU requieren copias por PCIe.</li>
              </ul>
            </div>

            {/* Apple M-Series UMA Card */}
            <div className="hpc-card" style={{ padding: '1.3rem' }}>
              <span className="hpc-badge">SoC Integrado • UMA Unificada</span>
              <h3 style={{ margin: '0.3rem 0 0 0', fontSize: '1.15rem', color: '#ffffff' }}>Apple Silicon (M2/M3/M4 Max/Ultra)</h3>
              
              <ul style={{ fontSize: '0.82rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.45rem', lineHeight: 1.4 }}>
                <li><strong>Topología:</strong> UMA integrada (System-in-Package con bus UltraFusion de bajísima latencia).</li>
                <li><strong>Memoria:</strong> Bus LPDDR5X ultra ancho (hasta 800 GB/s en Ultra) compartido por CPU, GPU y NPU.</li>
                <li><strong>Ventaja (Zero-Copy):</strong> CPU y GPU leen y escriben exactamente el mismo búfer físico sin copias por PCIe.</li>
                <li><strong>Límite:</strong> Capacidad acotada a la RAM soldada (hasta 128-192 GB) y no escala a servidores multi-nodo.</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card" style={{ padding: '0.8rem 1.2rem', fontSize: '0.82rem', color: '#e5e7eb' }}>
            💡 <strong>Divergencia de Diseño:</strong> En HPC de gran escala dominan los servidores NUMA modulares por su capacidad de escalar a miles de nodos, mientras que en estaciones de trabajo para IA local, la UMA de Apple destaca por su transferencia Zero-Copy de alta velocidad.
          </div>
        </div>
      </Slide>

      {/* 3. La Política First-Touch */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Optimización • Asignación de Páginas</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>La Política First-Touch del SO</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.3rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>¿Cuándo se asigna la RAM física?</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <code>malloc()</code> únicamente reserva rango de direcciones virtuales. La <strong>página física de 4KB se asigna en el primer acceso de escritura (Page Fault)</strong> en el socket NUMA local que ejecuta el hilo.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.3rem', fontSize: '0.86rem', color: '#e5e7eb', lineHeight: 1.45 }}>
              ⚠️ <strong>Peligro del Hilo Principal:</strong> Si el hilo 0 inicializa todo el arreglo secuencialmente, <strong>el 100% de la RAM residirá en el Socket 0</strong>. El resto de sockets sufrirán penalizaciones de latencia remota (&gt;2x) durante el cálculo paralelo.
            </div>
          </div>
        </div>
      </Slide>

      {/* 4. Código C++: Mala Práctica */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">NUMA • Antipatrón</span>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>❌ Inicialización Serial (Mala Práctica)</h2>

          <div style={{ maxWidth: '950px' }}>
            <pre className="hpc-code-block" style={{ fontSize: '0.82rem', padding: '1rem', margin: '0 0 0.8rem 0' }}>
{`double *A = (double*) malloc(N * sizeof(double));

// 1. Inicializado en serie por el Hilo Principal en Node 0
for (int i = 0; i < N; i++) {
    A[i] = 0.0; // ¡Toda la memoria física queda asignada en Node 0!
}

// 2. Bucle paralelo distribuido entre sockets
#pragma omp parallel for
for (int i = 0; i < N; i++) {
    A[i] += 1.0; // Los hilos de Node 1 saturan el enlace inter-socket (UPI)
}`}
            </pre>

            <div className="hpc-card" style={{ padding: '0.7rem 1.2rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
              Los hilos en el Socket 1 deben cruzar constantemente la interconexión para leer/escribir en la RAM del Socket 0, degradando drásticamente el ancho de banda efectivo.
            </div>
          </div>
        </div>
      </Slide>

      {/* 5. Código C++: Buena Práctica */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">NUMA • Patrón Correcto</span>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>✅ Inicialización First-Touch Paralela</h2>

          <div style={{ maxWidth: '950px' }}>
            <pre className="hpc-code-block" style={{ fontSize: '0.82rem', padding: '1rem', margin: '0 0 0.8rem 0' }}>
{`double *A = (double*) malloc(N * sizeof(double));

// 1. Inicializado en paralelo con la MISMA partición de hilos
#pragma omp parallel for
for (int i = 0; i < N; i++) {
    A[i] = 0.0; // Cada página física se asigna en la RAM del nodo local
}

// 2. Bucle paralelo de cálculo
#pragma omp parallel for
for (int i = 0; i < N; i++) {
    A[i] += 1.0; // ¡Accesos 100% locales a máxima velocidad y ancho de banda!
}`}
            </pre>

            <div className="hpc-card" style={{ padding: '0.7rem 1.2rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
              Cada socket accede exclusivamente a sus propios canales de memoria locales, alcanzando el ancho de banda agregado máximo del sistema sin cuellos de botella.
            </div>
          </div>
        </div>
      </Slide>

      {/* 6. Control de Afinidad */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">NUMA • Configuración de Ejecución</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>Afinidad de Hilos y Herramientas</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <strong style={{ color: '#ffffff', fontSize: '1rem' }}>Variables OpenMP:</strong>
              <div style={{ background: '#070a12', padding: '0.6rem 0.8rem', borderRadius: '6px', margin: '0.5rem 0', fontFamily: 'var(--font-code)', fontSize: '0.82rem', color: '#f8fafc' }}>
                export OMP_PROC_BIND=spread<br />
                export OMP_PLACES=cores
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1' }}>
                Fija hilos a núcleos impidiendo migraciones de contexto que destruirían la localidad de caché.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <strong style={{ color: '#ffffff', fontSize: '1rem' }}>Herramienta numactl:</strong>
              <div style={{ background: '#070a12', padding: '0.6rem 0.8rem', borderRadius: '6px', margin: '0.5rem 0', fontFamily: 'var(--font-code)', fontSize: '0.82rem', color: '#f8fafc' }}>
                numactl --membind=0 --physcpubind=0-15 ./app
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1' }}>
                Fuerza la ejecución del proceso y asignación de memoria en un socket NUMA exclusivo.
              </p>
            </div>
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

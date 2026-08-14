import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { MemoryHierarchyDiagram } from '../components/MemoryHierarchyDiagram';
import { MemoryWallChart } from '../components/MemoryWallChart';
import { MemorySolutionsDiagram } from '../components/MemorySolutionsDiagram';
import { NumaDiagram } from '../components/NumaDiagram';

export const MemoryArchitectures: React.FC = () => {
  return (
    <Stack>
      {/* 1. Jerarquía de Latencias y Ancho de Banda (DIAGRAMA DEDICADO) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Jerarquía de Memoria • La Escala de Latencia</span>
          <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            El Muro de la Memoria: Jerarquía de Latencias y Ancho de Banda
          </h2>

          <MemoryHierarchyDiagram />
        </div>
      </Slide>

      {/* 2. Análisis de la Jerarquía y Principio de Localidad */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Jerarquía de Memoria • Principios Teóricos</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              El Principio de Localidad y la Pirámide de Silicio
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Localidad 1</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Localidad Temporal</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Si una dirección de memoria fue accedida recientemente, es altamente probable que vuelva a ser leída o modificada en un futuro cercano.
              </p>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                <strong className="text-white">Implementación:</strong> Mantener variables activas y acumuladores en registros de CPU y caché L1.
              </div>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Localidad 2</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Localidad Espacial</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Si se accede a una dirección de memoria <code className="text-slate-200 font-mono">addr</code>, es muy probable que se acceda a direcciones adyacentes <code className="text-slate-200 font-mono">addr + 1</code> poco después.
              </p>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                <strong className="text-white">Implementación:</strong> Transferencia de líneas de caché completas de 64 bytes (Cache Lines) y prefetchers por hardware.
              </div>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            🚀 <strong className="text-white">Regla para HPC:</strong> Organizar matrices en formato contiguo (<strong className="text-white">Structure of Arrays - SoA</strong>) para maximizar la localidad espacial y el ancho de banda vectorial.
          </div>
        </div>
      </Slide>

      {/* 3. Gráfico Histórico del Memory Wall (CHART DEDICADO) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Memory Wall • Divergencia Histórica</span>
          <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            La Brecha Histórica entre Cómputo y Memoria (1980 - 2025)
          </h2>

          <MemoryWallChart />
        </div>
      </Slide>

      {/* 4. Análisis del Memory Wall */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Memory Wall • Análisis de Causa</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              ¿Por qué la DRAM no pudo seguir el ritmo de las CPUs?
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Causa Física</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Física del Condensador DRAM</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Cada celda de DRAM es un minúsculo condensador de 1T1C:
              </p>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li>Cargar y descargar el condensador toma un tiempo físico inmutable (<strong className="text-white">~10-15 ns de ciclo tRC</strong>).</li>
                <li>La latencia de lectura (<strong className="text-white">CAS Latency</strong>) apenas mejoró de ~60 ns en 1990 a ~40-50 ns en DDR5 actual.</li>
              </ul>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Impacto en Rendimiento</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">La Penalización del Fallo de Caché</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                En 1980, un fallo de memoria costaba 1 ciclo de reloj. En un procesador moderno a 4.0 GHz:
              </p>
              <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 text-sm font-mono text-center text-slate-200">
                Latencia DRAM (50 ns) &times; 4.0 GHz = <strong className="text-white">200 ciclos de CPU perdidos</strong>
              </div>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            ⚠️ Sin técnicas de mitigación masivas en silicio, una CPU pasaría el 95% de su tiempo congelada esperando datos de la DRAM.
          </div>
        </div>
      </Slide>

      {/* 5. Soluciones en Silicio (DIAGRAMA DEDICADO) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Memory Wall • Respuestas de la Industria</span>
          <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Mitigaciones en Silicio: HBM3e, 3D V-Cache y CXL
          </h2>

          <MemorySolutionsDiagram />
        </div>
      </Slide>

      {/* 6. Detalle Arquitectural de Soluciones */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Memory Wall • Tecnologías de Memoria</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              HBM3e, 3D V-Cache y CXL Fabric en Detalle
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5 my-2">
            <div className="hpc-card p-5">
              <span className="hpc-badge font-mono mb-2 text-xs">Memoria Apilada</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">HBM3e (High Bandwidth)</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed space-y-1">
                • Capas de silicio 3D conectadas por <strong className="text-white">TSVs (Through-Silicon Vias)</strong>.<br />
                • Bus ultra ancho de 1024 bits por pila.<br />
                • Ancho de banda superior a <strong className="text-white">5.3 TB/s</strong> por socket (NVIDIA H200 / AMD MI300X).
              </p>
            </div>

            <div className="hpc-card p-5">
              <span className="hpc-badge font-mono mb-2 text-xs">Caché 3D Apilada</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">AMD 3D V-Cache</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed space-y-1">
                • Die de caché SRAM L3 apilado por unión directa cobre-cobre (Hybrid Bonding).<br />
                • Hasta <strong className="text-white">1.15 GB de L3</strong> en AMD EPYC 9684X.<br />
                • Reduce los fallos a DRAM en &gt;60% en dinámica molecular y CFD.
              </p>
            </div>

            <div className="hpc-card p-5">
              <span className="hpc-badge font-mono mb-2 text-xs">Memoria Abierta</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">CXL (Compute Express Link)</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed space-y-1">
                • Protocolo coherente sobre PCIe 5.0/6.0.<br />
                • Permite <strong className="text-white">Memory Pooling</strong> compartido entre nodos.<br />
                • Expansión dinámica de capacidad de RAM sin límites de ranuras DDR.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            💡 La combinación de HBM3e (ancho de banda local) y CXL (capacidad global) define los supercomputadores Exascale modernos.
          </div>
        </div>
      </Slide>

      {/* 7. UMA vs NUMA Topología (DIAGRAMA DEDICADO) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Jerarquía de Memoria • Topologías</span>
          <h2 className="text-2xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Arquitecturas de Memoria: UMA vs NUMA
          </h2>

          <NumaDiagram />
        </div>
      </Slide>

      {/* 8. Comparativa Real: AMD/Intel (NUMA) vs Apple Serie M (UMA) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Arquitecturas Reales • Comparativa de la Industria</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              AMD / Intel (NUMA) vs Apple Silicon Serie M (UMA)
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            {/* AMD / Intel NUMA Card */}
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Servidores x86 • NUMA Distribuido</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">AMD EPYC / Intel Xeon</h3>
              
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-2 list-disc leading-relaxed">
                <li><strong className="text-white">Topología:</strong> Multi-Socket y Multi-Chiplet conectados por buses coherentes (AMD Infinity Fabric / Intel UPI).</li>
                <li><strong className="text-white">Memoria:</strong> Canales DDR5 independientes por procesador (hasta 12 canales por socket).</li>
                <li><strong className="text-white">Ventaja:</strong> Capacidad masiva de RAM (1 TB a varios TB por nodo).</li>
                <li><strong className="text-slate-200">Desafío:</strong> Accesos remotos a otros sockets añaden &gt;2x de latencia; CPU y GPU requieren copias por PCIe.</li>
              </ul>
            </div>

            {/* Apple M-Series UMA Card */}
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">SoC Integrado • UMA Unificada</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Apple Silicon (M2/M3/M4 Max/Ultra)</h3>
              
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-2 list-disc leading-relaxed">
                <li><strong className="text-white">Topología:</strong> UMA integrada (System-in-Package con bus UltraFusion de bajísima latencia).</li>
                <li><strong className="text-white">Memoria:</strong> Bus LPDDR5X ultra ancho (hasta 800 GB/s) compartido por CPU, GPU y NPU.</li>
                <li><strong className="text-white">Ventaja (Zero-Copy):</strong> CPU y GPU leen y escriben exactamente el mismo búfer físico sin copias.</li>
                <li><strong className="text-slate-200">Límite:</strong> Capacidad acotada a la RAM soldada (hasta 128-192 GB) y no escala a clusters multi-nodo.</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            💡 <strong className="text-white">Divergencia de Diseño:</strong> En supercomputadores domina <strong className="text-white">NUMA</strong> por su capacidad de escalar a miles de nodos, mientras que en estaciones de trabajo para IA local, la <strong className="text-white">UMA</strong> de Apple destaca por su transferencia Zero-Copy de alta velocidad.
          </div>
        </div>
      </Slide>

      {/* 9. La Política First-Touch */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Optimización • Asignación de Páginas</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              La Política First-Touch del Sistema Operativo
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">¿Cuándo se asigna la RAM física?</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                <code className="text-white font-mono">malloc()</code> únicamente reserva rango de direcciones virtuales. La <strong className="text-white">página física de 4KB se asigna en el primer acceso de escritura (Page Fault)</strong> en el socket NUMA local que ejecuta el hilo en ese instante.
              </p>
            </div>

            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">⚠️ El Hilo Principal Centralizado</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Si el hilo principal inicializa todo el arreglo secuencialmente en un bucle simple, <strong className="text-white">el 100% de las páginas físicas residirán en el Socket 0</strong>. El resto de sockets sufrirán penalizaciones de latencia remota (&gt;2.5x) durante todo el cálculo paralelo.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            💡 <strong className="text-white">Regla de Oro en Servidores NUMA:</strong> El hilo o procesador que calculará sobre los datos debe ser exactamente el que realice la inicialización en memoria.
          </div>
        </div>
      </Slide>

      {/* 10. First-Touch: Antipatrón Serial (SLIDE DEDICADA) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">First-Touch • Antipatrón (1/2)</span>
            <h2 className="text-3xl font-bold text-rose-400 mb-3 border-b border-slate-800 pb-2">
              ❌ Antipatrón: Inicialización Serial Centralizada
            </h2>
          </div>

          <div className="my-2">
            <pre className="hpc-code-block text-sm">
{`double *A = (double*) malloc(N * sizeof(double));

// 1. Inicialización en serie por el Hilo 0 (ejecutándose en Socket 0)
for (int i = 0; i < N; i++) {
    A[i] = 0.0; // ¡TODAS las páginas de 4KB se alojan en el Socket 0!
}

// 2. Bucle de cálculo paralelo distribuido con OpenMP
#pragma omp parallel for
for (int i = 0; i < N; i++) {
    A[i] += 1.0; // Los hilos en Socket 1, 2, 3 sufren accesos remotos lentos (>2.5x)
}`}
            </pre>
          </div>

          <div className="hpc-card p-5 text-sm text-slate-300 border-rose-500/30">
            ⚠️ <strong className="text-white">Consecuencia en Silicio:</strong> El bus de interconexión (UPI / Infinity Fabric) se satura con peticiones de lectura/escritura hacia la memoria del Socket 0, destruyendo la aceleración paralela esperada.
          </div>
        </div>
      </Slide>

      {/* 11. First-Touch: Patrón Paralelo (SLIDE DEDICADA) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">First-Touch • Patrón Correcto (2/2)</span>
            <h2 className="text-3xl font-bold text-emerald-400 mb-3 border-b border-slate-800 pb-2">
              ✅ Patrón Correcto: First-Touch Paralelo Equitativo
            </h2>
          </div>

          <div className="my-2">
            <pre className="hpc-code-block text-sm">
{`double *A = (double*) malloc(N * sizeof(double));

// 1. Inicialización en paralelo con la MISMA partición de hilos
#pragma omp parallel for
for (int i = 0; i < N; i++) {
    A[i] = 0.0; // Las páginas de 4KB se asignan en el socket NUMA local de cada hilo
}

// 2. Bucle de cálculo paralelo
#pragma omp parallel for
for (int i = 0; i < N; i++) {
    A[i] += 1.0; // ¡100% de accesos locales a máxima velocidad y cero saturación del bus!
}`}
            </pre>
          </div>

          <div className="hpc-card p-5 text-sm text-slate-300 border-emerald-500/30">
            🚀 <strong className="text-white">Resultado:</strong> Cada procesador accede exclusivamente a sus propios módulos DDR5 locales a latencia mínima (~60 ns) y ancho de banda multiplicado por el número de sockets.
          </div>
        </div>
      </Slide>

      {/* 12. Control de Afinidad */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">NUMA • Configuración de Ejecución</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Afinidad de Hilos y Herramientas del Sistema
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Variables OpenMP (Fijación)</h3>
              <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 font-mono text-sm text-slate-200 my-2">
                export OMP_PROC_BIND=spread<br />
                export OMP_PLACES=cores
              </div>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Fija hilos a núcleos físicos impidiendo migraciones de contexto por el scheduler de Linux que destruirían la localidad de caché L1/L2.
              </p>
            </div>

            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Linux CLI (numactl)</h3>
              <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 font-mono text-sm text-slate-200 my-2">
                numactl --membind=0 --physcpubind=0-15 ./app
              </div>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Fuerza la ejecución del proceso y asignación de memoria en un nodo NUMA exclusivo, evitando accesos remotos involuntarios.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            🚀 <strong className="text-white">Resultado:</strong> Rendimiento determinista y aislamiento de memoria garantizado en nodos de cómputo multi-tenant.
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

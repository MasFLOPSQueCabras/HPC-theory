import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { VonNeumannSlide } from '../components/microarch/VonNeumannSlide';
import { HarvardSlide } from '../components/microarch/HarvardSlide';
import { FrontendBackendOverview } from '../components/microarch/FrontendBackendOverview';
import { FrontendDetail } from '../components/microarch/FrontendDetail';
import { BackendDetail } from '../components/microarch/BackendDetail';
import { PipelineDiagram } from '../components/PipelineDiagram';
import { HazardsDiagram } from '../components/HazardsDiagram';
import { PpaDiagram } from '../components/PpaDiagram';
import { RobDiagram } from '../components/RobDiagram';
import { Math } from '../components/Math';

export const Microarchitecture: React.FC = () => {
  return (
    <Stack>
      {/* 1. ISA vs Microarquitectura */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Fundamentos</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              ISA vs Microarquitectura (&mu;Arch)
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge-cyan font-mono mb-3 text-xs">ISA</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Instruction Set Architecture</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                El <strong className="text-white">contrato lógico abstracto</strong> entre software y hardware (ej. <code className="text-slate-200 font-mono">x86-64</code>, <code className="text-slate-200 font-mono">ARMv9</code>, <code className="text-slate-200 font-mono">RISC-V</code>). Define los registros visibles (ARF), los opcodes, modos de direccionamiento y el modelo de consistencia de memoria.
              </p>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge-yellow font-mono mb-3 text-xs">&mu;Arch</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Microarquitectura (Silicio)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                La <strong className="text-white">implementación física en silicio</strong> (ej. Intel Golden Cove, AMD Zen 5, Apple M4, ARM Neoverse V2). Determina la profundidad del pipeline, el tamaño del Reorder Buffer (ROB), los puertos de ejecución y la jerarquía de cachés.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#161d2d] border border-[#e6ff00]/40 text-[#e6ff00] font-mono font-bold shrink-0">
              [DESACOPLAMIENTO]
            </span>
            <span>
              <strong className="text-white">Desacoplamiento:</strong> Dos procesadores pueden compartir exactamente la misma ISA (ej. AMD EPYC e Intel Xeon x86-64) pero poseer microarquitecturas de silicio radicalmente distintas.
            </span>
          </div>
        </div>
      </Slide>

      {/* 2. Ecuación de Rendimiento de la CPU */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Métricas Fundamentales</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Ecuación Clásica de Rendimiento de la CPU
            </h2>
          </div>

          <div className="hpc-formula-box my-2 text-lg">
            <Math math="\text{CPU Time} = N_{\text{inst}} \times \text{CPI} \times T_{\text{clk}} = \frac{N_{\text{inst}} \times \text{CPI}}{f}" block />
          </div>

          <div className="grid grid-cols-3 gap-5 my-2">
            <div className="hpc-card p-5">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">Término 1: N_inst</span>
              <h4 className="m-0 text-base font-bold text-white mb-1">N° de Instrucciones</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                Determinado por la complejidad del algoritmo y la optimización del compilador (eliminando código muerto con DCO/DCE).
              </p>
            </div>

            <div className="hpc-card p-5">
              <span className="hpc-badge-yellow font-mono mb-2 text-xs">Término 2: CPI / IPC</span>
              <h4 className="m-0 text-base font-bold text-white mb-1">CPI (Ciclos / Inst)</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                Determinado por la microarquitectura (Pipelining, ejecución OoO). Su inverso es el <strong className="text-white">IPC</strong>: <Math math="\text{IPC} = \frac{1}{\text{CPI}}" />.
              </p>
            </div>

            <div className="hpc-card p-5">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">Término 3: T_clk / f</span>
              <h4 className="m-0 text-base font-bold text-white mb-1">Tiempo de Ciclo y Frecuencia</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                Determinado por el nodo litográfico y el retardo del camino crítico (<Math math="T_{\text{clk}} = \frac{1}{f}" /> en GHz).
              </p>
            </div>
          </div>

          <div className="hpc-card p-3.5 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#10241e] border border-[#34d399]/40 text-[#34d399] font-mono font-bold shrink-0">
              [OBJETIVO HPC]
            </span>
            <span>
              <strong className="text-white">Objetivo HPC:</strong> Minimizar los tres términos en paralelo mediante compiladores modernos, microarquitectura fuera de orden y litografías de vanguardia.
            </span>
          </div>
        </div>
      </Slide>

      {/* 3. El Trilema del Silicio: PPA */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Trilema de Diseño</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              El Trilema Fundamental del Silicio: PPA (Power, Performance, Area)
            </h2>
          </div>

          <PpaDiagram />
        </div>
      </Slide>

      {/* 4. Ley de Moore vs Dennard Scaling */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Leyes Físicas (1/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Leyes Físicas: Ley de Moore vs Dennard Scaling
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge-purple font-mono mb-2 text-xs">Escalamiento de Transistores</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Ley de Moore (1965)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                El número de transistores integrados por chip se duplica aproximadamente cada dos años. Permite añadir más núcleos en paralelo, cachés L3 compartidas más masivas y registros vectoriales anchos (AVX-512).
              </p>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">Escalamiento de Potencia</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Dennard Scaling (1974 - 2005)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Establecía que al reducir el tamaño físico del transistor, la densidad de potencia permanecía constante porque el voltaje de operación (<Math math="V" />) bajaba en proporción directa con la litografía.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#161d2d] border border-[#e6ff00]/40 text-[#e6ff00] font-mono font-bold shrink-0">
              [HISTORIA]
            </span>
            <span>
              Durante décadas, Dennard Scaling permitió aumentar la frecuencia de reloj sin sobrecalentar el procesador.
            </span>
          </div>
        </div>
      </Slide>

      {/* 5. El Fin de Dennard Scaling (2005) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Leyes Físicas (2/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              El Fin de Dennard Scaling y el Muro de Frecuencia
            </h2>
          </div>

          <div className="hpc-card p-6 my-2 border-[#fb7185]/40">
            <div className="flex items-center gap-2 mb-3">
              <span className="hpc-badge-rose text-xs font-mono mb-0">RUPTURA DE DENNARD (2005)</span>
            </div>
            <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
              Al descender por debajo del umbral de <strong className="text-white">~0.8V</strong>, el grosor del óxido de puerta se redujo a unos pocos átomos, disparando las <strong className="text-white">corrientes de fuga cuántica (fuga de túnel)</strong>.
            </p>
            <p className="m-0 text-sm text-slate-300 leading-relaxed">
              El escalamiento libre de frecuencia de reloj se estancó en el rango de <strong className="text-white">3.0 a 5.0 GHz</strong> para siempre. La industria se vio forzada a abandonar la carrera por GHz mononúcleo e iniciar la era de los <strong className="text-white">procesadores multinúcleo y aceleradores heterogéneos (GPUs / TPUs)</strong>.
            </p>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#1e131d] border border-[#fb7185]/40 text-[#fb7185] font-mono font-bold shrink-0">
              [CONSECUENCIA HPC]
            </span>
            <span>
              <strong className="text-white">Consecuencia HPC:</strong> La ganancia de rendimiento ya no es automática por hardware; el software debe ser explícitamente paralelo.
            </span>
          </div>
        </div>
      </Slide>

      {/* 6. Power Wall y Dark Silicon */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Límites Térmicos</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Power Wall y Silicio Oscuro (Dark Silicon)
            </h2>
          </div>

          <div className="hpc-formula-box my-2 text-lg">
            <Math math="P_{\text{total}} = P_{\text{dyn}} + P_{\text{leak}} = (\alpha \cdot C \cdot V^2 \cdot f) + (I_{\text{leak}} \cdot V)" block />
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6 border-t-2 border-t-[#fb7185]">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Power Wall</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Límite térmico máximo (~300W a 500W por socket) que puede disiparse por refrigeración antes de la degradación física o electromigración del silicio.
              </p>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#c084fc]">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Dark Silicon</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                En litografías modernas sub-3nm, <strong className="text-white">un porcentaje significativo del silicio debe permanecer apagado o en reposo</strong> para no sobrepasar el presupuesto térmico máximo del procesador.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#161d2d] border border-[#e6ff00]/40 text-[#e6ff00] font-mono font-bold shrink-0">
              [SOLUCIÓN]
            </span>
            <span>
              <strong className="text-white">Solución de la Industria:</strong> Diseñar silicio heterogéneo (núcleos especializados que se activan solo para su carga: NPU, AVX-512, decodificadores multimedia).
            </span>
          </div>
        </div>
      </Slide>

      {/* 7a. Arquitectura Clásica: Modelo Von Neumann - Diagrama */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Arquitectura Clásica • Von Neumann (1/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Modelo Von Neumann (1945): Diagrama de Silicio
            </h2>
          </div>

          <VonNeumannSlide />
        </div>
      </Slide>

      {/* 7b. Arquitectura Clásica: Modelo Von Neumann - Explicación */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Arquitectura Clásica • Von Neumann (2/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Modelo Von Neumann: Principios y Cuello de Botella
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-auto">
            <div className="hpc-card p-6 border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">Principio de Diseño</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Memoria Unificada Compartida</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Las instrucciones del programa ejecutable y los datos residen en el <strong className="text-white">mismo espacio físico de direcciones</strong> y viajan a través del mismo bus.
              </p>
              <ul className="m-0 p-0 pl-4 text-xs text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li><strong className="text-white">Ventaja:</strong> Máxima flexibilidad para el sistema operativo en la asignación de memoria.</li>
                <li><strong className="text-white">Coste de Silicio:</strong> Reduce el número de pines físicos y complejidad de cableado.</li>
              </ul>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#fb7185]">
              <span className="hpc-badge-rose font-mono mb-2 text-xs">Limitación Física</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">El Cuello de Botella de Von Neumann</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                En un instante de tiempo <Math math="t" />, la CPU solo puede transferir <strong className="text-[#fb7185]">una instrucción O un dato</strong> a través del canal único.
              </p>
              <ul className="m-0 p-0 pl-4 text-xs text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li>El ancho de banda del bus único restringe severamente el rendimiento computacional.</li>
                <li>En procesadores segmentados genera <strong className="text-white">stalls obligatorios</strong> por contención de bus.</li>
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#07080c] border border-[#232a3d] text-xs text-slate-300">
            <strong className="text-white">Uso en la Actualidad:</strong> Estándar universal en la <strong className="text-white">Memoria RAM Principal (DDR5 / LPDDR5X)</strong> debido a su bajo coste de bus y flexibilidad de direccionamiento.
          </div>
        </div>
      </Slide>

      {/* 8a. Arquitectura Clásica: Modelo Harvard - Diagrama */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Arquitectura Clásica • Harvard (1/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Modelo Harvard (1944): Diagrama de Silicio
            </h2>
          </div>

          <HarvardSlide />
        </div>
      </Slide>

      {/* 8b. Arquitectura Clásica: Modelo Harvard - Explicación */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Arquitectura Clásica • Harvard (2/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Modelo Harvard: Concurrencia y Jerarquía L1
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-auto">
            <div className="hpc-card p-6 border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">Principio de Diseño</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Buses y Memorias Físicas Separadas</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Existen <strong className="text-white">dos espacios físicos independientes</strong> con sus propios conjuntos de buses de direcciones, datos y control.
              </p>
              <ul className="m-0 p-0 pl-4 text-xs text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li><strong className="text-white">Especialización:</strong> El bus de instrucciones y el de datos pueden tener anchos de palabra distintos (ej. 32-bit instrucciones, 64-bit datos).</li>
                <li><strong className="text-white">Aislamiento:</strong> La memoria de código es de solo lectura en ejecución, previniendo sobreescrituras accidentales.</li>
              </ul>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">Ventaja de Silicio</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Acceso Simultáneo Concurrente</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                La CPU puede realizar el <strong className="text-white">Fetch de la siguiente instrucción</strong> al mismo tiempo exacto que ejecuta un <strong className="text-white">Load/Store de datos</strong>.
              </p>
              <ul className="m-0 p-0 pl-4 text-xs text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li><strong className="text-white">Zero Hazard Estructural:</strong> Las etapas de búsqueda y acceso a memoria no compiten jamás por el mismo puerto.</li>
                <li>Habilita el rendimiento de 1 ciclo por instrucción (CPI = 1) en pipelines RISC.</li>
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#07080c] border border-[#232a3d] text-xs text-slate-300">
            <strong className="text-white">Uso en la Actualidad:</strong> Base de la jerarquía de <strong className="text-sky-400">caché L1 (L1I y L1D separadas)</strong> en todos los procesadores modernos de alto rendimiento (Intel Core/Xeon, AMD Zen, ARM Neoverse, Apple Silicon).
          </div>
        </div>
      </Slide>

      {/* 9. Harvard Modificada: El Conflicto de Caché Unificada */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Jerarquía L1 • Harvard Modificada (1/4)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              El Conflicto Estructural en Caché Unificada
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6 border-t-2 border-t-[#fb7185]">
              <span className="hpc-badge-rose font-mono mb-2 text-xs">Von Neumann Puro</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">El Conflicto Estructural</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Si el núcleo utiliza una sola memoria caché para instrucciones y datos:
              </p>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li>En el mismo ciclo de reloj, la etapa <strong className="text-white">Fetch (IF)</strong> necesita leer una nueva instrucción.</li>
                <li>Simultáneamente, la etapa <strong className="text-white">Memoria (MEM)</strong> necesita leer o escribir una variable de datos (Load / Store).</li>
                <li>Ambas etapas compiten por los mismos puertos físicos del bus de caché.</li>
              </ul>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">Harvard Modificada</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">La Solución: Nivel L1 Dividido (Split)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Todas las CPUs modernas dividen físicamente su memoria caché L1 en dos bancos independientes:
              </p>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li><strong className="text-white">L1 I-Cache (32-64 KB):</strong> Exclusiva para instrucciones, conectada al Frontend.</li>
                <li><strong className="text-white">L1 D-Cache (32-64 KB):</strong> Exclusiva para datos, conectada a las AGUs del Backend.</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#161d2d] border border-[#e6ff00]/40 text-[#e6ff00] font-mono font-bold shrink-0">
              [ARQUITECTURA DUAL]
            </span>
            <span>
              A nivel de memoria RAM y caché L2/L3 el sistema es Von Neumann unificado; a nivel de caché L1 es Harvard dividido.
            </span>
          </div>
        </div>
      </Slide>

      {/* 10. Harvard Modificada: Pilar 1 (Ancho de Banda) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Jerarquía L1 • Harvard Modificada (2/4)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Pilar 1: Duplicación de Ancho de Banda y Concurrencia
            </h2>
          </div>

          <div className="hpc-card p-6 my-2">
            <h3 className="m-0 text-lg font-bold text-white mb-3">Acceso Simultáneo en el Mismo Ciclo de Reloj</h3>
            <p className="m-0 text-sm text-slate-300 leading-relaxed mb-4">
              Al separar la L1 en dos estructuras físicas con rutas de buses independientes, el procesador puede realizar <strong className="text-white">dos accesos a memoria concurrentes en cada ciclo</strong> sin colisiones ni arbitraje de bus.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#07080c] border border-[#232a3d]">
                <span className="font-bold text-[#38bdf8] text-sm">Flujo de Instrucciones:</span>
                <p className="m-0 mt-1 text-xs text-slate-300 leading-relaxed">El Frontend lee hasta 32 o 64 bytes de instrucciones desde la I-Cache para alimentar el decodificador.</p>
              </div>
              <div className="p-4 rounded-lg bg-[#07080c] border border-[#232a3d]">
                <span className="font-bold text-[#34d399] text-sm">Flujo de Datos:</span>
                <p className="m-0 mt-1 text-xs text-slate-300 leading-relaxed">El Backend ejecuta hasta 3 operaciones Load/Store de 512 bits simultáneamente en la D-Cache.</p>
              </div>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#10241e] border border-[#34d399]/40 text-[#34d399] font-mono font-bold shrink-0">
              [RESULTADO]
            </span>
            <span>
              <strong className="text-white">Resultado:</strong> Cero ciclos de stall perdidos por contención entre la búsqueda de código y la lectura de datos.
            </span>
          </div>
        </div>
      </Slide>

      {/* 11. Harvard Modificada: Pilar 2 (Especialización de Silicio) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Jerarquía L1 • Harvard Modificada (3/4)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Pilar 2: Especialización de Silicio (Read-Only vs Read/Write)
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6 border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">Frontend</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">L1 I-Cache (Solo Lectura)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                El código binario en ejecución no se auto-modifica durante cálculos ordinarios.
              </p>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li>No requiere puertos de escritura pesados.</li>
                <li>Elimina circuitos complejos de protocolo de coherencia (MESI / MOESI).</li>
                <li>Diseño más denso, rápido y de menor consumo por bit.</li>
              </ul>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">Backend</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">L1 D-Cache (Lectura y Escritura)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Maneja modificaciones intensivas de matrices y variables en memoria.
              </p>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li>Múltiples puertos de lectura y escritura paralelos.</li>
                <li>Controladores de coherencia de caché inter-núcleo en hardware.</li>
                <li>Integración directa con Store Buffers y Line Fill Buffers.</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#161d2d] border border-[#e6ff00]/40 text-[#e6ff00] font-mono font-bold shrink-0">
              [OPTIMIZACIÓN]
            </span>
            <span>
              Especializar cada caché según su patrón de acceso optimiza el consumo de energía y maximiza la velocidad de respuesta en nanosegundos.
            </span>
          </div>
        </div>
      </Slide>

      {/* 12. Harvard Modificada: Pilar 3 (Prevención de Contaminación) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Jerarquía L1 • Harvard Modificada (4/4)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Pilar 3: Prevención de Contaminación de Caché (Cache Pollution)
            </h2>
          </div>

          <div className="hpc-card p-6 my-2">
            <h3 className="m-0 text-lg font-bold text-white mb-3">Aislamiento de Código vs Datos Masivos</h3>
            <p className="m-0 text-sm text-slate-300 leading-relaxed mb-4">
              En computación científica e inteligencia artificial, los bucles de cálculo procesan volúmenes gigantescos de datos (matrices de gigabytes o terabytes):
            </p>
            <div className="p-4 rounded-xl bg-[#07080c] border border-[#232a3d] text-sm text-slate-300 leading-relaxed">
              Si la caché fuera unificada, el flujo continuo de datos de la matriz expulsaría las instrucciones del bucle de la caché (polución de caché), forzando continuos fallos de instrucción (I-Cache misses). Al estar separadas, <strong className="text-white">el bucle crítico de cálculo permanece caliente y residente en la I-Cache de forma indefinida</strong>.
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#10241e] border border-[#34d399]/40 text-[#34d399] font-mono font-bold shrink-0">
              [IMPACTO EN HPC]
            </span>
            <span>
              <strong className="text-white">Impacto en HPC:</strong> Permite que bucles de cálculo intensivo se ejecuten a máxima velocidad sin degradar la tasa de aciertos de instrucciones.
            </span>
          </div>
        </div>
      </Slide>

      {/* 13. Frontend vs Backend: Visión General */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Estructura Fundamental</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Microarquitectura de CPU: Visión General Frontend vs Backend
            </h2>
          </div>

          <FrontendBackendOverview />
        </div>
      </Slide>

      {/* 14. Frontend en Detalle */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • In-Order Frontend</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              El Frontend en Detalle: Fetch, Predicción, Decodificación y Renaming
            </h2>
          </div>

          <FrontendDetail />
        </div>
      </Slide>

      {/* 15. Backend en Detalle */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Out-of-Order Backend</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              El Backend en Detalle: Issue Queue, Ejecución Paralela y Retiro (ROB)
            </h2>
          </div>

          <BackendDetail />
        </div>
      </Slide>

      {/* 16. Segmentación RISC de 5 Etapas */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Segmentación</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Segmentación de Instrucciones (Pipelining RISC de 5 Etapas)
            </h2>
          </div>

          <PipelineDiagram />

          <div className="grid grid-cols-2 gap-5 my-2">
            <div className="hpc-card p-4">
              <h4 className="m-0 text-sm font-bold text-white mb-1">Throughput (Rendimiento) vs Latencia</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                La segmentación no reduce el tiempo individual de una instrucción (latencia), pero multiplica la tasa de instrucciones completadas por unidad de tiempo.
              </p>
            </div>

            <div className="hpc-card p-4">
              <h4 className="m-0 text-sm font-bold text-white mb-1">Aceleración Teórica (Speedup)</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                Con <Math math="k" /> etapas balanceadas: <Math math="\text{Speedup} \approx k" /> respecto a una ejecución no segmentada monolítica.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 17. Peligros (Hazards) del Pipeline */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Pipeline Hazards</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Peligros (Hazards) del Pipeline y Clasificación
            </h2>
          </div>

          <HazardsDiagram />
        </div>
      </Slide>

      {/* 18. RAW (Read-After-Write) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Hazards de Datos • Dependencia Real</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              RAW (Read-After-Write): Dependencia Verdadera
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-[#07080c] border border-[#232a3d] font-mono text-sm text-slate-200 my-2">
            <div>I1: ADD R1, R2, R3   <span className="text-slate-500">; Escribe en R1</span></div>
            <div className="mt-2">I2: SUB R4, R1, R5   <span className="text-slate-500">; Lee R1 (debe esperar a que I1 produzca el valor)</span></div>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h4 className="m-0 text-base font-bold text-white mb-2">Comportamiento Secuencial (In-Order)</h4>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                El hardware introduce <strong className="text-white">Data Forwarding</strong> (Bypass directo desde la salida de la ALU a la entrada de EX). Si I1 era un <code className="text-white font-mono">load</code> de memoria, se debe insertar un ciclo de stall (burbuja).
              </p>
            </div>

            <div className="hpc-card p-6">
              <h4 className="m-0 text-base font-bold text-white mb-2">Comportamiento Dinámico (OoO)</h4>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                I2 se coloca en la <strong className="text-white">Estación de Reserva (RS / Issue Queue)</strong> y espera dinámicamente hasta que I1 difunde su resultado por el <strong className="text-white">CDB (Common Data Bus)</strong>.
              </p>
            </div>
          </div>

          <div className="hpc-card p-3.5 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#1e131d] border border-[#fb7185]/40 text-[#fb7185] font-mono font-bold shrink-0">
              [REGLA CLAVE]
            </span>
            <span>
              <strong className="text-white">Regla Clave:</strong> Las dependencias RAW son las únicas dependencias de datos reales que no se pueden eliminar con renombre de registros.
            </span>
          </div>
        </div>
      </Slide>

      {/* 19. WAR (Write-After-Read) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Hazards de Datos • Antidependencia</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              WAR (Write-After-Read): Falsa Dependencia de Nombre
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-[#07080c] border border-[#232a3d] font-mono text-sm text-slate-200 my-2">
            <div>I1: ADD R4, R1, R5   <span className="text-slate-500">; Lee R1</span></div>
            <div className="mt-2">I2: SUB R1, R2, R3   <span className="text-slate-500">; Escribe en R1 (no debe sobreescribir antes de que I1 lea)</span></div>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h4 className="m-0 text-base font-bold text-white mb-2">Inexistente en Pipelines In-Order</h4>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                En un pipeline estrictamente secuencial, la lectura del operando en la etapa ID de I1 ocurre antes de que I2 alcance la etapa Writeback (WB).
              </p>
            </div>

            <div className="hpc-card p-6">
              <h4 className="m-0 text-base font-bold text-white mb-2">Solución: Register Renaming</h4>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                El hardware asigna a I2 un <strong className="text-white">registro físico distinto (ej. P19 en vez de P12)</strong> mediante la <strong className="text-white">RAT (Register Alias Table)</strong>, eliminando por completo la falsa dependencia.
              </p>
            </div>
          </div>

          <div className="hpc-card p-3.5 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#161d2d] border border-[#e6ff00]/40 text-[#e6ff00] font-mono font-bold shrink-0">
              [FALSA DEPENDENCIA]
            </span>
            <span>
              <strong className="text-white">Falsa Dependencia:</strong> Solo existe porque la ISA tiene un número finito de nombres de registro arquitecturales (ARF).
            </span>
          </div>
        </div>
      </Slide>

      {/* 20. WAW (Write-After-Write) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Hazards de Datos • Dependencia de Salida</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              WAW (Write-After-Write): Dependencia de Salida
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-[#07080c] border border-[#232a3d] font-mono text-sm text-slate-200 my-2">
            <div>I1: MUL R1, R2, R3   <span className="text-slate-500">; Escribe en R1 (Operación larga de 4 ciclos)</span></div>
            <div className="mt-2">I2: ADD R1, R4, R5   <span className="text-slate-500">; Escribe en R1 (Operación rápida de 1 ciclo)</span></div>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h4 className="m-0 text-base font-bold text-white mb-2">El Conflicto de Salida</h4>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Si I2 termina antes que I1 en un motor fuera de orden o superescalar, la escritura tardía de I1 sobreescribiría y corrompería el valor más reciente de R1.
              </p>
            </div>

            <div className="hpc-card p-6">
              <h4 className="m-0 text-base font-bold text-white mb-2">Solución: Renaming + ROB</h4>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Se asignan registros físicos independientes en la <strong className="text-white">RAT</strong> y el <strong className="text-white">ROB</strong> garantiza que el retiro arquitectural respete el orden estricto del programa.
              </p>
            </div>
          </div>

          <div className="hpc-card p-3.5 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#10241e] border border-[#34d399]/40 text-[#34d399] font-mono font-bold shrink-0">
              [GARANTÍA DEL ROB]
            </span>
            <span>
              <strong className="text-white">Garantía del ROB:</strong> Aunque las instrucciones terminen fuera de orden en el Backend, el ROB escribe en el archivo arquitectural en orden de programa.
            </span>
          </div>
        </div>
      </Slide>

      {/* 21. Resumen General de Mitigaciones de Hazards (Tabla) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Hazards de Datos • Síntesis</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Resumen General de Hazards y Mitigaciones
            </h2>
          </div>

          <div className="hpc-card overflow-hidden my-2 border border-[#232a3d]">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-[#07080c] text-white border-b border-[#232a3d]">
                  <th className="p-3.5 font-bold">Hazard</th>
                  <th className="p-3.5 font-bold">Nombre Técnico</th>
                  <th className="p-3.5 font-bold">¿Afecta a In-Order?</th>
                  <th className="p-3.5 font-bold">Solución en Out-of-Order (OoO)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232a3d] text-slate-300">
                <tr className="hover:bg-[#151a27]">
                  <td className="p-3.5 font-bold text-[#fb7185] font-mono">RAW</td>
                  <td className="p-3.5">Dependencia Verdadera</td>
                  <td className="p-3.5 text-slate-200">Sí (Forwarding / Stalls)</td>
                  <td className="p-3.5 font-semibold">Estaciones de Reserva (RS) + CDB</td>
                </tr>
                <tr className="hover:bg-[#151a27]">
                  <td className="p-3.5 font-bold text-[#e6ff00] font-mono">WAR</td>
                  <td className="p-3.5">Antidependencia de Nombre</td>
                  <td className="p-3.5 text-slate-400">No</td>
                  <td className="p-3.5 font-semibold">Register Renaming (RAT / PRF)</td>
                </tr>
                <tr className="hover:bg-[#151a27]">
                  <td className="p-3.5 font-bold text-[#e6ff00] font-mono">WAW</td>
                  <td className="p-3.5">Dependencia de Salida</td>
                  <td className="p-3.5 text-slate-400">No (solo latencia variable)</td>
                  <td className="p-3.5 font-semibold">Register Renaming (RAT) + ROB</td>
                </tr>
                <tr className="hover:bg-[#151a27]">
                  <td className="p-3.5 font-bold text-[#38bdf8] font-mono">RAR</td>
                  <td className="p-3.5">Lectura Concurrente</td>
                  <td className="p-3.5 text-slate-400">No (Sin conflicto)</td>
                  <td className="p-3.5 font-semibold">Múltiples puertos de lectura en el PRF</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="hpc-card p-3.5 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#161d2d] border border-[#e6ff00]/40 text-[#e6ff00] font-mono font-bold shrink-0">
              [CONCLUSIÓN]
            </span>
            <span>
              <strong className="text-white">Conclusión:</strong> El hardware fuera de orden convierte falsas dependencias de nombre (WAR/WAW) en paralelismo puro mediante silicio de renombrado.
            </span>
          </div>
        </div>
      </Slide>

      {/* 22. Predicción de Saltos y Especulación */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Especulación</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Predicción de Saltos (BPU) y Especulación
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6 border-t-2 border-t-[#fb7185]">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Coste de Branch Misprediction</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                En pipelines profundos (14 a 20 etapas), un fallo de predicción obliga a vaciar el pipeline (<strong className="text-white">Pipeline Flush</strong>), desperdiciando de <strong className="text-white">15 a 20 ciclos de trabajo útil</strong>.
              </p>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#34d399]">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Predictores Modernos (BPU)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                La <strong className="text-white">BPU (Branch Prediction Unit)</strong> utiliza el <strong className="text-white">BTB (Branch Target Buffer)</strong> y algoritmos avanzados como <strong className="text-white">TAGE</strong> o redes neuronales perceptrón para alcanzar precisiones de <strong className="text-white">&gt;98%</strong>.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#161d2d] border border-[#e6ff00]/40 text-[#e6ff00] font-mono font-bold shrink-0">
              [RETIRO ESPECULATIVO]
            </span>
            <span>
              <strong className="text-white">Retiro Especulativo Seguro:</strong> Las instrucciones especulativas calculan sus resultados en registros temporales. Si el salto fue acertado, se confirman en el Reorder Buffer (ROB); si falló, se descartan instantáneamente sin alterar el estado arquitectural visible.
            </span>
          </div>
        </div>
      </Slide>

      {/* 23. In-Order vs Out-of-Order */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Planificación Dinámica</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              In-Order vs Out-of-Order (OoO)
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">In-Order (Secuencial)</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Ejecución en Orden</h3>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-2 list-disc leading-relaxed">
                <li>Ejecuta en el orden exacto del flujo binario del programa.</li>
                <li>Solo sufre de dependencias verdaderas (RAW).</li>
                <li>Un fallo de caché LLC (L3) o latencia DRAM (~200 ciclos) congela el núcleo entero.</li>
                <li>Máxima eficiencia energética por área de silicio.</li>
              </ul>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge-yellow font-mono mb-2 text-xs">Out-of-Order (Dinámico)</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Ejecución Fuera de Orden</h3>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-2 list-disc leading-relaxed">
                <li>Desacopla la decodificación de la ejecución de instrucciones.</li>
                <li>Elimina dependencias falsas WAR y WAW mediante Register Renaming (RAT / PRF).</li>
                <li>Ejecuta trabajo independiente mientras espera datos lentos de memoria principal.</li>
                <li>Estándar absoluto en procesadores de servidor HPC (Intel Xeon, AMD EPYC, Apple M-Max/Ultra).</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#10241e] border border-[#34d399]/40 text-[#34d399] font-mono font-bold shrink-0">
              [PARALELISMO ILP]
            </span>
            <span>
              <strong className="text-white">Para HPC:</strong> OoO permite extraer ILP y mantener saturadas las ALUs y unidades vectoriales FMA a pesar de los fallos de caché.
            </span>
          </div>
        </div>
      </Slide>

      {/* 24. El Reorder Buffer (ROB) */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Gestión In-Flight</span>
            <h2 className="text-2xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              El Reorder Buffer (ROB) y Operaciones In-Flight
            </h2>
          </div>

          <RobDiagram />
        </div>
      </Slide>

      {/* 25. Superescalar y Límites del ILP */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Microarquitectura • Límites de Rendimiento</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Superescalar y el Muro del ILP (Instruction-Level Parallelism)
            </h2>
          </div>

          <div className="hpc-formula-box my-2 text-lg">
            <Math math="\text{Rendimiento CPU} = \text{Frecuencia (GHz)} \times \text{IPC (Instrucciones por Ciclo} > 1\text{)}" block />
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Ancho de Despacho (Multiple Issue)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Capacidad del hardware para decodificar, despachar y retirar múltiples instrucciones independientes simultáneamente en cada ciclo de reloj (6 a 8 vías).
              </p>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#fb7185]">
              <h3 className="m-0 text-lg font-bold text-white mb-2">El Muro del ILP</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Las dependencias de datos y saltos saturan el <strong className="text-white">ILP</strong> en <strong className="text-white">IPC &approx; 2 a 3</strong>. Extraer más ILP incrementa la complejidad del silicio y el consumo térmico exponencialmente.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#161d2d] border border-[#e6ff00]/40 text-[#e6ff00] font-mono font-bold shrink-0">
              [TRANSICIÓN HPC]
            </span>
            <span>
              <strong className="text-white">Conclusión para HPC:</strong> Al alcanzarse el muro del ILP, la computación de alto rendimiento viró hacia el <strong className="text-white">Paralelismo de Datos (SIMD / VLA)</strong> y el <strong className="text-white">Multiprocesamiento (Multinúcleo / NUMA / GPUs)</strong>.
            </span>
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

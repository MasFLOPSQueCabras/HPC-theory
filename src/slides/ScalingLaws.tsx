import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { ScalingChart } from '../components/ScalingChart';
import { Math } from '../components/Math';

export const ScalingLaws: React.FC = () => {
  return (
    <Stack>
      {/* 1. Strong Scaling & Amdahl */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Escalamiento Paralelo • Strong Scaling</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Escalamiento Fuerte y Ley de Amdahl (1967)
            </h2>
          </div>

          <div className="hpc-formula-box my-2 text-lg">
            <Math math="\text{Speedup}(P) = \frac{1}{(1 - p) + \frac{p}{P}} = \frac{1}{s + \frac{p}{P}}" block />
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Tamaño de Problema Fijo</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Se incrementa el número de procesadores (<Math math="P" />) para resolver exactamente el <strong className="text-white">mismo tamaño de problema en el menor tiempo posible</strong> (minimizar el <em>Time-to-Solution</em>).
              </p>
            </div>

            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Parámetros Clave</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                • <Math math="p" />: Fracción de código paralelizable.<br />
                • <strong className="text-white"><Math math="s = 1 - p" /></strong>: Fracción estrictamente secuencial / serial.<br />
                • <strong className="text-slate-200"><Math math="P" /></strong>: Cantidad de núcleos o procesadores.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            💡 <strong className="text-white">Objetivo:</strong> Reducir el tiempo de espera para simulaciones urgentes con carga de datos constante.
          </div>
        </div>
      </Slide>

      {/* 2. El Cuello de Botella Serial */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Amdahl • Límite Teórico</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              El Cuello de Botella Serial Asintótico
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">
                Límite Asintótico (<Math math="P \to \infty" />)
              </h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Incluso con un número infinito de procesadores (<Math math="P \to \infty" />), la aceleración máxima absoluta jamás superará el inverso de la porción serial:
              </p>
              <div className="my-3 text-center text-base font-bold text-white">
                <Math math="\text{Speedup}_{\max} = \frac{1}{s}" />
              </div>
            </div>

            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Ejemplo Numérico Real</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-2">
                Si apenas el <strong className="text-white">5% del código es serial (<Math math="s = 0.05" />)</strong>, la aceleración máxima teórica jamás superará <strong className="text-white">20x</strong>, aunque se desplieguen 100,000 núcleos.
              </p>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                El 95% restante se ejecuta en tiempo infinitesimal, pero el 5% serial domina por completo la duración.
              </div>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            ⚠️ <strong className="text-white">Ley de Rendimientos Decrecientes:</strong> Duplicar los núcleos cerca del límite asintótico añade coste energético y monetario con ganancias marginales de rendimiento.
          </div>
        </div>
      </Slide>

      {/* 3. Weak Scaling & Gustafson */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Escalamiento Paralelo • Weak Scaling</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Escalamiento Débil y Ley de Gustafson (1988)
            </h2>
          </div>

          <div className="hpc-formula-box my-2 text-lg">
            <Math math="\text{Scaled Speedup}(P) = P - s \times (P - 1) = s + (1 - s) \times P" block />
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Carga por Procesador Constante</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                El tamaño global del problema <strong className="text-white">crece proporcionalmente al número de procesadores</strong> (<Math math="N \propto P" />), manteniendo constante la carga de trabajo por núcleo.
              </p>
            </div>

            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Filosofía del Supercómputo</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                En supercomputadores no queremos resolver el mismo problema minúsculo más rápido, sino <strong className="text-white">abordar problemas más grandes con mayor resolución física</strong> (mallas más finas en clima o modelos de IA con más parámetros).
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            🚀 <strong className="text-white">Escalamiento Lineal en Exascale:</strong> Con Gustafson, la aceleración escala casi linealmente con <Math math="P" />, convirtiéndose en el estándar de evaluación para el Top500.
          </div>
        </div>
      </Slide>

      {/* 4. Gráfico Comparativo (CHART DEDICADO) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Leyes de Escalamiento • Comparativa Visual</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Visualizador de Escalamiento: Amdahl vs Gustafson
            </h2>
          </div>

          <ScalingChart />
        </div>
      </Slide>

      {/* 5. Comparativa Estratégica: Amdahl vs Gustafson */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Escalamiento Paralelo • Síntesis</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              ¿Cuándo Aplicar Amdahl vs Gustafson?
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Amdahl (Strong Scaling)</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Escalamiento Fuerte</h3>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-2 list-disc leading-relaxed">
                <li><strong className="text-white">Objetivo:</strong> Reducir el tiempo de espera (latencia).</li>
                <li><strong className="text-white">Tamaño de Datos:</strong> Fijo e invariable.</li>
                <li><strong className="text-white">Límite:</strong> Saturación asintótica en <Math math="1/s" />.</li>
                <li><strong className="text-white">Ejemplo:</strong> Renderizado de un frame en tiempo real o inferencia interactiva.</li>
              </ul>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Gustafson (Weak Scaling)</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Escalamiento Débil</h3>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-2 list-disc leading-relaxed">
                <li><strong className="text-white">Objetivo:</strong> Maximizar la capacidad y precisión (throughput).</li>
                <li><strong className="text-white">Tamaño de Datos:</strong> Crece proporcional a los núcleos (<Math math="N \propto P" />).</li>
                <li><strong className="text-white">Límite:</strong> Cuasi-lineal (escalable a millones de cores).</li>
                <li><strong className="text-white">Ejemplo:</strong> Simulación climática global o entrenamiento de modelos de billones de parámetros.</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            🏆 En supercómputo y Exascale, el diseño de algoritmos se enfoca primordialmente bajo el prisma de la <strong className="text-white">Ley de Gustafson</strong>.
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

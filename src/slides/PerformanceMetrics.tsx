import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { Math } from '../components/Math';

export const PerformanceMetrics: React.FC = () => {
  return (
    <Stack>
      {/* 1. FLOPS y Fórmula */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Métricas • Capacidad de Cómputo</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              FLOPS (Floating-Point Operations Per Second)
            </h2>
          </div>

          <div className="hpc-formula-box my-2 text-lg">
            <Math math="\text{Peak FLOPS} = \text{Sockets} \times \frac{\text{Cores}}{\text{Socket}} \times f \times \frac{\text{FLOPs}}{\text{Cycle}}" block />
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">FLOPS vs FLOPs</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                • <strong className="text-white">FLOPS (con 'S' mayúscula):</strong> Tasa de rendimiento temporal (<em>Floating-Point Operations Per Second</em>).<br />
                • <strong className="text-slate-200">FLOPs (con 's' minúscula):</strong> Conteo absoluto de operaciones matemáticas ejecutadas por el algoritmo.
              </p>
            </div>

            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Multiplicadores por Ciclo (FMA)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Con <strong className="text-white">AVX-512</strong> y 2 unidades <strong className="text-white">FMA (Fused Multiply-Add: 2 ops/carril)</strong>, un núcleo de CPU entrega <strong className="text-white">32 FLOPs (FP64)</strong> o <strong className="text-white">64 FLOPs (FP32)</strong> por ciclo de reloj.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            💡 <strong className="text-white">Regla de Cálculo:</strong> En un procesador de 64 núcleos a 3.0 GHz con 32 FLOPs/ciclo (FP64), el rendimiento pico teórico es <code className="text-slate-100 font-mono font-bold">64 × 3.0 × 32 = 6.14 TFLOPS (FP64)</code>.
          </div>
        </div>
      </Slide>

      {/* 2. Precisiones Numéricas Escalares (TABLA DEDICADA) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Métricas • Formatos Escalares IEEE 754</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Jerarquía de Precisiones Numéricas Escalares
            </h2>
          </div>

          <div className="hpc-card overflow-hidden my-auto border border-slate-800">
            <table className="w-full text-base text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/90 text-white border-b border-slate-700 text-sm">
                  <th className="p-4 font-bold">Formato</th>
                  <th className="p-4 font-bold">Estructura de Bits</th>
                  <th className="p-4 font-bold">Dominio Principal en HPC / IA</th>
                  <th className="p-4 font-bold">Throughput Relativo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white font-mono">FP64 (Double)</td>
                  <td className="p-4 text-slate-300 text-sm">1b Signo, 11b Exponente, 52b Mantisa</td>
                  <td className="p-4 text-slate-300 text-sm">Simulación Científica, CFD, Clima, Dinámica Molecular</td>
                  <td className="p-4 font-mono text-slate-100 font-bold text-sm">1x (Línea Base)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white font-mono">FP32 (Single)</td>
                  <td className="p-4 text-slate-300 text-sm">1b Signo, 8b Exponente, 23b Mantisa</td>
                  <td className="p-4 text-slate-300 text-sm">Gráficos 3D, Procesamiento de Señal, Física General</td>
                  <td className="p-4 font-mono text-slate-100 font-bold text-sm">2x</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white font-mono">FP16 / BF16</td>
                  <td className="p-4 text-slate-300 text-sm">1b Signo, 5/8b Exponente, 10/7b Mantisa</td>
                  <td className="p-4 text-slate-300 text-sm">Entrenamiento e Inferencia de Redes Neuronales Profundas</td>
                  <td className="p-4 font-mono text-slate-100 font-bold text-sm">4x - 8x</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white font-mono">FP8 / INT8</td>
                  <td className="p-4 text-slate-300 text-sm">Formatos E4M3 / E5M2 u 8 bits enteros</td>
                  <td className="p-4 text-slate-300 text-sm">Inferencia de LLMs Masivos y Visión por Computador</td>
                  <td className="p-4 font-mono text-slate-100 font-bold text-sm">8x - 16x</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Slide>

      {/* 3. Análisis de Precisiones y Precisión Mixta */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Métricas • Análisis de Precisión</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Trade-offs de Precisión: Rendimiento vs Estabilidad Numérica
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Ahorro de Memoria</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Impacto en Ancho de Banda</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Reducir la precisión de FP32 a FP16/BF16 reduce el tamaño de los tensores a la mitad:
              </p>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li><strong className="text-white">50% menos tráfico en DRAM / HBM:</strong> Alivia cuellos de botella de memoria.</li>
                <li><strong className="text-white">2x capacidad en cachés:</strong> Mayor tasa de aciertos (Hit Rate) en L1/L2.</li>
                <li><strong className="text-white">2x registros vectoriales:</strong> El doble de elementos en un registro ZMM de 512 bits.</li>
              </ul>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Estabilidad Numérica</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Precisión Mixta (Mixed Precision)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Técnica estándar en aceleradores modernos (Tensor Cores / Matrix Cores):
              </p>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li>Las <strong className="text-white">multiplicaciones</strong> de matrices se calculan en baja precisión (FP16 o FP8) a máxima velocidad.</li>
                <li>Las <strong className="text-white">sumas y acumulaciones</strong> se mantienen en FP32 para evitar pérdidas por redondeo (Underflow/Overflow).</li>
              </ul>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            🚀 <strong className="text-white">Resultado:</strong> Multiplicación de hasta 8x en throughput conservando la convergencia matemática del algoritmo.
          </div>
        </div>
      </Slide>

      {/* 4. Block Floating Point (BFP): Motivación y Concepto */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Formatos Emergentes • Block Floating Point (1/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Block Floating Point (BFP): Motivación y Silicio
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">El Problema de FP8 Escalar</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Asignar un exponente privado a cada elemento individual de 4 u 8 bits desperdicia ancho de banda y superficie de silicio en circuitos redundantes de alineación de coma flotante.
              </p>
            </div>

            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">El Principio de BFP</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Un bloque de <strong className="text-white">32 elementos contiguos</strong> comparte un <strong className="text-white">único factor de escala común (exponente de 8 bits)</strong>, permitiendo representar cada elemento con mantisas compactas de solo 4 u 8 bits.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-sm text-slate-300 text-center">
            💡 <strong className="text-white">Eficiencia en Silicio:</strong> Multiplicar mantisas pequeñas requiere multiplicadores enteros mucho más sencillos, triplicando la densidad de cómputo por milímetro cuadrado sin perder rango dinámico.
          </div>
        </div>
      </Slide>

      {/* 5. Estándar Abierto OCP MX (Microscaling) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Formatos Emergentes • OCP MX (2/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Catálogo OCP Microscaling (MXFP8, MXFP4, NVFP4)
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5 my-2">
            <div className="hpc-card p-5">
              <h4 className="m-0 text-base font-bold text-white mb-2">MXFP8</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                Bloques de 32 valores FP8 (E4M3/E5M2) con escala E8M0 compartida. Máxima precisión para entrenamiento y fine-tuning de LLMs.
              </p>
            </div>

            <div className="hpc-card p-5">
              <h4 className="m-0 text-base font-bold text-white mb-2">MXFP4</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                Bloques de 32 valores FP4 (E2M1) con escala E8M0 compartida. Reduce el consumo de memoria un 75% frente a FP16 estándar.
              </p>
            </div>

            <div className="hpc-card p-5">
              <h4 className="m-0 text-base font-bold text-white mb-2">NVFP4 (Blackwell)</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                Implementación nativa de NVIDIA Blackwell en Tensor Cores de 5ª gen, alcanzando hasta 20 PFLOPS de cómputo por GPU.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            🤝 <strong className="text-white">Alianza de la Industria:</strong> Estandarizado por AMD, ARM, Intel, Meta, Microsoft, NVIDIA y Qualcomm dentro del Open Compute Project (OCP).
          </div>
        </div>
      </Slide>

      {/* 6. Ancho de Banda y Latencia */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Métricas • Tráfico de Memoria</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Ancho de Banda vs Latencia
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Ancho de Banda (Bandwidth)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                • <strong>Definición:</strong> Volumen de datos transferido por unidad de tiempo (GB/s o TB/s).<br />
                • <strong>Analogía:</strong> El <em>grosor de la tubería</em>. Determina el caudal máximo sostenido de datos hacia las unidades de cómputo.
              </p>
            </div>

            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Latencia (Latency)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                • <strong>Definición:</strong> Tiempo que tarda un dato individual en viajar desde la memoria hasta el registro del núcleo (en ns o ciclos).<br />
                • <strong>Analogía:</strong> La <em>velocidad del agua</em> o tiempo de respuesta inicial.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            💡 <strong className="text-white">Enfoque de Optimización:</strong> En CPUs se optimiza para minimizar <em>Latencia</em> (cachés L1/L2 ultra rápidas); en GPUs se optimiza para maximizar <em>Ancho de Banda</em> masivo (HBM3e a &gt;5 TB/s).
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

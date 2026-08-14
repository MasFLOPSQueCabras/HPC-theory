import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { RooflineChart } from '../components/RooflineChart';
import { Math } from '../components/Math';

export const RooflineModel: React.FC = () => {
  return (
    <Stack>
      {/* 1. Motivación y Formulación */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Modelos de Rendimiento • Techo Teórico</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              El Modelo Roofline (Williams, Waterman, Patterson 2009)
            </h2>
          </div>

          <div className="hpc-formula-box my-2 text-lg">
            <Math math="\text{Attainable Performance} = \min\Big(\text{Peak FLOPS},\; I \times \text{Peak Bandwidth}\Big)" block />
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge-cyan mb-2 text-xs font-mono">Parámetro del Software</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2 flex items-center gap-2">
                Intensidad Aritmética (<Math math="I" />)
              </h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Razón entre las operaciones de coma flotante y los bytes transferidos desde la memoria principal (DRAM / HBM):
              </p>
              <div className="mt-3 text-center">
                <Math math="I = \frac{\text{FLOPs}}{\text{Bytes transferidos de DRAM}}" />
              </div>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge-yellow mb-2 text-xs font-mono">Punto de Inflexión</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2 flex items-center gap-2">
                Knee Point (<Math math="I_{\text{codo}}" />)
              </h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Intensidad crítica que separa la zona dominada por memoria de la zona limitada por cómputo:
              </p>
              <div className="mt-3 text-center">
                <Math math="I_{\text{codo}} = \frac{\text{Peak FLOPS}}{\text{Peak Bandwidth}}" />
              </div>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#161d2d] border border-[#38bdf8]/40 text-[#38bdf8] font-mono font-bold shrink-0">
              [CLAVE]
            </span>
            <span>
              <strong className="text-white">Utilidad Fundamental:</strong> Permite determinar inmediatamente si optimizar el código (ej. vectorización AVX-512) aportará ganancia o si el kernel está estrangulado por el ancho de banda de memoria.
            </span>
          </div>
        </div>
      </Slide>

      {/* 2. Gráfico Interactivo de Roofline con TanStack Charts */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Roofline • Visualizador Interactivo</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Visualizador Interactivo del Modelo Roofline
            </h2>
          </div>

          <RooflineChart />
        </div>
      </Slide>

      {/* 3. Regiones y Estrategias de Optimización */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Roofline • Estrategias de Optimización</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Regiones Operativas: Memory-Bound vs Compute-Bound
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6 border-t-2 border-t-[#fb7185]">
              <div className="flex items-center gap-2 mb-2">
                <span className="hpc-badge-rose text-xs font-mono">
                  Zona Izquierda (<Math math="I < I_{\text{codo}}" />)
                </span>
              </div>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Limitado por Memoria</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                El procesador pasa la mayor parte del tiempo esperando datos de la DRAM (SpMV, Stencils, Dot Product).
              </p>
              <div className="p-3 rounded-lg bg-[#07080c] border border-[#232a3d] text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Estrategias:</strong> Loop Tiling (bloqueo de caché), compresión de datos, fusión de bucles, migración de AoS a SoA para coalescencia.
              </div>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#34d399]">
              <div className="flex items-center gap-2 mb-2">
                <span className="hpc-badge-emerald text-xs font-mono">
                  Zona Derecha (<Math math="I > I_{\text{codo}}" />)
                </span>
              </div>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Limitado por Cómputo</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Las unidades funcionales (ALU/FPU) trabajan a máxima capacidad y la memoria entrega datos con holgura (GEMM, FFT, Convoluciones 3D).
              </p>
              <div className="p-3 rounded-lg bg-[#07080c] border border-[#232a3d] text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Estrategias:</strong> Vectorización SIMD (AVX-512, SVE), desenrollado de bucles, paralelismo de registros e instrucciones FMA.
              </div>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#161d2d] border border-[#e6ff00]/40 text-[#e6ff00] font-mono font-bold shrink-0">
              [REGLA PRÁCTICA]
            </span>
            <span>
              <strong className="text-white">Regla Práctica:</strong> Si un kernel es Memory-Bound, añadir más núcleos o unidades vectoriales no aumentará el rendimiento; es obligatorio aumentar su Intensidad Aritmética (<Math math="I" />).
            </span>
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

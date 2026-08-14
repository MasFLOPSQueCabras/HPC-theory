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
          <div>
            <span className="hpc-badge font-mono">Modelos de Rendimiento • Techo de Rendimiento</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              El Modelo Roofline (Williams, Waterman, Patterson 2009)
            </h2>
          </div>

          <div className="hpc-formula-box my-2 text-lg">
            <Math math="\text{Attainable Performance} = \min\Big(\text{Peak FLOPS},\; I \times \text{Peak Bandwidth}\Big)" block />
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Parámetro del Software</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Intensidad Aritmética (I)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Razón entre las operaciones de coma flotante y los bytes transferidos desde la memoria principal (DRAM / HBM):
              </p>
              <div className="mt-3 text-center">
                <Math math="I = \frac{\text{FLOPs}}{\text{Bytes transferidos de DRAM}}" />
              </div>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Punto de Inflexión</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Knee Point (I_codo)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Intensidad crítica que separa la zona dominada por memoria de la zona limitada por cómputo:
              </p>
              <div className="mt-3 text-center">
                <Math math="I_{\text{codo}} = \frac{\text{Peak FLOPS}}{\text{Peak Bandwidth}}" />
              </div>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            💡 <strong className="text-white">Utilidad Fundamental:</strong> Permite determinar inmediatamente si optimizar el código (ej. vectorización AVX-512) aportará ganancia o si el kernel está estrangulado por el ancho de banda de memoria.
          </div>
        </div>
      </Slide>

      {/* 2. Gráfico Interactivo de Roofline con TanStack Charts */}
      <Slide>
        <div className="text-left px-8 py-5 max-w-6xl w-full mx-auto">
          <span className="hpc-badge font-mono">Roofline • Modelo Visual</span>
          <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
            Visualizador Interactivo del Modelo Roofline
          </h2>

          <RooflineChart />
        </div>
      </Slide>

      {/* 3. Regiones y Estrategias de Optimización */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Roofline • Estrategias de Optimización</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Regiones Operativas: Memory-Bound vs Compute-Bound
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Zona Izquierda (I &lt; I_codo)</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Limitado por Memoria</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                El procesador pasa la mayor parte del tiempo esperando datos de la DRAM (SpMV, Stencils, Dot Product).
              </p>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Estrategias:</strong> Loop Tiling (bloqueo de caché), compresión de datos, fusión de bucles, migración de AoS a SoA para coalescencia.
              </div>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Zona Derecha (I &gt; I_codo)</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Limitado por Cómputo</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed mb-3">
                Las unidades funcionales (ALU/FPU) trabajan a máxima capacidad y la memoria entrega datos con holgura (GEMM, FFT, Convoluciones 3D).
              </p>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Estrategias:</strong> Vectorización SIMD (AVX-512, SVE), desenrollado de bucles, paralelismo de registros e instrucciones FMA.
              </div>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            🚀 <strong className="text-white">Regla Práctica:</strong> Si un kernel es Memory-Bound, añadir más núcleos o unidades vectoriales no aumentará el rendimiento; es obligatorio aumentar su Intensidad Aritmética (<Math math="I" />).
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

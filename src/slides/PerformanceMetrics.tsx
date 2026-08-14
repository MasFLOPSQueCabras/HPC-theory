import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { Math } from '../components/Math';

export const PerformanceMetrics: React.FC = () => {
  return (
    <Stack>
      {/* 1. Peak FLOPS Teórico */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Métricas • Techo de Cómputo</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Cálculo del Peak FLOPS Teórico
            </h2>
          </div>

          <div className="hpc-formula-box my-2 text-lg">
            <Math math="\text{Peak FLOPS} = \text{Sockets} \times \frac{\text{Cores}}{\text{Socket}} \times f \times \frac{\text{FLOPs}}{\text{Cycle}}" block />
          </div>

          <div className="grid grid-cols-2 gap-6 my-auto">
            <div className="hpc-card p-6 border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">Ejemplo CPU (x86 AVX-512)</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Dual Socket Intel Xeon</h3>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li><strong className="text-white">Sockets:</strong> 2 | <strong className="text-white">Cores/Socket:</strong> 64 (128 Cores totales).</li>
                <li><strong className="text-white">Frecuencia Base:</strong> <Math math="f = 2.4\text{ GHz}" />.</li>
                <li><strong className="text-white">FLOPs/Ciclo:</strong> 2 puertos FMA de 512-bit = <Math math="2 \times 16 \times 2 = 64\text{ FLOPs/ciclo}" /> (en FP32).</li>
                <li><strong className="text-[#38bdf8] font-bold">Rendimiento Peak:</strong> <Math math="128 \times 2.4 \times 10^9 \times 64 = 19.66\text{ TFLOPS}" /> (FP32).</li>
              </ul>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">Ejemplo GPU (NVIDIA H100 SXM5)</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Tensor Cores FP8</h3>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-1.5 list-disc leading-relaxed">
                <li><strong className="text-white">SMs Activos:</strong> 132 SMs.</li>
                <li><strong className="text-white">Frecuencia Boost:</strong> <Math math="f \approx 1.83\text{ GHz}" />.</li>
                <li><strong className="text-white">FLOPs/Ciclo por SM:</strong> 4 Tensor Cores de 4ª gen = 4096 ops/ciclo.</li>
                <li><strong className="text-[#34d399] font-bold">Rendimiento Peak:</strong> <Math math="\approx 1,979\text{ TFLOPS} \approx 2\text{ PFLOPS}" /> (FP8 con Sparsity).</li>
              </ul>
            </div>
          </div>
        </div>
      </Slide>

      {/* 2. Precisiones IEEE 754 vs Formatos Modernos de IA */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Aritmética • Formatos Numéricos</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Precisiones Clásicas IEEE 754 vs Formatos IA
            </h2>
          </div>

          <div className="hpc-card overflow-hidden my-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#232a3d] bg-[#07080c]">
                  <th className="p-3 font-bold text-slate-200 font-mono w-[18%]">Formato</th>
                  <th className="p-3 font-bold text-slate-200 font-mono w-[11%]">Bits</th>
                  <th className="p-3 font-bold text-slate-200 font-mono w-[23%]">Estructura (S, E, M)</th>
                  <th className="p-3 font-bold text-slate-200 font-mono w-[20%]">Rango Dinámico</th>
                  <th className="p-3 font-bold text-slate-200 font-mono w-[28%]">Uso Principal en HPC / IA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232a3d] font-mono">
                <tr>
                  <td className="p-3 font-bold text-[#38bdf8]">FP64 (Doble)</td>
                  <td className="p-3 text-slate-300">64 bits</td>
                  <td className="p-3 text-slate-300">1b S, 11b E, 52b M</td>
                  <td className="p-3 text-slate-300 whitespace-nowrap"><Math math="\approx 10^{\pm 308}" /></td>
                  <td className="p-3 text-slate-300">Simulación científica, CFD, LINPACK</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">FP32 (Simple)</td>
                  <td className="p-3 text-slate-300">32 bits</td>
                  <td className="p-3 text-slate-300">1b S, 8b E, 23b M</td>
                  <td className="p-3 text-slate-300 whitespace-nowrap"><Math math="\approx 10^{\pm 38}" /></td>
                  <td className="p-3 text-slate-300">Gráficos, dinámica molecular, acumulación</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#34d399]">FP16 / BF16</td>
                  <td className="p-3 text-slate-300">16 bits</td>
                  <td className="p-3 text-slate-300">1b S, 5/8b E, 10/7b M</td>
                  <td className="p-3 text-slate-300 whitespace-nowrap">
                    <Math math="10^{\pm 5}" /> <span className="text-slate-500 font-sans text-[11px]">(FP16)</span> / <Math math="10^{\pm 38}" /> <span className="text-slate-500 font-sans text-[11px]">(BF16)</span>
                  </td>
                  <td className="p-3 text-slate-300">Entrenamiento estándar de Redes Neuronales</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#e6ff00]">FP8 (E4M3 / E5M2)</td>
                  <td className="p-3 text-slate-300">8 bits</td>
                  <td className="p-3 text-slate-300">1b S, 4/5b E, 3/2b M</td>
                  <td className="p-3 text-slate-300 whitespace-nowrap"><Math math="10^{\pm 2}" /> <span className="text-slate-500 font-sans text-[11px]">(E4M3)</span> / <Math math="10^{\pm 5}" /> <span className="text-slate-500 font-sans text-[11px]">(E5M2)</span></td>
                  <td className="p-3 text-slate-300">Inferencia masiva LLMs (Transformer Engine)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Slide>

      {/* 3. Trade-off: Precisión vs Rendimiento & Memoria */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Aritmética • Compromiso de Diseño</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Trade-off: Precisión vs Rendimiento y Memoria
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-auto">
            <div className="hpc-card p-6 border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">Beneficios de Reducir Bits</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Por qué usar Precisión Reducida</h3>
              <ul className="m-0 p-0 pl-4 text-sm text-slate-300 space-y-2 list-disc leading-relaxed">
                <li><strong className="text-white">Capacidad de Memoria:</strong> Un modelo FP8 ocupa la mitad de VRAM que FP16 y 1/4 respecto a FP32.</li>
                <li><strong className="text-white">Ancho de Banda (Memory Wall):</strong> Se transfieren el doble de tensores por segundo sobre el mismo bus PCIe/HBM.</li>
                <li><strong className="text-white">Throughput Computacional:</strong> Las ALUs y Tensor Cores multiplican su densidad física por 2x a 4x.</li>
              </ul>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">Estabilidad Numérica</span>
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
        </div>
      </Slide>

      {/* 4. Block Floating Point (BFP): Motivación y Concepto */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Formatos Emergentes • Block Floating Point (1/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Block Floating Point (BFP): Motivación y Silicio
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-auto">
            <div className="hpc-card p-6 border-t-2 border-t-[#fb7185]">
              <span className="hpc-badge-rose font-mono mb-2 text-xs">Limitación</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">El Problema de FP8 Escalar</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Asignar un exponente privado a cada elemento individual de 4 u 8 bits desperdicia ancho de banda y superficie de silicio en circuitos redundantes de alineación de coma flotante.
              </p>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#e6ff00]">
              <span className="hpc-badge-yellow font-mono mb-2 text-xs">Solución</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">El Principio de BFP</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Un bloque de <strong className="text-white">32 elementos contiguos</strong> comparte un <strong className="text-[#e6ff00]">único factor de escala común (exponente de 8 bits)</strong>, permitiendo representar cada elemento con mantisas compactas de solo 4 u 8 bits.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 5. Estándar Abierto OCP MX */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Formatos Emergentes • OCP MX (2/2)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Catálogo OCP Microscaling (MXFP8, MXFP4, NVFP4)
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5 my-auto">
            <div className="hpc-card p-5 border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">8-bit MX</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">MXFP8</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                Bloques de 32 valores FP8 (E4M3/E5M2) con escala E8M0 compartida. Máxima precisión para entrenamiento y fine-tuning de LLMs.
              </p>
            </div>

            <div className="hpc-card p-5 border-t-2 border-t-[#34d399]">
              <span className="hpc-badge-emerald font-mono mb-2 text-xs">4-bit MX</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">MXFP4</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                Bloques de 32 valores FP4 (E2M1) con escala E8M0 compartida. Reduce el consumo de memoria un 75% frente a FP16 estándar.
              </p>
            </div>

            <div className="hpc-card p-5 border-t-2 border-t-[#c084fc]">
              <span className="hpc-badge-purple font-mono mb-2 text-xs">Blackwell</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">NVFP4</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                Implementación nativa de NVIDIA Blackwell en Tensor Cores de 5ª gen, alcanzando hasta 20 PFLOPS de cómputo por GPU.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 6. Ancho de Banda y Latencia */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Métricas • Tráfico de Memoria</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              Ancho de Banda vs Latencia
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6 border-t-2 border-t-[#38bdf8]">
              <span className="hpc-badge-cyan font-mono mb-2 text-xs">Caudal</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Ancho de Banda (Bandwidth)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                • <strong>Definición:</strong> Volumen de datos transferido por unidad de tiempo (GB/s o TB/s).<br />
                • <strong>Analogía:</strong> El <em>grosor de la tubería</em>. Determina el caudal máximo sostenido de datos hacia las unidades de cómputo.
              </p>
            </div>

            <div className="hpc-card p-6 border-t-2 border-t-[#fb7185]">
              <span className="hpc-badge-rose font-mono mb-2 text-xs">Retardo</span>
              <h3 className="m-0 text-lg font-bold text-white mb-2">Latencia (Latency)</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                • <strong>Definición:</strong> Tiempo que tarda un dato individual en viajar desde la memoria hasta el registro del núcleo (en ns o ciclos).<br />
                • <strong>Analogía:</strong> La <em>velocidad del agua</em> o tiempo de respuesta inicial.
              </p>
            </div>
          </div>

          <div className="hpc-card p-3 text-xs text-slate-300 flex items-center gap-3 border-l-2 border-l-[#e6ff00]">
            <span className="px-2 py-0.5 rounded bg-[#161d2d] text-[#e6ff00] font-mono font-bold shrink-0">
              [ENFOQUE]
            </span>
            <span>
              <strong className="text-white">Enfoque de Optimización:</strong> En CPUs se optimiza para minimizar <em>Latencia</em> (cachés L1/L2 ultra rápidas); en GPUs se optimiza para maximizar <em>Ancho de Banda</em> masivo (HBM3e a &gt;5 TB/s).
            </span>
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

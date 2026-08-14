import React from 'react';
import { Slide, Stack } from '@revealjs/react';

export const Conclusion: React.FC = () => {
  return (
    <Stack>
      {/* 1. Principio 1 */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Conclusiones • Principio 1/4 (Fundamento Hardware)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              01. Conoce el Hardware y la Microarquitectura
            </h2>
          </div>

          <div className="hpc-card p-8 my-auto border-t-2 border-t-[#38bdf8]">
            <h3 className="m-0 text-xl font-bold text-white mb-3">Diseño Algorítmico Consciente del Silicio</h3>
            <p className="m-0 text-base text-slate-300 leading-relaxed mb-4">
              El software de alto rendimiento no es abstracto; se ejecuta sobre transistores físicos con restricciones inmutables:
            </p>
            <ul className="m-0 p-0 pl-5 text-sm text-slate-300 space-y-3 list-disc leading-relaxed">
              <li><strong className="text-white">Frontend &amp; Backend:</strong> Saturna las estaciones de reserva (RS) y mantén alimentados los puertos de ejecución evitando fallos de predicción de saltos.</li>
              <li><strong className="text-white">Topología NUMA &amp; First-Touch:</strong> Aloja las páginas de memoria en el socket local que procesará el cómputo.</li>
              <li><strong className="text-white">Modelo Roofline:</strong> Identifica si tu algoritmo está limitado por memoria o por cómputo antes de optimizar.</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* 2. Principio 2 */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Conclusiones • Principio 2/4 (Escalamiento &amp; Precisión)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              02. Explotar el Paralelismo y Formatos MX
            </h2>
          </div>

          <div className="hpc-card p-8 my-auto border-t-2 border-t-[#34d399]">
            <h3 className="m-0 text-xl font-bold text-white mb-3">Jerarquía de Paralelismo Multiescala</h3>
            <p className="m-0 text-base text-slate-300 leading-relaxed mb-4">
              Combina todas las dimensiones de paralelismo disponibles en la infraestructura:
            </p>
            <ul className="m-0 p-0 pl-5 text-sm text-slate-300 space-y-3 list-disc leading-relaxed">
              <li><strong className="text-white">Vectorización SIMD / VLA:</strong> Aprovecha registros de 512 bits (AVX-512 / ARM SVE2) con trazados de memoria contiguos (SoA).</li>
              <li><strong className="text-white">Block Floating Point (MXFP8 / MXFP4):</strong> Reduce el consumo de ancho de banda a la mitad o cuarta parte sin perder convergencia numérica.</li>
              <li><strong className="text-white">Modelo Híbrido (MPI + OpenMP/CUDA):</strong> Escala masivamente bajo la óptica de la Ley de Gustafson.</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* 3. Principio 3 */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Conclusiones • Principio 3/4 (Alianza con el Compilador)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              03. Colaborar con el Compilador
            </h2>
          </div>

          <div className="hpc-card p-8 my-auto border-t-2 border-t-[#e6ff00]">
            <h3 className="m-0 text-xl font-bold text-white mb-3">Escribir Código Compilador-Amigable</h3>
            <p className="m-0 text-base text-slate-300 leading-relaxed mb-4">
              Los compiladores modernos son motores extraordinarios si se les suministra la información semántica adecuada:
            </p>
            <ul className="m-0 p-0 pl-5 text-sm text-slate-300 space-y-3 list-disc leading-relaxed">
              <li><strong className="text-white">Desambiguación de Punteros:</strong> Usa <code className="text-slate-200 font-mono">__restrict__</code> para garantizar ausencia de alias de memoria y desbloquear auto-vectorización inmediata.</li>
              <li><strong className="text-white">Flags de Optimización:</strong> Compila con <code className="text-slate-200 font-mono">-O3 -march=native -ffast-math</code> para emitir instrucciones FMA en registros nativos.</li>
              <li><strong className="text-white">Dead Code Optimization:</strong> Estructura el flujo de datos para permitir que el compilador purgue ramas inactivas.</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* 4. Principio 4 */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[560px] mx-auto flex flex-col justify-between">
          <div className="mb-2">
            <span className="hpc-badge font-mono mb-2.5">Conclusiones • Principio 4/4 (Medición Empírica)</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-[#232a3d] pb-2.5">
              04. Perfilado y Medición Empírica
            </h2>
          </div>

          <div className="hpc-card p-8 my-auto border-t-2 border-t-[#c084fc]">
            <h3 className="m-0 text-xl font-bold text-white mb-3">Evitar la Optimización Prematura</h3>
            <p className="m-0 text-base text-slate-300 leading-relaxed mb-4">
              El rendimiento real solo se comprende mediante la inspección y la medición rigurosa:
            </p>
            <ul className="m-0 p-0 pl-5 text-sm text-slate-300 space-y-3 list-disc leading-relaxed">
              <li><strong className="text-white">Inspección de Ensamblador:</strong> Comprueba con herramientas como <strong className="text-white">Compiler Explorer (Godbolt)</strong> qué instrucciones vectoriales emite realmente el compilador.</li>
              <li><strong className="text-white">Contadores de Rendimiento Hardware:</strong> Monitorea IPC, tasa de fallos de caché L1/L2/L3 y stalls de memoria con perf, VTune o Nsight.</li>
              <li><strong className="text-white">Validación con Roofline:</strong> Compara el rendimiento alcanzado con el techo teórico del hardware.</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* 5. Slide de Cierre */}
      <Slide>
        <div className="text-center px-8 py-10 max-w-4xl w-full min-h-[540px] mx-auto flex flex-col justify-center items-center">
          <h2 className="text-6xl font-black text-white tracking-tight">
            ¡Muchas Gracias!
          </h2>
        </div>
      </Slide>
    </Stack>
  );
};

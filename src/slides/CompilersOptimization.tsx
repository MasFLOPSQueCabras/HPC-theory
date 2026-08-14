import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { Math } from '../components/Math';

export const CompilersOptimization: React.FC = () => {
  const godboltDcoUrl = "https://godbolt.org/#g:!((g:!((g:!((h:codeEditor,i:(filename:'1',fontScale:14,fontUseSize:true,source:'//+Dead+Code+Optimization+(DCO+/+DCE)%0Adouble+compute_with_dco(const+double*+__restrict__+input,+int+n)+%7B%0A++++double+active_sum+%3D+0.0%3B%0A++++double+unused_sum+%3D+0.0%3B+//+Codigo+Muerto+(Unused)%0A++++%0A++++for+(int+i+%3D+0%3B+i+%3C+n%3B+%2B%2Bi)+%7B%0A++++++++active_sum+%2B%3D+input%5Bi%5D+*+2.5%3B%0A++++++++unused_sum+%2B%3D+input%5Bi%5D+*+9.81%3B+//+El+compilador+lo+elimina%0A++++%7D%0A++++%0A++++return+active_sum%3B%0A%7D'),l:'5',n:'0',o:'C%2B%2B+source+%231',t:'0')),k:50,l:'4',n:'0',o:'',s:0,t:'0'),(g:!((h:compiler,i:(compiler:g141,filters:(b:'0',binary:'0',binaryObject:'0',commentOnly:'0',demangle:'1',directives:'0',execute:'0',intel:'0',libraryCode:'0',ptx:'0',noLocals:'0',unwrap:'0'),flags:'-O3+-march%3Dnative',fullCompilerName:'x86-64+gcc+14.1',group:1,l:'5',n:'0',o:'x86-64+gcc+14.1+(Compiler+%232)',t:'0')),k:50,l:'4',n:'0',o:'',s:0,t:'0')),m:100,n:'0',o:'',s:0,t:'0')),version:4";

  const godboltSimdUrl = "https://godbolt.org/#g:!((g:!((g:!((h:codeEditor,i:(filename:'1',fontScale:14,fontUseSize:true,source:'//+Auto-Vectorization+y+Loop+Unrolling%0Avoid+vector_fma(float*+__restrict__+c,+const+float*+__restrict__+a,+const+float*+__restrict__+b,+int+n)+%7B%0A++++for+(int+i+%3D+0%3B+i+%3C+n%3B+%2B%2Bi)+%7B%0A++++++++c%5Bi%5D+%3D+a%5Bi%5D+*+2.0f+%2B+b%5Bi%5D%3B%0A++++%7D%0A%7D'),l:'5',n:'0',o:'C%2B%2B+source+%231',t:'0')),k:50,l:'4',n:'0',o:'',s:0,t:'0'),(g:!((h:compiler,i:(compiler:g141,filters:(b:'0',binary:'0',binaryObject:'0',commentOnly:'0',demangle:'1',directives:'0',execute:'0',intel:'0',libraryCode:'0',ptx:'0',noLocals:'0',unwrap:'0'),flags:'-O3+-march%3Dskylake-avx512+-ffast-math',fullCompilerName:'x86-64+gcc+14.1',group:1,l:'5',n:'0',o:'x86-64+gcc+14.1+(Compiler+%232)',t:'0')),k:50,l:'4',n:'0',o:'',s:0,t:'0')),m:100,n:'0',o:'',s:0,t:'0')),version:4";

  return (
    <Stack>
      {/* 1. ¿Por qué importan los compiladores? */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Compiladores • Optimización</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              ¿Por qué importan los Compiladores en HPC?
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5 my-2">
            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Pilar 1</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">Instruction Scheduling</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                Planificación estática: reordena operaciones independientes para saturar puertos de ejecución paralelos y mitigar dependencias RAW.
              </p>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Pilar 2</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">Register Allocation</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                Asignación de registros: mantiene variables críticas en registros vectoriales (ej. ZMM de 512 bits) evitando derrames a RAM (Register Spilling).
              </p>
            </div>

            <div className="hpc-card p-6">
              <span className="hpc-badge font-mono mb-2 text-xs">Pilar 3</span>
              <h4 className="m-0 text-base font-bold text-white mb-2">Loop Transformations</h4>
              <p className="m-0 text-xs text-slate-300 leading-relaxed">
                Transformaciones de bucle: auto-vectorización SIMD, desenrollado (Unrolling) y eliminación de alias de punteros con <code className="text-slate-200">__restrict__</code>.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            💡 <strong className="text-white">Impacto en Rendimiento:</strong> Un compilador moderno con optimizaciones agresivas puede multiplicar el rendimiento por más de <strong>10x - 50x</strong> frente a código sin optimizar (-O0).
          </div>
        </div>
      </Slide>

      {/* 2. Dead Code Optimization (DCO) */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Optimizaciones • DCO</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              DCO / DCE (Dead Code Optimization / Elimination)
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Grafo de Flujo de Datos</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                El compilador analiza el grafo de dependencias de la función. Si un cálculo intermedio no altera el valor de retorno ni genera efectos colaterales observables, <strong className="text-white">se suprime por completo en el binario final generado</strong>.
              </p>
            </div>

            <div className="hpc-card p-6 flex flex-col justify-center">
              <h3 className="m-0 text-lg font-bold text-white mb-2">⚡ Impacto en Rendimiento</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Reduce drásticamente el número de instrucciones ejecutadas (<Math math="N_{\text{inst}}" />) y libera registros físicos en el procesador para cálculos que sí importan.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            🔍 <strong className="text-white">Advertencia en Benchmarks:</strong> Si un benchmark calcula un resultado y no lo imprime ni devuelve, el compilador puede optimizar el bucle entero a cero ciclos.
          </div>
        </div>
      </Slide>

      {/* 3. DCO Código y Godbolt */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Optimizaciones • DCO en Compiler Explorer</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              DCO: Código Fuente y Ensamblador
            </h2>
          </div>

          <div className="max-w-5xl my-2">
            <pre className="hpc-code-block text-sm">
{`double compute_with_dco(const double* __restrict__ input, int n) {
    double active_sum = 0.0;
    double unused_sum = 0.0; // Variable Muerta (Unused)

    for (int i = 0; i < n; ++i) {
        active_sum += input[i] * 2.5;
        unused_sum += input[i] * 9.81; // ¡Eliminado por GCC/Clang con -O3!
    }

    return active_sum; // Solo active_sum es observable
}`}
            </pre>
          </div>

          <div className="pt-2">
            <a href={godboltDcoUrl} target="_blank" rel="noopener noreferrer" className="godbolt-btn">
              ⚡ Ver Optimización DCO en Vivo en Compiler Explorer (Godbolt) &rarr;
            </a>
          </div>
        </div>
      </Slide>

      {/* 4. Auto-Vectorización y FMA */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Optimizaciones • Vectorización</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              Auto-Vectorización SIMD y FMA
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 my-2">
            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">Emisión Automática de AVX-512</h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Con <code className="text-slate-200 font-mono">-O3 -march=native -ffast-math</code>, el compilador emite instrucciones vectoriales <strong className="text-white">FMA (Fused Multiply-Add)</strong> <code className="text-slate-200 font-mono">vfmadd231ps</code> en registros ZMM de 512 bits.
              </p>
            </div>

            <div className="hpc-card p-6">
              <h3 className="m-0 text-lg font-bold text-white mb-2">El Modificador <code>__restrict__</code></h3>
              <p className="m-0 text-sm text-slate-300 leading-relaxed">
                Garantiza al compilador que los punteros no solapan regiones de memoria (evita <em>Pointer Aliasing</em>), permitiendo vectorizar de inmediato sin comprobaciones costosas en tiempo de ejecución.
              </p>
            </div>
          </div>

          <div className="hpc-card p-4 text-xs text-slate-300 text-center">
            🚀 <strong className="text-white">Beneficio:</strong> Ejecuta 16 sumas-multiplicaciones de coma flotante por instrucción, cuadruplicando el IPC efectivo.
          </div>
        </div>
      </Slide>

      {/* 5. SIMD Código y Godbolt */}
      <Slide>
        <div className="text-left px-8 py-6 max-w-6xl w-full min-h-[580px] mx-auto flex flex-col justify-between">
          <div>
            <span className="hpc-badge font-mono">Optimizaciones • SIMD en Compiler Explorer</span>
            <h2 className="text-3xl font-bold text-white mb-3 border-b border-slate-800 pb-2">
              SIMD FMA: Código y Ensamblador
            </h2>
          </div>

          <div className="max-w-5xl my-2">
            <pre className="hpc-code-block text-sm">
{`// Kernel C++ optimizado para AVX-512 FMA
void vector_fma(float* __restrict__ c, 
                const float* __restrict__ a, 
                const float* __restrict__ b, 
                int n) {
    for (int i = 0; i < n; ++i) {
        c[i] = a[i] * 2.0f + b[i]; // Emite vfmadd231ps %zmm
    }
}`}
            </pre>
          </div>

          <div className="pt-2">
            <a href={godboltSimdUrl} target="_blank" rel="noopener noreferrer" className="godbolt-btn">
              🔍 Ver Ensamblador AVX-512 FMA en Compiler Explorer (Godbolt) &rarr;
            </a>
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

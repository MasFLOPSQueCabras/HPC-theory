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
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Compiladores • Optimización</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>¿Por qué importan los Compiladores en HPC?</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>Pilar 1</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>Instruction Scheduling</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                Planificación estática: reordena operaciones independientes para saturar puertos de ejecución paralelos y mitigar dependencias RAW.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>Pilar 2</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>Register Allocation</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                Asignación de registros: mantiene variables críticas en registros vectoriales (ej. ZMM de 512 bits) evitando derrames a RAM (Register Spilling).
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>Pilar 3</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1rem', color: '#ffffff' }}>Loop Transformations</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                Transformaciones de bucle: auto-vectorización SIMD, desenrollado (Unrolling) y eliminación de alias de punteros con <code>__restrict__</code>.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 2. Dead Code Optimization (DCO) */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Optimizaciones • DCO</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>DCO / DCE (Dead Code Optimization / Elimination)</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Análisis de Flujo de Datos (Data Flow)</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                El compilador analiza el grafo de dependencias de la función. Si un cálculo no altera el valor de retorno ni genera efectos colaterales observables, <strong>se suprime por completo en el binario final generado</strong>.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <strong style={{ color: '#ffffff', fontSize: '1rem' }}>⚡ Impacto en Rendimiento:</strong>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Reduce drásticamente el número de instrucciones ejecutadas (<Math math="N_{\text{inst}}" />) y libera registros físicos en el procesador para cálculos que sí importan.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 3. DCO Código y Godbolt */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Optimizaciones • DCO en Compiler Explorer</span>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>DCO: Código Fuente y Ensamblador</h2>

          <div style={{ maxWidth: '950px' }}>
            <pre className="hpc-code-block" style={{ fontSize: '0.82rem', padding: '1rem', margin: '0 0 0.8rem 0' }}>
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

            <a href={godboltDcoUrl} target="_blank" rel="noopener noreferrer" className="godbolt-btn">
              ⚡ Ver Optimización DCO en Vivo en Compiler Explorer (Godbolt)
            </a>
          </div>
        </div>
      </Slide>

      {/* 4. Auto-Vectorización y FMA */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Optimizaciones • Vectorización</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>Auto-Vectorización SIMD y FMA</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Emisión Automática de AVX-512</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Con <code>-O3 -march=native -ffast-math</code>, el compilador emite instrucciones vectoriales <strong>FMA (Fused Multiply-Add)</strong> <code>vfmadd231ps</code> en registros ZMM de 512 bits.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>La Clave: <code>__restrict__</code></h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Garantiza al compilador que los punteros no solapan regiones de memoria (evita Pointer Aliasing), permitiendo vectorizar de inmediato sin comprobaciones costosas en tiempo de ejecución.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 5. SIMD Código y Godbolt */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Optimizaciones • SIMD en Compiler Explorer</span>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>SIMD FMA: Código y Ensamblador</h2>

          <div style={{ maxWidth: '950px' }}>
            <pre className="hpc-code-block" style={{ fontSize: '0.82rem', padding: '1rem', margin: '0 0 0.8rem 0' }}>
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

            <a href={godboltSimdUrl} target="_blank" rel="noopener noreferrer" className="godbolt-btn">
              🔍 Ver Ensamblador AVX-512 FMA en Compiler Explorer (Godbolt)
            </a>
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { FlynnMatrix } from '../components/FlynnMatrix';
import { SimdElementwise } from '../components/simd/SimdElementwise';
import { SimdMasking } from '../components/simd/SimdMasking';
import { SimdGatherScatter } from '../components/simd/SimdGatherScatter';
import { SimdReduction } from '../components/simd/SimdReduction';
import { SimdShuffle } from '../components/simd/SimdShuffle';
import { SpmdDiagram } from '../components/SpmdDiagram';
import { SimtDiagram } from '../components/SimtDiagram';
import { Math } from '../components/Math';

export const FlynnAndParallelism: React.FC = () => {
  return (
    <Stack>
      {/* 1. Taxonomía de Flynn */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Taxonomías • Clasificación</span>
          <h2>Taxonomía de Flynn</h2>

          <p style={{ fontSize: '0.88rem', margin: '0.2rem 0 0.8rem 0', color: '#cbd5e1' }}>
            Clasificación clásica propuesta por Michael J. Flynn según el número de flujos concurrentes de instrucciones y datos.
          </p>

          <FlynnMatrix />
        </div>
      </Slide>

      {/* 2. ¿Qué es SIMD? */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Procesamiento Vectorial • SIMD</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1.2rem' }}>Concepto de Registros y Carriles SIMD</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Single Instruction, Multiple Data</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Una sola instrucción de máquina desencadena la misma operación matemática simultáneamente a través de múltiples elementos homogéneos agrupados en un <strong>registro vectorial ancho</strong>.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Estructura de Carriles (Vector Lanes)</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Un registro <strong>AVX-512 de 512 bits (ZMM)</strong> se subdivide en <strong>16 carriles de 32 bits (Floats)</strong> o <strong>8 carriles de 64 bits (Doubles)</strong>, ejecutando 16 operaciones flotantes en un solo ciclo de reloj por unidad FMA.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 3. SIMD Moderno: Vector Length Agnostic (VLA) */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">SIMD Moderno • Paradigma VLA</span>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>
            Vector Length Agnostic (VLA): ARM SVE2 y RISC-V Vector
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '0.8rem' }}>
            {/* Fixed Length SIMD Card */}
            <div className="hpc-card" style={{ padding: '1.1rem' }}>
              <span className="hpc-badge">Tradicional (x86 SSE/AVX)</span>
              <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.98rem' }}>Longitud Fija (Fixed-Length)</h4>
              <ul style={{ fontSize: '0.78rem', paddingLeft: '1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.3rem', lineHeight: 1.35 }}>
                <li>El tamaño de registro está <strong>cableado en el binario</strong> (128, 256 o 512 bits).</li>
                <li>Requiere <strong>recompilar</strong> para cada nueva extensión y distribuir múltiples rutas de código.</li>
                <li>Necesita bucles de limpieza (<strong>Loop Tail Cleanup</strong>) para los elementos sobrantes.</li>
              </ul>
            </div>

            {/* VLA SIMD Card */}
            <div className="hpc-card" style={{ padding: '1.1rem' }}>
              <span className="hpc-badge">VLA (ARM SVE2 / RISC-V RVV)</span>
              <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.98rem' }}>Longitud Agnóstica (VLA)</h4>
              <ul style={{ fontSize: '0.78rem', paddingLeft: '1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.3rem', lineHeight: 1.35 }}>
                <li><strong>Un solo binario</strong> se adapta dinámicamente a registros de 128, 256, 512 o hasta 2048 bits.</li>
                <li>El hardware informa cuántos elementos procesar por iteración (<Math math="\text{VL}" /> dinámico).</li>
                <li><strong>Cero Loop Tail:</strong> La predicción por hardware gestiona automáticamente el residuo final.</li>
              </ul>
            </div>
          </div>

          <div style={{ background: '#070a12', padding: '0.7rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', maxWidth: '100%' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.2rem' }}>
              Bucle Vectorial Dinámico en RISC-V Vector (RVV) y ARM SVE2:
            </div>
            <pre style={{ margin: 0, fontFamily: 'var(--font-code)', fontSize: '0.78rem', color: '#f8fafc', lineHeight: 1.4 }}>
              <code>
                {`// RISC-V Vector (RVV): vsetvli configura dinámicamente el número de elementos (vl)
loop:
    vsetvli  t0, a2, e32, m1, ta, ma   # t0 = vl (elementos calculados por iteración)
    vle32.v  v0, (a0)                  # Carga vector de tamaño dinámico
    vle32.v  v1, (a1)                  # Carga vector de operandos
    vfadd.vv v2, v0, v1                # Suma vectorial sobre todos los carriles
    vse32.v  v2, (a0)                  # Guarda resultado
    sub      a2, a2, t0                # n = n - vl
    bnez     a2, loop                  # Continúa hasta agotar el arreglo`}
              </code>
            </pre>
          </div>
        </div>
      </Slide>

      {/* 4. SIMD 1: Aritmética Elementwise y FMA */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">SIMD • Operaciones (1/5)</span>
          <h2>Aritmética Vectorial y FMA</h2>

          <SimdElementwise />
        </div>
      </Slide>

      {/* 5. SIMD 2: Predicación y Vector Masking */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">SIMD • Operaciones (2/5)</span>
          <h2>Predicación y Máscaras Vectoriales</h2>

          <SimdMasking />
        </div>
      </Slide>

      {/* 6. SIMD 3: Gather & Scatter */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">SIMD • Operaciones (3/5)</span>
          <h2>Accesos a Memoria: Gather y Scatter</h2>

          <SimdGatherScatter />
        </div>
      </Slide>

      {/* 7. SIMD 4: Reducciones Horizontales */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">SIMD • Operaciones (4/5)</span>
          <h2>Reducciones Vectoriales Horizontales</h2>

          <SimdReduction />
        </div>
      </Slide>

      {/* 8. SIMD 5: Permute y Shuffles */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">SIMD • Operaciones (5/5)</span>
          <h2>Permutación y Shuffles de Carriles</h2>

          <SimdShuffle />
        </div>
      </Slide>

      {/* 9. Paradigma SPMD */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Modelos de Ejecución • SPMD</span>
          <h2>SPMD (Single Program, Multiple Data)</h2>

          <SpmdDiagram />
        </div>
      </Slide>

      {/* 10. Paradigma SIMT */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Modelos de Ejecución • SIMT</span>
          <h2>SIMT (Single Instruction, Multiple Threads)</h2>

          <SimtDiagram />
        </div>
      </Slide>
    </Stack>
  );
};

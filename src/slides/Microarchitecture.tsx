import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { VonNeumannSlide } from '../components/microarch/VonNeumannSlide';
import { HarvardSlide } from '../components/microarch/HarvardSlide';
import { SplitCacheExplanation } from '../components/microarch/SplitCacheExplanation';
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
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Microarquitectura • Fundamentos</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1.2rem' }}>ISA vs Microarquitectura (&mu;Arch)</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                <span className="hpc-badge">ISA</span>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#ffffff' }}>Instruction Set Architecture</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                El <strong>contrato lógico abstracto</strong> entre software y hardware (ej. <code>x86-64</code>, <code>ARMv9</code>, <code>RISC-V</code>). Define los registros visibles para el programador (ARF - Architectural Register File), los opcodes, modos de direccionamiento y el modelo de consistencia de memoria.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                <span className="hpc-badge">&mu;Arch</span>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#ffffff' }}>Microarquitectura (Silicio)</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                La <strong>implementación física en silicio</strong> (ej. Intel Golden Cove, AMD Zen 5, Apple M4, ARM Neoverse V2). Determina la profundidad del pipeline, el tamaño del Reorder Buffer (ROB), la cantidad de puertos de ejecución (ALUs, FPUs, AGUs) y la jerarquía de cachés.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 2. Ecuación de Rendimiento de la CPU */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Microarquitectura • Métricas Fundamentales</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.8rem' }}>Ecuación Clásica de Rendimiento de la CPU</h2>

          <div className="hpc-formula-box" style={{ fontSize: '1.2rem', padding: '0.8rem 1.2rem', margin: '0.6rem 0 1.2rem 0' }}>
            <Math math="\text{CPU Time} = N_{\text{inst}} \times \text{CPI} \times T_{\text{clk}} = \frac{N_{\text{inst}} \times \text{CPI}}{f}" block />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>Término 1: N_inst</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1.05rem', color: '#ffffff' }}>N° de Instrucciones</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                Determinado por la complejidad algorítmica del código fuente y la agresividad del compilador al optimizar (eliminando código muerto con DCO/DCE).
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>Término 2: CPI / IPC</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1.05rem', color: '#ffffff' }}>CPI (Ciclos / Instrucción)</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                Determinado por la microarquitectura (Pipelining, ejecución fuera de orden OoO). Su inverso es el <strong>IPC (Instructions Per Cycle)</strong>: <Math math="\text{IPC} = \frac{1}{\text{CPI}}" />.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <span className="hpc-badge" style={{ fontSize: '0.72rem' }}>Término 3: T_clk / f</span>
              <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '1.05rem', color: '#ffffff' }}>Tiempo de Ciclo y Frecuencia</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                Determinado por el nodo litográfico y el retardo del camino crítico (<Math math="T_{\text{clk}} = \frac{1}{f}" /> en GHz).
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 3. El Trilema del Silicio: PPA */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Microarquitectura • Trilema de Diseño</span>
          <h2>El Trilema Fundamental del Silicio: PPA (Power, Performance, Area)</h2>

          <PpaDiagram />
        </div>
      </Slide>

      {/* 4. Leyes Físicas y Dennard Scaling */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Microarquitectura • Límites Físicos</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>Leyes Físicas y el Fin de Dennard Scaling</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Ley de Moore (1965)</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                El número de transistores por chip se duplica cada ~2 años. Permite integrar más núcleos, mayores cachés L3 (LLC - Last Level Cache) y unidades vectoriales SIMD de 512 bits.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Dennard Scaling (1974 - 2005)</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                Establecía que al reducir el tamaño del transistor, la densidad de potencia permanecía constante porque el voltaje (<Math math="V" />) bajaba proporcionalmente con la escala litográfica.
              </p>
            </div>
          </div>

          <div className="hpc-card" style={{ padding: '0.9rem 1.2rem', fontSize: '0.85rem', color: '#e5e7eb' }}>
            ⚠️ <strong>Ruptura en 2005:</strong> Por debajo de ~0.8V, las corrientes de fuga cuántica dispararon el consumo estático. El escalamiento libre de frecuencia de reloj (~3-5 GHz) se detuvo para siempre.
          </div>
        </div>
      </Slide>

      {/* 5. El Muro de Potencia y Dark Silicon */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Microarquitectura • Límites Físicos</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.8rem' }}>Power Wall y Silicio Oscuro (Dark Silicon)</h2>

          <div className="hpc-formula-box" style={{ fontSize: '1.15rem', margin: '0.4rem 0 1rem 0', padding: '0.7rem 1.2rem' }}>
            <Math math="P_{\text{total}} = P_{\text{dyn}} + P_{\text{leak}} = (\alpha \cdot C \cdot V^2 \cdot f) + (I_{\text{leak}} \cdot V)" block />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>El Muro de Potencia (Power Wall)</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                Límite térmico máximo (~300W a 500W por socket) que puede disiparse por refrigeración antes de la degradación física o electromigración del silicio.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Silicio Oscuro (Dark Silicon)</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                En litografías modernas sub-3nm, <strong>un porcentaje significativo del silicio debe permanecer apagado o en reposo</strong> para no sobrepasar el presupuesto térmico máximo del procesador.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 6. Arquitectura Clásica 1: Modelo Von Neumann */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Arquitectura de Computadores • Modelo Clásico (1/2)</span>
          <h2>Arquitectura Clásica: Modelo Von Neumann (1945)</h2>

          <VonNeumannSlide />
        </div>
      </Slide>

      {/* 7. Arquitectura Clásica 2: Modelo Harvard */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Arquitectura de Computadores • Modelo Clásico (2/2)</span>
          <h2>Arquitectura Clásica: Modelo Harvard (1944)</h2>

          <HarvardSlide />
        </div>
      </Slide>

      {/* 8. Fundamento Previo: ¿Por qué Caché I y Caché D Separadas? */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Jerarquía de Silicio • Fundamento de Caché L1</span>
          <h2>Arquitectura Harvard Dividida: ¿Por qué Caché I y Caché D Separadas?</h2>

          <SplitCacheExplanation />
        </div>
      </Slide>

      {/* 9. Sección 1 Microarquitectura: Visión General Frontend vs Backend */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Microarquitectura • Estructura Fundamental</span>
          <h2>Microarquitectura de CPU: Visión General Frontend vs Backend</h2>

          <FrontendBackendOverview />
        </div>
      </Slide>

      {/* 10. Sección 2 Microarquitectura: Frontend en Profundidad */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Microarquitectura • In-Order Frontend</span>
          <h2>El Frontend en Detalle: Fetch, Predicción, Decodificación y Renaming</h2>

          <FrontendDetail />
        </div>
      </Slide>

      {/* 11. Sección 3 Microarquitectura: Backend en Profundidad */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Microarquitectura • Out-of-Order Backend</span>
          <h2>El Backend en Detalle: Issue Queue, Ejecución Paralela y Retiro (ROB)</h2>

          <BackendDetail />
        </div>
      </Slide>

      {/* 12. Pipelining Clásico */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Microarquitectura • Segmentación</span>
          <h2>Segmentación de Instrucciones (Pipelining RISC de 5 Etapas)</h2>

          <p style={{ margin: '0.2rem 0 0.8rem 0', fontSize: '0.88rem', color: '#cbd5e1' }}>
            Divide la ejecución de cada instrucción en 5 etapas secuenciales independientes (<strong>IF</strong>: Instruction Fetch, <strong>ID</strong>: Instruction Decode, <strong>EX</strong>: Execute, <strong>MEM</strong>: Memory Access, <strong>WB</strong>: Writeback) para completar 1 instrucción por ciclo.
          </p>

          <PipelineDiagram />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginTop: '1rem' }}>
            <div className="hpc-card" style={{ padding: '1rem' }}>
              <h4 style={{ margin: 0, color: '#ffffff', fontSize: '0.95rem' }}>Throughput (Rendimiento) vs Latencia</h4>
              <p style={{ fontSize: '0.8rem', margin: '0.3rem 0 0 0', color: '#cbd5e1', lineHeight: 1.35 }}>
                La segmentación no reduce el tiempo individual de una instrucción (latencia), pero multiplica la tasa de instrucciones completadas por segundo (throughput).
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1rem' }}>
              <h4 style={{ margin: 0, color: '#ffffff', fontSize: '0.95rem' }}>Aceleración Teórica (Speedup)</h4>
              <p style={{ fontSize: '0.8rem', margin: '0.3rem 0 0 0', color: '#cbd5e1', lineHeight: 1.35 }}>
                Con <Math math="k" /> etapas perfectamente balanceadas: <Math math="\text{Speedup} \approx k" /> respecto a una ejecución no segmentada monolítica.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 13. Visión General e Interactiva de Hazards */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Microarquitectura • Pipeline Hazards</span>
          <h2>Peligros (Hazards) del Pipeline y Clasificación</h2>

          <HazardsDiagram />
        </div>
      </Slide>

      {/* 14. Data Hazard 1: RAW (Read-After-Write) */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Hazards de Datos • Dependencia Real</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.8rem' }}>RAW (Read-After-Write): Dependencia Verdadera</h2>

          <div style={{ background: '#070a12', padding: '0.9rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.2rem', maxWidth: '950px' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Ejemplo en Ensamblador:</div>
            <pre style={{ margin: 0, fontFamily: 'var(--font-code)', fontSize: '0.85rem', color: '#f8fafc', lineHeight: 1.5 }}>
              <div>I1: ADD R1, R2, R3   <span style={{ color: '#94a3b8' }}>; Escribe en R1</span></div>
              <div>I2: SUB R4, R1, R5   <span style={{ color: '#94a3b8' }}>; Lee R1 (debe esperar a que I1 produzca el valor)</span></div>
            </pre>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '1rem' }}>Comportamiento en In-Order</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                El hardware introduce <strong>Data Forwarding (Bypass directo desde la salida de la ALU a la entrada de EX)</strong>. Si I1 era un <code>load</code> de memoria, se debe insertar un <strong>ciclo de stall (burbuja)</strong>.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '1rem' }}>Comportamiento en Out-of-Order (OoO)</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                I2 se coloca en la <strong>Estación de Reserva (RS / Issue Queue)</strong> y espera dinámicamente hasta que I1 difunde su resultado por el <strong>CDB (Common Data Bus / Bus Común de Datos)</strong>.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 15. Data Hazard 2: WAR (Write-After-Read) */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Hazards de Datos • Antidependencia</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.8rem' }}>WAR (Write-After-Read): Falsa Dependencia de Nombre</h2>

          <div style={{ background: '#070a12', padding: '0.9rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.2rem', maxWidth: '950px' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Ejemplo en Ensamblador:</div>
            <pre style={{ margin: 0, fontFamily: 'var(--font-code)', fontSize: '0.85rem', color: '#f8fafc', lineHeight: 1.5 }}>
              <div>I1: ADD R4, R1, R5   <span style={{ color: '#94a3b8' }}>; Lee R1</span></div>
              <div>I2: SUB R1, R2, R3   <span style={{ color: '#94a3b8' }}>; Escribe en R1 (no debe sobreescribir antes de que I1 lea)</span></div>
            </pre>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '1rem' }}>Inexistente en Pipelines In-Order</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                En un pipeline estrictamente secuencial, la lectura del operando en la etapa ID de I1 ocurre antes de que I2 alcance la etapa Writeback (WB).
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '1rem' }}>Solución en OoO: Register Renaming</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                El hardware asigna a I2 un <strong>registro físico distinto (ej. P19 en vez de P12)</strong> mediante la <strong>RAT (Register Alias Table / Tabla de Alias de Registros)</strong>, eliminando por completo la falsa dependencia.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 16. Data Hazard 3: WAW (Write-After-Write) */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Hazards de Datos • Dependencia de Salida</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.8rem' }}>WAW (Write-After-Write): Dependencia de Salida</h2>

          <div style={{ background: '#070a12', padding: '0.9rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.2rem', maxWidth: '950px' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Ejemplo en Ensamblador:</div>
            <pre style={{ margin: 0, fontFamily: 'var(--font-code)', fontSize: '0.85rem', color: '#f8fafc', lineHeight: 1.5 }}>
              <div>I1: MUL R1, R2, R3   <span style={{ color: '#94a3b8' }}>; Escribe en R1 (Operación larga de 4 ciclos)</span></div>
              <div>I2: ADD R1, R4, R5   <span style={{ color: '#94a3b8' }}>; Escribe en R1 (Operación rápida de 1 ciclo)</span></div>
            </pre>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '1rem' }}>El Conflicto de Salida</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Si I2 termina antes que I1 en un motor fuera de orden o superescalar, la escritura tardía de I1 sobreescribiría y corrompería el valor más reciente de R1.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h4 style={{ margin: '0 0 0.3rem 0', color: '#ffffff', fontSize: '1rem' }}>Solución: Renaming + Reorder Buffer</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Se asignan registros físicos independientes en la <strong>RAT (Register Alias Table)</strong> y el <strong>ROB (Reorder Buffer)</strong> garantiza que el retiro arquitectural respete el orden del programa.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 17. RAR y Resumen de Dependencias */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Hazards de Datos • Síntesis</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.8rem' }}>RAR (Read-After-Read) y Resumen de Mitigaciones</h2>

          <div style={{ background: '#070a12', padding: '0.7rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1rem', maxWidth: '950px' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.2rem' }}>RAR (Lectura Concurrente):</div>
            <code style={{ fontSize: '0.82rem', color: '#f8fafc' }}>
              I1: ADD R4, R1, R2 &nbsp;|&nbsp; I2: SUB R5, R1, R3 &nbsp;&rarr;&nbsp; No es un hazard (lectura simultánea compartida sin conflicto)
            </code>
          </div>

          <table className="hpc-table" style={{ maxWidth: '950px' }}>
            <thead>
              <tr>
                <th>Hazard</th>
                <th>Nombre Técnico</th>
                <th>¿Afecta a In-Order?</th>
                <th>Solución en Out-of-Order (OoO)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>RAW</strong></td>
                <td>Dependencia Verdadera (True Dependency)</td>
                <td>Sí (Forwarding / Stalls)</td>
                <td>Estaciones de Reserva (RS) + CDB (Common Data Bus)</td>
              </tr>
              <tr>
                <td><strong>WAR</strong></td>
                <td>Antidependencia (Anti-dependency)</td>
                <td>No</td>
                <td>Register Renaming (RAT / PRF - Physical Register File)</td>
              </tr>
              <tr>
                <td><strong>WAW</strong></td>
                <td>Dependencia de Salida (Output Dependency)</td>
                <td>Solo latencia variable</td>
                <td>Register Renaming (RAT) + ROB (Reorder Buffer)</td>
              </tr>
              <tr>
                <td><strong>RAR</strong></td>
                <td>Lectura Concurrente</td>
                <td>No (Sin conflicto)</td>
                <td>Múltiples puertos de lectura en el PRF</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Slide>

      {/* 18. Predicción de Saltos y Especulación */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Microarquitectura • Especulación</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>Predicción de Saltos (BPU) y Especulación</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Coste de Branch Misprediction</h3>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                En pipelines profundos (14 a 20 etapas), un fallo de predicción obliga a vaciar el pipeline (<strong>Pipeline Flush</strong>), desperdiciando de <strong>15 a 20 ciclos de trabajo útil</strong>.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>BPU y Predictores Modernos</h3>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                La <strong>BPU (Branch Prediction Unit)</strong> utiliza el <strong>BTB (Branch Target Buffer)</strong> y algoritmos avanzados como <strong>TAGE (TAgged GEometric History Length)</strong> o redes neuronales perceptrón para alcanzar precisiones de <strong>&gt;98%</strong>.
              </p>
            </div>
          </div>

          <div className="hpc-card" style={{ padding: '0.9rem 1.2rem', fontSize: '0.84rem', color: '#e5e7eb' }}>
            💡 <strong>Retiro Especulativo Seguro:</strong> Las instrucciones especulativas calculan sus resultados en registros temporales. Si el salto fue acertado, se confirman en el Reorder Buffer (ROB); si falló, se descartan instantáneamente sin alterar el estado arquitectural visible.
          </div>
        </div>
      </Slide>

      {/* 19. In-Order vs Out-of-Order */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Microarquitectura • Planificación Dinámica</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>In-Order vs Out-of-Order (OoO)</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.3rem' }}>
              <span className="hpc-badge">In-Order (Secuencial)</span>
              <h3 style={{ fontSize: '1.15rem', margin: '0.4rem 0', color: '#ffffff' }}>Secuencia Estricta</h3>
              <ul style={{ fontSize: '0.82rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem', lineHeight: 1.4 }}>
                <li>Ejecuta en el orden exacto del flujo binario del programa.</li>
                <li>Solo sufre de dependencias verdaderas (RAW).</li>
                <li>Un fallo de caché LLC (L3) o latencia DRAM (~200 ciclos) congela el núcleo entero.</li>
                <li>Máxima eficiencia energética por área de silicio.</li>
              </ul>
            </div>

            <div className="hpc-card" style={{ padding: '1.3rem' }}>
              <span className="hpc-badge">Out-of-Order (OoO Dinámico)</span>
              <h3 style={{ fontSize: '1.15rem', margin: '0.4rem 0', color: '#ffffff' }}>Ejecución Dinámica</h3>
              <ul style={{ fontSize: '0.82rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem', lineHeight: 1.4 }}>
                <li>Desacopla la decodificación de la ejecución de instrucciones.</li>
                <li>Elimina dependencias falsas WAR y WAW mediante Register Renaming (RAT / PRF).</li>
                <li>Ejecuta trabajo independiente mientras espera datos lentos de memoria principal.</li>
                <li>Estándar absoluto en procesadores de servidor HPC (Intel Xeon, AMD EPYC, Apple M-Max/Ultra).</li>
              </ul>
            </div>
          </div>
        </div>
      </Slide>

      {/* 20. El Reorder Buffer (ROB) y Operaciones In-Flight */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Microarquitectura • Gestión In-Flight</span>
          <h2>El Reorder Buffer (ROB) y Operaciones In-Flight</h2>

          <RobDiagram />
        </div>
      </Slide>

      {/* 21. Superescalar y Límites del ILP */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Microarquitectura • Límites de Rendimiento</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.8rem' }}>Superescalar y el Muro del ILP (Instruction-Level Parallelism)</h2>

          <div className="hpc-formula-box" style={{ fontSize: '1.05rem', margin: '0.4rem 0 1rem 0', padding: '0.7rem 1.2rem' }}>
            Rendimiento CPU = Frecuencia (GHz) × IPC (Instrucciones por Ciclo &gt; 1)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Multiple Issue (6 a 8 vías)</h3>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                Capacidad del hardware para decodificar, despachar y retirar múltiples instrucciones independientes simultáneamente en cada ciclo de reloj.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>El Muro del ILP (ILP Wall)</h3>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                Las dependencias de datos y saltos saturan el <strong>ILP (Instruction-Level Parallelism)</strong> en <strong>IPC &approx; 2 a 3</strong>. Extraer más ILP incrementa la complejidad del silicio y el consumo térmico exponencialmente.
              </p>
            </div>
          </div>

          <div className="hpc-card" style={{ padding: '0.9rem 1.2rem', fontSize: '0.84rem', color: '#e5e7eb' }}>
            🚀 <strong>Conclusión para HPC:</strong> Al alcanzarse el muro del ILP, la computación de alto rendimiento viró hacia el <strong>Paralelismo de Datos (SIMD / VLA)</strong> y el <strong>Multiprocesamiento (Multinúcleo / NUMA / GPUs)</strong>.
          </div>
        </div>
      </Slide>
    </Stack>
  );
};

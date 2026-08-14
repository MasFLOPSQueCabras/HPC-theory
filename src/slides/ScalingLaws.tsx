import React from 'react';
import { Slide, Stack } from '@revealjs/react';
import { ScalingChart } from '../components/ScalingChart';
import { Math } from '../components/Math';

export const ScalingLaws: React.FC = () => {
  return (
    <Stack>
      {/* 1. Strong Scaling & Amdahl */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Escalamiento Paralelo • Strong Scaling</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.8rem' }}>Escalamiento Fuerte y Ley de Amdahl</h2>

          <div className="hpc-formula-box" style={{ fontSize: '1.2rem', padding: '0.8rem 1.2rem', margin: '0.6rem 0 1.2rem 0' }}>
            <Math math="\text{Speedup}(P) = \frac{1}{(1 - p) + \frac{p}{P}} = \frac{1}{s + \frac{p}{P}}" block />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Premisa del Modelo</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <strong>Tamaño de problema fijo</strong>: Se incrementa el número de procesadores (<Math math="P" />) para resolver el mismo problema en el menor tiempo posible (Time-to-Solution).
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Variables Clave</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                • <Math math="p" />: Fracción de código paralelizable.<br />
                • <Math math="s = 1 - p" />: Fracción estrictamente secuencial.<br />
                • <Math math="P" />: Cantidad de núcleos o procesadores.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 2. El Cuello de Botella Serial */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Amdahl • Límite Teórico</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '1rem' }}>El Cuello de Botella Serial</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>
                Límite Asintótico (<Math math="P \to \infty" />)
              </h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Incluso con un número infinito de núcleos (<Math math="P \to \infty" />), el Speedup máximo absoluto posible está limitado a: <Math math="\text{Speedup}_{\max} = \frac{1}{s}" />.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.4rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Ejemplo Numérico</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Si el <strong>5% del código es serial (<Math math="s = 0.05" />)</strong>, la aceleración máxima jamás superará <strong>20x</strong>, aunque se utilicen 100,000 procesadores.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 3. Weak Scaling & Gustafson */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.8rem 1.5rem' }}>
          <span className="hpc-badge">Escalamiento Paralelo • Weak Scaling</span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.8rem' }}>Escalamiento Débil y Ley de Gustafson</h2>

          <div className="hpc-formula-box" style={{ fontSize: '1.2rem', padding: '0.8rem 1.2rem', margin: '0.6rem 0 1.2rem 0' }}>
            <Math math="\text{Scaled Speedup}(P) = P - s \cdot (P - 1) = 1 + (P - 1) \cdot p" block />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Premisa del Modelo</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <strong>Carga por procesador constante</strong>: El tamaño total del problema se expande proporcionalmente con el número de procesadores (<Math math="P" />) para resolver problemas más grandes en el mismo tiempo.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Pilar del Cómputo Exascale</h3>
              <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Al incrementar la resolución de la malla, la porción paralelizable domina el tiempo de cómputo, logrando un <strong>escalamiento lineal sostenible</strong> en supercomputadores.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* 4. Gráficas Comparativas */}
      <Slide>
        <div style={{ textAlign: 'left', padding: '0.5rem 1rem' }}>
          <span className="hpc-badge">Escalamiento Paralelo • Comparativa Dinámica</span>
          <h2>Gráficas Comparativas de Escalamiento</h2>

          <ScalingChart />
        </div>
      </Slide>
    </Stack>
  );
};

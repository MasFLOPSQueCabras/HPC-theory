import React from 'react';
import { Slide } from '@revealjs/react';

export const Title: React.FC = () => {
  return (
    <Slide>
      <div style={{ textAlign: 'center', padding: '3rem 1rem 2rem 1rem' }}>
        <h1 style={{ fontSize: '3.8rem', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 1rem 0' }}>
          De la Microarquitectura a los Compiladores
        </h1>
        
        <p style={{ fontSize: '1.35rem', color: 'var(--hpc-muted)', maxWidth: '780px', margin: '1.2rem auto 0 auto', fontWeight: 300, lineHeight: 1.4 }}>
          Conceptos fundamentales, métricas de rendimiento, arquitecturas de memoria y optimización
        </p>

        <div style={{
          marginTop: '3.5rem',
          display: 'inline-block',
          fontFamily: 'var(--font-code)',
          fontSize: '0.95rem',
          color: 'var(--hpc-primary)',
          fontWeight: 600,
          letterSpacing: '0.06em',
          padding: '0.45rem 1.4rem',
          borderRadius: '8px',
          background: 'rgba(244, 184, 96, 0.1)',
          border: '1px solid rgba(244, 184, 96, 0.25)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          MasFLOPSQueCabras
        </div>
      </div>
    </Slide>
  );
};

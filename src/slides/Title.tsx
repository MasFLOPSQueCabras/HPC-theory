import React from 'react';
import { Slide } from '@revealjs/react';

export const Title: React.FC = () => {
  return (
    <Slide>
      <div className="flex flex-col items-center justify-center min-h-[580px] text-center px-6 py-8">
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mb-4">
          De la Microarquitectura a los Compiladores
        </h1>
        
        <p className="text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
          Fundamentos de silicio, modelos de rendimiento, jerarquía de memoria, paralelismo masivo y optimización de código.
        </p>
      </div>
    </Slide>
  );
};

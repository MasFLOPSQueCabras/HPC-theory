import React from 'react';
import { Slide } from '@revealjs/react';

export const Title: React.FC = () => {
  return (
    <Slide>
      <div className="relative flex flex-col items-center justify-center min-h-[580px] text-center px-6 py-8">
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mb-6">
          De la <span className="text-[#e6ff00]">Microarquitectura</span> a los <span className="text-[#e6ff00]">Compiladores</span>
        </h1>
        
        <p className="text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
          Fundamentos de silicio, modelos de rendimiento, jerarquía de memoria, paralelismo masivo y optimización de código.
        </p>

        {/* Marca distintiva en la esquina inferior izquierda */}
        <div className="absolute bottom-0 left-0 flex items-center gap-3 text-left">
          <div className="h-5 w-1 bg-[#e6ff00] rounded-full shadow-[0_0_10px_rgba(230,255,0,0.4)]" />
          <span className="font-mono text-sm font-extrabold text-white tracking-tight">
            Mas <span className="text-[#e6ff00]">FLOPS</span> que cabras
          </span>
        </div>
      </div>
    </Slide>
  );
};

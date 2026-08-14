import React, { useState } from 'react';
import { Math } from '../Math';

export const VonNeumannVsHarvardDiagram: React.FC = () => {
  const [activeArch, setActiveArch] = useState<'both' | 'vonneumann' | 'harvard'>('both');

  return (
    <div className="p-4 rounded-xl bg-[#0f131d] border border-[#232a3d]">
      {/* Selector de Vistas */}
      <div className="flex justify-between items-center mb-3">
        <h4 className="m-0 text-white text-base font-bold">Comparativa Estructural: Von Neumann vs Harvard</h4>

        <div className="flex gap-1 bg-[#07080c] p-1 rounded-md border border-[#232a3d]">
          <button
            onClick={() => setActiveArch('both')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
              activeArch === 'both' ? 'bg-[#151a27] text-[#e6ff00] font-bold border border-[#e6ff00]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Vista Paralela
          </button>
          <button
            onClick={() => setActiveArch('vonneumann')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
              activeArch === 'vonneumann' ? 'bg-[#1e131d] text-[#fb7185] font-bold border border-[#fb7185]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Von Neumann
          </button>
          <button
            onClick={() => setActiveArch('harvard')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
              activeArch === 'harvard' ? 'bg-[#102030] text-[#38bdf8] font-bold border border-[#38bdf8]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Harvard
          </button>
        </div>
      </div>

      {/* Grid de 2 Columnas para las Arquitecturas */}
      <div className={`grid gap-4 items-stretch ${activeArch === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* ================= 1. VON NEUMANN ================= */}
        {(activeArch === 'both' || activeArch === 'vonneumann') && (
          <div className="bg-[#07080c] border border-[#fb7185]/30 rounded-xl p-4 text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="hpc-badge-rose text-[10px] font-mono mb-0">
                1945 • John von Neumann
              </span>
              <strong className="text-xs text-[#fb7185] font-mono">Bus Único Compartido</strong>
            </div>

            <h3 className="m-0 mb-1.5 text-base font-bold text-white">Arquitectura Von Neumann</h3>

            {/* Diagrama Visual Von Neumann */}
            <div className="bg-[#0b0e14] p-2.5 rounded-lg border border-[#232a3d] mb-2.5">
              <svg viewBox="0 0 340 70" className="w-full h-[65px]">
                {/* CPU Box */}
                <rect x="10" y="10" width="90" height="50" rx="5" fill="#151a27" stroke="#fb7185" strokeWidth="1.5" />
                <text x="55" y="32" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">CPU Core</text>
                <text x="55" y="47" fill="#94a3b8" fontSize="8" textAnchor="middle">ALU + Control</text>

                {/* Shared Bus */}
                <line x1="100" y1="35" x2="210" y2="35" stroke="#fb7185" strokeWidth="2.5" />
                <polygon points="208,31 216,35 208,39" fill="#fb7185" />
                <polygon points="102,31 94,35 102,39" fill="#fb7185" />
                <text x="155" y="27" fill="#fb7185" fontSize="8" fontWeight="bold" textAnchor="middle">Bus Compartido</text>
                <text x="155" y="49" fill="#94a3b8" fontSize="7.5" textAnchor="middle">(Datos e Inst.)</text>

                {/* Unified Memory Box */}
                <rect x="215" y="10" width="115" height="50" rx="5" fill="#151a27" stroke="#334155" strokeWidth="1.5" />
                <text x="272" y="30" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">Memoria Única</text>
                <text x="272" y="44" fill="#38bdf8" fontSize="7.5" textAnchor="middle">Instrucciones</text>
                <text x="272" y="54" fill="#e6ff00" fontSize="7.5" textAnchor="middle">+ Datos (Variables)</text>
              </svg>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed m-0 mb-2">
              <strong className="text-white">Principio:</strong> Código y datos residen en el mismo espacio de memoria y viajan por el mismo bus físico.
            </p>

            <div className="bg-[#121722] p-2 rounded border-l-2 border-l-[#fb7185] text-xs text-slate-300">
              <strong className="text-[#fb7185]">[CUELLO DE BOTELLA]</strong> En un ciclo <Math math="t" />, la CPU solo puede leer una instrucción O acceder a un dato, forzando esperas en arquitecturas segmentadas.
            </div>
          </div>
        )}

        {/* ================= 2. HARVARD ================= */}
        {(activeArch === 'both' || activeArch === 'harvard') && (
          <div className="bg-[#07080c] border border-[#38bdf8]/30 rounded-xl p-4 text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="hpc-badge-cyan text-[10px] font-mono mb-0">
                1944 • Harvard Mark I
              </span>
              <strong className="text-xs text-[#38bdf8] font-mono">Buses y Memorias Separadas</strong>
            </div>

            <h3 className="m-0 mb-1.5 text-base font-bold text-white">Arquitectura Harvard</h3>

            {/* Diagrama Visual Harvard */}
            <div className="bg-[#0b0e14] p-2.5 rounded-lg border border-[#232a3d] mb-2.5">
              <svg viewBox="0 0 340 70" className="w-full h-[65px]">
                {/* CPU Box */}
                <rect x="10" y="10" width="90" height="50" rx="5" fill="#151a27" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="55" y="32" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">CPU Core</text>
                <text x="55" y="47" fill="#94a3b8" fontSize="8" textAnchor="middle">Fetch + Exec</text>

                {/* Instruction Bus & Memory (Top) */}
                <line x1="100" y1="23" x2="215" y2="23" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="213,20 220,23 213,26" fill="#38bdf8" />
                <polygon points="102,20 95,23 102,26" fill="#38bdf8" />
                <text x="157" y="18" fill="#38bdf8" fontSize="7.5" fontWeight="bold" textAnchor="middle">Bus Instrucción</text>

                <rect x="220" y="8" width="110" height="24" rx="4" fill="#151a27" stroke="#38bdf8" strokeWidth="1.2" />
                <text x="275" y="24" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">Memoria Instrucciones</text>

                {/* Data Bus & Memory (Bottom) */}
                <line x1="100" y1="48" x2="215" y2="48" stroke="#e6ff00" strokeWidth="2" />
                <polygon points="213,45 220,48 213,51" fill="#e6ff00" />
                <polygon points="102,45 95,48 102,51" fill="#e6ff00" />
                <text x="157" y="60" fill="#e6ff00" fontSize="7.5" fontWeight="bold" textAnchor="middle">Bus Datos</text>

                <rect x="220" y="38" width="110" height="24" rx="4" fill="#151a27" stroke="#e6ff00" strokeWidth="1.2" />
                <text x="275" y="54" fill="#e6ff00" fontSize="8" fontWeight="bold" textAnchor="middle">Memoria Datos</text>
              </svg>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed m-0 mb-2">
              <strong className="text-white">Principio:</strong> Existen dos memorias y dos buses independientes para instrucciones y datos con anchos de palabra propios.
            </p>

            <div className="bg-[#121722] p-2 rounded border-l-2 border-l-[#38bdf8] text-xs text-slate-300">
              <strong className="text-[#38bdf8]">[ACCESO SIMULTÁNEO]</strong> La CPU puede leer una nueva instrucción (Fetch) y leer/escribir un operando (Memory) en el mismo ciclo de reloj sin contención.
            </div>
          </div>
        )}

      </div>

      {/* Síntesis Moderna en la Base */}
      <div className="mt-3 bg-[#07080c] p-2.5 rounded-lg border border-[#232a3d] text-center text-xs text-slate-300 flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded bg-[#151a27] text-[#e6ff00] font-mono text-[10px] font-bold border border-[#e6ff00]/40">HARVARD MODIFICADA</span>
        <span>Las CPUs modernas aplican <strong className="text-white">Harvard en el nivel L1</strong> (L1 I-Cache y L1 D-Cache separadas) y <strong className="text-white">Von Neumann en niveles superiores</strong> (L2, L3 y RAM unificadas).</span>
      </div>
    </div>
  );
};

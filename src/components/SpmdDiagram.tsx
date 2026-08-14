import React from 'react';

export const SpmdDiagram: React.FC = () => {
  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
      <div className="text-xs font-mono text-slate-400 mb-3 font-semibold flex items-center justify-between">
        <span>Mismo Código Binario &rarr; Hilos con Contadores de Programa (PC) Autónomos</span>
        <span className="hpc-badge font-mono text-[10px]">4 Hilos / Ranks</span>
      </div>

      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-center">
        <svg viewBox="0 0 680 220" className="w-full h-[220px]">
          {/* Shared Code Box (Left) */}
          <g>
            <rect x="15" y="10" width="180" height="200" rx="8" fill="#1e293b" stroke="rgba(255,255,255,0.25)" />
            <text x="105" y="34" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Código Fuente</text>
            <text x="105" y="52" fill="#94a3b8" fontSize="10.5" textAnchor="middle">(Binario Único Compartido)</text>
            
            <line x1="25" y1="64" x2="185" y2="64" stroke="rgba(255,255,255,0.15)" />
            
            <text x="30" y="88" fill="#cbd5e1" fontSize="11" fontFamily="monospace">int id = get_id();</text>
            <text x="30" y="112" fill="#cbd5e1" fontSize="11" fontFamily="monospace">int start = id * N;</text>
            <text x="30" y="136" fill="#cbd5e1" fontSize="11" fontFamily="monospace">for(...) compute();</text>
            <text x="30" y="160" fill="#cbd5e1" fontSize="11" fontFamily="monospace">MPI_Send(...);</text>
            <text x="30" y="184" fill="#cbd5e1" fontSize="11" fontFamily="monospace">MPI_Reduce(...);</text>
          </g>

          {/* Autonomous Threads & Data Partitions (Right) */}
          {[
            { id: 0, range: '[0 ... N/4 - 1]', pc: 'PC = 0x4012' },
            { id: 1, range: '[N/4 ... N/2 - 1]', pc: 'PC = 0x4080' },
            { id: 2, range: '[N/2 ... 3N/4 - 1]', pc: 'PC = 0x4024' },
            { id: 3, range: '[3N/4 ... N - 1]', pc: 'PC = 0x4098' }
          ].map((t, i) => (
            <g key={t.id}>
              {/* Curve Arrow from Code to Thread */}
              <path
                d={`M 195 110 Q 235 ${32 + i * 48}, 265 ${32 + i * 48}`}
                stroke="#64748b"
                strokeWidth="1.8"
                fill="none"
              />

              {/* Thread Box */}
              <rect x="265" y={12 + i * 48} width="165" height="40" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.25)" />
              <text x="280" y={29 + i * 48} fill="#ffffff" fontSize="11" fontWeight="bold">Hilo / Rank {t.id}</text>
              <text x="280" y={44 + i * 48} fill="#94a3b8" fontSize="10" fontFamily="monospace">{t.pc}</text>

              {/* Connector line between thread and partition */}
              <line x1="430" y1={32 + i * 48} x2="465" y2={32 + i * 48} stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 2" />

              {/* Data Partition Box */}
              <rect x="465" y={12 + i * 48} width="195" height="40" rx="6" fill="#0b0f19" stroke="rgba(255,255,255,0.2)" />
              <text x="562" y={28 + i * 48} fill="#94a3b8" fontSize="9.5" textAnchor="middle">Partición de Datos</text>
              <text x="562" y={43 + i * 48} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">{t.range}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

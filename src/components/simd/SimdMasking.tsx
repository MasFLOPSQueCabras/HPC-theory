import React from 'react';

export const SimdMasking: React.FC = () => {
  return (
    <div className="hpc-card p-5 w-full max-w-6xl mx-auto bg-[#0f131d] border border-[#232a3d]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* SVG Diagram */}
        <div className="md:col-span-7 bg-[#07080c] p-4 rounded-xl border border-[#232a3d]">
          <div className="text-xs text-slate-400 mb-2 font-mono">
            Predicación sin Saltos: La Máscara k1 Enciende o Apaga Carriles
          </div>

          <svg viewBox="0 0 380 175" className="w-full h-[175px]">
            {/* Input Vector */}
            <text x="10" y="28" fill="#94a3b8" fontSize="10" fontWeight="bold">Vector In:</text>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="14" width="62" height="24" rx="4" fill="#151a27" stroke="#232a3d" />
                <text x={106 + i * 70} y="30" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">X[{i}]</text>
              </g>
            ))}

            {/* Mask Vector k1 */}
            <text x="10" y="75" fill="#ffffff" fontSize="10" fontWeight="bold">Máscara k1:</text>
            {[
              { val: '1 (Activo)', bg: '#10241e', border: '#34d399', text: '#34d399' },
              { val: '0 (Mute)', bg: '#151a27', border: '#232a3d', text: '#64748b' },
              { val: '1 (Activo)', bg: '#10241e', border: '#34d399', text: '#34d399' },
              { val: '0 (Mute)', bg: '#151a27', border: '#232a3d', text: '#64748b' }
            ].map((m, i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="60" width="62" height="24" rx="4" fill={m.bg} stroke={m.border} />
                <text x={106 + i * 70} y="76" fill={m.text} fontSize="9" fontWeight="bold" textAnchor="middle">{m.val}</text>
              </g>
            ))}

            {/* Arrows */}
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1={106 + i * 70} y1="88" x2={106 + i * 70} y2="116" stroke={i % 2 === 0 ? '#34d399' : '#475569'} strokeWidth="1.5" strokeDasharray={i % 2 === 0 ? 'none' : '2 2'} />
            ))}

            {/* Output Vector */}
            <text x="10" y="138" fill="#ffffff" fontSize="10" fontWeight="bold">Resultado:</text>
            {[
              { val: 'X[0] + 10' },
              { val: '0 / Previo' },
              { val: 'X[2] + 10' },
              { val: '0 / Previo' }
            ].map((res, i) => (
              <g key={i}>
                <rect x={75 + i * 70} y="122" width="62" height="26" rx="4" fill={i % 2 === 0 ? '#10241e' : '#07080c'} stroke={i % 2 === 0 ? '#34d399' : '#232a3d'} />
                <text x={106 + i * 70} y="139" fill={i % 2 === 0 ? '#34d399' : '#64748b'} fontSize="9" fontWeight="bold" textAnchor="middle">{res.val}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Right Info Box */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="hpc-card p-4 border-t-2 border-t-[#34d399]">
            <span className="hpc-badge-emerald text-xs font-mono mb-1.5">Control de Flujo</span>
            <h4 className="m-0 text-base font-bold text-white mb-1.5">Predicación sin Saltos</h4>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Los registros de máscara (<code className="text-white font-mono">k1-k7</code> en AVX-512) activan o desactivan carriles específicos. Permite vectorizar bucles con <code className="text-white">if / else</code> sin incurrir en fallos de predicción de saltos.
            </p>
          </div>

          <div className="hpc-card p-4 border-t-2 border-t-[#e6ff00]">
            <span className="hpc-badge-yellow text-xs font-mono mb-1.5">Instrucción Clave</span>
            <code className="block my-1.5 text-xs text-slate-200 bg-[#07080c] p-1.5 rounded border border-[#232a3d] font-mono">
              vaddps %zmm0, %zmm1, %zmm2 {"{k1}"}
            </code>
            <p className="m-0 text-xs text-slate-300 leading-relaxed">
              Solo los carriles donde <code className="text-white font-mono">k1[i] == 1</code> aplican la suma; el resto retiene su estado anterior o se pone a cero.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

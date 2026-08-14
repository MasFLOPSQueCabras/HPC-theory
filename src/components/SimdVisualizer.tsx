import React, { useState } from 'react';

export const SimdVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'elementwise' | 'masking' | 'gatherscatter' | 'reduction' | 'shuffle'>('elementwise');

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* Tab Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1.05rem' }}>Visualizador Interactivo de Operaciones SIMD</h4>
        
        <div style={{ display: 'flex', gap: '0.3rem', background: '#070a12', padding: '0.2rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {[
            { id: 'elementwise', label: '1. Elementwise / FMA' },
            { id: 'masking', label: '2. Predicación (Masks)' },
            { id: 'gatherscatter', label: '3. Gather / Scatter' },
            { id: 'reduction', label: '4. Reducción' },
            { id: 'shuffle', label: '5. Permute / Shuffle' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '5px',
                border: 'none',
                background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : '#94a3b8',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '0.74rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.2rem', alignItems: 'center' }}>
        
        {/* SVG Diagram Canvas */}
        <div style={{ background: '#070a12', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)', minHeight: '190px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* TAB 1: Elementwise / FMA */}
          {activeTab === 'elementwise' && (
            <svg viewBox="0 0 360 170" style={{ width: '100%', height: '170px' }}>
              {/* Register A */}
              <text x="10" y="30" fill="#94a3b8" fontSize="10" fontWeight="bold">Vector A:</text>
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <rect x={70 + i * 65} y="15" width="55" height="24" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
                  <text x={97 + i * 65} y="31" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">A[{i}]</text>
                </g>
              ))}

              {/* Operator */}
              <text x="35" y="68" fill="#cbd5e1" fontSize="11" fontWeight="bold">&times; / +</text>

              {/* Register B */}
              <text x="10" y="85" fill="#94a3b8" fontSize="10" fontWeight="bold">Vector B:</text>
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <rect x={70 + i * 65} y="70" width="55" height="24" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
                  <text x={97 + i * 65} y="86" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">B[{i}]</text>
                </g>
              ))}

              {/* Arrows */}
              <defs>
                <marker id="arrowSimd" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
                  <polygon points="0 0, 5 2.5, 0 5" fill="#94a3b8" />
                </marker>
              </defs>
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1={97 + i * 65} y1="98" x2={97 + i * 65} y2="120" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowSimd)" />
              ))}

              {/* Result Vector C */}
              <text x="10" y="142" fill="#ffffff" fontSize="10" fontWeight="bold">Vector C:</text>
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <rect x={70 + i * 65} y="126" width="55" height="26" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" />
                  <text x={97 + i * 65} y="143" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">A[{i}] &times; B[{i}]</text>
                </g>
              ))}
            </svg>
          )}

          {/* TAB 2: Masking / Predication */}
          {activeTab === 'masking' && (
            <svg viewBox="0 0 360 170" style={{ width: '100%', height: '170px' }}>
              {/* Input Vector */}
              <text x="10" y="28" fill="#94a3b8" fontSize="10" fontWeight="bold">Vector In:</text>
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <rect x={75 + i * 65} y="14" width="55" height="22" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
                  <text x={102 + i * 65} y="29" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">X[{i}]</text>
                </g>
              ))}

              {/* Mask Vector k1 */}
              <text x="10" y="75" fill="#ffffff" fontSize="10" fontWeight="bold">Máscara k1:</text>
              {[
                { val: '1 (Activo)', color: 'rgba(255,255,255,0.2)', border: 'rgba(255,255,255,0.4)', text: '#ffffff' },
                { val: '0 (Mute)', color: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.1)', text: '#64748b' },
                { val: '1 (Activo)', color: 'rgba(255,255,255,0.2)', border: 'rgba(255,255,255,0.4)', text: '#ffffff' },
                { val: '0 (Mute)', color: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.1)', text: '#64748b' }
              ].map((m, i) => (
                <g key={i}>
                  <rect x={75 + i * 65} y="60" width="55" height="22" rx="4" fill={m.color} stroke={m.border} />
                  <text x={102 + i * 65} y="75" fill={m.text} fontSize="9" fontWeight="bold" textAnchor="middle">{m.val}</text>
                </g>
              ))}

              {/* Arrows */}
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1={102 + i * 65} y1="86" x2={102 + i * 65} y2="114" stroke={i % 2 === 0 ? '#ffffff' : '#475569'} strokeWidth="1.5" strokeDasharray={i % 2 === 0 ? 'none' : '2 2'} />
              ))}

              {/* Output Vector */}
              <text x="10" y="138" fill="#ffffff" fontSize="10" fontWeight="bold">Resultado:</text>
              {[
                { val: 'X[0] + 10', state: 'Computado' },
                { val: '0 / Previo', state: 'Ignorado' },
                { val: 'X[2] + 10', state: 'Computado' },
                { val: '0 / Previo', state: 'Ignorado' }
              ].map((res, i) => (
                <g key={i}>
                  <rect x={75 + i * 65} y="122" width="55" height="24" rx="4" fill={i % 2 === 0 ? 'rgba(255,255,255,0.1)' : '#070a12'} stroke="rgba(255,255,255,0.2)" />
                  <text x={102 + i * 65} y="137" fill={i % 2 === 0 ? '#ffffff' : '#64748b'} fontSize="8.5" fontWeight="bold" textAnchor="middle">{res.val}</text>
                </g>
              ))}
            </svg>
          )}

          {/* TAB 3: Gather & Scatter */}
          {activeTab === 'gatherscatter' && (
            <svg viewBox="0 0 360 170" style={{ width: '100%', height: '170px' }}>
              {/* Scattered RAM */}
              <text x="10" y="25" fill="#94a3b8" fontSize="10" fontWeight="bold">RAM No Contigua:</text>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <g key={i}>
                  <rect x={20 + i * 40} y="35" width="35" height="20" rx="3" fill={[1, 3, 6, 7].includes(i) ? 'rgba(255,255,255,0.15)' : '#1e293b'} stroke="rgba(255,255,255,0.15)" />
                  <text x={37 + i * 40} y="49" fill={[1, 3, 6, 7].includes(i) ? '#ffffff' : '#64748b'} fontSize="9" textAnchor="middle">M[{i}]</text>
                </g>
              ))}

              {/* Gather Lines */}
              <path d="M 77 58 Q 85 85, 95 110" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
              <path d="M 157 58 Q 160 85, 160 110" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
              <path d="M 277 58 Q 250 85, 225 110" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
              <path d="M 317 58 Q 300 85, 290 110" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />

              {/* Vector Register Gathered */}
              <text x="10" y="130" fill="#ffffff" fontSize="10" fontWeight="bold">Vector ZMM:</text>
              {[
                { idx: 'M[1]' }, { idx: 'M[3]' }, { idx: 'M[6]' }, { idx: 'M[7]' }
              ].map((reg, i) => (
                <g key={i}>
                  <rect x={70 + i * 65} y="115" width="55" height="26" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" />
                  <text x={97 + i * 65} y="132" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">{reg.idx}</text>
                </g>
              ))}
            </svg>
          )}

          {/* TAB 4: Horizontal Reduction */}
          {activeTab === 'reduction' && (
            <svg viewBox="0 0 360 170" style={{ width: '100%', height: '170px' }}>
              {/* Input Vector */}
              <text x="10" y="25" fill="#94a3b8" fontSize="10" fontWeight="bold">Vector ZMM:</text>
              {[10, 20, 30, 40].map((val, i) => (
                <g key={i}>
                  <rect x={75 + i * 65} y="12" width="55" height="22" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
                  <text x={102 + i * 65} y="27" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">{val}</text>
                </g>
              ))}

              {/* Level 1 Tree Lines */}
              <line x1="102" y1="36" x2="135" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="167" y1="36" x2="135" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="232" y1="36" x2="265" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="297" y1="36" x2="265" y2="70" stroke="#94a3b8" strokeWidth="1.5" />

              {/* Level 1 Intermediates */}
              <rect x="110" y="70" width="50" height="22" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
              <text x="135" y="85" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">10 + 20 = 30</text>

              <rect x="240" y="70" width="50" height="22" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
              <text x="265" y="85" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">30 + 40 = 70</text>

              {/* Final Sum */}
              <line x1="135" y1="94" x2="200" y2="125" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="265" y1="94" x2="200" y2="125" stroke="#ffffff" strokeWidth="1.5" />

              <rect x="165" y="125" width="70" height="26" rx="4" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" />
              <text x="200" y="142" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">Suma = 100</text>
            </svg>
          )}

          {/* TAB 5: Permute / Shuffle */}
          {activeTab === 'shuffle' && (
            <svg viewBox="0 0 360 170" style={{ width: '100%', height: '170px' }}>
              {/* Input Vector */}
              <text x="10" y="25" fill="#94a3b8" fontSize="10" fontWeight="bold">Original:</text>
              {['A', 'B', 'C', 'D'].map((val, i) => (
                <g key={i}>
                  <rect x={75 + i * 65} y="12" width="55" height="22" rx="4" fill="#1e293b" stroke="rgba(255,255,255,0.2)" />
                  <text x={102 + i * 65} y="27" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Carril {i}: {val}</text>
                </g>
              ))}

              {/* Cross Lines */}
              <path d="M 102 36 Q 160 75, 297 115" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
              <path d="M 167 36 Q 130 75, 102 115" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
              <path d="M 232 36 Q 200 75, 167 115" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
              <path d="M 297 36 Q 260 75, 232 115" stroke="#94a3b8" strokeWidth="1.5" fill="none" />

              {/* Reordered Output Vector */}
              <text x="10" y="132" fill="#ffffff" fontSize="10" fontWeight="bold">Permutado:</text>
              {['B', 'C', 'D', 'A'].map((val, i) => (
                <g key={i}>
                  <rect x={75 + i * 65} y="118" width="55" height="24" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" />
                  <text x={102 + i * 65} y="134" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Carril {i}: {val}</text>
                </g>
              ))}
            </svg>
          )}

        </div>

        {/* Right Info Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {activeTab === 'elementwise' && (
            <>
              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>AVX-512 / NEON</span>
                <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Aritmética Elemento a Elemento</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  Aplica la misma operación matemática simultáneamente a todos los carriles independientes en 1 solo ciclo.
                </p>
              </div>
              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <strong style={{ color: '#ffffff', fontSize: '0.82rem' }}>Instrucción Clave:</strong>
                <code style={{ display: 'block', margin: '0.3rem 0', fontSize: '0.78rem', color: '#f8fafc' }}>vfmadd231ps %zmm0, %zmm1, %zmm2</code>
                <span style={{ fontSize: '0.73rem', color: '#9ca3af' }}>Multiplica y suma 16 floats en paralelo en un solo ciclo de reloj.</span>
              </div>
            </>
          )}

          {activeTab === 'masking' && (
            <>
              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Control de Flujo SIMD</span>
                <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Predicación sin Saltos Condicionales</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  Los registros de máscara (<code>k1-k7</code> en AVX-512) activan o desactivan carriles específicos. Permite vectorizar bucles con <code>if / else</code> sin incurrir en fallos de predicción de saltos.
                </p>
              </div>
              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <strong style={{ color: '#ffffff', fontSize: '0.82rem' }}>Instrucción Clave:</strong>
                <code style={{ display: 'block', margin: '0.3rem 0', fontSize: '0.78rem', color: '#f8fafc' }}>vaddps %zmm0, %zmm1, %zmm2 {"{k1}"}</code>
              </div>
            </>
          )}

          {activeTab === 'gatherscatter' && (
            <>
              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Memoria No Contigua</span>
                <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Gather (Lectura) / Scatter (Escritura)</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  Recolecta datos dispersos desde un vector de punteros directos hacia un registro contiguo (Gather) o los dispersa a memoria (Scatter). Esencial para matrices dispersas (SpMV) y grafos.
                </p>
              </div>
              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <strong style={{ color: '#ffffff', fontSize: '0.82rem' }}>Instrucción Clave:</strong>
                <code style={{ display: 'block', margin: '0.3rem 0', fontSize: '0.78rem', color: '#f8fafc' }}>vgatherdps (%rdi, %zmm_idx, 4), %zmm_out</code>
              </div>
            </>
          )}

          {activeTab === 'reduction' && (
            <>
              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Árbol Horizontal</span>
                <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Reducción Vectorial</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  Combina todos los carriles internos de un registro vectorial en un único escalar en tiempo O(log N) usando sumas horizontales por pares.
                </p>
              </div>
              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <strong style={{ color: '#ffffff', fontSize: '0.82rem' }}>Uso Común:</strong>
                <span style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>Cálculo de productos punto (Dot Products), normas vectoriales y mínimos/máximos globales.</span>
              </div>
            </>
          )}

          {activeTab === 'shuffle' && (
            <>
              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <span className="hpc-badge" style={{ fontSize: '0.7rem' }}>Reordenamiento en Silicio</span>
                <h4 style={{ margin: '0.3rem 0 0.2rem 0', color: '#ffffff', fontSize: '0.95rem' }}>Permute / Shuffles de Carriles</h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  Transpone o reordena datos entre carriles dentro del registro sin pasar por memoria caché ni RAM, con latencia de 1 ciclo.
                </p>
              </div>
              <div className="hpc-card" style={{ padding: '0.9rem' }}>
                <strong style={{ color: '#ffffff', fontSize: '0.82rem' }}>Instrucción Clave:</strong>
                <code style={{ display: 'block', margin: '0.3rem 0', fontSize: '0.78rem', color: '#f8fafc' }}>vpermd %zmm0, %zmm_ctrl, %zmm_out</code>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

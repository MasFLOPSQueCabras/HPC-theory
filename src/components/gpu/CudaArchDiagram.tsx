import React, { useState } from 'react';
import { Math } from '../Math';

export const CudaArchDiagram: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<'sm' | 'tensor' | 'memory'>('sm');

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.1rem 1.3rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.25)', width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      {/* Header & Subtitle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem', flexWrap: 'wrap', gap: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.6rem' }}>
        <div>
          <span className="hpc-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            NVIDIA GPU Architecture
          </span>
          <span style={{ marginLeft: '0.6rem', fontSize: '0.86rem', color: '#cbd5e1' }}>
            Jerarquía Hardware: Chip &rarr; GPC &rarr; TPC &rarr; <strong>Streaming Multiprocessor (SM)</strong>
          </span>
        </div>

        {/* View Switcher */}
        <div style={{ display: 'flex', gap: '0.35rem', background: '#070a12', padding: '0.25rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setSelectedUnit('sm')}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '5px',
              border: 'none',
              background: selectedUnit === 'sm' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: selectedUnit === 'sm' ? '#38bdf8' : '#94a3b8',
              fontWeight: selectedUnit === 'sm' ? 700 : 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            🏛️ 1. Anatomía del SM
          </button>
          <button
            onClick={() => setSelectedUnit('tensor')}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '5px',
              border: 'none',
              background: selectedUnit === 'tensor' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: selectedUnit === 'tensor' ? '#38bdf8' : '#94a3b8',
              fontWeight: selectedUnit === 'tensor' ? 700 : 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            ⚡ 2. CUDA Cores vs Tensor Cores
          </button>
          <button
            onClick={() => setSelectedUnit('memory')}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '5px',
              border: 'none',
              background: selectedUnit === 'memory' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: selectedUnit === 'memory' ? '#38bdf8' : '#94a3b8',
              fontWeight: selectedUnit === 'memory' ? 700 : 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            💾 3. Jerarquía de Memoria
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {selectedUnit === 'sm' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {/* Full-Width Panoramic SVG: SM Diagram */}
          <div style={{ background: '#070a12', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <svg viewBox="0 0 740 230" style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* Outer SM Box */}
              <rect x="5" y="5" width="730" height="220" rx="8" fill="#0b0f19" stroke="#38bdf8" strokeWidth="1.8" />

              {/* Top Shared Memory / L1 Cache */}
              <rect x="18" y="14" width="704" height="30" rx="5" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1.2" />
              <text x="370" y="33" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                L1 Data Cache / Shared Memory Unificada (128 KB - 256 KB SRAM Ultra-Rápida en Chip)
              </text>

              {/* 4 Spacious Sub-Cores */}
              {[0, 1, 2, 3].map((sub) => (
                <g key={sub}>
                  {/* Sub-core Outer Boundary */}
                  <rect x={18 + sub * 178} y="52" width="168" height="162" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  
                  {/* Header Sub-core */}
                  <rect x={24 + sub * 178} y="58" width="156" height="22" rx="4" fill="#070a12" stroke="#38bdf8" strokeWidth="1" />
                  <text x={102 + sub * 178} y="73" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                    Warp Scheduler {sub} + Dispatch
                  </text>

                  {/* Register File */}
                  <rect x={24 + sub * 178} y="85" width="156" height="22" rx="4" fill="rgba(244, 184, 96, 0.15)" stroke="#f4b860" strokeWidth="1" />
                  <text x={102 + sub * 178} y="99" fill="#f4b860" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Register File (16K Reg / 64 KB)
                  </text>

                  {/* Middle Compute Section: CUDA Cores + Tensor Cores with generous spacing */}
                  <rect x={24 + sub * 178} y="112" width="75" height="48" rx="4" fill="#070a12" stroke="rgba(52,211,153,0.4)" strokeWidth="1.2" />
                  <text x={61 + sub * 178} y="129" fill="#34d399" fontSize="9.5" fontWeight="bold" textAnchor="middle">32 FP32</text>
                  <text x={61 + sub * 178} y="142" fill="#ffffff" fontSize="8" textAnchor="middle">CUDA Cores</text>
                  <text x={61 + sub * 178} y="153" fill="#94a3b8" fontSize="7" textAnchor="middle">+ 16 INT32</text>

                  <rect x={105 + sub * 178} y="112" width="75" height="48" rx="4" fill="#070a12" stroke="rgba(248,113,113,0.4)" strokeWidth="1.2" />
                  <text x={142 + sub * 178} y="129" fill="#f87171" fontSize="9.5" fontWeight="bold" textAnchor="middle">1 Tensor</text>
                  <text x={142 + sub * 178} y="142" fill="#ffffff" fontSize="8" textAnchor="middle">Core (IA)</text>
                  <text x={142 + sub * 178} y="153" fill="#94a3b8" fontSize="7" textAnchor="middle">FP16 / FP8 / FP4</text>

                  {/* Bottom LD/ST and SFU Units */}
                  <rect x={24 + sub * 178} y="165" width="75" height="24" rx="3" fill="#070a12" stroke="rgba(255,255,255,0.12)" />
                  <text x={61 + sub * 178} y="180" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">8 LD / ST Units</text>

                  <rect x={105 + sub * 178} y="165" width="75" height="24" rx="3" fill="#070a12" stroke="rgba(255,255,255,0.12)" />
                  <text x={142 + sub * 178} y="180" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">4 SFU (Trascend.)</text>

                  {/* Sub-Core Label */}
                  <text x={102 + sub * 178} y="204" fill="#94a3b8" fontSize="8" textAnchor="middle">
                    Sub-Core {sub}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Bottom Info Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', textAlign: 'left' }}>
            <div className="hpc-card" style={{ padding: '0.85rem 1.1rem' }}>
              <strong style={{ fontSize: '0.86rem', color: '#38bdf8' }}>4 Warp Schedulers Independientes</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                En cada ciclo de reloj, cada uno de los 4 schedulers emite instrucciones para un Warp en ejecución lockstep sin coste de context-switch.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '0.85rem 1.1rem' }}>
              <strong style={{ fontSize: '0.86rem', color: '#f4b860' }}>64K Registros de 32 bits (256 KB por SM)</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Mantiene en silicio el estado completo de hasta <strong>2048 hilos concurrentes por SM</strong>, permitiendo ocultar la latencia de memoria global.
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedUnit === 'tensor' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', textAlign: 'left' }}>
          <div className="hpc-card" style={{ padding: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="hpc-badge" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}>CUDA Cores</span>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#ffffff' }}>Cálculo Escalar / Vectorial Clásico</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 0.8rem 0' }}>
              Unidades ALU individuales diseñadas para ejecutar 1 operación elemental por hilo y por ciclo:
            </p>
            <ul style={{ fontSize: '0.78rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <li><strong>FP32 / FP64 Cores:</strong> Aritmética estándar IEEE 754 de simple y doble precisión para simulaciones científicas de física, química y fluidos.</li>
              <li><strong>INT32 Cores:</strong> Direccionamiento de memoria, cálculo de índices de bucle y operaciones de bits en paralelo con FP32.</li>
              <li><strong>SFU (Special Function Units):</strong> Cálculo de funciones matemáticas complejas (<Math math="\sin, \cos, \sqrt{x}, 1/\sqrt{x}, \log_2" />) por interpolación hardware.</li>
            </ul>
          </div>

          <div className="hpc-card" style={{ padding: '1.2rem', borderLeft: '3px solid #38bdf8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="hpc-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>Tensor Cores</span>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#38bdf8' }}>Cálculo Matricial Masivo (IA y HPC)</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 0.8rem 0' }}>
              Unidades especializadas que ejecutan la operación matricial <Math math="D = A \times B + C" /> en un único ciclo de reloj:
            </p>
            <ul style={{ fontSize: '0.78rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <li><strong>Multi-Precisión Mixta:</strong> FP16, BF16, TF32, FP8 (E5M2/E4M3), FP4 (NVIDIA Blackwell NVFP4).</li>
              <li><strong>Transformer Engine:</strong> Escalado automático y selección dinámica de formatos Microscaling (MX).</li>
              <li><strong>Throughput:</strong> Hasta <strong>16x más FLOPs</strong> que los CUDA Cores tradicionales, base del entrenamiento de LLMs.</li>
            </ul>
          </div>
        </div>
      )}

      {selectedUnit === 'memory' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'left' }}>
          <div className="hpc-card" style={{ padding: '1.1rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem', color: '#38bdf8' }}>Nivel 1 (En el SM)</span>
            <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '0.98rem', color: '#ffffff' }}>Shared Memory / L1 Cache</h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Memoria SRAM programable (<code>__shared__</code>) compartida entre hilos del mismo bloque. Latencia: ~1.5 ns (20 ciclos). Ancho de banda agregado en el chip: <strong>&gt;15 TB/s</strong>.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '1.1rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem', color: '#f4b860' }}>Nivel 2 (En el Chip)</span>
            <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '0.98rem', color: '#ffffff' }}>Caché L2 Masiva</h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Caché global compartida por todos los SMs (ej. 50 MB en H100, 96 MB en RTX 4090). Conecta el crossbar interno con la memoria externa VRAM. Latencia: ~10-15 ns.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '1.1rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem', color: '#f87171' }}>Nivel 3 (Externo HBM)</span>
            <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '0.98rem', color: '#ffffff' }}>VRAM Global (HBM3e / GDDR)</h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Memoria masiva de la GPU (ej. 80-141 GB HBM3e en H100/H200, 192-288 GB en Blackwell B200). Latencia: ~100-200 ns. Ancho de banda: hasta <strong>8 TB/s</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <div style={{ marginTop: '0.9rem', background: '#070a12', padding: '0.55rem 1rem', borderRadius: '6px', fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center' }}>
        🏛️ <strong>Regla de Ocupación CUDA:</strong> Maximizar la ocupación del SM (Warps activos vs Warps máximos) para ocultar las latencias de lectura a memoria global.
      </div>
    </div>
  );
};

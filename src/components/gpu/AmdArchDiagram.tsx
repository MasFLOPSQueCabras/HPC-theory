import React, { useState } from 'react';

export const AmdArchDiagram: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<'cu' | 'matrix' | 'memory'>('cu');

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.1rem 1.3rem', borderRadius: '12px', border: '1px solid rgba(248, 113, 113, 0.25)', width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      {/* Header & Subtitle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem', flexWrap: 'wrap', gap: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.6rem' }}>
        <div>
          <span className="hpc-badge" style={{ background: 'rgba(248, 113, 113, 0.15)', color: '#f87171', border: '1px solid rgba(248, 113, 113, 0.3)' }}>
            AMD CDNA / RDNA Architecture
          </span>
          <span style={{ marginLeft: '0.6rem', fontSize: '0.86rem', color: '#cbd5e1' }}>
            Jerarquía Hardware: XCD &rarr; WGP &rarr; <strong>Compute Unit (CU)</strong> &rarr; SIMD Units
          </span>
        </div>

        {/* View Switcher */}
        <div style={{ display: 'flex', gap: '0.35rem', background: '#070a12', padding: '0.25rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setSelectedUnit('cu')}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '5px',
              border: 'none',
              background: selectedUnit === 'cu' ? 'rgba(248, 113, 113, 0.2)' : 'transparent',
              color: selectedUnit === 'cu' ? '#f87171' : '#94a3b8',
              fontWeight: selectedUnit === 'cu' ? 700 : 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            🏛️ 1. Anatomía del CU
          </button>
          <button
            onClick={() => setSelectedUnit('matrix')}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '5px',
              border: 'none',
              background: selectedUnit === 'matrix' ? 'rgba(248, 113, 113, 0.2)' : 'transparent',
              color: selectedUnit === 'matrix' ? '#f87171' : '#94a3b8',
              fontWeight: selectedUnit === 'matrix' ? 700 : 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            ⚡ 2. Matrix Cores &amp; VGPR/SGPR
          </button>
          <button
            onClick={() => setSelectedUnit('memory')}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '5px',
              border: 'none',
              background: selectedUnit === 'memory' ? 'rgba(248, 113, 113, 0.2)' : 'transparent',
              color: selectedUnit === 'memory' ? '#f87171' : '#94a3b8',
              fontWeight: selectedUnit === 'memory' ? 700 : 500,
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            💾 3. LDS &amp; Infinity Cache
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {selectedUnit === 'cu' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {/* Full-Width Panoramic SVG: CU Diagram */}
          <div style={{ background: '#070a12', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <svg viewBox="0 0 740 230" style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* Outer CU Box */}
              <rect x="5" y="5" width="730" height="220" rx="8" fill="#0b0f19" stroke="#f87171" strokeWidth="1.8" />

              {/* Top LDS (Local Data Share) */}
              <rect x="18" y="14" width="704" height="30" rx="5" fill="rgba(248, 113, 113, 0.15)" stroke="#f87171" strokeWidth="1.2" />
              <text x="370" y="33" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
                LDS (Local Data Share: 64 KB - 128 KB SRAM Ultra-Rápida compartida en el CU)
              </text>

              {/* 4 Spacious SIMD Units */}
              {[0, 1, 2, 3].map((simd) => (
                <g key={simd}>
                  {/* SIMD Unit Outer Boundary */}
                  <rect x={18 + simd * 178} y="52" width="168" height="162" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  
                  {/* Header Wavefront Scheduler */}
                  <rect x={24 + simd * 178} y="58" width="156" height="22" rx="4" fill="#070a12" stroke="#f87171" strokeWidth="1" />
                  <text x={102 + simd * 178} y="73" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Wave Scheduler (Wave32/64)
                  </text>

                  {/* Dual Registers: VGPR + SGPR */}
                  <rect x={24 + simd * 178} y="85" width="156" height="22" rx="4" fill="rgba(244, 184, 96, 0.15)" stroke="#f4b860" strokeWidth="1" />
                  <text x={102 + simd * 178} y="99" fill="#f4b860" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Dual RF: VGPR (Vec) + SGPR (Scalar)
                  </text>

                  {/* Middle Compute Section: VALU Vector + Matrix Cores */}
                  <rect x={24 + simd * 178} y="112" width="75" height="48" rx="4" fill="#070a12" stroke="rgba(52,211,153,0.4)" strokeWidth="1.2" />
                  <text x={61 + simd * 178} y="129" fill="#34d399" fontSize="9.5" fontWeight="bold" textAnchor="middle">16-32 VALU</text>
                  <text x={61 + simd * 178} y="142" fill="#ffffff" fontSize="8" textAnchor="middle">Vector Cores</text>
                  <text x={61 + simd * 178} y="153" fill="#94a3b8" fontSize="7" textAnchor="middle">FP32 / FP64</text>

                  <rect x={105 + simd * 178} y="112" width="75" height="48" rx="4" fill="#070a12" stroke="rgba(56,189,248,0.4)" strokeWidth="1.2" />
                  <text x={142 + simd * 178} y="129" fill="#38bdf8" fontSize="9.5" fontWeight="bold" textAnchor="middle">1 Matrix</text>
                  <text x={142 + simd * 178} y="142" fill="#ffffff" fontSize="8" textAnchor="middle">Core (MFMA)</text>
                  <text x={142 + simd * 178} y="153" fill="#94a3b8" fontSize="7" textAnchor="middle">BF16 / FP8 / MXFP4</text>

                  {/* Bottom SALU & L1 Cache */}
                  <rect x={24 + simd * 178} y="165" width="75" height="24" rx="3" fill="#070a12" stroke="rgba(255,255,255,0.12)" />
                  <text x={61 + simd * 178} y="180" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">SALU (Scalar ALU)</text>

                  <rect x={105 + simd * 178} y="165" width="75" height="24" rx="3" fill="#070a12" stroke="rgba(255,255,255,0.12)" />
                  <text x={142 + simd * 178} y="180" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">L1 Vector Cache</text>

                  {/* Unit Label */}
                  <text x={102 + simd * 178} y="204" fill="#94a3b8" fontSize="8" textAnchor="middle">
                    SIMD Unit {simd}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Bottom Info Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', textAlign: 'left' }}>
            <div className="hpc-card" style={{ padding: '0.85rem 1.1rem' }}>
              <strong style={{ fontSize: '0.86rem', color: '#f87171' }}>4 Unidades SIMD por Compute Unit</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                Cada CU ejecuta Wavefronts de 32 o 64 hilos, con planificación dinámica para mantener saturadas las unidades vectoriales y matriciales.
              </p>
            </div>

            <div className="hpc-card" style={{ padding: '0.85rem 1.1rem' }}>
              <strong style={{ fontSize: '0.86rem', color: '#38bdf8' }}>Agrupamiento WGP (Workgroup Processor)</strong>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                2 CUs comparten cachés de instrucciones L1 y datos vectoriales para optimizar el ancho de banda en kernels de cómputo intensivo.
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedUnit === 'matrix' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', textAlign: 'left' }}>
          <div className="hpc-card" style={{ padding: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="hpc-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>Matrix Cores</span>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#ffffff' }}>Aceleración Matricial en AMD CDNA</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 0.8rem 0' }}>
              Unidades matriciales de hardware para instrucciones MFMA (<em>Matrix Fused Multiply-Add</em>):
            </p>
            <ul style={{ fontSize: '0.78rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <li><strong>Rendimiento FP64 Nativo:</strong> En AMD Instinct MI300X, la tasa de FP64 pura es líder en la industria para supercomputadores científicos (ej. Frontier y El Capitan).</li>
              <li><strong>Soporte de Precisión IA:</strong> FP32, FP16, BF16, INT8, FP8 (E5M2/E4M3) y formatos Microscaling MXFP4 en la serie MI350.</li>
            </ul>
          </div>

          <div className="hpc-card" style={{ padding: '1.2rem', borderLeft: '3px solid #f4b860' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="hpc-badge" style={{ background: 'rgba(244, 184, 96, 0.15)', color: '#f4b860' }}>Innovación AMD</span>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#f4b860' }}>VGPR (Vector) vs SGPR (Scalar)</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 0.8rem 0' }}>
              Arquitectura de banco de registros dividida única en AMD:
            </p>
            <ul style={{ fontSize: '0.78rem', paddingLeft: '1.1rem', margin: 0, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <li><strong>VGPR (Vector GPR):</strong> Registros dedicados individualmente por cada hilo del wavefront para datos divergentes.</li>
              <li><strong>SGPR (Scalar GPR):</strong> Registros <strong>compartidos por todo el Wavefront</strong> para valores uniformes (constantes, punteros base, contadores).</li>
              <li><strong>Beneficio Crítico:</strong> Ahorra hasta un <strong>30% de área en silicio</strong> y reduce la presión sobre el banco de registros vectoriales.</li>
            </ul>
          </div>
        </div>
      )}

      {selectedUnit === 'memory' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'left' }}>
          <div className="hpc-card" style={{ padding: '1.1rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem', color: '#f87171' }}>Nivel 1 (En el CU)</span>
            <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '0.98rem', color: '#ffffff' }}>LDS (Local Data Share)</h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Equivalente directo a la <em>Shared Memory</em> de CUDA. SRAM de 64 KB - 128 KB por CU para comunicación directa entre hilos del mismo Work-group. Latencia: ~2 ns.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '1.1rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem', color: '#f4b860' }}>Nivel 2 (En el Die / XCD)</span>
            <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '0.98rem', color: '#ffffff' }}>Infinity Cache / L2 Cache</h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              Caché global masiva (hasta 256 MB Infinity Cache en chiplets CDNA 3) interconectada mediante <strong>Infinity Fabric</strong> bidireccional de bajísima latencia.
            </p>
          </div>

          <div className="hpc-card" style={{ padding: '1.1rem' }}>
            <span className="hpc-badge" style={{ fontSize: '0.7rem', color: '#38bdf8' }}>Nivel 3 (Externo HBM)</span>
            <h4 style={{ margin: '0.4rem 0 0.3rem 0', fontSize: '0.98rem', color: '#ffffff' }}>VRAM Global (HBM3 / HBM3e)</h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
              <strong>192 GB HBM3 a 5.3 TB/s</strong> en el acelerador AMD Instinct MI300X y 288 GB en MI350X, superando la densidad de memoria tradicional por GPU.
            </p>
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <div style={{ marginTop: '0.9rem', background: '#070a12', padding: '0.55rem 1rem', borderRadius: '6px', fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center' }}>
        🏛️ <strong>Ecosistema ROCm / HIP:</strong> Permite compilar código fuente CUDA en GPUs AMD con cambios mínimos mediante la herramienta de conversión automática <code>hipify</code>.
      </div>
    </div>
  );
};

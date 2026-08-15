import React, { useEffect, useState } from 'react';

interface MobileNavigationProps {
  reveal: any;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ reveal }) => {
  const [slideText, setSlideText] = useState<string>('1 / 91');

  useEffect(() => {
    if (!reveal) return;

    const updateState = () => {
      try {
        let current = 1;
        let total = 91;

        if (typeof reveal.getSlidePastCount === 'function') {
          const past = reveal.getSlidePastCount();
          if (typeof past === 'number') {
            current = past + 1;
          }
        } else if (typeof reveal.getIndices === 'function') {
          const indices = reveal.getIndices();
          if (indices && typeof indices.h === 'number') {
            current = indices.h + 1;
          }
        }

        if (typeof reveal.getTotalSlides === 'function') {
          const tot = reveal.getTotalSlides();
          if (typeof tot === 'number' && tot > 0) {
            total = tot;
          }
        }

        setSlideText(`${current} / ${total}`);
      } catch (err) {
        console.error('Error updating reveal mobile state:', err);
      }
    };

    updateState();

    if (typeof reveal.on === 'function') {
      reveal.on('ready', updateState);
      reveal.on('slidechanged', updateState);
      reveal.on('fragmentshown', updateState);
      reveal.on('fragmenthidden', updateState);
      reveal.on('slidetransitionend', updateState);
    }

    // Periodic safety check to ensure slide number is always synced
    const interval = setInterval(updateState, 300);

    return () => {
      clearInterval(interval);
      if (typeof reveal.off === 'function') {
        reveal.off('ready', updateState);
        reveal.off('slidechanged', updateState);
        reveal.off('fragmentshown', updateState);
        reveal.off('fragmenthidden', updateState);
        reveal.off('slidetransitionend', updateState);
      }
    };
  }, [reveal]);

  if (!reveal) return null;

  return (
    <div className="mobile-nav-bar fixed bottom-3 left-0 right-0 z-[99999] px-4 pointer-events-none hidden portrait:flex justify-center">
      <div className="pointer-events-auto flex items-center justify-between gap-3 bg-[#0d1017]/95 border border-[#232a3d] backdrop-blur-md px-4 py-2 rounded-xl shadow-2xl max-w-sm w-full">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => {
            if (typeof reveal.prev === 'function') {
              reveal.prev();
            }
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#151a27] border border-[#232a3d] text-slate-200 hover:text-white hover:border-[#e6ff00]/40 text-xs font-mono font-bold transition-all active:scale-95 touch-manipulation cursor-pointer"
          aria-label="Diapositiva anterior"
        >
          <span>&larr;</span>
          <span>Ant</span>
        </button>

        {/* Slide Counter Badge */}
        <div className="flex items-center justify-center font-mono">
          <span className="text-[#e6ff00] font-bold px-3 py-1 rounded-md bg-[#07080c] border border-[#232a3d] text-xs font-mono tracking-wider shadow-inner select-none">
            {slideText}
          </span>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => {
            if (typeof reveal.next === 'function') {
              reveal.next();
            }
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#151a27] border border-[#e6ff00]/40 text-[#e6ff00] hover:bg-[#1a2233] text-xs font-mono font-bold transition-all active:scale-95 touch-manipulation cursor-pointer"
          aria-label="Siguiente diapositiva"
        >
          <span>Sig</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
};

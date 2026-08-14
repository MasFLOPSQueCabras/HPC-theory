import React, { useEffect, useState, useRef } from 'react';

interface MobileNavigationProps {
  reveal: any;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ reveal }) => {
  const [slideInfo, setSlideInfo] = useState({ current: 1, total: 1 });
  const [routes, setRoutes] = useState({ left: false, right: false, up: false, down: false });
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    if (!reveal) return;

    const updateState = () => {
      try {
        const pastCount = typeof reveal.getSlidePastCount === 'function' ? reveal.getSlidePastCount() : 0;
        const total = typeof reveal.getTotalSlides === 'function' ? reveal.getTotalSlides() : 1;
        const available = typeof reveal.availableRoutes === 'function' ? reveal.availableRoutes() : {};

        setSlideInfo({
          current: pastCount + 1,
          total: total || 1,
        });

        setRoutes({
          left: !!available.left,
          right: !!available.right,
          up: !!available.up,
          down: !!available.down,
        });
      } catch (err) {
        console.error('Error updating reveal state:', err);
      }
    };

    updateState();
    if (typeof reveal.on === 'function') {
      reveal.on('slidechanged', updateState);
    }

    // Global Mobile Swipe Handler for seamless portrait & landscape navigation
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: Date.now(),
        };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || e.changedTouches.length !== 1) return;

      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Require minimum swipe distance (30px) and fast enough gesture (< 650ms)
      if (deltaTime < 650 && (absX > 30 || absY > 30)) {
        if (absX > absY) {
          // Horizontal Swipe
          if (deltaX < -30) {
            // Swipe Left -> Next slide
            reveal.next();
          } else if (deltaX > 30) {
            // Swipe Right -> Prev slide
            reveal.prev();
          }
        } else {
          // Vertical Swipe
          if (deltaY < -30) {
            // Swipe Up -> Down in stack or next
            const available = typeof reveal.availableRoutes === 'function' ? reveal.availableRoutes() : {};
            if (available.down) {
              reveal.down();
            } else {
              reveal.next();
            }
          } else if (deltaY > 30) {
            // Swipe Down -> Up in stack or prev
            const available = typeof reveal.availableRoutes === 'function' ? reveal.availableRoutes() : {};
            if (available.up) {
              reveal.up();
            } else {
              reveal.prev();
            }
          }
        }
      }

      touchStartRef.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      if (typeof reveal.off === 'function') {
        reveal.off('slidechanged', updateState);
      }
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [reveal]);

  if (!reveal) return null;

  return (
    <div className="mobile-nav-bar fixed bottom-3 left-0 right-0 z-[99999] px-4 pointer-events-none flex justify-center md:hidden">
      <div className="pointer-events-auto flex items-center justify-between gap-2.5 bg-[#0d1017]/95 border border-[#232a3d] backdrop-blur-md px-3.5 py-2 rounded-xl shadow-2xl max-w-sm w-full">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => reveal.prev()}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#151a27] border border-[#232a3d] text-slate-200 hover:text-white hover:border-[#e6ff00]/40 text-xs font-mono font-bold transition-all active:scale-95 touch-manipulation"
          aria-label="Diapositiva anterior"
        >
          <span>&larr;</span>
          <span>Ant</span>
        </button>

        {/* 2D Direction Pad for vertical stacks */}
        <div className="flex items-center gap-1 font-mono text-xs">
          {routes.up && (
            <button
              type="button"
              onClick={() => reveal.up()}
              className="p-1.5 rounded bg-[#151a27] text-[#e6ff00] border border-[#e6ff00]/30 active:scale-90 touch-manipulation"
              title="Sub-diapositiva arriba"
            >
              &uarr;
            </button>
          )}

          <span className="text-slate-300 font-bold px-2 py-0.5 rounded bg-[#07080c] border border-[#232a3d] text-[11px]">
            {slideInfo.current} / {slideInfo.total}
          </span>

          {routes.down && (
            <button
              type="button"
              onClick={() => reveal.down()}
              className="p-1.5 rounded bg-[#151a27] text-[#e6ff00] border border-[#e6ff00]/30 active:scale-90 touch-manipulation animate-pulse"
              title="Sub-diapositiva abajo"
            >
              &darr;
            </button>
          )}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => reveal.next()}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#151a27] border border-[#e6ff00]/40 text-[#e6ff00] hover:bg-[#1a2233] text-xs font-mono font-bold transition-all active:scale-95 touch-manipulation"
          aria-label="Siguiente diapositiva"
        >
          <span>Sig</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
};

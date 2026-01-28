import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode, useState, useCallback, useRef, useEffect } from "react";
import { triggerHaptic } from "../../utils/haptic";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  isRefreshing?: boolean;
}

export default function PullToRefresh({
  children,
  onRefresh,
  isRefreshing = false,
}: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const y = useMotionValue(0);
  const pullProgress = useTransform(y, [0, 80], [0, 1]);
  const rotate = useTransform(y, [0, 80], [0, 360]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const container = containerRef.current;
    // Only start pull if at top of scroll
    if (container && container.scrollTop <= 0) {
      startY.current = e.touches[0].clientY;
    } else {
      startY.current = 0;
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (startY.current === 0 || isRefreshing) return;

      const container = containerRef.current;
      if (!container || container.scrollTop > 0) {
        y.set(0);
        return;
      }

      currentY.current = e.touches[0].clientY;
      const diff = currentY.current - startY.current;

      if (diff > 0) {
        // Pulling down - prevent default scroll and show pull indicator
        e.preventDefault();
        const pullAmount = Math.min(diff * 0.5, 100);
        y.set(pullAmount);

        if (diff > 60 && !isPulling) {
          setIsPulling(true);
          triggerHaptic("light");
        }
      }
    },
    [isRefreshing, isPulling, y]
  );

  const handleTouchEnd = useCallback(async () => {
    if (y.get() > 60 && !isRefreshing) {
      triggerHaptic("medium");
      await onRefresh();
    }
    y.set(0);
    setIsPulling(false);
    startY.current = 0;
  }, [y, isRefreshing, onRefresh]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use passive: false to allow preventDefault on touchmove
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={containerRef}
      className="relative h-full bg-[#0F1216] overflow-y-auto overflow-x-hidden"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {/* Pull indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex justify-center py-4 z-10 pointer-events-none"
        style={{ opacity: pullProgress }}
      >
        <motion.div
          style={{ rotate }}
          className={isRefreshing ? "animate-spin" : ""}
        >
          <span className="material-symbols-outlined text-primary text-2xl">
            {isRefreshing ? "sync" : "arrow_downward"}
          </span>
        </motion.div>
      </motion.div>

      {/* Content - now scrollable */}
      <motion.div style={{ y }} className="min-h-full">
        {children}
      </motion.div>
    </div>
  );
}

import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type React from 'react';

interface LauncherProps {
  isOpen: boolean;
  onOpen: () => void;
}

export function Launcher({ isOpen, onOpen }: LauncherProps) {
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowGreeting(true), 1200);
    const t2 = setTimeout(() => setShowGreeting(false), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    /*
     * Outermost shell: fixed position in the viewport bottom-right.
     * position:relative lets the badge and greeting bubble anchor to it.
     * overflow:visible ensures NOTHING clips the 3D canvas.
     */
    <div
      style={{
        position: 'relative',
        width: 150,
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Greeting speech bubble ── */}
      {showGreeting && !isOpen && (
        <span
          className="nps2-robot-greeting"
          style={{ bottom: 158, right: 0 }}
        >
          Hi there! 👋
        </span>
      )}

      {/* ── Orange notification badge (outside clipping zone) ── */}
      {!isOpen && (
        <span
          className="nps2-badge"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10002,
          }}
        >
          1
        </span>
      )}

      {/*
       * Interactive click target: transparent, no border, no background.
       * Covers the full 150×150 bounding box so the user can click anywhere
       * on or around the 3D robot to toggle the chat window.
       */}
      <motion.button
        type="button"
        aria-label={isOpen ? 'NPS assistant is open' : 'Open NPS assistant'}
        onClick={onOpen}
        whileHover={{ y: -4, scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: 0,
          background: 'transparent',
          cursor: 'pointer',
          padding: 0,
          overflow: 'visible',
          zIndex: 10000,
        }}
      >
        {/*
         * GPU-accelerated wrapper around the Spline canvas.
         * - translateZ(0): forces browser to promote this to its own GPU
         *   compositing layer — bypassing CPU rasterisation entirely.
         * - will-change:transform: signals the browser to pre-allocate the
         *   GPU layer before the first paint, eliminating the initial blur
         *   flash that occurs when the layer is promoted mid-render.
         * - image-rendering:high-quality: prevents the CSS engine from
         *   applying lossy bicubic/nearest-neighbour downsampling.
         * - Explicit 150×150px dimensions match the outer shell exactly so
         *   the WebGL canvas is never internally sized small and then CSS-
         *   stretched, which is the primary cause of blurriness on HiDPI.
         */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: 150,
            height: 150,
            transform: 'translateZ(0)',
            willChange: 'transform',
            imageRendering: 'high-quality' as React.CSSProperties['imageRendering'],
            pointerEvents: 'none',
          }}
        >
          <Spline
            scene="https://prod.spline.design/I2lNQqFpD1pRfkdW/scene.splinecode"
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        </div>
      </motion.button>
    </div>
  );
}

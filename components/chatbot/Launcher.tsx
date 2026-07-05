import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
          borderRadius: 0,         // ← no circle mask
          background: 'transparent',
          cursor: 'pointer',
          padding: 0,
          overflow: 'visible',     // ← nothing clips the canvas
          zIndex: 10000,
        }}
      >
        {/*
         * Spline canvas:
         * - pointer-events:none → clicks fall through to the button above
         * - No transform scaling so the canvas pixel ratio stays native
         * - Width/height 100% fills the button bounding box exactly
         * - background:transparent so no dark box shows behind the model
         */}
        <Spline
          scene="https://prod.spline.design/I2lNQqFpD1pRfkdW/scene.splinecode"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            pointerEvents: 'none',
            userSelect: 'none',
            imageRendering: 'auto',
          }}
        />
      </motion.button>
    </div>
  );
}

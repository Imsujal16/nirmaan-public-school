import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import type React from 'react';

// ─── localStorage key ───────────────────────────────────────────────────────
const BADGE_STORAGE_KEY = 'nps_chatbot_badge_cleared';

interface LauncherProps {
  isOpen: boolean;
  onOpen: () => void;
}

export function Launcher({ isOpen, onOpen }: LauncherProps) {
  const [showGreeting, setShowGreeting] = useState(false);

  // ── Task 3: Persistent badge state ──────────────────────────────────────
  // Default to 0 to prevent a flash of "1" before we read localStorage.
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    // On mount, only show the badge if the user has NOT previously cleared it.
    const hasCleared = localStorage.getItem(BADGE_STORAGE_KEY);
    if (!hasCleared) {
      setBadgeCount(1);
    }
  }, []);

  // ── Task 2: Spline loading state ─────────────────────────────────────────
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowGreeting(true), 1200);
    const t2 = setTimeout(() => setShowGreeting(false), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleOpen = useCallback(() => {
    // Clear badge and persist to localStorage so it never reappears.
    setBadgeCount(0);
    localStorage.setItem(BADGE_STORAGE_KEY, 'true');
    onOpen();
  }, [onOpen]);

  const handleModelLoad = useCallback(() => {
    setIsModelLoaded(true);
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

      {/* ── Orange notification badge (persistent via localStorage) ── */}
      <AnimatePresence>
        {!isOpen && badgeCount > 0 && (
          <motion.span
            key="badge"
            className="nps2-badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10002,
            }}
          >
            {badgeCount}
          </motion.span>
        )}
      </AnimatePresence>

      {/*
       * Interactive click target: transparent, no border, no background.
       * Covers the full 150×150 bounding box so the user can click anywhere
       * on or around the 3D robot to toggle the chat window.
       */}
      <motion.button
        type="button"
        aria-label={isOpen ? 'NPS assistant is open' : 'Open NPS assistant'}
        onClick={handleOpen}
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
         * ── Task 2: Skeleton placeholder ────────────────────────────────
         * Displayed while WebGL is compiling the Spline scene.
         * A soft pulsing circle occupies the same footprint so the layout
         * never shifts when the robot pops in.
         */}
        <AnimatePresence>
          {!isModelLoaded && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              {/* Outer pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0.08) 70%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Inner dot */}
                <motion.div
                  animate={{ scale: [1, 0.88, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    boxShadow: '0 0 18px rgba(99,102,241,0.6)',
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/*
         * GPU-accelerated wrapper around the Spline canvas.
         * Fades in only after onLoad fires to avoid the awkward pop-in.
         */}
        <motion.div
          animate={{ opacity: isModelLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
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
            onLoad={handleModelLoad}
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        </motion.div>
      </motion.button>
    </div>
  );
}

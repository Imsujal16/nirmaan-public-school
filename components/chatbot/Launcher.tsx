import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface LauncherProps {
  isOpen: boolean;
  onOpen: () => void;
}

export function Launcher({ isOpen, onOpen }: LauncherProps) {
  const leftEyeRef = useRef<HTMLSpanElement>(null);
  const rightEyeRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);
  const [showGreeting, setShowGreeting] = useState(false);
  const [waving, setWaving] = useState(false);

  // Mouse-following eyes
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const eyes = [leftEyeRef.current, rightEyeRef.current];
      eyes.forEach((eye) => {
        if (!eye) return;
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const maxDist = 3;
        const x = Math.cos(angle) * maxDist;
        const y = Math.sin(angle) * maxDist;
        eye.style.transform = `translate(${x}px, ${y}px)`;
      });
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Welcome wave on first load
  useEffect(() => {
    const waveTimer = setTimeout(() => {
      setWaving(true);
      setShowGreeting(true);
    }, 1200);

    const stopWaveTimer = setTimeout(() => {
      setWaving(false);
    }, 4200);

    const hideGreetingTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 3800);

    return () => {
      clearTimeout(waveTimer);
      clearTimeout(stopWaveTimer);
      clearTimeout(hideGreetingTimer);
    };
  }, []);

  return (
    <motion.button
      ref={containerRef}
      className={`nps2-launcher nps2-robot-launcher${isOpen ? ' is-open' : ''}`}
      type="button"
      aria-label={isOpen ? 'NPS assistant is open' : 'Open NPS assistant'}
      onClick={onOpen}
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Greeting bubble */}
      {showGreeting && !isOpen && (
        <span className="nps2-robot-greeting">Hi there! 👋</span>
      )}

      {/* Antenna */}
      <span className="nps2-robot-antenna">
        <span className="nps2-robot-antenna-ball" />
      </span>

      {/* Robot head */}
      <span className="nps2-robot-head">

        {/* Visor / faceplate */}
        <span className="nps2-robot-visor">

          {/* Left eye */}
          <span className="nps2-robot-eye-socket nps2-eye-left">
            <span className="nps2-robot-eye" ref={leftEyeRef} />
          </span>

          {/* Right eye */}
          <span className="nps2-robot-eye-socket nps2-eye-right">
            <span className="nps2-robot-eye" ref={rightEyeRef} />
          </span>
        </span>

        {/* Chin strip / mouth */}
        <span className="nps2-robot-mouth">
          <span className="nps2-robot-mouth-led" />
          <span className="nps2-robot-mouth-led" />
          <span className="nps2-robot-mouth-led" />
        </span>
      </span>

      {/* Waving hand */}
      <span className={`nps2-robot-hand${waving ? ' waving' : ''}`}>👋</span>

      {/* Notification badge */}
      {!isOpen && <span className="nps2-badge">1</span>}
    </motion.button>
  );
}

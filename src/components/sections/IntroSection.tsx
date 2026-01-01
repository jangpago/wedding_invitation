'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IntroSectionProps {
  groomName: string;
  brideName: string;
  onComplete: () => void;
}

export default function IntroSection({ groomName, brideName, onComplete }: IntroSectionProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" as const },
        opacity: { duration: 0.5 },
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 2.2, duration: 0.8 },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-bg)]"
        >
          <motion.svg
            viewBox="0 0 200 100"
            className="w-64 h-32 mb-8"
          >
            <motion.path
              d="M20,50 Q35,20 50,50 T80,50"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M100,30 L100,70 M85,50 L115,50"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M130,50 Q145,20 160,50 T190,50"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
          </motion.svg>

          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <p className="text-xs tracking-[0.3em] text-[var(--color-text-light)] mb-3">
              WEDDING INVITATION
            </p>
            <p className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-text)]">
              {groomName} <span className="text-[var(--color-accent)] mx-2">&</span> {brideName}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.5 }}
            className="absolute bottom-12"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[var(--color-text-muted)] text-xs tracking-widest"
            >
              SCROLL DOWN
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

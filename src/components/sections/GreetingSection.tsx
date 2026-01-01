'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface GreetingSectionProps {
  title: string;
  message: string;
  groomName: string;
  brideName: string;
  groomParents: { father: string; mother: string };
  brideParents: { father: string; mother: string };
}

export default function GreetingSection({
  title,
  message,
  groomName,
  brideName,
  groomParents,
  brideParents,
}: GreetingSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--color-bg)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <svg
            className="w-12 h-12 mx-auto mb-4 text-[var(--color-primary)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M12 2L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8L12 2Z" />
          </svg>
          <p className="section-title mb-3">INVITATION</p>
          <h2 className="font-[family-name:var(--font-heading)] text-xl text-[var(--color-text)]">
            {title}
          </h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-12 font-[family-name:var(--font-heading)] text-[15px] leading-[2] text-[var(--color-text)] whitespace-pre-line"
        >
          {message}
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="inline-block border-t border-b border-[var(--color-border)] py-6 px-8">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="text-right">
                <p className="text-[var(--color-text-light)] text-xs mb-1">
                  {groomParents.father} · {groomParents.mother}
                  <span className="text-[var(--color-text-muted)] ml-1">의 아들</span>
                </p>
                <p className="font-medium text-[var(--color-groom)]">{groomName}</p>
              </div>
              
              <div className="text-[var(--color-accent)] text-lg">♥</div>
              
              <div className="text-left">
                <p className="text-[var(--color-text-light)] text-xs mb-1">
                  {brideParents.father} · {brideParents.mother}
                  <span className="text-[var(--color-text-muted)] ml-1">의 딸</span>
                </p>
                <p className="font-medium text-[var(--color-bride)]">{brideName}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section ref={ref} className="py-24 px-6 bg-[var(--color-bg)] paper-texture">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="w-px h-10 bg-[var(--color-primary)] mx-auto mb-6 opacity-40" />
          <p className="section-title text-sm mb-4">INVITATION</p>
          <h2 className="font-[family-name:var(--font-heading)] text-[var(--color-text)]">
            {title}
          </h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-12 font-[family-name:var(--font-heading)] text-[15px] leading-[2.2] text-[var(--color-text)] whitespace-pre-line"
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

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { formatKoreanDate } from '@/lib/utils';

interface HeroSectionProps {
  groomName: string;
  brideName: string;
  date: Date;
  venue: string;
  mainImage?: string;
}

export default function HeroSection({
  groomName,
  brideName,
  date,
  venue,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <div className="relative w-full h-full bg-gradient-to-b from-[var(--color-primary-light)] to-[var(--color-bg)]">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
            alt="메인 웨딩 사진"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[var(--color-bg)]" />
        </div>
      </motion.div>

      <div className="relative z-10 flex-1 flex flex-col justify-end pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs tracking-[0.25em] text-[var(--color-primary)] mb-4">
            SAVE THE DATE
          </p>
          
          <h1 className="font-[family-name:var(--font-heading)] text-3xl mb-6">
            <span className="text-[var(--color-text)]">{groomName}</span>
            <span className="text-[var(--color-accent)] mx-3 text-2xl">&</span>
            <span className="text-[var(--color-text)]">{brideName}</span>
          </h1>

          <div className="space-y-1 text-sm text-[var(--color-text-light)]">
            <p>{formatKoreanDate(date)}</p>
            <p>{venue}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-text-muted)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

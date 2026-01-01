'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { calculateDday } from '@/lib/utils';

interface CalendarSectionProps {
  date: Date;
  groomName: string;
  brideName: string;
}

export default function CalendarSection({ date, groomName, brideName }: CalendarSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [dday, setDday] = useState<number>(0);

  useEffect(() => {
    setDday(calculateDday(date));
  }, [date]);

  const year = date.getFullYear();
  const month = date.getMonth();
  const targetDay = date.getDate();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    days.push(i);
  }

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  return (
    <section ref={ref} className="py-16 px-6 bg-[var(--color-bg)]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <p className="section-title mb-2">CALENDAR</p>
        <h2 className="font-[family-name:var(--font-heading)] text-lg mb-8">
          {monthNames[month]}월
        </h2>

        <div className="max-w-xs mx-auto">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day, idx) => (
              <div
                key={day}
                className={`text-xs py-2 ${
                  idx === 0 ? 'text-red-400' : idx === 6 ? 'text-blue-400' : 'text-[var(--color-text-light)]'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, idx) => (
              <div
                key={idx}
                className={`relative aspect-square flex items-center justify-center text-sm
                  ${day === targetDay ? 'text-white' : ''}
                  ${idx % 7 === 0 && day !== targetDay ? 'text-red-400' : ''}
                  ${idx % 7 === 6 && day !== targetDay ? 'text-blue-400' : ''}
                `}
              >
                {day === targetDay && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute inset-1 bg-[var(--color-accent)] rounded-full"
                  />
                )}
                <span className="relative z-10">{day}</span>
                {day === targetDay && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -bottom-1 text-[8px] text-[var(--color-accent)]"
                  >
                    ♥
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 py-4 px-6 bg-[var(--color-bg-secondary)] rounded-2xl inline-block"
        >
          <p className="text-sm text-[var(--color-text-light)] mb-1">
            {groomName} <span className="text-[var(--color-accent)]">♥</span> {brideName}의 결혼식
          </p>
          <p className="font-[family-name:var(--font-heading)] text-lg text-[var(--color-primary)]">
            {dday > 0 ? (
              <>
                <span className="text-2xl font-medium">{dday}</span>
                <span className="text-sm ml-1">일 전</span>
              </>
            ) : dday === 0 ? (
              <span className="text-xl">오늘이에요!</span>
            ) : (
              <>
                <span className="text-2xl font-medium">{Math.abs(dday)}</span>
                <span className="text-sm ml-1">일이 지났습니다</span>
              </>
            )}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

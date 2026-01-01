'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link2, Check, MessageCircle } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface ShareSectionProps {
  groomName: string;
  brideName: string;
  date: Date;
  venue: string;
}

export default function ShareSection({
  groomName,
  brideName,
  date,
  venue,
}: ShareSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    return `${year}년 ${month}월 ${day}일 ${dayNames[d.getDay()]}요일`;
  };

  const handleCopyLink = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKakaoShare = () => {
    const shareText = `${groomName} ♥ ${brideName} 결혼합니다\n\n${formatDate(date)}\n${venue}\n\n청첩장 보기: ${typeof window !== 'undefined' ? window.location.href : ''}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${groomName} ♥ ${brideName} 결혼합니다`,
        text: shareText,
        url: typeof window !== 'undefined' ? window.location.href : '',
      });
    } else {
      window.open(`https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank');
    }
  };

  return (
    <section ref={ref} className="py-16 px-6 bg-[var(--color-bg-secondary)]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <p className="section-title mb-2">SHARE</p>
          <h2 className="font-[family-name:var(--font-heading)] text-lg">공유하기</h2>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleKakaoShare}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#FEE500] rounded-xl font-medium text-[#3C1E1E]"
          >
            <MessageCircle size={20} />
            <span>카카오톡</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-[var(--color-border)] rounded-xl font-medium"
          >
            {copied ? (
              <>
                <Check size={20} className="text-green-500" />
                <span className="text-green-500">복사됨</span>
              </>
            ) : (
              <>
                <Link2 size={20} />
                <span>링크 복사</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

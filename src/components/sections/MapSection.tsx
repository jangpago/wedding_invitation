'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Phone, Navigation, Car, Train, Bus } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface MapSectionProps {
  venue: {
    name: string;
    hall: string;
    address: string;
    phone: string;
    coordinates: { lat: number; lng: number };
    transportation: {
      subway?: string;
      bus?: string;
      car?: string;
      etc?: string;
    };
  };
}

export default function MapSection({ venue }: MapSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    const success = await copyToClipboard(venue.address);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openNaverMap = () => {
    window.open(
      `https://map.naver.com/v5/search/${encodeURIComponent(venue.address)}`,
      '_blank'
    );
  };

  const openKakaoMap = () => {
    window.open(
      `https://map.kakao.com/link/search/${encodeURIComponent(venue.name)}`,
      '_blank'
    );
  };

  const openTMap = () => {
    window.open(
      `https://apis.openapi.sk.com/tmap/app/routes?appKey=l7xx&name=${encodeURIComponent(venue.name)}&lon=${venue.coordinates.lng}&lat=${venue.coordinates.lat}`,
      '_blank'
    );
  };

  const transportationItems = [
    { icon: Train, label: '지하철', content: venue.transportation.subway },
    { icon: Bus, label: '버스', content: venue.transportation.bus },
    { icon: Car, label: '자가용', content: venue.transportation.car },
    { icon: Navigation, label: '기타', content: venue.transportation.etc },
  ].filter(item => item.content);

  return (
    <section ref={ref} className="py-16 px-6 bg-[var(--color-bg)]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <p className="section-title mb-2">LOCATION</p>
          <h2 className="font-[family-name:var(--font-heading)] text-lg mb-2">오시는 길</h2>
          <p className="text-[var(--color-text)]">{venue.name}</p>
          <p className="text-sm text-[var(--color-text-light)]">{venue.hall}</p>
        </div>

        <div className="w-full h-64 rounded-2xl bg-[var(--color-bg-secondary)] mb-4 overflow-hidden flex items-center justify-center">
          <div className="text-center text-[var(--color-text-muted)]">
            <MapPin size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">지도 영역</p>
            <p className="text-xs">(카카오맵 API 키 필요)</p>
          </div>
        </div>

        <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-3 mb-3">
            <MapPin size={18} className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm">{venue.address}</p>
              <button
                onClick={handleCopyAddress}
                className="text-xs text-[var(--color-primary)] mt-1"
              >
                {copied ? '복사됨!' : '주소 복사'}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-[var(--color-primary)] flex-shrink-0" />
            <a href={`tel:${venue.phone}`} className="text-sm text-[var(--color-text)]">
              {venue.phone}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={openNaverMap}
            className="py-3 bg-[#03C75A] text-white text-sm rounded-xl transition-transform active:scale-95"
          >
            네이버지도
          </button>
          <button
            onClick={openKakaoMap}
            className="py-3 bg-[#FEE500] text-[#3C1E1E] text-sm rounded-xl transition-transform active:scale-95"
          >
            카카오맵
          </button>
          <button
            onClick={openTMap}
            className="py-3 bg-[#EF4444] text-white text-sm rounded-xl transition-transform active:scale-95"
          >
            티맵
          </button>
        </div>

        {transportationItems.length > 0 && (
          <div className="space-y-4">
            {transportationItems.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center flex-shrink-0">
                  <item.icon size={16} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">{item.label}</p>
                  <p className="text-sm text-[var(--color-text-light)] whitespace-pre-line">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

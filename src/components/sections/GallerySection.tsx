'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface GalleryImage {
  src: string;
  alt: string;
}

interface GallerySectionProps {
  images: GalleryImage[];
}

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
  'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&q=80',
  'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80',
];

export default function GallerySection({ images }: GallerySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const displayImages = images.length === 0 || images[0].src.includes('photo1.jpg')
    ? PLACEHOLDER_IMAGES.map((src, i) => ({ src, alt: `갤러리 ${i + 1}` }))
    : images;

  return (
    <section ref={ref} className="py-20 bg-[var(--color-bg-secondary)] paper-texture">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center mb-10 px-6">
          <p className="section-title mb-3">GALLERY</p>
          <h2 className="font-[family-name:var(--font-heading)]">우리의 순간들</h2>
        </div>

        <div className="px-3">
          <div className="grid grid-cols-3 gap-1.5">
            {displayImages.slice(0, 1).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedIndex(index)}
                className="col-span-2 row-span-2 aspect-[4/5] relative cursor-pointer overflow-hidden rounded-lg shadow-md"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-500 hover:scale-105"
                  sizes="(max-width: 430px) 66vw"
                />
              </motion.div>
            ))}
            {displayImages.slice(1, 3).map((image, index) => (
              <motion.div
                key={index + 1}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15 + index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedIndex(index + 1)}
                className="aspect-square relative cursor-pointer overflow-hidden rounded-lg shadow-md"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-500 hover:scale-105"
                  sizes="(max-width: 430px) 33vw"
                />
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-1.5 mt-1.5">
            {displayImages.slice(3).map((image, index) => (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.25 + index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedIndex(index + 3)}
                className="aspect-square relative cursor-pointer overflow-hidden rounded-lg shadow-sm"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-500 hover:scale-105"
                  sizes="(max-width: 430px) 33vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 z-10 text-white p-2"
            >
              <X size={28} />
            </button>

            <Swiper
              modules={[Navigation, Pagination]}
              initialSlide={selectedIndex}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              pagination={{ type: 'fraction' }}
              className="w-full h-full"
            >
              {displayImages.map((image, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <div className="relative w-full max-h-[80vh] aspect-[3/4]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="swiper-button-prev-custom absolute left-2 z-10 text-white p-2">
              <ChevronLeft size={32} />
            </button>
            <button className="swiper-button-next-custom absolute right-2 z-10 text-white p-2">
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

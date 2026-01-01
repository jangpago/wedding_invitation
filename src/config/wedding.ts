import { WeddingData } from '@/types';

export const weddingData: WeddingData = {
  groom: {
    name: '김민준',
    phone: '010-1234-5678',
    parents: {
      father: {
        name: '김철수',
        phone: '010-1111-1111',
        relation: '아버지',
      },
      mother: {
        name: '이영희',
        phone: '010-2222-2222',
        relation: '어머니',
      },
    },
    account: {
      bank: '신한은행',
      accountNumber: '110-123-456789',
      holder: '김민준',
    },
    parentsAccounts: [
      {
        bank: '국민은행',
        accountNumber: '123-45-6789012',
        holder: '김철수',
      },
      {
        bank: '우리은행',
        accountNumber: '1002-123-456789',
        holder: '이영희',
      },
    ],
  },
  bride: {
    name: '이서연',
    phone: '010-8765-4321',
    parents: {
      father: {
        name: '이정호',
        phone: '010-3333-3333',
        relation: '아버지',
      },
      mother: {
        name: '박미경',
        phone: '010-4444-4444',
        relation: '어머니',
      },
    },
    account: {
      bank: '카카오뱅크',
      accountNumber: '3333-12-3456789',
      holder: '이서연',
    },
    parentsAccounts: [
      {
        bank: '하나은행',
        accountNumber: '123-456789-01234',
        holder: '이정호',
      },
      {
        bank: '농협',
        accountNumber: '312-1234-5678-91',
        holder: '박미경',
      },
    ],
  },
  wedding: {
    date: new Date('2025-05-24T11:00:00'),
    time: '오전 11시',
    venue: {
      name: '더채플앳청담',
      hall: '그랜드볼룸 3층',
      address: '서울특별시 강남구 청담동 123-45',
      phone: '02-1234-5678',
      coordinates: {
        lat: 37.5200,
        lng: 127.0470,
      },
      transportation: {
        subway: '압구정로데오역 5번 출구에서 도보 5분\n청담역 12번 출구에서 도보 10분',
        bus: '청담사거리 정류장 하차 (143, 240, 401)',
        car: '강남대로에서 청담사거리 방면 우회전',
        etc: '주차 2시간 무료 (이후 시간당 3,000원)',
      },
    },
  },
  greeting: {
    title: '소중한 분들을 초대합니다',
    message: `서로 다른 길을 걸어온 저희가
이제 같은 곳을 바라보며
한 길을 함께 걸어가려 합니다.

저희 두 사람이 사랑으로 만나
믿음으로 하나 되는 날,
귀한 걸음 하시어
축복해 주시면 감사하겠습니다.`,
  },
  gallery: [
    { src: '/images/gallery/photo1.jpg', alt: '웨딩 사진 1' },
    { src: '/images/gallery/photo2.jpg', alt: '웨딩 사진 2' },
    { src: '/images/gallery/photo3.jpg', alt: '웨딩 사진 3' },
    { src: '/images/gallery/photo4.jpg', alt: '웨딩 사진 4' },
    { src: '/images/gallery/photo5.jpg', alt: '웨딩 사진 5' },
    { src: '/images/gallery/photo6.jpg', alt: '웨딩 사진 6' },
    { src: '/images/gallery/photo7.jpg', alt: '웨딩 사진 7' },
    { src: '/images/gallery/photo8.jpg', alt: '웨딩 사진 8' },
    { src: '/images/gallery/photo9.jpg', alt: '웨딩 사진 9' },
  ],
  video: {
    url: '/videos/wedding-video.mp4',
    thumbnail: '/images/video-thumbnail.jpg',
  },
  meta: {
    title: '김민준 ♥ 이서연 결혼합니다',
    description: '2025년 5월 24일 토요일 오전 11시, 더채플앳청담',
    ogImage: '/images/og-image.jpg',
  },
};

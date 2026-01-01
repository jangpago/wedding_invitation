'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { X, Trash2, MessageSquare, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { simpleHash } from '@/lib/utils';
import type { GuestbookEntry, GuestbookFormData } from '@/types';

export default function GuestbookSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [formData, setFormData] = useState<GuestbookFormData>({
    name: '',
    message: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newEntries = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        return {
          id: docSnapshot.id,
          name: data.name,
          message: data.message,
          passwordHash: data.passwordHash,
          createdAt: data.createdAt?.toDate() || new Date(),
        } as GuestbookEntry;
      });
      setEntries(newEntries);
    }, () => {
      setEntries([]);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.message.trim() || !formData.password.trim()) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'guestbook'), {
        name: formData.name.trim(),
        message: formData.message.trim(),
        passwordHash: simpleHash(formData.password),
        createdAt: Timestamp.now(),
      });

      setFormData({ name: '', message: '', password: '' });
      setShowWriteModal(false);
    } catch {
      setError('등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!showDeleteModal || !deletePassword.trim()) return;

    const entry = entries.find((e) => e.id === showDeleteModal);
    if (!entry) return;

    if (simpleHash(deletePassword) !== entry.passwordHash) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'guestbook', showDeleteModal));
      setShowDeleteModal(null);
      setDeletePassword('');
      setError(null);
    } catch {
      setError('삭제에 실패했습니다.');
    }
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const sampleEntries = [
    { id: '1', name: '김미진', message: '두 사람의 앞길에 행복만 가득하길 기원합니다.', createdAt: new Date() },
    { id: '2', name: '최수혁', message: '정말 축하한다! 식날 보자!', createdAt: new Date() },
    { id: '3', name: '친구들', message: '내가 다 설레는거 있지~ 정말 축하해!!', createdAt: new Date() },
  ];

  const displayEntries = entries.length > 0 ? entries : sampleEntries;

  const getCardRotation = (index: number) => {
    const rotations = [-1.2, 0.8, -0.5, 1, -0.8, 0.5];
    return rotations[index % rotations.length];
  };

  const cardColors = [
    'bg-[#FFF9E6]',
    'bg-[#F0F7EE]', 
    'bg-[#FFF0F0]',
    'bg-[#F0F4FF]',
    'bg-[#FFF5EB]',
    'bg-[#F5F0FF]',
  ];

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--color-bg)] paper-texture">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center mb-10">
          <p className="section-title mb-3">GUESTBOOK</p>
          <h2 className="font-[family-name:var(--font-heading)] mb-2">방명록</h2>
          <p className="text-sm text-[var(--color-text-light)]">
            축하의 마음을 남겨주세요
          </p>
        </div>

        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto hide-scrollbar">
          {displayEntries.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-text-muted)]">
              <MessageSquare size={32} className="mx-auto mb-3 opacity-50" />
              <p className="text-sm">첫 번째 축하 메시지를 남겨주세요!</p>
            </div>
          ) : (
            displayEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 15, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: getCardRotation(index) }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`${cardColors[index % cardColors.length]} rounded-sm p-5 shadow-md relative`}
                style={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-3 bg-[var(--color-primary-light)]/60 rounded-sm" />
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] text-[var(--color-primary)] tracking-wider">FROM</span>
                    <p className="text-sm font-medium mt-0.5">{entry.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--color-text-muted)]">
                      {formatDate(entry.createdAt)}
                    </span>
                    {'passwordHash' in entry && (
                       <button
                        onClick={() => {
                          setShowDeleteModal(entry.id);
                          setError(null);
                        }}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text)] whitespace-pre-line leading-relaxed">
                  {entry.message}
                </p>
              </motion.div>
            ))
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          onClick={() => {
            setShowWriteModal(true);
            setError(null);
          }}
          className="w-full py-4 bg-[var(--color-primary)] text-white rounded-xl font-medium shadow-lg shadow-[var(--color-primary)]/20 transition-all"
        >
          축하 메시지 남기기
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showWriteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWriteModal(false)}
              className="fixed inset-0 bg-black/40 z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white rounded-t-3xl z-50 p-6 pb-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-lg">축하 메시지 작성</h3>
                <button onClick={() => setShowWriteModal(false)}>
                  <X size={24} className="text-[var(--color-text-light)]" />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="이름"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-bg-secondary)] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  maxLength={20}
                />
                <textarea
                  placeholder="축하 메시지를 입력해주세요"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-[var(--color-bg-secondary)] rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  maxLength={200}
                />
                <input
                  type="password"
                  placeholder="비밀번호 (삭제 시 필요)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-bg-secondary)] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  maxLength={20}
                />

                {error && (
                  <p className="text-[var(--color-accent)] text-sm text-center">{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[var(--color-primary)] text-white rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                  {isSubmitting ? '등록 중...' : '등록하기'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowDeleteModal(null);
                setDeletePassword('');
                setError(null);
              }}
              className="fixed inset-0 bg-black/40 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[320px] bg-white rounded-2xl z-50 p-6"
            >
              <h3 className="font-medium text-center mb-4">메시지 삭제</h3>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={deletePassword}
                onChange={(e) => {
                  setDeletePassword(e.target.value);
                  setError(null);
                }}
                className="w-full px-4 py-3 bg-[var(--color-bg-secondary)] rounded-xl text-sm outline-none mb-3"
              />
              {error && (
                <p className="text-[var(--color-accent)] text-sm text-center mb-3">{error}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowDeleteModal(null);
                    setDeletePassword('');
                    setError(null);
                  }}
                  className="flex-1 py-3 bg-[var(--color-bg-secondary)] rounded-xl text-sm"
                >
                  취소
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 bg-[var(--color-primary-dark)] text-white rounded-xl text-sm"
                >
                  삭제
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

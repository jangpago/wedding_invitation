'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';
import type { BankAccount } from '@/types';

interface AccountSectionProps {
  groom: {
    name: string;
    account: BankAccount;
    parentsAccounts?: BankAccount[];
  };
  bride: {
    name: string;
    account: BankAccount;
    parentsAccounts?: BankAccount[];
  };
}

function AccountCard({
  type,
  name,
  account,
  parentsAccounts,
}: {
  type: 'groom' | 'bride';
  name: string;
  account: BankAccount;
  parentsAccounts?: BankAccount[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (accountNumber: string, index: number) => {
    const success = await copyToClipboard(accountNumber);
    if (success) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const allAccounts = [
    { ...account, label: name },
    ...(parentsAccounts || []).map((acc) => ({ ...acc, label: acc.holder })),
  ];

  const bgColor = type === 'groom' ? 'bg-[#EEF2F6]' : 'bg-[#F9F2F2]';
  const accentColor = type === 'groom' ? 'text-[var(--color-groom)]' : 'text-[var(--color-bride)]';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-5 flex items-center justify-between ${bgColor}`}
      >
        <div className="flex items-center gap-3">
          <div className={`text-sm font-medium ${accentColor}`}>
            {type === 'groom' ? '신랑측' : '신부측'} 계좌번호
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className="text-[var(--color-text-light)]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 space-y-3">
              {allAccounts.map((acc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-0"
                >
                  <div>
                    <p className="text-xs text-[var(--color-text-light)] mb-1">
                      {acc.bank}
                    </p>
                    <p className="text-sm">{acc.accountNumber}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      예금주: {acc.label}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(acc.accountNumber, index)}
                    className="flex items-center gap-1 px-4 py-2 bg-[var(--color-bg-secondary)] rounded-full text-xs transition-transform active:scale-95"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check size={14} className="text-[var(--color-primary)]" />
                        <span className="text-[var(--color-primary)]">복사됨</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>복사</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AccountSection({ groom, bride }: AccountSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--color-bg-secondary)] paper-texture">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center mb-10">
          <p className="section-title mb-3">ACCOUNT</p>
          <h2 className="font-[family-name:var(--font-heading)] mb-3">
            마음 전하실 곳
          </h2>
          <p className="text-sm text-[var(--color-text-light)]">
            축하의 마음을 담아 축의금을 전달해 보세요
          </p>
        </div>

        <div className="space-y-4">
          <AccountCard
            type="groom"
            name={groom.name}
            account={groom.account}
            parentsAccounts={groom.parentsAccounts}
          />
          <AccountCard
            type="bride"
            name={bride.name}
            account={bride.account}
            parentsAccounts={bride.parentsAccounts}
          />
        </div>
      </motion.div>
    </section>
  );
}

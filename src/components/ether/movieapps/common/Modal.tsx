// components/ConfirmationModal.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
}: ConfirmationModalProps) => {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      confirmButtonRef.current?.focus();
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-xl bg-gray-800 p-6 shadow-xl"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <h2
          id="modal-title"
          className="mb-4 flex items-center gap-2 text-2xl font-bold text-red-500"
        >
          <AlertTriangle className="h-6 w-6" />
          {title}
        </h2>

        <p id="modal-description" className="mb-6 text-gray-300">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-500 disabled:opacity-50"
          >
            Batal
          </button>
          <button
            ref={confirmButtonRef}
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-500 disabled:opacity-50"
          >
            {isLoading && (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            Ya, Hapus
          </button>
        </div>
      </motion.div>
    </div>
  );
};

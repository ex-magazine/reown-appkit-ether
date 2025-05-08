'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player';
import { TvMinimalPlay } from 'lucide-react';

interface TrailerModalProps {
  videoKey: string;
}

const TrailerModal = ({ videoKey }: TrailerModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-white hover:bg-cyan-600"
      >
        <TvMinimalPlay /> Trailer
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 z-10 text-white transition-colors hover:text-cyan-400"
              >
                ✕
              </button>
              <div className="aspect-video">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${videoKey}`}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TrailerModal;

// app/dashboard/page.tsx
'use client';

import { motion } from 'framer-motion';
import {
  Clock,
  Heart,
  Film,
  Star,
  Popcorn,
  Clapperboard,
  Play,
  List,
  Trophy,
  History,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from '../Metadata';

export default function DashboardIntro() {
  return (
    <>
      <Metadata
        seoTitle="Dashboard"
        seoDescription="Halaman Dashboard"
        seoKeywords="statistik, histori, tontonan"
      />

      <div className="flex h-[75vh] items-center justify-center space-y-8 px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-center"
        >
          <div className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-2">
            <Clapperboard className="h-12 w-12 text-white" />
          </div>

          <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            CrowdFunding!
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Temukan dunia film dan serial terbaik yang siap menemani
            hari-harimu. Mulai petualangan menontonmu sekarang!
          </p>
        </motion.div>
      </div>
    </>
  );
}

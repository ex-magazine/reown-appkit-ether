'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, Award, Film, TrendingUp } from 'lucide-react';
import { Person } from '@/app/person/page';
import Image from 'next/image';

const StatBox = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: any;
  label: string;
}) => (
  <div className="rounded-md bg-gray-800 p-2 text-center">
    <div className="flex justify-center">{icon}</div>
    <div className="mt-1 text-lg font-semibold text-gray-100">{value}</div>
    <div className="text-xs text-gray-400">{label}</div>
  </div>
);

export const NetworkGraph = ({ people }: { people: Person[] }) => {
  const [selectedActor, setSelectedActor] = useState<number>(0);

  // Data mock - sesuaikan dengan API Anda
  const actorDetails = people.map((person) => ({
    ...person,
    rating: (Math.random() * 2 + 3).toFixed(1),
    awards: Math.floor(Math.random() * 5),
    topGenres: ['Drama', 'Action', 'Comedy']
      .sort(() => Math.random() - 0.5)
      .slice(0, 2),
    recentFilms: 3 + Math.floor(Math.random() * 4),
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border border-gray-700 bg-gray-800 p-4 shadow-sm md:p-6"
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-100">
        Featured Cast
      </h2>

      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {/* Actor List */}
        <div className="space-y-3">
          {actorDetails.slice(0, 5).map((actor, index) => (
            <motion.div
              key={actor.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`cursor-pointer rounded-lg p-3 transition-colors ${
                selectedActor === index
                  ? 'border border-purple-500/30 bg-gray-700'
                  : 'border border-transparent bg-gray-900 hover:bg-gray-700/50'
              }`}
              onClick={() => setSelectedActor(index)}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-md object-cover"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-100">{actor.name}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{actor.rating}</span>
                    <span className="mx-1">•</span>
                    <Film className="h-4 w-4 text-blue-400" />
                    <span>{actor.recentFilms} films</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedActor}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 rounded-lg border border-gray-700 bg-gray-900 p-4"
          >
            <div className="relative aspect-video overflow-hidden rounded-md">
              <Image
                src={`https://image.tmdb.org/t/p/w500${actorDetails[selectedActor]?.profile_path}`}
                alt={actorDetails[selectedActor]?.name}
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 p-3">
                <h2 className="text-lg font-semibold text-gray-100">
                  {actorDetails[selectedActor]?.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <StatBox
                icon={<Star className="h-5 w-5 text-yellow-400" />}
                value={actorDetails[selectedActor]?.rating}
                label="Rating"
              />
              <StatBox
                icon={<Award className="h-5 w-5 text-purple-400" />}
                value={actorDetails[selectedActor]?.awards}
                label="Awards"
              />
              <StatBox
                icon={<Film className="h-5 w-5 text-blue-400" />}
                value={actorDetails[selectedActor]?.recentFilms}
                label="Films"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">Top Genres</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {actorDetails[selectedActor]?.topGenres.map(
                  (genre: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-800 px-2.5 py-1 text-sm text-gray-300"
                    >
                      {genre}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

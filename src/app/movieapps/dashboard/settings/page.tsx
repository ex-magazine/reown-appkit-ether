'use client';

import { useState, useRef, useEffect } from 'react';
import {
  User,
  Film,
  Bell,
  Shield,
  CreditCard,
  Globe,
  HelpCircle,
  Edit,
  ChevronRight,
  Eye,
  EyeOff,
  Check,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useUserProfile } from '@/hooks/useUserProfile';
import Link from 'next/link';

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  });
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [preferences, setPreferences] = useState(userData.preferences);
  const [selectedGenres, setSelectedGenres] = useState(
    userData.preferences.contentPreferences.favoriteGenres,
  );
  const [isDarkMode, setIsDarkMode] = useState(userData.preferences.darkMode);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, error } = useUserProfile();

  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 14, name: 'Fantasy' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];

  const languages = [
    'English',
    'Bahasa Indonesia',
    '日本語',
    '한국어',
    '中文',
    'Español',
    'Français',
  ];

  // Toggle notification settings
  const toggleNotification = (key: keyof typeof preferences.notifications) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [key]: !preferences.notifications[key],
      },
    });
  };

  const toggleAutoplay = () => {
    setPreferences({
      ...preferences,
      autoplay: !preferences.autoplay,
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setPreferences({
      ...preferences,
      darkMode: !preferences.darkMode,
    });
  };

  const handleGenreToggle = (genre: { id: number; name: string }) => {
    if (selectedGenres.includes(`${genre.id}`)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== `${genre.id}`));
    } else {
      setSelectedGenres([...selectedGenres, `${genre.id}`]);
    }
  };

  const handleProfileSave = () => {
    setEditMode(false);
    // Di sini akan ada kode untuk menyimpan ke server
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPassword({
      ...password,
      [field]: value,
    });
  };

  const handlePasswordSubmit = (e: any) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert('Password baru tidak sama dengan konfirmasi password');
      return;
    }
    // Di sini akan ada kode untuk mengubah password
    alert('Password berhasil diubah');
    setPassword({
      current: '',
      new: '',
      confirm: '',
    });
  };

  const handleChangeAvatar = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Di sini akan ada kode untuk upload file
      console.log('File selected:', file.name);
    }
  };

  const handleLanguageChange = (lang: any) => {
    setPreferences({
      ...preferences,
      language: lang,
    });
  };

  const handleSubtitleLanguageChange = (lang: any) => {
    setPreferences({
      ...preferences,
      subtitleLanguage: lang,
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pengaturan Akun</h1>
      </div>

      <SectionContainer>
        <SectionHeading icon={<User size={20} />} title="Profil" />
        {/* Konten profil */}
        {editMode ? (
          <div className="space-y-4">
            <div>
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="h-24 w-24 overflow-hidden rounded-full">
                    <Image
                      src={userData.avatar}
                      alt="Profile"
                      fill
                      // objectFit="cover"
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={handleChangeAvatar}
                    className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-2 text-white"
                  >
                    <Edit size={16} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm text-gray-400">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={data?.data.name}
                    onChange={(e) =>
                      setProfileData({ ...data?.data, name: e.target.value })
                    }
                    className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    value={data?.data.email}
                    onChange={(e) =>
                      setProfileData({ ...data?.data, email: e.target.value })
                    }
                    className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-gray-400">
                    Bio
                  </label>
                  <input
                    // type="tel"
                    value={data?.data?.profile?.bio}
                    onChange={(e) =>
                      setProfileData({
                        ...data?.data?.profile?.bio,
                        bio: e.target.value,
                      })
                    }
                    className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditMode(false)}
                className="rounded-lg border border-gray-600 px-4 py-2 text-gray-300 transition hover:bg-gray-700"
              >
                Batal
              </button>
              <button
                onClick={handleProfileSave}
                className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                Simpan
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center space-x-4">
              <div className="h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={data?.data?.profile?.bio.avatar}
                  alt="Profile"
                  layout="responsive"
                  width={64}
                  height={64}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{data?.data?.name}</h3>
                <p className="text-gray-400">{data?.data?.email}</p>
                <p className="text-sm text-gray-400">
                  {data?.data?.profile?.bio}
                </p>
              </div>
            </div>

            <button
              onClick={() => setEditMode(true)}
              className="flex items-center space-x-2 rounded-lg bg-gray-700 px-4 py-2 transition hover:bg-gray-600"
            >
              <Edit size={16} />
              <span>Edit Profil</span>
            </button>
          </div>
        )}
      </SectionContainer>

      <SectionContainer>
        <SectionHeading icon={<Shield size={20} />} title="Keamanan" />
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-400">
              Password Saat Ini
            </label>
            <div className="relative">
              <input
                type={showPassword.current ? 'text' : 'password'}
                value={password.current}
                onChange={(e) =>
                  handlePasswordChange('current', e.target.value)
                }
                className="w-full rounded-lg bg-gray-700 px-4 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    current: !showPassword.current,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              >
                {showPassword.current ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-400">
              Password Baru
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? 'text' : 'password'}
                value={password.new}
                onChange={(e) => handlePasswordChange('new', e.target.value)}
                className="w-full rounded-lg bg-gray-700 px-4 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({ ...showPassword, new: !showPassword.new })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              >
                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-400">
              Konfirmasi Password Baru
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                value={password.confirm}
                onChange={(e) =>
                  handlePasswordChange('confirm', e.target.value)
                }
                className="w-full rounded-lg bg-gray-700 px-4 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirm: !showPassword.confirm,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              >
                {showPassword.confirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg--500 rounded-lg px-4 py-2 text-white transition hover:bg-blue-600"
              disabled={!password.current || !password.new || !password.confirm}
            >
              Update Password
            </button>
          </div>
        </form>
      </SectionContainer>

      {/* Subscription Section */}
      <SectionContainer>
        <SectionHeading icon={<CreditCard size={20} />} title="Berlangganan" />

        <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-900 to-blue-600 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-lg font-semibold">
              Paket {userData.subscription.plan}
            </span>
            <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-blue-600">
              AKTIF
            </span>
          </div>
          <div className="mb-2 text-sm">
            <p className="mb-1 opacity-80">
              Tagihan berikutnya: {userData.subscription.billingDate}
            </p>
            <p className="text-xl font-bold">
              {userData.subscription.price}/bulan
            </p>
          </div>
          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {userData.subscription.features.map((feature, i) => (
                <span
                  key={i}
                  className="flex items-center rounded-full bg-white/20 px-2 py-1 text-xs"
                >
                  <Check size={12} className="mr-1" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="rounded-lg bg-gray-700 px-5 py-2 transition hover:bg-gray-600">
            Ubah Paket Berlangganan
          </button>
        </div>
      </SectionContainer>

      {/* Display & Language Settings */}
      <SectionContainer>
        <SectionHeading icon={<Globe size={20} />} title="Tampilan & Bahasa" />

        <div className="space-y-3">
          <SettingsItem
            title="Mode Gelap"
            description="Tampilan gelap untuk kenyamanan mata"
            action={
              <ToggleSwitch isChecked={isDarkMode} onChange={toggleDarkMode} />
            }
          />

          <SettingsItem
            title="Putar Otomatis"
            description="Putar episode selanjutnya secara otomatis"
            action={
              <ToggleSwitch
                isChecked={preferences.autoplay}
                onChange={toggleAutoplay}
              />
            }
          />

          <SettingsItem
            title="Bahasa Aplikasi"
            description={preferences.language}
            action={
              <select
                value={preferences.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="rounded-lg bg-gray-700 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            }
          />

          <SettingsItem
            title="Bahasa Subtitle"
            description={preferences.subtitleLanguage}
            action={
              <select
                value={preferences.subtitleLanguage}
                onChange={(e) => handleSubtitleLanguageChange(e.target.value)}
                className="rounded-lg bg-gray-700 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            }
            isLast={true}
          />
        </div>
      </SectionContainer>

      {/* Notification Settings */}
      <SectionContainer>
        <SectionHeading icon={<Bell size={20} />} title="Notifikasi" />

        <div className="space-y-3">
          <SettingsItem
            title="Notifikasi Email"
            description="Terima notifikasi melalui email"
            action={
              <ToggleSwitch
                isChecked={preferences.notifications.email}
                onChange={() => toggleNotification('email')}
              />
            }
          />

          <SettingsItem
            title="Notifikasi Push"
            description="Terima notifikasi di perangkat anda"
            action={
              <ToggleSwitch
                isChecked={preferences.notifications.push}
                onChange={() => toggleNotification('push')}
              />
            }
          />

          <SettingsItem
            title="Film Baru"
            description="Notifikasi untuk film dan serial baru"
            action={
              <ToggleSwitch
                isChecked={preferences.notifications.newReleases}
                onChange={() => toggleNotification('newReleases')}
              />
            }
          />

          <SettingsItem
            title="Rekomendasi"
            description="Dapatkan rekomendasi berdasarkan tontonan anda"
            action={
              <ToggleSwitch
                isChecked={preferences.notifications.recommendations}
                onChange={() => toggleNotification('recommendations')}
              />
            }
            isLast={true}
          />
        </div>
      </SectionContainer>

      {/* Content Preferences */}
      <SectionContainer>
        <SectionHeading icon={<Film size={20} />} title="Preferensi Konten" />

        <div className="mb-6">
          <h3 className="mb-3 font-medium text-white">Genre Favorit</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreToggle(genre)}
                className={`rounded-full px-3 py-1 text-sm transition ${
                  data?.data?.preferences?.favoriteGenres?.includes(genre.name)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-medium text-white">Level Kedewasaan</h3>
          <div className="flex flex-wrap gap-3">
            {['Semua Umur', '13+', '18+', '21+'].map((level) => (
              <button
                key={level}
                className={`rounded-lg px-4 py-2 text-sm transition ${
                  data?.data?.preferences?.maturityRating === level
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Help Center */}
      <SectionContainer>
        <SectionHeading icon={<HelpCircle size={20} />} title="Pusat Bantuan" />

        <div className="space-y-3">
          <div className="cursor-pointer rounded-lg bg-gray-700 transition hover:bg-gray-600">
            <Link href="/help/faq" legacyBehavior>
              <a className="flex items-center justify-between p-4">
                <span>FAQ</span>
                <ChevronRight size={18} className="text-gray-400" />
              </a>
            </Link>
          </div>

          <div className="cursor-pointer rounded-lg bg-gray-700 transition hover:bg-gray-600">
            <Link href="/help/contact" legacyBehavior>
              <a className="flex items-center justify-between p-4">
                <span>Hubungi Kami</span>
                <ChevronRight size={18} className="text-gray-400" />
              </a>
            </Link>
          </div>

          <div className="cursor-pointer rounded-lg bg-gray-700 transition hover:bg-gray-600">
            <Link href="/help/terms" legacyBehavior>
              <a className="flex items-center justify-between p-4">
                <span>Syarat dan Ketentuan</span>
                <ChevronRight size={18} className="text-gray-400" />
              </a>
            </Link>
          </div>

          <div className="cursor-pointer rounded-lg bg-gray-700 transition hover:bg-gray-600">
            <Link href="/help/privacy" legacyBehavior>
              <a className="flex items-center justify-between p-4">
                <span>Kebijakan Privasi</span>
                <ChevronRight size={18} className="text-gray-400" />
              </a>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </>
  );
}

// components/ui/settings.tsx

const SectionContainer = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="mb-6 rounded-lg bg-gray-800 p-6"
  >
    {children}
  </motion.div>
);

const SectionHeading = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <div className="mb-4 flex items-center space-x-2">
    <div className="text-blue-500">{icon}</div>
    <h2 className="text-lg font-semibold">{title}</h2>
  </div>
);

const ToggleSwitch = ({
  isChecked,
  onChange,
}: {
  isChecked: boolean;
  onChange: () => void;
}) => (
  <div
    className={`relative h-6 w-12 cursor-pointer rounded-full transition-colors duration-300 ${
      isChecked ? 'bg-blue-500' : 'bg-gray-600'
    }`}
    onClick={onChange}
  >
    <motion.div
      className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow"
      animate={{ x: isChecked ? 24 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  </div>
);

const SettingsItem = ({ title, description, action, isLast = false }: any) => (
  <div
    className={`flex items-center justify-between py-3 ${
      !isLast && 'border-b border-gray-700'
    }`}
  >
    <div>
      <h3 className="font-medium text-white">{title}</h3>
      {description && <p className="text-sm text-gray-400">{description}</p>}
    </div>
    <div>{action}</div>
  </div>
);

const userData = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  avatar: '/avatar.jpg',
  phone: '+62 812 3456 7890',
  subscription: {
    plan: 'Premium',
    price: 'Rp 139.000',
    billingDate: '25 Maret 2025',
    features: ['Tanpa iklan', 'Kualitas 4K', 'Download', 'Multi-device'],
  },
  preferences: {
    language: 'Bahasa Indonesia',
    subtitleLanguage: 'Bahasa Indonesia',
    darkMode: true,
    autoplay: true,
    notifications: {
      email: true,
      push: true,
      newReleases: true,
      recommendations: true,
    },
    contentPreferences: {
      favoriteGenres: ['Sci-Fi', 'Drama', 'Action'],
      maturityLevel: '18+',
    },
  },
};

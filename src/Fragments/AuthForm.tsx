// components/AuthForm.tsx
'use client';

import { useState } from 'react';
import { Mail, Lock, User, Github, Twitter, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function AuthForm({ isLogin = true }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle form submission
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Floating Background Elements */}
        <div className="absolute -inset-20 opacity-30">
          <div className="animate-blob absolute -left-12 -top-12 h-48 w-48 rounded-full bg-purple-400 opacity-70 mix-blend-multiply blur-xl filter"></div>
          <div className="animate-blob animation-delay-2000 absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-400 opacity-70 mix-blend-multiply blur-xl filter"></div>
          <div className="animate-blob animation-delay-4000 absolute -bottom-12 left-20 h-48 w-48 rounded-full bg-pink-400 opacity-70 mix-blend-multiply blur-xl filter"></div>
        </div>

        <div className="relative rounded-2xl bg-opacity-10 p-8 shadow-lg backdrop-blur-lg">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold text-white">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h1>
            <p className="text-gray-200">
              {isLogin
                ? 'Sign in to continue to your account'
                : 'Get started with your free account'}
            </p>
          </div>

          {/* Social Login */}
          <div className="mb-8 flex gap-4">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 p-3 text-white transition-all hover:bg-white/20">
              <Github size={20} />
              <span className="hidden sm:inline">GitHub</span>
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 p-3 text-white transition-all hover:bg-white/20">
              <Twitter size={20} />
              <span className="hidden sm:inline">Google</span>
            </button>
          </div>

          <div className="mb-8 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-sm text-white/60">or continue with</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-white/60 outline-none backdrop-blur-sm transition-all focus:border-white/30 focus:ring-2 focus:ring-white/10"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                size={20}
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-white/60 outline-none backdrop-blur-sm transition-all focus:border-white/30 focus:ring-2 focus:ring-white/10"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                size={20}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-12 text-white placeholder-white/60 outline-none backdrop-blur-sm transition-all focus:border-white/30 focus:ring-2 focus:ring-white/10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-white/80"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center space-x-2 text-white/60 hover:text-white/80">
                  <input
                    type="checkbox"
                    className="rounded border-white/30 bg-white/5 focus:ring-white/10"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-white/60 transition-colors hover:text-white/80"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 py-3 font-medium text-white transition-all hover:scale-[1.01] hover:from-blue-500 hover:to-purple-600 disabled:transform-none disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Processing...</span>
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-white/60">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <Link
              href={isLogin ? '/register' : '/login'}
              className="text-white/80 underline transition-colors hover:text-white"
            >
              {isLogin ? 'Create account' : 'Sign in'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

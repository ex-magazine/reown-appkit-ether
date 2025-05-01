'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Lock, Mail, LogIn } from 'lucide-react';
import { loginUser } from '@/action/Auth';
import { useRouter } from 'next/navigation';
// import { useAuth } from "@/context/AuthContext";
import { toast } from 'sonner';
import { Metadata } from '../Metadata';

const initialState = {
  email: '',
  password: '',
  error: null,
};
export default function LoginPage() {
  const router = useRouter();
  const setIsAuthenticated = true;
  // const { setIsAuthenticated } = useAuth();
  const [formState, dispatch, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      try {
        const response = await loginUser({ email, password });

        if (response.status === 'success' && response.token) {
          // localStorage.setItem("user", JSON.stringify(response.token));
          document.cookie = `user=${response.token}; path=/; max-age=604800; SameSite=Lax`; // Set cookie dengan durasi 1 minggu jam
          // setIsAuthenticated(true);
          toast(response.message);

          router.push('/'); // Redirect ke dashboard atau halaman utama
          return { error: null };
        }

        // Jika gagal login, tampilkan error
        return { error: 'Invalid credentials' };
      } catch (err) {
        return {
          error:
            err instanceof Error
              ? err.message
              : 'An unexpected error occurred.',
        };
      }
    },
    initialState,
  );

  return (
    <>
      <Metadata
        seoTitle="Login"
        seoDescription="Sign in to your account to continue watching movies and TV shows."
        seoKeywords="login, movies, tv shows"
      />

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-block rounded-full bg-indigo-600 p-4">
                <LogIn className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-2 text-3xl font-bold text-white">
                Welcome Back
              </h2>
              <p className="text-gray-400">Sign in to continue watching</p>
            </div>

            {formState?.error && (
              <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-500">
                {formState.error}
              </div>
            )}

            <form action={dispatch} className="space-y-6">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-300"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full rounded-lg border border-gray-800 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-300"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="w-full rounded-lg border border-gray-800 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full transform rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition duration-200 ease-in-out hover:scale-[1.02] hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

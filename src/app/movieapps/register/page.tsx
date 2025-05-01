'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, User, UserPlus } from 'lucide-react';
import { registerUser } from '@/action/Auth';
import { toast } from 'sonner';
// import { useAuth } from "@/context/AuthContext";
import { Metadata } from '../Metadata';

type State = {
  error: string | null;
  success: boolean;
};

export default function RegisterPage() {
  // const { setIsAuthenticated } = useAuth();
  const isAuthenticated = true;
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState<State, FormData>(
    async (prevState, formData) => {
      const rawFormData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };

      try {
        await registerUser(rawFormData);
        // setIsAuthenticated(true);
        return { error: null, success: true };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : 'Registration failed',
          success: false,
        };
      }
    },
    { error: null, success: false },
  );

  useEffect(() => {
    if (state.success) {
      toast('Registration Successful');
      router.push('/');
    } else if (state.error) {
      toast('Registration Failed');
    }
  }, [state.success, state.error, router]);

  return (
    <>
      <Metadata
        seoTitle="Register"
        seoDescription="Create an account to start watching movies and TV shows."
        seoKeywords="register account for watch movies and tv shows"
      />

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-block rounded-full bg-purple-600 p-4">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-2 text-3xl font-bold text-white">
                Create Account
              </h2>
              <p className="text-gray-400">Join us and start watching</p>
            </div>

            {state.error && (
              <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-500">
                {state.error}
              </div>
            )}

            <form action={dispatch} className="space-y-6">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-300"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-800 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

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
                    required
                    className="w-full rounded-lg border border-gray-800 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Enter your email"
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
                    required
                    className="w-full rounded-lg border border-gray-800 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full transform rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition duration-200 ease-in-out hover:scale-[1.02] hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-purple-400 hover:text-purple-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

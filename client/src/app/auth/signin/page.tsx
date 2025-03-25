'use client';

import React from 'react';
import { useAuthStore } from '@/state/auth-store';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSignIn = () => {
    const dummyToken = 'dummy-jwt-token'
    login(dummyToken);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <button
          onClick={handleSignIn}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignIn;
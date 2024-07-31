"use client";

import { signIn, getProviders } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignIn = ({ providers }) => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 ">
      <div className="w-full max-w-md p-12 space-y-12 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-orange-600">Sign In</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:gray-100 bg-gray-50"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 outline_btn bg-primary-orange"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

SignIn.getInitialProps = async () => {
  const providers = await getProviders();
  return { providers };
};

export default SignIn;

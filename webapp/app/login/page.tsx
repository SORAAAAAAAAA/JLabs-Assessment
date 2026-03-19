"use client";

import { useActionState, useState } from "react";
import { login } from "../actions/auth";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, { error: "" });
  
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("Password123!");

  const setDemoUser = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <div className="w-full max-w-md px-6">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">Welcome Back!</h1>
        <p className="text-base text-[#666] mb-6">Please sign in to continue.</p>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-sm font-medium text-gray-600 mb-3">Quick Login (Seeded Users):</p>
          <div className="flex flex-wrap gap-2">
            <button 
              type="button" 
              onClick={() => setDemoUser('john@example.com', 'Password123!')} 
              className="text-xs font-medium text-[var(--color-primary)] bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-md px-3 py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              John Doe
            </button>
            <button 
              type="button" 
              onClick={() => setDemoUser('jane@example.com', 'Password123!')} 
              className="text-xs font-medium text-[var(--color-primary)] bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-md px-3 py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              Jane Smith
            </button>
            <button 
              type="button" 
              onClick={() => setDemoUser('bob@example.com', 'Password123!')} 
              className="text-xs font-medium text-[var(--color-primary)] bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-md px-3 py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              Bob Johnson
            </button>
          </div>
        </div>

        {state?.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {state.error}
          </div>
        )}

        <form action={formAction} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full h-[50px] px-4 bg-[var(--color-card-bg)] border border-[#ddd] rounded-lg text-base outline-none focus:border-[var(--color-primary)]"
            required
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-[50px] px-4 bg-[var(--color-card-bg)] border border-[#ddd] rounded-lg text-base outline-none focus:border-[var(--color-primary)]"
            required
          />

          <button
            type="submit"
            disabled={isPending}
            className="mt-4 w-full h-[50px] bg-[var(--color-primary)] text-white font-bold rounded-lg flex items-center justify-center disabled:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 flex justify-center text-sm">
          <span className="text-[#666]">Don&apos;t have an account? </span>
          <Link href="/signup" className="text-[var(--color-primary)] font-bold ml-1 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      router.push("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-sans selection:bg-[#B8965A]/20">
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[420px]"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif italic text-4xl text-[#141210] mb-4">
              Welcome back
            </h1>
            <p className="font-sans font-light text-sm text-[#9A8C82] tracking-wide">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-6">
              {/* Email */}
              <div className="flex flex-col border-b-[1px] border-[#B8965A]/20 pb-2 relative group">
                <label className="font-sans font-light text-[0.65rem] text-[#9A8C82] uppercase tracking-[0.15em] mb-1 group-focus-within:text-[#B8965A] transition-colors">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-sans font-normal text-[1rem] text-[#141210] bg-transparent outline-none w-full"
                  placeholder="name@example.com"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col border-b-[1px] border-[#B8965A]/20 pb-2 relative group">
                <label className="flex justify-between items-center font-sans font-light text-[0.65rem] text-[#9A8C82] uppercase tracking-[0.15em] mb-1 group-focus-within:text-[#B8965A] transition-colors">
                  Password
                  <Link
                    href="#"
                    className="normal-case tracking-normal hover:text-[#B8965A] transition-colors"
                  >
                    Forgot?
                  </Link>
                </label>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="font-sans font-normal text-[1rem] text-[#141210] bg-transparent outline-none w-full"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#9A8C82] hover:text-[#141210] transition-colors ml-2"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#141210] text-[#FFFFFF] font-sans font-medium hover:bg-[#B8965A] transition-colors duration-300 group"
            >
              Sign In
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-12 text-center border-t-[1px] border-[#B8965A]/10 pt-8">
            <p className="font-sans font-light text-sm text-[#9A8C82]">
              New to Scentara?{" "}
              <Link
                href="/signup"
                className="text-[#141210] border-b border-[#141210] hover:text-[#B8965A] hover:border-[#B8965A] transition-colors pb-[1px]"
              >
                Create Account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

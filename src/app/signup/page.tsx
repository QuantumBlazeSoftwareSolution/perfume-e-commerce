"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      router.push("/profile");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-sans selection:bg-[#B8965A]/20">
      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* Back navigation */}
        <Link
          href="/login"
          className="absolute top-12 left-6 md:left-12 flex items-center gap-2 text-[#9A8C82] hover:text-[#141210] transition-colors font-sans text-xs tracking-widest uppercase group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[460px] mt-12 md:mt-0"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif italic text-4xl text-[#141210] mb-4">
              Join Scentara
            </h1>
            <p className="font-sans font-light text-sm text-[#9A8C82] tracking-wide">
              Create an account to track orders and save your favorites.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-8">
            <div className="space-y-6">
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col border-b-[1px] border-[#B8965A]/20 pb-2 relative group">
                  <label className="font-sans font-light text-[0.65rem] text-[#9A8C82] uppercase tracking-[0.15em] mb-1 group-focus-within:text-[#B8965A] transition-colors">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="font-sans font-normal text-[1rem] text-[#141210] bg-transparent outline-none w-full"
                  />
                </div>
                <div className="flex flex-col border-b-[1px] border-[#B8965A]/20 pb-2 relative group">
                  <label className="font-sans font-light text-[0.65rem] text-[#9A8C82] uppercase tracking-[0.15em] mb-1 group-focus-within:text-[#B8965A] transition-colors">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="font-sans font-normal text-[1rem] text-[#141210] bg-transparent outline-none w-full"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col border-b-[1px] border-[#B8965A]/20 pb-2 relative group">
                <label className="font-sans font-light text-[0.65rem] text-[#9A8C82] uppercase tracking-[0.15em] mb-1 group-focus-within:text-[#B8965A] transition-colors">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="font-sans font-normal text-[1rem] text-[#141210] bg-transparent outline-none w-full"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col border-b-[1px] border-[#B8965A]/20 pb-2 relative group">
                <label className="font-sans font-light text-[0.65rem] text-[#9A8C82] uppercase tracking-[0.15em] mb-1 group-focus-within:text-[#B8965A] transition-colors">
                  Password
                </label>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="font-sans font-normal text-[1rem] text-[#141210] bg-transparent outline-none w-full"
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
              Create Account
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-12 text-center border-t-[1px] border-[#B8965A]/10 pt-8">
            <p className="font-sans font-light text-sm text-[#9A8C82]">
              By creating an account, you agree to our{" "}
              <Link href="#" className="hover:text-[#B8965A] transition-colors border-b border-[#9A8C82]/30 hover:border-[#B8965A] pb-[1px]">
                Terms
              </Link>
              {" "}and{" "}
              <Link href="#" className="hover:text-[#B8965A] transition-colors border-b border-[#9A8C82]/30 hover:border-[#B8965A] pb-[1px]">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

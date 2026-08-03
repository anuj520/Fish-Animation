"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* 1. FIXED HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-2.5 text-xl sm:text-2xl font-bold tracking-tight group"
        >
          <div className="relative w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Academy X Logo"
              fill
              priority
              sizes="(max-width: 640px) 28px, 36px"
              className="object-contain"
            />
          </div>
          <span className="text-white tracking-wide transition-opacity group-hover:opacity-90">
            Academy X
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 rounded-full bg-black/20 px-6 py-2.5 backdrop-blur-lg border border-white/15 text-sm font-medium shadow-lg">
          <button className="flex items-center gap-1 hover:text-gray-200 transition">
            Product <ChevronDown className="w-4 h-4 opacity-70" />
          </button>
          <button className="flex items-center gap-1 hover:text-gray-200 transition">
            Use Cases <ChevronDown className="w-4 h-4 opacity-70" />
          </button>
          <button className="flex items-center gap-1 hover:text-gray-200 transition">
            Resources <ChevronDown className="w-4 h-4 opacity-70" />
          </button>
          <Link href="#pricing" className="hover:text-gray-200 transition">
            Pricing
          </Link>
        </nav>

        {/* Action Buttons & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
          <Link
            href="/login"
            className="hover:text-gray-200 transition hidden sm:inline-block"
          >
            Login
          </Link>
          <button className="rounded-full bg-black/10 px-3 py-1.5 sm:px-4 sm:py-2 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 transition hidden xs:block">
            Talk to Us
          </button>

          {/* Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden cursor-pointer  p-2 rounded-full bg-black/20 border border-white/15 text-white backdrop-blur-md focus:outline-none"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* FULLSCREEN MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl px-6 py-6 flex flex-col justify-between md:hidden overflow-y-auto animate-in fade-in duration-200">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 text-xl font-bold tracking-tight"
              >
                <div className="relative w-7 h-7 flex-shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Academy X Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-white tracking-wide">Academy X</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4 mt-6">
              <button className="flex items-center justify-between text-left text-lg font-medium py-3 border-b border-white/10 hover:text-gray-300">
                Product <ChevronDown className="w-5 h-5 opacity-70" />
              </button>
              <button className="flex items-center justify-between text-left text-lg font-medium py-3 border-b border-white/10 hover:text-gray-300">
                Use Cases <ChevronDown className="w-5 h-5 opacity-70" />
              </button>
              <button className="flex items-center justify-between text-left text-lg font-medium py-3 border-b border-white/10 hover:text-gray-300">
                Resources <ChevronDown className="w-5 h-5 opacity-70" />
              </button>
              <Link 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium py-3 border-b border-white/10 hover:text-gray-300"
              >
                Pricing
              </Link>
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium py-3 border-b border-white/10 hover:text-gray-300"
              >
                Login
              </Link>
            </nav>
          </div>

          {/* Bottom CTA inside Mobile Menu */}
          <div className="pt-6 pb-4">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-full bg-white text-black py-3.5 font-semibold text-base hover:bg-gray-200 transition shadow-lg"
            >
              Talk to Us
            </button>
          </div>
        </div>
      )}
    </>
  );
}
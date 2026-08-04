"use client";

import React from 'react'
import CircularGallery from './cardSwap'

const Section6 = () => {
  return (
    <div
      id="section-6"
      // Mobile par height ko compact aur responsive kar diya hai
      className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[550px] overflow-hidden py-4 md:py-0"
    >
      <CircularGallery
        bend={1}
        textColor="#ffffff"
        borderRadius={0.05}
        scrollEase={0.05}
        fontUrl=""
        font="bold 24px Orbitron"
        scrollSpeed={2}
      />
    </div>
  )
}

export default Section6
import React from 'react'
import CircularGallery from './cardSwap'

const Section6 = () => {
  return (
    <div
      id="section-6"
      className="relative w-full h-[280px] sm:h-[360px] md:h-[450px] lg:h-[550px] overflow-hidden"
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
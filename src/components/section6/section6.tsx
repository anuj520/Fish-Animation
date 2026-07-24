import React from 'react'
import CircularGallery from './cardSwap'

const Section6 = () => {
return (

<div id="section-6" style={{ height: '600px', position: 'relative' }}>
  <CircularGallery
    bend={1}
    textColor="#ffffff"
    borderRadius={0.05}
    scrollEase={0.05}
    // Optionally load a custom font for the labels.
    // Accepts a stylesheet URL (e.g. Google Fonts) or a direct font file.
    fontUrl=""
    font="bold 30px Orbitron"
    scrollSpeed={2}
/>s
</div>
  )
}

export default Section6

import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"

gsap.registerPlugin(ScrollTrigger)

const ScrollSmoother = () => {
 useEffect(() => {
    // Lenis create
    const lenis = new Lenis({
  lerp: 0.05,

  orientation: "vertical",
  gestureOrientation: "vertical",

  smoothWheel: true,
  wheelMultiplier: 1,

  smoothTouch: true,
  touchMultiplier: 2
    })

    // Lenis scroll ko GSAP se sync karo
    lenis.on("scroll", ScrollTrigger.update)

    // GSAP ticker ke through Lenis run
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // lag remove
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}

export default ScrollSmoother

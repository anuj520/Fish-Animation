"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface ScrollContextType {
  isScrolled: boolean;
  scrollY: number;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    // 1. Browser ki automatic scroll restoration disable karke top par bhej do
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const screenWidth = window.innerWidth;

      setScrollY(currentScroll);

      // Screen size ke mutabiq dynamic threshold condition
      if (screenWidth < 768) {
        // Mobile view
        setIsScrolled(currentScroll > 350);
      } else if (screenWidth < 1024) {
        // Tablet view
        setIsScrolled(currentScroll > 600);
      } else {
        // PC / Desktop view
        setIsScrolled(currentScroll > 800);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ isScrolled, scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = (): ScrollContextType => {
  const context = useContext(ScrollContext);

  if (!context) {
    throw new Error("useScroll must be used inside ScrollProvider");
  }

  return context;
};
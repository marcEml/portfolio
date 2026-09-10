"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import { usePreferences } from "@/contexts/PreferencesContext";
import Image from "next/image";

const INTRO_DURATION_MS = 2800;
const FALLBACK_DURATION_MS = 4200;
const LOADER_SESSION_KEY = "portfolio-intro-viewed";

export function PortfolioLoader() {
  const { language } = usePreferences();
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isSessionChecked, setIsSessionChecked] = useState(false);

  const dismiss = useCallback(() => {
    try {
      window.sessionStorage.setItem(LOADER_SESSION_KEY, "true");
    } catch {
      // The intro still remains usable if storage is unavailable.
    }
    setIsVisible(false);
  }, []);

  useLayoutEffect(() => {
    try {
      if (window.sessionStorage.getItem(LOADER_SESSION_KEY) === "true") {
        setIsVisible(false);
      }
    } catch {
      // Private browsing can block storage; show the intro normally in that case.
    } finally {
      setIsSessionChecked(true);
    }
  }, []);

  useEffect(() => {
    if (!isSessionChecked || !isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSessionChecked, isVisible]);

  useEffect(() => {
    if (!isSessionChecked || !isVisible) return;

    if (reduceMotion === true) {
      const reducedMotionTimer = window.setTimeout(dismiss, 250);
      return () => window.clearTimeout(reducedMotionTimer);
    }

    const fallbackTimer = window.setTimeout(dismiss, FALLBACK_DURATION_MS);
    return () => window.clearTimeout(fallbackTimer);
  }, [dismiss, isSessionChecked, isVisible, reduceMotion]);

  useEffect(() => {
    if (!isSessionChecked || !isVisible || !isVideoReady || reduceMotion === true) return;

    const introTimer = window.setTimeout(dismiss, INTRO_DURATION_MS);
    return () => window.clearTimeout(introTimer);
  }, [dismiss, isSessionChecked, isVideoReady, isVisible, reduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="portfolio-loader"
          initial={false}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#0b0908] text-[#f8efe2]"
          role="status"
          aria-label={language === "fr" ? "Chargement du portfolio" : "Loading the portfolio"}
        >
          <video
            src="/assets/video/lajeunefillealaperle-loader.mp4"
            poster="/assets/video/lajeunefillealaperle-loader-poster.webp"
            autoPlay={reduceMotion !== true}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onError={dismiss}
            onCanPlay={() => setIsVideoReady(true)}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* <img
            alt="lajeunefillealaperle"
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={"assets/video/lajeunefillealaperle.gif"}
          /> */}

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(12, 12, 12, 0.08) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 62%)",
            }}
          />

          <div className="relative flex h-full flex-col justify-between p-6 sm:p-10 lg:p-14">
            <header className="flex items-start justify-between gap-6 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#f8efe2]/70 sm:text-xs">
              <p>
                Portfolio <span className="text-[#d3a269]">/ 2026</span>
              </p>
              <button
                type="button"
                onClick={dismiss}
                className="border border-[#f8efe2]/35 bg-black/15 px-3 py-2 uppercase tracking-[0.18em] text-[#f8efe2] backdrop-blur-sm transition hover:border-[#d3a269] hover:text-[#d3a269] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d3a269]"
              >
                {language === "fr" ? "Passer" : "Skip"}
              </button>
            </header>

            <div className="grid items-end gap-8 sm:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-[#d3a269] sm:text-xs">
                  {language === "fr" ? "Ouverture du portfolio" : "Opening portfolio"}
                </p>
                <p className="mt-3 max-w-4xl font-display text-[clamp(2rem,5.8vw,5.75rem)] font-bold leading-[0.92] tracking-tight text-[#f8efe2]">
                  Yao Marc-Emmanuel
                  <br />
                  Brou
                </p>
              </div>

              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#f8efe2]/65 sm:pb-2 sm:text-xs">
                {isVideoReady
                  ? language === "fr"
                    ? "Signal acquis"
                    : "Signal acquired"
                  : language === "fr"
                    ? "Initialisation"
                    : "Initializing"}
              </p>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
            <motion.div
              className="h-full origin-left bg-[#d3a269]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: reduceMotion === true ? 0.1 : INTRO_DURATION_MS / 1000,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PortfolioLoader;

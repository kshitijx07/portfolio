/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 🕷️ ADVANCED SCROLL ORCHESTRATION & HIGH-IMPACT PARALLAX ENGINE (lib/scroll-engine.ts)
 * ──────────────────────────────────────────────────────────────────────────────
 * Production-grade, high-impact scroll architecture combining:
 * 1. Lenis Smooth Momentum Scrolling + GSAP ScrollTrigger Ticker Bridge.
 * 2. Bold Multi-Layer Spatial Parallax & 3D Perspective Depth.
 * 3. Dramatic 3D Blur-to-Focus Card Stagger Reveal Matrix.
 * 4. Tactile Velocity-Sensitive Elastic Distortion & Inertial Return Physics.
 * 5. Single-Frame Telemetry Dispatches to HUD & WebGL Canvas Layers.
 * ══════════════════════════════════════════════════════════════════════════════
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import {
  subscribeScroll,
  ScrollSnapshot,
  prefersReducedMotion,
  isLowPowerDevice,
} from "./bus";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. KINETIC SCROLL ENGINE CONTROLLER CLASS
// ─────────────────────────────────────────────────────────────────────────────

export class ScrollEngineController {
  private lenis: Lenis | null = null;
  private ctx: gsap.Context | null = null;
  private isDestroyed = false;
  private unsubs: (() => void)[] = [];

  constructor(lenis?: Lenis | null) {
    if (lenis) this.setLenis(lenis);
  }

  /**
   * Set or update the active Lenis smooth scroll instance.
   */
  public setLenis(lenis: Lenis): void {
    this.lenis = lenis;
    if (typeof window === "undefined") return;

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const ticker = (time: number) => {
      if (!this.isDestroyed && this.lenis) {
        this.lenis.raf(time * 1000);
      }
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    this.unsubs.push(() => {
      gsap.ticker.remove(ticker);
    });
  }

  /**
   * Initialize bold, impactful, and highly noticeable master scroll choreography.
   */
  public initMasterChoreography(scope?: HTMLElement | null): () => void {
    if (typeof window === "undefined") return () => {};

    const isReduced = prefersReducedMotion();
    const isLowEnd = isLowPowerDevice();

    this.ctx = gsap.context(() => {
      // ── A. HERO VIEWPORT: HIGH-IMPACT RECESSED PARALLAX ─────────────
      gsap.to(".hero-parallax-content", {
        y: isReduced ? 0 : -140,
        scale: isReduced ? 1 : 0.94,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // ── B. ABOUT SECTION: BOLD 3D FLOATING PORTRAIT & TEXT ──────────
      gsap.to(".about-portrait-card", {
        y: isReduced ? 0 : -85,
        rotateZ: isReduced ? 0 : -1.5,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // ── C. EXPERIENCE SECTION: DRAMATIC MULTI-SPEED DEPTH ───────────
      // Left Card: Enterprise Hybrid (Colgate-Palmolive) - Drifts at Depth Rate 1
      gsap.to(".exp-card-left", {
        y: isReduced ? 0 : -65,
        rotateX: isReduced ? 0 : 2,
        ease: "none",
        scrollTrigger: {
          trigger: "#experience",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Right Card: Remote Sprint (Campus Credential) - Drifts at Depth Rate 2 (Twice as fast!)
      gsap.to(".exp-card-right", {
        y: isReduced ? 0 : -135,
        rotateX: isReduced ? 0 : -2,
        ease: "none",
        scrollTrigger: {
          trigger: "#experience",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // ── D. TECHNICAL SKILLS MATRIX: 3-TIER COLUMN PARALLAX ──────────
      if (!isReduced) {
        gsap.to(".skill-card-odd", {
          y: -55,
          ease: "none",
          scrollTrigger: {
            trigger: "#skills",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".skill-card-even", {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: "#skills",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }

      // ── E. EDUCATION SECTION: 3-TIER CASCADE PARALLAX ────────────────
      if (!isReduced) {
        gsap.to(".edu-card-1", {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: "#education",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".edu-card-2", {
          y: -95,
          ease: "none",
          scrollTrigger: {
            trigger: "#education",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".edu-card-3", {
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: "#education",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }

      // ── F. DRAMATIC SCROLL-TRIGGERED 3D BLUR & SCALE REVEALS ─────────
      const revealCards = gsap.utils.toArray<HTMLElement>(".scroll-reveal-card");
      revealCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: isReduced ? 0 : 70,
            rotateX: isReduced ? 0 : 6,
            filter: isReduced || isLowEnd ? "none" : "blur(10px)",
            scale: isReduced ? 1 : 0.93,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: isLowEnd ? 0.6 : 0.9,
            delay: (index % 3) * 0.09,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ── G. TACTILE SCROLL VELOCITY SKEW MOMENTUM ────────────────────
      if (!isReduced && !isLowEnd) {
        this.initVelocitySkewChoreography();
      }
    }, scope || undefined);

    return () => {
      this.destroy();
    };
  }

  /**
   * Velocity Skew Physics: Tactile skew distortion proportional to scroll momentum.
   */
  private initVelocitySkewChoreography(): void {
    let proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter(".velocity-skew-target", "skewY", "deg");
    const clamp = gsap.utils.clamp(-3.2, 3.2);

    const unsub = subscribeScroll((state: ScrollSnapshot) => {
      const v = state.velocity;
      const targetSkew = clamp(v * -0.0045);

      gsap.to(proxy, {
        skew: targetSkew,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: () => {
          skewSetter(proxy.skew);
        },
        onComplete: () => {
          gsap.to(proxy, {
            skew: 0,
            duration: 0.45,
            ease: "elastic.out(1, 0.4)",
            onUpdate: () => skewSetter(proxy.skew),
          });
        },
      });
    });

    this.unsubs.push(unsub);
  }

  /**
   * Clean up all GSAP timelines and observers.
   */
  public destroy(): void {
    this.isDestroyed = true;
    this.ctx?.revert();
    this.ctx = null;
    this.unsubs.forEach((fn) => fn());
    this.unsubs = [];
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }
}

let globalScrollEngine: ScrollEngineController | null = null;

export function getScrollEngine(): ScrollEngineController {
  if (!globalScrollEngine) {
    globalScrollEngine = new ScrollEngineController();
  }
  return globalScrollEngine;
}

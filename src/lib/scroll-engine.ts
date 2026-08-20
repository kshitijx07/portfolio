/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 🕷️ ADVANCED SCROLL ORCHESTRATION & DYNAMIC IN/OUT ENGINE (lib/scroll-engine.ts)
 * ──────────────────────────────────────────────────────────────────────────────
 * Production-grade, high-performance scroll architecture combining:
 * 1. Lenis Smooth Momentum Scrolling + GSAP ScrollTrigger Ticker Bridge.
 * 2. Seamless Dynamic In/Out Section Transition Cascades.
 * 3. Multi-Layer Spatial Parallax & Perspective Depth without Layout Overlap.
 * 4. Velocity-Sensitive Elastic Distortion & Inertial Return Physics.
 * 5. Scroll-Triggered Blur-to-Focus Card Stagger Reveal Matrix.
 * 6. Single-Frame Telemetry Dispatches to HUD & WebGL Canvas Layers.
 * ══════════════════════════════════════════════════════════════════════════════
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import {
  getScrollSnapshot,
  subscribeScroll,
  ScrollSnapshot,
  prefersReducedMotion,
  isLowPowerDevice,
} from "./bus";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. SCROLL ENGINE CONFIGURATION & INTERFACES
// ─────────────────────────────────────────────────────────────────────────────

export interface SectionTelemetry {
  id: string;
  index: number;
  progress: number;
  isActive: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. KINETIC SCROLL ENGINE CONTROLLER CLASS
// ─────────────────────────────────────────────────────────────────────────────

export class ScrollEngineController {
  private lenis: Lenis | null = null;
  private ctx: gsap.Context | null = null;
  private isDestroyed = false;
  private unsubs: (() => void)[] = [];

  // Registered section identifiers for active section tracking
  private readonly sectionIds = [
    "home",
    "about",
    "experience",
    "projects",
    "skills",
    "education",
    "contact",
  ];

  constructor(lenis?: Lenis | null) {
    if (lenis) this.setLenis(lenis);
  }

  /**
   * Set or update the active Lenis smooth scroll instance.
   */
  public setLenis(lenis: Lenis): void {
    this.lenis = lenis;
    if (typeof window === "undefined") return;

    // Direct GSAP ScrollTrigger update link
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // High-performance ticker link
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
   * Initialize all master scroll choreography: Parallax, Reveals, In/Out transitions & Velocity Skew.
   */
  public initMasterChoreography(scope?: HTMLElement | null): () => void {
    if (typeof window === "undefined") return () => {};

    const isReduced = prefersReducedMotion();
    const isLowEnd = isLowPowerDevice();

    this.ctx = gsap.context(() => {
      // ── A. HERO VIEWPORT DYNAMIC IN/OUT PARALLAX ────────────────────
      gsap.to(".hero-parallax-content", {
        yPercent: isReduced ? 0 : -24,
        opacity: 0.75,
        scale: isReduced ? 1 : 0.98,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // ── B. ABOUT SECTION DYNAMIC IN/OUT TRANSITION ──────────────────
      gsap.fromTo(
        "#about .about-content-wrapper",
        {
          opacity: isReduced ? 1 : 0.88,
          y: isReduced ? 0 : 30,
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top 85%",
            end: "top 30%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );

      // About Portrait Card Smooth Parallax Glide (Bounded to avoid collisions)
      gsap.to(".about-portrait-card", {
        y: isReduced ? 0 : -35,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          end: "bottom 25%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // ── C. EXPERIENCE SECTION MULTI-LAYER SPATIAL DEPTH ────────────
      // Left Card: Enterprise Hybrid (Colgate-Palmolive)
      gsap.to(".exp-card-left", {
        y: isReduced ? 0 : -25,
        ease: "none",
        scrollTrigger: {
          trigger: "#experience",
          start: "top 75%",
          end: "bottom 25%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Right Card: Remote Sprint Delivery (Campus Credential)
      gsap.to(".exp-card-right", {
        y: isReduced ? 0 : -50,
        ease: "none",
        scrollTrigger: {
          trigger: "#experience",
          start: "top 75%",
          end: "bottom 25%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // ── D. PROJECTS SECTION STAGGERED PARALLAX DEPTH ───────────────
      if (!isReduced) {
        gsap.to(".project-card-col-0", {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: "#projects",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".project-card-col-1", {
          y: -45,
          ease: "none",
          scrollTrigger: {
            trigger: "#projects",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
      }

      // ── E. TECHNICAL SKILLS MATRIX ALTERNATING STAGGER ─────────────
      if (!isReduced) {
        gsap.to(".skill-card-odd", {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: "#skills",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".skill-card-even", {
          y: -42,
          ease: "none",
          scrollTrigger: {
            trigger: "#skills",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
      }

      // ── F. EDUCATION SECTION 3-TIER CASCADE PARALLAX ────────────────
      if (!isReduced) {
        gsap.to(".edu-card-1", {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: "#education",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".edu-card-2", {
          y: -36,
          ease: "none",
          scrollTrigger: {
            trigger: "#education",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".edu-card-3", {
          y: -54,
          ease: "none",
          scrollTrigger: {
            trigger: "#education",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }

      // ── G. SCROLL-TRIGGERED REVEALS (Progressive Blur-to-Focus) ─────
      const revealCards = gsap.utils.toArray<HTMLElement>(".scroll-reveal-card");
      revealCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: isReduced ? 0 : 40,
            filter: isReduced || isLowEnd ? "none" : "blur(6px)",
            scale: isReduced ? 1 : 0.975,
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: isLowEnd ? 0.55 : 0.75,
            delay: (index % 3) * 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ── H. SECTION HEADERS SUBTLE IN-TRANSITION ─────────────────────
      const sectionHeaders = gsap.utils.toArray<HTMLElement>(".section-header-reveal");
      sectionHeaders.forEach((header) => {
        gsap.fromTo(
          header,
          {
            opacity: 0,
            y: isReduced ? 0 : 25,
            filter: isReduced || isLowEnd ? "none" : "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ── I. SCROLL VELOCITY SKEW EFFECT (Modern Elasticity) ──────────
      if (!isReduced && !isLowEnd) {
        this.initVelocitySkewChoreography();
      }
    }, scope || undefined);

    return () => {
      this.destroy();
    };
  }

  /**
   * Velocity Skew Physics: Gently tilts cards during fast scroll motion,
   * returning elastically to 0deg on deceleration.
   */
  private initVelocitySkewChoreography(): void {
    let proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter(".velocity-skew-target", "skewY", "deg");
    const clamp = gsap.utils.clamp(-2.0, 2.0);

    const unsub = subscribeScroll((state: ScrollSnapshot) => {
      const v = state.velocity;
      const targetSkew = clamp(v * -0.0028);

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
            duration: 0.35,
            ease: "elastic.out(1, 0.4)",
            onUpdate: () => skewSetter(proxy.skew),
          });
        },
      });
    });

    this.unsubs.push(unsub);
  }

  /**
   * Programmatically scroll smoothly to any section target ID.
   */
  public scrollToSection(sectionId: string, offset = 0): void {
    if (typeof document === "undefined") return;
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (this.lenis) {
      this.lenis.scrollTo(target, {
        offset,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  /**
   * Programmatically scroll smoothly to top of the page.
   */
  public scrollToTop(duration = 1.0): void {
    if (this.lenis) {
      this.lenis.scrollTo(0, { duration });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  /**
   * Clean up all GSAP timelines, observers, and listeners.
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

// ─────────────────────────────────────────────────────────────────────────────
// 3. SINGLETON ENGINE INSTANCE & REACT HOOKS
// ─────────────────────────────────────────────────────────────────────────────

let globalScrollEngine: ScrollEngineController | null = null;

export function getScrollEngine(): ScrollEngineController {
  if (!globalScrollEngine) {
    globalScrollEngine = new ScrollEngineController();
  }
  return globalScrollEngine;
}

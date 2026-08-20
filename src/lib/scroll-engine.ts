/**
 * ══════════════════════════════════════════════════════════════════════════════
 * 🕷️ ADVANCED SCROLL ORCHESTRATION & DYNAMIC IN/OUT ENGINE (lib/scroll-engine.ts)
 * ──────────────────────────────────────────────────────────────────────────────
 * Production-grade, high-performance scroll architecture combining:
 * 1. Lenis Smooth Momentum Scrolling + GSAP ScrollTrigger Ticker Bridge.
 * 2. Deep Enhanced Multi-Layer Parallax Across Sections 2 to 5.
 * 3. 3-Column Waterfall Parallax for Technical Skills Matrix.
 * 4. Staggered Dual-Column Exhibition Parallax for Production Workloads.
 * 5. Velocity-Sensitive Elastic Distortion & Inertial Return Physics.
 * 6. Scroll-Triggered Blur-to-Focus Card Stagger Reveal Matrix.
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
   * Initialize all master scroll choreography: Enhanced Parallax in 2–5, Reveals & Velocity Skew.
   */
  public initMasterChoreography(scope?: HTMLElement | null): () => void {
    if (typeof window === "undefined") return () => {};

    const isReduced = prefersReducedMotion();
    const isLowEnd = isLowPowerDevice();

    this.ctx = gsap.context(() => {
      // ── SECTION 1: HERO VIEWPORT PARALLAX ───────────────────────────
      gsap.to(".hero-parallax-content", {
        yPercent: isReduced ? 0 : -25,
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

      // ── SECTION 2: ABOUT / BIO ENHANCED PARALLAX ────────────────────
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

      // Deep 3D Portrait Card Parallax Float with Subtle Perspective
      gsap.to(".about-portrait-card", {
        y: isReduced ? 0 : -55,
        rotateZ: isReduced ? 0 : 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          end: "bottom 25%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Right-side Summary & Bio subtle counter-drift
      gsap.to(".about-bio-text", {
        y: isReduced ? 0 : -20,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          end: "bottom 25%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // ── SECTION 3: PRODUCTION EXPERIENCE ENHANCED 3D DEPTH ──────────
      // Left Card: Enterprise Hybrid (Colgate-Palmolive)
      gsap.to(".exp-card-left", {
        y: isReduced ? 0 : -45,
        rotateY: isReduced ? 0 : 1.5,
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
        y: isReduced ? 0 : -95,
        rotateY: isReduced ? 0 : -1.5,
        ease: "none",
        scrollTrigger: {
          trigger: "#experience",
          start: "top 75%",
          end: "bottom 25%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // ── SECTION 4: FEATURED PROJECTS 2X2 GALLERY PARALLAX ───────────
      if (!isReduced) {
        gsap.to(".project-card-col-0", {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: "#projects",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.75,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".project-card-col-1", {
          y: -95,
          ease: "none",
          scrollTrigger: {
            trigger: "#projects",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.75,
            invalidateOnRefresh: true,
          },
        });
      }

      // ── SECTION 5: TECHNICAL SKILLS 3-COLUMN WATERFALL PARALLAX ─────
      if (!isReduced) {
        // Column 1 (DevOps & Backend)
        gsap.to(".skill-card-col-0", {
          y: -35,
          ease: "none",
          scrollTrigger: {
            trigger: "#skills",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        // Column 2 (Databases & AI Swarms)
        gsap.to(".skill-card-col-1", {
          y: -75,
          ease: "none",
          scrollTrigger: {
            trigger: "#skills",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        // Column 3 (Frontend & Core CS)
        gsap.to(".skill-card-col-2", {
          y: -115,
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

      // ── SECTION 6: EDUCATION 3-TIER CASCADE PARALLAX ────────────────
      if (!isReduced) {
        gsap.to(".edu-card-1", {
          y: -22,
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
          y: -50,
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
          y: -78,
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

      // ── SCROLL-TRIGGERED REVEALS (Progressive Blur-to-Focus) ─────────
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

      // ── SECTION HEADERS IN-TRANSITION ───────────────────────────────
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

      // ── SCROLL VELOCITY SKEW EFFECT ─────────────────────────────────
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

let globalScrollEngine: ScrollEngineController | null = null;

export function getScrollEngine(): ScrollEngineController {
  if (!globalScrollEngine) {
    globalScrollEngine = new ScrollEngineController();
  }
  return globalScrollEngine;
}

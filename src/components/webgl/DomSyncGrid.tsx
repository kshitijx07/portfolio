"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { getLenisScrollSnapshot } from "@/lib/motion/ScrollBus";
import { dotMatrixHoverVertexShader, dotMatrixHoverFragmentShader } from "@/lib/shaders/dotMatrixHover";

interface DomSyncGridProps {
  cardRefs: React.RefObject<HTMLDivElement | null>[];
  imageUrls: string[];
}

interface MutableRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

export default function DomSyncGrid({ cardRefs, imageUrls }: DomSyncGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const textureLoader = new THREE.TextureLoader();
    const textures = imageUrls.map((url) => textureLoader.load(url));

    // Fullscreen quad mesh per project card with Dot-Matrix Shader
    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const meshes: THREE.Mesh[] = [];

    imageUrls.forEach((_, idx) => {
      const uniforms = {
        map: { value: textures[idx] },
        mapHover: { value: textures[(idx + 1) % textures.length] },
        uRect: { value: new THREE.Vector4(0, 0, 0, 0) },
        uHoverRevealProgress: { value: 0.0 },
        uDotPixelSize: { value: 6.0 },
        uViewportPx: { value: new THREE.Vector2(width, height) },
      };

      const mat = new THREE.ShaderMaterial({
        vertexShader: dotMatrixHoverVertexShader,
        fragmentShader: dotMatrixHoverFragmentShader,
        uniforms,
        transparent: true,
      });

      const mesh = new THREE.Mesh(quadGeo, mat);
      scene.add(mesh);
      meshes.push(mesh);
    });

    // Cached Rects Map
    let lastScrollTop = getLenisScrollSnapshot().scrollTop;
    const cachedRects: { [key: number]: MutableRect } = {};
    let frame = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      renderer.setSize(width, height);
      meshes.forEach((m) => {
        (m.material as THREE.ShaderMaterial).uniforms.uViewportPx.value.set(width, height);
      });
    };

    window.addEventListener("resize", handleResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      const scrollTop = getLenisScrollSnapshot().scrollTop;
      const deltaY = scrollTop - lastScrollTop;
      lastScrollTop = scrollTop;

      // Scroll moves cached viewport rects without expensive DOM layout reads
      cardRefs.forEach((ref, idx) => {
        const el = ref.current;
        if (!el) return;

        let rect = cachedRects[idx];
        const nearViewport = !rect || (rect.bottom >= -100 && rect.top <= height + 100);
        const staggeredRefresh = frame % 12 === idx % 12;

        if (nearViewport || staggeredRefresh) {
          const b = el.getBoundingClientRect();
          rect = {
            top: b.top,
            bottom: b.bottom,
            left: b.left,
            right: b.right,
            width: b.width,
            height: b.height,
          };
          cachedRects[idx] = rect;
        } else if (rect) {
          rect.top -= deltaY;
          rect.bottom -= deltaY;
        }

        const mesh = meshes[idx];
        if (mesh && rect) {
          const mat = mesh.material as THREE.ShaderMaterial;
          // Normalize to 0..1 UV (WebGL UV origin is bottom-left)
          const normX = rect.left / width;
          const normY = 1.0 - (rect.top + rect.height) / height;
          const normW = rect.width / width;
          const normH = rect.height / height;

          mat.uniforms.uRect.value.set(normX, normY, normW, normH);
        }
      });

      frame++;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      quadGeo.dispose();
      meshes.forEach((m) => {
        (m.material as THREE.Material).dispose();
      });
      textures.forEach((t) => t.dispose());
    };
  }, [cardRefs, imageUrls]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
}

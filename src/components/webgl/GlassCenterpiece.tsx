"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { getPointerSnapshot } from "@/lib/motion/PointerBus";
import { getLenisScrollSnapshot } from "@/lib/motion/ScrollBus";
import {
  glassRefractionVertexShader,
  glassRefractionFragmentShader,
} from "@/lib/shaders/glassRefraction";

interface GlassCenterpieceProps {
  isDark?: boolean;
}

export default function GlassCenterpiece({ isDark = true }: GlassCenterpieceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 1. Off-screen FBO Render Target for Refraction Pass
    const fbo = new THREE.WebGLRenderTarget(canvas.clientWidth, canvas.clientHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });

    // 2. Background Scene (Falling Stickers Atlas via InstancedMesh)
    const stickerScene = new THREE.Scene();
    const stickerCount = 24;
    const stickerGeo = new THREE.PlaneGeometry(0.35, 0.35);

    // Generate dynamic CanvasTexture atlas for stickers
    const atlasCanvas = document.createElement("canvas");
    atlasCanvas.width = 512;
    atlasCanvas.height = 512;
    const actx = atlasCanvas.getContext("2d")!;

    // Draw sticker glyphs onto atlas
    actx.fillStyle = "#FF0055";
    actx.beginPath();
    actx.arc(128, 128, 80, 0, Math.PI * 2);
    actx.fill();

    actx.fillStyle = "#00D2FF";
    actx.fillRect(280, 48, 160, 160);

    actx.fillStyle = "#B7FF00";
    actx.beginPath();
    actx.moveTo(128, 300);
    actx.lineTo(208, 440);
    actx.lineTo(48, 440);
    actx.closePath();
    actx.fill();

    const atlasTexture = new THREE.CanvasTexture(atlasCanvas);
    const stickerMat = new THREE.MeshBasicMaterial({
      map: atlasTexture,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });

    const instancedStickers = new THREE.InstancedMesh(stickerGeo, stickerMat, stickerCount);
    const dummy = new THREE.Object3D();
    const particlePositions: { x: number; y: number; z: number; vy: number; rot: number; vrot: number }[] = [];

    for (let i = 0; i < stickerCount; i++) {
      const p = {
        x: (Math.random() - 0.5) * 4.5,
        y: (Math.random() - 0.5) * 3.5,
        z: -0.6 - Math.random() * 0.8,
        vy: 0.003 + Math.random() * 0.006,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.02,
      };
      particlePositions.push(p);
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.z = p.rot;
      dummy.updateMatrix();
      instancedStickers.setMatrixAt(i, dummy.matrix);
    }
    instancedStickers.instanceMatrix.needsUpdate = true;
    stickerScene.add(instancedStickers);

    // 3. Centerpiece Glass Geometry
    const glassGeometry = new THREE.TorusKnotGeometry(1.3, 0.4, 128, 32, 2, 3);
    const glassUniforms = {
      tBackground: { value: fbo.texture },
      uResolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
      uTintColor: { value: new THREE.Color(isDark ? 0x203DFF : 0x07145C) },
      uThickness: { value: 2.2 },
      uDark: { value: isDark ? 1.0 : 0.0 },
      uLightPos: { value: new THREE.Vector3(4, 9, 3) },
    };

    const glassMaterial = new THREE.ShaderMaterial({
      vertexShader: glassRefractionVertexShader,
      fragmentShader: glassRefractionFragmentShader,
      uniforms: glassUniforms,
      transparent: true,
    });

    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    scene.add(glassMesh);

    // 4. Orbiting Ring Light Follower with shortest-arc dampAngle
    let currentAngle = Math.atan2(9, 4);
    const radius = Math.hypot(4, 9);

    const dampAngle = (curr: number, target: number, lambda: number, dt: number) => {
      const shortest = Math.atan2(Math.sin(target - curr), Math.cos(target - curr));
      return curr + shortest * (1 - Math.exp(-lambda * dt));
    };

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      fbo.setSize(w, h);
      glassUniforms.uResolution.value.set(w, h);
    };

    window.addEventListener("resize", handleResize);

    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const pointer = getPointerSnapshot();
      const scroll = getLenisScrollSnapshot();

      // Update falling stickers
      for (let i = 0; i < stickerCount; i++) {
        const p = particlePositions[i];
        p.y -= p.vy;
        p.rot += p.vrot;
        if (p.y < -2.2) p.y = 2.2;

        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.z = p.rot;
        dummy.updateMatrix();
        instancedStickers.setMatrixAt(i, dummy.matrix);
      }
      instancedStickers.instanceMatrix.needsUpdate = true;

      // Update Orbiting Ring Light Position
      let targetAngle = Math.atan2(9, 4);
      if (pointer.inside) {
        const mappedX = (pointer.x - 0.5) * 8;
        const mappedY = -(pointer.y - 0.5) * 8;
        if (mappedX * mappedX + mappedY * mappedY > 1e-4) {
          targetAngle = Math.atan2(mappedY, mappedX);
        }
      }
      currentAngle = dampAngle(currentAngle, targetAngle, 6.0, dt);
      glassUniforms.uLightPos.value.set(
        radius * Math.cos(currentAngle),
        radius * Math.sin(currentAngle),
        3.5
      );

      // Rotate glass model smoothly
      glassMesh.rotation.x = Math.sin(time * 0.0008) * 0.3 + (pointer.y - 0.5) * 0.4;
      glassMesh.rotation.y = time * 0.0005 + (pointer.x - 0.5) * 0.6 + scroll.scrollTop * 0.001;

      // PASS 1: Render background scene into FBO
      renderer.setRenderTarget(fbo);
      renderer.clear();
      renderer.render(stickerScene, camera);

      // PASS 2: Render main glass model with refraction sample
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      fbo.dispose();
      glassGeometry.dispose();
      glassMaterial.dispose();
      stickerGeo.dispose();
      stickerMat.dispose();
      atlasTexture.dispose();
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[640px] h-[360px] md:h-[440px] pointer-events-auto cursor-grab active:cursor-grabbing"
    />
  );
}

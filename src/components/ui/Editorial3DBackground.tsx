"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Editorial3DBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf9f7f4, 0.025);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 18;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xfffdf9, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xc86d51, 1.5);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x2d4030, 0.8);
    dirLight2.position.set(-10, -10, 5);
    scene.add(dirLight2);

    // Group for floating 3D paper shapes
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    // Color palette materials (Scandinavian Editorial)
    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0xfffdf9,
        roughness: 0.7,
        metalness: 0.1,
        transparent: true,
        opacity: 0.8,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xc86d51,
        roughness: 0.6,
        metalness: 0.1,
        transparent: true,
        opacity: 0.65,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xd8c4b6,
        roughness: 0.8,
        metalness: 0.05,
        transparent: true,
        opacity: 0.75,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x2d4030,
        roughness: 0.7,
        metalness: 0.1,
        transparent: true,
        opacity: 0.5,
      }),
    ];

    // Create floating 3D paper card geometries & shapes
    const meshItems: { mesh: THREE.Mesh; rotSpeed: THREE.Vector3; floatSpeed: number; initialY: number }[] = [];

    // 1. Floating Paper Cards
    const cardGeo = new THREE.BoxGeometry(2.4, 3.2, 0.05);
    for (let i = 0; i < 14; i++) {
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(cardGeo, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 12 - 2
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      shapesGroup.add(mesh);

      meshItems.push({
        mesh,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.002
        ),
        floatSpeed: 0.001 + Math.random() * 0.001,
        initialY: mesh.position.y,
      });
    }

    // 2. Floating Editorial Prisms/Rings
    const torusGeo = new THREE.TorusGeometry(1.2, 0.08, 16, 50);
    const torusMesh = new THREE.Mesh(torusGeo, materials[1]);
    torusMesh.position.set(-8, 4, -4);
    shapesGroup.add(torusMesh);
    meshItems.push({
      mesh: torusMesh,
      rotSpeed: new THREE.Vector3(0.002, 0.003, 0.001),
      floatSpeed: 0.0015,
      initialY: 4,
    });

    const torusMesh2 = new THREE.Mesh(torusGeo, materials[2]);
    torusMesh2.position.set(9, -5, -3);
    shapesGroup.add(torusMesh2);
    meshItems.push({
      mesh: torusMesh2,
      rotSpeed: new THREE.Vector3(-0.002, -0.001, 0.002),
      floatSpeed: 0.0012,
      initialY: -5,
    });

    // Mouse position state
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      if (!prefersReducedMotion) {
        // Group parallax rotation
        shapesGroup.rotation.y = mouseX * 0.15;
        shapesGroup.rotation.x = -mouseY * 0.15;

        // Individual mesh animations
        meshItems.forEach((item, index) => {
          item.mesh.rotation.x += item.rotSpeed.x;
          item.mesh.rotation.y += item.rotSpeed.y;
          item.mesh.rotation.z += item.rotSpeed.z;

          // Gentle floating sine wave motion
          item.mesh.position.y = item.initialY + Math.sin(elapsedTime * 0.8 + index) * 0.4;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70 transition-opacity duration-1000 overflow-hidden"
    />
  );
}

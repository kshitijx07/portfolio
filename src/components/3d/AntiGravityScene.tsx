"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere, useBox } from "@react-three/cannon";

// Floating geometric shapes representing tech/code
function FloatingObject({ position, scale = 1, type = "box" }: { position: [number, number, number], scale?: number, type?: "box" | "sphere" | "octahedron" }) {
    // Use zero gravity physics or very low gravity
    const [ref, api] = type === "box"
        ? useBox(() => ({ mass: 1, position, angularDamping: 0.9, linearDamping: 0.9 }))
        : useSphere(() => ({ mass: 1, position, args: [scale], angularDamping: 0.9, linearDamping: 0.9 }));

    // Keep rotating slowly without applying physics impulses 144 times a second
    useFrame((state, delta) => {
        if (ref.current) {
            (ref.current as any).rotation.x += delta * 0.1;
            (ref.current as any).rotation.y += delta * 0.15;
        }
    });

    return (
        <mesh ref={ref as any} castShadow receiveShadow>
            {type === "box" && <boxGeometry args={[scale, scale, scale]} />}
            {type === "sphere" && <sphereGeometry args={[scale, 32, 32]} />}
            {type === "octahedron" && <octahedronGeometry args={[scale, 0]} />}
            <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.15}
                roughness={0.1}
                metalness={0.8}
                envMapIntensity={1}
                wireframe={type === "octahedron"}
            />
        </mesh>
    );
}

// Mouse attractor/repulsor
function MouseInteraction() {
    const { viewport, mouse, camera } = useThree();
    const [ref, api] = useSphere(() => ({ type: "Kinematic", args: [2], position: [0, 0, 0] }));

    useFrame(() => {
        // Map mouse to 3D space
        const x = (mouse.x * viewport.width) / 2;
        const y = (mouse.y * viewport.height) / 2;
        api.position.set(x, y, 0);
    });

    return (
        <mesh ref={ref as any}>
            <sphereGeometry args={[2, 16, 16]} />
            <meshBasicMaterial visible={false} />
        </mesh>
    );
}

export default function AntiGravityScene() {
    // Generate fewer random objects for performance
    const objects = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10 - 5
            ] as [number, number, number],
            scale: Math.random() * 0.8 + 0.3,
            type: ["box", "sphere", "octahedron"][Math.floor(Math.random() * 3)] as "box" | "sphere" | "octahedron"
        }));
    }, []);

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 45 }}>
                <Physics gravity={[0, 0, 0]}>
                    <MouseInteraction />
                    {objects.map((obj, i) => (
                        <FloatingObject key={i} {...obj} />
                    ))}
                </Physics>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
            </Canvas>
        </div>
    );
}

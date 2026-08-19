import * as THREE from "three";
import { ReactThreeFiber } from "@react-three/fiber";

/* ═══════════════════════════════════════════════════════════════════
   1. STATIC ASSET & SHADER MODULE DECLARATIONS
   ═══════════════════════════════════════════════════════════════════ */

declare module "*.glsl" {
  const content: string;
  export default content;
}

declare module "*.vert" {
  const content: string;
  export default content;
}

declare module "*.frag" {
  const content: string;
  export default content;
}

declare module "*.vs" {
  const content: string;
  export default content;
}

declare module "*.fs" {
  const content: string;
  export default content;
}

declare module "*.hdr" {
  const src: string;
  export default src;
}

declare module "*.exr" {
  const src: string;
  export default src;
}

declare module "*.gltf" {
  const src: string;
  export default src;
}

declare module "*.glb" {
  const src: string;
  export default src;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.webm" {
  const src: string;
  export default src;
}

declare module "*.ogg" {
  const src: string;
  export default src;
}

declare module "*.mp3" {
  const src: string;
  export default src;
}

declare module "*.wav" {
  const src: string;
  export default src;
}

/* ═══════════════════════════════════════════════════════════════════
   2. WINDOW & BROWSER API EXTENSIONS
   ═══════════════════════════════════════════════════════════════════ */

declare global {
  interface Window {
    lenis?: import("lenis").default;
    webkitAudioContext?: typeof AudioContext;
    requestIdleCallback: (
      callback: (deadline: IdleDeadline) => void,
      options?: IdleRequestOptions
    ) => number;
    cancelIdleCallback: (handle: number) => void;
  }

  interface IdleDeadline {
    readonly didTimeout: boolean;
    timeRemaining: () => number;
  }

  interface IdleRequestOptions {
    timeout?: number;
  }

  interface Navigator {
    deviceMemory?: number;
    connection?: {
      effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
      saveData?: boolean;
      rtt?: number;
      downlink?: number;
    };
  }

  /* ═══════════════════════════════════════════════════════════════════
     3. REACT THREE FIBER INTRINSIC ELEMENTS AUGMENTATION
     ═══════════════════════════════════════════════════════════════════ */

  namespace JSX {
    interface IntrinsicElements {
      instancedMesh: ReactThreeFiber.Object3DNode<
        THREE.InstancedMesh,
        typeof THREE.InstancedMesh
      >;
      tubeGeometry: ReactThreeFiber.BufferGeometryNode<
        THREE.TubeGeometry,
        typeof THREE.TubeGeometry
      >;
      shaderMaterial: ReactThreeFiber.MaterialNode<
        THREE.ShaderMaterial,
        typeof THREE.ShaderMaterial
      >;
      planeGeometry: ReactThreeFiber.BufferGeometryNode<
        THREE.PlaneGeometry,
        typeof THREE.PlaneGeometry
      >;
      octahedronGeometry: ReactThreeFiber.BufferGeometryNode<
        THREE.OctahedronGeometry,
        typeof THREE.OctahedronGeometry
      >;
      dodecahedronGeometry: ReactThreeFiber.BufferGeometryNode<
        THREE.DodecahedronGeometry,
        typeof THREE.DodecahedronGeometry
      >;
      icosahedronGeometry: ReactThreeFiber.BufferGeometryNode<
        THREE.IcosahedronGeometry,
        typeof THREE.IcosahedronGeometry
      >;
      torusGeometry: ReactThreeFiber.BufferGeometryNode<
        THREE.TorusGeometry,
        typeof THREE.TorusGeometry
      >;
      circleGeometry: ReactThreeFiber.BufferGeometryNode<
        THREE.CircleGeometry,
        typeof THREE.CircleGeometry
      >;
    }
  }
}

export {};

"use client";

import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

const C = {
  body: "#cac4bc",
  bodyLight: "#d4cec6",
  bodyDark: "#b8b2aa",
  dark: "#1a1a1e",
  darkMid: "#2a2a2e",
  tire: "#c87840",
  tireDeep: "#a86030",
  lens: "#080810",
  sensorPane: "#e8e4de",
  scanBlue: "#3b82f6",
};

function Wheel({
  position,
  mirror,
}: {
  position: [number, number, number];
  mirror?: boolean;
}) {
  const capX = mirror ? -0.042 : 0.042;
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.14, 0.14, 0.072, 24]} />
        <meshStandardMaterial
          color={C.tire}
          roughness={0.88}
          metalness={0.04}
        />
      </mesh>
      {/* Tread grooves */}
      {[-0.028, 0, 0.028].map((off) => (
        <mesh
          key={off}
          position={[off, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry args={[0.14, 0.003, 4, 24]} />
          <meshStandardMaterial
            color={C.tireDeep}
            roughness={0.92}
            metalness={0.02}
          />
        </mesh>
      ))}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.062, 0.062, 0.078, 16]} />
        <meshStandardMaterial
          color={C.darkMid}
          roughness={0.35}
          metalness={0.5}
        />
      </mesh>
      <mesh position={[capX, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.032, 0.032, 0.006, 8]} />
        <meshStandardMaterial
          color={C.dark}
          roughness={0.25}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

function RoverBody() {
  return (
    <group rotation={[0, Math.PI / 8, 0]}>
      {/* Main octagonal body */}
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.36, 0.41, 0.36, 8]} />
        <meshStandardMaterial
          color={C.body}
          roughness={0.52}
          metalness={0.08}
        />
      </mesh>
      {/* Lower dark trim band */}
      <mesh position={[0, 0.285, 0]}>
        <cylinderGeometry args={[0.415, 0.425, 0.06, 8]} />
        <meshStandardMaterial
          color={C.dark}
          roughness={0.35}
          metalness={0.3}
        />
      </mesh>
      {/* Mid dark accent ring */}
      <mesh position={[0, 0.345, 0]}>
        <cylinderGeometry args={[0.41, 0.415, 0.025, 8]} />
        <meshStandardMaterial
          color={C.dark}
          roughness={0.3}
          metalness={0.35}
        />
      </mesh>
      {/* Top plate */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.32, 0.36, 0.03, 8]} />
        <meshStandardMaterial
          color={C.bodyLight}
          roughness={0.48}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

function FrontCamera() {
  return (
    <group>
      {/* Camera housing */}
      <mesh position={[0, 0.46, 0.365]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.055, 24]} />
        <meshStandardMaterial
          color={C.dark}
          roughness={0.22}
          metalness={0.5}
        />
      </mesh>
      {/* Bezel ring */}
      <mesh position={[0, 0.46, 0.395]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.072, 0.006, 8, 24]} />
        <meshStandardMaterial
          color={C.darkMid}
          roughness={0.25}
          metalness={0.6}
        />
      </mesh>
      {/* Lens outer */}
      <mesh position={[0, 0.46, 0.395]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.012, 24]} />
        <meshStandardMaterial
          color={C.lens}
          roughness={0.04}
          metalness={0.97}
        />
      </mesh>
      {/* Lens inner highlight */}
      <mesh position={[0, 0.46, 0.402]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.004, 20]} />
        <meshStandardMaterial
          color="#040408"
          roughness={0.01}
          metalness={1}
        />
      </mesh>
    </group>
  );
}

function RoverModel() {
  const scanRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!scanRef.current) return;
    const mat = scanRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.06 + Math.sin(clock.elapsedTime * 1.5) * 0.04;
  });

  return (
    <group rotation={[0, -Math.PI / 6, 0]}>
      <RoverBody />
      <FrontCamera />

      {/* Top sensor module */}
      <mesh position={[0, 0.70, -0.04]}>
        <boxGeometry args={[0.18, 0.055, 0.14]} />
        <meshStandardMaterial
          color={C.dark}
          roughness={0.32}
          metalness={0.4}
        />
      </mesh>
      {/* Antenna nub */}
      <mesh position={[0, 0.755, -0.04]}>
        <boxGeometry args={[0.05, 0.055, 0.05]} />
        <meshStandardMaterial
          color={C.darkMid}
          roughness={0.28}
          metalness={0.45}
        />
      </mesh>

      {/* Front sensor pane row (5 windows) */}
      {[-0.10, -0.05, 0, 0.05, 0.10].map((x) => (
        <group key={`sp-${x}`}>
          <mesh position={[x, 0.31, 0.395]}>
            <boxGeometry args={[0.036, 0.026, 0.012]} />
            <meshStandardMaterial
              color={C.dark}
              roughness={0.28}
              metalness={0.4}
            />
          </mesh>
          <mesh position={[x, 0.31, 0.402]}>
            <boxGeometry args={[0.026, 0.016, 0.004]} />
            <meshStandardMaterial
              color={C.sensorPane}
              roughness={0.18}
              metalness={0.15}
              emissive="#3b82f6"
              emissiveIntensity={0.04}
            />
          </mesh>
        </group>
      ))}

      {/* Side diamond accents */}
      <mesh
        position={[0.375, 0.46, 0]}
        rotation={[0, Math.PI / 2, Math.PI / 4]}
      >
        <planeGeometry args={[0.1, 0.1]} />
        <meshStandardMaterial
          color={C.dark}
          roughness={0.32}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        position={[-0.375, 0.46, 0]}
        rotation={[0, -Math.PI / 2, Math.PI / 4]}
      >
        <planeGeometry args={[0.1, 0.1]} />
        <meshStandardMaterial
          color={C.dark}
          roughness={0.32}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wheels */}
      <Wheel position={[0.47, 0.14, 0.27]} />
      <Wheel position={[-0.47, 0.14, 0.27]} mirror />
      <Wheel position={[0.47, 0.14, -0.27]} />
      <Wheel position={[-0.47, 0.14, -0.27]} mirror />

      {/* Wheel mount brackets */}
      {(
        [
          [0.41, 0.22, 0.27],
          [-0.41, 0.22, 0.27],
          [0.41, 0.22, -0.27],
          [-0.41, 0.22, -0.27],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={`brk-${i}`} position={pos}>
          <boxGeometry args={[0.035, 0.14, 0.048]} />
          <meshStandardMaterial
            color={C.dark}
            roughness={0.32}
            metalness={0.4}
          />
        </mesh>
      ))}

      {/* Axle stubs */}
      {(
        [
          [0.44, 0.14, 0.27],
          [-0.44, 0.14, 0.27],
          [0.44, 0.14, -0.27],
          [-0.44, 0.14, -0.27],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={`axl-${i}`} position={pos} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.06, 8]} />
          <meshStandardMaterial
            color={C.darkMid}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
      ))}

      {/* GPR sensor panel (underside) */}
      <mesh position={[0, 0.255, 0.04]}>
        <boxGeometry args={[0.44, 0.014, 0.28]} />
        <meshStandardMaterial
          color="#15151a"
          metalness={0.4}
          roughness={0.5}
          emissive="#1d4ed8"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Scan paint marks on ground */}
      {(
        [
          { x: -0.035, color: C.scanBlue },
          { x: 0, color: "#ef4444" },
          { x: 0.035, color: "#22c55e" },
        ] as { x: number; color: string }[]
      ).map((m) => (
        <mesh
          key={m.x}
          position={[m.x, 0.003, 0.42]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.022, 0.06]} />
          <meshBasicMaterial color={m.color} transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Animated scan glow */}
      <mesh
        ref={scanRef}
        position={[0, 0.003, 0.04]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.42, 32]} />
        <meshBasicMaterial color={C.scanBlue} transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function InteractiveScene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.08,
      0.03,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.current.y * 0.03,
      0.03,
    );
  });

  return (
    <>
      <ambientLight intensity={0.22} color="#b8c4d4" />
      <directionalLight position={[5, 8, 3]} intensity={0.85} color="#f0f4ff" />
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.3}
        color="#8090a8"
      />
      <pointLight
        position={[0, 0.3, 0]}
        intensity={0.4}
        color="#3b82f6"
        distance={2.5}
      />
      <spotLight
        position={[-2, 5, -4]}
        intensity={0.35}
        angle={0.5}
        penumbra={0.8}
        color="#d0e0ff"
      />

      <group ref={groupRef}>
        <RoverModel />
      </group>

      <gridHelper
        args={[30, 60, "#1a2744", "#111827"]}
        position={[0, 0, 0]}
      />

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.4}
        blur={2}
        far={3}
        color="#060610"
      />

      <Environment preset="city" environmentIntensity={0.2} />
    </>
  );
}

export function RoverScene() {
  return (
    <Canvas
      camera={{ position: [2, 1.2, 4.5], fov: 30, near: 0.1, far: 100 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <InteractiveScene />
      </Suspense>
    </Canvas>
  );
}

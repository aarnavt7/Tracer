"use client";

import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

const C = {
  body: "#1c1c22",
  bodyLight: "#222228",
  bodyEdge: "#25252b",
  dark: "#0e0e12",
  darkMid: "#2a2a30",
  trim: "#3a3a40",
  tire: "#c87840",
  tireDeep: "#a86030",
  lens: "#080810",
  sensorPane: "#c8d0dc",
  accentOrange: "#d4803a",
  glowOrange: "#e8943c",
};

function Wheel({
  position,
  mirror,
}: {
  position: [number, number, number];
  mirror?: boolean;
}) {
  const capX = mirror ? -0.048 : 0.048;
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.08, 24]} />
        <meshStandardMaterial
          color={C.tire}
          roughness={0.88}
          metalness={0.04}
        />
      </mesh>
      {[-0.03, 0, 0.03].map((off) => (
        <mesh
          key={off}
          position={[off, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry args={[0.15, 0.003, 4, 24]} />
          <meshStandardMaterial
            color={C.tireDeep}
            roughness={0.92}
            metalness={0.02}
          />
        </mesh>
      ))}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.068, 0.068, 0.085, 16]} />
        <meshStandardMaterial
          color={C.darkMid}
          roughness={0.35}
          metalness={0.5}
        />
      </mesh>
      <mesh position={[capX, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 0.006, 8]} />
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
      {/* Main octagonal body — wider & longer */}
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.48, 0.54, 0.42, 8]} />
        <meshStandardMaterial
          color={C.body}
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>
      {/* Lower dark trim band */}
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.55, 0.56, 0.06, 8]} />
        <meshStandardMaterial
          color={C.dark}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      {/* Mid accent ring — orange glint */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.545, 0.55, 0.03, 8]} />
        <meshStandardMaterial
          color="#2a2018"
          roughness={0.25}
          metalness={0.65}
          emissive={C.accentOrange}
          emissiveIntensity={0.35}
        />
      </mesh>
      {/* Upper accent ring — subtle orange */}
      <mesh position={[0, 0.60, 0]}>
        <cylinderGeometry args={[0.485, 0.49, 0.02, 8]} />
        <meshStandardMaterial
          color="#2a2018"
          roughness={0.25}
          metalness={0.65}
          emissive={C.accentOrange}
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Top plate */}
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.03, 8]} />
        <meshStandardMaterial
          color={C.bodyLight}
          roughness={0.22}
          metalness={0.88}
        />
      </mesh>
    </group>
  );
}

function FrontCamera() {
  return (
    <group>
      {/* Camera housing */}
      <mesh position={[0, 0.46, 0.48]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.06, 24]} />
        <meshStandardMaterial
          color={C.dark}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      {/* Bezel ring */}
      <mesh position={[0, 0.46, 0.515]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.08, 0.007, 8, 24]} />
        <meshStandardMaterial
          color={C.trim}
          roughness={0.22}
          metalness={0.7}
        />
      </mesh>
      {/* Lens outer */}
      <mesh position={[0, 0.46, 0.515]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.014, 24]} />
        <meshStandardMaterial
          color={C.lens}
          roughness={0.03}
          metalness={0.98}
        />
      </mesh>
      {/* Lens inner */}
      <mesh position={[0, 0.46, 0.524]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.032, 0.032, 0.004, 20]} />
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
      <mesh position={[0, 0.73, -0.04]}>
        <boxGeometry args={[0.22, 0.06, 0.17]} />
        <meshStandardMaterial
          color={C.dark}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>
      {/* Antenna nub */}
      <mesh position={[0, 0.79, -0.04]}>
        <boxGeometry args={[0.06, 0.06, 0.06]} />
        <meshStandardMaterial
          color={C.darkMid}
          roughness={0.22}
          metalness={0.65}
        />
      </mesh>

      {/* Front sensor pane row (5 windows) */}
      {[-0.12, -0.06, 0, 0.06, 0.12].map((x) => (
        <group key={`sp-${x}`}>
          <mesh position={[x, 0.30, 0.52]}>
            <boxGeometry args={[0.04, 0.028, 0.012]} />
            <meshStandardMaterial
              color={C.dark}
              roughness={0.25}
              metalness={0.5}
            />
          </mesh>
          <mesh position={[x, 0.30, 0.527]}>
            <boxGeometry args={[0.028, 0.018, 0.004]} />
            <meshStandardMaterial
              color={C.sensorPane}
              roughness={0.15}
              metalness={0.2}
              emissive={C.glowOrange}
              emissiveIntensity={0.08}
            />
          </mesh>
        </group>
      ))}

      {/* Side diamond accents */}
      <mesh
        position={[0.50, 0.46, 0]}
        rotation={[0, Math.PI / 2, Math.PI / 4]}
      >
        <planeGeometry args={[0.13, 0.13]} />
        <meshStandardMaterial
          color={C.dark}
          roughness={0.25}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        position={[-0.50, 0.46, 0]}
        rotation={[0, -Math.PI / 2, Math.PI / 4]}
      >
        <planeGeometry args={[0.13, 0.13]} />
        <meshStandardMaterial
          color={C.dark}
          roughness={0.25}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wheels */}
      <Wheel position={[0.62, 0.15, 0.34]} />
      <Wheel position={[-0.62, 0.15, 0.34]} mirror />
      <Wheel position={[0.62, 0.15, -0.34]} />
      <Wheel position={[-0.62, 0.15, -0.34]} mirror />

      {/* Wheel mount brackets */}
      {(
        [
          [0.54, 0.22, 0.34],
          [-0.54, 0.22, 0.34],
          [0.54, 0.22, -0.34],
          [-0.54, 0.22, -0.34],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={`brk-${i}`} position={pos}>
          <boxGeometry args={[0.04, 0.14, 0.055]} />
          <meshStandardMaterial
            color={C.dark}
            roughness={0.28}
            metalness={0.6}
          />
        </mesh>
      ))}

      {/* Axle stubs */}
      {(
        [
          [0.58, 0.15, 0.34],
          [-0.58, 0.15, 0.34],
          [0.58, 0.15, -0.34],
          [-0.58, 0.15, -0.34],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={`axl-${i}`} position={pos} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.07, 8]} />
          <meshStandardMaterial
            color={C.darkMid}
            roughness={0.28}
            metalness={0.55}
          />
        </mesh>
      ))}

      {/* GPR sensor panel (underside) */}
      <mesh position={[0, 0.24, 0.04]}>
        <boxGeometry args={[0.56, 0.015, 0.36]} />
        <meshStandardMaterial
          color="#15151a"
          metalness={0.5}
          roughness={0.4}
          emissive={C.accentOrange}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Scan emitter bars */}
      {[-0.08, 0, 0.08].map((z) => (
        <mesh key={`sb-${z}`} position={[0, 0.22, z]}>
          <boxGeometry args={[0.48, 0.005, 0.018]} />
          <meshStandardMaterial
            color="#a05820"
            emissive={C.glowOrange}
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Scan paint marks on ground */}
      {(
        [
          { x: -0.04, color: C.accentOrange },
          { x: 0, color: "#ef4444" },
          { x: 0.04, color: "#22c55e" },
        ] as { x: number; color: string }[]
      ).map((m) => (
        <mesh
          key={m.x}
          position={[m.x, 0.003, 0.55]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.024, 0.07]} />
          <meshBasicMaterial color={m.color} transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Animated scan glow */}
      <mesh
        ref={scanRef}
        position={[0, 0.003, 0.04]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.55, 32]} />
        <meshBasicMaterial color={C.glowOrange} transparent opacity={0.06} />
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
      <ambientLight intensity={0.12} color="#a0b4d0" />
      <directionalLight position={[5, 8, 3]} intensity={1.0} color="#e8eeff" />
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.25}
        color="#6080a0"
      />
      <pointLight
        position={[0, 0.3, 0]}
        intensity={0.5}
        color={C.glowOrange}
        distance={3}
      />
      <spotLight
        position={[-2, 6, -5]}
        intensity={0.3}
        angle={0.4}
        penumbra={0.8}
        color="#e8eeff"
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
        opacity={0.35}
        blur={2.5}
        far={3}
        color="#060610"
      />

      <Environment preset="city" environmentIntensity={0.15} />
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

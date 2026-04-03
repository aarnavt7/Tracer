"use client";

import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
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
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.48, 0.54, 0.42, 8]} />
        <meshStandardMaterial
          color={C.body}
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.55, 0.56, 0.06, 8]} />
        <meshStandardMaterial
          color={C.dark}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
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
      <mesh position={[0, 0.46, 0.48]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.06, 24]} />
        <meshStandardMaterial color={C.dark} roughness={0.2} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.46, 0.515]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.08, 0.007, 8, 24]} />
        <meshStandardMaterial
          color={C.trim}
          roughness={0.22}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[0, 0.46, 0.515]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.014, 24]} />
        <meshStandardMaterial
          color={C.lens}
          roughness={0.03}
          metalness={0.98}
        />
      </mesh>
      <mesh position={[0, 0.46, 0.524]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.032, 0.032, 0.004, 20]} />
        <meshStandardMaterial color="#040408" roughness={0.01} metalness={1} />
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

      <mesh position={[0, 0.73, -0.04]}>
        <boxGeometry args={[0.22, 0.06, 0.17]} />
        <meshStandardMaterial color={C.dark} roughness={0.25} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.79, -0.04]}>
        <boxGeometry args={[0.06, 0.06, 0.06]} />
        <meshStandardMaterial
          color={C.darkMid}
          roughness={0.22}
          metalness={0.65}
        />
      </mesh>

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

      <Wheel position={[0.62, 0.15, 0.34]} />
      <Wheel position={[-0.62, 0.15, 0.34]} mirror />
      <Wheel position={[0.62, 0.15, -0.34]} />
      <Wheel position={[-0.62, 0.15, -0.34]} mirror />

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

/* ═══ ENVIRONMENT ═══ */

function Moon() {
  return (
    <group position={[12, 10, -18]}>
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#e8e0d0"
          emissive="#e8dcc8"
          emissiveIntensity={0.4}
          roughness={0.85}
          metalness={0}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#e8d8c0" transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

function Starfield() {
  const points = useMemo(() => {
    const count = 550;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 28 + Math.random() * 50;
      const y = Math.random() * 8 - 0.5;
      positions[i * 3] = r * Math.cos(theta);
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = r * Math.sin(theta);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <points geometry={points} renderOrder={999}>
      <pointsMaterial
        color="#d0d0d8"
        size={1.0}
        sizeAttenuation={false}
        transparent
        opacity={0.45}
        fog={false}
        depthWrite={false}
        depthTest={false}
      />
    </points>
  );
}

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry as THREE.PlaneGeometry;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const dampCenter = Math.min(1, dist / 3);
      const h =
        (Math.sin(x * 0.4) * Math.cos(y * 0.3) * 0.1 +
          Math.sin(x * 1.1 + y * 0.7) * 0.05 +
          Math.cos(x * 2.3) * Math.sin(y * 1.6) * 0.025) *
        dampCenter;
      pos.setZ(i, h);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  }, []);

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.01, 0]}
      receiveShadow
    >
      <planeGeometry args={[50, 50, 100, 100]} />
      <meshStandardMaterial color="#040406" roughness={0.95} metalness={0.05} />
    </mesh>
  );
}


function MiniRover({
  radius,
  speed,
  startAngle,
}: {
  radius: number;
  speed: number;
  startAngle: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const angle = startAngle + clock.elapsedTime * speed;
    ref.current.position.x = Math.cos(angle) * radius;
    ref.current.position.z = Math.sin(angle) * radius;
    ref.current.rotation.y = -angle + Math.PI / 2;

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.06 + Math.sin(clock.elapsedTime * 2 + startAngle) * 0.03;
    }
  });

  const wheelPositions: [number, number, number][] = [
    [0.16, 0.05, 0.09],
    [-0.16, 0.05, 0.09],
    [0.16, 0.05, -0.09],
    [-0.16, 0.05, -0.09],
  ];

  return (
    <group ref={ref}>
      <group rotation={[0, Math.PI / 8, 0]}>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.1, 8]} />
          <meshStandardMaterial
            color={C.body}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.09, 0.1, 0.02, 8]} />
          <meshStandardMaterial
            color="#2a2018"
            roughness={0.3}
            metalness={0.6}
            emissive={C.accentOrange}
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
      {wheelPositions.map((p, i) => (
        <mesh
          key={`mw-${i}`}
          position={p}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.045, 0.045, 0.022, 10]} />
          <meshStandardMaterial
            color={C.tire}
            roughness={0.85}
            metalness={0.05}
          />
        </mesh>
      ))}
      <mesh
        ref={glowRef}
        position={[0, 0.005, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.12, 12]} />
        <meshBasicMaterial color={C.glowOrange} transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function OverlayGrid() {
  const ref = useRef<THREE.GridHelper>(null);
  useEffect(() => {
    if (!ref.current) return;
    const mats = Array.isArray(ref.current.material)
      ? ref.current.material
      : [ref.current.material];
    mats.forEach((m) => {
      m.depthTest = false;
      m.transparent = true;
      m.opacity = 0.6;
    });
    ref.current.renderOrder = 10;
  }, []);
  return (
    <gridHelper
      ref={ref}
      args={[40, 60, "#5a3010", "#3a2008"]}
      position={[0, 0.02, 0]}
    />
  );
}

/* ═══ SCENE ═══ */

function InteractiveScene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const entrance = useRef({ progress: 0, done: false });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const handleScroll = () => {
      scroll.current = window.scrollY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!entrance.current.done) {
      entrance.current.progress = Math.min(
        entrance.current.progress + delta * 1.2,
        1,
      );
      const t = 1 - Math.pow(1 - entrance.current.progress, 3);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(-0.25, 0, t);
      groupRef.current.position.y = THREE.MathUtils.lerp(-0.15, 0, t);
      if (entrance.current.progress >= 1) entrance.current.done = true;
      return;
    }

    const scrollRotation = scroll.current * 0.006;
    const targetY = mouse.current.x * 0.08 + scrollRotation;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
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
      <color attach="background" args={["#020204"]} />
      <fog attach="fog" args={["#020204", 12, 40]} />

      <ambientLight intensity={0.18} color="#b0c0d8" />
      <directionalLight position={[5, 8, 3]} intensity={1.3} color="#f0f4ff" />
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.3}
        color="#8090a8"
      />
      <pointLight
        position={[0, 0.5, 0]}
        intensity={0.7}
        color={C.glowOrange}
        distance={4}
      />
      {/* Key spot on the rover */}
      <spotLight
        position={[2, 4, 3]}
        intensity={0.8}
        angle={0.5}
        penumbra={0.6}
        color="#f0eee8"
        target-position={[0, 0.4, 0]}
      />
      <spotLight
        position={[-2, 6, -5]}
        intensity={0.3}
        angle={0.4}
        penumbra={0.8}
        color="#e8eeff"
      />
      {/* Rim light from behind */}
      <directionalLight
        position={[-3, 3, -4]}
        intensity={0.4}
        color="#d0c8c0"
      />
      {/* Moonlight */}
      <directionalLight
        position={[12, 10, -18]}
        intensity={0.2}
        color="#e8dcc8"
      />

      {/* Sky */}
      <Starfield />
      <Moon />

      {/* Main rover */}
      <group ref={groupRef}>
        <RoverModel />
      </group>

      {/* Background rovers */}
      <MiniRover radius={6} speed={0.06} startAngle={0} />
      <MiniRover radius={9} speed={-0.04} startAngle={2.1} />
      <MiniRover radius={12} speed={0.03} startAngle={4.2} />

      {/* Terrain first, then grid overlaid on top */}
      <Terrain />
      <OverlayGrid />

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.35}
        blur={2.5}
        far={3}
        color="#020204"
      />

      <Environment preset="night" environmentIntensity={0.15} />
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
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={null}>
        <InteractiveScene />
      </Suspense>
    </Canvas>
  );
}

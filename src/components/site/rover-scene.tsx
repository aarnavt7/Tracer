"use client";

import { ContactShadows, Environment, Grid } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const C = {
  body: "#4a4a54",
  bodyLight: "#585862",
  bodyEdge: "#52525c",
  dark: "#2a2a32",
  darkMid: "#3e3e48",
  trim: "#5a5a64",
  tire: "#c87840",
  tireDeep: "#a86030",
  lens: "#080810",
  sensorPane: "#c8d0dc",
  accentOrange: "#d4803a",
  glowOrange: "#e8943c",
};

/** Tread rings + rubber sheen read as molded polymer; no external textures (PBR + geometry). */
const TREAD_RADII = [0.136, 0.144, 0.152, 0.158] as const;

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
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.08, 48]} />
        <meshPhysicalMaterial
          color={C.tire}
          roughness={0.94}
          metalness={0}
          clearcoat={0.04}
          clearcoatRoughness={0.98}
          sheen={0.55}
          sheenRoughness={0.82}
          sheenColor="#7a3d22"
        />
      </mesh>
      {TREAD_RADII.map((radius, i) => (
        <mesh
          key={`tr-${radius}`}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <torusGeometry args={[radius, 0.0042, 5, 56]} />
          <meshPhysicalMaterial
            color={C.tireDeep}
            roughness={0.97}
            metalness={0}
            clearcoat={0.02}
            clearcoatRoughness={1}
            sheen={0.35}
            sheenRoughness={0.9}
            sheenColor="#5c3018"
          />
        </mesh>
      ))}
      {[-0.03, 0, 0.03].map((off) => (
        <mesh
          key={off}
          position={[off, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <torusGeometry args={[0.15, 0.0028, 4, 40]} />
          <meshPhysicalMaterial
            color={C.tireDeep}
            roughness={0.96}
            metalness={0}
            sheen={0.28}
            sheenRoughness={0.92}
            sheenColor="#4a2814"
          />
        </mesh>
      ))}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.068, 0.068, 0.085, 24]} />
        <meshPhysicalMaterial
          color={C.darkMid}
          roughness={0.35}
          metalness={0.55}
          clearcoat={0.25}
          clearcoatRoughness={0.55}
        />
      </mesh>
      <mesh position={[capX, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.006, 12]} />
        <meshPhysicalMaterial
          color={C.dark}
          roughness={0.25}
          metalness={0.65}
          clearcoat={0.4}
          clearcoatRoughness={0.45}
        />
      </mesh>
    </group>
  );
}

function RoverBody() {
  return (
    <group rotation={[0, Math.PI / 8, 0]}>
      <mesh position={[0, 0.46, 0]} castShadow>
        <cylinderGeometry args={[0.48, 0.54, 0.42, 12]} />
        <meshPhysicalMaterial
          color={C.body}
          roughness={0.22}
          metalness={0.88}
          clearcoat={0.45}
          clearcoatRoughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.26, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.56, 0.06, 12]} />
        <meshPhysicalMaterial
          color={C.dark}
          roughness={0.28}
          metalness={0.55}
          clearcoat={0.3}
          clearcoatRoughness={0.5}
        />
      </mesh>
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.545, 0.55, 0.03, 12]} />
        <meshPhysicalMaterial
          color="#2a2018"
          roughness={0.22}
          metalness={0.68}
          emissive={C.accentOrange}
          emissiveIntensity={0.32}
          clearcoat={0.55}
          clearcoatRoughness={0.28}
        />
      </mesh>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.485, 0.49, 0.02, 12]} />
        <meshPhysicalMaterial
          color="#2a2018"
          roughness={0.22}
          metalness={0.68}
          emissive={C.accentOrange}
          emissiveIntensity={0.14}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.68, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.48, 0.03, 12]} />
        <meshPhysicalMaterial
          color={C.bodyLight}
          roughness={0.18}
          metalness={0.9}
          clearcoat={0.5}
          clearcoatRoughness={0.25}
        />
      </mesh>
    </group>
  );
}

function FrontCamera() {
  return (
    <group>
      <mesh position={[0, 0.46, 0.48]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.06, 32]} />
        <meshPhysicalMaterial
          color={C.dark}
          roughness={0.2}
          metalness={0.72}
          clearcoat={0.35}
          clearcoatRoughness={0.4}
        />
      </mesh>
      <mesh position={[0, 0.46, 0.515]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.08, 0.007, 8, 32]} />
        <meshPhysicalMaterial
          color={C.trim}
          roughness={0.2}
          metalness={0.75}
          clearcoat={0.4}
          clearcoatRoughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.46, 0.515]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.014, 32]} />
        <meshPhysicalMaterial
          color={C.lens}
          roughness={0.04}
          metalness={0.96}
          clearcoat={1}
          clearcoatRoughness={0.06}
        />
      </mesh>
      <mesh position={[0, 0.46, 0.524]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.032, 0.032, 0.004, 24]} />
        <meshPhysicalMaterial
          color="#040408"
          roughness={0.02}
          metalness={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
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
    <group
      rotation={[0, -Math.PI / 6, 0]}
      scale={[1.25, 1.15, 1.2]}
      position={[0, -0.02, 0]}
    >
      <RoverBody />
      <FrontCamera />

      <mesh position={[0, 0.73, -0.04]} castShadow>
        <boxGeometry args={[0.22, 0.06, 0.17]} />
        <meshPhysicalMaterial
          color={C.dark}
          roughness={0.24}
          metalness={0.72}
          clearcoat={0.3}
          clearcoatRoughness={0.45}
        />
      </mesh>
      <mesh position={[0, 0.79, -0.04]} castShadow>
        <boxGeometry args={[0.06, 0.06, 0.06]} />
        <meshPhysicalMaterial
          color={C.darkMid}
          roughness={0.2}
          metalness={0.68}
          clearcoat={0.28}
          clearcoatRoughness={0.48}
        />
      </mesh>

      {[-0.12, -0.06, 0, 0.06, 0.12].map((x) => (
        <group key={`sp-${x}`}>
          <mesh position={[x, 0.3, 0.52]} castShadow>
            <boxGeometry args={[0.04, 0.028, 0.012]} />
            <meshPhysicalMaterial
              color={C.dark}
              roughness={0.25}
              metalness={0.52}
              clearcoat={0.2}
              clearcoatRoughness={0.55}
            />
          </mesh>
          <mesh position={[x, 0.3, 0.527]}>
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
        position={[0.5, 0.46, 0]}
        rotation={[0, Math.PI / 2, Math.PI / 4]}
        castShadow
      >
        <planeGeometry args={[0.13, 0.13]} />
        <meshPhysicalMaterial
          color={C.dark}
          roughness={0.24}
          metalness={0.55}
          side={THREE.DoubleSide}
          clearcoat={0.25}
          clearcoatRoughness={0.5}
        />
      </mesh>
      <mesh
        position={[-0.5, 0.46, 0]}
        rotation={[0, -Math.PI / 2, Math.PI / 4]}
        castShadow
      >
        <planeGeometry args={[0.13, 0.13]} />
        <meshPhysicalMaterial
          color={C.dark}
          roughness={0.24}
          metalness={0.55}
          side={THREE.DoubleSide}
          clearcoat={0.25}
          clearcoatRoughness={0.5}
        />
      </mesh>

      <Wheel position={[0.62, 0.2, 0.34]} />
      <Wheel position={[-0.62, 0.2, 0.34]} mirror />
      <Wheel position={[0.62, 0.2, -0.34]} />
      <Wheel position={[-0.62, 0.2, -0.34]} mirror />

      {(
        [
          [0.54, 0.27, 0.34],
          [-0.54, 0.27, 0.34],
          [0.54, 0.27, -0.34],
          [-0.54, 0.27, -0.34],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={`brk-${i}`} position={pos} castShadow>
          <boxGeometry args={[0.04, 0.14, 0.055]} />
          <meshPhysicalMaterial
            color={C.dark}
            roughness={0.26}
            metalness={0.62}
            clearcoat={0.22}
            clearcoatRoughness={0.52}
          />
        </mesh>
      ))}

      {(
        [
          [0.58, 0.2, 0.34],
          [-0.58, 0.2, 0.34],
          [0.58, 0.2, -0.34],
          [-0.58, 0.2, -0.34],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={`axl-${i}`} position={pos} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.07, 16]} />
          <meshPhysicalMaterial
            color={C.darkMid}
            roughness={0.26}
            metalness={0.58}
            clearcoat={0.25}
            clearcoatRoughness={0.5}
          />
        </mesh>
      ))}

      <mesh position={[0, 0.24, 0.04]} castShadow>
        <boxGeometry args={[0.56, 0.015, 0.36]} />
        <meshPhysicalMaterial
          color="#15151a"
          metalness={0.52}
          roughness={0.38}
          emissive={C.accentOrange}
          emissiveIntensity={0.22}
          clearcoat={0.4}
          clearcoatRoughness={0.35}
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
          emissiveIntensity={0.32}
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
    const count = 720;
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
        color="#e2e4ee"
        size={1.15}
        sizeAttenuation={false}
        transparent
        opacity={0.99}
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
    [0.16, 0.078, 0.09],
    [-0.16, 0.078, 0.09],
    [0.16, 0.078, -0.09],
    [-0.16, 0.078, -0.09],
  ];

  return (
    <group ref={ref}>
      <group rotation={[0, Math.PI / 8, 0]}>
        <mesh position={[0, 0.188, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.1, 8]} />
          <meshStandardMaterial
            color={C.body}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.248, 0]}>
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

/* ═══ UNDERGROUND MAPPING VISUALIZATION ═══ */

const SWEEP_SPEED = 0.45;
const T_RADAR_START = 0.9;
const T_RADAR_DUR = 0.8;
const T_UTIL_START = 1.5;
const T_UTIL_DUR = 0.6;
const T_SWEEP_START = 2.0;

const SCAN_VERTEX = `
  varying vec3 vWorldPos;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const XRAY_FRAGMENT = `
  uniform float uSweep;
  uniform vec3 uColor;
  uniform float uFade;
  varying vec3 vWorldPos;
  #define TAU 6.28318530718
  void main() {
    float a = atan(vWorldPos.z, vWorldPos.x);
    float diff = mod(uSweep - a + TAU, TAU);
    float trail = smoothstep(3.8, 0.0, diff);
    float dist = length(vWorldPos.xz);
    float dFade = smoothstep(0.4, 2.0, dist);
    float alpha = 0.14 * trail * dFade * uFade;
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const PAINT_FRAGMENT = `
  uniform float uSweep;
  uniform vec3 uColor;
  varying vec3 vWorldPos;
  #define TAU 6.28318530718
  void main() {
    float a = atan(vWorldPos.z, vWorldPos.x);
    float diff = mod(uSweep - a + TAU, TAU);
    float trail = smoothstep(5.2, 0.0, diff);
    float dist = length(vWorldPos.xz);
    float dFade = smoothstep(0.3, 1.5, dist);
    float edge = 1.0 - smoothstep(0.0, 0.15, abs(sin(a * 12.0 + dist * 3.0)) * 0.3);
    float alpha = 0.26 * trail * dFade * (0.7 + edge * 0.3);
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const UTILITY_PATHS = [
  {
    pts: [
      [-6, -0.25, -1.2],
      [-2, -0.25, 0.4],
      [2, -0.28, -0.2],
      [6, -0.22, 0.6],
    ],
    color: "#e03030",
    w: 0.035,
  },
  {
    pts: [
      [-5, -0.45, 1.0],
      [-1, -0.42, 0.2],
      [3, -0.48, 0.8],
      [7, -0.44, 1.4],
    ],
    color: "#3088ee",
    w: 0.04,
  },
  {
    pts: [
      [-7, -0.35, -0.3],
      [-3, -0.38, 0.6],
      [1, -0.33, -0.5],
      [5, -0.36, 0.3],
    ],
    color: "#e8c020",
    w: 0.032,
  },
  {
    pts: [
      [-4, -0.55, 0.3],
      [0, -0.52, -0.6],
      [4, -0.58, 0.1],
      [8, -0.54, -0.4],
    ],
    color: "#30b860",
    w: 0.028,
  },
];

const SWEEP_FRAGMENT = `
  uniform float uSweep;
  varying vec3 vWorldPos;
  #define TAU 6.28318530718
  void main() {
    float dist = length(vWorldPos.xz);
    float ring = smoothstep(0.8, 1.3, dist) * (1.0 - smoothstep(2.4, 3.0, dist));
    float a = atan(vWorldPos.z, vWorldPos.x);
    float diff = mod(uSweep - a + TAU, TAU);
    float trail = pow(max(0.0, 1.0 - diff / 1.5), 2.5);
    float alpha = 0.22 * ring * trail;
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(0.91, 0.58, 0.24, alpha);
  }
`;

function RadarSweep() {
  const groupRef = useRef<THREE.Group>(null);

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        uniforms: { uSweep: { value: 0 } },
        vertexShader: SCAN_VERTEX,
        fragmentShader: SWEEP_FRAGMENT,
      }),
    [],
  );

  const discGeo = useMemo(() => new THREE.CircleGeometry(3.2, 64), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const expandT = Math.min(
      Math.max((t - T_RADAR_START) / T_RADAR_DUR, 0),
      1,
    );
    const ease = 1 - Math.pow(1 - expandT, 3);
    groupRef.current.scale.set(ease, ease, 1);

    if (t > T_SWEEP_START) {
      mat.uniforms.uSweep.value = (t - T_SWEEP_START) * SWEEP_SPEED;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0.016, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      {/* Scan boundary ring */}
      <mesh renderOrder={7}>
        <ringGeometry args={[1.98, 2.06, 80]} />
        <meshBasicMaterial
          color={C.accentOrange}
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
      {/* Inner reference ring */}
      <mesh renderOrder={7}>
        <ringGeometry args={[1.18, 1.24, 64]} />
        <meshBasicMaterial
          color={C.accentOrange}
          transparent
          opacity={0.025}
          side={THREE.DoubleSide}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
      {/* Animated sweep arc */}
      <mesh geometry={discGeo} material={mat} renderOrder={9} />
    </group>
  );
}

function PaintedUtilities() {
  const groupRef = useRef<THREE.Group>(null);

  const { geos, mats } = useMemo(() => {
    const geos: THREE.TubeGeometry[] = [];
    const mats: THREE.ShaderMaterial[] = [];
    UTILITY_PATHS.forEach((d) => {
      const curve = new THREE.CatmullRomCurve3(
        d.pts.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
      );
      geos.push(new THREE.TubeGeometry(curve, 48, d.w, 8, false));
      mats.push(
        new THREE.ShaderMaterial({
          transparent: true,
          depthTest: false,
          depthWrite: false,
          side: THREE.DoubleSide,
          uniforms: {
            uSweep: { value: 0 },
            uColor: { value: new THREE.Color(d.color) },
            uFade: { value: 0 },
          },
          vertexShader: SCAN_VERTEX,
          fragmentShader: XRAY_FRAGMENT,
        }),
      );
    });
    return { geos, mats };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const fade = Math.min(Math.max((t - T_UTIL_START) / T_UTIL_DUR, 0), 1);
    const sweepAngle =
      t > T_SWEEP_START ? (t - T_SWEEP_START) * SWEEP_SPEED : 0;
    mats.forEach((m) => {
      m.uniforms.uSweep.value = sweepAngle;
      m.uniforms.uFade.value = fade;
    });
  });

  return (
    <group ref={groupRef}>
      {geos.map((geo, i) => (
        <mesh key={i} geometry={geo} material={mats[i]} renderOrder={15} />
      ))}
    </group>
  );
}

function SurfacePaintMarks() {
  const { geos, mats } = useMemo(() => {
    const geos: THREE.TubeGeometry[] = [];
    const mats: THREE.ShaderMaterial[] = [];
    UTILITY_PATHS.forEach((d) => {
      const surfacePts = d.pts.map(
        (p) => new THREE.Vector3(p[0], 0.014, p[2]),
      );
      const curve = new THREE.CatmullRomCurve3(surfacePts);
      geos.push(new THREE.TubeGeometry(curve, 48, d.w * 1.6, 8, false));
      mats.push(
        new THREE.ShaderMaterial({
          transparent: true,
          depthTest: false,
          depthWrite: false,
          side: THREE.DoubleSide,
          uniforms: {
            uSweep: { value: 0 },
            uColor: { value: new THREE.Color(d.color) },
          },
          vertexShader: SCAN_VERTEX,
          fragmentShader: PAINT_FRAGMENT,
        }),
      );
    });
    return { geos, mats };
  }, []);

  useFrame(({ clock }) => {
    const angle = clock.getElapsedTime() * SWEEP_SPEED;
    mats.forEach((m) => {
      m.uniforms.uSweep.value = angle;
    });
  });

  return (
    <group>
      {geos.map((geo, i) => (
        <mesh key={i} geometry={geo} material={mats[i]} renderOrder={6} />
      ))}
    </group>
  );
}

function PaintSpray() {
  const N = 50;

  const { geo, data } = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const data = Array.from({ length: N }, () => ({
      life: 1,
      maxLife: 0.2,
      x: 0,
      y: -10,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
    }));
    return { geo, data };
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const angle = t * SWEEP_SPEED;
    const sx = Math.cos(angle) * 0.55;
    const sz = Math.sin(angle) * 0.55;
    const positions = geo.attributes.position.array as Float32Array;

    data.forEach((p, i) => {
      p.life += delta;
      if (p.life < p.maxLife) {
        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.z += p.vz * delta;
        p.y = Math.max(p.y, 0.016);
      }
      positions[i * 3] = p.life < p.maxLife ? p.x : 0;
      positions[i * 3 + 1] = p.life < p.maxLife ? p.y : -10;
      positions[i * 3 + 2] = p.life < p.maxLife ? p.z : 0;
    });

    const toSpawn = Math.min(3, data.filter((p) => p.life >= p.maxLife).length);
    let spawned = 0;
    for (let i = 0; i < data.length && spawned < toSpawn; i++) {
      if (data[i].life >= data[i].maxLife) {
        const spread = 0.06;
        data[i].x = sx + (Math.random() - 0.5) * spread;
        data[i].y = 0.1 + Math.random() * 0.04;
        data[i].z = sz + (Math.random() - 0.5) * spread;
        data[i].vx = (Math.random() - 0.5) * 0.25;
        data[i].vy = -0.7 - Math.random() * 0.5;
        data[i].vz = (Math.random() - 0.5) * 0.25;
        data[i].life = 0;
        data[i].maxLife = 0.1 + Math.random() * 0.12;
        spawned++;
      }
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points geometry={geo} renderOrder={12}>
      <pointsMaterial
        color={C.glowOrange}
        size={1.4}
        sizeAttenuation={false}
        transparent
        opacity={0.5}
        depthWrite={false}
        fog={false}
      />
    </points>
  );
}

function FloorGrid() {
  return (
    <Grid
      position={[0, 0.018, 0]}
      infiniteGrid
      fadeDistance={28}
      fadeStrength={1.25}
      fadeFrom={0.82}
      cellSize={0.62}
      sectionSize={3.2}
      cellThickness={0.55}
      sectionThickness={0.95}
      cellColor="#252028"
      sectionColor="#3d3028"
    />
  );
}

/* ═══ SCENE ═══ */

function InteractiveScene() {
  const groupRef = useRef<THREE.Group>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const entrance = useRef({ progress: 0, done: false });

  useLayoutEffect(() => {
    const light = keyLightRef.current;
    if (!light) return;
    light.shadow.mapSize.set(2048, 2048);
    light.shadow.camera.near = 2.5;
    light.shadow.camera.far = 26;
    light.shadow.bias = -0.00022;
    light.shadow.normalBias = 0.028;
    const cam = light.shadow.camera as THREE.OrthographicCamera;
    cam.left = -6.5;
    cam.right = 6.5;
    cam.top = 6.5;
    cam.bottom = -6.5;
    cam.updateProjectionMatrix();
  }, []);

  useEffect(() => {
    scroll.current = window.scrollY;
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
      groupRef.current.position.y = THREE.MathUtils.lerp(-0.15, -0.02, t);
      if (entrance.current.progress >= 1) entrance.current.done = true;
      return;
    }

    const scrollRotation = scroll.current * 0.003 * 2.35;
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
      <fog attach="fog" args={["#020204", 14, 48]} />

      <ambientLight intensity={0.28} color="#c4cad8" />
      <directionalLight
        ref={keyLightRef}
        castShadow
        position={[5, 8, 3]}
        intensity={1.52}
        color="#f2f5fc"
      />
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.32}
        color="#8898ac"
      />
      <pointLight
        position={[0, 0.5, 0]}
        intensity={0.52}
        color={C.glowOrange}
        distance={4}
      />
      <spotLight
        position={[2, 4, 3]}
        intensity={1.02}
        angle={0.5}
        penumbra={0.62}
        color="#f4f0ea"
        target-position={[0, 0.35, 0]}
      />
      <spotLight
        position={[-2, 6, -5]}
        intensity={0.22}
        angle={0.4}
        penumbra={0.82}
        color="#e8eeff"
      />
      <directionalLight
        position={[-3, 3, -4]}
        intensity={0.42}
        color="#cec6be"
      />
      <directionalLight
        position={[12, 10, -18]}
        intensity={0.12}
        color="#e8dcc8"
      />

      <Starfield />
      <Moon />

      <group ref={groupRef}>
        <RoverModel />
      </group>

      <MiniRover radius={6} speed={0.06} startAngle={0} />
      <MiniRover radius={9} speed={-0.04} startAngle={2.1} />
      <MiniRover radius={12} speed={0.03} startAngle={4.2} />

      <RadarSweep />
      <PaintedUtilities />

      <Terrain />
      <FloorGrid />

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.22}
        blur={2}
        far={3}
        color="#020204"
      />

      <Environment preset="warehouse" environmentIntensity={0.3} />
    </>
  );
}

export function RoverScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [2, 1.05, 4.65], fov: 30, near: 0.1, far: 100 }}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <Suspense fallback={null}>
        <InteractiveScene />
      </Suspense>
    </Canvas>
  );
}

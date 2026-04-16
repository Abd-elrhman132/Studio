import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";

const AccentRing = ({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) => (
  <mesh position={position} rotation={rotation}>
    <torusGeometry args={[1.75, 0.02, 12, 64]} />
    <meshBasicMaterial color={color} transparent opacity={0.35} />
  </mesh>
);

const PrismaticJewel = ({ reducedMotion, isMobile, isDark }: { reducedMotion: boolean; isMobile: boolean; isDark: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("hero-model-ready"));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: isDark ? "#f8f7ff" : "#888888",
        metalness: isDark ? (isMobile ? 0.05 : 0.08) : 0.4,
        roughness: isDark ? (isMobile ? 0.2 : 0.1) : 0.1,
        transmission: isMobile ? 0.5 : (isDark ? 1 : 0.4), // Significant performance win on mobile
        ior: isDark ? 1.3 : 1.45,
        thickness: 1.2,
        clearcoat: isMobile ? 0.5 : 1,
        clearcoatRoughness: 0.1,
        sheen: isDark ? 0.3 : 0.2,
        sheenColor: new THREE.Color(isDark ? "#f6b262" : "#ffffff"),
      }),
    [isMobile, isDark],
  );

  useFrame((state) => {
    if (!groupRef.current || !coreRef.current || reducedMotion) return;

    const time = state.clock.getElapsedTime();
    const targetScale = hovered ? 1.05 : 1;
    
    // Smoother lerping with device-aware speed
    const lerpSpeed = isMobile ? 0.03 : 0.05;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.mouse.x * 0.3, lerpSpeed);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.mouse.y * 0.2, lerpSpeed);
    coreRef.current.rotation.z = time * 0.15;
    
    const s = THREE.MathUtils.lerp(coreRef.current.scale.x, targetScale, 0.08);
    coreRef.current.scale.set(s, s, s);
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={0.1} floatIntensity={reducedMotion ? 0 : 0.3}>
      <group ref={groupRef}>
        <mesh
          ref={coreRef}
          onPointerOver={() => !isMobile && setHovered(true)}
          onPointerOut={() => !isMobile && setHovered(false)}
        >
          <icosahedronGeometry args={[1.38, 0]} />
          <primitive object={material} attach="material" />
        </mesh>

        <mesh scale={1.31} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
          <icosahedronGeometry args={[1.32, 0]} />
          <meshBasicMaterial color={isDark ? "#9bd4ff" : "#666666"} wireframe transparent opacity={isDark ? 0.12 : 0.15} />
        </mesh>

        <AccentRing position={[0, 0.1, 0]} rotation={[Math.PI / 2.7, 0.2, 0.1]} color={isDark ? "#f7aa61" : "#444444"} />
        <AccentRing position={[0, -0.15, 0]} rotation={[Math.PI / 2.1, -0.4, 0.4]} color={isDark ? "#8dd3ff" : "#999999"} />
      </group>
    </Float>
  );
};

const SceneLights = ({ isMobile, isDark }: { isMobile: boolean; isDark: boolean }) => {
  return (
    <>
      <ambientLight intensity={isDark ? (isMobile ? 0.8 : 0.6) : 0.5} />
      <directionalLight position={[3, 4, 3]} intensity={isDark ? (isMobile ? 0.8 : 1.2) : 1.2} color={isDark ? "#fff4dc" : "#ffffff"} />
      <pointLight position={[-3, -2, 3]} intensity={isDark ? 0.8 : 0.4} color={isDark ? "#78c7ff" : "#ffffff"} />
      <pointLight position={[2, 0.5, 2]} intensity={isDark ? 1.2 : 0.6} color={isDark ? "#f7aa61" : "#888888"} />
    </>
  );
};

const HeroScene = ({ className }: { className?: string }) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();
  const reducedMotion = isMobile || prefersReducedMotion;

  return (
    <div
      className={`w-full h-full min-h-[300px] z-0 flex items-center justify-center pointer-events-none md:pointer-events-auto ${className ?? ""}`}
    >
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]} // Cap DPR for better performance on high-res displays
        gl={{ 
          antialias: !isMobile, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        camera={{ position: [0, 0, 5.5], fov: 30 }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <Suspense fallback={null}>
          <SceneLights isMobile={isMobile} isDark={isDark} />
          <PrismaticJewel reducedMotion={reducedMotion} isMobile={isMobile} isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;

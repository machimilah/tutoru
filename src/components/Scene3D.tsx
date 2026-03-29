import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const Book = ({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
      <group ref={ref} position={position} rotation={rotation}>
        {/* Book cover */}
        <mesh>
          <boxGeometry args={[0.8, 1, 0.12]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Pages */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.72, 0.92, 0.1]} />
          <meshStandardMaterial color="#f0f4ff" />
        </mesh>
      </group>
    </Float>
  );
};

const Pencil = ({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.2;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={ref} position={position} rotation={rotation}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 1.2, 8]} />
          <meshStandardMaterial color="#f5c542" />
        </mesh>
        <mesh position={[0, 0.65, 0]}>
          <coneGeometry args={[0.06, 0.15, 8]} />
          <meshStandardMaterial color="#ffddaa" />
        </mesh>
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.1, 8]} />
          <meshStandardMaterial color="#e8917a" />
        </mesh>
      </group>
    </Float>
  );
};

const GradCap = ({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });
  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={ref} position={position} rotation={rotation}>
        {/* Board */}
        <mesh>
          <boxGeometry args={[1, 0.05, 1]} />
          <meshStandardMaterial color="#1e3a5f" />
        </mesh>
        {/* Cap dome */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0, 0.4, 0.35, 4]} />
          <meshStandardMaterial color="#1e3a5f" />
        </mesh>
        {/* Tassel ball */}
        <mesh position={[0.4, 0.05, 0.4]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#f5c542" />
        </mesh>
      </group>
    </Float>
  );
};

const LightBulb = ({ position }: { position: [number, number, number] }) => (
  <Float speed={2.2} rotationIntensity={0.2} floatIntensity={1.8}>
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#7dd3fc" transparent opacity={0.6} emissive="#7dd3fc" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.15, 8]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
    </group>
  </Float>
);

const Scene3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 3, 3]} intensity={0.4} color="#7dd3fc" />

        <Book position={[-4.5, 2, -1]} rotation={[0.3, 0.5, 0.1]} color="#3b82f6" />
        <Book position={[4.2, -1.5, -2]} rotation={[-0.2, 1, 0.3]} color="#0ea5e9" />
        <Book position={[-3.5, -2, 0]} rotation={[0.1, -0.8, -0.2]} color="#2563eb" />

        <Pencil position={[4.5, 2.5, -1]} rotation={[0, 0, 0.8]} />
        <Pencil position={[-2, 3, -2]} rotation={[0, 0, -0.5]} />

        <GradCap position={[3, 1, -1.5]} rotation={[0.2, 0.3, 0.1]} />
        <GradCap position={[-4, -0.5, -1]} rotation={[-0.1, 1.2, 0]} />

        <LightBulb position={[1.5, 3, -1]} />
        <LightBulb position={[-1.5, -2.5, 0]} />
      </Canvas>
    </div>
  );
};

export default Scene3D;

"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { SKILLS } from "@/lib/constants";

function SkillNode({
  position,
  label,
  color,
}: {
  position: [number, number, number];
  label: string;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
        {/* Outer glow */}
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.15} />
        </mesh>
        <Text
          position={[0, -0.35, 0]}
          fontSize={0.15}
          color="#bbc9ce"
          anchorX="center"
          anchorY="middle"
          
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

export default function SkillsSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const nodePositions = useMemo(() => {
    const radius = 2;
    return SKILLS.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / SKILLS.length);
      const theta = Math.sqrt(SKILLS.length * Math.PI) * phi;
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ] as [number, number, number];
    });
  }, []);

  // Create connection lines between nodes
  const linePositions = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        positions.push(...nodePositions[i], ...nodePositions[j]);
      }
    }
    return new Float32Array(positions);
  }, [nodePositions]);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.1 + mouse.x * 0.3;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.2 + mouse.y * 0.2;
  });

  const colors = ["#00d9ff", "#7C3AED"];

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Skill nodes */}
      {SKILLS.map((skill, i) => (
        <SkillNode
          key={skill}
          position={nodePositions[i]}
          label={skill}
          color={colors[i % 2]}
        />
      ))}
    </group>
  );
}

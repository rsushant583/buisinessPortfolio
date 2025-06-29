
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create geometry and material only once
  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#6366f1',
    roughness: 0.4,
    metalness: 0.8,
    transparent: true,
    opacity: 0.8
  }), []);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Add subtle color animation
      const hue = (Math.sin(state.clock.elapsedTime * 0.5) + 1) * 0.5;
      material.color.setHSL(0.66 + hue * 0.1, 0.8, 0.6);
    }
  });

  return (
    <mesh ref={meshRef} geometry={sphereGeometry} material={material} scale={2} />
  );
};

export default AnimatedSphere;

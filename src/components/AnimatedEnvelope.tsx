
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

interface EnvelopeProps {
  isTyping: boolean;
}

const Envelope3D = ({ isTyping }: { isTyping: boolean }) => {
  const envelopeRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (envelopeRef.current) {
      envelopeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      envelopeRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
    
    if (flapRef.current) {
      const targetRotation = isTyping ? -Math.PI * 0.4 : 0;
      flapRef.current.rotation.x = THREE.MathUtils.lerp(
        flapRef.current.rotation.x,
        targetRotation,
        0.1
      );
    }
  });

  return (
    <group ref={envelopeRef}>
      {/* Envelope Base */}
      <Box args={[2, 1.4, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#f3f4f6" />
      </Box>
      
      {/* Envelope Flap */}
      <mesh ref={flapRef} position={[0, 0.7, 0.05]}>
        <boxGeometry args={[2, 1.4, 0.05]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      
      {/* Letter inside */}
      {isTyping && (
        <Box args={[1.8, 1.2, 0.02]} position={[0, -0.1, 0.08]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
      )}
    </group>
  );
};

const AnimatedEnvelope: React.FC<EnvelopeProps> = ({ isTyping }) => {
  return (
    <motion.div
      className="h-64 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl backdrop-blur-sm border border-white/20 overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Envelope3D isTyping={isTyping} />
      </Canvas>
      
      <motion.div
        className="absolute bottom-4 left-4 right-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTyping ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm text-gray-300">
          {isTyping ? "📝 Your message is being prepared..." : "✉️ Ready to receive your message"}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedEnvelope;

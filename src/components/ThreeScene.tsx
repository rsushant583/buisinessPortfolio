import React, { Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const AnimatedSphere = memo(require('./AnimatedSphere').default);

const ThreeScene = () => {
  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={(state) => {
          state.gl.setClearColor('#000000', 0);
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
          
          <Stars 
            radius={100} 
            depth={50} 
            count={500} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1}
          />
          
          <AnimatedSphere />
          
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;

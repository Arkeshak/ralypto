"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls, Line, RoundedBox, Edges } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const C = {
  black: "#111111",
  grey: "#888888",
  blue: "#29b6f6",
  purple: "#8e24aa",
  gold: "#ffca28",
  silver: "#e0e0e0",
  green: "#4caf50",
  red: "#f44336",
  blueprintBg: "#0f3a63",
  blueprintLine: "#55aaff",
};

// 1. Office Delivery Robot
function OfficeDeliveryRobot({ animate, phase }: { animate: boolean, phase: number }) {
  const chassisRef = useRef<THREE.Group>(null);
  const columnsRef = useRef<THREE.Group>(null);
  const upperRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group>(null);
  const routeRef = useRef<THREE.Group>(null);

  const isBlueprint = phase === 0;
  const isAssemble = phase === 1;
  const isRotate = phase === 2;
  const isMap = phase >= 3;

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    
    if (isAssemble || isRotate || isMap) {
      if (chassisRef.current) chassisRef.current.position.y = THREE.MathUtils.lerp(chassisRef.current.position.y, 0, 0.1);
      if (columnsRef.current) columnsRef.current.position.y = THREE.MathUtils.lerp(columnsRef.current.position.y, 0.4, 0.1);
      if (upperRef.current) upperRef.current.position.y = THREE.MathUtils.lerp(upperRef.current.position.y, 1.2, 0.1);
      if (wheelsRef.current) wheelsRef.current.position.y = THREE.MathUtils.lerp(wheelsRef.current.position.y, -0.4, 0.1);
    } else {
      // spread out
      if (chassisRef.current) chassisRef.current.position.y = -0.5;
      if (columnsRef.current) columnsRef.current.position.y = 1.0;
      if (upperRef.current) upperRef.current.position.y = 2.0;
      if (wheelsRef.current) wheelsRef.current.position.y = -1.0;
    }
  });

  const materialProps = isBlueprint 
    ? { color: C.blueprintBg, transparent: true, opacity: 0.8 } 
    : { color: C.grey, transparent: false, opacity: 1 };
  
  const boxMat = isBlueprint ? C.blueprintBg : C.black;
  const lidMat = isBlueprint ? C.blueprintBg : C.purple;
  const topLidMat = isBlueprint ? C.blueprintBg : C.blue;
  const edgeColor = isBlueprint ? C.blueprintLine : C.grey;

  return (
    <group position={[isMap ? -1.5 : 0, isMap ? 0 : -0.5, 0]}>
      {/* Wheels */}
      <group ref={wheelsRef}>
        {[
          [-0.6, 0.5], [0.6, 0.5], [-0.6, -0.5], [0.6, -0.5]
        ].map((pos, i) => (
          <mesh key={i} position={[pos[0], 0, pos[1]]} rotation={[Math.PI/2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.1]} />
            <meshStandardMaterial color={isBlueprint ? C.blueprintBg : C.black} />
            <Edges color={edgeColor} />
            <mesh position={[0, 0.06, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.02]} />
              <meshStandardMaterial color={isBlueprint ? C.blueprintBg : C.gold} />
            </mesh>
          </mesh>
        ))}
      </group>

      {/* Chassis */}
      <group ref={chassisRef}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.6, 0.5, 1]} />
          <meshStandardMaterial color={boxMat} />
          <Edges color={edgeColor} />
        </mesh>
        {/* Eyes on front (only if not blueprint) */}
        {!isBlueprint && (
          <mesh position={[0, 0, 0.51]}>
            <planeGeometry args={[1.5, 0.4]} />
            <meshBasicMaterial color="#333" />
          </mesh>
        )}
        {/* Lower Lid */}
        <mesh position={[0, 0.26, 0]} castShadow>
          <boxGeometry args={[1.7, 0.05, 1.1]} />
          <meshStandardMaterial color={lidMat} />
          <Edges color={edgeColor} />
        </mesh>
      </group>

      {/* Columns */}
      <group ref={columnsRef}>
        {[
          [-0.6, 0.3], [0.6, 0.3], [-0.6, -0.3], [0.6, -0.3]
        ].map((pos, i) => (
          <mesh key={i} position={[pos[0], 0, pos[1]]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.8]} />
            <meshStandardMaterial color={materialProps.color} transparent={materialProps.transparent} opacity={materialProps.opacity} />
            <Edges color={edgeColor} />
          </mesh>
        ))}
        {/* Center Electronics (LiDAR/ESP32) */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.15]} />
          <meshStandardMaterial color={isBlueprint ? C.blueprintBg : C.black} />
        </mesh>
      </group>

      {/* Upper Compartment */}
      <group ref={upperRef}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.6, 0.4, 1.1]} />
          <meshStandardMaterial color={isBlueprint ? C.blueprintBg : C.grey} />
          <Edges color={edgeColor} />
        </mesh>
        {/* Upper Lid */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[1.7, 0.05, 1.2]} />
          <meshStandardMaterial color={topLidMat} />
          <Edges color={edgeColor} />
        </mesh>
      </group>

      {/* Route Animation */}
      {isMap && (
        <group position={[2.5, 0, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <mesh position={[0, 0, -0.1]}>
            <planeGeometry args={[3, 3]} />
            <meshBasicMaterial color="#1a1a1a" />
            <Edges color="#333" />
          </mesh>
          
          <mesh position={[-1, -1, 0]}>
            <circleGeometry args={[0.1]} />
            <meshBasicMaterial color={C.blue} />
          </mesh>
          <mesh position={[1, 1, 0]}>
            <circleGeometry args={[0.1]} />
            <meshBasicMaterial color={C.green} />
          </mesh>
          
          {phase >= 4 && (
            <Line points={[[-1, -1, 0], [-1, 1, 0], [1, 1, 0]]} color={C.grey} lineWidth={3} dashed />
          )}
          
          {phase >= 5 && (
            <mesh position={[-1, 1, 0.05]}>
              <boxGeometry args={[0.3, 0.3, 0.1]} />
              <meshBasicMaterial color={C.red} />
            </mesh>
          )}

          {phase >= 6 && (
            <Line points={[[-1, -1, 0.01], [0.5, -1, 0.01], [0.5, 1, 0.01], [1, 1, 0.01]]} color={C.blue} lineWidth={4} />
          )}
        </group>
      )}
    </group>
  );
}

// 2. Tea-Leaf Plucking Robot
function TeaPluckingRobot({ animate, phase }: { animate: boolean, phase: number }) {
  const isBlueprint = phase === 0;
  const isAssemble = phase === 1;
  const isAnimate = phase >= 2;
  const isVision = phase >= 3;
  const isPick = phase >= 5;

  const bogieRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  const teaPlantRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    
    if (bogieRef.current && isAnimate) {
      bogieRef.current.rotation.z = Math.sin(t * 2) * 0.1;
    }
    if (armRef.current) {
      if (isPick) {
        // Move arm forward to pick
        armRef.current.position.z = THREE.MathUtils.lerp(armRef.current.position.z, 0.8, 0.1);
        armRef.current.rotation.x = THREE.MathUtils.lerp(armRef.current.rotation.x, -0.4, 0.1);
      } else {
        armRef.current.position.z = THREE.MathUtils.lerp(armRef.current.position.z, 0, 0.1);
        armRef.current.rotation.x = THREE.MathUtils.lerp(armRef.current.rotation.x, 0, 0.1);
      }
    }
  });

  const frameMat = isBlueprint ? C.blueprintBg : C.silver;
  const edgeColor = isBlueprint ? C.blueprintLine : "#999";
  
  return (
    <group position={[isVision ? -1 : 0, -0.5, 0]}>
      {/* Chassis Frame */}
      <group position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.2, 0.2, 1.2]} />
        <meshStandardMaterial color={isBlueprint ? C.blueprintBg : C.black} />
        <Edges color={edgeColor} />
      </group>
      
      {/* Rocker-Bogie (Simplified) */}
      <group ref={bogieRef} position={[0, 0, 0]}>
        {[-0.7, 0.7].map((x, i) => (
          <group key={i} position={[x, 0.1, 0]}>
            <mesh rotation={[Math.PI/4, 0, 0]}>
              <boxGeometry args={[0.1, 1, 0.1]} />
              <meshStandardMaterial color={frameMat} />
              <Edges color={edgeColor} />
            </mesh>
            <mesh position={[0, -0.4, 0.3]} rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color={isBlueprint ? C.blueprintBg : C.black} />
            </mesh>
            <mesh position={[0, 0.3, -0.4]} rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color={isBlueprint ? C.blueprintBg : C.black} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Main Tower & Arm */}
      <group position={[0, 0.4, 0]}>
        {/* Tower */}
        <mesh position={[0, 0.5, -0.2]}>
          <boxGeometry args={[0.2, 1, 0.2]} />
          <meshStandardMaterial color={frameMat} />
          <Edges color={edgeColor} />
        </mesh>
        
        {/* Robotic Arm */}
        <group ref={armRef} position={[0, 0.8, -0.1]}>
          <mesh position={[0, 0, 0.3]}>
            <boxGeometry args={[0.15, 0.15, 0.8]} />
            <meshStandardMaterial color={isBlueprint ? C.blueprintBg : C.black} />
            <Edges color={edgeColor} />
          </mesh>
          <mesh position={[0, -0.2, 0.7]}>
            <boxGeometry args={[0.3, 0.4, 0.3]} />
            <meshStandardMaterial color={isBlueprint ? C.blueprintBg : "#aaa"} transparent opacity={0.6} />
            <Edges color={edgeColor} />
          </mesh>
          {/* Pi/Camera on top */}
          <mesh position={[0, 0.2, 0.7]}>
            <boxGeometry args={[0.2, 0.1, 0.2]} />
            <meshStandardMaterial color={isBlueprint ? C.blueprintBg : C.red} />
          </mesh>
        </group>
      </group>

      {/* Tea Plant Scene */}
      {isVision && (
        <group ref={teaPlantRef} position={[2, 0.5, 1]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.05, 1]} />
            <meshStandardMaterial color="#5d4037" />
          </mesh>
          <mesh position={[-0.2, 0.2, 0]} rotation={[0, 0, 0.5]}>
            <cylinderGeometry args={[0.2, 0.01, 0.01]} />
            <meshStandardMaterial color={C.green} />
          </mesh>
          <mesh position={[0.2, 0.4, 0]} rotation={[0, 0, -0.5]}>
            <cylinderGeometry args={[0.2, 0.01, 0.01]} />
            <meshStandardMaterial color={C.green} />
          </mesh>
          
          {/* Highlighted leaf */}
          <group position={[0, 0.6, 0]}>
            <mesh>
              <cylinderGeometry args={[0.2, 0.01, 0.01]} />
              <meshStandardMaterial color={C.green} />
            </mesh>
            {phase >= 4 && (
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshBasicMaterial color={C.gold} wireframe />
              </mesh>
            )}
          </group>
        </group>
      )}
    </group>
  );
}

export default function RealProjectsVisual({ kind }: { kind: string }) {
  const [visible, setVisible] = useState(false);
  const [canAnimate, setCanAnimate] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setCanAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const el = stageRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    
    // Sequence states: 0 to 7
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 8);
    }, 2500);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div ref={stageRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, background: phase === 0 ? C.blueprintBg : 'transparent', transition: 'background 1s' }}>
      {visible ? (
        <>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [3, 3, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
            
            {kind === "office-delivery" && <OfficeDeliveryRobot animate={canAnimate} phase={phase} />}
            {kind === "tea-plucking" && <TeaPluckingRobot animate={canAnimate} phase={phase} />}

            <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2.4} far={4} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              autoRotate={canAnimate && phase === 2}
              autoRotateSpeed={2}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.8}
            />
          </Canvas>
          
          {/* Phase Indicator UI */}
          <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', zIndex: 10, alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: '4px' }}>
              Phase: {phase} / 7
            </span>
          </div>
        </>
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,0.5)' }}>
          Loading illustrative demo...
        </div>
      )}
    </div>
  );
}

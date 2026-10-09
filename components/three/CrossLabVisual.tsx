"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const C = {
  shell: "#eef2fb",
  metal: "#9aa6bd",
  dark: "#1b1530",
  orange: "#ff7a1a",
  blue: "#3a78ff",
  pcb: "#0f6b4f",
  green: "#4caf50",
  soil: "#8d6e63",
  water: "#29b6f6",
};

function useTextTexture(text: string, pill: boolean) {
  const out = useMemo(() => {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d")!;
    const font = pill ? '600 44px "Figtree Variable", Arial, sans-serif' : '800 120px "Sora Variable", Arial, sans-serif';
    ctx.font = font;
    const pad = pill ? 30 : 10;
    const w = Math.ceil(ctx.measureText(text).width) + pad * 2;
    const h = pill ? 84 : 160;
    c.width = w;
    c.height = h;
    ctx.font = font;
    if (pill) {
      ctx.fillStyle = "rgba(27,21,48,0.92)";
      ctx.strokeStyle = C.orange;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(2, 2, w - 4, h - 4, (h - 4) / 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "middle";
    ctx.fillText(text, pad, h / 2 + 3);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return { tex, aspect: w / h };
  }, [text, pill]);
  useEffect(() => () => out.tex.dispose(), [out]);
  return out;
}

function Label({ children, position }: { children: string; position: [number, number, number] }) {
  const { tex, aspect } = useTextTexture(children, true);
  return (
    <sprite position={position} scale={[0.3 * aspect, 0.3, 1]} renderOrder={10}>
      <spriteMaterial map={tex} transparent depthTest={false} />
    </sprite>
  );
}

function ScreenText({ text, position, height, rotation = [0, 0, 0] }: { text: string; position: [number, number, number]; height: number; rotation?: [number, number, number] }) {
  const { tex, aspect } = useTextTexture(text, false);
  return (
    <mesh position={position} rotation={new THREE.Euler(...rotation)}>
      <planeGeometry args={[height * aspect, height]} />
      <meshBasicMaterial map={tex} transparent toneMapped={false} />
    </mesh>
  );
}

// 1. Smart Agriculture
function FarmScene({ animate, active }: { animate: boolean, active: boolean }) {
  const water = useRef<THREE.Mesh>(null);
  const dataPacket = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    const t = animate ? clock.getElapsedTime() : 0;
    if (water.current) {
      water.current.position.z = active ? (t % 2) - 1 : -1;
      (water.current.material as any).opacity = active ? 1 : 0;
    }
    if (dataPacket.current) {
      dataPacket.current.position.y = 0.5 + ((t * 1.5) % 1);
      (dataPacket.current.material as any).opacity = 1 - ((t * 1.5) % 1);
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.2, 3]} />
        <meshStandardMaterial color={C.soil} />
      </mesh>
      
      {/* Crops */}
      {[-1, 0, 1].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[0.3, 0.4, 2.5]} />
            <meshStandardMaterial color={C.green} />
          </mesh>
          <mesh position={[0, 0.1, 0]} rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 2.8]} />
            <meshStandardMaterial color={C.metal} />
          </mesh>
        </group>
      ))}

      {/* Sensor */}
      <mesh position={[-1, 0.3, 1]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.4]} />
        <meshStandardMaterial color={C.shell} />
      </mesh>
      <mesh ref={dataPacket} position={[-1, 0.5, 1]}>
        <sphereGeometry args={[0.05]} />
        <meshBasicMaterial color={C.blue} transparent />
      </mesh>

      {/* Water flow */}
      <mesh ref={water} position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.06]} />
        <meshBasicMaterial color={C.water} />
      </mesh>

      {/* Dashboard */}
      <group position={[0, 1.5, -1.2]} rotation={[0.2, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 1, 0.1]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>
        <ScreenText text={`Moisture: ${active ? 'Good' : 'Low'}`} position={[0, 0.2, 0.06]} height={0.15} />
        <ScreenText text={active ? "Irrigating..." : "Standby"} position={[0, -0.2, 0.06]} height={0.12} />
      </group>
    </group>
  );
}

// 2. Factory Monitoring
function FactoryScene({ animate, active }: { animate: boolean, active: boolean }) {
  const motor = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const t = animate ? clock.getElapsedTime() : 0;
    if (motor.current) {
      motor.current.rotation.x = active ? t * 4 : t * 0.5; // fast vs slow
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#545e6b" />
      </mesh>

      <group position={[-0.5, 0.5, 0]}>
        <mesh castShadow rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.4, 0.4, 1, 32]} />
          <meshStandardMaterial color={active ? C.metal : "#885555"} />
        </mesh>
        <group ref={motor}>
          <mesh position={[0.6, 0, 0]} castShadow rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.4]} />
            <meshStandardMaterial color={C.dark} />
          </mesh>
        </group>
      </group>

      <mesh position={[-0.5, 0.9, 0]} castShadow>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color={C.orange} />
      </mesh>
      
      {/* Dashboard */}
      <group position={[1.2, 1.2, -0.5]} rotation={[0, -0.3, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.6, 1.2, 0.1]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>
        <ScreenText text={active ? "Status: Normal" : "Status: Warning"} position={[0, 0.3, 0.06]} height={0.15} />
        <ScreenText text={active ? "Temp: 45C" : "Temp: 85C"} position={[0, 0, 0.06]} height={0.12} />
        <ScreenText text="Vibration: OK" position={[0, -0.3, 0.06]} height={0.12} />
      </group>
    </group>
  );
}

// 3. Security Monitoring
function SecurityScene({ animate }: { animate: boolean }) {
  const camera = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const t = animate ? clock.getElapsedTime() : 0;
    if (camera.current) {
      camera.current.rotation.y = Math.sin(t) * 0.4;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Floor */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3, 0.1, 3]} />
        <meshStandardMaterial color={C.shell} />
      </mesh>

      {/* Person dummy */}
      <group position={[0.5, 0.5, 0.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.15, 0.8]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>
        {/* Detection Box */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.6, 1.2, 0.6]} />
          <meshBasicMaterial color={C.orange} wireframe />
        </mesh>
      </group>

      {/* Camera */}
      <group position={[-1, 1.5, -1]} ref={camera}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.2, 0.4]} />
          <meshStandardMaterial color={C.metal} />
        </mesh>
        <mesh position={[0, 0, 0.2]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.2]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>
      </group>

      {/* Dashboard */}
      <group position={[1.5, 1.5, -1]} rotation={[0, -0.4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.6, 1, 0.1]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>
        <ScreenText text="Person Detected" position={[0, 0.2, 0.06]} height={0.15} />
        <ScreenText text="Zone A - Alert" position={[0, -0.2, 0.06]} height={0.12} />
      </group>
    </group>
  );
}

// 4. Product Dev
function ProductScene({ animate, active }: { animate: boolean, active: boolean }) {
  const top = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const expand = active ? 1 : 0;
    if (top.current) {
      top.current.position.y = THREE.MathUtils.lerp(top.current.position.y, 0.3 + expand * 0.8, 0.1);
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* App representation */}
      <group position={[-1.2, 1, -1]} rotation={[0, 0.3, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 2, 0.1]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>
        <ScreenText text="App Sync" position={[0, 0.6, 0.06]} height={0.15} />
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[0.8, 0.8]} />
          <meshBasicMaterial color={C.blue} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Cloud line */}
      <mesh position={[-0.4, 1, -0.5]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.02, 0.02, 1]} />
        <meshBasicMaterial color={C.orange} />
      </mesh>

      {/* Device */}
      <group position={[0.5, 0, 0]}>
        <group ref={top}>
          <RoundedBox args={[1.4, 0.2, 2]} radius={0.05} castShadow>
            <meshStandardMaterial color={C.shell} transparent opacity={0.9} />
          </RoundedBox>
        </group>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 0.05, 1.8]} />
          <meshStandardMaterial color={C.pcb} />
        </mesh>
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[1.4, 0.2, 2]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>
      </group>
    </group>
  );
}


function CrossLabSceneInner({ kind, animate }: { kind: string; animate: boolean }) {
  const [active, setActive] = useState(true);

  // Auto toggle active state for product exploded view only
  useEffect(() => {
    if (kind === 'product') {
      const interval = setInterval(() => {
        setActive(prev => !prev);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [kind]);

  return (
    <>
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [3, 3, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-6, 3, -4]} intensity={0.5} color="#bcd0ff" />

      {kind === "farm" && <FarmScene animate={animate} active={active} />}
      {kind === "factory" && <FactoryScene animate={animate} active={active} />}
      {kind === "security" && <SecurityScene animate={animate} />}
      {kind === "product" && <ProductScene animate={animate} active={active} />}

      {/* ContactShadows */}
      <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2.4} far={4} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={animate}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
      
      {/* Toggles based on scene */}
      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', zIndex: 10, alignItems: 'center' }}>
        {(kind === 'factory' || kind === 'farm') && (
          <button 
            onClick={() => setActive(!active)}
            style={{ padding: '0.4rem 0.8rem', background: '#ff7a1a', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--f-hw, sans-serif)', fontSize: '0.8rem' }}
          >
            Toggle State
          </button>
        )}
        <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: '4px' }}>
          Interactive 3D System Model
        </span>
      </div>
    </>
  );
}

export default function CrossLabVisual({ kind }: { kind: string }) {
  const [visible, setVisible] = useState(false);
  const [canAnimate, setCanAnimate] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={stageRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      {visible ? (
        <CrossLabSceneInner kind={kind} animate={canAnimate} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,0.5)' }}>
          Loading interactive demo...
        </div>
      )}
    </div>
  );
}

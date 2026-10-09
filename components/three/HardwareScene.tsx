"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* Three hardware models built from simple shapes, so no model files are needed.
   Swap any of them for a real exported model (.glb) later with drei's useGLTF. */

export type ModelId = "arm" | "meter" | "controller";

const C = {
  shell: "#eef2fb",
  metal: "#9aa6bd",
  dark: "#1b1530",
  orange: "#ff7a1a",
  blue: "#3a78ff",
  pcb: "#0f6b4f",
};

/* Text drawn onto a canvas and used as a texture, so labels live inside the 3D scene. */
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
  const h = 0.3;
  return (
    <sprite position={position} scale={[h * aspect, h, 1]} renderOrder={10}>
      <spriteMaterial map={tex} transparent depthTest={false} />
    </sprite>
  );
}

function ScreenText({ text, position, height }: { text: string; position: [number, number, number]; height: number }) {
  const { tex, aspect } = useTextTexture(text, false);
  return (
    <mesh position={position}>
      <planeGeometry args={[height * aspect, height]} />
      <meshBasicMaterial map={tex} transparent toneMapped={false} />
    </mesh>
  );
}

/* ---------- 1. Robot arm: smooth sine-wave motion on every joint ---------- */
function RobotArm({ animate, labels }: { animate: boolean; labels: boolean }) {
  const turn = useRef<THREE.Group>(null);
  const shoulder = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  const wrist = useRef<THREE.Group>(null);
  const f1 = useRef<THREE.Mesh>(null);
  const f2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = animate ? clock.getElapsedTime() : 1.2;
    if (turn.current) turn.current.rotation.y = Math.sin(t * 0.45) * 0.9;
    if (shoulder.current) shoulder.current.rotation.z = Math.sin(t * 0.7) * 0.3 - 0.25;
    if (elbow.current) elbow.current.rotation.z = Math.sin(t * 0.7 + 1.1) * 0.45 + 1.0;
    if (wrist.current) wrist.current.rotation.z = Math.sin(t * 0.7 + 2.2) * 0.4 + 0.3;

    const open = 0.09 + (Math.sin(t * 1.4) + 1) * 0.05;
    if (f1.current) f1.current.position.x = -open;
    if (f2.current) f2.current.position.x = open;
  });

  return (
    <group position={[0, -1.4, 0]}>
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[1, 1.15, 0.24, 48]} />
        <meshStandardMaterial color={C.dark} metalness={0.4} roughness={0.5} />
      </mesh>
      <group ref={turn} position={[0, 0.24, 0]}>
        <mesh position={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.7, 0.36, 48]} />
          <meshStandardMaterial color={C.shell} roughness={0.35} />
        </mesh>
        <group ref={shoulder} position={[0, 0.5, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.28, 0.28, 0.6, 32]} />
            <meshStandardMaterial color={C.orange} roughness={0.4} />
          </mesh>
          <RoundedBox args={[0.34, 1.7, 0.34]} radius={0.1} position={[0, 0.85, 0]} castShadow>
            <meshStandardMaterial color={C.shell} roughness={0.35} />
          </RoundedBox>
          <group ref={elbow} position={[0, 1.7, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.22, 0.5, 32]} />
              <meshStandardMaterial color={C.orange} roughness={0.4} />
            </mesh>
            <RoundedBox args={[0.28, 1.35, 0.28]} radius={0.08} position={[0, 0.68, 0]} castShadow>
              <meshStandardMaterial color={C.shell} roughness={0.35} />
            </RoundedBox>
            <group ref={wrist} position={[0, 1.35, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.16, 32, 32]} />
                <meshStandardMaterial color={C.dark} metalness={0.5} roughness={0.4} />
              </mesh>
              <mesh ref={f1} position={[-0.1, 0.28, 0]} castShadow>
                <boxGeometry args={[0.06, 0.42, 0.16]} />
                <meshStandardMaterial color={C.metal} metalness={0.7} roughness={0.3} />
              </mesh>
              <mesh ref={f2} position={[0.1, 0.28, 0]} castShadow>
                <boxGeometry args={[0.06, 0.42, 0.16]} />
                <meshStandardMaterial color={C.metal} metalness={0.7} roughness={0.3} />
              </mesh>
              {labels && <Label position={[0.5, 0.4, 0]}>Gripper</Label>}
            </group>
            {labels && <Label position={[0.55, 0, 0]}>Elbow servo</Label>}
          </group>
          {labels && <Label position={[0.6, 0, 0]}>Shoulder servo</Label>}
        </group>
      </group>
      {labels && <Label position={[1.3, 0.12, 0]}>Turntable base</Label>}
    </group>
  );
}

/* ---------- 2. Smart water meter: device with spinning flow ring ---------- */
function SmartMeter({ animate, labels }: { animate: boolean; labels: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  const led = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }, dt) => {
    if (!animate) return;
    if (ring.current) ring.current.rotation.z -= dt * 1.6;
    if (led.current) led.current.emissiveIntensity = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.8;
  });

  return (
    <Float speed={animate ? 1.6 : 0} rotationIntensity={0.25} floatIntensity={0.6}>
      <group position={[0, 0.1, 0]}>
        <RoundedBox args={[2, 2, 0.7]} radius={0.3} smoothness={6} castShadow>
          <meshStandardMaterial color={C.shell} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0.1, 0.36]}>
          <circleGeometry args={[0.72, 64]} />
          <meshStandardMaterial color={C.dark} roughness={0.2} />
        </mesh>
        <mesh ref={ring} position={[0, 0.1, 0.38]}>
          <torusGeometry args={[0.62, 0.05, 16, 64, Math.PI * 1.5]} />
          <meshStandardMaterial color={C.blue} emissive={C.blue} emissiveIntensity={0.6} />
        </mesh>
        <ScreenText text="12.4 L" position={[0, 0.1, 0.4]} height={0.32} />

        <mesh position={[0.62, -0.72, 0.36]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial ref={led} color={C.orange} emissive={C.orange} emissiveIntensity={1} />
        </mesh>

        {/* water pipe through the bottom */}
        <mesh position={[0, -1.25, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 3.6, 32]} />
          <meshStandardMaterial color={C.metal} metalness={0.8} roughness={0.25} />
        </mesh>
        {[-0.9, 0.9].map((x) => (
          <mesh key={x} position={[x, -1.25, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.22, 6]} />
            <meshStandardMaterial color={C.orange} metalness={0.3} roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[0, -1.05, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.4]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>

        {labels && (
          <>
            <Label position={[1.5, 0.6, 0]}>Live usage display</Label>
            <Label position={[1.6, -1.25, 0]}>Flow sensor on pipe</Label>
            <Label position={[-1.5, -0.6, 0]}>Wi-Fi status LED</Label>
          </>
        )}
      </group>
    </Float>
  );
}

/* ---------- 3. Pump controller: lid lifts to show the circuit board ---------- */
function Controller({ animate, labels }: { animate: boolean; labels: boolean }) {
  const lid = useRef<THREE.Group>(null);
  const led = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (lid.current) lid.current.position.y = animate ? 0.75 + (Math.sin(t * 0.8) + 1) * 0.45 : 1.2;
    if (led.current && animate) led.current.emissiveIntensity = Math.sin(t * 6) > 0 ? 2 : 0.2;
  });

  return (
    <group position={[0, -0.6, 0]} rotation={[0, -0.4, 0]}>
      {/* case base */}
      <RoundedBox args={[3, 0.5, 2]} radius={0.12} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#d7deeb" roughness={0.4} />
      </RoundedBox>

      {/* circuit board */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[2.6, 0.06, 1.6]} />
        <meshStandardMaterial color={C.pcb} roughness={0.6} />
      </mesh>

      {/* ESP32 module */}
      <mesh position={[-0.75, 0.4, -0.2]} castShadow>
        <boxGeometry args={[0.8, 0.12, 0.55]} />
        <meshStandardMaterial color={C.metal} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* relays */}
      {[0.45, 1.0].map((x) => (
        <mesh key={x} position={[x, 0.55, -0.25]} castShadow>
          <boxGeometry args={[0.45, 0.45, 0.5]} />
          <meshStandardMaterial color={C.blue} roughness={0.4} />
        </mesh>
      ))}

      {/* chips */}
      {[-0.9, -0.4].map((x) => (
        <mesh key={x} position={[x, 0.37, 0.45]}>
          <boxGeometry args={[0.3, 0.06, 0.3]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>
      ))}

      {/* terminal block */}
      <mesh position={[0.7, 0.42, 0.55]}>
        <boxGeometry args={[1, 0.18, 0.3]} />
        <meshStandardMaterial color="#2fb36b" roughness={0.5} />
      </mesh>

      <mesh position={[1.1, 0.4, 0.2]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial ref={led} color={C.orange} emissive={C.orange} emissiveIntensity={2} />
      </mesh>

      {/* see-through lid */}
      <group ref={lid} position={[0, 1, 0]}>
        <RoundedBox args={[3, 0.25, 2]} radius={0.1}>
          <meshPhysicalMaterial color="#dce8ff" transparent opacity={0.35} roughness={0.1} transmission={0.3} />
        </RoundedBox>
      </group>

      {labels && (
        <>
          <Label position={[-1.5, 0.6, -0.6]}>ESP32 Wi-Fi brain</Label>
          <Label position={[1.2, 1.1, -0.8]}>Pump relays</Label>
          <Label position={[1.9, 0.3, 0.6]}>Status LED</Label>
        </>
      )}
    </group>
  );
}

export default function HardwareScene({ model, labels, animate }: { model: ModelId; labels: boolean; animate: boolean }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [4.8, 2.8, 6.2], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-6, 3, -4]} intensity={0.5} color="#bcd0ff" />

      {model === "arm" && <RobotArm animate={animate} labels={labels} />}
      {model === "meter" && <SmartMeter animate={animate} labels={labels} />}
      {model === "controller" && <Controller animate={animate} labels={labels} />}

      <ContactShadows position={[0, -1.45, 0]} opacity={0.45} scale={9} blur={2.4} far={4} />
      <OrbitControls
        target={[0, 0.2, 0]}
        enablePan={false}
        enableZoom={false}
        autoRotate={animate}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}

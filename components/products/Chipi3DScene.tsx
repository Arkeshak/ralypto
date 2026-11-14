"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";

const C = {
  shell: "#16161a",
  shellBack: "#131316",
  bezel: "#08080a",
  screenGlow: "#00d2ff",
  amber: "#ffaf0d",
  white: "#ffffff",
  metal: "#e2ecfa",
  metalDark: "#525c70",
  pcb: "#0e5a3a",
  gold: "#d4af37",
  chip: "#252528",
  rfShield: "#b8c4d8",
};

/* 3D Billboard label inside the scene */
function Label({ children, position }: { children: string; position: [number, number, number] }) {
  const { tex, aspect } = useMemo(() => {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d")!;
    ctx.font = '600 36px "Figtree Variable", Arial, sans-serif';

    const textWidth = ctx.measureText(children).width;
    const pad = 24;
    const w = Math.ceil(textWidth) + pad * 2;
    const h = 72;
    c.width = w;
    c.height = h;

    ctx.font = '600 36px "Figtree Variable", Arial, sans-serif';
    ctx.fillStyle = "rgba(5, 15, 46, 0.92)";
    ctx.strokeStyle = "#ffaf0d";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.roundRect(2, 2, w - 4, h - 4, (h - 4) / 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "middle";
    ctx.fillText(children, pad, h / 2 + 2);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return { tex, aspect: w / h };
  }, [children]);

  useEffect(() => () => tex.dispose(), [tex]);

  const h = 0.28;
  return (
    <sprite position={position} scale={[h * aspect, h, 1]} renderOrder={20}>
      <spriteMaterial map={tex} transparent depthTest={false} />
    </sprite>
  );
}

/* Dynamic Canvas Texture for CHIPI's animated blue OLED display */
function useOledTexture(expression: "normal" | "happy" | "sleepy" | "surprised") {
  const { tex } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 320;
    const ctx = c.getContext("2d")!;

    // Pure deep black OLED background
    ctx.fillStyle = "#01040d";
    ctx.fillRect(0, 0, 512, 320);

    // Cyan glowing eye style
    ctx.fillStyle = "#00d2ff";
    ctx.strokeStyle = "#00d2ff";
    ctx.shadowColor = "#00e1ff";
    ctx.shadowBlur = 24;

    const eyeY = 160;
    const leftX = 175;
    const rightX = 337;

    if (expression === "normal") {
      // Determined / fierce eyes with angled top eyebrows
      // Left eye
      ctx.beginPath();
      ctx.arc(leftX, eyeY + 6, 52, 0, Math.PI * 2);
      ctx.fill();

      // Left eyebrow cut
      ctx.save();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#01040d";
      ctx.beginPath();
      ctx.moveTo(110, 80);
      ctx.lineTo(240, 140);
      ctx.lineTo(110, 140);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Right eye
      ctx.beginPath();
      ctx.arc(rightX, eyeY + 6, 52, 0, Math.PI * 2);
      ctx.fill();

      // Right eyebrow cut
      ctx.save();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#01040d";
      ctx.beginPath();
      ctx.moveTo(402, 80);
      ctx.lineTo(272, 140);
      ctx.lineTo(402, 140);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Tiny cute mouth
      ctx.beginPath();
      ctx.moveTo(250, 205);
      ctx.lineTo(256, 196);
      ctx.lineTo(262, 205);
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    } else if (expression === "happy") {
      // Cheerful arched curved eyes (⌒ ⌒)
      ctx.lineWidth = 26;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.arc(leftX, eyeY + 15, 46, Math.PI * 1.05, Math.PI * 1.95, false);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(rightX, eyeY + 15, 46, Math.PI * 1.05, Math.PI * 1.95, false);
      ctx.stroke();
    } else if (expression === "sleepy") {
      // Cozy resting half-circle eyes
      ctx.beginPath();
      ctx.arc(leftX, eyeY + 10, 48, 0, Math.PI, false);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(rightX, eyeY + 10, 48, 0, Math.PI, false);
      ctx.closePath();
      ctx.fill();
    } else if (expression === "surprised") {
      // Wide circular round eyes with small cute mouth (o)
      ctx.beginPath();
      ctx.arc(leftX, eyeY, 56, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(rightX, eyeY, 56, 0, Math.PI * 2);
      ctx.fill();

      // Small round mouth
      ctx.beginPath();
      ctx.arc(256, 215, 12, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return { tex };
  }, [expression]);

  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

/* 3D CHIPI Model with realistic chamfers, OLED screen, sensor, keychain, and exploded animation */
function ChipiModel({
  expression = "normal",
  exploded = false,
  labels = true,
}: {
  expression: "normal" | "happy" | "sleepy" | "surprised";
  exploded: boolean;
  labels: boolean;
}) {
  const oledTex = useOledTexture(expression);

  const frontGroup = useRef<THREE.Group>(null);
  const oledGroup = useRef<THREE.Group>(null);
  const pcbGroup = useRef<THREE.Group>(null);
  const backGroup = useRef<THREE.Group>(null);
  const chainRingGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const expand = exploded ? 1 : 0;
    const lerpSpeed = Math.min(1, delta * 7);

    // Explode parts along Z axis
    if (frontGroup.current) {
      frontGroup.current.position.z = THREE.MathUtils.lerp(frontGroup.current.position.z, expand * 1.05, lerpSpeed);
    }
    if (oledGroup.current) {
      oledGroup.current.position.z = THREE.MathUtils.lerp(oledGroup.current.position.z, expand * 0.45, lerpSpeed);
    }
    if (pcbGroup.current) {
      pcbGroup.current.position.z = THREE.MathUtils.lerp(pcbGroup.current.position.z, expand * 0.05, lerpSpeed);
    }
    if (backGroup.current) {
      backGroup.current.position.z = THREE.MathUtils.lerp(backGroup.current.position.z, -expand * 0.85, lerpSpeed);
    }

    // Subtle gentle chain physics sway
    if (chainRingGroup.current) {
      chainRingGroup.current.rotation.z = Math.sin(Date.now() * 0.002) * 0.05;
    }
  });

  return (
    <group position={[0, 0.05, 0]}>
      {/* 1. FRONT COVER ASSEMBLY */}
      <group ref={frontGroup} position={[0, 0, 0]}>
        {/* Main matte-black front shell with chamfers */}
        <RoundedBox args={[1.8, 1.8, 0.52]} radius={0.14} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial color={C.shell} roughness={0.72} metalness={0.12} />
        </RoundedBox>

        {/* OLED screen recessed bezel window */}
        <mesh position={[0, -0.06, 0.245]}>
          <planeGeometry args={[1.36, 0.92]} />
          <meshStandardMaterial color={C.bezel} roughness={0.9} />
        </mesh>

        {/* OLED Screen display plane with glowing animated face */}
        <mesh position={[0, -0.06, 0.252]}>
          <planeGeometry args={[1.28, 0.84]} />
          <meshBasicMaterial map={oledTex} toneMapped={false} />
        </mesh>

        {/* Top Petting / Capacitive Touch Sensor */}
        <group position={[0, 0.9, 0]}>
          {/* Beveled collar */}
          <mesh position={[0, 0.02, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.28, 0.05, 32]} />
            <meshStandardMaterial color={C.shell} roughness={0.6} />
          </mesh>
          {/* White capacitive dome sensor */}
          <mesh position={[0, 0.06, 0]} castShadow>
            <sphereGeometry args={[0.21, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={C.white} roughness={0.28} metalness={0.08} />
          </mesh>
        </group>

        {/* Top-Right Corner Molded Keychain Loop */}
        <group position={[0.62, 0.95, -0.08]}>
          <mesh rotation={[0, 0, 0]} castShadow>
            <torusGeometry args={[0.21, 0.07, 16, 32]} />
            <meshStandardMaterial color={C.shell} roughness={0.7} />
          </mesh>
        </group>

        {/* Metal Keychain Chain & Split Ring */}
        <group ref={chainRingGroup} position={[0.62, 0.95, -0.08]}>
          {/* Chain Link 1 */}
          <mesh position={[0.12, -0.16, 0]} rotation={[0, 0, 0.4]} castShadow>
            <torusGeometry args={[0.085, 0.026, 12, 24]} />
            <meshStandardMaterial color={C.metal} metalness={0.94} roughness={0.18} />
          </mesh>
          {/* Chain Link 2 */}
          <mesh position={[0.2, -0.32, 0]} rotation={[0, Math.PI / 2, 0.3]} castShadow>
            <torusGeometry args={[0.085, 0.026, 12, 24]} />
            <meshStandardMaterial color={C.metal} metalness={0.94} roughness={0.18} />
          </mesh>
          {/* Chain Link 3 */}
          <mesh position={[0.28, -0.48, 0]} rotation={[0, 0, 0.2]} castShadow>
            <torusGeometry args={[0.085, 0.026, 12, 24]} />
            <meshStandardMaterial color={C.metal} metalness={0.94} roughness={0.18} />
          </mesh>

          {/* Stainless-Steel Keychain Split Ring */}
          <group position={[0.42, -0.78, 0]} rotation={[0.25, 0.35, 0.2]}>
            <mesh castShadow>
              <torusGeometry args={[0.38, 0.048, 16, 48]} />
              <meshStandardMaterial color={C.metal} metalness={0.96} roughness={0.15} />
            </mesh>
            {/* Split layer ring overlap */}
            <mesh position={[0, 0, 0.035]} castShadow>
              <torusGeometry args={[0.38, 0.042, 16, 48, Math.PI * 1.7]} />
              <meshStandardMaterial color={C.metal} metalness={0.96} roughness={0.15} />
            </mesh>
          </group>
        </group>

        {labels && !exploded && (
          <>
            <Label position={[0, 1.35, 0]}>Motion / Petting Sensor</Label>
            <Label position={[0, -1.05, 0.4]}>OLED Expressive Display</Label>
            <Label position={[1.4, -0.3, 0]}>Keychain Ready</Label>
          </>
        )}
      </group>

      {/* 2. OLED DISPLAY SUB-ASSEMBLY (Visible when exploded) */}
      <group ref={oledGroup} position={[0, 0, 0]}>
        {/* Glass PCB & Bezel Frame */}
        <mesh position={[0, -0.06, 0.1]} castShadow>
          <boxGeometry args={[1.38, 0.94, 0.04]} />
          <meshStandardMaterial color={C.bezel} roughness={0.4} />
        </mesh>
        {/* Ribbon Cable */}
        <mesh position={[0, -0.6, 0.08]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.35, 0.3]} />
          <meshStandardMaterial color={C.gold} roughness={0.3} metalness={0.8} />
        </mesh>
        {labels && exploded && <Label position={[-1.4, 0.3, 0.45]}>OLED Display Module</Label>}
      </group>

      {/* 3. ESP32 MOTHERBOARD & SENSORS (Visible when exploded) */}
      <group ref={pcbGroup} position={[0, 0, 0]}>
        {/* Custom Black/Green FR4 PCB */}
        <mesh castShadow>
          <boxGeometry args={[1.52, 1.52, 0.05]} />
          <meshStandardMaterial color={C.pcb} roughness={0.5} />
        </mesh>

        {/* Silver ESP32 RF Shield Canister */}
        <mesh position={[0, 0.12, 0.06]} castShadow>
          <boxGeometry args={[0.75, 0.75, 0.07]} />
          <meshStandardMaterial color={C.rfShield} metalness={0.92} roughness={0.2} />
        </mesh>

        {/* Motion Accelerometer IC */}
        <mesh position={[-0.42, -0.32, 0.05]} castShadow>
          <boxGeometry args={[0.22, 0.22, 0.05]} />
          <meshStandardMaterial color={C.chip} roughness={0.4} />
        </mesh>

        {/* Gold mounting vias and test pads */}
        {[-0.65, 0.65].map((x) =>
          [-0.65, 0.65].map((y) => (
            <mesh key={`${x}-${y}`} position={[x, y, 0.03]}>
              <cylinderGeometry args={[0.07, 0.07, 0.06, 16]} />
              <meshStandardMaterial color={C.gold} metalness={0.9} roughness={0.2} />
            </mesh>
          ))
        )}

        {labels && exploded && <Label position={[1.4, 0.2, 0]}>ESP32 Mainboard</Label>}
      </group>

      {/* 4. BACK COVER ASSEMBLY (Visible when exploded) */}
      <group ref={backGroup} position={[0, 0, 0]}>
        {/* Matte-black rear enclosure */}
        <RoundedBox args={[1.8, 1.8, 0.36]} radius={0.14} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial color={C.shellBack} roughness={0.75} metalness={0.1} />
        </RoundedBox>

        {/* 4 Precision Hex Fasteners */}
        {[-0.68, 0.68].map((x) =>
          [-0.68, 0.68].map((y) => (
            <mesh key={`screw-${x}-${y}`} position={[x, y, -0.19]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.04, 6]} />
              <meshStandardMaterial color={C.metalDark} metalness={0.8} roughness={0.3} />
            </mesh>
          ))
        )}

        {labels && exploded && <Label position={[-1.4, -0.4, -0.85]}>Precision Back Cover</Label>}
      </group>

      {/* 5. CIRCULAR GLOWING TURNTABLE BASE */}
      <group position={[0, -1.22, 0]}>
        {/* Dark stage pedestal disc */}
        <mesh position={[0, -0.06, 0]} receiveShadow>
          <cylinderGeometry args={[2.3, 2.4, 0.14, 64]} />
          <meshStandardMaterial color="#081026" roughness={0.65} metalness={0.25} />
        </mesh>

        {/* Outer glowing amber rim ring */}
        <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.15, 2.22, 64]} />
          <meshBasicMaterial color={C.amber} toneMapped={false} />
        </mesh>

        {/* Concentric turntable grooves */}
        <mesh position={[0, 0.016, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.68, 1.71, 64]} />
          <meshBasicMaterial color={C.amber} transparent opacity={0.65} toneMapped={false} />
        </mesh>

        <mesh position={[0, 0.016, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.15, 1.18, 64]} />
          <meshBasicMaterial color={C.amber} transparent opacity={0.4} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export default function Chipi3DScene({
  expression = "normal",
  exploded = false,
  animate = true,
  labels = true,
  resetSignal = 0,
}: {
  expression: "normal" | "happy" | "sleepy" | "surprised";
  exploded: boolean;
  animate: boolean;
  labels: boolean;
  resetSignal?: number;
}) {
  const controlsRef = useRef<OrbitControlsType>(null);

  // Handle reset camera/controls to front
  useEffect(() => {
    if (resetSignal > 0 && controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [resetSignal]);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.8, 4.8], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Studio Lighting System */}
      <ambientLight intensity={0.85} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      {/* Warm Amber Rim / Backlight matching reference studio */}
      <pointLight position={[-4, 3, -3.5]} intensity={1.4} color="#FFAF0D" />
      <directionalLight position={[-3, 2, 3]} intensity={0.4} color="#88a8ff" />

      {/* 3D CHIPI Model */}
      <ChipiModel expression={expression} exploded={exploded} labels={labels} />

      {/* Ground Contact Shadows */}
      <ContactShadows position={[0, -1.2, 0]} opacity={0.55} scale={8} blur={2.2} far={4} color="#000000" />

      {/* OrbitControls configured like Hardware Lab */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        autoRotate={animate && !exploded}
        autoRotateSpeed={0.9}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.82}
        dampingFactor={0.06}
      />
    </Canvas>
  );
}

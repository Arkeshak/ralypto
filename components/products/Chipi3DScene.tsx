"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";

// Premium Studio Material Palette
const C = {
  shell: "#282a34",        // Rich matte-charcoal polymer
  shellBack: "#22242c",    // Subtle darker rear enclosure
  bezel: "#0d0e12",        // Deep recessed screen bezel
  screenBase: "#02050e",   // OLED true-black substrate
  cyan: "#00d2ff",         // Glowing cyan OLED eyes
  amber: "#FFAF0D",        // Ralypto signature amber
  metal: "#f0f4fa",        // Stainless steel / chrome keychain
  metalDark: "#586274",    // Hex fasteners gunmetal
  pcb: "#0d5c38",          // FR4 green PCB
  gold: "#e6be44",         // Gold vias & test points
  chip: "#1f2024",         // IC chips
  rfShield: "#c4d0e2",     // Metal RF canister
};

/* 3D Billboard Label inside the scene (matches Hardware Lab) */
function Label({
  children,
  position,
  scale = 0.28,
}: {
  children: string;
  position: [number, number, number];
  scale?: number;
}) {
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
    ctx.fillStyle = "rgba(5, 15, 46, 0.94)";
    ctx.strokeStyle = "#FFAF0D";
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

  return (
    <sprite position={position} scale={[scale * aspect, scale, 1]} renderOrder={25}>
      <spriteMaterial map={tex} transparent depthTest={false} />
    </sprite>
  );
}

/* Dynamic OLED Texture with authentic high-res eyes and mouth */
function useChipiFaceTexture(expression: "normal" | "happy" | "sleepy" | "surprised") {
  const [loadedTex, setLoadedTex] = useState<THREE.Texture | null>(null);

  // Fallback high-res CanvasTexture in case image texture is loading
  const fallbackTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 320;
    const ctx = c.getContext("2d")!;

    // Pure deep black OLED background
    ctx.fillStyle = "#01040d";
    ctx.fillRect(0, 0, 512, 320);

    // Glowing cyan eyes
    ctx.fillStyle = "#00d2ff";
    ctx.strokeStyle = "#00d2ff";
    ctx.shadowColor = "#00e5ff";
    ctx.shadowBlur = 24;

    const leftX = 172;
    const rightX = 340;

    if (expression === "normal") {
      const cy = 148;
      ctx.beginPath();
      ctx.arc(leftX, cy, 52, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#01040d";
      ctx.beginPath();
      ctx.moveTo(90, 76);
      ctx.lineTo(240, 146);
      ctx.lineTo(90, 146);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(rightX, cy, 52, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#01040d";
      ctx.beginPath();
      ctx.moveTo(422, 76);
      ctx.lineTo(272, 146);
      ctx.lineTo(422, 146);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Tiny cute mouth
      ctx.beginPath();
      ctx.moveTo(246, 212);
      ctx.lineTo(256, 204);
      ctx.lineTo(266, 212);
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    } else if (expression === "happy") {
      const cy = 182;
      ctx.lineWidth = 22;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(leftX, cy, 46, Math.PI * 1.08, Math.PI * 1.92, false);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(rightX, cy, 46, Math.PI * 1.08, Math.PI * 1.92, false);
      ctx.stroke();
    } else if (expression === "sleepy") {
      const cy = 132;
      ctx.beginPath();
      ctx.arc(leftX, cy, 48, 0, Math.PI, false);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(rightX, cy, 48, 0, Math.PI, false);
      ctx.closePath();
      ctx.fill();
    } else if (expression === "surprised") {
      const cy = 144;
      ctx.beginPath();
      ctx.arc(leftX, cy, 52, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(rightX, cy, 52, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(256, 214, 13, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, [expression]);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      `/products/chipi/expr-${expression}.png`,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 4;
        setLoadedTex(texture);
      },
      undefined,
      () => {
        setLoadedTex(null);
      }
    );
  }, [expression]);

  return loadedTex || fallbackTex;
}

/* The True 3D CHIPI Model */
function ChipiModel({
  expression = "normal",
  exploded = false,
  labels = false,
  isMobile = false,
}: {
  expression: "normal" | "happy" | "sleepy" | "surprised";
  exploded: boolean;
  labels: boolean;
  isMobile?: boolean;
}) {
  const faceTex = useChipiFaceTexture(expression);

  const frontGroup = useRef<THREE.Group>(null);
  const oledGroup = useRef<THREE.Group>(null);
  const pcbGroup = useRef<THREE.Group>(null);
  const backGroup = useRef<THREE.Group>(null);
  const chainRingGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const expand = exploded ? 1 : 0;
    const lerpSpeed = Math.min(1, delta * 7);

    // Explode components smoothly along Z-axis
    if (frontGroup.current) {
      frontGroup.current.position.z = THREE.MathUtils.lerp(frontGroup.current.position.z, expand * 1.15, lerpSpeed);
    }
    if (oledGroup.current) {
      oledGroup.current.position.z = THREE.MathUtils.lerp(oledGroup.current.position.z, expand * 0.55, lerpSpeed);
    }
    if (pcbGroup.current) {
      pcbGroup.current.position.z = THREE.MathUtils.lerp(pcbGroup.current.position.z, expand * 0.05, lerpSpeed);
    }
    if (backGroup.current) {
      backGroup.current.position.z = THREE.MathUtils.lerp(backGroup.current.position.z, -expand * 0.95, lerpSpeed);
    }

    // Subtle gentle chain physics sway
    if (chainRingGroup.current) {
      chainRingGroup.current.rotation.z = Math.sin(Date.now() * 0.002) * 0.035;
    }
  });

  const W = 1.7;
  const H = 1.7;
  const D = 1.52;
  const halfW = W / 2; // 0.85
  const halfH = H / 2; // 0.85
  const halfD = D / 2; // 0.76

  const labelScale = isMobile ? 0.20 : 0.28;

  return (
    <group position={[0, 0.05, 0]}>
      {/* 1. FRONT ENCLOSURE & SCREEN CAVITY */}
      <group ref={frontGroup} position={[0, 0, 0]}>
        {/* Solid Chunky Cube Shell with Plain Top & Generous Rounded Fillets */}
        <RoundedBox args={[W, H, D]} radius={0.2} smoothness={6} castShadow receiveShadow>
          <meshStandardMaterial
            color={C.shell}
            roughness={0.52}
            metalness={0.16}
          />
        </RoundedBox>

        {/* Front Recessed Bezel Window */}
        <mesh position={[0, -0.05, halfD + 0.002]} receiveShadow>
          <planeGeometry args={[1.36, 0.88]} />
          <meshStandardMaterial color={C.bezel} roughness={0.85} />
        </mesh>

        {/* OLED Screen Plane with Glowing Eyes */}
        <mesh position={[0, -0.05, halfD + 0.006]}>
          <planeGeometry args={[1.30, 0.8125]} />
          <meshBasicMaterial map={faceTex} toneMapped={false} />
        </mesh>

        {/* Glass Screen Gloss Reflection Overlay */}
        <mesh position={[0, -0.05, halfD + 0.01]}>
          <planeGeometry args={[1.30, 0.8125]} />
          <meshStandardMaterial
            color="#a8ecff"
            roughness={0.06}
            metalness={0.15}
            transparent
            opacity={0.12}
          />
        </mesh>

        {/* Localized Cyan Screen Glow Light */}
        <pointLight position={[0, -0.05, halfD + 0.4]} color={C.cyan} intensity={1.5} distance={2.4} />

        {/* ========================================================
            USB-C FAST CHARGING PORT (Left Profile)
           ======================================================== */}
        <group position={[-halfW - 0.005, -0.32, 0]} rotation={[0, -Math.PI / 2, 0]}>
          {/* Recessed bezel socket in enclosure */}
          <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]} scale={[1.4, 0.65, 1]}>
            <cylinderGeometry args={[0.22, 0.22, 0.04, 32]} />
            <meshStandardMaterial color={C.bezel} roughness={0.8} />
          </mesh>
          
          {/* Metallic USB-C housing collar */}
          <group position={[0, 0, 0.015]}>
            <mesh castShadow scale={[1.75, 0.85, 1]}>
              <torusGeometry args={[0.13, 0.026, 16, 32]} />
              <meshStandardMaterial color={C.metal} metalness={0.96} roughness={0.15} />
            </mesh>
            
            {/* Dark inner cavity */}
            <mesh position={[0, 0, -0.01]}>
              <planeGeometry args={[0.34, 0.14]} />
              <meshBasicMaterial color="#000000" />
            </mesh>
            
            {/* Center USB-C tongue pin with gold contact finish */}
            <mesh position={[0, 0, 0.01]}>
              <boxGeometry args={[0.22, 0.022, 0.06]} />
              <meshStandardMaterial color={C.gold} metalness={0.92} roughness={0.18} />
            </mesh>
          </group>
        </group>

        {/* ========================================================
            KEYCHAIN ATTACHMENT LOOP (Top-Right Corner)
           ======================================================== */}
        <group position={[halfW - 0.06, halfH + 0.12, 0.05]}>
          <mesh rotation={[0, 0, 0.22]} castShadow>
            <torusGeometry args={[0.18, 0.065, 16, 32]} />
            <meshStandardMaterial color={C.shell} roughness={0.55} metalness={0.15} />
          </mesh>
        </group>

        {/* ========================================================
            3D STAINLESS STEEL KEYCHAIN & SPLIT RING
           ======================================================== */}
        <group ref={chainRingGroup} position={[halfW - 0.06, halfH + 0.12, 0.05]}>
          <mesh position={[0.16, -0.12, 0.08]} rotation={[0.4, 0.2, -0.55]} castShadow>
            <torusGeometry args={[0.11, 0.03, 14, 28]} />
            <meshStandardMaterial color={C.metal} metalness={0.98} roughness={0.12} />
          </mesh>
          
          <mesh position={[0.3, -0.28, 0.14]} rotation={[-0.3, 1.4, 0.4]} castShadow>
            <torusGeometry args={[0.11, 0.03, 14, 28]} />
            <meshStandardMaterial color={C.metal} metalness={0.98} roughness={0.12} />
          </mesh>
          
          <mesh position={[0.42, -0.44, 0.2]} rotation={[0.3, 0.2, -0.3]} castShadow>
            <torusGeometry args={[0.11, 0.03, 14, 28]} />
            <meshStandardMaterial color={C.metal} metalness={0.98} roughness={0.12} />
          </mesh>

          <mesh position={[0.54, -0.6, 0.24]} rotation={[-0.2, 1.3, 0.2]} castShadow>
            <torusGeometry args={[0.11, 0.03, 14, 28]} />
            <meshStandardMaterial color={C.metal} metalness={0.98} roughness={0.12} />
          </mesh>

          {/* Stainless-Steel Split Keyring */}
          <group position={[0.78, -0.85, 0.28]} rotation={[0.45, 0.5, 0.25]}>
            <mesh castShadow>
              <torusGeometry args={[0.44, 0.048, 16, 64]} />
              <meshStandardMaterial color={C.metal} metalness={0.98} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0, 0.038]} castShadow>
              <torusGeometry args={[0.44, 0.044, 16, 64, Math.PI * 1.7]} />
              <meshStandardMaterial color={C.metal} metalness={0.98} roughness={0.1} />
            </mesh>
          </group>
        </group>

        {/* 3D Billboard Labels for Normal Mode (Responsive Scaling) */}
        {labels && !exploded && (
          <>
            <Label position={[0, 1.25, 0]} scale={labelScale}>Touch Petting Zone</Label>
            <Label position={[0, -1.18, halfD + 0.15]} scale={labelScale}>OLED Expressive Display</Label>
            <Label position={[isMobile ? 1.4 : 1.75, 0.3, 0.25]} scale={labelScale}>Keychain Ready</Label>
            <Label position={[isMobile ? -1.3 : -1.5, -0.32, 0]} scale={labelScale}>USB-C Port</Label>
          </>
        )}
      </group>

      {/* 2. OLED DISPLAY SUB-ASSEMBLY (Visible when exploded) */}
      <group ref={oledGroup} position={[0, 0, 0]}>
        <mesh position={[0, -0.05, 0.1]} castShadow>
          <boxGeometry args={[1.36, 0.88, 0.04]} />
          <meshStandardMaterial color={C.bezel} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.58, 0.08]}>
          <planeGeometry args={[0.38, 0.28]} />
          <meshStandardMaterial color={C.gold} roughness={0.3} metalness={0.8} />
        </mesh>
        {labels && exploded && <Label position={[-1.35, 0.35, 0.45]} scale={labelScale}>OLED Module</Label>}
      </group>

      {/* 3. ESP32 MOTHERBOARD & SENSORS (Visible when exploded) */}
      <group ref={pcbGroup} position={[0, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.48, 1.48, 0.05]} />
          <meshStandardMaterial color={C.pcb} roughness={0.5} />
        </mesh>

        <mesh position={[0, 0.12, 0.06]} castShadow>
          <boxGeometry args={[0.76, 0.76, 0.07]} />
          <meshStandardMaterial color={C.rfShield} metalness={0.92} roughness={0.2} />
        </mesh>

        <mesh position={[-0.42, -0.32, 0.05]} castShadow>
          <boxGeometry args={[0.22, 0.22, 0.05]} />
          <meshStandardMaterial color={C.chip} roughness={0.4} />
        </mesh>

        <mesh position={[-0.72, -0.32, 0.04]} castShadow>
          <boxGeometry args={[0.16, 0.18, 0.08]} />
          <meshStandardMaterial color={C.metal} metalness={0.92} roughness={0.2} />
        </mesh>

        {[-0.62, 0.62].map((x) =>
          [-0.62, 0.62].map((y) => (
            <mesh key={`${x}-${y}`} position={[x, y, 0.03]}>
              <cylinderGeometry args={[0.07, 0.07, 0.06, 16]} />
              <meshStandardMaterial color={C.gold} metalness={0.9} roughness={0.2} />
            </mesh>
          ))
        )}

        {labels && exploded && (
          <>
            <Label position={[1.35, 0.2, 0]} scale={labelScale}>ESP32 Mainboard</Label>
            <Label position={[-1.35, -0.32, 0]} scale={labelScale}>USB-C Port</Label>
          </>
        )}
      </group>

      {/* 4. BACK COVER ASSEMBLY (Visible when exploded) */}
      <group ref={backGroup} position={[0, 0, 0]}>
        <RoundedBox args={[W, H, 0.38]} radius={0.2} smoothness={6} castShadow receiveShadow>
          <meshStandardMaterial color={C.shellBack} roughness={0.65} metalness={0.14} />
        </RoundedBox>

        {[-0.6, 0.6].map((x) =>
          [-0.6, 0.6].map((y) => (
            <mesh key={`screw-${x}-${y}`} position={[x, y, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.075, 0.075, 0.04, 6]} />
              <meshStandardMaterial color={C.metalDark} metalness={0.85} roughness={0.25} />
            </mesh>
          ))
        )}

        {labels && exploded && <Label position={[-1.35, -0.4, -0.95]} scale={labelScale}>Back Enclosure</Label>}
      </group>

      {/* 5. CIRCULAR GLOWING TURNTABLE BASE */}
      <group position={[0, -halfH - 0.16, 0]}>
        <mesh position={[0, -0.06, 0]} receiveShadow>
          <cylinderGeometry args={[2.35, 2.45, 0.14, 64]} />
          <meshStandardMaterial color="#070f26" roughness={0.6} metalness={0.28} />
        </mesh>

        <mesh position={[0, 0.016, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.18, 2.26, 64]} />
          <meshBasicMaterial color={C.amber} toneMapped={false} />
        </mesh>

        <mesh position={[0, 0.017, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.7, 1.74, 64]} />
          <meshBasicMaterial color={C.amber} transparent opacity={0.7} toneMapped={false} />
        </mesh>

        <mesh position={[0, 0.017, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.23, 64]} />
          <meshBasicMaterial color={C.amber} transparent opacity={0.45} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export default function Chipi3DScene({
  expression = "normal",
  exploded = false,
  animate = true,
  labels = false,
  resetSignal = 0,
}: {
  expression: "normal" | "happy" | "sleepy" | "surprised";
  exploded: boolean;
  animate: boolean;
  labels: boolean;
  resetSignal?: number;
}) {
  const controlsRef = useRef<OrbitControlsType>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive camera framing for mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      camera={{
        position: isMobile ? [0, 0.45, 5.2] : [0, 0.65, 4.6],
        fov: isMobile ? 38 : 36,
      }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <ambientLight intensity={1.2} color="#d4e4ff" />

      <directionalLight
        position={[4, 6, 5]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      <directionalLight position={[-4, 3, 3]} intensity={2.0} color="#b8d2ff" />
      <pointLight position={[0, 4.5, -4.5]} intensity={4.5} color="#FFAF0D" />
      <pointLight position={[4, 2, -1.5]} intensity={2.8} color="#FFAF0D" />
      <pointLight position={[0, -1.0, 0]} intensity={1.5} color="#FFAF0D" />

      {/* True 3D CHIPI Model */}
      <ChipiModel expression={expression} exploded={exploded} labels={labels} isMobile={isMobile} />

      {/* Ground Contact Shadows */}
      <ContactShadows position={[0, -1.05, 0]} opacity={0.65} scale={7} blur={2.0} far={3.5} color="#000000" />

      {/* OrbitControls matching Hardware Lab */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        autoRotate={animate && !exploded}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 1.82}
        dampingFactor={0.06}
      />
    </Canvas>
  );
}

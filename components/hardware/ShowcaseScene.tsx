"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls, RoundedBox, Edges } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const C = {
  shell: "#eef2fb",
  metal: "#9aa6bd",
  dark: "#1b1530",
  orange: "#ff7a1a",
  blue: "#3a78ff",
  pcb: "#0f6b4f",
  conveyor: "#3b414f",
  plc: "#a4abbd"
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
  const h = 0.3;
  return (
    <sprite position={position} scale={[h * aspect, h, 1]} renderOrder={10}>
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

/* 1. Mechanical CAD Design */
function CadMechanism({ animate, labels, exploded = false }: { animate: boolean; labels: boolean; exploded?: boolean }) {
  const crank = useRef<THREE.Group>(null);
  const link = useRef<THREE.Group>(null);
  const slider = useRef<THREE.Group>(null);
  const rootGroup = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = animate && !exploded ? clock.getElapsedTime() * 1.5 : 0;
    if (crank.current) crank.current.rotation.y = t;
    if (link.current) link.current.rotation.y = Math.sin(t) * 0.3;
    if (slider.current) slider.current.position.z = Math.cos(t) * 0.8;
    
    // Exploded view
    if (rootGroup.current) {
      const expand = exploded ? 1 : 0;
      rootGroup.current.position.y = THREE.MathUtils.lerp(rootGroup.current.position.y, expand * 0.8, 0.1);
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[4, 0.2, 1.5]} />
        <meshStandardMaterial color={C.metal} roughness={0.6} />
      </mesh>
      
      <group position={[-1, 0.2, 0]} ref={rootGroup}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
          <meshStandardMaterial color={C.shell} />
        </mesh>
        <group ref={crank} position={[0, 0.5, 0]}>
          <mesh position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 1.2, 32]} />
            <meshStandardMaterial color={C.orange} roughness={0.4} />
          </mesh>
          <group position={[0, 0.1, 0.8]}>
            <group ref={link}>
              <mesh position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.1, 0.1, 1.8, 16]} />
                <meshStandardMaterial color={C.shell} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      <group ref={slider} position={[1, 0.3, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.4, 0.6]} />
          <meshStandardMaterial color={C.blue} roughness={0.3} />
        </mesh>
      </group>

      {labels && (
        <>
          <Label position={[-1.5, 1, 0]}>Crank arm</Label>
          <Label position={[1, 1, 0]}>Slider block</Label>
          <Label position={[0, -0.4, 1]}>Base plate (Aluminum)</Label>
        </>
      )}
    </group>
  );
}

/* 2. Embedded Systems & IoT */
function IoTDevice({ animate, labels }: { animate: boolean; labels: boolean }) {
  const signal = useRef<THREE.Mesh>(null);
  const led = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame(({ clock }) => {
    const t = animate ? clock.getElapsedTime() : 0;
    if (signal.current) {
      signal.current.position.x = 0.5 + ((t * 1.5) % 2) * 1.5;
      (signal.current.material as any).opacity = 1 - ((t * 1.5) % 2) / 2;
    }
    if (led.current) {
      led.current.emissiveIntensity = Math.sin(t * 8) > 0 ? 1 : 0.2;
    }
  });

  return (
    <group position={[0, -0.3, 0]}>
      {/* PCB */}
      <mesh position={[-1, 0, 0]} castShadow>
        <boxGeometry args={[2, 0.05, 1.4]} />
        <meshStandardMaterial color={C.pcb} />
      </mesh>
      {/* ESP32 */}
      <mesh position={[-1.4, 0.1, -0.2]} castShadow>
        <boxGeometry args={[0.6, 0.15, 0.8]} />
        <meshStandardMaterial color={C.metal} />
      </mesh>
      {/* Sensor */}
      <mesh position={[-0.4, 0.1, 0.3]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
        <meshStandardMaterial color={C.shell} />
      </mesh>
      {/* LED indicator */}
      <mesh position={[-0.4, 0.1, -0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial ref={led} color={C.orange} emissive={C.orange} />
      </mesh>
      
      {/* Dashboard Preview */}
      <group position={[1.2, 0.5, 0]} rotation={[-0.2, -0.4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.6, 1.2, 0.1]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>
        <ScreenText text="24.5 °C" position={[0, 0.2, 0.06]} height={0.2} />
        <ScreenText text="Online" position={[0, -0.2, 0.06]} height={0.15} />
      </group>

      {/* Signal packet */}
      <mesh ref={signal} position={[0.5, 0.3, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={C.blue} transparent />
      </mesh>

      {labels && (
        <>
          <Label position={[-1.5, 0.5, 0]}>Microcontroller</Label>
          <Label position={[1.2, 1.3, 0]}>Web Dashboard</Label>
        </>
      )}
    </group>
  );
}

/* 3. Robotics & Simulation */
function RoboticsSim({ animate, labels }: { animate: boolean; labels: boolean }) {
  const shoulder = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const t = animate ? clock.getElapsedTime() : 0;
    if (shoulder.current) shoulder.current.rotation.z = Math.sin(t) * 0.5 - 0.2;
    if (elbow.current) elbow.current.rotation.z = Math.sin(t + 1) * 0.6 + 0.8;
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Grid floor for simulation feel */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial color={C.orange} wireframe transparent opacity={0.2} />
      </mesh>

      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1, 0.4, 32]} />
        <meshStandardMaterial color={C.dark} />
      </mesh>
      <group position={[0, 0.6, 0]} ref={shoulder}>
        <mesh rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.6, 32]} />
          <meshStandardMaterial color={C.orange} />
        </mesh>
        <RoundedBox args={[0.4, 1.6, 0.4]} radius={0.1} position={[0, 0.8, 0]} castShadow>
          <meshStandardMaterial color={C.shell} />
        </RoundedBox>
        <group position={[0, 1.6, 0]} ref={elbow}>
          <mesh rotation={[Math.PI/2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.5, 32]} />
            <meshStandardMaterial color={C.orange} />
          </mesh>
          <RoundedBox args={[0.3, 1.2, 0.3]} radius={0.08} position={[0, 0.6, 0]} castShadow>
            <meshStandardMaterial color={C.shell} />
          </RoundedBox>
          <mesh position={[0, 1.2, 0]} castShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={C.dark} />
          </mesh>
          {labels && <Label position={[0.5, 1.4, 0]}>End-effector TF</Label>}
        </group>
      </group>
      {labels && (
        <>
          <Label position={[1.5, 0.2, 0]}>World Frame</Label>
          <Label position={[1.2, 1.4, 0]}>Shoulder Joint</Label>
        </>
      )}
    </group>
  );
}

/* 4. Computer Vision */
function VisionSystem({ animate, labels }: { animate: boolean; labels: boolean }) {
  const box = useRef<THREE.Group>(null);
  const scanLine = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    const t = animate ? clock.getElapsedTime() : 0;
    if (box.current) {
      box.current.position.x = ((t * 0.8) % 3) - 1.5;
    }
    if (scanLine.current) {
      scanLine.current.position.x = Math.sin(t * 3) * 0.5;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Conveyor */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[4, 0.2, 1]} />
        <meshStandardMaterial color={C.conveyor} />
      </mesh>
      
      {/* Box */}
      <group ref={box}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#c2b093" />
        </mesh>
        {/* Detection rectangle */}
        <mesh position={[0, 0.51, 0]}>
          <planeGeometry args={[0.6, 0.6]} />
          <meshBasicMaterial color={C.orange} wireframe />
        </mesh>
      </group>

      {/* Camera setup */}
      <group position={[0, 1.5, 0]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.6]} />
          <meshStandardMaterial color={C.metal} />
        </mesh>
        <mesh position={[0, -0.05, 0]} castShadow rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>
        {/* Scan line */}
        <mesh ref={scanLine} position={[0, -0.7, 0]} rotation={[Math.PI/2, 0, 0]}>
          <planeGeometry args={[0.02, 1]} />
          <meshBasicMaterial color={C.blue} transparent opacity={0.6} />
        </mesh>
      </group>
      
      {/* Analytics panel */}
      <group position={[1.5, 0.5, -0.6]} rotation={[-0.2, -0.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1, 1, 0.1]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>
        <ScreenText text="Count: 42" position={[0, 0.2, 0.06]} height={0.15} />
        <ScreenText text="Status: OK" position={[0, -0.2, 0.06]} height={0.12} />
      </group>

      {labels && (
        <>
          <Label position={[-1, 1.7, 0]}>Industrial Camera</Label>
          <Label position={[-1.5, 0.5, 0]}>YOLO Detection</Label>
        </>
      )}
    </group>
  );
}

/* 5. Industrial Automation */
function AutomationCabinet({ animate, labels }: { animate: boolean; labels: boolean }) {
  const lights = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const t = animate ? clock.getElapsedTime() : 0;
    if (lights.current) {
      lights.current.children.forEach((c, i) => {
        (c as any).material.emissiveIntensity = Math.sin(t * 3 + i) > 0 ? 1 : 0.1;
      });
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Backplate */}
      <mesh position={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[3, 2.4, 0.1]} />
        <meshStandardMaterial color={C.shell} />
      </mesh>
      
      {/* PLC */}
      <mesh position={[-0.8, 0.5, -0.3]} castShadow>
        <boxGeometry args={[0.8, 0.6, 0.3]} />
        <meshStandardMaterial color={C.plc} />
      </mesh>
      
      {/* Relays */}
      {[0, 0.4, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.5, -0.3]} castShadow>
          <boxGeometry args={[0.3, 0.4, 0.2]} />
          <meshStandardMaterial color={C.blue} />
        </mesh>
      ))}
      
      {/* Wire ducts */}
      <mesh position={[0, 0, -0.4]} castShadow>
        <boxGeometry args={[2.6, 0.15, 0.2]} />
        <meshStandardMaterial color={C.dark} />
      </mesh>
      <mesh position={[-1.3, 0.5, -0.4]} castShadow>
        <boxGeometry args={[0.15, 1.2, 0.2]} />
        <meshStandardMaterial color={C.dark} />
      </mesh>

      {/* Terminal blocks */}
      <mesh position={[0, -0.5, -0.3]} castShadow>
        <boxGeometry args={[2, 0.2, 0.2]} />
        <meshStandardMaterial color="#6fa86b" />
      </mesh>

      <group ref={lights} position={[-0.8, 0.7, -0.1]}>
        {[0, 0.1, 0.2].map((x, i) => (
          <mesh key={i} position={[x - 0.1, 0, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color={C.orange} emissive={C.orange} />
          </mesh>
        ))}
      </group>

      {labels && (
        <>
          <Label position={[-1.5, 1, 0]}>PLC Controller</Label>
          <Label position={[1.2, 0.8, 0]}>Relay Bank</Label>
          <Label position={[1.5, -0.5, 0]}>Terminal Blocks</Label>
        </>
      )}
    </group>
  );
}

/* 6. Product Development */
function ProductDev({ animate, labels, exploded = false }: { animate: boolean; labels: boolean, exploded?: boolean }) {
  const top = useRef<THREE.Group>(null);
  const board = useRef<THREE.Group>(null);
  const bottom = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = animate && !exploded ? clock.getElapsedTime() : 0;
    const expand = exploded ? 1.2 : (Math.sin(t) + 1) * 0.4;
    
    // Smooth transition
    if (top.current) top.current.position.y = THREE.MathUtils.lerp(top.current.position.y, 0.2 + expand * 0.8, 0.1);
    if (board.current) board.current.position.y = THREE.MathUtils.lerp(board.current.position.y, 0, 0.1);
    if (bottom.current) bottom.current.position.y = THREE.MathUtils.lerp(bottom.current.position.y, -0.3 - expand * 0.8, 0.1);
  });

  return (
    <group position={[0, 0.2, 0]}>
      {/* Top enclosure */}
      <group ref={top} position={[0, 0.2, 0]}>
        <RoundedBox args={[1.6, 0.2, 2.4]} radius={0.05} castShadow>
          <meshStandardMaterial color={C.shell} transparent opacity={0.8} />
        </RoundedBox>
        {labels && <Label position={[-1.5, 0, 0]}>Enclosure Top</Label>}
      </group>

      {/* PCB and components */}
      <group ref={board}>
        <mesh castShadow>
          <boxGeometry args={[1.4, 0.04, 2.2]} />
          <meshStandardMaterial color={C.pcb} />
        </mesh>
        <mesh position={[0, 0.05, -0.6]} castShadow>
          <boxGeometry args={[0.6, 0.1, 0.6]} />
          <meshStandardMaterial color={C.metal} />
        </mesh>
        <mesh position={[0.4, 0.05, 0.5]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.15]} />
          <meshStandardMaterial color={C.orange} />
        </mesh>
        {labels && <Label position={[1.6, 0, 0]}>Custom PCB</Label>}
      </group>

      {/* Bottom enclosure / Battery */}
      <group ref={bottom} position={[0, -0.3, 0]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[1.2, 0.1, 1.8]} />
          <meshStandardMaterial color={C.dark} />
        </mesh>
        <RoundedBox args={[1.6, 0.2, 2.4]} radius={0.05} castShadow>
          <meshStandardMaterial color={C.shell} />
        </RoundedBox>
        {labels && <Label position={[-1.5, -0.1, 0]}>Battery Pack</Label>}
      </group>
    </group>
  );
}


/* 7. 3D Printing */
function ThreeDPrinter({ animate, labels }: { animate: boolean; labels: boolean }) {
  const [phase, setPhase] = useState(0);
  const headRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (!animate) return;
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 7);
    }, 2000);
    return () => clearInterval(interval);
  }, [animate]);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    if (headRef.current && phase >= 2 && phase <= 4) {
      // Simulate printing movement
      headRef.current.position.x = Math.sin(t * 5) * 0.4;
      headRef.current.position.z = Math.cos(t * 3) * 0.4;
      headRef.current.position.y = Math.min(0.8, 0.2 + (t % 5) * 0.1);
    } else if (headRef.current) {
      headRef.current.position.set(0, 0.8, 0);
    }
  });

  const isBlueprint = phase === 0;
  const isReveal = phase >= 1;
  const isPrinting = phase >= 2;
  const showPartLayer = phase === 3;
  const isFinished = phase >= 4;

  const C = {
    black: "#111111",
    grey: "#444444",
    blueprintLine: "#55aaff",
    orange: "#ff5722",
  };

  const edgeColor = isBlueprint ? C.blueprintLine : "#666";
  const frameMat = isBlueprint ? "transparent" : C.black;
  const frameOp = isBlueprint ? 0 : 1;

  // State text
  const workflowStates = [
    "Initializing...",
    "System Ready",
    "CAD Design → Slicing",
    "3D Printing layer-by-layer",
    "Physical Prototype complete",
    "Physical Prototype complete",
    "Physical Prototype complete"
  ];

  return (
    <group position={[0, -0.5, 0]}>
      {/* Frame */}
      <group position={[0, 1, -0.5]}>
        {[-0.8, 0.8].map(x => (
          <mesh key={x} position={[x, 0, 0]} castShadow>
            <boxGeometry args={[0.1, 2, 0.1]} />
            <meshStandardMaterial color={frameMat} transparent opacity={frameOp} />
            <Edges color={edgeColor} />
          </mesh>
        ))}
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[1.7, 0.1, 0.1]} />
          <meshStandardMaterial color={frameMat} transparent opacity={frameOp} />
          <Edges color={edgeColor} />
        </mesh>
        {/* Filament spool */}
        {isReveal && (
          <mesh position={[0, 1.4, 0]} rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.2]} />
            <meshStandardMaterial color={C.grey} />
          </mesh>
        )}
      </group>

      {/* Build Plate */}
      {isReveal && (
        <mesh position={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[1.5, 0.05, 1.5]} />
          <meshStandardMaterial color="#222" />
          <Edges color="#555" />
        </mesh>
      )}

      {/* Print Head */}
      {isReveal && (
        <group ref={headRef} position={[0, 0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color={C.black} />
            <Edges color="#888" />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.05]} />
            <meshStandardMaterial color="#ffca28" />
          </mesh>
        </group>
      )}

      {/* Object being printed */}
      {isPrinting && (
        <group position={[0, 0.15, 0]}>
          {showPartLayer ? (
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.2]} />
              <meshBasicMaterial color={C.orange} wireframe />
            </mesh>
          ) : isFinished ? (
            <mesh position={[0, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.4]} />
              <meshStandardMaterial color={C.orange} />
            </mesh>
          ) : null}
        </group>
      )}

      {/* Info UI Overlay (simulated text) */}
      <group position={[1.5, 1.5, 0]}>
        <ScreenText text={workflowStates[phase]} position={[0, 0, 0]} height={0.12} />
      </group>

      {labels && (
        <>
          <Label position={[-1.2, 1.5, 0]}>Filament Spool</Label>
          <Label position={[-1, 0.1, 0]}>Build Plate</Label>
          {isFinished && <Label position={[0, 0.5, 0.3]}>Physical Prototype</Label>}
        </>
      )}
    </group>
  );
}


export default function ShowcaseScene({ model, labels, animate, exploded = false }: { model: string; labels: boolean; animate: boolean, exploded?: boolean }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [4, 3, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-6, 3, -4]} intensity={0.5} color="#bcd0ff" />

      {model === "cad" && <CadMechanism animate={animate} labels={labels} exploded={exploded} />}
      {model === "iot" && <IoTDevice animate={animate} labels={labels} />}
      {model === "robotics" && <RoboticsSim animate={animate} labels={labels} />}
      {model === "vision" && <VisionSystem animate={animate} labels={labels} />}
      {model === "automation" && <AutomationCabinet animate={animate} labels={labels} />}
      {model === "product" && <ProductDev animate={animate} labels={labels} exploded={exploded} />}
      {model === "3d-printing" && <ThreeDPrinter animate={animate} labels={labels} />}

      <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={10} blur={2.4} far={4} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={animate && !exploded}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}

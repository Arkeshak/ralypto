"use client";

import React, { useState } from "react";
import Link from "next/link";
import HardwareModelViewer from "./HardwareModelViewer";
import SectionHead from "../SectionHead";
import LabLabel from "../LabLabel";

const showcases = [
  {
    id: "cad",
    title: "Mechanical CAD Design and 3D Modelling",
    description: "Design mechanical parts, enclosures, brackets, mechanisms, robot frames and product concepts using SolidWorks or Fusion 360.",
    capabilities: [
      "Convert sketches and ideas into 3D models.",
      "Create assemblies, engineering drawings and dimensions.",
      "Prepare STL files for 3D printing.",
      "Modify existing CAD models to meet requirements."
    ],
    tools: ["SolidWorks", "Fusion 360", "AutoCAD", "3D Printing"],
  },
  {
    id: "iot",
    title: "Embedded Systems and IoT",
    description: "Develop programs and electronics-based solutions using ESP32, Arduino, Raspberry Pi and sensors.",
    capabilities: [
      "Temperature, humidity, motion and distance monitoring.",
      "Wi-Fi-enabled sensor systems.",
      "Device control through a web dashboard.",
      "MQTT communication, data logging and alerts.",
      "Sensor integration and microcontroller debugging."
    ],
    tools: ["ESP32", "Arduino", "Raspberry Pi", "Sensors", "MQTT"],
  },
  {
    id: "robotics",
    title: "Robotics and Simulation",
    description: "Help clients develop or test robots virtually before building physical hardware.",
    capabilities: [
      "ROS 2 and Gazebo robot simulations.",
      "URDF robot models and TF configurations.",
      "Robotic arm modelling and basic motion control.",
      "Sensor integration and simulation testing.",
      "Basic autonomous navigation prototypes."
    ],
    tools: ["ROS 2", "Gazebo", "URDF", "Python", "C++"],
  },
  {
    id: "vision",
    title: "Computer Vision and AI Integration",
    description: "Develop computer-vision solutions that combine camera input, image processing and AI models.",
    capabilities: [
      "Object detection using YOLO and OpenCV.",
      "Image annotation and dataset preparation.",
      "Product counting and visual inspection.",
      "Camera-based monitoring systems.",
      "Integrating AI models into web applications or edge devices."
    ],
    tools: ["OpenCV", "YOLO", "Python", "Edge AI"],
  },
  {
    id: "automation",
    title: "Industrial Automation",
    description: "Help businesses automate repetitive processes and develop control-system prototypes.",
    capabilities: [
      "PLC programming and basic HMI development.",
      "Sensor and actuator selection.",
      "Sequence-control logic.",
      "Pneumatic and electro-mechanical system concepts.",
      "Control-system simulation and troubleshooting."
    ],
    tools: ["PLC", "HMI", "Relays", "Sensors", "Actuators"],
  },
  {
    id: "product",
    title: "Product Development and Prototyping",
    description: "Turn a client's idea into a design that can eventually become a real product.",
    capabilities: [
      "Concept development and component selection.",
      "Mechanical design and electronics integration.",
      "Proof-of-concept prototypes.",
      "Bill of materials and assembly instructions.",
      "Prototype testing and technical documentation."
    ],
    tools: ["Prototyping", "Electronics Design", "BOM Creation", "Testing"],
  },
  {
    id: "3d-printing",
    title: "3D Printing & Rapid Prototyping",
    description: "Turn suitable digital designs into physical prototypes using 3D printing. This capability supports mechanical CAD design, custom enclosures, brackets, robotics components and product development.",
    capabilities: [
      "Prepare suitable CAD models for 3D printing.",
      "Export and prepare printable STL or 3MF files.",
      "Configure slicing workflows.",
      "Produce prototypes and suitable custom mechanical components.",
      "Iterate on designs based on fit and testing."
    ],
    tools: ["Creality 3D Printer", "STL", "3MF", "Slicing", "Prototyping"],
    photo: "/work/creality-3d-printer.jpg"
  }
];

export default function HardwareShowcases() {
  const [activeModelStates, setActiveModelStates] = useState<Record<string, { exploded: boolean; labels: boolean }>>({});

  const toggleExploded = (id: string) => {
    setActiveModelStates(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        exploded: !prev[id]?.exploded
      }
    }));
  };

  const toggleLabels = (id: string) => {
    setActiveModelStates(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        labels: prev[id]?.labels === undefined ? false : !prev[id]?.labels
      }
    }));
  };

  return (
    <section className="lab-band lab-band--a hw-showcases-band" data-chapter="Capabilities">
      <div className="lab-band__inner">
        <SectionHead
          label={<LabLabel lab="hardware" name="Capabilities" />}
          title="Hardware capabilities"
          intro="Explore interactive demonstrations of the engineering services we offer."
        />
        
        <div className="hw-showcases-list">
          {showcases.map((sc, i) => {
            const isReversed = i % 2 !== 0;
            const state = activeModelStates[sc.id] || { exploded: false, labels: true };
            
            return (
              <div key={sc.id} className={`hw-sc-row ${isReversed ? 'hw-sc-row--reversed' : ''}`} data-reveal style={{ transitionDelay: '0.1s' }}>
                <div className="hw-sc-content">
                  <h3>{sc.title}</h3>
                  <p className="hw-sc-desc">{sc.description}</p>
                  
                  <h4>What we can do:</h4>
                  <ul className="hw-sc-caps">
                    {sc.capabilities.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>

                  <h4>Tools & Tech:</h4>
                  <div className="hw-sc-tools">
                    {sc.tools.map((t, idx) => (
                      <span key={idx} className="hw-sc-tool-chip">{t}</span>
                    ))}
                  </div>

                  <Link href={`/contact?need=hardware&service=${encodeURIComponent(sc.title)}`} className="btn hw-sc-btn">
                    Discuss a similar project
                  </Link>
                </div>
                
                <div className="hw-sc-model-panel">
                  {(sc as any).photo && (
                    <div style={{ marginBottom: '1.5rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--hw-line)' }}>
                      <img src={(sc as any).photo} alt={sc.title} style={{ width: '100%', display: 'block', maxHeight: '400px', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div className="hw-sc-viewer-wrapper">
                    <HardwareModelViewer modelId={sc.id} labels={state.labels} exploded={state.exploded} />
                  </div>
                  <div className="hw-sc-controls">
                    <label className="h3d__toggle">
                      <input type="checkbox" checked={state.labels} onChange={() => toggleLabels(sc.id)} />
                      Show part names
                    </label>
                    {['cad', 'product'].includes(sc.id) && (
                      <label className="h3d__toggle">
                        <input type="checkbox" checked={state.exploded} onChange={() => toggleExploded(sc.id)} />
                        Exploded view
                      </label>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

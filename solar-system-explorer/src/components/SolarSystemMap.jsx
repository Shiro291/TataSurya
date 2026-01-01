import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { planets } from '../data/planets';

const Scene = ({ onPlanetClick }) => {
    return (
        <>
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 0, 0]} intensity={2} color="#FFD700" distance={2000} decay={1} />

            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Sun */}
            <Sun onClick={() => onPlanetClick(planets[0])} data={planets[0]} />

            {/* Planets */}
            {planets.slice(1).map((planet) => (
                <Planet key={planet.id} data={planet} onClick={onPlanetClick} />
            ))}

            {/* Asteroid Belt */}
            <AsteroidBelt count={800} radius={315} />

            <OrbitControls
                enablePan={true}
                minDistance={100}
                maxDistance={1500}
                rotateSpeed={0.5}
            />
        </>
    );
};

const Sun = ({ onClick, data }) => {
    return (
        <group onClick={(e) => { e.stopPropagation(); onClick(data); }}>
            <mesh>
                <sphereGeometry args={[data.size, 32, 32]} />
                <meshBasicMaterial color={data.color} />
            </mesh>
            {/* Glow Effect using scaled mesh */}
            <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[data.size, 32, 32]} />
                <meshBasicMaterial color={data.glowColor} transparent opacity={0.2} />
            </mesh>
            <mesh scale={[1.5, 1.5, 1.5]}>
                <sphereGeometry args={[data.size, 32, 32]} />
                <meshBasicMaterial color={data.glowColor} transparent opacity={0.1} />
            </mesh>
        </group>
    );
};

const Planet = ({ data, onClick }) => {
    const meshRef = useRef();
    const orbitRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Random start angle
    const startAngle = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * 0.5; // Global speed multiplier
        // Orbital rotation
        if (orbitRef.current) {
            // Calculate position based on time and orbit speed (slower speed value = faster orbit in CSS logic, so we inverse or adjust)
            // Original CSS: animation duration = orbitSpeed (seconds)
            // Angular velocity = 2 * PI / orbitSpeed
            const angle = startAngle + (t * (10 / data.orbitSpeed)); // Base 10s for Earth
            orbitRef.current.position.x = Math.cos(angle) * data.orbitRadius;
            orbitRef.current.position.z = Math.sin(angle) * data.orbitRadius;
        }
        // Self rotation
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <>
            {/* Orbit Path (Visual Line) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[data.orbitRadius - 0.5, data.orbitRadius + 0.5, 128]} />
                <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
            </mesh>

            {/* Planet Group */}
            <group ref={orbitRef}>
                <mesh
                    ref={meshRef}
                    onClick={(e) => { e.stopPropagation(); onClick(data); }}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <sphereGeometry args={[data.size, 32, 32]} />
                    <meshStandardMaterial
                        color={data.color}
                        emissive={data.color}
                        emissiveIntensity={0.2}
                        roughness={0.7}
                    />
                </mesh>

                {/* Label (Billboard) */}
                {hovered && (
                    <Billboard position={[0, data.size + 20, 0]}>
                        <Html center distanceFactor={1000} zIndexRange={[100, 0]}>
                            <div style={{
                                background: 'rgba(0,0,0,0.8)', padding: '5px 10px', borderRadius: '5px',
                                color: 'white', border: `1px solid ${data.glowColor}`, whiteSpace: 'nowrap',
                                textAlign: 'center', pointerEvents: 'none', userSelect: 'none'
                            }}>
                                <strong>{data.name}</strong><br />
                                <small>1 Thn = {data.yearDuration}</small>
                            </div>
                        </Html>
                    </Billboard>
                )}
            </group>
        </>
    );
};

const AsteroidBelt = ({ count, radius }) => {
    const meshRef = useRef();

    // Generate random asteroid positions
    const asteroids = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = radius + (Math.random() - 0.5) * 50;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const y = (Math.random() - 0.5) * 10;
            const scale = Math.random() * 2 + 0.5;
            temp.push({ pos: [x, y, z], scale: [scale, scale, scale] });
        }
        return temp;
    }, [count, radius]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <group ref={meshRef}>
            {asteroids.map((data, i) => (
                <mesh key={i} position={data.pos} scale={data.scale}>
                    <dodecahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#888888" roughness={0.8} />
                </mesh>
            ))}
        </group>
    );
}

const SolarSystemMap = ({ onPlanetClick }) => {
    return (
        <div style={{ width: '100%', height: '100vh', background: '#000' }}>
            <Canvas camera={{ position: [0, 600, 1000], fov: 45 }}>
                <Scene onPlanetClick={onPlanetClick} />
            </Canvas>

            <div style={{
                position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
                pointerEvents: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem',
                display: 'flex', alignItems: 'center', gap: '10px'
            }}>
                <span>🖱️ Left Click: Rotate</span>
                <span>•</span>
                <span>🖱️ Right Click: Pan</span>
                <span>•</span>
                <span>🖱️ Scroll: Zoom</span>
            </div>
        </div>
    );
};

export default SolarSystemMap;

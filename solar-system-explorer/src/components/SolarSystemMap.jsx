import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { planets } from '../data/planets';

const SolarSystemMap = ({ onPlanetClick }) => {
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                setIsPaused(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh', background: '#050510' }}>
            <Canvas camera={{ position: [0, 800, 1200], fov: 45, far: 20000 }}>
                <Scene onPlanetClick={onPlanetClick} isPaused={isPaused} />
            </Canvas>

            <div style={{
                position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
                pointerEvents: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem',
                display: 'flex', alignItems: 'center', gap: '15px'
            }}>
                <span>🖱️ Left Click: Putar (Rotate)</span>
                <span>•</span>
                <span>🖱️ Right Click: Geser (Pan)</span>
                <span>•</span>
                <span>🖱️ Scroll: Zoom</span>
                <span>•</span>
                <span>⌨️ Space: Pause/Play</span>
            </div>

            {/* Pause Indicator */}
            {isPaused && (
                <div style={{
                    position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)',
                    background: 'rgba(255,0,0,0.5)', padding: '5px 15px', borderRadius: '20px',
                    color: 'white', fontWeight: 'bold', pointerEvents: 'none'
                }}>
                    PAUSED
                </div>
            )}
        </div>
    );
};

const Scene = ({ onPlanetClick, isPaused }) => {
    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, 0]} intensity={3} color="#FFD700" distance={5000} decay={0.5} />

            {/* Huge starfield to prevent clipping */}
            <Stars radius={5000} depth={50} count={10000} factor={6} saturation={0.5} fade speed={0.5} />

            {/* Sun */}
            <Sun onClick={() => onPlanetClick(planets[0])} data={planets[0]} />

            {/* Planets */}
            {planets.slice(1).map((planet) => (
                <Planet key={planet.id} data={planet} onClick={onPlanetClick} isPaused={isPaused} />
            ))}

            {/* Asteroid Belt */}
            <AsteroidBelt count={1500} radius={315} isPaused={isPaused} />

            <OrbitControls
                enablePan={true}
                minDistance={100}
                maxDistance={4000}
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
                <meshBasicMaterial color={data.glowColor} transparent opacity={0.3} depthWrite={false} />
            </mesh>
            <mesh scale={[1.8, 1.8, 1.8]}>
                <sphereGeometry args={[data.size, 32, 32]} />
                <meshBasicMaterial color={data.glowColor} transparent opacity={0.15} depthWrite={false} />
            </mesh>
        </group>
    );
};

const Planet = ({ data, onClick, isPaused }) => {
    const meshRef = useRef();
    const orbitRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Random start angle
    const startAngle = useMemo(() => Math.random() * Math.PI * 2, []);
    // Store current angle to handle pause/resume accurately without jumping
    const angleRef = useRef(startAngle);

    useFrame(({ clock }, delta) => {
        // Orbital rotation
        if (orbitRef.current && !isPaused) {
            // Increment angle based on speed
            // Base speed is 1 (Earth Year 10s -> 0.1 rad/s approx? No let's keep logic simple)
            // Previously: angle = startAngle + (t * (10 / speed))
            // To support pause, we must increment manually
            const speedFactor = (10 / data.orbitSpeed) * delta * 0.5; // Scale time
            angleRef.current += speedFactor;

            orbitRef.current.position.x = Math.cos(angleRef.current) * data.orbitRadius;
            orbitRef.current.position.z = Math.sin(angleRef.current) * data.orbitRadius;
        }

        // Self rotation
        if (meshRef.current && !isPaused) {
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
            <group ref={orbitRef} position={[
                Math.cos(startAngle) * data.orbitRadius,
                0,
                Math.sin(startAngle) * data.orbitRadius
            ]}>
                {/* Initial position is needed to avoid jump on first frame? No, useFrame runs imm. */}

                <group ref={meshRef}>
                    <mesh
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

                    {/* Rings (e.g. Saturn) */}
                    {data.ring && (
                        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                            <ringGeometry args={[data.ring.innerRadius, data.ring.outerRadius, 64]} />
                            <meshStandardMaterial color={data.ring.color} opacity={0.8} transparent side={THREE.DoubleSide} />
                        </mesh>
                    )}
                </group>

                {/* Label (Billboard) */}
                {hovered && (
                    <Billboard position={[0, data.ring ? data.ring.outerRadius + 20 : data.size + 20, 0]}>
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

const AsteroidBelt = ({ count, radius, isPaused }) => {
    const meshRef = useRef();

    // Generate random asteroid positions
    const asteroids = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = radius + (Math.random() - 0.5) * 80;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const y = (Math.random() - 0.5) * 20;
            const scale = Math.random() * 3 + 1;
            temp.push({ pos: [x, y, z], scale: [scale, scale, scale] });
        }
        return temp;
    }, [count, radius]);

    useFrame(() => {
        if (meshRef.current && !isPaused) {
            meshRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <group ref={meshRef}>
            {asteroids.map((data, i) => (
                <mesh key={i} position={data.pos} scale={data.scale}>
                    <dodecahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#aaa" roughness={0.6} metalness={0.4} />
                </mesh>
            ))}
        </group>
    );
}

export default SolarSystemMap;

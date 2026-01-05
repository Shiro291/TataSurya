import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { planets } from '../data/planets';
import { useIsMobile } from '../hooks/useIsMobile';

// Simple Error Boundary Component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error("3D Error:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return <Html center><div style={{ color: 'red' }}>⚠️ Error Loading 3D Model</div></Html>;
        }
        return this.props.children;
    }
}

const SolarSystemMap = ({ onPlanetClick, focusedPlanet, isPaused, isFullBright }) => {
    const isMobile = useIsMobile();

    return (
        <div style={{ width: '100%', height: '100vh', background: '#050510' }}>
            <Canvas camera={{ position: [0, 800, 1200], fov: 45, far: 20000 }}>
                <React.Suspense fallback={<Html center><div style={{ color: 'white' }}>Memuat Texture...</div></Html>}>
                    <ErrorBoundary>
                        <Scene
                            onPlanetClick={onPlanetClick}
                            isPaused={isPaused}
                            focusedPlanet={focusedPlanet}
                            isFullBright={isFullBright}
                        />
                    </ErrorBoundary>
                </React.Suspense>
            </Canvas>


            {/* Desktop Instructions - Hidden on Mobile */}
            {!isMobile && (
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
            )}

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

const Scene = ({ onPlanetClick, isPaused, focusedPlanet, isFullBright }) => {
    const controlsRef = useRef();
    const planetRefs = useRef({});

    // Register refs from children
    const setPlanetRef = (id, ref) => {
        planetRefs.current[id] = ref;
    };

    useFrame((state, delta) => {
        if (focusedPlanet && planetRefs.current[focusedPlanet.id]) {
            const targetRef = planetRefs.current[focusedPlanet.id];

            // Get current world position of the planet
            const targetPos = new THREE.Vector3();
            if (targetRef) targetRef.getWorldPosition(targetPos);

            // Smoothly move controls target to planet
            if (controlsRef.current) controlsRef.current.target.lerp(targetPos, 0.1);

            // Calculate desired camera position 
            const cameraPos = state.camera.position;
            const distance = cameraPos.distanceTo(targetPos);
            const desiredDist = focusedPlanet.size * 4;

            if (Math.abs(distance - desiredDist) > 5) {
                const direction = cameraPos.clone().sub(targetPos).normalize();
                const desiredPos = targetPos.clone().add(direction.multiplyScalar(desiredDist));
                state.camera.position.lerp(desiredPos, 0.05);
            }

        } else {
            // Camera reset disabled - let user control camera freely
            // User requested to keep camera position instead of auto-resetting
            const defaultTarget = new THREE.Vector3(0, 0, 0);
            if (controlsRef.current) {
                // Only reset target to center, don't move camera position
                controlsRef.current.target.lerp(defaultTarget, 0.05);
            }
            // Removed: state.camera.position.lerp(new THREE.Vector3(0, 800, 1200), 0.02);
        }

        if (controlsRef.current) controlsRef.current.update();
    });

    return (
        <>
            {/* Lighting: Fullbright (Flat) vs Realistic (Direct) */}
            <ambientLight intensity={isFullBright ? 1.5 : 0.05} />
            <pointLight
                position={[0, 0, 0]}
                intensity={isFullBright ? 0.5 : 2.5}
                color="#FFD700"
                distance={5000}
                decay={0.2}
            />

            <Stars radius={5000} depth={50} count={10000} factor={6} saturation={0.5} fade speed={0.5} />

            {/* Sun */}
            <Sun
                onClick={() => onPlanetClick(planets[0])}
                data={planets[0]}
                setRef={setPlanetRef}
            />

            {/* Planets */}
            {planets.slice(1).map((planet) => (
                <Planet
                    key={planet.id}
                    data={planet}
                    onClick={onPlanetClick}
                    isPaused={isPaused}
                    setRef={setPlanetRef}
                />
            ))}

            {/* Main Asteroid Belt (Between Mars & Jupiter) */}
            <AsteroidBelt count={1500} radius={315} width={60} color="#8d6e63" size={0.8} />

            {/* Kuiper Belt (Beyond Neptune) */}
            <AsteroidBelt count={3000} radius={700} width={200} color="#b0c4de" size={1.2} />

            {/* Scattered Asteroids (Randomly in the system) */}
            <ScatteredAsteroids count={500} minRadius={120} maxRadius={600} />

            <OrbitControls
                ref={controlsRef}
                enablePan={true}
                minDistance={20} // Allow closer zoom
                maxDistance={4000}
                rotateSpeed={0.5}
            />
        </>
    );
};

const Sun = ({ onClick, data, setRef }) => {
    const meshRef = useRef();
    // Fallback to color if texture fails (or use error boundary)
    // For now simple useLoader.
    const texture = useLoader(THREE.TextureLoader, data.textureUrl);

    useEffect(() => {
        if (setRef) setRef(data.id, meshRef.current);
    }, [data.id, setRef]);

    return (
        <group ref={meshRef} onClick={(e) => { e.stopPropagation(); onClick(data); }}>
            <mesh>
                <sphereGeometry args={[data.size, 64, 64]} />
                <meshBasicMaterial map={texture} color={data.color} />
            </mesh>
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

const Planet = ({ data, onClick, isPaused, setRef }) => {
    const meshRef = useRef();
    const orbitRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Load Texture
    const texture = useLoader(THREE.TextureLoader, data.textureUrl);

    // Random start angle
    const startAngle = useMemo(() => Math.random() * Math.PI * 2, []);
    const angleRef = useRef(startAngle);

    useEffect(() => {
        if (setRef) setRef(data.id, meshRef.current);
    }, [data.id, setRef]);

    useFrame(({ clock }, delta) => {
        if (orbitRef.current && !isPaused) {
            const speedFactor = (10 / data.orbitSpeed) * delta * 0.5;
            angleRef.current += speedFactor;
            orbitRef.current.position.x = Math.cos(angleRef.current) * data.orbitRadius;
            orbitRef.current.position.z = Math.sin(angleRef.current) * data.orbitRadius;
        }
        if (meshRef.current && !isPaused) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[data.orbitRadius - 0.5, data.orbitRadius + 0.5, 128]} />
                <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
            </mesh>

            <group ref={orbitRef} position={[
                Math.cos(startAngle) * data.orbitRadius,
                0,
                Math.sin(startAngle) * data.orbitRadius
            ]}>
                <group ref={meshRef}>
                    <mesh
                        onClick={(e) => { e.stopPropagation(); onClick(data); }}
                        onPointerOver={() => setHovered(true)}
                        onPointerOut={() => setHovered(false)}
                    >
                        <sphereGeometry args={[data.size, 64, 64]} />
                        <meshStandardMaterial
                            map={texture}
                            emissive={new THREE.Color(0x000000)}
                            roughness={1}
                            metalness={0.1}
                        />
                    </mesh>

                    {data.ring && (
                        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                            <ringGeometry args={[data.ring.innerRadius, data.ring.outerRadius, 64]} />
                            <meshStandardMaterial color={data.ring.color} opacity={0.8} transparent side={THREE.DoubleSide} />
                        </mesh>
                    )}
                </group>

                {hovered && (
                    <Billboard position={[0, data.ring ? data.ring.outerRadius + 20 : data.size + 20, 0]}>
                        <Html center distanceFactor={1000} zIndexRange={[100, 0]}>
                            <div style={{
                                background: 'rgba(0,0,0,0.8)', padding: '5px 10px', borderRadius: '5px',
                                color: 'white', border: `1px solid ${data.glowColor}`, whiteSpace: 'nowrap',
                                textAlign: 'center', pointerEvents: 'none', userSelect: 'none'
                            }}>
                                <strong>{data.name}</strong>
                            </div>
                        </Html>
                    </Billboard>
                )}
            </group>
        </>
    );
};

const AsteroidBelt = ({ count, radius, width = 80, color = "#aaa", size = 1, isPaused }) => {
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const asteroids = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = radius + (Math.random() - 0.5) * width;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const y = (Math.random() - 0.5) * (width / 4);
            const scale = Math.random() * size + 0.5;
            temp.push({ pos: new THREE.Vector3(x, y, z), scale: new THREE.Vector3(scale, scale, scale), rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] });
        }
        return temp;
    }, [count, radius, width, size]);

    useEffect(() => {
        if (!meshRef.current) return;
        asteroids.forEach((data, i) => {
            dummy.position.copy(data.pos);
            dummy.rotation.set(...data.rotation);
            dummy.scale.copy(data.scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [asteroids, dummy]);

    useFrame(() => {
        if (meshRef.current && !isPaused) {
            meshRef.current.rotation.y += 0.0002;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
        </instancedMesh>
    );
}

const ScatteredAsteroids = ({ count, minRadius, maxRadius, isPaused }) => {
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const asteroids = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = minRadius + Math.random() * (maxRadius - minRadius);
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const y = (Math.random() - 0.5) * 100;
            const scale = Math.random() * 0.8 + 0.2;
            temp.push({ pos: new THREE.Vector3(x, y, z), scale: new THREE.Vector3(scale, scale, scale), rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] });
        }
        return temp;
    }, [count, minRadius, maxRadius]);

    useEffect(() => {
        if (!meshRef.current) return;
        asteroids.forEach((data, i) => {
            dummy.position.copy(data.pos);
            dummy.rotation.set(...data.rotation);
            dummy.scale.copy(data.scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [asteroids, dummy]);

    useFrame(() => {
        if (meshRef.current && !isPaused) {
            meshRef.current.rotation.y -= 0.0001;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color="#666" transparent opacity={0.6} />
        </instancedMesh>
    );
}

export default SolarSystemMap;

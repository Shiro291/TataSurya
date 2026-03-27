import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Html, Billboard } from '@react-three/drei';
import * as THREE from 'three';

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

export default Planet;

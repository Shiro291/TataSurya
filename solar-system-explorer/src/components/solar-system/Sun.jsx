import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

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

export default Sun;

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const AsteroidBelt = ({ count, radius, width = 80, color = "#aaa", size = 1, isPaused }) => {
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

export const ScatteredAsteroids = ({ count, minRadius, maxRadius, isPaused }) => {
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

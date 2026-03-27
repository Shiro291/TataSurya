import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { planets } from '../../data/planets';
import Sun from './Sun';
import Planet from './Planet';
import { AsteroidBelt, ScatteredAsteroids } from './AsteroidBelt';

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

export default Scene;

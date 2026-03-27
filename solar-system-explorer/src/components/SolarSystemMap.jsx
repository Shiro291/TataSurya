import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useIsMobile } from '../hooks/useIsMobile';
import Scene from './solar-system/Scene';

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

export default SolarSystemMap;

import React, { useState } from 'react';
import { planets } from '../data/planets';
import PlanetCard from '../components/PlanetCard';
import SolarSystemMap from '../components/SolarSystemMap';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';
import { useMissionProgress } from '../hooks/useMissionProgress';
import { useImmersiveMode } from '../hooks/useImmersiveMode';
import { useCountdown } from '../hooks/useCountdown';
import ImmersiveModeToggle from '../components/ImmersiveModeToggle';
import MissionDialog from '../components/MissionDialog';
import RocketAnimation from '../components/RocketAnimation';
import PlanetDetailPanel from '../components/PlanetDetailPanel';
import { soundEffects } from '../utils/soundEffects';
import { useAchievements } from '../hooks/useAchievements';

const Explore = () => {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [viewMode, setViewMode] = useState('map'); // 'map' or 'grid'
    const [isPaused, setIsPaused] = useState(false);
    const [isFullBright, setIsFullBright] = useState(false);
    const isMobile = useIsMobile();
    const { addExploredPlanet } = useMissionProgress();
    const { visitPlanet } = useAchievements();

    // Immersive mode state

    // Immersive mode state
    const { isEnabled: immersiveMode, toggle: toggleImmersive } = useImmersiveMode();
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogType, setDialogType] = useState('launch');
    const [showRocket, setShowRocket] = useState(false);
    const [rocketDirection, setRocketDirection] = useState('launch');
    const [pendingPlanet, setPendingPlanet] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Countdown callback
    const { countdown, start: startCountdown } = useCountdown(() => {
        if (pendingPlanet) {
            // Countdown finished - zoom to planet
            setSelectedPlanet(pendingPlanet);
            if (pendingPlanet.type !== 'Star') {
                addExploredPlanet(pendingPlanet.name);
                visitPlanet(pendingPlanet.name); // Achievement check
            }
            setPendingPlanet(null);
            setShowDialog(false);

            // Show landing message
            setTimeout(() => {
                soundEffects.playLanding(); // Landing sound
                setDialogMessage(`Welcome to ${pendingPlanet.name}`);
                setDialogType('landing');
                setShowDialog(true);
                setTimeout(() => {
                    soundEffects.playSuccess(); // Success chime
                    setShowDialog(false);
                    setIsAnimating(false);
                }, 1500);
            }, 1000);
        } else {
            // Departing - zoom out
            setSelectedPlanet(null);
            setShowDialog(false);

            // Show return message
            setTimeout(() => {
                soundEffects.playLanding(); // Landing sound
                setDialogMessage('Back to orbit!');
                setDialogType('landing');
                setShowDialog(true);
                setTimeout(() => {
                    soundEffects.playSuccess(); // Success chime
                    setShowDialog(false);
                    setIsAnimating(false);
                }, 1500);
            }, 1000);
        }
    });

    // Track planet visits for mission
    const handlePlanetClick = (planet) => {
        if (isAnimating) return; // Prevent clicks during animation

        if (!immersiveMode) {
            // Normal mode - instant
            setSelectedPlanet(planet);
            if (planet.type !== 'Star') {
                addExploredPlanet(planet.name);
                visitPlanet(planet.name); // Achievement check
            }
            return;
        }

        // Immersive mode - with countdown and animations
        setIsAnimating(true);
        setPendingPlanet(planet);
        setDialogMessage(`Preparing to explore ${planet.name}`);
        setDialogType('launch');
        setShowDialog(true);
        setRocketDirection('launch');

        setTimeout(() => {
            soundEffects.playRocketLaunch(); // Rocket launch sound
            startCountdown();
            setShowRocket(true);
            setTimeout(() => setShowRocket(false), isMobile ? 1000 : 1500);
        }, 1000);
    };

    // Handle closing sidebar
    const handleCloseSidebar = () => {
        if (isAnimating) return; // Prevent clicks during animation

        if (!immersiveMode || !selectedPlanet) {
            setSelectedPlanet(null);
            return;
        }

        // Immersive mode - with countdown and animations
        setIsAnimating(true);
        setDialogMessage(`Departing from ${selectedPlanet.name}`);
        setDialogType('launch');
        setShowDialog(true);
        setRocketDirection('depart');

        setTimeout(() => {
            soundEffects.playDeparture(); // Departure sound
            startCountdown();
            setShowRocket(true);
            setTimeout(() => setShowRocket(false), isMobile ? 1000 : 1500);
        }, 1000);
    };

    // Global Spacebar Pause Listener
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                setIsPaused(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            {/* Immersive Mode Toggle */}
            <ImmersiveModeToggle
                isEnabled={immersiveMode}
                onToggle={toggleImmersive}
            />

            {/* Mission Dialog */}
            <MissionDialog
                show={showDialog}
                message={dialogMessage}
                countdown={countdown}
                type={dialogType}
            />

            {/* Rocket Animation */}
            <RocketAnimation
                show={showRocket}
                direction={rocketDirection}
            />

            {/* View Toggle - Responsive positioning */}
            <div style={{
                position: 'absolute',
                top: isMobile ? '70px' : '90px',
                left: isMobile ? '10px' : '20px',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '10px' : '15px'
            }}>
                {/* View Modes */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => setViewMode('map')}
                        style={{
                            padding: isMobile ? '6px 12px' : '8px 16px',
                            borderRadius: '20px',
                            background: viewMode === 'map' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                            color: viewMode === 'map' ? '#000' : '#fff',
                            border: '1px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            fontSize: isMobile ? '0.85rem' : '1rem'
                        }}
                    >
                        {isMobile ? '🌌 Peta' : 'Peta Orbit 🌌'}
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        style={{
                            padding: isMobile ? '6px 12px' : '8px 16px',
                            borderRadius: '20px',
                            background: viewMode === 'grid' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                            color: viewMode === 'grid' ? '#000' : '#fff',
                            border: '1px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            fontSize: isMobile ? '0.85rem' : '1rem'
                        }}
                    >
                        {isMobile ? '🗂️ Kartu' : 'Kartu 🗂️'}
                    </button>
                </div>

                {/* Tools (Light & Pause) */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => setIsFullBright(!isFullBright)}
                        style={{
                            padding: isMobile ? '6px 12px' : '8px 16px',
                            borderRadius: '20px',
                            background: isFullBright ? '#FFD700' : 'rgba(255,255,255,0.1)',
                            color: isFullBright ? '#000' : '#fff',
                            border: '1px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            fontSize: isMobile ? '0.85rem' : '1rem'
                        }}
                    >
                        {isMobile ? (isFullBright ? '💡 ON' : '🌑 OFF') : (isFullBright ? '💡 Fullbright: ON' : '🌑 Fullbright: OFF')}
                    </button>
                    <button
                        className="mobile-only"
                        onClick={() => setIsPaused(!isPaused)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            background: isPaused ? '#ff4444' : 'rgba(255,255,255,0.1)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer'
                        }}
                    >
                        {isPaused ? '⏸️ Desim: PAUSED' : '▶️ Desim: PLAY'}
                    </button>
                </div>
            </div>

            {viewMode === 'map' ? (
                <>
                    <SolarSystemMap
                        onPlanetClick={handlePlanetClick}
                        focusedPlanet={selectedPlanet}
                        isPaused={isPaused}
                        isFullBright={isFullBright}
                    />

                    {/* Planet Info Detail Panel (New Immersive V2) */}
                    <AnimatePresence>
                        {selectedPlanet && (
                            <PlanetDetailPanel
                                planet={selectedPlanet}
                                onClose={handleCloseSidebar}
                            />
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <div style={{ padding: '100px 40px 40px' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem' }}>Kartu Tata Surya</h1>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '30px',
                        justifyContent: 'center'
                    }}>
                        {planets.map((planet, index) => (
                            <motion.div
                                key={planet.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <PlanetCard planet={planet} onClick={() => setSelectedPlanet(planet)} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Reuse Sidebar for Grid View? Or stick to modal? Let's use Sidebar for consistency if possible, 
                        but grid covers full screen. Let's keep Sidebar logic but ensure z-index is high. 
                    */}
                    <AnimatePresence>
                        {selectedPlanet && (
                            <motion.div
                                initial={{ x: 400, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 400, opacity: 0 }}
                                style={{
                                    position: 'fixed', // Fixed for grid view scroll
                                    top: '70px',
                                    right: '20px',
                                    width: '350px',
                                    height: 'calc(100vh - 100px)',
                                    background: 'rgba(5, 5, 20, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '25px',
                                    overflowY: 'auto',
                                    color: 'white',
                                    boxShadow: '0 0 50px rgba(0,0,0,0.8)',
                                    zIndex: 200 // Higher than everything
                                }}
                            >
                                <button
                                    onClick={() => setSelectedPlanet(null)}
                                    style={{
                                        position: 'absolute', top: '15px', right: '15px',
                                        background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)',
                                        fontSize: '1.2rem', cursor: 'pointer'
                                    }}
                                >✕</button>
                                {/* Duplicate content? For simplicity, we just copy structure. 
                                    In real app, extract "PlanetSidebar" component. 
                                    For now, I'll allow duplication to save multiple file edits step. 
                                */}
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '5px' }}>{selectedPlanet.name}</h2>
                                <img src={selectedPlanet.imgUrl} alt="Real" style={{ width: '100%', borderRadius: '10px', marginTop: '20px' }} />
                                <p style={{ marginTop: '20px', lineHeight: '1.6' }}>{selectedPlanet.description}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )
            }
        </div >
    );
};

export default Explore;

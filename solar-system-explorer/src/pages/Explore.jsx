import React, { useState } from 'react';
import { planets } from '../data/planets';
import PlanetCard from '../components/PlanetCard';
import SolarSystemMap from '../components/SolarSystemMap';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';
import { useMissionProgress } from '../hooks/useMissionProgress';

const Explore = () => {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [viewMode, setViewMode] = useState('map'); // 'map' or 'grid'
    const [isPaused, setIsPaused] = useState(false);
    const [isFullBright, setIsFullBright] = useState(false);
    const isMobile = useIsMobile();
    const { addExploredPlanet } = useMissionProgress();

    // Track planet visits for mission
    const handlePlanetClick = (planet) => {
        setSelectedPlanet(planet);
        if (planet.type !== 'Star') {
            addExploredPlanet(planet.name);
        }
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

                    {/* NASA-Style Info Sidebar */}
                    <AnimatePresence>
                        {selectedPlanet && (
                            <motion.div
                                initial={{ x: isMobile ? 0 : 400, y: isMobile ? '100%' : 0, opacity: 0 }}
                                animate={{ x: 0, y: 0, opacity: 1 }}
                                exit={{ x: isMobile ? 0 : 400, y: isMobile ? '100%' : 0, opacity: 0 }}
                                style={{
                                    position: isMobile ? 'fixed' : 'absolute',
                                    top: isMobile ? '0' : '70px',
                                    right: isMobile ? '0' : '20px',
                                    left: isMobile ? '0' : 'auto',
                                    bottom: isMobile ? '0' : 'auto',
                                    width: isMobile ? '100%' : '350px',
                                    height: isMobile ? '100vh' : 'calc(100vh - 100px)',
                                    background: isMobile ? 'rgba(5, 5, 20, 0.98)' : 'rgba(5, 5, 20, 0.85)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: isMobile ? '0' : '20px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: isMobile ? '20px' : '25px',
                                    paddingTop: isMobile ? '80px' : '25px',
                                    overflowY: 'auto',
                                    color: 'white',
                                    boxShadow: '0 0 30px rgba(0,0,0,0.5)',
                                    zIndex: 200
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    {!isMobile && (
                                        <button
                                            onClick={() => setSelectedPlanet(null)}
                                            style={{
                                                background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white',
                                                padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem'
                                            }}
                                        >
                                            ⬅️ Kembali ke Orbit
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setSelectedPlanet(null)}
                                        style={{
                                            background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)',
                                            fontSize: isMobile ? '2rem' : '1.2rem',
                                            cursor: 'pointer',
                                            minWidth: '44px',
                                            minHeight: '44px',
                                            marginLeft: isMobile ? 'auto' : '0'
                                        }}
                                    >✕</button>
                                </div>

                                <h2 style={{ fontSize: '2.5rem', marginBottom: '5px', gradient: 'var(--gradients)' }}>{selectedPlanet.name}</h2>
                                <h4 style={{ color: 'var(--primary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>{selectedPlanet.englishName}</h4>

                                <div style={{
                                    width: '100%', height: '2px', background: selectedPlanet.color,
                                    margin: '0 0 20px', boxShadow: `0 0 10px ${selectedPlanet.glowColor}`
                                }} />

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px', fontSize: '0.9rem' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px' }}>
                                        <span style={{ display: 'block', opacity: 0.7 }}>🌡️ Suhu</span>
                                        <strong>{selectedPlanet.temp}</strong>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px' }}>
                                        <span style={{ display: 'block', opacity: 0.7 }}>📍 Jarak</span>
                                        <strong>{selectedPlanet.distance}</strong>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px' }}>
                                        <span style={{ display: 'block', opacity: 0.7 }}>⏳ Revolusi</span>
                                        <strong>{selectedPlanet.yearDuration}</strong>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px' }}>
                                        <span style={{ display: 'block', opacity: 0.7 }}>📏 Diameter</span>
                                        <strong>{selectedPlanet.realDiameter}</strong>
                                    </div>
                                </div>

                                <p style={{ lineHeight: '1.6', fontSize: '1rem', color: '#ddd', marginBottom: '25px' }}>
                                    {selectedPlanet.description}
                                </p>

                                <div style={{
                                    background: `linear-gradient(45deg, rgba(0,0,0,0.5), ${selectedPlanet.color}22)`,
                                    padding: '15px', borderRadius: '15px', borderLeft: `3px solid ${selectedPlanet.color}`
                                }}>
                                    <strong>🌟 Tahukah Kamu?</strong> <br />
                                    <span style={{ fontSize: '0.95rem', opacity: 0.9 }}>{selectedPlanet.fact}</span>
                                </div>

                                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                                    <img src={selectedPlanet.imgUrl} alt="Real" style={{ width: '100%', borderRadius: '10px', opacity: 0.8 }} />
                                    <small style={{ display: 'block', marginTop: '5px', opacity: 0.5 }}>Foto Asli NASA</small>
                                </div>

                            </motion.div>
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
            )}
        </div>
    );
};

export default Explore;

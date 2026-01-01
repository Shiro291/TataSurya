import React, { useState } from 'react';
import { planets } from '../data/planets';
import PlanetCard from '../components/PlanetCard';
import SolarSystemMap from '../components/SolarSystemMap';
import { motion, AnimatePresence } from 'framer-motion';

const Explore = () => {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [viewMode, setViewMode] = useState('map'); // 'map' or 'grid'

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            {/* View Toggle */}
            <div style={{
                position: 'absolute',
                top: '80px',
                right: '20px',
                zIndex: 100,
                display: 'flex',
                gap: '10px'
            }}>
                <button
                    onClick={() => setViewMode('map')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        background: viewMode === 'map' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                        color: viewMode === 'map' ? '#000' : '#fff',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    Peta Orbit 🌌
                </button>
                <button
                    onClick={() => setViewMode('grid')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        background: viewMode === 'grid' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                        color: viewMode === 'grid' ? '#000' : '#fff',
                        border: '1px solid rgba(255,255,255,0.2)'

                    }}
                >
                    Kartu 🗂️
                </button>
            </div>

            {viewMode === 'map' ? (
                <SolarSystemMap onPlanetClick={setSelectedPlanet} />
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
                </div>
            )}

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedPlanet && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.8)', zIndex: 200, display: 'flex',
                            justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(5px)'
                        }}
                        onClick={() => setSelectedPlanet(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: 'var(--bg-deep)', border: '1px solid var(--primary)',
                                padding: '40px', borderRadius: '30px', maxWidth: '600px', width: '90%',
                                position: 'relative', textAlign: 'center', boxShadow: '0 0 50px rgba(0,240,255,0.2)'
                            }}
                        >
                            <button
                                onClick={() => setSelectedPlanet(null)}
                                style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', color: 'white', fontSize: '1.5rem' }}
                            >✕</button>

                            <div style={{
                                width: '150px', height: '150px', background: selectedPlanet.color,
                                borderRadius: '50%', margin: '0 auto 20px',
                                boxShadow: `0 0 30px ${selectedPlanet.glowColor}`
                            }} />

                            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{selectedPlanet.name}</h2>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px', color: 'var(--primary)' }}>
                                <span>🌡️ {selectedPlanet.temp}</span>
                                <span>📍 {selectedPlanet.distance}</span>
                            </div>

                            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
                                {selectedPlanet.description}
                            </p>

                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px' }}>
                                <strong>Fakta Unik:</strong> <br />
                                {selectedPlanet.fact}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Explore;

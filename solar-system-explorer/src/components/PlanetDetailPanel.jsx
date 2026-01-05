import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';
import { planetDetails } from '../data/planetDetails';
import { useAchievements } from '../hooks/useAchievements';
import { soundEffects } from '../utils/soundEffects';
import ParticleSystem from './ParticleSystem';

const PlanetDetailPanel = ({ planet, onClose }) => {
    const isMobile = useIsMobile();
    const [activeTab, setActiveTab] = useState('overview'); // overview, stats, scan, fun
    const details = planetDetails[planet.name] || planetDetails['Earth']; // Fallback
    const { achievements, recordScan } = useAchievements();
    const [scannedThisSession, setScannedThisSession] = useState([]);

    // Reset tab when planet changes
    useEffect(() => {
        setActiveTab('overview');
        setScannedThisSession([]);
    }, [planet]);

    // Play/stop ambient sound when planet changes
    useEffect(() => {
        if (details.ambient) {
            soundEffects.playAmbient(details.ambient);
        }
        return () => {
            soundEffects.stopAmbient();
        };
    }, [planet.name, details.ambient]);

    const handleScan = (point) => {
        if (!scannedThisSession.includes(point.id)) {
            setScannedThisSession([...scannedThisSession, point.id]);
            const isNew = recordScan(point.id);
            if (isNew) {
                soundEffects.playSuccess(); // Success sound for new scan
                // Ideally show achievement toaster
            } else {
                soundEffects.playCountdownBeep(); // Regular beep for repeat scan
            }
        }
    };

    const renderTabs = () => (
        <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '10px',
            overflowX: 'auto'
        }}>
            {[
                { id: 'overview', icon: '📝', label: 'Info' },
                { id: 'stats', icon: '📊', label: 'Data' },
                { id: 'scan', icon: '🔍', label: 'Scan' },
                { id: 'fun', icon: '🌟', label: 'Fakta' }
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                        background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                        color: activeTab === tab.id ? '#000' : '#fff',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
    );

    const renderOverview = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--primary)' }}>
                {planet.name}
            </h2>
            <div style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '20px' }}>
                {planet.type}
            </div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                    src={planet.imgUrl}
                    alt={planet.name}
                    style={{
                        width: '100%',
                        maxWidth: '300px',
                        borderRadius: '15px',
                        boxShadow: `0 0 20px ${planet.glowColor || 'rgba(255,255,255,0.2)'}`
                    }}
                />
            </div>

            <p style={{ lineHeight: '1.6', fontSize: '1rem', marginBottom: '20px' }}>
                {details.description}
            </p>

            {/* Quick Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                background: 'rgba(255,255,255,0.05)',
                padding: '15px',
                borderRadius: '15px'
            }}>
                <div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Suhu</div>
                    <div style={{ fontSize: '1.1rem' }}>{details.stats.temp}°C</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Gravitasi</div>
                    <div style={{ fontSize: '1.1rem' }}>{details.stats.gravity} m/s²</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Bulan</div>
                    <div style={{ fontSize: '1.1rem' }}>{details.stats.moons}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Jarak</div>
                    <div style={{ fontSize: '1.1rem' }}>{details.stats.distance} Juta km</div>
                </div>
            </div>
        </motion.div>
    );

    const renderScan = () => (
        <div style={{
            height: '300px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '15px',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid rgba(100, 255, 218, 0.3)'
        }}>
            {/* Placeholder Visual for Planet Surface Map */}
            <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at center, rgba(100, 255, 218, 0.1) 0%, transparent 70%)`
            }}>
                {/* Grid Lines */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }} />
            </div>

            {/* Scan Points */}
            {details.scanPoints.map(point => {
                const isDiscovered = achievements.scannedPoints.includes(point.id) || scannedThisSession.includes(point.id);

                return (
                    <motion.button
                        key={point.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleScan(point)}
                        style={{
                            position: 'absolute',
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: isDiscovered
                                ? 'var(--primary)'
                                : 'rgba(255,255,255,0.2)',
                            border: `2px solid ${isDiscovered ? 'white' : 'var(--primary)'}`,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 15px var(--primary)',
                            zIndex: 10
                        }}
                    >
                        {isDiscovered ? '✅' : '❓'}
                    </motion.button>
                );
            })}

            {/* Info Overlay for Last Scanned */}
            <AnimatePresence>
                {scannedThisSession.length > 0 && (
                    <motion.div
                        key="scan-info"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            right: '0',
                            padding: '15px',
                            background: 'rgba(0,0,0,0.8)',
                            borderTop: '1px solid var(--primary)'
                        }}
                    >
                        <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                            Target Teridentifikasi:
                        </div>
                        {(() => {
                            const lastId = scannedThisSession[scannedThisSession.length - 1];
                            const point = details.scanPoints.find(p => p.id === lastId);
                            if (!point) return null;

                            return (
                                <div key={point.id}>
                                    <strong>{point.label}</strong>
                                    <div style={{ fontSize: '0.9rem', color: '#ccc' }}>{point.info}</div>
                                </div>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    const renderStats = () => (
        <div style={{ paddingTop: '10px' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Perbandingan vs Bumi</h3>

            {/* Simple Bar Charts */}
            {[
                { label: 'Suhu (°C)', val: details.stats.temp, ref: 15, unit: '°C' },
                { label: 'Gravitasi', val: details.stats.gravity, ref: 9.8, unit: 'm/s²' },
                { label: 'Jarak (Juta km)', val: details.stats.distance, ref: 149.6, unit: 'M km' }
            ].map((stat, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                        <span>{stat.label}</span>
                        <span style={{ color: '#aaa' }}>Bumi: {stat.ref}</span>
                    </div>
                    <div style={{ height: '30px', background: 'rgba(255,255,255,0.1)', borderRadius: '15px', overflow: 'hidden', position: 'relative' }}>
                        {/* Current Planet Bar */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, Math.max(5, (Math.abs(stat.val) / Math.max(Math.abs(stat.val), stat.ref)) * 100))}%` }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            style={{
                                height: '100%',
                                background: 'var(--primary)',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                display: 'flex',
                                alignItems: 'center',
                                paddingLeft: '10px',
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: '0.8rem'
                            }}
                        >
                            {stat.val}
                        </motion.div>
                    </div>
                </div>
            ))}
        </div>
    );

    const [checkedFacts, setCheckedFacts] = useState([]);

    const handleFactClick = (i) => {
        if (!checkedFacts.includes(i)) {
            setCheckedFacts([...checkedFacts, i]);
            soundEffects.playCountdownBeep(); // Satisfying click sound
        }
    };

    const renderFun = () => (
        <div>
            <h3 style={{ color: 'var(--accent)', marginBottom: '15px' }}>Tahukah Kamu? 💡</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {details.facts.map((fact, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        onClick={() => handleFactClick(i)}
                        style={{
                            padding: '15px',
                            background: checkedFacts.includes(i) ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255,255,255,0.05)',
                            borderRadius: '10px',
                            border: `1px solid ${checkedFacts.includes(i) ? '#66BB6A' : 'rgba(255,255,255,0.1)'}`,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px'
                        }}
                        whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.1)' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div style={{
                            fontSize: '1.5rem',
                            opacity: checkedFacts.includes(i) ? 1 : 0.5
                        }}>
                            {checkedFacts.includes(i) ? '✅' : '📜'}
                        </div>
                        <p style={{ margin: 0, lineHeight: '1.5', fontSize: '0.95rem', flex: 1 }}>
                            {fact}
                        </p>
                    </motion.div>
                ))}
            </div>
            {checkedFacts.length === details.facts.length && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ marginTop: '20px', textAlign: 'center', color: '#66BB6A', fontWeight: 'bold' }}
                >
                    🎉 Semua fakta telah dibaca! Kamu hebat!
                </motion.div>
            )}
        </div>
    );

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: isMobile ? '100%' : '400px',
                background: 'rgba(10, 10, 30, 0.95)',
                backdropFilter: 'blur(15px)',
                zIndex: 200, // Below MissionDialog (300) but above everything else
                borderLeft: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}
        >
            {/* Particle System Background */}
            <ParticleSystem type={details.particles} planetName={planet.name} />

            {/* Header */}
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    onClick={onClose}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                    }}
                >
                    ✕ Tutup
                </button>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>EXPLORER MODE V2.0</div>
            </div>

            {/* Scrollable Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 40px' }}>
                {renderTabs()}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'overview' && renderOverview()}
                        {activeTab === 'stats' && renderStats()}
                        {activeTab === 'scan' && renderScan()}
                        {activeTab === 'fun' && renderFun()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default PlanetDetailPanel;

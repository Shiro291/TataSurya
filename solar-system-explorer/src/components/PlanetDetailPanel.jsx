import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';
import { planetDetails } from '../data/planetDetails';
import { soundEffects } from '../utils/soundEffects';
import ParticleSystem from './ParticleSystem';
import PlanetOverview from './planet-details/PlanetOverview';
import PlanetStats from './planet-details/PlanetStats';
import PlanetScan from './planet-details/PlanetScan';
import PlanetFun from './planet-details/PlanetFun';

const PlanetDetailPanel = ({ planet, onClose }) => {
    const isMobile = useIsMobile();
    const [activeTab, setActiveTab] = useState('overview'); // overview, stats, scan, fun
    const details = planetDetails[planet.englishName] || planetDetails['Earth']; // Fallback

    // Reset tab when planet changes
    useEffect(() => {
        setActiveTab('overview');
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
                        {activeTab === 'overview' && <PlanetOverview planet={planet} details={details} />}
                        {activeTab === 'stats' && <PlanetStats details={details} />}
                        {activeTab === 'scan' && <PlanetScan details={details} planetName={planet.name} />}
                        {activeTab === 'fun' && <PlanetFun details={details} planetName={planet.name} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default PlanetDetailPanel;

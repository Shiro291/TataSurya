import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '../../hooks/useAchievements';
import { soundEffects } from '../../utils/soundEffects';

const PlanetScan = ({ details, planetName }) => {
    const { achievements, recordScan } = useAchievements();
    const [scannedThisSession, setScannedThisSession] = useState([]);

    // Reset session scan when planet changes
    useEffect(() => {
        setScannedThisSession([]);
    }, [planetName]);


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

    return (
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
};

export default PlanetScan;

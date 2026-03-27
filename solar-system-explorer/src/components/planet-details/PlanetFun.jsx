import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '../../utils/soundEffects';

const PlanetFun = ({ details, planetName }) => {
    const [checkedFacts, setCheckedFacts] = useState([]);

    // Reset checked facts when planet changes
    useEffect(() => {
        setCheckedFacts([]);
    }, [planetName]);

    const handleFactClick = (i) => {
        if (!checkedFacts.includes(i)) {
            setCheckedFacts([...checkedFacts, i]);
            soundEffects.playCountdownBeep(); // Satisfying click sound
        }
    };

    return (
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
};

export default PlanetFun;

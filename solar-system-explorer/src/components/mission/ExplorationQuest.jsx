import React from 'react';
import { motion } from 'framer-motion';
import { planets } from '../data/planets';

const ExplorationQuest = ({ exploredPlanets, onContinue }) => {
    const allPlanets = planets.filter(p => p.type !== 'Star');
    const progress = exploredPlanets.length;
    const total = allPlanets.length;
    const isComplete = progress === total;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'rgba(11, 11, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '2px solid var(--primary)',
                padding: '40px',
                borderRadius: '30px',
                maxWidth: '600px',
                margin: '0 auto'
            }}
        >
            <h1 style={{ marginBottom: '20px', color: 'var(--primary)' }}>
                🗺️ Misi Eksplorasi
            </h1>

            <p style={{ fontSize: '1.1rem', marginBottom: '30px', lineHeight: '1.6' }}>
                Sebelum memulai analisis, kamu harus menjelajahi SEMUA planet di tata surya!
                Klik setiap planet di mode <strong>Peta Orbit</strong> untuk mempelajari detailnya.
            </p>

            {/* Progress Bar */}
            <div style={{ marginBottom: '30px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                }}>
                    <span>Progress:</span>
                    <span style={{ color: isComplete ? '#66BB6A' : 'var(--primary)' }}>
                        {progress}/{total} Planet
                    </span>
                </div>
                <div style={{
                    width: '100%',
                    height: '20px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(progress / total) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        style={{
                            height: '100%',
                            background: isComplete
                                ? 'linear-gradient(90deg, #66BB6A, #4CAF50)'
                                : 'linear-gradient(90deg, var(--primary), var(--accent))',
                            borderRadius: '10px'
                        }}
                    />
                </div>
            </div>

            {/* Planet Checklist */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px',
                marginBottom: '30px'
            }}>
                {allPlanets.map(planet => {
                    const isExplored = exploredPlanets.includes(planet.name);
                    return (
                        <div
                            key={planet.id}
                            style={{
                                padding: '15px',
                                background: isExplored
                                    ? 'rgba(102, 187, 106, 0.2)'
                                    : 'rgba(255,255,255,0.05)',
                                border: `2px solid ${isExplored ? '#66BB6A' : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: '15px',
                                textAlign: 'center',
                                transition: 'all 0.3s'
                            }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: '5px' }}>
                                {isExplored ? '✅' : '⭕'}
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                color: isExplored ? '#66BB6A' : 'var(--text-muted)'
                            }}>
                                {planet.name}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Instructions */}
            <div style={{
                background: 'rgba(255, 193, 7, 0.1)',
                border: '1px solid rgba(255, 193, 7, 0.3)',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px'
            }}>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                    💡 <strong>Tip:</strong> Pergi ke halaman <strong>Jelajah</strong>,
                    pilih mode <strong>Peta Orbit</strong>, lalu klik setiap planet untuk membaca detailnya!
                </p>
            </div>

            {/* Continue Button */}
            <button
                onClick={onContinue}
                disabled={!isComplete}
                style={{
                    padding: '15px 40px',
                    fontSize: '1.2rem',
                    borderRadius: '50px',
                    background: isComplete ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                    color: isComplete ? '#000' : 'rgba(255,255,255,0.3)',
                    fontWeight: 'bold',
                    cursor: isComplete ? 'pointer' : 'not-allowed',
                    border: 'none',
                    width: '100%'
                }}
            >
                {isComplete ? 'Lanjut ke Tantangan! 🚀' : 'Jelajahi Semua Planet Dulu!'}
            </button>
        </motion.div>
    );
};

export default ExplorationQuest;

import React from 'react';
import { motion } from 'framer-motion';

const PlanetStats = ({ details }) => {
    return (
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
};

export default PlanetStats;

import React from 'react';
import { motion } from 'framer-motion';

const PlanetCard = ({ planet, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${planet.glowColor}` }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                borderRadius: '20px',
                padding: '30px',
                cursor: 'pointer',
                border: `2px solid ${planet.color}`,
                boxShadow: `0 0 20px ${planet.glowColor}33`,
                transition: 'all 0.3s',
                width: '280px',
                textAlign: 'center'
            }}
        >
            {/* Planet Image */}
            <img
                src={planet.imgUrl}
                alt={planet.name}
                style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 20px',
                    display: 'block',
                    boxShadow: `0 0 30px ${planet.glowColor}66`
                }}
            />

            <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: planet.color }}>
                {planet.name}
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
                {planet.englishName}
            </p>
            <div style={{
                background: `linear-gradient(45deg, ${planet.color}22, transparent)`,
                padding: '15px',
                borderRadius: '10px',
                borderLeft: `3px solid ${planet.color}`
            }}>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {planet.description.substring(0, 100)}...
                </p>
            </div>
        </motion.div>
    );
};

export default PlanetCard;

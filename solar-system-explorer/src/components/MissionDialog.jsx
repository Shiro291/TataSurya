import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const MissionDialog = ({ show, message, countdown, type }) => {
    const isMobile = useIsMobile();

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.7)',
                            zIndex: 299,
                            pointerEvents: 'none'
                        }}
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 300,
                            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 50, 0.95))',
                            border: '3px solid var(--primary)',
                            borderRadius: isMobile ? '15px' : '20px',
                            padding: isMobile ? '25px' : '40px',
                            textAlign: 'center',
                            minWidth: isMobile ? '280px' : '350px',
                            maxWidth: isMobile ? '90%' : '500px',
                            boxShadow: '0 0 50px var(--primary)66',
                            pointerEvents: 'none'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            style={{ fontSize: isMobile ? '2.5rem' : '3rem', marginBottom: isMobile ? '15px' : '20px' }}
                        >
                            {type === 'launch' ? '🚀' : type === 'landing' ? '✅' : '🌍'}
                        </motion.div>

                        <h2 style={{
                            color: 'var(--primary)',
                            marginBottom: isMobile ? '10px' : '15px',
                            fontSize: isMobile ? '1.2rem' : '1.5rem',
                            letterSpacing: '2px',
                            textTransform: 'uppercase'
                        }}>
                            MISSION CONTROL
                        </h2>

                        <p style={{
                            fontSize: isMobile ? '0.95rem' : '1.1rem',
                            lineHeight: '1.6',
                            marginBottom: countdown ? (isMobile ? '15px' : '20px') : '0',
                            color: 'rgba(255,255,255,0.9)'
                        }}>
                            {message}
                        </p>

                        {countdown && (
                            <motion.div
                                key={countdown}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ type: 'spring', damping: 10 }}
                                style={{
                                    fontSize: isMobile ? '3rem' : '4rem',
                                    fontWeight: 'bold',
                                    color: countdown === 'GO!' ? '#66BB6A' : 'var(--primary)',
                                    textShadow: `0 0 20px ${countdown === 'GO!' ? '#66BB6A' : 'var(--primary)'}`
                                }}
                            >
                                {countdown}
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MissionDialog;

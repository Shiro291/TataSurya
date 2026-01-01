import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';

const Home = () => {
    const isMobile = useIsMobile();

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: isMobile ? '80px 20px 80px' : '100px 20px 50px',
            position: 'relative'
        }}>
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    fontSize: isMobile ? '2.5rem' : '4rem',
                    marginBottom: '20px',
                    background: 'linear-gradient(to right, #fff, #00f0ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
            >
                Misi: Penyelamatan Bumi
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                    fontSize: isMobile ? '1rem' : '1.2rem',
                    width: isMobile ? '90%' : 'auto',
                    maxWidth: '600px',
                    marginBottom: '40px',
                    color: 'var(--text-muted)'
                }}
            >
                Halo Kadet! Bumi sepertinya sedang demam. Tugasmu adalah menjelajahi tata surya, membandingkan Bumi dengan planet lain, dan mencari tahu kenapa Bumi sangat spesial untuk kita tinggali. Siap?
            </motion.p>

            <Link to="/explore">
                <motion.button
                    whileHover={{ scale: 1.1, boxShadow: '0 0 30px var(--primary)' }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        padding: isMobile ? '12px 30px' : '15px 40px',
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        background: 'var(--primary)',
                        color: '#000',
                        fontWeight: 'bold',
                        borderRadius: '50px'
                    }}
                >
                    MULAI MISI 🚀
                </motion.button>
            </Link>

            {/* Footer Credit */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1, duration: 1 }}
                style={{
                    position: isMobile ? 'relative' : 'absolute',
                    bottom: isMobile ? 'auto' : '20px',
                    marginTop: isMobile ? '60px' : '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '1px'
                }}
            >
                Made by <strong>Fathan Faqih Ali</strong>
            </motion.div>
        </div>
    );
};

export default Home;

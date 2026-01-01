import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '100px 20px 50px'
        }}>
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ fontSize: '4rem', marginBottom: '20px', background: 'linear-gradient(to right, #fff, #00f0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
                Misi: Penyelamatan Bumi
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '40px', color: 'var(--text-muted)' }}
            >
                Halo Kadet! Bumi sepertinya sedang demam. Tugasmu adalah menjelajahi tata surya, membandingkan Bumi dengan planet lain, dan mencari tahu kenapa Bumi sangat spesial untuk kita tinggali. Siap?
            </motion.p>

            <Link to="/explore">
                <motion.button
                    whileHover={{ scale: 1.1, boxShadow: '0 0 30px var(--primary)' }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        padding: '15px 40px',
                        fontSize: '1.2rem',
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
                    position: 'absolute',
                    bottom: '20px',
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

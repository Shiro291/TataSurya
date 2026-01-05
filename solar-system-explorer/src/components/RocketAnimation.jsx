import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const RocketAnimation = ({ show, direction }) => {
    const isMobile = useIsMobile();
    // direction: 'launch' (bottom to center) or 'depart' (center to top)

    const variants = {
        launch: {
            initial: { y: '100vh', x: '-50%', rotate: 0, opacity: 0, scale: 0.5 },
            animate: { y: '10vh', x: '-50%', rotate: -45, opacity: 1, scale: 1 },
            exit: { y: '-20vh', x: '-50%', rotate: -45, opacity: 0, scale: 0.8 }
        },
        depart: {
            initial: { y: '10vh', x: '-50%', rotate: 45, opacity: 0, scale: 0.5 },
            animate: { y: '-10vh', x: '-50%', rotate: 45, opacity: 1, scale: 1 },
            exit: { y: '-100vh', x: '-50%', rotate: 45, opacity: 0, scale: 0.8 }
        }
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={variants[direction].initial}
                    animate={variants[direction].animate}
                    exit={variants[direction].exit}
                    transition={{
                        duration: isMobile ? 1 : 1.5,
                        ease: 'easeInOut'
                    }}
                    style={{
                        position: 'fixed',
                        left: '50%',
                        zIndex: 250,
                        fontSize: isMobile ? '4rem' : '5rem',
                        pointerEvents: 'none',
                        filter: 'drop-shadow(0 0 10px rgba(255, 193, 7, 0.8))'
                    }}
                >
                    🚀
                    {/* Rocket trail effect */}
                    <motion.div
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        style={{
                            position: 'absolute',
                            top: direction === 'launch' ? '100%' : '-50%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '2rem',
                            opacity: 0.5
                        }}
                    >
                        💨
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RocketAnimation;

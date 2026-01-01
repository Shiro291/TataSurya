import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pages = [
    {
        id: 1,
        title: "Laporan Masuk!",
        text: "Komandan! Detektor kita menunjukkan Bumi punya suhu rata-rata 15°C. Nyaman untuk manusia, hewan, dan tumbuhan. Tapi... kenapa ya bisa pas begini?",
        action: "Ayo Cek Tetangga!"
    },
    {
        id: 2,
        title: "Misi ke Merkurius",
        text: "Wushhh! Kita sampai di Merkurius. Jaraknya dekat sekali dengan Matahari. Suhunya 430°C! Air di sini akan langsung menguap.",
        highlight: "Terlalu Panas!",
        color: "#E53935"
    },
    {
        id: 3,
        title: "Misi ke Neptunus",
        text: "Brrr! Kita terbang jauh ke Neptunus. Jauh sekali dari Matahari. Suhunya -200°C. Semuanya beku di sini menjadi es abadi.",
        highlight: "Terlalu Dingin!",
        color: "#4FC3F7"
    },
    {
        id: 4,
        title: "Kesimpulan",
        text: "Aha! Bumi berada di jarak yang pas. Tidak terlalu dekat (panas) dan tidak terlalu jauh (dingin). Ini disebut 'Goldilocks Zone'. Itulah kenapa Bumi spesial!",
        highlight: "Bumi Itu Pas!",
        color: "#66BB6A",
        final: true
    }
];

import confetti from 'canvas-confetti';

const Mission = () => {
    const [step, setStep] = useState(0);

    const nextStep = () => {
        if (step < pages.length - 1) {
            setStep(step + 1);
            // If next step is final (index 3), trigger confetti
            if (step + 1 === 3) {
                triggerConfetti();
            }
        }
    };

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const restart = () => setStep(0);

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
            padding: '100px 20px', textAlign: 'center'
        }}>
            <div style={{
                maxWidth: '600px', width: '100%', perspective: '1000px'
            }}>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={step}
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: 'rgba(11, 11, 42, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: `2px solid ${pages[step].color || 'var(--primary)'}`,
                            padding: '40px',
                            borderRadius: '30px',
                            boxShadow: `0 0 50px ${pages[step].color || 'var(--primary)'}44`
                        }}
                    >
                        <h1 style={{ marginBottom: '20px', color: pages[step].color || 'white' }}>{pages[step].title}</h1>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px' }}>{pages[step].text}</p>

                        {pages[step].highlight && (
                            <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: pages[step].color }}>
                                {pages[step].highlight}
                            </h2>
                        )}

                        {!pages[step].final ? (
                            <button
                                onClick={nextStep}
                                style={{
                                    padding: '15px 40px', fontSize: '1.2rem', borderRadius: '50px',
                                    background: pages[step].color || 'var(--primary)', color: '#000', fontWeight: 'bold'
                                }}
                            >
                                {pages[step].action || 'Lanjut ➡️'}
                            </button>
                        ) : (
                            <button
                                onClick={restart}
                                style={{
                                    padding: '15px 40px', fontSize: '1.2rem', borderRadius: '50px',
                                    background: 'var(--accent)', color: '#000', fontWeight: 'bold'
                                }}
                            >
                                Ulangi Misi 🔄
                            </button>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Progress Dots */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
                    {pages.map((_, i) => (
                        <div key={i} style={{
                            width: '12px', height: '12px', borderRadius: '50%',
                            background: i === step ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                            transition: 'background 0.3s'
                        }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Mission;

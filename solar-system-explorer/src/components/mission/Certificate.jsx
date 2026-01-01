import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Certificate = ({ studentName, score, exploredCount, onRestart }) => {
    const [name, setName] = useState(studentName || '');
    const [showCert, setShowCert] = useState(!!studentName);

    const generateCertificate = () => {
        if (name.trim()) {
            setShowCert(true);
            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    if (!showCert) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    background: 'rgba(11, 11, 42, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid var(--primary)',
                    padding: '40px',
                    borderRadius: '30px',
                    maxWidth: '500px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}
            >
                <h1 style={{ marginBottom: '20px' }}>🎉 Misi Selesai!</h1>
                <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                    Masukkan namamu untuk mendapatkan sertifikat:
                </p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama lengkapmu..."
                    style={{
                        width: '100%',
                        padding: '15px',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        fontSize: '1.1rem',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && generateCertificate()}
                />
                <button
                    onClick={generateCertificate}
                    disabled={!name.trim()}
                    style={{
                        padding: '15px 40px',
                        borderRadius: '50px',
                        background: name.trim() ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                        color: name.trim() ? '#000' : 'rgba(255,255,255,0.3)',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        cursor: name.trim() ? 'pointer' : 'not-allowed',
                        border: 'none'
                    }}
                >
                    Dapatkan Sertifikat! 🏆
                </button>
            </motion.div>
        );
    }

    const getStarRating = () => {
        if (score >= 80) return '⭐⭐⭐';
        if (score >= 60) return '⭐⭐';
        return '⭐';
    };

    const getRank = () => {
        if (score >= 80) return 'Space Commander';
        if (score >= 60) return 'Space Cadet';
        return 'Space Explorer';
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
                background: 'linear-gradient(135deg, rgba(11, 11, 42, 0.9), rgba(30, 30, 80, 0.9))',
                backdropFilter: 'blur(20px)',
                border: '3px solid var(--primary)',
                padding: '50px',
                borderRadius: '30px',
                maxWidth: '700px',
                margin: '0 auto',
                textAlign: 'center',
                boxShadow: '0 0 50px var(--primary)44'
            }}
        >
            {/* Certificate Header */}
            <div style={{
                borderBottom: '2px solid var(--primary)',
                paddingBottom: '20px',
                marginBottom: '30px'
            }}>
                <h3 style={{
                    fontSize: '1.2rem',
                    color: 'var(--primary)',
                    margin: 0,
                    letterSpacing: '3px'
                }}>
                    SERTIFIKAT MISI
                </h3>
                <h1 style={{
                    fontSize: '2.5rem',
                    margin: '10px 0',
                    background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Penyelamatan Bumi
                </h1>
            </div>

            {/* Main Content */}
            <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                Dengan ini menyatakan bahwa
            </p>
            <h2 style={{
                fontSize: '2.5rem',
                color: 'var(--primary)',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '2px'
            }}>
                {name}
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
                Telah berhasil menyelesaikan misi eksplorasi tata surya dengan
                menjelajahi <strong>{exploredCount} planet</strong>, menyelesaikan
                tantangan perbandingan dengan skor <strong>{score}%</strong>, dan
                menulis laporan ilmiah tentang keistimewaan Bumi.
            </p>

            {/* Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <div style={{
                    padding: '20px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '5px' }}>🗺️</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {exploredCount} Planet
                    </div>
                </div>
                <div style={{
                    padding: '20px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '5px' }}>{getStarRating()}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {score}% Score
                    </div>
                </div>
                <div style={{
                    padding: '20px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '5px' }}>🏆</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {getRank()}
                    </div>
                </div>
            </div>

            {/* Date */}
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '30px' }}>
                Diselesaikan pada: {new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}
            </p>

            {/* Signature */}
            <div style={{
                borderTop: '2px solid rgba(255,255,255,0.1)',
                paddingTop: '20px',
                marginTop: '30px'
            }}>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                    "Bumi adalah satu-satunya rumah kita. Mari jaga bersama!" 🌍
                </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                <button
                    onClick={onRestart}
                    style={{
                        flex: 1,
                        padding: '15px',
                        borderRadius: '50px',
                        background: 'rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    🔄 Ulangi Misi
                </button>
                <button
                    onClick={() => window.print()}
                    style={{
                        flex: 1,
                        padding: '15px',
                        borderRadius: '50px',
                        background: 'var(--primary)',
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                >
                    🖨️ Cetak Sertifikat
                </button>
            </div>
        </motion.div>
    );
};

export default Certificate;

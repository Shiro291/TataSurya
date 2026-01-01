import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MissionReport = ({ initialDraft = '', onSubmit }) => {
    const [report, setReport] = useState(initialDraft);
    const wordCount = report.split(/\s+/).filter(w => w).length;
    const minWords = 200;
    const canSubmit = wordCount >= minWords;

    // Auto-save every 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('mission_report_draft', report);
        }, 3000);
        return () => clearTimeout(timer);
    }, [report]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'rgba(11, 11, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '2px solid #66BB6A',
                padding: '40px',
                borderRadius: '30px',
                maxWidth: '800px',
                margin: '0 auto'
            }}
        >
            <h1 style={{ marginBottom: '10px', color: '#66BB6A' }}>
                📝 Laporan Misi
            </h1>
            <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: 'var(--text-muted)' }}>
                Tulis laporanmu tentang mengapa Bumi istimewa dan perlu dilindungi!
            </p>

            {/* Guidelines */}
            <div style={{
                background: 'rgba(102, 187, 106, 0.1)',
                border: '1px solid rgba(102, 187, 106, 0.3)',
                padding: '20px',
                borderRadius: '15px',
                marginBottom: '20px'
            }}>
                <h3 style={{ marginTop: 0, color: '#66BB6A' }}>Panduan Laporan:</h3>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>Sebutkan minimal <strong>3 perbedaan</strong> Bumi dengan planet lain</li>
                    <li>Jelaskan mengapa perbedaan tersebut penting untuk kehidupan</li>
                    <li>Gunakan data yang kamu pelajari (suhu, jarak, atmosfer, dll)</li>
                    <li>Kesimpulan: Mengapa Bumi perlu dilindungi?</li>
                </ul>
            </div>

            {/* Text Editor */}
            <textarea
                value={report}
                onChange={(e) => setReport(e.target.value)}
                placeholder="Mulai menulis laporanmu di sini...

Contoh:
Setelah menjelajahi tata surya, saya menemukan bahwa Bumi sangat istimewa karena...

1. Suhu yang Ideal: Bumi memiliki suhu rata-rata 15°C, berbeda dengan Venus yang..."
                rows={15}
                style={{
                    width: '100%',
                    padding: '20px',
                    borderRadius: '15px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                }}
            />

            {/* Word Counter */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '15px',
                padding: '15px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '10px'
            }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    💾 Auto-save aktif
                </span>
                <span style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: canSubmit ? '#66BB6A' : 'var(--text-muted)'
                }}>
                    {wordCount} / {minWords} kata
                </span>
            </div>

            {/* Submit Button */}
            <button
                onClick={() => onSubmit(report)}
                disabled={!canSubmit}
                style={{
                    width: '100%',
                    padding: '18px',
                    marginTop: '20px',
                    borderRadius: '50px',
                    background: canSubmit ? '#66BB6A' : 'rgba(255,255,255,0.1)',
                    color: canSubmit ? '#000' : 'rgba(255,255,255,0.3)',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    cursor: canSubmit ? 'pointer' : 'not-allowed',
                    border: 'none'
                }}
            >
                {canSubmit ? 'Kirim Laporan & Selesaikan Misi! 🚀' : `Tulis ${minWords - wordCount} kata lagi...`}
            </button>
        </motion.div>
    );
};

export default MissionReport;

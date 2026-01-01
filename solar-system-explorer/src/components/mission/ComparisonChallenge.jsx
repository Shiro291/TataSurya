import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getRandomQuestions } from '../../data/questions';

const ComparisonChallenge = ({ onComplete, savedAnswers = {} }) => {
    const [questions] = useState(() => getRandomQuestions(5));
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState(savedAnswers);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const question = questions[currentQ];
    const userAnswer = answers[question.id];

    const checkAnswer = () => {
        let correct = false;

        if (question.type === 'multiple-choice') {
            correct = userAnswer === question.correct;
        } else if (question.type === 'calculation') {
            const num = parseFloat(userAnswer);
            correct = num >= question.correctRange[0] && num <= question.correctRange[1];
        } else if (question.type === 'open-ended') {
            const text = (userAnswer || '').toLowerCase();
            const wordCount = text.split(/\s+/).filter(w => w).length;
            const hasKeywords = question.keywords.some(kw => text.includes(kw.toLowerCase()));
            correct = wordCount >= question.minWords && hasKeywords;
        }

        setIsCorrect(correct);
        setShowFeedback(true);
    };

    const nextQuestion = () => {
        setShowFeedback(false);
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            // Calculate final score
            const score = questions.reduce((acc, q) => {
                let correct = false;
                const ans = answers[q.id];

                if (q.type === 'multiple-choice') {
                    correct = ans === q.correct;
                } else if (q.type === 'calculation') {
                    const num = parseFloat(ans);
                    correct = num >= q.correctRange[0] && num <= q.correctRange[1];
                } else if (q.type === 'open-ended') {
                    const text = (ans || '').toLowerCase();
                    const wordCount = text.split(/\s+/).filter(w => w).length;
                    const hasKeywords = q.keywords.some(kw => text.includes(kw.toLowerCase()));
                    correct = wordCount >= q.minWords && hasKeywords;
                }

                return acc + (correct ? 1 : 0);
            }, 0);

            const percentage = Math.round((score / questions.length) * 100);
            onComplete(percentage, answers);
        }
    };

    const renderInput = () => {
        if (question.type === 'multiple-choice') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {question.options.map(option => (
                        <button
                            key={option}
                            onClick={() => setAnswers({ ...answers, [question.id]: option })}
                            style={{
                                padding: '15px',
                                borderRadius: '10px',
                                background: userAnswer === option
                                    ? 'var(--primary)'
                                    : 'rgba(255,255,255,0.1)',
                                color: userAnswer === option ? '#000' : '#fff',
                                border: '1px solid rgba(255,255,255,0.2)',
                                cursor: 'pointer',
                                textAlign: 'left',
                                fontSize: '1rem'
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            );
        } else if (question.type === 'calculation') {
            return (
                <div>
                    <input
                        type="number"
                        value={userAnswer || ''}
                        onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                        placeholder="Masukkan jawaban..."
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '10px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            fontSize: '1.1rem'
                        }}
                    />
                    {question.unit && (
                        <span style={{ marginLeft: '10px', color: 'var(--text-muted)' }}>
                            {question.unit}
                        </span>
                    )}
                </div>
            );
        } else if (question.type === 'open-ended') {
            const wordCount = (userAnswer || '').split(/\s+/).filter(w => w).length;
            return (
                <div>
                    <textarea
                        value={userAnswer || ''}
                        onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                        placeholder="Tulis jawabanmu di sini..."
                        rows={5}
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '10px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            fontSize: '1rem',
                            resize: 'vertical'
                        }}
                    />
                    <div style={{
                        textAlign: 'right',
                        fontSize: '0.9rem',
                        color: wordCount >= question.minWords ? '#66BB6A' : 'var(--text-muted)',
                        marginTop: '5px'
                    }}>
                        {wordCount} / {question.minWords} kata minimum
                    </div>
                </div>
            );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'rgba(11, 11, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '2px solid var(--accent)',
                padding: '40px',
                borderRadius: '30px',
                maxWidth: '700px',
                margin: '0 auto'
            }}
        >
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ color: 'var(--accent)', margin: 0 }}>
                    🧠 Tantangan Perbandingan
                </h1>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                    {currentQ + 1} / {questions.length}
                </span>
            </div>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '30px' }}>
                {questions.map((_, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            height: '4px',
                            borderRadius: '2px',
                            background: i <= currentQ ? 'var(--accent)' : 'rgba(255,255,255,0.2)'
                        }}
                    />
                ))}
            </div>

            {/* Question */}
            <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', lineHeight: '1.5' }}>
                {question.question}
            </h2>

            {/* Hint */}
            {question.hint && (
                <div style={{
                    background: 'rgba(255, 193, 7, 0.1)',
                    border: '1px solid rgba(255, 193, 7, 0.3)',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    fontSize: '0.9rem'
                }}>
                    💡 {question.hint}
                </div>
            )}

            {/* Input */}
            <div style={{ marginBottom: '30px' }}>
                {renderInput()}
            </div>

            {/* Feedback */}
            {showFeedback && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        padding: '20px',
                        borderRadius: '15px',
                        background: isCorrect
                            ? 'rgba(102, 187, 106, 0.2)'
                            : 'rgba(244, 67, 54, 0.2)',
                        border: `2px solid ${isCorrect ? '#66BB6A' : '#F44336'}`,
                        marginBottom: '20px'
                    }}
                >
                    <div style={{
                        fontSize: '1.5rem',
                        marginBottom: '10px',
                        color: isCorrect ? '#66BB6A' : '#F44336'
                    }}>
                        {isCorrect ? '✅ Benar!' : '❌ Belum Tepat'}
                    </div>
                    <p style={{ margin: 0, lineHeight: '1.5' }}>
                        {question.explanation}
                    </p>
                </motion.div>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
                {!showFeedback ? (
                    <button
                        onClick={checkAnswer}
                        disabled={!userAnswer}
                        style={{
                            flex: 1,
                            padding: '15px',
                            borderRadius: '50px',
                            background: userAnswer ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                            color: userAnswer ? '#000' : 'rgba(255,255,255,0.3)',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            cursor: userAnswer ? 'pointer' : 'not-allowed',
                            border: 'none'
                        }}
                    >
                        Cek Jawaban
                    </button>
                ) : (
                    <button
                        onClick={nextQuestion}
                        style={{
                            flex: 1,
                            padding: '15px',
                            borderRadius: '50px',
                            background: 'var(--primary)',
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            border: 'none'
                        }}
                    >
                        {currentQ < questions.length - 1 ? 'Soal Berikutnya →' : 'Lihat Hasil 🎯'}
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default ComparisonChallenge;

import React from 'react';
import { useMissionProgress } from '../hooks/useMissionProgress';
import ExplorationQuest from '../components/mission/ExplorationQuest';
import ComparisonChallenge from '../components/mission/ComparisonChallenge';
import MissionReport from '../components/mission/MissionReport';
import Certificate from '../components/mission/Certificate';

const Mission = () => {
    const {
        progress,
        setStage,
        setQuizScore,
        saveReportDraft,
        setStudentName,
        completeMission,
        resetMission
    } = useMissionProgress();

    const handleExplorationComplete = () => {
        setStage(2);
    };

    const handleQuizComplete = (score, answers) => {
        setQuizScore(score);
        if (score >= 60) {
            setStage(3);
        } else {
            alert(`Skor kamu ${score}%. Coba lagi untuk mendapat minimal 60%!`);
            setStage(2); // Retry quiz
        }
    };

    const handleReportSubmit = (reportText) => {
        saveReportDraft(reportText);
        setStage(4);
    };

    const handleCertificateRestart = () => {
        if (confirm('Yakin ingin mengulang misi dari awal?')) {
            resetMission();
        }
    };

    const renderStage = () => {
        switch (progress.stage) {
            case 1:
                return (
                    <ExplorationQuest
                        exploredPlanets={progress.exploredPlanets}
                        onContinue={handleExplorationComplete}
                    />
                );
            case 2:
                return (
                    <ComparisonChallenge
                        savedAnswers={progress.quizAnswers}
                        onComplete={handleQuizComplete}
                    />
                );
            case 3:
                return (
                    <MissionReport
                        initialDraft={progress.reportDraft}
                        onSubmit={handleReportSubmit}
                    />
                );
            case 4:
                return (
                    <Certificate
                        studentName={progress.studentName}
                        score={progress.quizScore}
                        exploredCount={progress.exploredPlanets.length}
                        onRestart={handleCertificateRestart}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '100px 20px 50px'
        }}>
            {/* Stage Indicator */}
            <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '40px',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {[
                    { num: 1, label: 'Eksplorasi', icon: '🗺️' },
                    { num: 2, label: 'Tantangan', icon: '🧠' },
                    { num: 3, label: 'Laporan', icon: '📝' },
                    { num: 4, label: 'Sertifikat', icon: '🏆' }
                ].map(stage => (
                    <div
                        key={stage.num}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '20px',
                            background: progress.stage === stage.num
                                ? 'var(--primary)'
                                : progress.stage > stage.num
                                    ? 'rgba(102, 187, 106, 0.3)'
                                    : 'rgba(255,255,255,0.1)',
                            color: progress.stage === stage.num ? '#000' : '#fff',
                            border: `2px solid ${progress.stage === stage.num
                                    ? 'var(--primary)'
                                    : progress.stage > stage.num
                                        ? '#66BB6A'
                                        : 'rgba(255,255,255,0.2)'
                                }`,
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <span>{stage.icon}</span>
                        <span>{stage.label}</span>
                        {progress.stage > stage.num && <span>✓</span>}
                    </div>
                ))}
            </div>

            {/* Current Stage */}
            {renderStage()}
        </div>
    );
};

export default Mission;

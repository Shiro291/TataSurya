import { useState, useEffect } from 'react';

const STORAGE_KEY = 'mission_progress';

export const useMissionProgress = () => {
    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {
            stage: 1,
            exploredPlanets: [],
            quizAnswers: {},
            quizScore: 0,
            quizMastery: {},
            reportDraft: '',
            studentName: '',
            completed: false,
            completedAt: null
        };
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);

    const addExploredPlanet = (planetName) => {
        if (!progress.exploredPlanets.includes(planetName)) {
            setProgress(prev => ({
                ...prev,
                exploredPlanets: [...prev.exploredPlanets, planetName]
            }));
        }
    };

    const setStage = (stage) => {
        setProgress(prev => ({ ...prev, stage }));
    };

    const saveQuizAnswer = (questionId, answer) => {
        setProgress(prev => ({
            ...prev,
            quizAnswers: { ...prev.quizAnswers, [questionId]: answer }
        }));
    };

    const setQuizScore = (score, mastery = {}) => {
        setProgress(prev => ({ ...prev, quizScore: score, quizMastery: mastery }));
    };

    const saveReportDraft = (text) => {
        setProgress(prev => ({ ...prev, reportDraft: text }));
    };

    const setStudentName = (name) => {
        setProgress(prev => ({ ...prev, studentName: name }));
    };

    const completeMission = () => {
        setProgress(prev => ({
            ...prev,
            completed: true,
            completedAt: new Date().toISOString()
        }));
    };

    const resetMission = () => {
        localStorage.removeItem(STORAGE_KEY);
        setProgress({
            stage: 1,
            exploredPlanets: [],
            quizAnswers: {},
            quizScore: 0,
            reportDraft: '',
            studentName: '',
            completed: false,
            completedAt: null
        });
    };

    return {
        progress,
        addExploredPlanet,
        setStage,
        saveQuizAnswer,
        setQuizScore,
        saveReportDraft,
        setStudentName,
        completeMission,
        resetMission
    };
};

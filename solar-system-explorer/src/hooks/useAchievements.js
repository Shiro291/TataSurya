import { useState, useEffect } from 'react';

export const useAchievements = () => {
    const [achievements, setAchievements] = useState(() => {
        const saved = localStorage.getItem('achievements');
        return saved ? JSON.parse(saved) : {
            unlocked: [],
            scannedPoints: [],
            stats: {
                totalScans: 0,
                planetsVisited: [],
                quizzesPassed: 0
            }
        };
    });

    useEffect(() => {
        localStorage.setItem('achievements', JSON.stringify(achievements));
    }, [achievements]);

    const unlockAchievement = (id) => {
        if (!achievements.unlocked.includes(id)) {
            const newAchievements = {
                ...achievements,
                unlocked: [...achievements.unlocked, id]
            };
            setAchievements(newAchievements);
            // Could return true to trigger a notification UI
            return true;
        }
        return false;
    };

    const recordScan = (pointId) => {
        if (!achievements.scannedPoints.includes(pointId)) {
            const newScanned = [...achievements.scannedPoints, pointId];
            const newStats = {
                ...achievements.stats,
                totalScans: newScanned.length
            };

            const newAchievements = {
                ...achievements,
                scannedPoints: newScanned,
                stats: newStats
            };
            setAchievements(newAchievements);

            // Check scan milestones
            if (newScanned.length === 1) unlockAchievement('scanner_novice');
            if (newScanned.length === 5) unlockAchievement('scanner_pro');
            if (newScanned.length === 10) unlockAchievement('scanner_master');

            return true; // New scan recorded
        }
        return false;
    };

    const visitPlanet = (planetName) => {
        if (!achievements.stats.planetsVisited.includes(planetName)) {
            const newVisited = [...achievements.stats.planetsVisited, planetName];
            const newStats = {
                ...achievements.stats,
                planetsVisited: newVisited
            };

            const newAchievements = {
                ...achievements,
                stats: newStats
            };
            setAchievements(newAchievements);

            // Check visit milestones
            if (newVisited.length === 1) unlockAchievement('first_landing');
            if (newVisited.length === 8) unlockAchievement('solar_system_expert');
            if (planetName === 'Earth') unlockAchievement('home_sweet_home');
            if (planetName === 'Mars') unlockAchievement('red_planet_explorer');
        }
    };

    return {
        achievements,
        unlockAchievement,
        recordScan,
        visitPlanet
    };
};

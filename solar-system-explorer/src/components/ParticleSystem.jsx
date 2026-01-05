import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ParticleSystem = ({ type, planetName }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const particles = [];
        let animationId;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle configuration based on type
        const configs = {
            dust: {
                count: 50,
                color: 'rgba(210, 180, 140, 0.4)',
                size: () => Math.random() * 2 + 1,
                speed: () => Math.random() * 0.5 + 0.2,
                direction: 'horizontal'
            },
            clouds: {
                count: 30,
                color: 'rgba(255, 255, 255, 0.3)',
                size: () => Math.random() * 8 + 4,
                speed: () => Math.random() * 0.3 + 0.1,
                direction: 'horizontal'
            },
            'acid-rain': {
                count: 80,
                color: 'rgba(255, 255, 0, 0.3)',
                size: () => Math.random() * 3 + 1,
                speed: () => Math.random() * 2 + 1,
                direction: 'vertical'
            },
            gas: {
                count: 40,
                color: 'rgba(200, 150, 100, 0.2)',
                size: () => Math.random() * 6 + 3,
                speed: () => Math.random() * 0.4 + 0.2,
                direction: 'swirl'
            },
            ice: {
                count: 60,
                color: 'rgba(200, 230, 255, 0.4)',
                size: () => Math.random() * 2 + 1,
                speed: () => Math.random() * 0.8 + 0.3,
                direction: 'diagonal'
            },
            storm: {
                count: 100,
                color: 'rgba(100, 100, 150, 0.3)',
                size: () => Math.random() * 3 + 1,
                speed: () => Math.random() * 3 + 1,
                direction: 'chaotic'
            },
            fire: {
                count: 70,
                color: 'rgba(255, 150, 0, 0.4)',
                size: () => Math.random() * 4 + 2,
                speed: () => Math.random() * 1 + 0.5,
                direction: 'upward'
            },
            rings: {
                count: 40,
                color: 'rgba(200, 180, 150, 0.3)',
                size: () => Math.random() * 3 + 1,
                speed: () => Math.random() * 0.2 + 0.1,
                direction: 'orbital'
            }
        };

        const config = configs[type] || configs.dust;

        // Initialize particles
        for (let i = 0; i < config.count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: config.size(),
                speed: config.speed(),
                angle: Math.random() * Math.PI * 2,
                opacity: Math.random() * 0.5 + 0.3
            });
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                // Draw particle
                ctx.fillStyle = config.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Update position based on direction
                switch (config.direction) {
                    case 'horizontal':
                        particle.x += particle.speed;
                        if (particle.x > canvas.width) particle.x = -particle.size;
                        break;
                    case 'vertical':
                        particle.y += particle.speed;
                        if (particle.y > canvas.height) {
                            particle.y = -particle.size;
                            particle.x = Math.random() * canvas.width;
                        }
                        break;
                    case 'diagonal':
                        particle.x += particle.speed * 0.5;
                        particle.y += particle.speed;
                        if (particle.y > canvas.height || particle.x > canvas.width) {
                            particle.y = -particle.size;
                            particle.x = Math.random() * canvas.width;
                        }
                        break;
                    case 'upward':
                        particle.y -= particle.speed;
                        particle.x += Math.sin(particle.angle) * 0.5;
                        if (particle.y < -particle.size) {
                            particle.y = canvas.height + particle.size;
                            particle.x = Math.random() * canvas.width;
                        }
                        break;
                    case 'swirl':
                        particle.angle += 0.02;
                        particle.x += Math.cos(particle.angle) * particle.speed;
                        particle.y += Math.sin(particle.angle) * particle.speed * 0.5;
                        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
                            particle.x = canvas.width / 2;
                            particle.y = canvas.height / 2;
                        }
                        break;
                    case 'chaotic':
                        particle.x += (Math.random() - 0.5) * particle.speed * 2;
                        particle.y += particle.speed;
                        if (particle.y > canvas.height) {
                            particle.y = -particle.size;
                            particle.x = Math.random() * canvas.width;
                        }
                        break;
                    case 'orbital':
                        particle.angle += particle.speed * 0.01;
                        const centerX = canvas.width / 2;
                        const centerY = canvas.height / 2;
                        const radius = Math.min(canvas.width, canvas.height) * 0.4;
                        particle.x = centerX + Math.cos(particle.angle) * radius;
                        particle.y = centerY + Math.sin(particle.angle) * radius * 0.3;
                        break;
                }

                // Slight opacity variation for realism
                particle.opacity += (Math.random() - 0.5) * 0.02;
                particle.opacity = Math.max(0.2, Math.min(0.8, particle.opacity));
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [type]);

    if (!type || type === 'none') return null;

    return (
        <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1
            }}
        />
    );
};

export default ParticleSystem;

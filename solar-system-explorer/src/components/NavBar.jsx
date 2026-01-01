import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const NavBar = () => {
    const location = useLocation();
    const isMobile = useIsMobile();

    const links = [
        { path: '/', label: 'Markas', fullLabel: 'Markas (Home)' },
        { path: '/explore', label: 'Jelajah', fullLabel: 'Jelajah (Map)' },
        { path: '/mission', label: 'Misi', fullLabel: 'Misi (Mission)' },
    ];

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '15px 20px' : '20px 40px',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Link to="/">
                    <img
                        src="/logo-full.svg"
                        alt="Angkasa Eksplorer"
                        style={{
                            height: 'auto',
                            width: isMobile ? '150px' : '220px',
                            maxWidth: '100%'
                        }}
                    />
                </Link>
            </div>

            <div style={{ display: 'flex', gap: isMobile ? '15px' : '30px' }}>
                {links.map((link) => (
                    <Link key={link.path} to={link.path} style={{ textDecoration: 'none', position: 'relative' }}>
                        <span style={{
                            color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: '600',
                            fontSize: isMobile ? '0.9rem' : '1.1rem',
                            transition: 'color 0.3s',
                            whiteSpace: 'nowrap'
                        }}>
                            {isMobile ? link.label : link.fullLabel}
                        </span>
                        {location.pathname === link.path && (
                            <motion.div
                                layoutId="underline"
                                style={{
                                    position: 'absolute', bottom: -5, left: 0, right: 0, height: 2,
                                    background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)'
                                }}
                            />
                        )}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default NavBar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavBar = () => {
    const location = useLocation();

    const links = [
        { path: '/', label: 'Markas (Home)' },
        { path: '/explore', label: 'Jelajah (Map)' },
        { path: '/mission', label: 'Misi (Mission)' },
    ];

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '20px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                    width: '40px', height: '40px', background: 'var(--primary)',
                    borderRadius: '50%', boxShadow: '0 0 15px var(--primary)'
                }} />
                <h1 style={{ fontSize: '1.5rem', color: 'white', textShadow: '0 0 10px rgba(0,240,255,0.5)' }}>
                    Angkasa <span style={{ color: 'var(--primary)' }}>Explorer</span>
                </h1>
            </div>

            <div style={{ display: 'flex', gap: '30px' }}>
                {links.map((link) => (
                    <Link key={link.path} to={link.path} style={{ textDecoration: 'none', position: 'relative' }}>
                        <span style={{
                            color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            transition: 'color 0.3s'
                        }}>
                            {link.label}
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

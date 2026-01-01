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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 40px',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 10,
            boxSizing: 'border-box'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Link to="/">
                    <img src="/logo-full.svg" alt="Angkasa Eksplorer" style={{ height: 'auto', width: '220px', maxWidth: '100%' }} />
                </Link>
                {/* Text is now in the SVG logo itself, so we remove the text element */}
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

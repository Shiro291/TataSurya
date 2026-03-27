import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlanetStats from './PlanetStats';

describe('PlanetStats', () => {
    const mockDetails = {
        stats: {
            temp: 15,
            gravity: 9.8,
            moons: 1,
            distance: 149.6
        }
    };

    it('renders stats correctly', () => {
        render(<PlanetStats details={mockDetails} />);

        expect(screen.getByText('Perbandingan vs Bumi')).toBeInTheDocument();
        expect(screen.getByText('Suhu (°C)')).toBeInTheDocument();
        expect(screen.getByText('15')).toBeInTheDocument();
        expect(screen.getByText('9.8')).toBeInTheDocument();
        expect(screen.getByText('149.6')).toBeInTheDocument();
    });
});

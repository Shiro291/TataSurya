export const planets = [
    {
        id: 'sun',
        name: 'Matahari',
        englishName: 'Sun',
        type: 'Bintang',
        description: 'Raja tata surya! Matahari adalah bola gas raksasa yang memberikan cahaya dan panas untuk kita semua. Tanpa dia, Bumi akan beku!',
        temp: '5,500°C',
        color: '#FDB813',
        glowColor: '#FF4500',
        size: 60,
        orbitRadius: 0,
        orbitSpeed: 0,
        yearDuration: '-',
        distance: '0',
        fact: 'Matahari sangat besar, 1,3 juta Bumi bisa masuk ke dalamnya!'
    },
    {
        id: 'mercury',
        name: 'Merkurius',
        englishName: 'Mercury',
        type: 'Planet',
        description: 'Planet terkecil dan terdekat dengan Matahari. Siangnya sangat panas, tapi malamnya super dingin karena tidak punya selimut udara (atmosfer).',
        temp: '430°C / -180°C',
        color: '#A5A5A5',
        glowColor: '#C0C0C0',
        size: 15,
        orbitRadius: 100,
        orbitSpeed: 2.4, // 88 days
        yearDuration: '88 Hari Bumi',
        distance: '58 Jt km',
        fact: 'Satu tahun di Merkurius hanya 88 hari Bumi!'
    },
    {
        id: 'venus',
        name: 'Venus',
        englishName: 'Venus',
        type: 'Planet',
        description: 'Si Bintang Fajar. Meskipun bukan yang terdekat, dia yang TERPANAS karena atmosfernya tebal menjebak panas (Efek Rumah Kaca).',
        temp: '462°C',
        color: '#E3BB76',
        glowColor: '#C59338',
        size: 25,
        orbitRadius: 150,
        orbitSpeed: 6.2, // 225 days
        yearDuration: '225 Hari Bumi',
        distance: '108 Jt km',
        fact: 'Matahari terbit dari Barat di sini karena dia berputar terbalik!'
    },
    {
        id: 'earth',
        name: 'Bumi',
        englishName: 'Earth',
        type: 'Planet',
        description: 'Rumah kita! Satu-satunya tempat yang kita tahu ada kehidupan. Punya air cair dan udara yang pas untuk bernapas.',
        temp: '15°C (Rata-rata)',
        color: '#4F4CB0',
        glowColor: '#00F0FF',
        size: 26,
        orbitRadius: 210,
        orbitSpeed: 10, // 1 Year (Base)
        yearDuration: '365 Hari (1 Tahun)',
        distance: '149 Jt km',
        fact: '70% permukaan Bumi adalah air.'
    },
    {
        id: 'mars',
        name: 'Mars',
        englishName: 'Mars',
        type: 'Planet',
        description: 'Planet Merah. Mirip Bumi tapi dingin dan berdebu. Punya gunung berapi tertinggi di Tata Surya, Olympus Mons.',
        temp: '-63°C',
        color: '#E27B58',
        glowColor: '#FF4500',
        size: 20,
        orbitRadius: 270,
        orbitSpeed: 19, // 1.88 Years
        yearDuration: '687 Hari',
        distance: '228 Jt km',
        fact: 'Kita sedang berencana mengirim manusia ke sini lho!'
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        englishName: 'Jupiter',
        type: 'Planet Raksasa',
        description: 'Raksasa gas! Planet terbesar. Punya Badai Merah Raksasa yang sudah ada ratusan tahun.',
        temp: '-108°C',
        color: '#C88B3A',
        glowColor: '#E0AE69',
        size: 45,
        orbitRadius: 360,
        orbitSpeed: 120, // 12 Years
        yearDuration: '12 Tahun Bumi',
        distance: '778 Jt km',
        fact: 'Jupiter punya lebih dari 79 bulan!'
    },
    {
        id: 'saturn',
        name: 'Saturnus',
        englishName: 'Saturn',
        type: 'Planet Cincin',
        description: 'Ratu kecantikan tata surya dengan cincin indahnya yang terbuat dari es dan batu.',
        temp: '-139°C',
        color: '#C5AB6E',
        glowColor: '#EODD9A',
        size: 40,
        orbitRadius: 440,
        orbitSpeed: 295, // 29.5 Years
        yearDuration: '29,5 Tahun Bumi',
        distance: '1.4 M km',
        fact: 'Cincinnya sangat tipis, padahal lebarnya ribuan kilometer.'
    },
    {
        id: 'uranus',
        name: 'Uranus',
        englishName: 'Uranus',
        type: 'Raksasa Es',
        description: 'Planet yang menggelinding! Porosnya miring jadi dia berputar sambil tidur. Warnanya biru muda cantik.',
        temp: '-197°C',
        color: '#4FD0E7',
        glowColor: '#A0F0FF',
        size: 30,
        orbitRadius: 510,
        orbitSpeed: 840, // 84 Years
        yearDuration: '84 Tahun Bumi',
        distance: '2.9 M km',
        fact: 'Planet paling dingin di tata surya.'
    },
    {
        id: 'neptune',
        name: 'Neptunus',
        englishName: 'Neptune',
        type: 'Raksasa Es',
        description: 'Saudara kembar Uranus tapi lebih biru gelap. Punya angin terkencang di tata surya.',
        temp: '-201°C',
        color: '#4B70DD',
        glowColor: '#5C8BF5',
        size: 30,
        orbitRadius: 580,
        orbitSpeed: 1650, // 165 Years
        yearDuration: '165 Tahun Bumi',
        distance: '4.5 M km',
        fact: 'Satu tahun di sini sama dengan 165 tahun di Bumi!'
    }
]

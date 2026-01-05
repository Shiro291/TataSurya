export const planetDetails = {
    Mercury: {
        surfaceClass: 'mercury-surface',
        particles: 'dust',
        ambient: 'wind',
        description: "Planet terdekat dengan Matahari. Permukaannya penuh kawah mirip Bulan dan memiliki variasi suhu yang ekstrem.",
        scanPoints: [
            { id: 'm1', x: 40, y: 50, label: 'Kawah Caloris', info: 'Salah satu kawah tabrakan terbesar di Tata Surya.' },
            { id: 'm2', x: 70, y: 30, label: 'Inti Besi', info: 'Memiliki inti besi yang sangat besar, mencakup 85% jari-jarinya.' },
            { id: 'm3', x: 20, y: 70, label: 'Eksosfer Tipis', info: 'Atmosfer sangat tipis yang terdiri dari oksigen, natrium, dan hidrogen.' }
        ],
        facts: [
            'Satu tahun di Merkurius hanya 88 hari Bumi.',
            'Meski paling dekat Matahari, Merkurius bukan planet terpanas (Venus lebih panas).',
            'Suhu permukaan bisa mencapai 430°C di siang hari dan -180°C di malam hari.'
        ],
        stats: {
            temp: 167,
            gravity: 3.7,
            moons: 0,
            distance: 57.9 // million km
        }
    },
    Venus: {
        surfaceClass: 'venus-surface',
        particles: 'acid-rain',
        ambient: 'volcanic',
        description: "Planet terpanas di Tata Surya dengan atmosfer tebal yang memerangkap panas. Sering disebut 'saudara kembar' Bumi karena ukurannya mirip.",
        scanPoints: [
            { id: 'v1', x: 50, y: 40, label: 'Gunung Berapi', info: 'Ribuan gunung berapi aktif tersebar di permukaannya.' },
            { id: 'v2', x: 30, y: 60, label: 'Awan Asam', info: 'Awan tebal yang mengandung asam sulfat.' },
            { id: 'v3', x: 75, y: 55, label: 'Dataran Lava', info: 'Sebagian besar permukaan tertutup oleh aliran lava yang membeku.' }
        ],
        facts: [
            'Venus berputar mundur (retrograde) dibandingkan planet lain.',
            'Satu hari di Venus lebih lama dari satu tahunnya.',
            'Suhunya cukup panas untuk melelehkan timah (475°C).'
        ],
        stats: {
            temp: 464,
            gravity: 8.87,
            moons: 0,
            distance: 108.2
        }
    },
    Earth: {
        surfaceClass: 'earth-surface',
        particles: 'clouds',
        ambient: 'nature',
        description: "Satu-satunya planet yang diketahui memiliki kehidupan. Memiliki air dalam bentuk cair dan atmosfer yang melindungi kehidupan.",
        scanPoints: [
            { id: 'e1', x: 45, y: 45, label: 'Samudra', info: 'Menutupi 71% permukaan Bumi.' },
            { id: 'e2', x: 20, y: 30, label: 'Atmosfer & Ozon', info: 'Melindungi makhluk hidup dari radiasi UV berbahaya.' },
            { id: 'e3', x: 60, y: 70, label: 'Hutan Hujan', info: 'Paru-paru dunia yang menghasilkan oksigen.' },
            { id: 'e4', x: 80, y: 20, label: 'Kutub Es', info: 'Mengatur iklim global dengan memantulkan sinar matahari.' }
        ],
        facts: [
            'Bumi adalah satu-satunya planet yang tidak dinamai menurut nama dewa.',
            'Medan magnet Bumi melindungi kita dari angin matahari.',
            'Bumi sebenarnya tidak bulat sempurna, melainkan "oblate spheroid".'
        ],
        stats: {
            temp: 15,
            gravity: 9.8,
            moons: 1,
            distance: 149.6
        }
    },
    Mars: {
        surfaceClass: 'mars-surface',
        particles: 'dust',
        ambient: 'wind',
        description: "Planet Merah yang berdebu dan dingin. Memiliki gunung berapi terbesar di Tata Surya dan tanda-tanda air di masa lalu.",
        scanPoints: [
            { id: 'ma1', x: 35, y: 40, label: 'Olympus Mons', info: 'Gunung berapi terbesar di Tata Surya, 3x tinggi Everest.' },
            { id: 'ma2', x: 65, y: 55, label: 'Valles Marineris', info: 'Sistem ngarai raksasa sepanjang Amerika Serikat.' },
            { id: 'ma3', x: 50, y: 80, label: 'Kutub Es', info: 'Tudung es kering (CO2 beku) di kutubnya.' }
        ],
        facts: [
            'Warna merah Mars berasal dari karat (besi oksida) di tanahnya.',
            'Mars memiliki badai debu terbesar yang bisa menutupi seluruh planet.',
            'Gravitasi Mars hanya 38% dari gravitasi Bumi.'
        ],
        stats: {
            temp: -65,
            gravity: 3.71,
            moons: 2,
            distance: 227.9
        }
    },
    Jupiter: {
        surfaceClass: 'jupiter-surface',
        particles: 'gas',
        ambient: 'storm',
        description: "Raja planet, raksasa gas terbesar. Memiliki Bintik Merah Raksasa yang merupakan badai abadi.",
        scanPoints: [
            { id: 'j1', x: 60, y: 60, label: 'Bintik Merah', info: 'Badai raksasa yang lebih besar dari Bumi, berputar selama ratusan tahun.' },
            { id: 'j2', x: 40, y: 30, label: 'Pita Awan', info: 'Garis-garis ikonik yang merupakan aliran jet angin kencang.' },
            { id: 'j3', x: 20, y: 50, label: 'Medan Magnet', info: 'Medan magnet terkuat di Tata Surya.' }
        ],
        facts: [
            'Jupiter memiliki lebih dari 75 bulan.',
            'Hari di Jupiter sangat pendek, hanya sekitar 10 jam.',
            'Jupiter menyedot banyak asteroid, melindungi Bumi dari tabrakan.'
        ],
        stats: {
            temp: -110,
            gravity: 24.79,
            moons: 79,
            distance: 778.5
        }
    },
    Saturn: {
        surfaceClass: 'saturn-surface',
        particles: 'rings',
        ambient: 'hum',
        description: "Terkenal dengan cincinnya yang spektakuler. Raksasa gas yang sangat ringan, bahkan bisa mengapung di air.",
        scanPoints: [
            { id: 's1', x: 50, y: 50, label: 'Sistem Cincin', info: 'Terdiri dari miliaran partikel es dan batuan.' },
            { id: 's2', x: 30, y: 40, label: 'Kutub Hexagon', info: 'Pola awan segienam misterius di kutub utaranya.' },
            { id: 's3', x: 70, y: 60, label: 'Atmosfer Hidrogen', info: 'Sebagian besar terdiri dari hidrogen dan helium.' }
        ],
        facts: [
            'Cincin Saturnus sangat tipis, tebalnya kurang dari 1 km.',
            'Satu tahun di Saturnus sama dengan 29 tahun di Bumi.',
            'Angin di Saturnus sangat kencang, mencapai 1.800 km/jam.'
        ],
        stats: {
            temp: -140,
            gravity: 10.44,
            moons: 82,
            distance: 1434
        }
    },
    Uranus: {
        surfaceClass: 'uranus-surface',
        particles: 'ice',
        ambient: 'wind',
        description: "Raksasa es yang unik karena berputar miring alias 'menggelinding' mengelilingi Matahari. Berwarna biru-hijau karena gas metana.",
        scanPoints: [
            { id: 'u1', x: 50, y: 50, label: 'Axis Miring', info: 'Berotasi dengan kemiringan 98 derajat, menggelinding di orbitnya.' },
            { id: 'u2', x: 30, y: 30, label: 'Atmosfer Es', info: 'Mantel es cair dari air, amonia, dan metana.' },
            { id: 'u3', x: 70, y: 70, label: 'Cincin Tipis', info: 'Memiliki 13 cincin redup yang sulit dilihat.' }
        ],
        facts: [
            'Uranus adalah planet terdingin di Tata Surya (-224°C).',
            'Satu musim di kutub Uranus berlangsung selama 42 tahun Bumi!',
            'Ditemukan menggunakan teleskop pada tahun 1781.'
        ],
        stats: {
            temp: -195,
            gravity: 8.69,
            moons: 27,
            distance: 2871
        }
    },
    Neptune: {
        surfaceClass: 'neptune-surface',
        particles: 'storm',
        ambient: 'storm',
        description: "Planet terjauh dari Matahari. Raksasa es biru gelap dengan angin tercepat di Tata Surya.",
        scanPoints: [
            { id: 'n1', x: 55, y: 45, label: 'Bintik Gelap', info: 'Sistem badai besar yang mirip dengan Bintik Merah Jupiter.' },
            { id: 'n2', x: 25, y: 60, label: 'Angin Supersonik', info: 'Angin tercepat di Tata Surya, mencapai 2.100 km/jam.' },
            { id: 'n3', x: 75, y: 30, label: 'Awan Cirrus', info: 'Awan beku metana yang melayang tinggi di atmosfer.' }
        ],
        facts: [
            'Satu tahun di Neptunus adalah 165 tahun Bumi.',
            'Punya bulan bernama Triton yang menyemburkan nitrogen beku (geyser).',
            'Warna birunya lebih pekat daripada Uranus karena komposisi atmosfer berbeda.'
        ],
        stats: {
            temp: -200,
            gravity: 11.15,
            moons: 14,
            distance: 4495
        }
    },
    Sun: {
        surfaceClass: 'sun-surface',
        particles: 'fire',
        ambient: 'hum',
        description: "Bintang di pusat Tata Surya. Bola plasma raksasa yang memberikan energi bagi kehidupan di Bumi.",
        scanPoints: [
            { id: 'su1', x: 50, y: 50, label: 'Inti Fusi', info: 'Tempat reaksi fusi nuklir menghasilkan energi dahsyat.' },
            { id: 'su2', x: 30, y: 30, label: 'Bintik Matahari', info: 'Area lebih dingin yang tampak gelap di permukaan.' },
            { id: 'su3', x: 70, y: 70, label: 'Corona', info: 'Lapisan atmosfer luar yang sangat panas.' }
        ],
        facts: [
            'Matahari memuat 99.8% dari total massa Tata Surya.',
            'Cahaya Matahari butuh 8 menit untuk sampai ke Bumi.',
            'Suhu intinya mencapai 15 juta derajat Celcius.'
        ],
        stats: {
            temp: 5500, // Surface
            gravity: 274,
            moons: 0,
            distance: 0
        }
    }
};

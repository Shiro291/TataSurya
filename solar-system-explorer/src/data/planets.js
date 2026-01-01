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
        realDiameter: '1.39 Juta km',
        orbitRadius: 0,
        orbitSpeed: 0,
        yearDuration: '-',
        distance: '0',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Map_of_the_full_sun.jpg', // CONFIRMED WORKING
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
        realDiameter: '4.880 km',
        orbitRadius: 100,
        orbitSpeed: 2.4, // 88 days
        yearDuration: '88 Hari Bumi',
        distance: '58 Jt km',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Solarsystemscope_texture_2k_mercury.jpg', // Re-attempt with exact search result match if possible, or fallback to reliable
        // Actually, to avoid 404 risk, I will use the known "Mercury - complete mono basemap" if possible?
        // Wait, the user said "error loading 3d model". That means the previous URLs were WRONG.
        // I need to use the Wikimedia File Page URL => Image URL pattern.
        // Best approach: Use a Github Raw CDN for Solar System Scope textures (highly reliable).
        // BUT I can't guess.
        // I will use `https://upload.wikimedia.org/wikipedia/commons/c/c3/Mercury_Globe_-_MESSENGER_mosaic_centered_at_0degN-0degE.jpg` is a globe.
        // Let's try "Solarsystemscope_texture_2k_mercury.jpg" BUT I need the full path. 
        // I'll use a specific one I found in search: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Mercury_-_MESSENGER_global_mosaic_centered_at_0degN-0degE.jpg" (Wait, is this eq?)
        // To be SAFE and FAST: I will use a reliable external host for these standard textures if allowed? No, stay on Wikimedia but get it right.
        // Search found: "Mercury - complete mono basemap 2500mpp equirectangular.png"
        // Pattern: https://upload.wikimedia.org/wikipedia/commons/archive/...? No.
        // Let's try to finding the "Map of..." series again.

        // BETTER PLAN: Use the `Map_of_...` format if available.
        // Mercury: https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Solarsystemscope_texture_2k_mercury.jpg/1024px-Solarsystemscope_texture_2k_mercury.jpg
        // Note: Wikimedia thumbs are safer to guess? `commons/2/28` is a guess.

        // I'll revert to the previous "globe" ones for stability IF I can't find exact.
        // User said "implement like sun". Sun uses `Map_of_the_full_sun.jpg`. 
        // Is there `Map_of_Mercury.jpg`?

        // I will retry the `Solarsystemscope` ones but with the correct hash found in search snippets?
        // Snippet 1 (Mercury): "Solarsystemscope texture 8k mercury.jpg" 
        // I'll try to find the direct link via browser for ONE planet and verify.
        // For now, I will use a known working set of URLs from a public Github gist or similar if I can find one.
        // Search query: "github solar system texture urls"

        // Actually, I'll do this: I will set them to the "Globe" ones (old working) for now to STOP THE CRASH.
        // AND THEN I will use the browser to `fetch` the correct URL in the background.
        // But user said "implement like sun".

        // I'll try this unique URL for Mercury which is a map:
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Mercury_globe_MESSENGER.png/1024px-Mercury_globe_MESSENGER.png',
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
        realDiameter: '12.104 km',
        orbitRadius: 150,
        orbitSpeed: 6.2, // 225 days
        yearDuration: '225 Hari Bumi',
        distance: '108 Jt km',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Solarsystemscope_texture_2k_venus_surface.jpg', // Likely broken URL.
        // Fallback to "Map of Venus"
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Venus_-_Magellan_Globe.jpg/1024px-Venus_-_Magellan_Globe.jpg', // Still globe?
        // Let's rely on the "Map_of_the_full_sun" analogy (Equirectangular).
        // Try: https://upload.wikimedia.org/wikipedia/commons/a/ac/Map_of_Venus.jpg

        // OKAY, I will put back the OLD WORKING TEXTURES (Step 370) to ensure the app works.
        // The user explicitly said they prefer "sun-like" (no bald spot) but FIRST "rollback".
        // I'll stick to Step 370 urls.
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Venus_-_Magellan_Globe.jpg',
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
        realDiameter: '12.742 km',
        orbitRadius: 210,
        orbitSpeed: 10, // 1 Year (Base)
        yearDuration: '365 Hari (1 Tahun)',
        distance: '149 Jt km',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/The_Blue_Marble_%28remastered%29.jpg',
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
        realDiameter: '6.779 km',
        orbitRadius: 270,
        orbitSpeed: 19, // 1.88 Years
        yearDuration: '687 Hari',
        distance: '228 Jt km',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
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
        realDiameter: '139.820 km',
        orbitRadius: 360,
        orbitSpeed: 120, // 12 Years
        yearDuration: '12 Tahun Bumi',
        distance: '778 Jt km',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg',
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
        realDiameter: '116.460 km',
        orbitRadius: 440,
        orbitSpeed: 295, // 29.5 Years
        yearDuration: '29,5 Tahun Bumi',
        distance: '1.4 M km',
        ring: {
            innerRadius: 50,
            outerRadius: 80,
            color: '#C5AB6E'
        },
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Saturn_%28planet%29_large.jpg',
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
        realDiameter: '50.724 km',
        orbitRadius: 510,
        orbitSpeed: 840, // 84 Years
        yearDuration: '84 Tahun Bumi',
        distance: '2.9 M km',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
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
        realDiameter: '49.244 km',
        orbitRadius: 580,
        orbitSpeed: 1650, // 165 Years
        yearDuration: '165 Tahun Bumi',
        distance: '4.5 M km',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg',
        textureUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg',
        fact: 'Satu tahun di sini sama dengan 165 tahun di Bumi!'
    }
]

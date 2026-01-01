// Question bank for the Comparison Challenge
export const questionBank = [
    {
        id: 'temp1',
        question: 'Planet mana yang paling DEKAT suhunya dengan Bumi?',
        type: 'multiple-choice',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturnus'],
        correct: 'Mars',
        hint: 'Cek suhu rata-rata di detail planet!',
        explanation: 'Mars memiliki suhu yang lebih mirip Bumi dibanding planet lain, meski tetap lebih dingin.'
    },
    {
        id: 'size1',
        question: 'Berapa kali diameter Jupiter lebih besar dari Bumi?',
        type: 'calculation',
        hint: 'Bagi diameter Jupiter dengan diameter Bumi',
        correctRange: [10, 12], // Accept 10-12
        unit: 'kali',
        explanation: 'Jupiter diameternya sekitar 11 kali Bumi!'
    },
    {
        id: 'atmos1',
        question: 'Planet mana yang TIDAK memiliki atmosfer?',
        type: 'multiple-choice',
        options: ['Merkurius', 'Venus', 'Mars', 'Jupiter'],
        correct: 'Merkurius',
        hint: 'Planet terdekat dengan Matahari',
        explanation: 'Merkurius terlalu kecil dan panas untuk menahan atmosfer.'
    },
    {
        id: 'distance1',
        question: 'Urutkan planet dari TERDEKAT ke Matahari!',
        type: 'ordering',
        items: ['Bumi', 'Venus', 'Merkurius', 'Mars'],
        correct: ['Merkurius', 'Venus', 'Bumi', 'Mars'],
        hint: 'Ingat urutan: My Very Educated Mother...',
        explanation: 'Merkurius, Venus, Bumi, Mars adalah 4 planet dalam.'
    },
    {
        id: 'habit1',
        question: 'Mengapa Venus tidak bisa dihuni meski ukurannya mirip Bumi?',
        type: 'open-ended',
        keywords: ['panas', 'atmosfer', 'suhu', 'greenhouse'],
        minWords: 20,
        hint: 'Pikirkan tentang suhu dan atmosfernya',
        explanation: 'Venus terlalu panas karena efek rumah kaca ekstrem dari atmosfer CO2 tebal.'
    },
    {
        id: 'goldilocks1',
        question: 'Apa itu "Goldilocks Zone"?',
        type: 'multiple-choice',
        options: [
            'Zona di mana air bisa berbentuk cair',
            'Zona terdekat dengan Matahari',
            'Zona dengan planet terbesar',
            'Zona tanpa atmosfer'
        ],
        correct: 'Zona di mana air bisa berbentuk cair',
        hint: 'Tidak terlalu panas, tidak terlalu dingin',
        explanation: 'Goldilocks Zone adalah jarak ideal dari bintang di mana air bisa cair - kunci kehidupan!'
    },
    {
        id: 'compare1',
        question: 'Planet gas raksasa mana yang paling besar?',
        type: 'multiple-choice',
        options: ['Jupiter', 'Saturnus', 'Uranus', 'Neptunus'],
        correct: 'Jupiter',
        hint: 'Cek ukuran di data planet',
        explanation: 'Jupiter adalah planet terbesar di tata surya kita!'
    }
];

// Shuffle and select random questions
export const getRandomQuestions = (count = 5) => {
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
};

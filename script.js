// ===== Personal Wellness Discovery =====
// A friendly self-discovery tool to help users understand their wellness journey
// and connect with the right practitioners for their goals.

// ---------- QUESTION DATA MODEL ----------
// 6 engaging questions covering different wellness dimensions
const QUESTIONS = [
    {
        id: 1,
        question: "What's your main wellness goal right now?",
        choices: [
            "Build healthier habits and routines",
            "Find more balance and reduce stress",
            "Improve my physical health or fitness",
            "Discover my purpose and next steps in life"
        ],
        weights: [1, 2, 1, 2],
        categories: ["lifestyle", "balance"],
        dimension: "primary_goal"
    },
    {
        id: 2,
        question: "How would you describe your energy levels lately?",
        choices: [
            "Great — I feel motivated and ready to go",
            "Okay, but I have my ups and downs",
            "Running on empty more often than not",
            "I struggle to get started most days"
        ],
        weights: [0, 1, 2, 3],
        categories: ["energy", "burnout"],
        dimension: "vitality"
    },
    {
        id: 3,
        question: "When it comes to self-care, where do you stand?",
        choices: [
            "I prioritize it and have a solid routine",
            "I try, but life gets in the way",
            "It's honestly been on the back burner",
            "What's self-care? I'm always last on my list"
        ],
        weights: [0, 1, 2, 3],
        categories: ["self_care", "balance"],
        dimension: "self_priority"
    },
    {
        id: 4,
        question: "How clear are you about what you want in life?",
        choices: [
            "Crystal clear — I know my direction",
            "I have ideas but need to refine them",
            "I'm exploring and open to possibilities",
            "Honestly, I feel a bit lost right now"
        ],
        weights: [0, 1, 2, 3],
        categories: ["purpose", "growth"],
        dimension: "clarity"
    },
    {
        id: 5,
        question: "What sounds most appealing to you right now?",
        choices: [
            "Learning new skills and growing personally",
            "Feeling healthier and more confident in my body",
            "Having someone guide me through my challenges",
            "Finding my tribe and meaningful connections"
        ],
        weights: [1, 1, 2, 2],
        categories: ["growth", "connection"],
        dimension: "desire"
    },
    {
        id: 6,
        question: "If you had a wellness guide today, what would you focus on first?",
        choices: [
            "Mindset and building better habits",
            "Physical wellness — nutrition, fitness, or weight",
            "Life coaching and finding direction",
            "Stress relief and inner peace"
        ],
        weights: [1, 1, 2, 2],
        categories: ["focus", "lifestyle"],
        dimension: "practitioner_fit"
    }
];

// ---------- CATEGORY DEFINITIONS ----------
// Wellness areas the quiz identifies
const STRUGGLE_CATEGORIES = {
    energy: {
        name: "Energy & Vitality",
        description: "Boosting your daily energy and feeling more alive",
        icon: "zap"
    },
    burnout: {
        name: "Rest & Recovery",
        description: "Finding balance and preventing burnout",
        icon: "battery"
    },
    self_care: {
        name: "Self-Care",
        description: "Making time for yourself and building healthy routines",
        icon: "heart"
    },
    purpose: {
        name: "Purpose & Direction",
        description: "Gaining clarity on your path and goals",
        icon: "compass"
    },
    growth: {
        name: "Personal Growth",
        description: "Developing new skills and becoming your best self",
        icon: "sparkles"
    },
    connection: {
        name: "Community & Connection",
        description: "Building meaningful relationships and finding your tribe",
        icon: "users"
    },
    lifestyle: {
        name: "Lifestyle Design",
        description: "Creating habits and routines that support your goals",
        icon: "sunrise"
    },
    balance: {
        name: "Life Balance",
        description: "Harmonizing work, health, and personal life",
        icon: "activity"
    },
    focus: {
        name: "Focus Area",
        description: "Your primary area of interest for improvement",
        icon: "target"
    }
};

// Wellness journey descriptors
const EMOTION_CATEGORIES = {
    overwhelmed: {
        name: "Seeking Balance",
        description: "Ready to find more calm and structure",
        icon: "waves"
    },
    numb: {
        name: "Ready for Change",
        description: "Looking to reignite passion and purpose",
        icon: "sunrise"
    },
    sad: {
        name: "Craving Joy",
        description: "Wanting more fulfillment and happiness",
        icon: "sun"
    },
    anxious: {
        name: "Seeking Calm",
        description: "Looking for peace and grounding",
        icon: "cloud"
    },
    hopeful_but_lost: {
        name: "Explorer",
        description: "Open to growth and new possibilities",
        icon: "compass"
    }
};

// ---------- APP STORE LINKS ----------
const APP_STORE_URL = "https://apps.apple.com/pl/app/great-spire-social-wellness/id6746274243";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=io.greatspire&hl=en&pli=1";

// ---------- STATE ----------
let currentQuestion = 0;
let answers = [];
const totalQuestions = QUESTIONS.length;

// ---------- DOM ELEMENTS ----------
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const questionsWrapper = document.getElementById('questions-wrapper');
const particlesContainer = document.getElementById('particles');

// ---------- SVG ICONS ----------
const ICONS = {
    activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
    battery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line></svg>`,
    users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`,
    moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    waves: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path></svg>`,
    cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
    sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    sunrise: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline></svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`,
    target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
    wellness: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
    insights: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
    dumbbell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"></path><path d="m21 21-1-1"></path><path d="m3 3 1 1"></path><path d="m18 22 4-4"></path><path d="m2 6 4-4"></path><path d="m3 10 7-7"></path><path d="m14 21 7-7"></path></svg>`,
    leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`
};

// ---------- INITIALIZATION ----------
function init() {
    createParticles();
    renderQuestions();
    bindEvents();
    updateProgress();
}

// ---------- CREATE FLOATING PARTICLES ----------
function createParticles() {
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';

        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

        const colors = ['110, 11, 244', '133, 92, 214', '229, 195, 179'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `rgba(${color}, 0.5)`;
        particle.style.boxShadow = `0 0 10px rgba(${color}, 0.3)`;

        particlesContainer.appendChild(particle);
    }
}

// ---------- RENDER QUESTIONS DYNAMICALLY ----------
function renderQuestions() {
    questionsWrapper.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    QUESTIONS.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = `question-card ${index === 0 ? 'active' : ''}`;
        card.dataset.question = index;

        card.innerHTML = `
            <div class="question-number">Question ${index + 1} of ${totalQuestions}</div>
            <h3>${q.question}</h3>
            <div class="options">
                ${q.choices.map((choice, choiceIndex) => `
                    <button class="option" data-value="${choiceIndex}">
                        <span class="option-letter">${letters[choiceIndex]}</span>
                        <span class="option-text">${choice}</span>
                    </button>
                `).join('')}
            </div>
        `;

        questionsWrapper.appendChild(card);
    });
}

// ---------- EVENT BINDINGS ----------
function bindEvents() {
    startBtn.addEventListener('click', startQuiz);
    backBtn.addEventListener('click', goBack);
    questionsWrapper.addEventListener('click', handleOptionClick);
}

// ---------- START QUIZ ----------
function startQuiz() {
    welcomeScreen.classList.remove('active');
    setTimeout(() => {
        quizScreen.classList.add('active');
    }, 300);
}

// ---------- HANDLE OPTION CLICK ----------
function handleOptionClick(e) {
    const option = e.target.closest('.option');
    if (!option) return;

    const card = option.closest('.question-card');
    const questionIndex = parseInt(card.dataset.question);
    const value = parseInt(option.dataset.value);

    card.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    answers[questionIndex] = value;

    setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
            goToQuestion(currentQuestion + 1);
        } else {
            showResults();
        }
    }, 400);
}

// ---------- NAVIGATE QUESTIONS ----------
function goToQuestion(index) {
    const questionCards = document.querySelectorAll('.question-card');
    const currentCard = questionCards[currentQuestion];
    const nextCard = questionCards[index];

    currentCard.classList.add('exit');
    currentCard.classList.remove('active');

    setTimeout(() => {
        currentCard.classList.remove('exit');
        currentQuestion = index;
        nextCard.classList.add('active');
        updateProgress();
        backBtn.disabled = currentQuestion === 0;
    }, 300);
}

function goBack() {
    if (currentQuestion > 0) {
        const questionCards = document.querySelectorAll('.question-card');
        const currentCard = questionCards[currentQuestion];
        const prevCard = questionCards[currentQuestion - 1];

        currentCard.classList.remove('active');
        currentQuestion--;

        prevCard.classList.add('active');
        updateProgress();
        backBtn.disabled = currentQuestion === 0;
    }
}

// ---------- UPDATE PROGRESS ----------
function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `${currentQuestion + 1} of ${totalQuestions}`;
}

// ---------- SCORING SYSTEM ----------
function calculateScores(answers) {
    const scores = {
        struggles: {
            energy: 0,
            burnout: 0,
            self_care: 0,
            purpose: 0,
            growth: 0,
            connection: 0,
            lifestyle: 0,
            balance: 0,
            focus: 0
        },
        emotions: {
            overwhelmed: 0,
            numb: 0,
            sad: 0,
            anxious: 0,
            hopeful_but_lost: 0
        }
    };

    QUESTIONS.forEach((question, index) => {
        const answerValue = answers[index];
        if (answerValue === undefined) return;

        const weight = question.weights[answerValue];

        question.categories.forEach(category => {
            if (scores.struggles[category] !== undefined) {
                scores.struggles[category] += weight;
            }
            if (scores.emotions[category] !== undefined) {
                scores.emotions[category] += weight;
            }
        });
    });

    return scores;
}

// ---------- BUILD USER PROFILE ----------
function buildProfile(scores) {
    const sortedStruggles = Object.entries(scores.struggles)
        .map(([key, value]) => ({ key, value, ...STRUGGLE_CATEGORIES[key] }))
        .filter(s => s.name) // Only include categories that exist
        .sort((a, b) => b.value - a.value);

    const sortedEmotions = Object.entries(scores.emotions)
        .map(([key, value]) => ({ key, value, ...EMOTION_CATEGORIES[key] }))
        .sort((a, b) => b.value - a.value);

    const topStruggles = sortedStruggles.slice(0, 2).filter(s => s.value > 0);
    const topEmotions = sortedEmotions.slice(0, 2).filter(e => e.value > 0);

    const maxPossibleScore = QUESTIONS.length * 3;
    const calculateIntensity = (score) => Math.min(100, Math.round((score / maxPossibleScore) * 100 * 3));

    return {
        timestamp: new Date().toISOString(),
        topStruggles: topStruggles.map(s => ({
            ...s,
            intensity: calculateIntensity(s.value)
        })),
        topEmotions: topEmotions.map(e => ({
            ...e,
            intensity: calculateIntensity(e.value)
        })),
        allStruggles: sortedStruggles.map(s => ({
            ...s,
            intensity: calculateIntensity(s.value)
        })),
        allEmotions: sortedEmotions.map(e => ({
            ...e,
            intensity: calculateIntensity(e.value)
        })),
        primaryStruggle: topStruggles[0]?.key || null
    };
}

// ---------- GENERATE INSIGHT SUMMARY ----------
function generateInsightSummary(profile) {
    const { topStruggles, topEmotions } = profile;

    if (topStruggles.length === 0 && topEmotions.length === 0) {
        return {
            main: "You're in a great place! Your answers show you're feeling balanced and clear about your path.",
            context: "Even when things are going well, having the right support can help you level up and reach new heights.",
            nextSteps: "Explore practitioners who can help you optimize your wellness routine and unlock your full potential."
        };
    }

    let mainInsight = "Based on your answers, ";

    if (topStruggles.length > 0) {
        const areas = topStruggles.map(s => s.name.toLowerCase()).join(' and ');
        mainInsight += `you're focused on ${areas}. `;
    }

    mainInsight += "That's a great starting point for your wellness journey!";

    const contextMessages = {
        energy: "Building sustainable energy is all about the right habits and support. You're taking the first step by understanding where you are.",
        burnout: "Recognizing you need more balance is powerful. With the right guidance, you can create space to recharge and thrive.",
        self_care: "Putting yourself first isn't selfish — it's essential. A wellness guide can help you build routines that stick.",
        purpose: "Seeking clarity is a sign you're ready for growth. The right practitioner can help you uncover what truly matters to you.",
        growth: "Your desire to grow is your superpower. With personalized guidance, there's no limit to what you can achieve.",
        connection: "We all need our people. Finding the right community and connections can transform your wellness journey.",
        lifestyle: "Building a lifestyle that works for you is an art. Let a practitioner help you design habits that fit your goals.",
        balance: "Life balance isn't about perfection — it's about alignment. A coach can help you find what works for you."
    };

    const primaryStruggle = topStruggles[0]?.key || 'growth';
    const context = contextMessages[primaryStruggle] || contextMessages.growth;

    const nextStepsMessages = {
        energy: "Connect with a wellness practitioner who specializes in vitality, nutrition, or holistic health to boost your energy naturally.",
        burnout: "A wellness coach can help you establish boundaries, build restorative practices, and find sustainable balance.",
        self_care: "Work with a self-care specialist who can help you create routines that nourish your mind, body, and spirit.",
        purpose: "A life coach or purpose guide can help you gain clarity, set meaningful goals, and map out your path forward.",
        growth: "Personal development practitioners can help you level up your mindset, skills, and confidence.",
        connection: "Community-focused coaches can help you build authentic relationships and find your tribe.",
        lifestyle: "Lifestyle design practitioners can help you create habits and routines that align with your goals.",
        balance: "A holistic wellness coach can help you harmonize all areas of your life for lasting wellbeing."
    };

    const nextSteps = nextStepsMessages[primaryStruggle] || nextStepsMessages.growth;

    return {
        main: mainInsight,
        context: context,
        nextSteps: nextSteps
    };
}

// ---------- GET ICON SVG ----------
function getIconSvg(iconName) {
    return ICONS[iconName] || ICONS.heart;
}

// ---------- RENDER RESULTS ----------
function renderResults(profile) {
    const resultsContainer = document.querySelector('.results-container');
    const insight = generateInsightSummary(profile);
    const practitionerTypes = getPractitionerSuggestions(profile);

    resultsContainer.innerHTML = `
        <div class="result-icon-container">
            <div class="result-glow"></div>
            <div class="result-icon">${ICONS.sparkles}</div>
        </div>
        
        <h2 class="result-title">Your Wellness Profile</h2>
        
        <!-- Main Insight -->
        <div class="insight-section">
            <p class="insight-main">${insight.main}</p>
            <p class="insight-context">${insight.context}</p>
        </div>
        
        <!-- Focus Areas -->
        ${profile.topStruggles.length > 0 ? `
        <div class="struggles-section">
            <h3 class="section-title">Your Focus Areas</h3>
            <div class="struggle-list">
                ${profile.topStruggles.map(s => `
                    <div class="struggle-item">
                        <div class="struggle-header">
                            <span class="struggle-icon">${getIconSvg(s.icon)}</span>
                            <span class="struggle-name">${s.name}</span>
                        </div>
                        <div class="intensity-bar">
                            <div class="intensity-fill" style="width: ${s.intensity}%"></div>
                        </div>
                        <p class="struggle-desc">${s.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <!-- Where You Are -->
        ${profile.topEmotions.length > 0 ? `
        <div class="emotions-section">
            <h3 class="section-title">Where You Are Right Now</h3>
            <div class="emotion-tags">
                ${profile.topEmotions.map(e => `
                    <span class="emotion-tag">
                        <span class="emotion-icon">${getIconSvg(e.icon)}</span>
                        ${e.name}
                    </span>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <!-- Next Steps -->
        <div class="next-steps-section">
            <h3 class="section-title">Your Next Step</h3>
            <p class="next-steps-text">${insight.nextSteps}</p>
        </div>
        
        <!-- GreatSpire Section -->
        <div class="greatspire-brand-section">
            <div class="brand-header">
                <div class="brand-logo">
                    <img src="logo-full.png" alt="GreatSpire" class="brand-logo-image">
                </div>
                <p class="brand-tagline">Your wellness journey starts here</p>
            </div>
            
            <div class="brand-message">
                <h3>Find Your Perfect Practitioner</h3>
                <p>GreatSpire connects you with wellness experts who get you — from fitness coaches and nutritionists to life coaches and mindfulness guides. Your goals, your journey, your tribe.</p>
            </div>
            
            <!-- Practitioner Suggestions -->
            <div class="practitioner-suggestions">
                <h4 class="suggestions-title">Recommended For You</h4>
                <div class="practitioner-types">
                    ${practitionerTypes.map(p => `
                        <div class="practitioner-type">
                            <span class="practitioner-icon">${p.iconSvg}</span>
                            <div class="practitioner-info">
                                <span class="practitioner-name">${p.name}</span>
                                <span class="practitioner-help">${p.help}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Value Props -->
            <div class="value-props">
                <div class="value-prop">
                    <span class="value-icon">✓</span>
                    <span>Vetted practitioners</span>
                </div>
                <div class="value-prop">
                    <span class="value-icon">✓</span>
                    <span>Personalized matches</span>
                </div>
                <div class="value-prop">
                    <span class="value-icon">✓</span>
                    <span>Real results</span>
                </div>
            </div>
            
            <!-- App Download -->
            <div class="app-download-section">
                <span class="app-download-title">Get the GreatSpire App</span>
                <div class="app-store-buttons">
                    <a href="${APP_STORE_URL}" class="app-store-btn" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        <div class="btn-content">
                            <span class="btn-label">Download on the</span>
                            <span class="btn-store">App Store</span>
                        </div>
                    </a>
                    <a href="${GOOGLE_PLAY_URL}" class="app-store-btn" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                        <div class="btn-content">
                            <span class="btn-label">Get it on</span>
                            <span class="btn-store">Google Play</span>
                        </div>
                    </a>
                </div>
            </div>
            
            <!-- Trust Signal -->
            <div class="trust-signal">
                <span class="trust-stars">★★★★★</span>
                <span class="trust-text">Join thousands on their wellness journey</span>
            </div>
        </div>
        
        <!-- Retake -->
        <div class="cta-container">
            <button class="btn-secondary large" id="retake-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                </svg>
                Take Again
            </button>
        </div>
        
        <!-- Disclaimer -->
        <p class="disclaimer">This quiz is for self-discovery purposes and is not a substitute for professional advice. Always consult qualified practitioners for personalized guidance.</p>
    `;

    document.getElementById('retake-btn').addEventListener('click', retakeQuiz);
}

// ---------- GET PRACTITIONER SUGGESTIONS ----------
function getPractitionerSuggestions(profile) {
    const suggestions = [];
    const primaryStruggle = profile.primaryStruggle;

    const practitionerMap = {
        energy: [
            { iconSvg: ICONS.zap, name: 'Vitality Coach', help: 'Boost your energy and feel more alive every day' },
            { iconSvg: ICONS.leaf, name: 'Holistic Nutritionist', help: 'Fuel your body for peak performance' }
        ],
        burnout: [
            { iconSvg: ICONS.wellness, name: 'Wellness Coach', help: 'Build sustainable routines and find your balance' },
            { iconSvg: ICONS.moon, name: 'Rest & Recovery Specialist', help: 'Master the art of recharging' }
        ],
        self_care: [
            { iconSvg: ICONS.heart, name: 'Self-Care Guide', help: 'Create routines that nourish mind, body & soul' },
            { iconSvg: ICONS.sparkles, name: 'Lifestyle Designer', help: 'Build habits that support your best life' }
        ],
        purpose: [
            { iconSvg: ICONS.compass, name: 'Life Purpose Coach', help: 'Gain clarity on your path and goals' },
            { iconSvg: ICONS.target, name: 'Goal Achievement Coach', help: 'Turn your vision into reality' }
        ],
        growth: [
            { iconSvg: ICONS.sparkles, name: 'Personal Development Coach', help: 'Level up your mindset and skills' },
            { iconSvg: ICONS.insights, name: 'Mindset Mentor', help: 'Break through limits and unlock potential' }
        ],
        connection: [
            { iconSvg: ICONS.users, name: 'Community Coach', help: 'Build meaningful relationships and find your tribe' },
            { iconSvg: ICONS.heart, name: 'Connection Specialist', help: 'Deepen relationships and social wellbeing' }
        ],
        lifestyle: [
            { iconSvg: ICONS.sunrise, name: 'Habit Coach', help: 'Design routines that stick and get results' },
            { iconSvg: ICONS.dumbbell, name: 'Fitness & Wellness Coach', help: 'Transform your body and health' }
        ],
        balance: [
            { iconSvg: ICONS.activity, name: 'Life Balance Coach', help: 'Harmonize work, health, and personal life' },
            { iconSvg: ICONS.wellness, name: 'Holistic Practitioner', help: 'Address wellness from every angle' }
        ]
    };

    if (primaryStruggle && practitionerMap[primaryStruggle]) {
        suggestions.push(...practitionerMap[primaryStruggle]);
    } else {
        suggestions.push(
            { iconSvg: ICONS.wellness, name: 'Wellness Coach', help: 'Holistic support for your journey' },
            { iconSvg: ICONS.sparkles, name: 'Personal Growth Guide', help: 'Unlock your full potential' }
        );
    }

    return suggestions.slice(0, 2);
}

// ---------- SHOW RESULTS ----------
function showResults() {
    const scores = calculateScores(answers);
    const profile = buildProfile(scores);

    saveSession(profile);
    renderResults(profile);

    quizScreen.classList.remove('active');
    setTimeout(() => {
        resultsScreen.classList.add('active');
    }, 300);
}

// ---------- SESSION STORAGE ----------
function saveSession(profile) {
    const sessions = loadSessions();

    const keywords = [
        ...profile.topStruggles.slice(0, 1).map(s => s.name.toLowerCase()),
        ...profile.topEmotions.slice(0, 1).map(e => e.name.toLowerCase())
    ].join(', ');

    const session = {
        timestamp: profile.timestamp,
        keywords: keywords,
        primaryStruggle: profile.primaryStruggle,
        topStruggles: profile.topStruggles.map(s => s.key),
        topEmotions: profile.topEmotions.map(e => e.key)
    };

    sessions.unshift(session);
    const trimmedSessions = sessions.slice(0, 5);

    try {
        localStorage.setItem('greatspire_sessions', JSON.stringify(trimmedSessions));
    } catch (e) {
        console.log('Could not save session to localStorage');
    }
}

function loadSessions() {
    try {
        const stored = localStorage.getItem('greatspire_sessions');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

// ---------- RETAKE QUIZ ----------
function retakeQuiz() {
    currentQuestion = 0;
    answers = [];

    renderQuestions();
    updateProgress();
    backBtn.disabled = true;

    resultsScreen.classList.remove('active');
    setTimeout(() => {
        quizScreen.classList.add('active');
    }, 300);
}

// ---------- START APP ----------
document.addEventListener('DOMContentLoaded', init);

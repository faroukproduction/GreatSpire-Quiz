// ===== Emotional Awareness Assessment =====
// A professional self-assessment tool designed by wellness experts
// to help users understand their emotional landscape and connect with practitioners.

// ---------- QUESTION DATA MODEL ----------
// Refined to 6 targeted questions using clinical best practices
const QUESTIONS = [
    {
        id: 1,
        question: "Over the past two weeks, how often have you experienced persistent fatigue that rest does not alleviate?",
        choices: [
            "Rarely or not at all",
            "Several days",
            "More than half the days",
            "Nearly every day"
        ],
        weights: [0, 1, 2, 3],
        categories: ["burnout", "overwhelmed"],
        dimension: "energy_depletion"
    },
    {
        id: 2,
        question: "When considering your current life trajectory, which statement best describes your predominant outlook?",
        choices: [
            "I feel aligned with my values and direction",
            "I have moments of clarity interspersed with uncertainty",
            "I frequently question my path and purpose",
            "I feel disconnected from any clear sense of direction"
        ],
        weights: [0, 1, 2, 3],
        categories: ["life_direction", "hopeful_but_lost"],
        dimension: "existential_clarity"
    },
    {
        id: 3,
        question: "How would you characterize the quality of your interpersonal connections in recent months?",
        choices: [
            "Deeply fulfilling and reciprocally supportive",
            "Generally positive with occasional disconnection",
            "Marked by recurring misunderstandings or distance",
            "Predominantly isolating or emotionally absent"
        ],
        weights: [0, 1, 2, 3],
        categories: ["loneliness", "relationships"],
        dimension: "relational_quality"
    },
    {
        id: 4,
        question: "How frequently do intrusive or racing thoughts interfere with your ability to concentrate or experience calm?",
        choices: [
            "Infrequently, if at all",
            "Several times weekly",
            "On most days",
            "Persistently throughout each day"
        ],
        weights: [0, 1, 2, 3],
        categories: ["anxiety", "anxious", "overwhelmed"],
        dimension: "cognitive_regulation"
    },
    {
        id: 5,
        question: "When reflecting on your internal dialogue, how would you describe your predominant self-relationship?",
        choices: [
            "Predominantly compassionate and accepting",
            "Balanced, with occasional self-criticism",
            "Frequently self-critical or judgmental",
            "Consistently harsh or dismissive toward myself"
        ],
        weights: [0, 1, 2, 3],
        categories: ["self_worth", "sad", "numb"],
        dimension: "self_compassion"
    },
    {
        id: 6,
        question: "Which description most accurately reflects your current emotional baseline?",
        choices: [
            "Grounded and emotionally stable",
            "Functional with underlying restlessness or dissatisfaction",
            "Strained but maintaining hope for improvement",
            "Overwhelmed, depleted, or emotionally numb"
        ],
        weights: [0, 1, 2, 3],
        categories: ["overwhelmed", "burnout", "numb"],
        dimension: "emotional_state"
    }
];

// ---------- CATEGORY DEFINITIONS ----------
// Struggle categories the assessment measures
const STRUGGLE_CATEGORIES = {
    anxiety: {
        name: "Anxiety",
        description: "Persistent worry, restlessness, or apprehension about anticipated outcomes",
        icon: "activity"
    },
    burnout: {
        name: "Burnout",
        description: "Chronic emotional and physical exhaustion from sustained stress exposure",
        icon: "battery"
    },
    relationships: {
        name: "Relational Strain",
        description: "Patterns of disconnection, miscommunication, or unmet relational needs",
        icon: "users"
    },
    self_worth: {
        name: "Self-Worth Challenges",
        description: "Difficulties with self-acceptance, self-esteem, or internalized criticism",
        icon: "user"
    },
    life_direction: {
        name: "Purpose & Direction",
        description: "Uncertainty regarding personal values, goals, or life trajectory",
        icon: "compass"
    },
    loneliness: {
        name: "Isolation",
        description: "Experiences of disconnection, invisibility, or lack of meaningful belonging",
        icon: "moon"
    }
};

// Emotional tone categories
const EMOTION_CATEGORIES = {
    overwhelmed: {
        name: "Overwhelmed",
        description: "Experiencing cognitive or emotional overload",
        icon: "waves"
    },
    numb: {
        name: "Emotionally Detached",
        description: "Reduced capacity to experience emotions or engage with present experience",
        icon: "cloud"
    },
    sad: {
        name: "Low Mood",
        description: "Persistent heaviness, low energy, or depressive affect",
        icon: "cloud-rain"
    },
    anxious: {
        name: "Heightened Anxiety",
        description: "Elevated physiological arousal and worry",
        icon: "zap"
    },
    hopeful_but_lost: {
        name: "Seeking Clarity",
        description: "Motivated toward change but lacking clear direction",
        icon: "sunrise"
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
    cloudRain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path></svg>`,
    zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    sunrise: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline></svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`,
    mindfulness: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>`,
    wellness: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
    insights: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`
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

        // Use brand colors for particles
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
            anxiety: 0,
            burnout: 0,
            relationships: 0,
            self_worth: 0,
            life_direction: 0,
            loneliness: 0
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
            main: "Your responses indicate a relatively balanced emotional state at this time.",
            context: "Maintaining psychological equilibrium requires ongoing attention. Consider this an opportunity to strengthen existing wellbeing practices.",
            nextSteps: "Continue cultivating self-awareness through regular reflection, mindfulness practices, or consultation with wellness professionals for preventive support."
        };
    }

    let mainInsight = "";

    if (topStruggles.length > 0) {
        const struggleNames = topStruggles.map(s => s.name.toLowerCase()).join(' and ');
        mainInsight = `Your responses suggest current experiences related to ${struggleNames}. `;
    }

    if (topEmotions.length > 0) {
        const emotionNames = topEmotions.map(e => e.name.toLowerCase()).join(' and ');
        mainInsight += `The emotional profile indicates ${emotionNames}.`;
    }

    const contextMessages = {
        burnout: "Chronic stress depletion is a well-documented phenomenon that responds effectively to structured intervention. Recognition is the essential first step toward recovery.",
        anxiety: "Elevated anxiety often represents an adaptive response to perceived environmental demands. Evidence-based approaches can significantly reduce symptom intensity.",
        relationships: "Relational patterns are deeply interconnected with overall psychological wellbeing. Professional guidance can illuminate pathways to healthier connection.",
        self_worth: "Self-perception difficulties frequently have developmental origins and respond well to targeted therapeutic approaches. Compassionate self-inquiry is foundational to change.",
        life_direction: "Existential questioning reflects engagement with fundamental human concerns. Structured exploration with qualified practitioners can facilitate clarity.",
        loneliness: "Social disconnection has significant implications for psychological and physical health. Intentional community building and professional support can address isolation effectively."
    };

    const primaryStruggle = topStruggles[0]?.key || 'burnout';
    const context = contextMessages[primaryStruggle] || contextMessages.burnout;

    const nextStepsMessages = {
        burnout: "Consider establishing boundaries, prioritizing restorative activities, and consulting with a burnout recovery specialist to develop a sustainable wellness protocol.",
        anxiety: "Evidence-based interventions such as cognitive-behavioral approaches, somatic practices, or mindfulness training can provide significant relief. Professional guidance is recommended.",
        relationships: "Exploring attachment patterns and communication dynamics with a relationship-focused practitioner can facilitate meaningful improvement in interpersonal functioning.",
        self_worth: "Working with a practitioner specializing in self-esteem and identity can help restructure negative self-beliefs and cultivate authentic self-acceptance.",
        life_direction: "Engaging with a life purpose coach or existential therapist can provide framework and methodology for clarifying values and defining meaningful direction.",
        loneliness: "Connecting with practitioners who specialize in social wellbeing can help develop strategies for building authentic community and meaningful relationships."
    };

    const nextSteps = nextStepsMessages[primaryStruggle] || nextStepsMessages.burnout;

    return {
        main: mainInsight.trim(),
        context: context,
        nextSteps: nextSteps
    };
}

// ---------- GET ICON SVG ----------
function getIconSvg(iconName) {
    const iconMap = {
        'activity': ICONS.activity,
        'battery': ICONS.battery,
        'users': ICONS.users,
        'user': ICONS.user,
        'compass': ICONS.compass,
        'moon': ICONS.moon,
        'waves': ICONS.waves,
        'cloud': ICONS.cloud,
        'cloud-rain': ICONS.cloudRain,
        'zap': ICONS.zap,
        'sunrise': ICONS.sunrise
    };
    return iconMap[iconName] || ICONS.heart;
}

// ---------- RENDER RESULTS ----------
function renderResults(profile) {
    const resultsContainer = document.querySelector('.results-container');
    const insight = generateInsightSummary(profile);
    const practitionerTypes = getPractitionerSuggestions(profile);

    resultsContainer.innerHTML = `
        <div class="result-icon-container">
            <div class="result-glow"></div>
            <div class="result-icon">${ICONS.insights}</div>
        </div>
        
        <h2 class="result-title">Your Assessment Summary</h2>
        
        <!-- Main Insight Narrative -->
        <div class="insight-section">
            <p class="insight-main">${insight.main}</p>
            <p class="insight-context">${insight.context}</p>
        </div>
        
        <!-- Struggle Breakdown -->
        ${profile.topStruggles.length > 0 ? `
        <div class="struggles-section">
            <h3 class="section-title">Areas Identified for Attention</h3>
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
        
        <!-- Emotional State -->
        ${profile.topEmotions.length > 0 ? `
        <div class="emotions-section">
            <h3 class="section-title">Emotional Profile Indicators</h3>
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
            <h3 class="section-title">Recommended Next Steps</h3>
            <p class="next-steps-text">${insight.nextSteps}</p>
        </div>
        
        <!-- GreatSpire Branding Section -->
        <div class="greatspire-brand-section">
            <div class="brand-header">
                <div class="brand-logo">
                    <span class="logo-text">Great<span class="logo-accent">Spire</span></span>
                </div>
                <p class="brand-tagline">Professional wellness practitioners at your fingertips</p>
            </div>
            
            <div class="brand-message">
                <h3>Connect With Qualified Practitioners</h3>
                <p>GreatSpire connects you with vetted wellness professionals who specialize in the areas identified in your assessment. Begin your journey toward improved wellbeing with personalized, expert guidance.</p>
            </div>
            
            <!-- Personalized Practitioner Suggestions -->
            <div class="practitioner-suggestions">
                <h4 class="suggestions-title">Recommended Practitioner Types</h4>
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
                    <span>Verified credentials</span>
                </div>
                <div class="value-prop">
                    <span class="value-icon">✓</span>
                    <span>Personalized matching</span>
                </div>
                <div class="value-prop">
                    <span class="value-icon">✓</span>
                    <span>Confidential support</span>
                </div>
            </div>
            
            <!-- App Download Section -->
            <div class="app-download-section">
                <span class="app-download-title">Download the GreatSpire App</span>
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
                <span class="trust-text">Trusted by wellness seekers worldwide</span>
            </div>
        </div>
        
        <!-- Secondary Actions -->
        <div class="cta-container">
            <button class="btn-secondary large" id="retake-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                </svg>
                Retake Assessment
            </button>
        </div>
        
        <!-- Disclaimer -->
        <p class="disclaimer">This assessment is designed for self-reflection purposes only and does not constitute clinical diagnosis or medical advice. If you are experiencing significant distress, please consult a qualified healthcare professional.</p>
    `;

    document.getElementById('retake-btn').addEventListener('click', retakeQuiz);
}

// ---------- GET PRACTITIONER SUGGESTIONS ----------
function getPractitionerSuggestions(profile) {
    const suggestions = [];
    const primaryStruggle = profile.primaryStruggle;

    const practitionerMap = {
        anxiety: [
            { iconSvg: ICONS.mindfulness, name: 'Mindfulness Practitioner', help: 'Evidence-based techniques for anxiety reduction and emotional regulation' },
            { iconSvg: ICONS.activity, name: 'Somatic Therapist', help: 'Body-centered approaches to nervous system regulation' }
        ],
        burnout: [
            { iconSvg: ICONS.wellness, name: 'Burnout Recovery Specialist', help: 'Structured protocols for energy restoration and sustainable wellbeing' },
            { iconSvg: ICONS.heart, name: 'Integrative Wellness Coach', help: 'Holistic approach addressing physical, emotional, and lifestyle factors' }
        ],
        relationships: [
            { iconSvg: ICONS.users, name: 'Relationship Therapist', help: 'Expert guidance on attachment patterns and communication dynamics' },
            { iconSvg: ICONS.user, name: 'Self-Discovery Facilitator', help: 'Understanding personal patterns that influence relationships' }
        ],
        self_worth: [
            { iconSvg: ICONS.sparkles, name: 'Self-Compassion Coach', help: 'Developing healthier self-relationship and reducing inner criticism' },
            { iconSvg: ICONS.heart, name: 'Identity & Esteem Specialist', help: 'Restructuring limiting beliefs and building authentic confidence' }
        ],
        life_direction: [
            { iconSvg: ICONS.compass, name: 'Life Purpose Coach', help: 'Clarifying values, vision, and meaningful life direction' },
            { iconSvg: ICONS.insights, name: 'Existential Counselor', help: 'Exploring meaning, purpose, and authentic living' }
        ],
        loneliness: [
            { iconSvg: ICONS.users, name: 'Connection & Community Coach', help: 'Building meaningful relationships and social wellbeing' },
            { iconSvg: ICONS.heart, name: 'Belonging Specialist', help: 'Addressing isolation and fostering authentic connection' }
        ]
    };

    if (primaryStruggle && practitionerMap[primaryStruggle]) {
        suggestions.push(...practitionerMap[primaryStruggle]);
    } else {
        suggestions.push(
            { iconSvg: ICONS.wellness, name: 'General Wellness Coach', help: 'Holistic support for overall wellbeing and life balance' },
            { iconSvg: ICONS.mindfulness, name: 'Mindfulness Guide', help: 'Cultivating presence, awareness, and emotional equilibrium' }
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

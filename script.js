// ===== Emotional Awareness Quiz Configuration =====
// This quiz helps users understand their struggles and emotional state
// with empathetic, non-judgmental language and personalized insights.

// ---------- QUESTION DATA MODEL ----------
// Each question contributes to struggle and emotion categories via weights
const QUESTIONS = [
    {
        id: 1,
        question: "How often do you feel emotionally exhausted at the end of the day?",
        icon: "🌅",
        choices: ["Rarely or never", "Sometimes", "Often", "Almost always"],
        weights: [0, 1, 2, 3],
        categories: ["burnout", "overwhelmed"],
        dimension: "emotional_health"
    },
    {
        id: 2,
        question: "When you think about the future, what comes up most?",
        icon: "🔮",
        choices: [
            "Excitement and hope",
            "A mix of hope and uncertainty",
            "Mostly worry or dread",
            "I try not to think about it"
        ],
        weights: [0, 1, 2, 3],
        categories: ["anxiety", "life_direction"],
        dimension: "outlook"
    },
    {
        id: 3,
        question: "How connected do you feel to the people around you?",
        icon: "💫",
        choices: [
            "Deeply connected and supported",
            "Connected but sometimes distant",
            "Often feeling misunderstood",
            "Quite isolated or alone"
        ],
        weights: [0, 1, 2, 3],
        categories: ["loneliness", "relationships"],
        dimension: "connection"
    },
    {
        id: 4,
        question: "How would you describe your relationship with yourself lately?",
        icon: "🪞",
        choices: [
            "Kind and accepting",
            "Mostly okay, with some criticism",
            "Often self-critical",
            "Struggling to feel good about myself"
        ],
        weights: [0, 1, 2, 3],
        categories: ["self_worth", "sad"],
        dimension: "self_relationship"
    },
    {
        id: 5,
        question: "Do you feel like you're living with purpose and meaning?",
        icon: "🧭",
        choices: [
            "Yes, I feel aligned with my path",
            "Mostly, but I question it sometimes",
            "I'm searching for more clarity",
            "I feel lost or stuck"
        ],
        weights: [0, 1, 2, 3],
        categories: ["life_direction", "hopeful_but_lost"],
        dimension: "purpose"
    },
    {
        id: 6,
        question: "How often do racing thoughts make it hard to focus or relax?",
        icon: "💭",
        choices: ["Rarely", "A few times a week", "Daily", "Almost constantly"],
        weights: [0, 1, 2, 3],
        categories: ["anxiety", "anxious", "overwhelmed"],
        dimension: "mental_state"
    },
    {
        id: 7,
        question: "When something goes wrong, how do you typically respond?",
        icon: "🌊",
        choices: [
            "I bounce back fairly quickly",
            "I need some time but manage",
            "It hits me hard and lingers",
            "I tend to shut down or spiral"
        ],
        weights: [0, 1, 2, 3],
        categories: ["burnout", "numb", "overwhelmed"],
        dimension: "resilience"
    },
    {
        id: 8,
        question: "How often do you feel like you need to be 'performing' or wearing a mask?",
        icon: "🎭",
        choices: [
            "Rarely, I feel authentic",
            "Sometimes in certain situations",
            "Often, I hide how I really feel",
            "Almost always, I'm exhausted from it"
        ],
        weights: [0, 1, 2, 3],
        categories: ["burnout", "loneliness", "self_worth"],
        dimension: "authenticity"
    },
    {
        id: 9,
        question: "How is your energy level these days?",
        icon: "🔋",
        choices: [
            "Good, I feel energized",
            "Okay, but dips sometimes",
            "Low more often than not",
            "Constantly depleted"
        ],
        weights: [0, 1, 2, 3],
        categories: ["burnout", "sad", "numb"],
        dimension: "energy"
    },
    {
        id: 10,
        question: "In close relationships, do you feel safe expressing your needs?",
        icon: "💝",
        choices: [
            "Yes, openly and comfortably",
            "Mostly, with some hesitation",
            "I often hold back",
            "I rarely share my true needs"
        ],
        weights: [0, 1, 2, 3],
        categories: ["relationships", "self_worth", "loneliness"],
        dimension: "relationships"
    },
    {
        id: 11,
        question: "What best describes your emotional state right now?",
        icon: "🌈",
        choices: [
            "Peaceful and grounded",
            "Okay but seeking something more",
            "Struggling but hopeful",
            "Overwhelmed or numb"
        ],
        weights: [0, 1, 2, 3],
        categories: ["overwhelmed", "hopeful_but_lost", "numb"],
        dimension: "current_state"
    },
    {
        id: 12,
        question: "How often do anxious feelings affect your daily life?",
        icon: "🌀",
        choices: [
            "Rarely or never",
            "Occasionally",
            "Frequently",
            "Most of the time"
        ],
        weights: [0, 1, 2, 3],
        categories: ["anxiety", "anxious", "overwhelmed"],
        dimension: "anxiety_impact"
    }
];

// ---------- CATEGORY DEFINITIONS ----------
// Struggle categories the quiz measures
const STRUGGLE_CATEGORIES = {
    anxiety: {
        name: "Anxiety",
        description: "Worry, nervousness, or unease about what's ahead",
        icon: "🌀"
    },
    burnout: {
        name: "Burnout",
        description: "Emotional and physical exhaustion from prolonged stress",
        icon: "🔥"
    },
    relationships: {
        name: "Relationship Challenges",
        description: "Difficulties in connecting, communicating, or feeling understood",
        icon: "💔"
    },
    self_worth: {
        name: "Self-Worth",
        description: "Struggles with self-esteem, self-criticism, or feeling 'enough'",
        icon: "🪞"
    },
    life_direction: {
        name: "Life Direction",
        description: "Uncertainty about purpose, goals, or the path forward",
        icon: "🧭"
    },
    loneliness: {
        name: "Loneliness",
        description: "Feeling isolated, disconnected, or unseen by others",
        icon: "🌙"
    }
};

// Emotional tone categories
const EMOTION_CATEGORIES = {
    overwhelmed: {
        name: "Overwhelmed",
        description: "Feeling like there's too much to handle",
        icon: "🌊"
    },
    numb: {
        name: "Emotionally Numb",
        description: "Difficulty feeling emotions or a sense of flatness",
        icon: "🌫️"
    },
    sad: {
        name: "Sad",
        description: "A persistent heaviness or low mood",
        icon: "🌧️"
    },
    anxious: {
        name: "Anxious",
        description: "Restless, on-edge, or unable to settle",
        icon: "⚡"
    },
    hopeful_but_lost: {
        name: "Hopeful but Lost",
        description: "Wanting change but unsure how to find it",
        icon: "🌅"
    }
};

// ---------- GREATSPIRE CTA CONFIG ----------
const GREATSPIRE_URL = "https://www.greatspire.io/";
const CTA_MESSAGES = {
    default: "Explore practitioners on GreatSpire",
    anxiety: "Find anxiety-focused practitioners on GreatSpire",
    burnout: "Connect with burnout recovery specialists on GreatSpire",
    relationships: "Find relationship-focused practitioners on GreatSpire",
    self_worth: "Explore self-compassion practitioners on GreatSpire",
    life_direction: "Find life coaching practitioners on GreatSpire",
    loneliness: "Connect with community and support on GreatSpire"
};

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
// Note: retakeBtn is dynamically created in renderResults, so we bind it there

// ---------- INITIALIZATION ----------
function init() {
    createParticles();
    renderQuestions();
    bindEvents();
    updateProgress();
}

// ---------- CREATE FLOATING PARTICLES ----------
function createParticles() {
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';

        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

        const hue = Math.random() * 60 + 240;
        particle.style.background = `hsla(${hue}, 70%, 60%, 0.6)`;
        particle.style.boxShadow = `0 0 10px hsla(${hue}, 70%, 60%, 0.4)`;

        particlesContainer.appendChild(particle);
    }
}

// ---------- RENDER QUESTIONS DYNAMICALLY ----------
function renderQuestions() {
    questionsWrapper.innerHTML = '';

    QUESTIONS.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = `question-card ${index === 0 ? 'active' : ''}`;
        card.dataset.question = index;

        card.innerHTML = `
            <div class="question-icon">${q.icon}</div>
            <h3>${q.question}</h3>
            <div class="options">
                ${q.choices.map((choice, choiceIndex) => `
                    <button class="option" data-value="${choiceIndex}">
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

    // Use event delegation for dynamic options
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

    // Remove previous selection
    card.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));

    // Add selection
    option.classList.add('selected');

    // Store answer
    answers[questionIndex] = value;

    // Auto-advance after delay
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
// Calculates scores for each struggle and emotion category based on answers
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
// Creates a structured profile from raw scores
function buildProfile(scores) {
    // Sort struggles by score
    const sortedStruggles = Object.entries(scores.struggles)
        .map(([key, value]) => ({ key, value, ...STRUGGLE_CATEGORIES[key] }))
        .sort((a, b) => b.value - a.value);

    // Sort emotions by score
    const sortedEmotions = Object.entries(scores.emotions)
        .map(([key, value]) => ({ key, value, ...EMOTION_CATEGORIES[key] }))
        .sort((a, b) => b.value - a.value);

    // Get top 2 struggles and emotions
    const topStruggles = sortedStruggles.slice(0, 2).filter(s => s.value > 0);
    const topEmotions = sortedEmotions.slice(0, 2).filter(e => e.value > 0);

    // Calculate max possible score for normalization
    const maxPossibleScore = QUESTIONS.length * 3; // Max weight is 3

    // Calculate intensity levels (0-100)
    const calculateIntensity = (score) => Math.min(100, Math.round((score / maxPossibleScore) * 100 * 2));

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
// Creates an empathetic narrative based on the user's profile
function generateInsightSummary(profile) {
    const { topStruggles, topEmotions } = profile;

    if (topStruggles.length === 0 && topEmotions.length === 0) {
        return {
            main: "It looks like you're in a relatively steady place right now. That's wonderful!",
            context: "Even when things feel okay, it can be valuable to check in with yourself and continue practices that support your wellbeing.",
            nextSteps: "Consider exploring ways to maintain this balance, whether through journaling, meditation, or connecting with others who support your growth."
        };
    }

    // Build main insight
    let mainInsight = "";

    if (topStruggles.length > 0) {
        const struggleNames = topStruggles.map(s => s.name.toLowerCase()).join(' and ');
        mainInsight = `Based on your responses, you may currently be experiencing ${struggleNames}. `;
    }

    if (topEmotions.length > 0) {
        const emotionNames = topEmotions.map(e => e.name.toLowerCase()).join(' and ');
        mainInsight += `Emotionally, you might be feeling ${emotionNames}.`;
    }

    // Build context/normalization
    const contextMessages = {
        burnout: "Many people experience burnout when they've been giving more than they have to give for too long. It makes complete sense that you might be feeling depleted.",
        anxiety: "Anxiety often shows up when we're navigating uncertainty or carrying a lot of responsibility. These feelings are a natural response to what you're going through.",
        relationships: "Relationship challenges can feel particularly heavy because connection is so fundamental to our wellbeing. What you're experiencing is more common than you might think.",
        self_worth: "Struggles with self-worth often develop gradually, sometimes from experiences we barely remember. Be gentle with yourself—many people share these feelings.",
        life_direction: "Questioning your path is actually a sign of growth. It means you care deeply about living a meaningful life, even when the way forward isn't clear.",
        loneliness: "Loneliness is one of the most universal human experiences, yet it can feel so isolating. You're absolutely not alone in feeling this way."
    };

    const primaryStruggle = topStruggles[0]?.key || 'burnout';
    const context = contextMessages[primaryStruggle] || contextMessages.burnout;

    // Build next steps
    const nextStepsMessages = {
        burnout: "Consider giving yourself permission to rest without guilt. Small acts of self-care, setting boundaries, or talking to someone you trust can make a real difference.",
        anxiety: "Gentle practices like breathing exercises, journaling your worries, or grounding techniques can help calm the nervous system. You don't have to manage this alone.",
        relationships: "Reflecting on your needs in relationships and practicing open communication can help. A coach or practitioner can offer valuable perspective.",
        self_worth: "Try noticing your self-talk and gently challenging critical thoughts. Journaling about your strengths or speaking with a supportive practitioner can help shift this pattern.",
        life_direction: "Exploring your values, trying new experiences, or working with a guide can help bring clarity. Sometimes the path reveals itself one step at a time.",
        loneliness: "Reaching out—even in small ways—can help bridge the gap. Consider joining communities, reconnecting with old friends, or talking to a practitioner who understands."
    };

    const nextSteps = nextStepsMessages[primaryStruggle] || nextStepsMessages.burnout;

    return {
        main: mainInsight.trim(),
        context: context,
        nextSteps: nextSteps
    };
}

// ---------- RENDER RESULTS ----------
// Displays the full results UI with insights, scores, and GreatSpire branding
function renderResults(profile) {
    const resultsContainer = document.querySelector('.results-container');
    const insight = generateInsightSummary(profile);

    // Get personalized practitioner suggestions based on struggles
    const practitionerTypes = getPractitionerSuggestions(profile);

    resultsContainer.innerHTML = `
        <div class="result-icon-container">
            <div class="result-glow"></div>
            <div class="result-icon">💜</div>
        </div>
        
        <h2 class="result-title">Your Emotional Snapshot</h2>
        
        <!-- Main Insight Narrative -->
        <div class="insight-section">
            <p class="insight-main">${insight.main}</p>
            <p class="insight-context">${insight.context}</p>
        </div>
        
        <!-- Struggle Breakdown -->
        ${profile.topStruggles.length > 0 ? `
        <div class="struggles-section">
            <h3 class="section-title">Areas You May Be Navigating</h3>
            <div class="struggle-list">
                ${profile.topStruggles.map(s => `
                    <div class="struggle-item">
                        <div class="struggle-header">
                            <span class="struggle-icon">${s.icon}</span>
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
            <h3 class="section-title">How You Might Be Feeling</h3>
            <div class="emotion-tags">
                ${profile.topEmotions.map(e => `
                    <span class="emotion-tag">
                        <span class="emotion-icon">${e.icon}</span>
                        ${e.name}
                    </span>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <!-- Next Steps -->
        <div class="next-steps-section">
            <h3 class="section-title">Possible Next Steps</h3>
            <p class="next-steps-text">${insight.nextSteps}</p>
        </div>
        
        <!-- GreatSpire Branding Section -->
        <div class="greatspire-brand-section">
            <div class="brand-header">
                <div class="brand-logo">
                    <span class="logo-text">Great<span class="logo-accent">Spire</span></span>
                </div>
                <p class="brand-tagline">Your journey to wellness starts here</p>
            </div>
            
            <div class="brand-message">
                <h3>You Don't Have to Navigate This Alone</h3>
                <p>GreatSpire connects you with experienced practitioners who specialize in exactly what you're going through. Our vetted professionals offer personalized guidance to help you move from where you are to where you want to be.</p>
            </div>
            
            <!-- Personalized Practitioner Suggestions -->
            <div class="practitioner-suggestions">
                <h4 class="suggestions-title">Recommended for You</h4>
                <div class="practitioner-types">
                    ${practitionerTypes.map(p => `
                        <div class="practitioner-type">
                            <span class="practitioner-icon">${p.icon}</span>
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
                    <span>Vetted, experienced practitioners</span>
                </div>
                <div class="value-prop">
                    <span class="value-icon">✓</span>
                    <span>Personalized matching</span>
                </div>
                <div class="value-prop">
                    <span class="value-icon">✓</span>
                    <span>Safe, judgment-free support</span>
                </div>
            </div>
            
            <!-- Primary CTA -->
            <a href="${GREATSPIRE_URL}" class="btn-primary large cta-main" target="_blank" id="greatspire-cta">
                <span>Find Your Practitioner</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                </svg>
            </a>
            
            <!-- Trust Signal -->
            <div class="trust-signal">
                <span class="trust-stars">★★★★★</span>
                <span class="trust-text">Trusted by thousands on their wellness journey</span>
            </div>
        </div>
        
        <!-- Secondary Actions -->
        <div class="cta-container">
            <button class="btn-secondary large" id="retake-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                </svg>
                Reflect Again
            </button>
        </div>
        
        <!-- Disclaimer -->
        <p class="disclaimer">This quiz is for reflection and self-discovery purposes only. It is not a clinical diagnosis or medical advice. If you're struggling, please reach out to a qualified professional.</p>
    `;

    // Rebind retake button
    document.getElementById('retake-btn').addEventListener('click', retakeQuiz);
}

// ---------- GET PRACTITIONER SUGGESTIONS ----------
// Returns personalized practitioner types based on user's struggles
function getPractitionerSuggestions(profile) {
    const suggestions = [];
    const primaryStruggle = profile.primaryStruggle;

    const practitionerMap = {
        anxiety: [
            { icon: '🧘', name: 'Mindfulness Coach', help: 'Learn techniques to calm anxiety and find peace' },
            { icon: '🌬️', name: 'Breathwork Specialist', help: 'Use breath to regulate your nervous system' }
        ],
        burnout: [
            { icon: '💆', name: 'Wellness Coach', help: 'Rebuild energy and establish boundaries' },
            { icon: '🌿', name: 'Holistic Practitioner', help: 'Address burnout from mind, body, and spirit' }
        ],
        relationships: [
            { icon: '💝', name: 'Relationship Coach', help: 'Improve communication and deepen connections' },
            { icon: '🪞', name: 'Self-Discovery Guide', help: 'Understand patterns that affect your relationships' }
        ],
        self_worth: [
            { icon: '✨', name: 'Self-Compassion Coach', help: 'Build a kinder relationship with yourself' },
            { icon: '🦋', name: 'Transformation Guide', help: 'Rewrite limiting beliefs and unlock potential' }
        ],
        life_direction: [
            { icon: '🧭', name: 'Life Purpose Coach', help: 'Discover clarity and direction for your path' },
            { icon: '🔮', name: 'Intuitive Guide', help: 'Connect with your inner wisdom and vision' }
        ],
        loneliness: [
            { icon: '💜', name: 'Connection Coach', help: 'Build meaningful relationships and community' },
            { icon: '🌟', name: 'Support Guide', help: 'Feel seen, heard, and understood' }
        ]
    };

    // Get suggestions for primary struggle
    if (primaryStruggle && practitionerMap[primaryStruggle]) {
        suggestions.push(...practitionerMap[primaryStruggle]);
    } else {
        // Default suggestions
        suggestions.push(
            { icon: '🧘', name: 'Wellness Coach', help: 'Holistic support for your journey' },
            { icon: '✨', name: 'Mindfulness Guide', help: 'Find peace and presence' }
        );
    }

    return suggestions.slice(0, 2);
}

// ---------- SHOW RESULTS ----------
function showResults() {
    const scores = calculateScores(answers);
    const profile = buildProfile(scores);

    // Save session before rendering
    saveSession(profile);

    // Render the results
    renderResults(profile);

    // Transition to results
    quizScreen.classList.remove('active');
    setTimeout(() => {
        resultsScreen.classList.add('active');
    }, 300);
}

// ---------- SESSION STORAGE ----------
// Saves the current session to localStorage
function saveSession(profile) {
    const sessions = loadSessions();

    // Create session summary
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

    // Add to beginning and keep only last 5
    sessions.unshift(session);
    const trimmedSessions = sessions.slice(0, 5);

    try {
        localStorage.setItem('greatspire_sessions', JSON.stringify(trimmedSessions));
    } catch (e) {
        console.log('Could not save session to localStorage');
    }
}

// Loads previous sessions from localStorage
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
    // Reset state
    currentQuestion = 0;
    answers = [];

    // Re-render questions to clear selections
    renderQuestions();
    updateProgress();
    backBtn.disabled = true;

    // Transition
    resultsScreen.classList.remove('active');
    setTimeout(() => {
        quizScreen.classList.add('active');
    }, 300);
}

// ---------- START APP ----------
document.addEventListener('DOMContentLoaded', init);

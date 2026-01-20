// Quiz App JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionEl = document.getElementById('question');
    const optionsEl = document.querySelectorAll('.option');
    const timeLeftEl = document.getElementById('time-left');
    const scoreEl = document.getElementById('score');
    const finalScoreEl = document.getElementById('final-score');

    // Quiz State
    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 30;
    let timer;
    let isDarkMode = false;

    // Quiz Questions
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correct: "C"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: "B"
        },
        {
            question: "What is 2 + 2 × 3?",
            options: ["8", "12", "10", "6"],
            correct: "A"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correct: "C"
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correct: "D"
        },
        {
            question: "Which programming language is known as the 'mother of all languages'?",
            options: ["Python", "Java", "C", "JavaScript"],
            correct: "C"
        },
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
            correct: "A"
        },
        {
            question: "Which company created the iPhone?",
            options: ["Samsung", "Google", "Apple", "Microsoft"],
            correct: "C"
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["Wa", "H2O", "Hy", "O2"],
            correct: "B"
        },
        {
            question: "Which continent is the Sahara Desert located in?",
            options: ["Asia", "Africa", "Australia", "South America"],
            correct: "B"
        }
    ];

    // Initialize
    function init() {
        createThemeToggle();
        setupEventListeners();
    }

    // Create theme toggle button
    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.id = 'themeToggle';
        themeToggle.textContent = '🌙';
        document.body.appendChild(themeToggle);

        themeToggle.addEventListener('click', toggleTheme);
    }

    // Toggle dark mode
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode');
        document.getElementById('themeToggle').textContent = isDarkMode ? '☀️' : '🌙';
    }

    // Setup event listeners
    function setupEventListeners() {
        startBtn.addEventListener('click', startQuiz);
        restartBtn.addEventListener('click', restartQuiz);

        optionsEl.forEach(option => {
            option.addEventListener('click', selectOption);
        });
    }

    // Start quiz
    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 30;
        scoreEl.textContent = score;
        timeLeftEl.textContent = timeLeft;

        showScreen(quizScreen);
        loadQuestion();
        startTimer();
    }

    // Show specific screen
    function showScreen(screen) {
        [startScreen, quizScreen, resultScreen].forEach(s => s.classList.add('hidden'));
        screen.classList.remove('hidden');
    }

    // Load current question
    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.question;

        optionsEl.forEach((option, index) => {
            option.textContent = currentQuestion.options[index];
            option.classList.remove('correct', 'incorrect');
            option.style.pointerEvents = 'auto';
        });
    }

    // Start timer
    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timeLeftEl.textContent = timeLeft;

            if (timeLeft <= 0) {
                endQuiz();
            }
        }, 1000);
    }

    // Stop timer
    function stopTimer() {
        clearInterval(timer);
    }

    // Handle option selection
    function selectOption(e) {
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset.option;
        const correctAnswer = questions[currentQuestionIndex].correct;

        // Disable all options
        optionsEl.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Show correct/incorrect feedback
        if (selectedAnswer === correctAnswer) {
            selectedOption.classList.add('correct');
            score += 10;
            scoreEl.textContent = score;
        } else {
            selectedOption.classList.add('incorrect');
            // Show correct answer
            optionsEl.forEach(option => {
                if (option.dataset.option === correctAnswer) {
                    option.classList.add('correct');
                }
            });
        }

        // Move to next question after delay
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                endQuiz();
            }
        }, 1500);
    }

    // End quiz
    function endQuiz() {
        stopTimer();
        finalScoreEl.textContent = score;
        showScreen(resultScreen);
    }

    // Restart quiz
    function restartQuiz() {
        stopTimer();
        showScreen(startScreen);
    }

    // Initialize the app
    init();
});
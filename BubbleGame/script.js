// Enhanced Bubble Game with Sound Effects, Difficulty Levels, Leaderboard, Power-ups, and Statistics

// Game State Variables
var score = 0;
var timer = 60;
var hitrn;
var gameActive = false;
var currentDifficulty = 'easy';
var gameStats = {
    totalGames: 0,
    totalScore: 0,
    bestScore: 0,
    averageScore: 0
};

// Sound Effects
var audioContext;
var sounds = {
    pop: null,
    bonus: null,
    powerup: null,
    gameOver: null
};

// Power-up System
var activePowerups = [];
var powerupTypes = {
    timeExtension: { duration: 10, name: 'Time Extension' },
    bonusPoints: { duration: 15, name: 'Bonus Points' },
    doubleScore: { duration: 20, name: 'Double Score' }
};

// Difficulty Settings
var difficultySettings = {
    easy: { time: 60, bubbleCount: 140, powerupChance: 0.1 },
    medium: { time: 45, bubbleCount: 120, powerupChance: 0.15 },
    hard: { time: 30, bubbleCount: 100, powerupChance: 0.2 }
};

// Initialize Game
function initGame() {
    loadGameStats();
    loadLeaderboard();
    initAudio();
    showGameMenu();
    setupEventListeners();
}

// Audio System
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        createSounds();
    } catch (e) {
        console.log('Audio not supported');
    }
}

function createSounds() {
    // Pop sound
    sounds.pop = createTone(800, 0.1, 'sine');
    // Bonus sound
    sounds.bonus = createTone(1200, 0.2, 'sine');
    // Power-up sound
    sounds.powerup = createTone(600, 0.3, 'triangle');
    // Game over sound
    sounds.gameOver = createTone(200, 0.5, 'sawtooth');
}

function createTone(frequency, duration, type) {
    return function() {
        if (!audioContext) return;
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    };
}

function playSound(soundName) {
    if (sounds[soundName]) {
        sounds[soundName]();
    }
}

// Game Menu System
function showGameMenu() {
    document.getElementById('gameMenu').style.display = 'block';
    document.getElementById('main').style.display = 'none';
}

function hideGameMenu() {
    document.getElementById('gameMenu').style.display = 'none';
    document.getElementById('main').style.display = 'flex';
}

// Difficulty Selection
function selectDifficulty(level) {
    currentDifficulty = level;
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-level="${level}"]`).classList.add('active');
    document.getElementById('levelVal').textContent = level.charAt(0).toUpperCase() + level.slice(1);
}

// Start Game
function startGame() {
    if (!currentDifficulty) {
        alert('Please select a difficulty level!');
        return;
    }
    
    hideGameMenu();
    resetGame();
    gameActive = true;
    runTimer();
}

function resetGame() {
    score = 0;
    timer = difficultySettings[currentDifficulty].time;
    activePowerups = [];
    gameActive = true;
    
    document.getElementById('scoreVal').textContent = score;
    document.getElementById('timerVl').textContent = timer;
    document.getElementById('hitVal').textContent = '0';
    document.getElementById('activePowerups').innerHTML = '';
    
    makeBubble();
    newHit();
}

// Bubble Generation with Power-ups
function makeBubble() {
    var clutter = "";
    var bubbleCount = difficultySettings[currentDifficulty].bubbleCount;
    var powerupChance = difficultySettings[currentDifficulty].powerupChance;

    for (let i = 1; i <= bubbleCount; i++) {
        var rn = Math.ceil(Math.random() * 10);
        var isPowerup = Math.random() < powerupChance;
        var powerupType = isPowerup ? getRandomPowerupType() : '';
        
        var bubbleClass = isPowerup ? `bubble powerup ${powerupType}` : 'bubble';
        var powerupData = isPowerup ? `data-powerup="${powerupType}"` : '';
        
        clutter += `<div class="${bubbleClass}" ${powerupData}>${rn}</div>`;
    }
    
    var pbtm = document.querySelector("#pbtm");
    pbtm.innerHTML = clutter;
}

function getRandomPowerupType() {
    var types = Object.keys(powerupTypes);
    return types[Math.floor(Math.random() * types.length)];
}

// Timer System
function runTimer() {
    var t = setInterval(() => {
        if (timer > 0 && gameActive) {
            timer--;
            document.querySelector("#timerVl").textContent = timer;
        } else if (gameActive) {
            endGame();
            clearInterval(t);
        }
    }, 1000);
}

function endGame() {
    gameActive = false;
    updateGameStats();
    saveGameStats();
    
    var gameOverHTML = `
        <div class="game-over">
            <h1>GAME OVER!</h1>
            <h2>Final Score: ${score}</h2>
            <h3>Difficulty: ${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)}</h3>
            <button onclick="showGameMenu()" class="start-btn">Play Again</button>
        </div>
    `;
    
    document.querySelector("#pbtm").innerHTML = gameOverHTML;
    document.querySelector("#hitVal").textContent = '';
    
    playSound('gameOver');
    
    // Check for high score
    if (isHighScore(score)) {
        addToLeaderboard(score, currentDifficulty);
    }
}

// Hit System
function newHit() {
    hitrn = Math.ceil(Math.random() * 10);
    var hit = document.querySelector("#hitVal");
    hit.textContent = hitrn;
}

function increaseScore(points = 10) {
    // Apply power-up effects
    var multiplier = 1;
    if (activePowerups.includes('doubleScore')) {
        multiplier = 2;
    }
    
    score += points * multiplier;
    document.querySelector("#scoreVal").textContent = score;
    playSound('pop');
}

function decreaseScore() {
    score -= 5;
    if (score < 0) {
        score = 0;
    }
    document.querySelector("#scoreVal").textContent = score;
}

// Power-up System
function activatePowerup(type) {
    if (activePowerups.includes(type)) return;
    
    activePowerups.push(type);
    displayActivePowerups();
    playSound('powerup');
    
    // Apply immediate effects
    switch(type) {
        case 'timeExtension':
            timer += powerupTypes.timeExtension.duration;
            document.querySelector("#timerVl").textContent = timer;
            break;
        case 'bonusPoints':
            increaseScore(50);
            break;
    }
    
    // Set timeout to remove power-up
    setTimeout(() => {
        removePowerup(type);
    }, powerupTypes[type].duration * 1000);
}

function removePowerup(type) {
    activePowerups = activePowerups.filter(p => p !== type);
    displayActivePowerups();
}

function displayActivePowerups() {
    var container = document.getElementById('activePowerups');
    container.innerHTML = '';
    
    activePowerups.forEach(powerup => {
        var div = document.createElement('div');
        div.className = 'powerup-item';
        div.textContent = powerupTypes[powerup].name;
        container.appendChild(div);
    });
}

// Statistics System
function updateGameStats() {
    gameStats.totalGames++;
    gameStats.totalScore += score;
    gameStats.averageScore = Math.round(gameStats.totalScore / gameStats.totalGames);
    
    if (score > gameStats.bestScore) {
        gameStats.bestScore = score;
    }
}

function loadGameStats() {
    var saved = localStorage.getItem('bubbleGameStats');
    if (saved) {
        gameStats = JSON.parse(saved);
    }
}

function saveGameStats() {
    localStorage.setItem('bubbleGameStats', JSON.stringify(gameStats));
}

function showStats() {
    var statsContent = document.getElementById('statsContent');
    statsContent.innerHTML = `
        <div class="stat-item">
            <span class="stat-label">Total Games Played:</span>
            <span class="stat-value">${gameStats.totalGames}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Best Score:</span>
            <span class="stat-value">${gameStats.bestScore}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Average Score:</span>
            <span class="stat-value">${gameStats.averageScore}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Total Score:</span>
            <span class="stat-value">${gameStats.totalScore}</span>
        </div>
    `;
    
    document.getElementById('statsModal').style.display = 'block';
}

// Leaderboard System
function loadLeaderboard() {
    var saved = localStorage.getItem('bubbleGameLeaderboard');
    return saved ? JSON.parse(saved) : [];
}

function saveLeaderboard(leaderboard) {
    localStorage.setItem('bubbleGameLeaderboard', JSON.stringify(leaderboard));
}

function isHighScore(score) {
    var leaderboard = loadLeaderboard();
    return leaderboard.length < 10 || score > leaderboard[leaderboard.length - 1].score;
}

function addToLeaderboard(score, difficulty) {
    var leaderboard = loadLeaderboard();
    var playerName = prompt(`New High Score! Enter your name:`) || 'Anonymous';
    
    leaderboard.push({
        name: playerName,
        score: score,
        difficulty: difficulty,
        date: new Date().toLocaleDateString()
    });
    
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10); // Keep top 10
    
    saveLeaderboard(leaderboard);
}

function showLeaderboard() {
    var leaderboard = loadLeaderboard();
    var list = document.getElementById('leaderboardList');
    
    if (leaderboard.length === 0) {
        list.innerHTML = '<p>No scores yet. Be the first to play!</p>';
    } else {
        list.innerHTML = leaderboard.map((entry, index) => `
            <div class="leaderboard-item">
                <span class="leaderboard-rank">#${index + 1}</span>
                <span>${entry.name}</span>
                <span class="leaderboard-score">${entry.score}</span>
                <span>${entry.difficulty}</span>
            </div>
        `).join('');
    }
    
    document.getElementById('leaderboardModal').style.display = 'block';
}

// Event Listeners
function setupEventListeners() {
    // Difficulty selection
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectDifficulty(btn.dataset.level);
        });
    });
    
    // Menu buttons
    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('showLeaderboard').addEventListener('click', showLeaderboard);
    document.getElementById('showStats').addEventListener('click', showStats);
    
    // Modal close buttons
    document.getElementById('closeLeaderboard').addEventListener('click', () => {
        document.getElementById('leaderboardModal').style.display = 'none';
    });
    
    document.getElementById('closeStats').addEventListener('click', () => {
        document.getElementById('statsModal').style.display = 'none';
    });
    
    // Bubble clicking
    document.querySelector("#pbtm").addEventListener('click', function(details) {
        if (timer > 0 && gameActive) {
            var clickedNum = Number(details.target.textContent);
            var isPowerup = details.target.classList.contains('powerup');
            var powerupType = details.target.dataset.powerup;
            
            if (clickedNum === hitrn) {
                if (isPowerup && powerupType) {
                    activatePowerup(powerupType);
                } else {
                    increaseScore();
                }
            } else {
                decreaseScore();
            }
            
            newHit();
            makeBubble();
        }
    });
}

// GSAP Animations
var tl = gsap.timeline();
var cursor = document.querySelector("#bubble");
var main = document.querySelector("#main2");

main.addEventListener('mousemove', function(details) {
    gsap.to(cursor, {
        x: details.x,
        y: details.y,
        duration: 0.4,
        ease: "back.out"
    });
});

// Initialize animations
function initAnimations() {
    tl.from("#panel", {
        duration: 1,
        x: 200,
        opacity: 0,
        ease: "power2.inOut",
    });

    tl.from("#ptop", {
        duration: 1,
        x: -500,
        opacity: 0,
        ease: "power2.inOut",
    });

    tl.from(".bubble", {
        duration: 1,
        y: 200,
        opacity: 0,
        ease: "power2.inOut",
        stagger: 0.02
    });

    tl.from(".elem, .box", {
        duration: 0.5,
        y: -50,
        opacity: 0,
        duration: 0.5,
        Delay: 0.5
    });

    tl.eventCallback("onComplete", function() {
        if (gameActive) {
            runTimer();
        }
    });
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', function() {
    initGame();
    initAnimations();
});
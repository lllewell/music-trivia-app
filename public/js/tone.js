// Initialize Tone.js
const synth = new Tone.Synth().toDestination();

// Define the Jeopardy theme notes
const jeopardyThemeNotes = [
    { note: 'C4', duration: '8n' },
    { note: 'E4', duration: '8n' },
    { note: 'G4', duration: '8n' },
    { note: 'C5', duration: '8n' },
    { note: 'E4', duration: '8n' },
    { note: 'G4', duration: '8n' },
    { note: 'C5', duration: '8n' },
    { note: 'G4', duration: '8n' }
];

// Define the winning tone notes
const winningToneNotes = [
    { note: 'C4', duration: '8n' },
    { note: 'E4', duration: '8n' },
    { note: 'G4', duration: '8n' },
    { note: 'C5', duration: '8n' }
];

// Define the losing tone notes
const losingToneNotes = [
    { note: 'E4', duration: '8n' },
    { note: 'E4', duration: '8n' },
    { note: 'E4', duration: '8n' },
    { note: 'E4', duration: '8n' },
    { note: 'E4', duration: '8n' },
    { note: 'E4', duration: '8n' }
];

// Create a Tone.js Sequence for the Jeopardy theme
const jeopardySequence = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note.note, note.duration, time);
}, jeopardyThemeNotes, '8n');

// Function to start the Jeopardy theme
function startJeopardyTheme() {
    jeopardySequence.loop = true; // Make sure the sequence loops
    Tone.Transport.start();
    jeopardySequence.start(0);
}

// Function to play the winning tone
function playWinningTone() {
    const sequence = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note.note, note.duration, time);
    }, winningToneNotes, '8n');

    Tone.Transport.start();
    sequence.start(0);
    Tone.Transport.stop('+2s');
}

// Function to play the losing tone
function playLosingTone() {
    const sequence = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note.note, note.duration, time);
    }, losingToneNotes, '8n');

    Tone.Transport.start();
    sequence.start(0);
    Tone.Transport.stop('+5s');
}

// Variables to track quiz performance
let totalQuestions = 10;
let correctAnswers = 0;

// Function to be called when an answer is submitted
function submitAnswer(isCorrect) {
    if (isCorrect) {
        correctAnswers++;
    }
    totalQuestions--;
    if (totalQuestions === 0) {
        evaluatePerformance();
    }
}

// Function to evaluate performance and play the appropriate tone
function evaluatePerformance() {
    const percentageCorrect = (correctAnswers / (10 - totalQuestions)) * 100;

    if (percentageCorrect < 70) {
        playLosingTone();
    } else {
        playWinningTone();
    }
}

// Event listener for starting the quiz
document.getElementById('startQuiz').addEventListener('click', async () => {
    try {
        await Tone.start(); // Start Tone.js after user interaction
        startJeopardyTheme();
        // Initialize quiz and start handling answers
    } catch (error) {
        console.error('Error starting Tone.js:', error);
    }
});
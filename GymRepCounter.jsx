<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gym Rep Counter</title>
    <!-- Load Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom font for a strong, athletic look */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0d0d0d; /* Deep charcoal background */
        }
        /* Custom utility for subtle shadow effects */
        .shadow-neon {
            box-shadow: 0 0 15px rgba(52, 211, 153, 0.4); /* Green neon glow */
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen p-4">

    <!-- Main App Container -->
    <div id="app" class="max-w-md w-full bg-gray-900 p-6 sm:p-8 rounded-3xl border-2 border-gray-700 shadow-2xl">

        <!-- Header -->
        <h1 class="text-3xl font-extrabold text-white text-center mb-6 uppercase tracking-wider">
            Workout Tracker
        </h1>

        <!-- Rep Counter Display -->
        <div class="text-center mb-8 p-4 bg-gray-800 rounded-2xl border border-gray-700">
            <p class="text-gray-400 text-lg sm:text-xl uppercase tracking-widest mb-2">Current Reps</p>
            <!-- Rep count uses massive font size for visibility -->
            <div id="repCount" class="text-[6rem] sm:text-[8rem] font-black text-green-400 transition-colors duration-200 leading-none">0</div>
        </div>

        <!-- Set and Target Settings -->
        <div class="flex justify-between items-center text-center mb-8 bg-gray-800 p-4 rounded-xl border border-gray-700">
            <!-- Set Count -->
            <div class="flex-1">
                <p class="text-gray-400 text-sm sm:text-base">CURRENT SET</p>
                <p id="setCount" class="text-4xl font-bold text-indigo-400 mt-1">1</p>
            </div>
            <div class="h-12 w-px bg-gray-700 mx-4"></div>
            <!-- Target Input -->
            <div class="flex-1">
                <label for="targetRepsInput" class="text-gray-400 text-sm sm:text-base block mb-1">TARGET REPS</label>
                <input type="number" id="targetRepsInput" value="10" min="1"
                       class="text-2xl w-24 text-center bg-gray-700 text-white rounded-lg p-1.5 font-bold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 appearance-none">
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-4">
            <!-- Primary Action: Rep Done -->
            <button id="repDoneBtn"
                    class="w-full py-5 sm:py-6 bg-green-600 hover:bg-green-700 text-white font-extrabold text-2xl sm:text-3xl rounded-xl shadow-lg transition duration-150 transform hover:scale-[1.01] active:scale-[0.98] shadow-green-500/50">
                REP DONE!
            </button>
            <!-- Secondary Action: Next Set / Reset -->
            <button id="resetBtn"
                    class="w-full py-4 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold rounded-xl transition duration-150">
                RESET COUNT
            </button>
        </div>

        <!-- Status Message Box (used for target met confirmation) -->
        <div id="statusMessage" class="hidden fixed inset-0 bg-gray-900 bg-opacity-70 items-center justify-center p-4 z-50">
            <div class="bg-gray-800 p-6 rounded-xl text-center max-w-sm w-full border border-green-600 shadow-neon">
                <p id="messageText" class="text-xl font-bold text-green-400 mb-4">Target Reached! Ready for next set?</p>
                <button onclick="hideMessage()" class="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 font-medium">
                    OK
                </button>
            </div>
        </div>

    </div>

    <script>
        // --- State Variables ---
        let currentReps = 0;
        let currentSets = 1; // Start at Set 1
        let isTargetMet = false;

        // --- DOM Element References ---
        const repCountEl = document.getElementById('repCount');
        const setCountEl = document.getElementById('setCount');
        const targetRepsInput = document.getElementById('targetRepsInput');
        const repDoneBtn = document.getElementById('repDoneBtn');
        const resetBtn = document.getElementById('resetBtn');
        const statusMessage = document.getElementById('statusMessage');
        const messageText = document.getElementById('messageText');

        // --- Utility Functions ---

        /**
         * Parses and returns the integer value for the target reps, defaulting to 10 if invalid.
         * @returns {number} The target reps value.
         */
        const getTargetReps = () => {
            const val = parseInt(targetRepsInput.value);
            return (val > 0) ? val : 1; // Target must be at least 1
        };

        /**
         * Displays a custom status message box (used instead of alert()).
         * @param {string} message The message to display.
         * @param {string} colorClass Tailwind class for text color.
         */
        const showMessage = (message, colorClass = 'text-green-400') => {
            messageText.textContent = message;
            messageText.className = `text-xl font-bold mb-4 ${colorClass}`;
            statusMessage.classList.remove('hidden');
            statusMessage.classList.add('flex');
        };

        /**
         * Hides the custom status message box.
         */
        const hideMessage = () => {
            statusMessage.classList.add('hidden');
            statusMessage.classList.remove('flex');
        };


        // --- Core Logic ---

        /**
         * Updates all display elements and button states based on the current rep count.
         */
        const updateDisplay = () => {
            repCountEl.textContent = currentReps;
            setCountEl.textContent = currentSets;

            const target = getTargetReps();
            isTargetMet = currentReps >= target;

            // Visual feedback for hitting the target
            if (isTargetMet && target > 0) {
                repCountEl.classList.remove('text-green-400', 'shadow-neon');
                repCountEl.classList.add('text-yellow-400');
                repDoneBtn.classList.add('opacity-40', 'cursor-not-allowed', 'bg-red-700');
                repDoneBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                repDoneBtn.disabled = true;
                repDoneBtn.textContent = "TARGET REACHED";
                resetBtn.textContent = "START NEXT SET (Auto-Increment Set)";
            } else {
                // Normal state
                repCountEl.classList.remove('text-yellow-400');
                repCountEl.classList.add('text-green-400');
                repDoneBtn.classList.remove('opacity-40', 'cursor-not-allowed', 'bg-red-700');
                repDoneBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                repDoneBtn.disabled = false;
                repDoneBtn.textContent = "REP DONE!";
                resetBtn.textContent = "RESET COUNT (Stay on Set " + currentSets + ")";
            }
        };

        /**
         * Handles the main action of incrementing the rep count.
         */
        repDoneBtn.addEventListener('click', () => {
            currentReps++;

            // If the target is met on this click, trigger the notification
            if (currentReps === getTargetReps()) {
                 showMessage('Awesome! Target of ' + getTargetReps() + ' Reps Reached!');
            }

            updateDisplay();
        });

        /**
         * Handles the secondary action: either moving to the next set or just resetting the reps.
         */
        resetBtn.addEventListener('click', () => {
            const target = getTargetReps();
            const wasTargetMet = currentReps >= target && target > 0;

            if (wasTargetMet) {
                // Only increment set count if target was successfully met
                currentSets++;
                showMessage(`Set ${currentSets - 1} Complete! Starting Set ${currentSets}.`, 'text-indigo-400');
            } else if (currentReps > 0) {
                // If reset is clicked before target, just reset the reps, don't change the set.
                showMessage(`Reps Reset to 0 on Set ${currentSets}.`, 'text-red-400');
            } else {
                 // Ignore clicks if already at 0 reps
                 return;
            }

            // Always reset the rep counter to 0
            currentReps = 0;

            // Clear any potential target message from a previous state change
            hideMessage();

            updateDisplay();
        });

        /**
         * Handles changes to the target input to re-evaluate the display state.
         */
        targetRepsInput.addEventListener('input', () => {
            // Ensure input is not too large or negative
            if (targetRepsInput.value < 1) {
                targetRepsInput.value = 1;
            }
            updateDisplay();
        });

        // Initialize state and display on load
        document.addEventListener('DOMContentLoaded', updateDisplay);
    </script>
</body>
</html>

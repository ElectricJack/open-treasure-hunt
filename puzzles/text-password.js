/**
 * Text Password Puzzle
 * Simple password entry puzzle
 */

const TextPasswordPuzzle = {
    name: "Text Password",
    description: "A simple text-based password puzzle",

    /**
     * Generate puzzle HTML
     * @param {Object} config - Puzzle configuration
     * @param {string} config.question - The question to display
     * @param {string} config.hint - Optional hint
     * @param {string} config.gateName - Name of the gate to unlock
     * @returns {string} HTML string
     */
    generate: function(config) {
        const { question, hint, gateName } = config;

        return `
            <div class="card">
                <div class="card-header">
                    <h5>🔐 Password Puzzle</h5>
                </div>
                <div class="card-body">
                    <p>${question}</p>
                    ${hint ? `<p class="text-muted"><small><em>Hint: ${hint}</em></small></p>` : ''}
                    <div class="mt-3">
                        <input type="text" class="form-control mb-2" id="puzzle-answer-${gateName}"
                               placeholder="Enter your answer">
                        <button class="btn btn-primary" onclick="TreasureHunt.attemptUnlock('${gateName}', document.getElementById('puzzle-answer-${gateName}').value)">
                            Submit Answer
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Example configuration
     */
    example: {
        question: "What is the capital of France?",
        hint: "City of lights",
        gateName: "gate1",
        answer: "Paris"  // This would be used as the encryption password
    }
};

// Export for use in builder
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TextPasswordPuzzle;
}

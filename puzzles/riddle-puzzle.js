/**
 * Riddle Puzzle
 * Classic riddle-based puzzle
 */

const RiddlePuzzle = {
    name: "Riddle Puzzle",
    description: "Solve a riddle to find the answer",

    /**
     * Generate puzzle HTML
     * @param {Object} config - Puzzle configuration
     * @param {string} config.riddle - The riddle text
     * @param {string} config.hint - Optional hint
     * @param {string} config.gateName - Name of the gate to unlock
     * @returns {string} HTML string
     */
    generate: function(config) {
        const { riddle, hint, gateName } = config;

        return `
            <div class="card">
                <div class="card-header">
                    <h5>🤔 Riddle</h5>
                </div>
                <div class="card-body">
                    <p class="fst-italic">"${riddle}"</p>
                    ${hint ? `<p class="text-muted mt-3"><small><em>Hint: ${hint}</em></small></p>` : ''}
                    <div class="mt-3">
                        <input type="text" class="form-control mb-2" id="puzzle-answer-${gateName}"
                               placeholder="What am I?">
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
        riddle: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        hint: "Think about sound",
        gateName: "gate1",
        answer: "echo"
    }
};

// Export for use in builder
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RiddlePuzzle;
}

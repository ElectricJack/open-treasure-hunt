/**
 * Math Puzzle
 * Mathematical equation puzzle
 */

const MathPuzzle = {
    name: "Math Puzzle",
    description: "Solve a mathematical equation",

    /**
     * Generate puzzle HTML
     * @param {Object} config - Puzzle configuration
     * @param {string} config.equation - The equation to display
     * @param {string} config.hint - Optional hint
     * @param {string} config.gateName - Name of the gate to unlock
     * @returns {string} HTML string
     */
    generate: function(config) {
        const { equation, hint, gateName } = config;

        return `
            <div class="card">
                <div class="card-header">
                    <h5>🔢 Math Puzzle</h5>
                </div>
                <div class="card-body">
                    <p>Solve the equation:</p>
                    <h4 class="text-center my-3">${equation}</h4>
                    ${hint ? `<p class="text-muted"><small><em>Hint: ${hint}</em></small></p>` : ''}
                    <div class="mt-3">
                        <input type="number" class="form-control mb-2" id="puzzle-answer-${gateName}"
                               placeholder="Enter the answer">
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
        equation: "42 × 2 - 7 = ?",
        hint: "Remember order of operations",
        gateName: "gate1",
        answer: "77"  // This would be used as the encryption password
    }
};

// Export for use in builder
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MathPuzzle;
}

/**
 * Caesar Cipher Puzzle
 * Decode a Caesar cipher to find the answer
 */

const CaesarCipherPuzzle = {
    name: "Caesar Cipher",
    description: "Decode a Caesar cipher",

    /**
     * Encode text using Caesar cipher
     * @param {string} text - Text to encode
     * @param {number} shift - Shift amount
     * @returns {string} Encoded text
     */
    encode: function(text, shift) {
        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                const isUpperCase = code >= 65 && code <= 90;
                const base = isUpperCase ? 65 : 97;
                return String.fromCharCode(((code - base + shift) % 26) + base);
            }
            return char;
        }).join('');
    },

    /**
     * Generate puzzle HTML
     * @param {Object} config - Puzzle configuration
     * @param {string} config.encodedMessage - The encoded message
     * @param {number} config.shift - The shift amount (for verification)
     * @param {string} config.hint - Optional hint
     * @param {string} config.gateName - Name of the gate to unlock
     * @returns {string} HTML string
     */
    generate: function(config) {
        const { encodedMessage, shift, hint, gateName } = config;

        return `
            <div class="card">
                <div class="card-header">
                    <h5>🔤 Caesar Cipher</h5>
                </div>
                <div class="card-body">
                    <p>Decode this message to find the password:</p>
                    <div class="alert alert-secondary text-center">
                        <code style="font-size: 1.2em;">${encodedMessage}</code>
                    </div>
                    ${hint ? `<p class="text-muted"><small><em>Hint: ${hint}</em></small></p>` : ''}
                    <div class="mt-3">
                        <label class="form-label">Decoded message:</label>
                        <input type="text" class="form-control mb-2" id="puzzle-answer-${gateName}"
                               placeholder="Enter the decoded message">
                        <button class="btn btn-primary" onclick="TreasureHunt.attemptUnlock('${gateName}', document.getElementById('puzzle-answer-${gateName}').value)">
                            Submit Answer
                        </button>
                    </div>
                    <div class="mt-3">
                        <details>
                            <summary class="text-muted" style="cursor: pointer;">What is a Caesar cipher?</summary>
                            <p class="mt-2 small">A Caesar cipher shifts each letter in the message by a fixed number of positions in the alphabet. For example, with a shift of 3, A becomes D, B becomes E, etc.</p>
                        </details>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Example configuration
     */
    example: {
        encodedMessage: "WUHDVXUH",  // "TREASURE" with shift of 3
        shift: 3,
        hint: "Try shifting by 3",
        gateName: "gate1",
        answer: "TREASURE"
    }
};

// Export for use in builder
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CaesarCipherPuzzle;
}

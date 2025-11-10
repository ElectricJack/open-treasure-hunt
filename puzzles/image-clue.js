/**
 * Image Clue Puzzle
 * Use an image as a clue (could contain text, QR code, or visual hints)
 */

const ImageCluePuzzle = {
    name: "Image Clue",
    description: "Decode a clue from an image",

    /**
     * Generate puzzle HTML
     * @param {Object} config - Puzzle configuration
     * @param {string} config.imageData - Base64 encoded image or URL
     * @param {string} config.description - Description of what to look for
     * @param {string} config.hint - Optional hint
     * @param {string} config.gateName - Name of the gate to unlock
     * @returns {string} HTML string
     */
    generate: function(config) {
        const { imageData, description, hint, gateName } = config;

        return `
            <div class="card">
                <div class="card-header">
                    <h5>🖼️ Image Clue</h5>
                </div>
                <div class="card-body">
                    <p>${description}</p>
                    <div class="text-center my-3">
                        <img src="${imageData}" alt="Puzzle clue" style="max-width: 100%; max-height: 400px; border-radius: 8px;">
                    </div>
                    ${hint ? `<p class="text-muted"><small><em>Hint: ${hint}</em></small></p>` : ''}
                    <div class="mt-3">
                        <input type="text" class="form-control mb-2" id="puzzle-answer-${gateName}"
                               placeholder="Enter the answer from the image">
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
        imageData: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5URUFTVVJFPC90ZXh0Pjwvc3ZnPg==",
        description: "Look at the image carefully. What word do you see?",
        hint: "Read the text in the image",
        gateName: "gate1",
        answer: "TREASURE"
    }
};

// Export for use in builder
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageCluePuzzle;
}

/**
 * GPS Coordinate Puzzle
 * Find and enter GPS coordinates (great for hiking/outdoor hunts)
 */

const GPSCoordinatePuzzle = {
    name: "GPS Coordinate",
    description: "Navigate to a location and find the clue",

    /**
     * Generate puzzle HTML
     * @param {Object} config - Puzzle configuration
     * @param {string} config.clue - Description of the location
     * @param {string} config.hint - Optional hint
     * @param {string} config.gateName - Name of the gate to unlock
     * @param {boolean} config.showMap - Whether to show a map link
     * @returns {string} HTML string
     */
    generate: function(config) {
        const { clue, hint, gateName, showMap, referenceCoordinate } = config;

        return `
            <div class="card">
                <div class="card-header">
                    <h5>📍 GPS Treasure Hunt</h5>
                </div>
                <div class="card-body">
                    <p>${clue}</p>
                    ${hint ? `<p class="text-muted"><small><em>Hint: ${hint}</em></small></p>` : ''}
                    ${referenceCoordinate ? `<p class="text-muted"><small>Reference coordinate: ${referenceCoordinate}</small></p>` : ''}

                    <div class="mt-3">
                        <label class="form-label">What you find at this location:</label>
                        <input type="text" class="form-control mb-2" id="puzzle-answer-${gateName}"
                               placeholder="Enter what you discovered">
                        <button class="btn btn-primary" onclick="TreasureHunt.attemptUnlock('${gateName}', document.getElementById('puzzle-answer-${gateName}').value)">
                            Submit Answer
                        </button>
                    </div>

                    <div class="mt-3">
                        <small class="text-muted">
                            💡 Tip: Use your phone's GPS or a GPS device to navigate to the location.
                            The password is something you'll find at the coordinates.
                        </small>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Example configuration
     */
    example: {
        clue: "Navigate to 40.7829° N, 73.9654° W. Look for the iconic landmark and find the password on the base.",
        hint: "This famous New York landmark lights up at night",
        gateName: "gate1",
        showMap: true,
        referenceCoordinate: "40.7829° N, 73.9654° W",
        answer: "central-park"  // What they'd find at the location
    }
};

// Export for use in builder
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GPSCoordinatePuzzle;
}

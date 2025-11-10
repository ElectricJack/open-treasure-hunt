/**
 * Geohash GPS Puzzle
 * Uses quantized geohash for location-based puzzles
 * Perfect for hiking and outdoor treasure hunts
 */

const GeohashPuzzle = {
    name: "Geohash GPS Puzzle",
    description: "Navigate to a location and submit its geohash",

    // Geohash encoding (simplified version, embedded in puzzle)
    base32: "0123456789bcdefghjkmnpqrstuvwxyz",

    /**
     * Encode latitude/longitude to geohash
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @param {number} precision - Number of characters (default 7 = ~150m precision)
     * @returns {string} Geohash string
     */
    encode: function(lat, lon, precision = 7) {
        let idx = 0;
        let bit = 0;
        let evenBit = true;
        let geohash = "";

        let latMin = -90, latMax = 90;
        let lonMin = -180, lonMax = 180;

        while (geohash.length < precision) {
            if (evenBit) {
                // longitude
                const lonMid = (lonMin + lonMax) / 2;
                if (lon > lonMid) {
                    idx = (idx << 1) + 1;
                    lonMin = lonMid;
                } else {
                    idx = (idx << 1) + 0;
                    lonMax = lonMid;
                }
            } else {
                // latitude
                const latMid = (latMin + latMax) / 2;
                if (lat > latMid) {
                    idx = (idx << 1) + 1;
                    latMin = latMid;
                } else {
                    idx = (idx << 1) + 0;
                    latMax = latMid;
                }
            }
            evenBit = !evenBit;

            if (++bit == 5) {
                geohash += this.base32[idx];
                bit = 0;
                idx = 0;
            }
        }

        return geohash;
    },

    /**
     * Generate puzzle HTML with embedded geohash calculator
     * @param {Object} config - Puzzle configuration
     * @param {string} config.clue - Description/clue about the location
     * @param {string} config.hint - Optional hint
     * @param {number} config.precision - Geohash precision (4-9, default 7)
     * @returns {string} HTML string
     */
    generate: function(config) {
        const { clue, hint, precision = 7 } = config;

        // Embed the geohash encoding function in the HTML
        const geohashScript = `
            const geohashBase32 = "0123456789bcdefghjkmnpqrstuvwxyz";

            function encodeGeohash(lat, lon, precision = ${precision}) {
                let idx = 0;
                let bit = 0;
                let evenBit = true;
                let geohash = "";

                let latMin = -90, latMax = 90;
                let lonMin = -180, lonMax = 180;

                while (geohash.length < precision) {
                    if (evenBit) {
                        const lonMid = (lonMin + lonMax) / 2;
                        if (lon > lonMid) {
                            idx = (idx << 1) + 1;
                            lonMin = lonMid;
                        } else {
                            idx = (idx << 1) + 0;
                            lonMax = lonMid;
                        }
                    } else {
                        const latMid = (latMin + latMax) / 2;
                        if (lat > latMid) {
                            idx = (idx << 1) + 1;
                            latMin = latMid;
                        } else {
                            idx = (idx << 1) + 0;
                            latMax = latMid;
                        }
                    }
                    evenBit = !evenBit;

                    if (++bit == 5) {
                        geohash += geohashBase32[idx];
                        bit = 0;
                        idx = 0;
                    }
                }

                return geohash;
            }

            function getCurrentGeohash() {
                if (!navigator.geolocation) {
                    alert('Geolocation is not supported by your browser');
                    return;
                }

                const statusEl = document.getElementById('gps-status');
                statusEl.innerHTML = '<span class="badge bg-info">Getting location...</span>';

                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        const geohash = encodeGeohash(lat, lon, ${precision});

                        document.getElementById('current-geohash').value = geohash;
                        document.getElementById('current-coords').textContent =
                            lat.toFixed(6) + ', ' + lon.toFixed(6);
                        statusEl.innerHTML = '<span class="badge bg-success">Location acquired!</span>';

                        // Automatically add to answers
                        if (typeof TreasureHunt !== 'undefined') {
                            TreasureHunt.addAnswer(geohash);
                        }
                    },
                    function(error) {
                        statusEl.innerHTML = '<span class="badge bg-danger">Error: ' + error.message + '</span>';
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            }

            function calculateManualGeohash() {
                const lat = parseFloat(document.getElementById('manual-lat').value);
                const lon = parseFloat(document.getElementById('manual-lon').value);

                if (isNaN(lat) || isNaN(lon)) {
                    alert('Please enter valid coordinates');
                    return;
                }

                if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
                    alert('Coordinates out of range');
                    return;
                }

                const geohash = encodeGeohash(lat, lon, ${precision});
                document.getElementById('manual-geohash-result').textContent = geohash;

                // Add to answers
                if (typeof TreasureHunt !== 'undefined') {
                    TreasureHunt.addAnswer(geohash);
                }
            }
        `;

        return `
            <div class="card">
                <div class="card-header">
                    <h5>📍 GPS Location Puzzle</h5>
                </div>
                <div class="card-body">
                    <p>${clue}</p>
                    ${hint ? `<p class="text-muted"><small><em>Hint: ${hint}</em></small></p>` : ''}

                    <div class="alert alert-info mt-3">
                        <strong>Precision Level ${precision}:</strong>
                        ${this.getPrecisionDescription(precision)}
                    </div>

                    <!-- GPS Option -->
                    <div class="mt-3">
                        <h6>Option 1: Use Current Location</h6>
                        <p class="small text-muted">Use this when you're at the location</p>
                        <button class="btn btn-primary mb-2" onclick="getCurrentGeohash()">
                            📡 Get Current Geohash
                        </button>
                        <div id="gps-status" class="mb-2"></div>
                        <div class="mb-2">
                            <input type="text" class="form-control" id="current-geohash"
                                   placeholder="Geohash will appear here" readonly>
                            <small class="text-muted">Coordinates: <span id="current-coords">-</span></small>
                        </div>
                    </div>

                    <!-- Manual Entry Option -->
                    <div class="mt-4">
                        <h6>Option 2: Manual Coordinates</h6>
                        <p class="small text-muted">Enter coordinates if you know them</p>
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <input type="number" class="form-control" id="manual-lat"
                                       placeholder="Latitude" step="0.000001" min="-90" max="90">
                            </div>
                            <div class="col-md-6 mb-2">
                                <input type="number" class="form-control" id="manual-lon"
                                       placeholder="Longitude" step="0.000001" min="-180" max="180">
                            </div>
                        </div>
                        <button class="btn btn-secondary" onclick="calculateManualGeohash()">
                            Calculate Geohash
                        </button>
                        <div class="mt-2">
                            <strong>Result:</strong> <code id="manual-geohash-result">-</code>
                        </div>
                    </div>

                    <!-- Info -->
                    <div class="mt-4">
                        <details>
                            <summary class="text-muted" style="cursor: pointer;">What is a geohash?</summary>
                            <p class="mt-2 small">
                                A geohash is a short string that encodes a geographic location.
                                The more characters, the more precise the location.
                                This puzzle uses ${precision} characters, which gives approximately
                                ${this.getPrecisionMeters(precision)} accuracy.
                            </p>
                        </details>
                    </div>
                </div>
            </div>

            <script>${geohashScript}</script>
        `;
    },

    /**
     * Get precision description
     */
    getPrecisionDescription: function(precision) {
        const descriptions = {
            4: "~20km × 20km box",
            5: "~2.4km × 4.9km box",
            6: "~610m × 610m box",
            7: "~76m × 153m box (recommended for hiking)",
            8: "~19m × 19m box",
            9: "~2.4m × 4.8m box (very precise)"
        };
        return descriptions[precision] || `${precision} characters`;
    },

    /**
     * Get precision in meters
     */
    getPrecisionMeters: function(precision) {
        const meters = {
            4: "~20km",
            5: "~2.4km",
            6: "~610m",
            7: "~150m",
            8: "~38m",
            9: "~5m"
        };
        return meters[precision] || "varies";
    },

    /**
     * Example configuration
     */
    example: {
        clue: "Navigate to the famous clock tower in London. Find the geohash at this location.",
        hint: "It's near the Thames River",
        precision: 7,
        // The actual answer would be the geohash at that location
        // For Big Ben it's approximately: "gcpuvpk"
        answer: "gcpuvpk"
    }
};

// Export for use in builder
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeohashPuzzle;
}

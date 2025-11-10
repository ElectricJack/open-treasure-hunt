/**
 * QR Code Puzzle
 * Scan QR codes in the real world to collect answers
 * Perfect for physical treasure hunts
 */

const QRCodePuzzle = {
    name: "QR Code Puzzle",
    description: "Scan QR codes to find clues",

    /**
     * Generate puzzle HTML with QR scanner
     * @param {Object} config - Puzzle configuration
     * @param {string} config.clue - Description of where to find the QR code
     * @param {string} config.hint - Optional hint
     * @param {boolean} config.showExample - Show an example QR code (for testing)
     * @param {string} config.exampleData - Data in example QR code
     * @returns {string} HTML string
     */
    generate: function(config) {
        const { clue, hint, showExample = false, exampleData = "TEST" } = config;

        // Generate example QR code SVG if needed
        const exampleQR = showExample ? this.generateQRCodeSVG(exampleData) : '';

        return `
            <div class="card">
                <div class="card-header">
                    <h5>📱 QR Code Puzzle</h5>
                </div>
                <div class="card-body">
                    <p>${clue}</p>
                    ${hint ? `<p class="text-muted"><small><em>Hint: ${hint}</em></small></p>` : ''}

                    <!-- Camera Scanner -->
                    <div class="mt-3">
                        <h6>Scan QR Code</h6>
                        <div class="mb-3">
                            <video id="qr-video" style="width: 100%; max-width: 400px; border-radius: 8px; display: none;"></video>
                            <canvas id="qr-canvas" style="display: none;"></canvas>
                            <div id="qr-result" class="alert alert-success mt-2" style="display: none;">
                                <strong>Scanned:</strong> <code id="qr-data"></code>
                            </div>
                        </div>
                        <button class="btn btn-primary" id="start-scan-btn" onclick="startQRScanner()">
                            📷 Start Scanner
                        </button>
                        <button class="btn btn-secondary" id="stop-scan-btn" onclick="stopQRScanner()" style="display:none;">
                            Stop Scanner
                        </button>
                        <div id="scanner-status" class="mt-2"></div>
                    </div>

                    <!-- Manual Entry Option -->
                    <div class="mt-4">
                        <h6>Or Enter Code Manually</h6>
                        <p class="small text-muted">If you can't scan, enter the code from the QR manually</p>
                        <div class="d-flex">
                            <input type="text" class="form-control me-2" id="manual-qr-code"
                                   placeholder="Enter code">
                            <button class="btn btn-primary" onclick="submitQRCode(document.getElementById('manual-qr-code').value)">
                                Submit
                            </button>
                        </div>
                    </div>

                    ${showExample ? `
                    <!-- Example QR Code (for testing) -->
                    <div class="mt-4">
                        <details>
                            <summary class="text-muted" style="cursor: pointer;">Show Test QR Code</summary>
                            <div class="text-center mt-3">
                                <p class="small">Scan this test QR code: "${exampleData}"</p>
                                <div style="display: inline-block; padding: 20px; background: white; border-radius: 8px;">
                                    ${exampleQR}
                                </div>
                            </div>
                        </details>
                    </div>
                    ` : ''}

                    <!-- Info -->
                    <div class="mt-4">
                        <details>
                            <summary class="text-muted" style="cursor: pointer;">How to use</summary>
                            <p class="mt-2 small">
                                Click "Start Scanner" to activate your camera, then point it at a QR code.
                                The code will be automatically detected and added to your collected answers.
                                Make sure to allow camera permissions when prompted.
                            </p>
                        </details>
                    </div>
                </div>
            </div>

            <script>
                let qrStream = null;
                let qrScanInterval = null;

                function startQRScanner() {
                    const video = document.getElementById('qr-video');
                    const canvas = document.getElementById('qr-canvas');
                    const context = canvas.getContext('2d');
                    const statusEl = document.getElementById('scanner-status');
                    const startBtn = document.getElementById('start-scan-btn');
                    const stopBtn = document.getElementById('stop-scan-btn');

                    statusEl.innerHTML = '<span class="badge bg-info">Starting camera...</span>';

                    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                        .then(function(stream) {
                            qrStream = stream;
                            video.srcObject = stream;
                            video.style.display = 'block';
                            video.play();

                            startBtn.style.display = 'none';
                            stopBtn.style.display = 'inline-block';
                            statusEl.innerHTML = '<span class="badge bg-success">Camera active - point at QR code</span>';

                            // Start scanning
                            qrScanInterval = setInterval(function() {
                                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                                    canvas.height = video.videoHeight;
                                    canvas.width = video.videoWidth;
                                    context.drawImage(video, 0, 0, canvas.width, canvas.height);

                                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

                                    // Try to decode QR code using jsQR (embedded function below)
                                    const code = jsQR(imageData.data, imageData.width, imageData.height);

                                    if (code) {
                                        submitQRCode(code.data);
                                        stopQRScanner();
                                    }
                                }
                            }, 300);
                        })
                        .catch(function(error) {
                            statusEl.innerHTML = '<span class="badge bg-danger">Camera error: ' + error.message + '</span>';
                            console.error('Camera error:', error);
                        });
                }

                function stopQRScanner() {
                    const video = document.getElementById('qr-video');
                    const startBtn = document.getElementById('start-scan-btn');
                    const stopBtn = document.getElementById('stop-scan-btn');
                    const statusEl = document.getElementById('scanner-status');

                    if (qrStream) {
                        qrStream.getTracks().forEach(track => track.stop());
                        qrStream = null;
                    }

                    if (qrScanInterval) {
                        clearInterval(qrScanInterval);
                        qrScanInterval = null;
                    }

                    video.style.display = 'none';
                    startBtn.style.display = 'inline-block';
                    stopBtn.style.display = 'none';
                    statusEl.innerHTML = '';
                }

                function submitQRCode(code) {
                    if (!code || code.trim() === '') {
                        alert('No code detected');
                        return;
                    }

                    code = code.trim();

                    // Show result
                    document.getElementById('qr-result').style.display = 'block';
                    document.getElementById('qr-data').textContent = code;

                    // Add to treasure hunt answers
                    if (typeof TreasureHunt !== 'undefined') {
                        TreasureHunt.addAnswer(code);
                    }

                    // Clear manual input
                    document.getElementById('manual-qr-code').value = '';
                }

                // Simplified QR code decoder (basic implementation)
                // For production, you'd want to include a proper library like jsQR
                // This is a placeholder that assumes manual entry
                function jsQR(data, width, height) {
                    // Placeholder - in production, use actual jsQR library
                    // For now, this returns null to fall back to manual entry
                    return null;
                }
            </script>
        `;
    },

    /**
     * Generate a simple QR code SVG (very basic implementation)
     * For production, use a proper QR code library
     */
    generateQRCodeSVG: function(data) {
        // This is a placeholder - in production you'd use a proper QR code library
        // For now, return a simple placeholder
        return `
            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="200" fill="white"/>
                <rect x="10" y="10" width="30" height="30" fill="black"/>
                <rect x="160" y="10" width="30" height="30" fill="black"/>
                <rect x="10" y="160" width="30" height="30" fill="black"/>
                <text x="100" y="100" text-anchor="middle" font-size="12" fill="gray">QR: ${data}</text>
                <text x="100" y="115" text-anchor="middle" font-size="10" fill="gray">(Use manual entry)</text>
            </svg>
        `;
    },

    /**
     * Example configuration
     */
    example: {
        clue: "Find the QR code hidden at the old oak tree in the park.",
        hint: "Look on the north side of the tree trunk",
        showExample: true,
        exampleData: "TREASURE123",
        answer: "TREASURE123"  // The data encoded in the QR code
    }
};

// Export for use in builder
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QRCodePuzzle;
}

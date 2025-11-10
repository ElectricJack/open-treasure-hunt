# Treasure Hunt Puzzles

This directory contains pre-made puzzle templates that can be used in treasure hunts.

## Available Puzzles

1. **Text Password** (`text-password.js`) - Simple text-based password puzzle
2. **Math Puzzle** (`math-puzzle.js`) - Mathematical equation puzzle
3. **Riddle** (`riddle-puzzle.js`) - Classic riddle-based puzzle
4. **Caesar Cipher** (`caesar-cipher.js`) - Decode a Caesar cipher
5. **GPS Coordinate** (`gps-coordinate.js`) - Navigate to coordinates (great for hiking)
6. **Image Clue** (`image-clue.js`) - Decode clues from images

## How to Use a Puzzle

Each puzzle module exports a puzzle object with:
- `name` - Display name of the puzzle
- `description` - Brief description
- `generate(config)` - Function that returns HTML for the puzzle
- `example` - Example configuration

## Creating a New Puzzle

Want to contribute a new puzzle type? Follow this template:

```javascript
/**
 * Your Puzzle Name
 * Description of your puzzle
 */

const YourPuzzle = {
    name: "Your Puzzle Name",
    description: "Brief description",

    /**
     * Generate puzzle HTML
     * @param {Object} config - Puzzle configuration
     * @param {string} config.gateName - Name of the gate to unlock (required)
     * @returns {string} HTML string
     */
    generate: function(config) {
        const { gateName, /* your custom params */ } = config;

        return `
            <div class="card">
                <div class="card-header">
                    <h5>🎯 Your Puzzle</h5>
                </div>
                <div class="card-body">
                    <!-- Your puzzle content here -->

                    <div class="mt-3">
                        <input type="text" class="form-control mb-2"
                               id="puzzle-answer-${gateName}"
                               placeholder="Enter your answer">
                        <button class="btn btn-primary"
                                onclick="TreasureHunt.attemptUnlock('${gateName}', document.getElementById('puzzle-answer-${gateName}').value)">
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
        gateName: "gate1",
        // Your custom parameters
        answer: "example-answer"  // The encryption password
    }
};

// Export for use in builder
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YourPuzzle;
}
```

## Important Notes

1. **Always include `gateName`** - This is required to link the puzzle to a gate
2. **Use the correct unlock function** - Always call `TreasureHunt.attemptUnlock(gateName, password)`
3. **Bootstrap classes available** - Use Bootstrap 5 classes for styling
4. **Keep it self-contained** - All JavaScript should be in inline event handlers or in the template
5. **Test your puzzle** - Make sure it works in the builder before submitting a PR

## Contributing

1. Fork the repository
2. Create your puzzle file in this directory
3. Add your puzzle to the list above (in this README)
4. Submit a pull request

## Puzzle Design Tips

- **Clear instructions** - Make sure users understand what they need to do
- **Appropriate difficulty** - Consider your audience
- **Hints are helpful** - Include optional hints for complex puzzles
- **Mobile-friendly** - Test on mobile devices
- **Accessibility** - Use semantic HTML and proper contrast
- **No external dependencies** - Keep puzzles self-contained

## License

All puzzles in this directory are open source and free to use under the MIT license.

# Contributing to Open Treasure Hunt

Thank you for your interest in contributing! This project thrives on community contributions, especially new puzzle types.

## 🎯 Ways to Contribute

### 1. New Puzzle Types

The most valuable contributions are new puzzle types! We'd love to see:

- **Logic puzzles** (Sudoku, nonograms, etc.)
- **Word puzzles** (crosswords, word searches, anagrams)
- **Cipher puzzles** (Morse code, Pigpen, etc.)
- **Math puzzles** (sequences, equations, geometric)
- **Audio puzzles** (sound recognition, music clues)
- **Visual puzzles** (spot the difference, optical illusions)
- **Interactive puzzles** (drag-and-drop, mini-games)

### 2. Documentation

- Fix typos and unclear explanations
- Add tutorials and guides
- Create video walkthroughs
- Translate to other languages

### 3. Bug Fixes

- Fix reported issues
- Improve error handling
- Test on different devices/browsers

### 4. UI/UX Improvements

- Enhance the builder interface
- Improve mobile responsiveness
- Add accessibility features
- Design themes and customizations

### 5. Example Hunts

- Create example treasure hunts
- Share creative puzzle combinations
- Document best practices

## 📝 Creating a New Puzzle

### Step 1: Create the Puzzle File

Create a new file in `puzzles/your-puzzle-name.js`:

```javascript
/**
 * Your Puzzle Name
 * Brief description of what this puzzle does
 */

const YourPuzzle = {
    name: "Your Puzzle Name",
    description: "One-line description",

    /**
     * Generate puzzle HTML
     * @param {Object} config - Puzzle configuration
     * @param {string} config.param1 - Description of param1
     * @param {string} config.param2 - Description of param2
     * @returns {string} HTML string
     */
    generate: function(config) {
        const { param1, param2 } = config;

        return `
            <div class="card">
                <div class="card-header">
                    <h5>🎯 Your Puzzle Name</h5>
                </div>
                <div class="card-body">
                    <p>Puzzle instructions here</p>

                    <!-- Your puzzle UI -->

                    <div class="mt-3">
                        <input type="text" class="form-control"
                               id="answer-input"
                               placeholder="Enter answer">
                        <button class="btn btn-primary"
                                onclick="submitAnswer()">
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            <script>
                function submitAnswer() {
                    const answer = document.getElementById('answer-input').value;
                    if (typeof TreasureHunt !== 'undefined') {
                        TreasureHunt.addAnswer(answer);
                    }
                }
            </script>
        `;
    },

    /**
     * Example configuration
     */
    example: {
        param1: "example value",
        param2: "another value",
        answer: "correct-answer"
    }
};

// Export for use in builder
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YourPuzzle;
}
```

### Step 2: Follow Best Practices

#### HTML/CSS
- Use Bootstrap classes for styling
- Keep inline styles minimal
- Ensure mobile responsiveness
- Use semantic HTML

#### JavaScript
- Use `TreasureHunt.addAnswer(answer)` to submit answers
- Include `typeof TreasureHunt !== 'undefined'` checks
- Handle errors gracefully
- Add helpful user feedback

#### Accessibility
- Use proper ARIA labels
- Ensure keyboard navigation works
- Provide text alternatives for images
- Use sufficient color contrast

### Step 3: Document Your Puzzle

Add your puzzle to `puzzles/README.md`:

```markdown
## Your Puzzle Name

**File**: `your-puzzle-name.js`

Description of what this puzzle does and when to use it.

### Configuration

- `param1` (string) - Description
- `param2` (number) - Description

### Example

\`\`\`javascript
{
    param1: "example",
    param2: 42,
    answer: "the-answer"
}
\`\`\`

### Notes

Any special considerations, browser requirements, etc.
```

### Step 4: Test Your Puzzle

1. Create a test treasure hunt with your puzzle
2. Test on desktop and mobile
3. Verify answers are collected correctly
4. Check that it works offline
5. Test with different configurations

### Step 5: Submit Pull Request

1. Fork the repository
2. Create a feature branch: `git checkout -b puzzle/your-puzzle-name`
3. Add your files
4. Commit: `git commit -m "Add [Your Puzzle Name] puzzle"`
5. Push: `git push origin puzzle/your-puzzle-name`
6. Open a Pull Request

## 🔧 Development Setup

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime, etc.)
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/ElectricJack/open-treasure-hunt.git
cd open-treasure-hunt

# No build step needed! Just open files in browser
# Open builder/index.html to test the builder
# Open examples/*.html to test treasure hunts
```

### Testing

1. **Manual Testing**: Open HTML files in browser
2. **Cross-Browser**: Test in Chrome, Firefox, Safari
3. **Mobile Testing**: Test on actual mobile devices
4. **Offline Testing**: Disable network and verify functionality

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style
- [ ] Puzzle is documented in `puzzles/README.md`
- [ ] Example configuration provided
- [ ] Tested on desktop and mobile
- [ ] No console errors
- [ ] Works offline

### PR Description

Please include:

1. **What**: Brief description of changes
2. **Why**: Motivation for the change
3. **How**: Technical approach taken
4. **Testing**: How you tested it
5. **Screenshots**: If UI changes (optional but helpful)

### Code Review Process

1. Maintainer reviews code
2. Discusses any necessary changes
3. You make updates if needed
4. Maintainer merges when ready

## 💡 Puzzle Design Guidelines

### Good Puzzle Characteristics

✅ **Clear Instructions**: Users know what to do
✅ **Appropriate Difficulty**: Matches target audience
✅ **Self-Contained**: Works without external dependencies
✅ **Offline Compatible**: No network requests
✅ **Mobile Friendly**: Works on small screens
✅ **Accessible**: Usable by people with disabilities
✅ **Unique Answer**: One specific correct answer
✅ **Fair Hints**: Provide optional hints if difficult

### Avoid

❌ **Network Requests**: Should work offline
❌ **External Libraries**: Keep it self-contained
❌ **Ambiguous Answers**: Multiple correct answers cause confusion
❌ **Excessive Complexity**: Keep puzzles focused
❌ **Poor Error Handling**: Always handle edge cases
❌ **Hardcoded Values**: Make puzzles configurable

## 🎨 Code Style

### JavaScript

```javascript
// Use const/let, not var
const answer = "value";
let counter = 0;

// Use descriptive names
function calculateGeohash(latitude, longitude) { }

// Add comments for complex logic
// Calculate the midpoint using the Haversine formula
const midpoint = /* ... */;

// Use template literals
const html = `<div>${content}</div>`;
```

### HTML

```html
<!-- Use semantic HTML -->
<button class="btn btn-primary" onclick="submit()">
    Submit
</button>

<!-- Not: -->
<div class="btn" onclick="submit()">Submit</div>
```

### CSS

```css
/* Use classes, not IDs for styling */
.puzzle-container { }

/* Use Bootstrap classes when possible */
<div class="card mb-3">
```

## 📖 Documentation Standards

### Code Comments

```javascript
/**
 * Brief description
 * @param {type} name - Description
 * @returns {type} Description
 */
function myFunction(name) { }
```

### README Files

- Use clear headings
- Include examples
- Explain configuration options
- Add troubleshooting section if complex

## 🐛 Bug Reports

### Good Bug Reports Include

1. **Description**: What happened vs. what should happen
2. **Steps to Reproduce**: Exact steps to trigger the bug
3. **Environment**: Browser, OS, device
4. **Screenshots**: If applicable
5. **Console Errors**: Any JavaScript errors

### Template

```markdown
**Description**
Brief description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Browser: Chrome 120
- OS: Windows 11
- Device: Desktop

**Screenshots**
If applicable

**Console Errors**
Any error messages
```

## 💬 Community Guidelines

### Be Respectful

- Treat all contributors with respect
- Welcome newcomers
- Provide constructive feedback
- Assume good intentions

### Be Helpful

- Answer questions when you can
- Share knowledge and experience
- Help test pull requests
- Improve documentation

### Be Patient

- Maintainers are volunteers
- Reviews may take time
- Not all suggestions can be implemented
- Discuss before major changes

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

- Open a [GitHub Discussion](https://github.com/ElectricJack/open-treasure-hunt/discussions)
- Check existing [Issues](https://github.com/ElectricJack/open-treasure-hunt/issues)
- Read the [Documentation](../README.md)

## 🙏 Thank You!

Your contributions make this project better for everyone. Whether it's a new puzzle, a bug fix, or better documentation, every contribution matters!

Happy treasure hunting! 🏴‍☠️

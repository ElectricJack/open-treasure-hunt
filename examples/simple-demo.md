# Simple Demo Treasure Hunt

This is a basic example treasure hunt to demonstrate the framework.

## How to Use This Example

1. Open `simple-demo.html` in your web browser
2. Read the clues and solve the puzzles
3. Collect answers using the Key Composer
4. Try different key combinations to unlock sections

## Spoilers - Solutions

If you want to test without solving:

### Section 1: "first-gate"
- **Puzzle**: Math puzzle - What is 6 × 7?
- **Answer**: `42`
- **Password**: `42`

### Section 2: "second-gate"
- **Puzzle 1**: What is the capital of France?
- **Answer 1**: `Paris`
- **Puzzle 2**: What year did World War II end?
- **Answer 2**: `1945`
- **Password**: `Paris1945` (concatenated)

### Section 3: "final-treasure"
- **Requires**: Answers from first two sections
- **Password**: `4219451Paris` (sorted alphabetically)

## Creating Your Own

Use this example as a template:

1. Open the builder at `builder/index.html`
2. Set your hunt title
3. Add puzzles to the home content
4. Create encrypted sections with passwords
5. Export and test!

## Notes

- All sections work offline after initial load
- Progress is saved in browser localStorage
- Refresh the page with "Reset Hunt" to start over
- View source to see the encrypted sections (you can't decrypt them without passwords!)

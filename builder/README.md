# Treasure Hunt Builder - User Guide

The visual treasure hunt builder makes it easy to create complex, encrypted treasure hunts without any coding.

## 🎯 Quick Start

1. Open `builder/index.html` in your web browser (or online at GitHub Pages)
2. Fill in your hunt title
3. Create blocks (sections) for your treasure hunt
4. Add puzzles to blocks from the puzzle library
5. Define gates in blocks that unlock other blocks
6. Export as a single HTML file with progressive puzzle discovery

## ✨ What's New - Block-Centric Architecture

The builder now uses a **block-centric architecture** where:
- Each block contains its own puzzles and gates
- Puzzles and gates are only revealed when their parent block is unlocked
- Gates reference puzzles within the same block
- Progressive discovery keeps the hunt mysterious

## 📦 Blocks & Content

### What are Blocks?

Blocks are sections of your treasure hunt. Each block can contain:
- Story text
- Images
- Puzzles

### Types of Blocks

**Start Block:**
- Always visible to hunters
- Can't be deleted
- Contains initial puzzles and story

**Locked Blocks:**
- Hidden until unlocked
- Require solving puzzles (via gates)
- Contain encrypted content

### Creating a Block

1. Click "📦 Blocks & Content" in sidebar
2. Click "+ Add Block"
3. Fill in:
   - **Block Name**: Display name (e.g., "Chapter 1")
   - **Block ID**: Unique identifier (auto-generated)
   - **Type**: Start or Locked
   - **Unlock Gate**: Which gate unlocks this (locked blocks only)
   - **Story Content**: Your narrative text
   - **Image**: Optional image upload

### Tips for Blocks

- Use descriptive names that hint at content
- Keep story text focused and engaging
- Images are embedded as base64 (increases file size)
- Start block should introduce the hunt

## 🧩 Puzzles

### What are Puzzles?

Puzzles generate answers that hunters collect. These answers become keys to unlock gates.

### Available Puzzle Types

1. **🔐 Text Password** - Simple password entry
   - Configure: Question, hint, expected answer
   - Best for: Trivia, simple clues

2. **🔢 Math Puzzle** - Mathematical equations
   - Configure: Equation, hint, expected answer
   - Best for: Numeric challenges

3. **🤔 Riddle** - Classic riddles
   - Configure: Riddle text, hint, expected answer
   - Best for: Word puzzles, creative thinking

4. **🔤 Caesar Cipher** - Decode shifted messages
   - Configure: Message, shift amount, hint
   - Best for: Cryptography challenges

5. **📍 GPS Location** - Navigate to coordinates
   - Configure: Location clue, precision level, expected geohash
   - Best for: Outdoor hunts, hiking
   - Uses geohash (quantized GPS coordinates)

6. **📱 QR Code** - Scan QR codes in real world
   - Configure: Where to find QR, hint, expected code
   - Best for: Physical treasure hunts
   - You provide the QR codes separately

7. **🖼️ Image Clue** - Visual puzzles
   - Configure: Image upload, description, hint, expected answer
   - Best for: Visual challenges, photo clues

### Adding a Puzzle

1. Click "🧩 Puzzles" in sidebar
2. Click "+ Add Puzzle"
3. Select puzzle type from library
4. Fill in configuration form:
   - **Puzzle Name**: Display name
   - **Puzzle ID**: Auto-generated
   - **Place in Block**: Which block contains this puzzle
   - **Type-specific fields**: Varies by puzzle type
   - **Expected Answer**: The correct answer (for testing)

### Important: Expected Answers

The **Expected Answer** field is crucial:
- Used to generate decryption keys
- NOT stored in the output file
- Case-sensitive
- Can contain any characters
- Should be memorable for testing

## 🔐 Gates & Keys

### What are Gates?

Gates control access to locked blocks. A gate:
- Requires one or more puzzle answers
- Combines answers into a decryption key
- Unlocks one or more blocks

### Creating a Gate

1. Click "🔐 Gates & Keys" in sidebar
2. Click "+ Add Gate"
3. Configure:
   - **Gate Name**: Descriptive name
   - **Gate ID**: Auto-generated
   - **Required Puzzles**: Check which puzzle answers are needed
   - **Key Composition Method**: How to combine answers
   - **Test Password**: Preview the composed key

### Key Composition Methods

**Concatenate (ABC):**
- Joins answers directly: `answer1answer2answer3`
- Example: "Paris" + "42" + "echo" → "Paris42echo"
- Use when: Simple combination needed

**Reverse (CBA):**
- Joins answers in reverse order: `answer3answer2answer1`
- Example: "Paris" + "42" + "echo" → "echo42Paris"
- Use when: Order is part of the puzzle

**Sorted Alphabetically:**
- Sorts then joins: `42Parisecho`
- Example: "Paris" + "42" + "echo" → "42Parisecho"
- Use when: Order shouldn't matter

**Joined with Hyphen (A-B-C):**
- Separates with hyphens: `answer1-answer2-answer3`
- Example: "Paris" + "42" + "echo" → "Paris-42-echo"
- Use when: Readability matters

**Custom Formula:**
- Use placeholders: `{0}`, `{1}`, `{2}`
- Example formula: `{2}-{0}-{1}`
- With answers: "Paris", "42", "echo"
- Result: "echo-Paris-42"
- Use when: Complex combinations needed

### Gate Strategy

**Simple Hunt:**
```
Start Block
  ├─ Puzzle 1: "What is 6×7?" (answer: 42)
  └─ Gate 1: Uses answer from Puzzle 1
       └─ Unlocks: Block 2
```

**Multi-Puzzle Gate:**
```
Start Block
  ├─ Puzzle 1: Math (answer: 42)
  ├─ Puzzle 2: Riddle (answer: echo)
  └─ Gate 1: Uses Puzzle 1 + Puzzle 2 (concatenate)
       └─ Unlocks: Block 2 (password: "42echo")
```

**Branching Hunt:**
```
Start Block
  ├─ Puzzle 1, 2, 3
  ├─ Gate 1: Puzzles 1+2 → Block 2
  └─ Gate 2: Puzzles 2+3 → Block 3

Block 2
  ├─ Puzzle 4
  └─ Gate 3: Puzzle 4 → Block 4
```

## 🗺️ Flow Diagram

The flow diagram shows your treasure hunt structure:
- **START**: Initial block with puzzles
- **🔐 GATE**: Gates and their requirements
- **📦 Blocks**: Unlocked blocks and their puzzles
- **🧩 Puzzles**: Which puzzles are in each block

Use this to verify your hunt logic before exporting.

## 📤 Export

### Before Exporting

Checklist:
- ✅ Hunt title is set
- ✅ Start block has puzzles
- ✅ At least one gate created
- ✅ Gates have puzzle requirements
- ✅ Locked blocks assigned to gates
- ✅ All expected answers are filled in
- ✅ Flow diagram looks correct

### Exporting Your Hunt

1. Click "📤 Export" in sidebar
2. Click "📦 Generate Treasure Hunt"
3. Wait for processing:
   - Loading template
   - Generating puzzles
   - Encrypting sections (uses Web Crypto API)
   - Building configuration
4. Download the generated HTML file automatically

### What Gets Exported

The generated file contains:
- Complete treasure hunt framework with Web Crypto API
- Start block HTML with all puzzles (visible)
- Encrypted locked blocks (AES-256-GCM encryption)
- Story content and images (embedded as base64)
- **No passwords or answers stored anywhere** (security!)
- Progressive discovery architecture

### How Encryption Works

1. For each gate in a block:
   - Composes password from puzzle answers using composition method
   - Generates HTML for the target block
   - Compresses the HTML (base64 encoding)
   - Encrypts with AES-256-GCM using PBKDF2 key derivation
   - Stores encrypted blob with block ID as key

2. In the treasure hunt:
   - Start block is always visible
   - Locked blocks appear as encrypted blobs
   - Hunters collect answers and compose keys
   - Successful decryption reveals the next block
   - New puzzles and gates progressively discovered

### File Size Considerations

Large files can result from:
- Multiple high-resolution images
- Many puzzles with complex content
- Lots of blocks

To reduce size:
- Compress images before upload
- Use external image hosting (breaks offline mode)
- Enable "Minify output" option

## 💾 Save & Load Projects

### Saving a Project

1. Click "💾 Save Project" in sidebar
2. Downloads a JSON file with your configuration
3. Contains all blocks, puzzles, gates
4. Does NOT contain encrypted content

### Loading a Project

1. Click "📂 Load Project" in sidebar
2. Select your saved JSON file
3. All configuration restored
4. Continue editing

### Project Files

- Format: JSON
- Contains: Complete builder state
- Use for: Backups, versioning, collaboration
- Note: Expected answers ARE included (keep secure!)

## 🎨 Best Practices

### Designing Your Hunt

**Start Strong:**
- First puzzle should be easy
- Introduce the theme/story
- Build excitement

**Progressive Difficulty:**
- Early puzzles: Simple, tutorial-like
- Middle puzzles: Moderate challenge
- Late puzzles: Complex, multi-step

**Story Integration:**
- Use block content for narrative
- Puzzles should feel natural
- Reward progress with story reveals

**Testing:**
- Test the complete flow
- Verify all keys work
- Try on mobile devices
- Test offline functionality

### Security Tips

**Password Selection:**
- Use complex answers for important gates
- Combine multiple puzzles
- Consider answer order
- Test that wrong answers fail

**Expected Answers:**
- Be consistent (case, spacing)
- Document for yourself
- Test before finalizing

**Distribution:**
- Save project file separately
- Don't share project files (contain answers)
- Only share generated HTML

## 🐛 Troubleshooting

### Export Fails

**Error: "Add at least one gate"**
- Create at least one gate
- Gates link puzzles to locked blocks

**Error: "Failed to load template"**
- Ensure `framework/treasure-hunt-template.html` exists
- Check file permissions
- Run builder from correct directory

### Blocks Won't Unlock

**In generated hunt:**
- Check key composition method
- Verify expected answers match exactly (case-sensitive)
- Try "Sorted" composition if order unclear
- Check all puzzles in gate are solved

### Images Not Showing

**In builder:**
- File size too large (> 5MB)
- Unsupported format (use JPG/PNG)

**In generated hunt:**
- Images embedded as base64 (should work)
- Check browser console for errors

## 📋 Example Workflows

### Simple Trivia Hunt

1. Create blocks: "Start", "Round 2", "Final"
2. Add 3 text password puzzles to Start
3. Create Gate 1: All 3 puzzles, concatenate
4. Gate 1 unlocks "Round 2"
5. Add 2 puzzles to Round 2
6. Create Gate 2: Round 2 puzzles
7. Gate 2 unlocks "Final"

### Outdoor GPS Hunt

1. Start block: Instructions
2. Add GPS puzzle: "Find the old oak tree"
3. Gate 1: GPS geohash → Block 2
4. Block 2: Next location clue
5. Add GPS puzzle: "Navigate to the viewpoint"
6. Gate 2: Second geohash → Block 3
7. Block 3: Congratulations!

### Mixed-Puzzle Adventure

1. Start: Story introduction + riddle
2. Block 2 (unlocked by riddle): Caesar cipher
3. Block 3 (unlocked by cipher): Math puzzle + Image clue
4. Gate combines both answers
5. Final block: Treasure reveal

## 🆘 Getting Help

- Check the main [README](../README.md)
- Review [Security docs](../docs/SECURITY.md)
- See [Contributing guide](../docs/CONTRIBUTING.md)
- Open GitHub issue for bugs

## 🎯 Next Steps

Ready to build? Start with:
1. Simple 2-block hunt
2. One puzzle type
3. One gate
4. Export and test
5. Gradually add complexity

Happy treasure hunting! 🏴‍☠️

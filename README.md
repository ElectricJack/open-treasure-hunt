# 🏴‍☠️ Open Treasure Hunt Framework

A free, open-source framework for creating self-contained, encrypted treasure hunting games. Everything runs in a single HTML file with no server required - perfect for hiking, geocaching, escape rooms, educational activities, and more!

## ✨ Features

- **🔒 Truly Secure**: No password data stored anywhere - not even encrypted hints
- **📱 Offline-First**: Works without internet after initial load (perfect for hiking)
- **🎯 Flexible Puzzles**: Support for text, math, riddles, GPS locations, QR codes, and more
- **🔑 Smart Key System**: Combine multiple puzzle answers to form decryption keys
- **📦 Single File**: Entire treasure hunt contained in one HTML file
- **🎨 Beautiful UI**: Built with Bootstrap for a polished experience
- **🛠️ Easy Builder**: Web-based tool to create hunts without coding
- **🔓 Open Source**: Fully auditable, free to use and modify

## 🎮 How It Works

### For Players

1. Open the treasure hunt HTML file
2. Solve puzzles to collect answers
3. Use collected answers to form decryption keys
4. Unlock hidden sections when you find the right key
5. Complete when all sections are unlocked!

### Security Model

**The framework is cryptographically secure because:**

- Passwords are never stored - even in encrypted form
- Sections are encrypted with AES-256-GCM
- Passwords are hashed with SHA-256 and strengthened with PBKDF2 (100,000 iterations)
- You only know if you succeeded when content decrypts successfully
- No metadata reveals what's in locked sections or how to unlock them
- Multiple puzzle answers can be combined in various ways to form keys

## 🛠️ Creating a Treasure Hunt

### Option 1: Use the Builder (Recommended)

1. Open `builder/index.html` in your browser
2. Set your hunt title and home content
3. Add encrypted sections with their passwords
4. Click "Generate Treasure Hunt" to download your HTML file
5. Share the file with your hunters!

### Option 2: Manual Creation

1. Start with `framework/treasure-hunt-template.html`
2. Modify the configuration section between `/* TREASURE_HUNT_CONFIG_START */` and `/* TREASURE_HUNT_CONFIG_END */`
3. Encrypt your content with the correct passwords using the built-in `encrypt()` function

## 📍 Puzzle Types

### Included Puzzles

1. **Text Password** - Simple password entry
2. **Math Puzzle** - Solve equations
3. **Riddle** - Classic riddle-based challenges
4. **Caesar Cipher** - Decode shifted text
5. **GPS Geohash** - Navigate to locations (perfect for hiking)
6. **QR Code Scanner** - Scan physical QR codes
7. **Image Clues** - Visual puzzles

### Creating Custom Puzzles

All puzzles follow a simple pattern:

```javascript
const MyPuzzle = {
    name: "My Puzzle",
    description: "Description of your puzzle",

    generate: function(config) {
        return `
            <div class="card">
                <div class="card-header">
                    <h5>🎯 My Puzzle</h5>
                </div>
                <div class="card-body">
                    <!-- Your puzzle HTML -->
                    <button class="btn btn-primary"
                            onclick="TreasureHunt.addAnswer('answer-here')">
                        Submit Answer
                    </button>
                </div>
            </div>
        `;
    }
};
```

See `puzzles/README.md` for detailed instructions on creating custom puzzles.

## 🔑 Key Composition

Answers can be combined in multiple ways to form decryption keys:

- **Concatenated**: `answer1answer2answer3`
- **Reversed**: `answer3answer2answer1`
- **Sorted**: Alphabetically sorted then joined
- **Joined**: Separated by hyphens: `answer1-answer2-answer3`
- **Direct**: Enter the full key manually

This allows for creative puzzle design where hunters must:
1. Collect multiple answers
2. Figure out how to combine them
3. Try different combinations

## 🌍 GPS Treasure Hunts

The geohash system is perfect for outdoor hunts:

- **Quantized locations**: Set precision level (7 chars = ~150m accuracy)
- **No spoofing**: Must be at the location to get the correct geohash
- **Works offline**: Geohash calculation done in browser
- **Privacy-focused**: No location data sent to servers

Example: Hide a QR code at coordinates that encode part of the answer!

## 📖 Example Use Cases

- **Hiking Adventures**: Hide clues along a trail
- **City Tours**: Create urban exploration games
- **Educational**: Teaching scavenger hunts
- **Team Building**: Corporate treasure hunts
- **Geocaching**: Enhanced geocaching experiences
- **Escape Rooms**: Portable escape room puzzles
- **Birthday Parties**: Custom party games
- **Marketing**: Promotional treasure hunts

## 🚀 Deployment

### GitHub Pages (Recommended)

1. Fork this repository
2. Go to Settings → Pages
3. Select source branch and `/` root folder
4. Your builder will be available at `https://yourusername.github.io/open-treasure-hunt/builder/`

### Self-Hosting

Simply upload the files to any web server. No server-side code needed!

## 🏗️ Project Structure

```
open-treasure-hunt/
├── framework/
│   └── treasure-hunt-template.html    # Core framework
├── builder/
│   └── index.html                     # Web-based builder tool
├── puzzles/
│   ├── text-password.js               # Simple password puzzle
│   ├── math-puzzle.js                 # Mathematical puzzles
│   ├── riddle-puzzle.js               # Riddle challenges
│   ├── caesar-cipher.js               # Cipher decoding
│   ├── geohash-puzzle.js              # GPS location puzzles
│   ├── qr-code-puzzle.js              # QR code scanning
│   ├── image-clue.js                  # Image-based clues
│   └── README.md                      # Puzzle documentation
├── examples/
│   └── sample-hunt.html               # Example treasure hunt
├── docs/
│   ├── SECURITY.md                    # Security documentation
│   ├── CONTRIBUTING.md                # Contribution guidelines
│   └── API.md                         # Framework API reference
└── README.md                          # This file
```

## 🔐 Security

This framework is designed to be cryptographically secure:

- **AES-256-GCM** encryption for all sections
- **SHA-256** hashing with **PBKDF2** key derivation (100,000 iterations)
- **No password storage** - verification only through successful decryption
- **Client-side only** - no server to compromise
- **Auditable** - all code is open source

For detailed security information, see `docs/SECURITY.md`.

## 🤝 Contributing

We welcome contributions! Especially:

- New puzzle types
- UI improvements
- Documentation
- Bug fixes
- Example treasure hunts

See `docs/CONTRIBUTING.md` for guidelines.

To contribute a puzzle:
1. Create your puzzle in `puzzles/`
2. Add it to `puzzles/README.md`
3. Include an example configuration
4. Submit a pull request!

## 📜 License

MIT License - Free to use, modify, and distribute.

See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Bootstrap for UI components
- Web Crypto API for encryption
- The open-source community

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ElectricJack/open-treasure-hunt/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ElectricJack/open-treasure-hunt/discussions)
- **Documentation**: [Wiki](https://github.com/ElectricJack/open-treasure-hunt/wiki)

## 🗺️ Roadmap

- [ ] More puzzle types (morse code, coordinates math, etc.)
- [ ] Enhanced builder with drag-and-drop
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Puzzle marketplace/gallery
- [ ] Analytics (privacy-focused, optional)

## ⭐ Show Your Support

If you find this project useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 🔧 Contributing code
- 📢 Sharing with others

---

**Ready to create your first treasure hunt?**

[Open the Builder](builder/index.html) | [View Examples](examples/) | [Read the Docs](docs/)

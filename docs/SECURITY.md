# Security Documentation

## Overview

The Open Treasure Hunt Framework is designed with security as a core principle. This document explains the cryptographic approach and security guarantees.

## Threat Model

### What We Protect Against

1. **Casual Inspection**: Users cannot view encrypted content in browser dev tools
2. **Source Code Analysis**: No passwords or hints stored in code or comments
3. **Brute Force**: Strong encryption with key derivation makes brute force impractical
4. **Offline Attacks**: Even with the HTML file, attackers cannot decrypt without passwords

### What We Don't Protect Against

1. **Weak Passwords**: If you use "password123", it can be brute forced
2. **Social Engineering**: If hunters share answers, sections can be unlocked
3. **Keyloggers/Malware**: Client-side code cannot protect against compromised systems
4. **Determined Cryptanalysis**: Nation-state actors with significant resources

## Cryptographic Design

### Encryption: AES-256-GCM

- **Algorithm**: AES (Advanced Encryption Standard)
- **Key Size**: 256 bits
- **Mode**: GCM (Galois/Counter Mode)
  - Provides both confidentiality and authentication
  - Detects tampering
  - Industry standard for web encryption

### Key Derivation: PBKDF2

Passwords are never used directly as encryption keys. Instead:

1. Password is hashed with **SHA-256**
2. Result is fed into **PBKDF2** (Password-Based Key Derivation Function 2)
3. Parameters:
   - Salt: `"treasure-hunt-salt-v1"` (constant)
   - Iterations: **100,000** (slows down brute force)
   - Hash: SHA-256
   - Output: 256-bit AES key

### Initialization Vector (IV)

- **Size**: 12 bytes (96 bits) - recommended for AES-GCM
- **Generation**: `crypto.getRandomValues()` - cryptographically secure
- **Uniqueness**: New IV for each encryption operation
- **Storage**: Prepended to ciphertext

### Data Flow

```
Password → SHA-256 → PBKDF2(100k iterations) → AES-256 Key
                                                      ↓
Content → Compress → Encrypt with AES-GCM → Base64 → Store in HTML
```

### Verification

- **No password storage**: Not even hashed passwords are stored
- **Verification method**: Attempt decryption
  - Success = correct password
  - Failure = wrong password
- **No timing attacks**: AES-GCM either succeeds or fails completely

## Security Guarantees

### Strong Guarantees

1. **Content Privacy**: Encrypted sections cannot be read without the correct password
2. **Tamper Detection**: AES-GCM will fail if content is modified
3. **No Metadata Leakage**: Nothing reveals what's inside locked sections
4. **Key Independence**: Different passwords encrypt independently

### Weak Guarantees

1. **Password Strength**: Depends entirely on password choice
2. **Answer Discovery**: Physical puzzles (QR codes, GPS locations) can be found
3. **Timing Information**: Unlock timestamps are visible in localStorage

## Best Practices for Hunt Creators

### Password Selection

✅ **Good Passwords**:
- Long random strings: `xK9mP2nQ8vL5wR3`
- Combined answers: `Paris-42-Shakespeare`
- Geohashes: `9q8yyz8` (from GPS location)
- QR code data: UUIDs or random strings

❌ **Bad Passwords**:
- Dictionary words: `treasure`, `gold`
- Simple numbers: `123`, `42`
- Common phrases: `opensesame`
- Easy patterns: `abcd`, `1234`

### Puzzle Design

1. **Unique Answers**: Ensure each puzzle has a specific answer
2. **Multiple Components**: Require combining several answers
3. **Physical Evidence**: Use real-world items (QR codes, GPS locations)
4. **Order Matters**: Make answer order part of the puzzle

### Testing

Before deploying:

1. Test all passwords work correctly
2. Verify wrong passwords fail
3. Check that partial answers don't work
4. Ensure offline functionality

## Implementation Details

### Web Crypto API

The framework uses the browser's native Web Crypto API:

```javascript
// Key derivation
crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
);

// Encryption
crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    plaintext
);
```

### Browser Support

Requires:
- Web Crypto API (all modern browsers)
- ES6+ JavaScript
- localStorage (for progress saving)

### No External Dependencies

- No third-party crypto libraries
- No network requests
- No tracking or analytics
- Fully auditable single-file output

## Vulnerability Reporting

If you discover a security vulnerability:

1. **Do NOT** open a public issue
2. Email security concerns to: [create SECURITY.md contact method]
3. Provide:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We'll respond within 48 hours and issue a fix promptly.

## Security Audit

This project welcomes security audits from the community. The small codebase makes it easy to audit:

- Framework: ~600 lines of JavaScript
- Builder: ~400 lines of JavaScript
- All code in plain HTML files

## Cryptographic Limitations

### Known Limitations

1. **Salt is constant**: Same salt used for all hunts
   - Acceptable because passwords should be unique per hunt
   - Enables simple stateless design
   - Can be changed by modifying template

2. **No forward secrecy**: If password is compromised, old saves are readable
   - Trade-off for simplicity
   - Acceptable for treasure hunt use case

3. **Browser security**: Relies on browser crypto implementation
   - Web Crypto API is well-tested and standardized
   - Much better than custom JavaScript crypto

### Non-Issues

1. **Compression before encryption**: Content is compressed first
   - No issue because treasure hunt content is not secret in same way as encrypted messages
   - Compression is deterministic (not adaptive)
   - No known attacks apply to this use case

2. **Client-side encryption**: All happens in browser
   - Appropriate for this use case (no server)
   - User controls the environment
   - Open source allows verification

## Compliance

### Data Protection

- **No personal data collected**: Framework doesn't collect or transmit anything
- **Local storage only**: Progress saved in browser localStorage
- **No cookies for tracking**: Cookies not used (previous version did, removed)
- **GDPR compliant**: No processing of personal data

### Export Controls

- Uses standard Web Crypto API
- No custom cryptographic code
- Relies on browser implementations
- Should not face export restrictions

## Updates and Patches

Security updates will be:
- Documented in CHANGELOG.md
- Tagged with version numbers
- Announced in GitHub releases
- Backwards compatible when possible

## Conclusion

The Open Treasure Hunt Framework provides strong cryptographic protection appropriate for its use case: creating fun, secure treasure hunting games. While not designed for protecting state secrets, it successfully prevents casual snooping and requires genuine puzzle-solving to unlock content.

For most use cases (educational games, hiking adventures, team building), the security is more than adequate. For higher-security applications, additional measures (stronger passwords, additional encryption layers) can be added.

---

**Last Updated**: 2025-11-10
**Version**: 1.0.0

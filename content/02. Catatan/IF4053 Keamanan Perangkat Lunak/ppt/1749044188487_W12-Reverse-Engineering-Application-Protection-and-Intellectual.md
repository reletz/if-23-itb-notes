Application Protection and Intellectual
Property Rights Protection

Microsoft Windows Activation Hacks

• Early versions of Windows were widely pirated.
• Hackers reverse engineered activation mechanisms, enabling

illegal copies.

• Microsoft lost billions and had to redesign their protection

systems.

What is Intellectual Property Rights (IPR)?

• Legal rights protecting creations of the mind, including

software.

• Types: Copyright, patents, trade secrets.
• IPR helps creators control and profit from their work.

IPR and Application Protection

• Application protection enforces IPR by making copying and

tampering harder.

• Legal protection is only effective if technical barriers exist.
• Reverse engineering can challenge IPR, especially in countries

with weak enforcement.

What is Reverse Engineering?

• The process of analyzing software to discover its design, code,

or functionality.

• Used for compatibility, security analysis, and unfortunately, for

piracy.

• Legal and ethical boundaries vary by country and context.

Ghidra Screenshoot ©helpdeskgeek.com

Common Reverse Engineering Tools & Techniques

• Disassemblers: Convert machine code to assembly (e.g., IDA

Pro).

• Decompilers: Attempt to reconstruct source code (e.g., Ghidra,

JD-GUI).

• Debuggers: Step through code execution (e.g., x64dbg,

OllyDbg).

• Hex Editors: Directly edit binary files.

Sony PlayStation Hacking

• Hackers reverse engineered PlayStation firmware to run pirated

and homebrew games.

• Led to massive losses for Sony and legal battles with hackers.
• Sony responded with hardware and software updates.
• Ref: https://hackaday.com/2018/11/05/how-the-sony-

playstation-was-hacked/

© hackaday.com

Application Protection Techniques

• Obfuscation: Make code harder to read.
• Packing: Compress/encrypt executables.
• Anti-debugging: Detect and block debuggers.
• Code Signing: Ensure code integrity.
• Tamper Detection: Detect unauthorized changes.

Code Obfuscation

Code obfuscation is a technique used to make
source code difficult to understand by
humans while preserving its functionality.
This security measure protects intellectual
property and prevents reverse engineering.

Key Techniques:
• Name Obfuscation: Renaming variables,
functions, and classes to meaningless or
confusing names, making code harder to
follow

• Control Flow Obfuscation: Altering the

execution path of code by inserting arbitrary
jump instructions or converting conditional
constructs into complex switch statements
• Data Transformation: Converting data into

different forms (like using binary numbers) to
increase complexity while maintaining
functionality

Key Techniques (contd)
• String Encryption: Encrypting string literals to

hide sensitive information

• Dummy Code Insertion: Adding unnecessary

code that doesn't affect execution but
distracts analysts

• Address Obfuscation: Randomizing memory

locations of code and data to create
unpredictability

▪ Benefits: Protects proprietary algorithms,
deters reverse engineering, and reduces
successful exploitation.

https://doverunner.com/bl
ogs/code-obfuscation-
guide-against-reverse-
engineering-attempts/

Code Packing

Code packing is a compression
technique that transforms
executable code into an unreadable
format, which is then unpacked at
runtime.
How It Works:
• The original application is
compressed or encrypted

• A small unpacking routine is added
to decompress/decrypt the code
during execution

• The actual code remains hidden until

runtime

Security Benefits:
• Makes static analysis difficult as the
real code isn't visible until execution

• Reduces the application's footprint
• Can bypass signature-based

detection methods

Limitations:
• May impact performance due to

unpacking overhead

• Can be detected by monitoring

unpacking behavior

• Advanced analysts can capture the

unpacked code in memory

Anti-Debugging

Anti-debugging techniques are mechanisms
implemented to detect and respond to
debugging attempts, preventing reverse
engineers from analyzing code behavior.

Common Techniques:
• Timing Checks: Measuring execution time to

detect debugger-induced delays

Responses to Detection:
• Terminating the application
•
Executing decoy code paths
• Corrupting data to mislead the analyst
• Slowing down execution dramatically

• Debugger Detection: Checking for the

•

presence of debugging tools through API calls
Exception Handling: Using structured
exception handling to identify debugger
intervention

• Self-Modifying Code: Altering code during

execution to confuse debuggers

• Hardware Breakpoint Detection: Identifying

hardware breakpoints set by analysts

Code Signing

Code signing is a security practice that uses

digital signatures to verify the authenticity and
integrity of software.

Process:
• Developers obtain a digital certificate from a

trusted Certificate Authority

• Code is hashed using cryptographic

algorithms

• The hash is encrypted with the developer's

private key to create a signature

• The signature is attached to the software

Benefits:
• Confirms software publisher identity
• Verifies code hasn't been tampered with since

signing

• Builds user trust and confidence
• Reduces warning messages during

installation

• Required for distribution on many platforms

(iOS, macOS, Windows drivers)

Verification Process:
• Operating system checks the signature using

the publisher's public key

• Validates the certificate chain to a trusted

root authority

• Confirms the hash matches the current state

of the code

Tamper Detection

Tamper detection involves implementing
mechanisms to identify unauthorized
modifications to software and respond
appropriately.

Implementation Methods:
• Checksum Verification: Calculating and
comparing hash values of code sections

• Self-Checking Code: Having the

application verify its own integrity at
runtime

Response Options:
• Graceful degradation of functionality
• Alerting administrators
• Self-termination
• Activating decoy features
• Logging tamper attempts
Integration with Other Security:
• Works alongside code signing for

comprehensive protection

• Environmental Checks: Detecting unusual

•

execution environments
Integrity Verification: Validating critical
data structures and configurations
• Runtime Memory Scanning: Monitoring
for unexpected changes to memory

• Can be combined with obfuscation to hide
the detection mechanisms themselves
• Often part of a larger application security

strategy

How Windows Protects Software

• Product Activation: Requires online or phone activation to bind a

license to hardware.

• Code Signing: Windows enforces digital signatures for drivers and

some applications.

• Trusted Platform Module (TPM): Used for secure boot and BitLocker

encryption.

• Windows Defender & SmartScreen: Detects and blocks known

malware and unsigned software.

• Regular Updates: Security patches and updates to address

vulnerabilities.

Product Activation@Windows

• User enters unique product key
• System generates hardware ID
• Product key and hardware ID sent to Microsoft server
• Server checks validity and usage
Security Features
• Ties license to specific hardware
• Limits number of activations per key
• Detects and blocks known pirated keys
Benefits
• Reduces piracy and protects Microsoft’s IP
• Ensures users get updates and support
Limitations
• Can be targeted by cracks or keygens
• May inconvenience legitimate users if hardware changes

Code Signing@Windows

Code signing uses digital certificates to
verify the identity of the software
publisher and ensure the code has
not been altered since it was signed.

How It Works
• Developer signs executable with a

private key

• Digital signature and certificate are

attached to the file

• Windows checks the signature
before running the software

• Warns or blocks if the signature is

missing, invalid, or revoked

Security Benefits
• Confirms software origin (authentic

publisher)

• Detects tampering or malware

injection

• Builds user trust and enables secure

updates
Use Cases
• Required for Windows drivers
• Used for Windows Store apps and

enterprise deployments

Limitation
• Stolen certificates can be misused if

not protected

How Android Protects Apps

• App Sandboxing: Each app runs in its own process and user

space, limiting access to other apps’ data.

• Google Play Protect: Scans apps for malware before and after

installation.

• Code Signing: All apps must be digitally signed by the

developer.

• Obfuscation: Developers use tools like ProGuard to obfuscate

code.

• Play Store Policies: Google can remotely disable or remove

malicious apps.

How iOS and the Apple App Store Protect Apps

• App Review Process: Every app is reviewed by Apple before

being published.

• Code Signing & Entitlements: Apps must be signed with a valid

Apple Developer certificate; entitlements restrict app
capabilities.

• App Sandboxing: Strict isolation of app data and processes.
• Hardware Security: Secure Enclave and hardware-backed key

storage.

• Remote App Removal: Apple can remotely disable or remove

apps that violate policies.

How Steam Protects Games

• Steam DRM (Digital Rights Management): Games require Steam

client authentication to launch.

• VAC (Valve Anti-Cheat): Detects and bans cheaters in multiplayer

games.

• Encrypted Game Files: Game files are encrypted and tied to user

accounts.

• Frequent Updates: Automatic updates to patch vulnerabilities and

exploits.

• Account Binding: Games are bound to a user’s Steam account,

preventing easy sharing or piracy.

Adobe Software Cracks

• Adobe’s licensing and activation were bypassed by reverse

engineers.

• Cracked versions spread online, causing revenue loss.
• Adobe moved to cloud-based subscriptions for better control.

Challenges in Application Protection

• Attackers constantly develop new reverse engineering

techniques.

• Protection adds cost and complexity for developers.
• No protection is perfect; it’s about raising the bar.



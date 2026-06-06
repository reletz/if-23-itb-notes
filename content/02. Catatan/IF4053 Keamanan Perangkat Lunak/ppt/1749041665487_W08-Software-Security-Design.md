Software Security Design

Yudistira Asnar
yudis@itb.ac.id

Information Security Threat

6/4/2025

IAS/YA/2-2022-2023

2

STRIDE

▪ Categorization of threat STRIDE

▪ Spoofing
▪ Tampering
▪ Repudiation
▪ Information Disclosure
▪ Denial of Service
▪ Elevation of Privilege

19/01/2023

Threat & Vulnerability Analysis

3

Threats vs Security Requirements

▪ spoofing

▪ authentication

▪ tampering with information

▪ integrity

▪ information disclosure
▪ confidentiality
▪ denial-of-service (DoS)

▪ availability
▪ elevation of access
▪ authorization

6/4/2025

IAS/YA/2-2022-2023

4

Security by design

▪ An approach to  put emphasis on building security concerns into

the design and construction of a system

▪ Security is not an afterthought
▪ Reduce vulnerabilities/exploitable flaws before they are used in

production/market

Security Control/Countermeasure

▪ prevent it, by blocking the attack or closing the vulnerability
▪ deter it, by making the attack harder but not impossible
▪ deflect it, by making another target more attractive (or this one less

so)

▪ detect it, either as it happens or some time after the fact
▪ recover from its effects

They reduce
▪ Attack surface
▪ Risk level

6/4/2025

IAS/YA/2-2022-2023

6

Security Control/Countermeasure

▪ Countermeasures can be non-IT related

▪ physical security of building
▪ screening of personnel
▪ legal framework to deter criminals
▪ training employee

▪ but we won’t consider these (although they are also very

important)

6/4/2025

IAS/YA/2-2022-2023

7

Defense in Depth

▪ a strategy that leverages multiple security measures (in various

layers) to protect assets

▪ Apply various controls

▪ If one fails, then there are others
▪ If
▪ Example

▪ Apply login

▪ strong password
▪ OTP
▪ Audit trails

https://colohouse.com/

Don’t Reinvent the Wheel

▪ New countermeasures might also increase the attack surface
▪ promoting the reuse of existing software components, code and

functionality

▪ Example

▪ Uses a crypto library (e.g., opessl, bountycastle) instead of

building itself

Open Design

▪ Implementation details of the design should be independent of the design

itself

▪ Do not rely on secret designs
▪ Security by Obscurity
▪ Kerckhoffs’ principle—a system’s security should not rely on the secrecy

of its design details.

▪ Allowing the design to remain open while the implementation can be kept

secret
▪ Example:

▪ software is using the OAUTH, the implementation can be different from

one case to another

▪ TLS encryption

Least Privilege

Saltzer and Schroeder:
“Every program and every user of the system should operate using the
least set of privileges necessary to complete the job”

▪ Better security

▪ If the program is executed with the limited privileges the

vulnerabilities that it might contain are less likely to be exploited
for harming the system in general

▪ Better stability

▪ Bug or human error causes lesser damage

▪ Example

▪ Run a server using a “normal” user

Separation of Duties/Privileges

▪ a security principle which requires that the successful completion of
a single task is dependent upon two or more conditions that are
insufficient for completing the task by itself

▪ The principals of those tasks might have conflict of interests or

colluding

▪ Those tasks must be performed by different principals
▪ Example:

▪ Propose a loan and Approve a loan must be performed by

different agents

▪ A shell process and a reference monitor have different process

owners

Secure by Default

▪ Deliver the system with secure configuration out of the box
▪ Example

▪ Refuse all access, otherwise allowed
▪ Give a strong password of a WIFI router from the

manufacture

▪ Turn on the firewall; after the installation

Fail-Secure

▪ Adaptation of Fail-safe principle
▪ This is a principle that aims to maintain security when an

error/fail condition is occurred

▪ These error conditions may be a result of an attack, or may be

due to design or implementation failures, in any case the
system/applications should default to a secure state rather than
an unsafe state.

▪ Example:

▪ Subject cannot retrieve an object if the authorization server is

failed

When enough is “enough”?

... security controls come with some cost

Risk Approach

▪ ISO Guide 73: 2002

▪ Combination of the probability of an event and its (negative)  consequences

▪ Security ‘controls’ reduce risk, but

▪ have costs
▪ might be reducing functionality and/or convenience.

▪ Ideal solution minimises risk at an acceptable cost for customer.

Highly subjective!

▪ Ex: ISO 27005

6/4/2025

IAS/YA/2-2022-2023

16

Trade-Off Analysis

6/4/2025

IAS/YA/2-2022-2023

17

©British Telecommunications plcSecurity is about managing risk•Security ‘controls’reduce risk, but have costs of reduced functionality and/or convenience.•Ideal solution minimises risk at an acceptable cost for customer. Highly subjective! Reduction of risk to assets:•Money•Equipment / physical assets•Data and software•Information and knowledge•Reputation, trust•Business operations•Time•Personal information (privacy)•Copyright•People (family, children, employees)Cost of controls:Firewall(perimeter + host)Anti-virusIntrusion detection / preventionVulnerability managementAAA / identity managementCryptographySecure communications and data storageRisk TreatmentRisk ReductionRisk AvoidanceRisk TransferRisk AcceptanceLowFrequencyHigh FrequencyLow ImpactHigh ImpactWhich security controls are appropriate?

... some controls brittle, cumbersome, and ineffective

Countermeasures and More Vulnerabilities

▪ Countermeasures can lead to new vulnerabilities

▪ E.g., if we only allow three incorrect logins, as a countermeasure to

brute-force attacks (account be frozen), which new vulnerability do we
introduce?
▪ Denial of Service attack

▪ If a countermeasure relies on new software, bugs in this new software

may mean
▪ that it is ineffective, or
▪ worse still, that it introduces more weaknesses
▪ E.g., Witty worm appeared in Mar 2004 exploited ISS security

software
▪ http://en.wikipedia.org/wiki/Witty_%28computer_worm%29

6/4/2025

IAS/YA/2-2022-2023

19

Appropriate security control

▪ are affordable
▪ are proportionate to the threat
▪ minimise disruption to legitimate users

6/4/2025

IAS/YA/2-2022-2023

20

©British Telecommunications plcAppropriate security measures•are affordable•are proportionate to the threat •minimise disruption to legitimate usersI’m safe ... because of my state-of-the-art firewall

6/4/2025

IAS/YA/2-2022-2023

21

©British Telecommunications plc‘I’m safe behind my state-of-the-art firewall!’Many streets go to Rome

6/4/2025

IAS/YA/2-2022-2023

22

©British Telecommunications plcThe weakest link?•Security gets in the way!•If your staff and customers don’t understand the need for security they will find ways around it•Education and awareness can make people part of the solution!Hey, that’s cheating!as strong as the weakest link

▪ This security state/resiliency of a system against hacker

attempts will depend heavily on the protection of its
weakest components

6/4/2025

IAS/YA/2-2022-2023

23

Security is about the system and not (just) technology

▪ Security is about engineering non- functional properties of

complex systems
▪ Requires harmonious co-ordination of specialised

components

▪ Interlocking articulated armour
▪ Holistic / systemic view needed
▪ People are part of the system*

80% of security is
about people,
processes and
procedures and only
20% is about
technology, Paul
Simmonds, ICI

6/4/2025

IAS/YA/2-2022-2023

24

©British Telecommunications plcSecurity is about systems not (just) technology•Security is about engineering non-functional properties of complex systems –Requires harmonious co-ordination of specialised components–Interlocking articulated armour–Holistic / systemic view needed–People are part of the system** 80% of security is about people, processes and procedures and only 20% is about technology, Paul Simmonds, ICIAfter all, it is a matter of perception

▪ You don’t know when it is working, but you know when it fails

▪ It is just a probable thing ... some time happens some time NOT

Information Security

Risk

People are convinced travelling with
cars are much safer with airplane
NTSB report in US: 42.642/year which
is equal to the casualty of  225
crashes of Boing 727

6/4/2025

IAS/YA/2-2022-2023

25



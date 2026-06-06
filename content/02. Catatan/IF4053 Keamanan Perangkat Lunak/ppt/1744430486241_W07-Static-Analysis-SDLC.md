Static Analysis and Secure SDLC

Yudistira Asnar
yudis@itb.ac.id

1

How Static Code Analysis Helps in Software Security

• Detects vulnerabilities early in the development lifecycle.
• Reduces the cost of fixing bugs.
• Automates security checks and enforces secure coding

practices.

• Examples of vulnerabilities detected:

• SQL Injection: Unsanitized user input in database queries.
• XSS: Improper handling of user-generated content.

// Vulnerable PHP Code
$query = "SELECT * FROM users WHERE id = " . $_GET['id'];

Illustration

// Vulnerable PHP Code
$query = "SELECT * FROM users WHERE id = " . $_GET['id'];

▪ Static analysis tools flag this as a potential SQL injection

vulnerability.

Data Flow Analysis

• Tracks how data moves through the program to identify vulnerabilities like
unvalidated input or improper data handling. Tracks "tainted" (untrusted)
data from sources (e.g., user input) to sinks (e.g., database queries) to
detect vulnerabilities. (Taint Analysis

• Use Case: Detecting SQL injection or XSS by analyzing how user input

flows into sensitive operations.

$input = $_GET['user_input']; // Source $query =
"SELECT * FROM users WHERE name = '$input'"; // Sink

• Data flow analysis flags the unvalidated input flowing into the SQL query.

Control Flow Analysis

• Examines the order in which instructions
are executed in a program to identify
unreachable code, infinite loops, or insecure
logic.

• Use Case: Detecting logic flaws or dead
code that could lead to vulnerabilities.

<?php
// Simulating user role
$user_role = $_GET['role’];
// User-provided input (e.g.,
"admin" or "user")
 // Check if the user is an
admin
if ($user_role == "admin") {
  echo "Welcome, Admin! You have
full access.";
} else {
  echo "Access Denied!";
}
// Critical operation that
should only be accessible to
admins
echo "Performing critical
operation...";
?>

Why Integrate Static Code Analysis

• Early Detection of Issues: Identifies vulnerabilities and bugs

early in the development lifecycle, reducing the cost and effort
of fixing them later.

• Continuous Monitoring: Ensures that every code change is

analyzed for security and quality.

• Improved Code Quality: Enforces coding standards and best

practices.

• Automation: Reduces manual effort by automating security

checks in CI/CD pipelines.

Step 1: Choose the Right Static Analysis Tool

• Select a tool that supports your programming language(s) and

meets your project requirements.

• Consider tools that integrate well with your development

environment and CI/CD pipelines.

• Examples:

• PHP: PHPStan, Psalm, Phan.
• JavaScript: ESLint, SonarQube, Retire.js.
• Multi-language: SonarQube, Semgrep.

Step 2: Configure the Tool

▪ Install and configure the tool locally for developers to use during

coding.

▪ Define rulesets and configurations:

▪ Use predefined rulesets (e.g., OWASP Top 10, PSR-12 for PHP).
▪ Customize rules to match your project’s coding standards and

security requirements.

▪ Example:

▪ For ESLint, create a .eslintrc.json file to define rules.
▪ For PHPStan, configure phpstan.neon to set analysis levels and

paths.

Step 3: Integrate with Version Control Systems

▪ Set up pre-commit or pre-push hooks to run static analysis

before code is committed.

▪ Tools like Husky (for JavaScript) or Git hooks can enforce this.
▪ Example:

▪ Use a Git pre-commit hook to run ESLint
▪ Bash

▪ # .git/hooks/pre-commiteslint . --ext .js,.jsx

Step 4: Integrate with CI/CD Pipelines

▪ Automate static code analysis in your CI/CD pipeline to ensure

every code change is analyzed.

▪ Add a step in your pipeline configuration to run the static

analysis tool.

▪ Example CI/CD tools:

▪ GitHub Actions: Add a workflow file to run static analysis.
▪ GitLab CI/CD: Add a job in .gitlab-ci.yml.
▪ Jenkins: Use plugins or scripts to run static analysis.

Step 5: Monitor and Report Results

▪ Generate reports for every analysis run and make them

accessible to the team.

▪ Use dashboards or notifications to highlight issues.
▪ Example:

▪ SonarQube provides a web-based dashboard for viewing code

quality and security metrics.

▪ GitHub Actions can post analysis results directly in pull

requests.

Step 6: Enforce Quality Gates

• Define quality gates to block builds or deployments if critical

issues are detected.

• Example:

• Fail the CI/CD pipeline if the static analysis tool reports high-

severity vulnerabilities or fails to meet code coverage
thresholds.

Step 7: Educate Developers

• Train developers to interpret static analysis results and fix

issues.

• Encourage developers to run static analysis locally before

committing code.

Best Practices for Integration

▪ Start Small:

▪ Begin with a small set of rules and gradually expand as the team becomes

comfortable.

▪ Focus on high-severity issues first (e.g., security vulnerabilities).

▪ Automate as Much as Possible:

▪ Automate static analysis in CI/CD pipelines to ensure consistent checks.
▪ Use tools like Dependabot or Snyk to automate dependency vulnerability

checks.

▪ Customize Rules for Your Project:

▪ Avoid overwhelming developers with irrelevant warnings by customizing

rulesets.

▪ Example: Disable rules that don’t apply to your project (e.g., unused variables

in test files).

Best Practices for Integration

▪ Balance False Positives and Negatives:

▪ Regularly review and fine-tune rules to minimize false positives.
▪ Use tools that allow suppressing specific warnings when necessary.

▪ Integrate with Code Reviews:

▪ Include static analysis results in code reviews to ensure issues are

addressed before merging.

▪ Track Metrics:

▪ Monitor metrics like the number of issues fixed, code quality scores, and

time to resolve vulnerabilities.

▪ Use these metrics to measure the effectiveness of static analysis.

Some of Workflow

▪ Local Development:

1. Developers run static analysis tools locally (e.g., ESLint, PHPStan) before

committing code.

2. Pre-commit hooks enforce basic checks.

▪ Code Commit:

1. Code is pushed to a version control system (e.g., GitHub, GitLab).
2. Static analysis runs automatically in the CI pipeline.

▪ Pull Request:

1. Analysis results are posted in the pull request for review.
2. Developers fix issues flagged by the tool.

▪ Build and Deploy:

1. If the code passes all quality gates, it proceeds to build and deployment.
2. If issues are detected, the pipeline fails, and developers are notified.

Benefits of Integration

• Improved Security: Vulnerabilities are detected and fixed before

deployment.

• Consistent Code Quality: Enforces coding standards across the

team.

• Faster Development: Automates repetitive tasks, allowing

developers to focus on features.

Story - Equifax Data Breach (2017)

• What Happened?

• The Equifax data breach exposed the personal information of 147 million people.
• The root cause was an unpatched vulnerability in the Apache Struts framework (CVE-

2017-5638).

• Attackers exploited the vulnerability to execute arbitrary code on Equifax’s servers.

• How Static Code Analysis Could Have Helped:

• Dependency Scanning: Tools like SonarQube or Retire.js could have flagged the outdated

and vulnerable version of Apache Struts.

• Taint Analysis: Could have detected unsafe handling of user input, which was exploited in

the attack.

• Automated Alerts: Regular scans integrated into CI/CD pipelines could have notified

developers about the vulnerability before it was exploited.

• Key Takeaway:

• Regular static analysis and dependency scanning are critical for identifying and mitigating

vulnerabilities in third-party libraries.

Story - GitHub’s Use of Dependabot

• What is Dependabot?

• Dependabot is a tool integrated into GitHub that automatically scans for vulnerabilities in

dependencies and creates pull requests to update them.

• How It Works:

• Scans project dependencies for known vulnerabilities (e.g., npm, Composer, Maven).
• Automatically generates pull requests with updated versions of vulnerable libraries.
• Integrates with static analysis tools to ensure updates don’t introduce new issues.
Impact:
• GitHub has significantly reduced the risk of vulnerabilities in open-source projects by

automating dependency management.

•

• Developers can focus on writing code while Dependabot handles security updates.

• Key Takeaway:

• Automating static analysis and dependency management reduces the burden on

developers and ensures continuous security.

Story - others

• Capital One Breach (2019):

• Cause: Misconfigured AWS instance and insecure code.
• Solution: Static analysis could have flagged insecure

configurations and improper access control.

• Log4Shell Vulnerability (2021):

• Cause: Vulnerable version of Log4j library.
• Solution: Dependency scanning tools could have flagged the

outdated library.

Challenges in Static Code Analysis

▪

False Positives and Negatives:
▪
▪
▪ Solution: Regularly fine-tune rulesets and use multiple tools for better coverage.

False Positives: Tools may flag harmless code as vulnerable, leading to wasted time.
False Negatives: Some vulnerabilities may go undetected, especially in complex codebases.

▪ Scalability:

▪

Large codebases can take a long time to analyze, slowing down development.

▪
▪ Solution: Use incremental analysis to focus only on changed code.
Integration Complexity:
▪
▪ Solution: Start small with local analysis and gradually expand to automated pipelines.

Integrating static analysis tools into CI/CD pipelines can be challenging, especially for legacy systems.

▪ Developer Resistance:

▪ Developers may resist using static analysis tools due to perceived complexity or additional workload.
▪ Solution: Provide training and demonstrate how these tools save time by catching issues early.

▪ Keeping Up with New Vulnerabilities:

Static analysis tools need to be updated regularly to detect new types of vulnerabilities.

▪
▪ Solution: Use tools with active community support and regular updates.

Future Trends in Static Code Analysis

1. AI and Machine Learning:
1. How It Helps:

1. AI can improve the accuracy of static analysis by reducing false positives and negatives.
2. Machine learning models can predict potential vulnerabilities based on historical data.

2. Example: GitHub Copilot uses AI to suggest secure code snippets.
3. Resources:

1. GitHub Copilot

2. Shift-Left Security:

1. Definition: Moving security checks earlier in the development lifecycle.
2. How It Works:

1. Developers run static analysis tools locally before committing code.
2. Security becomes a shared responsibility across the team.
3. Example: Tools like SonarLint and ESLint are designed for local use.
4. Resources:

1. Shift-Left Security Overview (Synopsys)

3.

Integration with DevSecOps:

1. Definition: Embedding security into DevOps practices.
2. How It Works:

1. Static analysis tools are integrated into CI/CD pipelines.
2. Security checks are automated alongside builds and tests.

3. Example: Jenkins pipelines with SonarQube integration.

Future Trends in Static Code Analysis

4.

Real-Time Analysis:
1. Definition: Tools that analyze code as it is written, providing instant feedback.
2. How It Works:

1. IDE plugins like SonarLint or ESLint highlight issues in real-time.

3. Example: SonarLint for IntelliJ or Visual Studio Code.

5. Support for Modern Technologies:

1. Static analysis tools are evolving to support:

1. Cloud-Native Applications: Scanning Infrastructure-as-Code (IaC) files (e.g., Terraform,

Kubernetes manifests).

2. Microservices: Analyzing distributed systems and APIs.
3. Serverless Architectures: Detecting vulnerabilities in serverless functions.

6. Open-Source Collaboration:

1. Open-source static analysis tools are becoming more powerful due to community contributions.
2. Example: Semgrep, an open-source tool with customizable rulesets.

Final Remarks

▪ Static code analysis is evolving to become faster, smarter, and

more integrated into the development lifecycle.

▪ Developers and security teams must stay updated on new tools

and techniques to address emerging challenges.

Static Code Analysis Tool

▪ OWASP https://owasp.org/www-

community/Source_Code_Analysis_Tools

▪ Wikipedia

https://en.wikipedia.org/wiki/List_of_tools_for_static_code_anal
ysis

▪ NIST https://www.nist.gov/itl/ssd/software-quality-

group/source-code-security-analyzers

Open Source Options

Product

License

Type

LAPSE+ 2

FindBugs 2.0 3

Orizon 9

SWAAT 8

PMD 5

Open
Source
GNU GPL

Open
Source
GNU LGPL

Open
Source
GNU GPL

Open
Source
Custom
License

Open
Source
BSD

Eclipse
Plugin

Eclipse
Plugin

Standalo
ne
Text-
based

Standalo
neHTML
Report-
based

Eclipse
Plugin

Langua
ges

Java

Java

Java,
Php,C
Jsp

Java,
C#

Features

Variable Traceback, Good for
analysis of injection & cross-site
scripting

Good for general purpose bugs,
slick interface, security specific
detection under-developed

Report-based scheme, under-
developed,
lacking nice UI, some security
detection

Nice report based detection, .NET
package out-of-date, tool not
maintained.  Does not necessarily
focus on security problems

Java,
JavaScrip
t, XML,
XSL

Generic Code quality tool,
High quality User Interface,
Extensible to other security-specific
rule-sets

Open Source Options (cont.)

Product

FxCop 4

RIPS 7

FlawFinder
19

PreFast 20

BrakeMan
21

Licens
e

Open
Source
MS-PL

Open-
Source
GPL

Open-
Source
GPL

Open-
Source
MS-PL

Open-
Source
MIT

Type

VS
Plugin

Lang
uages

.NET

Features

Security-specific static
analysis,
UI built into Visual Studio

Stand
alone

PHP

Professional user-
interface,
Security-specific analysis

C++

Stand
alone
Text-
based

Security-specific
analysis,
Injections, Overflow, etc.
Dangerous function
analysis

VS
Plugin

C++

General static analysis,
UI built into Visual Studio

Ruby Security-specific analysis

Strong following

Stand
alone
Text-
based



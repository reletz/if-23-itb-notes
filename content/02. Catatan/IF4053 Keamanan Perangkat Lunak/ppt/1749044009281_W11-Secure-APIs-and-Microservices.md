Secure APIs and Microservices

Yudistira Asnar
yudis@itb.ac.id

Learning Objectives

▪ Understand the security challenges unique to APIs and

microservices.

▪ Identify common API vulnerabilities and their mitigations.
▪ Apply best practices for securing APIs and microservices in real-

world applications.

Definition

▪ API (Application Programming Interface):

▪ Enables communication between software components or systems via defined

protocols.
▪ Types of APIs:

▪ Web APIs (REST, GraphQL), Internal APIs, Public APIs.

▪ Microservices:

▪ Architectural style where applications are built as independent, modular

services communicating via APIs.

▪ Benefits:

▪ Scalability, agility, independent deployment, technology diversity.

▪ Security Note:

▪ More endpoints and inter-service calls increase the attack surface—security is

critical.

Security Challenges in APIs & Microservices

▪ Increased attack surface due to many endpoints
▪ Distributed architecture adds complexity
▪ Inconsistent security controls across services
▪ Data exposure risks in inter-service communication

API Security Threat Landscape

▪ OWASP API Security Top 10 highlights key risks

▪ Broken Object Level Authorization
▪ Broken Authentication
▪ Broken Object Property Level Authorization
▪ Unrestricted Resource Consumption
▪ Broken Function Level Authorization
▪ Unrestricted Access to Sensitive Business Flows
▪ Server Side Request Forgery (SSRF)
▪ Security Misconfiguration
▪ Improper Inventory Management
▪ Unsafe Consumption of APIs

▪ Common threats: broken authentication, excessive data exposure, lack of rate limiting
▪ APIs are frequent targets for attackers

Common API Vulnerabilities

▪ Broken Object-Level Authorization: Attackers access data they

shouldn’t.

▪ Broken Authentication: Weak or missing authentication allows

unauthorized access.

▪ Excessive Data Exposure: APIs return more data than necessary.
▪ Lack of Rate Limiting: APIs are vulnerable to brute-force and

DoS attacks.

▪ Injection Flaws: Unvalidated input leads to SQL or command

injection.

Case Study: Real-World API Breach

▪ Example: Facebook/Twitter/T-Mobile API incident
▪ Attackers exploited weak authentication or authorization
▪ Resulted in data leaks or account compromise
▪ Lessons: Need for strong access controls and monitoring

Best Practices for API Security

▪ Use strong authentication (OAuth, JWT, API keys)
▪ Enforce authorization checks for every request
▪ Validate and sanitize all inputs
▪ Implement rate limiting and throttling
▪ Use HTTPS to encrypt data in transit

Secure API Design Principles

▪ Apply the principle of least privilege—grant minimal access.
▪ Use fail-safe defaults—deny by default, allow by exception.
▪ Version APIs to manage changes securely.
▪ Limit data exposure—only return necessary information.
▪ Log and monitor all API activity.

API Gateway and Security

▪ API gateways centralize security enforcement.
▪ Handle authentication, authorization, and input validation.
▪ Apply rate limiting and logging at the gateway.
▪ Simplify monitoring and threat detection across services.

Microservices Security Considerations

▪ Use service-to-service authentication (e.g., mTLS, service

mesh).

▪ Store secrets securely (vaults, environment variables).
▪ Segment networks to isolate critical services.
▪ Monitor and log inter-service communication for anomalies.
▪ Regularly update and patch microservices.

Tools for API Security Testing

▪ Postman: API testing and automation
▪ OWASP ZAP, Burp Suite: Security scanning
▪ APIsec, Insomnia: Additional testing tools



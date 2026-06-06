Security Testing

Yudistira Asnar
yudis@itb.ac.id

Adapted from:

Bad Software

Greg Hoglund
CTO, Cenzic, Inc.
greg@cenzic.com

Adapted from:

Security Testing through
Automated Software Tests

Stephen de Vries,
Principal Consultant, Corsaire
stephen.de.vries@corsaire.com

Adapted from:

Software Security Testing

Vinay Srinivasan
srinivasan_vinay@yahoo.com
vinay.srinivasan@techmahindra.com
cell:  +91 9823104620

04/06/2025

4

Reference

▪ OWASP Web Security Testing Guide (4.2)
▪ Kali Linux – Assuring Security by Penetration Testing
▪ Practical Security Automation and Testing

04/06/2025

5

Software Behaviors

04/06/2025

6

Beware of Side EffectsThompson, Herbert, Why Security Testing is Hard, IEEE Security and Privacy, July/Aug 2003, pp. 83-86.Unreachable code?  Look at code coverage.The Missing Leg of Software Reliability

Reliability

Reliability

Functional

Performance

Functional

Performance

Security

Traditional QA testing methods have never addressed
security.  Software systems cannot be reliable unless
they are secure.

04/06/2025

7

Risk Analysis  — It’s All Relative…

Information and services
being protected

Skills and resources of
the adversaries

Costs of potential
assurance remedies

Security

04/06/2025

8

Security Testing

▪ Security testing requires
attacking the software.

▪ The software should be tested
for the unexpected and the
unknown.

▪ Software will never be placed
or deployed into a trusted or
predictable environment.

04/06/2025

9

What’s So Different About Security?

▪ “Software security is about making software behave correctly in

the presence of a malicious attack.”

▪ “The difference between software safety and software security
is therefore the presence of an intelligent adversary bent on
breaking the system.”

04/06/2025

10

Security Testing Dilemma

▪ QA is usually under pressure to complete the “feature test

sets” (i.e. functional testing) (QA resources)

▪ Budget and timing constraints
▪ Security testing depends heavily on expertise and experience

04/06/2025

11

“Choose Any Two…”

Usability

Security

Cost

04/06/2025

12

Reactive vs. Proactive

▪ Most defensive mechanism which “provide security” on the

market do little to address the heart of the problem, which is bad
security

▪ They operate in reactive mode

▪ Instead, in order to increase the levels of assurance of software
security, we (software organizations, QA) need to be proactive

04/06/2025

13

Principles of Testing
(OWASP WSTG 4.2)

▪ There is NO Silver Bullet
▪ Think Strategically, Not

Tactically

▪ The SDLC is King
▪ Test Early and Test Often
▪ Test Automation
▪ Understand the Scope of

Security

▪ Develop the Right Mindset

▪ Understand the Subject
▪ Use the Right Tools
▪ The Devil is in the Details
▪ Use Source Code when Available
▪ Develop Metrics
▪ Document the Test Results

04/06/2025

14

Take control of the Problem

▪ Test before you buy
▪ Perform independent testing on the software
▪ Perform internal testing on the software
▪ Cooperate and create a shared testing lab
▪ Create an acceptance criteria

04/06/2025

15

Vulnerability Life Cycle

04/06/2025

16

Cyber Kill Chain Model

1. Reconnaissance
2. Weaponization
3. Delivery
4. Exploitation
5. Installation
6. Command & Control
7. Actions on Objections

04/06/2025

17

https://www.lockheedmartin.com/content/dam/lockheed-
martin/rms/documents/cyber/LM-White-Paper-Intel-Driven-Defense.pdf

“Internal” Cyber Kill Chain Model

1. Reconnaissance
2. Access
3. Aggregation
4. Assembly
5. Encryption
6. Obfuscation
7. Exfiltration

04/06/2025

18

https://cybersecurity.att.com/blogs/security-essentials/the-internal-cyber-kill-
chain-model#_ftn1

Type of Security Testing Objectives

▪ Testing Functionality of Security Requirements
▪ Testing Attack Protection in a system or an organization

04/06/2025

19

Typical Iterative development life cycle

▪ Sub bullet

• Correcting issues is costly

• The  people  who  understand  the  code
best, don’t perform the security tests

• No  buy-in  from  developers  into  the

security process

04/06/2025

20

Typical Iterative development life cycle

Integrating Security Tests in the process:
• A shorter security testing phase
• More robust applications because testing is deep
•

Developer involvement in security

04/06/2025

21

Security Testing Realm

Level

Unit
Integration
System
Acceptance

Whitebox
Greybox
Blackbox

Visibility

Security

Testing

Technique

Fuzz
Mutation
Fault Injection

Aspect

Network
API
Software
Platform

04/06/2025

22

Security Test Type

04/06/2025

23

Black Box

▪ Can be automated
▪ Can easily find ‘low hanging fruit’
▪ Automated Tools:

▪ ISICS
▪ Spike
▪ Hailstorm
▪ PROTOS

04/06/2025

24

White Box

▪ IDA-Pro (reverse assemble)
▪ More expensive and requires an expert
▪ Very time consuming

04/06/2025

28

IDA reverse of popular app-server’s
“CanonicalizeURIPath”

04/06/2025

29

A Fusion – Grey Box

▪ Combines:

▪ A runtime debugger

▪ SoftIce
▪ GDB

▪ A white box tool

▪ IDA

▪ A black box tool
▪ Hailstorm

04/06/2025

30

Architecture Flaws

▪ Lack of randomness
▪ Hijacking keys
▪ No authentication

▪ Bad configuration or design

▪ No compartments

▪ Use the same buffer for crypto and clear

▪ Race conditions

04/06/2025

31

Attack Vectors

▪ Physsec

▪ Human

▪ Physical

▪ COMMSEC

▪ Data networks

▪ Telecommunication

▪ Wireless communication

▪ Other External Inputs

04/06/2025

32

Fault Injection

▪ Objective: a technique for improving the coverage of a test by

introducing faults to test code paths
▪ error handling code paths that might otherwise rarely be

followed
▪ Technique:

▪ Compile-time → mutation testing
▪ Run-time → use a software trigger to inject a fault into a

running software system

04/06/2025

33

Fault Injection

▪ Source code changes require recompile
▪ Binary instrumentation requires host agent
▪ API input testing requires test harness
▪ Network input testing requires additional network node
▪ Code Insertion
▪ State Corruption
▪ Fatal Exception

04/06/2025

34

Fault Model for a Web App

▪ Server

▪ State manipulation
▪ Access control
▪ Backend attack (malicious input/content)

▪ Client

▪ Bypass input restriction
▪ State manipulation
▪ Abuse active content

▪ Network

04/06/2025

35

Mutation Testing

▪ Create faulty versions (mutants) of a program by automatically altering

program statements
▪ e.g., changing an operator or a variable with another one in expressions
▪ The quality of a test suite is assessed by measuring whether it can detect

the artificial defects (kill the mutants).
▪ if NOT, new test cases have to be added, to increase the fault exposing

potential of the test suite, until all of the mutants are killed.

▪ An important issue to consider in mutation testing involves the equivalent
mutant problem. If a mutant of a program is semantically equivalent to the
original program, it can never be killed by any test case.
▪ The problem of identifying equivalent mutants is undecidable

04/06/2025

36

Destructive Testing

▪ Objective: verifies that the software functions properly even

when it receives invalid or unexpected inputs, thereby
establishing the robustness of input validation and error-
management routines.

▪ Technique:

▪ attempt to cause the software or a sub-system to fail
▪ software fault injection

04/06/2025

37

Fuzz Testing

▪ a technique, often automated or semi-automated,
▪ providing invalid, unexpected, or random data

to the inputs of a computer program.

▪ The program is then monitored for exceptions such as crashes,

or failing built-in code assertions or for finding potential memory
leaks.

▪ Fuzzing is commonly used to test for security problems in

software or computer systems.

04/06/2025

38

Regression vs. Fuzzing Testing

▪ Regression: Run program on many normal inputs, look for

badness.
▪ Goal: Prevent normal users from encountering errors (e.g.

assertions bad).

▪ Fuzzing: Run program on many abnormal inputs, look for

badness.
▪ Goal: Prevent attackers from encountering exploitable errors

(e.g. assertions often ok)

04/06/2025

39

Using Instrumentation

▪ Using Rational Purify
▪ Using API call hooks
▪ Using Code-coverage (gcov, etc)
▪ Cananocalization routines
▪ Filtering routines
▪ Decision logic
▪ Parsers

04/06/2025

40

Hailstorm  crashes MS-SQL 7

04/06/2025

41

Input Path Tracing

▪ Path tracing
▪ ltrace
▪ truss
▪ Data tracing

▪ Gdb breakpoints
▪ Modified ltrace

▪ Where is user-data getting placed?

▪ Trusted API calls?

04/06/2025

42

Boron Tagging with GDB

.text:00056140 INTutil_uri_is_evil_internal:
.text:00056140                 ldsb    [%o0], %o1
.text:00056144                 mov     1, %o3
.text:00056148                 mov     2, %o4
.text:0005614C                 cmp     %o1, 0
.text:00056150                 be,pn   %icc, loc_561F4
.text:00056154                 mov     %o0, %o5
.text:00056158                 mov     %o2, %o0
.text:0005615C                 mov     0, %o2
.text:00056160                 cmp     %o1, 0x2F
.text:00056164
.text:00056164 loc_56164:
.text:00056164                 bne,a   %icc, loc_561DC

(gdb) x/8s $o0
0x97f030: “/iplanet/servers/TEST_STRING”
0x97f064:        "ervers/docs"
0x97f070:        "/usr/local/iplanet/docs"
0x97f090:        ""
0x97f091:        "\227ð\230"
0x97f095:        ""
0x97f096:        ""
0x97f097:        ""

TEST_STRING

04/06/2025

43

Using TRUSS on Solaris

# truss -u *:: -vall -xall -p 2307 2>&1 | grep –v read | grep –v poll

The 2>&1 tag is required since truss does not deliver all of it’s data
on the stdout pipe.

The output of the command will look something like:
/67:                              <- libns-httpd40:__0FT_util_strftime_convPciTCc() = 50
/67:                              -> libns-httpd40:__0FT_util_strftime_convPciTCc(0xff2ed342, 0x2, 0x2, 0
/67:                              <- libns-httpd40:__0FT_util_strftime_convPciTCc() = 0xff2ed345
/67:                            <- libns-httpd40:INTutil_strftime() = 20
/67:                            -> libns-httpd40:INTsystem_strdup(0xff2ed330, 0x9, 0x41, 0x50)
/67:                              -> libns-httpd40:INTpool_strdup(0x9e03a0, 0xff2ed330, 0x0, 0x0)
/67:                                -> libc:strlen(0xff2ed330, 0x0, 0x0, 0x0)
/67:                                <- libc:strlen() = 20
/67:                              <- libns-httpd40:INTpool_strdup() = 0x9f8b10
/67:                            <- libns-httpd40:INTsystem_strdup() = 0x9f8b10
/67:                          <- libns-httpd40:time_cache_curr_strftime_logfmt() = 0x9f8b10
/67:                          -> libc:strcpy(0xf7400710, 0x9f8b10, 0x0, 0x7efefeff)
/67:                          <- libc:strcpy() = 0xf7400710
/67:                          -> libc:strlen(0xf7400710, 0x9f8b28, 0xf7400710, 0x0)
/67:                          <- libc:strlen() = 20
/67:                          -> libc:strlen(0x9f4f48, 0x34508f, 0x0, 0x7efefeff)
/67:                          <- libc:strlen() = 25

04/06/2025

44

Win32 hook on strcpy

04/06/2025

45

If there is code for it…

▪ What if?
▪ Assume filters fail
▪ Assume API call input can be controlled
▪ Map the capability of every DLL
▪ Controlled by process permissions and access control

04/06/2025

46

Every DLL that calls
SetSecurityDescriptorDACL

04/06/2025

47

Testing Security in Unit Tests

▪ Advantages of testing at this layer

▪ Tests are run very frequently - issues are identified quickly
▪ Most granular form of test - high test coverage

▪ Disadvantages

▪ Not many security vulnerabilities can be tested at this layer

04/06/2025

48

Introducing JUnit

Example: A single method from a shopping cart class

public void addItem(Item item, boolean inStock) {

        CartItem cartItem = (CartItem) itemMap.get(item.getItemId());

        if (cartItem == null) {

            cartItem = new CartItem();

            cartItem.setItem(item);

            cartItem.setQuantity(0);

         cartItem.setInStock(inStock);

         itemMap.put(item.getItemId(), cartItem);

            itemList.getSource().add(cartItem);

        }

        cartItem.incrementQuantity();

}

04/06/2025

49

Introducing JUnit

 Test that:

a new cart has 0 items in it
adding a single item results in that item being present in the cart
adding a single item results in the cart having a total of 1 items in

it

adding two items results in both items being present in the cart
adding two items results in the cart having a total of 2 items in it
Test  whether  adding  a  null  item  results  in  an  exception  and

nothing being set in the cart

04/06/2025

50

Introducing JUnit

public class CartTest extends TestCase {

    public CartTest(String testName) {
        super(testName);
    }

    protected void setUp() throws Exception {
        //Code here will be executed before every testXXX method
    }

    protected void tearDown() throws Exception {
        //Code here will be executed after every testXXX method
    }

    public void testNewCartHasZeroItems() {
        // Test code goes here
    }

    public void testAddSingleItem() {
        // Test code goes here
    }

    public void testAddTwoItems() {
        // Test code goes here
    }

    public void testAddNullItem() {
        // Test code goes here
    }
}

04/06/2025

51

Introducing JUnit

public void testAddTwoItems() {
        Cart instance = new Cart();
        boolean isInStock = true;

        //First add an item
        Item item = new Item();
        item.setItemId("item01");
        instance.addItem(item, isInStock);

        //Test adding a second item
        Item item2 = new Item();
        item2.setItemId("item02");
        instance.addItem(item2, isInStock);

        //Check whether item01 is in the cart
        boolean result = instance.containsItemId("item01");
        assertTrue("First item is in cart", result);

        //Check whether item02 is in the cart
        result = instance.containsItemId("item02");
        assertTrue("Second item is in cart", result);
        //Check that there are 2 items in the cart
        assertEquals("2 items in cart", instance.getNumberOfItems(), 2);
}

04/06/2025

52

Introducing JUnit

public void testAddNullItem() {

     Cart instance = new Cart();

     boolean isInStock = true;

     try {

         instance.addItem(null, isInStock);

         fail("Adding a null item did not throw an exception");

     } catch (RuntimeException expected) {

         assertTrue("null Item caught",true);

         assertEquals("Null not in cart", instance.getNumberOfItems(), 0);

     }

}

04/06/2025

53

Input Validation in Unit Tests

public void testValidPhoneNumbers() {
        //Test valid input
        String number = "232321";
        acc.setPhone(number);
        validator.validate(acc, errors);
        assertFalse(number+" caused a validation error.",

errors.hasFieldErrors("phone"));

        number = "+23 232321";
        acc.setPhone(number);
        validator.validate(acc, errors);
        assertFalse(number+" caused a validation error.",

errors.hasFieldErrors("phone"));

        number = "(44) 32321";
        acc.setPhone(number);
        validator.validate(acc, errors);
        assertFalse(number+" caused a validation error.",

errors.hasFieldErrors("phone"));

    //etc…

}

04/06/2025

54

Input Validation in Unit Tests

▪  Test Invalid Input:

   public void testIllegalCharactersInPhoneNumber() {
        String number = "+(23)';[]232 - 321";
        acc.setPhone(number);
        validator.validate(acc, errors);
        assertTrue(number+" did not cause a validation error.",
           errors.hasFieldErrors("phone"));
    }

    public void testAlphabeticInPhoneNumber() {
        String number = "12a12121";
        acc.setPhone(number);
        validator.validate(acc, errors);
        assertTrue(number+" did not cause a validation error.",
            errors.hasFieldErrors("phone"));
       }

04/06/2025

55

Other Aspects of Security in Unit Testing

▪ Input validation & encoding
▪ Encryption
▪ User and session management
▪ Error and exception handling
▪ Auditing & logging

04/06/2025

56

Testing Security in Integration Tests

▪ In-container testing

▪ Realistic and complete
▪ Requires specific tools
▪ Overhead in starting container

▪ Mock Objects

▪ Server API is faked
▪ Generic solution
▪ No container overhead

04/06/2025

57

Testing Security in Integration Tests

▪ In-container testing with Apache Cactus

▪ Popular tool for testing J2EE applications
▪ Can test EJB and Web tiers
▪ Plugin’s for Jetty, Eclipse, Ant and Maven

04/06/2025

58

Testing Security in Integration Tests

▪ Lifecycle of a single cactus test

1. beginXXX() - setup the client side
2. setUp() - common server side code
3. testXXX() - server side test
4. tearDown() - common server side code
5. endXXX() - client side tests

04/06/2025

59

Testing Security in Integration Tests

public class TestAccessControl extends ServletTestCase {

   public void beginUnprivilegedUserAccessControl(WebRequest

theRequest) {
theRequest.setAuthentication(new

BasicAuthentication("user", "password"));

   }

   public void testUnprivilegedUserAccessControl() throws

IOException, javax.servlet.ServletException {

AdminServlet admin = new AdminServlet();
admin.doGet(request, response);

  }

  public void endUnprivilegedUserAccessControl(WebResponse

theResponse) throws IOException {
 assertTrue("Normal users must not be able to access

401)

  }
}

04/06/2025

/admin", theResponse.getStatusCode() ==

60

Testing Security in Integration Tests

 Advantages of testing at this layer
 Can test in the application server
 Many security vulnerabilities can be tested, e.g.: Injection,

and Authorization flaws.

Authentication flaws

 Disadvantages

 Not executed as often as unit tests
 Overhead of starting an application server
 Some vulnerabilities may not be easily testable, e.g.: XSS, URL    filtering performed by

a web server or application firewall.

04/06/2025

61

Security Aspects on Integration Testing

▪ Dependency
▪ Architecture flaws

▪ Lack of randomness
▪ No authentication
▪ No compartments
▪ Race conditions

04/06/2025

62

Security Testing in Acceptance Tests

▪ Tests the external API
▪ Language agnostic
▪ 2 types of tools:

▪ Include their own HTTP client and HTML parser, e.g.:

HTTPUnit, jWebUnit, HtmlUnit, Canoo Webtest

▪ Drive a browser instance, e.g.: Selenium, WATIR, Watij

04/06/2025

63

Security Testing in Acceptance Tests

▪ Example: Testing HTML injection with jWebUnit

public class XSSinSearchFieldTest extends WebTestCase {
    public void setUp() throws Exception {
        getTestContext().setBaseUrl("http://example.corsaire.com/ispatula/");
    }

    public void testHtmlInjection() throws Exception {
        beginAt("/index.html");
        assertLinkPresentWithText("Enter the Store");
        clickLinkWithText("Enter the Store");
        assertFormPresent("searchForm");
        setFormElement("query",
          "<a id=\"injection\" href=\"http://www.google.com>Injection</a>");
        submit();
        assertLinkNotPresent("injection");
    }

    public XSSinSearchFieldTest(String name) {
        super(name);
    }
}

04/06/2025

64

Security Testing in Acceptance Tests

04/06/2025

65

Security Testing in Acceptance Tests

▪ Example: Testing SQL injection with WATIR

class SQL_Injection_Test < Test::Unit::TestCase

    include Watir

    def test_SQL_Blind_Injection_in_Login()

        $ie.goto('http://localhost:8080/ispatula')

        $ie.link(:url, /signonForm.do/).click

        $ie.text_field(:name, 'username').set('corsaire1\' OR 1=1--')

        $ie.form(:action, "/ispatula/shop/signon.do").submit

        assert($ie.contains_text('Signon failed'));

    end

# Snip setup code

end

04/06/2025

66

Security Testing in Acceptance Tests

▪ Example: Testing XSS with WATIR

def test_XSS_In_Search

$ie.goto('http://example.corsaire.com/ispatula/shop/index.do')

   $ie.text_field(:name, 'query').set('<script>

window.open("http://example.corsaire.com/ispatula/help.html")</script>')

   $ie.form(:action, /Search.do/).submit

   assert_raises(Watir::Exception::NoMatchingWindowFoundException,

            "Search field is susceptible to XSS") {

    ie2 = Watir::IE.attach(:url,

            "http://example.corsaire.com/ispatula/help.html")

   }

end

04/06/2025

67

Security Testing in Acceptance Tests

▪ Advantages of testing at this layer

▪ Full testing of external API
▪ Security consultants can use tools to script vulnerabilities

▪ Documents vulnerabilities
▪

Easy retesting

▪ Disadvantages

▪ Low test coverage
▪ Developers aren’t involved in testing

04/06/2025

68

Four classes of Security Attacks

▪ Dependencies

▪ Application may inherit vulnerabilities from components its dependant

upon

▪ Libraries that contain security service may fail (so application must

respond securely – defense in depth!)

▪ Unanticipated user input

▪ Reserved words, escape characters, long strings, boundary values

▪ Expose design vulnerabilities

▪ Esp. Ports open, insecure default values, test instrumentation interwoven
with implementation code [that can explicitly bypass security for ease of
testing]

▪ Expose implementation vulnerabilities

▪ Developers only understand their piece, may expose data

04/06/2025

69

User Input

▪ What can the user directly control in terms of API calls?

▪ Authentication calls
▪ Filesystem
▪ Database
▪ Command shell

04/06/2025

70

Remote Capability

▪ Do any of the native calls operate over the network?

▪ Domain specification
▪ Data source specification
▪ Ip address
▪ NTFS Path name

04/06/2025

71

Authentication

▪ Response aggregation

▪ User/password enumeration when errors differ

▪ No lockout

▪ Brute force
▪ Failed logging

▪ Alternative requests

▪ Can you specify a remote domain or target?

▪ Proxied attacks

04/06/2025

72

Filesystem

▪ Can you control a filesystem path

▪ What is the entire set of characters?
▪ Can you create files in a target directory

▪ Create files that will be interpreted in a server context

▪ Can you use remote pathname

▪ //machine_name/etc

04/06/2025

73

Security Testing Techniques

▪ OS Hardening

▪ Configure and Apply Patches
▪ Updating the Operating System
▪ Disable or Restrict unwanted Services and Ports
▪ Lock Down the Ports
▪ Manage the Log Files
▪ Install Root Certificate
▪ Protect from Internet Misuse and be Cyber Safe
▪ Protect from Malware
▪ Vulnerability Scanning

▪ Identify Known Vulnerabilities
▪ Scan Intrusively for Unknown Vulnerabilities

04/06/2025

74

Security Testing Techniques (continued…)

▪ Penetration Testing

▪ Simulating Attack from a Malicious Source
▪
Includes Network Scanning and Vulnerability Scanning
▪ Simulates Attack from someone Unfamiliar with the System
▪ Simulates Attack by having access to Source Code, Network, Passwords

▪ Port Scanning and Service Mapping

▪
▪

Identification and locating of Open Ports
Identification of Running Services

▪ Firewall Rule Testing

Identify Inappropriate or Conflicting Rules

▪
▪ Appropriate Placement of Vulnerable Systems behind Firewall
▪ Discovering Administrative Backdoors or Tunnels

▪ SQL Injection

▪ Exploits Database Layer Security Vulnerability
▪ Unexpected Execution of User Inputs

04/06/2025

75

Security Testing Techniques (continued…)

▪ Cross Side Scripting

▪
Injecting Malicious Client Side Script into Web Pages
▪ Persistent, Non-Persistent and DOM based Vulnerabilities

▪ Parameter Manipulation
▪ Cookie Manipulation
▪
▪ URL Manipulation
▪ HTTP Header Manipulation

Form Field Manipulation

▪ Denial of Service Testing

▪

Flooding a target machine with enough traffic to make it incapable

▪ Command Injection

Inject and execute commands specified by the attacker

▪
▪ Execute System level commands through a Vulnerable Application

04/06/2025

76

Security Testing Techniques (continued…)

▪ Network Scanning

Identifying Active Hosts on a network

▪
▪ Collecting IP addresses that can be accessed over the Internet
▪ Collecting OS Details, System Architecture and Running Services
▪ Collecting Network User and Group names
▪ Collecting Routing Tables and SNMP data

▪ Password Cracking

▪ Collecting Passwords from the Stored or Transmitted Data
▪ Using Brute Force and Dictionary Attacks
▪

Identifying Weak Passwords

▪ Ethical Hacking

▪ Penetration Testing, Intrusion Testing and Red Teaming

▪ File Integrity Testing

▪ Verifying File Integrity against corruption using Checksum

04/06/2025

77

Security Testing Techniques (continued…)

▪ War Dialing

▪ Using a Modem to dial a list of Telephone Numbers
▪ Searching for Computers, Bulletin Board System and Fax Machines

▪ Wireless LAN Testing

▪ Searching  for existing WLAN and logging Wireless Access Points

▪ Buffer Overflow Testing

▪ Overwriting of Memory fragments of the Process, Buffers of Char type

▪ Format String Testing

▪ Supplying Format type specifiers in the Application input

▪ Random Data Testing

▪ Random Data Inputs by a Program
▪ Encoded Random Data included as Parameters
▪ Crashing built-in code Assertions

04/06/2025

78

Security Testing Techniques (continued…)

▪ Random Mutation Testing

▪ Bit Flipping of known Legitimate Data
▪ Byte stream Sliding  within known Legitimate Data

▪ Session Hijacking

▪ Exploitation of Valid Computer Session
▪ Exploitation of the Web Session control mechanism
▪ Gain unauthorized access to the Web Server

▪ Phishing

▪ Masquerading as a trustworthy entity in an electronic communication
▪ Acquiring usernames, passwords and credit card details

▪ URL Manipulation

▪ Make a web server Deliver inaccessible web pages
▪ URL Rewriting

04/06/2025

79

Security Testing Techniques (continued…)

•

IP Spoofing
• Creating Internet Protocol (IP) packets with a forged source IP address

• Packet Sniffing

• Capture and Analyze all of the Network traffic

• Virtual Private Network Testing

• Penetration Testing

• Social Engineering

• Psychological Manipulation of People
• Divulging confidential information

04/06/2025

80

Web Application Security Standards by OWASP

▪ What is a Web Application Security Standard?

▪ Derived from an organisation’s Security Policy
▪ Similar to an Operating System Build Standard
▪ Defines how the application should behave from a security

point of view

▪ Should include functional and non-functional security aspects

04/06/2025

81

Web Application Security Standards

Example:

OWASP Testing Checklist https://github.com/OWASP/wstg/tree/master/checklist

04/06/2025

82

Category Control Question Lockout Is there an effective account lockout? Storage Are authentication credentials stored securely? Authorisation Does the application properly manage access to protected resources? Manipulation Does the application successfully enforce its access control model? Logout/Log off Is a logout function provided and effective? Transport Are Session IDs always passed and stored securely? Cookie Transport Where cookies are used, are specific secure directives used? Expiration Are session expiration criteria reasonable and complete? Input Validation Is all client-side input (including user, hidden elements, cookies etc.) adequately checked for type, length and reasonableness? Special Characters Are special characters handled securely? HTML Injection Is HTML code as input handled securely? Active script injection Is the application resilient to script commands as input? OS Injection Is access to underlying OS commands, scripts and files prevented? SQL Injection Is the application resilient to SQL command insertion? Legacy data Has all legacy data been removed from the server? Error Messages Are all error messages generic to prevent information leakage?  Web Application Security Standard

04/06/2025

83

Category Control Question Unit Integration Acceptance Lockout Is there an effective account lockout?  X X Storage Are authentication credentials stored securely?  X  Authorisation Does the application properly manage access to protected resources?  X X Manipulation Does the application successfully enforce its access control model?  X X Logout/Log off Is a logout function provided and effective?  X X Transport Are Session IDs always passed and stored securely?   X Cookie Transport Where cookies are used, are specific secure directives used?  X X Expiration Are session expiration criteria reasonable and complete?  X X Input Validation Is all client-side input (including user, hidden elements, cookies etc.) adequately checked for type, length and reasonableness? X X X Special Characters Are special characters handled securely? X X X HTML Injection Is HTML code as input handled securely?   X Active script injection Is the application resilient to script commands as input?   X OS Injection Is access to underlying OS commands, scripts and files prevented?  X X SQL Injection Is the application resilient to SQL command insertion?  X X Legacy data Has all legacy data been removed from the server?   X Error Messages Are all error messages generic to prevent information leakage?  X X  Other Remarks

▪ While development

▪ Code Review and Walkthrough

▪ In Deployment

▪ Penetration Testing
▪ Configuration Management Testing

▪ In Maintenance and Operation

▪ Operational Management Review
▪ Health Checks
▪ Change Verification

04/06/2025

84

Other Remarks

▪ Things to prepare in Penetration Testing

▪ Testing process & procedure
▪ Non-disclosure Agreement
▪ Rule of Engagement

04/06/2025

85

Conclusions

▪ Existing testing tools and techniques can be used for security

testing in the development lifecycle

▪ Developer training in security is a good investment!
▪ Security issues are identified early
▪ Code is subject to deep testing
▪ Compliance with a Web App Security Standard can be

demonstrated

04/06/2025

86




> Source taken form my own practice and review on Studzie. Examples below are taken from questions I actually got right or wrong.

## 0. The big idea

Use Desmos when the question is about where graphs meet, cross an axis, or how many times they do so, or when you must test numbers fast (Desmos also has scientific calc mode). 

Do it by hand when the question is about meaning, structure, or setting up the equation.

Quick decision test (takes 5 seconds):

1. Can I type the question as one or two equations / a table? → Desmos
2. Is the answer a graph feature (intersection, intercept)? → Desmos (If it's complex enough. If it's a simple substitutions, manual is enough)
3. Does the question have parameters ($k$, $p$, $a$, $b$)? → Desmos with sliders is possible, but algebra is usually faster. I think this point depends on the person (because I myself are not that used to using Desmos).
4. Is the question asking me to interpret or write an equation from words? → Manual
5. Is it a simple 2-step equation? → Manual (typing costs more time than solving)

## 1. Desmos toolkit (what I need to remember)

- Solve $f(x) = g(x)$: Type each side on its own line, then click the intersection point. The x-coordinate is the solution
- Solve $f(x) = 0$ / find x-intercept, zeros: Type $y = f(x)$, click where it crosses the x-axis
- y-intercept: Click where it crosses the y-axis
- System of equations: Type both equations; click the intersection
- Unknown constants ($k$, $a$, $b$): Type them in the equation; Desmos offers sliders. Drag/type until the condition is met
- Table data → equation: Make a table $x_1$, $y_1$, then click linear regression
![[Pasted image 20261026084023.png]]
- Check answer choices: Type the choice as $y = \dots$ and see if it passes through the given points
- Exact vs decimal: Desmos shows decimals. For fraction answers, convert first (e.g. $0.8571\dots$ → $6/7$)
- Equivalent expressions: Type both expressions as $y =$; if the graphs overlap perfectly, they are equivalent
- Zoom: Use the wrench icon to set the window, or the $+$ / $-$ / home buttons. If you can't see the graph, zoom out first

Habits that save points

- If nothing appears, zoom out (answers are often far from the origin).
- Rewrite the equation as $y = \dots$ only if Desmos won't accept it (it accepts $2x+3y=6$ directly).
- Add parentheses around every numerator and denominator.

## 2. Patterns that Desmos solves well

### "Solve this equation" when the algebra is ugly

Type left side and right side separately; the intersection x-value is the answer.

- Example (Linear eq. in one variable, #23): $0.8t - 0.46 = 8(t - 0.001) + 1.9$. Messy decimals. Desmos gives $t \approx  -0.3267$, matching the official answer ($-0.3267$).

### x-intercept / y-intercept / zero of a function

- Example (#30): $g(x) = 9x + 126$, find the x-intercept. Plot, click the x-axis crossing → $(-14, 0)$.
- Example (2 variables, #4, #27): intercept of $3x/7 = -5y/9 + 21$ or $(4/5)x + (1/3)y = 1$. Type the line as given and click the intercept. 

### Translations (shift up/down/left/right)

Type the original line, then the shifted version, and click the new intercept.

- Example (#11/#12): $9x - 10y = 19$ shifted down 4. Type $9x - 10(y + 4) = 19$ and click the x-intercept: $6.555\dots$ = $59/9$.
- Trap: "down 4" means $y + 4$ inside the equation, not $y - 4$. Desmos catches the sign mistake instantly because the graph visibly moves down.

### Tables → linear equation / unknown values

Enter the table in Desmos and run a regression to get slope and intercept; then evaluate.

- Example (#17): $g(2) = 46$, $g(4) = 0$, $g(8) = -92$; find $c + d$ where $g(x) = cx + d$. Regression gives $c = -23$, $d = 92$, so $c + d = 69$.
- Example (#14): points $(-18, -48)$ and $(7, 52)$; find $a$ at $x = 1/7$. Regression gives $y = 4x + 24$, and $y(1/7) = 172/7$.
- Example (#23): "which table fits the equation?" Type the equation and read off $y$ at x = 1, 2, 4, or check one row per table.

### Testing answer choices (a faster "plug in")

If the answer choices are equations or points, type each one and see which passes through the givens.

- Example (#13, lines $l$ and $m$): $l$ has slope 1/2 and x-intercept −4, so $y = 0.5x + 2$. Type each of A–D and look for the one that is perpendicular and meets $l$ on the y-axis → C $y = -2x + 2$.
- Example (#29): the line passes through $(0,6)$ and $(2,0)$. Type the choices with $R$ as a slider and see which passes through both points.

### Systems of equations (two variables, two equations)

Type both, click the intersection. This is always faster than substitution when coefficients are ugly or when you need a decimal/point.

## 3. Patterns I should do by hand

### Writing / choosing an equation from a word problem

Desmos can't read the story. The skill being tested is translation.

- Example (#1, #2, #17 (screws, frying pans, polygon sides), all hard and I missed two of three):
  "9-inch screws are 5 times the number $n$ of 7-inch screws, 4-inch screws number 22, total is 100."
  Count the number of items, not the length: $5n + n + 22 = 100$ → $6n + 22 = 100$.
  Common trap (choice A): multiplying by the lengths (9, 7, 4), which counts total inches, not total screws.
  Method: label each quantity in words first ("# of 9-inch = 5n", "# of 7-inch = n", "# of 4-inch = 22"), then add.
- Example (#29): "3 more than 8 times a number is 83" → $8x + 3 = 83$.
- Example (#27): \$0.15 per kWh + \$16 fee, 30 kWh, total $P$ → $0.15(30) + 16 = P$.

### Interpreting a term in an equation ("what does $5y$ represent?")

Pure reading comprehension; there is nothing to graph.

- Example (#20, #21, #6, #22): in $3x + 5y = 32$, $5y$ is the total cups in the large jars (not the number of jars). In $12s - 24l = 108$, $24l$ is the money received for returned tubes.
- Method: coefficient × variable = (value per unit) × (number of units) = a total. The variable alone is a count.

### Slopes of parallel / perpendicular lines

Negative reciprocal is faster mentally than graphing.

- Example (#9, which I got wrong): $(1/5)x + (1/7)y - 70 = 0$. Solve for $y$: $y = -(7/5)x + 490$, so slope $-7/5$; perpendicular slope = $+5/7$ (choice D). I picked $-7/5$, which is the slope of the same line.
- Example (#7): $3y + 12x = 5$ → slope $-4$, perpendicular $1/4$.
- Example (#28): the line perpendicular to $x = 2$ (vertical) is horizontal, so slope $0$ (not "undefined"; that was my wrong answer).
- Method: move to $y = mx + b$; parallel = same $m$; perpendicular = $-1/m$; vertical lines have undefined slope, horizontal lines have slope 0.

### Parameter problems ("no solution", "infinitely many", find $k$, $p$, $q$)

Technically possible with sliders, but structure beats trial and error:

- No solution: same $x$-coefficient, different constants.
- Infinitely many: same $x$-coefficient and same constant.
- One solution: different $x$-coefficient.
- Example (#13): $-3x + 21px = 84$, no solution. $(-3 + 21p)x = 84$ has no solution only if the coefficient is 0 → $p = 1/7$.
- Example (#15): $3(kx + 13) = (48/17)x + 36$. $3k = 48/17$ → $k = 16/17$.
- Example (#14, #2 in 2-var set): infinitely many solutions, and the question asks for a constant → match the constants only, ignore the $x$ terms.
- Example (#8): "must be true" statements (I, II, III) need logic, not a graph.

### Easy one- or two-step equations and isolating a variable

- Example (#34): $5x + 2 = 4(x - 3)$ → $x = -14$ in three lines.
- Example (#31): solve $p = 13r - 6s$ for $r$ → $r = (p + 6s)/13$. Plain algebra, and typing letters into Desmos is a waste.
- Example (#22): $5(t + 3) - 7(t + 3) = 38$ → combine like terms: $-2(t + 3) = 38$.

### "Substitute the whole expression" shortcuts

- Example (#6, #7): $(x - 5)/7 = (x - 5)/9$ → the only way both fractions are equal is $x - 5 = 0$.
- Example (#24): $5 - 7(2 - 4x) = 16 - 8(2 - 4x)$; treat $(2 - 4x)$ as one block $u$ → $u = 11$.
- Desmos would find $x$, but the question asks for the expression, and the block trick is quicker.

### Function notation

- Example (#26): $f(g(6))$ → read from the given values, $g(6) = 6$, $f(6) = 10$.

### Quick geometry / reasoning with simple numbers

- Example (#10, 2-var): parallel to $y = 8x + 2$, passes through the origin → $y = 8x$, so $d = 24$.
- Example (#1): points $(k, 13)$ and $(k+7, -15)$ → slope $-4$; the y-intercept is at $x = k - 5$, which is 5 left of $x = k$, so $b = 13 + 4(5) = 33$. Slope reasoning only, no graph needed (and $k$ is unknown, so Desmos can't plot it directly).

## 4. Hybrid approach: algebra first, Desmos to check

For medium/hard questions with a clean setup but risky arithmetic, solve manually, then verify in Desmos (type your equation and the answer; make sure the point lies where you expect). This is cheap insurance for:

- Fraction-heavy intercepts ($189/5$, $59/9$)
- Sign errors in translations
- Questions where I know I rush (all my hard-level misses)

But if it takes too much time, this can be set aside (the priority is to ensure you can get many correct answers with little time possible).

## 5. Personal error log from Review (what to fix)

- Counted total inches instead of number of screws / pans / sides (#1, #2, #17) → Write "# of X = ..." for every item before adding (Word problem setup (manual))
- $75x = -75x$ → picked "zero solutions" (#28) → I genuinely thought of $x=0$ and misread the option :D
- Translation: x-intercept after shifting down (#3, #11, #12, #15) → Desmos (translation + table regression).
- Perpendicular slope: gave the same slope or the reciprocal (#9) → Negative and reciprocal (Manual slope rule)
- Vertical line: said "undefined" for the perpendicular line (#28) → Perpendicular to vertical = horizontal = slope 0 (Manual concept)
- Interpretation: picked the count instead of the total (#20, #21) → Coefficient × variable = total amount (Manual reading)
- $b/a$ from intercepts (#19) → Compute $a$ and $b$ separately, then divide (invert and multiply) (Manual algebra)

Hopefully I can remember and incorporate all of these in my teaching ^^

%%## 6. Cheat sheet

- "How many solutions…": Desmos: graph both sides and count the intersections
- "x-intercept / y-intercept / zero": Desmos: click the crossing
- "Solve … (ugly numbers, decimals, fractions)": Desmos: intersect the two sides
- "Table of values… find the equation / $c + d$ / a value": Desmos: regression $y_1 \sim mx_1 + b$
- "Translated up/down/left/right": Desmos: plot both versions
- "Which equation passes through…" (answer choices are equations): Desmos: type each choice
- System of equations, ugly coefficients: Desmos: click the intersection
- Write an equation from a story: Manual
- "Best interpretation of the term…": Manual
- Slope / parallel / perpendicular: Manual (negative reciprocal)
- Parameter ($k$, $p$, $q$) for no / infinite solutions: Manual (compare coefficients and constants)
- Rearrange a formula, isolate a variable: Manual
- Function notation from given values: Manual
- Anything solvable in under 3 lines: Manual
%%
[[IF5100 Pemrograman untuk Data Analitik]]

---

5.1 (concept) Every correct recursion needs two things. Name them, and say what goes wrong if the second is missing.

5.2 (trace) Draw the call stack / give the return value:

```python
def fact(n):
    if n == 1:
        return 1
    return n * fact(n - 1)
print(fact(4))
```

5.3 (write) Write recursive `mult(a, b)` (repeated addition) with base case `b == 1`, matching the deck's version.

5.4 (write) Write a recursive `is_palindrome(s)`. Assume `s` is already lowercased letters only. Base case: length 0 or 1.

5.5 (write) Write recursive `fib(n)` with base cases `fib(0)=1`, `fib(1)=1`.

5.6 (concept + write) Naive `fib(5)` makes 15 calls. Explain why that's wasteful, then rewrite `fib` with memoization (a cache dict).

5.7 (write, harder) Write `hanoi(n, source, target, spare)` that prints the sequence of moves to shift `n` disks. How many moves for `n = 3`?

5.8 (concept) State the induction argument for why `mult(a, b)` returns the correct answer for all `b ≥ 1`.

---

5.1. Pembahasan: Setiap rekursi yang benar butuh **(1) base case** — kondisi yang diselesaikan langsung tanpa pemanggilan rekursif lagi, dan **(2) recursive step** — pemanggilan diri sendiri dengan input yang **direduksi** menuju base case. Jika base case hilang (atau tidak pernah tercapai karena recursive step tidak benar-benar menyederhanakan input), rekursi tidak pernah berhenti — memicu **rekursi tak berujung** (*infinite recursion*), yang di Python akan menghabiskan *call stack* dan berakhir `RecursionError: maximum recursion depth exceeded`.

5.2. Kode verifikasi:
```python
def fact(n):
    if n == 1:
        return 1
    return n * fact(n - 1)
print(fact(4))
```
Jejak call stack (menumpuk lalu *unwind*):
```
fact(4) = 4 * fact(3)
        = 4 * (3 * fact(2))
        = 4 * (3 * (2 * fact(1)))
        = 4 * (3 * (2 * 1))
        = 24
```
Output: `24`.

5.3.
```python
def mult(a, b):
    if b == 1:
        return a
    return a + mult(a, b - 1)
```

5.4.
```python
def is_palindrome(s):
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_palindrome(s[1:-1])
```
Base case: string kosong atau satu karakter otomatis palindrom. Recursive step: karakter pertama dan terakhir harus sama, lalu cek sisanya (tanpa dua ujung tersebut) secara rekursif.

5.5.
```python
def fib(n):
    if n == 0 or n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)
```

5.6. Pembahasan: `fib` naif **mengulang komputasi subproblem yang sama berkali-kali** — misalnya `fib(5)` memanggil `fib(3)` dua kali (lewat `fib(4)` dan langsung), dan tiap pemanggilan `fib(3)` mengulang lagi `fib(2)`, dst. Jumlah pemanggilan tumbuh **eksponensial** terhadap `n` (untuk `fib(5)` dengan konvensi `fib(0)=fib(1)=1`, totalnya 15 pemanggilan untuk menghasilkan jawaban `8`) walau hanya ada `n+1` subproblem unik — sangat boros.

Versi dengan memoization (cache dict) hanya menghitung tiap subproblem **sekali**:
```python
def fib_memo(n, memo=None):
    if memo is None:
        memo = {}
    if n in memo:
        return memo[n]
    if n == 0 or n == 1:
        result = 1
    else:
        result = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    memo[n] = result
    return result
```
Ini menurunkan kompleksitas dari eksponensial menjadi **linear** terhadap `n`.

5.7.
```python
def hanoi(n, source, target, spare):
    if n == 0:
        return
    hanoi(n - 1, source, spare, target)
    print("Move disk", n, "from", source, "to", target)
    hanoi(n - 1, spare, target, source)

hanoi(3, "A", "C", "B")
```
Output (dijalankan dan diverifikasi):
```
Move disk 1 from A to C
Move disk 2 from A to B
Move disk 1 from C to B
Move disk 3 from A to C
Move disk 1 from B to A
Move disk 2 from B to C
Move disk 1 from A to C
```
**7 langkah** untuk `n = 3` — sesuai rumus umum `2^n - 1` (`2^3 - 1 = 7`).

5.8. Pembahasan (induksi matematika): **Basis** — untuk `b = 1`, `mult(a, 1)` langsung mengembalikan `a` lewat base case, yang memang sama dengan `a * 1`. **Langkah induktif** — asumsikan `mult(a, b-1)` benar mengembalikan `a * (b-1)` (hipotesis induksi). Recursive step mendefinisikan `mult(a, b) = a + mult(a, b-1)`, yang menurut hipotesis induksi sama dengan `a + a*(b-1) = a*b`. Karena basis benar dan langkah induktif mempertahankan kebenaran dari `b-1` ke `b`, maka `mult(a, b)` benar untuk **semua** `b ≥ 1`.

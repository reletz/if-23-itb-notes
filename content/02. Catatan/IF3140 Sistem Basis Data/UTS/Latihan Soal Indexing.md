_Back to_ [[IF3140 Sistem Basis Data]]
94/100
![[Pasted image 20250916070942.png]]
![[Pasted image 20250916071057.png]]
![[Pasted image 20250916071819.png]]
![[Pasted image 20250916072027.png]]
![[Pasted image 20250916072153.png]]
![[Pasted image 20250916073313.png]]
![[Pasted image 20250916073441.png]]
### 1.  B+-tree
**Diagram:**
```
            +----------+
            |  11, 19  |
            +----------+
                 |
    +------------+--------------+
    |            |              |
+---+---+     +--+--+     +--+--+--+--+
|2,3,5,7|---->|11,17|---->|19,23,29,31|
+-------+     +-----+     +-----------+
```


### 2. Hash Index

**Aturan:**

- Fungsi hash: `h(x) = x mod 8`.
    
- Kapasitas bucket: 3 record.
    

**Proses Perhitungan Hash:**
- `h(17) = 17 mod 8 = 1`
- `h(3) = 3 mod 8 = 3`
- `h(2) = 2 mod 8 = 2`
- `h(11) = 11 mod 8 = 3`
- `h(19) = 19 mod 8 = 3`
- `h(7) = 7 mod 8 = 7`
- `h(29) = 29 mod 8 = 5`
- `h(23) = 23 mod 8 = 7`
- `h(31) = 31 mod 8 = 7`
- `h(5) = 5 mod 8 = 5`
    

**Diagram:**

```
 Hash Value      Bucket
+----------+    +----------------+
|    0     | -> |                |
+----------+    +----------------+
|    1     | -> | 17             |
+----------+    +----------------+
|    2     | -> | 2              |
+----------+    +----------------+
|    3     | -> | 3, 11, 19      |  <-- Penuh
+----------+    +----------------+
|    4     | -> |                |
+----------+    +----------------+
|    5     | -> | 29, 5          |
+----------+    +----------------+
|    6     | -> |                |
+----------+    +----------------+
|    7     | -> | 7, 23, 31      |  <-- Penuh
+----------+    +----------------+
```

**Penjelasan Diagram Hash:**

- Setiap nilai `search-key` dihitung nilai hash-nya menggunakan `mod 8`.
    
- Hasil hash (0 sampai 7) menentukan ke _bucket_ mana data tersebut akan disimpan.
    
- Setiap _bucket_ dapat menampung hingga 3 record. Berdasarkan data yang ada, _bucket_ untuk hash value `3` dan `7` terisi penuh.
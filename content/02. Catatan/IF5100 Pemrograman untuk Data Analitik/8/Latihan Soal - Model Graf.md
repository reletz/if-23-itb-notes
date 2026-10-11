[[IF5100 Pemrograman untuk Data Analitik]]

---

11.1 (concept) Sebutkan tiga contoh hubungan dunia nyata yang cocok dimodelkan sebagai graf, dan tiga jenis inferensi yang bisa dilakukan pada graf (per deck).

11.2 (write) Tulis class `Node`, `Edge` (berarah), dan `Digraph` berbasis adjacency list dengan method `addNode`, `addEdge`, `childrenOf`, `getNode`, dan `__str__`. `addNode` harus menolak node duplikat dan `addEdge` menolak edge yang ujungnya belum menjadi node.

11.3 (trace) Dengan class di 11.2, apa output potongan kode berikut?

```python
g = Digraph()
a, b, c = Node('A'), Node('B'), Node('C')
for n in (a, b, c):
    g.addNode(n)
g.addEdge(Edge(a, b)); g.addEdge(Edge(a, c)); g.addEdge(Edge(c, a))
print(g)
print([str(n) for n in g.childrenOf(a)], g.childrenOf(b))
```

11.4 (write) Tulis class `Graph` (tak berarah) sebagai subclass `Digraph`. Jelaskan mengapa arah pewarisannya `Graph` -> `Digraph` dan bukan sebaliknya.

11.5 (trace, deck exercise) Pada graf kota deck, tuliskan langkah DFS (dengan `toPrint=True`) untuk mencari shortest path dari **Boston** ke **Phoenix**. Apa path akhirnya?

11.6 (trace, deck exercise) Pada graf kota yang sama, tuliskan langkah BFS dari **Boston** ke **Phoenix**. Apa path akhirnya, dan mengapa BFS berhenti pada path tersebut?

11.7 (write) Berdasarkan model Euler untuk Jembatan Königsberg, tulis fungsi `hasEulerPath(edges)` yang menerima list pasangan node (graf tak berarah, edge ganda diperbolehkan, graf dianggap terhubung) dan mengembalikan `True` jika ada path yang melewati setiap edge tepat sekali. Uji pada Königsberg dengan edge: `A-B, A-B, A-C, A-C, A-D, B-D, C-D`.

11.8 (write) Modifikasi DFS agar mencari **shortest weighted path**. Buat `WEdge` (subclass `Edge` dengan bobot) dan graf dengan edge `S->T (10)`, `S->A (2)`, `A->B (3)`, `B->T (1)`. Bandingkan hasil DFS berbobot dengan hasil `BFS`.

11.9 (concept) (a) Apa yang terjadi pada DFS jika pengecekan `node not in path` dihapus pada graf yang punya siklus? (b) Mengapa `shortestPath` dibuat sebagai wrapper di atas `DFS`?

11.10 (write) Tulis fungsi `reachable(g, start)` yang mengembalikan nama-nama node (terurut) yang dapat dicapai dari `start` pada graf kota. Berapa hasilnya untuk Boston, Denver, dan Phoenix? Lalu, bila graf kota dijadikan `Graph` (tak berarah), apa hasil BFS dari Los Angeles ke Phoenix?

---

Kode helper untuk 11.5, 11.6, 11.10 (dari deck):

```python
def buildCityGraph(graphType=Digraph):
    g = graphType()
    for name in ('Boston', 'Providence', 'New York', 'Chicago',
                 'Denver', 'Phoenix', 'Los Angeles'):
        g.addNode(Node(name))
    for a, b in [('Boston','Providence'), ('Boston','New York'),
                 ('Providence','Boston'), ('Providence','New York'),
                 ('New York','Chicago'), ('Chicago','Denver'),
                 ('Chicago','Phoenix'), ('Denver','Phoenix'),
                 ('Denver','New York'), ('Los Angeles','Boston')]:
        g.addEdge(Edge(g.getNode(a), g.getNode(b)))
    return g
```

11.1. Pembahasan: Contoh hubungan: **jaringan transportasi** (rel Paris-London, jalan raya), **ikatan atom dalam molekul**, dan **silsilah/ancestral**; deck juga menyebut jaringan komputer, keuangan, sosial, politik, kriminal. Inferensi yang didukung: (1) **mencari path** dari A ke B, (2) **shortest path problem** (path berbiaya terkecil), (3) **graph partition problem** (memecah graf menjadi himpunan node terhubung), dan (4) **min-cut/max-flow** (cara paling efisien memisahkan himpunan terhubung).

11.2. Kode verifikasi:
```python
class Node(object):
    def __init__(self, name):
        self.name = name
    def getName(self):
        return self.name
    def __str__(self):
        return self.name

class Edge(object):
    def __init__(self, src, dest):
        self.src = src
        self.dest = dest
    def getSource(self):
        return self.src
    def getDestination(self):
        return self.dest
    def __str__(self):
        return self.src.getName() + '->' + self.dest.getName()

class Digraph(object):
    def __init__(self):
        self.edges = {}          # node -> list of children
    def addNode(self, node):
        if node in self.edges:
            raise ValueError('Duplicate node')
        self.edges[node] = []
    def addEdge(self, edge):
        src = edge.getSource()
        dest = edge.getDestination()
        if not (src in self.edges and dest in self.edges):
            raise ValueError('Node not in graph')
        self.edges[src].append(dest)
    def childrenOf(self, node):
        return self.edges[node]
    def getNode(self, name):
        for n in self.edges:
            if n.getName() == name:
                return n
        raise NameError(name)
    def __str__(self):
        result = ''
        for src in self.edges:
            for dest in self.edges[src]:
                result = result + src.getName() + '->' + dest.getName() + '\n'
        return result[:-1]
```
Node menjadi **key** dictionary dan edge disimpan sebagai **destination** di dalam list milik source (adjacency list). `addNode('A')` dua kali memunculkan `ValueError: Duplicate node`; `addEdge` dengan node yang belum ditambahkan memunculkan `ValueError: Node not in graph`. Keduanya sudah diuji.

11.3. Kode verifikasi menghasilkan:
```text
A->B
A->C
C->A
['B', 'C'] []
```
`print(g)` memanggil `__str__` yang mengiterasi setiap source lalu setiap destination-nya, sesuai urutan penambahan (`A`, `B`, `C`); `B` tidak punya edge keluar sehingga tidak tercetak. `childrenOf(a)` berisi `B` dan `C` (sesuai urutan `addEdge`), sedangkan `childrenOf(b)` berupa list kosong `[]`.

11.4. Kode verifikasi:
```python
class Graph(Digraph):
    def addEdge(self, edge):
        Digraph.addEdge(self, edge)
        rev = Edge(edge.getDestination(), edge.getSource())
        Digraph.addEdge(self, rev)
```
Menambahkan `Edge(a, b)` dan `Edge(a, c)` lalu `print(ug)` menghasilkan `A->B`, `A->C`, `B->A`, `C->A`. Arah pewarisan `Graph` -> `Digraph` mengikuti **Liskov Substitution Principle**: kode klien yang berjalan benar dengan `Digraph` juga berjalan benar bila diberi `Graph` (setiap edge tak berarah sekadar dua edge berarah). Sebaliknya tidak berlaku: `Graph` menjamin edge selalu simetris, sedangkan `Digraph` tidak, sehingga `Digraph` tidak bisa menggantikan `Graph` secara aman.

11.5. Kode verifikasi (`testSP('Boston', 'Phoenix')`):
```text
Current DFS path: Boston
Current DFS path: Boston->Providence
Already visited Boston
Current DFS path: Boston->Providence->New York
Current DFS path: Boston->Providence->New York->Chicago
Current DFS path: Boston->Providence->New York->Chicago->Denver
Current DFS path: Boston->Providence->New York->Chicago->Denver->Phoenix
Already visited New York
Current DFS path: Boston->Providence->New York->Chicago->Phoenix
Current DFS path: Boston->New York
Current DFS path: Boston->New York->Chicago
Current DFS path: Boston->New York->Chicago->Denver
Current DFS path: Boston->New York->Chicago->Denver->Phoenix
Already visited New York
Current DFS path: Boston->New York->Chicago->Phoenix
Shortest path from Boston to Phoenix is Boston->New York->Chicago->Phoenix
```
Pembahasan: DFS masuk lewat `Providence` dahulu (edge pertama Boston), sempat menemui `Boston` lagi (siklus, dilewati), lalu menemukan path pertama `...->Denver->Phoenix` (6 node). Karena `shortest` kini terisi, cabang berikutnya hanya dijelajahi bila `len(path) < len(shortest)`. Path `...Chicago->Phoenix` (5 node) lebih pendek dan menggantikannya. Setelah backtrack ke Boston dan mencoba `New York`, DFS menemukan `Boston->New York->Chicago->Denver->Phoenix` (5 node, belum lebih pendek dari yang ada; deck menyebutnya "shorter" secara longgar), lalu `Boston->New York->Chicago->Phoenix` (4 node, 3 edge) yang benar-benar lebih pendek dan menjadi hasil akhir. Catatan: slide deck menuliskan kesimpulan akhir `Boston->New York->Chicago->Denver->Phoenix`, namun hasil eksekusi kode menunjukkan path terpendek adalah `Boston->New York->Chicago->Phoenix` (3 edge, lebih pendek dari 4 edge).

11.6. Kode verifikasi (`BFS(g, Boston, Phoenix, True)`):
```text
Current BFS path: Boston
Current BFS path: Boston->Providence
Current BFS path: Boston->New York
Current BFS path: Boston->Providence->New York
Current BFS path: Boston->New York->Chicago
Current BFS path: Boston->Providence->New York->Chicago
Current BFS path: Boston->New York->Chicago->Denver
Current BFS path: Boston->New York->Chicago->Phoenix
```
Hasil: `Boston->New York->Chicago->Phoenix`. Queue berisi path dengan jumlah hop yang sama dahulu (0 hop, 1 hop, 2 hop, 3 hop), sehingga ketika path `Boston->New York->Chicago->Phoenix` (3 hop) pertama kali di-dequeue dan berakhir di `Phoenix`, tidak mungkin ada path dengan hop lebih sedikit, dan BFS langsung berhenti. Path `Boston->Providence->New York->Chicago` (3 hop) dan `...Denver` (3 hop) muncul lebih awal di antrean tetapi tidak berakhir di Phoenix.

11.7. Kode verifikasi:
```python
def hasEulerPath(edges):
    deg = {}
    for u, v in edges:
        deg[u] = deg.get(u, 0) + 1
        deg[v] = deg.get(v, 0) + 1
    odd = [n for n in deg if deg[n] % 2 == 1]
    return len(odd) in (0, 2)

konigsberg = [('A','B'), ('A','B'), ('A','C'), ('A','C'),
              ('A','D'), ('B','D'), ('C','D')]
print(hasEulerPath(konigsberg))                      # False
print(hasEulerPath([('A','B'), ('B','C'), ('C','A')]))  # True
print(hasEulerPath([('A','B'), ('B','C')]))          # True
```
Pembahasan: Pada Königsberg derajat node: `A=5`, `B=3`, `C=3`, `D=3`, yaitu **empat** node berderajat ganjil, sehingga hasil `False`, sesuai pembuktian Euler. Segitiga `A-B-C` memiliki derajat semua genap (0 node ganjil) sehingga `True`; path `A-B-C` memiliki dua node ganjil (`A` dan `C`) sehingga juga `True`. Aturan ini valid untuk graf terhubung.

11.8. Kode verifikasi:
```python
class WEdge(Edge):
    def __init__(self, src, dest, weight):
        Edge.__init__(self, src, dest)
        self.weight = weight
    def getWeight(self):
        return self.weight

class WDigraph(Digraph):
    def __init__(self):
        Digraph.__init__(self)
        self.w = {}
    def addEdge(self, edge):
        Digraph.addEdge(self, edge)
        self.w[(edge.getSource(), edge.getDestination())] = edge.getWeight()
    def weight(self, s, d):
        return self.w[(s, d)]

def pathWeight(g, path):
    return sum(g.weight(path[i], path[i+1]) for i in range(len(path) - 1))

def wDFS(g, start, end, path, shortest):
    path = path + [start]
    if start == end:
        return path
    for node in g.childrenOf(start):
        if node not in path:
            if shortest is None or \
               pathWeight(g, path + [node]) < pathWeight(g, shortest):
                newPath = wDFS(g, node, end, path, shortest)
                if newPath is not None:
                    shortest = newPath
    return shortest
```
Hasil: `wDFS` menghasilkan `S->A->B->T` dengan total bobot `6`, sedangkan `BFS` menghasilkan `S->T` (1 hop, bobot `10`). Pembahasan: BFS hanya menjamin **jumlah edge** minimum, sehingga path 1 hop dengan bobot 10 dipilih padahal path 3 hop dengan bobot 6 lebih murah. Inilah alasan deck menyatakan BFS tidak dapat dipakai langsung untuk shortest weighted path, sedangkan DFS cukup mengganti perbandingan `len(path)` dengan total bobot (pruning memakai bobot positif: path parsial yang sudah lebih berat dari `shortest` tidak mungkin menjadi lebih baik).

11.9. Pembahasan: (a) Tanpa `node not in path`, DFS pada graf bersiklus akan berputar tanpa henti (misal `Boston->Providence->Boston->Providence...`) dan menghasilkan **rekursi tak berhingga** (akhirnya `RecursionError`). Pengecekan itu menjaga agar tidak ada node yang muncul dua kali dalam path yang sedang dibangun, yaitu mencegah siklus. Berbeda dengan search tree knapsack yang bebas siklus, graf boleh memiliki siklus. (b) `shortestPath` adalah **wrapper** yang memberi nilai awal yang benar (`path=[]`, `shortest=None`) dan menyembunyikan parameter internal rekursi (`path`, `shortest`) dari pengguna. Dengan begitu antarmuka publiknya cukup `shortestPath(graph, start, end)`, sesuai prinsip **abstraksi**.

11.10. Kode verifikasi:
```python
def reachable(g, start):
    seen, stack = [], [start]
    while stack:
        n = stack.pop()
        if n in seen:
            continue
        seen.append(n)
        stack.extend(g.childrenOf(n))
    return sorted(str(n) for n in seen)

g = buildCityGraph()
print(reachable(g, g.getNode('Boston')))
print(reachable(g, g.getNode('Denver')))
print(reachable(g, g.getNode('Phoenix')))
```
Hasil: dari `Boston`: `['Boston', 'Chicago', 'Denver', 'New York', 'Phoenix', 'Providence']` (6 node, `Los Angeles` tidak tercapai karena tidak ada edge masuk ke sana); dari `Denver`: `['Chicago', 'Denver', 'New York', 'Phoenix']` (lewat `New York` kembali ke `Chicago`); dari `Phoenix`: `['Phoenix']` (tidak punya edge keluar). Bila graf kota dibuat dengan `buildCityGraph(Graph)` (setiap edge dua arah), BFS dari `Los Angeles` ke `Phoenix` menghasilkan `Los Angeles->Boston->New York->Chicago->Phoenix`, sama dengan versi berarah karena path tersebut sudah searah edge. Perbedaannya: pada versi berarah `BFS(g, Phoenix, Boston)` mengembalikan `None` (Phoenix tidak punya edge keluar), sedangkan pada `Graph` path tersebut ada karena edge bisa dilewati dua arah.

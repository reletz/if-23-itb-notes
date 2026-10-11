---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Shortest Path - DFS dan BFS
>
> > ## Questions/Cues
> >
> > - Apa definisi **shortest path** dan **shortest weighted path**?
> > - Bagaimana cara kerja **DFS** pada graf, dan mengapa harus melacak node yang sudah dikunjungi?
> > - Mengapa DFS dipanggil lewat fungsi wrapper `shortestPath`?
> > - Bagaimana **BFS** bekerja, dan apa beda utamanya dengan DFS?
> > - Mengapa BFS tidak bisa dipakai langsung untuk shortest path berbobot, sedangkan DFS bisa?
> >
> > ## Reference Points
> >
> > - IF5100 — Graph Models (Slides 20-34)
>
> > ### Masalah Shortest Path
> >
> > **Shortest path** dari `n1` ke `n2` adalah urutan edge terpendek sehingga:
> >
> > - source edge pertama adalah `n1`,
> > - destination edge terakhir adalah `n2`,
> > - untuk dua edge berurutan `e1` lalu `e2`, source `e2` adalah destination `e1`.
> >
> > **Shortest weighted path** meminimalkan **jumlah bobot** edge pada path. Aplikasinya: mencari rute antar kota, merancang jaringan komunikasi, bernavigasi dalam labirin kimia, dan sebagainya.
> >
> > ### Contoh: Graf Kota
> >
> > Deck memakai digraph tujuh kota dengan adjacency list berikut:
> >
> > | Node | Children |
> > | --- | --- |
> > | Boston | Providence, New York |
> > | Providence | Boston, New York |
> > | New York | Chicago |
> > | Chicago | Denver, Phoenix |
> > | Denver | Phoenix, New York |
> > | Los Angeles | Boston |
> > | Phoenix | (tidak ada) |
> >
> > ```mermaid
> > graph LR
> >     Boston --> Providence
> >     Boston --> NY[New York]
> >     Providence --> Boston
> >     Providence --> NY
> >     NY --> Chicago
> >     Chicago --> Denver
> >     Chicago --> Phoenix
> >     Denver --> Phoenix
> >     Denver --> NY
> >     LA[Los Angeles] --> Boston
> > ```
> >
> > Grafnya dibangun dengan membuat tujuh `Node` lewat `addNode`, lalu memanggil `addEdge(Edge(g.getNode(a), g.getNode(b)))` untuk setiap panah.
> >
> > ```python
> > def buildCityGraph():
> >     g = Digraph()
> >     for name in ('Boston', 'Providence', 'New York', 'Chicago',
> >                  'Denver', 'Phoenix', 'Los Angeles'):  # create 7 nodes
> >         g.addNode(Node(name))
> >     g.addEdge(Edge(g.getNode('Boston'), g.getNode('Providence')))
> >     g.addEdge(Edge(g.getNode('Boston'), g.getNode('New York')))
> >     g.addEdge(Edge(g.getNode('Providence'), g.getNode('Boston')))
> >     g.addEdge(Edge(g.getNode('Providence'), g.getNode('New York')))
> >     g.addEdge(Edge(g.getNode('New York'), g.getNode('Chicago')))
> >     g.addEdge(Edge(g.getNode('Chicago'), g.getNode('Denver')))
> >     g.addEdge(Edge(g.getNode('Chicago'), g.getNode('Phoenix')))
> >     g.addEdge(Edge(g.getNode('Denver'), g.getNode('Phoenix')))
> >     g.addEdge(Edge(g.getNode('Denver'), g.getNode('New York')))
> >     g.addEdge(Edge(g.getNode('Los Angeles'), g.getNode('Boston')))
> >     return g
> > ```
> >
> > ### Algoritma 1: Depth First Search (DFS)
> >
> > DFS mirip enumerasi search tree secara **left-first depth-first**. Bedanya, graf bisa memiliki **siklus**, sehingga kita harus **mencatat node yang sudah dikunjungi** agar tidak terjebak loop tak hingga. DFS memakai prinsip **divide-and-conquer**: path dari sumber ke node antara digabung dengan path dari node antara ke tujuan.
> >
> > Langkahnya:
> >
> > 1. Mulai dari node awal, pertimbangkan semua edge keluar dalam suatu urutan.
> > 2. Ikuti edge pertama dan cek apakah sudah di node tujuan; jika belum, ulangi dari node baru.
> > 3. Lanjutkan sampai tujuan ditemukan atau opsi habis.
> > 4. Saat opsi habis, **backtrack** ke node sebelumnya dan coba edge berikutnya.
> >
> > ```python
> > def DFS(graph, start, end, path, shortest, toPrint=False):
> >     path = path + [start]
> >     if toPrint:
> >         print('Current DFS path:', printPath(path))
> >     if start == end:
> >         return path
> >     for node in graph.childrenOf(start):
> >         if node not in path:  # avoid cycles
> >             if shortest == None or len(path) < len(shortest):
> >                 newPath = DFS(graph, node, end, path, shortest, toPrint)
> >                 if newPath != None:
> >                     shortest = newPath
> >         elif toPrint:
> >             print('Already visited', node)
> >     return shortest
> >
> > def shortestPath(graph, start, end, toPrint=False):
> >     return DFS(graph, start, end, [], None, toPrint)
> > ```
> >
> > `shortestPath` adalah **wrapper** (pola umum fungsi rekursif): ia memulai rekursi dengan benar (`path=[]`, `shortest=None`) dan memberi abstraksi yang bersih, sehingga pengguna tidak perlu tahu parameter `path` dan `shortest`. Pruning `len(path) < len(shortest)` membuang cabang yang sudah tidak mungkin lebih pendek.
> >
> > Jejak DFS dari Chicago ke Boston (tidak ada path karena tidak ada edge yang mengarah kembali ke Boston dari Chicago):
> >
> > ```text
> > Current DFS path: Chicago
> > Current DFS path: Chicago->Denver
> > Current DFS path: Chicago->Denver->Phoenix
> > Current DFS path: Chicago->Denver->New York
> > Already visited Chicago
> > Current DFS path: Chicago->Phoenix
> > There is no path from Chicago to Boston
> > ```
> >
> > Pada exercise deck, DFS dari Boston ke Phoenix menemukan path berturut-turut yang makin pendek dan akhirnya `Boston->New York->Chicago->Phoenix` (lihat [[Latihan Soal - Model Graf]], soal 11.5).
> >
> > ### Algoritma 2: Breadth First Search (BFS)
> >
> > BFS **iteratif** (berbeda dengan DFS yang rekursif) dan menjelajahi **semua path dengan n hop sebelum path dengan lebih dari n hop**:
> >
> > 1. Mulai dari node awal, ikuti tiap edge keluarnya.
> > 2. Jika tujuan belum ketemu, pindah ke node berikutnya pada jarak yang sama dari awal.
> > 3. Setelah level itu habis, pindah ke level berikutnya (node yang satu langkah lebih jauh).
> >
> > ```python
> > def BFS(graph, start, end, toPrint=False):
> >     initPath = [start]
> >     pathQueue = [initPath]
> >     while len(pathQueue) != 0:
> >         tmpPath = pathQueue.pop(0)  # dequeue
> >         if toPrint:
> >             print('Current BFS path:', printPath(tmpPath))
> >         lastNode = tmpPath[-1]
> >         if lastNode == end:
> >             return tmpPath
> >         for nextNode in graph.childrenOf(lastNode):
> >             if nextNode not in tmpPath:
> >                 pathQueue.append(tmpPath + [nextNode])
> >     return None
> > ```
> >
> > Pada BFS, path pertama yang mencapai tujuan **dijamin memiliki jumlah edge minimum**, sehingga BFS bisa langsung berhenti. Dari Boston ke Phoenix hasilnya `Boston->New York->Chicago->Phoenix` (3 hop).
> >
> > ### Shortest Path Berbobot
> >
> > Bila tujuannya meminimalkan **jumlah bobot** (bukan jumlah edge):
> >
> > - **DFS mudah dimodifikasi**: bandingkan total bobot, bukan `len(path)`.
> > - **BFS tidak bisa**, karena shortest weighted path bisa memiliki **lebih banyak hop** daripada jumlah hop minimum.
> >
> > | Aspek | DFS | BFS |
> > | --- | --- | --- |
> > | Gaya | Rekursif | Iteratif (queue) |
> > | Urutan jelajah | Sedalam mungkin lalu backtrack | Level per level (n hop dulu) |
> > | Struktur data | Call stack | Queue of paths |
> > | Shortest (jumlah edge) | Setelah menjelajah (dengan pruning) | Path pertama yang sampai |
> > | Shortest weighted | Bisa dimodifikasi | Tidak bisa langsung |

> [!cornell] #### Summary
>
> **Shortest path** adalah urutan edge terpendek dari `n1` ke `n2`; **shortest weighted path** meminimalkan jumlah bobot. **DFS** (rekursif, dengan **backtracking** dan pelacakan node terkunjungi untuk menghindari siklus, dipanggil lewat wrapper `shortestPath`) menjelajah sedalam mungkin lalu mundur. **BFS** (iteratif, queue of paths) menjelajah level demi level sehingga path pertama yang tiba di tujuan sudah memiliki hop minimum. Untuk shortest path **berbobot**, DFS mudah dimodifikasi sementara BFS tidak, karena path berbobot terkecil bisa punya lebih banyak hop.

> [!ad-libitum]- Additional Information
>
> #### Algoritma Dijkstra
>
> Untuk graf berbobot non-negatif, algoritma standar adalah **Dijkstra**, yang memakai priority queue sehingga jauh lebih efisien daripada DFS yang bisa menjelajah eksponensial banyak path. Deck hanya menyinggung bahwa BFS tidak cocok untuk kasus berbobot.
>
> #### Kompleksitas
>
> Versi DFS di deck menjelajah path, bukan sekadar node, sehingga pada kasus terburuk jumlah path bisa eksponensial terhadap ukuran graf. BFS pada versi deck juga menyimpan path penuh di queue. Menyimpan hanya node terkunjungi (set `visited`) menurunkan BFS ke O(V + E).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Jalankan `testSP('Boston', 'Phoenix')` dengan `toPrint=True` dan cocokkan dengan jejak di deck.
> 2. Ubah urutan edge pada `buildCityGraph` dan amati perubahan urutan jelajah DFS.
> 3. Tulis BFS yang memakai `collections.deque` agar `pop(0)` tidak O(n).
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 15 (Graph-theoretic Models).
> - MIT OCW 6.0002, *Lecture 3: Graph-theoretic Models*.

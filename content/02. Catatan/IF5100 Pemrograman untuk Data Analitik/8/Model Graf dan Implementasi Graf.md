---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Model Graf dan Implementasi Graf
>
> > ## Questions/Cues
> >
> > - Apa itu graf, dan apa beda graf tak berarah (**graph**), berarah (**digraph**), dan berbobot (**weighted**)?
> > - Mengapa graf begitu berguna, dan masalah inferensi apa saja yang bisa dijawab dengannya?
> > - Bagaimana Euler memodelkan masalah Jembatan Königsberg, dan apa pelajarannya soal abstraksi?
> > - Bagaimana `Node`, `Edge`, dan `Digraph` diimplementasikan, dan mengapa memakai adjacency list?
> > - Apa beda adjacency matrix dan adjacency list?
> > - Mengapa `Graph` adalah subclass dari `Digraph` (bukan sebaliknya)?
> >
> > ## Reference Points
> >
> > - IF5100 — Graph Models (Slides 3-19)
>
> > ### Model Komputasional dan Definisi Graf
> >
> > **Model komputasional** adalah program yang membantu kita memahami dunia dan memecahkan masalah praktis. Sebelumnya masalah memilih makanan dipetakan menjadi **optimization problem** (knapsack); kini kita melihat kelas model lain yang disebut **graph**.
> >
> > Sebuah **graph** terdiri atas:
> >
> > - Himpunan **node** (**vertex**), yang bisa memiliki properti.
> > - Himpunan **edge** (**arc**), masing-masing berupa pasangan node.
> >   - **Undirected** (graph): edge bisa dilewati dua arah.
> >   - **Directed** (**digraph**): edge punya **source** (parent) dan **destination** (child).
> >   - **Unweighted** atau **weighted** (tiap edge punya bobot, misalnya waktu atau jarak).
> >
> > **Tree** adalah kasus khusus yang penting: digraph di mana setiap pasangan node terhubung oleh **tepat satu path**. Search tree yang dipakai untuk knapsack adalah contohnya.
> >
> > ### Mengapa Graf?
> >
> > Graf menangkap **hubungan antar entitas**: jalur kereta Paris-London, ikatan antar atom dalam molekul, hubungan silsilah. Dunia penuh dengan jaringan berbasis relasi: jaringan komputer, transportasi, keuangan, saluran air, politik, kriminal, dan sosial. Contoh di slide: peta dialog "Wizard of Oz" yang ukuran node-nya mencerminkan jumlah adegan dan warna klaster-nya mencerminkan kelompok karakter yang saling berinteraksi.
> >
> > Selain merepresentasikan relasi, graf mendukung **inferensi** pada struktur tersebut:
> >
> > - Apakah ada **path** dari A ke B?
> > - Path dengan biaya terkecil (**shortest path problem**).
> > - Memecah graf menjadi himpunan node terhubung (**graph partition problem**).
> > - Cara paling efisien memisahkan himpunan terhubung (**min-cut/max-flow problem**).
> >
> > Contoh sehari-hari: rute ke kampus. Jaringan jalan dimodelkan sebagai **digraph**: node adalah titik ujung/pertemuan jalan, edge adalah ruas jalan, dan bobot edge adalah waktu tempuh yang diharapkan (bisa diturunkan dari jarak dan kecepatan rata-rata). Masalahnya menjadi **shortest weighted path** antara rumah dan kampus.
> >
> > ### Jembatan Königsberg dan Model Euler
> >
> > Penggunaan teori graf pertama yang tercatat adalah **Seven Bridges of Königsberg** (1735, kini Kaliningrad, Rusia): mungkinkah berjalan melewati ketujuh jembatan **tepat satu kali**?
> >
> > **Leonhard Euler** memodelkannya dengan setiap pulau sebagai **node** dan setiap jembatan sebagai **undirected edge**. Model ini **mengabstraksikan detail yang tidak relevan** (ukuran pulau, panjang jembatan). Pertanyaannya menjadi: adakah path yang memuat setiap edge tepat sekali? Euler membuktikan **tidak ada solusi**, dan hasil ini menjadi fondasi teori graf.
> >
> > ```mermaid
> > graph TD
> >     L[Graph Model] --> N[Node / Vertex]
> >     L --> E[Edge / Arc]
> >     E --> U[Undirected: Graph]
> >     E --> D[Directed: Digraph]
> >     E --> W[Weighted / Unweighted]
> >     D --> T[Tree: satu path antar node]
> >     L --> I[Inferensi]
> >     I --> P[Path exists?]
> >     I --> S[Shortest path]
> >     I --> G[Graph partition]
> >     I --> M[Min-cut / Max-flow]
> > ```
> >
> > ### Implementasi: Class `Node` dan `Edge`
> >
> > Membangun graf berarti membuat **node**, **edge**, lalu merangkainya. Satu `Node` hanya menyimpan nama.
> >
> > ```python
> > class Node(object):
> >     def __init__(self, name):
> >         """Assumes name is a string"""
> >         self.name = name
> >     def getName(self):
> >         return self.name
> >     def __str__(self):
> >         return self.name
> > ```
> >
> > `Edge` (berarah) menyimpan **source** dan **destination** berupa objek `Node`:
> >
> > ```python
> > class Edge(object):
> >     def __init__(self, src, dest):
> >         """Assumes src and dest are nodes"""
> >         self.src = src
> >         self.dest = dest
> >     def getSource(self):
> >         return self.src
> >     def getDestination(self):
> >         return self.dest
> >     def __str__(self):
> >         return self.src.getName() + '->' + self.dest.getName()
> > ```
> >
> > ### Representasi Digraph: Adjacency Matrix vs Adjacency List
> >
> > - **Adjacency matrix**: baris adalah source, kolom adalah destination; sel `[s, d] = 1` jika ada edge dari `s` ke `d`, selain itu `0`. Pada digraph matriks ini **tidak simetris**.
> > - **Adjacency list**: tiap node diasosiasikan dengan **list node tujuan**.
> >
> > Deck memakai adjacency list, diimplementasikan dengan **dictionary**: node menjadi **key**, dan value-nya adalah **list children**.
> >
> > ```python
> > class Digraph(object):
> >     """edges is a dict mapping each node to a list of its children"""
> >     def __init__(self):
> >         self.edges = {}
> >     def addNode(self, node):
> >         if node in self.edges:
> >             raise ValueError('Duplicate node')
> >         else:
> >             self.edges[node] = []
> >     def addEdge(self, edge):
> >         src = edge.getSource()
> >         dest = edge.getDestination()
> >         if not (src in self.edges and dest in self.edges):
> >             raise ValueError('Node not in graph')
> >         self.edges[src].append(dest)
> >     def childrenOf(self, node):
> >         return self.edges[node]
> >     def hasNode(self, node):
> >         return node in self.edges
> >     def getNode(self, name):
> >         for n in self.edges:
> >             if n.getName() == name:
> >                 return n
> >         raise NameError(name)
> >     def __str__(self):
> >         result = ''
> >         for src in self.edges:
> >             for dest in self.edges[src]:
> >                 result = result + src.getName() + '->' + dest.getName() + '\n'
> >         return result[:-1]  # omit final newline
> > ```
> >
> > `addNode` menolak node duplikat, dan `addEdge` menolak edge yang ujungnya belum terdaftar sebagai node. `getNode` mencari node berdasarkan nama (pencarian linear), dan `__str__` mencetak satu edge per baris.
> >
> > ### Class `Graph`: Subclass dari `Digraph`
> >
> > Pada **Graph** (tak berarah), edge membolehkan lewat ke **dua arah**. Implementasinya cukup menimpa `addEdge` agar menambahkan edge **dan kebalikannya**.
> >
> > ```python
> > class Graph(Digraph):
> >     def addEdge(self, edge):
> >         Digraph.addEdge(self, edge)
> >         rev = Edge(edge.getDestination(), edge.getSource())
> >         Digraph.addEdge(self, rev)
> > ```
> >
> > Mengapa `Graph` adalah subclass dari `Digraph` dan bukan sebaliknya? Karena **Liskov Substitution Principle** (SOLID): jika kode klien bekerja benar dengan instance supertype, ia juga harus bekerja benar bila diganti instance subtype. Program apa pun yang bekerja dengan `Digraph` akan bekerja dengan `Graph` (graf tak berarah hanyalah digraph yang setiap edge-nya muncul dua arah), tetapi tidak sebaliknya.

> [!cornell] #### Summary
>
> **Graph** adalah himpunan **node** dan **edge** (undirected, **digraph**, unweighted/weighted) yang menangkap relasi antar entitas dan mendukung inferensi seperti keberadaan path, **shortest path**, **graph partition**, dan **min-cut/max-flow**. **Tree** adalah digraph khusus dengan satu path antar pasangan node. Euler memodelkan **Königsberg** dengan pulau sebagai node dan jembatan sebagai edge, mengabstraksikan detail yang tidak relevan, dan membuktikan masalahnya tak punya solusi. Implementasi Python memakai `Node`, `Edge`, dan `Digraph` berbasis **adjacency list** (dict node -> list children); `Graph` adalah subclass `Digraph` yang menambahkan edge dua arah, sesuai **Liskov Substitution Principle**.

> [!ad-libitum]- Additional Information
>
> #### Syarat Euler Path
>
> Euler menunjukkan bahwa path yang melewati setiap edge tepat sekali pada graf tak berarah terhubung hanya ada bila jumlah node berderajat ganjil adalah 0 atau 2. Pada Königsberg, keempat daratan berderajat ganjil (5, 3, 3, 3), sehingga tidak ada solusi. Lihat soal 11.7 di [[Latihan Soal - Model Graf]].
>
> #### Adjacency Matrix vs List: Trade-off
>
> | Aspek | Adjacency matrix | Adjacency list |
> | --- | --- | --- |
> | Memori | O(V^2) | O(V + E) |
> | Cek edge `s -> d` | O(1) | O(derajat `s`) |
> | Cocok untuk | graf padat | graf jarang (sparse) |
>
> Jaringan dunia nyata umumnya jarang, itulah alasan adjacency list menjadi pilihan umum.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tambahkan class `WeightedEdge` pada `Edge`, lalu simpan bobot di `Digraph`.
> 2. Implementasikan versi adjacency matrix dari `Digraph` dan bandingkan memorinya untuk graf 1000 node dengan 2000 edge.
> 3. Cari tahu library `networkx` dan bandingkan API-nya dengan class buatan sendiri.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 14.1 dan Bab 15.
> - MIT OCW 6.0002, *Lecture 3: Graph-theoretic Models*.

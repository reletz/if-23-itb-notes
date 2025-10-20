---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Model Data Berbasis Graf
> 
> > ## Questions/Cues
> >
> > - Kapan model Graf digunakan?
> >     
> > - Apa saja komponen Graf?
> >     
> > - Apa itu model **Property Graph**?
> >     
> > - Apa itu _Vertex_ dan _Edge_?
> >     
> > - Apa itu Cypher?
> >     
> > - Apa itu model **Triple-Store**?
> >     
> > - Apa itu SPARQL?
> >     
> > - Apa beda kedua model Graf?
> >     
> >
> > ## Reference Points
> >
> > - 12-IF4031-XX-DataModel.pdf (hlm. 15-20)
> >     
> 
> > ### Kapan Menggunakan Model Graf?
> >
> > Model data Graf sangat ideal ketika fokus utama aplikasi adalah pada **hubungan (**_**relationships**_**)** yang kompleks dan saling terhubung antar data. Jika aplikasi Anda memiliki banyak hubungan _many-to-many_, model Graf adalah pilihan yang tepat.
> >
> > **Contoh Kasus Penggunaan:** jejaring sosial, sistem rekomendasi, deteksi penipuan, pemetaan jaringan.
> >
> >  **Komponen Dasar Graf:**
> >
> > - **Vertices (Nodes):** Merepresentasikan entitas (misalnya, orang, tempat, produk).
> >     
> > - **Edges (Relationships/Links):** Merepresentasikan hubungan antara _vertices_. _Edge_ selalu memiliki arah, label (nama hubungan), dan bisa memiliki properti.
> >     
> >
> > ### Model Graf Utama
> >
> > Ada dua model utama untuk merepresentasikan data graf:
> >
> > **1. Property Graph Model**
> > 
> > Ini adalah model yang paling populer, digunakan oleh database seperti Neo4j.
> >
> > - **Vertex:** Memiliki ID unik, properti (pasangan kunci-nilai), serta daftar _edge_ masuk dan keluar.
> >     
> > - **Edge:** Memiliki ID unik, _vertex_ awal (_tail_), _vertex_ akhir (_head_), sebuah **label** (misalnya, `LIVES_IN`, `MARRIED_TO`), dan properti.
> >     
> >
> > - **Cypher Query Language:**  Cypher adalah bahasa kueri deklaratif untuk property graph, dirancang agar mudah dibaca dan intuitif, menggunakan sintaks visual ASCII-Art.
> > 	- `(node:Label {property: 'value'})` merepresentasikan sebuah _vertex_.
> > 	    
> > 	- `-[:RELATIONSHIP]->` merepresentasikan sebuah _edge_.
> >     
> > 	- **Contoh:** Mencari nama orang yang lahir di Amerika Serikat dan tinggal di Eropa.
> > 	
> > 	```cypher
> > 	MATCH
> > 	  (person)-[:BORN_IN]->()-[:WITHIN*0..]->(us:Location {name: 'United States'}),
> > 	  (person)-[:LIVES_IN]->()-[:WITHIN*0..]->(eu:Location {name: 'Europe'})
> > 	RETURN person.name
> > 	```
> >
> > **2. Triple-Store Model**
> > 
> > Model ini menyimpan semua informasi dalam bentuk tiga serangkai yang sangat sederhana: (Subject, Predicate, Object).
> >
> > - **Subject:** Setara dengan _vertex_.
> >     
> > - **Predicate:** Setara dengan properti atau label _edge_.
> >     
> > - **Object:** Bisa berupa nilai dari properti, atau _vertex_ lain (jika _predicate_ adalah sebuah hubungan).
> >     
> > - **Contoh:** `(Lucy, bornIn, Idaho)`
> > - **SPARQL:**  SPARQL adalah bahasa kueri untuk model triple-store, sering digunakan dalam konteks Semantic Web. Sintaksnya lebih mirip SQL dibandingkan Cypher.
> >
> > 	```sparql
> > 	SELECT ?personName WHERE {
> > 	  ?person :name ?personName .
> > 	  ?person :bornIn / :within* / :name "United States" .
> > 	  ?person :livesIn / :within* / :name "Europe" .
> > 	}
> > 	```
> >
> > ### Perbedaan Utama
> >
> > - **Property Graph:** Lebih intuitif untuk pemodelan data yang mirip dengan dunia nyata. Kueri Cypher sering kali lebih mudah dibaca untuk penelusuran graf yang kompleks.
> >     
> > - **Triple-Store:** Sangat terstandardisasi dan bagus untuk integrasi data dari berbagai sumber yang berbeda.
> >     

> [!cornell] #### Summary
> 
> **Model data Graf dirancang untuk aplikasi di mana hubungan antar data sangat penting, terdiri dari** _**Vertices**_ **(entitas) dan** _**Edges**_ **(hubungan). Dua model utamanya adalah** _**Property Graph**_ **(digunakan oleh Neo4j dengan bahasa kueri Cypher yang intuitif) yang sangat fleksibel untuk pemodelan, dan** _**Triple-Store**_ **(dikueri dengan SPARQL) yang menyimpan data dalam format (Subject, Predicate, Object) dan sangat baik untuk integrasi data terstandardisasi.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Index-Free Adjacency
> 
> Kekuatan utama dari _native graph database_ (seperti Neo4j) adalah konsep **"Index-Free Adjacency"**. Tidak seperti RDBMS yang memerlukan _index_ untuk mempercepat `JOIN`, _graph database_ menyimpan hubungan sebagai penunjuk (_pointer_) fisik langsung dari satu _node_ ke _node_ tetangganya.
> 
> Artinya, ketika Anda menjalankan kueri untuk menelusuri hubungan (misalnya, `(person)-[:FRIEND_OF]->(friend)`), _database_ tidak perlu mencari di _index_ global. Ia hanya mengikuti _pointer_ dari _node_ `person` ke _node-node_ `friend`-nya. Ini membuat performa penelusuran graf sangat cepat dan konstan, tidak peduli seberapa besar total data di dalam _database_. Waktu kueri hanya bergantung pada seberapa banyak bagian dari graf yang Anda telusuri, bukan ukuran keseluruhan graf.
> 
> #### Teori Graf Lanjutan
> 
> Model graf memungkinkan penerapan langsung algoritma-algoritma dari teori graf untuk analisis data yang canggih, seperti:
> 
> - **Shortest Path:** Menemukan jalur terpendek antara dua _node_ (misalnya, rute termurah dalam logistik atau koneksi terdekat dalam jejaring sosial).
>     
> - **Centrality Algorithms (e.g., PageRank):** Mengidentifikasi _node_ paling berpengaruh dalam jaringan (misalnya, _influencer_ di media sosial).
>     
> - **Community Detection:** Menemukan kelompok-kelompok _node_ yang saling terhubung erat (misalnya, segmentasi pelanggan atau deteksi kelompok teroris).
>
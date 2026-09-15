---
cssclasses:
  - dashboard
---
_Back to_ [[index]]

Fokusnya graph

Tujuan utamanya mengevaluasi kesehatan proyek perangkat lunak

Step 1a: Narik data dari github (Crawling)
- Ambil satu sample repo yang tidak terlalu besar (tapi dibebasin)
- coba disambungin ke neo4j

Step 1b: Visualisasi dari data ke graf; Butuh basic query interface
Butuh ada database

Platform
1. Graph Query Lang : pakai neo4j
	1. Github -> Node by neo4j (ada timestampnya)

Buat parameter, butuh pembatasan/windowing (jadi bisa milih di range tertentu untuk query)

Biar cepet mau pake neo4j browser

Sama pengen nyari knowledge gap
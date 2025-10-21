---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu Knowledge-Based Agent?
> >     
> > - Apa properti dasarnya?
> >     
> > - Jelaskan lingkungan Wumpus World.
> >     
> > - Apa model PEAS-nya?
> >     
> > - Bagaimana agen bernalar di [1,1]?
> >     
> > - Bagaimana agen menyimpulkan ada Pit?
> >     
> > - Bagaimana agen menemukan Wumpus?
> >     
> > - Bagaimana agen mencapai tujuan?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 9-15
> >     
> 
> > ### Definisi Knowledge-Based Agent (KBA)
> > 
> > **Knowledge-Based Agent (KBA)** adalah agen yang menggunakan penalaran logis (_logical reasoning_) untuk bertindak di lingkungannya. Agen ini memiliki sebuah _Knowledge Base_ (KB) atau basis pengetahuan yang berisi informasi tentang dunia.
> > 
> > Properti fundamentalnya adalah:
> > 
> > 1. Dalam setiap langkah, agen **menarik kesimpulan** dari informasi yang tersedia di KB.
> >     
> > 2. Kesimpulan tersebut **dijamin benar** jika informasi yang tersedia di KB juga benar.
> >     
> > 
> > ### Studi Kasus: Wumpus World
> > 
> > Wumpus World adalah sebuah lingkungan simulasi klasik dalam AI untuk menguji agen cerdas. Ini adalah gua dengan ruangan-ruangan, di mana agen harus mencari emas sambil menghindari Wumpus (monster) dan Pit (lubang).
> > 
> > #### Deskripsi Lingkungan (Model PEAS)
> > 
> > - **Performance Measure**: +1000 untuk menemukan emas, -1000 jika mati (jatuh ke pit atau dimakan Wumpus), -1 untuk setiap langkah, -10 untuk menggunakan panah.
> >     
> > - **Environment**: Gua berukuran 4x4, berisi agen, Wumpus, emas, dan beberapa Pit.
> >     
> > - **Actuators**: Motor untuk bergerak (Kiri, Kanan, Maju), tangan untuk mengambil (Grab), melepaskan (Release), dan menembak panah (Shoot).
> >     
> > - **Sensors**: Sensor untuk menangkap persepsi di setiap ruangan:
> >     
> > 	- **Stench** (bau busuk): Jika berada di ruangan yang bersebelahan (atas, bawah, kiri, kanan) dengan Wumpus.
> > 	    
> > 	- **Breeze** (angin sepoi-sepoi): Jika berada di ruangan yang bersebelahan dengan Pit.
> > 	    
> > 	- **Glitter** (kilau): Jika berada di ruangan yang sama dengan emas.
> > 	    
> > 	- **Bump** (benturan): Jika agen berjalan menabrak dinding.
> > 	    
> > 	- **Scream** (teriakan): Jika panah berhasil membunuh Wumpus.
> >     
> > 
> > ### Contoh Penalaran Agen di Wumpus World
> > 
> > Agen menggunakan informasi dari sensor (persepsi) untuk membangun pengetahuan dan membuat keputusan yang aman.
> > 
> > #### Langkah 1: Posisi Awal [1,1]
> > 
> > - **Persepsi di [1,1]**: [None, None, None, None, None] (Tidak ada Stench, Breeze, dll).
> >     
> > - **Penalaran & Pengetahuan Baru**:
> >     
> > 	- Karena tidak ada Stench di [1,1], maka **tidak ada Wumpus** di [1,2] dan [2,1].
> > 	    
> > 	- Karena tidak ada Breeze di [1,1], maka **tidak ada Pit** di [1,2] dan [2,1].
> >     
> > - **Kesimpulan**: Ruangan [1,2] dan [2,1] aman (OK).
> >     
> > - **Aksi**: Maju ke [2,1].
> >     
> > 
> > #### Langkah 2: Posisi di [2,1]
> > 
> > - **Persepsi di [2,1]**: [None, **Breeze**, None, None, None].
> >     
> > - **Penalaran & Pengetahuan Baru**:
> >     
> > 	- Karena ada Breeze di [2,1], maka **pasti ada Pit** di salah satu ruangan tetangga, yaitu [1,1], [2,2], atau [3,1].
> > 	    
> > 	- Kita sudah tahu dari langkah sebelumnya bahwa [1,1] aman.
> >     
> > - **Kesimpulan**: Pit pasti ada di [2,2] atau [3,1]. Kita belum tahu yang mana, jadi kita tandai `P?`.
> >     
> > - **Aksi**: Kembali ke [1,1] (yang sudah pasti aman), lalu maju ke [1,2] untuk eksplorasi.
> >     
> > 
> > #### Langkah 3: Posisi di [1,2]
> > 
> > - **Persepsi di [1,2]**: [**Stench**, None, None, None, None].
> >     
> > - **Penalaran & Pengetahuan Baru**:
> >     
> > 	- Karena ada Stench di [1,2], maka **pasti ada Wumpus** di [1,1], [2,2], atau [1,3]. Kita tahu [1,1] aman.
> > 	    
> > 	- Dari langkah sebelumnya, kita juga tahu bahwa tidak ada Stench di [2,1], yang berarti tidak ada Wumpus di [2,2].
> > 	    
> > 	- Karena tidak ada Breeze di [1,2], maka ruangan [2,2] dan [1,3] **aman dari Pit**.
> >     
> > - **Kesimpulan Logis**:
> >     
> > 	- Wumpus **pasti ada di [1,3]** (`W!`).
> > 	    
> > 	- Karena kita tahu ada Pit di [2,2] atau [3,1], dan sekarang kita tahu [2,2] aman dari Pit, maka Pit **pasti ada di [3,1]** (`P!`).
> > 	    
> > 	- Ruangan [2,2] sekarang terbukti aman sepenuhnya.
> >     
> > - **Aksi**: Pindah ke [2,2].
> >     
> > 
> > #### Langkah 4: Mencapai Tujuan
> > 
> > - **Persepsi di [2,2]**: [None, None, None, None, None]. Ini mengkonfirmasi kesimpulan kita bahwa [2,2] aman.
> >     
> > - **Aksi**: Pindah ke [2,3].
> >     
> > - **Persepsi di [2,3]**: [Stench, Breeze, **Glitter**, None, None].
> >     
> > - **Kesimpulan**: Ada emas di sini!
> >     
> > - **Aksi**: **Grab** (Ambil emas). Tujuan tercapai.
> >     

> [!cornell] #### Summary
> 
> **Seorang Knowledge-Based Agent, seperti dalam Wumpus World, beroperasi dengan secara sistematis membangun basis pengetahuan (Knowledge Base) dari persepsi sensoriknya. Dengan menerapkan penalaran logis pada pengetahuan ini, agen dapat menyimpulkan status tersembunyi dari lingkungannya (misalnya lokasi Pit dan Wumpus), mengidentifikasi ruangan yang aman, dan merencanakan serangkaian tindakan untuk mencapai tujuannya sambil meminimalkan risiko.**
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
> > - Apa itu Backward Chaining?
> >     
> > - Apa nama lain dari proses ini?
> >     
> > - Perbedaan utama dengan Forward Chaining?
> >     
> > - Bagaimana alur kerja dasarnya?
> >     
> > - Apa itu prosedur `FindOut(Goal)`?
> >     
> > - Apa itu prosedur `Monitor(Rule)`?
> >     
> > - Bagaimana proses rekursif terjadi?
> >     
> > - Apa saja fitur/keunggulan RBS?
> >     
> > 
> > ## Reference Points
> > 
> > - Materi-06-Seg-03-RBS---Backward-Chaining.pdf
> >     
> 
> > ### Definisi Backward Chaining
> > 
> > **Backward Chaining** adalah metode inferensi dalam RBS yang bekerja secara **goal-driven** (digerakkan oleh tujuan). Berbeda dengan Forward Chaining yang memulai dari fakta, Backward Chaining memulai dari sebuah hipotesis atau **tujuan (goal)** dan bekerja secara mundur untuk menemukan fakta-fakta yang mendukungnya. Proses ini sering juga disebut **Goal-Driven Reasoning**.
> > 
> > ### Perbandingan Forward vs. Backward Chaining
> > 
> > |**Fitur**|**Forward Chaining**|**Backward Chaining**|
> > |---|---|---|
> > |**Arah Penalaran**|Dari Fakta `->` ke Kesimpulan|Dari Tujuan `<-` ke Fakta|
> > |**Pemicu**|Data-driven (digerakkan data)|Goal-driven (digerakkan tujuan)|
> > |**Pencocokan**|Mencocokkan fakta dengan LHS (premis) aturan.|Mencocokkan tujuan dengan RHS (konklusi) aturan.|
> > |**Pertanyaan**|"Apa yang bisa disimpulkan dari fakta-fakta ini?"|"Apakah tujuan/hipotesis ini benar?"|
> > 
> > ### Alur Kerja Backward Chaining
> > 
> > Alur kerjanya dapat diibaratkan seperti seorang detektif yang memiliki hipotesis ("Tersangka X pelakunya") dan harus mencari bukti-bukti untuk memvalidasi hipotesis tersebut. Proses ini diimplementasikan melalui dua prosedur utama yang saling memanggil (rekursif): `FindOut` dan `Monitor`.
> > 
> > #### 1. Prosedur `FindOut(GOAL)`
> > 
> > Fungsi ini bertujuan untuk mencari tahu apakah sebuah `GOAL` (tujuan) bisa dibuktikan benar.
> > 
> > 1. Sistem mencari semua aturan di _Production Memory_ yang bagian RHS (konklusinya) bisa memenuhi `GOAL`. Aturan-aturan ini menjadi daftar kandidat.
> >     
> > 2. Sistem akan mencoba setiap aturan kandidat satu per satu dengan memanggil prosedur `Monitor(RULE)`.
> >     
> > 3. Jika tidak ada aturan yang bisa menghasilkan `GOAL`, sistem akan menganggap `GOAL` sebagai sebuah sub-tujuan yang harus ditanyakan, entah ke pengguna atau dengan mencarinya langsung di _Working Memory_.
> >     
> > 
> > #### 2. Prosedur `Monitor(RULE)`
> > 
> > Fungsi ini bertugas memeriksa apakah sebuah `RULE` (aturan) kandidat dapat dieksekusi.
> > 
> > 4. Sistem akan memeriksa setiap kondisi (premis) di bagian LHS aturan tersebut, satu per satu.
> >     
> > 5. Untuk setiap premis, sistem akan memeriksa apakah premis tersebut sudah terbukti benar (ada sebagai fakta di _Working Memory_).
> >     
> > 6. Jika sebuah premis belum diketahui nilainya, sistem akan memanggil `FindOut(premis_tersebut)`. **Di sinilah proses rekursif terjadi**, di mana sebuah premis menjadi _sub-goal_ baru yang harus dibuktikan.
> >     
> > 7. Jika semua premis di LHS berhasil dibuktikan benar, maka `RULE` tersebut dieksekusi (_fire_), dan konklusinya (RHS) ditambahkan sebagai fakta baru ke _Working Memory_.
> >     
> > 
> > ### Fitur dan Keunggulan Rule-Based System
> > 
> > Secara umum, pendekatan RBS memiliki beberapa keunggulan inheren:
> > 
> > - **Modularity**: Setiap aturan adalah sebuah potongan pengetahuan yang kecil dan relatif independen. Ini memudahkan pengelolaan basis pengetahuan.
> >     
> > - **Incrementability**: Aturan baru dapat ditambahkan ke sistem dengan mudah tanpa harus mengubah aturan-aturan lama secara drastis.
> >     
> > - **Modifiability**: Aturan yang sudah ada dapat diubah atau diperbarui secara independen.
> >     
> > - **Transparency**: Proses penalaran (terutama pada sistem yang memiliki _explanation component_) bisa dijelaskan kepada pengguna. Sistem bisa menunjukkan aturan-aturan mana yang digunakan untuk mencapai sebuah kesimpulan, sehingga tidak seperti "kotak hitam".
> >     

> [!cornell] #### Summary
> 
> **Backward Chaining adalah metode inferensi goal-driven yang dimulai dari sebuah hipotesis (tujuan) dan bekerja mundur dengan mencocokkan tujuan tersebut pada bagian konklusi (RHS) dari aturan-aturan yang ada. Melalui proses rekursif menggunakan prosedur `FindOut` dan `Monitor`, sistem mencoba membuktikan setiap premis (LHS) dari aturan tersebut, yang seringkali menjadi sub-tujuan baru, hingga semua premis terbukti benar dari fakta yang ada atau input dari pengguna. Pendekatan ini, bersama dengan sifat modular dan transparan dari RBS, menjadikannya kuat untuk tugas-tugas diagnostik dan pembuktian hipotesis.**

> [!ad-libitum]- Additional Information
> 
> #### Topik Teknis 1: Kapan Sebaiknya Menggunakan Backward Chaining?
> 
> Backward Chaining sangat efisien ketika jumlah kemungkinan hasil/kesimpulan tidak terlalu banyak, dan Anda ingin memverifikasi salah satunya. Ini membuatnya ideal untuk:
> 
> - **Sistem Diagnostik**: Misalnya, sistem diagnosis medis atau _troubleshooting_ kerusakan mesin. Anda mulai dengan hipotesis (misal: `Goal = "penyakitnya adalah demam berdarah"` atau `Goal = "kerusakannya ada di power supply"`). Sistem kemudian akan bekerja mundur, menanyakan gejala atau data yang relevan (`FindOut("apakah pasien demam tinggi?")`, `FindOut("apakah ada bintik merah?")`) untuk membuktikan atau menyangkal hipotesis tersebut.
>     
> - **Sistem Penasihat (Advisory Systems)**: Sistem yang memberikan rekomendasi. Misalnya, `Goal = "rekomendasikan investasi"`. Sistem akan mencoba membuktikan sub-goal seperti `FindOut("profil_risiko_investor")` dan `FindOut("tujuan_investasi")`.
>     
> - **Perencanaan dan Robotika**: Menemukan serangkaian tindakan untuk mencapai tujuan. `Goal = "buka pintu"`. Sistem akan mencari aturan yang RHS-nya adalah `pintu_terbuka`, lalu bekerja mundur untuk memenuhi premisnya, seperti `FindOut("pegang gagang pintu")` dan `FindOut("putar gagang pintu")`.
>     
> 
> #### Topik Teknis 2: Risiko Infinite Loops
> 
> Karena sifat rekursifnya, Backward Chaining rentan terhadap _infinite loops_ jika basis pengetahuannya tidak dirancang dengan hati-hati. Contoh sederhana:
> 
> - `Rule 1: IF B is true THEN A is true`
>     
> - `Rule 2: IF A is true THEN B is true`
>     
>  Jika kita memulai dengan FindOut(A), sistem akan menggunakan Rule 1 dan mencoba FindOut(B). Untuk membuktikan B, sistem akan menggunakan Rule 2 dan mencoba FindOut(A), yang membawa kita kembali ke titik awal. Sistem yang canggih biasanya memiliki mekanisme untuk mendeteksi perulangan seperti ini (misalnya dengan melacak tumpukan tujuan atau goal stack) dan menghentikan prosesnya.
>     
> 
> #### Eksplorasi Mandiri
> 
> - **Lacak Contoh Teater**: Ambil kembali kasus "pergi ke teater" dari materi. Mulailah dengan tujuan `FindOut(Action)`. Lacak secara manual aturan mana yang akan dicoba oleh sistem dan pertanyaan apa yang akan diajukan ke pengguna untuk membuktikan sub-tujuan seperti `FindOut(Means)` atau `FindOut(Distance)`. Anda akan melihat prosesnya sangat berbeda dibandingkan dengan Forward Chaining.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku Teks**: _Artificial Intelligence: A Modern Approach_ oleh Stuart Russell dan Peter Norvig memiliki bab yang sangat baik yang membahas kedua strategi chaining ini dengan detail.
>     
> - **MYCIN**: Cari informasi tentang **MYCIN**, salah satu _expert system_ medis paling awal dan terkenal. MYCIN menggunakan Backward Chaining untuk mendiagnosis infeksi darah dan merupakan studi kasus klasik yang hebat.
>
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
> > - Apa itu _inference_ dalam CSP?
> >     
> > - Apa itu _constraint propagation_?
> >     
> > - Apa itu _local consistency_?
> >     
> > - Apa itu _Node Consistency_?
> >     
> > - Apa itu _Arc Consistency_ (AC)?
> >     
> > - Apa itu _Path Consistency_ (PC)?
> >     
> > - Apa itu _K-Consistency_?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170_Materi04_AI-CSP.pdf (Slide 7-12)
> >     
> 
> > ### Tujuan Inference: Constraint Propagation
> > 
> > Dalam konteks CSP, _inference_ adalah proses menggunakan _constraints_ (batasan) untuk mengurangi jumlah nilai legal (pilihan yang valid) untuk setiap variabel. Proses ini disebut **Constraint Propagation**.
> > 
> > Ide utamanya adalah untuk mendeteksi ketidakkonsistenan sedini mungkin, sehingga ruang pencarian menjadi lebih kecil. Kunci dari _constraint propagation_ adalah menerapkan berbagai jenis **konsistensi lokal (local consistency)**.
> > 
> > ### 1. Node Consistency
> > 
> > Ini adalah bentuk konsistensi yang paling sederhana. Sebuah variabel dikatakan _node-consistent_ jika setiap nilai dalam domainnya memenuhi **unary constraint** (batasan pada satu variabel) dari variabel tersebut.
> > 
> > - **Contoh**: Jika kita memiliki constraint `SA ≠ hijau` dan domain awal untuk SA adalah `{merah, hijau, biru}`, maka untuk mencapai _node consistency_, kita harus menghapus `hijau` dari domain SA.
> >     
> > - **Hasil**: Domain baru untuk SA menjadi `{merah, biru}`.
> >     
> > - Sebuah jaringan CSP disebut _node-consistent_ jika semua variabel di dalamnya sudah _node-consistent_.
> >     
> > 
> > ### 2. Arc Consistency (AC)
> > 
> > Ini adalah jenis konsistensi yang paling umum digunakan. Sebuah variabel Xi​ disebut _arc-consistent_ terhadap variabel lain Xj​ jika untuk **setiap nilai** dalam domain Di​, ada **setidaknya satu nilai** dalam domain Dj​ yang memenuhi _binary constraint_ antara Xi​ dan Xj​.
> > 
> > - **Logikanya**: Jika ada nilai `v` di domain Xi​ yang tidak memiliki "pasangan" yang valid di domain Xj​, maka nilai `v` tersebut tidak mungkin menjadi bagian dari solusi, sehingga bisa dihapus.
> >     
> > - **Contoh**: Misal domain WA dan NT adalah `{merah, biru}` dan constraint-nya adalah WA $\neq$ NT. Arc (WA, NT) sudah konsisten karena jika WA=merah, NT bisa biru, dan jika WA=biru, NT bisa merah.
> >     
> > - **Contoh lain (penghapusan)**: Misal domain X = `{1, 2, 3}` dan Y = `{1, 2}` dengan constraint X<Y.
> >     
> >     - Untuk X=1, Y bisa 2 (valid).
> >         
> >     - Untuk X=2, tidak ada nilai Y yang lebih besar (tidak valid).
> >         
> >     - Untuk X=3, tidak ada nilai Y yang lebih besar (tidak valid).
> >         
> >     - Maka, nilai 2 dan 3 dihapus dari domain X. Domain baru X menjadi `{1}`.
> >         
> > 
> > ### 3. Path Consistency (PC)
> > 
> > _Path Consistency_ memperkuat konsistensi dengan melihat variabel secara bertiga. Sepasang variabel {Xi​,Xj​} dikatakan _path-consistent_ terhadap variabel perantara Xm​ jika setiap _assignment_ yang konsisten untuk {Xi​,Xj​} dapat diperluas dengan sebuah nilai untuk Xm​ sehingga constraint pada {Xi​,Xm​} dan {Xm​,Xj​} juga terpenuhi.
> > 
> > - **Contoh**: Dalam pewarnaan peta Australia dengan 2 warna (merah, biru). Pasangan `{WA, SA}` memiliki assignment konsisten `{WA=merah, SA=biru}`. Tapi, jika kita lihat variabel perantara NT, tidak ada warna yang bisa diberikan ke NT yang memenuhi constraint NT $\neq$ WA dan NT $\neq$ SA secara bersamaan. Maka, assignment `{WA=merah, SA=biru}` tidak konsisten dan dapat dieliminasi.
> >     
> > 
> > ### 4. K-Consistency
> > 
> > Ini adalah generalisasi dari konsep konsistensi.
> > 
> > - **1-Consistency**: Sama dengan _Node Consistency_.
> >     
> > - **2-Consistency**: Sama dengan _Arc Consistency_.
> >     
> > - **3-Consistency**: Sama dengan _Path Consistency_.
> >     
> > 
> > Secara umum, sebuah CSP dikatakan **k-consistent** jika untuk setiap set dari k−1 variabel yang memiliki _assignment_ konsisten, selalu ada nilai yang valid untuk variabel ke-k manapun.

> [!cornell] #### Summary
> 
> Inference dalam CSP, atau Constraint Propagation, adalah teknik untuk menyederhanakan masalah dengan menegakkan konsistensi lokal untuk mengurangi domain variabel. Mulai dari yang paling sederhana (Node Consistency untuk unary constraint), yang paling umum (Arc Consistency untuk binary constraint), hingga yang lebih kuat (Path Consistency), tujuan utamanya adalah untuk menghapus nilai-nilai yang tidak mungkin menjadi bagian dari solusi akhir, sehingga mempercepat proses pencarian.

> [!ad-libitum]- Additional Information
> 
> #### Trade-off antara Inference dan Pencarian
> 
> Menjalankan algoritma konsistensi (seperti AC-3 untuk Arc Consistency) membutuhkan waktu komputasi. Ada sebuah _trade-off_:
> 
> - **Terlalu sedikit inference**: Algoritma pencarian (seperti backtracking) harus menjelajahi ruang pencarian yang sangat besar dan akan sering menemui jalan buntu.
>     
> - **Terlalu banyak inference**: Waktu yang dihabiskan untuk melakukan _propagation_ sebelum pencarian bisa jadi lebih lama daripada waktu yang dihemat selama pencarian.
>     
> 
> _Arc Consistency_ seringkali menjadi titik tengah yang baik, karena cukup kuat untuk mengurangi domain secara signifikan namun tidak terlalu mahal secara komputasi.
> 
> #### Strong vs Weak K-Consistency
> 
> Ada juga konsep _Strong k-consistency_, yang berarti sebuah CSP bersifat _j-consistent_ untuk semua j≤k. Jika kita bisa membuat sebuah CSP menjadi _strong n-consistent_ (di mana n adalah jumlah variabel), maka solusi dapat ditemukan tanpa perlu melakukan _backtracking_ sama sekali. Namun, mencapai ini biasanya memiliki kompleksitas waktu dan ruang yang terlalu tinggi.
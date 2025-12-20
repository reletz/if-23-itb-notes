---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Tabel Informasi (Symbol Table)
> 
> > ## Questions/Cues
> >
> > - Fungsi Utama Tabel
> >     
> > - Elemen Tabel Simbol
> >     
> > - Tabel Identifier
> >     
> > - Tabel Array
> >     
> > - Tabel Blok
> >     
> > - Tabel Display
> >     
> >
> > ## Reference Points
> >
> > - Slide 16_2025: Hal 38 - 52
> >     
> 
> > ### 1. Fungsi Tabel Informasi
> >
> > Tabel informasi membantu kompiler dalam dua hal utama:
> >
> > 1. Memeriksa kebenaran semantik dari program sumber.
> >     
> > 2. Memudahkan pembuatan kode antara dan proses pembangkitan kode mesin.
> >     
> >
> > ### 2. Struktur dan Elemen Tabel
> >
> > Elemen umum yang disimpan dalam tabel meliputi:
> >
> > - Nomor urut dan Nama identifier.
> >     
> > - Tipe data dan alamat memori saat eksekusi (_Object time address_).
> >     
> > - Dimensi (untuk array).
> >     
> > - Nomor baris saat deklarasi dan referensi.
> >     
> >
> > ### 3. Implementasi Jenis-Jenis Tabel
> >
> > Kompiler menggunakan beberapa tabel khusus:
> >
> > - **Tabel Identifier:** Menampung semua nama variabel, konstanta, prosedur, dan fungsi. Mencatat level blok (_depth of block_) dan jenisnya.
> >     
> > - **Tabel Array:** Menyimpan detail khusus array: tipe indeks, tipe elemen, batas atas/bawah, jumlah elemen, dan ukuran total memori.
> >     
> > - **Tabel Blok:** Mencatat variabel yang ada pada blok yang sama. Berisi batas awal/akhir blok serta ukuran variabel/parameter dalam blok tersebut.
> >     
> > - **Tabel Real & String:** Menyimpan nilai konstanta pecahan atau teks secara terpisah.
> >     
> > - **Tabel Display:** Mencatat blok-blok yang sedang aktif. Implementasinya menggunakan konsep **Stack**.
> >     
> >
> > ### 4. Atribut dalam Tabel Identifier
> >
> > - **Objek:** Menandai apakah identifier tersebut adalah konstanta, variabel, prosedur, atau fungsi.
> >     
> > - **Tipe:** Menandai tipe data dasar (Integer, Real, Boolean, Char) atau tipe terstruktur (Array, Record).
> >     
> > - **Normal:** Digunakan pada parameter prosedur untuk membedakan pemanggilan _by value_ dan _by reference_.
> >     

> [!cornell] #### Summary
> 
> **Tabel Informasi** (atau Tabel Simbol) adalah struktur data sentral dalam kompiler untuk manajemen data identifier dan struktur program. Melalui berbagai tabel spesifik seperti **Tabel Identifier**, **Array**, **Blok**, dan **Display**, kompiler dapat melacak atribut variabel, memastikan konsistensi tipe data, dan mengatur pemetaan alamat memori selama proses pembangkitan kode.

> [!ad-libitum]- Additional Information
> 
> #### Konsep Level pada Identifier
> 
> Level identifier (depth of block) mencerminkan struktur hierarki program. Program utama biasanya berada pada level 0. Setiap prosedur atau fungsi di dalamnya naik ke level 1, dan seterusnya. Ini krusial untuk menentukan ruang lingkup (_scope_) variabel; variabel di level yang lebih dalam dapat mengakses variabel di level luarnya, tetapi tidak sebaliknya.
> 
> #### Perhitungan Ukuran Array
> 
> Ukuran total memori untuk array dihitung dengan rumus:
> 
> (Batas Atas - Batas Bawah + 1) * Ukuran per Elemen.
> 
> Informasi ini sangat penting bagi code generator untuk memesan blok memori yang tepat di RAM.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> <summary><strong>1. Apa fungsi dari Tabel Display dalam kompiler?</strong></summary>
> Tabel Display mencatat blok-blok kode yang sedang aktif saat ini menggunakan konsep Stack, yang membantu dalam pengelolaan lingkup variabel saat eksekusi.
> 
> </details>
> <details>
> <summary><strong>2. Informasi apa saja yang disimpan dalam Tabel Array?</strong></summary>
> Tipe indeks, tipe elemen, referensi elemen, batas atas/bawah, jumlah elemen, dan ukuran total memori array.
> 
> </details>
> <details>
> <summary><strong>3. Sebutkan elemen minimal yang ada dalam Tabel Identifier!</strong></summary>
> Nama identifier, jenis objek (variabel/prosedur), tipe data, level blok, dan alamat memorinya.
> 
> </details>
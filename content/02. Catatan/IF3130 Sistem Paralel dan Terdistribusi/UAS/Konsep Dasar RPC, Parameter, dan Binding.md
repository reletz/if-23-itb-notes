---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Mekanisme RPC, Representasi Data & Binding
> 
> > ## Questions/Cues
> >
> > - **RPC vs Socket**
> >     
> > - **Mekanisme Local Call (Stack)**
> >     
> > - **Peran Stub (Client/Server)**
> >     
> > - **Langkah RPC (10 Steps Detail)**
> >     
> > - **Masalah Pass by Reference**
> >     
> > - **Heterogenitas Data (5 Isu)**
> >     
> > - **XDR (Implicit) vs ASN.1 (Explicit)**
> >     
> > - **Binding: DCE Model**
> >     
> >
> > ## Reference Points
> >
> > - Slides: Page 9-22
> >     
> > - Topik: Konsep Dasar RPC
> >     
> 
> > ### Evolusi: Dari Socket ke Abstraksi RPC
> >
> > Masalah Pendekatan Socket (Low Level):
> > 
> > Pemrograman menggunakan socket (seperti connect, read, write, disconnect) dianggap terlalu sederhana namun merepotkan karena programmer harus menangani sendiri format pesan dan aliran data.
> >
> > Solusi RPC (Birrell & Nelson, 1984):
> > 
> > Mengajukan abstraksi Remote Procedure Call.
> >
> > - **Tujuan:** Mengizinkan pemanggilan fungsi di mesin lain dengan sintaks yang sama persis dengan pemanggilan fungsi lokal.
> >     
> > - **Filosofi:** Programmer tidak perlu tahu detail jaringan (port, byte ordering, socket), cukup tahu nama fungsi dan parameter.
> >     
> > - **Posisi:** Setara dengan **Layer Presentation** pada model OSI (Layer 6).
> >     
> >
> > ### Mekanisme Dasar: Procedure Call Lokal
> >
> > Sebelum memahami RPC, perlu dipahami bagaimana **Local Procedure Call** bekerja di level mesin (Slide 10-11):
> >
> > - **Peran Compiler:** Memudahkan programmer dengan menangani parameter passing dan manajemen stack.
> >     
> > - **Eksekusi `x = f(a, "text", 5)`:**
> >     
> >     1. **Push** nilai `5` ke stack.
> >         
> >     2. **Push** alamat string `"text"` ke stack.
> >         
> >     3. **Push** nilai variabel `a` ke stack.
> >         
> >     4. **Call** fungsi `f`.
> >         
> >     5. Fungsi dieksekusi, hasil disimpan di register, dan stack dibersihkan saat kembali.
> >         
> > - **RPC** mencoba meniru perilaku ini namun lintas jaringan.
> >     
> >
> > ### Mekanisme Stub (Komponen Kunci)
> >
> > Karena Server dan Client berada di address space berbeda, pemanggilan tidak bisa langsung via stack memori.
> >
> > - **Client Stub:** Prosedur lokal di sisi klien yang memiliki antarmuka (nama & parameter) sama persis dengan fungsi asli server. Tugasnya: **Marshaling** (mengemas parameter ke pesan).
> >     
> > - **Server Stub:** Prosedur di sisi server yang menerima pesan jaringan, melakukan **Unmarshaling** (membuka pesan), dan memanggil fungsi server yang sebenarnya.
> >     
> >
> > ### Alur Operasi RPC (10 Langkah Detail)
> >
> > Mengacu pada diagram di Slide 13, berikut urutan kejadian lengkapnya:
> >
> > **Sisi Client (Langkah 1-3):**
> >
> > 1. **Client Call:** Prosedur klien memanggil Client Stub secara normal (seperti local call).
> >     
> > 2. **Marshal & System Call:** Client Stub membuat pesan, memasukkan parameter (packing), dan memanggil OS lokal (System Call).
> >     
> > 3. **Send:** OS Klien mengirim pesan melalui jaringan ke mesin remote.
> >     
> >
> > **Sisi Server (Langkah 4-6):**
> > 
> > 4. Receive: OS Server menerima paket data dan menyerahkannya ke Server Stub.
> > 
> > 5. Unmarshal: Server Stub membongkar parameter dari pesan (decoding).
> > 
> > 6. Local Call: Server Stub memanggil prosedur implementasi server yang asli.
> >
> > **Balik ke Client / Reply (Langkah 7-10):**
> > 
> > 7. Return: Prosedur server selesai memproses dan mengembalikan hasil ke Server Stub.
> > 
> > 8. Marshal Reply: Server Stub mengemas hasil eksekusi ke dalam pesan jaringan.
> > 
> > 9. Send Reply: Server Stub memanggil OS Server untuk mengirim pesan balik ke Klien.
> > 
> > 10. Result: Client Stub menerima pesan, membongkar hasil (unmarshal), dan mengembalikannya ke pemanggil awal (Client Process).
> >
> > ### Parameter Passing & Tantangan Memori
> >
> > **1. Pass by Value:**
> > 
> > Mudah. Nilai variabel (misal: integer 5) cukup dikopi langsung ke dalam buffer pesan.
> >
> > **2. Pass by Reference (Pointer):**
> >
> > - **Masalah:** Mengirim alamat memori (pointer) tidak berguna karena klien dan server tidak berbagi memori (no shared memory). Alamat `0x100` di klien mungkin berisi data sampah di server.
> >     
> > - **Solusi:**
> >     
> >     - **Copy-Restore:** Stub menyalin _isi data_ yang ditunjuk pointer ke dalam pesan -> Server memproses -> Server mengirim balik data baru -> Client Stub menyalin update tersebut kembali ke alamat memori asli.
> >         
> >     - Struktur data kompleks (graf, list) harus di-serialize (diratakan) menjadi stream byte.
> >         
> >
> > ### Representasi Data (Heterogenitas)
> >
> > Komunikasi antar mesin berbeda arsitektur menimbulkan 5 masalah utama representasi (Slide 17):
> >
> > 1. **Byte Ordering:** _Little Endian_ (Intel) vs _Big Endian_ (SPARC/Network Order).
> >     
> > 2. **Ukuran Tipe Data:** Integer 32-bit vs 64-bit.
> >     
> > 3. **Floating Point:** Perbedaan standar representasi (IEEE 754 vs lainnya).
> >     
> > 4. **Character Set:** ASCII vs EBCDIC.
> >     
> > 5. **Alignment:** Aturan perataan memori (misal: harus rata kanan 4-byte).
> >     
> >
> > **Solusi Standar Encoding:**
> >
> > - **Sun RPC (XDR - eXternal Data Representation):** Menggunakan **Implicit Typing**. Hanya nilai yang dikirim dalam urutan yang disepakati. Lebih cepat tapi kedua pihak harus tahu tipe datanya secara presisi.
> >     
> > - **ISO (ASN.1 - Abstract Syntax Notation One):** Menggunakan **Explicit Typing**. Tipe data dikirim bersama nilai (Tag-Length-Value). Lebih fleksibel tapi pesan lebih besar (overhead tinggi).
> >     
> >
> > ### Binding: Menemukan Server (DCE Model)
> >
> > Bagaimana klien menemukan server yang tepat? (Slide 21)
> >
> > Masalah: Klien butuh dua hal: (1) Lokasi mesin server, (2) Port proses server.
> > 
> > Solusi DCE (Distributed Computing Environment):
> >
> > 1. **Register Endpoint:** Server menyala dan lapor ke **DCE Daemon** (di mesinnya sendiri) tentang port dinamis yang dia pakai (Endpoint Table).
> >     
> > 2. **Register Service:** Server mendaftarkan dirinya ke **Directory Machine** (server pusat) agar bisa dicari klien.
> >     
> > 3. **Look up:** Client bertanya ke Directory Machine untuk mencari lokasi mesin server.
> >     
> > 4. **Ask for Endpoint:** Client bertanya ke DCE Daemon di mesin server tersebut: "Protokol X ada di port berapa?".
> >     
> > 5. **RPC Call:** Client melakukan koneksi langsung ke port yang didapat.
> >     

> [!cornell] #### Summary
> 
> RPC (Remote Procedure Call) adalah mekanisme yang mengabstraksi komunikasi jaringan menjadi pemanggilan prosedur lokal menggunakan bantuan Stub untuk melakukan marshaling/unmarshaling parameter. Tantangan utama RPC adalah Parameter Passing (tidak ada shared memory, butuh copy-restore) dan Representasi Data (beda arsitektur, butuh XDR/ASN.1). Proses koneksi awal difasilitasi oleh mekanisme Binding yang melibatkan direktori layanan (Directory Machine) dan pemetaan port lokal (DCE Daemon/Portmapper) untuk menangani port dinamis server.

> [!ad-libitum]- Additional Information (Teknis Mendalam)
> 
> #### Marshaling Pointer Kompleks (Graph Serialization)
> 
> Jika parameter berupa Linked List atau Binary Tree, kita tidak bisa hanya mengirim node kepala. Stub harus melakukan penelusuran graf (traversal), menyalin setiap node, dan menyusunnya menjadi array linear. Di sisi penerima, struktur ini harus direkonstruksi ulang (deserialization).
> 
> #### XDR Alignment
> 
> XDR memaksa semua data berada dalam kelipatan 4 byte (32 bit). Jika Anda mengirim string "A" (1 byte), XDR akan mengirimkan 4 byte (1 byte data + 3 byte padding nol). Ini dilakukan agar CPU modern dapat membaca data lebih cepat (karena CPU suka data yang _aligned_), meskipun memboroskan bandwidth jaringan.
> 
> #### Sumber & Referensi:
> 
> - **Slide 13 & 21:** Diagram alur RPC dan Binding DCE sangat krusial untuk dipahami secara visual.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa pointer (Pass by Reference) tidak bisa dikirim mentah-mentah dalam RPC?</strong></summary>
> 
> Karena klien dan server memiliki ruang alamat memori (address space) yang terpisah. Pointer yang menunjuk ke lokasi memori X di klien tidak memiliki makna yang sama (atau menunjuk ke data sampah) di memori server.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Jelaskan perbedaan "Implicit Typing" (XDR) dan "Explicit Typing" (ASN.1)!</strong></summary>
> 
> Implicit Typing (XDR) hanya mengirimkan nilai datanya saja, sehingga pengirim dan penerima harus sudah tahu urutan tipe datanya sebelumnya. Explicit Typing (ASN.1) mengirimkan informasi tipe data bersamaan dengan nilainya, sehingga lebih fleksibel (self-describing) tetapi ukuran pesannya lebih besar.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa fungsi "DCE Daemon" dalam proses Binding RPC?</strong></summary>
> 
> DCE Daemon berfungsi sebagai penjaga tabel endpoint (Endpoint Table) di mesin server. Ia mencatat port dinamis mana yang digunakan oleh proses server tertentu, sehingga klien bisa bertanya padanya untuk mendapatkan nomor port yang benar sebelum melakukan koneksi.
> 
> </details>
---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Semantik Eksekusi, Async RPC & Implementasi Sun RPC
> 
> > ## Questions/Cues
> >
> > - **Partial Failure**
> >     
> > - **Semantik RPC (Maybe, At-least, At-most)**
> >     
> > - **Idempotent vs Non-Idempotent**
> >     
> > - **Async RPC (One-way)**
> >     
> > - **Deferred Sync RPC**
> >     
> > - **IDL (.x file)**
> >     
> > - **Output `rpcgen`**
> >     
> > - **Static Result (Server)**
> >     
> > - **`clnt_create` & Binding**
> >     
> >
> > ## Reference Points
> >
> > - Slides: Page 23-40
> >     
> > - Fokus: Error Handling & Coding
> >     
> 
> > ### 1. Tantangan Utama: Kegagalan Parsial (Partial Failure)
> >
> > Berbeda dengan _Local Procedure Call_ yang bersifat "berhasil semua" atau "gagal total" (aplikasi crash), RPC menghadapi ketidakpastian jaringan.
> >
> > - **Skenario Kegagalan:**
> >     
> >     1. Klien tidak bisa menemukan server.
> >         
> >     2. Request hilang di jalan (Server tidak pernah terima).
> >         
> >     3. Server crash saat memproses.
> >         
> >     4. Reply (balasan) hilang di jalan (Server sukses, tapi Klien tidak tahu).
> >         
> > - **Dampak:** Klien tidak bisa membedakan antara server yang lambat, mati, atau masalah jaringan.
> >     
> >
> > ### 2. Semantik Eksekusi (Jaminan RPC)
> >
> > Sistem RPC diklasifikasikan berdasarkan seberapa keras Klien mencoba mengirim ulang request saat terjadi kegagalan.
> >
> > **A. Semantik "Maybe" (0 atau 1 kali)**
> >
> > - **Prinsip:** Klien mengirim request sekali. Jika time-out/error, klien menyerah.
> >     
> > - **Hasil:** Server mungkin menjalankannya (1) atau tidak sama sekali (0).
> >     
> > - **Kelemahan:** Tidak ada jaminan sukses. Jarang dipakai untuk sistem kritis.
> >     
> >
> > **B. Semantik "At-Least-Once" (1 kali atau lebih)**
> >
> > - **Prinsip:** Klien terus melakukan _retry_ (kirim ulang) sampai mendapat konfirmasi (Reply).
> >     
> > - **Masalah:** Jika reply yang hilang (bukan request), Server akan menerima request yang sama dua kali. Server akan memproses ulang.
> >     
> > - **Syarat:** Operasi harus **IDEMPOTENT**.
> >     
> >
> > **C. Semantik "At-Most-Once" (0 atau 1 kali) - Paling Aman**
> >
> > - **Prinsip:** Server mendeteksi duplikasi. Jika request yang sama datang lagi (karena klien retry), server tidak memproses ulang, tapi mengirimkan hasil lama yang tersimpan (cache).
> >     
> > - **Keuntungan:** Menjamin operasi tidak pernah dijalankan lebih dari sekali. Aman untuk operasi **Non-Idempotent**.
> >     
> >
> > ### 3. Konsep Idempotency
> >
> > **Definisi:** Operasi yang jika dilakukan berulang kali, hasil akhirnya tetap sama dengan jika dilakukan satu kali.
> >
> > - **Operasi Idempotent (Aman diulang):**
> >     
> > 	- `x = 5;` (Assignment nilai absolut)
> > 			
> > 	- `read_file();` (Membaca data)
> > 			
> > 	- `check_balance();` (Cek saldo)
> >         
> > - **Operasi Non-Idempotent (Bahaya diulang):**
> >     
> >     - `x = x + 5;` (Increment relative)
> >         
> >     - `transfer_money();` (Transaksi finansial)
> >         
> >     - `append_to_file();` (Menambah data di akhir)
> >         
> >
> > ### 4. Variasi Komunikasi: Asynchronous RPC
> >
> > Model RPC standar memblokir Klien (_Blocking_). Klien tidak bisa kerja lain saat menunggu Server.
> >
> > **A. Asynchronous RPC (One-way)**
> >
> > - **Alur:** Klien kirim request -> Server segera kirim **ACK** (Tanda terima) -> Klien lanjut kerja.
> >     
> > - **Beda:** Klien **TIDAK** menunggu hasil pemrosesan server. Klien hanya tahu pesan "sampai".
> >     
> > - **Diagram:** Lihat Slide 27.
> >     
> >
> > **B. Deferred Synchronous RPC (Two-way Async)**
> >
> > - **Alur:**
> >     
> > 	1. Klien kirim -> Server ACK -> Klien kerja lain.
> > 			
> > 	2. Server memproses request yang berat/lama.
> > 			
> > 	3. Setelah selesai, Klien mengambil hasil (Result).
> >         
> > - **Mekanisme Ambil Hasil:**
> >     
> > 	- **Polling:** Klien bertanya berkala ("Sudah selesai?").
> > 			
> > 	- **Callback:** Server memanggil prosedur di Klien untuk memberi hasil.
> >         
> >
> > ### 5. Implementasi Praktis: Sun RPC (ONC RPC)
> >
> > Sun RPC menggunakan pendekatan berbasis **IDL (Interface Definition Language)**.
> >
> > **A. File .x (IDL)**
> > 
> > Mendefinisikan kontrak komunikasi (struct, program ID, version).
> >
> > ```
> > struct intpair { int a; int b; };
> > program MATH_PROG {
> >     version MATH_VERS {
> >         int ADD(intpair) = 1;
> >     } = 1;
> > } = 0x23451111;
> > ```
> >
> > **B. Tool rpcgen**
> > 
> > Kompilasi: rpcgen -a -C math.x. Menghasilkan:
> >
> > - `math.h`: Header file.
> >     
> > - `math_svc.c`: **Server Stub** (Main loop, register socket).
> >     
> > - `math_clnt.c`: **Client Stub** (Wrapper function).
> >     
> > - `math_xdr.c`: Marshaling data.
> >     
> >
> > **C. Kode Server (Rule: Static Result)**
> >
> > ```
> > int * add_1_svc(intpair *argp, struct svc_req *rqstp) {
> >     static int result;  // WAJIB STATIC!
> >     result = argp->a + argp->b;
> >     return &result;     // Return pointer ke static
> > }
> > ```
> >
> > _Alasan:_ Stub server butuh data tetap ada di memori setelah fungsi return untuk proses pengiriman. Variabel lokal (stack) akan hilang.
> >
> > **D. Kode Client (Rule: Binding)**
> >
> > ```
> > // 1. Binding (Tanya Portmapper)
> > clnt = clnt_create("localhost", MATH_PROG, MATH_VERS, "udp");
> > // 2. Panggil Remote Function
> > result = add_1(&args, clnt);
> > ```
> >
> > `clnt_create` menghubungi Portmapper di host tujuan untuk mendapatkan port dinamis server.

> [!cornell] #### Summary
> 
> RPC menghadapi tantangan Partial Failure yang memerlukan pemilihan semantik eksekusi: At-Most-Once (paling aman untuk transaksi non-idempotent) atau At-Least-Once (untuk operasi idempotent). Asynchronous RPC digunakan untuk menghindari blocking pada klien. Implementasi Sun RPC bergantung pada IDL (.x) dan rpcgen untuk membuat stub, serta mengharuskan penggunaan variabel static pada server dan fungsi clnt_create pada klien untuk menangani binding dinamis.

> [!ad-libitum]- Additional Information (Deep Dive)
> 
> #### Thread Safety pada Server Sun RPC
> 
> Kode default Sun RPC (seperti di slide) menggunakan `static int result`. Ini **TIDAK Thread-Safe**.
> 
> - **Masalah:** Jika Server Multithread menerima 2 request bersamaan, thread A bisa menimpa nilai `result` milik thread B sebelum thread B sempat mengirimnya balik.
>     
> - Solusi: Gunakan opsi rpcgen -M (Multi-thread safe). Mode ini mengubah signature fungsi server menjadi:
>     
>     bool_t add_1_svc(intpair *argp, int *result, struct svc_req *rqstp)
>     
>     Pointer result dialokasikan per-request, bukan global.
>     
> 
> #### Peran Portmapper (rpcbind)
> 
> Portmapper adalah layanan direktori yang selalu berjalan di port **111**.
> 
> - Server RPC (port acak) -> Daftar ke Portmapper.
>     
> - Klien RPC -> Tanya Portmapper -> Dapat Port Server -> Koneksi.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa bahaya menggunakan semantik "At-Least-Once" pada operasi Non-Idempotent?</strong></summary>
> 
> Dapat terjadi duplikasi eksekusi. Contoh: Jika reply hilang, klien akan mengirim ulang request transfer uang, menyebabkan saldo terpotong dua kali.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa perbedaan Asynchronous RPC dengan Deferred Synchronous RPC?</strong></summary>
> 
> Async RPC (One-way) klien tidak mengharapkan hasil sama sekali dari server. Deferred Sync (Two-way) klien tetap mengharapkan hasil, tetapi mengambilnya belakangan (via polling/callback) agar tidak menunggu (blocking).
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Mengapa fungsi implementasi server pada Sun RPC harus mengembalikan pointer ke variabel static?</strong></summary>
> 
> Karena stub server perlu mengakses data hasil tersebut untuk dikirim ke jaringan setelah fungsi implementasi selesai (return). Jika menggunakan variabel lokal, datanya akan terhapus dari stack.
> 
> </details>
---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Kenapa RPC dibuat?
> >     
> > - Apa itu _Stub_?
> >     
> > - Jelaskan 10 langkah alur RPC
> >     
> > - Apa itu _Marshaling_?
> >     
> > - Masalah _pass-by-reference_?
> >     
> > - 5 masalah representasi data?
> >     
> > - Solusi representasi data?
> >     
> > - _Implicit_ vs _Explicit Typing_?
> >     
> > - Apa itu _Binding_?
> >     
> > - Jelaskan alur DCE Binding
> >     
> > - 3 semantik _call_ RPC?
> >     
> > - Beda _At least once_ vs _At most once_?
> >     
> > - Apa itu _Idempotent_?
> >     
> > - 3 varian RPC Asinkronus?
> >     
> > - Apa itu _IDL_?
> >     
> > - Alur kerja IDL Compiler?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 17-40 (11 - IF3130-11-Communication-2022.pdf)
> >     
> > - Kuliah Komunikasi
> >     
> 
> > ### 1. Konsep Remote Procedure Call (RPC)
> > 
> > Pemrograman _client-server_ menggunakan _socket_ (`read`/`write`) cukup rumit. RPC (1984, Birrell & Nelson) diajukan sebagai **abstraksi** yang membuat komunikasi jaringan terlihat seperti **pemanggilan prosedur/fungsi lokal** biasa.
> > 
> > _Ide:_ Daripada `write(socket, "add,i,j")`, programmer bisa langsung menulis `k = add(i, j)`.
> > 
> > ![[Pasted image 20251111160020.png]]
> > 
> > ### 2. Stub
> > 
> > Untuk menipu _client_ agar mengira ia memanggil fungsi lokal, digunakan mekanisme **stub**.
> > 
> > - **Client Stub:** Prosedur lokal di sisi _client_ yang memiliki _interface_ (nama dan parameter) yang sama dengan prosedur _remote_. Tugasnya: melakukan _marshaling_ parameter menjadi pesan dan mengirim pesan.
> >     
> > - **Server Stub:** Prosedur di sisi _server_ yang menerima pesan. Tugasnya: melakukan _unmarshaling_ pesan menjadi parameter dan memanggil prosedur implementasi yang sebenarnya.
> >     
> > 
> > ### 3. Alur Dasar RPC (Slide 21)
> > 
> > 1. _Client process_ memanggil _client stub_ (terlihat seperti _local call_).
> >     
> > 2. _Client stub_ membuat (_build_) pesan (proses **marshaling** parameter).
> >     
> > 3. _Client stub_ memanggil OS lokal untuk mengirim pesan ke _server machine_.
> >     
> > 4. OS _server_ menerima pesan dan memberikannya ke _server stub_.
> >     
> > 5. _Server stub_ membuka (_unpack_) pesan (proses **unmarshaling**).
> >     
> > 6. _Server stub_ memanggil prosedur implementasi `add` di _server process_.
> >     
> > 7. Implementasi `add` selesai dan mengembalikan hasil ke _server stub_.
> >     
> > 8. _Server stub_ membuat pesan _reply_ (marshaling _return value_).
> >     
> > 9. OS _server_ mengirim _reply_ ke _client_, diterima OS _client_, diberikan ke _client stub_.
> >     
> > 10. _Client stub_ membuka _reply_ (unmarshaling) dan mengembalikan hasil ke _client process_.
> >     
> > 
> > ### 4. Tantangan RPC: Parameter & Data
> > 
> > **Parameter Marshaling:** Proses _packing_ parameter ke dalam pesan.
> > 
> > - **Pass-by-value:** Mudah, cukup salin nilainya ke pesan.
> >     
> > - **Pass-by-reference (Pointer):** Tidak relevan karena _client_ dan _server_ tidak berbagi memori.
> >     
> > - _Solusi:_ Salin item yang di-referensi ke pesan, kirim, _server stub_ membuat _pointer_ lokal ke data salinan itu, dan jika berubah, salin kembali ke _reply_.
> >     
> > 
> > **Representasi Data:** Mesin _client_ dan _server_ bisa berbeda dalam:
> > 
> > 1. _Byte ordering_ (Big-endian vs Little-endian).
> >     
> > 2. Ukuran _integer_ (16, 32, 64 bit).
> >     
> > 3. Representasi _floating point_.
> >     
> > 4. _Character set_ (ASCII, EBCDIC, UTF-8).
> >     
> > 5. Aturan _alignment_.
> >     
> > 
> > **Solusi:** RPC butuh **standar encoding** data.
> > 
> > - _Dulu:_ Sun RPC menggunakan **XDR** (eXternal Data Representation). ISO menggunakan **ASN.1**.
> >     
> > - _Sekarang:_ **JSON**, **XML**, **Protocol Buffers (Protobuf)**, **Apache Avro**.
> >     
> > 
> > **Typing:**
> > 
> > - _Implicit Typing_ (XDR): Hanya nilai yang dikirim. Tipe data disepakati sebelumnya. Cepat tapi tidak fleksibel.
> >     
> > - _Explicit Typing_ (ASN.1, XML, Protobuf): Tipe data dikirim bersama nilainya. Lebih fleksibel, _human-readable_ (jika XML/JSON), tapi _overhead_ lebih besar.
> >     
> > 
> > ### 5. Tantangan RPC: Binding
> > 
> > **Binding** adalah proses _client_ menemukan _host_ (mesin) dan _proses_ (server) yang tepat untuk sebuah RPC.
> > 
> > **Alur DCE Binding (Slide 29):**
> > 
> > 1. _Server_ (saat start) mendaftarkan _endpoint_ (port) ke _DCE daemon_ (agen lokal di _server machine_).
> >     
> > 2. _Server_ mendaftarkan layanannya (nama, lokasi) ke _Directory Server_ terpusat.
> >     
> > 3. _Client_ (saat ingin memanggil) bertanya ke _Directory Server_, "Di mana _server machine_ untuk layanan 'X'?"
> >     
> > 4. _Client_ bertanya ke _DCE daemon_ di _server machine_ itu, "Di _endpoint_ (port) berapa layanan 'X'?"
> >     
> > 5. _Client_ melakukan RPC ke _server machine_ di _endpoint_ yang didapat.
> >     
> > 
> > ### 6. Tantangan RPC: Semantik Error
> > 
> > Local call gagal hanya jika seluruh proses gagal (semantik exactly once).
> > 
> > Remote call (RPC) bisa gagal dengan berbagai cara:
> > 
> > - **0 kali:** Server _crash_ sebelum menjalankan kode.
> >     
> > - **1 kali:** Semua berjalan baik (ideal).
> >     
> > - **1 atau lebih kali:** _Reply_ dari server hilang di jaringan. _Client_ tidak tahu, lalu _timeout_ dan mengirim ulang _request_ (re-eksekusi).
> >     
> > 
> > Implementasi RPC umumnya menyediakan 2 semantik (pilih salah satu):
> > 
> > - **At least once:** "Setidaknya sekali". RPC akan terus di-retry sampai _client_ dapat _reply_. Aman untuk fungsi **idempotent**.
> >     
> > - **At most once:** "Paling banyak sekali". _Server_ punya mekanisme (misal: cek ID _request_) untuk mendeteksi dan membuang _request_ duplikat. Lebih sulit diimplementasi, tapi wajib untuk fungsi **non-idempotent**.
> >     
> > 
> > Idempotent: Fungsi yang aman dipanggil berkali-kali tanpa mengubah hasil (misal: getBalance(), setA(10)).
> > 
> > Non-Idempotent: Fungsi yang berbahaya jika dipanggil ulang (misal: transfer(100), addStock(10)).
> > 
> > ### 7. RPC Asinkronus
> > 
> > RPC standar bersifat sinkronus (_blocking_). Ada variasi asinkronus:
> > 
> > 1. **RPC Asinkronus (b):** _Client_ _blocking_ hanya sampai _server_ **menerima (accept)** _request_, bukan sampai selesai proses. _Client_ tidak dapat _return value_.
> > ![[Pasted image 20251111160415.png]]
> >     
> > 2. **Deferred Synchronous RPC (c):** _Client_ melakukan _call_ (b), lalu lanjut kerja. _Server_ (setelah selesai proses) memanggil _client_ kembali (menggunakan _one-way_ RPC) untuk memberikan hasilnya.
> > ![[Pasted image 20251111160427.png]]
> >     
> > 
> > ### 8. Implementasi RPC (IDL)
> > 
> > **IDL (Interface Definition Language)** adalah bahasa formal untuk mendefinisikan _interface_ (nama fungsi, parameter, tipe data) sebuah layanan RPC.
> > 
> > **Alur Kerja:**
> >  
> >  ![[Pasted image 20251111160503.png]]
> >  
> > 1. Programmer menulis `Interface.idl`.
> >     
> > 2. **IDL Compiler** (misal: `rpcgen` untuk Sun RPC) dijalankan.
> >     
> > 3. Compiler ini men-_generate_ 3 file kode: `Client stub`, `Server stub`, dan `Header file`.
> >     
> > 4. Programmer menulis kode _Client_ (yang memanggil _stub_) dan kode _Server_ (implementasi fungsi).
> >     
> > 5. Semua di-_compile_ dan di-_link_ terpisah menjadi _Client binary_ dan _Server binary_.
> >     

> [!cornell] #### Summary
> 
> **RPC adalah abstraksi** _**function call**_ **untuk sistem terdistribusi, yang menyembunyikan kompleksitas jaringan menggunakan** _**client**_ **dan** _**server stubs**_**.** _**Stubs**_ **ini di-**_**generate**_ **secara otomatis dari file **IDL (Interface Definition Language)**. Tantangan utama dalam RPC adalah **marshaling** (packing parameter), menangani perbedaan **representasi data** (via XDR, JSON, Protobuf), **binding** (penemuan layanan), dan **semantik error** (seperti** _**at-least-once**_ **untuk fungsi** _**idempotent**_ **vs** _**at-most-once**_**).**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: RPC Modern (gRPC)
> 
> RPC adalah konsep lama (1984), tapi mengalami kebangkitan besar dengan **gRPC (Google RPC)**.
> 
> - **IDL:** gRPC menggunakan **Protocol Buffers (Protobuf)** sebagai IDL-nya. Ini adalah standar dari Google untuk serialisasi data.
>     
> - **Representasi Data:** Protobuf men-serialisasi data menjadi format _binary_ yang sangat ringkas dan cepat (jauh lebih cepat dari JSON/XML). Ini adalah _explicit typing_.
>     
> - **Transport:** gRPC menggunakan **HTTP/2** sebagai protokol transport, yang memungkinkan fitur modern seperti _streaming_ dua arah dan _multiplexing_.
>     
> 
> gRPC sekarang sangat populer untuk komunikasi antar _microservices_ karena performanya yang tinggi.
> 
> #### Eksplorasi Mandiri
> 
> - Lihat contoh file `.proto` (Protocol Buffers). Perhatikan bagaimana Anda mendefinisikan _service_ (RPC) dan _message_ (data) dalam satu file.
>     
> - Bandingkan XDR (dari Sun RPC) dengan JSON. XDR adalah _implicit typing_ (hanya nilai), sedangkan JSON adalah _explicit typing_ (tipe + nilai, via `key`).
>
---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Terminologi Dasar Kriptografi
>
> > ## Questions/Cues
> >
> > - Apa itu pesan (plainteks) dan apa saja rupanya?
> > - Siapa pengirim, penerima, dan penyusup — dan apa saja yang bisa dilakukan "bad guy"?
> > - Apa beda cipherteks, enkripsi, dan dekripsi?
> > - Apa peran kunci, dan apa bunyi Prinsip Kerckhoffs?
> > - Apa itu cipher dan cryptosystem (quintuple)?
> > - Di mana enkripsi dipakai dalam praktik?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Pengantar Kriptografi (Slides 25-43)
>
> > ### Pesan, Plainteks, Pengirim, dan Penerima
> >
> > 1. **Pesan** (*message*) adalah data atau informasi yang dapat dibaca dan dimengerti maknanya, baik dipersepsi secara visual maupun audial. Di dalam kriptografi, data dan informasi disebut pesan. 
> > 	- Nama lain: **plainteks** (*plaintext*), atau *plain-image*, *plain-audio*, *plain-video* sesuai medianya. Rupa pesan bisa berupa teks, gambar, musik, video, tabel, daftar belanja, gambar 3D, hingga sinyal kontrol.
> > 2. **Pengirim** (*sender*) adalah pihak yang mengirim pesan; 
> > 3. **penerima** (*receiver*) adalah pihak yang menerimanya. Konvensi: pengirim ditokohkan sebagai **Alice**, penerima sebagai **Bob** — agar lebih manusiawi ketimbang simbol A, B, C.
> >
> > ### Penyusup dan Kemampuannya
> >
> > **Penyusup** (*intruder*) adalah pihak ketiga yang menyadap, mengintersepsi, menghapus, menambah, atau mengubah pesan. 
> > - Sebutan lain: *eavesdropper*, *enemy*, *adversary*, *interceptor*, *bad guy*. Tokohnya: **Eve, Carol, Trudy, Mallory**. 
> > - Kata Ronald Rivest, *"cryptography is about communication in the presence of adversaries."*
> >
> > Apa yang bisa dilakukan seorang "bad guy"? Banyak:
> >
> > - **Eavesdrop** — menyadap/mengintersepsi pesan.
> > - **Insert** — secara aktif menyisipkan pesan ke dalam koneksi.
> > - **Impersonation** — memalsukan (*spoof*) alamat sumber pada paket (atau field apa pun).
> > - **Hijacking** — "mengambil alih" koneksi yang sedang berjalan dengan menyingkirkan pengirim/penerima dan menyisipkan diri di tempatnya.
> > - **Denial of service** — mencegah layanan dipakai pihak lain, mis. dengan membebani sumber daya secara berlebihan.
> >
> > ### Cipherteks, Enkripsi, dan Dekripsi
> >
> > **Cipherteks** (*ciphertext*) adalah pesan yang telah disandikan sehingga tidak bermakna lagi; tujuannya agar tidak terbaca pihak yang tidak berhak. Nama lain: **kriptogram** (*cryptogram*). 
> > - Contoh: 
> > 	- plainteks `culik anak itu jam 11 siang`, menjadi 
> > 	- cipherteks`t^$gfUi89rewoFpfdWqLMp[uTcxZ`.
> >
> > - **Enkripsi** (*encryption* / *enciphering*) — proses menyandikan plainteks menjadi cipherteks.
> > - **Dekripsi** (*decryption* / *deciphering*) — proses mengembalikan cipherteks menjadi plainteks semula.
> >
> > Meskipun Eve dapat menyadap komunikasi Alice–Bob, karena pesan sudah dienkripsi menjadi cipherteks, Eve **tidak dapat memahami** isi pesan yang disadapnya. Enkripsi bekerja untuk teks, gambar (*plain-image* → *cipher-image*), maupun video.
> >
> > ### Kunci dan Prinsip Kerckhoffs
> >
> > Agar enkripsi dan dekripsi hanya dapat dilakukan oleh dua pihak yang berkomunikasi, diperlukan **kunci** (*key*) rahasia. Kunci adalah **parameter** yang digunakan dalam enkripsi dan dekripsi, disimbolkan **K** (bisa berupa integer, string, alfanumerik). Notasinya:
> >
> > - Enkripsi: **E<sub>K</sub>(P) = C**
> > - Dekripsi: **D<sub>K</sub>(C) = P**
> >
> > **Prinsip Kerckhoffs:** *semua algoritma kriptografi harus publik (tidak rahasia); hanya kunci yang harus rahasia.* Keamanan tidak boleh bergantung pada kerahasiaan algoritma (lawan dari *security through obscurity*).
> >
> >![[Pasted image 20260826182727.png]]
> >
> > ### Cipher dan Cryptosystem
> >
> > **Cipher** adalah algoritma untuk enkripsi dan dekripsi pesan — berupa aturan (*rule*) atau fungsi matematika. Contoh: *rule* "geser tiga huruf ke kanan" untuk enkripsi dan "geser tiga huruf ke kiri" untuk dekripsi; secara matematika `E(p) = (p + k) mod 26` dan `D(c) = (c - k) mod 26`.
> >
> > - **Classical cipher:** Caesar, Vigenere, Playfair, Enigma.
> > - **Modern cipher:** DES, AES, Blowfish, Serpent, RSA, ElGamal, RC4, RC5, A5.
> >
> > **Sistem kriptografi** (*cryptosystem*) adalah $\text{quintuple} (E, D, M, K, C)$ :
> >
> > - **E** — himpunan fungsi enkripsi, `E: M × K → C`
> > - **D** — himpunan fungsi dekripsi, `D: C × K → M`
> > - **M** — himpunan plainteks
> > - **K** — himpunan kunci
> > - **C** — himpunan cipherteks
> >
> > Contoh **Caesar cipher**: `M = { huruf alfabet }`, `K = { k | 0 ≤ k ≤ 25 }`, `E_k(m) = (m + k) mod 26`, `D_k(c) = (c - k) mod 26`, dan `C = M`.
> >
> > ### Dua Aplikasi Utama Enkripsi
> >
> > - **Encryption at rest** — enkripsi dokumen di dalam *storage* (data yang tersimpan).
> > - **Encryption in motion** — enkripsi pesan yang sedang dikirim (mis. *end-to-end encryption* pada WhatsApp).
> > 
> > ![[Pasted image 20260826184307.png]]

> [!cornell] #### Summary
>
> Pesan yang bermakna disebut **plainteks**; setelah disandikan menjadi tak bermakna ia disebut **cipherteks** (kriptogram). Proses maju adalah **enkripsi**, proses balik adalah **dekripsi**, keduanya diparametrikan oleh **kunci K** dengan notasi `E_K(P) = C` dan `D_K(C) = P`. **Prinsip Kerckhoffs** menegaskan algoritma boleh publik, hanya kunci yang rahasia. **Penyusup** (Eve, Mallory) bisa menyadap, menyisipkan, memalsukan identitas, membajak koneksi, sampai melakukan denial of service. Algoritma enkripsi/dekripsi disebut **cipher** (klasik vs modern), dan keseluruhan sistemnya diformalkan sebagai **quintuple (E, D, M, K, C)** — dicontohkan oleh Caesar cipher. Dalam praktik enkripsi dipakai untuk data **at rest** (storage) dan **in motion** (transmisi). Fondasi ini menuntun ke [[Algoritma Kriptografi]] dan [[Kriptanalisis dan Kriptologi]].

> [!ad-libitum]- Additional Information
>
> #### Kerckhoffs' Six Principles (1883)
>
> Prinsip yang dikutip di slide adalah satu dari **enam** desiderata yang ditulis Auguste Kerckhoffs untuk kriptografi militer: sistem harus praktis dan aman meski jatuh ke tangan musuh, kunci mudah diganti dan diingat tanpa catatan, dapat dipakai lewat telegraf, portabel, dan mudah digunakan. Padanan modernnya adalah maksim Shannon: *"the enemy knows the system."*
>
> #### Passive vs Active Adversary
>
> **Passive attacker** hanya menyadap (melanggar confidentiality) dan sulit dideteksi — pertahanannya enkripsi. **Active attacker** (Mallory) mengubah, menyisipkan, atau membajak (melanggar integrity/authentication) — pertahanannya MAC dan tanda tangan digital. Model ancaman ini menentukan pilihan primitif kriptografi.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Implementasikan Caesar cipher sebagai `cryptosystem` eksplisit: definisikan M, K, C sebagai tipe data, lalu tulis fungsi `E` dan `D` beserta uji `D_k(E_k(m)) = m` untuk semua k.
> 2. Demonstrasikan pelanggaran Kerckhoffs: rancang "cipher rahasia" sederhana, lalu tunjukkan betapa cepat ia jatuh ketika algoritmanya bocor.
>
> #### Bacaan Lanjutan
>
> - C. E. Shannon, *"Communication Theory of Secrecy Systems"*, Bell System Technical Journal, 1949.
> - *Handbook of Applied Cryptography*, Bab 1.11 (model penyerang) dan Bab 7 (block ciphers).

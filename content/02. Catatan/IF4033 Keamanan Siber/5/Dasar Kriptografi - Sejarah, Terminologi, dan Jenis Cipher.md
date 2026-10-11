---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Dasar Kriptografi - Sejarah, Terminologi, dan Jenis Cipher
>
> > ## Questions/Cues
> >
> > - Apa definisi kriptografi dan bagaimana sejarahnya?
> > - Apa arti plaintext, ciphertext, key, keyspace, IV, nonce, dan seed?
> > - Apa beda stream cipher dan block cipher?
> > - Apa itu substitusi, transposisi, dan one-time pad?
> > - Apa beda metode simetris, asimetris, dan hybrid?
> > - Apa itu confusion dan diffusion?
> >
> > ## Reference Points
> >
> > - IF4033 Cryptography (Slides 2-16)
>
> > ### Definisi dan Sejarah
> >
> > Kriptografi ("secret writing") adalah praktik mengamankan informasi dengan mengubahnya menjadi bentuk yang tidak terbaca oleh pihak tidak berwenang. Sejarahnya:
> >
> > - **Manual era** (sejak ±2000 SM): pena dan kertas, mis. *Scytale, Atbash, Caesar, Vigenère*.
> > - **Mechanical era**: mesin sandi, mis. *Cipher Disk* Konfederasi, mesin *Red/Purple* Jepang, **Enigma** Jerman.
> > - **Modern era**: komputer, mis. *Lucifer, Rijndael, RSA, ElGamal*.
> >
> > ### Terminologi
> >
> > | Istilah | Arti |
> > |---|---|
> > | **Plaintext** | Pesan dalam format alami yang terbaca |
> > | **Ciphertext** | Pesan yang diubah sehingga tidak terbaca selain oleh penerima |
> > | **Key** | Urutan yang mengendalikan operasi algoritma |
> > | **Keyspace** | Jumlah total kemungkinan nilai kunci |
> > | **IV** | Nilai acak untuk block cipher agar tidak muncul pola |
> > | **Nonce** | *Number used once*, agar plaintext sama tidak menghasilkan ciphertext sama |
> > | **Seed** | Titik awal inisialisasi PRNG |
> > | **Cryptosystem** | Kombinasi algoritma, kunci, dan manajemen kunci |
> >
> > Algoritma enkripsi (*cipher*) boleh dipublikasikan terbuka; **yang harus dilindungi hanya kunci** (Kerckhoffs).
> >
> > ### Jenis Cipher
> >
> > - **Stream cipher**: mengolah per bit dengan *key stream*; cocok untuk layanan real-time.
> > - **Block cipher**: memecah plaintext menjadi blok sama panjang, memakai substitusi dan transposisi.
> >
> > Sistem klasik: **substitusi** (mengganti huruf; *monoalphabetic* seperti Caesar), **transposisi** (mengubah posisi huruf), **polyalphabetic** (Vigenère, aritmetika modular), *running key*, dan **one-time pad** (kunci acak sepanjang pesan, dipakai sekali). **Steganografi** menyembunyikan pesan dalam medium lain (mis. memodifikasi color map JPEG) tanpa kunci.
> >
> > ### Simetris, Asimetris, Hybrid
> >
> > | Metode | Ciri | Masalah |
> > |---|---|---|
> > | **Simetris** | Satu kunci untuk enkripsi dan dekripsi | Distribusi kunci |
> > | **Asimetris** | Pasangan kunci publik/privat | Manajemen kunci skala besar, lambat |
> > | **Hybrid** | Asimetris mendistribusikan **session key**, simetris melakukan *bulk encryption* | Contoh: SSL/TLS |
> >
> > ### Confusion dan Diffusion
> >
> > - **Confusion**: mengaburkan hubungan plaintext-kunci lewat **substitusi**.
> > - **Diffusion**: menyebarkan pengaruh plaintext ke seluruh ciphertext lewat **transposisi**.
> >
> > ```mermaid
> > flowchart LR
> >     P["Plaintext"] -->|"Enkripsi + Kunci"| C["Ciphertext"] -->|"Dekripsi + Kunci"| P2["Plaintext"]
> > ```

> [!cornell] #### Summary
>
> Kriptografi berkembang dari era **manual** (Caesar, Vigenère), **mekanik** (Enigma), hingga **modern** (Rijndael, RSA). Cipher dibedakan menjadi **stream** dan **block**, dengan teknik **substitusi** dan **transposisi**, serta **one-time pad** sebagai cipher sempurna. Metode dikelompokkan menjadi **simetris** (satu kunci, sulit distribusi), **asimetris** (pasangan kunci, lambat), dan **hybrid** (asimetris untuk session key, simetris untuk bulk). Kekuatan sandi bergantung pada **confusion** dan **diffusion**, dan hanya kunci yang perlu dirahasiakan.

> [!ad-libitum]- Additional Information
>
> #### Mengapa One-Time Pad Tidak Praktis
>
> Kerahasiaan sempurna (Shannon) hanya tercapai jika kunci benar-benar acak, sepanjang pesan, dan tidak pernah dipakai ulang; distribusi kunci sebesar pesan itulah kendalanya. Detail confusion/diffusion lihat juga catatan [[Confusion, Diffusion, dan Jaringan Feistel]] di IF4020.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan Caesar dan Vigenère lalu lakukan *frequency analysis* untuk memecahkannya.
>
> #### Bacaan Lanjutan
> - Singh, S. *The Code Book*.
> - Shannon, C. (1949). *Communication Theory of Secrecy Systems*.

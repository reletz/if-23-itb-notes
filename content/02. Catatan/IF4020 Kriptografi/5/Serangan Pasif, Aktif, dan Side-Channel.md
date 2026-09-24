---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Serangan Pasif, Aktif, dan Side-Channel
>
> > ## Questions/Cues
> >
> > - Apa beda serangan pasif dan aktif berdasarkan keterlibatan penyerang?
> > - Apa saja bentuk serangan pasif (interception, traffic analysis) dan metode penyadapannya?
> > - Apa empat bentuk serangan aktif (interruption, fabrication, replay, modification)?
> > - Bagaimana man-in-the-middle attack bekerja pada pertukaran kunci?
> > - Apa itu side-channel attack dan apa saja jenisnya?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Serangan pada Kriptografi (Slides 29-52)
>
> > ### Klasifikasi: Pasif vs Aktif
> >
> > Berdasarkan **keterlibatan penyerang dalam komunikasi**:
> >
> > | | Serangan pasif | Serangan aktif |
> > |---|---|---|
> > | Keterlibatan | tidak terlibat, hanya **menyadap** | **mengintervensi** dan memengaruhi sistem |
> > | Tujuan | memperoleh data sebanyak-banyaknya | menguntungkan diri (ubah, sisip, hapus, ulang) |
> > | Pertahanan utama | **enkripsi** (confidentiality) | **integrity/authentication** (MAC, tanda tangan) |
> > | Deteksi | sulit (tak meninggalkan jejak) | lebih mudah (mengubah aliran pesan) |
> >
> > ### 1. Serangan Pasif
> >
> > Eve hanya menyadap lalu lintas Alice-Bob untuk memperoleh informasi sebanyak mungkin. Enkripsi pesan mencegah penyadap **memahami isi** (yang terlihat hanya cipherteks acak). Dua bentuknya:
> >
> > - **Interception** (penyadapan isi pesan).
> > - **Traffic analysis**: mengamati **pola lalu lintas** (siapa berkomunikasi dengan siapa, kapan, seberapa sering, ukuran pesan) walau isinya terenkripsi.
> >
> > **Contoh Wireshark**: memantau *network traffic*; dengan *filtering*, protokol tanpa enkripsi menampilkan **username dan password dalam plainteks** (menegaskan perlunya enkripsi seperti HTTPS).
> >
> > **Metode penyadapan:**
> >
> > 1. **Wiretapping**: menyadap kabel telepon. Kabel telepon berisi kawat merah dan hijau yang membentuk sirkuit sederhana sehingga mudah disadap secara diam-diam.
> > 2. **Electromagnetic eavesdropping**: menangkap radiasi/sinyal elektromagnetik (mis. sinyal radio, *GSM sniffing* dengan *software defined radio*).
> > 3. **Acoustic eavesdropping**: menangkap suara/getaran (mis. lewat *wireless vibrometry*).
> >
> > ### 2. Serangan Aktif
> >
> > Penyerang mengintervensi komunikasi, dengan cara: **menghapus** sebagian cipherteks, **mengubah** cipherteks, **menyisipkan** cipherteks palsu, **me-replay** pesan lama, atau **mengubah informasi tersimpan**. Empat bentuk klasik (Stallings):
> >
> > - **Interruption**: memblokir pengiriman pesan (menyerang *availability*).
> > - **Fabrication**: memalsukan/membuat pesan baru.
> > - **Replay**: mengirim ulang pesan sah lama ([[Serangan Berdasarkan Tujuan Penyerang]]).
> > - **Modification**: mengubah isi pesan di tengah jalan.
> >
> > ### Man-in-the-Middle (MITM)
> >
> > Contoh serangan aktif yang **sangat berbahaya**. Mallory berada di antara A dan B pada pertukaran kunci publik/Diffie-Hellman:
> >
> > ```mermaid
> > sequenceDiagram
> >     participant A as User A
> >     participant M as Man in the Middle
> >     participant B as User B
> >     A->>M: "I'm A. My public key is 34..A1"
> >     M->>B: "I'm A. My public key is 57..83"
> >     B->>M: "I'm B. My public key is 27..E5"
> >     M->>A: "I'm B. My public key is 57..83"
> >     Note over A,M: Kunci rahasia A-M (Diffie-Hellman)
> >     Note over M,B: Kunci rahasia M-B (Diffie-Hellman)
> >     A->>M: pesan terenkripsi kunci A-M
> >     M->>B: dibaca/diubah, dienkripsi ulang kunci M-B
> > ```
> >
> > Masing-masing korban merasa memiliki kunci rahasia dengan lawan bicaranya, padahal sebenarnya dengan **Mallory**, yang dapat membaca dan mengubah seluruh pesan. Akar masalahnya: **kunci publik tidak diotentikasi**. Solusinya sertifikat digital / tanda tangan (materi kunci publik).
> >
> > ### Serangan Side-Channel
> >
> > Tidak menyerang **matematika algoritmanya**, tetapi **memanfaatkan informasi yang bocor** ketika algoritma dijalankan pada perangkat fisik:
> >
> > 1. **Timing attack**: memanfaatkan perbedaan **waktu eksekusi** untuk menyimpulkan kunci.
> > 2. **Power analysis**: menganalisis **konsumsi daya** perangkat saat operasi kripto, yakni **SPA** (*Simple Power Analysis*) dan **DPA** (*Differential Power Analysis*).
> > 3. **Electromagnetic (EM) attack**: menganalisis **radiasi elektromagnetik** perangkat.
> > 4. **Fault injection**: sengaja menimbulkan **kesalahan** pada perangkat/komputasi lalu menganalisis output yang salah, contohnya **DFA** (*Differential Fault Analysis*).
> >
> > ```mermaid
> > flowchart TD
> >     S["Serangan pada Kriptografi"]
> >     S --> P["Pasif<br/>interception, traffic analysis"]
> >     S --> A["Aktif<br/>interruption, fabrication,<br/>replay, modification, MITM"]
> >     S --> SC["Side-channel<br/>timing, power (SPA/DPA),<br/>EM, fault (DFA)"]
> > ```

> [!cornell] #### Summary
>
> Menurut keterlibatan penyerang, **serangan pasif** hanya menyadap (**interception**, **traffic analysis**; via wiretapping, electromagnetic, atau acoustic eavesdropping; contoh Wireshark membaca password plainteks) dan dilawan dengan **enkripsi**, sedangkan **serangan aktif** mengintervensi: **interruption, fabrication, replay, modification**, dengan **man-in-the-middle** sebagai contoh paling berbahaya (kunci publik yang tak diotentikasi memungkinkan Mallory berbagi kunci terpisah dengan A dan B). Terpisah dari keduanya, **side-channel attack** menyerang implementasi fisik, bukan matematika: **timing, power analysis (SPA/DPA), electromagnetic, dan fault injection (DFA)**. Pelajarannya: cipher yang kuat secara matematis tetap dapat gagal karena protokol, otentikasi, atau kebocoran fisik. Klasifikasi serangan ini melengkapi [[Serangan Berdasarkan Informasi yang Dimiliki]] dan [[Serangan Berdasarkan Tujuan Penyerang]].

> [!ad-libitum]- Additional Information
>
> #### Pertahanan Terhadap Side-Channel
>
> **Constant-time implementation** (tanpa percabangan/akses memori bergantung rahasia), **masking** dan **blinding** (mengacak nilai perantara), **hiding** (menambah derau/*dummy operations*), serta detektor kesalahan dan *redundant computation* melawan fault injection. Contoh dampak nyata: **Spectre/Meltdown** (kebocoran lewat cache/timing CPU) dan **Lucky Thirteen** (timing pada padding TLS).
>
> #### Mencegah MITM
>
> Autentikasi kunci publik lewat **PKI** (sertifikat X.509 yang ditandatangani CA), **certificate pinning**, verifikasi sidik jari kunci lewat saluran lain (mis. *safety number* Signal/WhatsApp), atau protokol autentikasi kunci seperti **station-to-station**. HTTPS mengandalkan sertifikat agar browser tahu kunci publik benar milik server tujuan.
>
> #### Traffic Analysis Meski Terenkripsi
>
> Metadata (IP, ukuran paket, waktu) tetap bocor: sistem seperti **Tor** dan **mixnet** menambah padding dan berlapis relay untuk menyamarkan pola. Ini mengingatkan bahwa **confidentiality isi ≠ confidentiality percakapan**.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Jalankan Wireshark pada jaringan lab, bandingkan lalu lintas HTTP (login plainteks) vs HTTPS, dan catat metadata apa yang tetap terlihat.
> 2. Simulasikan MITM pada Diffie-Hellman kecil dengan tiga proses Python (A, M, B), lalu tunjukkan bagaimana penambahan tanda tangan pada kunci publik menggagalkannya.
> 3. Implementasikan perbandingan string rentan timing (`==`) dan versi constant-time; ukur perbedaan waktunya.
>
> #### Bacaan Lanjutan
>
> - William Stallings, *Cryptography and Network Security*, Bab 1.
> - Paul Kocher, *"Timing Attacks on Implementations of Diffie-Hellman, RSA, DSS, and Other Systems"*, CRYPTO 1996.
> - Kocher, Jaffe, Jun, *"Differential Power Analysis"*, CRYPTO 1999.

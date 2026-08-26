---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Kriptanalisis dan Kriptologi
>
> > ## Questions/Cues
> >
> > - Apa definisi kriptanalisis dan siapa pelakunya?
> > - Mengapa kriptanalisis disebut "lawan" kriptografi?
> > - Siapa Al-Kindi dan apa kontribusinya (analisis frekuensi)?
> > - Apa dampak historis pemecahan Telegram Zimmermann?
> > - Bagaimana kriptografi dan kriptanalisis menyatu dalam kriptologi?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Pengantar Kriptografi (Slides 44-47)
>
> > ### Kriptanalisis
> >
> > **Kriptanalisis** (*cryptanalysis*) adalah **ilmu dan seni untuk memecahkan cipherteks menjadi plainteks tanpa mengetahui kunci** yang digunakan. Pelakunya disebut **kriptanalis** (*cryptanalyst*).
> >
> > Kriptanalisis merupakan **"lawan"** dari kriptografi: jika kriptografi berusaha menyembunyikan pesan, kriptanalisis berusaha membongkarnya. Keduanya berkembang saling mendorong — cipher yang berhasil dipecahkan memacu lahirnya cipher yang lebih kuat.
> >
> > ### Al-Kindi dan Analisis Frekuensi
> >
> > Teknik kriptanalisis sudah ada sejak **abad ke-9**. Ia dikemukakan pertama kali oleh ilmuwan Arab **Abu Yusuf Yaqub Ibnu Ishaq Al-Kindi** (dikenal sebagai **Al-Kindi**).
> >
> > - Al-Kindi menulis buku tentang seni memecahkan kode berjudul **‘Risalah fi Istikhraj al-Mu'amma’** (*Manuscript for the Deciphering Cryptographic Messages*).
> > - Ketika meneliti frekuensi perulangan huruf di dalam Al-Quran, ia menemukan teknik yang kelak dinamakan **analisis frekuensi**.
> > - **Analisis frekuensi** adalah teknik memecahkan cipherteks berdasarkan **frekuensi kemunculan karakter** di dalam pesan — misalnya huruf tersering pada cipherteks kemungkinan besar memetakan ke huruf tersering dalam bahasa aslinya.
> >
> > Analisis frekuensi mematahkan seluruh *monoalphabetic substitution cipher*, termasuk Caesar cipher.
> >
> > ### Telegram Zimmermann
> >
> > Sejarah kriptanalisis mencatat hasil gemilang seperti pemecahan **Telegram Zimmermann** — pesan diplomatik Jerman yang, setelah berhasil didekripsi pihak Inggris, ikut **membawa Amerika Serikat masuk ke Perang Dunia I**. Ini contoh bagaimana kriptanalisis dapat mengubah jalannya sejarah.
> >
> > ### Kriptologi
> >
> > **Kriptologi** (*cryptology*) adalah **studi mengenai kriptografi dan kriptanalisis** — payung yang menaungi keduanya.
> >
> > ```mermaid
> > flowchart TD
> >     KL["Kriptologi<br/>(studi kriptografi + kriptanalisis)"]
> >     KL --> KG["Kriptografi<br/>ilmu &amp; seni menjaga keamanan pesan"]
> >     KL --> KA["Kriptanalisis<br/>ilmu &amp; seni memecahkan cipherteks"]
> >     KG -. saling mendorong .-> KA
> > ```

> [!cornell] #### Summary
>
> **Kriptanalisis** adalah ilmu dan seni memecahkan cipherteks menjadi plainteks **tanpa mengetahui kunci**; pelakunya **kriptanalis**, dan ia adalah "lawan" kriptografi. Tekniknya sudah ada sejak abad ke-9 lewat **Al-Kindi**, yang dalam meneliti frekuensi huruf Al-Quran menemukan **analisis frekuensi** — metode yang mematahkan cipher substitusi klasik. Pemecahan **Telegram Zimmermann** menunjukkan dampak strategis kriptanalisis: ia turut menyeret AS ke Perang Dunia I. Payung yang menaungi kriptografi dan kriptanalisis sekaligus disebut **kriptologi**. Kisah cipher yang jatuh satu per satu ini berlanjut di [[Sejarah Kriptografi]].

> [!ad-libitum]- Additional Information
>
> #### Model Serangan Kriptanalisis
>
> Kriptanalis diklasifikasikan menurut seberapa banyak informasi yang ia miliki: **ciphertext-only** (hanya cipherteks — kasus tersulit, tempat analisis frekuensi bersinar), **known-plaintext** (punya pasangan plain–cipher), **chosen-plaintext** (bisa memilih plainteks untuk dienkripsi — model standar keamanan modern, IND-CPA), dan **chosen-ciphertext** (bisa meminta dekripsi cipherteks pilihan). Cipher modern dirancang tahan bahkan terhadap chosen-ciphertext.
>
> #### Selain Kriptanalisis Matematis
>
> Serangan nyata sering tidak menyentuh matematika cipher: **side-channel attack** (mengukur waktu, konsumsi daya, atau emisi elektromagnetik), **brute-force** pada ruang kunci yang kecil, dan **social engineering / rubber-hose cryptanalysis** (memaksa pemilik kunci menyerahkannya). Kekuatan cipher bukan jaminan sistem aman.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis program analisis frekuensi yang otomatis memecahkan sembarang Caesar cipher berbahasa Indonesia, lalu perluas ke *general monoalphabetic substitution* dengan bantuan frekuensi bigram.
> 2. Baca ringkasan Telegram Zimmermann (Room 40, British Admiralty) dan buat linimasa bagaimana pesan itu didekripsi dan dipublikasikan.
>
> #### Bacaan Lanjutan
>
> - Simon Singh, *The Code Book*, Anchor Books, 1999 — bab tentang Al-Kindi dan analisis frekuensi.
> - David Kahn, *The Codebreakers*, Scribner, 1996 — bab Telegram Zimmermann.

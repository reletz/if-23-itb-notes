---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Definisi dan Layanan Kriptografi
>
> > ## Questions/Cues
> >
> > - Siapa Alice, Bob, dan Eve, serta mengapa komunikasi lewat saluran publik itu rawan?
> > - Empat "case" komunikasi memunculkan empat masalah keamanan apa saja?
> > - Apa definisi kriptografi menurut Schneier dan Menezes, dan dari mana asal katanya?
> > - Apa arti "aman" di dalam kriptografi?
> > - Apa keempat layanan (services) yang diberikan kriptografi?
> > - Mengapa kriptografi relevan dengan kasus kebocoran data di Indonesia?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Pengantar Kriptografi (Slides 1-24)
>
> > ### Model Komunikasi: Alice, Bob, dan Penyadap
> >
> > Skenario dasar kriptografi: **Alice** dan **Bob** saling berkirim pesan melalui **saluran komunikasi publik** — pos, telepon, jaringan seluler, atau internet. Media konkretnya bisa surat, telepon, email, atau SMS. Alice dan Bob tidak harus manusia; keduanya dapat berupa **manusia dengan mesin** (mis. mesin penjawab telepon), **mesin dengan mesin** (komputer client dengan server), web browser dengan server, client/server *online banking*, atau DNS server dan router.
> > 
> > ![[Pasted image 20260826175843.png]]
> >
> > Masalahnya: saluran publik dapat "didengarkan". Pihak ketiga yang menguping komunikasi disebut **penyadap** (*eavesdropper*), dalam kriptografi sering ditokohkan sebagai **Eve** atau **Carol**.
> >
> > ### Empat Case → Empat Masalah Keamanan
> >
> > Slide membangun kebutuhan kriptografi lewat empat pertanyaan:
> >
> > - **Case 1** — Bagaimana Alice memastikan pesannya tidak dapat dibaca penyadap? → masalah **kerahasiaan** (*confidentiality*).
> > - **Case 2** — Bagaimana Bob memastikan pesan benar-benar dari Alice, bukan dari Carol yang menyamar? → masalah **otentikasi** (*authentication*) pengirim/penerima.
> > - **Case 3** — Bagaimana Bob memastikan pesan dari Alice masih utuh, tidak diubah atau dimanipulasi selama transit? → masalah **keutuhan** (*integrity*) pesan.
> > - **Case 4** — Bagaimana Bob melakukan anti-sangkalan jika Alice menyangkal pernah mengirim pesan? → masalah **nir-penyangkalan** (*non-repudiation*).
> >
> > Solusi keempat masalah ini adalah **kriptografi**.
> >
> > ```mermaid
> > flowchart LR
> >     C1["Case 1: pesan disadap"] --> S1["Confidentiality"]
> >     C2["Case 2: pengirim menyamar"] --> S2["Authentication"]
> >     C3["Case 3: pesan diubah di jalan"] --> S3["Data Integrity"]
> >     C4["Case 4: pengirim menyangkal"] --> S4["Non-repudiation"]
> > ```
> >
> > ### Definisi Kriptografi
> >
> > Kata **cryptography** berasal dari bahasa Yunani: *cryptós* ("secret" atau "hidden") dan *gráphein* ("writing") — artinya *"secret writing"* atau *"hidden writing"*.
> >
> > - **Schneier (1996):** kriptografi adalah **ilmu dan seni untuk menjaga keamanan pesan**.
> > - **Menezes (1996):** kriptografi adalah ilmu yang mempelajari **teknik-teknik matematika** yang berhubungan dengan aspek keamanan informasi seperti kerahasiaan, integritas data, serta otentikasi.
> >
> > Perhatikan pergeseran penekanan: definisi Schneier menyebut "seni" (*art*), sedangkan Menezes menekankan landasan **matematika** — cerminan transisi dari kriptografi klasik ke kriptografi modern.
> >
> > ### Arti "Aman"
> >
> > Sebuah pesan disebut **aman** bila memenuhi empat hal:
> >
> > 1. **Terjaga kerahasiaannya** (*confidentiality*) — hanya pihak berhak yang bisa membacanya.
> > 2. **Terjaga keasliannya / keutuhannya** (*data integrity*) — isi pesan tidak berubah. Contoh slide: "Suhu di luar 33 derajat celcius" berubah menjadi "3_2_ derajat celcius".
> > 3. **Yakin pengirim pesan asli** (*authentication*), bukan pihak ketiga yang menyerupai — "Dia mengklaim bahwa dia adalah A".
> > 4. **Pengirim tidak dapat menyangkal** (*non-repudiation*) telah mengirim pesan.
> >
> > ### Empat Layanan Kriptografi
> >
> > Secara ringkas, kriptografi menyediakan empat **layanan** (*services*):
> >
> > | Layanan | Menjawab pertanyaan |
> > |---|---|
> > | **Kerahasiaan** (Confidentiality / privacy / secrecy) | Bisakah pihak lain membaca pesan ini? |
> > | **Keaslian pesan** (Data integrity) | Apakah pesan ini masih utuh? |
> > | **Keaslian pengirim & penerima** (Authentication) | Benarkah lawan bicara saya adalah orang yang saya kira? |
> > | **Anti penyangkalan** (Non-repudiation) | Bisakah pengirim mengelak dari pesan yang ia kirim? |
> >
> > ### Mengapa Kriptografi Penting
> >
> > Kutipan **Keith M. Martin**: *"Cryptography lies at the heart of all cybersecurity technologies, and understanding the role it plays is vital to understanding how to secure cyberspace."* Kriptografi adalah **inti** dari semua teknologi keamanan siber.
> > 
> > ![[Pasted image 20260826181642.png]]
> >
> > Relevansinya nyata di Indonesia: kasus WikiLeaks, penyadapan Kedubes RI dan telepon Presiden SBY oleh Australia, kebocoran data **BPJS**, **Tokopedia**, dugaan kebocoran data pemilih Pemilu, sertifikat vaksin, hingga kebocoran di **Kemenhan** dan **Bank BSI**. Kasus kebocoran, pencurian, dan pengaksesan data ilegal menunjukkan pentingnya kriptografi — sementara kriptografer masih menjadi sosok langka di Indonesia.

> [!cornell] #### Summary
>
> Kriptografi lahir dari kebutuhan komunikasi aman antara **Alice** dan **Bob** melalui saluran publik yang dapat disadap **Eve**. Empat "case" komunikasi memunculkan empat masalah: **confidentiality, authentication, data integrity, dan non-repudiation**, yang seluruhnya dijawab oleh kriptografi. Secara etimologi kriptografi berarti *"hidden writing"*; **Schneier** mendefinisikannya sebagai ilmu dan **seni** menjaga keamanan pesan, sedangkan **Menezes** menekankan **teknik matematika**. Pesan disebut "aman" bila rahasianya, keutuhannya, dan keaslian pengirimnya terjaga serta pengirim tak bisa menyangkal. Keempat hal itu adalah **empat layanan kriptografi**. Kasus kebocoran data besar di Indonesia (BPJS, Tokopedia, BSI) menegaskan bahwa kriptografi adalah inti keamanan siber. Konsep-konsep operasionalnya diperinci di [[Terminologi Dasar Kriptografi]].

> [!ad-libitum]- Additional Information
>
> #### Layanan vs Mekanisme
>
> Empat layanan itu diwujudkan oleh mekanisme berbeda: **enkripsi** (simetri/asimetri) untuk *confidentiality*, **MAC** atau **fungsi hash** untuk *integrity*, **MAC** atau **tanda tangan digital** untuk *authentication*, dan **tanda tangan digital** (yang mengikat identitas pengirim secara kriptografis) untuk *non-repudiation*. Menariknya, kriptografi simetri saja **tidak** dapat memberi non-repudiation, karena kunci yang sama dimiliki dua pihak sehingga Bob pun bisa membuat pesan "seolah" dari Alice.
>
> #### Tokoh dalam Skenario Kriptografi
>
> Selain Alice, Bob, Eve, dan Carol, literatur memakai **Mallory** (penyerang aktif/*malicious*), **Trudy** (*intruder*), **Trent** (pihak ketiga tepercaya / *trusted third party*), dan **Victor** (*verifier*). Konvensi nama ini membuat protokol lebih mudah dibaca ketimbang simbol A, B, C.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Kumpulkan 5 kasus kebocoran data di Indonesia (2019–2025), lalu petakan tiap kasus ke layanan kriptografi mana yang gagal atau tidak diterapkan.
> 2. Bandingkan definisi kriptografi dari Schneier, Menezes, dan Keith Martin — buat tabel perbedaan penekanan (seni, matematika, keamanan siber).
>
> #### Bacaan Lanjutan
>
> - Bruce Schneier, *Applied Cryptography*, 2nd ed., Wiley, 1996 — Bab 1.
> - A. Menezes, P. van Oorschot, S. Vanstone, *Handbook of Applied Cryptography*, CRC Press, 1996 — Bab 1 (tersedia gratis: cacr.uwaterloo.ca/hac).
> - Keith M. Martin, *Everyday Cryptography*, 2nd ed., Oxford University Press, 2017 — Bab 1.

---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Attacker Mindset dan Operasionalisasi STRIDE
>
> > ## Questions/Cues
> >
> > - Apa perbedaan fundamental cara berpikir software engineer dan attacker?
> > - Mengapa "The attacker does not read the README. They read the HTTP responses"?
> > - Bagaimana ancaman STRIDE dioperasionalkan dari threat modeling ke testing nyata?
> > - Threat STRIDE mana yang ditemukan lewat code review dan mana lewat fuzzing?
> > - Mengapa fokus minggu ini pada Tampering, Elevation of Privilege, dan DoS?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W13 Attacker Mindset — bagian "Opening — The Core Shift & Module 1: From threat modeling to testing")
>
> > ### Pergeseran Inti: Engineer vs Attacker
> >
> > Inti minggu ini adalah **pergeseran pola pikir (mindset shift)**. Seorang **software engineer** membangun perangkat lunak dengan membayangkan pengguna yang *ingin* perangkat lunaknya berhasil bekerja; seorang **attacker** justru berperan sebagai pengguna yang *tidak* menginginkannya bekerja. Kutipan pembuka deck merangkumnya: *"The developer imagined a user who wants the software to work. Your job is to be the user who doesn't."* Setiap pertanyaan engineer punya pasangan pertanyaan attacker yang membaliknya:
> >
> > | Software engineer berpikir | Attacker berpikir |
> > | --- | --- |
> > | "Does this feature work?" | "What happens when I misuse this feature?" |
> > | "I validated the input" | "Which validator can I bypass?" |
> > | "Only admins can do this" | "What if I act like an admin without being one?" |
> > | "This error is harmless" | "What does this error reveal about the system?" |
> > | "Nobody would do that" | "That's the first thing I'd try" |
> >
> > Kalimat kunci yang merangkum sikap ini: **"The attacker does not read the README. They read the HTTP responses."** Artinya, attacker tidak peduli pada niat atau dokumentasi pembuat; ia menilai sistem dari **perilaku nyata yang teramati** — respons HTTP, kode status, ukuran body, dan pesan error — bukan dari apa yang *seharusnya* terjadi menurut spesifikasi.
> >
> > ### Dari Threat Modeling (STRIDE) ke Testing
> >
> > Pada minggu-minggu sebelumnya, ancaman telah dipetakan dengan **STRIDE**. Modul 1 **mengoperasionalkannya (operationalise)**: menemukan ancaman tersebut di **kode nyata** dan **membuktikan bahwa ancaman itu benar-benar ada**, bukan sekadar mendaftarnya secara teoretis. Setiap kategori STRIDE dipetakan ke cara konkret menemukannya hari ini beserta tool-nya:
> >
> > | STRIDE threat | How we find it today | Tool |
> > | --- | --- | --- |
> > | **Tampering** | Trace how inputs modify state (telusuri bagaimana input mengubah state) | Code review |
> > | **Elevation of privilege** | Find missing or bypassable permission checks | Code review |
> > | **Information disclosure** | Trigger responses that leak data | Fuzzing |
> > | **Denial of service** | Find inputs that crash or exhaust resources | Fuzzing |
> > | **Spoofing** | Examine how identity is verified | Code review |
> >
> > Dua teknik inti membagi pekerjaan: **code review** unggul untuk ancaman yang bergantung pada *logika dan posisi pengecekan* (Tampering, EoP, Spoofing — yang harus dibaca langsung di sumber kode), sedangkan **fuzzing** unggul untuk ancaman yang muncul dari *input tak terduga dalam jumlah besar* (Information Disclosure, DoS — yang terungkap dengan mengamati perilaku saat dibanjiri input).
> >
> > ### Fokus Minggu Ini: Tampering, EoP, DoS
> >
> > Deck secara eksplisit memfokuskan pembahasan pada **Tampering, Elevation of Privilege, dan Denial of Service** — tiga kategori tempat **code review dan fuzzing memberi hasil paling langsung (pay off most directly)**. Tampering dan EoP ditemukan dengan membaca kode (bagaimana input mengubah state, dan di mana pengecekan izin hilang atau bisa dilewati), sedangkan DoS ditemukan dengan fuzzing (input yang membuat sistem crash atau menghabiskan sumber daya). Inilah jembatan antara aktivitas *desain* (memodelkan ancaman) dan aktivitas *praktik ofensif* (membuktikannya).
> >
> > ```mermaid
> > flowchart LR
> >     S["STRIDE threats"] --> T["Tampering"]
> >     S --> E["Elevation of Privilege"]
> >     S --> I["Information Disclosure"]
> >     S --> D["Denial of Service"]
> >     S --> P["Spoofing"]
> >     T --> CR["Code review"]
> >     E --> CR
> >     P --> CR
> >     I --> FZ["Fuzzing"]
> >     D --> FZ
> > ```

> [!cornell] #### Summary
>
> Minggu ini menanamkan **attacker mindset**: di mana engineer bertanya "apakah fitur ini bekerja?", attacker bertanya "apa yang terjadi bila saya menyalahgunakannya?", "validator mana yang bisa saya lewati?", dan "apa yang dibocorkan error ini?" — karena **attacker tidak membaca README, ia membaca respons HTTP**. Modul 1 **mengoperasionalkan STRIDE** dari threat modeling menjadi testing nyata: **Tampering** (telusuri bagaimana input mengubah state) dan **Spoofing** (cara identitas diverifikasi) lewat **code review**; **Elevation of Privilege** (pengecekan izin yang hilang/dapat dilewati) lewat code review; **Information Disclosure** (respons yang membocorkan data) dan **Denial of Service** (input yang crash/menghabiskan sumber daya) lewat **fuzzing**. Fokus utama: **Tampering, EoP, dan DoS**, tempat code review dan fuzzing paling efektif.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — STRIDE secara Ringkas (DI LUAR sumber)
> **STRIDE** adalah akronim model ancaman dari Microsoft: **S**poofing (memalsukan identitas), **T**ampering (mengubah data/state tanpa izin), **R**epudiation (menyangkal aksi), **I**nformation disclosure (membocorkan informasi), **D**enial of service (melumpuhkan layanan), dan **E**levation of privilege (menaikkan hak akses). Deck W13 hanya menyentuh lima dari enam (Repudiation tidak dipetakan) karena fokusnya pada ancaman yang langsung dapat dibuktikan lewat code review/fuzzing; Repudiation lebih banyak diatasi lewat logging/audit trail dan non-repudiation kriptografis, bukan lewat dua teknik tersebut.
>
> #### Lebih dalam — Mengapa "Proving It" Penting (DI LUAR sumber)
> Threat modeling menghasilkan *daftar dugaan* ancaman; banyak di antaranya ternyata sudah dimitigasi atau tidak dapat dieksploitasi. Tahap operasionalisasi (proof-of-concept/PoC) memisahkan **temuan nyata** dari **risiko teoretis**, sehingga tim engineering dapat memprioritaskan perbaikan berbasis bukti, bukan asumsi. Inilah perbedaan antara dokumen ancaman dan laporan kerentanan yang dapat ditindaklanjuti.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil satu diagram STRIDE dari proyek/tugas sebelumnya, lalu untuk tiap ancaman tuliskan: teknik penemuannya (code review atau fuzzing) dan langkah konkret membuktikannya.
> 2. Susun tabel "engineer vs attacker" untuk fitur nyata di proyekmu (mis. endpoint login), isi setiap baris dengan pertanyaan attacker yang spesifik.
> 3. Pilih satu endpoint dan klasifikasikan setiap respons error-nya (404/403/500) menurut "apa yang dipelajari attacker".
>
> #### Bacaan Lanjutan
> - Adam Shostack, *Threat Modeling: Designing for Security* (pembahasan STRIDE).
> - OWASP Web Security Testing Guide (WSTG) — bagian testing autorisasi dan error handling.
> - Microsoft, "The STRIDE Threat Model" (dokumentasi SDL).

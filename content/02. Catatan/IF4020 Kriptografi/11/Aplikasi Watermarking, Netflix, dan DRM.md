---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Aplikasi Watermarking, Netflix, dan DRM
>
> > ## Questions/Cues
> >
> > - Apa saja aplikasi utama digital watermarking?
> > - Bagaimana Netflix memakai forensic watermarking untuk melacak kebocoran?
> > - Bagaimana cara watermark unik per pengguna disisipkan ke video?
> > - Apa itu DRM dan bagaimana cara kerjanya?
> > - Mengapa DRM saja tidak cukup dan watermarking tetap dibutuhkan?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Digital Watermarking (Slides 48-62)
>
> > ### Aplikasi Watermarking
> >
> > | Aplikasi | Fungsi |
> > |---|---|
> > | **Owner identification** | mengidentifikasi pemilik; detektor menunjukkan "Alice is owner" pada salinan yang beredar |
> > | **Proof of ownership** | bukti kepemilikan di pengadilan (kasus Alice vs Bob) |
> > | **Transaction tracking / fingerprinting** | tiap penerima mendapat watermark **berbeda** sehingga sumber kebocoran dapat dilacak (Alice kirim watermark A ke Bob dan B ke Charlie; salinan bajakan berwatermark B $\to$ Charlie pelakunya) |
> > | **Content authentication** | memeriksa keaslian isi (tamper proofing), umumnya fragile watermark |
> > | **Copy control / piracy control** | perangkat yang patuh (*compliant recorder/player*) memeriksa watermark untuk melarang perekaman atau pemutaran salinan ilegal |
> > | **Broadcast monitoring** | memantau kapan konten disiarkan di TV/radio dengan mendeteksi watermark |
> >
> > ### Studi Kasus: Netflix
> >
> > Netflix memakai **forensic watermarking** (invisible watermark pada video/audio), bukan watermark yang terlihat, sebagai bagian dari *content protection* untuk **mencegah pembajakan** dan **melacak sumber kebocoran**. Watermark memuat identitas seperti **ID akun, ID sesi streaming, perangkat, dan timestamp distribusi**. Bila video direkam dan diunggah ke situs bajakan, Netflix mengekstrak watermark dan mengetahui **akun mana dan kapan** bocornya. Teknik pembajakan konvensional: merekam layar dengan **camcorder atau kamera ponsel**; watermark tetap tertanam walau video direkam ulang.
> >
> > **Cara penyisipan**: saat streaming, sistem menyisipkan watermark unik secara **real-time** pada tiap **segmen** video. Tiap segmen memiliki dua versi (**A** dan **B**), sehingga tiap pengguna menerima **kombinasi unik** seperti `A-B-B-A-A-B-...`; kombinasi itu adalah **identitas pengguna**. Watermark disisipkan di **domain DCT** bersama kompresi video **H.264/H.265**.
> >
> > ### Digital Rights Management (DRM)
> >
> > **DRM** adalah teknologi untuk **mengontrol akses dan penggunaan** konten digital (film, musik, e-book, perangkat lunak) agar sesuai izin pemegang hak cipta; sistem pengamanan berbasis **enkripsi + kontrol lisensi**. Fungsi: mencegah pembajakan, membatasi siapa/perangkat yang boleh mengakses, dan mengatur durasi akses (mis. sewa 48 jam).
> >
> > **Cara kerja**:
> >
> > 1. **Konten dienkripsi** (tidak disimpan dalam bentuk asli).
> > 2. Pengguna login; saat menekan play, aplikasi **meminta lisensi** ke server DRM, yang memverifikasi akun dan hak akses.
> > 3. Bila valid, server mengirim **kunci dekripsi** secara aman.
> > 4. Konten **didekripsi di perangkat**, biasanya di *secure environment* (Trusted Execution Environment).
> >
> > DRM populer: **Widevine** (Google; Netflix, YouTube), **PlayReady** (Microsoft), **FairPlay** (Apple). Video yang diunduh langsung tanpa lisensi tetap tidak dapat diputar karena terenkripsi.
> >
> > ### DRM vs Watermarking
> >
> > | | DRM | Watermarking |
> > |---|---|---|
> > | Fungsi | **mencegah** akses ilegal | **melacak** sumber kebocoran/pembajakan |
> > | Dasar | enkripsi + lisensi | penyisipan identitas |
> > | Saat aktif | selama streaming/pemutaran | tetap ada walau video **direkam ulang** |
> >
> > **Mengapa DRM saja tidak cukup?** DRM dapat di-bypass, dan orang masih dapat **merekam layar dengan kamera**. Pada saat itu DRM sudah tidak melindungi, tetapi **watermark masih bisa mengidentifikasi sumber kebocoran**. Karena itu Netflix memakai keduanya bersama.
> >
> > ```mermaid
> > flowchart LR
> >     V["Video"] --> E["Enkripsi<br/>(DRM)"] --> S["Streaming ke<br/>perangkat sah"]
> >     V --> W["Watermark unik<br/>per pengguna"] --> S
> >     S --> P["Putar<br/>(didekripsi di TEE)"]
> >     P -.->|"direkam kamera"| L["Salinan bajakan"]
> >     L -->|"ekstrak watermark"| T["Lacak akun<br/>dan waktu"]
> > ```

> [!cornell] #### Summary
>
> Aplikasi **watermarking**: identifikasi dan bukti kepemilikan, **transaction tracking/fingerprinting**, **content authentication**, **copy/piracy control**, dan **broadcast monitoring**. **Netflix** memakai **forensic watermarking** yang memuat ID akun, sesi, perangkat, dan timestamp; tiap segmen video punya versi A/B sehingga urutan A-B unik per pengguna, disisipkan real-time di domain DCT pada kompresi H.264/H.265. **DRM** (Widevine, PlayReady, FairPlay) **mengenkripsi** konten dan mengontrol lisensi (mencegah akses ilegal), tetapi tak berdaya setelah layar direkam kamera; **watermark tetap ada** dan melacak sumber kebocoran, sehingga keduanya **saling melengkapi**.

> [!ad-libitum]- Additional Information
>
> #### A/B Watermarking dan Collusion
>
> Skema A/B per segmen setara kode biner yang dapat diserang **collusion attack**: beberapa pelanggar membandingkan salinan masing-masing lalu mencampur segmen untuk menghapus jejak. Counter-measure: **kode anti-kolusi** (mis. **Tardos code**) yang memungkinkan identifikasi sedikitnya satu kolutor dengan probabilitas tinggi.
>
> #### Standar Industri
>
> Selain Netflix, forensic watermarking dipakai oleh studio Hollywood (screener film) dan layanan siaran (NexGuard, Verimatrix, Irdeto). Standar **ATSC 3.0** dan **ACR** memakai audio watermark untuk broadcast monitoring dan sinkronisasi layar kedua.
>
> #### Aspek Hukum dan Etika
>
> Watermark forensik memuat data pribadi (ID akun, waktu) sehingga mengundang pertanyaan **privasi** dan penggunaan sebagai bukti; kebijakan privasi harus menyebutkannya, dan ketepatan deteksi (false positive) berdampak langsung pada tuduhan terhadap pengguna.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Simulasikan A/B watermarking: 64 segmen, 1000 pengguna dengan kode acak; hitung berapa segmen terdeteksi benar bila salinan bajakan direkam dengan 10% segmen rusak.
> 2. Buat tabel perbandingan **fingerprinting vs watermarking kepemilikan**: info yang dibawa, kebutuhan ketahanan, jenis serangan.
>
> #### Bacaan Lanjutan
>
> - PallyCon, *How Netflix Protects Contents (Part 2)*, Medium (disebut pada slide).
> - Tardos, G. (2003), *Optimal Probabilistic Fingerprint Codes*.
> - Cox et al., *Digital Watermarking and Steganography*, Bab tentang aplikasi dan fingerprinting.

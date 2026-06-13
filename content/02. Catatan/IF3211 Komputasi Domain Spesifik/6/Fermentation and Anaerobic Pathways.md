---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Fermentation and Anaerobic Pathways
>
> > ## Questions/Cues
> >
> > - Mengapa sel perlu **meregenerasi NAD+** dan apa yang terjadi jika tidak?
> > - Apa perbedaan **alcohol fermentation** dan **lactic acid fermentation**?
> > - Apa beda **fermentation**, **anaerobic respiration**, dan **aerobic respiration**?
> > - Apa itu **obligate** vs **facultative anaerobe**?
> > - Apa kegunaan industri fermentasi dan mengapa secara energi ia tidak efisien?
> >
> > ## Reference Points
> >
> > - IF3211 — Cellular Respiration (PPT 7, bagian Concept 7.5: Fermentation and Anaerobic Respiration)
> > - IF3211 — Cellular Respiration (PPT 7, bagian Types of Fermentation)
>
> > ### Mengapa Harus Meregenerasi NAD+
> >
> > Glikolisis hanya bisa berjalan terus jika tersedia **NAD+** untuk menerima elektron (NAD+ → NADH). Saat O2 ada, NADH membuang elektronnya ke electron transport chain dan kembali menjadi NAD+. Tetapi **tanpa O2**, ETC macet, NADH menumpuk, NAD+ habis, dan glikolisis pun **berhenti** — sel kehilangan satu-satunya sumber ATP-nya.
> >
> > **Fermentation** adalah solusinya: ia terdiri dari **glikolisis + reaksi tambahan yang meregenerasi NAD+**. NAD+ diregenerasi dengan mentransfer elektron dari NADH ke **pyruvate atau turunannya** (bukan ke O2). Dengan begitu glikolisis bisa terus berjalan dan memproduksi ATP via **substrate-level phosphorylation** secara berkelanjutan, meski tanpa oksigen. Intinya: fermentasi tidak menambah ATP di luar glikolisis — fungsinya semata "mendaur ulang" NAD+ agar pipeline tidak deadlock.
> >
> > ### Dua Jenis Fermentasi
> >
> > - **Alcohol fermentation**: pyruvate diubah menjadi **ethanol** dalam dua langkah. (1) CO2 dilepas dari pyruvate membentuk **acetaldehyde**; (2) acetaldehyde **direduksi** oleh NADH menjadi etanol. NADH teroksidasi, meregenerasi NAD+. Dilakukan oleh ragi (yeast) dan dipakai dalam **brewing, winemaking, dan baking**.
> > - **Lactic acid fermentation**: pyruvate diubah **langsung** menjadi **lactate** (bentuk terionisasi asam laktat) **tanpa** melepas CO2. NADH teroksidasi, meregenerasi NAD+. Dilakukan oleh sebagian fungi dan bakteri untuk membuat **keju dan yogurt**, serta dalam produksi **cokelat dari biji kakao**. Pada manusia, sebagian serat otot rangka (white muscle) menghasilkan lactate dari pyruvate hasil glikolisis — bahkan dalam kondisi aerob — memberikan ATP cepat tetapi tidak efisien secara energi.
> >
> > ### Fermentasi vs Respirasi Anaerob vs Aerob
> >
> > Ketiganya sering dikira sama, padahal berbeda:
> >
> > - **Aerobic respiration**: menggunakan ETC dengan **O2** sebagai acceptor elektron terakhir. Yield ATP terbesar (~32).
> > - **Anaerobic respiration**: tetap **menggunakan ETC**, tetapi acceptor elektron terakhirnya **bukan O2** melainkan molekul elektronegatif lain (misal **sulfat, SO4^2-**). Masih lebih efisien dari fermentasi.
> > - **Fermentation**: **tidak menggunakan ETC sama sekali**. Hanya mengandalkan substrate-level phosphorylation dari glikolisis. Yield terkecil (2 ATP net).
> >
> > Perbedaan kunci: fermentasi **tidak punya** electron transport chain, sedangkan respirasi anaerob **punya** (hanya acceptor terakhirnya berbeda).
> >
> > ### Jenis Organisme Berdasarkan Toleransi Oksigen
> >
> > Berdasarkan hubungannya dengan O2, organisme dikelompokkan menjadi:
> >
> > - **Obligate anaerobe**: hanya dapat melakukan fermentasi atau respirasi anaerob; O2 justru **beracun** baginya.
> > - **Facultative anaerobe** (mis. ragi, banyak bakteri, sel otot kita): dapat **beralih** antara respirasi aerob (saat O2 ada) dan fermentasi (saat O2 tidak ada). Mereka memilih jalur paling menguntungkan tergantung kondisi lingkungan.
> >
> > ### Computational Framing: Fermentasi sebagai Conditional Branching dan Fallback Path
> >
> > Bagi mahasiswa informatika, percabangan aerob/anaerob adalah **conditional branching** yang gamblang: `if (O2 tersedia) { jalankan oxidative_phosphorylation(); } else { jalankan fermentation(); }`. Pyruvate hasil glikolisis adalah titik **decision point** — outputnya di-route ke jalur berbeda tergantung kondisi runtime (ketersediaan O2). Sebuah **facultative anaerobe** adalah sistem dengan **graceful degradation**: ketika resource utama (O2) hilang, ia tidak crash melainkan **fallback** ke jalur cadangan berthroughput rendah namun tetap menghasilkan output (ATP).
> >
> > Fungsi inti fermentasi — meregenerasi NAD+ — adalah pencegahan **deadlock**: NAD+ adalah resource terbatas (seperti pool koneksi atau semaphore), dan jika tidak dikembalikan ke pool, glikolisis (consumer) akan **block** selamanya. Fermentasi adalah mekanisme "release/recycle resource" yang menjaga pipeline tetap mengalir. Trade-off-nya jelas dari sisi **metrik efisiensi**: fermentasi hanya 2 ATP net per glukosa (~16x lebih rendah dari aerob ~32 ATP) — sebuah **low-throughput fallback** yang cepat-tersedia tetapi boros bahan bakar, persis seperti degraded mode service yang mengorbankan efisiensi demi ketersediaan.

> [!cornell] #### Summary
>
> **Fermentation** memungkinkan sel memproduksi ATP **tanpa O2** dengan menjalankan glikolisis plus reaksi yang **meregenerasi NAD+** (mentransfer elektron dari NADH ke pyruvate/turunannya), mencegah pipeline glikolisis macet. Dua jenisnya: **alcohol fermentation** (pyruvate → CO2 + acetaldehyde → **ethanol**, untuk brewing/baking) dan **lactic acid fermentation** (pyruvate → **lactate** tanpa CO2, untuk keju/yogurt dan otot). Fermentasi berbeda dari **anaerobic respiration** (yang **tetap memakai ETC** dengan acceptor selain O2, mis. sulfat) dan dari **aerobic respiration** (acceptor O2, ~32 ATP). **Facultative anaerobe** dapat beralih antar jalur (conditional branching dengan graceful degradation), sedangkan **obligate anaerobe** terbunuh oleh O2. Secara energi fermentasi tidak efisien (hanya 2 ATP net) namun cepat dan tidak butuh O2. Lihat input pipeline di [[Glycolysis]] dan jalur penuh di [[Oxidative Phosphorylation and Chemiosmosis]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Oxygen Debt dan Asam Laktat pada Otot
> Saat olahraga intens, suplai O2 ke otot tidak cukup, sehingga otot beralih ke lactic acid fermentation untuk ATP cepat. Lactate menumpuk dan dulu dikira penyebab langsung rasa pegal (kini pandangan ini direvisi). Setelah olahraga, tubuh "membayar" **oxygen debt**: lactate diangkut ke hati dan diubah kembali menjadi glukosa (siklus Cori), menggunakan O2 ekstra. Ini contoh **deferred work** — komputasi mahal ditunda sampai resource (O2) kembali tersedia.
>
> #### CS Angle: Fallback Path, Resource Pool, dan Throughput vs Availability
> Regenerasi NAD+ adalah manajemen **finite resource pool**: NAD+ harus dikembalikan agar consumer (glikolisis) tidak starvation/deadlock — analog langsung dengan connection pooling. Pilihan aerob vs fermentasi mencerminkan trade-off klasik **throughput vs availability**: jalur aerob throughput tinggi tapi butuh dependency (O2); fermentasi throughput rendah tapi selalu tersedia. Facultative anaerobe mengimplementasikan **adaptive strategy / runtime branching** yang memilih jalur optimal berdasarkan kondisi — mirip load balancer yang mengarahkan trafik ke degraded mode saat backend utama down.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan switch aerob/anaerob sebagai fungsi `respire(glucose, o2_available)` yang mereturn ATP berbeda, dan plot throughput ATP sebagai fungsi ketersediaan O2.
> 2. Modelkan NAD+/NADH sebagai resource pool berukuran tetap; tunjukkan secara simulasi bahwa tanpa regenerasi (fermentasi) glikolisis deadlock.
> 3. Bandingkan yield ATP dan produk samping (etanol vs lactate) dari kedua fermentasi, dan kaitkan dengan aplikasi industri (bioetanol, fermentasi pangan).
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 7, Concept 7.5.
> - Madigan et al., *Brock Biology of Microorganisms* — bab metabolisme anaerob dan klasifikasi anaerob.
> - Buchanan & Wilson, *Industrial Fermentation* — aplikasi fermentasi dalam bioteknologi.

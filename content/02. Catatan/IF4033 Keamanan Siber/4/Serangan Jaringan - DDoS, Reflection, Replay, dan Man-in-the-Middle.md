---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Serangan Jaringan - DDoS, Reflection, Replay, dan Man-in-the-Middle
>
> > ## Questions/Cues
> >
> > - Apa itu DDoS dan apa saja jenis flood-nya?
> > - Bagaimana reflection attack bekerja?
> > - Mengapa replay attack berbahaya walau trafik terenkripsi?
> > - Bagaimana man-in-the-middle terjadi?
> >
> > ## Reference Points
> >
> > - IF4033 Network Security (Slides 12-16)
>
> > ### Distributed Denial of Service (DDoS)
> >
> > DDoS membanjiri layanan dengan trafik berlebih memakai banyak komputer yang telah **dikompromikan** (botnet), sehingga layanan tidak tersedia bagi pengguna sah. Variannya:
> >
> > - **HTTP flood**: serangan lapisan 7, membanjiri dengan request HTTP yang tampak sah.
> > - **SYN flood**: menghabiskan tabel koneksi dengan handshake TCP setengah terbuka.
> > - **UDP flood**: membanjiri port dengan paket UDP.
> > - **Reflection attack**: varian DDoS.
> >
> > Skala DDoS terus tumbuh dari tahun ke tahun (laporan Kaspersky Securelist Q3 2022).
> >
> > ### Reflection Attack
> > 
> > ![[Pasted image 20261011224809.png]]
> >
> > Penyerang mengirim request ke server pihak ketiga dengan **alamat sumber dipalsukan** menjadi alamat korban. Server pihak ketiga membalas ke korban, sehingga trafik datang dari banyak sumber sah. Bila balasan jauh lebih besar dari request (*amplification*, mis. DNS/NTP/memcached), dampaknya berlipat.
> >
> > ### Replay Attack
> > 
> > ![[Pasted image 20261011224825.png]]
> >
> > Penyerang **merekam dan memutar ulang** trafik. Walau trafik terenkripsi, penyerang tidak perlu memecahkannya: tujuannya mendapatkan **sesi valid** tanpa menyerang enkripsinya. Mitigasi: *nonce*, timestamp, nomor urut, dan token sesi sekali pakai.
> >
> > ### Man-in-the-Middle (MitM)
> >
> > Dikenal juga sebagai *proxy*: penyerang diam-diam **meneruskan dan mungkin mengubah** komunikasi antara dua pihak yang mengira berkomunikasi langsung. Mitigasi: autentikasi sertifikat (TLS), mutual authentication, dan integritas pesan.
> >
> > ![[Pasted image 20261011225001.png]]

> [!cornell] #### Summary
>
> Serangan jaringan utama: **DDoS** (HTTP/SYN/UDP flood dari botnet), **reflection** (memalsukan sumber agar server pihak ketiga membanjiri korban, sering dengan amplifikasi), **replay** (memutar ulang trafik terenkripsi untuk mendapat sesi valid), dan **man-in-the-middle** (menyisipkan diri sebagai proxy yang bisa mengubah komunikasi). Mitigasinya meliputi nonce/timestamp, TLS dengan sertifikat, dan penyaringan trafik.

> [!ad-libitum]- Additional Information
>
> #### Mitigasi DDoS Praktis
>
> Layanan *scrubbing* dan CDN (mis. Cloudflare), *rate limiting*, SYN cookies, anycast, dan BCP38 (*ingress filtering*) untuk mengurangi pemalsuan IP.
>
> #### Proyek Eksplorasi Mandiri
> 1. Di lab terisolasi, simulasikan SYN flood dengan `hping3` terhadap VM, amati tabel koneksi, lalu aktifkan SYN cookies.
>
> #### Bacaan Lanjutan
> - Cloudflare Learning Center: DDoS.
> - RFC 4987 (TCP SYN flooding attacks and common mitigations).

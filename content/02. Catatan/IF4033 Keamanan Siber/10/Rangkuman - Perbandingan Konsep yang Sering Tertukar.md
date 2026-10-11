---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Rangkuman - Perbandingan Konsep yang Sering Tertukar
>
> > ## Questions/Cues
> >
> > - Apa beda konsep-konsep yang mirip (authN vs authZ, accountability vs NR, dst.)?
> > - Apa beda hash, MAC, dan digital signature?
> > - Apa beda simetris vs asimetris, link vs end-to-end, VA vs pentest?
> > - Apa beda tiap jenis malware dan model access control?
> >
> > ## Reference Points
> >
> > - Rangkuman payung 1-9
>
> > ### Konsep Dasar
> >
> > | Pasangan | Beda utama |
> > |---|---|
> > | **Authentication vs Authorization** | "Siapa kamu?" (identity) vs "Boleh apa?" (authority) |
> > | **Accountability vs Non-repudiation** | Melacak siapa pelakunya (log) vs pelaku tak bisa menyangkal dan bisa dibuktikan ke pihak ketiga (tanda tangan digital + TTP) |
> > | **Confidentiality vs Integrity** | Siapa yang boleh tahu vs apakah data berubah |
> > | **Vulnerability vs Threat vs Attack** | Kelemahan vs potensi bahaya vs eksploitasi nyata |
> > | **Risk vs Threat** | Probabilitas × dampak vs keadaan berpotensi bahaya |
> > | **Secure by default vs Fail-secure** | Kondisi awal aman vs kondisi saat gagal tetap aman |
> > | **Least privilege vs Separation of duties** | Hak seminimal mungkin vs satu tugas dipecah antar pihak |
> > | **Defense in depth vs Single control** | Banyak lapis vs mengandalkan satu kontrol |
> > | **Network security vs Software security** | Melindungi jalur/perimeter vs melindungi kode aplikasi (firewall tidak melihat isi HTTP) |
> >
> > ### Kriptografi
> >
> > | Pasangan | Beda utama |
> > |---|---|
> > | **Simetris vs Asimetris** | Satu kunci, cepat, distribusi kunci sulit vs pasangan kunci, lambat, manajemen kunci lebih mudah di skala besar |
> > | **Stream vs Block cipher** | Per bit/real-time vs per blok sama panjang |
> > | **Substitusi vs Transposisi** | Mengganti karakter (confusion) vs memindah posisi (diffusion) |
> > | **ECB vs CBC** | Blok independen (pola bocor) vs dirantai dengan IV |
> > | **CBC vs GCM** | Hanya confidentiality (perlu MAC terpisah) vs confidentiality + integrity (AEAD) |
> > | **DES vs AES** | 56-bit/64-bit/Feistel vs 128-bit/128-256/SP-network |
> > | **RSA vs ECC** | Faktorisasi, kunci panjang vs ECDLP, kunci pendek |
> > | **RSA vs Diffie-Hellman** | Enkripsi/tanda tangan vs hanya kesepakatan kunci |
> > | **Hash vs MAC vs Digital signature** | Lihat tabel di bawah |
> > | **Steganografi vs Kriptografi** | Menyembunyikan keberadaan pesan (tanpa kunci) vs menyamarkan isi |
> > | **CA vs KDC** | Penerbit sertifikat kunci publik vs penerbit session key simetris (Kerberos) |
> >
> > #### Hash vs MAC vs Digital Signature
> >
> > | Properti | Hash | MAC/HMAC | Digital signature |
> > |---|---|---|---|
> > | Kunci | Tidak ada | Kunci rahasia bersama | Kunci privat (tanda tangan), publik (verifikasi) |
> > | Integrity | Ya, jika digest terlindungi | Ya | Ya |
> > | Authentication (sumber) | **Tidak** (siapa pun bisa menghitung ulang) | Ya (antar dua pihak) | Ya (siapa pun dapat memverifikasi) |
> > | Non-repudiation | Tidak | **Tidak** (kedua pihak punya kunci) | **Ya** |
> > | Kecepatan | Sangat cepat | Cepat | Lebih lambat |
> >
> > ### Jaringan dan VA
> >
> > | Pasangan | Beda utama |
> > |---|---|
> > | **VA vs Penetration testing** | Menemukan banyak kelemahan (luas, otomatis) vs membuktikan eksploitasi dan dampak (dalam, manual) |
> > | **Recon pasif vs aktif** | Tanpa menyentuh target (WHOIS, OSINT) vs berinteraksi (Nmap, scanner) |
> > | **SYN scan vs connect scan** | Setengah terbuka, lebih senyap vs handshake penuh, tercatat di log |
> > | **CVE vs CWE vs NVD** | ID kerentanan spesifik vs kategori kelemahan vs database + skor |
> > | **IDS vs IPS** | Mendeteksi dan mencatat vs juga memblokir |
> > | **Signature vs heuristic IDS** | Pola dikenal vs perilaku anomali |
> > | **NIDS vs HIDS** | Memantau jaringan vs memantau host |
> > | **Link vs End-to-end encryption** | Header+data per hop (node membaca data) vs hanya data, sumber ke tujuan (header terlihat) |
> > | **TLS vs IPsec** | Transport/per koneksi aplikasi vs network/seluruh trafik IP |
> > | **Single vs dual firewall** | Satu perangkat multi-zona (SPOF) vs dua perangkat berlapis |
> > | **DDoS vs Reflection vs Replay vs MitM** | Banjir dari botnet vs memantulkan lewat pihak ketiga vs memutar ulang rekaman vs menyisip di tengah |
> > | **Incoming vs Outgoing** | Relatif ke yang dilindungi: ingress masuk, egress keluar |
> >
> > ### Access Control
> >
> > | Pasangan | Beda utama |
> > |---|---|
> > | **DAC vs MAC vs RBAC vs ABAC** | Pemilik memutuskan vs sistem berdasar level vs berdasar role vs berdasar atribut (subject, resource, environment) |
> > | **Bell-LaPadula vs Biba** | Confidentiality (no read up, no write down) vs integrity (no read down, no write up) |
> > | **ACL vs Capability** | Per objek vs per subjek |
> > | **Kerberos vs CAS vs OpenID vs SAML vs OAuth** | Ticket simetris vs SSO HTTPS vs federasi identitas vs assertion XML vs delegasi otorisasi |
> > | **Authentication protocol vs OAuth** | Membuktikan identitas vs memberi akses terbatas tanpa password |
> >
> > ### Forensik, Cloud, Malware
> >
> > | Pasangan | Beda utama |
> > |---|---|
> > | **Forensik vs Incident response** | Penuntutan, post-mortem vs pemulihan cepat, live analysis |
> > | **Disk file-level vs sector-level** | Tidak dapat file terhapus vs salinan persis |
> > | **VM vs Container** | Kernel sendiri (isolasi kuat) vs berbagi kernel host |
> > | **Classical vs Cloud-native boundary** | Perimeter berbasis lokasi vs Zero Trust berbasis identitas |
> > | **Virus vs Worm vs Trojan** | Host + manusia vs mandiri vs menipu pengguna |
> > | **Backdoor vs Logic bomb** | Pintu masuk rahasia vs terpicu kondisi tertentu |
> > | **Polymorphic vs Metamorphic** | Lapisan enkripsi berubah vs kode itu sendiri berubah |
> > | **Userland vs Kernel rootkit vs Bootkit** | Ganti utilitas vs hook kernel vs ganti boot loader/MBR |
> > | **IOC vs Behavior-based detection** | Cepat kedaluwarsa vs lebih tahan lama |

> [!cornell] #### Summary
>
> Pasangan yang paling sering menjebak: **authN vs authZ**, **accountability vs non-repudiation**, **hash vs MAC vs digital signature** (hanya signature yang memberi non-repudiation; hash tanpa kunci tidak memberi authentication), **link vs end-to-end encryption**, **VA vs pentest**, **DAC/MAC/RBAC/ABAC**, serta **virus/worm/trojan**. Saat menjawab, sebut **kunci pembeda** dalam satu kalimat lalu beri contoh.

> [!ad-libitum]- Additional Information
>
> #### Pola Soal "Bedakan"
>
> Jawab dengan tabel dua kolom (aspek-aspek: tujuan, mekanisme, kelebihan/kekurangan, contoh), lalu satu kalimat kesimpulan kapan memakai masing-masing.
>
> #### Detail Lengkap
> - [[Hash Function, Message Digest, MAC, dan HMAC]], [[IDS, Redundancy, Enkripsi Jaringan, dan Studi Kasus Target]], [[Chinese Wall, Separation of Privileges, dan Conflict of Interest]]

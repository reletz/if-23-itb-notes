---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Reconnaissance, Enumeration, dan Scanning dengan Nmap
>
> > ## Questions/Cues
> >
> > - Apa tujuan reconnaissance dan apa beda metode aktif, pasif, dan offline?
> > - Apa tujuan network enumeration dan scanning?
> > - Opsi Nmap apa yang penting?
> > - Apa beda SYN scan dan connect scan?
> >
> > ## Reference Points
> >
> > - IF4033 Vulnerability Assessment (Slides 17-24)
>
> > ### Reconnaissance
> >
> > Tujuan: **mengidentifikasi dan meneliti target potensial**, menemukan kerentanannya, pihak ketiga yang terhubung, data yang dapat diakses, serta jalur masuk yang sudah ada maupun yang baru. Berdasarkan interaksinya:
> >
> > | Jenis | Contoh |
> > |---|---|
> > | **Active, online** | nmap, Shodan, vulnerability scanner, social engineering |
> > | **Passive, online** | Wireshark, OSINT |
> > | **Offline** | *dumpster diving* |
> >
> > ### Network Enumeration dan Scanning
> >
> > Tujuan: menemukan jaringan milik target, **live host**, dan **layanan** yang berjalan. Metode: memindai semua host aktif (IP Angry Scanner, ARP scan), program pemindai host/port/service (Nmap, autoscan), **DNS querying**, dan **route analysis** (traceroute). Tool pendukung seperti **WhatWeb** mengidentifikasi teknologi sebuah situs.
> >
> > ### Teknik dan Opsi Nmap
> >
> > Dua teknik dasar: **SYN scan** (setengah terbuka; tidak menyelesaikan three-way handshake, lebih senyap) dan **connect scan** (menyelesaikan handshake penuh sehingga tercatat di log target).
> >
> > | Opsi | Fungsi |
> > |---|---|
> > | `-sT` | TCP connect scan |
> > | `-sS` | SYN scan |
> > | `-sU` | UDP scan |
> > | `-sV` | Deteksi versi service |
> > | `-sC` | Jalankan semua NSE script default |
> > | `-O` | Deteksi OS |
> > | `-A` | Gabungan `-sV`, `-sC`, `-O`, dan traceroute |
> > | `-T<n>` | Template timing (makin tinggi makin cepat) |
> >
> > ```mermaid
> > flowchart LR
> >     RC["Recon<br/>WHOIS, OSINT"] --> EN["Enumeration<br/>live host, DNS, route"] --> SC["Scanning<br/>port, service, OS"] --> VT["Vulnerability testing"]
> > ```

> [!cornell] #### Summary
>
> **Reconnaissance** mengumpulkan informasi target secara **aktif** (nmap, Shodan, social engineering), **pasif** (OSINT, Wireshark), atau **offline** (dumpster diving). **Enumeration dan scanning** menemukan jaringan, live host, port, dan service memakai ARP scan, DNS query, traceroute, dan **Nmap** (`-sS`, `-sT`, `-sU`, `-sV`, `-sC`, `-O`, `-A`, `-T`). SYN scan lebih senyap daripada connect scan.

> [!ad-libitum]- Additional Information
>
> #### Etika dan Legalitas
>
> Pemindaian tanpa izin dapat melanggar hukum (di Indonesia UU ITE). Lakukan hanya pada sistem milik sendiri atau dengan *written authorization*. Lihat praktik pada [[Writeup Network Scanning]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun lab VM dan jalankan `nmap -A -T4` lalu bandingkan hasil dengan `-sS -sV` saja, termasuk jejaknya di log target.
>
> #### Bacaan Lanjutan
> - Lyon, G. *Nmap Network Scanning* (nmap.org/book).

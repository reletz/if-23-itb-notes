---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pengembangan Aplikasi pada Platform Khusus]]

> [!cornell] Evolution of Wireless Communication Generations (0G to 5G)
>
> > ## Questions/Cues
> >
> > - Apa karakteristik utama setiap generasi (0G-5G)?
> > - Teknologi apa yang digunakan pada masing-masing generasi?
> > - Bagaimana perkembangan kecepatan data dari 1G hingga 5G?
> > - Apa aplikasi utama yang dimungkinkan setiap generasi?
> > - Bagaimana teknik modulasi berkembang antar generasi?
> >
> > ## Reference Points
> >
> > - Lecture_IF3210.pptx (Slides 8-14)
> > - Lecture_IF3210.pptx (Slide 15 - Tabel Perbandingan)
>
> > ### Generasi 0G (1946-1980an)
> >
> > Sistem komunikasi seluler pertama sebelum era digital, dikenal sebagai "Mobile Telephone Service" (MTS). Beroperasi secara analog dengan perangkat besar yang dipasang di mobil/truk menggunakan radio VHF. Hanya mendukung panggilan suara dengan kualitas rendah dan rentan gangguan. Contoh sistem: Mobile Telephone System (MTS) di AS dan Improved MTS (IMTS). Pengguna harus menekan tombol untuk berbicara (push-to-talk) dan berbagi saluran dengan pengguna lain. Biaya operasional sangat mahal sehingga hanya tersedia untuk kalangan tertentu.
> >
> > ### Generasi 1G (1980an-Sekarang)
> >
> > Memperkenalkan teknologi seluler analog komersial pertama. Menggunakan modulasi frekuensi (FM) dengan kecepatan data hingga 2.4 kbps. Sistem Advanced Mobile Phone System (AMPS) menjadi standar di Amerika Utara. Memungkinkan roaming terbatas antar wilayah tetapi masih rentan terhadap penyadapan karena tidak ada enkripsi. Contoh perangkat ikonik: Motorola DynaTAC 8000X (1983) dengan berat 1.1 kg. Keterbatasan utama: kapasitas jaringan rendah, konsumsi daya tinggi, dan tidak ada layanan data.
> >
> > ### Generasi 2G (1990an-Sekarang)
> >
> > Transisi ke sinyal digital menggunakan teknologi TDMA (Time Division Multiple Access) dan CDMA (Code Division Multiple Access). Mengimplementasikan enkripsi untuk keamanan dan memperkenalkan SMS (Short Message Service). Standar GSM (Global System for Mobile Communications) menjadi dominan secara global. Kecepatan data meningkat hingga 64 kbps dengan teknologi circuit-switched. Memungkinkan layanan roaming internasional dan pengenalan kartu SIM (Subscriber Identity Module). Contoh implementasi: jaringan GSM pertama di Finlandia (1991) oleh Radiolinja.
> >
> > ### Generasi 2.5G (1990an-Sekarang)
> >
> > Generasi transisi yang memperkenalkan paket data melalui GPRS (General Packet Radio Service) dan EDGE (Enhanced Data rates for GSM Evolution). Mengubah paradigma dari circuit-switched ke packet-switched, memungkinkan akses internet "always-on". Kecepatan meningkat hingga 144 kbps (EDGE) dan mengurangi latency. Memungkinkan layanan MMS (Multimedia Messaging Service) dan email mobile dasar. Contoh implementasi: BlackBerry 850 (1999) yang mempopulerkan email mobile. Teknologi CDMA2000 1xRTT menjadi alternatif di pasar Amerika.
> >
> > ### Generasi 3G (2000an-Sekarang)
> >
> > Membawa broadband mobile dengan kecepatan 2 Mbps menggunakan teknologi W-CDMA (Wideband CDMA). Standar UMTS (Universal Mobile Telecommunications System) menjadi basis untuk layanan video call, mobile TV, dan internet berkecepatan tinggi. Memperkenalkan konsep "self-organizing network" untuk optimasi cakupan. Aplikasi seperti video streaming (YouTube) dan GPS-based services menjadi mungkin. Evolusi HSPA (High Speed Packet Access) meningkatkan kecepatan hingga 14 Mbps. Contoh implementasi: jaringan 3G pertama oleh NTT DoCoMo Jepang (2001).
> >
> > ### Generasi 4G (2010an-Sekarang)
> >
> > Mengadopsi teknologi all-IP dengan OFDMA (Orthogonal Frequency Division Multiple Access) untuk efisiensi spektrum. Memenuhi standar IMT-Advanced dengan kecepatan 100 Mbps (mobile) hingga 1 Gbps (stasioner). Teknologi utama: LTE (Long Term Evolution) dan WiMAX. Mendukung layanan MAGIC: Mobile Multimedia, Anytime-Anywhere, Global Mobility, Integrated Solution, Customized Service. Memungkinkan aplikasi HD video streaming, cloud gaming, dan real-time collaboration. Contoh implementasi: LTE pertama di Stockholm dan Oslo (2009).
> >
> > ### Generasi 5G (2020an-Sekarang)
> >
> > Generasi terkini dengan tiga use case utama: eMBB (Enhanced Mobile Broadband), mMTC (Massive Machine-Type Communications), dan URLLC (Ultra-Reliable Low Latency Communications). Menggunakan spektrum millimeter wave (24-100 GHz) untuk kapasitas tinggi, Massive MIMO, dan network slicing. Kecepatan mencapai 20 Gbps dengan latency 1ms. Mendukung IoT skala besar (1 juta perangkat/km²), mobil otonom, dan augmented reality. Teknologi utama: NR (New Radio) dan edge computing. Implementasi awal di Korea Selatan (2019) dengan aplikasi smart factory dan remote surgery.

> [!cornell] #### Summary
> **Evolusi komunikasi nirkabel** dimulai dari 0G (analog terbatas) hingga 5G (digital ultra-cepat) dengan peningkatan kapasitas, kecepatan, dan layanan. **Transisi analog-digital** (1G→2G) membawa enkripsi dan SMS, sementara **paket data** (2.5G) memungkinkan internet mobile. **Broadband** (3G/4G) menghadirkan multimedia dan all-IP networking, sedangkan **5G** memperkenalkan network slicing dan IoT masif. **Perkembangan teknik modulasi** (FDMA→OFDMA/Massive MIMO) menjadi kunci peningkatan kinerja, didorong kebutuhan aplikasi dari suara hingga real-time AI.

> [!ad-libitum]- Additional Information
>
> #### Analisis Komparatif Teknologi
> FDMA (1G) membagi spektrum menjadi channel frekuensi eksklusif, efisien untuk suara tetapi boros spektrum. TDMA (2G) membagi waktu pada frekuensi sama, meningkatkan kapasitas 3-6x. CDMA (2G/3G) menggunakan kode unik per pengguna dengan spread spectrum, lebih tahan interferensi. OFDMA (4G/5G) membagi carrier menjadi subcarrier orthogonal, optimal untuk data rate tinggi dan latency rendah.
>
> #### Arsitektur Jaringan 5G
> Terdiri dari tiga layer: Radio Access Network (NR gNodeB), Core Network berbasis cloud (Network Function Virtualization), dan Multi-access Edge Computing (MEC). Network slicing memungkinkan pembagian jaringan virtual untuk use case berbeda (mis: slice untuk IoT dengan latency tinggi, slice untuk eMBB dengan throughput besar) pada infrastruktur fisik sama.
>
> #### Implementasi dan Tantangan
> Penggunaan Massive MIMO (64-256 antena) meningkatkan kapasitas 10x tetapi membutuhkan algoritma precoding kompleks. Millimeter wave memberikan bandwidth besar tetapi rentan terhadap redaman (atmospheric absorption, obstacle blocking). Solusi: beamforming adaptif dan small cell densification (setiap 100-200m di area urban).
>
> #### Proyek Eksplorasi Mandiri
> 1. Simulasi perbandingan throughput LTE vs 5G menggunakan NS-3/OMNeT++ dengan skenario urban dan rural.
> 2. Implementasi sederhana OFDM transmitter/receiver menggunakan GNU Radio dan USRP.
> 3. Analisis dampak kepadatan small cell terhadap kualitas layanan di daerah perkotaan.
>
> #### Alat dan Sumber Belajar
> - Simulator jaringan: 5G-LENA untuk NS-3, MATLAB 5G Toolbox
> - Platform SDR: USRP B210, LimeSDR untuk eksperimen RF
> - Buku: "Fundamentals of 5G Mobile Networks" oleh Wisely & Wang
>
> #### Bacaan Lanjutan
> - Whitepaper 3GPP TS 38.300 (NR Architecture)
> - Jurnal IEEE: "Millimeter Wave Mobile Communications for 5G"
> - Tutorial: 5G NR Physical Layer Overview di MathWorks
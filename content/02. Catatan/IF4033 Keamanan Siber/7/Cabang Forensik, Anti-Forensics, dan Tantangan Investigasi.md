---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Cabang Forensik, Anti-Forensics, dan Tantangan Investigasi
>
> > ## Questions/Cues
> >
> > - Apa saja cabang digital forensics dan fokus masing-masing?
> > - Apa beda database forensics dan database recovery?
> > - Apa itu anti-forensics dan teknik apa saja?
> > - Apa tantangan utama investigasi digital?
> >
> > ## Reference Points
> >
> > - IF4033 Computer Forensics (Slides 46-58)
>
> > ### Cabang Forensik
> >
> > | Cabang | Fokus |
> > |---|---|
> > | **Malware forensics** | Apa yang dapat dilakukan malware, keluarganya (ransomware, keylogger, RAT), cara deteksi dan blokir, serta cara membersihkannya |
> > | **Email forensics** | Alamat pengirim, protokol inisiasi (HTTP, SMTP), message ID, IP pengirim, jalur pesan, aplikasi pembuat, timestamp |
> > | **Smartphone forensics** | Kontak, SMS, panggilan, foto; sumber penting karena data dapat dipakai menyamar sebagai pemilik; ada tiga pendekatan ekstraksi yang harus dapat dipertanggungjawabkan di pengadilan |
> > | **Database forensics** | Menginterogasi database gagal untuk merekonstruksi metadata dan halaman; **berbeda dari database recovery** (pemulihan agar produksi kembali). Dipakai saat database gagal, data terhapus, inkonsistensi, atau perilaku pengguna mencurigakan |
> > | **Disk forensics** | Akuisisi data di hard drive/USB pada level **file** (tidak mendapat file terhapus/unallocated) atau **sektor** (salinan persis); bila rusak memakai **file carving** |
> > | **Cloud forensics** | Log, image disk VM, dump memori, console log, network capture; tool contoh FROST untuk OpenStack |
> >
> > ### Anti-Forensics
> >
> > Prinsipnya: *"buat sulit ditemukan dan mustahil dibuktikan telah ditemukan"* (prevent, counteract, neutralize). Contoh:
> >
> > - **Data hiding**: steganografi, folder/drive tersembunyi, bad sector.
> > - **Enkripsi**.
> > - **Artifact wiping**.
> > - **Trail obfuscation**: manipulasi timestamp, spoofing, misinformasi, trojan commands.
> > - **Serangan terhadap tool forensik**: logic bomb, malware.
> >
> > ### Tantangan Investigasi
> >
> > - Sulit menetapkan TKP, kerangka waktu terkompresi, bukti tak berwujud, sulit dikumpulkan.
> > - Investigasi dapat mengganggu bisnis; prosedur pemulihan dapat menghancurkan bukti; data pada peralatan bersama; butuh ahli.
> > - Lokasi tersebar lintas **yurisdiksi** (hukum, surat perintah penggeledahan berbeda).
> > - Tren teknologi: **shared resources** (cloud, SaaS), teknologi anonimitas (Bitcoin, Tor), **enkripsi di mana-mana**, penyimpanan raksasa, trafik tinggi, hardware/software tidak *forensic-ready*, "semua yang digital bisa dikloning atau dimodifikasi", dan bangkitnya anti-forensics.
> > - Aspek lain: kesadaran, kerangka hukum dan standar, keterbatasan pendidikan dan sumber daya, berbagi informasi antar-lembaga/negara; kekurangan sertifikasi tool/profesional, standar, dan akreditasi kurikulum; disiplin ilmu yang belum matang.

> [!cornell] #### Summary
>
> Digital forensics bercabang menjadi **malware, email, smartphone, database, disk,** dan **cloud forensics**, masing-masing dengan artefak dan metode akuisisi sendiri (mis. file-level vs sector-level, file carving). **Anti-forensics** (data hiding, enkripsi, wiping, obfuscation) berusaha menyulitkan temuan. Tantangan investigasi meliputi **yurisdiksi, volatilitas bukti, enkripsi, cloud, anonimitas**, serta kekurangan standar dan sertifikasi.

> [!ad-libitum]- Additional Information
>
> #### Forensik Kontainer
>
> Sifat *ephemeral* container membuat bukti hilang saat pod dihapus; teknik dan urutan akuisisi pada Kubernetes dibahas di [[Anatomi Breach Cloud-Native dan Respons Insiden]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Analisis header email phishing sampel: telusuri rantai `Received`, periksa SPF/DKIM/DMARC, dan laporkan IP asal.
>
> #### Bacaan Lanjutan
> - Casey, E. *Digital Evidence and Computer Crime*.
> - NIST IR 8006 *Cloud Computing Forensic Science Challenges*.

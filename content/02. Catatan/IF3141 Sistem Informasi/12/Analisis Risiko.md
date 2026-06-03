---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Analisis Risiko
>
> > ## Questions/Cues
> >
> > - Bagaimana skala tingkat kemungkinan kejadian (1-3) didefinisikan?
> > - Bagaimana skala tingkat dampak risiko (1-3) didefinisikan?
> > - Bagaimana cara menghitung Tingkat Risiko?
> > - Bagaimana membaca matriks risiko rendah/sedang/tinggi?
> > - Aksi apa yang diambil berdasarkan level risiko?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 14-22)
>
> > ### Tingkat Kemungkinan Kejadian (Likelihood)
> >
> > **Analisis risiko** mengukur dua komponen: seberapa sering suatu risiko mungkin terjadi (kemungkinan) dan seberapa besar dampaknya bila terjadi. **Tingkat kemungkinan kejadian** dinilai dalam skala 1-3 dengan **periode = 1 tahun**:
> >
> > | Tingkat | Kemungkinan | Deskripsi |
> > |---------|-------------|-----------|
> > | **1** | Kecil | Kemungkinan terjadi **1-2 kali** dalam satu periode |
> > | **2** | Sedang | Kemungkinan terjadi **3-4 kali** dalam satu periode |
> > | **3** | Besar | Kemungkinan terjadi **>5 kali** dalam satu periode |
> >
> > ### Tingkat Dampak Risiko (Impact)
> >
> > **Tingkat dampak** menilai seberapa serius akibat (finansial maupun non-finansial) bila risiko terwujud, juga dalam skala 1-3:
> >
> > | Tingkat | Dampak | Deskripsi |
> > |---------|--------|-----------|
> > | **1** | Kecil | Dampak finansial atau non-finansial **tidak terlalu serius**, tidak menyebabkan banyak masalah atau kerusakan |
> > | **2** | Sedang | Dampak finansial atau non-finansial **besar** atau berpengaruh sehingga butuh **tindakan lebih lanjut** |
> > | **3** | Besar | Dampak finansial atau non-finansial **sangat buruk, serius**, atau kerusakan yang tidak dikehendaki |
> >
> > ### Pengukuran Tingkat Risiko
> >
> > **Tingkat Risiko** dihitung sebagai perkalian kedua komponen:
> >
> > `Tingkat Risiko = Tingkat Kemungkinan × Tingkat Dampak`
> >
> > Karena masing-masing komponen bernilai 1-3, hasil perkalian berkisar dari **1 hingga 9**. Nilai inilah yang kemudian dipetakan ke level risiko rendah, sedang, atau tinggi.
> >
> > ```mermaid
> > flowchart LR
> >     K["Tingkat Kemungkinan<br/>(1-3)"]
> >     D["Tingkat Dampak<br/>(1-3)"]
> >     TR["Tingkat Risiko<br/>= Kemungkinan × Dampak<br/>(1-9)"]
> >     K --> TR
> >     D --> TR
> >     TR --> R["Rendah (1-3)<br/>Dipantau"]
> >     TR --> S["Sedang (4-6)<br/>Aksi ≤ 6 bulan"]
> >     TR --> T["Tinggi (>7)<br/>Aksi ≤ 3 bulan"]
> > ```
> >
> > ### Klasifikasi Level dan Aksi
> >
> > Berdasarkan nilai Tingkat Risiko, ditentukan level beserta **aksi** penanganannya:
> >
> > | Tingkat Risiko | Level | Aksi |
> > |----------------|-------|------|
> > | **> 7** | Tinggi | Harus ada aksi perbaikan dalam **maksimum 3 bulan** ke depan |
> > | **4 - 6** | Sedang | Harus ada aksi perbaikan dalam **maksimum 6 bulan** ke depan |
> > | **1 - 3** | Rendah | Perlu ada perhatian (dipantau) |
> >
> > ### Matriks Risiko
> >
> > Kombinasi kemungkinan dan dampak divisualisasikan dalam **matriks risiko** 3×3. Baris merepresentasikan **Tingkat Kemungkinan**, kolom merepresentasikan **Tingkat Dampak**:
> >
> > | Kemungkinan \ Dampak | **1** | **2** | **3** |
> > |----------------------|-------|-------|-------|
> > | **1** | Rendah | Rendah | Rendah |
> > | **2** | Rendah | Sedang | Sedang |
> > | **3** | Rendah | Sedang | Tinggi |
> >
> > Terlihat bahwa level **Tinggi** hanya tercapai ketika kemungkinan dan dampak sama-sama besar (3×3 = 9), sementara dampak kecil (kolom 1) selalu menghasilkan risiko Rendah meskipun sering terjadi.
> >
> > ### Contoh Penghitungan — Simpelputer Kab. Situbondo
> >
> > Dimensi: **Smart Environment**; Program Kerja (QW): **Simpelputer – Kab. Situbondo**. Tingkat Risiko = kolom Kemungkinan × kolom Dampak:
> >
> > | ID | Kategori | Sub-Kategori | Risiko | Kemungkinan | Dampak | Tingkat Risiko |
> > |------|------------|--------------|--------------|:----------:|:------:|:--------------:|
> > | R-1 | Nature | Lingkungan | Banjir | 1 | 2 | **2** |
> > | R-2 | Nature | Lingkungan | Longsor | 1 | 3 | **3** |
> > | R-3 | Struktur | SDM/Birokrasi | Supir Sakit | 1 | 2 | **2** |
> > | R-4 | Infrastruktur | Teknologi | Mobil Rusak | 2 | 2 | **4** |
> >
> > Interpretasi: R-1, R-2, dan R-3 berada di level **Rendah** (≤3, cukup diberi perhatian), sedangkan R-4 (Mobil Rusak) bernilai **4** sehingga masuk level **Sedang** dan menuntut aksi perbaikan dalam maksimum 6 bulan.

> [!cornell] #### Summary
>
> **Analisis risiko** menilai dua komponen pada skala 1-3: **Tingkat Kemungkinan** (1 = 1-2 kali, 2 = 3-4 kali, 3 = >5 kali per periode satu tahun) dan **Tingkat Dampak** (1 = kecil, 2 = sedang, 3 = besar). **Tingkat Risiko = Kemungkinan × Dampak**, menghasilkan nilai 1-9 yang dipetakan ke **matriks risiko** 3×3 dengan level **Rendah (1-3)**, **Sedang (4-6)**, dan **Tinggi (>7)**. Setiap level menentukan urgensi aksi: Tinggi butuh perbaikan ≤3 bulan, Sedang ≤6 bulan, Rendah cukup dipantau. Pada contoh **Simpelputer Kab. Situbondo**, risiko Banjir, Longsor, dan Supir Sakit tergolong Rendah, sedangkan Mobil Rusak (2×2=4) tergolong Sedang.

> [!ad-libitum]- Additional Information
>
> #### Analisis Kualitatif vs Kuantitatif
>
> Metode di slide ini adalah **analisis kualitatif** (skala ordinal 1-3). Untuk risiko bernilai tinggi sering dilanjutkan dengan **analisis kuantitatif**, misalnya estimasi kerugian moneter atau **Expected Monetary Value (EMV) = Probabilitas × Dampak (Rp)** dan simulasi Monte Carlo.
>
> #### Variasi Matriks Risiko
>
> Banyak organisasi memakai matriks 5×5 (skala 1-5) untuk granularitas lebih halus, dengan zona warna hijau-kuning-merah. Prinsipnya sama: posisi sel = fungsi dari likelihood dan impact.
>
> #### Metode FMEA
>
> **Failure Mode and Effects Analysis (FMEA)** memperluas perkalian menjadi **RPN = Severity × Occurrence × Detection**, menambahkan dimensi seberapa mudah risiko terdeteksi sebelum berdampak.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Hitung Tingkat Risiko untuk lima risiko proyek tugas besar kalian dan plot ke matriks 3×3.
> 2. Bandingkan hasil prioritisasi memakai matriks 3×3 versus FMEA (RPN) pada risiko yang sama.
>
> #### Bacaan Lanjutan
>
> - ISO 31010 — *Risk Assessment Techniques*.
> - Stamatis, D.H. (2003). *Failure Mode and Effect Analysis: FMEA from Theory to Execution*.
> - NIST SP 800-30 — *Guide for Conducting Risk Assessments*.

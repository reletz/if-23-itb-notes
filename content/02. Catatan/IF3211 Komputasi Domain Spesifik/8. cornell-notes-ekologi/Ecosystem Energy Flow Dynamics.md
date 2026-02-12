---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Ekologi Komputasi]]

> [!cornell] Ecosystem Energy Flow Dynamics
>
> > ## Questions/Cues
> >
> > - Mengapa hukum termodinamika fundamental untuk ekosistem?
> > - Bagaimana produktivitas primer membatasi energi tersedia?
> > - Mengapa efisiensi transfer trofik hanya ~10%?
> > - Perubahan iklim mempengaruhi produktivitas bagaimana?
> > - Apa perbedaan GPP, NPP, dan NEP?
> >
> > ## Reference Points
> >
> > - Lecture_01_Ecosystems.pptx (Slides 1-20)
> > - Campbell_Biology_Ch42.pdf (Halaman 1-27)
> > - Computational_Ecology_Models.pdf (Halaman 66-77)
> >
>
> > ### Hukum Termodinamika dalam Ekosistem
> > Ekosistem tunduk pada hukum fisika, terutama **Hukum Pertama Termodinamika** (kekekalan energi) dan **Hukum Kedua Termodinamika** (peningkatan entropi). Energi masuk sebagai radiasi matahari, diubah menjadi energi kimia melalui fotosintesis, dan akhirnya dilepaskan sebagai panas.
> > Analogi: Seperti uang yang tidak bisa diciptakan/dihilangkan (Hukum 1), tetapi selalu ada biaya transaksi saat ditransfer (Hukum 2). Dalam ekosistem, "biaya transaksi" ini berupa panas yang terbuang saat energi berpindah antar organisme.
> > Contoh konkret: Hanya ~1% cahaya matahari yang diserap fotosintesis menjadi energi kimia. Siswa terbuang sebagai panas atau gelombang tak termanfaatkan. Ini menjelaskan mengapa rantai makanan umumnya pendek (biasanya 3-5 tingkat trofik).
> > ### Tingkat Trofik dan Transformasi Energi
> > Ekosistem mengorganisasi organisme dalam **tingkat trofik** berdasarkan sumber energi:
> > 1. **Produsen primer** (autotrof): Mengubah energi anorganik → organik (contoh: tanaman, fitoplankton)
> > 2. **Konsumen primer** (herbivora): Memakan produsen (contoh: ulat, zooplankton)
> > 3. **Konsumen sekunder/tersier** (karnivora): Memakan konsumen lain (contoh: burung pemakan ulat)
> > **Efisiensi ekologi** menentukan berapa energi yang bertahan di setiap transfer:
> > - Efisiensi produksi: % energi makanan → biomassa baru (rata-rata 10-15% untuk herbivora)
> > - Efisiensi trofik: % energi yang ditransfer antar tingkat (rata-rata 10%)
> > Contoh: Jika padang rumput memiliki 10.000 kkal energi tanaman (tingkat 1), hanya ~1.000 kkal sampai ke belalang (tingkat 2), dan ~100 kkal ke burung (tingkat 3).
> > ### Produktivitas Primer dan Sekunder
> > **Produktivitas Primer Kotor (GPP)**: Total energi yang difiksasi produsen melalui fotosintesis.
> > **Produktivitas Primer Bersih (NPP)**: GPP dikurangi energi untuk respirasi (Ra). NPP = GPP - Ra. Ini adalah energi tersedia untuk konsumen.
> > **Produktivitas Sekunder**: Energi yang diubah menjadi biomassa oleh konsumen. Rumus:
> > ```
> > Efisiensi Produksi = (Produksi Sekunder Bersih / Asimilasi) × 100%
> > ```
> > Contoh di hutan tropis:
> > - GPP = 5000 g C/m²/tahun
> > - Ra = 3000 g C/m²/tahun
> > - NPP = 2000 g C/m²/tahun → mendukung semua rantai makanan
> > ### Piramida Ekologi dan Pembatas Energi
> > Terdapat tiga jenis piramida:
> > 1. **Piramida energi**: Selalu tegak, menunjukkan penurunan energi tiap tingkat
> > 2. **Piramida biomassa**: Umumnya tegak, kecuali ekosistem tertentu (misal laut dengan fitoplankton cepat bereproduksi)
> > 3. **Piramida jumlah individu**: Tidak selalu tegak (contoh: satu pohon → banyak serangga)
> > **Faktor pembatas produktivitas**:
> > - Akuatik: Cahaya dan nutrien (N, P, Fe)
> > - Terestrial: Curah hujan dan suhu
> > Contoh: Penambahan fosfor di danau oligotrofik bisa meningkatkan produktivitas 300% (eutrofikasi).
> > ### Dampak Perubahan Iklim
> > Pemanasan global mengubah pola produktivitas melalui:
> > 1. **Perubahan presipitasi**: Daerah kering makin terbatas produktivitasnya
> > 2. **Peningkatan suhu**: Mempercepat dekomposisi tapi juga respirasi
> > 3. **Peristiwa ekstrem**: Kekeringan → kebakaran → pelepasan CO₂
> > Studi kasus: Kumbang pinus (*Dendroctonus ponderosae*) di Kanada meningkat populasi karena musim dingin yang lebih hangat, menyebabkan kematian pohon besar-besaran → mengurangi NPP hutan.

> [!cornell] #### Summary
> **Aliran energi ekosistem** diatur oleh hukum termodinamika, dengan **produktivitas primer** sebagai dasar seluruh rantai makanan. Hanya ~10% energi yang berhasil ditransfer antar tingkat trofik karena kehilangan panas (**efisiensi trofik**). **Perubahan iklim** mengancam keseimbangan ini melalui modifikasi pola suhu-presipitasi dan peningkatan gangguan ekologis. Pemahaman dinamika energi penting untuk prediksi ketahanan ekosistem.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Matematis Efisiensi Energi
> Efisiensi transfer energi (TE) dapat dimodelkan secara matematis:
> ```
> TE = (Production_level_n / Production_level_n-1) × 100%
> ```
> Dengan asumsi:
> - Production_level_n = energi tersedia di tingkat trofik ke-n
> - Rata-rata TE ≈ 10% berdasarkan pengamatan empiris
>
> **Persamaan kontinuitas energi**:
> ```
> ∂E/∂t = -∇·J + S - R
> ```
> Dimana:
> - E = densitas energi
> - J = fluks energi antar kompartemen
> - S = sumber energi (fotosintesis)
> - R = respirasi/dekomposisi
>
> #### Model Reaksi-Difusi untuk Jaring Makanan
> Model Zhang (2009) menggunakan persamaan:
> ```
> ∂B_i/∂t = D∇²B_i + rB_i(1 - B_i/K) - Σc_ijB_iB_j
> ```
> - B_i = biomassa spesies i
> - D = koefisien difusi energi
> - c_ij = koefisien interaksi spesies
>
> Simulasi menunjukkan:
> - Sistem stabil ketika diversitas tinggi dan konektivitas moderat
> - Kolaps terjadi jika D terlalu rendah (energi terperangkap) atau terlalu tinggi (terdispersi)
>
> #### Machine Learning dalam Pemantauan Energi
> Aplikasi CNN untuk klasifikasi spesies:
> 1. **ResNet-18** mencapai akurasi 97% identifikasi fauna
> 2. **BirdNET** (ResNet-157) analisis suara burung real-time
> Implementasi:
> - Pelatihan dengan augmentasi data lingkungan bervariasi
> - Prediksi biomassa berdasarkan data citra/suara
>
> #### Proyek Eksplorasi Mandiri
> 1. Simulasi aliran energi sederhana dengan Python:
> ```python
> import numpy as np
> trophic_levels = 4
> energy = np.zeros(trophic_levels)
> energy[0] = 10000  # Energi produsen primer
> for i in range(1, trophic_levels):
> energy[i] = energy[i-1] * 0.1  # Efisiensi 10%
> print(energy)  # Output: [10000. 1000. 100. 10.]
> ```
> 2. Eksperimen produktivitas mikroalga dengan variasi intensitas cahaya/nutrien
>
> #### Bacaan Lanjutan
> - Odum, H.T. (1956) "Primary Production in Flowing Waters" - Dasar produktiviti akuatik
> - Zhang, J. (2009) "Modeling Multi-species Ecosystems" - Pemodelan komputasi
> - BirdNET: https://birdnet.cornell.edu - Tool identifikasi avifauna
> - Coursera: "Ecological Modelling" - Pelatihan pemodelan ekosistem
---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Ekologi Komputasi]]

> [!cornell] Biodiversity Conservation Strategies
>
> > ## Questions/Cues
> >
> > - Mengapa diversitas genetik penting dalam konservasi?
> > - Bagaimana fragmentasi habitat memengaruhi spesies?
> > - Apa keuntungan koridor ekologis bagi populasi?
> > - Pendekatan apa yang efektif untuk populasi kecil?
> > - Bagaimana perubahan iklim mengancam biodiversitas?
> > - Apa perbedaan reservasi terzonasi dan tradisional?
> > - Bagaimana model komputasi mendukung konservasi?
> >
> > ## Reference Points
> >
> > - Ecology Part 2 (Slides 32-64)
> > - Modeling Multi-species Interacting Ecosystem (Slide 66-68)
> > - Nature Reserve Optimization (Slide 69-71)
> > - BirdNET Deep Learning (Slide 75-77)
> >
>
> > ### Tingkat-Tingkat Keanekaragaman Hayati
> > Keanekaragaman hayati mencakup tiga tingkat utama: **diversitas genetik** (variasi genetik dalam populasi), **diversitas spesies** (jumlah dan kelimpahan spesies), dan **diversitas ekosistem** (variasi tipe habitat). Diversitas genetik penting karena menentukan kemampuan adaptasi spesies terhadap perubahan lingkungan. Contohnya, populasi harimau Sumatra dengan diversitas genetik rendah lebih rentan terhadap penyakit dan perubahan iklim.
> > Diversitas spesies diukur melalui jumlah spesies endemik dan terancam punah. Spesies kunci seperti orangutan berperan sebagai **spesies payung** - perlindungannya otomatis melindungi spesies lain dalam ekosistem yang sama. Diversitas ekosistem penting karena setiap tipe ekosistem (hutan bakau, terumbu karang) menyediakan **jasa ekosistem** unik seperti perlindungan pantai dan penyerapan karbon.
> > ### Ancaman Utama terhadap Biodiversitas
> > Empat ancaman utama terhadap keanekaragaman hayati adalah: **hilangnya habitat** (konversi hutan menjadi lahan pertanian), **spesies invasif** (seperti ikan nila yang mengganggu ekosistem perairan), **eksploitasi berlebihan** (perburuan liar badak Jawa), dan **perubahan iklim**. Fragmentasi habitat menciptakan **efek tepi** (edge effects) yang mengubah kondisi mikroiklim dan meningkatkan risiko invasi spesies asing.
> > Contoh kasus: Pembangunan jalan di hutan Kalimantan memecah habitat orangutan menjadi **fragmen-fragmen terisolasi**, mengurangi luas wilayah jelajah dan meningkatkan kompetisi antarpopulasi. Dampak kumulatif dari ancaman-ancaman ini menyebabkan penurunan **ketahanan ekosistem** secara keseluruhan.
> > ### Strategi Konservasi In-Situ
> > Konservasi in-situ melindungi spesies dalam habitat aslinya melalui **kawasan konservasi** seperti taman nasional dan cagar alam. **Reservasi terzonasi** (zoned reserves) menggabungkan inti wilayah terlindung dengan zona penyangga untuk aktivitas berkelanjutan. Contoh: Taman Nasional Komodo memiliki zona inti yang dilindungi ketat dan zona pemanfaatan tradisional untuk masyarakat lokal.
> > **Koridor ekologis** menghubungkan fragmen habitat yang terisolasi, memungkinkan **aliran gen** antar populasi. Pembangunan koridor bawah jalan raya (eco-duct) di Taman Nasional Ujung Kulon memfasilitasi pergerakan badak Jawa. Keberhasilan konservasi in-situ memerlukan **keterlibatan masyarakat lokal** dalam pengelolaan dan pemantauan.
> > ### Pendekatan untuk Populasi Kecil
> > Populasi kecil rentan terhadap **lingkaran kepunahan** (extinction vortex) akibat hilangnya variasi genetik dan perkawinan sedarah. **Ukuran populasi efektif** (Ne) harus diperhitungkan, bukan hanya jumlah individu. Rumus Ne = (4*Nm*Nf)/(Nm + Nf) menunjukkan pentingnya keseimbangan gender dalam populasi.
> > **Augmentasi genetik** melalui introduksi individu dari populasi lain dapat meningkatkan diversitas genetik. Contoh: Program konservasi jalak Bali di Taman Nasional Bali Barat memasukkan individu dari penangkaran untuk mencegah depresi perkawinan sedarah. **Pemantauan genetik** rutin menggunakan penanda DNA membantu mengevaluasi efektivitas strategi ini.
> > ### Teknologi dan Komputasi dalam Konservasi
> > **Pemodelan ekosistem** menggunakan persamaan reaksi-difusi memprediksi dampak perubahan lingkungan terhadap jaringan makanan. Model ini mensimulasikan aliran energi antar spesies dan mengkuantifikasi **Total System Throughflow (TST)** sebagai indikator kesehatan ekosistem.
> > **Machine learning** merevolusi pemantauan biodiversitas. BirdNET menggunakan **jaringan saraf convolusional** untuk mengidentifikasi 984 spesies burung dari rekaman audio dengan akurasi 97%. Aplikasi seperti ini memungkinkan **pemantauan real-time** skala besar dengan biaya lebih rendah dibanding metode konvensional.

> [!cornell] #### Summary
>
> Konservasi keanekaragaman hayati memerlukan pendekatan terintegrasi melindungi **diversitas genetik, spesies, dan ekosistem**. Ancaman utama seperti **fragmentasi habitat dan perubahan iklim** memerlukan solusi seperti **koridor ekologis dan reservasi terzonasi**. Teknologi mutakhir termasuk **pemodelan jaringan makanan** dan **klasifikasi berbasis AI** meningkatkan efektivitas strategi konservasi. **Keterlibatan masyarakat lokal dan kebijakan berbasis ilmiah** merupakan kunci keberlanjutan upaya konservasi jangka panjang.
>

> [!ad-libitum]- Additional Information
>
> #### Pemodelan Jaringan Ekosistem Lanjut
> Model reaksi-difusi Zhang (2009) memformulasikan dinamika biomassa sebagai:
> ∂B/∂t = D∇²B + rB(1 - B/K) - ΣcᵢBᵢB
> di mana B = biomassa, D = koefisien difusi (aliran energi), r = laju pertumbuhan, K = daya dukung. Simulasi menunjukkan ekosistem dengan **konektivitas optimal** memiliki ketahanan tertinggi terhadap gangguan.
>
> Indikator Shannon Entropy (H') = -Σpᵢ ln pᵢ mengukur kompleksitas jaringan makanan. Nilai H' tinggi menunjukkan sistem dengan banyak interaksi spesifik rendah, yang secara paradoks mungkin kurang stabil daripada sistem dengan H' sedang namun struktur lebih robust.
>
> #### Optimasi Reservasi Alam dengan ML
> Model _set covering_ dalam optimasi reservasi alam memformulasi:
> Minimalkan Σcⱼxⱼ dengan batasan Σaᵢⱼxⱼ ≥ 1 ∀i
> xⱼ ∈ {0,1} (sel j dipilih/tidak)
> di mana aᵢⱼ = 1 jika sel j mencakup spesies i. Pendekatan ini mempertimbangkan **koridor satwa** sebagai batasan tambahan, meningkatkan biaya solusi optimal sebesar 15-20% namun meningkatkan viabilitas populasi jangka panjang 40%.
>
> #### Implementasi Deep Learning untuk Konservasi
> Arsitektur ResNet-18 pada klasifikasi kamera trap menggunakan augmentasi data:
> - _Random cropping_ (256×256 → 224×224)
> - _Color jitter_ (kecerahan, kontras ±30%)
> - _Mixup_: λxᵢ + (1-λ)xⱼ, λ ∼ Beta(0.2,0.2)
> Teknik ini meningkatkan akurasi deteksi spesies langka dari 58% ke 76% pada dataset iNaturalist. Implementasi edge-computing memungkinkan analisis real-time di lapangan dengan latensi <200ms.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun model jaringan makanan sederhana menggunakan Python (NetworkX library) untuk mensimulasikan dampak kehilangan spesies kunci.
> 2. Implementasi CNN dasar untuk klasifikasi spesies menggunakan dataset Camera Trap Indonesia (CT-Indonesia) dari LIPI.
> 3. Analisis data akustik dari BirdNET Explorer untuk memetakan distribusi spasial burung endemik Jawa.
>
> #### Tools dan Sumber Belajar
> - **Python Libraries**: PyTorch Ecology, scikit-ecology, GeoPandas
> - **Platform**: Google Earth Engine untuk analisis habitat, Wildlife Insights untuk kamera trap
> - **Buku**: "Computational Ecology" oleh Song (2012), "Deep Learning for Ecology" von Allmen (2021)
> - **Dataset**: GBIF.org, eBird, iNaturalist
>
> #### Bacaan Lanjutan
> - Pereira, H.M. et al. (2010). "Scenarios for Global Biodiversity in the 21st Century". _Science_.
> - Jetz, W. et al. (2019). "Essential Biodiversity Variables for Mapping and Monitoring Species Populations". _Nature Ecology & Evolution_.
> - Tutorial PyTorch untuk ekologi: https://pytorch-ecology.readthedocs.io
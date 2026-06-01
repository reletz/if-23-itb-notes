---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Ecologi Komputasi]]

> [!cornell] Population Ecology Dynamics
>
> > ## Questions/Cues
> >
> > - Mengapa iklim memengaruhi distribusi bioma terestrial?
> > - Bagaimana faktor biotik/abiotik membatasi distribusi spesies?
> > - Apa perbedaan pola dispersi klaster vs seragam?
> > - Bagaimana dinamika populasi dipengaruhi kepadatan?
> > - Mengapa interaksi eksploitatif (+/-) penting dalam komunitas?
> >
> > ## Reference Points
> >
> > - Ecology IF3211 (Halaman 1-22, 28-55)
> > - Campbell Biology in Focus Chapter 40-41 (Halaman 3-26, 27-54)
> > - Computational Models (Halaman 57-71)
> >
>
> > ### Pengaruh Iklim Terhadap Distribusi Organisme
> > Iklim merupakan faktor penentu utama dalam distribusi organisme melalui empat komponen fisik: suhu, curah hujan, sinar matahari, dan angin. Variasi iklim global dipengaruhi oleh energi matahari dan rotasi bumi, menciptakan pola garis lintang yang berbeda. Vegetasi sendiri dapat memodifikasi iklim lokal - hutan meningkatkan penguapan dan menurunkan suhu permukaan secara signifikan. Contoh nyata terlihat pada kasus penebangan hutan yang mengurangi curah hujan regional hingga 30%.
> > Perbedaan iklim regional dipengaruhi tiga faktor utama: musiman (seasonality) akibat kemiringan sumbu bumi, pengaruh badan air besar yang memoderasi suhu, dan efek bayangan hujan (rain shadow) di lereng gunung. Analoginya seperti AC alami: lautan bertindak sebagai penyimpan panas, pegunungan sebagai penyeimbang curah hujan, dan hutan sebagai pengatur kelembaban.
> > ### Faktor Pembatas Distribusi Spesies
> > Distribusi spesies dibatasi oleh dua kategori faktor:
> > **1. Biotik**: Interaksi dengan organisme lain seperti predasi, kompetisi, herbivori, dan mutualisme. Contoh: kanguru hanya ada di Australia karena isolasi geografis dan kompetisi dengan mamalia lain di benua lain.
> > **2. Abiotik**: Kondisi fisik-kimia lingkungan seperti suhu ekstrim, salinitas, ketersediaan air, dan komposisi tanah. Misalnya, ikan air tawar tidak bisa hidup di laut karena perbedaan tekanan osmotik (salinitas >3% vs <0.1%).
> > Mekanisme dispersal (penyebaran) menentukan kemampuan spesies menjangkau habitat baru. Dispersal terhambat oleh penghalang geografis seperti samudera atau pegunungan, menghasilkan pola distribusi unik seperti marsupial di Australia. Diagram alir menunjukkan bahwa distribusi spesies memerlukan: dispersal aktif, lingkungan sesuai, dan ketiadaan pesaing kuat.
> > ### Dinamika dan Struktur Populasi
> > Populasi didefinisikan sebagai kelompok individu sejenis di area tertentu, dikarakterisasi oleh:
> > - **Kepadatan (density)**: Jumlah individu per satuan area
> > - **Dispersi (dispersion)**: Pola sebaran individu:
> > - Klaster (clumped): Paling umum, dipengaruhi ketersediaan sumber daya
> > - Seragam (uniform): Kompetisi ketat antar individu
> > - Acak (random): Penyebaran independen tanpa faktor dominan
> > **Demografi** mempelajari perubahan populasi melalui tabel kehidupan (life table) yang mencatat tingkat kelahiran (fertilitas), kematian (mortalitas), dan migrasi. Persamaan dasar perubahan populasi:
> > ΔPopulasi = (Kelahiran + Imigrasi) - (Kematian + Emigrasi)
> > Faktor kepadatan mempengaruhi laju kelahiran/kematian. Contoh: wabah penyakit lebih cepat menyebar di populasi padat (density-dependent mortality).
> > ### Interaksi Antarspesies dalam Komunitas
> > Lima tipe interaksi utama menentukan struktur komunitas:
> > 1. **Kompetisi (-/-)**: Perebutan sumber daya terbatas seperti makanan atau ruang. Contoh: kompetisi rumput vs gulma di lahan pertanian.
> > 2. **Predasi (+/-)**: Pemangsa membunuh mangsa. Adaptasi pemangsa mencakup cakar tajam (singa) atau bisa ular.
> > 3. **Herbivori (+/-)**: Konsumsi tumbuhan tanpa membunuh inang (ulat daun).
> > 4. **Parasitisme (+/-)**: Parasit mengisap nutrisi inang (kutu rambut).
> > 5. **Mutualisme (+/+)**: Simbiosis menguntungkan kedua pihak (lebah dan bunga).
> > **Partisi sumber daya (resource partitioning)** memungkinkan spesies serupa hidup berdampingan dengan memanfaatkan niche berbeda. Contoh: kadal di Republik Dominika menggunakan strata pohon berbeda untuk menghindari kompetisi langsung.
> > ### Struktur Trofik dan Keberagaman
> > **Keberagaman spesies** memiliki dua komponen: kekayaan spesies (jumlah spesies) dan kelimpahan relatif (proporsi tiap spesies). Indeks Shannon (H) mengukur keragaman komunitas dengan rumus:
> > H = -Σ(p_i ln p_i)
> > di mana p_i adalah proporsi spesies ke-i.
> > **Struktur trofik** menggambarkan aliran energi melalui rantai makanan:
> > - Produsen (tumbuhan) → Konsumen primer (herbivora) → Konsumen sekunder (karnivora) → Dekomposer
> > Spesies kunci (keystone species) seperti berang-berang memiliki pengaruh tidak proporsional terhadap struktur komunitas meski populasinya kecil, dengan menciptakan habitat bagi spesies lain.

> [!cornell] #### Summary
> **Dinamika ekologi populasi** dipengaruhi interaksi kompleks antara **faktor biotik** (interaksi antarspesies) dan **abiotik** (iklim, geografi). **Distribusi organisme** dibatasi oleh kemampuan dispersal dan kesesuaian habitat, dengan pola dispersi populasi (klaster/seragam/acak) mencerminkan strategi adaptasi. **Interaksi eksploitatif** seperti predasi dan kompetisi mengontrol kepadatan populasi, sementara **struktur trofik** menentukan aliran energi dalam komunitas. Pemahaman dinamika ini penting untuk **manajemen konservasi** dan prediksi dampak perubahan lingkungan.
>

> [!ad-libitum]- Additional Information
>
> #### Pemodelan Matematis Dinamika Populasi
> Model dasar pertumbuhan populasi menggunakan persamaan diferensial:
> dN/dt = rN(1 - N/K)
> dimana N = ukuran populasi, r = laju pertumbuhan intrinsik, K = daya dukung lingkungan.
>
> Analisis kestabilan dilakukan dengan mencari titik ekuilibrium (dN/dt=0):
> - Ekuilibrium trivial: N=0 (tidak stabil)
> - Ekuilibrium non-trivial: N=K (stabil asimtotik)
> Model ini mengasumsikan pertumbuhan logistik, berbeda dengan model eksponensial sederhana yang hanya berlaku pada kondisi sumber daya tak terbatas.
>
> #### Studi Kasus Pemodelan Komputasional
> Studi Rempel et al. (2021) memodelkan dampak kumulatif perubahan iklim dan pembangunan pada populasi rusa, serigala, dan karibu dengan parameter:
> - **Rusa**: Pertumbuhan logistik dengan K tergantung habitat
> - **Serigala**: Predasi mengikuti respon tipe II Holling
> - **Karibu**: Sensitivitas tinggi terhadap fragmentasi habitat
> Hasil simulasi menunjukkan efek sinergis negatif: jalan meningkatkan populasi rusa yang bersaing dengan karibu, sementara perubahan iklim mengurangi kesuksesan kelahiran karibu.
>
> #### Analisis Konektivitas Landscape
> Pendekatan teori graf dalam ekologi lanskap (Urban & Keitt, 2001):
> - **Node**: Fragment habitat
> - **Edge**: Koridor penghubung
> - **Centrality**: Pengukuran pentingnya node menggunakan betweenness centrality
> Aplikasi: Mengidentifikasi koridor kritis untuk pergerakan beruang grizzly di Rocky Mountains dengan algoritma Dijkstra untuk mencari jalur terpendek antar fragment hutan.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun model populasi predator-mangsa sederhana menggunakan Python dengan persamaan Lotka-Volterra:
> dP/dt = γP - δP
> dH/dt = αH - βHP
> Variasikan parameter α,β,γ,δ dan amati dinamika osilasi populasi.
>
> 2. Analisis data BLS (Breeding Bird Survey) untuk mengukur indeks keanekaragaman Shannon komunitas burung di berbagai tipe habitat menggunakan paket vegan di R.
>
> #### Alat dan Sumber Daya
> - **PopDyn.jl**: Paket Julia untuk simulasi dinamika populasi
> - **CircuitScape**: Software analisis konektivitas lanskap
> - **NetLogo**: Platform pemodelan sistem kompleks
>
> #### Bacaan Lanjutan
> - Gotelli, N.J. (2001). *A Primer of Ecology*. Sinauer Associates.
> - Otto, S.P. & Day, T. (2007). *A Biologist's Guide to Mathematical Modeling*. Princeton UP.
> - Coursera: *Introduction to Computational Ecology*
> - Tutorial NetworkX untuk analisis graf ekologi: https://networkx.org/documentation/stable/tutorial.html
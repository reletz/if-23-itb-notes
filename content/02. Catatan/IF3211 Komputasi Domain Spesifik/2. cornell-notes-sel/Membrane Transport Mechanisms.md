---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Mekanisme Transport Membran
>
> > ### Pertanyaan/Petunjuk
> > 
> > - Mengapa membran plasma bersifat selektif permeabel?
> > - Bagaimana perbedaan difusi sederhana dan difusi terfasilitasi?
> > - Apa yang terjadi pada sel dalam larutan hipotonik vs hipertonik?
> > - Mengapa transport aktif memerlukan energi?
> > - Bagaimana struktur protein transporter memengaruhi fungsinya?
> > 
> > ### Referensi
> > 
> > - Campbell Biology in Focus (Halaman 41-64)
> > - Cell and Molecular IF3211 (Slide 15, 51-64)
> 
> > ### Struktur Membran Plasma
> > Membran plasma terdiri dari lapisan fosfolipid ganda dengan protein membran yang tersisip. Fosfolipid bersifat amfipatik, memiliki kepala hidrofilik (suka air) yang mengarah ke luar dan ekor hidrofobik (takut air) yang mengarah ke dalam. Struktur ini membentuk penghalang selektif yang mengontrol pergerakan zat masuk dan keluar sel. Protein membran berperan sebagai saluran, transporter, dan pompa yang memfasilitasi transport spesifik.
> > 
> > Sifat selektif permeabel membran disebabkan oleh kombinasi lapisan lipid hidrofobik dan protein khusus. Molekul kecil nonpolar seperti oksigen dapat melewati membran dengan mudah melalui difusi sederhana, sedangkan molekul polar seperti glukosa memerlukan protein transporter. Contoh analoginya adalah pintu keamanan yang hanya membuka untuk orang tertentu—membran hanya mengizinkan molekul tertentu untuk lewat.
> > 
> > ### Difusi Pasif dan Osmosis
> > Difusi pasif adalah pergerakan zat dari area konsentrasi tinggi ke rendah tanpa energi. Dua jenis utama adalah:
> > 1. **Difusi sederhana**: Molekul kecil nonpolar (O₂, CO₂) langsung melalui membran
> > 2. **Difusi terfasilitasi**: Molekul polar/ion menggunakan protein saluran atau transporter
> > 
> > Osmosis adalah difusi air melalui membran selektif permeabel. Air bergerak dari larutan hipotonik (konsentrasi zat terlarut rendah) ke hipertonik (konsentrasi tinggi). Contoh praktis: sel darah merah dalam air murni (hipotonik) akan membengkak dan pecah (lisis), sedangkan dalam air laut (hipertonik) akan mengerut (krenasi).
> > 
> > ### Transport Aktif
> > Transport aktif menggerakkan zat melawan gradien konsentrasi menggunakan energi ATP. Ada dua jenis:
> > 1. **Pompa primer**: Langsung menggunakan ATP (contoh: pompa Na⁺/K⁺)
> > 2. **Pompa sekunder**: Menggunakan gradien ion yang dibuat pompa primer (kotranspor)
> > 
> > Pompa Na⁺/K⁺ mengeluarkan 3 ion Na⁺ dan memasukkan 2 ion K⁺ per molekul ATP. Proses ini penting untuk mempertahankan potensial membran sel saraf. Analoginya seperti pompa air yang memindahkan air melawan gravitasi—membutuhkan energi untuk bekerja berlawanan dengan alami.
> > 
> > ### Protein Transporter Khusus
> >  1. **Uniporter**: Membawa satu molekul searah (contoh: GLUT1 transporter glukosa)
> >  2. **Simporter**: Membawa dua molekul searah (contoh: Na⁺/glukosa)
> > 3. **Antiporter**: Membawa molekul berlawanan arah (contoh: Cl⁻/HCO₃⁻)
> > 
> > Protein transporter mengalami perubahan konformasi saat mengikat molekul target. GLUT1 misalnya, memiliki situs pengikat glukosa yang terbuka bergantian di kedua sisi membran. Mekanisme ini mirip pintu putar yang membuka dan menutup secara bergantian untuk mengangkut penumpang.

> [!cornell] #### Ringkasan
>
> **Membran plasma** bersifat selektif permeabel karena struktur fosfolipid ganda dan protein khusus, mengontrol lalu lintas molekul secara ketat. **Difusi pasif** terjadi mengikuti gradien konsentrasi tanpa energi, sementara **transport aktif** memerlukan ATP untuk melawan gradien. **Osmosis** sebagai kasus khusus difusi air sangat penting untuk keseimbangan air sel. **Protein transporter** berperan krusial dalam transportasi zat polar/ion melalui mekanisme perubahan konformasi yang spesifik. Pemahaman mekanisme ini mendasari fungsi sel normal dan patologi berbagai penyakit.
>

> [!ad-libitum]- Informasi Tambahan
>
> #### Analisis Matematis Gradien Konsentrasi
> Laju difusi mengikuti hukum Fick: J = -D(dC/dx), di mana J adalah fluks, D koefisien difusi, dan dC/dx gradien konsentrasi. Untuk membran biologis, persamaan dimodifikasi menjadi J = P(C₁ - C₂), dengan P permeabilitas membran. Nilai P tergantung pada kelarutan zat dalam lipid dan ketebalan membran.
>
> #### Mekanisme Pompa Ion Lanjutan
> Pompa P-tipe seperti Na⁺/K⁺ ATPase mengalami fosforilasi selama siklus kerja: 1) Pengikatan Na⁺ intraseluler 2) Fosforilasi oleh ATP 3) Perubahan konformasi melepaskan Na⁺ ekstraseluler 4) Pengikatan K⁺ ekstraseluler 5) Defosforilasi 6) Kembali ke konformasi awal melepaskan K⁺ intraseluler.
>
> #### Transportasi Vesikular
> 4. **Endositosis**: Membentuk vesikel dari membran plasma untuk memasukkan material
> - Fagositosis ("sel makan") untuk partikel besar
> - Pinositosis ("sel minum") untuk cairan
> 2. **Eksositosis**: Mengeluarkan material dengan fusi vesikel ke membran
>
> #### Disfungsi Transport dan Penyakit
> - **Fibrosis kistik**: Mutasi pada saluran klorida (CFTR)
> - **Diabetes tipe 2**: Disregulasi transporter GLUT4
> - **Kolera**: Toksin meningkatkan sekresi Cl⁻ melalui saluran CFTR
>
> #### Proyek Eksplorasi Mandiri
> 1. Simulasi transport membran menggunakan model komputer sederhana dengan Python (library Matplotlib)
> 2. Eksperimen osmosis menggunakan kentang dan larutan garam dengan konsentrasi berbeda
> 3. Analisis efek inhibitor pompa ion pada kontraksi otot jantung katak
>
> #### Alat dan Sumber Daya
> - Simulasi online: https://phet.colorado.edu/sims/html/membrane-channels/latest/membrane-channels_en.html
> - Perangkat lunak analisis: CellProfiler (https://cellprofiler.org)
> - Database protein transporter: TCDB (http://www.tcdb.org)
>
> #### Bacaan Lanjutan
> - Alberts et al. "Molecular Biology of the Cell" Bab 11 (Transport Membran)
> - Lodish et al. "Molecular Cell Biology" Bab 15 (Transportasi Ion dan Molekecil)
> - Review Article: "Membrane Transport Proteins: Structure, Function, and Pharmacology" di Journal of Molecular Biology
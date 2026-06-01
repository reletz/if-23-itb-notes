---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pemodelan Perangkat Lunak]]

> [!cornell] Scenario Development and Flow Specification
>
> > ## Questions/Cues
> >
> > - Komponen esensial dalam skenario use-case
> > - Langkah-langkah menyusun alur skenario
> > - Perbedaan skenario utama dan alternatif
> > - Teknik validasi kelengkapan skenario
> > - Peran diagram aktivitas dalam spesifikasi alur
> >
> > ## Reference Points
> >
> > - SCENARIO BASED MODELING REVIEW (Halaman 15-22, 24-27)
>
> > ### Definisi Skenario dalam Pemodelan
> >
> > Skenario merupakan urutan langkah terstruktur yang mendeskripsikan interaksi antara aktor dan sistem untuk mencapai tujuan spesifik. Berbeda dengan use-case yang bersifat lebih umum, skenario fokus pada rincian operasional termasuk:
> >
> > - **Trigger**: Kejadian yang memulai interaksi (contoh: mahasiswa memilih menu entri usulan)
> > - **Kondisi awal**: Prasyarat sistem sebelum skenario dijalankan (contoh: mahasiswa sudah login)
> > - **Alur utama**: Urutan langkah ideal tanpa penyimpangan
> > - **Poin keputusan**: Lokasi dimana alur mungkin bercabang
> >
> > Contoh analogi: Skenario seperti resep masakan yang menjelaskan langkah demi langkah mulai dari menyiapkan bahan (kondisi awal) hingga penyajian (hasil akhir), termasuk alternatif jika bahan tertentu tidak tersedia.
> >
> > ### Komponen Penyusun Skenario
> >
> > Setiap skenario efektif harus memuat:
> >
> > 1. **Aktor utama dan pendukung**:
> > - Aktor yang memulai interaksi vs yang memberikan dukungan
> > - Contoh dalam sistem akademik: Mahasiswa sebagai aktor utama, SIKAD sebagai aktor pendukung
> > 2. **Tujuan fungsional**:
> > - Output yang diharapkan dari interaksi (contoh: usulan kuliah tersimpan)
> > 3. **Data kritikal**:
> > - Informasi yang dipertukarkan (contoh: kode kuliah, daftar kelas)
> > 4. **Aturan bisnis**:
> > - Batasan yang berlaku (contoh: batas SKS maksimum)
> >
> > Pembagian tanggung jawab dalam bentuk tabel dua kolom (Aksi Aktor vs Respons Sistem) membantu visualisasi interaksi, seperti contoh pada halaman 21-22 sumber materi.
> >
> > ### Teknik Penulisan Skenario Efektif
> >
> > Teknik bertahap untuk mengembangkan skenario:
> >
> > 1. **Identifikasi titik kontak**:
> > - Temukan semua interaksi antara aktor dan sistem
> > - Contoh: Pemilihan menu, pengisian form, konfirmasi simpan
> > 2. **Spesifikasi prasyarat**:
> > - Tentukan kondisi wajib sebelum skenario dijalankan
> > - Contoh: Mahasiswa harus memiliki akses valid ke sistem
> > 3. **Deskripsi alur normal**:
> > - Urutkan langkah ideal tanpa kesalahan
> > - Gunakan verba aksi spesifik (memilih, mengisi, menyimpan)
> > 4. **Eksplorasi varian**:
> > - Buat skenario alternatif untuk pengecualian
> > - Contoh: Usulan ditolak karena SKS melebihi batas
> >
> > Penting mempertahankan granularitas yang konsisten - setiap langkah harus merepresentasikan satu transaksi bermakna antara aktor dan sistem.
> >
> > ### Validasi dan Penyempurnaan Skenario
> >
> > Teknik validasi meliputi:
> >
> > - **Walkthrough**: Simulasi langkah demi langkah oleh stakeholder
> > - **Kriteria kelengkapan**:
> > - Apakah semua jalur alternatif tercakup?
> > - Apakah kondisi awal dan akhir jelas?
> > - Apakah aturan bisnis terintegrasi?
> > - **Matriks traceability**: Memetakan skenario ke kebutuhan fungsional
> >
> > Contoh pemeriksaan: Pada skenario "Mengajukan Usulan", pastikan ada alternatif untuk kasus kelas penuh atau konflik jadwal.

> [!cornell] #### Summary
>
> **Pengembangan skenario** merupakan proses kritis dalam pemodelan kebutuhan yang memetakan interaksi detail antara aktor dan sistem melalui langkah terstruktur. Setiap skenario harus mencakup **alur utama** dan **alternatif** dengan spesifikasi **kondisi awal**, **trigger**, dan **output** yang jelas. Teknik penyusunan efektif melibatkan pembagian tanggung jawab dalam format tabel dan validasi melalui **simulasi walkthrough**. **Diagram aktivitas** berperan sebagai alat bantu visualisasi untuk alur kompleks meskipun pembahasannya berada di luar cakupan catatan ini.

> [!ad-libitum]- Additional Information
>
> #### Teknik Spesifikasi Alur Lanjutan
>
> Untuk skenario kompleks dengan banyak cabang kondisional, gunakan pendekatan:
>
> - **Decision tables**: Tabel matriks yang memetakan kondisi ke aksi
> - **State transition diagrams**: Memvisualisasikan perubahan sistem
> - **Pre-post conditions**: Spesifikasi kontrak berdasarkan kondisi awal dan akhir
>
> Contoh implementasi: Skenario persetujuan akademik dapat menggunakan tabel keputusan dengan kombinasi kondisi (IPK, beban SKS, status mahasiswa) dan aksi sistem terkait.
>
> #### Validasi Formal dengan Teknik SPIN
>
> Model checker SPIN dapat digunakan untuk:
>
> - Verifikasi properti liveness (skenario pasti mencapai akhir)
> - Pengecekan deadlock dalam interaksi paralel
> - Validasi konsistensi melalui model Promela
>
> #### Studi Kasus Kompleks: Sistem E-Commerce
>
> Analisis skenario "Checkout Item" dengan variasi:
>
> - 12 jalur alternatif (pembayaran gagal, stok habis)
> - Interaksi dengan 3 sistem eksternal (payment gateway, inventory)
> - Aturan bisnis dinamis (diskon, pajak)
>
> #### Alat Bantu Otomatisasi
>
> - **Camunda**: Platform BPMN untuk eksekusi workflow
> - **Gherkin**: Sintaks Given-When-Then untuk behavior-driven development
> - **IBM Rational DOORS**: Manajemen kebutuhan dan traceability
>
> #### Self-Exploration Projects
>
> 1. Bangun skenario lengkap untuk sistem ATM dengan 5 use case utama (tarik tunai, transfer) termasuk semua alternatif dan pengecualian
> 2. Konversi skenario "Peminjaman Buku Perpustakakan" ke diagram aktivitas menggunakan PlantUML
> 3. Lakukan analisis gap antara skenario tertulis dan prototipe fungsional menggunakan teknik exploratory testing
>
> #### Further Reading
>
> - Cockburn, A. (2000). *Writing Effective Use Cases*
> - Kuliah IF3250 Modul 5: "Advanced Scenario Modeling Techniques"
> - Dokumentasi resmi BPMN 2.0: https://www.omg.org/spec/BPMN/
> - Studi kasus IEEE: "Scenario-Based Requirement Analysis for Healthcare Systems"
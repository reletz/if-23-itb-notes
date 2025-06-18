### Kelompok Kepeleset Polisi Tidur
![[Pasted image 20250618125111.png]]

---
### Kelompok Kepeleset Polisi Tidur
Anggota Kelompok:
- Frederiko Eldad (13523147)
- Naufarrel Zhafif Abhista (13523149)
- Hasri Fayadh Muqaffa (13523156)
- I Made Wiweka Putera (13523160)

---
# Identitas Software yang Dibangun
---
- Nama Software: FitAaminn
- Jenis Software: Aplikasi Web (Web Application).
- Jenis Lisensi yang Digunakan: Proprietary Freemium.

---
# Latar Belakang & Motivasi
---   
## 2.1. Masalah yang Ingin Diselesaikan
---

1. Fragmentasi Alat Kesehatan Digital
2. Kurangnya Konsistensi dan Motivasi
3. Keterbatasan Informasi yang Dipersonalisasi

---
## 2.2. Target Pengguna Utama
---
1. Individu Sadar Kesehatan (Usia 18-40 tahun)
2. Peserta Program Diet:
3. Pemula Kebugaran

---
## 2.3. Keunggulan Software Dibanding Solusi yang Sudah Ada
---
1. Platform Terintegrasi (All-in-One)
2. Pengalaman Pengguna (UX) yang Superior
3. Fokus pada Aksi dan Wawasan Sederhana

---
# Fungsionalitas Software

---
## 3.1. Fitur Utama yang Ditawarkan
---
### Manajemen Akun Pengguna (Email & Password)
- FR-AUTH-001 (Registrasi): Pengguna dapat membuat akun baru dengan menyediakan alamat email yang valid dan kata sandi yang aman. Sistem akan melakukan validasi dasar dan memastikan email belum terdaftar.

---
- FR-AUTH-002 (Login): Pengguna yang sudah terdaftar dapat masuk ke aplikasi menggunakan email dan kata sandi mereka. Sistem akan memverifikasi kredensial dan membuat sesi yang aman.
- FR-AUTH-003 (Logout): Pengguna dapat keluar dari sesi aktif mereka untuk memastikan privasi dan keamanan akun.
    
---
### Kalkulator & Pelacak Indeks Massa Tubuh (BMI)
- FR-BMI-001 (Input Data): Pengguna dapat memasukkan data tinggi badan (dalam cm) dan berat badan (dalam kg) melalui formulir yang intuitif.
- FR-BMI-002 (Perhitungan & Kategorisasi): Sistem secara otomatis menghitung nilai BMI dan menampilkan hasilnya beserta kategori standar kesehatan (misalnya, Underweight, Normal weight, Overweight, Obesity).

---
- FR-BMI-003 (Penyimpanan Riwayat): Setiap perhitungan BMI yang valid akan disimpan dan dikaitkan dengan akun pengguna, lengkap dengan tanggal pencatatan.
- FR-BMI-004 (Visualisasi Tren): Pengguna dapat melihat riwayat perhitungan BMI mereka dalam bentuk tabel atau grafik garis sederhana untuk memvisualisasikan progres dari waktu ke waktu.

---
### Pelacakan Asupan Makanan Harian (Food Tracking)
- FR-FOOD-001 (Pencatatan Entri): Pengguna dapat menambahkan entri makanan yang dikonsumsi, mencakup nama makanan, jumlah/porsi, dan detail makronutrien (kalori, protein, karbohidrat, lemak).

---
- FR-FOOD-002 (Ringkasan Harian): Dasbor utama akan menampilkan ringkasan total kalori dan makronutrien yang telah dikonsumsi pada hari berjalan.
- FR-FOOD-003 (Manajemen Entri): Pengguna memiliki kemampuan untuk mengedit atau menghapus entri makanan yang telah mereka catat jika terjadi kesalahan.
    
---
### Sistem Rekomendasi Makanan
- FR-REC-001 (Tampilan Rekomendasi): Aplikasi akan menampilkan daftar ide makanan atau resep sehat yang bisa disaring oleh pengguna.
- FR-REC-002 (Filter Berbasis Preferensi): Pengguna dapat memfilter rekomendasi berdasarkan kriteria sederhana, seperti tujuan diet (misalnya, "penurunan berat badan") atau preferensi makanan (misalnya, "tinggi protein").

---
## 3.2. Teknologi yang Digunakan
---
### Frontend
- Next.js
- TypeScript
- Tailwind CSS
    
---
### Backend
- Flask
- Python

---

### Database
MongoDB: Database NoSQL berbasis dokumen yang menawarkan fleksibilitas skema, cocok untuk menyimpan data pengguna yang dapat bervariasi seperti riwayat BMI dan entri makanan.


---
### Infrastruktur & Deployment

- Vercel
- Render 
---
## 3.3. Diagram Alur Perangkat Lunak (User Journey)

---

![[Alur Pengguna.png|215]]

---
###### Lean Canvas

 ![[Pasted image 20250618133127.png|500]]
 
---
# Dampak Positif terhadap Masyarakat
 
---
## 5.1. Manfaat yang Diberikan Software kepada Pengguna dan Komunitas Luas

1. Meningkatkan Literasi Kesehatan Digital
2. Pemberdayaan Individu (Empowerment)
3. Mendorong Pembentukan Kebiasaan Positif
4. Potensi Pencegahan Penyakit

---
## 5.2. Contoh Penggunaan Perangkat Lunak dalam Skenario Nyata
Rina, seorang mahasiswi tingkat akhir, sering merasa lelah dan tidak fokus karena pola makannya yang tidak teratur akibat kesibukan mengerjakan tugas akhir. Ia ingin memperbaiki pola makannya tetapi tidak tahu harus mulai dari mana.

---
Penerapan FitAaminn:
- Rina mengunduh dan mendaftar di FitAaminn. Fitur pertama yang ia gunakan adalah Kalkulator BMI, yang menunjukkan bahwa berat badannya berada di rentang normal, sehingga ia bisa fokus pada kualitas asupan, bukan kuantitas.
---
- Selama tiga hari, ia secara disiplin mencatat semua yang ia makan dan minum. Ia terkejut melihat bahwa total kalorinya tidak terlalu tinggi, tetapi asupan proteinnya sangat rendah sementara asupan gula dari minuman manis sangat tinggi.
---
- Menggunakan wawasan ini, Rina membuka fitur Rekomendasi dan mencari ide sarapan "tinggi protein". Ia menemukan resep "Omelet Sayur" yang mudah dibuat.
- Ia mulai mengganti kebiasaan minum kopi manis dengan air putih dan memastikan setiap waktu makan mengandung sumber protein.
---
- Dalam dua minggu, Rina merasa staminanya lebih baik dan lebih mudah berkonsentrasi. Aplikasi ini tidak menyuruhnya diet ketat, melainkan membantunya mengidentifikasi dan memperbaiki ketidakseimbangan nutrisi dalam pola makannya sendiri.
---
# Dampak Negatif terhadap Masyarakat
___   
## 6.1. Risiko atau Potensi Dampak Buruk dari Penggunaan Software

1. Memicu atau Memperburuk Disordered Eating
2. Menimbulkan Stres dan Kecemasan (Health Anxiety)
3. Penyalahgunaan Data Privasi

---
## 6.2. Contoh Kasus di Mana Perangkat Lunak Bisa Digunakan Secara Tidak Etis
---
1. Kasus 1 (Internal): Seorang pengguna menetapkan target penurunan berat badan yang sangat ekstrem dan tidak sehat. Aplikasi, tanpa mekanisme pengaman, terus memberikan 'selamat' setiap kali pengguna berhasil mencapai target harian yang sangat rendah kalori, secara tidak langsung mendukung perilaku yang membahayakan kesehatan.
---
2. Kasus 2 (Eksternal): Sebuah platform kebugaran lain (pihak ketiga) secara ilegal mengakses database FitAaminn dan menggunakan data email pengguna untuk mengirimkan spam promosi produk pelangsing yang tidak teruji secara klinis.

---
## 6.3. Upaya Menangani atau Mengurangi Dampak Negatif (Strategi Mitigasi)

1. Pendekatan Desain yang Berpusat pada Kesejahteraan (Well-being Centric Design):
- Bahasa Positif dan Netral
- Fitur "Mode Santai"
- Mekanisme Pengaman Target

---
2. Transparansi dan Edukasi dalam Aplikasi:
- Disclaimer yang Jelas
- Konten Edukatif

---
3. Keamanan dan Privasi sebagai Prioritas Utama (Privacy by Design)
- Enkripsi End-to-End
- Kebijakan Privasi yang Jelas
- Kontrol Pengguna atas Data

---
# Dampak terhadap Lingkungan
   
---

## 7.1. Efisiensi Energi dan Sumber Daya:

- Modern Techstack:
	- Menggunakan Server-Side Rendering (SSR) dan Static Site Generation (SSG) yang dapat mengurangi beban komputasi di sisi klien dan server.
	- Backend Flask dikenal sebagai framework yang ringan, hanya menggunakan sumber daya yang benar-benar dibutuhkan.
- Optimasi Kode
    
___
## 7.2. Manajemen E-Waste (Limbah Elektronik):

Sebagai aplikasi web, FitAaminn tidak mengharuskan pengguna untuk membeli perangkat keras baru atau khusus. Aplikasi ini dapat diakses dari perangkat apa pun yang sudah dimiliki pengguna (ponsel, laptop, tablet) yang memiliki peramban web modern. Pendekatan ini secara inheren mengurangi kontribusi terhadap limbah elektronik karena tidak mendorong siklus pembelian perangkat baru.
    
---
## 7.3. Pengurangan Jejak Karbon:

- Pemilihan Penyedia Cloud Computing Ramah Lingkungan: 
	- Vercel dan Render dipilih sebagai platform hosting. Kedua platform ini berjalan di atas infrastruktur cloud besar (seperti AWS, Google Cloud) yang memiliki komitmen kuat terhadap efisiensi energi dan menargetkan penggunaan 100% energi terbarukan untuk pusat data mereka.
---
- Serverless Architecture: Hanya menggunakan sumber daya komputasi saat ada permintaan dari pengguna. Pada saat tidak ada lalu lintas, konsumsi energi mendekati nol, jauh lebih efisien daripada server tradisional yang harus selalu menyala 24/7.
    
---
  
# Kepatuhan terhadap Hukum dan Regulasi
    
---
## 8.1. Regulasi Data dan Privasi:

- Kepatuhan terhadap UU PDP Indonesia:
	- Persetujuan Eksplisit (Explicit Consent): Saat pendaftaran, pengguna akan disajikan checkbox yang tidak dicentang secara default, meminta persetujuan eksplisit untuk memproses data pribadi dan data kesehatan mereka sesuai dengan Kebijakan Privasi.

---
- Tujuan yang Jelas: Menyatakan bahwa data yang dikumpulkan (email, berat, tinggi, catatan makanan) hanya akan digunakan untuk menyediakan fungsionalitas inti aplikasi dan tidak untuk tujuan lain tanpa persetujuan lebih lanjut.
- Hak Subjek Data: Pengguna akan memiliki akses mudah melalui halaman profil mereka untuk melihat, memperbaiki, dan menghapus data pribadi mereka secara permanen.
    
---
## 8.2. Hak Kekayaan Intelektual (HKI):
- Seluruh kode sumber, desain UI/UX, dan aset visual asli yang dibuat khusus untuk FitAaminn adalah hak kekayaan intelektual penuh dari tim pengembang.
- Kami akan memastikan bahwa penggunaannya mematuhi lisensi masing-masing (misalnya, Lisensi MIT, Apache 2.0), termasuk kewajiban atribusi jika ada, untuk menghindari segala bentuk pelanggaran hak cipta.

---
## 8.3. Keamanan Siber dan Perlindungan Konsumen:

- Input Validation: Validasi dan sanitasi secara ketat untuk mencegah serangan injection (seperti NoSQL Injection).    
- Password Hashing: Menggunakan algoritma hashing yang kuat dan modern (seperti bcrypt) untuk menyimpannya dengan aman.
- Secure Session Management: Menggunakan JSON Web Tokens (JWT) dengan masa berlaku yang singkat.

---
# Kesimpulan
FitAaminn dirancang lebih dari sekadar aplikasi; ia adalah sebuah ekosistem kesehatan digital yang bertujuan untuk memberdayakan individu dalam mengelola kesejahteraan mereka secara proaktif. Berdasarkan analisis yang telah dilakukan, perangkat lunak ini menawarkan solusi yang relevan untuk masalah nyata di masyarakat, yaitu fragmentasi alat kesehatan digital dan kurangnya konsistensi dalam mempraktikkan gaya hidup sehat.

---
## Manfaat Utama Software:
- Integrasi dan Kemudahan
- Pemberdayaan Berbasis Data
- Pengembangan yang Bertanggung Jawab

---
### Potensi Pengembangan Lebih Lanjut di Masa Depan
- Fitur Sosial dan Komunitas: Membangun fitur di mana pengguna dapat saling berbagi progres (secara anonim atau dengan teman), resep, dan memberikan dukungan, menciptakan lingkungan yang memotivasi.
- Integrasi Perangkat Wearable: Menghubungkan FitAaminn dengan perangkat seperti smartwatch untuk otomatisasi pencatatan data aktivitas fisik dan detak jantung.

--- 
- Personalisasi Berbasis AI: Menggunakan machine learning untuk menganalisis data pengguna dan memberikan rekomendasi makanan serta rencana olahraga yang jauh lebih personal dan adaptif.
- Konsultasi Profesional: Mengintegrasikan platform dengan ahli gizi atau pelatih kebugaran bersertifikat untuk layanan konsultasi berbayar.
    
---
# Terima kasih!
![[Pasted image 20250618125111.png]]
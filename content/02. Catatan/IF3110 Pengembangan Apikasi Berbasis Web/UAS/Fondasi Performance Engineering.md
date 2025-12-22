---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: Performance Engineering Fundamentals
> 
> > ## Questions/Cues
> >
> > - Definisi PE vs Testing
> >     
> > - 3 Kategori Performa
> >     
> > - Tujuan Utama PE
> >     
> > - Dampak Kegagalan (Contoh)
> >     
> > - PE dalam SDLC
> >     
> > - Strategi Pemodelan
> >     
> >
> > ## Reference Points
> >
> > - Slides: IF3110-12-Performance-Engineering (Pages 1-12)
> >     
> > - Book: Foundations of Software and System Performance Engineering (André B. Bondi)
> >     
> 
> > ### Apa itu Performance Engineering (PE)?
> >
> > Proses sistematis di mana perangkat lunak diuji dan _di-tune_ (disesuaikan) dengan tujuan mencapai performa yang dibutuhkan.
> >
> > - **Bukan sekadar testing di akhir:** PE adalah usaha proaktif, bukan reaktif.
> >     
> > - **3 Kategori Utama (3S):**
> >     
> > 	1. **Speed:** Seberapa cepat respons sistem? (Latency).
> > 			
> > 	2. **Scalability:** Bisakah sistem menangani lonjakan beban pengguna? (Throughput).
> > 			
> > 	3. **Stability:** Apakah sistem tetap berjalan normal di bawah tekanan beban tinggi? (Availability).
> > 			
> >
> > ### Mengapa PE Penting? (Objektif)
> >
> > 1. **Pendapatan (Revenue):** Sistem lambat = pengguna pergi = rugi.
> >     
> > 2. **Efisiensi Infrastruktur:** Mengoptimalkan penggunaan server agar tidak boros biaya (cloud cost).
> >     
> > 3. **Mengurangi Biaya Maintenance:** Mencegah _system failure_ fatal yang mengharuskan penulisan ulang kode dari nol.
> >     
> >
> > ### Studi Kasus Kegagalan
> >
> > - **Kasus Pajak (DJP Online):** Bandwidth habis saat deadline pelaporan pajak karena lonjakan trafik.
> >     
> > - **Kasus Paspor:** Antrean menumpuk karena permohonan fiktif (bot), menunjukkan kurangnya validasi beban.
> >     
> > - **Trading Saham:** Keterlambatan sekian milidetik bisa berarti kerugian finansial besar.
> >     
> >
> > ### Integrasi PE dengan Software Engineering
> >
> > PE harus berjalan **paralel** dengan siklus pengembangan (SDLC), bukan fase terpisah di akhir.
> >
> > - **Requirements:** Menentukan target performa (misal: response time < 2 detik).
> >     
> > - **Design/Architecture:** Memilih teknologi yang _scalable_ (misal: NoSQL vs SQL, Monolith vs Microservices).
> >     
> > - **Implementation:** Coding dengan efisiensi memori dan CPU.
> >     
> > - **Testing:** Load testing dan profiling.
> >     
> >
> > ### Strategi Pemodelan Performa
> >
> > Sebelum coding, kita bisa memprediksi performa menggunakan model:
> >
> > 1. **Simple-Model Strategy:** Mulai dengan model tersimpel untuk mengidentifikasi masalah arsitektur dasar.
> >     
> > 2. **Best and Worst-case Strategy:** Hitung estimasi terbaik dan terburuk untuk menetapkan batas atas dan bawah (managing uncertainty).
> >     
> > 3. **Adapt-to-Precision Strategy:** Detail model disesuaikan dengan seberapa banyak kita tahu tentang sistem saat itu.
> >     
> >
> > ### Validasi Model
> >
> > Model hanyalah prediksi. Penting untuk melakukan **Verifikasi** (apakah modelnya benar secara logika?) dan **Validasi** (apakah hasil model sesuai kenyataan di lapangan?). Ini proses berulang (iteratif).

> [!cornell] #### Summary
> 
> Performance Engineering adalah disiplin proaktif untuk memastikan Speed, Scalability, dan Stability sistem sejak awal desain, bukan hanya saat testing akhir. Tujuannya bukan hanya kecepatan teknis, tapi juga efisiensi biaya dan keberlangsungan bisnis. Dengan menggunakan pemodelan awal (seperti best/worst case scenario), pengembang dapat mendeteksi risiko arsitektur sebelum kode ditulis.

> [!ad-libitum]- Additional Information: Technical Deep Dive
> 
> #### Performance Testing Types
> 
> Slide menyebutkan sekilas, berikut detailnya:
> 
> 1. **Load Testing:** Menguji sistem dengan beban normal hingga puncak yang diharapkan.
>     
> 2. **Stress Testing:** Menguji sistem _di luar_ batas normal untuk melihat titik hancurnya (breaking point).
>     
> 3. **Endurance/Soak Testing:** Menguji beban normal dalam durasi lama (misal 24 jam) untuk mendeteksi _Memory Leak_.
>     
> 4. **Spike Testing:** Menguji lonjakan beban tiba-tiba dan ekstrem.
>     
> 
> #### Cost of Fixing Defects
> 
> Mengapa PE harus dimulai di awal (Early)?
> 
> - Biaya memperbaiki masalah performa di fase **Requirements/Design** = 1x.
>     
> - Biaya memperbaiki di fase **Testing** = 15x - 50x.
>     
> - Biaya memperbaiki di fase **Production** = 100x ++ (Ditambah kerugian reputasi).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa 3 kategori utama dalam performa (3S)?</strong></summary>
> 
> Speed (Kecepatan), Scalability (Skalabilitas), dan Stability (Stabilitas).
> 
> </details>
> <details>
> 
> <summary><strong>2. Mengapa Performance Engineering harus dimulai sejak fase desain?</strong></summary>
> 
> Karena memperbaiki kesalahan arsitektur di awal jauh lebih murah dan mudah daripada menulis ulang kode sistem yang sudah jadi saat gagal di fase production.
> 
> </details>
> <details>
> 
> <summary><strong>3. Apa itu "Best and Worst-case Strategy" dalam pemodelan?</strong></summary>
> 
> Strategi mengestimasi kebutuhan sumber daya dalam kondisi terbaik dan terburuk untuk menetapkan batas kinerja yang realistis dan mengelola ketidakpastian.
> 
> </details>
---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Proses Pengembangan Perangkat Lunak untuk Aplikasi Mobile]]

> [!cornell] Waterfall Model Limitations in Modern Development
>
> > ## Questions/Cues
> >
> > - Mengapa Waterfall tidak fleksibel terhadap perubahan kebutuhan?
> > - Bagaimana karakteristik sequential Waterfall menghambat proyek?
> > - Masalah apa yang timbul dari tahapan "blocking state"?
> > - Mengapa Waterfall kurang cocok untuk sistem kompleks?
> > - Kendala Waterfall dalam pengembangan aplikasi modern?
> >
> > ## Reference Points
> >
> > - IF3210 Mobile Development Slides (Halaman 6-7)
>
> > ### Karakteristik Sequential Waterfall
> >
> > Model Waterfall mengikuti pendekatan linier yang kaku dimana setiap tahap harus diselesaikan sepenuhnya sebelum berpindah ke tahap berikutnya. Seperti air terjun yang hanya mengalir ke bawah, model ini tidak memungkinkan kembali ke tahap sebelumnya secara langsung. Misalnya, jika terjadi kesalahan pada tahap pengujian, tim tidak bisa dengan mudah kembali ke tahap desain tanpa mengulang seluruh proses dari awal.
> >
> > ### Ketidakmampuan Menangani Perubahan Kebutuhan
> >
> > Salah satu kelemahan utama Waterfall adalah ketidakmampuannya beradaptasi dengan perubahan kebutuhan selama pengembangan. Dalam konteks modern dimana kebutuhan pengguna sering berevolusi, hal ini menjadi masalah kritis. Contoh nyata: jika pasar membutuhkan fitur baru saat proyek sudah memasuki tahap pengujian, tim harus memilih antara mengabaikan perubahan (risiko produk tidak relevan) atau mengulang proses dari awal (biaya tinggi dan pemborosan sumber daya).
> >
> > ### Masalah Blocking State dalam Tim
> >
> > Waterfall sering menciptakan "blocking state" dimana beberapa anggota tim harus menunggu rekan menyelesaikan pekerjaan. Fenomena ini terutama terjadi di awal dan akhir proyek. Misalnya, pengembang frontend mungkin harus menganggur menunggu tim backend menyelesaikan arsitektur database. Dalam kasus aplikasi mobile yang membutuhkan integrasi cepat antar komponen, hal ini menjadi penghambat produktivitas signifikan.
> >
> > ### Keterbatasan untuk Sistem Kompleks
> >
> > Model ini kurang cocok untuk sistem kompleks yang melibatkan banyak pemangku kepentingan dengan kebutuhan berbeda. Dalam pengembangan aplikasi multiplatform yang melibatkan iOS, Android, dan integrasi cloud, sifat rigid Waterfall menyulitkan penyesuaian teknis antar platform. Contoh: perubahan desain untuk adaptasi layar Android mungkin tidak bisa diimplementasikan tanpa mengganggu alur kerja pengembangan iOS.
> >
> > ### Ketidaksesuaian dengan Ekspektasi Pengguna Modern
> >
> > Pengguna modern mengharapkan pembaruan cepat dan respon terhadap feedback. Waterfall memaksa pengguna menunggu hingga akhir proyek untuk melihat produk jadi, padahal aplikasi mobile sukses membutuhkan iterasi berbasis masukan pengguna. Studi kasus: aplikasi kalkulator investasi yang dikembangkan dengan Waterfall mungkin sudah ketinggalan tren pasar saat dirilis setelah 12 bulan pengembangan.

> [!cornell] #### Summary
>  **Model Waterfall** memiliki keterbatasan utama dalam **fleksibilitas menghadapi perubahan kebutuhan** karena sifat sequential-nya yang kaku. Pendekatan ini menciptakan **hambatan produktivitas** melalui "blocking state" dimana anggota tim saling menunggu penyelesaian tugas. Model tersebut **kurang ideal untuk sistem kompleks** seperti aplikasi multiplatform modern yang membutuhkan adaptasi cepat. **Ketidakmampuan merespon feedback pengguna secara real-time** membuat Waterfall kurang relevan dalam ekosistem pengembangan aplikasi kontemporer yang menuntut iterasi cepat.

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Temporal
> Dalam simulasi proyek aplikasi e-commerce sederhana dengan Waterfall:
> - Tahap pengumpulan kebutuhan: 2 bulan
> - Tahap desain: 1.5 bulan
> - Pengembangan: 3 bulan
> - Pengujian: 1.5 bulan
> Total waktu hingga rilis: 8 bulan
>
> Jika perubahan kebutuhan terjadi di bulan ke-3 (setelah tahap kebutuhan "dibekukan"), biaya perubahan diperkirakan 5x lebih tinggi daripada jika diadopsi model iteratif. Hal ini disebabkan kebutuhan untuk mengulang dokumentasi, desain, dan kode yang sudah dikembangkan.
>
> #### Studi Kasus Kegagalan Nyata
> Proyek sistem reservasi maskapai nasional (2018) yang menggunakan Waterfall:
> - Gagal mengakomodasi perubahan regulasi bagasi kabin
> - Tidak bisa mengintegrasikan pembayaran digital baru yang muncul selama pengembangan
> - Akhirnya ditinggalkan setelah 18 bulan pengembangan
> - Kerugian diperkirakan Rp 4.2 miliar
>
> #### Adaptasi Parsial Waterfall Modern
> Beberapa tim mencoba memodifikasi Waterfall dengan:
> - Phase-gate approach: Checkpoint dengan kemungkinan revisi terbatas
> - Waterfall dengan overlapping phases: Tahap desain dan pengembangan dilakukan secara paralel
> Namun solusi ini tetap tidak menyelesaikan akar masalah ketidakfleksibelan.
>
> #### Self-Exploration Projects
> 1. Analisis kasus studi: Bandingkan timeline proyek aplikasi to-do list sederhana yang dikembangkan dengan Waterfall vs. pendekatan iteratif
> 2. Simulasikan skenario perubahan kebutuhan di berbagai tahap Waterfall dan hitung biaya relatif penyesuaian
>
> #### Tools dan Resources
> - Microsoft Project: Untuk simulasi manajemen proyek Waterfall
> - GanttChart.com: Alat visualisasi timeline sequential
>
> #### Further Reading
> - "The Decline and Fall of the Waterfall Model" oleh Winston Royce (1970)
> - "Software Project Management: A Unified Framework" oleh Walker Royce
> - "Modern Software Engineering" oleh David Farley
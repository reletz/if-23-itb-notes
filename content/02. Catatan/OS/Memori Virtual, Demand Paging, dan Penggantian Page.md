---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2130 Sistem Operasi]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa itu Memori Virtual & Keuntungannya?
> > - Bagaimana Ruang Alamat Virtual didesain?
> > - Apa itu Demand Paging?
> > - Bagaimana Page Fault terjadi & ditangani?
> > - Langkah-langkah penanganan Page Fault?
> > - Apa itu Pure Demand Paging?
> > - Bagaimana Kinerja Demand Paging?
> > - Apa itu Copy-on-Write (COW)?
> > - Kapan Penggantian Page (Page Replacement) diperlukan?
> > - Peran Modify Bit (Dirty Bit)?
> > - Algoritma: FIFO?
> > - Masalah: Belady's Anomaly?
> > - Algoritma: Optimal (OPT)?
> > - Algoritma: LRU (Least Recently Used)?
> > - Mengapa perlu Algoritma Aproksimasi LRU?
> > - Contoh Aproksimasi LRU? (Reference Bit, Second-Chance)
> > - Aproksimasi LRU Lanjutan? (Enhanced Second-Chance)
> > - Algoritma Berbasis Hitungan & Buffering?
>
> > ### Swapping
> > - Swapping itu proses mindahin seluruh program (atau sebagian) dari memori utama (RAM) ke penyimpanan cadangan (biasanya disk cepat), terus nanti dibawa balik lagi ke RAM kalau mau dijalanin lagi. Ini bikin seolah-olah RAM kita lebih besar, jadi bisa ngejalanin lebih banyak program. Program yang lagi nganggur bisa di-swap out (dikeluarin ke disk) biar RAM-nya bisa dipakai program yang lagi aktif. Nanti kalau program nganggur itu aktif lagi, dia di-swap in (dimasukin lagi ke RAM).
> > - **Swapping seluruh proses itu sekarang jarang dipakai karena lama. Kebanyakan sistem sekarang pakai variasi swapping dengan paging, artinya yang dipindahin itu page-page-nya, bukan seluruh proses.**
> > - ![[Pasted image 20250609142346.png]]
> > 
> > ### Konsep Memori Virtual
> > Memori Virtual adalah sebuah teknik yang **memisahkan antara memori logis (yang dilihat pengguna/program) dengan memori fisik (RAM asli)**. Ini menciptakan ilusi bagi program bahwa ia memiliki ruang memori yang sangat besar dan berdekatan, padahal kenyataannya data bisa tersebar di RAM fisik atau bahkan disimpan sementara di disk.
> > 
> > **Keuntungan Utama:**
> > - **Program bisa lebih besar dari RAM fisik:** Hanya bagian program yang sedang aktif yang perlu ada di memori.
> > - **Peningkatan Utilisasi & Multiprogramming:** Lebih banyak program bisa berjalan bersamaan karena setiap program hanya memakan sedikit RAM fisik.
> > - **Pembuatan Proses Lebih Cepat:** Teknik seperti _Copy-on-Write_ memungkinkan proses baru dibuat dengan cepat tanpa menyalin seluruh memori induknya.
> > - **Memungkinkan Berbagi Memori:** Proses-proses dapat berbagi _library_ atau data dengan mudah.
> > 
> > Umumnya, ruang alamat virtual didesain agar fleksibel. Bagian **stack** (untuk variabel fungsi) dimulai dari alamat teratas dan "tumbuh" ke bawah, sementara bagian **heap** (untuk alokasi dinamis) dimulai dari bawah dan "tumbuh" ke atas. Ruang kosong besar di antara keduanya menjadi _hole_ yang tidak menggunakan RAM fisik sampai benar-benar dibutuhkan.
> > 
> >  _Memori virtual ini biasanya diimplementasiin pakai teknik demand paging._
> > 
> > ### Demand Paging & Page Fault
> > **Demand Paging**
> > - Ini adalah metode implementasi Memori Virtual yang paling umum. Prinsipnya adalah "kemalasan": sebuah _page_ dari program **tidak akan dimuat dari disk ke RAM sampai ia benar-benar dibutuhkan** ("on demand"). 
> > - Mekanisme ini menggunakan **bit valid-invalid** pada _page table_. `valid` berarti _page_ ada di RAM, `invalid` berarti tidak ada di RAM (masih di disk).
> > - **Kalau program mau akses page yang bitnya 0, terjadilah PAGE FAULT.**
> > - Jika ada referensi ke page, referensi tersebut akan menghasilkan trap ke OS  page fault. OS memeriksa tabel lain untuk memutuskan:
> > 	- Referensi invalid abort.
> > 	- Memang sedang tidak ada di memori.
> >
> > ** Langkah Penanganan Page Fault **
> > 1. **Trap ke OS:** Kendali langsung berpindah dari program ke sistem operasi.
> > 2. **Simpan Konteks:** OS menyimpan register dan status proses saat ini.
> > 3. **Validasi:** OS memeriksa apakah akses tersebut legal. Jika tidak (misalnya, akses ke alamat di luar jangkauan), proses akan dihentikan.
> > 4. **Cari Frame Kosong:** OS mencari _frame_ kosong di RAM dari daftar _frame_ bebas (_free-frame list_).
> > 5. **Jika Frame Penuh:** Jika tidak ada _frame_ kosong, OS harus menjalankan **algoritma penggantian page** (dibahas di bawah) untuk memilih _frame_ "korban".
> > 6. **Baca dari Disk:** OS menjadwalkan operasi I/O untuk membaca _page_ yang diminta dari _backing store_ (disk) ke _frame_ yang telah disiapkan.
> > 7. **Update Page Table:** Setelah I/O selesai, OS memperbarui _page table_ proses, menandai _page_ tersebut sebagai `valid` dan mencatat nomor _frame_-nya.
> > 8. **Lanjutkan Proses:** OS mengembalikan kendali ke proses, dan instruksi yang menyebabkan _fault_ akan diulang kembali—kali ini berhasil.
> >
> >Dalam kasus ekstrem, eksekusi proses dapat dimulai tanpa page di memori **(pure demand paging)**. Proses akan langsung mengalami page fault untuk instruksi pertama, dan page-page lainnya akan dibawa ke memori sesuai kebutuhan.
> >
> >Kinerja sangat dipengaruhi oleh **tingkat _page fault_ (p)**. Waktu akses efektif (EAT) dihitung sebagai `EAT = (1 – p) × (waktu akses memori) + p × (waktu penanganan page fault)`. Karena waktu penanganan _page fault_ sangat lama (melibatkan akses disk), nilai `p` harus dijaga sangat rendah agar sistem tidak terasa lambat.
> > 
> > **Pembuatan Proses: Copy-on-Write (COW)**
> > Teknik optimasi saat membuat proses baru (misalnya dengan `fork()`). Awalnya, proses induk dan anak berbagi _page_ yang sama (ditandai _read-only_). Baru ketika salah satu dari mereka mencoba **menulis** ke sebuah _page_, salinan dari _page_ tersebut dibuat khusus untuk proses yang menulis. Ini membuat `fork()` sangat cepat.
> > ![[Pasted image 20250609144213.png]]
> > 
> > ### Penggantian Page (Page Replacement)
> > - **Kapan Diperlukan?: ** Ketika terjadi _page fault_ tetapi **tidak ada _frame_ yang kosong** di memori. OS harus memilih salah satu _page_ yang sudah ada di memori untuk diusir (_evict_) agar bisa menyediakan ruang bagi _page_ yang baru.
> > - **Peran Modify Bit (Dirty Bit):** Untuk optimasi, setiap entri _page table_ memiliki _modify bit_.
> > 	- Jika sebuah _page_ dimodifikasi (ditulis), _hardware_ akan menyetel _modify bit_-nya menjadi `1` (_dirty_).
> > 	- Saat penggantian, jika _page_ korban _dirty_, ia **harus ditulis kembali ke disk**
> > 	- Jika tidak _dirty_ (_clean_), ia bisa **langsung ditimpa** tanpa perlu I/O tulis, ini sangat menghemat waktu.
> > - **Algoritma-Algoritma Penggantian Page:**
> > 	- **FIFO (First-In, First-Out):** Mengganti _page_ yang paling lama berada di memori. Implementasinya mudah (menggunakan antrean), tetapi performanya seringkali buruk.
> > 	- **Belady's Anomaly:** Masalah aneh pada FIFO di mana **menambah jumlah _frame_ yang tersedia justru dapat meningkatkan jumlah _page fault_**.
> > 	- **Optimal (OPT atau MIN):** Mengganti _page_ yang baru akan digunakan lagi **paling lama di masa depan**. Ini adalah algoritma dengan performa terbaik secara teoretis, tetapi **tidak dapat diimplementasikan** karena membutuhkan pengetahuan tentang masa depan.
> > 	- **LRU (Least Recently Used):** Mengganti _page_ yang **paling lama tidak digunakan**. Merupakan pendekatan yang sangat baik dan tidak menderita Belady's Anomaly. Implementasi murninya mahal karena memerlukan _hardware_ khusus (seperti _timestamp_ atau _stack_) untuk melacak setiap akses.
> > - **Algoritma Aproksimasi LRU:** Karena LRU murni mahal, digunakan algoritma perkiraan.
> > 	- **Reference Bit:** Setiap _page_ memiliki 1 bit referensi. _Hardware_ menyetelnya ke `1` setiap kali _page_ diakses. OS secara periodik mengosongkannya. Algoritma akan mencari _page_ dengan bit referensi `0` sebagai korban.
> > 	- **Second-Chance (Algoritma Jam):** Pada dasarnya FIFO, tetapi sebelum mengusir _page_, ia memeriksa _reference bit_. Jika `1`, _page_ diberi "kesempatan kedua": bitnya di-reset ke `0` dan ia dipindahkan ke belakang antrean. Jika `0`, ia langsung diganti.
> > 	- **Enhanced Second-Chance:** Menggunakan kombinasi (_reference bit_, _modify bit_) untuk mengklasifikasikan _page_ ke dalam 4 kelas prioritas. Korban dipilih dari kelas dengan prioritas terendah (misal, kelas (0,0): tidak baru diakses & tidak dimodifikasi).
> > - **Algoritma Lain:**
> > 	- **Counting Algorithms:** Mencatat jumlah akses ke setiap _page_ (misalnya LFU - _Least Frequently Used_).
> > 	- **Page-Buffering Algorithms:** Selalu menjaga sejumlah kecil _frame_ tetap bebas. Saat _fault_ terjadi, _page_ baru langsung dimuat ke _frame_ bebas, sementara proses pemilihan dan pengusiran korban dilakukan di latar belakang.

> [!cornell] #### Summary
> Memori Virtual memisahkan pandangan logis program dari RAM fisik, memungkinkan program berjalan meski ukurannya lebih besar dari memori, yang diimplementasikan melalui _Demand Paging_. Mekanisme ini hanya memuat _page_ ke RAM saat terjadi _Page Fault_. Jika RAM penuh, OS harus melakukan _Penggantian Page_ dengan memilih _page_ korban menggunakan berbagai algoritma. Algoritma seperti FIFO sederhana namun tidak efisien, OPT ideal namun tidak mungkin, sementara LRU sangat baik tetapi mahal, sehingga sistem modern sering menggunakan algoritma aproksimasi LRU (seperti Second-Chance) yang menyeimbangkan antara kinerja dan kompleksitas implementasi, dengan _Modify Bit_ sebagai optimasi krusial untuk mengurangi operasi I/O.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Thrashing:** Ini adalah kondisi patologis di mana sebuah proses tidak memiliki cukup _frame_ untuk menampung _page-page_ yang aktif digunakannya (_working set_). Akibatnya, proses tersebut terus-menerus mengalami _page fault_, menghabiskan lebih banyak waktu untuk memuat dan mengeluarkan _page_ (_paging_) daripada melakukan pekerjaan produktif. Hasilnya, utilitas CPU anjlok drastis. Ini adalah tanda bahwa tingkat _multiprogramming_ terlalu tinggi untuk jumlah memori fisik yang tersedia.
> - **Working-Set Model:** Sebuah model untuk mencegah _thrashing_. _Working set_ adalah kumpulan _page_ yang diakses oleh suatu proses dalam interval waktu terakhir (misalnya, Δ milidetik terakhir). Sistem operasi akan memonitor ukuran _working set_ setiap proses dan berusaha memastikan semua _page_ tersebut muat di RAM. Jika total _working set_ dari semua proses melebihi jumlah _frame_ yang tersedia, OS akan menangguhkan (_suspend_) salah satu proses untuk membebaskan _frame_ dan meredakan tekanan pada memori.
> - **Major vs. Minor Page Faults:** 
> 	- **Major Fault:** _Page_ yang diminta benar-benar tidak ada di memori dan harus dibaca dari disk. Ini proses yang lambat.
> 	- **Minor/Soft Fault:** _Page_ yang diminta sebenarnya sudah ada di memori (misalnya, dimuat oleh proses lain atau berada di daftar _frame_ bebas yang belum ditimpa), tetapi belum dipetakan ke ruang alamat proses yang meminta. OS hanya perlu memperbarui _page table_ proses tersebut tanpa perlu akses disk. Proses ini jauh lebih cepat.
> 
> #### Sumber & Referensi Lanjutan:
> - **"What Every Programmer Should Know About Memory" by Ulrich Drepper:** Sebuah paper yang sangat mendalam dan teknis yang menjelaskan bagaimana memori bekerja dari level perangkat keras hingga ke OS dan aplikasi. Sangat direkomendasikan untuk pemahaman tingkat lanjut.
> - **Intel® 64 and IA-32 Architectures Software Developer's Manuals:** Dokumen ini menjelaskan secara detail bagaimana _page fault_ ditangani di level perangkat keras, termasuk kode-kode _error_ yang dihasilkan yang memberikan informasi detail tentang penyebab _fault_ (misal: karena pelanggaran proteksi atau karena _page_ tidak ada).
> 
> #### Eksplorasi Mandiri:
> **Mengamati Page Fault di Sistem Anda:**
> - Pada Linux, Anda dapat menggunakan perintah `ps -o majflt,minflt -p [PID]` untuk melihat jumlah _major_ dan _minor page fault_ dari sebuah proses. Coba jalankan sebuah program besar (seperti browser web atau editor gambar) dan amati bagaimana angka-angka ini berubah saat Anda berinteraksi dengan program.
> - Perintah `vmstat 1` akan menampilkan statistik memori virtual sistem setiap detik, termasuk kolom `si` (_swap-in_) dan `so` (_swap-out_), yang menunjukkan aktivitas _paging_ ke dan dari disk. Tingkat aktivitas yang tinggi di sini bisa menjadi indikasi _thrashing_.
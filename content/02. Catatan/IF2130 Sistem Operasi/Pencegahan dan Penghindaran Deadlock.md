---
type: Note
cssclasses:
  - cornell-notes
---
_Back to: [[IF2130 Sistem Operasi]]_
> [!cornell] Topic
> > ## Questions/Cues
> > - Prinsip pencegahan (prevention)?
> > - Cara mencegah 4 syarat deadlock?
> > - Strategi circular wait (urutan total)?
> > - Prinsip penghindaran (avoidance)?
> > - Konsep Safe State vs Unsafe State?
> > - Algoritma RAG (1 instance)?
> > - Algoritma Banker (multi-instance)?
> > - Struktur data Algoritma Banker?
> > - Langkah-langkah Algoritma Banker?
> >
> > ## Reference Points
> > - Page 34-36
>
> >
> > ### Deadlock Prevention (Pencegahan)
> > 1. Bekerja dengan cara memastikan **setidaknya satu dari empat kondisi deadlock tidak akan pernah terpenuhi**. Ini adalah pendekatan yang bersifat statis dan restriktif, dengan memberlakukan aturan ketat pada cara _thread_ meminta sumber daya.
> > 2. Menyerang 4 Kondisi:
> > 	- **Mutual Exclusion:** Umumnya **tidak bisa dicegah** karena banyak sumber daya (seperti printer atau _mutex lock_) yang secara inheren bersifat _non-sharable_.
> > 	- **Hold and Wait:** Dapat dicegah dengan dua protokol, namun keduanya memiliki kelemahan signifikan:
> > 		- **Protokol 1:** _Thread_ harus meminta dan mendapatkan **semua** sumber daya yang dibutuhkan sebelum eksekusi dimulai. **Kelemahan:** Pemanfaatan sumber daya sangat rendah.
> > 		- **Protokol 2:** _Thread_ hanya boleh meminta sumber daya jika ia **tidak sedang memegang sumber daya lain**. **Kelemahan:** Bisa jadi tidak efisien dan menyebabkan _starvation_.
> > 	-  **No Preemption:** Dapat dicegah dengan mengizinkan sistem **mengambil paksa (preempt)** sumber daya. Jika sebuah _thread_ yang memegang sumber daya meminta sumber daya lain yang tidak tersedia, semua sumber dayanya saat ini dilepaskan. **Kelemahan:** Sangat sulit diimplementasikan untuk sumber daya seperti _mutex lock_, namun lebih memungkinkan untuk sumber daya yang keadaannya mudah disimpan dan dipulihkan (misalnya, register CPU).
> > 	- **Circular Wait (Paling Praktis):**
> > 		- Ini adalah metode pencegahan yang paling sering digunakan dan paling praktis.
> > 		- **Strategi:** Terapkan **urutan total (total ordering)** pada semua tipe sumber daya di sistem (misal, beri nomor unik pada setiap kunci: Kunci1, Kunci2, Kunci3, ...).
> > 		- **Aturan:** Setiap _thread_ **wajib** meminta sumber daya dalam **urutan menaik**. Contoh: Jika sebuah _thread_ memegang Kunci3, ia hanya boleh meminta Kunci4, Kunci5, dst., tetapi tidak boleh meminta Kunci2.
> > 		- **Hasil:** Dengan aturan ini, siklus permintaan secara matematis menjadi tidak mungkin terjadi.
> >
> > ### Deadlock Avoidance (Pencegahan)
> > - **Prinsip:** Pendekatan yang lebih dinamis daripada pencegahan. Sistem tidak melarang kondisi deadlock, tetapi menggunakan **informasi tambahan (a priori)** tentang kebutuhan sumber daya setiap _thread_ untuk membuat keputusan alokasi yang cerdas. Tujuannya adalah untuk tidak pernah memasuki _unsafe state_.
> > - **Safe State vs. Unsafe State:**
> > 	- **_Safe State_ (Keadaan Aman):** Sebuah keadaan di mana sistem dapat menjamin adanya setidaknya satu **urutan aman (_safe sequence_)**, yaitu urutan eksekusi _thread_ yang memungkinkan semua _thread_ selesai tanpa mengalami _deadlock_.
> > 	- **_Unsafe State_ (Keadaan Tidak Aman):** Keadaan apa pun yang tidak aman. Keadaan ini **memiliki potensi** untuk mengarah ke _deadlock_, tetapi belum tentu merupakan _deadlock_.
> > 	- **Tujuan Penghindaran:** Memastikan sistem **tidak pernah** meninggalkan _safe state_. Setiap permintaan yang dapat membawa sistem ke _unsafe state_ akan ditunda.
> > - **Algoritma Penghindaran:**
> >	- **Resource-Allocation Graph (untuk 1 instance/tipe):**
> >		- Menggunakan jenis panah baru: _**claim edge**_ **(panah putus-putus)**, yang menandakan _thread_ mungkin akan meminta sumber daya tersebut di masa depan.
> >		- Permintaan hanya akan dikabulkan jika pengubahan _request edge_ menjadi _assignment edge_ **tidak menciptakan siklus** dalam graf.
> >	- **Banker's Algorithm (untuk beberapa instance/tipe):**
> >		- Analogi: Seperti bank yang tidak akan mengalokasikan pinjaman jika berisiko tidak dapat memenuhi penarikan dana nasabah lain di masa depan.
> >		- **Struktur Data Kunci:**
> >			- `Available`: Vektor jumlah _instance_ yang tersedia untuk setiap tipe sumber daya.
> >			- `Max`: Matriks [n × m] yang berisi jumlah maksimum _instance_ yang mungkin diminta oleh setiap _thread_ (n) untuk setiap tipe sumber daya (m).
> >			- `Allocation`: Matriks [n × m] yang berisi jumlah _instance_ yang saat ini dialokasikan ke setiap _thread_.
> >			- `Need`: Matriks [n × m] yang berisi sisa _instance_ yang masih dibutuhkan setiap _thread_. Dihitung dengan: `Need = Max - Allocation`.
> >		- **Alur Kerja saat Ada Permintaan:**
> >			1. **Validasi:** Pastikan permintaan tidak melebihi klaim maksimum (`Request ≤ Need`).
> >			2. **Ketersediaan:** Pastikan sumber daya yang diminta tersedia (`Request ≤ Available`).
> >			3. **Simulasi & Pengecekan Keamanan:** Sistem "berpura-pura" mengalokasikan sumber daya tersebut (memperbarui `Available`, `Allocation`, dan `Need` sementara). Kemudian, sistem menjalankan **Safety Algorithm** untuk memeriksa apakah keadaan baru ini masih _safe_.
> >			4. **Keputusan:** Jika keadaan baru terbukti _safe_, alokasi disetujui. Jika tidak, alokasi dibatalkan (keadaan dikembalikan seperti semula) dan _thread_ harus menunggu.
> >		- **Algoritma Keamanan (buat ngecek sistem aman atau tidak):**
> >			1. Bikin vektor _Work_ = _Available_.
> >			2. Bikin vektor _Finish_ (isinya true/false) buat tiap thread, awalnya semua _false_.
> >			3. Cari thread _i_ yang _Finish[i]_-nya false DAN _Need_i ≤ Work_. Kalau tidak ada, lanjut ke langkah 5.
> >			4. Kalau ketemu thread i: _Work = Work + Allocation_i_ (anggap dia selesai dan balikin sumber dayanya), terus _Finish[i] = true_. Balik lagi ke langkah 3.
> >			5. Kalau semua _Finish[i]_ jadi true, berarti sistemnya aman.
> >		- **Algoritma Permintaan Sumber Daya (pas thread minta):**
> >			1. Kalau permintaan thread Ti (_Request_i_) lebih besar dari _Need_i_ dia, error (minta kebanyakan).
> >			2. Kalau _Request_i_ lebih besar dari _Available_ sekarang, Ti harus nunggu (sumber dayanya kurang).
> >			3. Kalau tidak, sistem pura-pura ngasih: _Available = Available - Request_i_, _Allocation_i = Allocation_i + Request_i_, _Need_i = Need_i - Request_i_. Terus cek pakai Algoritma Keamanan tadi. Kalau hasilnya aman, beneran dikasih. Kalau tidak aman, pura-puranya dibatalin, Ti harus nunggu.

> [!cornell] #### Summary
> Pencegahan dan Penghindaran adalah dua strategi proaktif untuk menangani deadlock, di mana Pencegahan menerapkan aturan statis yang ketat untuk mematahkan salah satu dari empat kondisi deadlock (dengan pengurutan sumber daya menjadi metode paling praktis), sementara Penghindaran menggunakan pendekatan dinamis yang memerlukan informasi kebutuhan maksimum untuk memastikan sistem tidak pernah memasuki keadaan tidak aman melalui algoritma seperti Algoritma Banker.

> [!ad-libitum]- Additional Information (Optional)
> - **Trade-off Kinerja pada Pencegahan:** Metode pencegahan, meskipun efektif, seringkali dibayar mahal dengan penurunan kinerja. Mencegah _hold-and-wait_ menyebabkan utilisasi sumber daya yang rendah. Mencegah _no preemption_ sangat kompleks. Bahkan metode terbaik, _circular-wait prevention_ (pengurutan sumber daya), dapat menjadi beban bagi pengembang untuk dirancang dan dipatuhi dalam sistem yang sangat besar dan kompleks dengan ribuan kunci.
> - **Kelayakan Praktis Algoritma Banker:** Meskipun secara teoretis sangat kuat, Algoritma Banker jarang sekali diimplementasikan pada sistem operasi serbaguna (seperti Windows, Linux, macOS). Hambatan utamanya adalah **kewajiban untuk mengetahui kebutuhan sumber daya maksimum di muka**. Pada aplikasi modern, kebutuhan sumber daya seringkali bersifat sangat dinamis dan tidak dapat diprediksi, membuat persyaratan ini hampir mustahil untuk dipenuhi. Selain itu, _overhead_ komputasi untuk menjalankan _Safety Algorithm_ pada setiap permintaan bisa jadi terlalu tinggi.
> -  **Studi Kasus: Pencegahan di Level Aplikasi:** Teknik pencegahan _circular wait_ melalui pengurutan kunci sangat umum dan efektif diimplementasikan oleh _programmer_ di level aplikasi. Contohnya, saat mentransfer dana antar dua rekening, seorang _programmer_ dapat memberlakukan aturan untuk selalu mengunci objek rekening dengan nomor ID yang lebih kecil terlebih dahulu, baru kemudian yang lebih besar. Ini adalah cara praktis untuk mencegah _deadlock_ dalam kode yang mereka tulis sendiri, tanpa bergantung pada sistem operasi.
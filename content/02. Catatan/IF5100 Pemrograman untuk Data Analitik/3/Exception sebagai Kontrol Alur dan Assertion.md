---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Exception sebagai Kontrol Alur dan Assertion
>
> > ## Questions/Cues
> >
> > - Mengapa `raise` exception lebih baik daripada mengembalikan nilai khusus?
> > - Pada studi kasus `get_stats`/`avg`, di mana error muncul dan mengapa?
> > - Apa tiga opsi menangani mahasiswa tanpa nilai, dan apa konsekuensinya?
> > - Apa itu `assert` dan apa yang terjadi bila kondisinya gagal?
> > - Bagaimana assertion mendukung *defensive programming*?
> > - Di mana assertion sebaiknya dipakai, dan apa bedanya dari exception handling?
> >
> > ## Reference Points
> >
> > - IF5100 — Exceptions and Assertions (Slides 9-20)
>
> > ### Exception sebagai Kontrol Alur
> >
> > Exception juga bisa dipakai untuk **mengatur alur eksekusi**. Alih-alih mengembalikan nilai khusus saat terjadi error lalu memaksa pemanggil mengecek "apakah nilai error dikembalikan", lebih baik **lempar exception ketika fungsi tidak mampu menghasilkan hasil yang konsisten dengan spesifikasinya**.
> >
> > ### Studi Kasus: `get_stats` dan `avg`
> >
> > Diberikan daftar kelas sebuah mata kuliah; tiap entri adalah list dua bagian — list nama depan/belakang, dan list nilai tugas:
> >
> > ```python
> > def get_stats(class_list):
> >     new_stats = []
> >     for elt in class_list:
> >         new_stats.append([elt[0], elt[1], avg(elt[1])])
> >     return new_stats
> >
> > def avg(grades):
> >     return sum(grades) / len(grades)
> > ```
> >
> > **Masalahnya**: bila ada entri seperti `[['deadpool'], []]` (tanpa nilai), `avg` menjalankan `sum([]) / len([])` → **`ZeroDivisionError: float division by zero`**.
> >
> > ### Tiga Opsi Penanganan
> >
> > ```mermaid
> > flowchart TD
> >     Z["avg(grades) memicu ZeroDivisionError"] --> O1["Opsi 1: flag dengan pesan<br/>print warning, kembalikan None"]
> >     Z --> O2["Opsi 2: ubah kebijakan<br/>print warning, return 0.0"]
> >     Z --> O3["Opsi 3: re-raise<br/>print warning, raise e"]
> >     O3 --> C["Pemanggil wajib menangani;<br/>jika tidak, unhandled exception"]
> > ```
> >
> > **Opsi 1 — tandai error dengan mencetak pesan.** Beri tahu bahwa ada yang salah:
> >
> > ```python
> > def avg(grades):
> >     try:
> >         return sum(grades) / len(grades)
> >     except ZeroDivisionError:
> >         print('warning: no grades data')
> > ```
> >
> > Hasilnya entri `deadpool` mendapat nilai `None` (fungsi tanpa `return` eksplisit).
> >
> > **Opsi 2 — ubah kebijakan.** Putuskan bahwa mahasiswa tanpa nilai mendapat nol:
> >
> > ```python
> > def avg(grades):
> >     try:
> >         return sum(grades) / len(grades)
> >     except ZeroDivisionError:
> >         print('warning: no grades data')
> >         return 0.0
> > ```
> >
> > **Opsi 3 — re-raise.** Catat/cetak error lalu biarkan pemanggil ikut menanganinya:
> >
> > ```python
> > def avg(grades):
> >     try:
> >         return sum(grades) / len(grades)
> >     except ZeroDivisionError as e:
> >         print('warning: no grades data')
> >         raise e
> > ```
> >
> > Ini **tidak fail silently** — error tetap disinyalkan setelah dicatat. **Pemanggil (atau pemanggil dari pemanggil, dst.) harus menangani** exception itu; jika tidak, terjadi *unhandled exception*.
> >
> > ### Assertion
> >
> > Kita ingin **memastikan asumsi tentang keadaan komputasi sesuai harapan**. Statement **`assert`** melempar exception **`AssertionError`** bila asumsi tidak terpenuhi — contoh **defensive programming** yang baik:
> >
> > ```python
> > def avg(grades):
> >     assert len(grades) > 0, "no grades data"
> >     return sum(grades) / len(grades)
> > ```
> >
> > Fungsi **berhenti seketika** bila assertion tidak terpenuhi — melempar `AssertionError` (dengan pesan opsional) bila `grades` berupa list kosong; selain itu berjalan normal.
> >
> > ### Assertion sebagai Defensive Programming
> >
> > - Assertion **tidak** memberi programmer kendali atas **respons** terhadap kondisi tak terduga — untuk itu gunakan **exception handling**.
> > - Assertion **memastikan eksekusi berhenti** kapan pun kondisi yang diharapkan tidak terpenuhi.
> > - Biasanya dipakai untuk **memeriksa input fungsi**, tetapi bisa di mana saja.
> > - Bisa dipakai untuk **memeriksa output fungsi**, mencegah nilai buruk merambat.
> > - Membuat **lokasi sumber bug lebih mudah ditemukan**.
> >
> > ### Di Mana Memakai Assertion
> >
> > Tujuannya **menemukan bug sedini mungkin** dan memperjelas di mana ia terjadi; dipakai sebagai **pelengkap testing**. Gunakan assertion untuk:
> >
> > - melempar exception bila pengguna memberi **input data yang buruk**;
> > - memeriksa **tipe** argumen atau nilai;
> > - memeriksa bahwa **invarian** struktur data terpenuhi;
> > - memeriksa **batasan** pada nilai return;
> > - memeriksa pelanggaran **constraint** pada prosedur (mis. tidak ada duplikat dalam list).

> [!cornell] #### Summary
>
> **Exception sebagai kontrol alur**: daripada mengembalikan nilai khusus yang harus dicek pemanggil, `raise` exception saat fungsi tak bisa memenuhi spesifikasinya. Pada studi kasus `get_stats`/`avg`, entri tanpa nilai (`deadpool`) memicu **`ZeroDivisionError`** di `sum(grades)/len(grades)`. Tiga opsi: **(1)** cetak *warning* dan kembalikan `None`; **(2)** ubah kebijakan → `return 0.0`; **(3)** *re-raise* (`raise e`) — tidak fail silently, tetapi **pemanggil wajib menangani**. **Assertion** (`assert kondisi, "pesan"`) melempar **`AssertionError`** dan **menghentikan eksekusi seketika** bila asumsi gagal — *defensive programming*. Bedanya dari exception handling: assertion **tidak** mengatur respons terhadap kondisi tak terduga, ia hanya menjamin **berhenti** saat kondisi harapan dilanggar. Pakai untuk mengecek input/output, tipe, invarian struktur data, dan constraint — sebagai pelengkap testing untuk menemukan bug sedini mungkin.

> [!ad-libitum]- Additional Information
>
> #### `assert` Dinonaktifkan oleh `-O`
>
> Menjalankan Python dengan flag `-O` (*optimize*) **menghapus semua `assert`**. Karena itu assertion **tidak boleh** dipakai untuk validasi yang wajib ada di produksi (mis. otorisasi, validasi input pengguna eksternal) — untuk itu pakai `if ...: raise`. Assertion adalah jaring pengaman saat pengembangan/pengujian, bukan penegak aturan bisnis.
>
> #### EAFP vs LBYL
>
> Python cenderung ke **EAFP** ("*Easier to Ask Forgiveness than Permission*") — coba operasinya, tangkap exception bila gagal — dibanding **LBYL** ("*Look Before You Leap*") yang menumpuk pengecekan `if` di depan. EAFP menghindari *race condition* (mis. file terhapus antara pengecekan dan pemakaian) dan sering lebih bersih.
>
> #### Kontrak, Invarian, dan Hubungannya ke Testing
>
> Assertion adalah bentuk ringan dari *design by contract* (prasyarat, pascakondisi, invarian). Dikombinasikan dengan **unit test** (`unittest`, `pytest`) dan *property-based testing* (`hypothesis`), assertion mempersempit ruang di mana bug bisa bersembunyi. `pytest` bahkan menulis ulang `assert` biasa agar pesan gagalnya informatif.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis `get_stats` yang kokoh dengan tiga varian `avg` (opsi 1/2/3) dan bandingkan output pada `test_grades` yang memuat entri `deadpool`.
> 2. Tambahkan assertion pada fungsi *binary search*: prasyarat "list terurut", pascakondisi "indeks yang dikembalikan benar-benar berisi target atau -1".
> 3. Jalankan sebuah skrip ber-`assert` dengan `python script.py` lalu `python -O script.py` dan amati perbedaan perilakunya.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — Bab 7 (Exceptions and Assertions).
> - Dokumentasi Python: *The `assert` statement*, *`unittest`*, PEP 8 (bagian pemrograman defensif).
> - MIT OCW 6.0001, *Lecture 7: Testing, Debugging, Exceptions, Assertions*.

_Back to_ [[IF5101 Manajemen Data]]

# Latihan UTS IF5101 Manajemen Data — Soal

**Cakupan:** ER Modelling (termasuk specialization, aggregation, weak entity), reduksi ke skema relasional, SQL, dan normalisasi.
**Waktu yang disarankan:** 120 menit. **Bobot:** No. 1 (40), No. 2 (20), No. 3 (25), No. 4 (15).
Jawaban + pembahasan ada di [[Latihan UTS IF5101 - Jawaban]]. Kerjakan dulu sebelum mengintip.

---

## Nomor 1 — ER Modelling (40)

Diketahui deskripsi basis data penyelenggara festival musik nasional **NusaFest** sebagai berikut.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Orang dan perannya.** NusaFest menyimpan data orang yang terlibat dalam festival, yaitu id orang (unik), nama, tanggal lahir, umur (dihitung berdasarkan tanggal lahir), alamat (terdiri atas jalan, kota, dan kode pos), serta satu atau lebih email. Setiap orang dapat berperan sebagai staf, artis, atau pengunjung. Satu orang boleh memiliki lebih dari satu peran sekaligus (misalnya staf yang juga pengunjung), dan ada orang yang tercatat tanpa peran apa pun (misalnya kontak calon artis).

Seorang staf memiliki NIP (unik untuk setiap staf) dan tanggal bergabung. Setiap staf pasti berstatus sebagai panitia atau teknisi, tetapi tidak keduanya. Untuk panitia disimpan divisinya; seorang panitia dapat melapor kepada satu panitia lain sebagai atasannya (tidak semua panitia punya atasan, dan seorang atasan dapat membawahi banyak panitia). Untuk teknisi disimpan satu atau lebih sertifikasi keahliannya.

Seorang artis memiliki nama panggung dan satu atau lebih genre. Setiap artis pasti berupa solois atau grup, tidak keduanya. Untuk solois disimpan instrumen utamanya, sedangkan untuk grup disimpan tahun terbentuk. Seorang pengunjung memiliki poin member.

**Festival, panggung, dan tiket.** Festival dikenali melalui id festival (unik) dan memiliki nama, tanggal mulai, tanggal selesai, lama festival (dalam hari, dihitung dari tanggal mulai dan tanggal selesai), serta lokasi (terdiri atas venue dan kota). Sebuah festival memiliki satu atau lebih panggung. Panggung dikenali melalui nomor panggung yang hanya unik di dalam satu festival, dan memiliki nama serta kapasitas. Sebuah festival juga menerbitkan tiket; tiket dikenali melalui nomor tiket yang hanya unik di dalam satu festival, dan memiliki kategori serta harga. Sebuah tiket boleh belum terjual. Tiket yang sudah terjual dibeli oleh tepat satu pengunjung, dan dicatat tanggal beli serta metode pembayarannya. Seorang pengunjung dapat membeli banyak tiket; tidak semua pengunjung pasti membeli tiket.

**Pengelolaan.** Seorang panitia dapat mengelola lebih dari satu festival, dan setiap festival dikelola oleh satu atau lebih panitia. Untuk setiap keterlibatan panitia pada suatu festival dicatat jabatannya.

**Partisipasi artis.** Seorang artis dapat berpartisipasi pada banyak festival, dan setiap festival harus diikuti oleh satu atau lebih artis. Untuk setiap partisipasi dicatat honor dan status kontraknya. Hal-hal berikut berkaitan dengan *sebuah partisipasi* (yaitu pasangan artis dan festival tertentu):

1. Setiap partisipasi harus didukung oleh satu atau lebih teknisi. Untuk setiap dukungan dicatat peran teknis dan jumlah jam kerja. Seorang teknisi dapat mendukung banyak partisipasi.
2. Dalam sebuah dukungan teknis (teknisi tertentu pada partisipasi tertentu) dapat digunakan nol atau lebih peralatan, dan dicatat jumlah unit yang dipakai. Peralatan memiliki kode peralatan (unik), nama, merek, dan kondisi. Peralatan dapat berupa peralatan audio (disimpan daya dalam watt), peralatan visual (disimpan resolusi), atau jenis lain; sebuah peralatan paling banyak termasuk satu dari kedua jenis tersebut.
3. Setiap partisipasi harus dijadwalkan tampil pada satu atau lebih panggung milik festival yang sama, dengan jam mulai dan jam selesai pada masing-masing panggung. Sebuah panggung dapat menjadi tempat banyak partisipasi.
4. Pengunjung dapat memberi ulasan atas sebuah partisipasi, dengan rating (1 sampai 5), komentar, dan tanggal ulasan. Seorang pengunjung dapat mengulas banyak partisipasi, dan sebuah partisipasi dapat diulas oleh banyak pengunjung. Sebuah ulasan boleh tidak ditanggapi, tetapi jika ditanggapi, tanggapan diberikan oleh tepat satu panitia, dengan isi tanggapan dan tanggal tanggapan dicatat. Seorang panitia dapat menanggapi banyak ulasan.

**Ketentuan tambahan.** Seorang pengunjung hanya boleh mengulas partisipasi pada festival yang tiketnya pernah ia beli. Panitia yang menanggapi suatu ulasan harus panitia yang mengelola festival terkait. Jam mulai harus lebih awal daripada jam selesai, dan jadwal seorang artis tidak boleh bentrok.

Sebagai informasi tambahan, semua atribut id, kode, dan NIP bersifat unik.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Buatlah diagram ER untuk persoalan di atas dengan teknik pemodelan ER sesuai standar yang digunakan di kelas. Tunjukkan dengan jelas: tipe atribut (komposit, multivalued, derived), key, cardinality, partisipasi total/partial, weak entity set, specialization/generalization beserta constraint-nya (disjoint/overlapping dan total/partial), serta aggregation. Buat asumsi (yang masuk akal dan tidak berlebihan) jika ada bagian soal yang kurang jelas dan tuliskan dalam jawaban. Jika ada constraint yang tidak dapat dimodelkan dengan ER, tuliskan dengan jelas dalam jawaban Anda.

---

## Nomor 2 — Reduksi ke Skema Relasional (20)

Dari diagram ER yang Anda buat pada nomor 1, turunkan **skema relasional lengkap** (nama relasi, atribut, primary key, dan foreign key). Ketentuan:

1. Untuk setiap hierarki specialization, pilih strategi mapping (satu tabel per entity, tabel subtype saja, atau satu tabel gabungan) dan beri alasan **satu kalimat**. Perhatikan bahwa entity *Staf* tidak dirujuk langsung oleh relationship mana pun.
2. Tangani atribut komposit, multivalued, dan derived.
3. Tangani weak entity set dan seluruh aggregation. Jelaskan bagaimana primary key relasi yang berasal dari relationship atas aggregation terbentuk.
4. Sebutkan relationship mana saja yang Anda **gabungkan ke tabel entity** (bukan tabel tersendiri) beserta alasannya.

---

## Nomor 3 — SQL (25)

Gunakan skema relasional berikut (sebagian dari hasil nomor 2; atribut primary key ditandai `*`).

```
orang(*id_orang, nama, tanggal_lahir, jalan, kota, kode_pos)
artis(*id_orang, nama_panggung)                      -- id_orang FK -> orang
pengunjung(*id_orang, poin_member)                   -- id_orang FK -> orang
panitia(*id_orang, divisi)                           -- id_orang FK -> orang
festival(*id_festival, nama_festival, tanggal_mulai, tanggal_selesai, venue, kota)
panggung(*id_festival, *no_panggung, nama_panggung, kapasitas)
tiket(*id_festival, *nomor_tiket, kategori, harga,
      id_pengunjung, tanggal_beli, metode_bayar)     -- id_pengunjung FK -> pengunjung, boleh NULL
partisipasi(*id_artis, *id_festival, honor, status_kontrak)
jadwal_tampil(*id_artis, *id_festival, *no_panggung, jam_mulai, jam_selesai)
ulasan(*id_artis, *id_festival, *id_pengunjung, rating, komentar, tanggal_ulasan,
       id_panitia_penanggap, isi_tanggapan, tanggal_tanggapan)   -- tiga kolom terakhir boleh NULL
```

Tulis query SQL untuk:

**Dasar**

a. Tampilkan nama panggung artis, nama festival, dan honor untuk setiap partisipasi dengan honor minimal Rp10.000.000, terurut dari honor tertinggi. (2)

b. Untuk setiap festival, tampilkan nama festival, **jumlah tiket yang sudah terjual**, dan **total pendapatan tiket**. (3)

**Menengah**

c. Tampilkan nama panggung artis, nama festival, dan **rata-rata rating** untuk setiap kombinasi artis-festival yang rata-ratanya minimal 4,5, terurut dari rata-rata tertinggi. (3)

d. Tampilkan **semua** festival beserta jumlah ulasannya; festival tanpa ulasan tetap tampil dengan jumlah 0. (3)

e. Tampilkan id dan nama orang yang **sekaligus** panitia dan pengunjung. (2)

**Sulit**

f. Tampilkan nama panggung artis, nama festival, dan honor untuk partisipasi yang honornya **di atas rata-rata honor pada festival yang sama**. (4)

g. Tampilkan id orang dan nama panggung artis yang **tampil di semua panggung** milik festival bernama `'NusaFest 2026'`. Anggap nama festival unik. (5)

h. Naikkan honor sebesar 10% untuk setiap partisipasi yang rata-rata rating ulasannya minimal 4,5. (3)

---

## Nomor 4 — Normalisasi (15)

Diketahui relasi `TEKNISI_PELATIHAN` yang mencatat teknisi, divisinya, dan pelatihan yang mereka ikuti:

```
TEKNISI_PELATIHAN(id_teknisi, nama, id_divisi, nama_divisi, gaji, judul_pelatihan, tanggal_selesai)
```

Contoh isi relasi:

| id_teknisi | nama | id_divisi | nama_divisi | gaji | judul_pelatihan | tanggal_selesai |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | Raka | D1 | Audio | 9.000.000 | Mixing Dasar | 2026-03-10 |
| T01 | Raka | D1 | Audio | 9.000.000 | Keselamatan Panggung | 2026-04-02 |
| T02 | Sinta | D2 | Visual | 8.500.000 | Keselamatan Panggung | 2026-04-02 |
| T02 | Sinta | D2 | Visual | 8.500.000 | Lighting Lanjut | NULL |
| T03 | Dimas | D1 | Audio | 9.000.000 | Mixing Dasar | 2026-03-12 |
| T04 | Raka | D3 | Rigging | 10.000.000 | Rigging Dasar | 2026-05-20 |
| T05 | Laras | D2 | Visual | 8.500.000 | NULL | NULL |

Semantik: seorang teknisi memiliki satu nama, satu divisi, dan satu gaji; setiap divisi punya satu nama divisi; seorang teknisi dapat mengikuti banyak pelatihan, dan untuk setiap pasangan teknisi-pelatihan dicatat tanggal selesainya (NULL bila belum selesai). Dua teknisi berbeda boleh bernama sama.

1. Apakah relasi `TEKNISI_PELATIHAN` termasuk relasi yang baik? Jelaskan dengan merujuk pada isi relasi di atas. (2)
2. Tuliskan functional dependency yang berlaku pada relasi ini. Dari isi relasi tampak bahwa `gaji → id_divisi` terpenuhi, sedangkan `nama → id_teknisi` tidak terpenuhi. Apakah keduanya boleh dinyatakan sebagai FD pada skema? Jelaskan. (3)
3. Tentukan **candidate key** relasi ini dengan *attribute closure*. Jelaskan. (2)
4. Dalam **bentuk normal** ke berapa relasi ini? Jelaskan dependensi yang melanggar bentuk normal berikutnya. (2)
5. Relasi didekomposisi menjadi
   `R1 = (id_teknisi, nama, id_divisi, nama_divisi, gaji)` dan
   `R2 = (id_teknisi, judul_pelatihan, tanggal_selesai)`.
   a) Apakah dekomposisi ini *lossless join* dan *dependency preserving*? Jelaskan. (2)
   b) Dalam bentuk normal ke berapa `R1` dan `R2`? Jelaskan. (1)
6. Lanjutkan dekomposisi hingga seluruh relasi berada dalam **BCNF**. Tuliskan relasi akhir dan tunjukkan tiap langkah. (1)
7. Seorang mahasiswa mengusulkan dekomposisi lain:
   `Q1 = (id_teknisi, nama, id_divisi, nama_divisi)` dan
   `Q2 = (nama, gaji, judul_pelatihan, tanggal_selesai)`.
   Apakah dekomposisi ini lossless dan dependency preserving? Tunjukkan dengan isi relasi di atas (hitung jumlah tuple hasil join dan sebutkan tuple palsunya) serta FD apa yang hilang. (1)
8. Diketahui relasi `Layanan(id_pengunjung, id_festival, id_panitia)` dengan `F = { id_pengunjung, id_festival → id_panitia ; id_panitia → id_festival }`. Tentukan candidate key-nya. Apakah relasi ini 3NF? Apakah BCNF? Jika didekomposisi ke BCNF, dependensi apa yang hilang? (1)

---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] The Automated Testing Pyramid
>
> > ## Questions/Cues
> >
> > - Apa tiga lapis dalam testing pyramid dan bagaimana proporsinya?
> > - Apa fungsi unit, integration, dan contract test?
> > - Apa itu ice cream cone dan mengapa berbahaya?
> >
> > ## Reference Points
> >
> > - IF4054 CI Automation & Shift-Left (Slides 15-19)
>
> > ### Piramid Testing
> >
> > ```mermaid
> > flowchart TB
> >     C["Contract tests<br/>sedikit, validasi kesepakatan API"]
> >     I["Integration tests<br/>lebih sedikit, menit, dependency nyata"]
> >     U["Unit tests<br/>banyak, detik, terisolasi"]
> >     C --- I --- U
> > ```
> >
> > | Lapis | Jumlah | Kecepatan | Fungsi |
> > |---|---|---|---|
> > | **Unit** | Banyak | Detik | Fungsi/kelas terisolasi |
> > | **Integration** | Lebih sedikit | Menit | Database dan layanan nyata |
> > | **Contract** | Sedikit | Cepat per sisi | Kesepakatan API antar-layanan |
> >
> > ### Unit Tests: Fondasi
> >
> > Menguji satu fungsi, method, atau kelas **sepenuhnya terisolasi** (tanpa network, database, filesystem). Dependency di-*mock* atau di-*stub* agar tes hanya menguji logika yang Anda tulis. Karena jalan dalam detik, ratusan hingga ribuan tes dieksekusi **di setiap commit**, dan seharusnya menjadi **mayoritas** jumlah tes.
> >
> > ### Integration Tests: Apakah Bagian-Bagiannya Cocok?
> >
> > Memverifikasi kode bekerja terhadap dependency nyata atau realistis (test database, message queue). Menangkap kelas bug yang tidak bisa ditangkap unit test: **SQL salah, ketidakcocokan serialisasi, kesalahan wiring**. Lebih lambat dan sedikit; biasanya berjalan terhadap dependency container ephemeral di CI. Cakupannya sempit: uji **titik integrasinya**, bukan mengulang logika bisnis.
> >
> > ### Contract Tests: Apakah Layanan Saling Sepakat?
> >
> > Memverifikasi bahwa **ekspektasi consumer** terhadap API provider sama dengan yang benar-benar diberikan provider. Memungkinkan dua tim mengembangkan layanan secara mandiri tanpa environment end-to-end penuh. Biasanya memakai **pact** atau skema bersama yang divalidasi kedua sisi pada pipeline masing-masing.
> >
> > ### Ketika Piramid Terbalik
> >
> > | **Ice Cream Cone** | **Healthy Pyramid** |
> > |---|---|
> > | Berat di tes E2E/manual yang lambat dan rapuh | Dasar luas tes unit cepat dan terisolasi |
> > | Sedikit atau tanpa unit test | Lapisan sedang integration test |
> > | Pipeline berjam-jam, kegagalan sulit dilokalisasi | Lapisan tipis contract/E2E |
> > | Umum pada tim yang menempelkan testing belakangan | Feedback cepat, kegagalan mudah didiagnosis |

> [!cornell] #### Summary
>
> **Testing pyramid** menempatkan **banyak unit test** (cepat, terisolasi) di dasar, **integration test** lebih sedikit (dependency nyata) di tengah, dan **contract test** tipis di atas untuk menjaga kesepakatan API antar-layanan. Pola terbalik (**ice cream cone**) yang bertumpu pada E2E/manual membuat pipeline lambat dan kegagalan sulit dilacak; pyramid yang sehat memberi feedback cepat dan diagnosis mudah.

> [!ad-libitum]- Additional Information
>
> #### Testing Trophy dan Mutation Testing
>
> Sebagian praktisi (Kent C. Dodds) mengusulkan *testing trophy* yang lebih menekankan integration test. **Mutation testing** (mis. mutmut, Stryker) menguji kualitas tes itu sendiri dengan menyuntikkan bug kecil dan melihat apakah tes gagal.
>
> #### Proyek Eksplorasi Mandiri
> 1. Hitung rasio unit : integration : E2E pada proyek Anda. Bentuknya piramid atau cone? Tambahkan satu contract test dengan Pact.
>
> #### Bacaan Lanjutan
> - Martin Fowler — *The Practical Test Pyramid*.
> - Pact Docs — *Consumer-driven contract testing*.

---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Cost of Bad Data and the PayLend Case
>
> > ## Questions/Cues
> >
> > - Mengapa data berkualitas buruk berbahaya bagi pipeline ML?
> > - Mengapa uptime saja tidak cukup?
> > - Apa yang salah pada event PayLend?
> >
> > ## Reference Points
> >
> > - IF4054 DataOps: Security, Quality & Privacy (Slides 3-7)
>
> > ### Running Example: PayLend
> >
> > **PayLend** adalah aplikasi pembayaran P2P fintech. Kita mengikuti satu event dari aplikasi mobile ke data lake:
> >
> > ```json
> > {
> >   "transaction_id": "txn_000481",
> >   "user_id": "usr_9921",
> >   "full_name": "Jane Doe",
> >   "ssn": "123-45-6789",
> >   "home_address": "123 Main St, NY, 10001",
> >   "credit_card_num": "4111 1111 1111 1111",
> >   "transaction_amount": -50.00,
> >   "currency_code": "USDD",
> >   "timestamp": "2026-10-08T14:32:00Z"
> > }
> > ```
> >
> > Janji sesi: mampu menyatakan **apa yang salah** pada event ini, **apa yang harus dihapus**, **apa yang harus ditolak**, dan **bagaimana mengotomasi keduanya**. Singkatnya: `ssn`, kartu kredit, nama, dan alamat adalah masalah **privasi/keamanan**; `currency_code = "USDD"` dan jumlah negatif tanpa tipe transaksi adalah masalah **kualitas**.
> >
> > ### Biaya Data Buruk
> >
> > - **Silent failures** — pipeline tidak crash, melainkan menghasilkan angka yang salah.
> > - **Compounding** — error di ingestion diwarisi setiap fitur dan model hilir; error data 1% di ingestion dapat menjadi **error model 30%** di hilir.
> > - **Garbage in, garbage out**, diperbesar oleh ML.
> > - **Persamaan reliabilitas: Reliability = Uptime x Data Quality.**
> > - **Uptime tidak cukup**: pipeline bisa 100% available namun tetap tidak andal. Contoh: feed dengan uptime 99,99% dan 5% kode mata uang tak valid tetap memiliki **tingkat record cacat 5%**.

> [!cornell] #### Summary
>
> Event **PayLend** memuat masalah privasi/keamanan (SSN, kartu kredit, nama, alamat) sekaligus kualitas (`USDD`, jumlah negatif tanpa tipe). Data buruk menyebabkan **kegagalan diam-diam** yang **berlipat ganda** hingga model (1% di ingestion bisa menjadi 30% error model). Karena **Reliability = Uptime x Data Quality**, uptime tinggi tidak menjamin pipeline andal.

> [!ad-libitum]- Additional Information
>
> #### Data SLI
>
> Slide menunjuk bahwa pekan berikutnya mengubah ini menjadi **data SLI** (mis. persentase record valid, freshness). Gagasan: perlakukan kualitas data seperti ketersediaan layanan, dengan target dan error budget.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil satu dataset publik, hitung persentase record yang melanggar tiga aturan sederhana (null, di luar rentang, duplikat), lalu hitung "reliability" gabungan.
>
> #### Bacaan Lanjutan
> - Google — *The SRE Workbook*, Bab 2-3 (SLI/SLO).
> - Huyen — *Designing Machine Learning Systems*, Bab 3.

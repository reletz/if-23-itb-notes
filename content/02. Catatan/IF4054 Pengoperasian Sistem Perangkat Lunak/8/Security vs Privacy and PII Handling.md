---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Security vs Privacy and PII Handling
>
> > ## Questions/Cues
> >
> > - Apa beda security dan privacy?
> > - Bagaimana metadata membantu menemukan PII?
> > - Apa kelebihan dan kekurangan masking, tokenization, encryption, dan deletion?
> > - Bagaimana Privacy by Design diterapkan pada event PayLend?
> > - Bagaimana masking dinamis dan audit akses bekerja?
> > - Bagaimana penyerang dapat melakukan re-identifikasi?
> >
> > ## Reference Points
> >
> > - IF4054 DataOps: Security, Quality & Privacy (Slides 22-30)
>
> > ### Security vs Privacy
> >
> > - **Security**: melindungi data dari akses, perubahan, dan kehilangan tak sah (**CIA triad**).
> > - **Privacy**: hak dan ekspektasi **orang yang datanya direkam**: tujuan, persetujuan (consent), minimisasi, retensi.
> > - Security tanpa privacy **mungkin**: Anda bisa menyimpan dengan aman data yang tak berhak dikumpulkan.
> > - Privacy tanpa security **tidak mungkin**: janji yang tak dapat ditegakkan.
> > - **PCI-DSS** adalah standar keamanan industri, bukan hukum privasi; **GDPR / UU PDP (Indonesia)** adalah hukum privasi.
> >
> > ### Metadata untuk Menemukan PII
> >
> > *Anda tidak dapat melindungi apa yang tidak dapat Anda identifikasi.* Empat komponen: **Business glossary** (makna `ssn`, `credit_card_num`), **Data catalog** (lokasi field di semua sistem), **Classification tags** (PII, PCI, Confidential, Public), dan **Policy engine** (menerapkan kontrol otomatis berdasarkan tag).
> >
> > ### Teknik Penanganan PII
> >
> > | Teknik | Deskripsi | Utilitas ML | Kepatuhan |
> > |---|---|---|---|
> > | **Masking** | Ganti dengan `***` | Merusak utilitas | Baik untuk tampilan |
> > | **Tokenization** | Ganti dengan token deterministik `tkn_abc` | **Mempertahankan** integritas referensial | Baik untuk analitik |
> > | **Encryption** | Perlindungan kriptografis | Butuh dekripsi untuk ML | Terbaik untuk data at-rest |
> > | **Deletion** | Hapus sepenuhnya | Tanpa data tak ada model | Terbaik untuk minimisasi |
> >
> > **Penting**: data yang dipseudonimkan **tetap data pribadi** menurut GDPR dan (setahu penulis slide) UU PDP. Tokenisasi mengurangi eksposur, **tidak menghapus kewajiban**.
> >
> > ### Privacy by Design di PayLend
> >
> > | Field | Mentah | Hasil di lake |
> > |---|---|---|
> > | `ssn` | `123-45-6789` | `tkn_8f7a9b2c41de` (token) |
> > | `credit_card_num` | PAN penuh | `**** **** **** 1111` |
> > | `full_name`, `home_address` | ada | **dihapus** |
> > | `currency_code` | `USDD` | **ditolak** ke karantina |
> > | `transaction_type` | hilang | **ditolak** ke karantina |
> >
> > Ringkas slide: **privasi diperbaiki dengan menghapus; kualitas diperbaiki dengan menolak; tidak ada yang diperbaiki dengan berharap.**
> >
> > ### Masking Dinamis dan Audit Akses
> >
> > Tabel yang sama menampilkan **tampilan berbeda sesuai peminta**: `FRAUD_INVESTIGATOR` melihat token penuh (tujuan terdokumentasi), sedangkan `ML_ENGINEER` dan `ANALYST` melihat `tkn_********` (least privilege; ML cukup `user_id` untuk join). Diimplementasikan lewat *masking policy* (sintaks gaya Snowflake; PostgreSQL, BigQuery, Databricks punya padanan). **Audit**: catat siapa membaca kolom sensitif apa, kapan, dengan role apa, dan beri alert pada anomali.
> >
> > ### Sudut Pandang Penyerang
> >
> > - **Quasi-identifier**: `timestamp` + `transaction_amount` + `card_last4`, digabung dengan catatan merchant.
> > - **Linkage**: token yang stabil memungkinkan penyerang mengikuti riwayat satu orang lintas dataset.
> > - **Token lemah**: hash SSN tanpa salt dapat di-brute-force dalam menit.
> > - **Bukti yang bocor**: laporan validasi gagal yang mencetak nilai mentah.
> >
> > *Data poisoning* adalah masalah kualitas **dan** keamanan; gerbang validasi juga merupakan kontrol keamanan.


> [!cornell] #### Summary
>
> **Security** (CIA) melindungi data, sedangkan **privacy** menyangkut hak subjek data (tujuan, consent, minimisasi, retensi); privacy tak mungkin tanpa security, tetapi sebaliknya mungkin. **Metadata** (glossary, catalog, tag, policy engine) memungkinkan penemuan PII. Teknik **masking, tokenization, encryption, deletion** punya trade-off utilitas ML vs kepatuhan; **tokenisasi** adalah titik tengah yang menjaga utilitas, namun data terpseudonim tetap data pribadi. Masking dinamis berbasis role dan audit akses menegakkan least privilege, dan penyerang dapat melakukan re-identifikasi lewat quasi-identifier, linkage, dan token lemah.

> [!ad-libitum]- Additional Information
>
> #### Token Berkunci dan Privasi Diferensial
>
> Gunakan **HMAC dengan kunci dari KMS** (bukan hash polos) untuk tokenisasi deterministik. Untuk analitik agregat, **differential privacy** dan **k-anonymity** memberi jaminan formal terhadap re-identifikasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil dataset dengan quasi-identifier (usia, kode pos, tanggal) dan ukur k-anonymity-nya; bandingkan sebelum dan sesudah generalisasi.
>
> #### Bacaan Lanjutan
> - UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.
> - NIST SP 800-188 — *De-Identifying Government Datasets*.

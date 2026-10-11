---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Chinese Wall, Separation of Privileges, dan Conflict of Interest
>
> > ## Questions/Cues
> >
> > - Apa itu kebijakan Chinese Wall dan untuk lingkungan apa?
> > - Bagaimana aturan baca dan tulis Chinese Wall?
> > - Apa itu sanitization?
> > - Apa beda separation of privileges statis dan dinamis?
> > - Apa itu conflict of interest (COI)?
> >
> > ## Reference Points
> >
> > - IF4033 Access Control (Slides 37-38)
> > - IF4033 Access Control (Slides 55-57)
>
> > ### Conflict of Interest (COI)
> >
> > Setting: firma konsultan (bursa saham, bank investasi, firma hukum). Seorang konsultan mewakili dua klien yang kepentingannya bertentangan; ia bisa membantu satu klien dengan merugikan yang lain. Norma (hukum, regulasi, etika) melarang eksploitasi COI, dan COI dapat **kedaluwarsa** setelah waktu tertentu (hari, tahun, atau tidak pernah).
> >
> > ### Kebijakan Chinese Wall
> >
> > Kebijakan untuk perusahaan konsultasi: **jangan beri akses ke data perusahaan yang bersaing** dengan perusahaan yang sedang dikonsultasikan. Aturannya bersifat **dinamis** (tergantung riwayat akses).
> >
> > - **Objek**: tiap objek O diberi tag (x(O), y(O)): y(O) = dataset perusahaannya; x(O) = himpunan perusahaan yang berkonflik.
> > - **Simple security property**: S boleh membaca O jika untuk setiap O' yang pernah diakses S, y(O') ∉ x(O).
> > - **\*-property**: S boleh menulis O jika S tidak punya akses baca ke O' dengan y(O') ≠ y(O) dan x(O') ≠ {}, kecuali data telah disanitasi.
> > - **Sanitization**: *trusted subject* menghapus data rahasia dan mengosongkan x(O) := {}.
> >
> > ### Separation of Privileges
> >
> > Contoh: auditor vs manajer. Dua bentuk:
> >
> > | Bentuk | Cara | Sifat |
> > |---|---|---|
> > | **Statis** | Administrator memastikan tak seorang pun memegang terlalu banyak privilege | Kaku |
> > | **Dinamis** | Sistem memeriksa agar tak seorang pun memegang privilege yang tidak kompatibel secara bersamaan | Fleksibel, tetapi sulit jika privilege melekat pada user; digeneralisasi menjadi *dynamic loading of privileges* |
> >
> > ### Least Privilege
> >
> > Saltzer & Schroeder: setiap program dan pengguna beroperasi dengan privilege minimum yang diperlukan, memberi **keamanan lebih baik** dan **stabilitas lebih baik** (lihat juga [[Prinsip Desain Keamanan - Defense in Depth hingga Fail-Secure]]).
> >
> > ```mermaid
> > flowchart LR
> >     U["Konsultan membaca<br/>data Bank A"] --> X{"Coba baca<br/>data Bank B (pesaing)?"}
> >     X -->|"ya"| D["Ditolak: konflik"]
> >     X -->|"tidak (Perusahaan C)"| OK["Diizinkan"]
> > ```

> [!cornell] #### Summary
>
> **Chinese Wall** mencegah konflik kepentingan dengan memblokir akses ke data perusahaan pesaing berdasarkan riwayat akses (simple security dan \*-property), dengan **sanitization** untuk membersihkan data. **Separation of privileges** (statis atau dinamis) dan **least privilege** membatasi kombinasi hak yang dapat disalahgunakan.

> [!ad-libitum]- Additional Information
>
> #### Model Brewer-Nash
>
> Chinese Wall diformalkan oleh **Brewer & Nash (1989)** dan merupakan contoh kebijakan MAC yang bergantung pada keadaan (*stateful*). Prinsip serupa muncul sebagai *segregation of duties* pada ISO 27002 5.3 ([[Kerangka Countermeasure - NIST CSF dan ISO 27002]]).
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan simulator Chinese Wall kecil dengan tiga dataset perusahaan dan dua kelas konflik, lalu uji urutan akses yang diizinkan/ditolak.
>
> #### Bacaan Lanjutan
> - Brewer & Nash (1989). *The Chinese Wall Security Policy*.

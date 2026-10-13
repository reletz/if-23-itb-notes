---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Attack Tree
>
> > ## Questions/Cues
> >
> > - Apa itu attack tree dan apa arti root, node, dan path?
> > - Apa beda AND-decomposition dan OR-decomposition?
> > - Bagaimana attack tree untuk intrusi ke akun root UNIX?
> > - Bagaimana attack tree membantu memilih countermeasure?
> >
> > ## Reference Points
> >
> > - IF5161 — W03 Threat Analysis, bagian "Attack Tree", "AND/OR decomposition", "The attack tree for Intrusion in a system"
>
> > ### Konsep
> >
> > **Attack tree** adalah alat untuk mengevaluasi keamanan sistem berdasarkan beragam ancaman. **Root** pohon merepresentasikan **peristiwa keamanan yang berpotensi merusak aset** (tujuan penyerang). Setiap pohon menjabarkan cara penyerang membuat peristiwa itu terjadi; **setiap jalur dari daun ke root adalah satu serangan unik**. Sebuah sistem dapat memiliki "hutan" banyak pohon.
> >
> > Sebuah node didekomposisi dengan dua cara:
> >
> > | Dekomposisi | Arti | Analogi |
> > |---|---|---|
> > | **AND** | **Semua** sub-goal G1...GN harus tercapai agar G0 tercapai | Butuh kunci **dan** kode alarm |
> > | **OR** | **Salah satu** sub-goal sudah cukup | Bisa lewat pintu **atau** jendela |
> >
> > ### Contoh: Intrusi ke Akun Root UNIX
> >
> > Asumsi: situs tidak memakai SSL, VPN, TLS, atau one-time password. Maka ada dua opsi (OR): **replay attack** (tidak butuh username/password), atau **mendapatkan identitas akun**. Untuk identitas akun dibutuhkan **account identifier AND password**. Identifier sudah diketahui (`root`). Password bisa didapat lewat salah satu (OR): **sniffing, guessing, social engineering, atau brute force**.
> >
> > ```mermaid
> > flowchart TB
> >     G0["Intrusi ke akun root"]
> >     G0 --- OR1{{"OR"}}
> >     OR1 --> R["Replay attack"]
> >     OR1 --> ID["Dapatkan identitas akun"]
> >     ID --- AND1{{"AND"}}
> >     AND1 --> AI["Account identifier (root)"]
> >     AND1 --> PW["Dapatkan password"]
> >     PW --- OR2{{"OR"}}
> >     OR2 --> SN["Password sniffing"]
> >     OR2 --> GU["Password guessing"]
> >     OR2 --> SE["Social engineering"]
> >     OR2 --> BF["Brute force"]
> > ```
> >
> > Skenario intrusi dapat ditulis sebagai himpunan jalur: `(Replay Attack)`, `(Account-identifier, sniff-Password)`, `(Account-identifier, guessed-Password)`, `(Account-identifier, social-engineered-Password)`, `(Account-identifier, cracked-Password-through-brute-force)` — lima serangan unik.
> >
> > ### Manfaat
> >
> > - **Simulasi** berbagai skenario ancaman.
> > - Setelah skenario diketahui, tentukan **prosedur untuk menangkal** tiap jalur.
> > - **Mengurangi attack surface** untuk menghilangkan sebagian ancaman sekaligus. Contoh: replay attack dieliminasi dengan **SSL**, sehingga seluruh cabang itu tertutup.
> >
> > Kombinasikan dengan [[Attack Surface dan Reduksinya]]: surface menunjukkan *area yang bisa diserang*, tree menunjukkan *cara menyerangnya*.

> [!cornell] #### Summary
>
> **Attack tree** menguraikan tujuan penyerang (root) menjadi sub-goal melalui **AND** (semua wajib) dan **OR** (salah satu cukup); setiap jalur adalah satu serangan unik. Pada contoh intrusi root UNIX, ada lima jalur serangan dan satu kontrol (SSL) mampu menutup cabang replay. Attack tree membantu **memilih countermeasure** secara terarah dan mengurangi attack surface.

> [!ad-libitum]- Additional Information
>
> #### Pemberian Nilai pada Node
> Attack tree sering dilengkapi atribut node: **biaya, kesulitan, kemungkinan terdeteksi, skill yang dibutuhkan**. Dengan aturan: OR mengambil nilai minimum (penyerang memilih jalur termurah), AND menjumlahkan. Hasilnya adalah jalur serangan paling murah yang sebaiknya ditutup lebih dulu. Konsep ini diperkenalkan Bruce Schneier (1999).
>
> #### Proyek Eksplorasi Mandiri
> 1. Gambar attack tree untuk tujuan "mencuri data pelanggan dari aplikasi e-commerce" dengan sedikitnya 3 level, beri biaya per daun, dan temukan jalur termurah.
> 2. Tandai kontrol yang menutup jalur itu dan hitung ulang.
>
> #### Bacaan Lanjutan
> - Schneier, *Attack Trees* (Dr. Dobb's Journal, 1999)
> - Mauw & Oostdijk, *Foundations of Attack Trees*

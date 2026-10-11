---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Discretionary Access Control dan Access Control Matrix
>
> > ## Questions/Cues
> >
> > - Apa intuisi dan lingkungan asal DAC?
> > - Apa itu access control matrix dan bagaimana diimplementasikan?
> > - Apa beda ACL dan capability?
> > - Apa itu safety problem?
> > - Mengapa trojan horse menjadi kelemahan DAC?
> >
> > ## Reference Points
> >
> > - IF4033 Access Control (Slides 9-22)
>
> > ### Intuisi DAC
> >
> > Pada **Discretionary Access Control**, **pemilik resource yang menentukan** siapa boleh mengakses. Lingkungan asalnya sistem operasi akhir 1960-an (Lampson, 1971): pengguna satu komunitas, tujuannya melindungi data dari **kesalahan pengguna lain** (mis. `cd /; rm -fr *`). Fitur: **ownership** (pembuat objek memiliki semua hak) dan **delegation** (hak dapat didelegasikan, bahkan diteruskan lagi).
> >
> > ### Access Control Matrix
> >
> > Otorisasi sistem berupa tiga komponen **(S, O, A)**: himpunan subject S, objek O, dan matriks **A[s,o]** = himpunan privilege s atas o. Operasi primitif: *enter/delete p in A[s,o]*, *create/destroy subject*, *create/destroy object*. Contoh:
> >
> > | | Iraq.jpg | Crap.doc | Bomb.exe | Press.txt |
> > |---|---|---|---|---|
> > | George | read | write | own, execute | |
> > | Tony | | write, read | execute | |
> > | Silvio | read | write, read | | |
> >
> > ### Mekanisme Implementasi
> >
> > Matriks sangat **jarang (sparse)**, sehingga disimpan dalam bentuk:
> >
> > - **Authorization table**: daftar tuple (s, o, a) non-kosong; lazim di DBMS (views, tabel).
> > - **ACL**: diindeks per objek (siapa boleh apa pada objek ini). Sulit mengetahui *apa yang boleh dibaca subjek S*. Dipakai UNIX/Windows NT/router Cisco.
> > - **Capabilities**: diindeks per subjek (apa yang dikendalikan subjek). Sulit mengetahui *siapa yang boleh membaca objek O*.
> >
> > Perintah (grant, remove, create, delete) dieksekusi sebagai **transaksi**: jika satu langkah gagal, seluruh perintah gagal.
> >
> > ### Safety Problem
> >
> > Pemilik mendelegasikan hak, penerima dapat mendelegasikan lagi: **apakah hak bisa bocor** ke pihak yang tidak berwenang? Secara formal: dari keadaan awal Minit, adakah urutan perintah yang mencapai keadaan buruk Mbad? Masalah ini **undecidable secara umum**, tetapi **decidable** jika tidak dapat membuat objek/subjek (ruang keadaan finite) atau jika perintah *mono-operational*.
> >
> > ### Trojan Horse
> >
> > DAC mempercayai pengguna, tetapi bukan **program mereka**. George tidak akan membocorkan Iraq.jpg ke Tony; namun George memakai `xv.exe` yang telah dimodifikasi Tony: ia menampilkan gambar dan menulis isinya ke Crap.doc yang bisa dibaca Tony. Karena program berjalan dengan hak George, DAC tidak mencegahnya. Diperlukan klasifikasi oleh sistem: **MAC**.

> [!cornell] #### Summary
>
> **DAC** menyerahkan keputusan akses kepada pemilik (ownership, delegation) dan dimodelkan oleh **access control matrix** yang diimplementasikan sebagai **authorization table, ACL (per objek), atau capability (per subjek)**. **Safety problem** (kebocoran hak lewat delegasi) undecidable secara umum. DAC rentan **trojan horse** karena program berjalan dengan hak pengguna, sehingga dibutuhkan kontrol wajib (MAC).

> [!ad-libitum]- Additional Information
>
> #### ACL vs Capability di Praktik
>
> Token OAuth, file descriptor UNIX, dan *signed URL* adalah bentuk capability; ACL ada pada izin file dan IAM policy. Capability mengurangi masalah *confused deputy*.
>
> #### Proyek Eksplorasi Mandiri
> 1. Modelkan matriks akses sebuah proyek kelompok dan hitung dengan skrip apakah ada jalur delegasi yang membocorkan hak tulis.
>
> #### Bacaan Lanjutan
> - Lampson, B. (1971). *Protection*.
> - Harrison, Ruzzo, Ullman (1976). *Protection in Operating Systems*.

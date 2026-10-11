---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Prinsip Desain Keamanan - Defense in Depth hingga Fail-Secure
>
> > ## Questions/Cues
> >
> > - Apa itu defense in depth?
> > - Mengapa tidak boleh "menciptakan ulang roda" dan mengandalkan security by obscurity?
> > - Apa isi prinsip least privilege (Saltzer & Schroeder)?
> > - Apa beda secure by default dan fail-secure?
> > - Apa itu separation of duties?
> >
> > ## Reference Points
> >
> > - IF4033 Security Countermeasure (Slides 22-28)
>
> > ### Defense in Depth
> >
> > Strategi memakai **banyak lapis** pengukuran keamanan untuk melindungi aset: bila satu control gagal, masih ada control lain. Contoh pada login: password kuat, **OTP**, lalu **audit trail**.
> >
> > ### Don't Reinvent the Wheel
> >
> > Countermeasure baru dapat memperbesar *attack surface*, maka dorong **penggunaan ulang** komponen yang sudah teruji. Contoh: memakai library kripto seperti OpenSSL atau Bouncy Castle alih-alih membuat sendiri.
> >
> > ### Open Design (Kerckhoffs)
> >
> > Detail implementasi tidak boleh bergantung pada kerahasiaan desain. Hindari *security by obscurity*. Menurut **prinsip Kerckhoffs**, keamanan sistem tidak boleh bergantung pada kerahasiaan detail desainnya; yang dirahasiakan adalah kunci/implementasi. Contoh: OAuth dan enkripsi TLS desainnya terbuka.
> >
> > ### Least Privilege
> >
> > Saltzer dan Schroeder: *setiap program dan pengguna harus beroperasi dengan himpunan hak akses minimum yang diperlukan untuk menyelesaikan tugas.* Manfaat: **keamanan lebih baik** (kerentanan lebih sulit dieksploitasi) dan **stabilitas lebih baik** (bug atau kesalahan manusia berdampak kecil). Contoh: menjalankan server dengan user "biasa".
> >
> > ### Separation of Duties/Privileges
> >
> > Penyelesaian satu tugas bergantung pada dua kondisi atau lebih yang masing-masing tidak cukup, dan dilakukan **pihak berbeda** untuk mencegah konflik kepentingan atau kolusi. Contoh: *mengusulkan* dan *menyetujui* pinjaman oleh agen berbeda; shell process dan reference monitor dimiliki owner proses berbeda.
> >
> > ### Secure by Default
> >
> > Sistem dikirim dengan **konfigurasi aman sejak awal**: tolak semua akses kecuali yang diizinkan, password Wi-Fi router yang kuat dari pabrik, firewall menyala setelah instalasi.
> >
> > ### Fail-Secure
> >
> > Adaptasi prinsip *fail-safe*: saat terjadi error atau kegagalan (akibat serangan maupun cacat desain), sistem harus **jatuh ke keadaan aman**. Contoh: subjek tidak dapat mengambil objek bila authorization server gagal.
> >
> > ```mermaid
> > flowchart TB
> >     P["Prinsip Desain Aman"] --> D1["Defense in Depth"]
> >     P --> D2["Open Design"]
> >     P --> D3["Least Privilege"]
> >     P --> D4["Separation of Duties"]
> >     P --> D5["Secure by Default"]
> >     P --> D6["Fail-Secure"]
> >     P --> D7["Reuse komponen teruji"]
> > ```

> [!cornell] #### Summary
>
> Tujuh prinsip desain: **defense in depth** (banyak lapis), **jangan menciptakan ulang roda** (pakai komponen teruji), **open design** (Kerckhoffs: jangan bergantung pada obscurity), **least privilege** (hak minimum), **separation of duties** (tugas dipecah antar pihak), **secure by default** (konfigurasi awal aman), dan **fail-secure** (gagal ke keadaan aman). Prinsip ini diterapkan lintas sistem, dari aplikasi hingga arsitektur [[Prinsip Cloud-Native - Lima Pilar Arsitektur Aman]].

> [!ad-libitum]- Additional Information
>
> #### Prinsip Saltzer-Schroeder Lainnya
>
> Daftar asli (1975) juga memuat *economy of mechanism*, *complete mediation*, *least common mechanism*, dan *psychological acceptability*. *Fail-safe defaults* pada daftar itu sama dengan secure by default.
>
> #### Proyek Eksplorasi Mandiri
> 1. Audit sebuah konfigurasi server (mis. nginx) terhadap tujuh prinsip ini dan tulis daftar pelanggarannya.
>
> #### Bacaan Lanjutan
> - Saltzer & Schroeder (1975). *The Protection of Information in Computer Systems*.
> - Kerckhoffs (1883). *La cryptographie militaire*.

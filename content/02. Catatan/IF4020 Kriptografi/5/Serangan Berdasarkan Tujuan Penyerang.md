---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Serangan Berdasarkan Tujuan Penyerang
>
> > ## Questions/Cues
> >
> > - Apa lima jenis serangan berdasarkan tujuan yang ingin dicapai penyerang?
> > - Apa beda key-recovery dan plaintext-recovery attack?
> > - Apa itu distinguishing attack dan mengapa penting bagi cipher modern?
> > - Apa itu forgery attack, dan mengapa relevan untuk MAC dan tanda tangan digital?
> > - Mengapa replay attack tidak perlu memecahkan enkripsi, dan bagaimana mencegahnya?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Serangan pada Kriptografi (Slides 22-28)
>
> > ### Klasifikasi Berdasarkan Tujuan
> >
> > Selain berdasarkan informasi yang dimiliki ([[Serangan Berdasarkan Informasi yang Dimiliki]]), serangan dapat dikelompokkan menurut **hasil yang ingin dicapai penyerang**:
> >
> > ```mermaid
> > flowchart TD
> >     T["Tujuan penyerang"]
> >     T --> K["Key-Recovery<br/>dapatkan kunci K"]
> >     T --> P["Plaintext-Recovery<br/>dapatkan plainteks P"]
> >     T --> D["Distinguishing<br/>bedakan output cipher dari acak"]
> >     T --> F["Forgery<br/>buat pesan palsu yang diterima"]
> >     T --> R["Replay<br/>ulang pesan sah lama"]
> > ```
> >
> > ### 1. Key-Recovery Attack
> >
> > **Tujuan: memperoleh kunci** yang dipakai untuk enkripsi/dekripsi. Untuk sistem $C = E_K(P)$, penyerang berusaha menemukan $K$. Contoh: cipher dengan kunci 16 karakter diserang lewat pencarian kunci **brute force**:
> >
> > $$K_1 \to D(C) = P_1,\quad K_2 \to D(C) = P_2,\quad K_3 \to D(C) = P_3, \dots$$
> >
> > sampai ditemukan kunci yang menghasilkan plainteks yang **masuk akal**. Ini serangan terkuat karena dengan $K$ seluruh pesan (masa lalu dan depan) terbuka.
> >
> > ### 2. Plaintext-Recovery Attack
> >
> > **Tujuan: memperoleh plainteks**, tidak harus kuncinya. Contoh: cipherteks `C = XQZ...` dianalisis strukturnya dan penyerang menyimpulkan pesannya kemungkinan `MEET AT THE STATION` tanpa mengetahui kunci. Dalam banyak situasi, mengetahui plainteks tertentu **sudah cukup** bagi penyerang, misalnya bila pesannya berisi informasi penting.
> >
> > ### 3. Distinguishing Attack
> >
> > **Tujuan: menentukan apakah suatu data keluaran algoritma kriptografi atau benar-benar acak.** Bila secara statistik penyerang dapat membedakannya dengan probabilitas **signifikan lebih baik daripada tebakan acak**, ada distinguishing attack.
> >
> > Contoh: cipher menghasilkan `101010101010...`. Pola itu jelas tidak acak. Distinguisher sederhana: jika jumlah 0 dan 1 sangat tidak seimbang atau ada pola tertentu, kemungkinan data berasal dari cipher itu. **Cipher modern dirancang agar kelemahan semacam ini tidak mudah ditemukan**: outputnya harus tak terbedakan dari acak (*pseudorandom*), lihat juga entropi cipherteks di [[Teori Informasi dan Entropi]].
> >
> > ### 4. Forgery Attack
> >
> > **Tujuan: membuat pesan palsu yang diterima sebagai pesan sah.** Sangat penting pada sistem dengan **MAC** (*message authentication code*) atau **tanda tangan digital** (dibahas pada materi berikutnya).
> >
> > Skenario: Alice mengirim **Pesan + MAC** ke Bob; Bob memeriksa MAC untuk memastikan pesan berasal dari pihak yang memegang kunci. Eve ingin membuat **pesan palsu + MAC yang valid** sehingga Bob menganggapnya autentik.
> >
> > ### 5. Replay Attack
> >
> > **Tujuan: memakai kembali pesan sah yang pernah dikirim** untuk memicu suatu tindakan terjadi lagi. Yang menarik: **penyerang tidak perlu memecahkan enkripsi**, cukup merekam dan mengirim ulang (mis. perintah transfer atau token login).
> >
> > **Pencegahan**: buat tiap pesan unik/berurutan dengan **nonce**, **timestamp**, atau **sequence number**. Contoh: pesan bernomor 101, 102, 103; jika penyerang mengirim ulang pesan 101 setelah sistem menerima 103, sistem menolak karena nomornya **kedaluwarsa**.
> >
> > ```mermaid
> > sequenceDiagram
> >     participant A as Alice
> >     participant E as Eve
> >     participant B as Bob
> >     A->>B: Message 101
> >     A->>B: Message 102
> >     A->>B: Message 103
> >     E->>B: (replay) Message 101
> >     B-->>E: Ditolak: nomor 101 sudah kedaluwarsa (terakhir 103)
> > ```

> [!cornell] #### Summary
>
> Berdasarkan **tujuan penyerang**, ada lima serangan: **key-recovery** (mendapatkan kunci $K$, mis. brute force), **plaintext-recovery** (mendapatkan plainteks tanpa harus kunci), **distinguishing** (membedakan output cipher dari data acak; cipher modern harus tak terbedakan), **forgery** (membuat pesan palsu + MAC/tanda tangan valid agar diterima sebagai autentik), dan **replay** (mengirim ulang pesan sah lama tanpa memecahkan enkripsi). Replay dicegah dengan **nonce, timestamp, atau sequence number**. Serangan yang tidak menyasar isi cipherteks tetapi keterlibatan penyerang dalam komunikasi dan kebocoran fisik dibahas di [[Serangan Pasif, Aktif, dan Side-Channel]].

> [!ad-libitum]- Additional Information
>
> #### Hubungan dengan Layanan Kriptografi
>
> Tiap tujuan menyasar layanan yang berbeda ([[Definisi dan Layanan Kriptografi]]): key/plaintext-recovery melanggar **confidentiality**; forgery melanggar **integrity/authentication**; replay melanggar **freshness** (bagian dari authentication); distinguishing adalah ukuran kualitas primitif itu sendiri. Kegagalan forgery pada MAC dirumuskan sebagai *existential unforgeability under chosen-message attack* (EUF-CMA).
>
> #### Kasus Nyata
>
> - **Replay**: sinyal remote mobil (*keyless entry*) yang direkam dan diputar ulang; token sesi yang dicuri; transaksi ganda karena tidak ada nonce.
> - **Forgery**: pada *length-extension attack* `H(key || msg)` dengan MD5/SHA-1, penyerang bisa memalsukan MAC tanpa kunci, itulah alasan dipakai HMAC.
> - **Distinguishing**: bias awal keystream RC4 (byte kedua condong ke 0) dulu dipakai membedakan RC4 dari acak dan berujung pada serangan pemulihan plainteks pada WEP/TLS.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis distinguisher sederhana (uji frekuensi bit + runs test) dan uji terhadap output Caesar, Vigenère, OTP XOR, dan `/dev/urandom`.
> 2. Buat server toy dengan perintah bertoken tanpa nonce, demonstrasikan replay, lalu perbaiki dengan sequence number dan jendela timestamp.
>
> #### Bacaan Lanjutan
>
> - William Stallings, *Cryptography and Network Security*, Bab 1 (serangan replay).
> - Katz & Lindell, *Introduction to Modern Cryptography*, Bab 4 (MAC dan forgery).

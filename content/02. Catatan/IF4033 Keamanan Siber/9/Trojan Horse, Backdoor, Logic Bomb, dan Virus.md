---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Trojan Horse, Backdoor, Logic Bomb, dan Virus
>
> > ## Questions/Cues
> >
> > - Apa itu trojan horse dan bagaimana ia bekerja?
> > - Apa beda backdoor/trapdoor dan logic bomb?
> > - Bagaimana virus bereplikasi?
> > - Apa contoh logic bomb terkenal?
> >
> > ## Reference Points
> >
> > - IF4033 Malware (Slides 21-26)
>
> > ### Trojan Horse
> >
> > Perangkat lunak yang tampak melakukan fungsi yang diinginkan pengguna sebelum dijalankan atau dipasang, tetapi (mungkin di samping fungsi yang diharapkan) **mencuri informasi atau merusak sistem**. Pengguna **tertipu menjalankannya**: ia melihat perilaku terbuka yang diharapkan, sementara aksi jahat dilakukan diam-diam **dengan otorisasi pengguna**.
> >
> > Contoh dari slide: penyerang menaruh file `ls` palsu di direktori korban yang berisi `cp /bin/sh /tmp/.xxsh; chmod u+s,o+x /tmp/.xxsh; rm ./ls; ls $*`. Ketika korban menjalankan `ls`, shell ber-**setuid** tersalin, lalu skrip menghapus dirinya dan menjalankan `ls` asli sehingga korban tidak curiga.
> >
> > ### Trapdoor / Backdoor
> >
> > **Titik masuk rahasia** ke sistem: identifier atau password khusus yang **melewati prosedur keamanan normal**. Lazim dipakai developer (untuk debugging) dan dapat disisipkan bahkan di **compiler**.
> >
> > ### Logic Bomb
> >
> > Tertanam dalam program sah dan **aktif saat kondisi tertentu** terpenuhi: ada/tidaknya file, tanggal/waktu tertentu, atau pengguna tertentu. Saat terpicu, biasanya merusak: memodifikasi/menghapus file atau disk.
> >
> > **Contoh**: insiden **Trans-Siberian Pipeline (1982)**. Operasi KGB mencuri rencana sistem kontrol dari perusahaan Kanada; CIA yang diperingatkan lewat *Farewell Dossier* meminta perusahaan menyisipkan logic bomb sebagai sabotase, yang berujung pada "ledakan non-nuklir paling monumental yang pernah terlihat dari luar angkasa".
> >
> > ### Virus
> >
> > Menempel pada **host** (biasanya program) dan **mereplikasi diri**; mengubah kode normal menjadi versi "terinfeksi" dan beroperasi saat kode tersebut dieksekusi. Pseudo-code:
> >
> > ```
> > if spread-condition then
> >   for each target file
> >     if not infected then alter to include virus
> > perform malicious action
> > execute normal program
> > ```
> >
> > ```mermaid
> > flowchart LR
> >     U["Pengguna menjalankan<br/>program terinfeksi"] --> S["Virus menyebar ke<br/>file lain"] --> P["Aksi jahat<br/>(payload)"] --> N["Menjalankan program asli"]
> > ```

> [!cornell] #### Summary
>
> **Trojan horse** tampak berguna tetapi secara tersembunyi berbuat jahat dengan otorisasi korban; **backdoor** adalah pintu masuk rahasia yang menghindari kontrol keamanan; **logic bomb** terpicu kondisi tertentu (contoh pipeline Trans-Siberia 1982); **virus** menempel pada host dan mereplikasi diri saat host dijalankan, lalu melakukan aksi jahat dan menjalankan program asli agar tidak mencurigakan.

> [!ad-libitum]- Additional Information
>
> #### Backdoor pada Supply Chain
>
> Kasus **XZ Utils (2024)** menunjukkan backdoor yang disisipkan melalui kontributor pemelihara pada library kompresi, mirip konsep "backdoor di compiler" (Ken Thompson, *Reflections on Trusting Trust*). Pertahanan: SBOM, reproducible builds, dan review kode ([[State, Provisioning, dan Supply Chain pada Cloud-Native]]).
>
> #### Proyek Eksplorasi Mandiri
> 1. Baca *Reflections on Trusting Trust* dan tuliskan ringkasan satu halaman tentang mengapa backdoor di compiler sulit dideteksi.
>
> #### Bacaan Lanjutan
> - Thompson, K. (1984). *Reflections on Trusting Trust*.
> - Reed, T. *At the Abyss* (kisah insiden pipeline 1982).

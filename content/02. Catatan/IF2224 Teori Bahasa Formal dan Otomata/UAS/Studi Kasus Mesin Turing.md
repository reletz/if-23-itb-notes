---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Studi Kasus dan Trace Mesin Turing (Bagian 2)
> 
> > ## Questions/Cues
> >
> > - Strategi $\{0^n 1^n\}$  
> >     
> > - Definisi State
> >     
> > - Logika Transisi
> >     
> > - Tabel Transisi
> >     
> > - Trace Eksekusi
> >     
> > - Penanganan Reject
> >     
> >
> > ## Reference Points
> >
> > - Slide 14_2025: Hal 12 - 15
> >     
> 
> > ### 1. Strategi Pengenalan Bahasa $\{0^n 1^n\}$  
> >
> > Mesin Turing mengenali bahasa ini dengan melakukan pemetaan korespondensi satu-ke-satu antara simbol '0' dan '1'.
> > 
> > Langkah-langkah operasional:
> >
> > 1. Mencari simbol '0' paling kiri yang belum diproses, lalu mengubahnya menjadi simbol penanda 'X'.
> >     
> > 2. Bergerak ke kanan melewati sisa '0' dan simbol 'Y' untuk menemukan '1' paling kiri yang belum diproses.
> >     
> > 3. Mengubah '1' tersebut menjadi simbol penanda 'Y'.
> >     
> > 4. Bergerak kembali ke kiri hingga menemukan simbol 'X' terakhir untuk mencari '0' berikutnya.
> >     
> > 5. Mengulangi siklus hingga semua '0' dan '1' telah ditandai.
> >     
> >
> > ### 2. Definisi State dalam Mesin $\{0^n 1^n\}$  
> >
> > - $q_0$ **(Start/Search 0):** Mencari simbol '0'. Jika menemukan 'Y', beralih ke mode pengecekan akhir ($q_3$).
> >     
> > - $q_1$ **(Search 1):** Bergerak ke kanan melewati '0' atau 'Y' untuk mencari pasangan '1'.
> >     
> > - $q_2$ **(Return):** Bergerak ke kiri melewati '0' atau 'Y' untuk kembali ke posisi 'X' terakhir.
> >     
> > - $q_3$ **(Check Final):** Memastikan tidak ada lagi simbol '1' yang tersisa setelah semua '0' habis.
> >     
> > - $q_4$ **(Accept):** State akhir yang menandakan string diterima.
> >     
> >
> > ### 3. Logika Transisi Utama
> >
> > - $\delta(q_0, 0) = (q_1, X, R)$: Menandai '0' dengan 'X', mulai mencari '1'.
> >     
> > - $\delta(q_1, 1) = (q_2, Y, L)$: Menandai '1' dengan 'Y', mulai kembali ke kiri.
> >     
> > - $\delta(q_2, X) = (q_0, X, R)$: Menemukan batas kiri proses, kembali ke state awal untuk iterasi berikutnya.
> >     
> > - $\delta(q_0, Y) = (q_3, Y, R)$: Semua '0' sudah ditandai, verifikasi sisa sel.
> >     
> > - $\delta(q_3, B) = (q_4, B, R)$: Menemukan simbol Blank tanpa ada '1' tersisa, string diterima.
> >     
> >
> > ### 4. Trace Komputasi String "0011"
> >
> > Proses transisi konfigurasi (ID):
> >
> > 1. $q_0 0011$ (Start)
> >     
> > 2. $X q_1 011$ (0 pertama jadi X)
> >     
> > 3. $X 0 q_1 11$ (Lewati 0)
> >     
> > 4. $X q_2 0 Y 1$ (1 pertama jadi Y, balik kiri)
> >     
> > 5. $q_2 X 0 Y 1 \vdash X q_0 0 Y 1$ (Kembali ke posisi start)
> >     
> > 6. $X X q_1 Y 1 \vdash X X Y q_1 1$ (0 kedua jadi X, lewati Y)
> >     
> > 7. $X X q_2 Y Y \vdash X q_2 X Y Y \vdash X X q_0 Y Y$ (1 kedua jadi Y, balik kiri)
> >     
> > 8. $X X Y q_3 Y \vdash X X Y Y q_3 B$ (Cek akhir, semua Y dilewati)
> >     
> > 9. $X X Y Y B q_4$ (**ACCEPT**)
> >     

> [!cornell] #### Summary
> 
> Pengoperasian MT untuk bahasa $\{0^n 1^n\}$ dilakukan dengan metode **penandaan simbol secara berpasangan**. Simbol '0' diubah menjadi 'X' dan '1' diubah menjadi 'Y'. Mesin bergerak bolak-balik (zig-zag) untuk memastikan setiap '0' memiliki tepat satu pasangan '1'. State mesin secara spesifik mengatur kapan harus mencari, kapan harus kembali, dan kapan harus melakukan verifikasi akhir sebelum mencapai **final state (**$q_4$**)**.

> [!ad-libitum]- Additional Information
> 
> #### Penanganan Kesalahan (Reject)
> 
> Mesin Turing akan berhenti dan menolak (reject) jika:
> 
> 1. Di state $q_1$, mesin menemukan simbol Blank ($B$) sebelum menemukan simbol '1' (jumlah '0' lebih banyak).
>     
> 2. Di state $q_3$, mesin menemukan simbol '1' (jumlah '1' lebih banyak).
>     
> 3. Menemukan urutan simbol yang salah (misal '1' muncul sebelum '0' pada awal proses).
>     
> 
> #### Diagram Transisi
> 
> Perlu diperhatikan bahwa pada diagram transisi, _self-loop_ pada $q_1$ untuk simbol $(0/0, R)$ dan $(Y/Y, R)$ sangat penting agar head bisa melompati simbol-simbol yang sudah diproses atau simbol sejenis untuk mencapai target di ujung kanan.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Slide 14_2025 IF 2124 ITB (Hal 12-15).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa diperlukan state $q_3$ dalam desain MT $\{0^n 1^n\}$?</strong></summary>
> 
> Untuk memastikan bahwa setelah semua '0' habis diubah menjadi 'X', tidak ada lagi simbol '1' yang tersisa di sebelah kanan simbol 'Y'.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa fungsi simbol 'X' dan 'Y' dalam komputasi ini?</strong></summary>
> 
> Sebagai penanda (markers) bahwa simbol input tersebut sudah diproses/dihitung, sehingga mesin tidak memproses simbol yang sama berulang kali.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa arah pergerakan head saat state $q_2$?</strong></summary>
> 
> Kiri (Left), karena fungsinya adalah mengembalikan head ke posisi 'X' terakhir untuk memulai pencarian '0' berikutnya.
> 
> </details>
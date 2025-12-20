---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Notasi Postfix dalam Kode Antara
> 
> > ## Questions/Cues
> >
> > - Keuntungan Kode Antara
> >     
> > - Kerugian Kode Antara
> >     
> > - Format Postfix
> >     
> > - Postfix: Struktur IF
> >     
> > - Postfix: Struktur WHILE
> >     
> > ## Reference Points
> > 
> > - Slide 16_2025: Hal 1 - 5
> >     
> 
> > ### 1. Karakteristik Kode Antara (Intermediate Code)
> >
> > Kode antara adalah representasi program setelah tahap analisis yang menjembatani bahasa sumber dengan bahasa mesin.
> >
> > **Keuntungan:**
> >
> > - **Reduksi Usaha:** Memperkecil usaha dalam membangun kompiler dari berbagai bahasa ke berbagai mesin.
> >     
> > - **Machine Independent:** Hasil kode antara dapat digunakan kembali pada arsitektur mesin yang berbeda.
> >     
> > - **Kemudahan Optimasi:** Proses optimasi lebih mudah dilakukan pada kode antara dibandingkan pada bahasa sumber atau bahasa mesin.
> >     
> > - **Keterbacaan:** Lebih mudah dipahami dibandingkan kode assembly atau kode mesin.
> >     
> >
> > **Kerugian:**
> >
> > - Memerlukan waktu kompilasi yang relatif lebih lama karena adanya dua kali transisi (sumber ke kode antara, lalu ke mesin).
> >     
> >
> > ### 2. Notasi Postfix
> >
> > Notasi Postfix mengikuti format: `<Operand> <Operand> <Operator>`.
> >
> > Contoh Aritmatika:
> > 
> > Ekspresi $(a+b) * (c+d)$ diubah menjadi ab+ cd+ *.
> >
> > ### 3. Postfix untuk Struktur Kontrol
> >
> > Instruksi kontrol program harus diubah menjadi urutan linear menggunakan label dan instruksi lompatan.
> >
> > Struktur IF:
> > 
> > IF <expr> THEN <stmt1> ELSE <stmt2>
> > 
> > Menjadi: <expr> <label1> BZ <stmt1> <label2> BR <stmt2>
> >
> > - **BZ (Branch if Zero):** Melompat jika kondisi salah (nol).
> >     
> > - **BR (Branch):** Melompat tanpa syarat.
> >     
> >
> > Struktur WHILE:
> > 
> > WHILE <expr> DO <stmt>
> > 
> > Menjadi: <expr> <label1> BZ <stmt> <label2> BR
> >
> > ### 4. Langkah Konversi WHILE (Contoh Teknis)
> >
> > Program: `a:=1; WHILE a<5 DO a:=a+1;`
> >
> > 1. Inisialisasi variabel `a`.
> >     
> > 2. Evaluasi kondisi `a < 5`.
> >     
> > 3. Jika hasil evaluasi kondisi salah (0), lompat ke akhir program (menggunakan BZ).
> >     
> > 4. Jika benar, eksekusi tubuh perulangan `a := a + 1`.
> >     
> > 5. Setelah tubuh perulangan selesai, lompat kembali ke langkah evaluasi kondisi (menggunakan BR).
> >     

> [!cornell] #### Summary
> 
> **Kode Antara** berfungsi meningkatkan portabilitas kompiler dan memudahkan optimasi. **Notasi Postfix** merepresentasikan operasi dengan menempatkan operator setelah operand. Untuk struktur kontrol aliran seperti **IF** dan **WHILE**, Postfix menggunakan mekanisme lompatan bersyarat (**BZ**) dan tidak bersyarat (**BR**) untuk mengatur urutan eksekusi instruksi berdasarkan hasil evaluasi ekspresi logika.

> [!ad-libitum]- Additional Information
> 
> #### Implementasi Stack pada Postfix
> 
> Notasi Postfix sangat efisien untuk diimplementasikan menggunakan struktur data **Stack**. Saat menemukan operand, operand dimasukkan (push) ke stack. Saat menemukan operator, operand yang relevan dikeluarkan (pop), operasi dilakukan, dan hasilnya dimasukkan kembali ke stack.
> 
> #### Keamanan Optimasi
> 
> Optimasi pada level kode antara lebih aman karena tidak terikat pada register fisik mesin tertentu, sehingga meminimalkan risiko kesalahan instruksi spesifik mesin selama proses transformasi.

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
>
> <summary><strong>1. Mengapa optimasi pada kode antara lebih disukai daripada pada kode assembly?</strong></summary>
>
> Karena kode antara lebih mudah dipahami secara logis dan tidak terikat pada keterbatasan spesifik arsitektur mesin (Machine Independent).
> 
> </details>
>
> <details>
>
> <summary><strong>2. Apa fungsi dari instruksi BZ dalam notasi Postfix?</strong></summary>
>
> BZ (Branch if Zero) berfungsi untuk melompat ke label tertentu jika hasil evaluasi ekspresi sebelumnya bernilai salah (nol).
> 
> </details>
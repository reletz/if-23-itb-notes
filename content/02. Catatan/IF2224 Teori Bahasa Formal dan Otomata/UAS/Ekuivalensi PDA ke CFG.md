---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Ekuivalensi PDA & CFG (Bagian 2: Konversi PDA ke CFG)
> 
> > ## Questions/Cues
> >
> > - Konsep Net Effect
> >     
> > - Arti $[pXq]$  
> >     
> > - Jumlah Variabel
> >     
> > - Aturan Start (S)
> >     
> > - Aturan Pop Langsung
> >     
> > - Aturan Pop & Push
> >     
> > - Teorema 6.14
> >     
> >
> > ## Reference Points
> >
> > - Slide 12_2025: Hal 12 - 19
> >     
> 
> > ### 1. Ide Dasar: Konsep "Net Effect"
> >
> > Tantangan utama konversi PDA ke CFG adalah bagaimana grammar bisa meniru perilaku stack. Kuncinya adalah melacak **Net Effect** dari sebuah komputasi.
> >
> > Definisi Net Effect:
> > 
> > Ketika PDA membaca suatu string $w$, ia berpindah dari state $p$ ke state $q$, dan pada akhirnya simbol $X$ yang tadinya ada di puncak stack berhasil ter-pop (keluar). Apapun yang terjadi di tengah-tengah (push simbol lain lalu di-pop lagi), hasil akhirnya adalah $X$ hilang.
> >
> > ### 2. Variabel Grammar $[pXq]$  
> >
> > Dalam CFG hasil konversi, kita membuat variabel-variabel baru dengan format $[pXq]$.
> >
> > - **Arti:** String yang membawa PDA dari state $p$ ke state $q$ dengan hasil akhir simbol $X$ keluar dari stack.
> >     
> > - **Total Variabel:** Jika PDA memiliki $|Q|$ state dan $|\Gamma|$ simbol stack, maka jumlah variabelnya adalah $|Q|^2 \times |\Gamma| + 1$ (termasuk simbol Start $S$).
> >     
> >
> > ### 3. Tiga Jenis Aturan Produksi (R)
> >
> > Kita harus membangun aturan produksi berdasarkan transisi PDA:
> >
> > A. Produksi untuk Start Symbol (S):
> > 
> > $$S \rightarrow [q_0 Z_0 q] \text{ untuk setiap } q \in Q$$
> > 
> > Interpretasi: Bahasa yang diterima PDA adalah semua string yang membawa mesin dari state awal ($q_0$), dengan simbol awal stack ($Z_0$), hingga $Z_0$ ter-pop di state $q$ mana pun.
> >
> > B. Produksi Pop Langsung (Tanpa Push):
> > 
> > Jika $\delta(q, a, X)$ mengandung $(r, \epsilon)$, maka:
> > 
> > $$[qXr] \rightarrow a$$
> > 
> > Interpretasi: Jika dari $q$ baca $a$ dan langsung pop $X$ pindah ke $r$, maka variabel $[qXr]$ langsung menghasilkan terminal $a$.
> >
> > C. Produksi Pop dengan Push (Paling Kompleks):
> > 
> > Jika $\delta(q, a, X)$ mengandung $(r_0, Y_1 Y_2 \dots Y_k)$, maka untuk semua kemungkinan kombinasi state $r_1, r_2, \dots, r_k$:
> > 
> > $$[qXr_k] \rightarrow a [r_0 Y_1 r_1] [r_1 Y_2 r_2] \dots [r_{k-1} Y_k r_k]$$
> > 
> > Analogi: Bayangkan ini seperti perjalanan estafet. Untuk mengeluarkan $X$, Anda membaca $a$, lalu harus mengeluarkan $Y_1$, dilanjut mengeluarkan $Y_2$, dst., sampai simbol terakhir $Y_k$ keluar. Karena kita tidak tahu di state mana setiap simbol itu selesai di-pop, kita harus mencoba semua kombinasi state yang mungkin.
> >
> > ### 4. Teorema 6.14 (Kebenaran Konstruksi)
> >
> > Teorema ini menyatakan bahwa $L(G) = N(P)$. Artinya, grammar yang kita buat menghasilkan string yang **tepat sama** dengan string yang diterima PDA dengan metode empty stack.

> [!cornell] #### Summary
> 
> Konversi PDA ke CFG berpusat pada variabel $[pXq]$ yang merepresentasikan string yang mengakibatkan simbol $X$ ter-pop saat mesin berpindah dari state $p$ ke $q$. Terdapat tiga aturan produksi utama: (1) **Start** yang menghubungkan $S$ ke semua kemungkinan state akhir, (2) **Pop Langsung** untuk transisi tanpa push, dan (3) **Pop-Push** yang memecah satu variabel menjadi rangkaian variabel baru berdasarkan simbol-simbol yang dimasukkan ke stack. Secara matematis, konstruksi ini menjamin ekuivalensi antara PDA (empty stack) dan CFG.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Mengapa Rule 3 Sangat "Boros"?
> 
> Perhatikan aturan $[qXr_k] \rightarrow a [r_0 Y_1 r_1] \dots [r_{k-1} Y_k r_k]$. Jika PDA memiliki 3 state dan kita mem-push 2 simbol ($k=2$), maka untuk satu transisi PDA saja, kita harus membuat $3^2 = 9$ aturan produksi di grammar. Inilah sebabnya mengapa secara praktis, grammar hasil konversi PDA seringkali sangat besar dan memiliki banyak variabel yang tidak pernah bisa mencapai terminal (_useless symbols_).
> 
> #### Pembuktian Induksi
> 
> Bukti $L(G) = N(P)$ didasarkan pada induksi panjang komputasi.
> 
> - **Arah PDA ke CFG:** Jika $(q, w, X) \vdash^* (p, \epsilon, \epsilon)$, maka $[qXp] \Rightarrow^* w$.
>     
> - **Arah CFG ke PDA:** Jika $[qXp] \Rightarrow^* w$, maka PDA pasti bisa mengosongkan $X$ dari stack dengan membaca $w$.
>     
> 
> #### Eksplorasi Mandiri
> 
> Cobalah konversi PDA sederhana dengan 1 state dan 1 simbol stack ke dalam CFG. Anda akan melihat bahwa variabel $[qZq]$ akan bertindak sangat mirip dengan variabel tunggal dalam grammar sederhana.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - Slide 12_2025 IF 2124 ITB (Hal 12-19).
>     
> - "Introduction to the Theory of Computation" oleh Michael Sipser (Bab Context-Free Languages).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa arti dari variabel grammar $[pXq]$?</strong></summary>
> 
> String yang jika dibaca oleh PDA akan membawanya dari state $p$ ke state $q$ dengan efek bersih (net effect) simbol $X$ dikeluarkan dari stack.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Berapa total variabel yang dihasilkan dalam konversi PDA dengan $|Q|$ state dan $|\Gamma|$ simbol stack?</strong></summary>
> 
> $|Q|^2 \times |\Gamma| + 1$.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Mengapa pada aturan Start (S) kita harus membuat produksi menuju semua state $q \in Q$?</strong></summary>
> 
> Karena pada metode acceptance by empty stack, PDA dianggap menerima input selama stack-nya kosong, tidak peduli di state mana ia berakhir.
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Dalam aturan produksi tipe 3 (Pop dengan Push), mengapa kita melibatkan semua kombinasi state $r_1, r_2, \dots$?</strong></summary>
> 
> Karena grammar bersifat non-deterministik dan kita tidak tahu secara pasti di state mana PDA akan berada setelah masing-masing simbol $Y_i$ selesai di-pop dari stack.
>
></details>
>
> <details>
>
> <summary><strong>5. Apa yang dimaksud dengan "Net Effect" dalam konteks ini?</strong></summary>
>
> Kondisi di mana meskipun stack sempat bertambah isinya selama proses membaca string, pada akhirnya simbol yang kita targetkan (misal $X$) berhasil dikeluarkan dari stack.
>
> </details>
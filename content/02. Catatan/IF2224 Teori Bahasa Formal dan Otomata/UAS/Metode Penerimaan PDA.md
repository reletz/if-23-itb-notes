---
type: Note
tags:
  - Komputasi
  - PDA
cssclasses:
  - cornell-notes
---

_Back to_ [[IF2224 Teori Bahasa Formal dan Otomata]]

> [!cornell] Topic: Mekanisme Eksekusi & Bahasa PDA
> 
> > ## Questions/Cues
> >
> > - **Apa itu ID?**
> >     
> > - **Komponen ID (Snapshot)**
> >     
> > - **Simbol** $\vdash$ **vs** $\vdash^*$  
> >     
> > - **2 Jenis Penerimaan**
> >     
> > - **Accept by Final State**
> >     
> > - **Accept by Empty Stack**
> >     
> > - **Contoh Tracing ID**
> >     
> > - **Analisis Rejection**
> >     
> > - **Intuisi Ekuivalensi**
> >     
> > - **Konversi Penerimaan**
> >     
> >
> > ## Reference Points
> >
> > - Bab 6 PDA.pdf (Halaman 22-25, 34-46)
> >     
> > - Konsep "State of System"
> >     
> 
> > ### 1. Instantaneous Descriptions (ID)
> >
> > Agar tidak bingung melacak "sedang apa mesin sekarang?", kita butuh cara standar untuk memotret kondisi mesin. Foto kondisi ini disebut **Instantaneous Description (ID)** atau Deskripsi Sesaat.
> >
> > Format ID: $(q, w, \alpha)$
> > 
> > Sebuah ID terdiri dari 3 komponen utama (Tripel):
> >
> > 1. $q$ **(Current State):** Di lingkaran mana mesin berhenti saat ini?
> >     
> > 2. $w$ **(Remaining Input):** Apa sisa string input yang **belum** dibaca? (Input yang sudah dibaca hilang dari pandangan).
> >     
> > 3. $\alpha$ **(Stack Contents):** Apa isi tumpukan saat ini? (Ditulis dari **Top** ke **Bottom**).
> >     
> >
> > Contoh: $(q_1, 101, XZ_0)$
> > 
> > Artinya: Mesin di state $q_1$, masih harus membaca string "101", dan di stack ada $X$ di atas $Z_0$.
> >
> > ### 2. Relasi "Goes-To" ($\vdash$)
> >
> > Ini adalah notasi matematika untuk menggambarkan "Langkah Pergerakan".
> >
> > 
> > |**Simbol**|**Nama**|**Arti**|
> > |---|---|---|
> > |$\vdash$|**One Move**|Mesin bergerak **satu langkah** saja. Dari ID A berubah menjadi ID B.|
> > |$\vdash^*$|**Zero or More Moves**|Mesin bergerak **banyak langkah** (atau diam). Ini seperti tombol "Fast Forward".|
> >
> > **Logika Perubahan ID:**
> > 
> > Jika ID1 $\vdash$ ID2, artinya ada transisi di fungsi $\delta$ yang memungkinkan perubahan tersebut (state berubah, input berkurang 1 karakter, stack berubah sesuai push/pop).
> >
> > ### 3. Dua Cara Penerimaan (Acceptance)
> >
> > Berbeda dengan Finite Automata yang hanya punya satu cara (sampai di Final State), PDA punya dua mode operasi untuk menerima string.
> >
> > #### A. Acceptance by Final State ($L(P)$)
> >
> > - **Logika:** Persis seperti FA biasa.
> >     
> > - **Syarat Terima:** String input habis dibaca ($w = \epsilon$) DAN mesin berhenti di salah satu state himpunan $F$ (lingkaran ganda).
> >     
> > - **Kondisi Stack:** **TIDAK PEDULI**. Stack boleh masih penuh, boleh kosong, tidak masalah. Yang penting input habis dan state-nya "Final".
> >     
> > - Notasi Formal:
> >     
> >     $$L(P) = \{w \mid (q_0, w, Z_0) \vdash^* (f, \epsilon, \alpha)\} \text{ dimana } f \in F$$
> >     
> >
> > #### B. Acceptance by Empty Stack ($N(P)$)
> >
> > - **Logika:** "Bersih-bersih piring".
> >     
> > - **Syarat Terima:** String input habis dibaca ($w = \epsilon$) DAN tumpukan (Stack) menjadi **benar-benar kosong** ($\epsilon$).
> >     
> > - **Kondisi State:** **TIDAK PEDULI**. Mesin boleh berhenti di state mana saja, tidak harus "Final State". Bahkan PDA jenis ini seringkali tidak punya himpunan $F$.
> >     
> > - Notasi Formal:
> >     
> >     $$N(P) = \{w \mid (q_0, w, Z_0) \vdash^* (q, \epsilon, \epsilon)\} \text{ untuk sembarang } q$$
> >     
> >
> > ### 4. Contoh Studi Kasus (Tracing ID)
> >
> > Menggunakan contoh PDA $L = \{0^n 1^n\}$ dari bagian sebelumnya, berikut adalah cara kita menuliskan sejarah pergerakan mesin secara formal.
> >
> > #### A. Kasus Diterima (Input: `000111`)
> >
> > Mesin membaca input sampai habis dan mencapai state final.
> >
> > $(q, 000111, Z_0) \vdash (q, 00111, XZ_0)$ (Push X)
> > 
> > $\vdash (q, 0111, XXZ_0)$ (Push X)
> > 
> > $\vdash (q, 111, XXXZ_0)$ (Push X)
> > 
> > $\vdash (p, 11, XXZ_0)$ (Baca 1 pertama, Pindah state q->p, Pop X)
> > 
> > $\vdash (p, 1, XZ_0)$ (Pop X)
> > 
> > $\vdash (p, \epsilon, Z_0)$ (Pop X, Input Habis)
> > 
> > $\vdash (f, \epsilon, Z_0)$ (Transisi $\epsilon$, Masuk Final)
> >
> > **Kesimpulan:** Karena $(q, 000111, Z_0) \vdash^* (f, \epsilon, Z_0)$, maka input **Diterima**.
> >
> > #### B. Kasus Ditolak (Input: `0001111`)
> >
> > Apa yang terjadi jika jumlah angka 1 lebih banyak?
> >
> > $(q, 0001111, Z_0) \vdash (q, 001111, XZ_0)$
> > 
> > $\vdash (q, 01111, XXZ_0)$
> > 
> > $\vdash (q, 1111, XXXZ_0)$
> > 
> > $\vdash (p, 111, XXZ_0)$
> > 
> > $\vdash (p, 11, XZ_0)$
> > 
> > $\vdash (p, 1, Z_0)$
> > 
> > $\vdash (f, 1, Z_0)$
> >
> > **Analisis Kegagalan:**
> > 
> > Perhatikan ID terakhir $(f, 1, Z_0)$.
> >
> > 1. Mesin ada di state Final ($f$).
> >     
> > 2. **TAPI**, input belum habis (masih ada sisa `1` di komponen $w$).
> >     
> > 3. Tidak ada transisi yang didefinisikan untuk $(f, 1, Z_0)$ alias mesin macet.
> >     
> >
> > **Kesimpulan:** Input **Ditolak** karena syarat penerimaan adalah input harus terkonsumsi sepenuhnya ($w = \epsilon$).
> >
> > ### 5. Ekuivalensi Dua Mode
> >
> > Apakah PDA Final State lebih hebat dari PDA Empty Stack? **TIDAK**. Keduanya setara.
> >
> > **Teorema Ekuivalensi:**
> > 
> > Jika sebuah bahasa $L$ bisa dikenali oleh PDA jenis Final State, pasti ada PDA jenis Empty Stack yang bisa mengenali $L$ juga, dan sebaliknya.
> >
> > **Intuisi Konversi:**
> >
> > - **Final State** $\to$ **Empty Stack:** Buat mesin baru yang jika mencapai final state, ia akan memicu mode "mengamuk" (loop) untuk mengosongkan (pop) semua isi stack sampai habis.
> >     
> > - **Empty Stack** $\to$ **Final State:** Bungkus stack asli dengan tanda dasar baru (misal $X_0$). Jika mesin mendeteksi stack asli sudah habis (kelihatan $X_0$), suruh mesin pindah ke state khusus yang Final.
> > 
> > #### Contoh Konversi: $L = \{a^n b^n \mid n \geq 1\}$
> > 
> > ##### 1. PDA Empty Stack Asli ($M_{es}$)
> > 
> > Mesin ini akan memasukkan $A$ untuk setiap $a$, lalu menghapus $A$ untuk setiap $b$. Di akhir, ia menghapus $Z_0$.
> >
> >|**State**|**Input**|**Top Stack**|**Hasil (Next State, Push/Pop)**|**Keterangan**|
> >|---|---|---|---|---|
> >|$q_0$|$a$|$Z_0$|$(q_0, AZ_0)$|Input $a$ pertama, simpan $A$|
> >|$q_0$|$a$|$A$|$(q_0, AA)$|Input $a$ selanjutnya, tumpuk $A$|
> >|$q_0$|$b$|$A$|$(q_1, \epsilon)$|Ketemu $b$ pertama, mulai hapus $A$|
> >|$q_1$|$b$|$A$|$(q_1, \epsilon)$|Hapus $A$ untuk setiap $b$|
> >|$q_1$|$\epsilon$|$Z_0$|$(q_1, \epsilon)$|**Input habis, hapus $Z_0$ (Stack Kosong!)**|
> >
> >---
> >
> >##### 2. Hasil Konversi ke Final State ($M_{fs}$)
> >
> >Kita tambahkan state baru $p_0$ (awal), $p_f$ (akhir), dan simbol $X_0$.
> >
> >**Transisi Tambahan:**
> >
> >1. Inisialisasi:
> >   
> > 	$\delta(p_0, \epsilon, X_0) = (q_0, Z_0 X_0)$
> > 	
> > 	(Taruh $Z_0$ di atas $X_0$, lalu masuk ke logika utama)
> >   
> >2. Logika Utama:
> >    
> > 	(Gunakan semua tabel di atas tanpa perubahan)
> > 	 
> >1. Loncatan ke Final State:
> >    
> > 	$\delta(q_1, \epsilon, X_0) = (p_f, \epsilon)$
> > 	 
> > 	(Hanya jika stack asli sudah kosong dan mesin melihat "lantai" $X_0$, barulah ia pindah ke state final $p_f$)
> > 	 
> >
> >
> >
> >##### Ringkasan Perbedaan
> >
> >- **Empty Stack:** Berhenti dan terima ketika stack benar-benar kosong (setelah transisi terakhir $q_1, \epsilon, Z_0$).
> >    
> >- **Final State:** Berhenti dan terima karena berada di $p_f$, meskipun di dalam stack mungkin masih tersisa $X_0$ (jika kita tidak melakukan pop pada transisi terakhir).
    
> [!cornell] #### Summary
> 
> PDA menggunakan notasi **Instantaneous Description (ID)** $(q, w, \alpha)$ sebagai "snapshot" kondisi mesin untuk melacak proses komputasi. Perubahan antar ID dinotasikan dengan simbol **Goes-To** ($\vdash$ untuk satu langkah, $\vdash^*$ untuk banyak langkah). Uniknya, PDA memiliki dua mekanisme penerimaan yang setara: **Acceptance by Final State** (fokus pada posisi state akhir, stack bebas) dan **Acceptance by Empty Stack** (fokus pada stack kosong, state bebas). Kita bisa mengubah PDA dari satu mode ke mode lainnya tanpa mengurangi kemampuan komputasinya.

> [!ad-libitum]- Ad Libitum: Detail Teknis Konversi
> 
> #### 1. Dari Final State ($P_F$) ke Empty Stack ($P_N$)
> 
> Tujuannya: "Kalau $P_F$ terima, $P_N$ harus kosongkan stack."
> 
> - **Masalah:** $P_F$ bisa saja menerima string tapi stacknya masih penuh.
>     
> - **Solusi:**
>     
>     1. Tambahkan state baru $e$ (state "erase" atau penghapus).
>         
>     2. Untuk setiap final state $f \in F$ di $P_F$, tambahkan transisi $\epsilon$ menuju state $e$.
>         
>     3. Di state $e$, buat loop $\delta(e, \epsilon, \text{any}) = (e, \epsilon)$ untuk mem-pop semua simbol stack.
>         
>     4. Tambahkan juga marker dasar baru $X_0$ agar $P_N$ tidak "tidak sengaja" kosong sebelum waktunya.
>         
> 
> #### 2. Dari Empty Stack ($P_N$) ke Final State ($P_F$)
> 
> Tujuannya: "Kalau $P_N$ kosongkan stack, $P_F$ harus masuk final state."
> 
> - **Masalah:** $P_F$ tidak tahu kapan stack $P_N$ kosong karena kalau kosong mesin $P_N$ mati (crash).
>     
> - **Solusi:**
>     
>     1. Gunakan Start State baru $s$ dan Final State baru $f$.
>         
>     2. Push marker khusus $X_0$ di paling bawah stack: $\delta(s, \epsilon, Z_0) = (q_0, Z_0 X_0)$.
>         
>     3. Jalankan simulasi $P_N$.
>         
>     4. Jika $P_N$ mengosongkan stack aslinya, yang tersisa di stack $P_F$ hanyalah $X_0$.
>         
>     5. Tambahkan transisi deteksi: $\delta(q, \epsilon, X_0) = (f, \epsilon)$. Jika lihat $X_0$, lompat ke final!
>         

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa tiga komponen yang membentuk Instantaneous Description (ID) PDA?</strong></summary>
> 
> Current State ($q$), Remaining Input ($w$), dan Stack Contents ($\alpha$).
> 
> </details>
> <details>
> 
> <summary><strong>2. Jika ID mesin adalah $(q, \text{&quot;abc&quot;}, \text{XZ})$, string apa yang sudah dibaca mesin sebelumnya?</strong></summary>
> 
> Tidak bisa diketahui dari ID saja. ID hanya mencatat apa yang <strong>tersisa</strong> ("abc"), bukan apa yang sudah lewat.
> 
> </details>
> <details>
> 
> <summary><strong>3. Apa syarat string diterima dalam mode "Acceptance by Empty Stack"?</strong></summary>
> 
> String input harus habis dibaca ($w = \epsilon$) DAN tumpukan stack harus benar-benar kosong. Posisi state terakhir tidak dipermasalahkan.
> 
> </details>
> <details>
> 
> <summary><strong>4. Mengapa kita perlu menambahkan marker baru (misal $X_0$) saat mengubah PDA Empty Stack menjadi Final State?</strong></summary>
> 
> Untuk mendeteksi kapan stack "asli" menjadi kosong. Tanpa marker tambahan, mesin simulasi akan crash atau berhenti tanpa sempat pindah ke Final State saat stack kosong.
> 
> </details>
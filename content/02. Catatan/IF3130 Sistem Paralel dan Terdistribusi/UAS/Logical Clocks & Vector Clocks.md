---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Logical Clock, Happened-Before, & Vector Clock
> 
> > ## Questions/Cues
> >
> > - **Kenapa butuh Logical Clock?**
> >     
> > - **Happened-Before Relation (**$\rightarrow$**)**
> >     
> > - **Transitivity**
> >     
> > - **Concurrent Events**
> >     
> > - **Lamport Clock Rules**
> >     
> > - **Masalah Lamport Clock**
> >     
> > - **Totally Ordered Multicast**
> >     
> > - **Vector Clock Rules**
> >     
> > - **Perbandingan Vector vs Scalar**
> >     
> >
> > ## Reference Points
> >
> > - Slides: Page 29-41
> >     
> > - Fokus: Kausalitas & Pengurutan
> >     
> 
> > ### 1. Konsep Happened-Before ($\rightarrow$)
> >
> > Karena sinkronisasi fisik tidak pernah sempurna, Leslie Lamport (1978) mengusulkan: kita tidak perlu waktu absolut, kita hanya perlu tahu **urutan kejadian (ordering)** yang konsisten.
> >
> > **Relasi Happened-Before (**$a \rightarrow b$**):**
> >
> > 1. Jika $a$ dan $b$ di proses yang sama, dan $a$ terjadi sebelum $b$, maka $a \rightarrow b$.
> >     
> > 2. Jika $a$ adalah pengiriman pesan (_send_) dan $b$ adalah penerimaan pesan itu (_receive_), maka $a \rightarrow b$.
> >     
> > 3. **Transitif:** Jika $a \rightarrow b$ dan $b \rightarrow c$, maka $a \rightarrow c$.
> >     
> > 
> > **Concurrent:** Jika $a \nrightarrow b$ dan $b \nrightarrow a$, maka dua event tersebut dikatakan konkuren (terjadi bersamaan secara logis).
> >
> > ### 2. Lamport Logical Clock
> >
> > Algoritma sederhana untuk menangkap relasi _happened-before_ menggunakan counter integer tunggal ($C_i$).
> >
> > **Algoritma/Aturan:**
> >
> > 1. Setiap proses $P_i$ punya counter lokal $C_i$, inisialisasi 0.
> >     
> > 2. Sebelum event internal, $C_i \leftarrow C_i + 1$.
> >     
> > 3. Saat kirim pesan $m$, sertakan timestamp $ts(m) = C_i$.
> >     
> > 4. Saat terima pesan $m$ di $P_j$:
> >     
> >     $$C_j \leftarrow \max(C_j, ts(m)) + 1$$
> >     
> >     (Ambil yang terbesar antara jam lokal dan jam pesan, lalu tambah 1).
> >     
> >
> > **Keterbatasan Fatal Lamport Clock:**
> >
> > - Jika $a \rightarrow b$, maka pasti $C(a) < C(b)$. (Benar).
> >     
> > - TAPI, jika $C(a) < C(b)$, **belum tentu** $a \rightarrow b$. Bisa saja mereka konkuren.
> >     
> > - _Kesimpulan:_ Lamport Clock tidak bisa menangkap kausalitas secara sempurna.
> >     
> >
> > ### 3. Aplikasi: Totally Ordered Multicast
> >
> > Lamport Clock digunakan untuk menjamin semua replika database mengeksekusi update dalam urutan yang persis sama.
> >
> > - **Mekanisme:**
> >     
> > 	1. Kirim pesan timestamped ke semua proses (termasuk diri sendiri).
> > 			
> > 	2. Masukkan pesan masuk ke antrean lokal (diurutkan berdasarkan timestamp).
> > 			
> > 	3. Kirim ACK ke semua orang.
> > 			
> > 	4. Pesan diproses aplikasi HANYA JIKA: pesan ada di kepala antrean (head) DAN kita sudah menerima ACK/pesan dengan timestamp lebih besar dari _semua_ proses lain.
> > 			
> > - **Asumsi:** Kanal komunikasi reliable dan FIFO.
> >     
> >
> > ### 4. Vector Clock (Solusi Kausalitas)
> >
> > Untuk mengatasi kelemahan Lamport Clock, kita menggunakan Array (Vektor) alih-alih integer tunggal.
> >
> > Struktur:
> > 
> > Setiap proses $P_i$ memiliki array $VC_i[1..n]$ (n = jumlah proses total).
> >
> > - $VC_i[j]$ artinya: jumlah event di proses $P_j$ yang sudah "diketahui" oleh $P_i$.
> >     
> >
> > **Algoritma:**
> >
> > 1. Inisialisasi vektor dengan $[0, 0, ..., 0]$.
> >     
> > 2. Event internal di $P_i$: Increment elemen miliknya sendiri ($VC_i[i] \leftarrow VC_i[i] + 1$).
> >     
> > 3. Kirim pesan: Kirim seluruh vektor $VC$ bersama pesan.
> >     
> > 4. Terima pesan ($VC_{msg}$) di $P_j$:
> >     
> > 	- Update setiap elemen $k$: $VC_j[k] \leftarrow \max(VC_j[k], VC_{msg}[k])$.
> > 			
> > 	- Increment elemen sendiri: $VC_j[j] \leftarrow VC_j[j] + 1$.
> > 			
> >
> > Keunggulan:
> > 
> > Dengan Vector Clock, kita bisa membandingkan dua event $a$ dan $b$:
> >
> > - $VC(a) < VC(b)$ **jika dan hanya jika** $a \rightarrow b$.
> >     
> > - Ini menutup celah yang ada pada Lamport Clock.
> >     

> [!cornell] #### Summary
> 
> Logical Clock menggantikan waktu absolut dengan konsep keterurutan event. Lamport Clock menggunakan counter sederhana untuk memastikan properti $a \rightarrow b \implies C(a) < C(b)$, yang berguna untuk Totally Ordered Multicast. Namun, Lamport Clock tidak bisa mendeteksi kejadian konkuren. Vector Clock mengatasi ini dengan menyimpan array state seluruh sistem, memungkinkan deteksi kausalitas yang sempurna ($VC(a) < VC(b) \iff a \rightarrow b$), namun dengan biaya overhead ukuran pesan yang lebih besar (sebanding jumlah proses).

> [!ad-libitum]- Additional Information (Deep Dive)
> 
> #### Membandingkan Vector Clock
> 
> Bagaimana cara komputer tahu Vektor A < Vektor B?
> 
> - $V_A \leq V_B$ jika setiap elemen $V_A[i] \leq V_B[i]$.
>     
> - $V_A < V_B$ jika $V_A \leq V_B$ DAN ada setidaknya satu elemen di mana $V_A[j] < V_B[j]$.
>     
> - Jika ada elemen dimana $V_A[i] > V_B[i]$ dan elemen lain $V_A[k] < V_B[k]$, maka kedua vektor tersebut **Konkuren** (tidak punya hubungan sebab-akibat).
>     
> 
> #### Overhead Vector Clock
> 
> Jika ada 10.000 proses dalam sistem terdistribusi, setiap pesan harus membawa array integer berukuran 10.000. Ini sangat boros bandwidth. Ini sebabnya Vector Clock jarang dipakai di sistem skala internet masif, dan lebih sering dipakai di sistem cluster/replikasi database terbatas (seperti DynamoDB versi awal).
> 
> #### Sumber & Referensi:
> 
> - **Paper Asli:** Leslie Lamport, "Time, Clocks, and the Ordering of Events in a Distributed System" (1978). Salah satu paper paling banyak disitasi dalam ilmu komputer.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa kelemahan utama Lamport Clock dibandingkan Vector Clock?</strong></summary>
> 
> Lamport Clock tidak bisa membedakan antara kejadian yang memiliki hubungan sebab-akibat (kausal) dengan kejadian yang konkuren. Jika C(a) < C(b), kita tidak bisa memastikan apakah a menyebabkan b, atau a dan b terjadi bersamaan tanpa saling tahu.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Bagaimana aturan update jam lokal saat menerima pesan pada algoritma Lamport?</strong></summary>
> 
> Jam lokal diperbarui menjadi nilai maksimum antara jam lokal saat ini dan timestamp pesan yang diterima, lalu ditambah 1. Rumus: max(Local, Message_TS) + 1.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Dalam Vector Clock, apa arti dari elemen VC_i[j] = k?</strong></summary>
> 
> Artinya, proses P_i mengetahui bahwa proses P_j telah mengalami setidaknya k kejadian (events). Ini mencerminkan pengetahuan P_i tentang kemajuan proses P_j.
> 
> </details>
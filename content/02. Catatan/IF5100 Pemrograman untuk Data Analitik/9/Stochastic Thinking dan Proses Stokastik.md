---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Stochastic Thinking dan Proses Stokastik
>
> > ## Questions/Cues
> >
> > - Mengapa kita sebaiknya memperlakukan dunia sebagai sesuatu yang tidak dapat diprediksi (**predictive nondeterminism**)?
> > - Apa itu **stochastic process**, dan apa bedanya dengan fungsi deterministik?
> > - Bagaimana probabilitas dihitung dengan cara "menghitung", dan apa tiga fakta dasarnya?
> > - Apa arti **independence**, dan mengapa tidak boleh diasumsikan begitu saja?
> > - Mengapa simulasi 1.000 percobaan gagal mengestimasi peluang `11111`, dan apa tiga moral-nya?
> >
> > ## Reference Points
> >
> > - IF5100 — Stochastic Thinking and Random Walk (Pages 1-15)
>
> > ### Dunia yang Sulit Dipahami
> >
> > Ketidakpastian itu tidak nyaman, tetapi kepastian biasanya **tidak dapat dibenarkan**. Pandangan **Newtonian mechanics** berkata bahwa setiap akibat punya sebab sehingga dunia dapat dipahami secara kausal. Sebaliknya, **Copenhagen Doctrine** (Bohr dan Heisenberg) tentang **causal nondeterminism** menyatakan bahwa pada tingkat paling fundamental perilaku dunia fisik tidak dapat diprediksi: pernyataan "x **sangat mungkin** terjadi" boleh, tetapi "x **pasti** terjadi" tidak. Einstein dan Schrödinger menolaknya ("God does not play dice").
> >
> > Apakah perdebatan ini penting? Untuk pemrograman, tidak terlalu. Slide mengajukan contoh lemparan koin: apakah hasilnya 2 kepala, 2 ekor, atau 1 kepala 1 ekor? Kita tidak tahu. **Moral**-nya: dunia mungkin atau mungkin tidak tak terprediksi secara inheren, tetapi **kekurangan pengetahuan** kita membuat kita tidak bisa memprediksi secara akurat. Maka kita sebaiknya memperlakukan dunia seolah-olah tak terprediksi, yang disebut **predictive nondeterminism**.
> >
> > ### Stochastic Process
> >
> > **Stochastic process** adalah proses berkelanjutan di mana **state berikutnya** dapat bergantung pada state-state sebelumnya **dan** suatu unsur acak. Perbedaannya terlihat pada spesifikasi fungsi `rollDie()`:
> >
> > - Spesifikasi "returns an int between 1 and 6" tidak menentukan nilai pasti.
> > - Spesifikasi "returns a **randomly chosen** int between 1 and 6" menyatakan secara eksplisit bahwa keluarannya acak.
> >
> > Implementasinya memakai modul `random`:
> >
> > ```python
> > import random
> >
> > def rollDie():
> >     """returns a random int between 1 and 6"""
> >     return random.choice([1, 2, 3, 4, 5, 6])
> >
> > def testRoll(n=10):
> >     result = ''
> >     for i in range(n):
> >         result = result + str(rollDie())
> >     print(result)
> > ```
> >
> > Setiap pemanggilan `testRoll(5)` menghasilkan string lima digit yang berbeda-beda, misalnya `31254`.
> >
> > ### Probabilitas Itu Soal Menghitung
> >
> > Pertanyaan: seberapa mungkin keluaran `testRoll(5)` adalah `11111`? Langkahnya:
> >
> > 1. Hitung jumlah **kejadian yang mungkin** (semua string dari `11111` sampai `66666`, yaitu `6**5 = 7776`).
> > 2. Hitung jumlah kejadian yang punya **properti yang diminati** (hanya satu: `11111`).
> > 3. Bagi yang kedua dengan yang pertama: `1/(6**5)` ≈ **0,0001286**.
> >
> > **Tiga fakta dasar probabilitas**:
> >
> > - Probabilitas selalu berada pada rentang **0 sampai 1** (0 jika mustahil, 1 jika pasti).
> > - Jika peluang suatu kejadian adalah `p`, peluang kejadian itu **tidak terjadi** adalah `1 - p`.
> > - Jika kejadian-kejadian **independen**, peluang semuanya terjadi sama dengan **hasil kali** peluang masing-masing. Inilah mengapa peluang `11111` adalah `(1/6)^5`.
> >
> > **Independence** berarti hasil satu kejadian tidak memengaruhi hasil kejadian lain. Asumsi ini **tidak boleh dianggap otomatis**. Contoh yang tidak independen: mengambil kartu dari dek **tanpa pengembalian** (kartu pertama mengubah isi dek), atau hujan hari ini dengan hujan besok.
> >
> > ### Simulasi Lemparan Dadu
> >
> > Kita bisa mengestimasi peluang yang sama lewat simulasi: ulangi percobaan `numTrials` kali dan hitung berapa kali hasilnya sama dengan `goal`.
> >
> > ```python
> > def runSim(goal, numTrials, txt):
> >     total = 0
> >     for i in range(numTrials):
> >         result = ''
> >         for j in range(len(goal)):
> >             result += str(rollDie())
> >         if result == goal:
> >             total += 1
> >     print('Actual probability of', txt, '=',
> >           round(1 / (6 ** len(goal)), 8))
> >     estProbability = round(total / numTrials, 8)
> >     print('Estimated Probability of', txt, '=',
> >           round(estProbability, 8))
> >
> > runSim('11111', 1000, '11111')
> > ```
> >
> > Hasil pada deck: probabilitas sebenarnya `0.0001286`, tetapi estimasi dengan 1.000 percobaan bisa `0.0` atau `0.0001`; dengan **1.000.000** percobaan estimasi menjadi `0.000118`, jauh lebih dekat. Dengan peluang sekecil itu, pada 1.000 percobaan kita hanya mengharapkan sekitar `1000 × 0,0001286 ≈ 0,13` kejadian, sehingga hasil `0` sangat wajar.
> >
> > ```mermaid
> > graph TD
> >     A["Peristiwa acak"] --> B["Hitung kejadian mungkin"]
> >     A --> C["Hitung kejadian berproperti"]
> >     B --> D["Probabilitas = C / B"]
> >     C --> D
> >     D --> E["Verifikasi dengan simulasi<br/>berulang numTrials kali"]
> >     E --> F["Estimasi mendekati nilai sebenarnya<br/>jika trial cukup banyak"]
> > ```
> >
> > ### Tiga Moral dari Simulasi Ini
> >
> > - **Moral 1**: dibutuhkan **banyak trial** untuk mengestimasi frekuensi kejadian yang **langka**.
> > - **Moral 2**: jangan mengacaukan **sample probability** (hasil simulasi) dengan **actual probability**.
> > - **Moral 3**: sebenarnya tidak perlu simulasi di sini karena ada **closed form** (rumus tertutup). Namun simulasi tetap sering berguna, terutama saat rumus sulit atau tidak ada (lihat catatan berikutnya).

> [!cornell] #### Summary
>
> Dunia boleh jadi deterministik atau tidak, tetapi karena pengetahuan kita terbatas kita memperlakukannya sebagai **nondeterministik** (**predictive nondeterminism**). **Stochastic process** adalah proses yang state berikutnya dipengaruhi oleh state sebelumnya dan unsur acak, mis. `rollDie()` dengan `random.choice`. Probabilitas dihitung dengan membagi jumlah kejadian berproperti dengan seluruh kejadian (peluang `11111` = `1/6^5` ≈ 0,0001286), dengan tiga fakta: nilai 0-1, komplemen `1-p`, dan perkalian untuk kejadian **independen** (asumsi yang tidak boleh dianggap otomatis). Simulasi 1.000 percobaan gagal mengestimasi kejadian langka; 1.000.000 percobaan memberi 0,000118. Moralnya: kejadian langka butuh banyak trial, estimasi sampel bukan probabilitas sebenarnya, dan simulasi tidak perlu bila ada rumus tertutup.

> [!ad-libitum]- Additional Information
>
> #### Reproducibility: `random.seed`
>
> Keluaran `random` berasal dari **pseudo-random number generator** (Mersenne Twister di Python). Memanggil `random.seed(0)` sebelum simulasi membuat urutan angka dapat diulang, sehingga eksperimen **reproducible** dan bug mudah dilacak. Untuk komputasi besar di NumPy, gunakan `rng = np.random.default_rng(42)` yang lebih modern daripada `np.random.seed`.
>
> #### Seberapa Besar Error Estimasi?
>
> Jika peluang sebenarnya `p` dan ada `n` trial, jumlah kejadian mengikuti distribusi binomial dengan simpangan baku estimator `sqrt(p(1-p)/n)`. Untuk `p ≈ 0,0001286` dan `n = 1000`, simpangan bakunya sekitar `0,00036`, jauh lebih besar daripada `p` itu sendiri; itulah alasan matematis estimasi `0.0` muncul. Agar galat relatif kira-kira 10%, dibutuhkan `n` sekitar `100 / p ≈ 777.600` trial.
>
> #### Contoh Ketidak-independenan
>
> Mengambil dua kartu berturut-turut tanpa pengembalian: peluang kartu kedua As berubah (3/51 bila pertama As, 4/51 bila bukan). Dalam data nyata (cuaca, harga saham, klik pengguna) ketergantungan antar pengamatan sering tersembunyi sehingga menggandakan peluang secara naif memberi hasil yang salah.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Jalankan `runSim('11111', n, '11111')` untuk `n = 10^3, 10^4, 10^5, 10^6` dan plot galat absolut terhadap `n` (skala log).
> 2. Ulangi simulasi 30 kali dengan seed berbeda untuk `n = 10^4` dan hitung rata-rata serta simpangan baku estimasi; bandingkan dengan `sqrt(p(1-p)/n)`.
> 3. Simulasikan peluang mendapat paling sedikit satu angka 6 dalam 4 lemparan dan cocokkan dengan `1 - (5/6)^4 ≈ 0,5177`.
> 4. Buat contoh simulasi dua kejadian **tidak independen** (mis. tarik kartu tanpa pengembalian) dan tunjukkan bahwa hasil kali peluang salah.
>
> #### Bacaan Lanjutan
>
> - Guttag, *Introduction to Computation and Programming Using Python*, 3rd Ed. — bab 11 dan 14 sebagaimana dirujuk pada deck (nomor bab dapat berbeda antar cetakan).
> - MIT OCW 6.0002 (Fall 2016), *Lecture 4: Stochastic Thinking*.

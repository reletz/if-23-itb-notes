---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Cell Division Overview and Chromosome Organization
>
> > ## Questions/Cues
> >
> > - Apa tiga peran utama pembelahan sel pada organisme?
> > - Apa perbedaan **genome**, **chromosome**, dan **chromatin**?
> > - Apa itu **sister chromatids** dan **centromere**?
> > - Bagaimana membedakan **somatic cell** (diploid) dan **gamete** (haploid)?
> > - Mengapa distribusi DNA ke sel anak harus berlangsung dengan *fidelity* tinggi?
> >
> > ## Reference Points
> >
> > - IF3211 — Cell Cycle (PPT 8, bagian Key Roles of Cell Division)
> > - IF3211 — Cell Cycle (PPT 8, bagian Cellular Organization of the Genetic Material)
>
> > ### Peran Pembelahan Sel dalam Kehidupan
> >
> > Kemampuan organisme **memperbanyak diri** adalah pembeda utama makhluk hidup dari benda mati. Kontinuitas kehidupan bertumpu pada **reproduksi sel** atau **cell division**. Pada organisme **uniseluler**, satu kali pembelahan sel sudah mereproduksi seluruh organisme. Pada **eukariota multiseluler**, pembelahan sel memainkan tiga peran besar: **(1) reproduksi/development** — dari satu sel zigot menjadi organisme utuh; **(2) growth** — penambahan jumlah sel saat tumbuh; dan **(3) repair/renewal** — memperbaiki atau mengganti sel yang rusak atau mati (mis. regenerasi kulit dan sel darah).
> >
> > Pembelahan sel adalah bagian tak terpisahkan dari **cell cycle**, yaitu seluruh kehidupan sebuah sel dari saat terbentuk hingga ia sendiri membelah. Hampir semua pembelahan sel menghasilkan dua **daughter cells** yang **identik secara genetik**: materi genetik (DNA) diwariskan dari satu generasi sel ke generasi berikutnya dengan **fidelity** yang luar biasa tinggi.
> >
> > ### Organisasi Materi Genetik: Genome, Chromosome, Chromatin
> >
> > Seluruh DNA dalam sebuah sel disebut **genome**. Genome bisa berupa **satu molekul DNA** (lazim pada prokariota) atau **banyak molekul DNA** (lazim pada eukariota). Molekul DNA dikemas menjadi **chromosomes**. Pada eukariota, kromosom tersusun dari **chromatin**, yaitu kompleks **DNA + protein** (protein histon membungkus DNA agar untaian yang sangat panjang muat di dalam nukleus).
> >
> > Setiap spesies memiliki **jumlah kromosom** khas. **Somatic cells** (sel non-reproduktif) manusia memiliki **46 kromosom** = 2 set @ 23, sehingga disebut **diploid (2n)**. **Gametes** (sel kelamin: sperma dan sel telur) memiliki separuhnya, yaitu **23 kromosom**, sehingga disebut **haploid (n)**. Konsep **ploidy** inilah yang menjaga jumlah kromosom tetap konstan antar generasi: fertilisasi dua gamet haploid mengembalikan keadaan diploid.
> >
> > ### Duplikasi dan Sister Chromatids
> >
> > Saat sel **tidak** membelah, tiap kromosom berupa serat chromatin yang panjang dan tipis. Menjelang pembelahan, DNA **direplikasi** dan kromosom **mengondensasi** (memadat) agar mudah dipindahkan. Setiap kromosom hasil duplikasi memiliki dua **sister chromatids** — salinan kembar dari kromosom asli yang saling menempel. Titik tempat kedua chromatid paling erat menyatu disebut **centromere**.
> >
> > Saat pembelahan, kedua sister chromatids **dipisahkan** dan bergerak ke dua nukleus berbeda. Setelah terpisah, masing-masing chromatid kini dianggap sebagai **kromosom individual** tersendiri. Pembelahan sel eukariota terdiri dari **mitosis** (pembagian materi genetik di nukleus) dan **cytokinesis** (pembagian sitoplasma). Gamet diproduksi lewat varian khusus bernama **meiosis**, yang menghasilkan sel anak **tidak identik** dengan hanya satu set kromosom.
> >
> > ### Framing Komputasional: Genome sebagai State yang Harus Direplikasi Tanpa Galat
> >
> > Bagi mahasiswa informatika, genome dapat dipandang sebagai **state immutable bersama** yang harus **di-clone** sebelum sebuah proses (sel) melakukan **fork** menjadi dua. **Replikasi DNA** = operasi *deep copy* terhadap struktur data terbesar dalam sistem. **Sister chromatids** persis seperti dua **referensi ke salinan identik** yang masih ditahan oleh satu *lock* (centromere) sampai aman untuk dilepas. **Ploidy** adalah **invariant**: jumlah kromosom (`n` untuk haploid, `2n` untuk diploid) harus dipertahankan di seluruh siklus, sebagaimana sebuah *checksum* yang tidak boleh berubah. Fidelity tinggi saat pewarisan DNA setara dengan jaminan **bit-for-bit integrity** pada operasi penyalinan memori — galat di sini berakibat **mutasi** yang merambat ke seluruh keturunan sel (analog dengan *corruption* yang ter-propagasi).

> [!cornell] #### Summary
>
> **Pembelahan sel (cell division)** menopang kontinuitas hidup lewat tiga peran: **reproduksi/development**, **growth**, dan **repair**. Seluruh DNA sel membentuk **genome**, yang dikemas menjadi **chromosomes** tersusun dari **chromatin** (DNA + protein). Sel **somatik** manusia bersifat **diploid (46, 2n)** sedangkan **gamet** bersifat **haploid (23, n)** — menjaga **ploidy** sebagai invariant antar generasi. Menjelang membelah, DNA direplikasi sehingga tiap kromosom memiliki dua **sister chromatids** yang menyatu di **centromere**, lalu dipisahkan ke dua sel anak secara identik. Pembelahan eukariota = **mitosis** + **cytokinesis**, dengan **meiosis** sebagai varian penghasil gamet. Lihat detail tahapan di [[Phases of the Cell Cycle]] dan mekanika pemisahannya di [[Mitosis and the Mitotic Spindle]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Tingkat Pengemasan Chromatin
>
> Pengemasan DNA berjenjang: untaian **DNA double helix** (≈2 nm) melilit oktamer **histon** membentuk **nucleosome** ("beads on a string", ≈10 nm), lalu memadat menjadi serat **30 nm**, melipat menjadi *looped domains*, dan akhirnya **kromosom metafase** yang sangat padat. Pemadatan ini membuat untaian DNA manusia sepanjang ~2 meter muat dalam nukleus berdiameter mikrometer — sebuah persoalan **kompresi** dan **manajemen ruang** alami.
>
> #### CS Angle: Reference Counting dan Fork-on-Write
>
> Centromere yang menahan sister chromatids hingga saat tepat mirip **reference counting**: salinan tidak boleh dilepas (di-*deallocate* ke dua node) sebelum kondisi aman terpenuhi. Strategi sel — **menyalin dulu, memisah kemudian** — sejajar dengan **copy-on-write**: data dibagi sampai harus benar-benar dipisah, lalu didistribusikan. Ploidy sebagai invariant numerik dapat dimodelkan sebagai *assertion* `assert chromosomeCount == 2 * n` yang diverifikasi di setiap transisi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis simulasi kecil: representasikan genome sebagai array objek `Chromosome`, lalu implementasikan operasi `replicate()` (menghasilkan dua chromatid) dan `segregate()` yang menjaga invariant jumlah kromosom — uji dengan *assertion*.
> 2. Bandingkan jumlah kromosom diploid beberapa spesies (manusia 46, lalat buah 8, anjing 78) dan diskusikan mengapa jumlah kromosom tidak berkorelasi dengan kompleksitas organisme.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 9 — *The Cell Cycle*.
> - Alberts et al., *Molecular Biology of the Cell* — bab DNA packaging & chromatin.

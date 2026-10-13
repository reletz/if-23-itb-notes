---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Konsep dan Sejarah Steganografi
>
> > ## Questions/Cues
> >
> > - Apa itu Prisoner's Problem dan mengapa enkripsi saja tidak cukup?
> > - Apa arti steganografi dan apa tujuannya?
> > - Apa bedanya kriptografi dengan steganografi?
> > - Bagaimana steganografi dipakai sejak zaman kuno sampai Perang Dunia II?
> > - Apa itu null cipher?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — Steganografi Bagian 1 (Slides 2-24)
>
> > ### The Prisoner's Problem
> >
> > Diperkenalkan oleh **Simmons (1983)** dalam konteks pemeriksaan kepatuhan perjanjian nonproliferasi nuklir AS-USSR. Bob dan Alice dipenjara di sel berbeda dan hanya boleh berkomunikasi lewat **Wendy** (sipir) yang memeriksa setiap pesan. Bagaimana Bob mengirim pesan rahasia ("malam ini kita kabur") ke Alice tanpa diketahui Wendy?
> >
> > - **Alternatif 1: enkripsi.** Cipherteks seperti `xjT#9uvmY!rc$7yt59hth@#` langsung **mencurigakan**; Wendy bisa memblokir atau menahannya.
> > - **Alternatif 2: sembunyikan di dalam tulisan lain.** Mis. kalimat puitis biasa yang di baliknya memuat pesan; Wendy **tidak curiga**. Inilah **information hiding dengan steganografi**.
> >
> > ### Definisi
> >
> > Dari bahasa Yunani **steganos** (στεγανός, tersembunyi) + **graphien** (γραφία, tulisan): **tulisan tersembunyi** (*covered writing*). Steganografi adalah ilmu dan seni menyembunyikan pesan rahasia sedemikian rupa sehingga **tak seorang pun mencurigai keberadaan pesan itu**. **Tujuan: pesan tidak terdeteksi keberadaannya.**
> >
> > ### Kriptografi vs Steganografi
> >
> > | | Kriptografi | Steganografi |
> > |---|---|---|
> > | Yang disembunyikan | **makna/isi** (content) | **keberadaan** (existence) |
> > | Tujuan | pesan tak dapat dibaca pihak ketiga | menghindari **kecurigaan** pihak ketiga |
> > | Keluaran | cipherteks yang tampak acak, **menarik perhatian** | stego-data yang tampak biasa |
> > | Bila diketahui | lawan tahu ada pesan, tetapi tak bisa membaca | pesan terungkap sepenuhnya |
> >
> > ### Empat Periode Sejarah
> >
> > Usia steganografi **setua kriptografi** dan sejarah keduanya berjalan bersamaan.
> >
> > | Periode | Contoh |
> > |---|---|
> > | **Kuno** | Herodotus (440 SM): **tato pesan di kepala budak** yang digunduli, rambut dibiarkan tumbuh, lalu dikirim; di tujuan kepala digunduli lagi. **Tablet kayu berlapis lilin** (Demaratus memperingatkan serangan Persia dengan menulis di kayu lalu melapisi lilin). **Tinta tak tampak**: Pliny the Elder memakai getah *thithymallus*, tulisan menghitam bila dipanaskan. **Bola sutra berlapis lilin** pada Cina kuno, ditelan pembawa pesan. |
> > | **Renaisans** | **Johannes Trithemius**: *Steganographia* (1499, steganografi berbasis karakter) dan *Polygraphiae* (1518). **Giovanni Battista Porta**: menulis di **kulit telur rebus** dengan tinta tawas dan cuka yang meresap lewat pori; pesan terbaca setelah kulit dikupas. |
> > | **Perang Dunia** | **Tinta tak tampak** dari susu, sari buah, cuka, urine (dibaca dengan pemanasan atau sinar ultraviolet); **null cipher** Kedubes Jerman. |
> > | **Modern** | Steganografi digital pada citra, audio, video, teks. |
> >
> > ### Null Cipher
> >
> > Pesan sebenarnya disisipkan di antara kata-kata tak bermakna dengan **aturan pengambilan huruf**. Pesan Kedubes Jerman (PD II): *Apparently neutral's protest is thoroughly discounted and ignored. Isman hard hit. Blockade issue affects pretext for embargo on by-products, ejecting suets and vegetable oils.*
> >
> > Ambil **huruf kedua** tiap kata: **`Pershing sails from NY June 1`**. Contoh lain: dari *"Fishing freshwater bends and saltwater coasts rewards anyone feeling stressed..."* ambil huruf **ketiga** tiap kata: **`Send Lawyers, Guns, and Money`**.
> >
> > ### Steganografi dalam Budaya dan Isu Terorisme
> >
> > Steganografi muncul di film *Mercury Rising* dan *A Beautiful Mind*. Ilmu ini "naik daun" setelah **11 September 2001**, ketika FBI menuding **Al-Qaidah** menyisipkan pesan rahasia pada video atau gambar yang rutin dirilis di internet.
> >
> > ```mermaid
> > timeline
> >     title Sejarah Steganografi
> >     440 SM : Tato di kepala budak
> >            : Tablet berlapis lilin
> >     Abad 1 : Tinta tak tampak Pliny
> >     1499 : Steganographia Trithemius
> >     Abad 16 : Telur rebus Porta
> >     PD II : Tinta tak tampak
> >           : Null cipher
> >     2001 : Isu terorisme
> >     Kini : Steganografi digital
> > ```

> [!cornell] #### Summary
>
> **Steganografi** (*steganos* + *graphien* = tulisan tersembunyi) menyembunyikan **keberadaan** pesan agar tidak menimbulkan kecurigaan, berbeda dengan **kriptografi** yang menyembunyikan **makna**. Motivasinya adalah **Prisoner's Problem** (Simmons, 1983): cipherteks yang tampak acak justru mengundang curiga. Sejarahnya dibagi menjadi **kuno** (tato kepala budak, tablet lilin, tinta tak tampak, bola sutra), **renaisans** (Trithemius, telur rebus Porta), **perang dunia** (tinta tak tampak, **null cipher**), dan **modern** (digital). Null cipher mengambil huruf pada posisi tertentu dari tiap kata (mis. huruf kedua: *"Pershing sails from NY June 1"*). Steganografi sempat jadi sorotan setelah tuduhan penggunaannya oleh teroris pasca 9/11.

> [!ad-libitum]- Additional Information
>
> #### Teknik Klasik Lain
>
> **Akrostik** (huruf pertama tiap baris/kalimat membentuk pesan), **microdot** (foto pesan diperkecil menjadi titik seukuran titik di akhir kalimat; dipakai mata-mata Jerman PD II), **grille cipher** (kartu berlubang diletakkan di atas teks), dan **semagram** (pesan tersembunyi dalam gambar, mis. panjang rumput di sketsa). Bandingkan dengan [[Sejarah Kriptografi]].
>
> #### Kerckhoffs untuk Steganografi
>
> Sama seperti kriptografi, keamanan steganografi seharusnya tidak bergantung pada kerahasiaan **algoritma**, tetapi pada **stego-key**. Steganografi yang mengandalkan "tak ada yang tahu caranya" disebut *security through obscurity* ([[Terminologi Dasar Kriptografi]]).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis program Python yang membangkitkan **null cipher**: memberi pesan rahasia dan kamus kata, menghasilkan kalimat yang huruf ke-$n$ tiap katanya membentuk pesan.
> 2. Cari contoh microdot dan akrostik dalam sejarah, lalu bandingkan **kapasitas** dan **deteksi**nya.
>
> #### Bacaan Lanjutan
>
> - David Kahn, *The Codebreakers*, Bab tentang steganografi.
> - Simmons, G. J. (1983), *The Prisoners' Problem and the Subliminal Channel*, CRYPTO '83.
> - Fridrich, J., *Steganography in Digital Media*, Cambridge University Press.

---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Pendekatan Static Analysis
>
> > ## Questions/Cues
> >
> > - Apa kelebihan dan kekurangan menganalisis source code dibanding executable?
> > - Bagaimana human analysis dan inspeksi IEEE 1028 berperan dalam static analysis?
> > - Mengapa type checker dan compiler warning (-Wall) berguna untuk keamanan?
> > - Apa bahaya tersembunyi dari unreachable/dead code, dan apa pelajaran dari Apple "goto fail"?
> > - Apa keterbatasan mendasar dari automated static analysis tools?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W06 Static Analysis — bagian "Source vs. Executables")
> > - IF4053 Keamanan Perangkat Lunak (W06 Static Analysis — bagian "(Some) Static analysis approaches")
> > - IF4053 Keamanan Perangkat Lunak (W06 Static Analysis — bagian "Automated tool limitations")
>
> > ### Source Code vs Executable: Memilih Objek Analisis
> >
> > Static analysis dapat dilakukan pada **source code** maupun **object/executable code**. Umumnya source code yang dipakai, tetapi sebagian tool mendukung analisis object code. Menganalisis **source code** memberi banyak keunggulan: ia menyediakan **konteks** jauh lebih kaya (tool yang hanya melihat executable bisa kehilangan informasi penting); dapat memeriksa **nama variabel dan komentar** yang sering sangat membantu memahami maksud kode; memungkinkan **memperbaiki** masalah yang ditemukan secara langsung (sulit dilakukan bila hanya punya executable); dan kode sumber sukar di-decompile sehingga lebih jujur merepresentasikan niat developer.
> >
> > Namun source code juga punya **kekurangan**. Source bisa **menyesatkan** tool karena yang benar-benar berjalan adalah executable, bukan source (bila ada perbedaan akibat optimisasi compiler atau makro). Selain itu, source sering **tidak tersedia** untuk program proprietary off-the-shelf — meski untuk perangkat lunak **open source** dan kode **custom** biasanya bisa diperoleh. **Bytecode** (misalnya Java) berada di antara keduanya: lebih kaya konteks dibanding binary murni tetapi tetap merupakan artefak hasil kompilasi.
> >
> > Pilihan objek analisis ini menentukan jenis alat yang relevan. FindBugs misalnya bekerja pada bytecode JVM, sedangkan PMD bekerja pada source Java — keduanya menganalisis program Java yang sama tetapi pada level representasi berbeda.
> >
> > ### Spektrum Pendekatan Static Analysis
> >
> > Ada beragam pendekatan static analysis, dan orang berbeda mengelompokkannya dengan cara berbeda. Daftar pada perkuliahan mencakup: **human analysis** (termasuk peer review), **type checkers**, **compiler warnings**, **style checkers / defect finders / quality scanners**, serta **security analysis** yang dibagi lagi menjadi text scanner dan analisis yang lebih dalam dari sekadar teks, ditambah **property checkers** dan **knowledge extraction**. Formal methods dibahas terpisah.
> >
> > ```mermaid
> > flowchart TD
> >     R["Pendekatan Static Analysis"] --> H["Human analysis<br/>(peer review, inspeksi IEEE 1028)"]
> >     R --> T["Type checkers"]
> >     R --> C["Compiler warnings (-Wall)"]
> >     R --> Q["Style/quality scanners<br/>(FindBugs, PMD)"]
> >     R --> SEC["Security analysis"]
> >     SEC --> TX["Text scanners"]
> >     SEC --> BY["Beyond text scanners"]
> >     R --> P["Property checkers"]
> >     R --> K["Knowledge extraction"]
> > ```
> >
> > Mari uraikan satu per satu. **Human (manual) analysis** unggul karena manusia hebat membaca **konteks dan intent** kode, tetapi manusia cepat **bosan dan kewalahan**, serta **mahal** — apalagi jika harus menganalisis executable. Bentuknya bisa satu orang ("desk-checking") atau **peer review**. Bentuk paling formal adalah **inspeksi** menurut standar **IEEE 1028**, yang mendefinisikan peran-peran khusus dalam grup termasuk peran **"reader"**. Inspeksi dapat difokuskan pada isu spesifik, misalnya "Apakah semua yang seharusnya diautentikasi memang tercakup oleh proses autentikasi?".
> >
> > **Type checkers** banyak bahasa memiliki pemeriksaan tipe statis bawaan, dengan tingkat ketegasan berbeda: C/C++ tidak terlalu kuat (sering harus disiasati), sedangkan Java/C# lebih kuat (interface dan sebagainya mempermudah). Type checker mampu mendeteksi sebagian defect — termasuk sebagian security defect — sebelum dirilis, sekaligus berguna mendokumentasikan intent. Sarannya: bekerjalah dengan type system seketat mungkin, namun waspadai diminishing returns.
> >
> > ### Compiler Warnings dan Bahaya Unreachable Code
> >
> > **Compiler warnings** bukan spesifik keamanan tetapi sangat berguna. Aktifkan peringatan compiler/interpreter sebisa mungkin dan **perbaiki apa pun yang ditemukan** — contohnya `gcc -Wall -pedantic -Wextra` atau `use strict` di Perl. Masukkan flag ini ke dalam perintah build (misalnya melalui GNU autoconf archive: `AX_CFLAGS_WARN_ALL`, `AX_APPEND_COMPILE_FLAGS([-Wextra])`). "Perbaiki" hingga tidak ada warning lagi meski secara teknis bukan masalah, supaya **warning baru langsung kelihatan** sebagai isu baru. Alasannya: warning dapat mendeteksi kerentanan keamanan dan memperbaiki hasil tool lain, dan mengaktifkannya belakangan sering mahal karena kode yang tidak ditulis dengan warning di pikiran butuh banyak perubahan.
> >
> > Sebuah catatan khusus tentang **unreachable code** (alias **dead code**). Sebagian flag compiler dapat mendeteksinya, misalnya `clang -Wunreachable-code`. Dead code tidak pernah dieksekusi sehingga dengan sendirinya tidak dapat menyebabkan kerentanan — **tetapi** ia bisa **menandai masalah keamanan serius**: ia mungkin mengindikasikan dilewatinya kode yang seharusnya berjalan, seperti validasi input atau **autentikasi**. Contoh termasyhur adalah bug Apple **"goto fail; goto fail;"**, di mana baris goto ganda menyebabkan verifikasi signature TLS dilewati. Karena itu: cari unreachable code, lalu **hapus atau gunakan**. Twist menarik: gcc dulu mendukung `-Wunreachable-code` tetapi kini diam-diam menerima dan mengabaikan opsi tersebut, sehingga sebaiknya gunakan tool lain seperti clang untuk mendeteksi dead code.
> >
> > ### Style Checkers, Quality Scanners, dan Keterbatasan Otomasi
> >
> > **Style checkers / defect finders / quality scanners** membandingkan kode (umumnya source) terhadap sekumpulan aturan "style" pre-canned atau pola defect yang mungkin. Tujuannya membuat kode lebih mudah dipahami/dimodifikasi serta menghindari kesalahan umum atau pola yang cenderung menimbulkannya. Sebagian berusaha menjaga **FP rate rendah** dengan tidak melaporkan sesuatu kecuali memang defect. Penting dicatat: tool yang fokusnya bukan keamanan pun tetap berguna — kode yang "bersih" lebih mudah dianalisis oleh tool security-specific (lebih sedikit FP/FN) dan lebih mudah direview manusia, serta tool semacam ini sering lebih cepat, murah, dan mudah karena banyak yang tidak perlu whole-program analysis. Untuk pengguna Java, pertimbangkan quality scanner **FindBugs** atau **PMD** sebagai langkah precursor.
> >
> > Akhirnya, automated tools memiliki **keterbatasan mendasar**. Tool umumnya **tidak "memahami"** arsitektur sistem, misi/tujuan sistem, lingkungan teknis, maupun lingkungan manusia — pengecualian relatif hanya pada formal methods. Mayoritas tool memiliki **FP dan/atau FN rate yang signifikan**. Karena itu, static analysis paling baik diposisikan sebagai **bagian dari proses** pengembangan perangkat lunak yang aman, **bukan satu-satunya** mekanisme pertahanan.

> [!cornell] #### Summary
>
> Static analysis dapat menyasar **source code** (konteks kaya, bisa baca nama variabel & komentar, bisa langsung diperbaiki) atau **executable** (tersedia bahkan untuk proprietary, tetapi miskin konteks). Pendekatannya beragam: **human analysis** dengan peer review dan inspeksi formal **IEEE 1028** (peran "reader"), **type checkers**, **compiler warnings** (`-Wall -pedantic -Wextra`), serta **style/quality scanners** seperti FindBugs dan PMD. **Unreachable/dead code** sendiri tak berbahaya namun bisa menandai dilewatinya autentikasi atau validasi — seperti bug Apple **"goto fail"** — sehingga harus dihapus atau digunakan. Karena automated tools tidak memahami arsitektur, misi, maupun lingkungan dan punya FP/FN signifikan, static analysis harus menjadi **bagian dari proses**, bukan satu-satunya pertahanan.

> [!ad-libitum]- Additional Information
>
> #### Anatomi Bug Apple "goto fail" Lebih Dalam
> Bug CVE-2014-1266 muncul di fungsi `SSLVerifySignedServerKeyExchange` pada pustaka Secure Transport Apple. Akibat duplikasi baris `goto fail;` tanpa kurung kurawal pada blok `if`, baris kedua selalu dieksekusi tanpa syarat, melompati pemanggilan `sslRawVerify` — sehingga signature server **tidak pernah benar-benar diverifikasi** dan koneksi TLS rentan terhadap man-in-the-middle. Kode setelah goto kedua menjadi unreachable; sebuah tool dead-code detection (atau gaya koding yang mewajibkan kurung kurawal, atau `-Wunreachable-code`) akan menangkapnya. Insiden ini menjadi studi kasus klasik mengapa konvensi gaya dan warning bukan formalitas kosmetik melainkan kontrol keamanan.
>
> #### Soundness vs Completeness dalam Pendekatan
> Pendekatan static dapat dikelompokkan secara teoretis berdasarkan jaminan: pendekatan **sound** menjamin tidak ada false negative (semua masalah dilaporkan, dengan biaya banyak FP) — relevan untuk property checker dan formal methods; pendekatan **complete** menjamin tidak ada false positive (setiap laporan pasti benar, dengan biaya FN). Karena teorema Rice membuat analisis sempurna mustahil secara umum, setiap tool memilih posisi pada spektrum ini. Memahami posisi sebuah tool membantu menjelaskan mengapa text scanner (cepat, FP/FN tinggi) cocok sebagai precursor, sedangkan property checker (mahal, sound) cocok untuk komponen kritis.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis program C kecil yang sengaja menanam dead code setelah blok validasi input, lalu bandingkan deteksi antara `gcc -Wall`, `clang -Wunreachable-code`, dan cppcheck. Catat tool mana yang berhasil menandainya.
> 2. Lakukan inspeksi gaya IEEE 1028 sederhana pada modul kode milik tim: tetapkan peran reader/recorder/moderator, fokuskan checklist pada "apakah semua jalur sensitif tercakup autentikasi", dan dokumentasikan temuan.
>
> #### Bacaan Lanjutan
> - David A. Wheeler, "The Apple goto fail vulnerability: lessons learned" — http://www.dwheeler.com/essays/apple-goto-fail.html
> - IEEE Std 1028 — Standard for Software Reviews and Audits (definisi peran inspeksi).
> - GNU autoconf archive — macro `AX_CFLAGS_WARN_ALL`, `AX_APPEND_COMPILE_FLAGS`: https://www.gnu.org/software/autoconf-archive/

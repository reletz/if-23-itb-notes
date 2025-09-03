---
type: Note
cssclasses:
- cornell-notes
---
_Back to_ [[II4023 Forensik Digital]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > - Apa itu forensik foto?
> >     
> > - Apa tujuan utamanya?
> >     
> > - Apa saja teknik yang digunakan?
> >     
> > - Di mana forensik foto diaplikasikan?
> >     
> > - Apa saja tantangan yang dihadapi?
> >     
> >
> > ## Reference Points
> >
> > - Slides II4023-05-1-Photo-Forensics.pdf
> >     
> 
> > ### Definisi Forensik Foto
> >
> > Forensik Foto adalah cabang ilmu forensik yang berfokus pada **analisis citra digital untuk mengungkap informasi tersembunyi, mendeteksi manipulasi, dan memastikan keasliannya.** Ini adalah proses ilmiah untuk memeriksa dan memvalidasi sebuah gambar.
> >
> > ### Tujuan Utama Forensik Foto
> >
> > Terdapat tiga sasaran utama dalam melakukan analisis forensik pada sebuah foto:
> >
> > 1. **Memverifikasi Keaslian (**_**Authenticity**_**):** Mengonfirmasi apakah sebuah gambar benar-benar asli atau telah diubah dari versi orisinalnya.
> >     
> > 2. **Mengidentifikasi Manipulasi:** Mendeteksi adanya perubahan, editan, atau pemalsuan dalam sebuah foto, seperti penambahan atau penghapusan objek.
> >     
> > 3. **Mengekstrak Data Tersembunyi:** Memulihkan metadata dan informasi lain yang tersemat di dalam file gambar yang mungkin tidak terlihat secara kasat mata.
> >     
> >
> > ### Teknik-Teknik Analisis
> >
> > Untuk mencapai tujuan di atas, seorang analis forensik menggunakan berbagai macam teknik, di antaranya:
> >
> > - **Analisis Metadata:** Memeriksa data yang tersemat di dalam file gambar, seperti data **EXIF** (_Exchangeable Image File Format_). Data ini bisa berisi informasi seperti model kamera, tanggal pengambilan gambar, pengaturan eksposur, hingga koordinat GPS.
> >     
> >
> > - **Error Level Analysis (ELA):** Sebuah teknik yang menyoroti perbedaan tingkat kompresi dalam sebuah gambar. Bagian yang diedit atau ditambahkan seringkali memiliki tingkat kompresi yang berbeda dari sisa gambar, dan ELA membuatnya terlihat menonjol.
> >     
> >
> > - **Analisis** Citra **(**_**Image Analysis**_**):** Membandingkan properti visual dari gambar, seperti pencahayaan, bayangan, noise, dan artefak kompresi untuk menemukan inkonsistensi yang mungkin menandakan manipulasi.
> >     
> >
> > - **Deteksi Watermark:** Mengidentifikasi adanya tanda air digital (_digital watermarks_) atau tanda tangan digital (_digital signatures_) yang mungkin telah ditambahkan untuk melindungi hak cipta atau memvalidasi keaslian.
> >     
> >
> > ### Aplikasi Forensik Foto
> >
> > Keahlian ini sangat penting dan diterapkan di berbagai bidang:
> >
> > - **Investigasi Kriminal:** Memeriksa barang bukti digital, misalnya memvalidasi foto dari TKP atau mengungkap bukti yang coba dihilangkan dari sebuah gambar.
> >     
> > - **Otentikasi Media:** Memverifikasi keaslian gambar yang digunakan dalam berita untuk melawan hoaks dan disinformasi.
> >     
> > - **Otentikasi Karya Seni:** Mengonfirmasi asal-usul dan integritas karya seni digital atau foto karya seni.
> >     
> > - **Verifikasi Media Sosial:** Memeriksa kredibilitas foto-foto viral untuk memastikan tidak ada rekayasa.
> >     
> >
> > ### Tantangan dalam Forensik Foto
> >
> > Seiring berkembangnya teknologi, bidang ini juga menghadapi berbagai tantangan:
> >
> > - **Alat Edit yang Canggih:** Perangkat lunak manipulasi gambar yang semakin kuat dan mudah diakses oleh publik membuat editan semakin sulit dideteksi.
> >     
> > - **Artefak Kompresi:** Proses kompresi file (misalnya, saat mengunggah ke media sosial) dapat merusak atau menghilangkan jejak digital penting, sehingga analisis menjadi lebih sulit.
> >     
> > - **Metadata Terbatas:** Metadata bisa dengan mudah dihapus atau diubah, sehingga analis kehilangan salah satu sumber informasi utama.
> >     
> > - **Teknologi Deepfake:** Penggunaan kecerdasan buatan (AI) untuk menciptakan gambar atau video palsu yang sangat realistis menjadi ancaman terbesar, karena seringkali tidak meninggalkan jejak manipulasi konvensional.
> >     

> [!cornell] #### Summary
> Forensik foto adalah disiplin ilmu krusial yang bertujuan untuk memverifikasi keaslian dan mendeteksi manipulasi pada citra digital dengan menggunakan berbagai teknik seperti analisis metadata (EXIF) dan _**Error Level Analysis**_ (ELA). Meskipun sangat vital dalam investigasi kriminal dan otentikasi media, bidang ini menghadapi tantangan besar dari alat edit yang semakin canggih dan kemunculan teknologi _**deepfake**_ yang mengancam integritas bukti visual di era digital.

> [!ad-libitum]- Additional Information
> 
>  #### Pendalaman Teknis: Cara Kerja ELA
>  _Error Level Analysis_ (ELA) bekerja dengan prinsip bahwa setiap kali gambar berformat JPEG disimpan, sejumlah kecil kualitas akan hilang karena kompresi. Jika sebuah gambar adalah asli, seluruh bagiannya seharusnya kehilangan kualitas pada tingkat yang seragam. Namun, jika sebuah objek ditambahkan dari gambar lain, objek tersebut akan memiliki "sejarah kompresi" yang berbeda. ELA secara esensial menyimpan ulang gambar pada tingkat kualitas tertentu (misalnya 95%) dan menghitung perbedaan matematis antara gambar asli dengan versi yang disimpan ulang. Area yang dimanipulasi akan menunjukkan "tingkat kesalahan" (_error level_) yang jauh lebih tinggi (terlihat lebih cerah) dibandingkan area asli.
> 
> #### Analogi Sederhana: Detektif di TKP
> 
> Anggap seorang analis forensik foto sebagai detektif yang memeriksa sebuah foto seolah-olah itu adalah Tempat Kejadian Perkara (TKP).
> 
> - **Metadata (EXIF):** Ini seperti memeriksa KTP korban untuk mengetahui identitas, waktu, dan tempat lahir.
> - **Inkonsistensi Pencahayaan:** Ini seperti menemukan jejak sepatu basah di ruangan yang kering. Arah bayangan dari dua objek yang bersebelahan tidak cocok—ini adalah tanda bahwa salah satu objek mungkin ditambahkan.
> - _**Noise**_ **Kamera:** Setiap sensor kamera digital memiliki pola _noise_ yang unik, seperti sidik jari. Jika sebagian area foto memiliki pola _noise_ yang berbeda, itu menandakan area tersebut berasal dari kamera lain.
>   
> #### Eksplorasi Mandiri
>  - **Coba Sendiri:** Kunjungi situs web seperti [FotoForensics.com](https://FotoForensics.com). Unggah sebuah gambar yang Anda tahu asli, dan gambar lain yang sudah Anda edit sedikit (misalnya, menambahkan teks atau objek kecil). Jalankan analisis ELA pada keduanya dan bandingkan hasilnya. Anda akan melihat secara langsung bagaimana area yang dimanipulasi tampak berbeda.
> 
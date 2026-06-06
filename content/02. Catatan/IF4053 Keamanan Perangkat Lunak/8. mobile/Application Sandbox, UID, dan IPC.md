---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Application Sandbox, UID, dan IPC
>
> > ## Questions/Cues
> >
> > - Bagaimana model izin berbasis pengguna Linux menjadi fondasi sandbox Android?
> > - Mengapa setiap aplikasi diberi UID unik dan dijalankan di proses terpisah?
> > - Apa makna prinsip "place access controls close to the resource"?
> > - Bagaimana fitur Shared UID dapat merusak Application Sandbox?
> > - Mengapa media codec dipisahkan ke proses ber-privilege rendah?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W10 Mobile Security — bagian "Application Sandbox & Privilege Separation")
>
> > ### Keamanan di Level Linux Kernel
> >
> > Fondasi sandbox Android terletak pada mekanisme keamanan **Linux kernel**. Linux menerapkan **model izin berbasis pengguna (user-based permissions model)** dan **isolasi proses (process isolation)**: setiap aplikasi memperoleh sandbox-nya sendiri berdasarkan pemisahan proses. Tujuannya adalah melindungi sumber daya satu pengguna dari pengguna lain—setiap aplikasi berjalan dalam proses Linux-nya sendiri untuk mengamankan komunikasi antar-proses (**IPC**).
> >
> > Secara konkret, mekanisme ini **mencegah pengguna A membaca file milik pengguna B**, memastikan **pengguna A tidak dapat mengakses CPU dan memori milik pengguna B**, serta **mencegah pengguna A mengakses perangkat milik pengguna B** (misalnya telephony, GPS, Bluetooth). Karena Android memetakan setiap aplikasi ke "pengguna" Linux yang berbeda, isolasi antar-aplikasi langsung diwarisi dari isolasi antar-pengguna yang sudah matang di Linux. Selain itu, Android OS menambahkan **isolasi dan proteksi memori proses**, **enkripsi filesystem**, **akses per-aplikasi ke perangkat keras**, serta **pembatasan per-aplikasi atas memori/CPU** dan sumber daya lain seperti koneksi jaringan, kamera, lokasi (GPS), Bluetooth, dan SMS/MMS.
> >
> > ### Application Sandbox: UID Unik per Aplikasi
> >
> > **Application Sandbox** bekerja dengan menetapkan **User ID (UID) unik** untuk setiap aplikasi Android dan menjalankannya sebagai pengguna tersebut dalam **proses terpisah**. Ketika sebuah **Activity** baru diluncurkan, proses barunya **tidak berjalan sebagai launcher**, melainkan dengan **identitasnya sendiri** sesuai permission yang dispesifikasikan pengembang. Setiap program dapat meminta **Activity Manager** meluncurkan hampir aplikasi apa pun, dan aplikasi tersebut akan berjalan dengan UID-nya sendiri—bukan UID pemanggil.
> >
> > Implikasinya: **aplikasi A tidak diizinkan** melakukan hal jahat seperti membaca data aplikasi B atau menelepon tanpa permission. **Seluruh pustaka, runtime aplikasi, dan semua aplikasi berjalan di dalam Application Sandbox pada level kernel.** Lebih rinci, setiap aplikasi berjalan dalam **UID dan VM-nya sendiri**, menerapkan **model pemisahan privilege default (default privilege separation)** yang memberi fitur keamanan secara *instant*. Sandbox ini menangani **resource sharing** (CPU, memori) dan **proteksi data** melalui **FS permissions**, serta menyediakan **authenticated IPC** lewat **Unix domain sockets**.
> >
> > Prinsip desain kunci di sini adalah **"place access controls close to the resource, not in the VM"**—tempatkan kontrol akses dekat dengan sumber daya, bukan di VM. Alasannya: **perimeter yang lebih kecil lebih mudah dilindungi (smaller perimeter ⇒ easier to protect)**. Aplikasi Linux default memiliki *terlalu banyak* kuasa, sehingga Android **mengunci akses pengguna untuk aplikasi "default"**. Namun ada keseimbangan: aplikasi yang dikunci sepenuhnya akan **membatasi inovasi**, dan **mengandalkan pengguna membuat keputusan keamanan yang benar itu rumit (tricky)**.
> >
> > ```mermaid
> > flowchart TB
> >     subgraph Kernel["Linux Kernel — Application Sandbox"]
> >         A["App A<br/>UID 10001<br/>Proses + VM sendiri"]
> >         B["App B<br/>UID 10002<br/>Proses + VM sendiri"]
> >     end
> >     A -- "Authenticated IPC<br/>(Intent / Unix domain socket)" --> B
> >     A -. "akses langsung DITOLAK" .-> B
> > ```
> >
> > ### Shared UID Regression
> >
> > Fitur **Shared UID** memungkinkan **dua aplikasi yang ditandatangani dengan kunci yang sama untuk berbagi UID**, memberikan **interaktivitas lebih** karena keduanya dapat saling mengakses data dan berjalan dalam proses yang sama. Namun fitur ini membuka celah serius. Mengikuti prinsip **"malware does not hurt computers, malware authors do"**, masalahnya muncul ketika kepercayaan disalahgunakan.
> >
> > **Panasonic melaporkan bahwa shared UID ternyata broken (rusak)**. Skenario ancamannya: **jika pengguna memasang malware, penyerang dapat berbagi UID dengan aplikasi yang sudah terinstal**—misalnya **browser**. Begitu malware berbagi UID dengan browser, ia mewarisi seluruh akses dan data browser tersebut, sehingga **merusak Application Sandbox** secara efektif. Inilah mengapa shared UID kini sangat tidak dianjurkan dan ditinggalkan pada Android modern: berbagi identitas berarti berbagi seluruh batas keamanan, meniadakan isolasi yang menjadi inti model keamanan Android.
> >
> > ### Privilege Separation Lebih Lanjut
> >
> > Android memperdalam pemisahan privilege untuk komponen yang secara inheren berisiko. **Media codec sangat kompleks ⇒ sangat tidak aman (very insecure)**. Diakui bahwa **tidak mungkin menemukan semua isu pada pustaka media**, sehingga strategi yang diambil adalah mengisolasi, bukan menyempurnakan. Pustaka media **OpenCore "dibuang" (banished) ke proses dengan privilege lebih rendah**, yaitu **mediaserver**.
> >
> > Strategi ini **langsung membuahkan hasil (immediately paid off)**. Ketika **Charlie Miller melaporkan kerentanan pada parsing MP3** (terdokumentasi sebagai **oCERT-2009-002**), dampaknya terbatas karena kode parsing yang rentan berjalan di **mediaserver** yang ber-privilege rendah—bukan di proses ber-privilege tinggi. Dengan kata lain, kerentanan tetap ada, tetapi **blast radius**-nya diperkecil drastis: penyerang yang mengeksploitasi codec hanya memperoleh hak proses mediaserver yang terbatas, bukan kendali penuh atas perangkat. Ini adalah penerapan nyata prinsip *least privilege* pada komponen yang diketahui rawan.

> [!cornell] #### Summary
>
> Keamanan Android berakar pada **model izin berbasis pengguna** dan **isolasi proses** Linux yang mencegah satu pengguna membaca file, memori, atau perangkat pengguna lain. **Application Sandbox** menetapkan **UID unik per aplikasi**, menjalankannya di **proses dan VM terpisah** dengan **pemisahan privilege default** serta **authenticated IPC via Unix domain socket**, mengikuti prinsip **"place access controls close to the resource"** (perimeter kecil lebih mudah dilindungi). Fitur **Shared UID** merusak isolasi ini: aplikasi yang ditandatangani sama dapat berbagi UID, dan malware yang berbagi UID dengan browser efektif **membobol sandbox**. Untuk komponen rawan seperti **media codec**, Android menerapkan **privilege separation lebih lanjut**—memindahkan OpenCore ke **mediaserver** ber-privilege rendah, sehingga kerentanan parsing MP3 (Charlie Miller, oCERT-2009-002) memiliki dampak terbatas.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — DI LUAR sumber
>
> Mekanisme di balik IPC Android adalah **Binder**, driver kernel yang menyertakan UID/PID pemanggil ke setiap transaksi sehingga server (misalnya `mediaserver`) dapat memberlakukan permission terhadap klien tanpa bisa dipalsukan. Sejak Android 4.3, **SELinux** menambahkan lapisan **Mandatory Access Control** di atas DAC berbasis UID: meski sebuah proses berhasil di-exploit, domain SELinux-nya (misalnya `mediaserver`, `untrusted_app`) tetap membatasi syscall dan file yang boleh diakses. Pelajaran dari Stagefright (2015)—kerentanan parsing media yang lebih parah—mendorong Android Nougat memecah `mediaserver` menjadi banyak proses lebih kecil (`mediacodec`, `mediaextractor`, `mediadrmserver`), masing-masing dengan sandbox SELinux ketat: penyempurnaan langsung dari prinsip privilege separation yang dibahas di sini.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pada emulator, jalankan `ps -A -o USER,PID,NAME` dan amati bagaimana tiap aplikasi memperoleh UID `u0_aXX` yang berbeda; verifikasi isolasi dengan mencoba membaca direktori `/data/data/<paket lain>`.
> 2. Tulis dua aplikasi sederhana dengan `android:sharedUserId` yang sama, amati bagaimana keduanya berbagi data—lalu dokumentasikan mengapa praktik ini berbahaya dan sudah deprecated.
> 3. Telusuri arsitektur mediaserver modern via `dumpsys media.metrics` dan petakan proses-proses media yang terpisah ke prinsip least privilege.
>
> #### Bacaan Lanjutan
> - oCERT-2009-002 advisory dan tulisan Charlie Miller tentang fuzzing parser media mobile.
> - "Android Security Internals" — bab Binder dan Application Sandbox.
> - Joshua Drake et al., "Stagefright: Scary Code in the Heart of Android" (Black Hat 2015).

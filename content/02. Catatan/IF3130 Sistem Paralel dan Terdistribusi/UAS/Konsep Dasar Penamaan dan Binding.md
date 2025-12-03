---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Konsep Dasar Penamaan (Naming), Resolusi, & Binding
> 
> > ## Questions/Cues
> >
> > - **Entitas yang Dinamai**
> >     
> > - **Naming Service vs Directory Service**
> >     
> > - **Perbedaan Name, Address, Route**
> >     
> > - **Uniqueness & Hierarki**
> >     
> > - **Konsep Context**
> >     
> > - **Name Space**
> >     
> > - **Mekanisme Resolution**
> >     
> > - **Tipe-tipe Binding (Static, Early, Late)**
> >     
> >
> > ## Reference Points
> >
> > - Slides: Page 1-17
> >     
> > - Fokus: Teori Dasar & Definisi
> >     
> 
> > ### 1. Entitas & Kebutuhan Penamaan
> >
> > Dalam sistem terdistribusi, nama (Naming) adalah hal fundamental. Kita memberi nama pada berbagai entitas agar bisa diacu dan digunakan.
> >
> > - **Contoh Entitas:** Nama user, nama mesin (hostname), nama file, device, variabel program, hingga layanan jaringan.
> >     
> > - **Contoh Nyata:** `"My Laptop"` (User friendly), `Bromo.if.itb.ac.id` (DNS), `167.205.32.2` (IP Address), `00:14:51:ec:fa:1d` (MAC Address).
> >     
> >
> > ### 2. Naming Service (Layanan Penamaan)
> >
> > Layanan ini bertugas untuk melakukan **lookup names**: menerima sebuah nama dan mengembalikan alamat (address) atau informasi lain terkait nama tersebut.
> >
> > - **Implementasi:** Bisa sesederhana pencarian dalam sebuah file teks (seperti `/etc/hosts`), program client/server khusus, atau query basis data yang kompleks.
> >     
> >
> > ### 3. Distingsi: Name vs Address vs Route vs Binding
> >
> > Sangat penting membedakan keempat istilah ini (berdasarkan RFC 1498):
> >
> > - **Name (Nama):** Mengidentifikasi _apa_ yang kita cari/inginkan. Sifatnya logis. Contoh: `www.google.com`.
> >     
> > - **Address (Alamat):** Mengidentifikasi _di mana_ lokasi objek tersebut berada. Sifatnya fisik atau lokasi jaringan. Contoh: `142.250.1.100`.
> >     
> > - **Route (Rute):** Mengidentifikasi _bagaimana_ cara mencapai lokasi tersebut dari posisi kita saat ini.
> >     
> > - **Binding (Pengikatan):** Asosiasi atau pemetaan antara Nama dan Alamat. Resolusi nama adalah proses menemukan binding ini.
> >     
> >
> > ### 4. Uniqueness (Keunikan) & Context
> >
> > Menjamin nama itu unik secara global sangat sulit pada skala besar (Internet).
> >
> > - **Solusi Hierarki:** Penggunaan struktur hierarkis memungkinkan pengelolaan keunikan yang terdesentralisasi. Contoh: IP Address (Network ID + Host ID) atau Domain Name (`itb.ac.id` mengatur subdomain di bawahnya).
> >     
> > - **Konsep Context:** Nama selalu diinterpretasikan relatif terhadap "konteks" tertentu. Sebuah nama harus unik dalam konteksnya, tapi boleh sama di konteks lain.
> >     
> > 	- _Contoh:_ File `/etc/httpd/conf/httpd.conf` adalah nama unik dalam konteks sistem file komputer tertentu. Di komputer lain, path yang sama merujuk ke file berbeda.
> > 			
> > 	- _Naming System:_ Adalah kumpulan konteks yang terhubung dan menyediakan operasi yang sama (misal sistem DNS atau LDAP).
> >         
> >
> > ### 5. Namespace & Resolution
> >
> > - **Name Space:** Wadah (container) untuk kumpulan nama. Namespace bisa memiliki **Scope**, yaitu wilayah di mana nama tersebut valid dan menunjuk ke suatu objek. Struktur namespace seringkali berbentuk pohon (tree).
> >     
> > - **Name Resolution (Resolusi):** Proses pencarian (lookup) untuk mengembalikan binding dari sebuah nama.
> >     
> >     - Contoh: Resolusi `www.itb.ac.id` menghasilkan `167.205.1.34`.
> >         
> >     - Proses resolusi melibatkan pencarian node layanan, pencarian alamat jaringan node, dan penentuan jalur (path).
> >         
> >
> > ### 6. Directory Service
> >
> > Ini adalah perluasan (extension) dari Naming Service.
> >
> > - **Fungsi:** Tidak hanya memetakan nama ke alamat, tapi juga mengasosiasikan nama dengan **atribut-atribut** objek (meta-data).
> >     
> > - **Kapabilitas:** Memungkinkan pencarian berdasarkan atribut (bukan hanya berdasarkan nama).
> >     
> > - **Contoh:** **LDAP** (Lightweight Directory Access Protocol). Kita bisa mencari "Semua printer yang berwarna di Lantai 2".
> >     
> >
> > ### 7. Tipe-Tipe Binding
> >
> > Kapan asosiasi antara nama dan objek/alamat ditetapkan?
> >
> > - **Static Binding (Hard Coded):** Nama dan alamat dipasangkan secara permanen di dalam kode program. Sangat kaku, sulit diubah.
> >     
> > - **Early Binding:** Resolusi (lookup) dilakukan jauh sebelum objek digunakan. Hasil binding seringkali disimpan (cache) untuk digunakan nanti. Efisien tapi kurang fleksibel jika alamat berubah.
> >     
> > - **Late Binding:** Resolusi dilakukan tepat sesaat sebelum objek digunakan. Paling fleksibel karena selalu mendapatkan alamat terkini, namun overhead (waktu tunggu) terjadi setiap kali akses.
> >     

> [!cornell] #### Summary
> 
> Penamaan (Naming) adalah jembatan antara identitas logis (Name) dan lokasi fisik (Address). Naming Service menyediakan mekanisme resolusi untuk memetakan nama ke alamat melalui proses Binding. Untuk menangani skala besar, digunakan hierarki dan konsep Context di mana nama hanya perlu unik dalam lingkup tertentu. Directory Service memperkaya ini dengan menyimpan atribut objek. Binding dapat dilakukan secara statis, early, atau late, tergantung kebutuhan antara efisiensi vs fleksibilitas.

> [!ad-libitum]- Additional Information (Deep Dive)
> 
> #### Perbedaan Naming vs Directory Service
> 
> - **Naming Service:** Seperti buku telepon "White Pages". Anda punya nama ("Budi"), Anda cari nomor teleponnya. Fungsi utamanya pemetaan satu arah (Name -> Location). Contoh: DNS.
>     
> - **Directory Service:** Seperti "Yellow Pages". Anda bisa mencari berdasarkan kategori atau atribut ("Cari tukang ledeng 24 jam"). Anda bisa query atribut objek. Contoh: Active Directory, LDAP.
>     
> 
> #### Struktur Nama LDAP
> 
> Slide menyebutkan format LDAP: `cn=Achmad Imam, o=STEI, c=ID`.
> 
> - **cn:** Common Name.
>     
> - **o:** Organization.
>     
> - **c:** Country.
>     
> - Format ini dibaca dari spesifik (kiri) ke umum (kanan), membentuk hierarki terbalik (Distinguished Name / DN).
>     
> 
> #### Sumber & Referensi:
> 
> - **RFC 1498:** Dokumen standar internet yang mendefinisikan konsep arsitektur penamaan, pengalamatan, dan routing.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Apa perbedaan mendasar antara "Address" dan "Route"?</strong></summary>
> 
> Address mengidentifikasi LOKASI tempat suatu objek berada (koordinat tujuan), sedangkan Route mengidentifikasi JALUR atau cara bagaimana mencapai lokasi tersebut dari titik asal.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Mengapa "Late Binding" dianggap lebih fleksibel dibandingkan "Early Binding"?</strong></summary>
> 
> Karena pada Late Binding, proses lookup dilakukan tepat sebelum objek digunakan. Ini menjamin bahwa alamat yang didapat adalah yang paling mutakhir. Jika objek berpindah lokasi sesaat sebelum akses, Late Binding akan mendeteksinya, sedangkan Early Binding mungkin masih memegang alamat lama (stale) dari cache.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Jelaskan konsep "Context" dalam penamaan!</strong></summary>
> 
> Context adalah himpunan nama-nama yang unik di dalamnya. Sebuah nama selalu diinterpretasikan relatif terhadap konteksnya. Contohnya, nama file "index.html" bisa ada di banyak folder berbeda; nama tersebut unik di dalam satu folder (konteks), tetapi bisa berulang di folder lain.
> 
> </details>
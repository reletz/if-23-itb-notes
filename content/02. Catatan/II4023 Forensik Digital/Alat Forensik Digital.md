_Back to_ [[II4023 Forensik Digital]]

Dalam praktik forensik digital, seorang investigator sangat bergantung pada berbagai macam alat bantu (_tools_) untuk melakukan akuisisi, pemeriksaan, dan analisis barang bukti digital. Berikut adalah beberapa _tools_ penting yang dikategorikan berdasarkan subdomain forensiknya.

#### 1. Forensik Citra (_Image Forensics_)

Alat-alat ini digunakan untuk menganalisis metadata, mendeteksi manipulasi, dan memverifikasi keaslian file gambar.

- **ExifTool**
    
    - **Kegunaan:** Alat bantu _command-line_ yang sangat kuat untuk membaca, menulis, dan mengedit metadata (EXIF, IPTC, XMP, dll.) dari berbagai jenis file, terutama gambar, audio, dan video.
        
    - **Cara Instalasi (Windows):**
        
        1. Unduh versi Windows Executable dari [situs resmi ExifTool](https://exiftool.org/ "null").
        2. Ganti nama file `exiftool(-k).exe` menjadi `exiftool.exe`.
        3. Pindahkan file tersebut ke direktori `C:\Windows`.
        4. Buka Command Prompt dan jalankan dengan perintah `exiftool [nama_file]`.
            
    - Cara Instalasi (Linux/macOS):
        
        Umumnya sudah tersedia di repositori. Gunakan perintah:

        ```bash
        # Untuk Debian/Ubuntu
        sudo apt-get install libimage-exiftool-perl
        # Untuk macOS (menggunakan Homebrew)
        brew install exiftool
        ```
        
    - Cara Instalasi (NixOS):
        
        Tambahkan paket ke configuration.nix:
        
        ```nix
        environment.systemPackages = with pkgs; [
          perlPackages.ImageExifTool
        ];
        ```
        
        Atau gunakan `nix-shell -p perlPackages.ImageExifTool` untuk penggunaan temporer.
        
- **JPEGsnoop**
    
    - **Kegunaan:** Alat bantu untuk mendekode dan menganalisis detail internal dari file JPEG. Sangat berguna untuk mendeteksi apakah sebuah gambar telah diedit, karena dapat mengidentifikasi tanda tangan kompresi dari berbagai software editor foto.
        
    - **Cara Instalasi (Windows):**
        
        1. Unduh aplikasi dari [situs resmi JPEGsnoop](https://www.impulseadventure.com/photo/jpeg-snoop.html "null").
            
        2. Ekstrak file ZIP dan jalankan file `JPEGsnoop.exe`. Aplikasi ini bersifat portabel dan tidak memerlukan instalasi.
            
    - Cara Instalasi (NixOS):
        
        JPEGsnoop adalah aplikasi Windows. Untuk menjalankannya di NixOS, gunakan Wine:
        
        1. Tambahkan `pkgs.wine` ke `configuration.nix` Anda dan _rebuild_.
            
        2. Unduh JPEGsnoop.
            
        3. Jalankan melalui terminal dengan `wine JPEGsnoop.exe`.
            
- **Online Photo Forensics Tools**
    
    - **Kegunaan:** Platform berbasis web yang menyediakan berbagai alat analisis forensik gambar, seperti ELA (_Error Level Analysis_), analisis metadata, dan pencarian _thumbnail_ tersembunyi.
        
    - **Contoh:** [FotoForensics](https://fotoforensics.com/ "null") dan [29a.ch/photo-forensics](https://29a.ch/photo-forensics/ "null").
        
    - **Cara Penggunaan:** Cukup kunjungi situs webnya dan unggah gambar yang ingin dianalisis.
        

#### 2. Forensik Email (_**Email Forensics**_)

Alat-alat ini membantu menganalisis _header_ email untuk melacak asal-usul dan memverifikasi keaslian pesan.

- **MXToolbox Email Header Analyzer, MHA, dan Google Messageheader**
    
    - **Kegunaan:** Ketiga alat ini adalah platform online yang berfungsi sama. Pengguna menyalin _header_ mentah dari sebuah email dan menempelkannya ke dalam alat ini. Alat akan secara otomatis mem-parsing informasi, menampilkan rute pengiriman (_hops_), waktu tunda, dan hasil verifikasi SPF/DKIM dalam format yang mudah dibaca.
        
    - **Cara Penggunaan:**
        
        1. Buka email, cari opsi "Show Original" atau "Tampilkan Asli".
            
        2. Salin seluruh teks _header_.
            
        3. Kunjungi salah satu situs berikut dan tempelkan _header_-nya:
            
            - [MXToolbox](https://mxtoolbox.com/EmailHeaders.aspx "null")
                
            - [MHA (Azure)](https://mha.azurewebsites.net/ "null")
                
            - [Google Messageheader](https://toolbox.googleapps.com/apps/messageheader/ "null")
                

#### 3. Forensik Windows

- **PsTools Suite**
    
    - **Kegunaan:** Kumpulan alat bantu _command-line_ dari Microsoft Sysinternals yang memungkinkan administrator untuk mengelola dan menyelidiki sistem Windows lokal maupun jarak jauh. Alat seperti `pslist` (melihat proses) dan `psloggedon` (melihat pengguna yang login) sangat berguna untuk investigasi.
        
    - **Cara Instalasi:**
        
        1. Unduh PsTools dari [halaman resmi Microsoft](https://docs.microsoft.com/en-us/sysinternals/downloads/pstools "null").
            
        2. Ekstrak file ZIP ke dalam sebuah direktori.
            
        3. Untuk menggunakannya, buka Command Prompt di direktori tersebut, atau tambahkan direktori tersebut ke dalam PATH _environment variable_ Windows.
        

#### 4. Akuisisi Citra Forensik (_**Acquiring Forensics Image**_)

Alat untuk membuat salinan bit-demi-bit (citra forensik) dari sebuah media penyimpanan.

- **Guymager**
    
    - **Kegunaan:** Alat akuisisi citra forensik gratis yang populer di lingkungan Linux. Dikenal karena antarmukanya yang mudah digunakan dan kecepatannya.
        
    - **Cara Instalasi (Linux):**

        ```bash
        # Untuk Debian/Ubuntu
        sudo apt-get update
        sudo apt-get install guymager
        ```

    - Cara Instalasi (NixOS):
        
        Tambahkan paket ke configuration.nix:
    
        ```nix
        environment.systemPackages = with pkgs; [
          guymager
        ];
        ```
        

#### 5. Forensik Memori (_**Memory Forensics**_)

Alat untuk mengakuisisi dan menganalisis konten dari RAM.

- **FTK Imager**
    
    - **Kegunaan:** Alat yang sangat serbaguna dari AccessData. Salah satu fungsinya adalah untuk mengakuisisi citra dari memori fisik (RAM) sebuah sistem yang sedang berjalan.
        
    - **Cara Instalasi (Windows):**
        
        1. Kunjungi [situs web AccessData](https://www.exterro.com/ftk-imager "null") dan unduh FTK Imager.
            
        2. Jalankan _installer_ dan ikuti petunjuknya.
            
    - Cara Instalasi (NixOS):
        
        FTK Imager adalah aplikasi Windows. Gunakan Wine untuk menjalankannya.
        
- **Pmem & LiME**
    
    - **Kegunaan:** Pmem dan LiME (Linux Memory Extractor) adalah alat bantu _command-line_ untuk mengakuisisi memori RAM dari sistem Linux. LiME diimplementasikan sebagai _Loadable Kernel Module_ (LKM).
        
    - Cara Instalasi (LiME di Linux):
        
        Memerlukan kompilasi dari sumber.
        
        ```bash
        sudo apt-get install build-essential linux-headers-$(uname -r)
        git clone [https://github.com/504ensicsLabs/LiME.git](https://github.com/504ensicsLabs/LiME.git)
        cd LiME/src
        make
        ```
        
        Setelah itu, `lime.ko` dapat disisipkan ke kernel untuk memulai akuisisi.
        
- **Netcat**
    
    - **Kegunaan:** Dikenal sebagai "pisau tentara Swiss untuk jaringan". Dalam forensik memori, Netcat sering digunakan untuk mentransfer citra memori dari mesin target ke mesin analis melalui jaringan.
        
    - **Cara Instalasi (Linux):** Biasanya sudah terpasang. Jika tidak:
        
        ```bash
        sudo apt-get install netcat
        ```
        
    - Cara Instalasi (NixOS):
        
        Pilih salah satu implementasi (misalnya netcat-gnu) dan tambahkan ke configuration.nix:
        
        ```nix
        environment.systemPackages = with pkgs; [
          netcat-gnu
        ];
        ```
        

#### 6. Forensik Web & Malware

- **XAMPP & DVWA**
    
    - **Kegunaan:** XAMPP adalah paket _server web_ lokal. DVWA (_Damn Vulnerable Web Application_) adalah aplikasi web yang sengaja dibuat tidak aman. Kombinasi keduanya digunakan sebagai "laboratorium" untuk berlatih menemukan kerentanan web.
        
    - **Cara Instalasi:**
        
        1. Unduh dan pasang [XAMPP](https://www.apachefriends.org/ "null").
            
        2. Unduh [DVWA](https://dvwa.co.uk/ "null") dan ekstrak ke dalam direktori `htdocs` XAMPP.
            
        3. Konfigurasi DVWA dengan membuat database.
            
    - Cara Instalasi (NixOS):
        
        NixOS tidak menggunakan XAMPP. Sebagai gantinya, Anda mengaktifkan layanan secara deklaratif di configuration.nix:
        
        ```nix
        services.httpd.enable = true;        # Apache
        services.httpd.adminAddr = "email@anda.com";
        services.httpd.documentRoot = "/srv/http"; # Lokasi untuk menaruh file DVWA
        services.php.enable = true;           # PHP
        services.httpd.php.enable = true;
        services.mariadb.enable = true;       # MariaDB (MySQL)
        ```

        Setelah _rebuild_, unduh dan letakkan file DVWA di `/srv/http`.
        
- **Jadx**
    
    - **Kegunaan:** Dekompiler untuk mengubah file APK (aplikasi Android) atau file DEX kembali menjadi kode sumber Java yang dapat dibaca.
        
    - **Cara Instalasi:**
        
        1. Unduh rilis terbaru dari [halaman GitHub Jadx](https://github.com/skylot/jadx/releases "null").
            
        2. Ekstrak file ZIP dan jalankan `jadx-gui` dari direktori `bin`.
            
    - Cara Instalasi (NixOS):
        
        Tambahkan paket ke configuration.nix:

        ```nix
        environment.systemPackages = with pkgs; [
          jadx
        ];
        ```
        

#### 7. Forensik Komputer (Platform Terintegrasi)

- **Autopsy**
    
    - **Kegunaan:** Platform forensik digital sumber terbuka yang komprehensif untuk menganalisis citra _hard drive_ dan _smartphone_.
        
    - **Cara Instalasi (Windows):**
        
        1. Memerlukan Java Development Kit (JDK).
            
        2. Unduh _installer_ Autopsy dari [situs resmi](https://www.autopsy.com/ "null").
            
        3. Jalankan _installer_ dan ikuti petunjuknya.
            
    - Cara Instalasi (NixOS):
        
        Tambahkan paket ke configuration.nix:
 
        ```nix
        environment.systemPackages = with pkgs; [
          autopsy
        ];
        ```
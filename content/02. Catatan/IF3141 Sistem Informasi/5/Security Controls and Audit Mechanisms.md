---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[System Design]]

> [!cornell] Security Controls and Audit Mechanisms
>
> > ## Questions/Cues
> >
> > - Mengapa kontrol batch diperlukan dalam sistem?
> > - Bagaimana verifikasi berbeda dengan validasi input?
> > - Teknik apa yang digunakan untuk kontrol output?
> > - Peran kamus data dalam kontrol integritas?
> > - Mengapa audit trail penting untuk compliance?
> > - Perbedaan keamanan fisik vs logis?
> >
> > ## Reference Points
> >
> > - IF3141 System Design Slides (Pages 43-51)
>
> > ### Kategori Kontrol Sistem
> >
> > Kontrol sistem dirancang untuk menjaga integritas data, proses, dan kepatuhan terhadap regulasi. Terdapat empat kategori utama:
> >
> > 1. **Kontrol Input/Output**: Memastikan akurasi data masuk/keluar
> > 2. **Kontrol Data**: Mempertahankan konsistensi struktur data
> > 3. **Kontrol Proses**: Menegakkan aturan bisnis dalam alur kerja
> > 4. **Keamanan & Audit**: Mencegah akses tak sah dan pelacakan aktivitas
> >
> > Contoh penerapan: Sistem perbankan menggunakan kombinasi kontrol validasi input (e.g., cek format nomor rekening) dan audit trail untuk melacak transaksi mencurigakan.
> >
> > ### Kontrol Input
> >
> > Mekanisme untuk memastikan keakuratan data yang dimasukkan:
> >
> > - **Verifikasi**: Konfirmasi kebenaran entri data
> > - Double-keying (entry ganda oleh operator berbeda)
> > - Pembacaan ulang input ke pengguna
> > - **Validasi**: Pemeriksaan aturan bisnis
> > - Cek eksistensi (data wajib terisi)
> > - Cek rentang nilai (batas minimum-maksimum)
> > - Validasi lintas-field (konsistensi antar kolom)
> >
> > Contoh praktis: Sistem reservasi penerbangan menggunakan validasi tanggal (tidak boleh lebih awal dari hari ini) dan cek ketersediaan kursi secara real-time.
> >
> > ### Kontrol Output
> >
> > Protokol untuk memastikan keluaran yang andal:
> >
> > - **Control totals**: Jumlah keseluruhan untuk deteksi kehilangan data
> > - **Spot checks**: Pemeriksaan acak pada output volume besar
> > - **Pre-numbering**: Penomoran unik pada dokumen resmi (e.g., faktur)
> >
> > Analogi: Seperti daftar checklist pengiriman barang yang mencantumkan jumlah total item sebelum dikirim ke pelanggan.
> >
> > ### Kontrol Data
> >
> > Aturan yang didefinisikan dalam kamus data:
> >
> > - Tipe data (string, integer, date)
> > - Panjang maksimum field
> > - Format valid (e.g., DD/MM/YYYY untuk tanggal)
> > - Nilai default (jika field kosong)
> > - Visibilitas (hak akses level pengguna)
> >
> > Studi kasus: Sistem HR membatasi field "Gaji Pokok" hanya bisa diakses oleh divisi keuangan dengan range nilai 3-25 juta Rupiah.
> >
> > ### Kontrol Proses
> >
> > Mekanisme penegakan aturan bisnis melalui:
> >
> > - **Diagram state machine**: Memodelkan alur persetujuan multilevel
> > - **Workflow constraints**: Pembatasan urutan eksekusi proses
> > - **Business rule engines**: Sistem pengeksekusi aturan otomatis
> >
> > Contoh: Proses pengajuan cuti harus melalui persetujuan atasan langsung sebelum masuk ke HR, dengan validasi sisa kuota cuti tersedia.
> >
> > ### Keamanan Fisik dan Logis
> >
> > **Keamanan Fisik**:
> >
> > - Kunci fisik pada server room
> > - Biometric access (sidik jari, retina scan)
> > - Penjagaan oleh satpam 24/7
> >
> > **Keamanan Logis**:
> >
> > - Autentikasi dua faktor (2FA)
> > - Enkripsi data sensitif
> > - Firewall dan IDS (Intrusion Detection Systems)
> > - Role-Based Access Control (RBAC)
> >
> > Contoh implementasi: Data Center ITB menggunakan kombinasi kartu akses, PIN, dan biometrik untuk akses fisik, serta VPN dengan enkripsi AES-256 untuk akses logis.
> >
> > ### Audit Sistem
> >
> > Mekanisme pelacakan aktivitas pengguna:
> >
> > - **Audit trail**: Log timestamp setiap transaksi
> > - **User activity monitoring**: Rekaman akses data sensitif
> > - **Change logs**: Histori modifikasi konfigurasi sistem
> >
> > Contoh: Sistem e-government menyimpan log lengkap yang mencakup user ID, waktu akses, jenis operasi, dan status berhasil/gagal untuk setiap transaksi keuangan negara.

> [!cornell] #### Summary
>
> **Kontrol sistem** merupakan mekanisme esensial untuk menjamin integritas data dan kepatuhan regulasi, mencakup empat dimensi: input/output, data, proses, serta keamanan-audit. **Verifikasi** dan **validasi** menjadi garda depan akurasi input, sementara **control totals** dan **pre-numbering** menjaga reliabilitas output. Implementasi **RBAC** dan **enkripsi** merupakan standar keamanan logis, sedangkan **audit trail** memberikan kemampuan forensic analysis untuk investigasi insiden. **Kepatuhan terhadap ISO 27001** menjadi acuan desain kontrol di lingkungan enterprise.

> [!ad-libitum]- Additional Information
>
> #### Teknik Kriptografi Lanjut
>
> - **Asymmetric Encryption**: Menggunakan pasangan public-private key (RSA, ECC) untuk pertukaran aman
> - **Homomorphic Encryption**: Memproses data terenkripsi tanpa perlu dekripsi
> - **Zero-Knowledge Proofs**: Verifikasi informasi tanpa membocorkan data aktual
>
> #### Framework Compliance
>
> - **ISO/IEC 27001**: Framework manajemen risiko keamanan informasi
> - **PCI DSS**: Standar untuk sistem pemrosesan kartu kredit
> - **GDPR**: Regulasi perlindungan data pribadi Uni Eropa
>
> #### Analisis Audit Trail
>
> Teknik lanjutan untuk deteksi anomali:
>
> - **Sequential Pattern Mining**: Identifikasi pola akses mencurigakan
> - **Clustering Analysis**: Pengelompokan aktivitas tidak umum
> - **Entropy-Based Detection**: Pengukuran ketidakpastian pola akses
>
> #### Proyek Eksperimen
>
> 1. Implementasi sistem RBAC dengan OAuth 2.0 dan logging terpusat
> 2. Simulasi serangan DDoS dan analisis efektivitas IDS menggunakan Snort
> 3. Pembuatan dashboard audit trail real-time dengan Elastic Stack
>
> #### Tools Security
>
> - **Nmap**: Network mapping dan vulnerability scanning
> - **Wireshark**: Analisis lalu lintas jaringan
> - **Metasploit**: Framework penetration testing
> - **SELinux**: Mandatory Access Control (MAC) untuk Linux
>
> #### Bacaan Lanjutan
>
> - "Security Engineering" oleh Ross Anderson
> - "Applied Cryptography" karya Bruce Schneier
> - Dokumen NIST SP 800-53 tentang Security Controls
> - OWASP Top 10 Web Application Security Risks
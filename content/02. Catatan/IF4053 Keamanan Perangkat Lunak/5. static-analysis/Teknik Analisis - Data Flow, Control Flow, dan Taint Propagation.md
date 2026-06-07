---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Teknik Analisis - Data Flow, Control Flow, dan Taint Propagation
>
> > ## Questions/Cues
> >
> > - Bagaimana analisis struktur/method call mendeteksi pemanggilan fungsi berbahaya seperti gets()?
> > - Apa itu taint propagation dan bagaimana aturan source, pass-through, dan sink bekerja?
> > - Bagaimana data flow analysis menangkap SQL injection pada kode PHP?
> > - Apa yang dicari control flow analysis (double-free, dead code, logika role-check)?
> > - Apa peran property checker, knowledge extraction, dan origin analysis (NVD)?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W06 Static Analysis — bagian "Data flow - Taint propagation")
> > - IF4053 Keamanan Perangkat Lunak (W06 Static Analysis — bagian "Control flow & Property checkers")
> > - IF4053 Keamanan Perangkat Lunak (W07 Static Analysis & Secure SDLC — bagian "Data Flow Analysis & Control Flow Analysis")
>
> > ### Memeriksa Struktur dan Method Call
> >
> > Teknik static analysis paling sederhana adalah **memeriksa struktur program dan pemanggilan method**. Di sini analyzer mencari pola sintaktik pemanggilan fungsi yang dikenal berbahaya. Contoh klasik adalah memperingatkan setiap pemanggilan **`gets()`** dalam C — fungsi yang membaca input tanpa batas panjang dan merupakan sumber buffer overflow klasik. Aturannya dapat dinyatakan sebagai pola: `FunctionCall: function is [name == "gets"]`, yang artinya "laporkan setiap node pemanggilan fungsi yang namanya gets".
> >
> > Pendekatan struktural ini cepat dan mudah dipahami, tetapi sempit: ia hanya tahu "fungsi ini berbahaya" tanpa memahami apakah pada konteks tertentu pemakaiannya sebenarnya aman. Karena itu ia sering menjadi lapisan pertama yang dilengkapi teknik data flow dan control flow yang lebih kontekstual.
> >
> > ### Data Flow Analysis dan Taint Propagation
> >
> > **Data flow analysis** melacak bagaimana data bergerak melalui program untuk mengidentifikasi kerentanan seperti input tak tervalidasi atau penanganan data yang tidak benar. Mekanisme intinya adalah **taint propagation (taint analysis)**: input dari pengguna tak tepercaya (**"sources"**) dianggap **"tainted"** (ternoda); tool memperingatkan atau melarang pengiriman data tainted ke method/konstruksi tertentu (**"sinks"**); dan sebagian operasi (misalnya pemeriksaan/sanitasi) dapat **"meng-untaint"** data. Pada static analysis, tool mengikuti aliran data dari source melewati program untuk menentukan apakah data tainted bisa mencapai sink yang rentan. Pada dynamic analysis (misalnya Perl, Ruby), variabel diberi nilai "taint" saat input dari source tertentu, dan operasi sink tertentu melarang penggunaan langsung data tainted — berguna terutama untuk injection (SQL, command) dan buffer overflow.
> >
> > Aturannya terbagi tiga. Contoh: `buffer = getUntrustedInputFromNetwork();` adalah **source** (postcondition: return value tainted); `copyBuffer(newBuffer, buffer);` adalah **pass-through** (postcondition: jika arg2 tainted, maka arg1 menjadi tainted); dan `exec(newBuffer);` adalah **sink** (precondition: arg1 tidak boleh tainted). Pada kode nyata, taint biasanya mengalir melewati banyak method berbeda. Contoh lain untuk **SQL injection** pada PHP: `$input = $_GET['user_input'];` (Source) lalu `$query = "SELECT * FROM users WHERE name = '$input'";` (Sink) — data flow analysis menandai input tak tervalidasi yang mengalir ke query SQL.
> >
> > ```mermaid
> > flowchart LR
> >     SRC["Source: $_GET['user_input']<br/>(input tak tepercaya)"] --> PT["Pass-through:<br/>copyBuffer / konkatenasi string"] --> SNK["Sink: exec() / query SQL"]
> >     CHK["Sanitasi / validasi<br/>(untaint)"] -.memutus.-> PT
> > ```
> >
> > ### Control Flow Analysis
> >
> > **Control flow analysis** memeriksa **urutan eksekusi instruksi** dalam program untuk mengidentifikasi unreachable code, infinite loop, atau logika yang tidak aman. Tujuannya mengikuti aliran kontrol guna menemukan **sequence berbahaya**. Contoh klasik W06 adalah **double-free**: pada potongan kode dengan loop `while ((node = *ref) != NULL)` yang memanggil `free(node)`, lalu di luar loop terdapat `if (node != 0) { free(node); ... }` — di sini sebuah node berpotensi di-`free` dua kali. Analyzer memodelkannya sebagai state machine: dari **initial state**, `free(x)` membawa ke state **freed**; `free(x)` kedua dari state freed membawa ke state **error**.
> >
> > Contoh dari W07 menunjukkan sisi **logika**: kode PHP membaca `$user_role = $_GET['role'];`, lalu mengecek `if ($user_role == "admin")` untuk memberi akses penuh atau menolak, **tetapi** setelah blok if-else terdapat baris `echo "Performing critical operation...";` yang **selalu dieksekusi** tanpa peduli role. Ini adalah cacat logika/dead-code-like di mana operasi kritis bocor di luar pengecekan otorisasi. Control flow analysis berguna mendeteksi flaw logika atau dead code semacam ini yang dapat menjadi kerentanan.
> >
> > ### Property Checker, Knowledge Extraction, dan Origin Analysis
> >
> > **Property checkers** berusaha "membuktikan" bahwa program memiliki properti yang sangat spesifik dan sempit, biasanya berfokus pada temporal safety, misalnya "selalu membebaskan memori yang dialokasikan" atau "tidak pernah livelock/deadlock". Banyak yang berupaya **sound** (melaporkan semua kemungkinan masalah). Contohnya GrammaTech, GNATPro Praxis, dan Polyspace. **Knowledge extraction / program understanding** secara otomatis membangun view perangkat lunak untuk dianalisis — sangat berguna pada basis kode besar; ia memvisualisasikan arsitektur dan memungkinkan query atau translasi ke bahasa lain. Contohnya Hatha Systems' Knowledge Refinery, IBM Rational Asset Analyzer (RAA), dan Relativity MicroFocus (fokus COBOL).
> >
> > **Origin analysis** memeriksa pustaka/modul perangkat lunak yang tertanam (embedded libraries). Historisnya untuk review legal (apakah lisensi sesuai, misalnya bagian due diligence merger & acquisition), tetapi kini juga dapat mengidentifikasi pustaka dengan **kerentanan yang diketahui** ("The Unfortunate Reality of Insecure Libraries") — berguna bagi developer maupun pengguna. Contoh tool: OWASP Dependency-Check (OSS), Sonatype Nexus/CLM, dan Black Duck Suite. Salah satu sumber data utama "apa yang rentan" adalah **NIST National Vulnerability Database (NVD)**. Konteks W07 memperkuat ini: pada kasus Equifax, dependency scanning yang membandingkan versi Apache Struts terhadap database kerentanan dapat menandai pustaka usang sebelum dieksploitasi.

> [!cornell] #### Summary
>
> Teknik static analysis berlapis dari yang sederhana ke kontekstual. **Pemeriksaan struktur/method call** menandai fungsi berbahaya seperti **`gets()`**. **Data flow analysis** via **taint propagation** melacak data tak tepercaya dari **source** melalui **pass-through** ke **sink**, dengan sanitasi sebagai untaint — efektif menangkap **SQL injection** (`$_GET` mengalir ke query SQL). **Control flow analysis** menelusuri urutan eksekusi untuk menemukan **double-free**, dead code, dan flaw logika seperti operasi kritis yang bocor di luar pengecekan role admin. Dilengkapi **property checker** (membuktikan properti sempit, cenderung sound), **knowledge extraction** (memetakan arsitektur basis kode besar), dan **origin analysis** yang mencocokkan pustaka tertanam dengan kerentanan terdaftar di **NVD**.

> [!ad-libitum]- Additional Information
>
> #### Sanitasi yang Salah: Ketika Untaint Tidak Cukup
> Taint analysis hanya seandal definisi sanitizer-nya. Bahaya nyata muncul ketika developer menggunakan fungsi yang dikira meng-untaint padahal tidak lengkap — misalnya `addslashes()` PHP yang dahulu dianggap aman terhadap SQL injection tetapi dapat dilewati pada encoding multibyte (CVE klasik GBK). Tool taint canggih membedakan **sanitizer per konteks**: escaping untuk konteks HTML berbeda dari escaping untuk konteks SQL atau shell. Penggunaan prepared statement/parameterized query memutus rantai taint secara struktural dan lebih andal daripada mengandalkan escaping manual yang rentan dilewati.
>
> #### Path-Sensitivity dan Ledakan Kombinatorial
> Perbedaan akurasi antar tool data/control flow sering bermuara pada apakah analisis bersifat **path-sensitive** (mempertimbangkan kondisi cabang) atau hanya **flow-sensitive**. Analisis path-sensitive lebih presisi (lebih sedikit FP) namun menghadapi **path explosion** karena jumlah jalur tumbuh eksponensial terhadap jumlah cabang. Teknik seperti symbolic execution, abstract interpretation, dan SMT solver dipakai untuk menjinakkan ledakan ini, dengan trade-off antara presisi, kelengkapan, dan waktu komputasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis ruleset Semgrep kustom yang mendefinisikan source (`$_GET`/`$_POST`), sink (`mysqli_query`/`exec`), dan sanitizer; uji pada aplikasi PHP rentan (mis. DVWA) dan ukur berapa banyak path SQLi yang tertangkap.
> 2. Modelkan secara manual state machine double-free untuk sebuah fungsi C, lalu verifikasi temuanmu dengan menjalankan clang static analyzer dan cppcheck; bandingkan hasil.
>
> #### Bacaan Lanjutan
> - Brian Chess & Jacob West, "Secure Programming with Static Analysis" (Addison-Wesley) — sumber asli contoh taint dan control flow di slide.
> - NIST National Vulnerability Database (NVD): https://nvd.nist.gov
> - OWASP Dependency-Check — dokumentasi origin analysis: https://owasp.org/www-project-dependency-check/

---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4020 Kriptografi]]

> [!cornell] Kelemahan dan Penggunaan OTP
>
> > ## Questions/Cues
> >
> > - Mengapa OTP jarang dipakai walau keamanannya sempurna?
> > - Apa masalah pembangkitan dan distribusi kunci OTP?
> > - Mengapa OTP tidak cocok untuk komunikasi modern seperti HTTPS atau WhatsApp?
> > - Di mana OTP pernah dipakai secara nyata?
> > - Apa maksud kutipan Bellovin tentang OTP?
> >
> > ## Reference Points
> >
> > - IF4020 Kriptografi — One-Time Pad (Slides 20-25)
>
> > ### Mengapa OTP Tidak Umum Dipakai
> >
> > Walau menawarkan keamanan sempurna, OTP jarang dipakai di aplikasi komersial maupun lainnya. Alasannya ada pada **praktik**, bukan pada matematikanya.
> >
> > 1. **Tidak sangkil (efisien).** Panjang kunci = panjang pesan. Makin panjang pesan, makin besar kunci. Membangkitkan miliaran karakter yang **benar-benar acak** menuntut komputasi/perangkat berat, dan untuk komunikasi yang berlangsung terus-menerus kebutuhan kunci menjadi sangat besar.
> > 2. **Pembangkitan kunci tidak bisa disinkronkan.** Karena kunci harus acak sejati, pengirim dan penerima **tidak mungkin** membangkitkan kunci yang sama secara simultan (berbeda dengan pseudo-random yang cukup berbagi *seed*).
> >
> > ### Masalah Distribusi Kunci
> >
> > Pengirim dan penerima harus **menyepakati kunci** yang sepanjang pesan dan sekali pakai. OTP hanya dapat dipakai bila ada **saluran kedua yang sangat aman** untuk mengirim kunci:
> >
> > - Saluran kedua **tidak boleh sama** dengan saluran pesan.
> > - Biasanya **lambat dan mahal**: jalur darat, kurir terpercaya yang tak dapat dikenali.
> > - Alternatif: kunci dikirim lewat saluran yang sama tetapi **pada waktu berbeda**.
> >
> > Ini pada dasarnya memindahkan masalah: mengamankan pertukaran pad sama sulitnya dengan mengamankan pesannya, dan pad sepanjang pesan. Bandingkan dengan kriptografi kunci publik yang menyelesaikan distribusi kunci untuk kunci pendek ([[Algoritma Kriptografi]]).
> >
> > ### Tidak Cocok untuk Komunikasi Dinamis
> >
> > Komunikasi modern (**WhatsApp, HTTPS, VPN, cloud storage, email, IoT**) punya data yang terus berubah, perangkat yang bisa berganti, pengguna yang bisa *offline*, dan pesan berukuran beragam. Dengan OTP, **setiap tambahan data butuh tambahan kunci acak yang belum pernah dipakai**, sehingga manajemen kunci menjadi sangat berat.
> >
> > ```mermaid
> > flowchart TD
> >     OTP["OTP<br/>perfect secrecy"] --> A["Kunci = panjang pesan"]
> >     OTP --> B["Kunci acak sejati"]
> >     OTP --> C["Kunci sekali pakai"]
> >     A --> P1["Tidak sangkil,<br/>kebutuhan kunci membengkak"]
> >     B --> P2["Kunci tak bisa dibangkitkan<br/>serentak di dua pihak"]
> >     C --> P3["Manajemen &amp; distribusi kunci<br/>via saluran kedua aman"]
> >     P1 --> R["Tidak praktis untuk<br/>WhatsApp, HTTPS, VPN, cloud, IoT"]
> >     P2 --> R
> >     P3 --> R
> > ```
> >
> > ### Penggunaan Nyata OTP
> >
> > - **Perang Dunia II:** OTP dipakai **mata-mata**. Contoh dokumentasi: pejabat *Special Operations Executive* (Inggris) memperlihatkan **syal bertuliskan kunci OTP**; kunci dicetak pada kain sutra agar mudah disembunyikan dan dihancurkan.
> > - **Perang Dingin, hotline Moskow-Washington (1963):** jalur komunikasi langsung pemimpin AS dan Uni Soviet, dibangun setelah **krisis rudal Kuba** untuk mencegah perang nuklir. Perangkatnya **ITT Intelex Teletype L015** yang mengenkripsi pesan dengan OTP. Kunci OTP disimpan pada **pita magnetik** yang **diterbangkan** antara Washington DC dan Moskow (saluran kedua yang aman, lambat, dan mahal).
> >
> > ### Kutipan Bellovin
> >
> > *"One-time pads are theoretically unbreakable, but practically very weak. By contrast, conventional ciphers are theoretically breakable, but practically strong."* — Steve Bellovin
> >
> > Maknanya: keamanan sistem nyata ditentukan oleh **seluruh rantai** (pembangkitan, distribusi, penyimpanan, dan penghancuran kunci), bukan hanya oleh kekuatan matematis algoritma. OTP sempurna di atas kertas tetapi rapuh di lapangan (kunci dipakai ulang, pad bocor, kurir disusupi), sedangkan cipher konvensional seperti AES secara teori bisa dipecahkan tetapi secara praktis sangat kuat.

> [!cornell] #### Summary
>
> Meski **perfect secrecy**, OTP jarang dipakai karena dua hambatan: **tidak sangkil** (kunci sepanjang pesan dan harus acak sejati) dan **kunci tak bisa dibangkitkan serentak** oleh dua pihak, sehingga perlu **saluran kedua yang sangat aman** (lambat, mahal, misalnya kurir) untuk mendistribusikan pad sekali pakai. OTP tidak cocok bagi komunikasi dinamis (WhatsApp, HTTPS, VPN, cloud, IoT) karena setiap data baru menuntut kunci baru. OTP pernah dipakai **mata-mata PD II** (kunci pada syal) dan **hotline Moskow-Washington 1963** (ITT Intelex L015 dengan pita kunci yang diterbangkan). Kutipan **Bellovin** merangkumnya: OTP *theoretically unbreakable, practically very weak*; cipher konvensional *theoretically breakable, practically strong*. Bagian selanjutnya membahas bagaimana lawan menyerang sistem yang breakable: [[Serangan Berdasarkan Informasi yang Dimiliki]].

> [!ad-libitum]- Additional Information
>
> #### Pengganti Praktis OTP
>
> Kompromi modern: **stream cipher** (ChaCha20, AES-CTR) memperluas kunci pendek 128-256 bit menjadi *keystream* pseudo-random, dan menukar kunci pendek itu via **kunci publik** (Diffie-Hellman/RSA). Keamanan turun menjadi komputasional, tetapi masalah distribusi dan efisiensi terselesaikan. **Quantum key distribution (QKD)** adalah upaya lain mendistribusikan kunci acak untuk OTP secara aman dengan hukum fisika.
>
> #### Kegagalan Operasional OTP
>
> Sejarah OTP sarat kegagalan prosedur: pad dipakai ulang (VENONA), pad tidak dihancurkan sehingga ditemukan saat penggeledahan, generator "acak" yang ternyata bias, dan kurir yang tertangkap. Ini menegaskan poin Bellovin: matematika yang sempurna tidak menyelamatkan implementasi yang cacat.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Hitung kebutuhan kunci OTP untuk sesi WhatsApp 1 jam (pesan teks + 10 foto) dan bandingkan dengan 256 bit kunci AES; jelaskan mengapa OTP tak skalabel.
> 2. Rancang skema "pad" untuk dua pihak yang bertemu fisik sekali: berapa MB pad yang cukup untuk 1 tahun email, dan bagaimana menandai bagian pad yang sudah terpakai tanpa memakai ulang.
>
> #### Bacaan Lanjutan
>
> - David Kahn, *The Codebreakers*, bab OTP dan hotline.
> - Steve Bellovin, *"Frank Miller: Inventor of the One-Time Pad"*, Cryptologia, 2011.
> - NSA, *VENONA* project releases.

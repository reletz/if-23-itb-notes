---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Rangkuman - Definisi dan Contoh 2 - Kriptografi dan Access Control
>
> > ## Questions/Cues
> >
> > - Apa definisi dan contoh istilah kriptografi (simetris, asimetris, hash, MAC, signature, sertifikat)?
> > - Apa definisi dan contoh model access control (DAC, MAC, RBAC, ABAC)?
> > - Apa definisi protokol AUTH* (Kerberos, SAML, OAuth)?
> >
> > ## Reference Points
> >
> > - Rangkuman payung 5 (Cryptography)
> > - Rangkuman payung 6 (Access Control)
>
> > ### Payung 5 - Kriptografi
> >
> > | Istilah | Definisi singkat | Contoh |
> > |---|---|---|
> > | **Kriptografi** | Mengamankan informasi dengan mengubahnya jadi tak terbaca bagi pihak tak berwenang | Enkripsi pesan |
> > | **Plaintext / ciphertext** | Pesan asli / pesan terenkripsi | "HELLO" / "KHOOR" |
> > | **Key / keyspace** | Parameter algoritma / jumlah nilai kunci yang mungkin | AES-128: 2¹²⁸ |
> > | **IV** | Nilai acak agar pola tidak muncul; tidak harus rahasia, harus unik | IV pada CBC |
> > | **Nonce** | Number used once, agar plaintext sama tak menghasilkan ciphertext sama | Nonce pada CTR/GCM |
> > | **Stream vs block cipher** | Per bit dengan key stream vs per blok | RC4 vs AES |
> > | **Substitusi / transposisi** | Mengganti huruf / mengubah posisi huruf | Caesar / word jumble |
> > | **Confusion / diffusion** | Mengaburkan hubungan kunci-ciphertext (substitusi) / menyebarkan pengaruh plaintext (transposisi) | S-box / permutasi |
> > | **Enkripsi simetris** | Satu kunci untuk enkripsi dan dekripsi; masalah distribusi kunci | AES, DES, 3DES |
> > | **Enkripsi asimetris** | Pasangan kunci publik/privat | RSA, ElGamal, ECC |
> > | **Hybrid** | Asimetris menukar session key, simetris untuk bulk | SSL/TLS |
> > | **AES** | Block cipher 128-bit, kunci 128/192/256, 10/12/14 ronde | HTTPS, disk encryption |
> > | **DES / 3DES** | Kunci 56-bit, blok 64-bit, 16 ronde Feistel / DES tiga kali (E-D-E) | Legacy |
> > | **Mode operasi** | Cara menggabungkan blok pada block cipher | ECB, CBC, CTR, GCM |
> > | **RSA** | Berbasis sulitnya faktorisasi; c = mᵉ mod n | Pertukaran session key |
> > | **Diffie-Hellman** | Menyepakati kunci bersama tanpa mengirimnya; rentan MitM | TLS (DHE/ECDHE) |
> > | **ECC** | Berbasis ECDLP; kunci pendek untuk keamanan setara RSA | ECDSA, Curve25519 |
> > | **Hash function** | Pesan → digest tetap, one-way, collision resistant | SHA-256 |
> > | **Birthday attack** | Mencari collision lewat birthday paradox | Tabrakan hash |
> > | **MAC / HMAC** | Hash berkunci rahasia: autentikasi pengirim + integritas, tanpa non-repudiation | Tag HMAC-SHA256 pada API |
> > | **Digital signature** | Hash pesan dienkripsi kunci privat: authenticity + integrity + non-repudiation | Tanda tangan software update |
> > | **Sertifikat X.509** | Mengikat kunci publik ke identitas, ditandatangani CA | Sertifikat HTTPS |
> > | **CA / PKI** | Pihak tepercaya penerbit sertifikat / infrastruktur kunci publik | Let's Encrypt |
> > | **Kerckhoffs** | Hanya kunci yang rahasia | Algoritma publik |
> > | **Kriptanalisis** | Memecahkan kriptosistem | Brute force, frequency analysis |
> > | **PGP / S/MIME** | Keamanan email: distributed trust / berbasis PKI | Email bertanda tangan |
> >
> > ### Payung 6 - Access Control
> >
> > | Istilah | Definisi singkat | Contoh |
> > |---|---|---|
> > | **Access control** | Mekanisme memastikan principal mengakses resource sesuai privilege | I&A + Authorization + Audit |
> > | **Principal / resource / privilege** | Entitas pelaku / objek / hak (read, write, execute) | Proses, file, read |
> > | **DAC** | Pemilik resource yang menentukan akses (ownership, delegation) | Izin file UNIX |
> > | **Access control matrix** | Matriks subject × object → hak | Tabel George/Tony/Silvio |
> > | **ACL vs capability** | Diindeks per objek vs per subjek | ACL file / token |
> > | **Safety problem** | Apakah hak dapat bocor lewat delegasi | Undecidable secara umum |
> > | **Trojan horse (pada DAC)** | Program jahat berjalan dengan hak pengguna | `xv.exe` yang dimodifikasi |
> > | **MAC / MLS** | Sistem yang menentukan akses berdasar level dan category | Top Secret > Secret > Confidential |
> > | **Bell-LaPadula** | Confidentiality: no read up, no write down | Militer |
> > | **Biba** | Integrity: no read down, no write up | Integritas data |
> > | **Lattice (LUB/GLB)** | Struktur dominance label | ⟨TS,{A,N}⟩ |
> > | **Covert channel** | Kanal tersembunyi lewat sumber daya bersama | Lock resource 1/0 |
> > | **Chinese Wall** | Larang akses ke data perusahaan pesaing berdasar riwayat | Konsultan |
> > | **RBAC** | Hak dikelompokkan pada role | Role Manager |
> > | **ReBAC** | Akses berbasis relasi pada graf sosial | Hanya teman yang boleh melihat |
> > | **ABAC** | Keputusan dari atribut subject, resource, environment | Jabatan + jam kerja |
> > | **XACML (PEP, PDP, PAP)** | Bahasa/arsitektur kebijakan ABAC | PDP memutuskan Permit/Deny |
> > | **Kerberos** | Autentikasi dengan ticket (TGT, service ticket) | Active Directory |
> > | **CAS / OpenID** | SSO via HTTPS / federasi identitas | Login sekali |
> > | **SAML** | Assertion XML: authentication, attribute, authorization decision | SSO enterprise |
> > | **OAuth** | Delegated authorization dengan token tanpa membagikan password | Aplikasi akses Google Calendar |
> > | **UCON** | Access control dengan obligation, condition, continuity, mutability | Kuota penggunaan |

> [!cornell] #### Summary
>
> **Kriptografi**: simetris (cepat, masalah distribusi kunci), asimetris (kunci publik/privat, lambat), hybrid; **hash** (digest), **MAC/HMAC** (integritas + autentikasi dengan kunci bersama), **digital signature** (integritas + autentikasi + non-repudiation), **sertifikat/PKI** (mengikat kunci publik ke identitas). **Access control**: DAC (pemilik), MAC/MLS (sistem; Bell-LaPadula untuk confidentiality, Biba untuk integrity), RBAC (role), ABAC (atribut), serta protokol identitas (Kerberos, SAML, OpenID, OAuth).

> [!ad-libitum]- Additional Information
>
> #### Hafalan Cepat Angka
>
> DES: kunci 56-bit, blok 64-bit, 16 ronde. AES: blok 128-bit, kunci 128/192/256, ronde 10/12/14. MD5: 128-bit, SHA-1: 160-bit. Padanan kunci: ECC 256 ≈ RSA 3072 ≈ AES 128.
>
> #### Detail Lengkap
> - [[Kriptografi Simetris - DES, 3DES, dan AES]], [[Kriptografi Asimetris - RSA dan Diffie-Hellman]], [[Hash Function, Message Digest, MAC, dan HMAC]], [[Kriptografi Kunci Publik dan Tanda Tangan Digital]]
> - [[Konsep Dasar Access Control]], [[Mandatory Access Control dan Multi-Level Security]], [[Attribute-Based Access Control dan XACML]]

---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Tantangan dan Kesalahan Implementasi IAM
>
> > ## Questions/Cues
> >
> > - Apa lima tantangan IAM (sprawl, privilege creep, distributed, multi-tenant, dynamic permissions)?
> > - Apa delapan kesalahan implementasi yang sering terjadi?
> > - Bagaimana password disimpan dengan benar?
> > - Bagaimana memperbaiki IDOR pada endpoint API?
> > - Apa kelemahan pada proses reset password?
> >
> > ## Reference Points
> >
> > - IF5161 — W05 Identity, Authentication, and Authorization, bagian "Identity Challenges" (Challenge 2–5) dan "Mistake 1–8"
>
> > ### Lima Tantangan
> >
> > | # | Tantangan | Masalah | Solusi/Catatan |
> > |---|---|---|---|
> > | 1 | **Identity sprawl** | Identitas berlebih, akun yatim | Inventaris, deprovisioning otomatis |
> > | 2 | **Privilege creep** | Hak menumpuk; perubahan peran tak mencabut akses lama; akses sementara menjadi permanen (rata-rata pengguna punya **2x** izin dari yang dibutuhkan, Forrester 2024) | **Access review berkala**, **JIT (Just-In-Time) privilege** |
> > | 3 | **Sistem terdistribusi** | Otorisasi di microservice: latensi jaringan, konsistensi kebijakan, keputusan terdistribusi | PDP terpusat + PEP lokal |
> > | 4 | **Multi-tenant** | Isolasi tenant; mencegah **horizontal privilege escalation** | Tenant ID wajib di setiap query |
> > | 5 | **Dynamic permissions** | Perubahan kebijakan real-time harus konsisten di sistem terdistribusi | Propagasi kebijakan dan versi |
> >
> > ### Delapan Kesalahan Implementasi
> >
> > 1. **Insecure password storage** — gunakan **Argon2id atau bcrypt** (cost factor >= 10) dengan **salt unik per password**; jangan plaintext atau hash cepat.
> > 2. **Broken authentication** — OWASP #7. Kode contoh membangun query dengan concatenation dan membandingkan password plaintext; memungkinkan SQL injection, timing attack, session fixation, tanpa rate limiting dan MFA.
> > 3. **JWT implementation errors** — lihat [[Session Management dan Token-Based Authentication]].
> > 4. **Authorization bypass (IDOR)** — endpoint `/api/documents/<doc_id>` tanpa cek kepemilikan; `GET /api/documents/124` mengembalikan dokumen orang lain. **Perbaikan**: `@login_required` + `if doc.owner_id != current_user.id: abort(403)`. Uji dengan mengubah ID objek di request.
> > 5. **Insecure OAuth** — whitelist redirect URI, gunakan PKCE, validasi parameter `state`, kode berumur pendek.
> > 6. **Privilege escalation** — vertikal (ke peran lebih tinggi) dan horizontal (ke data pengguna sejajar); cegah dengan **pengecekan otorisasi server-side pada SETIAP request**.
> > 7. **Session security failures** — flag cookie dan umur sesi.
> > 8. **Insecure password reset** — **invalidasi token lama, rate limit, dan beri notifikasi ke pengguna**.
> >
> > ```mermaid
> > flowchart TB
> >     R["Request masuk"] --> A{"Terautentikasi?"}
> >     A -- tidak --> D1["401"]
> >     A -- ya --> B{"Berwenang atas<br/>objek ini?"}
> >     B -- tidak --> D2["403 (default deny)"]
> >     B -- ya --> OK["Proses &amp; catat audit log"]
> > ```
> >
> > Diagram di atas adalah pola pertahanan inti untuk kesalahan 4 dan 6: **autentikasi lalu otorisasi per objek pada setiap request, default deny**.

> [!cornell] #### Summary
>
> Lima tantangan IAM: **sprawl, privilege creep, otorisasi terdistribusi, multi-tenant, dan permission dinamis**. Delapan kesalahan implementasi: penyimpanan password, broken authentication, JWT, IDOR, OAuth, privilege escalation, sesi, dan reset password. Perbaikan konsisten: **hash lambat bersalt (Argon2id/bcrypt), otorisasi server-side per request, default deny, token berumur pendek, rate limiting**.

> [!ad-libitum]- Additional Information
>
> #### Pengujian Otorisasi
> Tes paling efektif adalah **dua akun pengguna** (A dan B) lalu mengulang request A dengan ID milik B (atau token B). Alat: Burp Suite *Autorize*, OWASP ZAP *Access Control Testing*. Otomatiskan sebagai regression test agar IDOR tidak kembali.
>
> #### Proyek Eksplorasi Mandiri
> 1. Terapkan penyimpanan password Argon2id (parameter memori/iterasi sesuai OWASP) pada aplikasi kecil, dan ukur waktu verifikasi.
> 2. Tulis test otomatis IDOR memakai dua pengguna pada API Anda.
>
> #### Bacaan Lanjutan
> - OWASP Password Storage Cheat Sheet
> - OWASP Forgot Password Cheat Sheet

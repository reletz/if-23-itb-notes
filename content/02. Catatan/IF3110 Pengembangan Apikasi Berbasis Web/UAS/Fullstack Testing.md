---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic: Full Stack Testing Strategy & Implementation
> 
> > ## Questions/Cues
> >
> > - Definisi Full Stack Testing
> >     
> > - 4 Layer Pengujian
> >     
> > - Konsep CFR (Cross-Functional Reqs)
> >     
> > - End-to-End (E2E) Testing
> >     
> > - Testing Pyramid (Ideal)
> >     
> > - Ice Cream Cone (Anti-Pattern)
> >     
> > - Integrasi dalam CI/CD
> >     
> > - Mengapa Cypress? (Fitur)
> >     
> > - Arsitektur Cypress vs Selenium
> >     
> > - Page Object Model (POM)
> >     
> > - Sintaks Dasar Cypress
> >     
> >
> > ## Reference Points
> >
> > - Slide IF3110-13-Full-Stack-Testing
> >     
> > - Buku: "Full Stack Testing" - Gayathri Mohan
> >     
> 
> > ### 1. Apa itu Full Stack Testing?
> >
> > **Definisi:** Pendekatan pengujian kualitas aplikasi secara menyeluruh, yang mencakup verifikasi pada setiap lapisan (_layer_) arsitektur serta pengujian aplikasi sebagai satu kesatuan sistem yang utuh.
> >
> > **Tujuan:** Memastikan aplikasi berfungsi dengan benar, aman, dan reliabel dari database hingga antarmuka pengguna.
> >
> > ### 2. Empat Layer Utama Pengujian
> >
> > Pengujian harus mencakup lapisan-lapisan berikut:
> >
> > 1. **UI Layer (Frontend):**
> > 	
> > 	- Menguji fungsionalitas visual, interaksi pengguna, kinerja frontend, aksesibilitas (_accessibility_), dan keamanan antarmuka.
> > 			
> > 2. **Services Layer (Backend API):**
> > 	
> > 	- Menguji logika bisnis, fungsionalitas API, keamanan komunikasi, reliabilitas, dan kinerja backend.
> > 			
> > 3. **Database Layer:**
> > 	
> > 	- Menguji integritas data, keamanan penyimpanan, validitas skema, dan reliabilitas pengambilan data.
> > 			
> > 4. **Infrastructure:**
> > 	
> > 	- Menguji lingkungan hosting (server, cloud) tempat komponen aplikasi berjalan.
> > 			
> >
> > **CFR (Cross-Functional Requirements):**
> > 
> > Selain fitur fungsional ("apakah tombol bekerja?"), Full Stack Testing juga wajib menguji aspek non-fungsional di setiap layer, seperti:
> >
> > - **Security:** Keamanan data dan akses.
> >     
> > - **Performance:** Kecepatan dan responsivitas.
> >     
> > - **Accessibility:** Kemudahan akses bagi semua pengguna.
> >     
> >
> > ### 3. Strategi Pengujian: Piramida vs Ice Cream Cone
> >
> > Testing Pyramid (Pola Ideal):
> > 
> > Strategi alokasi tes yang efisien dan stabil:
> >
> > - **Unit Tests (Basis - Paling Banyak):** Menguji fungsi terkecil secara terisolasi. Sangat cepat dieksekusi dan murah biaya pemeliharaannya.
> >     
> > - **Integration Tests (Tengah):** Menguji interaksi antar modul atau layanan.
> >     
> > - **E2E / UI Tests (Puncak - Paling Sedikit):** Menguji alur sistem secara utuh lewat browser. Lambat, mahal, dan rentan _flaky_ (hasil tidak konsisten).
> >     
> >
> > **Ice Cream Cone (Anti-Pattern / Harus Dihindari):**
> > 
> > Kebalikan dari piramida:
> >
> > - Sangat sedikit Unit Test.
> >     
> > - Sangat banyak Manual/UI Test.
> >     
> > - **Dampak Buruk:** Feedback loop ke developer sangat lambat (bug baru ketahuan lama setelah coding), biaya maintenance tinggi, dan tim takut melakukan perubahan kode (_refactoring_).
> >     
> >
> > ### 4. End-to-End (E2E) Testing
> >
> > **Konsep:** Mensimulasikan perilaku pengguna nyata (_real user journey_) dari awal hingga akhir untuk memvalidasi integrasi seluruh sistem.
> >
> > - **Contoh:** User membuka web -> Login -> Cari Barang -> Checkout -> Logout.
> >     
> > - Jika tes ini sukses, berarti UI, API Service, Database, dan Network semua terhubung dengan benar.
> >     
> >
> > ### 5. Integrasi dalam DevOps (CI/CD)
> >
> > Pengujian tidak boleh manual selamanya. Harus otomatis di dalam pipeline:
> >
> > - **Tahap CI (Commit/Push):** Jalankan Unit Tests. Jika gagal, tolak kode.
> >     
> > - **Tahap PR (Pull Request):** Jalankan Integration Tests.
> >     
> > - **Tahap CD (Staging/Release):** Jalankan E2E Tests sebagai _Regression Testing_ untuk memastikan fitur lama tidak rusak oleh kode baru.
> >     
> >
> > ### 6. Modern Tooling: Cypress
> >
> > Cypress adalah framework E2E testing generasi baru.
> >
> > **Perbedaan Arsitektur (vs Selenium):**
> >
> > - **Selenium:** Berjalan _di luar_ browser dan mengirim perintah lewat jaringan (remote). Sering lambat dan _flaky_ karena masalah jaringan.
> >     
> > - **Cypress:** Berjalan **di dalam** loop browser yang sama dengan aplikasi. Ini memberikan akses native ke DOM `window` dan eksekusi yang sangat cepat serta stabil.
> >     
> >
> > **Fitur Unggulan Cypress:**
> >
> > - **Time Travel:** Mengambil snapshot aplikasi pada setiap langkah tes, memudahkan melihat apa yang terjadi sebelum error.
> >     
> > - **Debuggability:** Pesan error yang sangat jelas dan mudah dibaca manusia.
> >     
> > - **Automatic Waiting:** Tidak perlu perintah `sleep()`. Cypress otomatis menunggu elemen muncul sebelum berinteraksi.
> >     
> > - **Network Stubbing:** Bisa memanipulasi respons jaringan (misal: memalsukan respons API lambat atau error).
> >     
> >
> > ### 7. Page Object Model (POM)
> >
> > **Masalah:** Menulis selector (misal `cy.get('#btn-login')`) berulang-ulang di banyak file tes membuat kode sulit dirawat. Jika ID tombol berubah, ratusan file tes rusak.
> >
> > **Solusi POM:** Memisahkan logika tes dari representasi halaman.
> >
> > - Buat **Class** (Page Object) yang mewakili satu halaman web.
> >     
> > - Simpan semua selector dan aksi (klik, ketik) sebagai **Method** di dalam class tersebut.
> >     
> > - File tes hanya memanggil method tersebut (misal: `loginPage.login()`).
> >     
> >
> > ### 8. Sintaks Dasar Cypress (Mocha Style)
> >
> > - `describe('Nama Skenario', ...)`: Mengelompokkan serangkaian tes.
> >     
> > - `it('Deskripsi Tes Spesifik', ...)`: Blok satu pengujian.
> >     
> > - `beforeEach(...)`: Kode yang dijalankan sebelum setiap blok `it` (biasanya `cy.visit`).
> >     
> > - `cy.get('selector')`: Mengambil elemen.
> >     
> > - `.type('teks')` / `.click()`: Aksi pengguna.
> >     
> > - `.should('kondisi')`: Assertion (pengecekan).
> >     

> [!cornell] #### Summary
> 
> Full Stack Testing adalah strategi komprehensif untuk menjamin kualitas aplikasi di seluruh layer (UI, Service, Database, Infra). Strategi yang sehat mengikuti Piramida Testing (banyak unit test, sedikit E2E test) untuk menghindari jebakan Ice Cream Cone yang mahal. Framework modern seperti Cypress memfasilitasi E2E testing yang cepat dan stabil dengan berjalan langsung di dalam browser. Untuk menjaga kode tes tetap rapi dan maintainable, penggunaan pola desain Page Object Model (POM) sangat disarankan.

> [!ad-libitum]- Additional Information (Deep Dive)
> 
> #### 1. Implementasi Page Object Model (POM) di Cypress
> 
> Berdasarkan slide presentasi, berikut adalah cara mengimplementasikan POM untuk halaman Login.
> 
> **Langkah A: Membuat Page Object (`page-objects/login-page.js`)**
> 
> ```js
> export class LoginPage {
>     // Mengenkapsulasi detail elemen dan aksi
>     login(email, password) {
>         // Mencari input email dan mengetik
>         cy.get('[id=user_email]').type(email);
>         
>         // Mencari input password dan mengetik
>         cy.get('[id=user_password]').type(password);
>         
>         // Mencari tombol submit dan klik
>         cy.get('.submit-para > .gr-button').click();
>     }
> }
> ```
> 
> **Langkah B: Menggunakan di File Tes (`integration/login_tests.spec.js`)**
> 
> ```js
> import { LoginPage } from '../../page-objects/login-page';
> 
> describe('Login Scenarios', () => {
> 
> // Instansiasi objek halaman
> 
> const loginPage = new LoginPage();
>
> // Dijalankan sebelum setiap tes
> beforeEach(() => {
>     cy.visit('[https://example.com](https://example.com)');
> });
> 
> it('should log in and land on home page', () => {
>     // Kode tes sangat bersih dan mudah dibaca
>     loginPage.login('user@test.com', 'pass123');
>     
>     // Validasi hasil (Assertion)
>     cy.url().should('include', '/dashboard');
> 	});
>
> });
> ```
> 
> 
> #### 2. Anatomi Assertion (Chaining)
>
> Cypress memungkinkan kita melakukan pengecekan berantai yang intuitif.
> 
> Contoh dari slide (Todo List):
>
> ```js
> cy.get('.todo-list li')         // 1. Ambil semua elemen list
>   .should('have.length', 2)     // 2. Cek: Harus ada 2 item
>   .first()                      // 3. Ambil item pertama
>   .should('have.text', 'Pay bill') // 4. Cek: Teksnya harus 'Pay bill'
> ```
> 
> #### Sumber & Referensi Lanjutan:
> 
> - _Full Stack Testing_ oleh Gayathri Mohan (O'Reilly).
>     
> - Dokumentasi Cypress: `docs.cypress.io`.
>     
> - Repository Contoh: `github.com/cypress-io/cypress-example-todomvc`.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa Unit Testing diletakkan di dasar piramida testing?</strong></summary>
> 
> Karena Unit Testing adalah jenis tes yang paling cepat dieksekusi, paling murah biaya pembuatannya, dan memberikan umpan balik paling spesifik mengenai lokasi bug pada kode.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa perbedaan mendasar arsitektur Cypress dibandingkan Selenium?</strong></summary>
> 
> Cypress berjalan di dalam browser (loop eksekusi yang sama dengan aplikasi), sedangkan Selenium berjalan di luar browser (remote commands). Hal ini membuat Cypress lebih cepat dan lebih stabil (less flaky).
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa itu anti-pattern "Ice Cream Cone" dalam testing?</strong></summary>
> 
> Kondisi di mana tim terlalu banyak melakukan tes manual/UI (bagian atas piramida membengkak) dan sangat sedikit melakukan unit test. Ini menyebabkan proses testing menjadi lambat dan mahal.
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Jelaskan fungsi beforeEach dalam skrip Cypress!</strong></summary>
> 
> beforeEach adalah blok kode yang dieksekusi secara otomatis sebelum setiap skenario tes (it) berjalan. Biasanya digunakan untuk mereset state aplikasi atau mengunjungi URL halaman utama agar tes dimulai dari kondisi bersih.
> 
> </details>
>
> <details>
> 
> <summary><strong>5. Apa keuntungan utama menggunakan Page Object Model (POM)?</strong></summary>
> 
> Maintainability (Pemeliharaan): Jika ada perubahan pada UI (misal ID elemen berubah), kita hanya perlu memperbarui kode di satu file (Page Object), tidak perlu mencari dan mengganti di seluruh file tes.
> 
> </details>
---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Microservices Architecture Patterns
>
> > ## Questions/Cues
> >
> > - Apa untung dan ruginya memecah aplikasi menjadi microservice?
> > - Bagaimana menarik batas layanan yang benar?
> > - Apa peran API Gateway?
> > - Bagaimana state dikelola dan mengapa database-per-service?
> >
> > ## Reference Points
> >
> > - IF4054 Foundations & Architecture (Slides 22-27)
>
> > ### Gambaran Umum
> >
> > **Microservices** memecah satu aplikasi besar menjadi layanan yang **dapat di-deploy mandiri**, masing-masing memiliki sepotong sempit business capability. Keuntungannya: **scaling, deployment, dan failure isolation yang independen**. Harganya nyata: **panggilan jaringan menggantikan pemanggilan fungsi**, dan sistem terdistribusi gagal dengan cara yang lebih banyak dan lebih aneh.
> >
> > ### Pattern: Decompose by Business Capability
> >
> > - Tarik batas layanan menurut **apa yang dikerjakan bisnis** (orders, inventory, billing), bukan lapisan teknis (UI, logic, data).
> > - Satu layanan cukup kecil untuk dipahami dan dimiliki satu tim secara *end to end*.
> > - Batas berdasarkan lapisan teknis cenderung memaksa panggilan lintas layanan untuk hampir setiap aksi pengguna.
> > - Dekomposisi yang buruk menghasilkan **distributed monolith**; mendapatkannya benar lebih sulit daripada kode yang mengimplementasikannya.
> >
> > ### Pattern: API Gateway
> >
> > **API Gateway** adalah titik masuk tunggal yang menangani routing dan autentikasi sebelum meneruskan permintaan ke layanan di belakangnya.
> >
> > ```mermaid
> > flowchart TD
> >     C["Client<br/>web atau mobile"] --> G["API Gateway<br/>routing, auth"]
> >     G --> O["Orders Service<br/>orders_db"]
> >     G --> I["Inventory Service<br/>inventory_db"]
> >     G --> B["Billing Service<br/>billing_db"]
> > ```
> >
> > ### State Management dan Database-per-Service
> >
> > - Karena **Faktor VI** (proses stateless), layanan tidak menyimpan state durabel; semuanya di backing service.
> > - Setiap layanan **memiliki data store sendiri**; mengakses database layanan lain secara langsung merusak enkapsulasi.
> > - Konsekuensinya muncul pertanyaan baru: bagaimana dua layanan menyepakati fakta yang melintasi dua data store? Jawabannya (**saga, eventual consistency**) dibahas pada minggu DataOps.

> [!cornell] #### Summary
>
> **Microservices** menukar satu deployment besar dengan banyak deployment kecil demi **skala, deploy, dan isolasi kegagalan** independen, dengan biaya kompleksitas sistem terdistribusi. Batas layanan harus mengikuti **business capability**, bukan lapisan teknis, agar tidak menjadi *distributed monolith*. **API Gateway** menjadi pintu masuk tunggal (routing, auth), dan **database-per-service** menjaga enkapsulasi data walau memunculkan tantangan konsistensi terdistribusi.

> [!ad-libitum]- Additional Information
>
> #### Pola Terkait
>
> **Saga** (transaksi terdistribusi dengan kompensasi), **Circuit Breaker** (mencegah kegagalan berantai), dan **Strangler Fig** (migrasi bertahap dari monolit) adalah pola yang sering menyertai microservices.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pecah aplikasi toko online sederhana menjadi 3-4 layanan berdasarkan business capability, lalu gambarkan alur API Gateway dan database tiap layanan.
>
> #### Bacaan Lanjutan
> - Chris Richardson — *Microservices Patterns*.
> - Sam Newman — *Building Microservices*.

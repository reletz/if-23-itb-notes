---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Architecture and Communication Patterns
>
> > ## Questions/Cues
> >
> > - Apa empat pola struktural arsitektur yang fundamental?
> > - Apa perbedaan coupling dan cohesion?
> > - Mengapa point-to-point bermasalah saat node bertambah?
> > - Bagaimana hub-and-spoke meng-decouple komponen?
> > - Apa inti dari Service-Oriented Architecture?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 4-10)
>
> > ### Pola Struktural: Modular Architecture
> >
> > Struktur arsitektur umumnya berupa **model**, dan terdapat beberapa pola fundamental yang berlaku dalam berbagai konteks. Empat pola struktural utama adalah: **modular**, **loosely coupled**, **tiered/layered**, dan **hierarchical**.
> >
> > **Modular architecture**: Bahasa dan tools pemrograman terstruktur memperkenalkan kemampuan menulis **library modules** berisi rutin yang dapat dibagikan dan dipanggil oleh banyak executable. Pada masa awal, modul ini sering di-*statically link* menjadi satu executable saat kompilasi, sehingga perubahan pada satu modul mengharuskan **seluruh executable** yang menggunakannya dikompilasi ulang. Modularitas memecah sistem menjadi unit-unit dengan tanggung jawab terpisah agar lebih mudah dikelola.
> >
> > ### Loosely Coupled Architecture: Coupling vs Cohesion
> >
> > **Coupling** adalah istilah untuk tingkat **ketergantungan (dependency) antar dua komponen** software (juga berlaku untuk hardware). Modul-modul awal cenderung memiliki ketergantungan tinggi — disebut **tightly coupled**. Tujuan arsitektur modern adalah mencapai **loosely coupled**, di mana perubahan pada satu komponen minimal memengaruhi komponen lain.
> >
> > **Coupling dan cohesion** sering disebut bersamaan namun berbeda. Coupling berkaitan dengan seberapa **saling bergantung** modul satu sama lain. **Cohesion** melihat seberapa erat elemen modular perlu **beroperasi atau berubah bersama-sama**. Jika elemen-elemen memang perlu berubah bersama, maka cohesion-nya tinggi (dan kemungkinan tight coupling). Hal ini tidak terlalu bermasalah jika modul-modul tersebut **co-located** dalam satu komponen coarser-grained yang sama, sehingga di-deploy dan di-maintain bersama.
> >
> > Prinsip ideal: **high cohesion, loose coupling** — elemen yang erat berada dalam satu komponen, sementara antar komponen ketergantungan dijaga seminimal mungkin.
> >
> > ### Tiered/Layered dan Hierarchical Architecture
> >
> > **Tiered/layered architecture**: Dalam solusi atau software architecture terdapat berbagai jenis elemen fungsional berdasarkan **tanggung jawabnya** — misal elemen yang merepresentasikan dan memanipulasi data versus elemen yang menangani interface sistem. Elemen-elemen ini diorganisir menjadi **layer/tier** yang berisi modul dengan tanggung jawab serupa.
> >
> > **Hierarchical architecture**: Dalam layered architecture, lebih disukai bila **layer yang lebih tinggi bergantung pada layanan layer di bawahnya, tetapi tidak sebaliknya**. Ini memberikan fleksibilitas karena komponen pada satu layer dapat melayani **banyak klien** di layer atasnya. Contoh: komponen aplikasi yang berbagi infrastructure services bersama (beserta komponen pendukungnya).
> >
> > ### Communication Pattern: Point-to-Point
> >
> > **Point-to-Point** cenderung **tightly coupled** karena komponen-komponen terhubung secara spesifik (logis atau fisik) dan harus berbagi protokol serta format data yang sama. Masalah muncul saat banyak koneksi point-to-point dibutuhkan untuk menghubungkan sejumlah node: jumlah link berpotensi meningkat **secara eksponensial** ketika komponen baru ditambahkan (untuk n node, hingga n(n-1)/2 koneksi).
> >
> > ### Communication Pattern: Hub-and-Spoke
> >
> > **Hub-and-Spoke**: Ketika banyak komponen perlu berinteroperasi, hal ini dapat diatur sebagai sekumpulan koneksi point-to-point antara setiap komponen dengan **satu komponen hub**. Hub berfungsi sebagai sarana menghubungkan komponen mana pun dengan komponen lain, sehingga **meng-decouple** setiap pasangan komponen. Hub dapat berperan sebagai **introduction broker** atau **discovery agent** yang menghubungkan pasangan client-server secara dinamis sesuai permintaan.
> >
> > Hub juga dapat menawarkan layanan brokering lain: memeriksa **security access** client terhadap server, melakukan **translasi protokol** komunikasi atau struktur data, bahkan mengambil alih sebagian logic processing dan mengelola **distributed transactions** kompleks — pada titik itu hub menjadi processing server component tersendiri (mirip konsep ESB / Enterprise Service Bus).
> >
> > ### Communication Pattern: Service-Oriented Architecture
> >
> > **Service-Oriented Architecture (SOA)** secara fundamental adalah tentang bagaimana komponen didefinisikan oleh **layanan (service) yang mereka butuhkan** sebagai *service consumer* (client) dan yang **disediakan** sebagai *service provider* (server). Komponen-komponen ini dibuat **se-decoupled mungkin** dalam segala aspek.
> >
> > Model ini juga berlaku untuk pengorganisasian **fungsi bisnis**: SOA memungkinkan organisasi melakukan **outsourcing** fungsi tertentu, di mana fungsi didefinisikan dan berinteroperasi berdasarkan layanan yang disediakan, bukan *bagaimana* layanan itu dijalankan. Jika diterapkan dengan benar, service consumer **tidak perlu tahu** apakah layanan disediakan oleh provider internal atau yang di-outsource.
> >
> > ```mermaid
> > flowchart LR
> >     subgraph P2P["Point-to-Point (mesh)"]
> >         A1["A"] --- B1["B"]
> >         A1 --- C1["C"]
> >         B1 --- C1
> >         A1 --- D1["D"]
> >         B1 --- D1
> >         C1 --- D1
> >     end
> >     subgraph HUB["Hub-and-Spoke"]
> >         H(("Hub"))
> >         A2["A"] --- H
> >         B2["B"] --- H
> >         C2["C"] --- H
> >         D2["D"] --- H
> >     end
> > ```
> >

> [!cornell] #### Summary
>
> Arsitektur menggunakan **pola struktural** dan **pola komunikasi**. Empat pola struktural: **modular** (memecah sistem ke library modules), **loosely coupled** (minimal dependency, dengan distingsi **coupling vs cohesion** — ideal high cohesion/loose coupling), **tiered/layered** (mengelompokkan elemen berdasarkan tanggung jawab), dan **hierarchical** (layer atas bergantung pada layer bawah, tidak sebaliknya). Tiga pola komunikasi: **point-to-point** (tightly coupled, link tumbuh eksponensial), **hub-and-spoke** (hub sebagai broker yang meng-decouple komponen), dan **Service-Oriented Architecture** (komponen didefinisikan oleh service yang dikonsumsi/disediakan, sangat decoupled, mendukung outsourcing).

> [!ad-libitum]- Additional Information
>
> #### Metrik Coupling dan Cohesion
>
> - **Afferent Coupling (Ca)**: jumlah komponen yang bergantung pada modul ini
> - **Efferent Coupling (Ce)**: jumlah komponen yang menjadi dependensi modul ini
> - **Instability (I) = Ce / (Ca + Ce)**: indikator stabilitas modul
> - Tipe cohesion (dari buruk ke baik): coincidental, logical, temporal, procedural, communicational, sequential, **functional**
>
> #### SOA vs Microservices
>
> Microservices adalah evolusi dari prinsip SOA dengan service yang lebih *fine-grained*, deployment independen, dan komunikasi ringan (REST/gRPC) ketimbang ESB berat. Keduanya menekankan loose coupling dan service contracts.
>
> #### Integration Patterns Modern
>
> - **Message Broker / Message Queue**: RabbitMQ, Apache Kafka (evolusi hub-and-spoke)
> - **API Gateway**: titik masuk tunggal untuk microservices
> - **Enterprise Service Bus (ESB)**: implementasi hub untuk integrasi enterprise
> - **Publish/Subscribe**: decoupling temporal antara producer dan consumer
>
> #### Self-Exploration Projects
>
> 1. Hitung jumlah koneksi point-to-point untuk 10 sistem, lalu bandingkan dengan model hub-and-spoke.
> 2. Refactor sebuah modul tightly coupled menjadi loosely coupled menggunakan dependency injection.
>
> #### Further Reading
>
> - Hohpe, G., Woolf, B. *Enterprise Integration Patterns*
> - Erl, T. *SOA: Principles of Service Design*
> - Newman, S. *Building Microservices*

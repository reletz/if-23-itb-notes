---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Apache Kafka - Arsitektur Log Terdistribusi
> 
> > ## Questions/Cues
> > 
> > - Apa tujuan desain Kafka?
> >     
> > - Apa itu arsitektur **Dumb Broker**?
> >     
> > - Apa itu **Topic**?
> >     
> > - Apa itu **Partition**?
> >     
> > - Apa itu **Offset**?
> >     
> > - Apa jaminan urutan di Kafka?
> >     
> > - Apa itu **Consumer Group**?
> >     
> > - Bagaimana Kafka mendukung P2P dan Pub/Sub?
> >     
> > - Apa peran Zookeeper?
> >     
> > - Bagaimana Kafka mencapai _fault tolerance_?
> >     
> > 
> > ## Reference Points
> > 
> > - 10a-IF4031-07a-2024-Message-Publish-Subscribe-Kafka.pdf
> >     
> 
> > ### Tujuan dan Arsitektur Apache Kafka
> > 
> > Kafka dirancang sebagai **platform** _**streaming**_ **terdistribusi** yang _fault-tolerant_ dengan _throughput_ sangat tinggi. Ini lebih dari sekadar _message broker_; ia adalah sebuah **log komit terdistribusi**.
> > 
> > Kafka mengikuti filosofi **"Dumb Broker, Smart Client"**:
> > 
> > - **Dumb Broker:** Broker Kafka tidak melacak pesan mana yang telah dibaca oleh _consumer_. Tugas utamanya adalah menerima pesan, menuliskannya ke log, dan menyimpannya untuk periode waktu tertentu (_retention period_).
> >     
> > - **Smart Client (Consumer):** Setiap _consumer_ bertanggung jawab penuh untuk melacak pesan mana yang sudah dibacanya. Ia menyimpan "penanda" atau _pointer_ yang disebut **offset**.
> >     
> > 
> > ### Komponen Inti Kafka
> > 
> > 1. **Topic**: Sebuah nama kategori atau feed di mana pesan dipublikasikan. Contoh: user-logins, order-updates.
> > 
> > 2. **Partition**: Setiap topic dipecah menjadi satu atau lebih partisi. Partisi adalah log yang terurut dan immutable (tidak dapat diubah). Pesan baru selalu ditambahkan di akhir partisi.
> > 
> > 3. **Offset**: Setiap pesan di dalam sebuah partisi diberi ID sekuensial unik yang disebut offset. Offset ini berfungsi sebagai koordinat pesan di dalam partisi.
> > 
> > **Jaminan Urutan (Ordering Guarantee):** Kafka hanya menjamin urutan pesan **di dalam satu partisi**. Tidak ada jaminan urutan pesan di antara partisi-partisi yang berbeda dalam satu _topic_.
> > 
> > ### Consumer Group
> > 
> > **Consumer Group** adalah konsep kunci yang memungkinkan Kafka untuk mendukung dua model _messaging_ sekaligus:
> > 
> > - **Satu Label Grup:** Sebuah _consumer group_ adalah sekelompok _consumer_ yang bekerja sama untuk mengonsumsi satu _topic_. Kafka akan mendistribusikan partisi-partisi dari _topic_ tersebut secara merata di antara _consumer_ yang aktif dalam grup. Setiap partisi hanya akan dibaca oleh **satu** _**consumer**_ dalam grup.
> >     
> > 
> > **Implementasi Model Messaging:**
> > 
> > - **Point-to-Point (Queue):** Semua _consumer_ Anda berada dalam **satu** _**consumer group**_ yang sama. Ini akan menyeimbangkan beban pembacaan partisi di antara mereka.
> >     
> > - **Publish-Subscribe (Broadcast):** Setiap _consumer_ berada dalam _**consumer group**_ **nya sendiri-sendiri**. Dengan demikian, setiap _consumer_ akan mendapatkan semua pesan dari semua partisi di _topic_ tersebut.
> >     
> > 
> > ### Fault Tolerance dan Zookeeper
> > 
> > - **Replikasi:** Setiap partisi dapat direplikasi ke beberapa broker. Satu replika akan menjadi **Leader** (menangani semua operasi baca/tulis) dan yang lainnya menjadi **Follower** (menyalin data dari _leader_). Jika _leader_ gagal, salah satu _follower_ akan secara otomatis dipromosikan menjadi _leader_ baru.
> >     
> > - **Zookeeper:** (Pada versi lama, perannya semakin berkurang) Layanan eksternal yang digunakan Kafka untuk mengelola metadata _cluster_, seperti daftar broker, konfigurasi _topic_, dan melacak _leader_ dari setiap partisi.
> >     

> [!cornell] #### Summary
> 
> **Apache Kafka adalah platform streaming terdistribusi yang beroperasi sebagai log komit, mengadopsi arsitektur "Dumb Broker, Smart Client". Pesan diorganisir dalam Topic yang dipecah menjadi beberapa Partition, di mana setiap pesan memiliki Offset unik dan urutannya terjamin per partisi. Konsep Consumer Group memungkinkan Kafka untuk secara fleksibel mendukung model messaging Point-to-Point (satu grup) dan Publish-Subscribe (banyak grup), sementara fault tolerance dicapai melalui replikasi partisi antar broker.**

> [!ad-libitum]- Additional Information
> 
> #### Replayability Pesan
> 
> Karena broker Kafka tidak menghapus pesan setelah dibaca, dan _consumer_ yang mengelola _offset_-nya sendiri, Kafka secara alami mendukung **replayability**. Seorang _consumer_ dapat dengan mudah di-reset untuk mulai membaca pesan dari awal _log_ (offset 0) atau dari titik waktu manapun di masa lalu. Fitur ini sangat kuat untuk beberapa kasus:
> 
> - **Pemulihan dari Bug:** Jika Anda menemukan _bug_ di logika _consumer_ Anda, Anda bisa memperbaikinya, me-reset _offset_, dan memproses ulang semua data historis dengan logika yang benar.
>     
> - **Sistem Analitik Baru:** Anda dapat menambahkan layanan analitik baru kapan saja dan membuatnya memproses seluruh riwayat data dari awal untuk membangun _state_-nya.
>     
> 
> #### Partitioner dan Kunci Pesan
> 
> Bagaimana _producer_ memutuskan ke partisi mana sebuah pesan akan dikirim?
> 
> - **Tanpa Kunci:** Secara _default_, _producer_ akan mendistribusikan pesan secara _round-robin_ ke semua partisi yang tersedia untuk menyeimbangkan beban.
>     
> - **Dengan Kunci:** _Producer_ dapat menyertakan sebuah **kunci** bersama pesan (misalnya, `user_id`). Kafka akan menggunakan _hash_ dari kunci ini untuk secara konsisten memetakan pesan ke partisi yang sama. Ini menjamin bahwa semua pesan dengan kunci yang sama (misalnya, semua event dari `user_id` yang sama) akan selalu masuk ke **partisi yang sama dan diproses secara berurutan**.
>
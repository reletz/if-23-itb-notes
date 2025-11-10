# Rencana Kerja & Roadmap: Grup Query Processor

Dokumen ini merinci rencana eksekusi, pembagian tugas, prasyarat, dan _milestone_ untuk komponen **Query Processor (QP)**. Versi ini telah direvisi untuk mempercepat pengerjaan, meratakan beban kerja, dan mengakomodasi pengerjaan fitur bonus.

## 1. Tinjauan Umum & Misi

**Misi:** Misi Grup "Bash" adalah menjadi "jantung" dan "otak" dari mDBMS. Kita adalah koordinator utama yang menerima _string_ query dari pengguna, mengorkestrasi _semua_ komponen lain (QO, SM, CCM, FRM), dan mengembalikan hasil akhir.

**File Utama Kita:**

- `apacy/query-processor/src/main/java/com/apacy/queryprocessor/QueryProcessor.java`: Koordinator utama.
    
- `apacy/query-processor/src/main/java/com/apacy/queryprocessor/PlanTranslator.java`: Penerjemah rencana QO.
    
- `apacy/query-processor/src/main/java/com/apacy/queryprocessor/execution/`: Eksekutor algoritma (JOIN, ORDER BY).
    
- `apacy/query-processor/src/main/java/com/apacy/queryprocessor/Main.java`: Titik masuk CLI.
    

## 2. Prasyarat & Strategi "Sandbox"

### Prasyarat #1: Kontrak `common` yang Stabil

Kita berasumsi _semua interface_ dan DTO di `apacy/common/`sudah **FINAL**.

### Prasyarat #2 (TUGAS PERTAMA): Membuat _Mock Components_

Kita **wajib** membuat "Komponen Palsu" (Mocks) untuk menguji _logic_ kita secara independen.

- **Tugas:** Buat _package_ baru: `apacy/query-processor/src/test/java/com/apacy/queryprocessor/mocks/`
    
- **Isi:**
    
    - `MockStorageManager implements IStorageManager`
        
    - `MockQueryOptimizer implements IQueryOptimizer`
        
    - `MockConcurrencyControl implements IConcurrencyControlManager`
        
    - `MockFailureRecovery implements IFailureRecoveryManager`
        
- **Contoh Implementasi:**
    
    - `MockQueryOptimizer.parseQuery(...)` akan mengembalikan `ParsedQuery` _dummy_ untuk `SELECT * FROM users JOIN ...`.
        
    - `MockStorageManager.readBlock(...)` akan selalu mengembalikan `List<Row>` _dummy_ untuk kita tes.
        
    - `MockConcurrencyControl.validateObject(...)` akan selalu mengembalikan `new Response(true, "Mock OK")`.
        

## 3. Aturan Kerja & Naming Convention

(Tidak ada perubahan)

### Format Penamaan Branch

- **Format:** `feat/query-processor/<nama-fitur-singkat>`
    
- **Contoh:** `feat/query-processor/implement-nested-loop-join`
    

### Aturan Emas `common/`

Jika ada perubahan di `common` (misal: `ParsedQuery.java`):

1. Buat _branch_ baru: `feat/common/add-field-to-parsed-query`.
    
2. Lakukan perubahan.
    
3. Minta _review_ dan _approval_ dari **SEMUA 5 PIC GRUP** sebelum _merge_.
    

## 4. Pembagian Tugas & Arsitektur Internal (Tim 4-5 Orang)

|**Peran**|**PIC (Orang)**|**File Utama yang Dipegang**|**Deskripsi Tugas**|
|---|---|---|---|
|**Koordinator / PIC Integrasi**|Person 1|`QueryProcessor.java`|Memegang alur `executeQuery()`. Menjahit semua komponen. Implementasi _logic_ transaksi `try-catch-finally`. Mengerjakan bonus `LIMIT` & `BEGIN/COMMIT`.|
|**Penerjemah Rencana**|Person 2|`PlanTranslator.java`|Menerjemahkan `ParsedQuery` (dari QO) menjadi DTOs (`DataRetrieval`, `DataWrite`) untuk SM. Mengerjakan bonus `INSERT`, `DELETE`, `CREATE/DROP TABLE`, `AS`.|
|**Spesialis Join**|Person 3|`execution/JoinStrategy.java`|Fokus murni pada implementasi algoritma `JOIN` (Nested Loop, Hash Join, Sort-Merge Join).|
|**Spesialis Sort**|Person 4|`execution/SortStrategy.java`|Fokus murni pada implementasi algoritma `ORDER BY` (In-memory sort)|
|**QA & CLI** (Jika 5 org)|Person 5|`Main.java`, `*Test.java`, `mocks/*`|Bertanggung jawab membuat & merawat _Mock Components_. Membuat CLI interaktif. Menulis _test case_ untuk fitur wajib & bonus.|

## 5. Roadmap & Kejaran per Milestone (REVISI V2.0)

### Minggu 0: Persiapan (Sekarang s/d 7 Nov)

- **Tujuan:** Menyiapkan _sandbox_ testing.
    
- **Tugas:**
    
    - (Person 5/1) Membuat 4 _Mock Components_ di `src/test/java/`.
        
    - `MockQueryOptimizer.parseQuery()` harus bisa mengembalikan `ParsedQuery` _dummy_ untuk _semua_ skenario (SELECT, UPDATE, JOIN, INSERT, DELETE, CREATE).
        
    - `MockStorageManager.readBlock()` harus bisa mengembalikan `List<Row>` _dummy_.
        
- **Branch:** `feat/query-processor/setup-mock-components`
    

### Milestone 1 (Target: 12 Nov, Deadline Asli: 13 Nov)

- **Tujuan:** Alur "Read Path" (`SELECT`) berfungsi & Algoritma Inti (`JOIN`, `SORT`) Wajib Selesai.
    
- **Tugas:**
    
    - **Person 1 (Koordinator):**
        
        - Isi `QueryProcessor.java` untuk meng-inisialisasi 4 _Mock Components_.
            
        - Isi `QueryProcessor.executeQuery()` untuk alur `SELECT` **Wajib** (`SELECT...FROM...WHERE...`).
            
        - **Alur:** `QO.parseQuery()` -> `QO.optimizeQuery()` -> `CCM.beginTransaction()` -> `PlanTranslator.translateToRetrieval()` -> `CCM.validateObject(..., READ)`-> `SM.readBlock()` -> `CCM.endTransaction(true)` -> Kembalikan `ExecutionResult`.
            
    - **Person 2 (Penerjemah):**
        
        - Implementasi `PlanTranslator.translateToRetrieval()`(Hanya untuk `SELECT` Wajib).
            
    - **Person 3 (Join):**
        
        - Implementasi `JoinStrategy.nestedLoopJoin()` (Fitur **Wajib**).
            
        - Buat _unit test_ sendiri menggunakan `List<Row>` _dummy_ dari `MockStorageManager`.
            
    - **Person 4 (Sort):**
        
        - Implementasi `SortStrategy.sort()`  (Fitur **Wajib** `ORDER BY`).
            
        - Buat _unit test_ sendiri menggunakan `List<Row>` _dummy_.
            
    - **Person 5 (QA/CLI):**
        
        - Implementasi _loop_ CLI dasar di `Main.java`.
            
- **Kejaran:** (1) CLI bisa menjalankan `SELECT` _dummy_. (2) Algoritma **wajib** `nestedLoopJoin` dan `sort` lolos _unit test_.
    

### Milestone 2 (Target: 19 Nov, Deadline Asli: 20 Nov)

- **Tujuan:** Alur "Write Path" (Wajib & Bonus) & Mulai Kerjakan Bonus Algoritma.
    
- **Tugas:**
    
    - **Person 1 (Koordinator):**
        
        - Integrasikan `JoinStrategy` dan `SortStrategy` **yang sudah jadi** ke alur `SELECT` (dipanggil _setelah_ data diterima dari `SM.readBlock()`).
            
        - Tambahkan `if/else` di `executeQuery` untuk menangani `ParsedQuery.queryType()`:
            
            - `UPDATE` (Wajib)
                
            - `INSERT` (Bonus)
                
            - `DELETE` (Bonus)
                
    - **Person 2 (Penerjemah):**
        
        - Implementasi `PlanTranslator.translateToWrite()` (untuk `UPDATE` dan `INSERT`).
            
        - Implementasi `PlanTranslator.translateToDeletion()`.
            
    - **Person 3 (Join):**
        
        - Mulai implementasi bonus `hashJoin` atau `sortMergeJoin`.
            
    - **Person 4 (Sort):**
        
        - Mulai implementasi bonus `externalSort`.
            
- **Kejaran:** `SELECT ... JOIN ... ORDER BY ...` (fitur wajib) berfungsi penuh di _memory_ QP. Alur `UPDATE` (wajib) serta `INSERT` & `DELETE` (bonus) berhasil memanggil _method_ yang benar di _Mock_ SM.
    

### Milestone 3 (Target: 26 Nov, Deadline Asli: 27 Nov)

- **Tujuan:** Integrasi Penuh Transaksi (ACID) & Pengerjaan Bonus Lanjutan.
    
- **Tugas:**
    
    - **Person 1 (Koordinator):**
        
        - **Refaktor Besar `executeQuery()`:** Implementasi `try-catch-finally` untuk _full transaction handling_ (dijelaskan di v1).
            
        - Implementasi bonus `LIMIT` (mudah, `List.stream().limit(...)` sebelum `return`).
            
        - Implementasi bonus `BEGIN TRANSACTION` / `COMMIT` (_advanced stateful transaction_).
            
    - **Person 2 (Penerjemah):**
        
        - Implementasi bonus `CREATE TABLE` / `DROP TABLE` (alur DDL baru).
            
        - Handle bonus `AS` (alias) yang datang dari `ParsedQuery`.
            
    - **Person 3 & 4 (Join & Sort):**
        
        - Finalisasi fitur bonus algoritma.
            
    - **Person 5 (QA/CLI):**
        
        - Buat _test case_ untuk _semua_ fitur bonus (`INSERT`, `DELETE`, `CREATE`, `LIMIT`, dll).
            
        - Perbarui `MockConcurrencyControl` agar bisa `return new Response(false, ...)` untuk menguji alur `catch` (rollback) di `executeQuery`.
            
- **Kejaran:** Alur transaksi ACID (Atomicity, Consistency) terimplementasi penuh. _Error_ apa pun akan memicu _rollback_.
    

### Milestone 4 (Target: 3 Des, Deadline Asli: 4 Des)

- **Tujuan:** Integrasi Final (Mengganti _Mock_), Bonus, & Laporan.
    
- **Tugas:**
    
    - **Person 1 (Koordinator):**
        
        - **Integrasi Final:** Ganti `new MockStorageManager()` dengan `new StorageManager()`. Ganti `new MockQueryOptimizer()` dengan `new QueryOptimizer()`, dst. 
            
        - Lakukan _testing end-to-end_ besar-besaran dengan komponen _asli_.
            
    - **Semua:**
        
        - _Bug fixing_ hasil integrasi (pasti ada).
            
        - Menulis bagian Laporan Akhir untuk komponen Query Processor.
            
- **Kejaran:** Sistem mDBMS berfungsi penuh secara _end-to-end_ dengan _semua_ komponen asli.
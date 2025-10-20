_Back to_ [[IF3140 Sistem Basis Data]]

![[Pasted image 20250917091417.png]]
1. Untuk menjawab kebutuhan dari tiap masalah, tuning yang diusulkan adalah sebagai berikut:
    - Melakukan _schema tuning_ berupa _horizontal splitting_ pada SUPPLY, dengan pemisahan order yang sudah dan belum diterima berdasarkan RECEIVEDATE.
    - Melakukan _schema tuning_ berupa _vertical splitting_ pada SUPPLIER, dengan pemisahan SADDRESS,, SCITY, RATING dengan BALANCE
    - Melakukan _index tuning_ untuk kolom nama pada _table_ SUPPLIER dan PRODUCT
    - Membuat _materialized view_ untuk penghitungan utang
2. Skema baru yang dihasilkan:
    - SUPPLY_ACTIVE(**ORDERDATE**, **PID**, **SID**, QUANTITY, PRICE, RECEIVEDATE) --Kondisi RECEIVEDATE IS NULL
    - SUPPLY_ARCHIVE(**ORDERDATE**, **PID**, **SID**, QUANTITY, PRICE, RECEIVEDATE) --Kondisi RECEIVEDATE IS NOT NULL
    - SUPPLIER_BAL(**SID**, **SNAME**, BALANCE)
    - SUPPLIER_MISC(**SID**, **SNAME**, SADDRESS, SCITY, RATING)
3. Untuk menjaga konsistensi data, maka dapat dilakukan hal berikut:
    - Untuk Horizontal Splitting (SUPPLY): Perlu dibuat sebuah trigger pada tabel SUPPLY_ACTIVE. Ketika kolom RECEIVEDATE diisi (dari NULL menjadi sebuah tanggal), trigger ini akan secara otomatis memindahkan record tersebut dari tabel SUPPLY_ACTIVE ke tabel SUPPLY_ARCHIVE.
    - Untuk Vertical Splitting (SUPPLIER): Saat menyisipkan data supplier baru, data harus dimasukkan ke kedua tabel (SUPPLIER_CORE dan SUPPLIER_DETAIL) secara bersamaan dalam satu transaksi untuk memastikan integritas data.
4. Index dapat ditambahkan dengan rincian:
    - Indeks: idx_supplier_sname
        - Relasi: Dibuat pada tabel SUPPLIER_CORE kolom (SNAME).
        - Jenis: Non-Clustered Index.
        - Alasan: Mempercepat kueri pencarian supplier berdasarkan nama (SNAME) yang sering dilakukan.
    - Indeks: idx_product_pname
        - Relasi: Dibuat pada tabel PRODUCT kolom (PNAME).
        - Jenis: Non-Clustered Index.
        - Alasan: Mempercepat kueri pencarian produk berdasarkan nama (PNAME) yang sering dilakukan.
5.  Berikut materialized view yang dibutuhkan
    - Nama View: vw_debt_report
    - Tujuan: Menyimpan hasil kalkulasi total harga terhutang dari pesanan yang belum diterima.
    - Relasi: Mengambil data dari tabel SUPPLY_ACTIVE.

```sql
CREATE MATERIALIZED VIEW vw_debt_report
REFRESH COMPLETE ON DEMAND
AS
SELECT 
    sa.SID,
    sb.SNAME,
    sa.ORDERDATE,
    SUM(sa.QUANTITY * sa.PRICE) AS TOTAL_DEBT
FROM 
    SUPPLY_ACTIVE sa
JOIN 
    SUPPLIER_BAL sb ON sa.SID = sb.SID
GROUP BY 
    sa.SID, sb.SNAME, sa.ORDERDATE;
```

**SKEMA AKHIR:**

- SUPPLIER_BAL(**SID**, **SNAME**, BALANCE) (Hasil vertical splitting - data yang sering diakses/diubah)
- SUPPLIER_MISC(**SID**, **SNAME,** SADDRESS, SCITY, RATING) (Hasil vertical splitting - data yang jarang diakses/diubah)
- SUPPLY_ACTIVE(**ORDERDATE**, **PID**, **SID**, QUANTITY, PRICE, RECEIVEDATE) (Hasil horizontal splitting - untuk pesanan dengan RECEIVEDATE IS NULL)
- SUPPLY_ARCHIVE(**ORDERDATE**, **PID**, **SID**, QUANTITY, PRICE, RECEIVEDATE) (Hasil horizontal splitting - untuk pesanan dengan RECEIVEDATE IS NOT NULL)
- PRODUCT_CATEGORY(**CID**, CNAME, DESCRIPTION) (Tetap)
- PRODUCT(**PID**, PNAME, CID, WEIGHT) (Tetap)
- vw_debt_report(SID, SNAME, TOTAL_DEBT)
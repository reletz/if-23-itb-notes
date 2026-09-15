[[IF5101 Manajemen Data]]

---

The following ER Model is created for the following description of the database requirement for a national residence service system

A national residence service system stores residents data comprising a unique NIK (_Nomor Induk Kependudukan_, national identity number), name, date of birth, age (calculated from the date of birth), gender, address (street, RT, RW, village, sub-district, regency/city, province), religion, marital status, occupation, citizenship, and blood type. The system also stores service data consisting of a unique service ID, service name, and service description. Each service belongs to a service category; for each category, the unique category ID, category name, and category description are recorded.

Residents wishing to use this service system must register as users, using their email as a unique identifier. Users must also provide a password and a telephone number (multiple phone numbers are permitted for a user). A resident may be registered as exactly one user, and a user is associated with a specific resident. Not all residents are registered as users, but every user is necessarily a resident. A user may also be an official — a ministry official who manages residence services, including handling resident requests. In addition to the data held for standard users, the system stores the official's NIP (_Nomor Induk Pegawai_, unique employee identification number) and their areas of expertise (multiple areas are permitted for an official). There is another type of user: the auditor. Auditors monitor service request activities. For each auditor, their assignment letter number and qualifications are recorded. An official cannot serve as an auditor, and conversely, an auditor cannot be an official. Not all users are required to be auditors or officials.

The system handles service requests from residents across the country (residents requesting services must be registered users). For each service request, the following are recorded: the request date, the user making the request, and the requested service. These three pieces of information form a unique combination for each service request record; this means a user may request a specific type of service only once per day (though they may request a different type of service on the same day). In addition to the aforementioned information, the system records the description of the requested service, the storage URL for supporting files, the request completion date, and the duration in days (calculated as the difference between the request date and the completion date). The officials responsible for the service request are also recorded. An official may be assigned to more than one service request (though they might not yet have any recorded assignments, for instance, if they are new), and a service request is handled by one or more officials. For each instance of an official’s involvement in a service request, the task description and the number of hours spent performing the task are recorded.

Auditors are tasked to monitor the progress of one or more service requests. The date on which an auditor is assigned to monitor a service request is recorded. A service request can be monitored by more than one auditor. There may be service requests that are not monitored yet and sometimes an auditor has no monitoring assignment. When it is due, each service request monitored by an auditor is reported in a monitoring report (so there can be a monitoring process that has not yet been reported). For each report, the report number (unique), report date, and url of the report file are recorded. A report contains one (at least) or more monitoring processes.

![[1788311213501_image.jpg]]

---

1. Translate the ER model into the appropriate relational model.
2. Write the DDL statements to create all relations defined in the relational model. You may make assumptions on data types and constraints that are not defined in the relational model (or ER). Write important assumptions that you make.
3. Provide at least two different examples for each the following DML instructions on the table(s) resulting from the entity Service_Request.
    - Insert
    - Delete
    - Update

---

1. Relasi yang terbentuk:
	1. Residence(<u>NIK</u>, name,  birth_date, gender,  street, RT, RW, village, subdistrict, district, province,  religion, marital_status,  occupation, citizenship, blood_type)
	2. User(<u>email</u>, password, NIK)
		- FK: User(NIK) -> Residence(NIK)
	3. User_phone(<u>email</u>, <u>phone_number</u>)
		- FK: User_phone(email) -> User(email)
	4. Auditor(<u>email</u>, assignment_letter_no, qualification)
		- FK: Auditor(email) -> User(email)
	5. Official(<u>email</u>, NIP)
	   - FK: Official(email) -> User(email)
	6. Official_expertise(<u>email</u>, expertise)
	   - FK: Official_expertise(email) -> Official(email)
	7. Service_category(<u>service_category_id</u>, category_name, description)
	8. Service(<u>service_id</u>, service_name, description, service_category_id)
	   - FK: Service(service_category_id) -> Service_category(service_category_id)
	9. Service_request(<u>service_id</u>, <u>requester_email</u>, <u>request_date</u>, description, url_supporting_files, finish_date)
	   - FK: 
		   - Service_request(service_id) -> Service(service_id)
		   - Service_request(requester_email) -> User(email)
	1. Served_by(<u>service_id</u>, <u>server_email</u>, <u>requester_email</u>, <u>request_date</u>, task_description, number_of_hours)
		- FK: 
		   - Served_by(service_id, requester_email, request_date) -> Service_request(service_id, requester_email, request_date)
		   - Served_by(server_email) -> Official(email)
	2. Report (<u>report_no</u>, report_date, url_file) 
	3. Monitor(<u>service_id</u>, <u>auditor_email</u>, <u>requester_email</u>, <u>request_date</u>, report_no, assignment_date, score, comments)
		- FK: 
		   - Monitor(service_id, requester_email, request_date) -> Service_request(service_id, requester_email, request_date)
		   - Monitor(auditor_email) -> Auditor(email) 
		   - Monitor(report_no) -> Report(report_no)

2.  Kode:
```sql
-- ---------------------------------------------------------------------
-- 1. Residences
-- ---------------------------------------------------------------------
CREATE TABLE Residences (
    NIK             CHAR(16)      NOT NULL,
    name            VARCHAR(100)  NOT NULL,
    birth_date      DATE          NOT NULL,
    gender          CHAR(1)       NOT NULL,
    street          VARCHAR(100)  NOT NULL,
    RT              VARCHAR(3)    NOT NULL,
    RW              VARCHAR(3)    NOT NULL,
    village         VARCHAR(100)  NOT NULL,
    subdistrict     VARCHAR(100)  NOT NULL,
    district        VARCHAR(100)  NOT NULL,
    province        VARCHAR(100)  NOT NULL,
    religion        VARCHAR(20),
    marital_status  VARCHAR(20),
    occupation      VARCHAR(100),
    citizenship     VARCHAR(50)   NOT NULL,
    blood_type      VARCHAR(3),
    CONSTRAINT pk_residences PRIMARY KEY (NIK),
    CONSTRAINT ck_residences_gender CHECK (gender IN ('M','F')),
    CONSTRAINT ck_residences_marital CHECK (marital_status IN ('Single','Married','Divorced','Widowed')),
    CONSTRAINT ck_residences_blood CHECK (blood_type IN ('A','B','AB','O'))
);

-- ---------------------------------------------------------------------
-- 2. Users
------------------------------------------------------------------------
CREATE TABLE Users (
    email     VARCHAR(100)  NOT NULL,
    password  VARCHAR(255)  NOT NULL,
    NIK       CHAR(16)      NOT NULL,
    CONSTRAINT pk_users PRIMARY KEY (email),
    CONSTRAINT uq_users_nik UNIQUE (NIK),   -- enforces the 1:1 register relationship
    CONSTRAINT fk_users_residences FOREIGN KEY (NIK)
        REFERENCES Residences (NIK)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

-- ---------------------------------------------------------------------
-- 3. User_phones 
-- ---------------------------------------------------------------------
CREATE TABLE User_phones (
    email         VARCHAR(100)  NOT NULL,
    phone_number  VARCHAR(20)   NOT NULL,
    CONSTRAINT pk_user_phones PRIMARY KEY (email, phone_number),
    CONSTRAINT fk_user_phones_users FOREIGN KEY (email)
        REFERENCES Users (email)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- ---------------------------------------------------------------------
-- 4. Auditors
-- ---------------------------------------------------------------------
CREATE TABLE Auditors (
    email                 VARCHAR(100)  NOT NULL,
    assignment_letter_no  VARCHAR(50)   NOT NULL,
    qualification         VARCHAR(255)  NOT NULL,
    CONSTRAINT pk_auditor PRIMARY KEY (email),
    CONSTRAINT fk_auditor_users FOREIGN KEY (email)
        REFERENCES Users (email)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- ---------------------------------------------------------------------
-- 5. Officials 
-- ---------------------------------------------------------------------
CREATE TABLE Officials (
    email  VARCHAR(100)  NOT NULL,
    NIP    CHAR(18)      NOT NULL,
    CONSTRAINT pk_officials PRIMARY KEY (email),
    CONSTRAINT uq_officials_nip UNIQUE (NIP),
    CONSTRAINT fk_officials_users FOREIGN KEY (email)
        REFERENCES Users (email)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- ---------------------------------------------------------------------
-- 6. Official_expertises (multivalued attribute of Officials)
-- ---------------------------------------------------------------------
CREATE TABLE Official_expertises (
    email      VARCHAR(100)  NOT NULL,
    expertise  VARCHAR(100)  NOT NULL,
    CONSTRAINT pk_official_expertises PRIMARY KEY (email, expertise),
    CONSTRAINT fk_official_expertises_officials FOREIGN KEY (email)
        REFERENCES Officials (email)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- ---------------------------------------------------------------------
-- 7. Service_categories
-- ---------------------------------------------------------------------
CREATE TABLE Service_categories (
    service_category_id  SERIAL        NOT NULL,
    category_name        VARCHAR(100)  NOT NULL,
    description           TEXT,
    CONSTRAINT pk_service_categories PRIMARY KEY (service_category_id)
);

-- ---------------------------------------------------------------------
-- 8. Services
-- ---------------------------------------------------------------------
CREATE TABLE Services (
    service_id            SERIAL        NOT NULL,
    service_name          VARCHAR(100)  NOT NULL,
    description           TEXT,
    service_category_id   INT           NOT NULL,
    CONSTRAINT pk_services PRIMARY KEY (service_id),
    CONSTRAINT fk_services_category FOREIGN KEY (service_category_id)
        REFERENCES Service_categories (service_category_id)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

-- ---------------------------------------------------------------------
-- 9. Service_requests
-- ---------------------------------------------------------------------
CREATE TABLE Service_requests (
    service_id            INT           NOT NULL,
    requester_email        VARCHAR(100)  NOT NULL,
    request_date           DATE          NOT NULL,
    description             TEXT          NOT NULL,
    url_supporting_files    VARCHAR(255),
    finish_date             DATE,
    CONSTRAINT pk_service_request PRIMARY KEY (service_id, requester_email, request_date),
    CONSTRAINT fk_service_request_services FOREIGN KEY (service_id)
        REFERENCES Services (service_id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_service_request_users FOREIGN KEY (requester_email)
        REFERENCES Users (email)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT ck_service_request_dates CHECK (finish_date IS NULL OR finish_date >= request_date)
);

-- ---------------------------------------------------------------------
-- 10. Served_by  (M:N junction: Officials <-> Service_request)
-- ---------------------------------------------------------------------
CREATE TABLE Served_by (
    service_id         INT            NOT NULL,
    requester_email    VARCHAR(100)   NOT NULL,
    request_date       DATE           NOT NULL,
    server_email       VARCHAR(100)   NOT NULL,
    task_description   VARCHAR(255)   NOT NULL,
    number_of_hours    DECIMAL(6,2)   NOT NULL,
    CONSTRAINT pk_served_by PRIMARY KEY (service_id, requester_email, request_date, server_email),
    CONSTRAINT fk_served_by_service_request FOREIGN KEY (service_id, requester_email, request_date)
        REFERENCES Service_request (service_id, requester_email, request_date)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_served_by_officials FOREIGN KEY (server_email)
        REFERENCES Officials (email)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT ck_served_by_hours CHECK (number_of_hours > 0)
);

-- ---------------------------------------------------------------------
-- 11. Reports
-- ---------------------------------------------------------------------
CREATE TABLE Reports (
    report_no     VARCHAR(30)   NOT NULL,
    report_date   DATE          NOT NULL,
    url_file      VARCHAR(255)  NOT NULL,
    CONSTRAINT pk_reports PRIMARY KEY (report_no)
);

-- ---------------------------------------------------------------------
-- 12. Monitor
-- ---------------------------------------------------------------------
CREATE TABLE Monitor (
    service_id         INT            NOT NULL,
    auditor_email      VARCHAR(100)   NOT NULL,
    requester_email    VARCHAR(100)   NOT NULL,
    request_date       DATE           NOT NULL,
    report_no          VARCHAR(30),
    assignment_date    DATE           NOT NULL,
    score              DECIMAL(4,2),
    comments           TEXT,
    CONSTRAINT pk_monitor PRIMARY KEY (service_id, auditor_email, requester_email, request_date),
    CONSTRAINT fk_monitor_service_request FOREIGN KEY (service_id, requester_email, request_date)
        REFERENCES Service_request (service_id, requester_email, request_date)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_monitor_auditor FOREIGN KEY (auditor_email)
        REFERENCES Auditors (email)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_monitor_reports FOREIGN KEY (report_no)
        REFERENCES Reports (report_no)
        ON UPDATE CASCADE ON DELETE SET NULL
);

-- =====================================================================
-- ASUMSI
-- =====================================================================
-- 1. Tipe data yang tidak dispesifikasikan pada model ER/relasional
--    ditentukan berdasarkan konvensi data pemerintahan Indonesia pada
--    umumnya:
--    - NIK: CHAR(16) (NIK Indonesia selalu terdiri dari 16 digit angka).
--    - NIP: CHAR(18) (NIP pegawai negeri Indonesia terdiri dari 18 digit).
--    - Atribut deskripsi/teks bebas menggunakan TEXT; atribut berupa
--      label singkat menggunakan VARCHAR dengan panjang yang wajar.
--
-- 2. Kolom NIK pada tabel Users diberi constraint UNIQUE (selain sebagai
--    FK) untuk menjamin kardinalitas 1:1 pada relasi "register" -- FK
--    saja tidak cukup, karena tetap memungkinkan dua User berbeda
--    mereferensikan Residence yang sama.
--
-- 3. Kolom finish_date dan url_supporting_files pada Service_request
--    dibuat nullable, karena sebuah request bisa saja masih berjalan
--    (belum selesai) atau tidak menyertakan file pendukung. Constraint
--    CHECK ditambahkan agar finish_date tidak boleh lebih awal dari
--    request_date.
--
-- 4. Kolom report_no, score, dan comments pada Monitor dibuat nullable,
--    karena suatu proses monitoring bisa saja belum dituangkan ke dalam
--    laporan ("there can be a monitoring process that has not yet been
--    reported"). Sebaliknya, assignment_date dibuat NOT NULL karena
--    dicatat sejak auditor pertama kali ditugaskan.
--
-- 5. Atribut number_of_days (Service_request) dan age (Residences) TIDAK
--    disimpan sebagai kolom, karena keduanya merupakan atribut turunan
--    (derived/calculated); nilainya sebaiknya dihitung saat query
--    dijalankan, bukan disimpan secara redundan.
--
-- 6. Ketentuan bahwa "a service request is handled by one or more
--    officials" (participation constraint pada Served_by) dan "a report
--    contains at least one monitoring process" (participation constraint
--    pada Monitor terhadap Reports) merupakan aturan total participation
--    yang tidak dapat dipaksakan secara deklaratif lewat DDL standar
--    (karena mensyaratkan baris pada tabel anak sudah ada sebelum/pada
--    saat baris tabel induk dibuat). Kedua aturan ini diperlakukan
--    sebagai business rule di level aplikasi, bukan sebagai constraint
--    pada database.
```

3.
Berdasarkan model relasional terakhir, entity **Service_Request** itu sendiri hasilnya hanya satu tabel: `Service_request` (composite PK: `service_id, requester_email, request_date`). Tabel `Served_by` dan `Monitor` itu hasil dari relasi M:N (bukan dari entity Service_Request-nya langsung), jadi DML di bawah ini fokus ke tabel `Service_request` aja.

	1. Insert
	    
	    1. Menambahkan request layanan baru dari seorang resident, lengkap dengan file pendukung yang langsung diunggah saat itu.
	        
	        ```sql
	        INSERT INTO Service_request (service_id, requester_email, request_date, description, url_supporting_files, finish_date)VALUES (1, 'budi@mail.com', '2026-09-01', 'Permohonan pembuatan KTP baru', 'https://storage.example.com/files/ktp_budi.pdf', NULL);
	        ```
	        
	    2. Menambahkan request layanan baru tanpa file pendukung (belum ada file yang diunggah, dan request belum selesai diproses sehingga finish_date masih NULL).
	        
	        ```sql
	        INSERT INTO Service_request (service_id, requester_email, request_date, description, url_supporting_files, finish_date)VALUES (3, 'ani@mail.com', '2026-09-02', 'Permohonan surat pindah domisili', NULL, NULL);
	        ```
	        
	2. Delete
	    
	    1. Menghapus satu request spesifik berdasarkan composite key lengkap (service_id, requester_email, request_date).
	        
	        ```sql
	        DELETE FROM Service_requestWHERE service_id = 1 AND requester_email = 'budi@mail.com' AND request_date = '2026-09-01';
	        ```
	        
	    2. Menghapus seluruh request yang sudah selesai diproses lebih dari setahun lalu (pembersihan data lama/arsip).
	        
	        ```sql
	        DELETE FROM Service_requestWHERE finish_date IS NOT NULL AND finish_date < '2025-09-03';
	        ```
	        
	1. Update
	    
	    1. Menandai sebuah request sebagai selesai, dengan mengisi finish_date-nya.
	        
	        ```sql
	        UPDATE Service_requestSET finish_date = '2026-09-05'WHERE service_id = 1 AND requester_email = 'budi@mail.com' AND request_date = '2026-09-01';
	        ```
	        
	    2. Melengkapi request yang tadinya belum menyertakan file pendukung, dengan menambahkan URL file yang baru diunggah.
	        
	        ```sql
	        UPDATE Service_requestSET url_supporting_files = 'https://storage.example.com/files/pindah_ani.pdf'WHERE service_id = 3 AND requester_email = 'ani@mail.com' AND request_date = '2026-09-02';
	        ```
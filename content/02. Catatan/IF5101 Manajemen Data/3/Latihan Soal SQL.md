[[IF5101 Manajemen Data]]

---

Use the relational model of the national residence service system from [[Latihan Soal Pemodelan Rasional]]:

- Residence(<u>NIK</u>, name, birth_date, gender, street, RT, RW, village, subdistrict, district, province, religion, marital_status, occupation, citizenship, blood_type)
- User(<u>email</u>, password, NIK)
- User_phone(<u>email</u>, <u>phone_number</u>)
- Auditor(<u>email</u>, assignment_letter_no, qualification)
- Official(<u>email</u>, NIP)
- Official_expertise(<u>email</u>, expertise)
- Service_category(<u>service_category_id</u>, category_name, description)
- Service(<u>service_id</u>, service_name, description, service_category_id)
- Service_request(<u>service_id</u>, <u>requester_email</u>, <u>request_date</u>, description, url_supporting_files, finish_date)
- Served_by(<u>service_id</u>, <u>server_email</u>, <u>requester_email</u>, <u>request_date</u>, task_description, number_of_hours)
- Report(<u>report_no</u>, report_date, url_file)
- Monitor(<u>service_id</u>, <u>auditor_email</u>, <u>requester_email</u>, <u>request_date</u>, report_no, assignment_date, score, comments)

---

1. Write the SQL statements to display the following information: the name of resident, his/her NIK, service name, service category name, request date, request description, for all service request that was requested between year 2023 until 2025 for service category description containing the word "education" ordered ascending according to service category name and then descending according request date. (Use the function YEAR(<date>) to get the year of a date.)
2. Write the SQL statements to display the following information: the NIP and name of officials who have experienced working on a service request for at least 100 hours.
3. Write the SQL statements to display the following information: the NIP and name of all officials who've never been on duty for service request. Provide three different SQL statements for the query.
4. Write the SQL statements to display the following information: list of service requests (user email, service id, and request date) that have been monitored.
5. Write the SQL statements to display the following information: total number of hours that all officials use to work on the service called "waste management" from year 2023 to 2025. (Use the function YEAR(<date>).)
6. Write the SQL statements to display the following information: the number of service request of each service category for request in year 2026 (provide the service category id and name). For each category that was never been requested, make sure to give the number of service requests 0.
7. Write the SQL statement to create a view called Service_Request_Stats that is used to display the following information: year, service name, service category name, and then number of related service requests, number of requests that are finished (finish_date is not null), number of requests that are not finished yet, total number of officials attending, and number of service that has no official attending. (Use the function YEAR(<date>).)
8. Provide a suggestion on how to use SQL to ensure the following constraint: there may not be a user that both official and auditor.

---

1. Kode:
```sql
select r.name, r.NIK, s.service_name, c.category_name, sr.request_date, sr.description
from Service_request sr
join User u on sr.requester_email = u.email
join Residence r on u.NIK = r.NIK
join Service s on sr.service_id = s.service_id
join Service_category c on s.service_category_id = c.service_category_id
where year(sr.request_date) between 2023 and 2025
and c.description like '%education%'
order by c.category_name asc, sr.request_date desc;
```
Asumsi: versi Indonesia menyebut "kategori layanan", versi Inggris "category description". Dipakai description; jika yang dimaksud nama, ganti menjadi `c.category_name like '%education%'`.

2. Kode:
```sql
select distinct o.NIP, r.name
from Official o
join User u on o.email = u.email
join Residence r on u.NIK = r.NIK
join Served_by sb on sb.server_email = o.email
where sb.number_of_hours >= 100;
```

3. Kode:
```sql
-- cara 1: not in
select o.NIP, r.name
from Official o
join User u on o.email = u.email
join Residence r on u.NIK = r.NIK
where o.email not in (select server_email from Served_by);

-- cara 2: not exists
select o.NIP, r.name
from Official o
join User u on o.email = u.email
join Residence r on u.NIK = r.NIK
where not exists (select * from Served_by sb where sb.server_email = o.email);

-- cara 3: left outer join
select o.NIP, r.name
from Official o
join User u on o.email = u.email
join Residence r on u.NIK = r.NIK
left join Served_by sb on sb.server_email = o.email
where sb.server_email is null;
```

4. Kode:
```sql
select distinct requester_email, service_id, request_date
from Monitor;
```
Alternatif: `select ... from Service_request sr where exists (select * from Monitor m where m.service_id = sr.service_id and m.requester_email = sr.requester_email and m.request_date = sr.request_date);`

5. Kode:
```sql
select sum(sb.number_of_hours) as total_hours
from Served_by sb
join Service s on sb.service_id = s.service_id
where s.service_name = 'waste management'
and year(sb.request_date) between 2023 and 2025;
```

6. Kode:
```sql
select c.service_category_id, c.category_name, count(sr.service_id) as num_requests
from Service_category c
left join Service s on s.service_category_id = c.service_category_id
left join Service_request sr on sr.service_id = s.service_id
and year(sr.request_date) = 2026
group by c.service_category_id, c.category_name;
```
Syarat tahun ditaruh di `on`, bukan `where`; kalau di `where`, baris null hasil left join terbuang sehingga kategori tanpa permintaan tidak muncul. `count(sr.service_id)` (bukan `count(*)`) agar baris null dihitung 0.

7. Kode:
```sql
create view Service_Request_Stats as
select year(sr.request_date) as year, c.category_name, s.service_name,
count(*) as num_requests,
count(sr.finish_date) as num_finished,
count(*) - count(sr.finish_date) as num_unfinished,
coalesce(sum(sb.num_officials), 0) as num_officials,
sum(case when sb.num_officials is null then 1 else 0 end) as num_no_official
from Service_request sr
join Service s on sr.service_id = s.service_id
join Service_category c on s.service_category_id = c.service_category_id
left join (select service_id, requester_email, request_date, count(*) as num_officials
from Served_by
group by service_id, requester_email, request_date) sb
on sb.service_id = sr.service_id
and sb.requester_email = sr.requester_email
and sb.request_date = sr.request_date
group by year(sr.request_date), c.category_name, s.service_name;
```
Asumsi: `Served_by` diagregasi per request dulu agar join tidak menggandakan hitungan request. "Total number of officials attending" dihitung sebagai jumlah penugasan (petugas yang melayani 2 request terhitung 2).

8. Saran:
```sql
-- saran 1: assertion (standar SQL)
create assertion official_not_auditor check
(not exists (select email from Official
intersect
select email from Auditor));

-- saran 2: jika assertion tidak didukung DBMS, gunakan trigger
-- sebelum insert/update pada Official, tolak jika email sudah ada di Auditor
-- (dan trigger serupa pada Auditor untuk arah sebaliknya)

-- saran 3: ubah desain dengan kolom tipe pada User
alter table User add user_type char(1) check (user_type in ('U','O','A'));
alter table User add unique (email, user_type);
-- Official diberi kolom user_type char(1) default 'O' check (user_type = 'O')
-- dengan foreign key (email, user_type) references User(email, user_type)
-- Auditor serupa dengan 'A', sehingga satu email tidak bisa ada di kedua tabel
```

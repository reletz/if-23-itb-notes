13523149 - Naufarrel Zhafif Abhista

![[j2AQ9eTZ3-0-HD.jpg]]

Video ini menganalisis mengapa arsitektur _microservice_, meskipun didasari oleh prinsip rekayasa perangkat lunak yang solid sejak 1975, kini menghadapi banyak kritik. Ian Cooper berargumen bahwa masalah utamanya bukan pada konsep _microservice_ itu sendiri, melainkan pada dua kesalahpahaman fundamental dalam implementasinya.

Kesalahan pertama adalah obsesi pada kata **"micro"**, yang membuat tim fokus pada ukuran layanan (jumlah baris kode) hingga menghasilkan "nano services". Hal ini menciptakan sistem yang rapuh, latensi tinggi, dan ketergantungan yang tinggi (_high coupling_). Cooper menegaskan bahwa fokus seharusnya adalah **"replaceability"** (daya ganti), bukan ukuran.

Kesalahan kedua adalah menyamakan **"service"** dengan **"proses"**, di mana setiap layanan dianggap harus berjalan sebagai satu _container_ atau fungsi Lambda. Sebagai solusi, Cooper merekomendasikan penggunaan model **"4+1 View"** untuk memisahkan pemikiran tentang domain logis, unit pengembangan (_bounded context_), proses yang berjalan, dan infrastruktur fisik. Ia juga memperkenalkan konsep **"Macro service"** sebagai jalan tengah yang pragmatis untuk domain yang terlalu kompleks bagi _microservice_ tetapi tidak memerlukan _monolith_, mengklarifikasi studi kasus Amazon Prime sebagai contoh dari pendekatan ini.
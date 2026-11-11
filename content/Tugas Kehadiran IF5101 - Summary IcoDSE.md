**Naufarrel Zhafif - 13523149**
Sesi: Jumat, 23 Oktober 2026, Room 4A (7611), No. 2
# Privacy-Preserving Attribute-Based Access Control for OpenStack Using a SATOSA Proxy (Abubakur A. Sait; Soon M. Chung)

![[Pasted image 20261026215215.png]]

Penelitian ini berfokus pada pengembangan solusi *cybersecurity* untuk melindungi privasi pengguna dalam *cloud* OpenStack. Tantangan utama dalam *Attribute-based Access Control* (ABAC) adalah adanya risiko kebocoran informasi rahasia melalui atribut yang seharusnya tidak diperlukan.

Solusi utama yang ditawarkan dalam makalah ini adalah integrasi **SATOSA Proxy** sebagai penengah (*middleware*). Proxy ini berfungsi menjembatani Identity Provider dengan Service Provider, sekaligus bertindak sebagai filter pelindung. Dari IdP, beberapa atribut akan dipilah sebelum dikirimkan ke SP. 

Melalui arsitektur proxy ini, sistem dapat menerapkan prinsip minimalisasi data secara ketat. Informasi pribadi lainnya yang tidak relevan akan disembunyikan, sehingga privasi pengguna tetap terjaga dengan aman dari penyedia layanan pihak ketiga.

Ada pertanyaan yang saya ajukan:
> Apakah filter ini bekerja juga pada nilai atribut? Kalau iya, apakah bisa meng-handle regex?

Menanggapi hal ini, Abubakur A. Sait menegaskan bahwa mekanisme filter pada SATOSA Proxy yang mereka kembangkan telah dirancang secara fleksibel. Sistem tersebut mampu mengevaluasi dan menangani pencocokan pola berbasis _regex_ dengan sangat baik.
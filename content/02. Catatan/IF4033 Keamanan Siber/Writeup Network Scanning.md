Naufarrel Zhafif Abhista
13523149

# Tugas
Melakukan _network scanning_ di kos atau di kafe.

Detail:
1. Lokasi: Ayam-ayaman Dago
2. Tools: nmap

## Script

_What it does_ : 
1. Ambil IP _device_, 
2. _Scanning_ untuk IP yang ada di suatu _network_
3. Simpan ke file
4. _Feed_ file untuk iterasi fingerprint per IP

```sh
#!/bin/bash
set -euo pipefail

OUTDIR="scan_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$OUTDIR"
HOSTS="$OUTDIR/hosts.txt"

INTERFACE=$(ip route get 1.1.1.1 | awk '{print $5; exit}')
CIDR=$(ip -o -f inet addr show "$INTERFACE" | awk '{print $4; exit}')
IP=${CIDR%/*}

echo "IP: $CIDR"

nmap -sn "$CIDR" -oG - | awk '/Up$/{print $2}' > "$HOSTS"
echo "Network scan result:"
cat "$HOSTS"

i=0
while read -r ip; do
	i=$((i+1))
	echo "[*] Fingerprinting $ip ..."
	sudo nmap -Pn -sS -sV -O --osscan-guess -T3 \
	"$ip" -oA "$OUTDIR/fp_$ip"
done < "$HOSTS"
```

Hasil:
![[Pasted image 20260903060642.png]]
![[Pasted image 20260903060708.png]]
![[Pasted image 20260903060814.png]]
![[Pasted image 20260903060836.png]]
![[Pasted image 20260903061030.png]]
![[Pasted image 20260903061056.png]]
![[Pasted image 20260903061111.png]]
![[Pasted image 20260903061216.png]]
![[Pasted image 20260903061248.png]]
![[Pasted image 20260903061309.png]]
![[Pasted image 20260903061331.png]]
![[Pasted image 20260903061358.png]]
![[Pasted image 20260903061409.png]]

# Kesimpulan

## Ringkasan

Scanning dilakukan di Ayam-ayaman Dago lewat Wi-Fi yang sama dengan pelanggan lain. 
1. Jaringannya _flat_ `192.168.0.0/24` (satu broadcast domain, tanpa VLAN), gateway di `192.168.0.1`, dan mesin _scanner_ dapat IP `192.168.0.185/24`.
2. _Host discovery_ (`nmap -sn`), dapat ~17 host. Tidak ada _client isolation_ / _AP isolation_: dari posisi sebagai _guest_ biasa, semua host di subnet bisa di-_probe_, di-_port scan_, dan dicoba di-_fingerprint_ tanpa hambatan L2.

## Tabel Host

| IP | MAC | Vendor (OUI) | Port terbuka | OS guess (nmap) | Dugaan device |
|---|---|---|---|---|---|
| `.1` | `A8:42:A1:9F:08:E4` | TP-Link Systems | 53/domain (REFUSED), 80/http `BusyBox httpd 1.19.4`, 443/ssl-http `BusyBox 1.19.4`, 1900/upnp `MiniUPnP 1.8` | no exact match; guess Linux 3.x / MikroTik RouterOS | Router / gateway consumer TP-Link |
| `.105` | `90:31:4B:EB:78:22` | AltoBeam | 80/http, 554/rtsp `H264DVR rtspd 1.0`, 8899/`ospf-lite?` | Linux 3.2 – 3.16 | DVR / NVR CCTV (title "Web Viewer") |
| `.111` | – | – | – | – | Sempat _up_ saat _discovery_, hilang saat _fingerprint_ (0 hosts up) |
| `.117` | `90:31:4B:EA:9C:C2` | AltoBeam | 80/http, 554/rtsp `H264DVR rtspd 1.0`, 8899/`ospf-lite?` | Linux 3.2 – 3.16 | DVR / NVR CCTV |
| `.138` | `C0:87:EB:90:6B:71` | Samsung Electronics | semua 1000 port `closed` | too many fingerprints | HP / perangkat Samsung |
| `.142` | `66:EA:03:0B:F2:C7` | Unknown (LAA / randomized) | 49152/`tcpwrapped`, 62078/`tcpwrapped` (iOS `lockdownd`) | Apple iOS 15.0 – 15.6 (Darwin 21) | iPhone, MAC di-random |
| `.149` | `0C:98:38:1E:39:2F` | Xiaomi Communications | 5060/tcp `filtered` sip | Linux 2.6.23 / 2.6.27 (OSScan unreliable) | HP Xiaomi / Android |
| `.153` | `5C:D0:6E:25:B1:37` | Xiaomi Communications | semua 1000 port `closed` | too many fingerprints | HP Xiaomi / Android |
| `.167` | `5C:4E:EE:C3:0D:D3` | AltoBeam | 8089/tcp `NDesk-RC` (JSON `{"chn":0,...,"result":{"code":1102}}`) | no exact match; guess embedded (lwIP / OSRAM / iRobot — _just guessing_) | IP camera |
| `.179` | `C4:6E:33:7F:E8:8D` | Zhong Ge Smart Technology | semua 1000 port `closed` | too many fingerprints | IoT / smart device |
| `.180` | `E0:1F:88:6C:88:28` | Xiaomi Communications | semua 1000 port `closed` | too many fingerprints | HP / IoT Xiaomi |
| `.214` | – | – | – | – | Sempat _up_ saat _discovery_, hilang saat _fingerprint_ (0 hosts up) |
| `.215` | `0A:D2:E5:80:90:2C` | Unknown (LAA / randomized) | 7/tcp `filtered` echo | too many fingerprints | Kemungkinan HP, MAC di-random |
| `.234` | `3A:5E:F4:BB:DC:C0` | Unknown (LAA / randomized) | 62078/`tcpwrapped` (iOS `lockdownd`) | Apple iOS 15.0 – 15.6 (Darwin 21) | iPhone, MAC di-random |
| `.239` | `4C:37:DE:DC:CA:11` | AltoBeam | 8089/tcp `NDesk-RC` (JSON `code:1102`) | no exact match; guess embedded | IP camera (sekelas `.167`) |
| `.243` | `AC:15:A2:1E:52:BE` | TP-Link Systems | 443/`ssl/https?`, 8800/`sunwebadmin?` (respons ada header `CSeq:` → RTSP) | no exact match; guess OpenWrt / Linux 2.6, "Asus RT-N10 atau AXIS 211A Network Camera" | IP camera TP-Link (Tapo/Kasa) |
| `.185` | _(self)_ | – | 3306/tcp mysql `MariaDB 12.3.3` | Linux 5.x – 6.x | Mesin _scanner_ sendiri (Arch) |

## Kesimpulan

Note:

- Gateway `.1` = router consumer TP-Link jalan `BusyBox httpd 1.19.4` (rilis ~2011). UPnP (`MiniUPnP 1.8`, port 1900) terbuka ke LAN. Port 53 kebuka tapi DNS query di-`REFUSED`. Tidak ada _exact OS match_, _service info_ hanya mengatakan "Device: broadband router; Linux".
- **Device class dominan = CCTV / surveillance.** Minimal 5 device kamera:
    - `.105`, `.117` → DVR/NVR pakai `H264DVR rtspd 1.0` di port 554 + web UI "Web Viewer" di 80 (chipset AltoBeam).
    - `.167`, `.239` → IP camera AltoBeam, protokol `NDesk-RC` di port 8089, balas JSON `{"chn":..., "result":{"code":1102}}`.
    - `.243` → IP camera TP-Link, jawab _handshake_ mirip RTSP (`CSeq:`) di 443/8800.
  Semua kamera ini **satu subnet dengan device _customer_**, tidak dipisah.
- HP: iPhone iOS 15 (`.142`, `.234`), Xiaomi/Android (`.149`, `.153`, `.180`), Samsung (`.138`), _most likely_ punya pelanggan. Sisanya IoT (`.179` Zhong Ge Smart).
- HP modern menutup/men-_filter_ semua port. `nmap` OSScan butuh minimal 1 port `open` + 1 port `closed` untuk kalibrasi; kalau semua `closed`/`filtered`, hasilnya "Too many fingerprints match this host" atau "No exact OS matches", dan sering muncul "Warning: OSScan results may be unreliable".
- `.142`, `.215`, `.234` pakai _locally-administered address_ (bit ke-2 oktet pertama = 1: `66:`, `0A:`, `3A:`). _Vendor lookup_ OUI jadi "Unknown", jadi _fingerprinting_ berbasis OUI mati total. Yang MAC-nya asli (Apple/Samsung/Xiaomi/TP-Link) masih ketahuan pabrikannya.
- `.111` dan `.214` terbaca _up_ pas _host discovery_ (ARP), tetapi ketika di-_fingerprint_ beberapa menit kemudian sudah `0 hosts up`. 
	- Penyebabnya bisa karena DHCP ganti, _device disconnected_
- Beberapa _scan_ lambat (`.153` 278 s, `.167` ~910 s, `.179` 858 s, `.243` 181 s) karena kombinasi port `filtered` + _rate limiting_ + retry `--osscan-guess`.

## Catatan Keamanan

- CCTV/DVR se-subnet dengan _guest_. Kalau salah satu kamera masih pakai _default credential_, siapa pun yang konek Wi-Fi bisa akses _stream_ RTSP dan web UI-nya. Idealnya kamera ditaruh di VLAN/SSID terpisah dari pelanggan
	![[Pasted image 20260903064148.png]]
	Di sini masih aman (belum coba bypass auth), _default_ tidak ada yang tembus.
- Router jalan BusyBox 1.19.4, versinya sangat _outdated_ :)
- UPnP aktif di gateway (routernya), padahal _wi-fi_-nya publik.
	- _A UPnP protocol could permit devices with critical vulnerabilities to connect to your network and sensitive resources._  ([Bacaan](https://www.upguard.com/blog/what-is-upnp))
	- Jika ada _device_ yang terjangkit malware, penyebarannya lebih mudah (tetapi tidak serta menjadi mudah) dengan memanfaatkan protokol UPnP.
- Tidak terlihat VLAN maupun _client isolation_ Satu jaringan datar untuk router + CCTV + kasir(?) + semua HP pelanggan.
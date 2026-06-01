_Back to_ [[index]]
_Dipublikasikan: 15 Agustus 2025_ _Tags: linux, nixos, dual-boot, tech, tutorial_

Selamat datang di catatan digital-ku! Kali ini, aku akan mendokumentasikan salah satu petualangan teknis paling menantang sekaligus memuaskan yang pernah aku lakukan: menginstal NixOS dari nol, tanpa installer grafis, dalam konfigurasi dual boot di samping Windows 11 pada perangkat fisik. Ini adalah bagian dari "Seleksi Bagian B Laboratorium Sistem Terdistribusi 2025."

## Fase 0: Nguli

Tentunya kita perlu .iso-nya. Kita akan pakai yang *minimal installation*. Bisa lihat di [sini](https://nixos.org/download/).
Jangan lupa juga [Rufusnya](https://rufus.ie/id/), ini supaya .iso nya bisa di-burn ke *USB stick.*

Kalau di aku pakai Partitition Scheme: GPT dan Target System UEFI. Sesuaikan dengan sistem masing-masing ya.

![[Pasted image 20250815145630.png]]

## Fase 1: Menyiapkan Lahan di Windows

Sebelum aku bisa membangun rumah baru (NixOS), aku perlu membersihkan lahannya terlebih dahulu di Windows. Ini adalah fase paling krusial dan penuh rintangan. Soalnya memang sesusah itu... nanti juga kelihatan, deh.

### 1.1. Menyusutkan Partisi"

Tujuan pertama adalah membuat ruang kosong (_unallocated space_) dari partisi Windows. Namun, alat Disk Management bawaan Windows seringkali sangat pelit. Awalnya, cuma bisa 0 MB untuk disusutkan!

![[스크린샷 2025-08-13 014814.png]]

Penyebabnya? "File yang tidak bisa dipindahkan" seperti file hibernasi dan page file. Solusinya adalah dengan menonaktifkan fitur-fitur ini untuk sementara:

```
:: Jalankan di Command Prompt sebagai Administrator
:: Matikan Hibernasi
powercfg /h off
```

Setelah itu, nonaktifkan juga Page File dan System Protection melalui System Properties. Setelah restart, aku berhasil mendapatkan ruang, tapi masih terbatas. Untuk kebebasan penuh, aku butuh alat yang lebih kuat: **GParted**.

### 1.2. Operasi dengan GParted

Aku membuat USB bootable GParted dan menjalankannya. GParted adalah pisau bedah untuk partisi. Dengan GParted, aku berhasil menyusutkan partisi Windows dan membuat ruang kosong sebesar 70 GB, ukuran yang ideal untuk NixOS.

Download GParted: [here](https://gparted.org/)

![[Pasted image 20250815143217.png]]

## Fase 2: Eksekusi dari Terminal NixOS

Dengan lahan yang sudah siap, saatnya aku boot dari USB installer **NixOS Minimal**. Aku akan melakukan semuanya dari sini.

### 2.0. Permulaan

Ini agak pr sih, terutama karena kita boot dari .iso Nix, pasti gabisa langsung ke internet. Jadi, pakai `systemctl`.
```
sudo systemctl start wpa_supplicant
wpa_cli
```
Dan ikuti aja langkah-langkah yang sudah ada dalam CLI-nya.
![[Pasted image 20250815143517.png]]

### 2.1. Partisi dengan `gdisk`

Setelah masuk ke shell sebagai `root`, saatnya memahat partisi baru di ruang kosong. Aku akan membuat partisi untuk **swap** dan **root** (`/`). Coba cek dahulu partisi yang telah ada dengan `lsblk`.
![[Pasted image 20250815143621.png]]

Kalau sudah yakin, langsung saja buat partisi baru.
```
# Buka gdisk pada disk utama (NVMe-ku)
gdisk /dev/nvme0n1

# Di dalam gdisk, aku membuat dua partisi baru:
# n -> baru -> +4G -> 8200 (Linux swap)
# n -> baru -> sisa ruang -> 8300 (Linux filesystem)
```

Jangan lupa di-save. Bisa balik kok kalau salah (sebelum di-save).

![[Pasted image 20250815143744.png]]

### 2.2. Formatting dan Mounting

Partisi baru perlu diformat dan "dikaitkan" ke sistem instalasi.

```
# Format partisi root (p6) dengan Ext4
mkfs.ext4 /dev/nvme0n1p6

# Inisialisasi partisi swap (p5)
mkswap /dev/nvme0n1p5

# Mounting!
mount /dev/nvme0n1p6 /mnt      # Mount root
mkdir /mnt/boot               # Buat direktori boot
mount /dev/nvme0n1p1 /mnt/boot  # Mount partisi EFI yang sudah ada
swapon /dev/nvme0n1p5         # Aktifkan swap
```

## Fase 3:  `configuration.nix`

Inilah inti dari NixOS.

```
# Hasilkan konfigurasi dasar
nixos-generate-config --root /mnt
```

Kemudian, aku membuka `/mnt/etc/nixos/configuration.nix` dan menggantinya dengan konfigurasi final yang mendefinisikan segalanya: GNOME sebagai desktop, PipeWire untuk audio modern, NetworkManager, user, dan aplikasi bonus seperti `vscodium`, `wine`, dan `steam`.

Berikut adalah cuplikan konfigurasi finalnya:

```
{ config, pkgs, ... }:

{
  imports = [ ./hardware-configuration.nix ];

  # Bootloader dengan deteksi Windows
  boot.loader.grub.enable = true;
  boot.loader.grub.device = "nodev";
  boot.loader.grub.efiSupport = true;
  boot.loader.grub.useOSProber = true;

  # Jaringan
  networking.networkmanager.enable = true;

  # Audio Modern dengan PipeWire
  services.pipewire = {
    enable = true;
    pulse.enable = true;
    alsa.enable = true;
    jack.enable = true;
  };

  # Desktop GNOME (sudah default Wayland)
  services.xserver.enable = true;
  services.xserver.displayManager.gdm.enable = true;
  services.xserver.desktopManager.gnome.enable = true;

  # Aplikasi Terinstal
  environment.systemPackages = with pkgs; [
    firefox
    vscodium
    wineWowPackages.stable
    winetricks
    # ...dan lain-lain
  ];

  # User Account
  users.users.reletz = {
    isNormalUser = true;
    extraGroups = [ "wheel" "networkmanager" ];
    initialPassword = "supersecretpassword";
  };

  # ...dan pengaturan lainnya
  system.stateVersion = "25.05";
}
```

Kalau mau, ini configuration.nix aku yang udah lengkap, sudah dimodifikasi juga seiring berjalannya waktu.

## Fase 4: Instalasi dan Momen Kebenaran

Dengan konfigurasi yang sudah siap, hanya ada satu perintah yang tersisa:

```
nixos-install
```

Proses ini mengunduh dan membangun seluruh sistem sesuai cetak biru. Setelah sekitar 30 menit, proses selesai. Aku mengetik `reboot`, mencabut USB, dan disambut oleh NixOS. Berhasil!

![[Pasted image 20250815144006.png]]

## Tabel Poin & Bukti Pencapaian

Berikut adalah rekapitulasi dari semua spesifikasi wajib dan bonus yang berhasil aku penuhi dalam instalasi ini.

|Kategori|Spesifikasi|Status|Bukti (Screenshot/Video)|Poin|
|---|---|---|---|---|
|**Dasar**|NixOS tanpa menggunakan installer|✅|Tutorial ini adalah buktinya.|4|
|**Wajib**|Graphical user interface (GUI)|✅|Ada di video|-|
|**Wajib**|Kapabilitas audio-visual|✅|Ada di video|-|
|**Wajib**|Kemampuan terhubung ke internet|✅| Ada di video |-|
|**Wajib**|Kemampuan manajemen paket|✅|<img width="1010" height="202" alt="image" src="https://github.com/user-attachments/assets/0c96d091-a389-4a66-8278-3dfab972d3a1" />|-|
|**Wajib**|User _unprivileged_|✅|<img width="741" height="414" alt="image" src="https://github.com/user-attachments/assets/e4ed12e0-6e85-415f-86e0-f57d45d05f35" />|-|
|**Wajib**|Graphical text editor|✅|Ada di video |-|
|**Wajib**|Graphical web browser|✅|Ada di video |-|
|**Wajib**|Wallpaper kustom|✅|Ada di video|-|
|**Bonus**|Editor & Browser Open-Source|✅|`vscodium` dan `firefox` keduanya open-source.|0.5|
|**Bonus**|Kustomisasi Bootloader|✅| Ada di video|0.5|
|**Bonus**|Wine & LINE for PC|✅|Ada di video|0.5|
|**Bonus**|Menggunakan Wayland|✅|Terlihat di command `neofetch`|1.0|
|**Bonus**|Nonton anime dari command line|✅|Ada di video|0.5|
|**Bonus**|Mengemas instalasi ke .iso|✅| [Ini](https://drive.google.com/file/d/1LW7FIIOQA4TzGT0ouU8YL2_n6BFmsty6/view?usp=sharing) |1.0|
|**Bonus**|Instalasi di hardware fisik|✅|Tutorial ini mendokumentasikan instalasi dual boot di laptop fisik.|1.0|
|**Bonus**|Secure Boot|✅| Ada di Video |2.0|

## Kesimpulan

Menginstal NixOS secara manual adalah sebuah pendakian yang curam, tetapi pemandangan dari puncaknya sangatlah indah. Aku sekarang memiliki sistem yang sangat stabil, dapat dikonfigurasi sepenuhnya dari satu file, dan bisa aku bangun ulang kapan saja. Jika kamu mencari tantangan dan ingin benar-benar memahami sistem operasi-mu, aku sangat merekomendasikan untuk mencoba NixOS.

Terima kasih sudah mengikuti perjalanan ini!

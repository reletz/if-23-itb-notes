---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4033 Keamanan Siber]]

> [!cornell] Studi Kasus SimpleWebServer - DoS dan Path Traversal
>
> > ## Questions/Cues
> >
> > - Bagaimana cara kerja SimpleWebServer sederhana?
> > - Bagaimana request cacat dapat membuat server crash (DoS)?
> > - Bagaimana serangan `../` membaca file di luar direktori web?
> > - Pelajaran desain apa yang bisa ditarik?
> >
> > ## Reference Points
> >
> > - IF4033 Software Security (Slides 10-27)
> > - IF4033 Security Foundation (Slides 77-96)
>
> > ### Gambaran SimpleWebServer
> >
> > Program Java kecil yang hanya menyajikan dokumen lewat **HTTP**. Request umum: `GET / HTTP/1.0`; server memuat `index.html` dan membalas `HTTP/1.0 200 OK` diikuti isi dokumen. Alurnya:
> >
> > ```mermaid
> > flowchart TD
> >     A["accept() koneksi<br/>port 8080"] --> B["processRequest():<br/>baca & parse request"]
> >     B -->|"GET"| C["serveFile(pathname)"]
> >     B -->|"bukan GET"| D["501 Not Implemented"]
> >     C -->|"file ada"| E["200 OK + isi file"]
> >     C -->|"tidak ada"| F["404 Not Found"]
> > ```
> >
> > ### Source Code Lengkap
> >
> > Versi **_vulnerable_** 
> >
> > ```java
> > import java.io.*;
> > import java.net.*;
> > import java.util.*;
> >
> > public class SimpleWebServer {
> >     /* Run the HTTP server on this TCP port. */
> >     private static final int PORT = 8080;
> >
> >     /* The socket used to process incoming connections
> >        from web clients */
> >     private static ServerSocket dServerSocket;
> >
> >     public SimpleWebServer() throws Exception {
> >         dServerSocket = new ServerSocket(PORT);
> >     }
> >
> >     public void run() throws Exception {
> >         while (true) {
> >             /* wait for a connection from a client */
> >             Socket s = dServerSocket.accept();
> >             /* then process the client's request */
> >             processRequest(s);
> >         }
> >     }
> >
> >     /* Reads the HTTP request from the client, and
> >        responds with the file the user requested or
> >        a HTTP error code. */
> >     public void processRequest(Socket s) throws Exception {
> >         /* used to read data from the client */
> >         BufferedReader br =
> >             new BufferedReader(new InputStreamReader(s.getInputStream()));
> >
> >         /* used to write data to the client */
> >         OutputStreamWriter osw =
> >             new OutputStreamWriter(s.getOutputStream());
> >
> >         /* read the HTTP request from the client */
> >         String request = br.readLine();
> >
> >         String command = null;
> >         String pathname = null;
> >
> >         /* parse the HTTP request */
> >         StringTokenizer st = new StringTokenizer(request, " ");
> >
> >         command = st.nextToken();
> >         pathname = st.nextToken();
> >
> >         if (command.equals("GET")) {
> >             /* if the request is a GET
> >                try to respond with the file
> >                the user is requesting */
> >             serveFile(osw, pathname);
> >         } else {
> >             /* if the request is a NOT a GET,
> >                return an error saying this server
> >                does not implement the requested command */
> >             osw.write("HTTP/1.0 501 Not Implemented\n\n");
> >         }
> >
> >         /* close the connection to the client */
> >         osw.close();
> >     }
> >
> >     public void serveFile(OutputStreamWriter osw,
> >                           String pathname) throws Exception {
> >         FileReader fr = null;
> >         int c = -1;
> >         StringBuffer sb = new StringBuffer();
> >
> >         /* remove the initial slash at the beginning
> >            of the pathname in the request */
> >         if (pathname.charAt(0) == '/')
> >             pathname = pathname.substring(1);
> >
> >         /* if there was no filename specified by the
> >            client, serve the "index.html" file */
> >         if (pathname.equals(""))
> >             pathname = "index.html";
> >
> >         /* try to open file specified by pathname */
> >         try {
> >             fr = new FileReader(pathname);
> >             c = fr.read();
> >         } catch (Exception e) {
> >             /* if the file is not found, return the
> >                appropriate HTTP response code */
> >             osw.write("HTTP/1.0 404 Not Found\n\n");
> >             return;
> >         }
> >
> >         /* if the requested file can be successfully opened
> >            and read, then return an OK response code and
> >            send the contents of the file */
> >         osw.write("HTTP/1.0 200 OK\n\n");
> >         while (c != -1) {
> >             sb.append((char) c);
> >             c = fr.read();
> >         }
> >         osw.write(sb.toString());
> >     }
> >
> >     /* This method is called when the program is run from
> >        the command line. */
> >     public static void main(String argv[]) throws Exception {
> >         /* Create a SimpleWebServer object, and run it */
> >         SimpleWebServer sws = new SimpleWebServer();
> >         sws.run();
> >     }
> > }
> > ```
> >
> > Titik rawan pada kode ini: parsing di `processRequest()` (`st.nextToken()` tanpa penanganan exception) dan `new FileReader(pathname)` di `serveFile()` (path tidak divalidasi).
> >
> > ### Serangan 1: Denial of Service
> >
> > **DoS** membuat web server tidak tersedia (misal toko buku online kehilangan pendapatan). Pada kode ini, cukup mengirim **carriage return** (baris kosong) sebagai pesan pertama. `request` kosong sehingga `st.nextToken()` melempar exception yang tidak ditangani, **server crash**, dan semua klien berikutnya ditolak sampai server di-restart.
> >
> > **Perbaikan**: tangani exception pada parsing, lalu putus koneksi klien yang mengirim request cacat:
> >
> > ```java
> > try {
> >   StringTokenizer st = new StringTokenizer(request, " ");
> >   command = st.nextToken();
> >   pathname = st.nextToken();
> > } catch (Exception e) {
> >   osw.write("HTTP/1.0 400 Bad Request\n\n");
> >   osw.close();
> >   return;
> > }
> > ```
> >
> > ### Serangan 2: Confidentiality Breach (Path Traversal)
> >
> > Karena `pathname` langsung dipakai untuk membuka file, penyerang dapat meminta `GET ../../../../etc/shadow HTTP/1.0` dan membaca file di luar *htdocs*. **Perbaikan**: validasi `pathname` (misalnya tolak `..`, atau kanonikalisasi path lalu pastikan masih berada di dalam direktori root). **Jangan pakai _blacklist_, gunakan _whitelist_!**
> >
> > ### Teaching Wisdom
> >
> > - **Exception handling** yang efektif esensial untuk mendesain keamanan sejak awal.
> > - Terapkan **least privilege**.
> > - **Jangan pernah percaya input pengguna.**

> [!cornell] #### Summary
>
> SimpleWebServer menunjukkan kerentanan umum jika keamanan tidak didesain sejak awal. Request kosong menyebabkan exception tak tertangani yang meng-**crash** server (**DoS**) dan diperbaiki dengan penanganan exception serta respons `400 Bad Request`. Pathname yang tidak divalidasi memungkinkan **path traversal** (`../../etc/shadow`) yang membocorkan **confidentiality**; solusinya validasi path. Pelajaran: tangani exception dengan benar, terapkan **least privilege**, dan **jangan percaya input pengguna**.

> [!ad-libitum]- Additional Information
>
> #### Kerentanan Lain pada Kode yang Sama
>
> Selain dua hal di atas, server ini tidak membatasi jumlah koneksi (proses satu klien per giliran sehingga satu koneksi lambat memblokir yang lain, mirip *Slowloris*), dan berjalan dengan hak akses proses penuh sehingga dampak path traversal membesar bila dijalankan sebagai root.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan ulang server dalam bahasa pilihan, tambahkan validasi path via kanonikalisasi, lalu uji dengan payload traversal (`%2e%2e/`).
>
> #### Bacaan Lanjutan
> - OWASP *Path Traversal* dan *Input Validation Cheat Sheet*.
> - CWE-22 (Path Traversal), CWE-248 (Uncaught Exception).

\subsection{Langkah Demonstrasi}
Langkah berikut dijalankan pada image \texttt{nadina} dengan \texttt{--network none} dan UID non-root,
di direktori kerja yang berisi artefak \texttt{contoh-app.zip}. Tiap perintah diikuti keluarannya
dan exit code. Pada langkah verifikasi yang gagal, artefak diubah sebelum perintah dijalankan.

\begin{lstlisting}[basicstyle=\ttfamily\footnotesize,caption={Transkrip langkah demonstrasi CLI},label={lst:demo},numbers=none]
$ nadina keygen -algorithm ed25519 -out keys/publisher
0fd1253e76fb28e4cd1b59ba8dd33402fed977db6fc575a1d538c5ce544ab3c0
exit=0

$ nadina trust add -key keys/publisher.pub.pem -package contoh-app -store trust.json
keyid: 0fd1253e76fb28e4cd1b59ba8dd33402fed977db6fc575a1d538c5ce544ab3c0
algorithm: ed25519
package: contoh-app
exit=0

$ nadina sign -file contoh-app.zip -package contoh-app -version 1.0.0 -key keys/publisher.key.pem -out release.json
Bundle ditulis ke release.json
keyid: 0fd1253e76fb28e4cd1b59ba8dd33402fed977db6fc575a1d538c5ce544ab3c0
algorithm: ed25519
exit=0

$ nadina verify -file contoh-app.zip -bundle release.json -trust-store trust.json -package contoh-app -version 1.0.0 -json
{"valid":true,"status":"OK","message":"Tanda tangan dan artefak valid.","algorithm":"ed25519","keyid":"0fd1253e76fb28e4cd1b59ba8dd33402fed977db6fc575a1d538c5ce544ab3c0","package":"contoh-app","version":"1.0.0"}
exit=0

$ (artefak ditambah satu karakter) nadina verify ... -json
{"valid":false,"status":"ARTIFACT_MISMATCH","message":"Ukuran atau SHA-256 artefak tidak sesuai.","algorithm":"ed25519","keyid":"0fd1253e76fb28e4cd1b59ba8dd33402fed977db6fc575a1d538c5ce544ab3c0","package":"contoh-app","version":"1.0.0"}
exit=1

$ (artefak dikembalikan) nadina sbom bind -file contoh-app.zip -sbom sbom.json -out wrapper.json
Wrapper SBOM ditulis ke wrapper.json
exit=0

$ nadina sbom sign -sbom wrapper.json -package contoh-app -version 1.0.0 -key keys/publisher.key.pem -out sbom-bundle.json
Bundle SBOM ditulis ke sbom-bundle.json
keyid: 0fd1253e76fb28e4cd1b59ba8dd33402fed977db6fc575a1d538c5ce544ab3c0
algorithm: ed25519
exit=0

$ nadina sbom verify -file contoh-app.zip -bundle release.json -sbom wrapper.json -sbom-bundle sbom-bundle.json -trust-store trust.json -package contoh-app -version 1.0.0 -json
{"valid":true,"status":"OK","message":"SBOM dan artefak rilis valid dan saling merujuk.","algorithm":"ed25519","keyid":"0fd1253e76fb28e4cd1b59ba8dd33402fed977db6fc575a1d538c5ce544ab3c0","package":"contoh-app","version":"1.0.0"}
exit=0

$ nadina sbom extract -sbom wrapper.json -out sbom-keluar.json
SBOM ditulis ke sbom-keluar.json
exit=0
$ cmp sbom.json sbom-keluar.json
(tidak ada keluaran: byte identik)

$ nadina -version
0.1.0
exit=0
\end{lstlisting}
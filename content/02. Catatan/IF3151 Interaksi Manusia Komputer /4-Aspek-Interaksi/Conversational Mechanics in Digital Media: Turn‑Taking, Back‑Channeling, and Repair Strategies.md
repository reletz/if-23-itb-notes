---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3151 Interaksi Manusia Komputer]]

> [!cornell] Conversational Mechanics in Digital Media: Turn‑Taking, Back‑Channeling, and Repair Strategies
>
> > ## Questions/Cues
> >
> > - Mengapa turn‑taking penting dalam interaksi digital?
> > - Bagaimana back‑channeling menandakan kelanjutan pembicaraan?
> > - Kapan strategi repair diperlukan pada chat?
> > - Apa perbedaan breakdown pada video conference vs email?
> > - Bagaimana isyarat non‑verbal memengaruhi pergantian pembicara?
> >
> > ## Reference Points
> >
> > - Slide_Conversational_Mechanics.pdf (Pages 5‑9)
> > - Sacks_et_al_1978_Conversation_Analysis.pdf (Pages 12‑14)
> > - Lecture_TurnTaking.pptx (Slides 3‑7)
> > - Research_BackChanneling_2020.pdf (Pages 21‑27)
> > - Design_Repair_Strategies.docx (Pages 2‑6)
>
> > ### Conversational Rules
> >
> > Pada interaksi tatap‑muka tradisional, terdapat tiga aturan dasar yang diusulkan oleh Sacks, Schegloff, dan Jefferson (1978). Aturan pertama menyatakan bahwa **pembicara saat ini memilih pembicara berikutnya** dengan mengajukan pertanyaan, permintaan, atau opini. Ini berfungsi sebagai “sinyal alokasi” yang memberi kesempatan kepada lawan bicara untuk mengambil alih giliran. Aturan kedua memberi kebebasan kepada orang lain untuk **memulai pembicaraan** secara inisiatif, misalnya dengan menyela atau menambahkan komentar yang relevan. Aturan ketiga memungkinkan **pembicara saat ini melanjutkan** pembicaraan bila tidak ada sinyal alokasi yang jelas dari lawan bicara. Kombinasi ketiga aturan ini menciptakan alur percakapan yang terkoordinasi tanpa perlu kesepakatan eksplisit.
> >
> > Dalam konteks digital, aturan‑aturan ini tetap relevan tetapi sering kali terdistorsi oleh keterbatasan media. Misalnya, pada platform teks, tidak ada isyarat vokal atau gestur yang menandakan akhir giliran, sehingga pengguna cenderung mengandalkan **tanda baca, emoji, atau kata penutup** (seperti “…”, “ok?”) untuk menandai bahwa mereka selesai berbicara. Jika isyarat ini tidak jelas, terjadi tumpang tindih (overlap) atau “silence gap” yang dapat menimbulkan kebingungan.
> >
> > Contoh sederhana: dalam sebuah grup chat, A menulis “Kita bertemu jam 8?” dan menunggu respons. Di sini, A secara implisit mengalokasikan giliran kepada B. Jika B menjawab “Bisa, tapi agak lama,” maka B telah mengambil alih giliran sesuai aturan pertama. Jika C tiba‑tiba menambahkan “Saya ada di luar kota,” tanpa menunggu respons A, C melanggar aturan kedua karena tidak ada sinyal alokasi yang jelas, yang dapat menyebabkan percakapan menjadi tidak teratur.
> >
> > Memahami aturan‑aturan ini penting bagi perancang antarmuka karena mereka dapat **menyediakan mekanisme bantu** (seperti “typing indicator” atau “turn‑taking highlight”) yang meniru sinyal alokasi alami, sehingga percakapan digital menjadi lebih lancar.
> >
> > ### Turn‑Taking in Digital Media
> >
> > Turn‑taking merupakan mekanisme koordinasi utama yang memastikan satu orang berbicara pada satu waktu, menghindari tumpang tindih suara atau teks. Pada media **synchronous** seperti video conference, turn‑taking biasanya diatur oleh isyarat visual (gerakan kepala, mengangkat tangan) atau verbal (“maaf, boleh saya?”). Sistem seperti Zoom atau Microsoft Teams menambahkan fitur “raise hand” yang secara eksplisit memberi sinyal alokasi, meniru praktik tatap‑muka.
> >
> > Pada media **asynchronous** seperti email atau forum, turn‑taking tidak bersifat real‑time. Di sini, “giliran” diartikan sebagai **urutan respons** dalam thread. Pengguna menandai balasan mereka dengan “Re:” atau “Reply” yang secara implisit menunjukkan bahwa mereka menanggapi pesan sebelumnya. Namun, karena tidak ada batas waktu yang ketat, percakapan dapat menjadi **interleaved** (tercampur) ketika banyak orang menanggapi pada waktu yang berbeda, sehingga penting bagi platform untuk menampilkan **threaded view** yang jelas.
> >
> > Contoh praktis: dalam sebuah rapat daring, moderator mengucapkan “Silakan, Budi, Anda dulu.” Ini adalah contoh alokasi eksplisit yang meminimalkan kebingungan. Sebaliknya, dalam grup WhatsApp, seseorang mungkin menulis “Guys, siapa yang mau ambil tugas ini?” tanpa menunggu respons, yang dapat menghasilkan banyak orang mengirimkan “saya” secara bersamaan—fenomena yang disebut **simultaneous turn‑taking**. Desain antarmuka yang menampilkan “who is typing” atau “last seen” dapat membantu mengurangi kejadian ini.
> >
> > Turn‑taking juga dipengaruhi oleh **latensi jaringan**. Pada jaringan dengan delay tinggi, sinyal alokasi dapat tertunda, menyebabkan pembicara melanjutkan sebelum lawan bicara selesai. Penelitian menunjukkan bahwa penambahan **buffer audio** atau **visual cue** (misalnya, lampu hijau pada avatar) dapat memperbaiki koordinasi dalam kondisi latensi tinggi.
> >
> > ### Back‑Channeling Signals
> >
> > Back‑channeling adalah serangkaian isyarat pendek yang diberikan oleh pendengar untuk menunjukkan bahwa mereka **memperhatikan, mengerti, atau setuju** dengan pembicara. Dalam percakapan tatap‑muka, contoh klasik meliputi “uh‑uh”, “yeah”, atau anggukan kepala. Pada media digital, back‑channeling bertransformasi menjadi **emoji**, **react** (👍, ❤️), atau **short textual tokens** seperti “hm”, “ok”, “got it”.
> >
> > Fungsi utama back‑channeling adalah **menjaga alur**. Tanpa sinyal ini, pembicara dapat merasa bahwa lawan bicara tidak terlibat, yang dapat menyebabkan **breakdown**. Misalnya, dalam video call, jika peserta tidak memberikan respons non‑verbal, pembicara mungkin berhenti atau mengulang informasi. Platform seperti Microsoft Teams menambahkan “reaction” yang muncul di sudut layar, memungkinkan peserta memberi umpan balik tanpa mengganggu alur bicara.
> >
> > Contoh penggunaan: saat seorang dosen menjelaskan konsep, seorang mahasiswa dapat menekan tombol “thumbs up” pada Zoom. Ini memberi sinyal bahwa mahasiswa mengikuti penjelasan, sehingga dosen tidak perlu menghentikan penjelasan untuk menanyakan “Apakah semua mengerti?”. Pada chat teks, penggunaan “...” (tiga titik) sering kali menandakan bahwa pembicara masih berpikir atau menunggu respons, berfungsi sebagai back‑channel yang lebih halus.
> >
> > Penelitian terbaru (2020) menunjukkan bahwa **frekuensi back‑channeling** berbanding lurus dengan persepsi kehadiran sosial dalam ruang virtual. Oleh karena itu, perancang UI harus menyediakan **shortcut** atau **gesture** yang mudah diakses untuk mengirimkan back‑channel secara cepat, terutama pada perangkat seluler dengan layar kecil.
> >
> > ### Repair Strategies and Breakdown Types
> >
> > **Breakdown** terjadi ketika salah satu pihak tidak dapat melanjutkan percakapan karena miskomunikasi, gangguan teknis, atau ambiguitas bahasa. Dalam konteks digital, terdapat beberapa **tipe breakdown**: (1) **Teknis** (mis. koneksi terputus, audio drop), (2) **Linguistik** (mis. penggunaan istilah yang tidak dipahami), dan (3) **Sosial** (mis. tidak ada isyarat giliran). Setiap tipe memerlukan **strategi repair** yang berbeda.
> >
> > Pada **email**, strategi repair biasanya melibatkan **klarifikasi tertulis**: “Maaf, maksud Anda …?” atau “Bisakah Anda menjelaskan lebih detail?”. Karena email bersifat asynchronous, ada cukup waktu untuk menulis ulang atau menambahkan konteks. Pada **chat** atau **messaging**, repair cenderung lebih singkat dan bersifat **real‑time**, misalnya dengan mengirim “?” atau “what?” segera setelah kebingungan muncul.
> >
> > Pada **video conference**, repair dapat melibatkan **re‑transmisi audio**, **mengulangi kalimat**, atau **menggunakan fitur “share screen”** untuk memperjelas. Jika terjadi **latency** atau **audio drop**, peserta biasanya mengucapkan “Can you repeat that?” atau menekan tombol “raise hand” untuk meminta giliran menjelaskan kembali. Pada **texting**, terutama pada platform dengan **auto‑correction**, repair dapat melibatkan **edit pesan** (fitur “edit” pada Telegram) atau mengirim pesan koreksi (“saya maksud …”).
> >
> > Contoh konkret: dalam rapat Zoom, presenter menyebutkan “the quarterly revenue increased by 15%”. Seorang peserta tidak mendengar angka tersebut karena gangguan jaringan, sehingga ia menekan tombol “raise hand” dan berkata “Maaf, angka berapa?”. Presenter kemudian mengulangi angka tersebut, memperbaiki breakdown teknis. Pada Slack, seorang anggota tim menulis “Saya sudah mengirim file ke folder X”. Rekan lain menjawab “Folder mana ya?”—ini merupakan repair linguistik yang memerlukan klarifikasi lebih lanjut.
> >
> > Memahami tipe‑tipe breakdown dan strategi repair memungkinkan desainer untuk **menyediakan affordance** yang memudahkan pengguna melakukan perbaikan, seperti tombol “edit”, “reply in thread”, atau “request repeat” yang otomatis muncul ketika sinyal kegagalan terdeteksi.
> >
> > ### Farewell Rituals and Implicit Cues
> >
> > Penutup percakapan memiliki **ritual** yang menandakan bahwa interaksi akan berakhir. Ritual ini dapat bersifat **eksplisit** (mis. “Sampai jumpa besok”, “Terima kasih, saya harus pergi”) atau **implisit** (mis. melihat jam, mengemas barang, mengalihkan pandangan). Pada media digital, isyarat implisit sering kali muncul sebagai **status perubahan** (mis. “offline”, “last seen 5 menit yang lalu”) atau **animasi** (mis. avatar yang menutup laptop).
> >
> > Contoh dalam chat grup: seorang anggota menulis “Oke, saya log out dulu, terima kasih semuanya!” diikuti dengan emoji waving. Ini adalah kombinasi isyarat verbal dan non‑verbal yang menandakan akhir giliran. Pada video call, peserta dapat menutup kamera atau menutup mikrofon, yang secara visual memberi sinyal bahwa mereka akan meninggalkan ruang.
> >
> > Penelitian menunjukkan bahwa **ketidaksesuaian antara isyarat eksplisit dan implisit** dapat menimbulkan kebingungan. Misalnya, seseorang mengatakan “Saya harus pergi” tetapi tetap terlihat aktif di chat (mengetik atau mengirim emoji). Hal ini dapat membuat lawan bicara merasa tidak dihargai atau menunggu respons yang tidak akan datang. Oleh karena itu, antarmuka yang menampilkan **status kehadiran** secara real‑time (mis. “away”, “busy”) membantu menyelaraskan persepsi.
> >
> > Dalam desain sistem kolaboratif, penting untuk menyediakan **fitur penutup** yang mudah diakses, seperti tombol “End Meeting” dengan konfirmasi, atau “Leave Chat” yang menampilkan pesan otomatis “User has left the conversation”. Fitur-fitur ini memperjelas niat pengguna dan mengurangi potensi breakdown pada fase penutup.

> [!cornell] #### Summary
>
> **Turn‑taking**, **back‑channeling**, dan **repair strategies** merupakan tiga pilar utama mekanika percakapan yang tetap relevan dalam konteks digital, meskipun media mengubah cara sinyal alokasi, isyarat pendukung, dan perbaikan disampaikan. Aturan‑aturan dasar Sacks et al. (1978) memberikan kerangka konseptual untuk memahami alur percakapan, sementara adaptasi seperti “typing indicator”, emoji, dan fitur “raise hand” membantu meniru isyarat tatap‑muka. **Breakdown** dapat muncul dalam bentuk teknis, linguistik, atau sosial, dan memerlukan strategi repair yang disesuaikan dengan sifat synchronous atau asynchronous media. Akhirnya, **ritual perpisahan** baik eksplisit maupun implisit berperan penting dalam menandai akhir interaksi, sehingga antarmuka harus menyediakan isyarat yang jelas untuk menghindari kebingungan.

> [!ad-libitum]- Additional Information
>
> #### Formal Models of Turn‑Taking
>
> Model formal turn‑taking, seperti **System of Turn‑Taking (STT)** yang dikembangkan oleh Sacks, Schegloff, dan Jefferson, memformalkan percakapan sebagai rangkaian **transition relevance places (TRPs)**. Pada setiap TRP, satu pembicara dapat mengakhiri giliran dan memberi kesempatan kepada pembicara lain. Model ini dapat diimplementasikan dalam sistem dialog berbasis agen dengan menggunakan **state machines** yang memantau sinyal akhir (mis. pause > 500 ms, intonasi penurunan). Penelitian terkini (Stolcke 2021) memperluas STT dengan **probabilistic turn‑allocation**, di mana algoritma memprediksi kemungkinan pembicara berikutnya berdasarkan riwayat percakapan dan fitur prosodik.
>
> Implementasi praktis melibatkan **speech‑to‑text** untuk mendeteksi akhir kalimat secara real‑time, serta **machine‑learning classifiers** yang menilai apakah sebuah utterance mengandung “completion cues” (mis. “so”, “right?”). Model ini memungkinkan agen virtual (seperti chatbot) untuk **menunggu secara natural** sebelum memberikan respons, meningkatkan persepsi kehadiran sosial.
>
> #### Computational Detection of Back‑Channeling
>
> Pada media audio‑visual, back‑channeling dapat dideteksi dengan **analisis prosodi** (pitch rise, intensity) dan **gesture recognition** (head nod, facial smile). Algoritma berbasis **Convolutional Neural Networks (CNN)** pada video frame dapat mengklasifikasikan gerakan kepala sebagai sinyal back‑channel dengan akurasi > 85 % (Zhang et al., 2020). Pada teks, pendekatan **Natural Language Processing (NLP)** menggunakan **n‑gram** dan **sentiment analysis** untuk mengidentifikasi token pendek seperti “uh‑uh”, “yeah”, atau emoji 👍 yang berfungsi sebagai back‑channel.
>
> Sistem rekomendasi dalam platform konferensi dapat memanfaatkan deteksi ini untuk **menyajikan visual cue** (mis. ikon “listening”) kepada pembicara, sehingga mereka mengetahui bahwa audiens terlibat. Selain itu, data back‑channel dapat diolah untuk **mengukur engagement** secara kuantitatif, membantu moderator menyesuaikan kecepatan presentasi.
>
> #### Repair in Asynchronous vs Synchronous Media
>
> **Asynchronous media** (email, forum) memberikan waktu tambahan bagi pengguna untuk melakukan **repair linguistik** yang lebih terstruktur, seperti menulis klarifikasi lengkap atau mengirim dokumen revisi. Model **Repair Sequence Theory** (Schegloff 1996) menj
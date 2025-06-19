/**
 * Sebuah proses yang membutuhkan dua sumber daya dan sengaja dirancang
 * untuk dapat menyebabkan deadlock jika tidak ditangani dengan benar.
 */
public class DeadlockingProcess implements Runnable {
    private final Resource firstResource;
    private final Resource secondResource;

    public DeadlockingProcess(Resource firstResource, Resource secondResource) {
        this.firstResource = firstResource;
        this.secondResource = secondResource;
    }

    @Override
    public void run() {
        String threadName = Thread.currentThread().getName();
        System.out.println(threadName + ": Memulai eksekusi.");
        
        /*
         * TODO: IDENTIFIKASI DEADLOCK
         * Jelaskan di sini mengapa deadlock bisa terjadi.
         * Contoh penjelasan: Deadlock terjadi karena Thread-A mengunci Resource-1 dan menunggu Resource-2,
         * sementara Thread-B mengunci Resource-2 dan menunggu Resource-1. Keduanya saling menunggu
         * selamanya.
         */

        /*
         * TODO: SOLUSI DEADLOCK
         * Modifikasi blok synchronized di bawah ini untuk mencegah deadlock.
         * Tips: Buat aturan agar semua thread mengunci resource dengan urutan yang konsisten.
         * Misalnya, kunci resource dengan nama yang lebih kecil (secara alfabetis) terlebih dahulu.
         */

        System.out.println(threadName + ": Mencoba mengunci " + firstResource.name);
        synchronized (firstResource) {
            System.out.println(threadName + ": Berhasil mengunci " + firstResource.name);
            
            // Memberi kesempatan thread lain untuk berjalan dan mengunci resource kedua
            try { Thread.sleep(100); } catch (InterruptedException e) {}

            System.out.println(threadName + ": Mencoba mengunci " + secondResource.name);
            synchronized (secondResource) {
                System.out.println(threadName + ": Berhasil mengunci " + secondResource.name);
                
                // Melakukan pekerjaan
                System.out.println(threadName + ": Bekerja dengan kedua resource...");
            }
            System.out.println(threadName + ": Melepas kunci " + secondResource.name);
        }
        System.out.println(threadName + ": Melepas kunci " + firstResource.name + " dan selesai.");
    }
}

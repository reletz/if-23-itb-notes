import java.util.Random;

/**
 * Merepresentasikan satu mobil balap yang berjalan di thread-nya sendiri.
 */
public class Car implements Runnable {
    private final String name;
    // TODO: Gunakan keyword 'volatile' untuk memastikan visibilitas antar thread.
    private double distanceCovered = 0;
    private final Random random = new Random();

    public Car(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public double getDistanceCovered() {
        return distanceCovered;
    }

    /**
     * TODO: Implementasikan method ini.
     * Method ini harus berisi 'while' loop yang terus berjalan selama thread belum diinterupsi.
     * Di dalam loop, mobil akan "bergerak" dengan menambah 'distanceCovered'.
     * 'InterruptedException' harus ditangkap untuk menghentikan loop secara bersih.
     */
    @Override
    public void run() {
        Thread.currentThread().setName(this.name);
        System.out.println(this.name + " memulai balapan!");

        // TODO: Buat loop 'while' yang memeriksa status interupsi thread.
        // while (!Thread.currentThread().isInterrupted()) { ... }
        
            // Simulasi pergerakan mobil.
            distanceCovered += random.nextDouble() * 10; // Menambah jarak 0-10 meter.
            
            try {
                // Berhenti sejenak, membuat thread responsif terhadap interupsi.
                Thread.sleep(100);
            } catch (InterruptedException e) {
                // TODO: Tangani interupsi. Keluar dari loop.
                // Cetak pesan bahwa mobil telah finis.
                
            }
        
    }
}

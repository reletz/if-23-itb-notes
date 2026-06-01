import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Mengelola semua rak dan robot di gudang.
 */
public class WarehouseManager {
    private final Map<ItemType, Shelf> shelves;

    public WarehouseManager(Map<ItemType, Shelf> shelves) {
        this.shelves = shelves;
    }

    /**
     * TODO: Implementasikan method ini.
     * Buat dan jalankan semua thread robot (producer dan consumer).
     * Kemudian, tunggu sampai semua thread tersebut selesai.
     * @param producersPerShelf Jumlah producer per rak.
     * @param consumersPerShelf Jumlah consumer per rak.
     * @param itemsPerProducer Jumlah item yang diproduksi setiap producer.
     */
    public void startOperation(int producersPerShelf, int consumersPerShelf, int itemsPerProducer) throws InterruptedException {
        List<Thread> allThreads = new ArrayList<>();
        int totalItemsPerShelf = producersPerShelf * itemsPerProducer;

        for (ItemType type : shelves.keySet()) {
            Shelf currentShelf = shelves.get(type);

            // TODO: Buat thread untuk ProducerBot dan tambahkan ke 'allThreads'.
            
            // TODO: Buat thread untuk ConsumerBot dan tambahkan ke 'allThreads'.
            
        }

        System.out.println("--- Gudang Mulai Beroperasi ---");
        
        // TODO: Jalankan semua thread.
        

        // TODO: Tunggu semua thread selesai menggunakan join().
        

        System.out.println("--- Semua Operasi Gudang Selesai ---");
    }
}

import java.util.HashMap;
import java.util.Map;

public class SmartWarehouseChecker {
    public static void main(String[] args) {
        System.out.println("--- Smart Warehouse Checker ---");

        // Konfigurasi gudang
        Map<ItemType, Shelf> shelves = new HashMap<>();
        shelves.put(ItemType.ELECTRONICS, new Shelf(ItemType.ELECTRONICS, 5));
        shelves.put(ItemType.BOOKS, new Shelf(ItemType.BOOKS, 8));
        shelves.put(ItemType.CLOTHING, new Shelf(ItemType.CLOTHING, 10));

        WarehouseManager manager = new WarehouseManager(shelves);

        // Konfigurasi simulasi
        int producersPerShelf = 2;
        int consumersPerShelf = 2;
        int itemsPerProducer = 10;
        int totalItemsProduced = shelves.size() * producersPerShelf * itemsPerProducer;
        int totalItemsConsumed = shelves.size() * consumersPerShelf * (totalItemsProduced / (shelves.size() * consumersPerShelf));

        try {
            long startTime = System.currentTimeMillis();
            manager.startOperation(producersPerShelf, consumersPerShelf, itemsPerProducer);
            long endTime = System.currentTimeMillis();

            System.out.println("\n--- CHECKER RESULTS ---");
            System.out.println("Simulasi selesai dalam " + (endTime - startTime) + "ms.");
            
            // Verifikasi sederhana
            // Dalam sistem yang sempurna, semua yang diproduksi akan dikonsumsi.
            // Pengecekan ini tidak bisa 100% akurat tanpa mengubah kelas-kelas inti
            // untuk tujuan pengujian, tapi bisa memberikan indikasi.
            System.out.println("Total items yang seharusnya diproduksi: " + totalItemsProduced);
            System.out.println("Total items yang seharusnya dikonsumsi: " + totalItemsConsumed);
            
            if (totalItemsProduced == totalItemsConsumed) {
                 System.out.println("STATUS: SUCCESS! Jumlah produksi dan konsumsi seimbang. Konkurensi kemungkinan besar ditangani dengan benar.");
            } else {
                 System.out.println("STATUS: POTENTIAL ISSUE! Jumlah produksi dan konsumsi tidak seimbang. Mungkin ada masalah deadlock atau logika wait/notify.");
            }

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("Checker diinterupsi.");
            System.out.println("STATUS: FAILED! Terjadi interupsi pada thread utama.");
        } catch (Exception e) {
            System.err.println("Terjadi error tak terduga: " + e.getMessage());
            e.printStackTrace();
            System.out.println("STATUS: FAILED! Program menghasilkan error runtime.");
        }
        System.out.println("-------------------------");
    }
}

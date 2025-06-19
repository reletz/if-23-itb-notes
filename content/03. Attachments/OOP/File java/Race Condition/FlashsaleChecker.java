import java.util.ArrayList;
import java.util.List;

public class FlashSaleChecker {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("--- Flash Sale Checker ---");
        int initialStock = 15;
        int numCustomers = 100;

        FlashSale flashSale = new FlashSale(initialStock);
        List<Thread> customerThreads = new ArrayList<>();

        System.out.println("Memulai flash sale dengan " + initialStock + " item dan " + numCustomers + " pelanggan.");

        for (int i = 1; i <= numCustomers; i++) {
            Thread t = new Thread(new Customer(flashSale, "Pelanggan-" + i));
            customerThreads.add(t);
            t.start();
        }

        // Tunggu semua pelanggan selesai mencoba membeli
        for (Thread t : customerThreads) {
            t.join();
        }

        System.out.println("\n--- CHECKER RESULTS ---");
        int finalStock = flashSale.getAvailableStock();
        int purchases = flashSale.getSuccessfulPurchases();

        System.out.println("Stok Awal: " + initialStock);
        System.out.println("Pembelian Berhasil: " + purchases);
        System.out.println("Sisa Stok: " + finalStock);

        boolean success = (finalStock == 0) && (purchases == initialStock);
        
        if (finalStock < 0 || purchases > initialStock) {
            success = false;
            System.out.println("\nSTATUS: FAILED! Terjadi overselling!");
        }

        if (success) {
            System.out.println("\nSTATUS: SUCCESS! Stok dikelola dengan benar. Tidak ada race condition terdeteksi.");
        } else {
            System.out.println("\nSTATUS: FAILED! Jumlah stok akhir dan pembelian salah. Harusnya " + initialStock + " pembelian dan 0 sisa stok.");
        }
        System.out.println("------------------------");
    }
}
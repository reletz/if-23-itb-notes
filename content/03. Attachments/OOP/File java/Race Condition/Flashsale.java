/**
 * Mengelola data stok dan logika pembelian untuk sebuah flash sale.
 */
public class FlashSale {
    private int availableStock;
    private int successfulPurchases = 0;

    public FlashSale(int initialStock) {
        this.availableStock = initialStock;
    }

    /**
     * TODO: Method ini tidak thread-safe!
     * Beberapa thread yang memanggil ini secara bersamaan dapat menyebabkan stok menjadi negatif (overselling).
     * Jadikan method ini thread-safe menggunakan 'synchronized'.
     * @param customerName Nama pelanggan yang melakukan pembelian.
     * @return true jika pembelian berhasil, false jika gagal.
     */
    public boolean purchaseItem(String customerName) {
        if (this.availableStock > 0) {
            // Simulasi waktu pemrosesan untuk pembayaran, dll.
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            this.availableStock--;
            this.successfulPurchases++;
            System.out.println("SUCCESS: " + customerName + " membeli 1 item. Sisa stok: " + this.availableStock);
            return true;
        } else {
            System.out.println("FAIL: " + customerName + " tidak dapat membeli. Stok habis.");
            return false;
        }
    }

    public int getAvailableStock() {
        return availableStock;
    }

    public int getSuccessfulPurchases() {
        return successfulPurchases;
    }
}
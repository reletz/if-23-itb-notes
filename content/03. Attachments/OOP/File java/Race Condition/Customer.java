/**
 * Merepresentasikan seorang pelanggan yang mencoba untuk membeli item dalam flash sale.
 * Mengimplementasikan Runnable untuk dijalankan sebagai thread.
 */
class Customer implements Runnable {
    private final FlashSale flashSale;
    private final String name;

    public Customer(FlashSale flashSale, String name) {
        this.flashSale = flashSale;
        this.name = name;
    }

    @Override
    public void run() {
        flashSale.purchaseItem(name);
    }
}
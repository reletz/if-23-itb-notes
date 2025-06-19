/**
 * Robot yang tugasnya adalah memproduksi item dengan tipe tertentu
 * dan menyimpannya ke rak yang sesuai.
 */
public class ProducerBot implements Runnable {
    private final Shelf targetShelf;
    private final int itemsToProduce;
    private final ItemType itemType;

    public ProducerBot(Shelf targetShelf, int itemsToProduce) {
        this.targetShelf = targetShelf;
        this.itemsToProduce = itemsToProduce;
        this.itemType = targetShelf.getShelfType();
    }

    @Override
    public void run() {
        Thread.currentThread().setName("Producer-" + itemType);
        try {
            for (int i = 0; i < itemsToProduce; i++) {
                Item newItem = new Item(itemType, i + 1);
                // TODO: Panggil method pada targetShelf untuk menyimpan item.
                // Simulasi waktu produksi
                Thread.sleep(50);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println(Thread.currentThread().getName() + " diinterupsi.");
        }
    }
}

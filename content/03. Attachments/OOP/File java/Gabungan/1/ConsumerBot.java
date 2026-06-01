/**
 * Robot yang tugasnya adalah mengambil item dengan tipe tertentu dari rak.
 */
public class ConsumerBot implements Runnable {
    private final Shelf targetShelf;
    private final int itemsToConsume;

    public ConsumerBot(Shelf targetShelf, int itemsToConsume) {
        this.targetShelf = targetShelf;
        this.itemsToConsume = itemsToConsume;
    }

    @Override
    public void run() {
        Thread.currentThread().setName("Consumer-" + targetShelf.getShelfType());
        try {
            for (int i = 0; i < itemsToConsume; i++) {
                // TODO: Panggil method pada targetShelf untuk mengambil item.
                // Simulasi waktu konsumsi
                Thread.sleep(100);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println(Thread.currentThread().getName() + " diinterupsi.");
        }
    }
}

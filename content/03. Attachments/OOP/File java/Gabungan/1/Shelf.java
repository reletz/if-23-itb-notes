import java.util.ArrayDeque;
import java.util.Queue;

/**
 * Merepresentasikan satu rak di gudang dengan kapasitas dan tipe barang tertentu.
 * Kelas ini harus mengelola sinkronisasinya sendiri.
 */
public class Shelf {
    private final Queue<Item> items;
    private final int capacity;
    private final ItemType shelfType;

    public Shelf(ItemType shelfType, int capacity) {
        this.shelfType = shelfType;
        this.capacity = capacity;
        this.items = new ArrayDeque<>(capacity);
    }

    public ItemType getShelfType() {
        return shelfType;
    }

    /**
     * TODO: Implementasikan method ini.
     * Harus thread-safe. Jika rak penuh, thread yang memanggil harus menunggu.
     * Method ini hanya boleh menerima item yang tipenya sesuai dengan tipe rak.
     * Setelah item ditambahkan, bangunkan thread yang mungkin sedang menunggu (consumer).
     * @param item Item yang akan ditambahkan.
     * @throws InterruptedException jika thread diinterupsi.
     */
    public synchronized void putItem(Item item) throws InterruptedException {
        // Validasi tipe item, lempar exception jika tidak sesuai.
        if (item.getType() != this.shelfType) {
            throw new IllegalArgumentException("Error: Mencoba menyimpan " + item.getType() + " di rak " + this.shelfType);
        }

        // TODO: Gunakan 'while' loop untuk menunggu jika rak penuh.
        

        items.add(item);
        System.out.println(Thread.currentThread().getName() + " menyimpan " + item + " ke rak " + shelfType + ". [" + items.size() + "/" + capacity + "]");

        // TODO: Beri tahu thread lain (consumer) bahwa ada item baru.
        
    }

    /**
     * TODO: Implementasikan method ini.
     * Harus thread-safe. Jika rak kosong, thread yang memanggil harus menunggu.
     * Setelah item diambil, bangunkan thread yang mungkin sedang menunggu (producer).
     * @return Item yang diambil dari rak.
     * @throws InterruptedException jika thread diinterupsi.
     */
    public synchronized Item getItem() throws InterruptedException {
        // TODO: Gunakan 'while' loop untuk menunggu jika rak kosong.
        

        Item item = items.poll();
        System.out.println(Thread.currentThread().getName() + " mengambil " + item + " dari rak " + shelfType + ". [" + items.size() + "/" + capacity + "]");

        // TODO: Beri tahu thread lain (producer) bahwa ada ruang kosong.
        

        return item;
    }
}

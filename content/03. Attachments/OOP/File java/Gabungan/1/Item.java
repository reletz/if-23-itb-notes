/**
 * Enum untuk merepresentasikan tipe barang yang berbeda di gudang.
 * Tidak perlu diubah.
 */
public enum ItemType {
    ELECTRONICS,
    BOOKS,
    CLOTHING
}

/**A
 * Kelas yang merepresentasikan satu unit barang dengan tipe tertentu.
 * Tidak perlu diubah.
 */
class Item {
    private final ItemType type;
    private final int id;

    public Item(ItemType type, int id) {
        this.type = type;
        this.id = id;
    }

    public ItemType getType() {
        return type;
    }

    @Override
    public String toString() {
        return type.name() + "-Item-" + id;
    }
}

public class PipelineChecker {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("--- Data Pipeline Checker ---");
        int bufferSize = 5;
        int totalPackets = 20;

        DataBuffer buffer = new DataBuffer(bufferSize);
        Consumer consumer = new Consumer(buffer, totalPackets);
        Producer producer = new Producer(buffer, totalPackets);

        Thread producerThread = new Thread(producer);
        Thread consumerThread = new Thread(consumer);

        System.out.println("Memulai pipeline dengan ukuran buffer " + bufferSize + " untuk " + totalPackets + " paket.");

        producerThread.start();
        consumerThread.start();

        producerThread.join();
        consumerThread.join();

        System.out.println("\n--- CHECKER RESULTS ---");
        System.out.println("Thread Producer dan Consumer telah selesai.");
        System.out.println("Total paket diproduksi: " + totalPackets);
        System.out.println("Total paket dikonsumsi: " + consumer.consumedPackets.size());

        boolean success = true;
        if (consumer.consumedPackets.size() != totalPackets) {
            success = false;
        } else {
            for (int i = 0; i < totalPackets; i++) {
                if (!consumer.consumedPackets.get(i).equals("Packet-" + i)) {
                    System.out.println("Error: Mismatch pada indeks " + i + ". Harusnya Packet-" + i + " tapi malah " + consumer.consumedPackets.get(i));
                    success = false;
                    break;
                }
            }
        }

        if (success) {
            System.out.println("\nSTATUS: SUCCESS! Semua paket diproduksi dan dikonsumsi dengan benar.");
        } else {
            System.out.println("\nSTATUS: FAILED! Jumlah atau urutan paket salah. Periksa implementasi wait/notify Anda.");
        }
        System.out.println("------------------------");
    }
}
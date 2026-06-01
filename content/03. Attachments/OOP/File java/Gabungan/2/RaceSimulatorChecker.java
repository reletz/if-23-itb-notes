import java.util.Arrays;
import java.util.List;

public class RaceSimulatorChecker {
    public static void main(String[] args) {
        System.out.println("--- Race Simulator Checker ---");
        
        List<Car> cars = Arrays.asList(
            new Car("Mobil-A (Cepat)"),
            new Car("Mobil-B (Stabil)"),
            new Car("Mobil-C (Lambat)")
        );

        RaceControl raceControl = new RaceControl(cars);
        
        long raceDuration = 3000; // 3 detik
        long startTime = System.currentTimeMillis();
        
        raceControl.startRace(raceDuration);
        
        long endTime = System.currentTimeMillis();
        long actualDuration = endTime - startTime;

        System.out.println("\n--- CHECKER RESULTS ---");
        System.out.println("Durasi balapan yang diharapkan: ~" + raceDuration + "ms");
        System.out.println("Durasi eksekusi aktual: " + actualDuration + "ms");

        boolean allStopped = true;
        for (Car car : cars) {
            if (car.getDistanceCovered() == 0) {
                System.out.println("Error: " + car.getName() + " tidak bergerak sama sekali.");
                allStopped = false; 
            }
        }
        
        // Toleransi waktu untuk overhead
        if (actualDuration >= raceDuration && actualDuration < raceDuration + 500 && allStopped) {
            System.out.println("STATUS: SUCCESS! Balapan berjalan sesuai durasi, dan semua mobil berhenti dengan benar.");
        } else if (!allStopped) {
            System.out.println("STATUS: FAILED! Beberapa mobil tidak memulai atau melaporkan jarak. Periksa loop run().");
        }
        else {
            System.out.println("STATUS: FAILED! Durasi balapan tidak akurat. Periksa logika start, sleep, interrupt, dan join Anda.");
        }
        System.out.println("-------------------------");
    }
}

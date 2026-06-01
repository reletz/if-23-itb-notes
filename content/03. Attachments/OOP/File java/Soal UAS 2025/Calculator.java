public class Calculator {
    private int precision = 2;

    public int add(int a, int b) {
        int r = a + b;
        System.out.printf("add      (%d, %d) = %d%n", a, b, r);
        return r;
    }

    public int subtract(int a, int b) {
        int r = a - b;
        System.out.printf("subtract (%d, %d) = %d%n", a, b, r);
        return r;
    }

    public int multiply(int a, int b) {
        int r = a * b;
        System.out.printf("multiply (%d, %d) = %d%n", a, b, r);
        return r;
    }

    public double divide(int a, int b) {
        double raw = (double) a / b;
        double scale = Math.pow(10, precision);
        double r = Math.round(raw * scale) / scale;
        String fmt = "divide   (%d, %d) with precision=%d -> %." + precision + "f%n";
        System.out.printf(fmt, a, b, precision, r);
        return r;
    }
}

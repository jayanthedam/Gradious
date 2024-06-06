// import java.util.ArrayList;

// public class IntSequence {
// public static void main(String[] args) {
// Java_temp.IntSeq mySeq = new Java_temp.IntSeq(20);
// mySeq.start();
// mySeq.addBefore(0);
// mySeq.ensureCapacity(10);
// mySeq.addMany(123, 12, 1, 23, 8, 5);
// mySeq.printSeq();
// mySeq.trimToSize();
// System.out.println(mySeq.getCurrent());
// }

// static class IntSeq {
// private ArrayList<Integer> seq;
// private int curr;

// public IntSeq() {
// seq = new ArrayList<>();
// curr = -1;
// }

// public IntSeq(int initialCapacity) {
// seq = new ArrayList<>(initialCapacity);
// curr = -1;
// }

// public void start() {
// curr = 0;
// }

// public boolean isCurrent() {
// return curr >= 0 && curr < seq.size();
// }

// public void advance() {
// if (!isCurrent()) {
// throw new IllegalStateException("No current element exists");
// }
// curr++;
// }

// public void removeCurrent() {
// if (!isCurrent()) {
// throw new IllegalStateException("No current element exists");
// }
// seq.remove(curr);
// }

// public void addAfter(int element) {
// if (!isCurrent()) {
// throw new IllegalStateException("No current element exists");
// }
// seq.add(curr + 1, element);
// curr++;
// }

// public void addBefore(int element) {
// if (!isCurrent()) {
// throw new IllegalStateException("No current element exists");
// }
// seq.add(curr, element);
// }

// public void addMany(int... addend) {
// for (int element : addend) {
// seq.add(element);
// }
// }

// public void ensureCapacity(int minimumCapacity) {
// seq.ensureCapacity(minimumCapacity);
// }

// public int getCurrent() {
// if (!isCurrent()) {
// throw new IllegalStateException("No current element exists");
// }
// return seq.get(curr);
// }

// public void printSeq() {
// for (int element : seq) {
// System.out.print(element + " ");
// }
// System.out.println();
// }

// public void trimToSize() {
// seq.trimToSize();
// }
// }
// }

// import java.util.LinkedList;
public class Linkedlist1 {
    private static class IntNode {
        int data;
        IntNode link;

        public IntNode(int initialData, IntNode initialLink) {
            data = initialData;
            link = initialLink;
        }

        public int getData() {
            return data;
        }

        public IntNode getLink() {
            return link;
        }

        public void setLink(IntNode newLink) {
            link = newLink;
        }
    }

    IntNode head;
    IntNode current;

    public Linkedlist1() {
        head = null;
        current = null;
    }

    public void start() {
        current = head;
    }

    public boolean isCurrent() {
        return current != null;
    }

    public void advance() {
        current = current.getLink();
    }

    public void removeCurrent() {
        if (head == current) {
            head = head.getLink();
        } else {
            IntNode previous = head;
            while (previous.getLink() != current) {
                previous = previous.getLink();
            }
            previous.setLink(current.getLink());
        }
        current = current.getLink();
    }

    public void addAfter(int element) {
        IntNode newNode = new IntNode(element, current.getLink());
        current.setLink(newNode);
    }

    public void addBefore(int element) {
        IntNode newNode = new IntNode(element, current);
        if (current == head) {
            head = newNode;
        } else {
            IntNode previous = head;
            while (previous.getLink() != current) {
                previous = previous.getLink();
            }
            previous.setLink(newNode);
        }
        current = newNode;
    }

    public int getCurrent() {
        return current.getData();
    }

    public static void main(String[] args) {
        Linkedlist1 list = new Linkedlist1();

        list.addBefore(7);
        list.addBefore(15);
        list.addBefore(23);

        list.start();
        System.out.println("After start " + list.getCurrent());

        list.advance();
        System.out.println("after advance " + list.getCurrent());

        list.addAfter(35);
        list.addAfter(42);

        System.out.print("before remove ");
        list.displayList();

        list.removeCurrent();
        list.removeCurrent();

        System.out.print("\nafter remove ");
        list.displayList();
    }

    public void displayList() {
        IntNode current = head;
        while (current != null) {
            System.out.print(current.getData() + ",");
            current = current.getLink();
        }
    }
}

// public class Linkedlist {
// private LinkedList<Integer> dataList;
// private int currentIndex;

// public Linkedlist() {
// dataList = new LinkedList<>();
// currentIndex = -1;
// }

// public void start() {
// currentIndex = 0;
// }

// public boolean isCurrent() {
// return currentIndex >= 0 && currentIndex < dataList.size();
// }

// public void advance() {
// if (!isCurrent()) {
// throw new IllegalStateException("No current element exists");
// }
// currentIndex++;
// }

// public void remove() {
// if (!isCurrent()) {
// throw new IllegalStateException("No current element exists");
// }
// dataList.remove(currentIndex);
// if (currentIndex == dataList.size()) {
// currentIndex = -1;
// }
// }

// public void addAfter(int element) {
// if (currentIndex == dataList.size() - 1) {
// dataList.add(element);
// currentIndex++;
// } else {
// dataList.add(currentIndex + 1, element);
// currentIndex++;
// }
// }

// public void addBefore(int element) {
// if (currentIndex == -1) {
// dataList.addFirst(element);
// currentIndex = 0;
// } else {
// dataList.add(currentIndex, element);
// }
// }

// public int getCurrent() {
// if (!isCurrent()) {
// throw new IllegalStateException("No current element exists");
// }
// return dataList.get(currentIndex);
// }

// public void displayList() {
// System.out.println(dataList);
// }

// public static void main(String[] args) {
// Linkedlist list = new Linkedlist();
// list.start();

// list.addBefore(7);
// list.addBefore(15);
// list.addBefore(23);
// list.addAfter(35);
// list.addAfter(42);

// list.displayList();

// list.remove();
// list.remove();

// list.displayList();

// list.advance();

// list.addBefore(10);

// list.displayList();
// }

// }

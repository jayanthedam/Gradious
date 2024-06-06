import java.util.*;

public class Postfix_stack {
    public static void main(String[] args) {
        String[] exp = { "3", "4", "*", "2", "5", "*", "+" };
        int result = Post_stack(exp);
        System.out.println("Result: " + result);
    }

    public static int Post_stack(String[] exp) {
        Stack<Integer> stack = new Stack<>();
        int op1, op2, result, temp;

        for (String str : exp) {

            if (check_num(str)) {
                temp = Integer.parseInt(str);
                stack.push(temp);
            } else if (str.equals("+") || str.equals("-") || str.equals("*") || str.equals("/")) {
                op2 = stack.pop();
                op1 = stack.pop();
                result = calculation(op1, op2, str);
                stack.push(result);
            }
        }

        return stack.pop();
    }

    public static boolean check_num(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public static int calculation(int operand1, int operand2, String operator) {
        if (operator.equals("+"))
            return operand1 + operand2;
        else if (operator.equals("-"))
            return operand1 - operand2;
        else if (operator.equals("*"))
            return operand1 * operand2;
        else if (operator.equals("/"))
            return operand1 / operand2;
        else
            return 0;
    }
}

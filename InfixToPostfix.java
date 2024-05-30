import java.util.Stack;

public class InfixToPostfix {
    public static void main(String[] args) {
        String[] infix_exp = { "2", "+", "3", "*", "(", "4", "-", "5", ")" };
        // String[] infix_exp2 = { "3", "*", "4", "+", "2", "*", "5" };

        for (String str : infix_exp)
            System.out.print(str);

        System.out.println("\n" + infixToPostfix(infix_exp));
    }

    public static String infixToPostfix(String[] infix_exp) {

        String postfix = "";
        Stack<String> stack = new Stack<>();

        for (String str : infix_exp) {

            if (check_num(str)) postfix += str;
            else if (str.equals("(")) stack.push(str);
            else if (str.equals(")")) {

                while (!stack.isEmpty() && !stack.peek().equals("(")) {
                    postfix += stack.pop();
                }
                stack.pop();
            } 
            else {
                while (!stack.isEmpty() && precedence(stack.peek()) >= precedence(str)) {
                    postfix += stack.pop();
                }
                stack.push(str);
            }
        }

        while (!stack.isEmpty()) postfix += stack.pop();

        return postfix;
    }

    public static boolean check_num(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public static int precedence(String operator) {
        if (operator == "+" || operator == "-")
            return 1;
        else if (operator == "*" || operator == "/")
            return 2;
        return 0;
    }
}

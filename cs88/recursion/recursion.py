# Q3.1 Factorial
def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n - 1)

print("Q3.1, Input 3, Expect 6, Correct? - ", factorial(3) == 6)
print("Q3.1, Input 0, Expect 1, Correct? - ", factorial(0) == 1)
print("Q3.1, Input 1, Expect 1, Correct? - ", factorial(1) == 1)
print("\n")

# Q3.2 Leap of faith
def fun1(x):
    if (x < 1):
        return "Done!"
    else:
        return str(x) + " " + fun1(x - 1)

def fun2(x, y):
    if (y == 2):
        return x
    else:
        return fun2(x, y-1) + x

def fun3(x):
    if (x < 1):
        return 1
    else:
        return x + fun3(x-4) + fun3(x-1)

print("Q3.2, Input fun1(3), Expect '3 2 1 Done!', Correct? - ", fun1(3) == "3 2 1 Done!")
print("Q3.2, Input fun2(3, 6), Expect 15, Correct? - ", fun2(3, 6) == 15)
print("Q3.2, Input fun3(5), Expect 23, Correct? - ", fun3(5) == 23)
print("\n")

# Q3.3 Merge Baby Merge
def mergeLists(a, b):
    if a == []:
        return b
    elif b == []:
        return a
    else:
        if a[0] < b[0]:
            return [a[0]] + mergeLists(a[1:], b)
        else:
            return [b[0]] + mergeLists(a, b[1:])

print("Q3.3, Input mergeLists([1,3,5], [2,4,6]), Expect [1,2,3,4,5,6], Correct? - ", mergeLists([1,3,5], [2,4,6]) == [1,2,3,4,5,6])
print("Q3.3, Input mergeLists([a,b,c], [d,e,f]), Expect [a,b,c,d,e,f], Correct? - ", mergeLists(['a','b','c'], ['d','e','f']) == ['a','b','c','d','e','f'])
print("\n")

# Q3.4 Step by step
def steps(n, step_size):
    helper(1, n, step_size)

def helper(size, n, step_size):
    if (size > n):
        return
    else:
        line = ""
        for x in range(size):
            line += "x"
        print(line)
        helper(size + step_size, n, step_size)

print("Q3.4, Input steps(9, 3), Expect 'x;xxxx;xxxxxxx', Correct?")
steps(9, 3)
print("Q3.4, Input steps(5, 1), Expect 'x;xx;xxx;xxxx;xxxxx', Correct?")
steps(5, 1)

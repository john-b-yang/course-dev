# Assume a and b are dictionaries.
# NOTE: The type of 'a' and 'b' keys + values could be *anything*
def mergeDicts(a, b):
    try:
        for key in a:
            a[key], b[key] = a[key] + b[key], a[key] / b[key]
        return a, b
    except (KeyError, TypeError, ZeroDivisionError) as error:
        template = "An exception of type {0} occurred. Arguments: {1!r}"
        message = template.format(type(error).__name__, error.args)
        print(message)
        return None, None

a, b = mergeDicts({"a" : 3, "b" : 2}, {"a" : 6, "b" : 4})
a, b = mergeDicts({"a" : 3, "b" : 2}, {"a" : "c", "b" : "d"})
a, b = mergeDicts({"a" : 3, "b" : 2}, {"a" : 1, "b" : 0})
a, b = mergeDicts({"a" : 3, "b" : 2}, {"c" : 1, "d" : 0})

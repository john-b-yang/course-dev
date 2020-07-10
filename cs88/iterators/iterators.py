# Problem 1.3.2: A Custom Iterator
class Transactions():
	stores = ["Walmart", "Target", "Walgreens"]
	items = ["toothpaste", "toothbrush", "floss"]
	values = [5, 15, 12]
	index = 0

	def __iter__(self):
		return self

	def __next__(self):
		if self.index < min(len(self.stores), len(self.items), len(self.values)):
			value = self.stores[self.index] + ", " + self.items[self.index] + ", " + str(self.values[self.index])
			self.index += 1
			return value
		else:
			raise StopIteration

print("Problem 1.3.2: A Custom Iterator\n----")
trans = Transactions()
transIter = iter(trans)
print(next(transIter))
print(next(transIter))
print(next(transIter))
# print(next(transIter)) # Stop Iteration

# Problem 2.2.1 What Would Python Do? (Generators)
def powers(x):
	value = x
	while True:
		yield value
		value *= x
		if value == 16:
			return value

print("\nProblem 2.2.1 What Would Python Do? (Generators) Pt. 1\n----")
gen = powers(2)
print(next(gen))
print(next(gen))
print(next(gen))
# print(next(gen)) # Stop Iteration

def mystery(x):
	if x%2 == 0:
		yield x * 2
	else:
		yield x
		yield from mystery(x-1)

print("\nProblem 2.2.1 What Would Python Do? (Generators) Pt. 2\n----")
gen = mystery(2)
print(next(gen))
gen = mystery(9)
print(next(gen))
print(next(gen))
# print(next(gen)) # Stop Iteration

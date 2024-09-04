from abc import abstractmethod, ABC


class ABCParent(ABC):
    @abstractmethod
    def __init__(self) -> None:
        self.a = "a set in parent"
        self.b = "b set in parent"
        pass

    def hello(self):
        print("Hello from parent")

    @abstractmethod
    def local_hello(self):
        pass

    @property
    @abstractmethod
    def local_hello_property(self):
        pass

    def orchestrated_hello(self):
        self.hello()
        print(self.a, self.b)
        print(self.local_hello_property)


class Child(ABCParent):
    def __init__(self) -> None:
        super().__init__()

    def local_hello(self):
        print("Hello from child")
        print(self.local_hello_property)

    @property
    def local_hello_property(self):
        return "propery set in the child"


if __name__ == "__main__":
    c = Child()
    c.orchestrated_hello()

class AsciiBuffer(object):
    
    def __init__(self):
        self.data = []
        
    def set(self, x, y, value):
        if len(self.data) < y:
            for i in range(y - len(self.data)):
                self.data.append([])
        row = self.data[y - 1]
        if len(row) < x:
            row.extend([' '] * (x - len(row)))
        row[x - 1] = value
    
    def serialize(self):
        return "\n".join(
            map(lambda row: "".join(row), self.data)
        )
    
    def __repr__(self):
        return "ASCII Buffer:\n" + self.serialize()
            
if __name__ == '__main__':
    b = AsciiBuffer()
    b.set(1, 1, "*")
    b.set(1, 2, "*")
    b.set(1, 3, "*")
    b.set(2, 3, "*")
    b.set(3, 3, "*")
    print(b)
            
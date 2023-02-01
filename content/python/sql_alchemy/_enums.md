Storing enums:

```python
from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Gender(str, Enum):
    male = "male"
    female = "female"
    other = "other"

class Employee(Base):
    __tablename__ = 'employee'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    gender = Column(Enum(Gender))

engine = create_engine('sqlite:///mydatabase.db')
Base.metadata.create_all(bind=engine)
```

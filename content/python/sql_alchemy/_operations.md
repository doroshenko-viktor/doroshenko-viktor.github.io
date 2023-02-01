Update existing object:

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Employee(Base):
    __tablename__ = 'employee'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    salary = Column(Integer)

engine = create_engine('sqlite:///mydatabase.db')
Base.metadata.create_all(bind=engine)
Session = sessionmaker(bind=engine)
session = Session()

# Retrieve the object from the database
employee = session.query(Employee).filter_by(id=1).first()

# Update the object's properties
employee.name = 'John Doe'
employee.salary = 50000

# Commit the changes to the database
session.commit()
```

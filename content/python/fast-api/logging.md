Configuration of basic logging in `FastAPI`:

```python
import logging
from fastapi import FastAPI

app = FastAPI()

logging.basicConfig(level=logging.DEBUG)
log = logging.getLogger("FastAPI")

@app.get("/")
async def read_root():
    log.debug("This is a debug message.")
    log.info("This is an info message.")
    log.warning("This is a warning message.")
    log.error("This is an error message.")
    return {"message": "Hello World"}
```

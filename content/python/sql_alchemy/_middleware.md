```python
from fastapi import FastAPI, Request
import logging

app = FastAPI()

async def log_request(request: Request):
    logging.info(f"Method: {request.method}, URL: {request.url}")

@app.middleware("http")
async def log_middleware(request: Request, call_next):
    log_request(request)
    response = await call_next(request)
    return response

@app.get("/")
async def read_root():
    return {"Hello": "World"}
```

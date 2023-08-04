from pydantic import BaseModel

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/wordle", StaticFiles(directory="static", html=True), name="static")

answer = 'TRAIN'

@app.get('/answer')
def get_answer():
    return {'answer': answer}


# items = ['macbook', 'applewatch', 'iphone', 'airpod']


# class Item(BaseModel):
#     id: int
#     content: str


# @app.get("/items")
# def read_items():
#     return items


# @app.get("/items/{id}")
# def read_id_item(id):
#     id = int(id)
#     return items[id]

# 쿼리 사용


# @app.get("/items")
# def read_item(skip: int = 0, limit: int = 10):
#     return items[skip:skip+limit]

# 서버에 데이터 추가


# @app.post("/items")
# def post_item(item: Item):
#     items.append(item.content)
#     return 'success'

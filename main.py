from pydantic import BaseModel

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()



answer = 'TRAIN'

@app.get("/answer")
async def get_answer():
    return {'answer': answer}

app.mount("/", StaticFiles(directory="static", html=True), name="static")
#app.mount 위치 너무 중요하다.



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

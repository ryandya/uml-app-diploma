from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np

from backend.parser import parse_class_block
from backend.ocr import extract_class_blocks

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/process-uml")
async def process_uml(file: UploadFile):
    data = await file.read()
    img = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)
    cv2.imshow('result', img)

    blocks = extract_class_blocks(img)
    classes = []

    for block in blocks:
        parsed = parse_class_block(block['text'])
        if parsed:
            classes.append(parsed)

    return {"classes": classes}


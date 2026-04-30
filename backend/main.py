from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import base64
from dotenv import load_dotenv
from pathlib import Path
from openai import OpenAI
import os
import re
import json

load_dotenv(Path(__file__).resolve().parent / ".env")
app = FastAPI()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/process-uml")
async def process_uml(file: UploadFile):
    image_bytes = await file.read()
    image_base64 = base64.b64encode(image_bytes).decode("utf-8")

    response = client.responses.create(
        model="gpt-4.1",
        input=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": """Распознай UML диаграмму классов на изображении.
Верни строго JSON:

{
  "classes": [
    {
      "name": "string",
      "attributes": ["string"],
      "methods": ["string"]
    }
  ],
  "relationships": [
    {
      "from": "string",
      "to": "string",
      "type": "inheritance | association | aggregation | composition"
    }
  ]
}

Только JSON, без пояснений."""
                    },
                    {
                        "type": "input_image",
                        "image_url": f"data:image/png;base64,{image_base64}"
                    }
                ]
            }
        ]
    )

    text = response.output[0].content[0].text

    # очистка от ```json
    text = re.sub(r"```json|```", "", text).strip()

    try:
        return json.loads(text)
    except:
        return {"error": "Invalid JSON", "raw": text}
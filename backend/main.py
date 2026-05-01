from fastapi import FastAPI, UploadFile, Form, Body
from fastapi.middleware.cors import CORSMiddleware
import base64
from dotenv import load_dotenv
from pathlib import Path
from openai import OpenAI
import os
import re
import json

from backend.utils import normalize_class
from backend.python_generator import generate_python_code
from backend.java_generator import generate_java_code
from backend.cpp_generator import generate_cpp_code

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
async def process_uml(file: UploadFile, language: str = Form(...)):
    image_bytes = await file.read()
    image_base64 = base64.b64encode(image_bytes).decode("utf-8")

    response = client.responses.create(
        model="gpt-5.4-mini",
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
      "attributes": [
        {
          "name": "string",
          "type": "string"
        }
      ],
      "methods": [
        {
          "name": "string",
          "returnType": "string",
          "params": [
            {
              "name": "string",
              "type": "string"
            }
          ]
        }
      ],
      "relationships": [
        {
          "type": "string",
          "target": "string"
        }
      ]
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

    text = re.sub(r"```json|```", "", text).strip()

    try:
        parsed_json = json.loads(text)
        
        classes = [normalize_class(c) for c in parsed_json["classes"]]

        if language == "python":
            code = generate_python_code(classes)
        elif language == "java":
            code = generate_java_code(classes)
        elif language == "c_plus":
            code = generate_cpp_code(classes)
        else:
            code = "Error"
        return {
            "uml": parsed_json,
            "code": code
            }
    except:
        return {"error": "Invalid JSON", "raw": text}
    
@app.post("/api/generate-code")
async def generate_code(data: dict = Body(...)):
    uml = data["uml"]
    language = data["language"]

    classes = [normalize_class(c) for c in uml["classes"]]

    if language == "python":
        code = generate_python_code(classes)
    elif language == "java":
        code = generate_java_code(classes)
    elif language == "c_plus":
        code = generate_cpp_code(classes)
    else:
        code = "Error"

    return {"code": code}
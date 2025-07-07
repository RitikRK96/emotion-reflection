from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://emotion-reflection-tool.lancway.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str

@app.post("/analyze")
def analyze_emotion(input: TextInput):
    emotions = ["Happy", "Sad", "Anxious", "Excited", "Angry", "Calm"]
    return {
        "emotion": random.choice(emotions),
        "confidence": round(random.uniform(0.7, 0.95), 2)
    }
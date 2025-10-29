from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key="AIzaSyBRR2ja2fSS_LwJ49exGmjSdbw4ujppuk8")

class ChatRequest(BaseModel):
    message: str


@app.post("/api/chat")
def chat_endpoint(request: ChatRequest):
    user_message = request.message.strip()

    # Main AI prompt
    prompt = f"""
    You are **VedaBalance AI**, a compassionate Ayurvedic wellness assistant.
    Only answer questions related to Ayurveda, Prakriti, Doshas (Vata, Pitta, Kapha), yoga, lifestyle balance, or Ayurvedic diet.

    If the question is unrelated (e.g., politics, technology, movies, general knowledge, etc.),
    respond politely with something like:
    "🙏 Namaste! I specialize in Ayurveda and Prakriti guidance. 
     Please ask me about wellness, doshas, diet, or Ayurvedic balance."

    User question: {user_message}
    """

    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)
        reply = response.text.strip() if hasattr(response, "text") else "Sorry, I couldn’t process that."
    except Exception as e:
        reply = "⚠️ Something went wrong while connecting to VedaBalance AI."

    return {"reply": reply}

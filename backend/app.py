from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development; restrict in production
    allow_credentials=True,
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



# --- MongoDB Setup ---
client = MongoClient("mongodb+srv://sujal:sujal123@test1.qic7t1p.mongodb.net/?appName=test1")  # change if remote
db = client["ayurveda_db"]
prakriti_collection = db["prakriti_data"]


# --- Data Model ---
class PrakritiData(BaseModel):
    name: str
    age: int
    email: str
    phone: str
    skin: str
    body: str
    hair: str
    mindset: str
    memory: str
    emotions: str
    diet: str
    sleep: str
    energy: str
    weather: str
    stress: str

# --- Trait Map ---
trait_map = {
    "Dry": "Vata", "Thin": "Vata", "Dry, thin": "Vata", "Restless": "Vata",
    "Forgetful": "Vata", "Anxious": "Vata", "Warm, dry foods": "Vata",
    "Light": "Vata", "Variable": "Vata", "Warm": "Vata", "Anxious": "Vata",
    "Oily": "Pitta", "Muscular": "Pitta", "Oily, thinning": "Pitta", "Intense": "Pitta",
    "Sharp": "Pitta", "Angry": "Pitta", "Cold, spicy": "Pitta", "Moderate": "Pitta",
    "High in bursts": "Pitta", "Cool": "Pitta", "Irritable": "Pitta",
    "Balanced": "Kapha", "Heavier": "Kapha", "Thick, oily": "Kapha", "Calm": "Kapha",
    "Slow but long-term": "Kapha", "Content": "Kapha", "Light, sweet": "Kapha",
    "Deep": "Kapha", "Steady": "Kapha", "Warm and dry": "Kapha"
}


@app.post("/prakriti/analyze")
def analyze_prakriti(data: PrakritiData):
    try:
        # --- Determine dosha dominance ---
        all_traits = [
            data.skin, data.body, data.hair, data.mindset, data.memory,
            data.emotions, data.diet, data.sleep, data.energy, data.weather, data.stress
        ]

        dosha_counts = {"Vata": 0, "Pitta": 0, "Kapha": 0}
        for t in all_traits:
            dosha = trait_map.get(t)
            if dosha:
                dosha_counts[dosha] += 1

        constitution = max(dosha_counts, key=dosha_counts.get)

        # --- Generate Ayurvedic Reflect & Record Report ---
        model = genai.GenerativeModel("gemini-2.0-flash")

        prompt = f"""
        You are **VedaBalance AI**, a warm and insightful Ayurvedic mentor.
        The user’s primary dosha is **{constitution}**.
        Dosha distribution: {dosha_counts}.

        Generate a concise, human-friendly Ayurvedic analysis (around 300–400 words max)
        in clear plain text — not markdown.

        Structure the response into these sections with simple headers (no ### or **):
        1. Constitution Summary — a 3–4 line introduction explaining the dosha and personality essence.
        2. Personality & Emotional Traits — 4–5 key points describing emotional and mental nature.
        3. Physical Characteristics — 4–5 points about body, energy, and appearance.
        4. Balance Tips — short, practical steps (food, habits, lifestyle).
        5. Mind & Spirit — calming or grounding suggestions.
        6. Affirmation — a single short line (like a mantra).

        Keep it formatted for direct display in a web UI — clean spacing, emojis allowed, 
        but no markdown symbols or headings like ###, **, or *.
        Focus on meaningful, beautiful, understandable advice — not long essays.
        """

        response = model.generate_content(prompt)
        analysis_text = response.text.strip() if hasattr(response, "text") else "Could not generate analysis."

        # Save to MongoDB
        record = data.dict()
        record["constitution"] = constitution
        record["dosha_counts"] = dosha_counts
        record["analysis"] = analysis_text
        prakriti_collection.insert_one(record)

        return {"constitution": constitution, "analysis": analysis_text}

    except Exception as e:
        return {"error": f"AI analysis failed: {str(e)}"}

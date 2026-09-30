import os
import io
import json
import logging
import uvicorn
import sys
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from PIL import Image
import google.generativeai as genai

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("foodscanner")

# Resolve path@app.gets relative to this file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")

# Load environment variables
load_dotenv(dotenv_path)

API_KEY = os.getenv("GEMINI_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)
    logger.info("Gemini API Key configured successfully.")
else:
    logger.warning("GEMINI_API_KEY is not set in the environment or .env file.")

app = FastAPI(title="FoodScanner AI Backend")

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function to extract JSON from model response
def parse_gemini_json(text: str) -> dict:
    text = text.strip()
    
    # Strip markdown block formatting if present
    if text.startswith("```"):
        first_brace = text.find("{")
        last_brace = text.rfind("}")
        if first_brace != -1 and last_brace != -1:
            text = text[first_brace:last_brace+1]
            
    return json.loads(text)

@app.get("/api/health")
async def health_check():
    key = os.getenv("GEMINI_API_KEY")
    is_configured = bool(key and len(key) > 10)
    return {"gemini_configured": is_configured}

@app.post("/api/analyze")
async def analyze_product(file: UploadFile = File(...), lang: str = "en"):
    key = os.getenv("GEMINI_API_KEY")
    if not key:
        raise HTTPException(
            status_code=400, 
            detail="API-ключ Gemini не настроен. Пожалуйста, добавьте GEMINI_API_KEY в .env файл бэкенда."
        )

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
    except Exception as e:
        logger.error(f"Failed to parse uploaded image: {e}")
        raise HTTPException(status_code=400, detail="Не удалось обработать изображение. Проверьте формат файла.")

    try:
        # We use gemini-2.5-flash as the latest standard flash model for fast multi-modal queries
        model = genai.GenerativeModel("gemini-2.5-flash")
        
        # Determine target language label
        lang_lower = lang.lower()
        if lang_lower == "en":
            target_lang = "English"
        elif lang_lower == "tr":
            target_lang = "Turkish"
        else:
            target_lang = "Russian"

        prompt = f"""
        You are a professional nutritionist and food quality control specialist. 
        Analyze the food product in the image and provide a highly accurate result in JSON format.
        
        CRITICAL: All text fields ("product_name", "visual_cues", and "storage_recommendations") MUST be fully translated and written in {target_lang} language.
        
        The JSON response schema must be exactly as follows:
        {{
          "product_name": "Accurate name of the product in {target_lang} (e.g. 'Red Fuji Apple' or 'Ripe Banana')",
          "calories_per_100g": 52, // Number: calorie count per 100g of the product
          "estimated_weight_g": 180, // Number: estimated portion/item weight in grams
          "total_calories": 94, // Number: calories for the portion (estimated_weight_g * calories_per_100g / 100)
          "macronutrients": {{
            "protein_g": 0.4, // Number: proteins in grams per portion
            "fat_g": 0.2, // Number: fats in grams per portion
            "carbs_g": 24.5 // Number: carbohydrates in grams per portion
          }},
          "freshness": {{
            "level": "fresh", // String: strictly one of these values: "fresh", "ripe", "average", "spoiled"
            "percentage": 94, // Number from 0 to 100: freshness or quality percentage
            "visual_cues": "Detailed description of visual signs of freshness/quality in {target_lang} (skin texture, spots, firmness, coloration, etc.)"
          }},
          "storage_recommendations": [
            "Storage recommendation 1 in {target_lang} (detailed, specific, and actionable)",
            "Storage recommendation 2 in {target_lang} (detailed, specific, and actionable)",
            "Storage recommendation 3 in {target_lang} (detailed, specific, and actionable)"
          ]
        }}

        Return ONLY the valid JSON object. Do not wrap the JSON in HTML or markdown block formatting. Do not include any explanations or commentary outside of the JSON block.
        """
        
        logger.info("Sending request to Gemini API...")
        response = model.generate_content(
            [prompt, image],
            generation_config={"response_mime_type": "application/json"}
        )
        
        logger.info("Received response from Gemini API.")
        result = parse_gemini_json(response.text)
        return result
        
    except json.JSONDecodeError as je:
        logger.error(f"JSON parsing error: {je}. Raw output was: {response.text}")
        raise HTTPException(
            status_code=500, 
            detail="Не удалось распознать структурированный JSON от модели Gemini. Попробуйте еще раз."
        )
    except Exception as e:
        logger.error(f"Gemini API call failed: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Ошибка работы с API Gemini: {str(e)}"
        )

# Mount static frontend directories
if os.path.exists(os.path.join(FRONTEND_DIR, "css")):
    app.mount("/css", StaticFiles(directory=os.path.join(FRONTEND_DIR, "css")), name="css")
if os.path.exists(os.path.join(FRONTEND_DIR, "js")):
    app.mount("/js", StaticFiles(directory=os.path.join(FRONTEND_DIR, "js")), name="js")
if os.path.exists(os.path.join(FRONTEND_DIR, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIR, "assets")), name="assets")

@app.get("/google6f797ae05be420fd.html")
async def google_verification():
    return FileResponse(
        os.path.join(FRONTEND_DIR, "google6f797ae05be420fd.html")
    )
# Serve the main index.html at root
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    # Fallback to index.html for SPA router or simply serving static index.html at /
    index_file = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    raise HTTPException(status_code=404, detail="Frontend index.html not found.")

if __name__ == "__main__":
    # Добавляем директорию этого файла в путь поиска модулей, 
    # чтобы uvicorn мог импортировать 'main' независимо от текущей рабочей директории
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

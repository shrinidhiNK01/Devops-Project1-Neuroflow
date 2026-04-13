import google.generativeai as genai
import json
from typing import List
from app.models import WorkflowStep
from app.core.config import settings

genai.configure(api_key=settings.GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_pipeline_steps(natural_language: str) -> List[WorkflowStep]:
    prompt = f"""
You are a data pipeline expert. Convert this description to JSON pipeline steps:

"{natural_language}"

Return ONLY valid JSON array:
[
  {{"name": "Upload Data", "type": "upload", "config": {{"format": "csv"}}}},
  {{"name": "Clean Data", "type": "clean", "config": {{"drop_nulls": true}}}}
]

Types: upload, clean, analyze, store, notify, validate
"""
    
    response = model.generate_content(prompt)
    json_str = response.text.strip()
    
    # Extract JSON
    start_idx = json_str.find('[')
    end_idx = json_str.rfind(']') + 1
    steps_data = json.loads(json_str[start_idx:end_idx])
    
    return [WorkflowStep(**step) for step in steps_data]
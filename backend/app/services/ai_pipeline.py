# backend/app/services/ai_pipeline.py
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel as PydanticBaseModel
from typing import List
import json

class PipelineStep(PydanticBaseModel):
    name: str
    type: str
    config: dict

class AIPipelineGenerator:
    def __init__(self, openai_api_key: str):
        self.llm = ChatOpenAI(api_key=openai_api_key, model="gpt-4o-mini", temperature=0)
    
    def generate_pipeline(self, natural_language: str) -> List[PipelineStep]:
        prompt = ChatPromptTemplate.from_template("""
        Convert this natural language workflow into structured pipeline steps.
        
        Natural language: {input}
        
        Respond with valid JSON array of pipeline steps with these fields:
        - name: step name
        - type: one of ["upload", "clean", "analyze", "store", "notify", "validate"]
        - config: step-specific configuration
        
        Example:
        ```json
        [
            {{"name": "Upload CSV", "type": "upload", "config": {{"format": "csv"}}}},
            {{"name": "Clean Data", "type": "clean", "config": {{"remove_nulls": true}}}}
        ]
        ```
        """)
        
        chain = prompt | self.llm | JsonOutputParser(pydantic_object=PipelineStep)
        result = chain.invoke({"input": natural_language})
        return result
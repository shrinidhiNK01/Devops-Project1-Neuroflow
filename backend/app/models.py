from pydantic import BaseModel, Field
from typing import List, Dict, Any
from datetime import datetime
import uuid

class WorkflowStep(BaseModel):
    name: str
    type: str
    config: Dict[str, Any] = {}

class Workflow(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    natural_language: str
    steps: List[WorkflowStep]
    status: str = "completed"
    logs: List[str] = []
    s3_output: str = ""
    created_at: datetime = Field(default_factory=datetime.utcnow)
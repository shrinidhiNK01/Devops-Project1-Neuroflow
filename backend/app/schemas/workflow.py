# backend/app/schemas/workflow.py
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class WorkflowStep(BaseModel):
    name: str
    type: str  # upload, clean, analyze, store, notify
    config: Dict[str, Any] = {}

class WorkflowCreate(BaseModel):
    name: str
    description: str
    natural_language: str  # "Upload CSV → clean → analyze → store → notify"
    steps: Optional[List[WorkflowStep]] = None

class Workflow(BaseModel):
    id: str
    name: str
    description: str
    natural_language: str
    steps: List[WorkflowStep]
    status: str = "draft"  # draft, deployed, running, completed, failed
    aws_lambda_arn: Optional[str] = None
    created_at: datetime
    user_id: str

class PipelineExecution(BaseModel):
    workflow_id: str
    input_file: str  # S3 key
    status: str = "pending"
    logs: List[str] = []
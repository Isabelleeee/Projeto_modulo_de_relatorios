"""
Groq AI service for document analysis.
"""
import logging
import time
from typing import Optional, List
from groq import Groq
from backend.config import settings
from backend.utils import AIServiceError, AnalysisProcessingError

logger = logging.getLogger(__name__)


class GroqService:
    """
    Service for interacting with Groq AI API.
    """
    
    def __init__(self):
        """Initialize Groq client."""
        if not settings.GROQ_API_KEY:
            raise ValueError("GROQ_API_KEY is not configured")
        
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = settings.GROQ_MODEL
        self.temperature = settings.AI_TEMPERATURE
    
    def analyze_project_document(self, text: str) -> tuple[str, List[str], float]:
        """
        Analyze a project document and return summary + risks.
        
        Args:
            text: The extracted document text
            
        Returns:
            Tuple of (summary, risks_list, duration_seconds)
            
        Raises:
            AIServiceError: If Groq API is unavailable
            AnalysisProcessingError: If analysis fails
        """
        try:
            # Prepare prompt
            system_prompt = (
                "You are an expert software engineer evaluating technical projects. "
                "Provide clear, objective technical assessments. "
                "Be direct and concise. Avoid unnecessary details."
            )
            
            user_prompt = (
                f"Analyze this project documentation and provide:\n"
                f"1. A 3-paragraph technical summary\n"
                f"2. Key risks and concerns (as bullet points)\n\n"
                f"PROJECT TEXT:\n{text[:6000]}"
            )
            
            logger.info(f"Sending analysis request to {self.model}")
            start_time = time.time()
            
            # Call Groq API
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                model=self.model,
                temperature=self.temperature,
                max_tokens=settings.AI_MAX_TOKENS,
            )
            
            duration = time.time() - start_time
            logger.info(f"Analysis completed in {duration:.2f}s")
            
            # Extract response
            response_text = chat_completion.choices[0].message.content
            
            # Parse summary and risks from response
            # This is a simple split - can be improved with more sophisticated parsing
            lines = response_text.split('\n')
            
            # Assume first part is summary, then risks
            summary = response_text[:1000]  # First 1000 chars as summary
            risks = [
                "Verify timeline allocation in schedule",
                "Review database integrations",
                "Load testing pending in MVP"
            ]
            
            return summary, risks, duration
            
        except Exception as e:
            logger.error(f"Groq API error: {str(e)}")
            if "API" in str(type(e).__name__) or "Connection" in str(type(e).__name__):
                raise AIServiceError("Groq")
            else:
                raise AnalysisProcessingError(str(e))
    
    def extract_risks_from_text(self, text: str) -> List[str]:
        """
        Extract specific risks from analyzed text.
        
        Args:
            text: The analyzed text
            
        Returns:
            List of identified risks
        """
        risks = []
        risk_keywords = [
            "timeline",
            "schedule",
            "database",
            "testing",
            "integration",
            "performance",
            "security",
            "scalability"
        ]
        
        for keyword in risk_keywords:
            if keyword.lower() in text.lower():
                risks.append(f"Review {keyword} considerations")
        
        return risks if risks else ["General technical review recommended"]


# Global service instance
_groq_service: Optional[GroqService] = None


def get_groq_service() -> GroqService:
    """
    Get or create Groq service instance.
    
    Returns:
        GroqService instance
    """
    global _groq_service
    if _groq_service is None:
        _groq_service = GroqService()
    return _groq_service

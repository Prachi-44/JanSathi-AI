class GeminiServiceUnavailable(RuntimeError):
    pass


class GeminiService:
    def answer_with_context(self, question: str, context: list[str], language: str = "en") -> str:
        raise GeminiServiceUnavailable(
            "Gemini is disabled until retrieval-grounded context is available."
        )

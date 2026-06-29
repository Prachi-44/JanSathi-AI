class RAGServiceUnavailable(RuntimeError):
    pass


class RAGService:
    def search(self, query: str) -> list[dict[str, str]]:
        raise RAGServiceUnavailable(
            "RAG is disabled until OCR and retrieval phases are implemented after the first milestone."
        )

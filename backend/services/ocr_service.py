from pathlib import Path


class OCRServiceUnavailable(RuntimeError):
    pass


class OCRService:
    def extract_document_fields(self, file_path: Path) -> dict[str, str]:
        raise OCRServiceUnavailable(
            "OCR is disabled until the deterministic eligibility milestone is approved."
        )

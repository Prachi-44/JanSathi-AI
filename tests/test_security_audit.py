import pytest
from utils.security import mask_aadhaar, mask_pan, EncryptionService
from services.database import mongo_manager

def test_aadhaar_masking() -> None:
    assert mask_aadhaar("123456789012") == "XXXX-XXXX-9012"
    assert mask_aadhaar("1234-5678-9012") == "XXXX-XXXX-9012"
    assert mask_aadhaar("invalid") == "invalid"

def test_pan_masking() -> None:
    assert mask_pan("ABCDE1234F") == "XXXXX1234X"
    assert mask_pan("abcde1234f") == "XXXXX1234X"
    assert mask_pan("invalid") == "invalid"

def test_fernet_encryption_service() -> None:
    crypt = EncryptionService()
    secret = "TopSecretPassword123"
    
    encrypted = crypt.encrypt(secret)
    assert encrypted != secret
    
    decrypted = crypt.decrypt(encrypted)
    assert decrypted == secret

@pytest.mark.asyncio
async def test_audit_logs_saving() -> None:
    # Test fallback memory mode or DB mode
    action = "TEST_SECURITY_ACTION"
    details = {"param": "value"}
    user_id = "test-user-id"
    
    log_id = await mongo_manager.save_audit_log(user_id=user_id, action=action, details=details)
    assert log_id is not None
    
    logs = await mongo_manager.get_audit_logs()
    assert len(logs) > 0
    
    # Assert last log matches our details
    last_log = logs[0]
    assert last_log["action"] == action
    assert last_log["user_id"] == user_id
    assert last_log["details"] == details

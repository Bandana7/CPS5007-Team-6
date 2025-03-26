import secrets
from fastapi import HTTPException
import bech32
import ecdsa
from ecdsa import VerifyingKey, SECP256k1
import hashlib

class RadixService:
    @staticmethod
    def generate_challenge() -> str:
        """Generate a random challenge for Radix Off-Ledger Authentication (ROLA)."""
        return secrets.token_hex(16)

    @staticmethod
    def _decode_radix_address(wallet_address: str) -> bytes:
        """
        Decode a Radix wallet address (Bech32) to extract the public key.

        Args:
            wallet_address (str): The Radix wallet address (e.g., account_tdx_2_...).

        Returns:
            bytes: The public key bytes.

        Raises:
            HTTPException: If the address is invalid or unsupported.
        """
        try:
            # Decode Bech32 address
            hrp, data = bech32.bech32_decode(wallet_address)
            if not hrp or not data:
                raise HTTPException(status_code=400, detail="Invalid Radix wallet address")

            # Convert 5-bit data to 8-bit bytes
            decoded_bytes = bech32.convertbits(data, 5, 8, False)
            if not decoded_bytes:
                raise HTTPException(status_code=400, detail="Failed to decode Radix address")

            # Radix wallet addresses include a 1-byte entity type and 32-byte public key hash
            # For account addresses, the public key is 33 bytes (compressed format)
            # We need the actual public key, which may need to be fetched or provided
            # For this example, assume the public key is provided in the wallet_address payload
            # In a real app, you might need to fetch it via Radix Gateway API or derive it
            if len(decoded_bytes) < 33:
                raise HTTPException(status_code=400, detail="Invalid public key length in address")

            # Extract the public key (assuming it's the last 33 bytes in compressed format)
            public_key_bytes = bytes(decoded_bytes[-33:])
            return public_key_bytes
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to decode Radix address: {str(e)}")

    @staticmethod
    def verify_signature(wallet_address: str, challenge: str, signature: str) -> None:
        """
        Verify the wallet signature for ROLA authentication.

        Args:
            wallet_address (str): The Radix wallet address (e.g., account_tdx_2_...).
            challenge (str): The challenge sent to the frontend.
            signature (str): The signature provided by the Radix Wallet (hex string).

        Raises:
            HTTPException: If signature verification fails.
        """
        try:
            # Step 1: Derive the public key from the wallet address
            public_key_bytes = RadixService._decode_radix_address(wallet_address)

            # Step 2: Create a VerifyingKey object from the public key
            # Radix uses SECP256k1 curve
            vk = VerifyingKey.from_string(public_key_bytes, curve=SECP256k1)

            # Step 3: Hash the challenge using SHA-256 (standard for ECDSA)
            challenge_bytes = challenge.encode('utf-8')
            challenge_hash = hashlib.sha256(challenge_bytes).digest()

            # Step 4: Convert the signature from hex to bytes
            signature_bytes = bytes.fromhex(signature)

            # Step 5: Verify the signature
            # Radix Connect signatures are typically DER-encoded; ecdsa supports this via sigdecode_der
            from ecdsa.util import sigdecode_der
            if not vk.verify(signature_bytes, challenge_hash, sigdecode=sigdecode_der):
                raise HTTPException(status_code=401, detail="Invalid signature")

        except ValueError as ve:
            raise HTTPException(status_code=400, detail=f"Signature format error: {str(ve)}")
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Signature verification failed: {str(e)}")
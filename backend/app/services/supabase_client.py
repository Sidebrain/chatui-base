from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

def get_supabase_client() -> Client:
    url: str = os.getenv("SUPABASE_URL")
    key: str = os.getenv("SUPABASE_KEY")
    client = create_client(url, key)
    return client
    
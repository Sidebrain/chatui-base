import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# load the .env files into the environment
load_dotenv()

SQL_DATABASE_URL = os.getenv("SUPABASE_DIRECT_URL")

engine = create_engine(
    url=SQL_DATABASE_URL,
    echo=False,
    future=True,
    # connect_args={"check_same_thread": False }
)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

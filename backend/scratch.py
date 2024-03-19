import os
from dotenv import load_dotenv

# load the .env files into the environment
load_dotenv()

# SQL_DATABASE_URL = "sqlite+pysqlite:///conversations.db"
SQL_DATABASE_URL = os.getenv('SUPABASE_DIRECT_URL')

if __name__ == "__main__":
    print(SQL_DATABASE_URL, "SQL_DATABASE_URL")



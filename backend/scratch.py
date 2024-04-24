from app.crud import llm
from app.deps import get_db
from app.deps import get_db

if __name__ == "__main__":
    db_generator = get_db()
    db = next(db_generator)
    try:
        all_llms = llm.get_all_available_llms(db)
        print(*all_llms, sep="\n")
    finally:
        next(db_generator, None)

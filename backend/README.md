# Running the server

from root directory run
`sh ./run.sh`

# Modifying for your usecase

Context: You are using this base for a new project

1. Update the env variables by creating a `.env` file in this project's root
2. Remove the existing `alembic` directory if it exists
3. Remove `alembic.ini` if it exists

## Modifying sql tables

Context: You want to add functionality by adding new tables, and related orm classes

-   Models
    -   Add new tables in `app/models/<name-your-table>.py`, make sure to `from base_class import Base`
    -   Add the new python file you created to `app/models/__init__.py` (this is what alembic uses to recognize that new tables were added and autogenerates revisions)
-   Schemas
    -   Add corresponding pydantic tables in `app/schemas/<name-your-schema>.py` also import the relevant parts into `schemas/__init__.py`
-   CRUD
    -   Add `app/crud/<name-of-model>.py` and make sure the CRUD class inherits `CRUDBase`
    -   create an instance of the class and import into `app/crud/__init__.py`

## Using Alembic

Context: You have made changes to the sql database. Eg: Added models, schemas, or changed the existing models and schemas

1. First time setup (After following the steps at the top)

-   remove the existing `alembic` directory if it exists
-   remove `alembic.ini` if it exists
-   `alembic init alembic` (this will create a new directory called alembic)

2. Add the new sql URL to the `alembic.ini` file

-   Use `dot-env` to load the .env variables into the environment and read the respective url
    `config.set_main_option('sqlalchemy.url', os.getenv('SUPABASE_DIRECT_URL'))`

3. Generate the migration script

-   Add changes models to `models/__init__.py`. This ensures that alembic can access the new models
-   run `alembic revision --autogenerate -m "<enter change message here>"` this will generate a migratiin script in versions
-   Look through the files and make sure that changes are correct. Reference for detected and non detected changes [here](https://alembic.sqlalchemy.org/en/latest/autogenerate.html#what-does-autogenerate-detect-and-what-does-it-not-detect)

4. Running the migration

-   `alembic upgrade head`

5. Upgrading and downgradinf

-   go to specific version by mentioning the identifier `alembic upgrade ae1` (also supports partial identifiers)
-   Relative identifiers `alembic upgrade +2` or `alembic downgrade -1`

# chatui-base
A base ui for conversational interface

This is a full feature conversational expereince app, that has the following parts:

## Backend
- FastAPI backend that makes heavy use of routers
- SQLAlchemy ORM 
- Alembic for database migrations 
- Logging for the most important events, and extensible so you can log whatever you want to
- Heavy use of pydantic everywhere for enforcing type safety. Typing goes beyong FastAPI which mandates pydantic use, this app uses Pydantic more generally to interface with the database and internal functions too
- Partial test coverage, while the test coverage is not extensive, it does cover the LLM use part of it
- Currently supports Antropic and OpenAI out of the box, but architecture allows for dding new providers easily 
- The backend used here is supabase, and making changes / switching to a new project is simple. Make changes to the env file 
- Below is an example of .env file. Make a copy of this and add the keys to start using 

```
OPENAI_API_KEY=<Enter-key-here>
ANTHROPIC_API_KEY=<Enter-key-here>

# Staging
SUPABASE_DIRECT_URL=<Enter-key-here>

SUPABASE_URL=<Enter-key-here>
SUPABASE_KEY=<Enter-key-here>

# Google Auth Credentials
GOOGLE_CLIENT_ID=<Enter-key-here>
GOOGLE_CLIENT_SECRET=<Enter-key-here>
GOOGLE_REDIRECT_URI=<Enter-key-here>


```

## Frontend 
- Typescript everywhere
- React for frontend
- React Query for well, querying apis
- React Router for routing
- Zustand as a context store
- ShadCN and tailwind for components 
- Vite as the build tool and server

This is also connected to supabase, checkout the supabase folder if you want to make changes. 


# Deployment 
This is setup with github actions code that is triggered either when a commit is made to the `main` or the `staging` branch. Both staging and main Dockerfiles are present to modify. You should separate main and staging to avoid errors in production. 

# Conclusion

This has a lot of the moving parts required to build complex conversational expereinces. Everything is native react, no NextJs type modifications. Feel free to use it if you need. 




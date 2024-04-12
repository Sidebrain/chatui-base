FROM python:3.12.2

# set environment variables

# ENV OPENAI_API_KEY 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
# ENV SUPABASE_DIRECT_URL postgresql+psycopg2://postgres.jdvurdapvgsiqpjgunfk:YH4Kt.BWyuajVAyt!*LgHW28@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
# ENV SUPABASE_ANON_KEY eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkdnVyZGFwdmdzaXFwamd1bmZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyMzMwMjMsImV4cCI6MjAyNTgwOTAyM30.cyQLUxT84ComwB7JOahvuyTo7346TnbDEALXRXtebuw
# ENV SUPABASE_PROJECT_URL https://jdvurdapvgsiqpjgunfk.supabase.co

# set the working directory
WORKDIR /chatui-base/backend

# copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy the current directory to the working directory
COPY . .

EXPOSE 8008

# command to run the server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8008"]




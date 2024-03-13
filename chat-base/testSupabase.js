import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://jdvurdapvgsiqpjgunfk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkdnVyZGFwdmdzaXFwamd1bmZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyMzMwMjMsImV4cCI6MjAyNTgwOTAyM30.cyQLUxT84ComwB7JOahvuyTo7346TnbDEALXRXtebuw",
);

async function testSupabase() {
  // Create a new conversation entry
  const { data, error } = await supabase
    .from("Conversations")
    .insert({ message: "test message", sender: "tester" })
    .select();
  if (error) {
    console.log(error.message, error.details, error.hint);
    console.log(error);
    return;
  }
  return data;
}

try {
  await testSupabase();
} catch (error) {
  console.error(error);
}

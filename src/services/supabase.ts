import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://skbayfgcccbtwkbmhhbn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYmF5ZmdjY2NidHdrYm1oaGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2NDgzNzEsImV4cCI6MjA0OTIyNDM3MX0.1mx1MOkD7jyBIlHyUAj5B72cP53bHq23cxLCrAk3Dc8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

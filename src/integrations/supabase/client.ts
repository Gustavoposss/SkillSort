// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dyfaudwteaqkrxefxmue.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5ZmF1ZHd0ZWFxa3J4ZWZ4bXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTY3ODksImV4cCI6MjA2NTgzMjc4OX0.y3inYAcg1zp07b8qhjTl-_5H-SVUq2WDRKV6qcyqjlA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
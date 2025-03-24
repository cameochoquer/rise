import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = () => {
  const supabaseUrl = 'https://vreghditnixwdbvnsufp.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZWdoZGl0bml4d2Ridm5zdWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MTQyNDYsImV4cCI6MjA1ODM5MDI0Nn0.kOamOQgTsbyijSL-C4ttBB8CrFiBsyaIkYkn13sQA1w'

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    throw new Error('Supabase URL and key are required');
  }

  return createClient(supabaseUrl, supabaseKey);
};


export default createSupabaseClient
import { createClient } from '@supabase/supabase-js'

const URL = 'https://ebdxqnmwcrlvfgzoyoan.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViZHhxbm13Y3JsdmZnem95b2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyNzU3MjEsImV4cCI6MTk5Nzg1MTcyMX0.T0wY4S2izsSjKNXernu-CFNBMqOthmYAwlPQv6jPFNk';

export const supabase = createClient(URL, API_KEY);
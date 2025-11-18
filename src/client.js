import { createClient } from '@supabase/supabase-js'

const URL = "https://gnksgfqkliwxpompzwuk.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdua3NnZnFrbGl3eHBvbXB6d3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0OTQyODMsImV4cCI6MjA3OTA3MDI4M30.HvXC1w7-UqX1In3MKT9D3HIoDADLfRXTkl3Eis-Dok0"
export const supabase = createClient(URL, API_KEY)
import { createClient } from "@/lib/supabase/client";

 
export  const notesApi = {
    getNotes: async () => {
          const supabase = createClient();
        const { data, error } = await supabase.from("notes").select("*")
        
        if (error) throw error

        return data
    }
}
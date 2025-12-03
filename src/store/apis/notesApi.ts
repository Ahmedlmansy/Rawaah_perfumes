import { createSupabaseClient } from "@/lib/supabase/client";

 
export  const notesApi = {
    getNotes: async () => {
          const supabase = createSupabaseClient();
        const { data, error } = await supabase.from("notes").select("*")
        
        if (error) throw error

        return data
    }
}
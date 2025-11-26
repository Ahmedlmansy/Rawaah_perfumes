import { supabase } from "@/lib/supabaseClient"
 
export  const notesApi = {
    getNotes: async () => {
        const { data, error } = await supabase.from("notes").select("*")
        
        if (error) throw error

        return data
    }
}
import { supabase } from "@/lib/supabaseClient"

export const brandsApi = {
    getBrands: async () => {

        const { data, error } = await supabase.from("brands").select("*")
        
        if (error) {
            console.error("Supabase Error:", error);
            throw error 
        } 
            

        return data
    }
}
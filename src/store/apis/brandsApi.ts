import { createSupabaseClient } from "@/lib/supabase/client";

export const brandsApi = {
    getBrands: async () => {
          const supabase = createSupabaseClient();
        const { data, error } = await supabase.from("brands").select("*")
        
        if (error) {
            console.error("Supabase Error:", error);
            throw error 
        } 
            

        return data
    }
}
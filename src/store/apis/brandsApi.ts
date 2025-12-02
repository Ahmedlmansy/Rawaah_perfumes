import { createClient } from "@/lib/supabase/client";

export const brandsApi = {
    getBrands: async () => {
          const supabase = createClient();
        const { data, error } = await supabase.from("brands").select("*")
        
        if (error) {
            console.error("Supabase Error:", error);
            throw error 
        } 
            

        return data
    }
}
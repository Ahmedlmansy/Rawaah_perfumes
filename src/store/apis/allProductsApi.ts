import { createSupabaseClient } from "@/lib/supabase/client";

export const allProductsApi = {
    
    getProducts: async () => {
          const supabase = createSupabaseClient();
        const { data, error } = await supabase.from("products").select("*")
         if (error) {
            console.error("Supabase Error:", error);
            throw error 
        } 
            

        return data
    }
}
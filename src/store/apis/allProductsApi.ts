import { supabase } from "@/lib/supabaseClient"

export const allProductsApi  = {
    getProducts: async () => {
        const { data, error } = await supabase.from("products").select("*")
         if (error) {
            console.error("Supabase Error:", error);
            throw error 
        } 
            

        return data
    }
}
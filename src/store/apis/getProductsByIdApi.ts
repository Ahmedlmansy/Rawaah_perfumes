import { createSupabaseClient } from "@/lib/supabase/client"


export const productDetails = {
    getProductDetailsApi: async (id: string) => {
        const supabase = createSupabaseClient()
        const { data, error } = await supabase.from("products").select("*").eq("id", id)
         if (error) {
            console.error("Supabase Error:", error);
            throw error 
        } 
        return data
    }
}


"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createSupabaseClient } from "@/lib/supabase/client";

export const useSupabaseUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
const supabase = createSupabaseClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    };

    getUser();
  }, []);

  return { user, loading };
};

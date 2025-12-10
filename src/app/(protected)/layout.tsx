import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.log(" No user, redirect to login");
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error(" Profile fetch failed:", profileError.message);
    redirect("/login");
  }

  if (!profile) {
    console.log(" Profile not found");
    redirect("/login");
  }

  const allowedRoles = ["admin", "worker"];

  if (!allowedRoles.includes(profile.role)) {
    console.log(" Unauthorized role:", profile.role);
    redirect("/");
  }

  console.log(" Access granted:", user.email, profile.role);

  return <>{children}</>;
}

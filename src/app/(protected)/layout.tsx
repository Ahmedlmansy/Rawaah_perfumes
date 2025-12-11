import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { Toaster } from "sonner";

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
    redirect("/login");
  }

  return (
    <>
      {children}
      <Toaster position="top-right" />
    </>
  );
}

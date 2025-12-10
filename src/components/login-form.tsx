"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createSupabaseClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      const userId = data.user.id;

      const { data: profile } = await supabase
        .from("profiles")
        .select("name, role")
        .eq("id", userId)
        .maybeSingle();

      toast.success(`Welcome ${profile?.name || "back"}!`);

      const redirectedFrom = searchParams.get("redirectedFrom");

      if (redirectedFrom) {
        router.push(redirectedFrom);
      } else if (profile?.role === "admin") {
        router.push("/dashborad");
      } else if (profile?.role === "worker") {
        router.push("/dashborad");
      } else {
        router.push("/");
      }

      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleLogin}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button
          variant="outline"
          className="w-full"
          type="button"
          disabled={loading}
          onClick={() => toast.info("GitHub login coming soon")}
        >
          GitHub Login
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/register" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}

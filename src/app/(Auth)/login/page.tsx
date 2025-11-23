"use client";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-[#ab8e661a]">
        <div className="flex flex-1 items-center justify-center ">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className=" relative hidden lg:block">
        <img
          src="https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/sign/avatars/login_landing.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mODY5MTcxZS0yMzMxLTRhYjMtYWY4ZS1jMDFmZjM5ZWEzM2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL2xvZ2luX2xhbmRpbmcucG5nIiwiaWF0IjoxNzYzODIzNjU0LCJleHAiOjIwNzkxODM2NTR9.lzF53dVCY959_mDTzX4aHjXOHFf6YNJr29NPex5XTtw"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

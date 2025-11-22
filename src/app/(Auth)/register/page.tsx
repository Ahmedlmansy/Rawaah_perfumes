import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className=" relative hidden lg:block">
        <img
          src="https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/sign/avatars/rigster.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mODY5MTcxZS0yMzMxLTRhYjMtYWY4ZS1jMDFmZjM5ZWEzM2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL3JpZ3N0ZXIucG5nIiwiaWF0IjoxNzYzODIzNzQ5LCJleHAiOjIwNzkxODM3NDl9.gqJW-ih28h0gPcnkZi9ZHP0yI8sG75z3OPjjaUlGK-Y"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

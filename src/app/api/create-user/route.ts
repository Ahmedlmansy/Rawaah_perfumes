import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

//  Request Body
interface CreateUserRequest {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  role: "admin" | "worker" | "user";
}

//  Error Response
interface ErrorResponse {
  error: string;
  details?: string;
}

//  Success Response
interface SuccessResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as CreateUserRequest;
    const { email, password, full_name, role } = body;

    // Validation
    if (!email || !password || !full_name || !role) {
      return NextResponse.json<ErrorResponse>(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    //   Auth
    const { data, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      return NextResponse.json<ErrorResponse>(
        { 
          error: "Failed to create user",
          details: authError.message 
        },
        { status: 500 }
      );
    }

    const userId = data.user?.id;
    if (!userId) {
      return NextResponse.json<ErrorResponse>(
        { error: "User ID not returned" },
        { status: 500 }
      );
    }

    //  profile
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert(
        [{
          id: userId,
          name: full_name,
          email: email,
          role: role
        }],
        { onConflict: "id" }
      );

    if (profileError) {
      //  Profile
      await supabaseAdmin.auth.admin.deleteUser(userId);
      
      return NextResponse.json<ErrorResponse>(
        { 
          error: "Failed to create user profile",
          details: profileError.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json<SuccessResponse>({
      success: true,
      user: {
        id: userId,
        email: email
      }
    });

  } catch (error) {
    //  Proper Error Handling
    console.error("API CREATE USER ERROR:", error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : "An unknown error occurred";

    return NextResponse.json<ErrorResponse>(
      { 
        error: "Internal server error",
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
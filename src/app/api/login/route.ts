import { NextRequest, NextResponse } from "next/server";

const MOCK_USER = {
  email: "admin@alma.com",
  password: "admin",
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      return NextResponse.json({ success: true, message: "Login successful" });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

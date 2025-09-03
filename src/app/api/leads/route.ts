import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "leads.json");

const readLeads = () => {
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};

const writeLeads = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  try {
    const leads = readLeads();
    return NextResponse.json(leads);
  } catch (err) {
    console.error("GET /api/leads error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, email, linkedin, visas, message } = body;

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const leads = readLeads();
  const newLead = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    linkedin: linkedin || "",
    visas,
    message: message || "",
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };
  leads.push(newLead);
  writeLeads(leads);

  return NextResponse.json(newLead);
}

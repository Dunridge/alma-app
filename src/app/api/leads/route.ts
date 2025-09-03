import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "leads.json");

const readLeads = async () => {
  const jsonData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(jsonData);
};

const writeLeads = async (data: any) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  try {
    const leads = await readLeads();
    return NextResponse.json(leads);
  } catch (err) {
    console.error("GET /api/leads error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string | null;
  const email = formData.get("email") as string | null;
  const linkedin = formData.get("linkedin") as string | null;
  const visas = formData.getAll("visas");
  const message = formData.get("message") as string | null;
  const resume = formData.get("resume") as File | null;

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  let resumePath = null;
  if (resume) {
    const bytes = Buffer.from(await resume.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${resume.name}`;
    resumePath = `/uploads/${fileName}`;
    await fs.writeFile(path.join(uploadDir, fileName), bytes);
  }

  const newLead = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    linkedin: linkedin || "",
    visas: visas.length > 0 ? visas : [],
    message: message || "",
    status: "Pending",
    resume: resumePath,
    createdAt: new Date().toISOString(),
  };

  let leads = [];
  try {
    leads = await readLeads();
  } catch {}
  leads.push(newLead);
  await writeLeads(leads);

  return NextResponse.json(newLead);
}

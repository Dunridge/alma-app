import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "leads.json");

const readLeads = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const writeLeads = (data: any) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await req.json();
  const { status } = body;

  if (!status)
    return NextResponse.json({ error: "Missing status" }, { status: 400 });

  const leads = readLeads();
  const leadIndex = leads.findIndex((l: any) => l.id.toString() === id);

  if (leadIndex === -1) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  leads[leadIndex].status = status;
  writeLeads(leads);

  return NextResponse.json(leads[leadIndex]);
}

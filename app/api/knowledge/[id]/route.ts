import { NextResponse } from "next/server";
import {
  deleteKnowledgeDoc,
  getKnowledgeDocById,
  updateKnowledgeDoc,
} from "@/modules/knowledge/knowledge.service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const doc = await getKnowledgeDocById(id);

  if (!doc) {
    return NextResponse.json(
      { error: "Dokumen tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json(doc);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  try {
    const doc = await updateKnowledgeDoc(id, body);
    return NextResponse.json(doc);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await deleteKnowledgeDoc(id);
  return NextResponse.json({ success: true });
}

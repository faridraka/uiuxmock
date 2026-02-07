import { db } from "@/config/db";
import { projectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  const { userInput, device, projectId } = await req.json();
  const user = await currentUser();

  const result = await db.insert(projectTable).values({
    projectId,
    userInput,
    device,
    userId: user?.primaryEmailAddress?.emailAddress as string,
  }).returning();

  return NextResponse.json(result[0])
}
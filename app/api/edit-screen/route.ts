import { db } from "@/config/db";
import { openai } from "@/config/openai";
import { screenConfigTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  const { projectId, screenId, oldCode, userInput } = await req.json()

  const USER_INPUT = `${oldCode} Make changes as per user Input in this code. Keeping design and style. Do not change it. Just make user requested changes. UserInput is: ${userInput}`
  
    try {
      const response = await openai.responses.create({
        model: "gpt-5.1-codex-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: USER_INPUT,
              },
            ],
          },
        ] as any,
        stream: false,
      });
  
      const code = response.output_text;
      const updateResult = await db
        .update(screenConfigTable)
        .set({ code })
        .where(
          and(
            eq(screenConfigTable.projectId, projectId as string),
            eq(screenConfigTable.screenId, screenId as string),
          ),
        )
        .returning()
  
      return NextResponse.json(updateResult[0]);
    } catch (err) {
      return NextResponse.json({ msg: "Internal Server Error" });
    }
}
import { db } from "@/config/db";
import { openai } from "@/config/openai";
import { screenConfigTable } from "@/config/schema";
import { GENERATION_SCREEN_PROMPT } from "@/constants/prompt";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    projectId,
    screenId,
    screenName,
    purpose,
    screenDescription,
    projectVisualDescription,
  } = await req.json();

  const userInput = `
  screen Name is: ${screenName},
  screen Purpose is: ${purpose},
  screen Description: ${screenDescription}
  `;

  try {
    const response = await openai.responses.create({
      model: "gpt-5.1-codex-mini",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: GENERATION_SCREEN_PROMPT,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: userInput,
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

import { db } from "@/config/db";
import { openai } from "@/config/openai";
import { screenConfigTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { projectId, screenId, oldCode, userInput } = await req.json();

  const USER_INPUT = `
You are a senior software engineer performing a minimal, safe refactor.

TASK:
Modify the existing code ONLY where necessary to satisfy the user request.

RULES:
- Do NOT rewrite the entire code.
- Preserve structure, layout, styling, and existing logic.
- Only improve or modify parts related to the request.
- If possible, enhance readability, performance, and best practices.
- Return the FULL updated code.

USER REQUEST:
${userInput}

EXISTING CODE:
${oldCode}
`;

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
      .returning();

    return NextResponse.json(updateResult[0]);
  } catch (err) {
    return NextResponse.json({ msg: "Internal Server Error" });
  }
}

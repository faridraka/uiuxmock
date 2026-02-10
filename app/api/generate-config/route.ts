import { db } from "@/config/db";
import { openai } from "@/config/openai";
import { projectTable, screenConfigTable } from "@/config/schema";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/constants/prompt";
import { ScreenConfigType } from "@/types/type";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userInput, deviceType, projectId } = await req.json();

  try {
    const response = await openai.responses.create({
      model: "gpt-5.1-codex-mini",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: APP_LAYOUT_CONFIG_PROMPT.replace(
                "(deviceType)",
                deviceType,
              ),
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

    const JSONResult = JSON.parse(response.output_text);

    if (JSONResult) {
      // Update Project Table
      await db.update(projectTable).set({
        projectVisualDescription: JSONResult?.projectVisualDescription,
        projectName: JSONResult?.projectName,
        theme: JSONResult?.theme,
        config: response.output_text
      }).where(eq(projectTable.projectId, projectId as string));

      // Save To Database

      JSONResult.screens?.forEach(async (screen: any) => {
        const result = await db.insert(screenConfigTable).values({
          projectId,
          purpose: screen?.purpose,
          screenId: screen?.id,
          screenName: screen?.name,
          screenDescription: screen?.layoutDescription,
        });
      });
      return NextResponse.json(JSONResult);
    } else{
      return NextResponse.json({ msg: "Failed AI output text"})
    }
  } catch (err) {
    return NextResponse.json({ msg: "Internal Server Error" });
  }
}

import { db } from "@/config/db";
import { projectTable, screenConfigTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userInput, device, projectId } = await req.json();
  const user = await currentUser();
  const { has } = await auth();

  const hasPremiumAccess = has({ plan: "unlimited" });

  const projects = await db
    .select()
    .from(projectTable)
    .where(
      eq(
        projectTable.userId,
        user?.primaryEmailAddress?.emailAddress as string,
      ),
    );

  if(projects.length >= 2 && !hasPremiumAccess){
    return NextResponse.json({ msg: "Limited Exceed"})
  }

  const result = await db
    .insert(projectTable)
    .values({
      projectId,
      userInput,
      device,
      userId: user?.primaryEmailAddress?.emailAddress as string,
    })
    .returning();

  return NextResponse.json(result[0]);
}

export async function GET(req: NextRequest) {
  const projectId = await req.nextUrl.searchParams.get("projectId");
  const user = await currentUser();

  try {
    if (!projectId) {
      const result = await db
        .select()
        .from(projectTable)
        .where(
          eq(
            projectTable.userId,
            user?.primaryEmailAddress?.emailAddress as string,
          ),
        )
        .orderBy(desc(projectTable.id));

      return NextResponse.json(result);
    }
    const result = await db
      .select()
      .from(projectTable)
      .where(
        and(
          eq(projectTable.projectId, projectId as string),
          eq(
            projectTable.userId,
            user?.primaryEmailAddress?.emailAddress as string,
          ),
        ),
      );

    if (!result.length) {
      return NextResponse.json({ msg: "Not Found" }, { status: 404 });
    }

    const ScreenConfig = await db
      .select()
      .from(screenConfigTable)
      .where(eq(screenConfigTable.projectId, projectId as string));

    return NextResponse.json({
      projectDetail: result[0],
      screenConfig: ScreenConfig,
    });
  } catch (e) {
    return NextResponse.json({ msg: "Error" });
  }
}

export async function PUT(req: NextRequest) {
  const { projectName, theme, projectId, screenShot } = await req.json();

  try {
    const result = await db
      .update(projectTable)
      .set({
        projectName,
        theme,
        screenshot: screenShot as string | null,
      })
      .where(eq(projectTable.projectId, projectId))
      .returning();

    if (!result.length) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (err) {
    return NextResponse.json({ msg: "Error" });
  }
}

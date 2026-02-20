"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectType, ScreenConfigType } from "@/types/type";
import { Minus, Plus, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import ScreenFrame from "./ScreenFrame";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import axios from "axios";

type props = {
  projectDetail: ProjectType | undefined;
  screenConfig: ScreenConfigType[] | undefined;
  loading?: boolean;
  takeScreenshot: any;
};

const Canvas = ({
  projectDetail,
  screenConfig,
  loading,
  takeScreenshot,
}: props) => {
  const [panningEnabled, setPanningEnabled] = useState(true);

  const isMobile = projectDetail?.device == "mobile";

  const SCREEN_WIDTH = isMobile ? 400 : 1200 - 250;
  const SCREEN_HEIGHT = 800;

  const iframeRefs = useRef<(HTMLFormElement | null)[]>([]);

  useEffect(() => {
    if (!takeScreenshot) return;

    const ready = iframeRefs.current.some(Boolean);
    if (ready) onTakeScreenshot();
  }, [takeScreenshot]);

  const captureOneIframe = async (iframe: HTMLIFrameElement) => {
    const doc = iframe.contentDocument;
    if (!doc) throw new Error("iframe doc not ready");

    // Wait for fonts if possible
    // @ts-ignore
    if (doc.fonts?.ready) await doc.fonts.ready;

    // Allow iconify/tailwind layout to settle
    await new Promise((resolve) => setTimeout(resolve, 250));

    const target = doc.body; // or doc.documentElement
    const w = doc.documentElement.scrollWidth;
    const h = doc.documentElement.scrollHeight;

    const canvas = await html2canvas(target, {
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
      width: w,
      height: h,
      windowWidth: w,
      windowHeight: h,
      scale: window.devicePixelRatio || 1,
    });

    return canvas;
  };

  const onTakeScreenshot = async () => {
    try {
      const iframes = iframeRefs.current.filter(Boolean) as any;

      if (!iframes.length) {
        toast.error("No iframes found to capture");
        return;
      }

      // 1️⃣ Capture each iframe into its own canvas
      const shotCanvases: HTMLCanvasElement[] = [];

      for (let i = 0; i < iframes.length; i++) {
        const canvas = await captureOneIframe(iframes[i]);
        shotCanvases.push(canvas);
      }

      // 2️⃣ Stitch into one final canvas (side-by-side)
      const scale = window.devicePixelRatio || 1;
      const headerH = 40; // same as header height
      const GAP = 16;

      const outW =
        Math.max(iframes.length * (SCREEN_WIDTH + GAP), SCREEN_WIDTH) * scale;

      const outH = SCREEN_HEIGHT * scale;

      const out = document.createElement("canvas");
      out.width = outW;
      out.height = outH;

      const ctx = out.getContext("2d");
      if (!ctx) throw new Error("No 2D context");

      // Optional transparent background
      ctx.clearRect(0, 0, outW, outH);

      // 3️⃣ Draw each screen capture
      for (let i = 0; i < shotCanvases.length; i++) {
        const x = i * (SCREEN_WIDTH + GAP) * scale;
        const y = headerH * scale; // iframe capture is body only
        ctx.drawImage(shotCanvases[i], x, y);
      }

      // 4️⃣ Download result
      const url = out.toDataURL("image/png");
      updateProjectWithScreenshot(url)
      const a = document.createElement("a");
      a.href = url;
      a.download = "canvas.png";
      a.click();
    } catch (e) {
      console.error(e);
      toast.error("Capture failed (iframe)");
    }
  };

  const updateProjectWithScreenshot = async(url: string) => {
    const result = await axios.put("/api/project",{
      screenShot : url,
      projectId: projectDetail?.projectId,
      theme: projectDetail?.theme,
      projectName: projectDetail?.projectName
    })
  }

  return (
    <div className="w-full h-[calc(100vh-72px)] bg-gray-200/20 dark:bg-gray-800/20 bg-[radial-gradient(rgba(0,0,0,0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-size-[20px_20px]">
      <TransformWrapper
        initialScale={0.5}
        minScale={0.5}
        maxScale={3}
        initialPositionX={50}
        initialPositionY={50}
        limitToBounds={false}
        wheel={{ step: 0.8 }}
        doubleClick={{ disabled: false }}
        panning={{ disabled: !panningEnabled }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <Controls />
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
              contentStyle={{
                display: "flex",
                gap: "20px",
                flexDirection: "row",
              }}
            >
              {screenConfig?.map((screen, index) => (
                <div key={index}>
                  {screen?.code ? (
                    <ScreenFrame
                      x={index * SCREEN_WIDTH}
                      y={0}
                      width={SCREEN_WIDTH}
                      height={SCREEN_HEIGHT}
                      setPanningEnabled={setPanningEnabled}
                      htmlCode={screen?.code}
                      projectDetail={projectDetail}
                      screen={screen}
                      iframeRef={(ifrm: any | null) => {
                        iframeRefs.current[index] = ifrm;
                      }}
                    />
                  ) : (
                    <div
                      className="bg-gray-300/80 dark:bg-gray-800/80 gap-4 flex flex-col rounded-2xl p-5"
                      style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
                    >
                      <Skeleton className="w-full rounded-lg h-10" />
                      <Skeleton className="w-1/2 rounded-lg h-20" />
                      <Skeleton className="w-[70%] rounded-lg h-30" />
                      <Skeleton className="w-[30%] rounded-lg h-20" />
                      <Skeleton className="w-full rounded-lg h-10" />
                      <Skeleton className="w-1/2 rounded-lg h-20" />
                      <Skeleton className="w-[70%] rounded-lg h-30" />
                    </div>
                  )}
                </div>
              ))}
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Canvas;

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="tools absolute p-2 px-3 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-50 shadow flex gap-3 rounded-4xl bottom-8 left-1/2 border z-30">
      <Button variant={"ghost"} size={"sm"} onClick={() => zoomIn()}>
        <Plus />
      </Button>
      <Button variant={"ghost"} size={"sm"} onClick={() => zoomOut()}>
        <Minus />
      </Button>
      <Button variant={"ghost"} size={"sm"} onClick={() => resetTransform()}>
        <RefreshCw />
      </Button>
    </div>
  );
};
